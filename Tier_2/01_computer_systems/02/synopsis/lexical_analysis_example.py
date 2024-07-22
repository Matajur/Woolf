"""Custom made example of the lexical analysis"""

import re

# Token patterns
token_specification = [
    ("NUMBER", r"\d+"),  # Integer literal
    ("ID", r"[A-Za-z_][A-Za-z_0-9]*"),  # Identifier
    ("PLUS", r"\+"),  # Addition operator
    ("EQUALS", r"="),  # Assignment operator
    ("NEWLINE", r"\n"),  # Line endings
    ("SKIP", r"[ \t]+"),  # Skip over spaces and tabs
    ("MISMATCH", r"."),  # Any other character
]

# Compile the regex patterns into a single regex pattern
tok_regex_pattern = "|".join(
    f"(?P<{pair[0]}>{pair[1]})" for pair in token_specification
)

print(type(tok_regex_pattern))  # str
print(tok_regex_pattern)
# (?P<NUMBER>\d+)|(?P<ID>[A-Za-z_][A-Za-z_0-9]*)|(?P<PLUS>\+)|(?P<EQUALS>=)|(?P<NEWLINE>\n)|(?P<SKIP>[ \t]+)|(?P<MISMATCH>.)

# Source code for analysis
code = "x = 42 + y\nz = x + 1"

# Lexical analysis
line_num = 1
line_start = 0
tokens = []
for match_object in re.finditer(tok_regex_pattern, code):
    print(match_object)  # <re.Match object; span=(0, 1), match='x'>...
    token_kind = match_object.lastgroup   # 'ID', 'EQUALS', 'NUMBER'...
    token_value = match_object.group(token_kind)    # 'x', '=', 42...
    column = match_object.start() - line_start
    if token_kind == "NUMBER":
        token_value = int(token_value)
        tokens.append((token_kind, token_value, line_num, column))
    elif token_kind == "ID":
        tokens.append((token_kind, token_value, line_num, column))
    elif token_kind == "PLUS":
        tokens.append((token_kind, token_value, line_num, column))
    elif token_kind == "EQUALS":
        tokens.append((token_kind, token_value, line_num, column))
    elif token_kind == "NEWLINE":
        line_start = match_object.end()
        line_num += 1
    elif token_kind == "SKIP":
        continue
    elif token_kind == "MISMATCH":
        raise RuntimeError(
            f"Unexpected character {token_value!r} at line {line_num}, column {column + 1}"
        )

print(tokens)
#   [('ID', 'x', 1, 0), ('EQUALS', '=', 1, 2), ('NUMBER', 42, 1, 4), ('PLUS', '+', 1, 7), ('ID', 'y', 1, 9), ('ID', 'z', 2, 0), ('EQUALS', '=', 2, 2), ('ID', 'x', 2, 4), ('PLUS', '+', 2, 6), ('NUMBER', 1, 2, 8)]

# Output tokens with line and column information
for token in tokens:  # Line 1, Column 1: ID (x)...
    print(f"Line {token[2]}, Column {token[3] + 1}: {token[0]} ({token[1]})")
