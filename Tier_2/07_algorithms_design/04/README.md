# Tier 2. Module 7 - Design and Analysis of Algorithms

## Lesson 04. Homework - Prefix trees

### Task 1 - Extending the prefix tree functionality

#### Task description

Implement two additional methods for the `Trie` class:

- `count_words_with_suffix(pattern)` to count the number of words ending with a given pattern;
- `has_prefix(prefix)` to check for words with a given prefix.

#### Specifications

- The `Homework` class must extend the `Trie` base class.
- The methods must handle invalid input errors.
- The input parameters for both methods must be strings.
- The `count_words_with_suffix` method must return an integer.
- The `has_prefix` method must return a boolean.

#### Acceptance Criteria

1. The `count_words_with_suffix` method returns the number of words ending in a given `pattern`. If there are no words, it returns `0`. It is case-sensitive.
2. The `has_prefix` method returns `True` if there is at least one word with the given prefix. It returns `False` if there are no such words. It is case-sensitive.
3. The code passes all tests.
4. Incorrect input data is processed.
5. The methods work efficiently on large data sets.

#### Program template

```Python
from trie import Trie

class Homework(Trie):
    def count_words_with_suffix(self, pattern) -> int:
        pass

    def has_prefix(self, prefix) -> bool:
       pass

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
```

### Task 2 - Finding the longest common prefix

#### Task description

Create a class `LongestCommonWord` that inherits from the `Trie` class and implement the `find_longest_common_word` method that finds the longest common prefix for all words in the input array of `strings`.

#### Specifications

- The `LongestCommonWord` class must inherit from `Trie`.
- The input parameter of the `find_longest_common_word` method, `strings`, is an array of strings.
- The `find_longest_common_word` method must return a string that is the longest common prefix.
- The execution time is $ O(S) $, where $S$ is the total length of all strings.

#### Acceptance criteria

1. The `find_longest_common_word` method:

- returns the longest prefix common to all words,
- returns an empty string if there is no common prefix,
- correctly handles an empty array or invalid input data.

2. The code passes all tests.

#### Program template

```Python
from trie import Trie

class LongestCommonWord(Trie):

    def find_longest_common_word(self, strings) -> str:
        pass

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
```
