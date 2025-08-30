"""Module for analyzing the frequency of word usage in text using the MapReduce paradigm"""

import string

from concurrent.futures import ThreadPoolExecutor
from collections import defaultdict
from typing import Tuple

import requests
import matplotlib.pyplot as plt


def get_text(url: str) -> str | None:
    """
    Text loading function by URL.
    """
    try:
        response = requests.get(url, timeout=10000)
        response.raise_for_status()  # Checking for HTTP errors
        return response.text
    except requests.RequestException:
        return None


def remove_punctuation(text: str) -> str:
    """
    Function to remove punctuation marks.
    """
    return text.translate(str.maketrans("", "", string.punctuation))


def map_function(word: str) -> Tuple[str, 1]:
    """
    Function to mark the occurrence of a word in the text.
    """
    return word, 1


def shuffle_function(mapped_values: list[Tuple[str, 1]]) -> defaultdict[str, list]:
    """
    Function that organizes intermediate key-value pairs so that all
    values for a single key are together.
    """
    shuffled = defaultdict(list)
    for key, value in mapped_values:
        shuffled[key].append(value)
    return shuffled.items()


def reduce_function(key_values: Tuple[str, list[int]]) -> Tuple[str, int]:
    """
    Aggregation function of all intermediate values of word occurrences
    in the text for each key.
    """
    key, values = key_values
    return key, sum(values)


def map_reduce(text: str, search_words: list = None, stop_words: list = None) -> dict:
    """
    MapReduce execution function to find the most frequently used words in text
    """
    # Removing punctuation marks
    text = remove_punctuation(text.lower())
    words = text.split()

    # If a list of words to search for is specified, only those words will be considered
    if search_words:
        words = [word for word in words if word in search_words]

    # If a list of words not to search for is specified, those words will be ignored
    if stop_words:
        words = [word for word in words if word not in stop_words]

    # Parallel mapping
    with ThreadPoolExecutor() as executor:
        mapped_values = list(executor.map(map_function, words))

    # Sequential shuffle
    shuffled_values = shuffle_function(mapped_values)

    # Parallel reduction
    with ThreadPoolExecutor() as executor:
        reduced_values = list(executor.map(reduce_function, shuffled_values))

    return dict(reduced_values)


def sort_words(input_dict: dict, limit: int | None = None) -> dict:
    """
    A function that sorts words in a dictionary according to their
    frequency of occurrence
    """
    sorted_items = sorted(input_dict.items(), key=lambda item: item[1], reverse=True)
    if limit:
        sorted_items = sorted_items[:limit]
    return dict(sorted_items)


def visualize_top_words(input_dict: dict, limit: int = 10) -> None:
    """
    Visualization function of the most frequently used words
    """
    items = list(input_dict.items())[:limit]
    words, freqs = zip(*items)

    plt.figure(figsize=(10, 6))
    plt.barh(words, freqs)
    plt.xlabel("Frequency")
    plt.ylabel("Words")
    plt.title("Top 10 Most Frequent Words")
    plt.gca().invert_yaxis()  # Highest at the top
    plt.tight_layout()
    plt.show()


if __name__ == "__main__":
    # Input text for processing
    URL = "https://gutenberg.net.au/ebooks01/0100021.txt"
    input_text = get_text(URL)
    if input_text:
        # Running MapReduce on input text
        STOP_WORDS = ["a", "an", "the", "to", "of", "not", "in", "as", "and", "with", "at", "for", "this", "that"]
        result = map_reduce(input_text, stop_words=STOP_WORDS)

        sorted_result = sort_words(result, 10)

        print("Printing the most used words in the text.")

        visualize_top_words(sorted_result, 10)

    else:
        print("Error: Failed to get input text.")
