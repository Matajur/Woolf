"""Python inbuilt example of the syntax analysis"""

import ast

# Python source code example
code = """
x = 42 + y * 2
"""

# Code parsing in AST
parsed_ast = ast.parse(code)


def visit_node(node, level=0):
    """
    Function to recursively traverse an AST and output its structure
    """
    print("  " * level + ast.dump(node))
    for child in ast.iter_child_nodes(node):
        visit_node(child, level + 1)


# AST output
visit_node(parsed_ast)

# Module(body=[Assign(targets=[Name(id='x', ctx=Store())], value=BinOp(left=Constant(value=42), op=Add(), right=BinOp(left=Name(id='y', ctx=Load()), op=Mult(), right=Constant(value=2))))], type_ignores=[])
#   Assign(targets=[Name(id='x', ctx=Store())], value=BinOp(left=Constant(value=42), op=Add(), right=BinOp(left=Name(id='y', ctx=Load()), op=Mult(), right=Constant(value=2))))
#     Name(id='x', ctx=Store())
#       Store()
#     BinOp(left=Constant(value=42), op=Add(), right=BinOp(left=Name(id='y', ctx=Load()), op=Mult(), right=Constant(value=2)))
#       Constant(value=42)
#       Add()
#       BinOp(left=Name(id='y', ctx=Load()), op=Mult(), right=Constant(value=2))
#         Name(id='y', ctx=Load())
#           Load()
#         Mult()
#         Constant(value=2)

# 1st - load variable "y"
# 2nd - multiply "y" by 2
# 3rd - add 42 to the result of the previous multiplication (BinOp - Binary Operand)
# 4th - allocate memory for the variable "x" ("Assign" stands for "=")
# 5th - place the result of the previous adding into "x"
