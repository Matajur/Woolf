"""Module for simulating the work of an interpreter"""


class LexicalError(Exception):
    """Lexical error exception"""


class ParsingError(Exception):
    """Parsing error exception"""


class TokenType:
    """Token types for lexical analysis"""

    INTEGER = "INTEGER"
    PLUS = "PLUS"
    MINUS = "MINUS"
    MUL = "MULTIPLY"
    DIV = "DIVIDE"
    LPAREN = "LEFT PARENTHESE"
    RPAREN = "RIGHT PARENTHESE"
    EOF = "EOF"  # Indicates the end of the input line


class Token:
    """Defines tokens for lexical analysis"""

    def __init__(self, token_type, token_value):
        self.type = token_type
        self.value = token_value

    def __str__(self):
        return f"Token({self.type}, {repr(self.value)})"


class Lexer:
    """splits the code into tokens for lexical analysis"""

    def __init__(self, text: str):
        self.text = text
        self.pos = 0
        self.current_char = self.text[self.pos]

    def advance(self):
        """Move the 'pointer' to the next character of the input line"""
        self.pos += 1
        if self.pos > len(self.text) - 1:
            self.current_char = None  # Indicates the end of input
        else:
            self.current_char = self.text[self.pos]

    def skip_whitespace(self):
        """Skip whitespace characters"""
        while self.current_char is not None and self.current_char.isspace():
            self.advance()

    def integer(self):
        """Return an integer collected from a sequence of numbers"""
        result = ""
        while self.current_char is not None and self.current_char.isdigit():
            result += self.current_char
            self.advance()
        return int(result)

    def get_next_token(self):
        """Lexical analyzer that splits the input string into tokens"""
        while self.current_char is not None:
            if self.current_char.isspace():
                self.skip_whitespace()
                continue

            if self.current_char.isdigit():
                return Token(TokenType.INTEGER, self.integer())

            if self.current_char == "+":
                self.advance()
                return Token(TokenType.PLUS, "+")

            if self.current_char == "-":
                self.advance()
                return Token(TokenType.MINUS, "-")

            if self.current_char == "*":
                self.advance()
                return Token(TokenType.MUL, "*")

            if self.current_char == "/":
                self.advance()
                return Token(TokenType.DIV, "/")

            if self.current_char == "(":
                self.advance()
                return Token(TokenType.LPAREN, "(")

            if self.current_char == ")":
                self.advance()
                return Token(TokenType.RPAREN, ")")

            raise LexicalError("Lexical analysis error")

        return Token(TokenType.EOF, None)


class AST:
    """Abstract Syntax Tree for syntactic analysis"""


class BinOp(AST):
    """Binary Operand Node"""

    def __init__(self, left: Token, operand: Token, right: Token):
        self.left = left
        self.op = operand
        self.right = right


class Num(AST):
    """Number Node"""

    def __init__(self, token: Token):
        self.token = token
        self.value = token.value


class Parser:
    """Parser the code to define nodes for AST for syntactic analysis"""

    def __init__(self, lexer: Lexer):
        self.lexer = lexer
        self.current_token = self.lexer.get_next_token()

    def error(self):
        """Parsing Error"""
        raise ParsingError("Error of syntactic analysis")

    def eat(self, token_type):
        """
        Compare the current token with the expected token and, if they match,
        "absorb" it and move on to the next token.
        """
        if self.current_token.type == token_type:
            self.current_token = self.lexer.get_next_token()
        else:
            self.error()

    def factor(self):
        """Processing of numbers and expressions in parentheses"""
        token = self.current_token
        if token.type == TokenType.INTEGER:
            self.eat(TokenType.INTEGER)
            return Num(token)
        elif token.type == TokenType.LPAREN:
            self.eat(TokenType.LPAREN)
            node = self.expr()
            self.eat(TokenType.RPAREN)
            return node

    def term(self):
        """Parser for 'term' grammar rules. In our case, these are integers"""
        node = self.factor()

        while self.current_token.type in (TokenType.MUL, TokenType.DIV):
            token = self.current_token
            if token.type == TokenType.MUL:
                self.eat(TokenType.MUL)
            elif token.type == TokenType.DIV:
                self.eat(TokenType.DIV)

            node = BinOp(left=node, operand=token, right=self.factor())

        return node

    def expr(self):
        """Parser for arithmetic expressions"""
        node = self.term()

        while self.current_token.type in (TokenType.PLUS, TokenType.MINUS):
            token = self.current_token
            if token.type == TokenType.PLUS:
                self.eat(TokenType.PLUS)
            elif token.type == TokenType.MINUS:
                self.eat(TokenType.MINUS)

            node = BinOp(left=node, operand=token, right=self.term())

        return node


def print_ast(node: Num | BinOp, level=0):
    """Function to print AST"""
    indent = "  " * level
    if isinstance(node, Num):
        print(f"{indent}Num({node.value})")
    elif isinstance(node, BinOp):
        print(f"{indent}BinOp:")
        print(f"{indent}  left: ")
        print_ast(node.left, level + 2)
        print(f"{indent}  op: {node.op.type}")
        print(f"{indent}  right: ")
        print_ast(node.right, level + 2)
    else:
        print(f"{indent}Unknown node type: {type(node)}")


class Interpreter:
    """Interprets operations under ASt"""

    def __init__(self, parser: Parser):
        self.parser = parser

    def visit_BinOp(self, node: BinOp):
        """Performs algebraic operations under BinOP nodes"""
        if node.op.type == TokenType.PLUS:
            return self.visit(node.left) + self.visit(node.right)
        elif node.op.type == TokenType.MINUS:
            return self.visit(node.left) - self.visit(node.right)
        elif node.op.type == TokenType.MUL:
            return self.visit(node.left) * self.visit(node.right)
        elif node.op.type == TokenType.DIV:
            try:
                return self.visit(node.left) / self.visit(node.right)
            except ZeroDivisionError:
                return "Division by zero"

    def visit_Num(self, node: Num):
        """Gets value from the Num node"""
        return node.value

    def interpret(self):
        """Get attributes from an AST tree"""
        tree = self.parser.expr()
        return self.visit(tree)

    def visit(self, node: Num | BinOp):
        """Get attributes from a node"""
        method_name = "visit_" + type(node).__name__
        visitor = getattr(self, method_name, self.generic_visit)
        return visitor(node)

    def generic_visit(self, node: Token):
        """Raise an error if the nod is not Num or BinOp type"""
        raise ParsingError(f"No visit_{type(node).__name__} method")


def main():
    """Function to elaborate and interpret user input"""
    while True:
        try:
            text = input('Enter the expression (or "exit" to exit): ')
            if text.lower() == "exit":
                print("Exit the program")
                break
            lexer = Lexer(text)
            parser = Parser(lexer)
            interpreter = Interpreter(parser)
            result = interpreter.interpret()
            print(result)
        except (LexicalError, ParsingError) as e:
            print(e)


if __name__ == "__main__":
    main()
