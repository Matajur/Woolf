"""Module for HyperLogLog performance comparison with accurate unique element counting"""

import json
import time
import math
from typing import Tuple


class HyperLogLog:
    """
    HyperLogLog class using built-in hash
    """

    def __init__(self, p=5):
        """
        Method for initialization of the HyperLogLog data structure.
        """
        self.p = p
        self.m = 1 << p
        self.registers = [0] * self.m
        self.alpha = self._get_alpha()
        self.small_range_correction = 5 * self.m / 2

    def _get_alpha(self):
        """
        Method that returns the bias-correction constant based on p
        to improve estimation accuracy.
        """
        if self.p <= 16:
            return 0.673
        elif self.p == 32:
            return 0.697
        else:
            return 0.7213 / (1 + 1.079 / self.m)

    def add(self, item):
        """
        Method that adds an element to the HyperLogLog structure.
        """
        x = hash(str(item)) & 0xFFFFFFFF
        j = x & (self.m - 1)
        w = x >> self.p
        self.registers[j] = max(self.registers[j], self._rho(w))

    def _rho(self, w):
        """
        Method that finds the position of the first 1-bit in the binary
        representation of w.
        """
        return len(bin(w)) - 2 if w > 0 else 32

    def count(self):
        """
        Method that estimates the number of unique elements added.
        """
        Z = sum(2.0**-r for r in self.registers)
        E = self.alpha * self.m * self.m / Z
        if E <= self.small_range_correction:
            V = self.registers.count(0)
            if V > 0:
                return self.m * math.log(self.m / V)
        return E


def extract_ips(file_path: str):
    """
    Function for loading the logs from a file.
    """
    with open(file_path, "r", encoding="utf-8") as file:
        for line in file:
            try:
                entry = json.loads(line)
                ip = entry.get("remote_addr", "")
                if ip:
                    yield ip
            except json.JSONDecodeError:
                continue


def accurate_count(file_path: str) -> Tuple[int, float]:
    """
    Function to count the exact number of records in a uploaded file.
    """
    ip_set = set()
    start = time.time()
    for ip in extract_ips(file_path):
        ip_set.add(ip)

    count = len(ip_set)

    end = time.time()
    execution_time = round(end - start, 4)

    return count, execution_time


def hll_count(file_path: str) -> Tuple[int, float]:
    """
    Function to count the approx number of records in a uploaded file.
    """
    hll = HyperLogLog(p=5)
    start = time.time()
    for ip in extract_ips(file_path):
        hll.add(ip)

    count = round(hll.count())

    end = time.time()
    execution_time = round(end - start, 4)

    return count, execution_time


FILE_PATH = "./lms-stage-access.log"

if __name__ == "__main__":
    exact_count, exact_time = accurate_count(FILE_PATH)
    approx_count, approx_time = hll_count(FILE_PATH)

    print("Comparison results:")
    print(f"{'':25s} {'Accurate counting':>20s} {'HyperLogLog':>15s}")
    print(f"{'Unique elements':25s} {exact_count:>20.1f} {approx_count:>15.2f}")
    print(f"{'Execution time (sec.)':25s} {exact_time:>20.4f} {approx_time:>15.4f}")
