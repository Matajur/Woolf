"""
Module for performing pre-training checks on inputs or metadata.
"""

import json


def lambda_handler(event: dict, context) -> dict:
    """
    Function for validating incoming data.

    :param event: Description
    :type event: dict
    :param context: Description
    :return: Description
    :rtype: dict
    """
    print("Validating data...")
    print("Incoming event:", json.dumps(event))

    source = event.get("source", "unknown")
    commit = event.get("commit", "unknown")

    # Simulation of the force validation failure
    if event.get("fail_validation") is True:
        raise ValueError("Validation failed")

    result = {
        "validated": True,
        "source": source,
        "commit": commit,
        "notes": "Validation OK",
    }

    print("Validation result:", json.dumps(result))
    return {**event, **result}
