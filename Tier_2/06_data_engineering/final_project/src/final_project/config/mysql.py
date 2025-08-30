"""Module for creating MySQL connection configuration"""

import os
from dataclasses import dataclass

from dotenv import load_dotenv


@dataclass
class MySQLConnectionConfig:
    """
    Class for storing MySQL connection config
    """

    jdbc_url: str
    jdbc_user: str
    jdbc_password: str


def get_mysql_connection_config() -> MySQLConnectionConfig:
    """
    Function for creating MySQL connection

    return: MySQL connection configuration
    """
    load_dotenv()

    jdbc_url = os.getenv("JDBC_URL")
    jdbc_user = os.getenv("JDBC_USER")
    jdbc_password = os.getenv("JDBC_PASSWORD")

    if not all([jdbc_url, jdbc_user, jdbc_password]):
        raise AttributeError(
            "You must provide valid config values for MySQL connection!"
        )

    config: MySQLConnectionConfig = MySQLConnectionConfig(
        jdbc_url=jdbc_url,
        jdbc_user=jdbc_user,
        jdbc_password=jdbc_password,
    )

    return config
