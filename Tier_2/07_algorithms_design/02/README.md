# Tier 2. Module 7 - Design and Analysis of Algorithms

## Lesson 02. Homework - Greedy algorithms and dynamic programming

### Task 1 - Optimizing the 3D printer queue in a university laboratory

Develop a program to optimize the queue of 3D printing jobs, taking into account priorities and printer technical limitations, using a greedy algorithm.

#### Task description

1. Use input data in the form of a list of print jobs, where each job contains: ID, model volume, priority and print time.

2. Implement the main function `optimize_printing`, which will:

- Consider job priorities.
- Group models for simultaneous printing.
- Check volume and quantity limitations.
- Calculate the total print time.
- Return the optimal print order.

3. Output the optimal print order and the total execution time of all jobs.

### Specifications

1. Expected output format of the `optimize_printing` function:

```Python
{
    "print_order": ["M1", "M2", "M3"],  # print job order
    "total_time": 360  # total time in minutes
}
```

2. Input data format for tasks:

```Python
print_jobs = [
    {
        "id": str,  # unique identifier
        "volume": float,  # volume in cm³ (> 0)
        "priority": int,  # priority (1, 2 or 3)
        "print_time": int  # print time in minutes (> 0)
    }
]
```

3. Printer Limitation Format:

```Python
printer_constraints = {
    "max_volume": float,  # мmaximum print volume
    "max_items": int  # maximum number of models
}
```

4. Assignment Priorities:

- 1 (highest) — Coursework/Thesis
- 2 (medium) — Laboratory Work
- 3 (lowest) — Personal Projects

#### Acceptance criteria

1. The program groups models for simultaneous printing, without exceeding the limit.
2. Tasks with higher priority are executed earlier.
3. The printing time of a group of models is calculated as the maximum time among the models in the group.
4. The program handles all test scenarios:

- tasks of the same priority,
- tasks of different priorities,
- printer limits exceeded.

5. The code uses `dataclass` for data structures.

#### Program template

```Python
from typing import List, Dict
from dataclasses import dataclass

@dataclass
class PrintJob:
    id: str
    volume: float
    priority: int
    print_time: int

@dataclass
class PrinterConstraints:
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
    # Your code should be here

    return {
        "print_order": None,
        "total_time": None
    }

# Testing
def test_printing_optimization():
    # Test 1: Models of equal priority
    test1_jobs = [
        {"id": "M1", "volume": 100, "priority": 1, "print_time": 120},
        {"id": "M2", "volume": 150, "priority": 1, "print_time": 90},
        {"id": "M3", "volume": 120, "priority": 1, "print_time": 150}
    ]

    # Test 2: Models of different priorities
    test2_jobs = [
        {"id": "M1", "volume": 100, "priority": 2, "print_time": 120},  # laboratory
        {"id": "M2", "volume": 150, "priority": 1, "print_time": 90},  # diploma
        {"id": "M3", "volume": 120, "priority": 3, "print_time": 150}  # personal project
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

    print("Test 1 (same priority):")
    result1 = optimize_printing(test1_jobs, constraints)
    print(f"Printing order: {result1['print_order']}")
    print(f"Total time: {result1['total_time']} minutes")

    print("\\nTest 2 (different priorities):")
    result2 = optimize_printing(test2_jobs, constraints)
    print(f"Printing order: {result2['print_order']}")
    print(f"Total time: {result2['total_time']} minutes")

    print("\\nTest 3 (exceeding limits):")
    result3 = optimize_printing(test3_jobs, constraints)
    print(f"Printing order: {result3['print_order']}")
    print(f"Total time: {result3['total_time']} minutes")

if __name__ == "__main__":
    test_printing_optimization()
```

#### Expected result:

```
Test 1 (same priority):
Printing order: ['M1', 'M2', 'M3']
Total time: 270 minutes

Test 2 (different priorities):
Printing order: ['M2', 'M1', 'M3']
Total time: 270 minutes

Test 3 (exceeding limits):
Printing order: ['M1', 'M2', 'M3']
Total time: 450 minutes
```

### Task 2 - Optimal rod cutting for maximum profit (Rod Cutting Problem)

Develop a program to find the optimal way to cut a rod to maximize profit. Two approaches must be implemented: through recursion with memoization and through tabulation.

#### Task description

