"""Module for finding the k-th smallest element"""

from typing import List
import random


def quick_select(arr: List[int], k: int) -> int:
    """
    Function for finding the k-th smallest element in an unsorted array
    using the Quick Select principle.

    arr: array (list) of numbers of arbitrary length;
    k: index of the k-th smallest element in the array;

    return: k-th smallest element.
    """
    if not 1 <= k <= len(arr):
        return "k is out of bounds"

    def partition(left: int, right: int, pivot_index: int) -> int:
        """
        Function that rearranges the elements between left and right around
        a pivot so that all elements less than the pivot are on the left, and
        all elements greater than or equal to the pivot are on the right.

        left: index of the first element of the array to be rearranged;
        right: index of the last element of the array to be rearranged;
        pivot_index: initial random pivot index;

        return: final index of the pivot after partitioning.
        """
        pivot_value = arr[pivot_index]
        arr[pivot_index], arr[right] = arr[right], arr[pivot_index]
        store_index = left
        for i in range(left, right):
            if arr[i] < pivot_value:
                arr[store_index], arr[i] = arr[i], arr[store_index]
                store_index += 1
        arr[right], arr[store_index] = arr[store_index], arr[right]
        return store_index

    def select(left: int, right: int, k_smallest: int) -> int:
        """
        Recursive function that finds the k-th smallest element.

        left: index of the first element of the array to be searched;
        right: index of the last element of the array to be searched;
        k_smallest: temporary index of the k-th smallest element;

        return: k-th smallest element.
        """
        # 1st base case: only one element in an array
        if left == right:
            return arr[left]

        pivot_index = random.randint(left, right)
        pivot_index = partition(left, right, pivot_index)

        # 2nd base case: pivot itself is the k-th smallest
        if k_smallest == pivot_index:
            return arr[k_smallest]
        
        # Recursive case
        elif k_smallest < pivot_index:
            return select(left, pivot_index - 1, k_smallest)
        else:
            return select(pivot_index + 1, right, k_smallest)

    return select(0, len(arr) - 1, k - 1)


if __name__ == "__main__":
    test_1 = [2, 1, 9, 8, 0, -1, -2]
    print(quick_select(test_1, 5))  # 2

    print(quick_select(test_1, 10))  # k is out of bounds
