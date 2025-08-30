"""Module for converting data from bronze layer to silver"""

import os
import re
from pyspark.sql import SparkSession, DataFrame
from pyspark.sql.functions import col, trim, lower, udf
from pyspark.sql.types import StringType


def clean_text(text: str) -> str:
    """
    Text cleaning function
    """
    return re.sub(r"[^a-zA-Z0-9,.\"\']", "", str(text))


clean_text_udf = udf(clean_text, StringType())


def clean_text_columns(df: DataFrame) -> DataFrame:
    """
    Function for cleaning of the string type columns
    """
    for column in df.columns:
        if df.schema[column].dataType == StringType():
            df = df.withColumn(column, clean_text_udf(trim(lower(col(column)))))
    return df


def process_table(table: str) -> None:
    """
    Function of loading, processing and saving data to the silver folder
    """
    spark: SparkSession = SparkSession.builder.appName("BronzeToSilver").getOrCreate()

    input_path: str = f"/tmp/bronze/{table}"
    df: DataFrame = spark.read.parquet(input_path)

    df = clean_text_columns(df)
    df = df.dropDuplicates()

    output_path: str = f"/tmp/silver/{table}"
    os.makedirs(output_path, exist_ok=True)
    df.write.mode("overwrite").parquet(output_path)

    print(f"Data saved to {output_path}")

    df: DataFrame = spark.read.parquet(output_path)
    df.show(truncate=False)

    spark.stop()


def main() -> None:
    """
    Main entry point of the application
    """
    tables = ["athlete_bio", "athlete_event_results"]
    for table in tables:
        process_table(table)


if __name__ == "__main__":
    main()
