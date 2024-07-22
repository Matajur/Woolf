# Tier 2. Module 1: Computer Systems and Their Fundamentals

## Topic 2 - Introduction to compilers and interpreters
## Homework

### Task

You have an interpreter source code from the synopsis that can handle arithmetic expressions, including addition and subtraction operations ([link](https://github.com/goitacademy/Computer-Systems-and-Their-Fundamentals/tree/main/Chapter%2002) to the synopsis repository folder).

Your task is to extend this interpreter so that it also supports multiplication and division operations, and correctly handles expressions containing parentheses.

### Instructions

#### 1. Extend `Lexer`

* Add new token types for `MUL` multiplication, `DIV` division, and parentheses that open the `LPAREN` and close the `RPAREN` part of an arithmetic expression.
* Modify the `get_next_token` method of the `Lexer` class to recognize these new characters.

#### 2. Modify `Parser`

* Add a `factor` method to handle numbers and expressions in parentheses.
* Change the `term` method to include handling of multiplication and division.
* Make appropriate changes to the `expr` method to support the new operation hierarchy.

#### 3. Update `Interpreter`

* Extend the `visit_BinOp` method in the `Interpreter` class so that it can handle multiplication and division operations.

#### 4. Testing

* Check the correctness of the interpreter's work on various arithmetic expressions, including expressions with parentheses, for example `(2 + 3) * 4` should give a result of `20`.

### Acceptance criteria

- Added new token types for `MUL` multiplication, `DIV` division and parenthesis operations.
- Modified the `get_next_token` method to recognize new characters.
- The `Parser` has been modified.
- Updated the Interpreter so that it supports multiplication and division operations, handles expressions with parentheses.
- The interpreter works correctly.
