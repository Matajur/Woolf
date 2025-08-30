"""Module for read operations"""

from pyspark.sql import DataFrame, SparkSession
from pyspark.sql.functions import to_json, struct
from final_project.config.mysql import MySQLConnectionConfig
from final_project.config.kafka import KafkaConnectionConfig


def read_mysql_data(
    mysql_conf: MySQLConnectionConfig,
    spark: SparkSession,
    table_name: str,
    database_name: str,
) -> DataFrame:
    """
    Function for reading data from MySQL DB
    """
    mysql_data_df: DataFrame = (
        spark.read.format("jdbc")
        .options(
            url=mysql_conf.jdbc_url + database_name,
            driver="com.mysql.cj.jdbc.Driver",
            dbtable=table_name,
            user=mysql_conf.jdbc_user,
            password=mysql_conf.jdbc_password,
        )
        .load()
    )
    return mysql_data_df


def read_kafka_data(
    kafka_conf: KafkaConnectionConfig, topic_name: str, spark: SparkSession
) -> DataFrame:
    """
    Function for reading data from MySQL table with Kafka
    """
    kafka_data_df: DataFrame = (
        spark.readStream.format("kafka")
        .option("kafka.bootstrap.servers", ",".join(kafka_conf.bootstrap_servers))
        .option("kafka.security.protocol", kafka_conf.security_protocol)
        .option("kafka.sasl.mechanism", kafka_conf.sasl_mechanism)
        .option("kafka.sasl.jaas.config", kafka_conf.jaas_config)
        .option("subscribe", topic_name)
        .option("startingOffsets", "earliest")
        .option("maxOffsetsPerTrigger", "5")
        .load()
    )

    # kafka_data_df = kafka_data_df.withColumn("value", to_json(struct("*")))
    return kafka_data_df
