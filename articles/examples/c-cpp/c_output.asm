"buffer_init":
        push    rbp
        mov     rbp, rsp
        sub     rsp, 16
        mov     QWORD PTR [rbp-8], rdi
        mov     QWORD PTR [rbp-16], rsi
        mov     rax, QWORD PTR [rbp-16]
        mov     rdi, rax
        call    "malloc"
        mov     rdx, rax
        mov     rax, QWORD PTR [rbp-8]
        mov     QWORD PTR [rax], rdx
        mov     rax, QWORD PTR [rbp-8]
        mov     rdx, QWORD PTR [rbp-16]
        mov     QWORD PTR [rax+8], rdx
        nop
        leave
        ret
"buffer_destroy":
        push    rbp
        mov     rbp, rsp
        sub     rsp, 16
        mov     QWORD PTR [rbp-8], rdi
        mov     rax, QWORD PTR [rbp-8]
        mov     rax, QWORD PTR [rax]
        mov     rdi, rax
        call    "free"
        nop
        leave
        ret
"run":
        push    rbp
        mov     rbp, rsp
        sub     rsp, 48
        mov     QWORD PTR [rbp-40], rdi
        mov     rdx, QWORD PTR [rbp-40]
        lea     rax, [rbp-32]
        mov     rsi, rdx
        mov     rdi, rax
        call    "buffer_init"
        mov     rax, QWORD PTR [rbp-32]
        test    rax, rax
        jne     .L4
        mov     eax, -1
        jmp     .L6
.L4:
        mov     rdx, QWORD PTR [rbp-24]
        mov     rax, QWORD PTR [rbp-32]
        mov     rsi, rdx
        mov     rdi, rax
        call    "process"
        mov     DWORD PTR [rbp-4], eax
        lea     rax, [rbp-32]
        mov     rdi, rax
        call    "buffer_destroy"
        mov     eax, DWORD PTR [rbp-4]
.L6:
        leave
        ret
