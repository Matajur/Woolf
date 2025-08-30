"""Module for reading data from the MySQL table and writing to the Kafka topic"""

from pyspark.sql import DataFrame, SparkSession

from final_project.config.spark import get_spark_session
from final_project.config.mysql import get_mysql_connection_config
from final_project.config.mysql import MySQLConnectionConfig
from final_project.config.kafka import get_kafka_connection_config
from final_project.config.kafka import KafkaConnectionConfig
from final_project.connectors.write import write_to_kafka
from final_project.connectors.read import read_mysql_data

# Spark Session
spark: SparkSession = get_spark_session("ProduceAthleteEvents")

# Configs
mysql_conf: MySQLConnectionConfig = get_mysql_connection_config()
kafka_conf: KafkaConnectionConfig = get_kafka_connection_config()

# Read MySQL table
mysql_df: DataFrame = read_mysql_data(
    spark=spark,
    mysql_conf=mysql_conf,
    table_name="olympic_dataset.athlete_event_results",
    database_name="neo_data",
)

# Write to Kafka topic
write_to_kafka(
    df=mysql_df,
    kafka_conf=kafka_conf,
    topic_name="athlete_event_results",
    key_column="athlete_id",
)

print("Successfully produced events from MySQL to Kafka topic.")
