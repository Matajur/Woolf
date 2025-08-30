"""Module for finding the longest common prefix"""

from trie import Trie


class LongestCommonWord(Trie):
    """
    Class that extends the functionality of the Trie class with the mothods
    described below
    """

    def find_longest_common_word(self, strings) -> str:
        """
        Method for finding the longest common prefix
        """
        if not isinstance(strings, list) or not all(
            isinstance(s, str) for s in strings
        ):
            raise ValueError("Input must be a list of strings")
        if not strings:
            return ""

        # Insert all words into the Trie
        for i, word in enumerate(strings):
            self.put(word, i)

        # Traverse the Trie to find the longest common prefix
        prefix = []
        current = self.root

        while True:
            if len(current.children) != 1 or current.value is not None:
                break
            char = next(iter(current.children))
            prefix.append(char)
            current = current.children[char]

        return "".join(prefix)


if __name__ == "__main__":
    # Tests
    trie = LongestCommonWord()
    strings = ["flower", "flow", "flight"]
    assert trie.find_longest_common_word(strings) == "fl"

    trie = LongestCommonWord()
    strings = ["interspecies", "interstellar", "interstate"]
    assert trie.find_longest_common_word(strings) == "inters"

    trie = LongestCommonWord()
    strings = ["dog", "racecar", "car"]
    assert trie.find_longest_common_word(strings) == ""

    trie = LongestCommonWord()
    strings = []
    assert trie.find_longest_common_word(strings) == ""

    print("Mission completed!")
