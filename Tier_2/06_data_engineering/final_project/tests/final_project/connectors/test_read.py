"""Module for testing read operations from MySQL DB and Kafka"""

import pytest
from pyspark.sql import SparkSession, DataFrame
from pyspark.sql.readwriter import DataFrameReader
from chispa import assert_df_equality
from pytest_mock import MockerFixture

from final_project.connectors.read import read_mysql_data
from final_project.connectors.read import read_kafka_data
from final_project.config.kafka import KafkaConnectionConfig


def test_read_mysql_data(
    spark_session: SparkSession,
    test_athlete_data: DataFrame,
    mocker: MockerFixture,
):
    """
    Test for read_mysql_data function to ensure correct reading and filtering
    """
    # Setup a fake DataFrameReader
    fake_reader = mocker.MagicMock(name="FakeDataFrameReader")
    fake_reader.format.return_value = fake_reader
    fake_reader.options.return_value = fake_reader
    fake_reader.load.return_value = test_athlete_data
    fake_reader.jdbc.return_value = test_athlete_data

    # Patch DataFrameReader
    mocker.patch.object(DataFrameReader, "format", return_value=fake_reader)
    mocker.patch.object(DataFrameReader, "jdbc", return_value=test_athlete_data)

    # Mock config
    mysql_conf = mocker.MagicMock()
    mysql_conf.jdbc_url = "jdbc:mysql://dummy:3306/"
    mysql_conf.jdbc_user = "u"
    mysql_conf.jdbc_password = "p"

    # Run the function
    result = read_mysql_data(
        spark=spark_session,
        mysql_conf=mysql_conf,
        table_name="test",
        database_name="test",
    )

    # Validate
    assert_df_equality(result, test_athlete_data)

    # Check method calls
    fake_reader.options.assert_called_once_with(
        dbtable="test",
        driver="com.mysql.cj.jdbc.Driver",
        password="p",
        url="jdbc:mysql://dummy:3306/test",
        user="u",
    )
    fake_reader.load.assert_called_once()


@pytest.fixture
def kafka_conf() -> KafkaConnectionConfig:
    """
    Dummy Kafka config for testing
    """
    return KafkaConnectionConfig(
        bootstrap_servers=["localhost:9092"],
        security_protocol="PLAINTEXT",
        sasl_mechanism="PLAIN",
        jaas_config="",
    )


def test_read_kafka_data(
    spark_session: SparkSession,
    kafka_conf: KafkaConnectionConfig,
    mocker: MockerFixture,
):
    """
    Test for reading from Kafka without a real Kafka server.
    """

    # Prepare fake streaming dataframe
    test_df = spark_session.createDataFrame(
        [
            ("key1", "value1", "topic1", 0, 1, "2025-04-27 12:00:00", 0),
            ("key2", "value2", "topic1", 0, 2, "2025-04-27 12:01:00", 0),
        ],
        schema="key STRING, value STRING, topic STRING, partition INT, offset LONG, timestamp STRING, timestampType INT",
    )

    # Patch the readStream.format('kafka')
    fake_reader = mocker.MagicMock(name="FakeStreamingDataFrameReader")
    fake_reader.format.return_value = fake_reader
    fake_reader.option.return_value = fake_reader
    fake_reader.load.return_value = test_df

    mocker.patch.object(spark_session, "readStream", return_value=fake_reader)

    # Call the function
    result_df = read_kafka_data(
        kafka_conf=kafka_conf,
        topic_name="athlete_event_results",
        spark=spark_session,
    )

    # Validate
    assert isinstance(result_df, DataFrame)
    assert set(result_df.columns) == {"value"}
