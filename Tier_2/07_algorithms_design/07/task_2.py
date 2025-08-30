"""
Module for comparison of Fibonacci number calculation performance using LRU cache and Splay Tree
"""

import timeit
from functools import lru_cache

import matplotlib.pyplot as plt
# from pybst.splaytree import SplayTree


class Node:
    """
    Node of the Splay Tree implementation
    """

    def __init__(self, key: int, value: int):
        self.key = key
        self.value = value
        self.left = None
        self.right = None


class SplayTree:
    """
    Splay Tree implementation
    """

    def __init__(self):
        self.root = None

    def _splay(self, root: Node, key: int) -> Node:
        if root is None or root.key == key:
            return root

        if key < root.key:
            if root.left is None:
                return root
            if key < root.left.key:
                root.left.left = self._splay(root.left.left, key)
                root = self._rotate_right(root)
            elif key > root.left.key:
                root.left.right = self._splay(root.left.right, key)
                if root.left.right is not None:
                    root.left = self._rotate_left(root.left)
            return self._rotate_right(root) if root.left else root
        else:
            if root.right is None:
                return root
            if key > root.right.key:
                root.right.right = self._splay(root.right.right, key)
                root = self._rotate_left(root)
            elif key < root.right.key:
                root.right.left = self._splay(root.right.left, key)
                if root.right.left is not None:
                    root.right = self._rotate_right(root.right)
            return self._rotate_left(root) if root.right else root

    def _rotate_left(self, x: Node) -> Node:
        y = x.right
        x.right = y.left
        y.left = x
        return y

    def _rotate_right(self, x: Node) -> Node:
        y = x.left
        x.left = y.right
        y.right = x
        return y

    def insert(self, key: int, value: int) -> None:
        """
        Method for inserting a new value into a Splay Tree
        """
        if self.root is None:
            self.root = Node(key, value)
            return
        self.root = self._splay(self.root, key)
        if key == self.root.key:
            return
        new_node = Node(key, value)
        if key < self.root.key:
            new_node.right = self.root
            new_node.left = self.root.left
            self.root.left = None
        else:
            new_node.left = self.root
            new_node.right = self.root.right
            self.root.right = None
        self.root = new_node

    def get(self, key: int) -> int | None:
        """
        Method for getting a value from a Splay Tree
        """
        self.root = self._splay(self.root, key)
        if self.root and self.root.key == key:
            return self.root.value
        return None


@lru_cache(maxsize=None)
def fibonacci_lru(n: int) -> int:
    """
    Function to calculate Fibonacci numbers using the lru_cache decorator
    to cache the results of the calculation
    """
    if n <= 1:
        return n
    return fibonacci_lru(n - 1) + fibonacci_lru(n - 2)


def fibonacci_splay(n: int, tree: SplayTree) -> int:
    """
    Function to calculate Fibonacci numbers using the custom Splay Tree
    to cache the results of the calculation
    """
    result = tree.get(n)
    if result is not None:
        return result
    if n <= 1:
        result = n
    else:
        result = fibonacci_splay(n - 1, tree) + fibonacci_splay(n - 2, tree)
    tree.insert(n, result)
    return result


if __name__ == "__main__":

    fib_values = list(range(0, 1000, 50))
    lru_times = []
    splay_times = []

    for fib_num in fib_values:
        # LRU cache
        fibonacci_lru.cache_clear()
        lru_time = timeit.timeit(lambda: fibonacci_lru(fib_num), number=3) / 3
        lru_times.append(lru_time)

        # Splay Tree
        tree = SplayTree()
        splay_time = timeit.timeit(lambda: fibonacci_splay(fib_num, tree), number=3) / 3
        splay_times.append(splay_time)

    print(f"{'n':<10}{'LRU Cache Time (s)':<22}{'Splay Tree Time (s)':<22}")
    print("-" * 54)
    for n, lru, splay in zip(fib_values, lru_times, splay_times):
        print(f"{n:<10}{lru:<22.8f}{splay:<22.8f}")

    plt.plot(fib_values, lru_times, label="LRU Cache")
    plt.plot(fib_values, splay_times, label="Splay Tree")
    plt.xlabel("Fibonacci number (n)")
    plt.ylabel("Average execution time (s)")
    plt.title("Execution time comparison for LRU Cache and Splay Tree")
    plt.legend()
    plt.grid(True)
    plt.tight_layout()
    plt.show()
