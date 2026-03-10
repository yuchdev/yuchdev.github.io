# Why "C Is Faster Than C++" - A Claim Without Proof

For almost two decades I've been writing production systems in both C and C++. Anti-malware, network stacks, low-latency messaging systems, embedded software for drones and medtech, system libraries and utilities. And during all those years I've repeatedly heard the same confident claim:

> "C++ is slower than C. At best, it can match it."

This statement has no meaningful theoretical or practical proof behind it.

Let's structure the discussion properly.

---

## 1. Theoretical Reality: C++ Is a 99% Superset of C

Modern C++ compilers (Clang, GCC, MSVC) use the same optimization backends for both C and C++. After parsing, both languages are lowered to intermediate representation (IR). From that point forward, optimization is identical.

If you write C-style procedural code in C++ - avoiding dynamic polymorphism, exceptions, heavy runtime features - the generated assembly is typically identical.

C++ does not impose:

* Garbage collection
* Mandatory runtime
* Mandatory dynamic dispatch
* Mandatory heap allocation

Everything that might introduce overhead is opt-in.

* If you don't use virtual functions, there is no vtable.
* If you don't use exceptions, there is no runtime and stack unwinding penalty.
* If you don't allocate, there is no allocator cost.

There is no inherent performance tax in C++.

---

## 2. Myths About Why C++ "Can Be Slower"

The common arguments usually revolve around abstractions. Let's examine them.

### Myth 1: "OOP Adds Overhead"

This statement is vague at best, and usually reflects a misunderstanding of what actually introduces runtime cost.

#### Classes themselves add zero runtime overhead

A C++ class without virtual functions is layout-compatible with a C struct.

There is no hidden metadata. No hidden runtime. No implicit allocations.

Technically class is just a struct with compile-time access control.

---

#### Member Functions Do Not Add Cost

A non-virtual member function:

```cpp
struct Vec {
    float x, y;
    float length() const { return std::sqrt(x*x + y*y); }
};
```

Compiles to a normal function taking a pointer (`this`) - exactly like manually passing a struct pointer in C.

There is no dispatch cost.
The function can be inlined.
The optimizer sees everything.

With the equivalent C code:

```
float length(struct Vec* v) {
    return sqrt(v->x*v->x + v->y*v->y);
}
```

Assembly will be identical.

---

#### Inheritance Does Not Add Cost

Inheritance only adds runtime overhead *only* if you use dynamic polymorphism (virtual functions).

Without `virtual`, inheritance is purely a compile-time layout mechanism.

```cpp
struct Base {
    int a;
};

struct Derived : Base {
    int b;
};
```

Memory layout:

```
[a][b]
```

Exactly what you would manually write in C using struct embedding:

```c
struct Base {
    int a;
};

struct Derived {
    struct Base base;
    int b;
};
```

---

#### What Actually Adds Overhead?

TODO: RTTI INFORMATION

Only this:

```cpp
struct Base {
    virtual void foo();
};
```

This introduces:

* A vtable pointer (typically one pointer per object)
* An indirect call when dispatching via base pointer/reference

But this is **dynamic polymorphism**, not "OOP" in general.

And it is opt-in.

If you don't use `virtual`, you don't pay.

---

#### Static Polymorphism Has Zero Runtime Cost

C++ templates allow polymorphism without dynamic dispatch:

```cpp
template<typename T>
void process(T& obj) {
    obj.foo();
}
```

This is resolved at compile time - the call is inlined, There is no vtable, no indirection.

This is strictly more powerful than C's macro-based generic programming - and safer.

---

#### Why the myth exists

Historically:

