# app.py
# A simple Flask web application for demonstration purposes
# A potential vulnerability for SAST validation is included
import os
from flask import Flask, request

app = Flask(__name__)


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


@app.route("/execute")
def execute_code():
    """
    This function is intentionally vulnerable.
    It executes code passed as a parameter 'code' in the URL.
    SAST scanner should detect this.
    """
    code = request.args.get("code")
    if code:
        # Warning: Do not use eval() in real applications!
        # This is a serious security threat.
        try:
            import ast

            result = ast.literal_eval(code)
            return f"<p>Result of execution: {result}</p>"
        except (ValueError, SyntaxError):
            return "Error: Invalid input. Only literal values allowed."
    return "<p>No code to execute.</p>"


if __name__ == "__main__":
    # Added for DAST validation
    app.run(host="0.0.0.0", port=5000)
