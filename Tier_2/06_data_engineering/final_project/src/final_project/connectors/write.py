"""Module for write operations"""

from pyspark.sql import DataFrame
from pyspark.sql.functions import to_json, struct
from final_project.config.mysql import MySQLConnectionConfig
from final_project.config.kafka import KafkaConnectionConfig


def write_to_kafka(
    df: DataFrame,
    kafka_conf: KafkaConnectionConfig,
    topic_name: str,
    key_column: str = "sport",
):
    """
    Function to write a DataFrame to a Kafka topic
    """
    kafka_df = df.withColumn("value", to_json(struct("*"))).selectExpr(
        f"CAST({key_column} AS STRING) AS key", "CAST(value AS STRING)"
    )

    kafka_df.write.format("kafka").option(
        "kafka.bootstrap.servers", ",".join(kafka_conf.bootstrap_servers)
    ).option("kafka.security.protocol", kafka_conf.security_protocol).option(
        "kafka.sasl.mechanism", kafka_conf.sasl_mechanism
    ).option(
        "kafka.sasl.jaas.config", kafka_conf.jaas_config
    ).option(
        "topic", topic_name
    ).save()


def write_to_mysql(
    df: DataFrame,
    mysql_conf: MySQLConnectionConfig,
    table_name: str,
    database_name: str,
    mode: str = "append",
):
    """
    Function to write a DataFrame to a MySQL table
    """
    df.write.format("jdbc").option("url", mysql_conf.jdbc_url + database_name).option(
        "driver", "com.mysql.cj.jdbc.Driver"
    ).option("dbtable", table_name).option("user", mysql_conf.jdbc_user).option(
        "password", mysql_conf.jdbc_password
    ).mode(
        mode
    ).save()


def write_to_outputs(
    batch_df: DataFrame,
    epoch_id: int,
    kafka_conf: KafkaConnectionConfig,
    mysql_conf: MySQLConnectionConfig,
    kafka_topic: str,
    mysql_table: str,
    mysql_db: str,
):
    """
    Function to write streaming output to both Kafka and MySQL
    """
    write_to_kafka(batch_df, kafka_conf, kafka_topic)
    write_to_mysql(batch_df, mysql_conf, mysql_table, mysql_db)
