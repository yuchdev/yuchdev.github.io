# Modern C++ still stands on raw pointers

If you personally didn't meet raw new/delete in 2026, it's not the fault of `new()` and `delete()` 

1.Have you ever called a **destructor** directly (**not** `operator delete()`)? 🙂

This is a perfectly valid pattern in freestanding C++, in real-time or bare metal code, where storage and lifetime are separate concerns.
Now explain how to teach this to a student who has only vague knowledge (at best) of what operator `new()` *actually* does.

[Placement New Example 1](https://tinyurl.com/bdd2c9hw)

[Placement New Example 2](https://tinyurl.com/4tea86ru)

2.There's an entire family of cases (plugins, drivers) where the interop layer comes cross-process, where you should perform not-owning acquisition. Memory exceptions crossing ABI or privilege boundaries are a non-starter for such a system.

[Inter-Process Memory Acquisition Example 1](https://tinyurl.com/8fdszna8)

[Inter-Process Memory Acquisition Example 2](https://tinyurl.com/5n6fbuw6)

3.Lock-free and low-latency algorithms: some lock-free structures rely on explicit lifetime control and techniques like hazard pointers or evolution - a form of rudimentary GC, which you don't reach without "jiggling" raw pointers, manual `new()` and `delete()` (mostly `delete` - the queue maintains a list of items that it cleans a little as soon as it has a couple of free nanoseconds)

[Lock-free Algorithms Example 1](https://tinyurl.com/y3bz001)

[Lock-free Algorithms Example 2](https://tinyurl.com/z3bz001)

4.Custom memory pools or arenas, where destruction is batch-oriented and individual destructors are noise. Can be used everywhere where object sizes are predictable - from game engine to HFT.

[Custom Memory Pool Example 1](https://tinyurl.com/yb9pazeh)

[Custom Memory Pool Example 2](https://tinyurl.com/3vs5e6zy)

5.Qt. Raw pointers are first-class; you always create an object by `new()`. Nothing leaks, because ownership is modeled via parent-child tree - that was deliberate design.

[Qt Example 1](https://shorturl.fm/qAUNc)

[Qt Example 2](https://shorturl.fm/l963M)

The examples you've seen are not some nostalgic Windows 95-era relics.
They come from modern embedded ARM frameworks, Ghidra plugins, lock-free algorithms, game engines, and Qt-based GUI systems.

In each of those domains, explicit `new`/`delete` is not an accident or leftover legacy - it's a deliberate engineering choice driven by control over lifetime, performance, memory layout, or framework constraints.

Smart pointers are excellent tools.

But
- you can't responsibly use abstractions without understanding what they abstract over
- sometimes they also abstract away your performance and architecture

Raw pointers - and explicit `new`/`delete` - are not obsolete. They are the foundation.
