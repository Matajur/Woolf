"""Module for extending the prefix tree functionality"""

from trie import Trie


class Homework(Trie):
    """
    Class that extends the functionality of the Trie class with the mothods
    described below
    """

    def count_words_with_suffix(self, pattern: str) -> int:
        """
        Method for counting the number of words ending with a given pattern
        """
        if not isinstance(pattern, str):
            raise ValueError("Suffix pattern must be a string")

        count = 0
        for word in self.keys():
            if word.endswith(pattern):
                count += 1
        return count

    def has_prefix(self, prefix: str) -> bool:
        """
        Method for checking for the presence of words with a given prefix
        """
        if not isinstance(prefix, str):
            raise ValueError("Prefix must be a string")

        return len(self.keys_with_prefix(prefix)) > 0


if __name__ == "__main__":
    trie = Homework()
    words = ["apple", "application", "banana", "cat"]
    for i, word in enumerate(words):
        trie.put(word, i)

    # Checking the number of words ending with a given suffix
    assert trie.count_words_with_suffix("e") == 1  # apple
    assert trie.count_words_with_suffix("ion") == 1  # application
    assert trie.count_words_with_suffix("a") == 1  # banana
    assert trie.count_words_with_suffix("at") == 1  # cat

    # Checking for the presence of a prefix
    assert trie.has_prefix("app") == True  # apple, application
    assert trie.has_prefix("bat") == False
    assert trie.has_prefix("ban") == True  # banana
    assert trie.has_prefix("ca") == True  # cat

    print("Mission completed!")
