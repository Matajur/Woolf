"""Module for optimizing the 3D printing job queue"""

from typing import List, Dict
from dataclasses import dataclass


@dataclass
class PrintJob:
    """
    Dataclass that describes a print job.
    """
    id: str
    volume: float
    priority: int
    print_time: int


@dataclass
class PrinterConstraints:
    """
    Dataclass that describes a printing limitation format.
    """
    max_volume: float
    max_items: int


def optimize_printing(print_jobs: List[Dict], constraints: Dict) -> Dict:
    """
    Optimizes 3D print queue according to printer priorities and constraints

    Args:
        print_jobs: List of print jobs
        constraints: Printer constraints

    Returns:
        Dict with print order and total time
    """
    jobs = [PrintJob(**job) for job in print_jobs]
    constraints = PrinterConstraints(**constraints)
    
    # Sort jobs by priority (lower number means higher priority)
    jobs.sort(key=lambda x: x.priority)
    
    print_order = []
    total_time = 0
    i = 0

    while i < len(jobs):
        current_batch = []
        current_volume = 0
        current_items = 0
        max_time = 0

        j = i
        while j < len(jobs):
            job = jobs[j]
            if (current_volume + job.volume <= constraints.max_volume and
                current_items + 1 <= constraints.max_items):
                current_batch.append(job)
                current_volume += job.volume
                current_items += 1
                max_time = max(max_time, job.print_time)
                j += 1
            else:
                break

        print_order.extend([job.id for job in current_batch])
        total_time += max_time
        i += len(current_batch)

    return {
        "print_order": print_order,
        "total_time": total_time
    }


# Testing
def test_printing_optimization() -> None:
    """
    Function for testing the optimize_printing function.
    """
    # Test 1: Models of equal priority
    test1_jobs = [
        {"id": "M1", "volume": 100, "priority": 1, "print_time": 120},
        {"id": "M2", "volume": 150, "priority": 1, "print_time": 90},
        {"id": "M3", "volume": 120, "priority": 1, "print_time": 150}
    ]

    # Test 2: Models of different priorities
    test2_jobs = [
        {"id": "M1", "volume": 100, "priority": 2, "print_time": 120},  # laboratory
        {"id": "M2", "volume": 150, "priority": 1, "print_time": 90},   # diploma
        {"id": "M3", "volume": 120, "priority": 3, "print_time": 150}   # personal project
    ]

    # Test 3: Exceeding volume limits
    test3_jobs = [
        {"id": "M1", "volume": 250, "priority": 1, "print_time": 180},
        {"id": "M2", "volume": 200, "priority": 1, "print_time": 150},
        {"id": "M3", "volume": 180, "priority": 2, "print_time": 120}
    ]

    constraints = {
        "max_volume": 300,
        "max_items": 2
    }

    print("Test 1 (same priority):")                        # Test 1 (same priority):
    result1 = optimize_printing(test1_jobs, constraints)
    print(f"Printing order: {result1['print_order']}")      # Printing order: ['M1', 'M2', 'M3']
    print(f"Total time: {result1['total_time']} minutes")   # Total time: 270 minutes

    print("\nTest 2 (different priorities):")               # Test 2 (different priorities):
    result2 = optimize_printing(test2_jobs, constraints)
    print(f"Printing order: {result2['print_order']}")      # Printing order: ['M2', 'M1', 'M3']
    print(f"Total time: {result2['total_time']} minutes")   # Total time: 270 minutes

    print("\nTest 3 (exceeding limits):")                   # Test 3 (exceeding limits):
    result3 = optimize_printing(test3_jobs, constraints)
    print(f"Printing order: {result3['print_order']}")      # Printing order: ['M1', 'M2', 'M3']
    print(f"Total time: {result3['total_time']} minutes")   # Total time: 450 minutes

if __name__ == "__main__":
    test_printing_optimization()
