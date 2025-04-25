"""Sensor log processing module"""

import os
from pyspark.sql import SparkSession
from pyspark.sql.functions import from_json, col, window, avg, from_unixtime
from pyspark.sql.types import StructType, StructField, StringType, DoubleType

from configs import kafka_config
from create_topics import MY_NAME, TOPICS

USERNAME = kafka_config["username"]
PASSWORD = kafka_config["password"]

# Package required to read Kafka from Spark
os.environ["PYSPARK_SUBMIT_ARGS"] = (
    "--packages org.apache.spark:spark-streaming-kafka-0-10_2.12:3.5.1,org.apache.spark:spark-sql-kafka-0-10_2.12:3.5.1 pyspark-shell"
)

# Creating a SparkSession
spark = (
    SparkSession.builder.appName("SensorAlertProcessor")
    .master("local[*]")
    .getOrCreate()
)

# Read alert conditions and broadcast them to spark df
broadcast_alerts = spark.read.csv(
    "./data/alerts_conditions.csv", header=True, inferSchema=True
).cache()

# Reading a data stream from Kafka
df = (
    spark.readStream.format("kafka")
    .option("kafka.bootstrap.servers", kafka_config["bootstrap_servers"][0])
    .option("kafka.security.protocol", kafka_config["security_protocol"])
    .option("kafka.sasl.mechanism", kafka_config["sasl_mechanism"])
    .option(
        "kafka.sasl.jaas.config",
        f"org.apache.kafka.common.security.plain.PlainLoginModule required username={USERNAME} password={PASSWORD};",
    )
    .option("subscribe", f"{MY_NAME}_{TOPICS[0]}")
    .option("startingOffsets", "earliest")
    .option("maxOffsetsPerTrigger", "5")  # read 5 records per 1 trigger
    .load()
)

# Schema definition for JSON
json_schema = StructType(
    [
        StructField("sensor_id", StringType(), True),
        StructField("timestamp", DoubleType(), True),
        StructField("temperature", DoubleType(), True),
        StructField("humidity", DoubleType(), True),
    ]
)

# Data manipulation
clean_df = (
    df.selectExpr(
        "CAST(key AS STRING) AS key_deserialized",
        "CAST(value AS STRING) AS value_deserialized",
        "*",
    )
    .drop("key", "value")
    .withColumnRenamed("key_deserialized", "key")
    .withColumn("value_json", from_json(col("value_deserialized"), json_schema))
    .withColumn("sensor_id", col("value_json.sensor_id"))
    .withColumn(
        "timestamp",
        from_unixtime(col("value_json.timestamp").cast(DoubleType())).cast("timestamp"),
    )
    .withColumn("temperature", col("value_json.temperature"))
    .withColumn("humidity", col("value_json.humidity"))
    .drop("value_json", "value_deserialized")
)

# clean_df.writeStream.outputMode("append").format("console").start()

# Sliding window aggregation
windowed_avg = (
    clean_df.withWatermark("timestamp", "10 seconds")
    .groupBy(window(col("timestamp"), "1 minute", "30 seconds"))
    .agg(avg("temperature").alias("t_avg"), avg("humidity").alias("h_avg"))
)

# Displaying data on the screen
displaying_df = windowed_avg.writeStream.outputMode("append").format("console").start()

# Checking allert conditions with cross join
joined_df = windowed_avg.crossJoin(broadcast_alerts).filter(
    (
        (col("temperature_min") <= col("t_avg"))
        & (col("t_avg") <= col("temperature_max"))
    )
    | ((col("humidity_min") <= col("h_avg")) & (col("h_avg") <= col("humidity_max")))
)

# Alert message
alerts = joined_df.selectExpr(
    "to_json(named_struct("
    + "'window', named_struct('start', window.start, 'end', window.end), "
    + "'t_avg', t_avg, 'h_avg', h_avg, "
    + "'code', code, 'message', message, "
    + "'timestamp', current_timestamp()"
    + ")) AS value"
)

# Write to Kafka
query = (
    alerts.writeStream.trigger(processingTime="5 seconds")
    .format("kafka")
    .option("kafka.bootstrap.servers", kafka_config["bootstrap_servers"][0])
    .option("checkpointLocation", "./checkpoint") # log to file
    .option("topic", f"{MY_NAME}_{TOPICS[1]}")
    .option("kafka.security.protocol", kafka_config["security_protocol"])
    .option("kafka.sasl.mechanism", kafka_config["sasl_mechanism"])
    .option(
        "kafka.sasl.jaas.config",
        f"org.apache.kafka.common.security.plain.PlainLoginModule required username={USERNAME} password={PASSWORD};",
    )
    .start()
    .awaitTermination()
)
