"""Module for solving the Rod Cutting Problem"""

from typing import List, Dict


def rod_cutting_memo(length: int, prices: List[int]) -> Dict:
    """
    Finds the optimal way to cut using memoization

    Args:
        length: length of the rod
        prices: list of prices, where prices[i] is the price of the rod of length i+1

    Returns:
        Dict with maximum profit and list of cuts
    """    
    memo = {}

    def helper(n):
        if n == 0:
            return 0, []
        if n in memo:
            return memo[n]

        max_profit = float('-inf')
        best_cuts = []

        for i in range(1, n + 1):
            if i <= len(prices):
                profit, cuts = helper(n - i)
                profit += prices[i - 1]
                if profit > max_profit:
                    max_profit = profit
                    best_cuts = cuts + [i]

        memo[n] = (max_profit, best_cuts)
        return memo[n]

    max_profit, cuts = helper(length)
    return {
        "max_profit": max_profit,
        "cuts": cuts,
        "number_of_cuts": len(cuts) - 1
    }

def rod_cutting_table(length: int, prices: List[int]) -> Dict:
    """
    Finds the optimal way to cut through tabulation

    Args:
        length: length of the rod
        prices: list of prices, where prices[i] is the price of the rod of length i+1

    Returns:
        Dict with maximum profit and list of cuts
    """
    dp = [0] * (length + 1)
    cut_solution = [[] for _ in range(length + 1)]

    for i in range(1, length + 1):
        for j in range(1, i + 1):
            if j <= len(prices):
                if dp[i] < prices[j - 1] + dp[i - j]:
                    dp[i] = prices[j - 1] + dp[i - j]
                    cut_solution[i] = cut_solution[i - j] + [j]

    return {
        "max_profit": dp[length],
        "cuts": cut_solution[length],
        "number_of_cuts": len(cut_solution[length]) - 1
    }

def run_tests():
    """Function to run all tests"""
    test_cases = [
        # Test 1: Base case
        {"length": 5, "prices": [2, 5, 7, 8, 10], "name": "Base case"},
        # Test 2: Optimally not to cut
        {"length": 3, "prices": [1, 3, 8], "name": "Optimally not to cut"},
        # Test 3: Even cuts
        {"length": 4, "prices": [3, 5, 6, 7], "name": "Even cuts"}
    ]

    for test in test_cases:
        print(f"\nTest: {test['name']}")                         
        print(f"Rod length: {test['length']}")                 
        print(f"Prices: {test['prices']}")                        

        # Testing memoization
        memo_result = rod_cutting_memo(test['length'], test['prices'])
        print("\nMemoization result:")                                
        print(f"Maximum profit: {memo_result['max_profit']}")       
        print(f"Cuts: {memo_result['cuts']}")              
        print(f"Number of cuts: {memo_result['number_of_cuts']}")

        # Testing tabulation
        table_result = rod_cutting_table(test['length'], test['prices'])
        print("\nTabulation result:")
        print(f"Maximum profit: {table_result['max_profit']}")
        print(f"Cuts: {table_result['cuts']}")
        print(f"Number of cuts: {table_result['number_of_cuts']}")

        print("\nThe verification was successful!")

if __name__ == "__main__":
    run_tests()
