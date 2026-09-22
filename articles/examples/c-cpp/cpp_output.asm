"Buffer::Buffer(unsigned long)":
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
        .set    "Buffer::Buffer(unsigned long)","Buffer::Buffer(unsigned long)"
"Buffer::~Buffer()":
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
        .set    "Buffer::~Buffer()","Buffer::~Buffer()"
"Buffer::data() const":
        push    rbp
        mov     rbp, rsp
        mov     QWORD PTR [rbp-8], rdi
        mov     rax, QWORD PTR [rbp-8]
        mov     rax, QWORD PTR [rax]
        pop     rbp
        ret
"Buffer::size() const":
        push    rbp
        mov     rbp, rsp
        mov     QWORD PTR [rbp-8], rdi
        mov     rax, QWORD PTR [rbp-8]
        mov     rax, QWORD PTR [rax+8]
        pop     rbp
        ret
"run(unsigned long)":
        push    rbp
        mov     rbp, rsp
        push    rbx
        sub     rsp, 40
        mov     QWORD PTR [rbp-40], rdi
        mov     rdx, QWORD PTR [rbp-40]
        lea     rax, [rbp-32]
        mov     rsi, rdx
        mov     rdi, rax
        call    "Buffer::Buffer(unsigned long)"
        lea     rax, [rbp-32]
        mov     rdi, rax
        call    "Buffer::data() const"
        test    rax, rax
        sete    al
        test    al, al
        je      .L8
        mov     ebx, -1
        jmp     .L9
.L8:
        lea     rax, [rbp-32]
        mov     rdi, rax
        call    "Buffer::size() const"
        mov     rbx, rax
        lea     rax, [rbp-32]
        mov     rdi, rax
        call    "Buffer::data() const"
        mov     rsi, rbx
        mov     rdi, rax
        call    "process(unsigned char*, unsigned long)"
        mov     ebx, eax
        nop
.L9:
        lea     rax, [rbp-32]
        mov     rdi, rax
        call    "Buffer::~Buffer()"
        mov     eax, ebx
        jmp     .L13
        mov     rbx, rax
        lea     rax, [rbp-32]
        mov     rdi, rax
        call    "Buffer::~Buffer()"
        mov     rax, rbx
        mov     rdi, rax
        call    "_Unwind_Resume"
.L13:
        mov     rbx, QWORD PTR [rbp-8]
        leave
        ret
