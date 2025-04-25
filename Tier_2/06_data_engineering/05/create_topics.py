"""Module for creating Kafka topics"""

from kafka.admin import KafkaAdminClient, NewTopic
from configs import kafka_config

# Creating a Kafka client
admin_client = KafkaAdminClient(
    bootstrap_servers=kafka_config["bootstrap_servers"],
    security_protocol=kafka_config["security_protocol"],
    sasl_mechanism=kafka_config["sasl_mechanism"],
    sasl_plain_username=kafka_config["username"],
    sasl_plain_password=kafka_config["password"],
)

# Defining new topics
MY_NAME = "matajur"
TOPICS = ["building_sensors", "temperature_alerts", "humidity_alerts"]
NUM_PARTITIONS = 2
REPLICATION_FACTOR = 1

topics = [
    NewTopic(
        name=f"{TOPICS[0]}_{MY_NAME}",
        num_partitions=NUM_PARTITIONS,
        replication_factor=REPLICATION_FACTOR,
    ),
    NewTopic(
        name=f"{TOPICS[1]}_{MY_NAME}",
        num_partitions=NUM_PARTITIONS,
        replication_factor=REPLICATION_FACTOR,
    ),
    NewTopic(
        name=f"{TOPICS[2]}_{MY_NAME}",
        num_partitions=NUM_PARTITIONS,
        replication_factor=REPLICATION_FACTOR,
    ),
]

# Creating a new topic
try:
    admin_client.create_topics(new_topics=topics, validate_only=False)
    print("Topics created successfully.")
except Exception as e:
    print(f"An error occurred: {e}")

# Checking the list of existing topics
[print(topic) for topic in admin_client.list_topics() if MY_NAME in topic]

# Closing the connection with the client
admin_client.close()
