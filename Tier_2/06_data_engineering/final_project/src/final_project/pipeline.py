"""Main pipeline entry point"""

from pyspark.sql import DataFrame, SparkSession
from pyspark.sql.functions import from_json, col, avg, current_timestamp
from pyspark.sql.types import StructType, StringType

from final_project.config.mysql import get_mysql_connection_config
from final_project.config.mysql import MySQLConnectionConfig
from final_project.config.kafka import get_kafka_connection_config
from final_project.config.kafka import KafkaConnectionConfig
from final_project.config.spark import get_spark_session
from final_project.connectors.read import read_kafka_data, read_mysql_data
from final_project.connectors.write import write_to_outputs

# Schema for Kafka JSON parsing
schema: StructType = (
    StructType()
    .add("athlete_id", StringType())
    .add("sport", StringType())
    .add("event", StringType())
    .add("medal", StringType())
)

# Spark initialization
spark: SparkSession = get_spark_session("Matajur_JDBC_to_Kafka")

# Load configs
mysql_conf: MySQLConnectionConfig = get_mysql_connection_config()
kafka_conf: KafkaConnectionConfig = get_kafka_connection_config()

# Load bio data from MySQL
mysql_df: DataFrame = read_mysql_data(
    spark=spark,
    mysql_conf=mysql_conf,
    table_name="olympic_dataset.athlete_bio",  # athlete_bio
    database_name="neo_data",  # olympic_dataset
)

mysql_df = mysql_df.filter(col("height").cast("double").isNotNull()).filter(
    col("weight").cast("double").isNotNull()
)

# Read streaming event data from Kafka
kafka_df: DataFrame = read_kafka_data(
    kafka_conf=kafka_conf, topic_name="athlete_event_results", spark=spark
)

# Parse and explode the JSON value
parsed_df: DataFrame = (
    kafka_df.selectExpr("CAST(value AS STRING) as json")
    .withColumn("data", from_json("json", schema))
    .select("data.*")
)

parsed_df.writeStream.format("console").start()

# Join static athlete bio with streaming event data
joined_df: DataFrame = parsed_df.join(mysql_df, on="athlete_id", how="inner")

# Aggregate by sport, medal, gender, country
aggregated_df: DataFrame = (
    joined_df.groupBy("sport", "medal", "sex", "country_noc")
    .agg(
        avg(col("height").cast("double")).alias("avg_height"),
        avg(col("weight").cast("double")).alias("avg_weight"),
    )
    .withColumn("timestamp", current_timestamp())
)

# Write the aggregated stream to Kafka and MySQL
query = (
    aggregated_df.writeStream.foreachBatch(
        lambda df, epoch_id: write_to_outputs(
            df,
            epoch_id,
            kafka_conf=kafka_conf,
            mysql_conf=mysql_conf,
            kafka_topic="athlete_event_results",
            mysql_table="olympic_dataset.matajur_aggregated_results",
            mysql_db="neo_data",
        )
    )
    .outputMode("complete")
    .start()
)

query.awaitTermination()
