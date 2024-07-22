"""Module for simulating the work of an interpreter and a compiler"""

import tokenize  # lexical analysis
from io import BytesIO  # byte conversion for lexical analysis
import ast  # syntactic analysis
import symtable  # semantic analysis
import dis  # bytecode generation

# Python source code

code = """
def add(a, b):
    return a + b * 2

result = add(2, 3)
print(result)
"""

# Lexical analysis

print("Lexical analysis:")
code_bytes = BytesIO(code.encode("utf-8"))
tokens = tokenize.tokenize(code_bytes.readline)
for token in tokens:
    print(token)

# Parsing (AST)

print("\nParsing (AST):")
parsed_ast = ast.parse(code)
print(ast.dump(parsed_ast, indent=4))

# Semantic analysis

print("\nSemantic analysis:")
sym_table = symtable.symtable(code, "<string>", "exec")


def print_symbol_table(symbol_table, level=0):
    """Function to print the symbol table for semantic analysis"""
    indent = "  " * level
    print(f"{indent}Scope: {symbol_table.get_name()}")
    for symbol in symbol_table.get_symbols():
        kind = "unknown"
        if symbol.is_local():
            kind = "local"
        elif symbol.is_global():
            kind = "global"
        elif symbol.is_imported():
            kind = "imported"
        elif symbol.is_parameter():
            kind = "parameter"
        print(f"{indent}  {symbol.get_name()} ({kind})")
    for child in symbol_table.get_children():
        print_symbol_table(child, level + 1)


print_symbol_table(sym_table)

# Bytecode generation
print("\nBytecode generation:")
compiled_code = compile(code, "<string>", "exec")
print(dis.dis(compiled_code))

# Intermediate representation and optimization
print("\nIntermediate representation and optimization:")
code_with_constants = "x = 2 + 3 * 2"
compiled_code_with_constants = compile(code_with_constants, "<string>", "exec")
print(dis.dis(compiled_code_with_constants))

# Bytecode execution
print("\nBytecode execution:")
exec(compiled_code)
