"""Alerts processing module"""

import json
from kafka import KafkaConsumer
from configs import kafka_config

from create_topics import MY_NAME, TOPICS


def safe_json_deserializer(v):
    if v is None:
        return None
    return json.loads(v.decode("utf-8"))


consumer = KafkaConsumer(
    bootstrap_servers=kafka_config["bootstrap_servers"],
    security_protocol=kafka_config["security_protocol"],
    sasl_mechanism=kafka_config["sasl_mechanism"],
    sasl_plain_username=kafka_config["username"],
    sasl_plain_password=kafka_config["password"],
    # value_deserializer=lambda v: json.loads(v.decode("utf-8")),
    # key_deserializer=lambda v: json.loads(v.decode("utf-8")),
    value_deserializer=safe_json_deserializer,
    key_deserializer=safe_json_deserializer,
    auto_offset_reset="earliest",  # Read messages from the beginning
    enable_auto_commit=True,  # Automatic confirmation of read messages
    group_id=f"{MY_NAME}_{TOPICS[1]}_consumer",  # Consumer group identifier
)

# Topic name
TOPIC_NAME = f"{MY_NAME}_{TOPICS[1]}"

# Topic subscription
consumer.subscribe([TOPIC_NAME])

print(f"Listening for alerts: {TOPIC_NAME}")

try:
    # Processing messages from a topic
    for message in consumer:
        if message.value:
            alert = message.value
            print(f"Alert received from {message.topic}: {alert}")

except Exception as e:
    print(f"An error occurred: {e}")
finally:
    consumer.close()  # Closing consumer
