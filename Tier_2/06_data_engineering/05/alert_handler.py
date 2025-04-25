"""Alerts processing module"""

import json
from kafka import KafkaConsumer
from configs import kafka_config

from create_topics import MY_NAME, TOPICS

consumer = KafkaConsumer(
    bootstrap_servers=kafka_config["bootstrap_servers"],
    security_protocol=kafka_config["security_protocol"],
    sasl_mechanism=kafka_config["sasl_mechanism"],
    sasl_plain_username=kafka_config["username"],
    sasl_plain_password=kafka_config["password"],
    value_deserializer=lambda v: json.loads(v.decode("utf-8")),
    key_deserializer=lambda v: json.loads(v.decode("utf-8")),
    auto_offset_reset="earliest",  # Read messages from the beginning
    enable_auto_commit=True,  # Automatic confirmation of read messages
    group_id=f"{TOPICS[1]}_{TOPICS[2]}_{MY_NAME}_consumer",  # Consumer group identifier
)

# Topic name
TOPIC_NAME_1 = f"{TOPICS[1]}_{MY_NAME}"
TOPIC_NAME_2 = f"{TOPICS[2]}_{MY_NAME}"

# Topic subscription
consumer.subscribe([TOPIC_NAME_1, TOPIC_NAME_2])

print(f"Listening for alerts: {TOPICS[1]} and {TOPICS[2]}")

try:
    # Processing messages from a topic
    for message in consumer:
        alert = message.value
        print(f"Alert received from {message.topic}: {alert}")

except Exception as e:
    print(f"An error occurred: {e}")
finally:
    consumer.close()  # Closing consumer
