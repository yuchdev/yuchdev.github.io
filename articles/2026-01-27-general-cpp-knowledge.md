# General C++ Knowledge

In continuation of the discussion about C++ interview practices, a recurring question inevitably arises: *what exactly is "general C++ knowledge"?* Is it truly important when hiring an engineer, and if so, how can it be evaluated in a meaningful way?

When we speak about "good", "excellent", or even "outstanding" C++ knowledge, we are rarely talking about a single, linear skill set. In practice, C++ expertise is a conglomerate of several weakly intersecting domains. The classification below is subjective, but it reflects what years of real-world development and interviewing tend to reveal. You may extend it, refine it, or construct your own model.

## 1. C-legacy and low-level subset

This subset covers the foundations inherited from C and extended by C++: fundamental types, memory layout, pointer arithmetic, alignment, and object lifetimes. It also includes C++-specific low-level concepts such as references and rvalue references, `new`/`delete`/`delete[]`, custom memory managers, allocators, and ownership semantics. These topics form the bedrock of performance-critical and systems-level code.

## 2. Object-Oriented Programming subset

Classes, encapsulation, inheritance, virtual functions, and polymorphism live here - along with design patterns and their corresponding anti-patterns. This is also where developers encounter the notorious complexities of multiple and virtual inheritance. Understanding not only *how* OOP works in C++, but *when it should not be used*, is part of mature knowledge.

## 3. Template programming and metaprogramming subset

Claiming competence here means more than knowing template syntax. It implies understanding both the power and the cost of template metaprogramming. My personal motto is simple: *"templates are for libraries"*. A professional should be able to write advanced template code when necessary - and, just as importantly, resist the temptation to use it where it harms readability and maintainability.

## 4. C++ Standard Library subset

Containers, iterators, algorithms, and utilities form the daily toolkit of modern C++. This includes not only the classical components, but also newer additions such as ranges, filesystem support, and concurrency primitives. Knowing how to compose standard algorithms effectively often separates idiomatic C++ from merely functional code.

## 5. Multithreading and concurrency subset

This domain spans lock-based and lock-free programming, atomics, memory ordering, `async`, `future`/`promise`, and the common pitfalls of concurrent execution - from data races to the ABA problem. More than any other area, this requires a specific "multithreaded mindset": knowing when parallelism is essential, and when it should be deliberately avoided.

## 6. Compilation, optimization, and performance subset

Here the focus shifts to how code becomes machine instructions. Familiarity with compiler toolchains, optimization levels, architecture-specific flags, and tools like Compiler Explorer is essential. A senior engineer should be comfortable reading basic assembly output, understanding cache behavior, vectorization, and CPU extensions, and making informed decisions about performance trade-offs.

Importantly, no one expects encyclopedic or "book-perfect" knowledge. What *is* expected is the ability to acknowledge gaps and efficiently close them. When encountering an unfamiliar language feature, a professional C++ developer should be able to locate accurate information within minutes - and apply it correctly.

A senior C++ engineer cannot afford to have zero knowledge in any of these subsets. One weaker area may be acceptable; two weak areas are already a red flag and require careful evaluation of the candidate's other strengths. Concurrency, in particular, is not something one can acquire by skimming documentation for an hour - it is a "twilight zone" that demands months of experience, mistakes, and hard-earned understanding.

This discussion deliberately focuses on the C++ language itself. Libraries such as Boost are intentionally omitted: they often span multiple subsets, from everyday utilities to highly specialized components like Spirit or Karma.

Likewise, applied and system-level aspects are excluded here. In real projects, language knowledge is often paired with platform-specific APIs, operating-system concepts, or frameworks such as Qt, which introduce their own abstractions, memory models, and lifecycle rules.

This, then, is what I consider general C++ knowledge - knowledge that a professional C++ developer must possess. The word "must" is not theoretical; it is based on day-to-day engineering experience. The difference between a developer whose pull requests are a pleasure to review and one whose changes are repeatedly rejected often lies precisely in these fundamentals.

When we speak of truly outstanding C++ engineers, the distinction is not merely depth in individual areas, but an understanding of the subtle interconnections between them. Knowing when templates undermine encapsulation, what hazards arise when overloading `operator new`, or how to design a genuinely STL-compatible container with proper exception safety and traits support - this is where expertise transcends isolated knowledge and becomes engineering judgment.
