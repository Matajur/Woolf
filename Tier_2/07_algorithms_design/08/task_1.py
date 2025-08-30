"""
Module implementing a Rate Limiter using the Sliding Window
algorithm to limit the frequency of chat messages
"""

import random
from typing import Dict
import time
from collections import deque


class SlidingWindowRateLimiter:
    """
    Class implementing a Rate Limiter using the Sliding Window
    algorithm to limit the frequency of chat message
    """

    def __init__(self, window_size: int = 10, max_requests: int = 1):
        self.window_size = window_size
        self.max_requests = max_requests
        self.user_requests: Dict[str, deque] = {}

    def _cleanup_window(self, user_id: str, current_time: float) -> None:
        """
        Method to clean up outdated requests from the window and update
        the active time window.
        """
        if user_id not in self.user_requests:
            return
        window = self.user_requests[user_id]
        # Remove timestamps older than the window size
        while window and current_time - window[0] > self.window_size:
            window.popleft()
        # Delete empty record
        if not window:
            del self.user_requests[user_id]

    def can_send_message(self, user_id: str) -> bool:
        """
        Method to check whether a message can be sent in the current
        time window.
        """
        current_time = time.time()
        self._cleanup_window(user_id, current_time)
        return len(self.user_requests.get(user_id, deque())) < self.max_requests

    def record_message(self, user_id: str) -> bool:
        """
        Method to record a new message and update the user's history.
        """
        current_time = time.time()
        self._cleanup_window(user_id, current_time)
        if self.can_send_message(user_id):
            if user_id not in self.user_requests:
                self.user_requests[user_id] = deque()
            self.user_requests[user_id].append(current_time)
            return True
        return False

    def time_until_next_allowed(self, user_id: str) -> float:
        """
        Method to calculate the waiting time until the next message
        can be sent.
        """
        current_time = time.time()
        self._cleanup_window(user_id, current_time)
        if self.can_send_message(user_id):
            return 0.0
        oldest = self.user_requests[user_id][0]
        return max(0.0, self.window_size - (current_time - oldest))


def test_rate_limiter():
    """
    Function for demonstration of work of the rate limiter
    """
    # Create a rate limiter: 10 second window, 1 message
    limiter = SlidingWindowRateLimiter(window_size=10, max_requests=1)

    # Simulate a flow of messages from users (sequential IDs from 1 to 20)
    print("\n=== Message Flow Simulation ===")
    for message_id in range(1, 11):
        # Simulate different users (ID from 1 to 5)
        user_id = message_id % 5 + 1

        result = limiter.record_message(str(user_id))
        wait_time = limiter.time_until_next_allowed(str(user_id))

        print(
            f"Message {message_id:2d} | User {user_id} | "
            f"{'✓' if result else f'x (waiting {wait_time:.1f}s)'}"
        )

        # Small delay between messages for realism
        # Random delay from 0.1 to 1 second
        time.sleep(random.uniform(0.1, 1.0))

    # Wait until the window clears.
    print("\nWaiting 4 seconds...")
    time.sleep(4)

    print("\n=== New series of messages after waiting ===")
    for message_id in range(11, 21):
        user_id = message_id % 5 + 1
        result = limiter.record_message(str(user_id))
        wait_time = limiter.time_until_next_allowed(str(user_id))
        print(
            f"Message {message_id:2d} | User {user_id} | "
            f"{'✓' if result else f'x (waiting {wait_time:.1f}s)'}"
        )
        # Random delay from 0.1 to 1 second
        time.sleep(random.uniform(0.1, 1.0))


if __name__ == "__main__":
    test_rate_limiter()
