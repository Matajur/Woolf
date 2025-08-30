"""Test module"""

from pytest import fixture
from pyspark.sql import SparkSession, DataFrame
from pyspark.sql.types import StructType, StringType, StructField, IntegerType

from final_project.config.spark import get_spark_session


@fixture
def spark_session() -> SparkSession:
    """
    Function for creating test session
    """
    return get_spark_session(
        app_name="unit_test_for_final_project", spark_master="local"
    )


@fixture
def test_input_data(spark_session: SparkSession) -> DataFrame:
    """
    Fixture to create test athlete data
    """
    return spark_session.createDataFrame(
        [
            (1, "Alice", "F", "1990-01-01", "170", "60", "USA", "USA", "desc", "notes"),
            (2, "Bob", "M", "1985-05-23", "180", "80", "CAN", "CAN", "desc", "notes"),
        ],
        schema=StructType(
            [
                StructField("athlete_id", IntegerType(), True),
                StructField("name", StringType(), True),
                StructField("sex", StringType(), True),
                StructField("born", StringType(), True),
                StructField("height", StringType(), True),
                StructField("weight", StringType(), True),
                StructField("country", StringType(), True),
                StructField("country_noc", StringType(), True),
                StructField("description", StringType(), True),
                StructField("special_notes", StringType(), True),
            ]
        ),
    )
