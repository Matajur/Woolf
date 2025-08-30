"""
Module implementing a Rate Limiter using the Throttling
algorithm to limit the frequency of chat messages
"""

import time
from typing import Dict
import random


class ThrottlingRateLimiter:
    """
    Class implementing a Rate Limiter using the Throttling
    algorithm to limit the frequency of chat messages
    """

    def __init__(self, min_interval: float = 10.0):
        self.min_interval = min_interval
        self.last_message_time: Dict[str, float] = {}

    def can_send_message(self, user_id: str) -> bool:
        """
        Method to check the possibility of sending a message based
        on the time of the last message.
        """
        current_time = time.time()
        last_time = self.last_message_time.get(user_id)
        if last_time is None:
            return True
        return current_time - last_time >= self.min_interval

    def record_message(self, user_id: str) -> bool:
        """
        Method to record a new message with the time of the last
        message updated.
        """
        if self.can_send_message(user_id):
            self.last_message_time[user_id] = time.time()
            return True
        return False

    def time_until_next_allowed(self, user_id: str) -> float:
        """
        Method to calculate the time until the next message can be sent.
        """
        current_time = time.time()
        last_time = self.last_message_time.get(user_id)
        if last_time is None:
            return 0.0
        remaining = self.min_interval - (current_time - last_time)
        return max(0.0, remaining)


def test_throttling_limiter():
    """
    Function for demonstration of work of the throttling limiter.
    """
    limiter = ThrottlingRateLimiter(min_interval=10.0)

    print("\n=== Message Flow Simulation (Throttling) ===")
    for message_id in range(1, 11):
        user_id = message_id % 5 + 1

        result = limiter.record_message(str(user_id))
        wait_time = limiter.time_until_next_allowed(str(user_id))

        print(
            f"Message {message_id:2d} | User {user_id} | "
            f"{'✓' if result else f'x (waiting {wait_time:.1f}s)'}"
        )

        # Random delay between messages
        time.sleep(random.uniform(0.1, 1.0))

    print("\nWaiting 10 seconds...")
    time.sleep(10)

    print("\n=== New series of messages after waiting ===")
    for message_id in range(11, 21):
        user_id = message_id % 5 + 1
        result = limiter.record_message(str(user_id))
        wait_time = limiter.time_until_next_allowed(str(user_id))
        print(
            f"Message {message_id:2d} | User {user_id} | "
            f"{'✓' if result else f'x (waiting {wait_time:.1f}s)'}"
        )
        time.sleep(random.uniform(0.1, 1.0))


if __name__ == "__main__":
    test_throttling_limiter()
