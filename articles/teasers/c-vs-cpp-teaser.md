# "C IS FASTER THAN C++" - A CLAIM WITHOUT PROOF

For almost two decades I've been writing production systems in both C and C++ - anti-malware, network stacks, low-latency messaging, embedded software for drones and medtech, and system libraries.

And during all those years I've repeatedly heard the same confident claim:

> "C++ is slower than C. At best, it can match it."

The interesting part is that this claim is rarely backed by actual theory or measurements. Once you start examining it closely, it becomes surprisingly difficult to justify.

Let's start with a simple fact.

Modern compilers use the same optimization backends for both C and C++. After parsing, both languages are lowered to the same intermediate representation. From that point forward, the optimizer treats them identically.

C++ does not impose:

* garbage collection
* mandatory runtime
* mandatory heap allocation
* mandatory dynamic dispatch

Everything that could introduce runtime overhead is opt-in.

If you write C-style procedural code in C++, the generated assembly is often identical.

So where does the myth come from?

Usually from misunderstandings about a few common features.

### "OOP adds overhead"

It's wrong in most cases.
A C++ class without virtual functions is layout-compatible with a C struct.

Member functions compile to ordinary functions receiving a `this` pointer - exactly like passing a struct pointer in C. There is no hidden runtime machinery.

The only real overhead appears when dynamic polymorphism (`virtual`) is used - which is conceptually identical to function pointer tables in C.

### "Templates are heavy"

This comes from a lack of understanding what templates are. 

Templates are not a runtime feature, they are a compile-time code generation mechanism.

When you instantiate a template, the compiler generates specialized machine code for the exact types involved. This allows aggressive inlining and optimization that generic C patterns (using `void*` or function pointers) simply cannot match.

That's why `std::sort` routinely outperforms C `qsort`

### "STL is bloated"

Most STL containers are template-based and header-only.
They generate specialized code for a specific type

`std::vector<T>` is essentially just a pointer to an array of `T`, size and capacity.
Exactly what most developers would implement manually in C - except the STL version is already optimized

### "Exceptions slow everything down"

Modern C++ implementations use zero-cost exceptions.

That means the normal execution path contains no extra runtime checks. The cost appears only if an exception is actually thrown.

And if a project dislikes exceptions entirely, they can simply be disabled at compile time.

### Where C++ Actually Gains an Advantage

C++ can move work from runtime to compile time using:

* templates
* constexpr
* move semantics
* compile-time polymorphism

This allows the compiler to generate specialized machine code with fewer indirections and better optimization opportunities.

In practice, I've repeatedly seen C++ outperform equivalent C implementations precisely because the compiler had more semantic information to optimize.

### Reality Check

As someone who previously worked in the finance industry, I know - if there were even a consistent nanosecond-level advantage in C over C++, they would use it immediately. This is an industry where latency is measured in nanoseconds. They use FPGA/ASIC implementations for specific hot paths

If C were inherently faster than C++, you would see HFT engines written in C

You don't. They overwhelmingly use C++

Why? Because there is simply nothing in C that makes it "faster" by definition

In reality, frameworks with heavy numeric workloads (Eigen, Blitz++, Armadillo, TBB, Blaze, OpenCV, Thrust) choose C++ not by accident. It allows expression of high-level abstractions that collapse into the _most_ optimal machine code. 

### Conclusion

After two decades working with both languages, my conclusion is simple:

C is a brilliant language and was an essential foundation of systems programming.

But the claim that it is *inherently faster than C++* has neither a theoretical basis nor practical evidence.

More often than not, the opposite turns out to be true.
