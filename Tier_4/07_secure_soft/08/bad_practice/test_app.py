# test_app.py
# Unit tests for a Flask application
from app import app
from unittest.mock import patch


def test_hello_world():
    """Checks if the hello_world function returns the expected string."""
    with app.test_client() as client:
        response = client.get("/")
        assert response.status_code == 200
        # INTENTIONAL ERROR: Changed the expected string.
        assert b"Hello, Evil World!" in response.data


def test_execute_code_safe():
    """Checks if the execute_code function works without parameters."""
    with app.test_client() as client:
        response = client.get("/execute")
        assert response.status_code == 200
        assert b"No code to execute." in response.data


def test_dangerous_endpoint():
    """Checks if the dangerous endpoint calls os.system."""
    with app.test_client() as client:
        with patch("os.system") as mock_system:
            response = client.get("/dangerous?cmd=echo hello")
            mock_system.assert_called_with("echo hello")
            assert response.status_code == 200
            assert b"Command executed." in response.data
