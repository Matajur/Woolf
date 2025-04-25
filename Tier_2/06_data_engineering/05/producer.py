"""Sensor log simulation module"""

import json
import uuid
import time
import random
from kafka import KafkaProducer
from configs import kafka_config

from create_topics import MY_NAME, TOPICS

SENSOR_ID = str(random.randint(1000, 9999))

# Creating a Kafka Producer
producer = KafkaProducer(
    bootstrap_servers=kafka_config["bootstrap_servers"],
    security_protocol=kafka_config["security_protocol"],
    sasl_mechanism=kafka_config["sasl_mechanism"],
    sasl_plain_username=kafka_config["username"],
    sasl_plain_password=kafka_config["password"],
    value_serializer=lambda v: json.dumps(v).encode("utf-8"),
    key_serializer=lambda v: json.dumps(v).encode("utf-8"),
)

# Topic name
TOPIC_NAME = f"{TOPICS[0]}_{MY_NAME}"

while True:
    count = 0
    # Sending a message to a topic
    try:
        data = {
            "sensor_id": SENSOR_ID,
            "timestamp": time.time(),
            "temperature": random.uniform(25, 45),
            "humidity": random.uniform(15, 85),
        }

        producer.send(TOPIC_NAME, key=str(uuid.uuid4()), value=data)
        producer.flush()  # Waiting for all messages to be sent
        print(f"Message {count} containing '{data}' was sent successfully.")
        time.sleep(2)
    except Exception as e:
        print(f"An error occurred: {e}")
    finally:
        count += 1
