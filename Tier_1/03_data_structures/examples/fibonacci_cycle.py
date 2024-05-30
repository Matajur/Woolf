"""Calculation of Fibonacci number using for cycle"""


def fibonacci(n):
    """
    Function to calculate Fibonacci number
    """
    fib = [0, 1] + [0] * (n - 1)  # [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    for i in range(2, n + 1):
        fib[i] = fib[i - 1] + fib[i - 2]
    print(fib)  # [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55]
    return fib[n]


print(fibonacci(10))  # Output: 55


def fibonacci_iterative(n):
    """
    Function to calculate Fibonacci number
    """
    if n <= 1:
        return n
    a, b = 0, 1
    for _ in range(2, n+1):
        a, b = b, a + b
    return b
