"""Module for finding maximum and minimum elements"""

from typing import List, Tuple


def find_min_max(arr: List[int], low: int = 0, high: int = None) -> Tuple[int, int]:
    """
    Recursive function for finding maximum and minimum elements in an array.

    arr: array (list) of numbers of arbitrary length;
    low: index of the minimum element in the array;
    hign: index of the maximum element in the array;

    return: tuple with min amd max elements.
    """
    if high is None:
        if not arr:
            return "Array must contain at least one element"
        high = len(arr) - 1

    # 1st base case: only one element in an array
    if low == high:
        return arr[low], arr[high]

    # 2nd base case: two elements
    if high == low + 1:
        if arr[low] < arr[high]:
            return arr[low], arr[high]
        else:
            return arr[high], arr[low]

    # Recursive case: divide the array
    mid = (low + high) // 2
    left_min, left_max = find_min_max(arr, low, mid)
    right_min, right_max = find_min_max(arr, mid + 1, high)

    return min(left_min, right_min), max(left_max, right_max)


if __name__ == "__main__":
    test_1 = [2, 1, 9, 8, 0, -1, -2]
    print(find_min_max(test_1))  # (-2, 9)

    test_2 = [2]
    print(find_min_max(test_2))  # (2, 2)

    test_3 = []
    print(find_min_max(test_3))  # (Array must contain at least one element)
