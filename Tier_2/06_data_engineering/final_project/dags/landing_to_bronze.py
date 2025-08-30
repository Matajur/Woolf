"""Module for uploading data from ftp-server"""

import os
import requests
from pyspark.sql import SparkSession, DataFrame


def download_data(file: str) -> None:
    """
    Function to download data from ftp server into csv file
    """
    url = f"https://ftp.goit.study/neoversity/{file}.csv"
    print(f"Downloading from {url}")
    response = requests.get(url, timeout=30)

    if response.status_code == 200:
        with open(f"{file}.csv", "wb") as f:
            f.write(response.content)
        print(f"File {file}.csv downloaded successfully.")
    else:
        raise ConnectionError(
            f"Failed to download {file}. Status code: {response.status_code}"
        )


def process_table(table: str) -> None:
    """
    Function to load and save data to a bronze folder in parquet format
    """
    spark: SparkSession = SparkSession.builder.appName("LandingToBronze").getOrCreate()

    local_path: str = f"{table}.csv"
    output_path: str = f"/tmp/bronze/{table}"

    df: DataFrame = spark.read.csv(local_path, header=True, inferSchema=True)
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
        download_data(table)
        process_table(table)


if __name__ == "__main__":
    main()
