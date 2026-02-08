# test_app.py
import pytest
from app import app
from werkzeug.exceptions import BadRequest


@pytest.fixture
def client():
    """Creates a test client for a Flask application."""
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client


def test_hello_world_route(client):
    """
    Checks if the '/' route works correctly.
    """
    response = client.get("/")
    # Instead of assert, we use if-else to meet Bandit B101 requirements
    if response.status_code != 200:
        raise AssertionError(
            f"Expected status code 200, received{response.status_code}"
        )
    if b"Hello, World!" not in response.data:
        raise AssertionError("Expected text 'Hello, World!' not found.")


def test_execute_route_literal(client):
    """
    Checks if the '/execute' route correctly handles safe literals.
    """
    response = client.get("/execute?code=123")
    if response.status_code != 200:
        raise AssertionError(
            f"Expected status code 200, received {response.status_code}"
        )
    if b"Result of execution: 123" not in response.data:
        raise AssertionError("Expected result 'Result of execution: 123' not found.")


def test_execute_route_invalid_input(client):
    """
    Checks if the '/execute' route correctly handles unsafe expressions.
    """
    response = client.get("/execute?code=1+1")
    if response.status_code != 200:
        raise AssertionError(
            f"Expected status code 200, received {response.status_code}"
        )
    if b"Error: Invalid input. Only literal values allowed." not in response.data:
        raise AssertionError("Expected error message not found.")
