"""Sensor log processing module"""

import json
import uuid
from kafka import KafkaConsumer, KafkaProducer
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
    group_id=f"{TOPICS[0]}_{MY_NAME}_consumer",  # Consumer group identifier
)

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

# Topic subscription
consumer.subscribe([TOPIC_NAME])

print(f"Subscribed to topic '{TOPIC_NAME}'")

try:
    # Processing messages from a topic
    for message in consumer:
        print(
            f"Received message: {message.value}, key: {message.key}, partition {message.partition}"
        )
        data = message.value

        if data["temperature"] > 40:
            alert = {
                "sensor_id": data["sensor_id"],
                "timestamp": data["timestamp"],
                "temperature": data["temperature"],
                "message": "Temperature exceeds threshold!",
            }
            producer.send(f"{TOPICS[1]}_{MY_NAME}", key=str(uuid.uuid4()), value=alert)
            print(f"Temperature Alert Sent: {alert}")

        if data["humidity"] > 80 or data["humidity"] < 20:
            alert = {
                "sensor_id": data["sensor_id"],
                "timestamp": data["timestamp"],
                "humidity": data["humidity"],
                "message": "Humidity out of range!",
            }
            producer.send(f"{TOPICS[2]}_{MY_NAME}", key=str(uuid.uuid4()), value=alert)
            print(f"Humidity Alert Sent: {alert}")

except Exception as e:
    print(f"An error occurred: {e}")
finally:
    consumer.close()  # Closing consumer
