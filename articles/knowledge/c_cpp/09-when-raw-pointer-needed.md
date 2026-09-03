### WHEN RAW POINTERS STILL NEEDED

I remember having exactly the same thought - "why on earth don't they just use RAII?" while working on a C++98 codebase that started in the early 90s 🙂

But even in 2026 there's entire family of situations when RAII is "unfriendly"

- C APIs and system interfaces where ownership is implicit, split, or lifetime is controlled externally. You can get the raw array from POSIX or WinAPI - then don't forget to acquire it. There's an entire family of cases (plugins, drivers) where interop layer comes cross-process, where you should perform not-owning acquisition 
- Lock-free and low-latency algorithms: some lock-free structures rely on explicit lifetime control and techniques like hazard pointers or evolution - a form of rudimentary GC, which you don't reach without "jiggling" raw pointers
- Custom memory pools or arenas, where destruction is batch-oriented and individual destructors are noise
- Framework constraints, Qt is a good example. Raw pointers are still first-class citizens. Nothing will leak, if you don't forget to add all objects to common parent - this was a deliberate design choice that was solid back in 1993.
- Embedded and freestanding mode: in real-time or bare metal code, storage and lifetime are separate concerns. If it's RAII then very specific

In small or disciplined teams, you can absolutely build bullet-proof infrastructure and then enjoy hard-to-misuse abstractions on top of it. What doesn't scale nearly as well is assuming those invariants will hold in very large codebases, with many contributors, uneven experience, and local optimizations happening in isolated pockets of code.

RAII is still one of C++ strongest ideas - but with experience understand where it shines and where old good raw pointer is needed
