"""Python inbuilt example of the lexical analysis"""

import tokenize
from io import BytesIO  # tokenize works only with bytes representation of the code

# Python source code example

code = """
def my_function():
    x = 42 + y
"""

# Convert a line of code to a byte stream
code_bytes = BytesIO(code.encode("utf-8"))

# Using the tokenize library to parse code into tokens
tokens = tokenize.tokenize(code_bytes.readline)

# Output tokens
for token in tokens:
    print(token)

# ...TokenInfo(type=1 (NAME), string='def', start=(2, 0), end=(2, 3), line='def my_function():\n')
# TokenInfo(type=1 (NAME), string='my_function', start=(2, 4), end=(2, 15), line='def my_function():\n')...
# start=(2, 4) -> 2 - line number, 4 - position in line
