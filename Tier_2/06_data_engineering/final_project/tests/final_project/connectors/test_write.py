"""Test module for Kafka write operations"""

import pytest
from pyspark.sql import SparkSession, DataFrame
from final_project.connectors.write import write_to_kafka
from final_project.config.kafka import KafkaConnectionConfig


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


def test_write_to_kafka(
    spark_session: SparkSession,
    test_athlete_data: DataFrame,
    kafka_conf: KafkaConnectionConfig,
):
    """
    Basic test for write_to_kafka structure
    """
    try:
        write_to_kafka(
            df=test_athlete_data,
            kafka_conf=kafka_conf,
            topic_name="test_topic",
            key_column="name",  # using 'name' as key
        )
    except Exception as e:
        pytest.fail(f"write_to_kafka raised an exception: {e}")
