"""Module for data access optimization using LRU cache"""

import copy
import random
import time
from collections import OrderedDict
from typing import List, Tuple
from functools import lru_cache

N = 100_000  # arrey size
Q = 50_000  # number queries
K = 1000  # cache size


class LRUCache:
    """
    LRU cache implementation using built-in OrderedDict which implements
    the logic of a doubly linked list to maintain the insertion order of
    items efficiently.
    """

    def __init__(self, capacity: int):
        """
        Initializing the LRU cache as an OrderedDict with a given capacity.
        """
        self.cache = OrderedDict()
        self.capacity = capacity

    def get(self, key: Tuple[int, int]):
        """
        Method to get a value from the OrderedDict by key, if present.
        """
        if key in self.cache:
            self.cache.move_to_end(key)
            return self.cache[key]
        return None

    def put(self, key: Tuple[int, int], value: int):
        """
        Method for storing a value in the cache by key.
        """
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.capacity:
            self.cache.popitem(last=False)

    def invalidate_range(self, index: int):
        """
        Method to remove all irrelevant values from the cache.
        """
        keys_to_remove = [k for k in self.cache if k[0] <= index <= k[1]]
        for k in keys_to_remove:
            del self.cache[k]

    def clear(self):
        """
        Method for completely clearing OrderedDict.
        """
        self.cache.clear()


custom_lru_cache = LRUCache(K)


def range_sum_no_cache(array: List[int], L: int, R: int) -> int:
    """
    The function to calculate the sum of the elements of the array in
    the range from `L` to `R` inclusive without using the cache.
    """
    return sum(array[L : R + 1])


def update_no_cache(array: List[int], index: int, value: int) -> None:
    """
    The function to update the value of the array element at the
    specified index without using the cache.
    """
    array[index] = value


def range_sum_with_cache(array: List[int], L: int, R: int) -> int:
    """
    The function to calculate the sum of the elements of the array in
    the range from `L` to `R` inclusive using the LRU cache.
    """
    cached = custom_lru_cache.get((L, R))
    if cached:
        return cached
    result = sum(array[L : R + 1])
    custom_lru_cache.put((L, R), result)
    return result


def update_with_cache(array: List[int], index: int, value: int) -> None:
    """
    The function to update the value of the array element at the specified
    index and remove all corresponding values from the cache that have
    become irrelevant due to a change in the array.
    """
    array[index] = value
    custom_lru_cache.invalidate_range(index)


@lru_cache(maxsize=1000)
def range_sum_functools_cached(subrange: Tuple[int, ...]) -> int:
    """
    The function to calculate the sum of the elements of the array in
    the range from `L` to `R` inclusive using the LRU cache from functools.
    """
    return sum(subrange)


def range_sum_with_functools(array: List[int], L: int, R: int) -> int:
    """
    The function to calculate the sum of the elements of the array in
    the range from `L` to `R` inclusive using the LRU cache from functools.
    """
    # Slice, convert to tuple (because lists are unhashable)
    return range_sum_functools_cached(tuple(array[L : R + 1]))


def update_with_functools(array: List[int], index: int, value: int) -> None:
    """
    The function to update the value of the array element at the specified
    index and remove all corresponding values from the functools cache that
    have become irrelevant due to a change in the array.
    """
    array[index] = value
    range_sum_functools_cached.cache_clear()


if __name__ == "__main__":
    random_array = [random.randint(1, 100_000) for _ in range(N)]

    random_queries = []
    for _ in range(Q):
        if random.random() < 0.7:
            L = random.randint(0, N - 2)
            R = random.randint(L, N - 1)
            random_queries.append(("Range", L, R))
        else:
            index = random.randint(0, N - 1)
            value = random.randint(1, 100_000)
            random_queries.append(("Update", index, value))

    array1 = copy.deepcopy(random_array)
    array2 = copy.deepcopy(random_array)
    array3 = copy.deepcopy(random_array)

    # Benchmark without cache
    start = time.perf_counter()
    for q in random_queries:
        if q[0] == "Range":
            range_sum_no_cache(array1, q[1], q[2])
        else:
            update_no_cache(array1, q[1], q[2])
    end = time.perf_counter()
    no_cache_time = end - start
    print(f"Execution time without caching: {no_cache_time:.2f} seconds")  # 6.11 s

    # Benchmark with LRU cache
    start = time.perf_counter()
    for q in random_queries:
        if q[0] == "Range":
            range_sum_with_cache(array2, q[1], q[2])
        else:
            update_with_cache(array2, q[1], q[2])
    end = time.perf_counter()
    cache_time = end - start
    print(f"Execution time with LRU cache: {cache_time:.2f} seconds")  # 6.47 s

    # ---- With functools.lru_cache ----
    start = time.perf_counter()
    for q in random_queries:
        if q[0] == "Range":
            range_sum_with_functools(array3, q[1], q[2])
        else:
            update_with_functools(array3, q[1], q[2])
    end = time.perf_counter()
    print(
        f"Execution time with functools.lru_cache: {end - start:.2f} seconds"
    )  # 10.17 s
