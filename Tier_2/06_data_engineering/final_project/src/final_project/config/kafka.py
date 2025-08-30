"""Module for creating Kafka connection configuration"""

import os
from dataclasses import dataclass

from dotenv import load_dotenv


@dataclass
class KafkaConnectionConfig:
    """
    Class for storing Kafka connection config
    """

    bootstrap_servers: list[str] | None
    username: str | None
    password: str | None
    security_protocol: str | None
    sasl_mechanism: str | None
    jaas_config: str | None


def get_kafka_connection_config() -> KafkaConnectionConfig:
    """
    Function for creating Kafka connection

    return: Kafka connection configuration
    """
    load_dotenv()

    # bootstrap_servers = ast.literal_eval(str(os.getenv("BOOTSTRAP_SERVERS")))
    bootstrap_servers_str = os.getenv("BOOTSTRAP_SERVERS")
    if bootstrap_servers_str is None:
        raise AttributeError("Missing BOOTSTRAP_SERVERS in .env file!")

    bootstrap_servers = bootstrap_servers_str.split(",")

    username = os.getenv("USERNAME")
    password = os.getenv("PASSWORD")
    security_protocol = os.getenv("SECURITY_PROTOCOL")
    sasl_mechanism = os.getenv("SASL_MECHANISM")
    jaas_config = os.getenv("JAAS_CONFIG")

    if not all(
        [
            bootstrap_servers,
            username,
            password,
            security_protocol,
            sasl_mechanism,
            jaas_config,
        ]
    ):
        raise AttributeError(
            "You must provide valid config values for Kafka connection!"
        )

    config: KafkaConnectionConfig = KafkaConnectionConfig(
        bootstrap_servers=bootstrap_servers,
        username=username,
        password=password,
        security_protocol=security_protocol,
        sasl_mechanism=sasl_mechanism,
        jaas_config=jaas_config,
    )

    return config
