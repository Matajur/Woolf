"""Module for checking the uniqueness of passwords using the Bloom filter"""

import hashlib
from typing import List, Dict


class BloomFilter:
    """
    Class that provides adding elements to a filter and checking whether
    an element is in the filter
    """

    def __init__(self, size: int, num_hashes: int) -> None:
        """
        Bloom filter initialization method
        """
        self.size = size
        self.num_hashes = num_hashes
        self.bit_array = [0] * size

    def _get_hashes(self, item: str) -> List[int]:
        """
        Method that hashes the same element num_hashes times, adding a different
        variable _{i} to the input string each time, to produce a different
        hexadecimal hash result each time. Then the hash is converted to index
        from hexadecimal to an integer format and % self.size ensures the index
        fits within the bit array size.

        item: the element in string format to be hashed;
        return: list of indexes in the number specified by the num_hashes
                parameter, these indices are where the bits will be set (when
                adding an item) or checked (when querying an item).
        """
        hashes = []
        for i in range(self.num_hashes):
            hash_result = hashlib.md5(f"{item}_{i}".encode()).hexdigest()
            # bfb0e9dd9e3451612aaf331899c05220
            index = int(hash_result, 16) % self.size  # 800
            hashes.append(index)
        return hashes  # [800, 949, 523]

    def add(self, item: str) -> None:
        """
        Method for adding a string element to a Bloom filter
        """
        if not isinstance(item, str) or not item:
            return  # skip not str values
        for index in self._get_hashes(item):
            self.bit_array[index] = 1

    def __contains__(self, item: str) -> bool:
        """
        Method for checking the presence of an element in a Bloom filter
        """
        if not isinstance(item, str) or not item:
            return False
        # [True, True, True] or [False, False, False]
        return all(self.bit_array[index] == 1 for index in self._get_hashes(item))


def check_password_uniqueness(
    bloom_filter: BloomFilter, passwords: List[str]
) -> Dict[str, str]:
    """
    Function to check for the presence of the new passwords from a list in a
    Bloom filter
    """
    result = {}
    for word in passwords:
        if not isinstance(word, str) or not word.strip():
            result[word] = "invalid"
        elif word in bloom_filter:
            result[word] = "is already used"
        else:
            result[word] = "is unique"
            bloom_filter.add(word)
    return result


if __name__ == "__main__":
    # Bloom filter initialization
    bloom = BloomFilter(size=1000, num_hashes=3)

    # Adding existing passwords
    existing_passwords = ["password123", "admin123", "qwerty123"]
    for password in existing_passwords:
        bloom.add(password)

    # Checking new passwords
    new_passwords_to_check = ["password123", "newpassword", "admin123", "guest"]
    results = check_password_uniqueness(bloom, new_passwords_to_check)

    # Output of results
    for password, status in results.items():
        print(f"Password '{password}' {status}.")
