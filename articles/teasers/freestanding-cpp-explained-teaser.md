Freestanding C++ is not "C++ but broken."

It's C++ on a strict diet.

No exceptions.
No RTTI.
No heap (or only fixed arenas).
No iostreams.
No hidden runtime magic.

Just deterministic execution, strong typing, RAII for hardware guards, compile-time computation, and zero-cost abstractions - exactly what you need in kernels, drone controllers, real-time systems, or safety-critical firmware.

I once met an embedded dev who rejected C++ because "virtual functions ruin performance."
He didn't know you don't pay for what you don't use.

In many freestanding projects I've seen, C++ is configured tighter than most C codebases - and still provides more structural safety.

Templates? A careful balance between flash size and compile-time optimization.
libstdc++? Optional.
Heap? Often banned.

C absolutely still makes sense in extreme constraints or C-first ecosystems.

But criticizing C++ for features you can simply turn off… says more about the engineer than the language.

Full article below 👇
