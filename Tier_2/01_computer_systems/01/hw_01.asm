    ; An assembler program that calculates the arithmetic expression b - c + a

org  0x100               ; Indicating that this is a .COM program
section .data
    b db 3               ; Define b = 3
    c db 2               ; Define c = 2
    a db 5               ; Define a = 5
    resultMsg db 'Result: $' ; Specifying the string to output the result

section .text
_start:
    mov al, [b]          ; Load b into al
    sub al, [c]          ; Subtract c from al
    add al, [a]          ; Add a to al

    ; Conversion of the result into an ASCII character (for single-digit numbers)
    add al, 30h          ; Convert the number into an ASCII character

    ; Outputting the result
    mov ah, 09h          ; DOS function to output a string
    lea dx, resultMsg    ; Set DX to the resultMsg address
    int 21h              ; DOS interrupt call

    ; Number output
    mov dl, al           ; Put the result in dl for output
    mov ah, 02h          ; DOS function for character output
    int 21h              ; DOS interrupt call

    ; Completion of the program
    mov ax, 4c00h        ; DOS function to terminate the program
    int 21h              ; DOS interrupt call
    