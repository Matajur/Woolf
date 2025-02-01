# Tier 2. Module 1: Computer Systems and Their Fundamentals

## Topic 1 - Introduction to computer architecture
## Homework

### Task

Develop an assembler program that evaluates the arithmetic expression `b - c + a`.

Use as a basis the example program for calculating `a + b - c` presented in the synopsis ([link](https://github.com/goitacademy/Computer-Systems-and-Their-Fundamentals/tree/main/Chapter%2001) to the repository folder to the synopsis), but with the necessary modifications to solve this problem.

### Instructions

1. Study the program code that calculates `a + b - c` given in the outline.
2. Modify the program so that it performs calculations according to the formula `b - c + a`.
3. After making changes to the code, compile and run the program to verify that it correctly evaluates the expression `b - c + a`.
4. Your program should display the calculation result on the screen.
5. After running the program in DOSBox, take a screenshot of the DOSBox window showing the result of your program.

### Acceptance criteria

The program correctly calculates the expression `b - c + a` and displays the calculation result on the screen.
Made and attached a screenshot of the DOSBox window with the displayed result of the program execution.

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