1. The input is the length of the rod and an array of prices, where `price[i]` is the price of a rod of length `i+1`.
2. It is necessary to determine how to cut the rod to maximize profit.
3. Implement both dynamic programming approaches.
4. Output the optimal cutting method and the maximum profit.

#### Specifications

1. Input data format:

```Python
length = 5 # rod length
prices = [2, 5, 7, 8, 10] # prices for lengths 1, 2, 3, 4, 5
```

2. Constraints:

- Bar length > 0.
- All prices > 0.
- Price array cannot be empty.
- The length of the price array must match the bar length.

#### Acceptance Criteria

1. The program implements two methods (10 points for each method):

```Python
def rod_cutting_memo(length: int, prices: List[int]) -> Dict:
    """
    Finds the optimal way to cut through memoization
    """
    pass

def rod_cutting_table(length: int, prices: List[int]) -> Dict:
    """
    Finds the optimal way to cut through tab stops
    """
    pass
```

2. Each method returns a dictionary:

- Maximum profit.
- List of segment lengths.
- Total number of segments.

#### Expected output format

```Python
{
    "max_profit": 12, # maximum profit
    "cuts": [2, 2, 1], # list of part lengths
    "number_of_cuts": 2 # number of cuts
}
```

#### Program template:

```Python
from typing import List, Dict

def rod_cutting_memo(length: int, prices: List[int]) -> Dict:
    """
    Finds the optimal way to cut using memoization

    Args:
        length: length of the rod
        prices: list of prices, where prices[i] is the price of the rod of length i+1

    Returns:
        Dict with maximum profit and list of cuts
    """

		# Your code should be here

    return {
        "max_profit": None,
        "cuts": None,
        "number_of_cuts": None
    }

def rod_cutting_table(length: int, prices: List[int]) -> Dict:
    """
    Finds the optimal way to cut through tabulation

    Args:
        length: length of the rod
        prices: list of prices, where prices[i] is the price of the rod of length i+1

    Returns:
        Dict with maximum profit and list of cuts
    """

    # Your code should be here

    return {
        "max_profit": None,
        "cuts": None,
        "number_of_cuts": None
    }

def run_tests():
    """Function to run all tests"""
    test_cases = [
        # Test 1: Base case
        {
            "length": 5,
            "prices": [2, 5, 7, 8, 10],
            "name": "Base case"
        },
        # Test 2: Optimally not to cut
        {
            "length": 3,
            "prices": [1, 3, 8],
            "name": "Optimally not to cut"
        },
        # Test 3: Even cuts
        {
            "length": 4,
            "prices": [3, 5, 6, 7],
            "name": "Even cuts"
        }
    ]

    for test in test_cases:
        print(f"\\nTest: {test['name']}")
        print(f"Rod length: {test['length']}")
        print(f"Prices: {test['prices']}")

        # Testing memoization
        memo_result = rod_cutting_memo(test['length'], test['prices'])
        print("\\nMemoization result:")
        print(f"Maximum profit: {memo_result['max_profit']}")
        print(f"Cuts: {memo_result['cuts']}")
        print(f"Number of cuts: {memo_result['number_of_cuts']}")

        # Testing tabulation
        table_result = rod_cutting_table(test['length'], test['prices'])
        print("\\nTabulation result:")
        print(f"Maximum profit: {table_result['max_profit']}")
        print(f"Cuts: {table_result['cuts']}")
        print(f"Number of cuts: {table_result['number_of_cuts']}")

        print("\\nThe verification was successful!")

if __name__ == "__main__":
    run_tests()
```

#### Expected result:

```
Test: Base case
Rod length: 5
Prices: [2, 5, 7, 8, 10]

Memoization result:
Maximum profit: 12
Cuts: [1, 2, 2]
Number of cuts: 2

Tabulation result:
Maximum profit: 12
Cuts: [2, 2, 1]
Number of cuts: 2

The verification was successful!

Test: Optimally not to cut
Rod length: 3
Prices: [1, 3, 8]

Memoization result:
Maximum profit: 8
Cuts: [3]
Number of cuts: 0

Tabulation result:
Maximum profit: 8
Cuts: [3]
Number of cuts: 0

The verification was successful!

Test: Even cuts
Rod length: 4
Prices: [3, 5, 6, 7]

Memoization result:
Maximum profit: 12
Cuts: [1, 1, 1, 1]
Number of cuts: 3

Tabulation result:
Maximum profit: 12
Cuts: [1, 1, 1, 1]
Number of cuts: 3

The verification was successful!
```