* Some languages (Java, C#, Smalltalk) enforce heap allocation and dynamic dispatch.
* People generalize that experience to C++.

But C++ is not a managed runtime language - it is a zero-cost abstraction language.

Abstractions like dynamic polymorphism adds a predictable, well-defined overhead - exactly the same kind of overhead you would incur in C using function pointers.

---

#### Yes, C also uses dynamic dispatch

```c
struct Interface {
    void (*foo)(void*);
};
```

This is manual vtable emulation, and the theoretical the cost is identical to C++ dynamic polymorphism.

Except, in C++ case compiler aggressively optimizes every case, making it static if early binding is possible

C dynamic dispatch does not allow this possibility.

---

### Myth 2: "Templates Are Heavy"

This myth is typically launched by people who do not understand how templates work.

Templates are not a runtime feature.

They are a strictly compile-time code generation mechanism.

When you write:

```cpp
template<typename T>
T add(T a, T b) { return a + b; }
```

The compiler generates a concrete function for each used type:

```cpp
int add(int, int);
double add(double, double);
```

There is:

* No runtime dispatch
* No type erasure
* No dynamic overhead
* No template metadata in the binary

Templates are resolved completely at compile time.

---

#### In reality, templates make C++ faster

Templates enable:

* Full inlining
* Compile-time specialization
* Elimination of function pointers
* Better alias analysis
* Removal of indirection

Compare generic approach of C:

```c
void qsort(void* base, size_t n, size_t size, int (*compar)(const void*, const void*));
```

Every comparison is an indirect function call.

That prevents inlining and hurts branch prediction.

Now compare with:

```cpp
std::sort(begin, end, comparator);
```

The comparator is inlined.
The entire algorithm is specialized per type.
The optimizer sees everything.

This is why `std::sort` routinely outperforms `qsort` (400% on 1 million integers)

---

#### Why the Myth Exists

Because:

* Templates increase compile time.
* Templates increase binary size.
* Template errors are complex.


But none of that is runtime cost.

Actually, templates are one of the strongest performance tools C++ has, shifting work from runtime to compile time - which is exactly what high-performance systems want, and one of the practical reasons C++ can outperform C in real-world scenarios - not the opposite.

---

### Myth 3: "STL Is Bloated"

This claim usually comes from two misunderstandings:

1. Confusing *feature richness* with runtime overhead.
2. Confusing `iostream` performance with the entire STL.

Let's separate facts from folklore.

---

Most STL containers are:

* Header-only
* Template-based
* Fully specialized per type
* Aggressively inlined

They generate concrete, optimized code for each use.

There is no runtime "STL engine"

---

Let's dissect `std::vector<T>`, which is essentially:

```
T* data;
size_t size;
size_t capacity;
```

Exactly what you would manually implement in C:

```
struct Vector 
{
    int* data;
    size_t size;
    size_t capacity;
};
```

It does not store metadata.
It does not track types at runtime.
It does not allocate unless you push beyond capacity.

---

#### And It Actually Does More Than Typical C Implementations

Unlike most handwritten C vectors, `std::vector` provides:

* Amortized constant-time growth with well-chosen growth factor (typically 1.6)
* Exception safety guarantees
* Strong iterator semantics
* Move semantics support
* Guaranteed contiguous storage

Most C handwritten implementations I saw either:

* Leak memory on failure
* Or forget edge cases
* Or implement growth and reallocation poorly (like grow by +1)

---

#### STL Provides Highly Optimized Data Structures

C standard library provides:

* `qsort`
* `bsearch`
* Basic C arrays

That's it.

C++ STL provides:

TODO: in words

* `std::vector` (contiguous dynamic array)
* `std::deque`
* `std::array`
* `std::list`
* `std::forward_list`
* `std::map` (red-black tree)
* `std::set`
* `std::unordered_map` (hash table)
* `std::unordered_set`
* `std::priority_queue`
* `std::bitset`
* `std::span`
* `std::string`
* `std::string_view`
* `std::optional`
* `std::variant`
* `std::tuple`
* `std::unique_ptr`
* `std::shared_ptr`


#### Red-Black Trees and Hash Tables

`std::map` and `std::set` are typically implemented as red-black trees.

Balanced.
Logarithmic guarantees.
Exception-safe.
Memory-managed.

`std::unordered_map` provides:

* Hash table implementation
* Controlled load factor
* Rehashing strategy
* Predictable average O(1) access

C provides none of this in its standard library.

You either:

* Write it manually
* Or depend on external code

And manual implementations are rarely superior.

Most of these have no equivalent in standard C.

If you want them in C, you must:

* Import third-party libraries
* Write them yourself (it each cases their mutual compatibility is questionable at best)
* In case of generic types, you likely have to rely on unsafe macro-based code

STL is not bloated - it's comprehensive.

---

#### Algorithms Library Is Highly Optimized

`std::sort`
`std::stable_sort`
`std::partial_sort`
`std::nth_element`
`std::accumulate`
`std::transform`
`std::copy`
`std::move`

All are:

* Template-based
* Inlined
* Type-specialized
* Often better optimized than typical C handwritten loops

Again - no runtime abstraction layer.

---

#### What About C++ I/O?

Yes - `std::iostream` is slower than `printf`.

But it is conveniently overlooked that it solves a different problem.

* It was designed for type safety and extensibility.
* With localization support
* With supports of custom stream types.
* It integrates with C++ STL/iterators system.

And of course, using it is not mandatory (you can even disable iostream sync for performance with `sync_with_stdio(false)`):


After all

```cpp
printf()
fwrite()
read()
write()
```

Are still the part of standard library of C++

---

#### Where the "Bloated" Myth Comes From

Usually from:

* Larger binary size
* Longer compile times
* Complex template error messages
* iostream slowness

None of these equal runtime inefficiency.

---

### Myth 4: "Exceptions Slow Everything Down"

This myth usually comes from outdated knowledge or from misunderstanding how modern C++ exception handling works.

Modern C++ implementations use **zero-cost exception handling**.

That term has a very specific meaning.

---

#### What "Zero-Cost" Actually Means

In mainstream compilers (GCC, Clang, MSVC on modern platforms):

* The normal execution path contains **no extra branching for exception checks**.
* There is **no per-function runtime penalty** for merely being exception-capable.
* Stack unwinding metadata is stored separately (e.g., in unwind tables).

If no exception is thrown:

* No unwinding happens.
* No dynamic dispatch happens.
* No runtime penalty occurs in the hot path.

The cost exists only if an exception is actually thrown.

And throwing is intentionally expensive - because it represents an exceptional condition.

---

#### What Is the Actual Cost?

The real costs of enabling exceptions are:

1. Larger binary size (due to unwind tables).
2. Slightly more complex generated metadata.
3. Expensive stack unwinding when an exception is thrown.

What it does **not** introduce:

* Per-call runtime branching.
* Hidden checks after every statement.
* Mandatory dynamic dispatch.

If your program does not throw exceptions in the hot path, there is typically no measurable runtime overhead.

---

#### Can It Be Completely Eliminated?

Yes.

Exceptions can be disabled entirely:

* `-fno-exceptions` (GCC/Clang)
* `/EHs-` (MSVC variations)
* Standard practice in kernels, bare-metal systems and low-latency systems like HFT engines.

In that configuration:

* No unwind tables
* No exception machinery
* No runtime support

Performance becomes identical to C-style error handling.

Many high-performance systems do exactly this.

So even if you philosophically dislike exceptions, or they go against your project's coding standard, you can work without them.

---

#### Compare With C-Style Error Handling

In C, error handling typically looks like:

```c
if (error) {
    return ERROR_CODE;
}
```

Which introduces:

* Branching in normal code paths, that kills many optimizations
* Repeated error propagation
* Manual cleanup logic

In C++, exceptions allow:

* Separation of error-handling path
* Cleaner hot path
* Automatic stack unwinding with RAII

Ironically, in deeply nested code, exception-based control flow can reduce branching in the normal path compared to manual error propagation.

---

#### Where the Myth Comes From

Historically:

* Early exception models were inefficient.
* Embedded systems avoided them.
* Some developers equate "complex feature" with "slow."

Additionally, throwing exceptions is expensive - intentionally so.

But that cost occurs only when throwing.

And exceptions should not be used for regular control flow.

---

#### Important Clarification

If your system:

* Never throws in hot loops,
* Or disables exceptions entirely,

Then there is no inherent performance disadvantage compared to C.

The only tradeoff is potentially increased binary size.

And that is not runtime slowdown.

---

### Myth 5: "C++ Hides What Happens"

This statement is emotionally powerful - but technically shallow.

Yes, C++, like most or programming languages, allows abstraction. And abstractions can hide details.

But hiding details is not the same as hiding cost.

And more importantly:

**Poor design hides costs.**

**Good design hides complexity - and sometimes hides optimizations.**

---

#### C Also "Hides What Happens"

When you call:

```c
printf(...)
```

Do you see what happens?

No.

When you use:

```c
malloc()
```

Do you see allocator internals?

No.

When you use:

```c
qsort()
```

Do you see its implementation?

No.

Abstraction exists in C too.

The difference is not visibility - it is expressiveness.

---

### Abstraction Is Not the Enemy

C++ is built around the principle of **zero-cost abstractions**:

> What you don't use, you don't pay for.

An abstraction is dangerous only when it introduces hidden runtime behavior.

C++ abstractions are designed to be compile-time constructs.

And that changes everything.

---

### Compile-Time Computation: The Real Power

C++ can compute at compile time:

* Lookup tables
* Matrices
* State machines
* Parsers
* Polynomial expansions
* CRC tables
* Protocol layouts
* Finite automata
* ...and even small interpreters

Using:

* Templates
* `constexpr`
* `consteval`
* Metaprogramming
* Concepts

If something can be resolved at compile time - it will not exist at runtime. What's the benefit?

No branching.

No memory allocation.

No dynamic checks.

For embedded and low-latency systems, this is gold.

You can:

* Precompute transformation matrices
* Generate state transitions
* Produce optimal jump tables
* Validate configurations at compile time

And end up with pure, optimal machine code.

---

### Good Design May Hide Optimizations

A well-designed C++ abstraction may look high-level:

```cpp
auto result = matrixA * matrixB;
```

But the compiler on the way will:

* Inline everything
* Unroll loops
* Vectorize operations
* Eliminate temporaries
* Evaluate constants at compile time

The abstraction hides complexity - not cost.

Sometimes it hides optimizations that would be extremely tedious to implement manually in C.

---

### Poor Design Hides Costs

If you:

* Allocate in tight loops
* Use `std::function` unnecessarily
* Abuse virtual dispatch
* Over-engineer object hierarchies

Then yes - performance suffers.

But the same applies in C and any other language.

* Excessive indirection
* Poor memory layout
* Unnecessary heap allocations
* Function pointer abuse
* Macro spaghetti

Language does not cause bad architecture.

Engineers do.

---

### "Closer to the Metal" Is Not Automatically Faster

C is often described as "closer to the metal"

Even there's no precise sense to this word.

But modern compilers already abstract hardware heavily:

* Instruction reordering
* Vectorization
* Register allocation
* Pipeline scheduling

The "metal" is no longer directly programmable in naive source code anyway.

The real performance frontier today is:

* Memory layout
* Cache behavior
* Branch predictability
* Compile-time specialization

And C++ gives more tools for that.

Not fewer.

---

### Embedded Systems Counterargument

Some argue:

"C++ is too heavy for embedded"

Yet modern freestanding C++ toolchains:

* Support templates
* Support constexpr
* Support disabling exceptions
* Support disabling RTTI
* Support no-heap runtime
* Disable dynamic polymorphism
* Outlaw libstdc++

And still benefit from:

* Compile-time configuration
* Type safety
* Inlining
* Static polymorphism
* Zero-cost abstractions

That is not "hiding behavior" - that is engineering power.

---

### The Real Distinction

C hides complexity by limiting abstraction.

C++ hides complexity by making abstraction compile-time whenever possible.

One limits what you can express.

The other lets you express more - and often eliminate runtime cost.

---


---


## 3. Why C++ Can Actually Be Faster

Now the part that is often ignored.

### Compile-Time Polymorphism

C's `qsort` requires a function pointer comparator.
C++'s `std::sort` uses templates.

Result:

* Comparator is inlined
* No indirect calls
* Better branch prediction

Measured differences often reach 2× on large datasets.

---

### Compile-Time Computation (`constexpr`)

C++ can move logic to compile time.

Lookup tables, state machines, precomputed values - all can be generated at compile time.

C cannot do this.

When runtime work becomes compile-time work, C++ wins by definition.

---

### Stronger Type System → Better Optimization

C++ templates preserve exact types.
C often relies on `void*` and manual casting.

More type information allows:

* Better inlining
* Better alias analysis
* More aggressive optimization

Sometimes converting generic C code into templated C++ improves performance purely because the compiler sees more.

---

### Move Semantics

C++ move semantics eliminate unnecessary copies automatically.

In C, you must manually redesign APIs to avoid copying.

Move semantics generate optimal code without extra runtime cost.

---

### Header-Based Specialization

C++ templates allow algorithm specialization per type without runtime overhead.

In C, you must:

* Duplicate code manually
* Use macros (unsafe and limited)
* Or use function pointers (slower)

C++ gives zero-cost specialization.

---

## 4. No Theoretical or Practical Proof That C Must Be Faster

There is:

* No formal model proving C generates faster code.
* No compiler architecture privileging C.
* No consistent benchmark suite demonstrating C dominance.

Both languages compile to the same optimizer backend.

If C were inherently faster, there would need to be:

* A mandatory runtime cost in C++
* A structural optimization barrier in C++

Neither exists.

The burden of proof lies with those claiming inherent C superiority.

So far, no such proof exists.

---

## 5. Practical Observation (20 Years Writing Both)

After two decades working in both languages:

* I have never seen well-written C++ be inherently slower than equivalent C.
* I have seen C++ outperform C due to template inlining and removal of indirection.
* Most claims of C superiority come from folklore, not measurement.

When C++ is slower, it is almost always because of:

* Poor abstraction choices
* Excessive dynamic allocation
* Misuse of `std::function`
* Unnecessary virtual dispatch

These are engineering mistakes - not language limitations.

---

## 6. Can They Be On Par in Practice?

Absolutely.

In any realistic scenario, you can write C and C++ that produce identical performance.

But achieving that in C often requires:

* Manual specialization
* Macro metaprogramming
* Function duplication per type
* Careful avoidance of generic indirection

In C++, the compiler performs this specialization automatically via templates.

C can match C++ - but usually at greater manual engineering cost.

C++ simply gives you more compile-time tools to reach the same or better performance with safer abstractions.

---

# Final Thoughts

C is a powerful, elegant systems language.

C++ is not "C with overhead."
It is "C with compile-time power."

And compile-time power is performance power.

The statement that C is inherently faster than C++ has neither theoretical foundation nor consistent empirical evidence.

Performance depends on design, memory layout, and algorithm choice - not on whether the file extension is `.c` or `.cpp`.

If anything, modern C++ gives you more ways to be faster - not fewer.
