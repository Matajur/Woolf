"""Comparison of OOBTree and Dictionary performance for range queries"""

import timeit
import csv
from BTrees.OOBTree import OOBTree

CSV_FILE = "./generated_items_data.csv"


def load_data(filepath: str):
    """
    Function for data loading
    """
    with open(filepath, newline="", encoding="utf-8") as csvfile:
        reader = csv.DictReader(csvfile)
        items = []
        for row in reader:
            items.append(
                {
                    "ID": int(row["ID"]),
                    "Name": row["Name"],
                    "Category": row["Category"],
                    "Price": float(row["Price"]),
                }
            )
        return items


def add_item_to_tree(tree: OOBTree, item: dict) -> None:
    """
    Function to add an item to OOBTree
    """
    tree.update({item["ID"]: item})


def add_item_to_dict(d: dict, item: dict) -> None:
    """
    Function to add an item to Python dictionary
    """
    d[item["ID"]] = item


def range_query_tree(tree: OOBTree, min_price: float, max_price: float) -> list:
    """
    Functions for range query to OOBTree
    """
    return [v for v in tree.values() if min_price <= v["Price"] <= max_price]


def range_query_dict(d: dict, min_price: float, max_price: float) -> list:
    """
    Functions for range query to Python dict
    """
    return [v for v in d.values() if min_price <= v["Price"] <= max_price]


def benchmark_queries(
    data: list[dict], num_trials=100, min_price=10.0, max_price=90.0
) -> None:
    """
    Function to measure the total execution time of range queries
    """
    tree: OOBTree = OOBTree()
    d: dict = {}

    for item in data:
        add_item_to_tree(tree, item)
        add_item_to_dict(d, item)

    def tree_query():
        """
        Function to benchmark OOBTree
        """
        range_query_tree(tree, min_price, max_price)

    tree_time = timeit.timeit(tree_query, number=num_trials)

    def dict_query():
        """
        Function to benchmark Python dict
        """
        range_query_dict(d, min_price, max_price)

    dict_time = timeit.timeit(dict_query, number=num_trials)

    print(
        f"\nTotal range_query time for OOBTree: {tree_time:.6f} seconds"
    )  # 4.907994 seconds
    print(
        f"Total range_query time for Dict: {dict_time:.6f} seconds"
    )  # 0.793653 seconds


if __name__ == "__main__":
    print("Loading data...")
    input_data: list[dict] = load_data(CSV_FILE)
    print(f"Loaded {len(input_data)} items.")

    print("Running benchmarks...")
    benchmark_queries(input_data)


"""
The standard Python dictionary turned out to be faster than the OOBTree, because
the task requires filtering the goods by price, while the key by which the data is
stored in both structures is the unique product ID. Thus, we do not use the advantages
of the OOBTree, since the identifier is not used in the search and filtering.
"""
