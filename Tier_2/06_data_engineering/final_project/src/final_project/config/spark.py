"""Module for creating Apache Spark session"""

from pyspark.sql import SparkSession

SPARK_JARS: list[str] = [
    "org.apache.spark:spark-streaming-kafka-0-10_2.12:3.5.1",
    "org.apache.spark:spark-sql-kafka-0-10_2.12:3.5.1",
    "com.mysql:mysql-connector-j:8.0.32",  # MySQL JDBC driver for Spark.
]


def get_spark_session(app_name: str, spark_master: str = "local[*]") -> SparkSession:
    """
    Function for creating Apache Spark session, which is the main entry point for
    the Spark SQL API

    app_name: name of the session
    spark_master: host name
    return: SparkSession object
    """
    spark: SparkSession = (
        SparkSession.builder.master(spark_master)
        .config("spark.jars.packages", ",".join(SPARK_JARS))
        .appName(app_name)
        .getOrCreate()
    )
    return spark
