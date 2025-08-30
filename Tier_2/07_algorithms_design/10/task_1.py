"""Module for comparison of randomized and deterministic QuickSort"""

import random
import time
from typing import List, Callable

import matplotlib.pyplot as plt


def deterministic_quick_sort(arr: List[int]) -> List[int]:
    """
    Function implementing deterministic QuickSort with the pivot
    in the middle of the array
    """
    # If the array has fewer than two elements, it is already sorted
    if len(arr) < 2:
        return arr

    # Choose aa index for the reference element in the middle of the array
    pivot_index = len(arr) // 2
    pivot = arr[pivot_index]

    # Divide the array into parts
    left = [
        x for i, x in enumerate(arr) if x < pivot or (x == pivot and i != pivot_index)
    ]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]

    # Recursively sort the left and right parts, then merge them
    return deterministic_quick_sort(left) + middle + deterministic_quick_sort(right)


def randomized_quick_sort(arr: List[int]) -> List[int]:
    """
    Function implementing randomized QuickSort
    """
    # If the array has fewer than two elements, it is already sorted
    if len(arr) < 2:
        return arr

    # Choose a random index for the reference element
    pivot_index = random.randint(0, len(arr) - 1)
    pivot = arr[pivot_index]

    # Divide the array into parts
    left = [
        x for i, x in enumerate(arr) if x < pivot or (x == pivot and i != pivot_index)
    ]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]

    # Recursively sort the left and right parts, then merge them
    return randomized_quick_sort(left) + middle + randomized_quick_sort(right)


def measure_time(
    sort_func: Callable[[List[int]], List[int]], arr: List[int], runs: int = 5
) -> float:
    """
    Function to measure average execution time of the QuickSort
    functions over 5 runs
    """
    times = []
    for _ in range(runs):
        arr_copy = arr.copy()
        start = time.time()
        sort_func(arr_copy)
        end = time.time()
        times.append(end - start)
    return sum(times) / runs


if __name__ == "__main__":
    sizes = [10_000, 50_000, 100_000, 500_000]  # Test array sizes
    randomized_times = []
    deterministic_times = []

    for size in sizes:
        test_array = [random.randint(0, 1_000_000) for _ in range(size)]
        deterministic_avg = measure_time(deterministic_quick_sort, test_array)
        randomized_avg = measure_time(randomized_quick_sort, test_array)
        deterministic_times.append(deterministic_avg)
        randomized_times.append(randomized_avg)

    for idx, value in enumerate(sizes):
        print(f"\nArray size: {value}")
        print(f"\tRandomized QuickSort: {randomized_times[idx]:.4f} seconds")
        print(f"\tDeterministic QuickSort: {deterministic_times[idx]:.4f} seconds")

    plt.figure(figsize=(10, 6))
    plt.plot(sizes, randomized_times, marker="o", label="Randomized QuickSort")
    plt.plot(sizes, deterministic_times, marker="s", label="Deterministic QuickSort")
    plt.title("QuickSort Performance Comparison")
    plt.xlabel("Array Size")
    plt.ylabel("Average Execution Time (s)")
    plt.legend()
    plt.grid(True)
    plt.tight_layout()
    plt.show()

    ### See README for conclusion
