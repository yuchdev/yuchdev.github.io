# Freestanding C++: The Language You Already Use (Even If You Pretend You Don't)

I once met an embedded developer who asked me, with genuine concern:

> "Why would I need C++? Virtual functions ruin kernel performance."

At the time I was working in anti-malware - deep in kernel land - so I smiled and asked:

"Who told you you must use virtual functions?"

That was the day of discoveries.

Because one of the core ideas of C++ is:

> **You don't pay for what you don't use.**

And in freestanding environments - bare metal, kernels, drone controllers, medical firmware - you often use far less of the language than people assume.

Let's unpack what *freestanding C++* really means, what you can strip away, what remains incredibly powerful, and when plain C still makes sense.

---

## Hosted vs Freestanding: A Quick Reality Check

In standard terms, C++ distinguishes between:

* **Hosted implementation** - full standard library, OS, runtime support.
* **Freestanding implementation** - minimal runtime, no guaranteed standard library, no OS assumptions.

Freestanding C++ is not "crippled C++."
It's C++ without assumptions about:

* dynamic memory
* threads
* exceptions
* iostreams
* full `libstdc++`

That's not exotic. That's Tuesday in embedded.

---

# The Famous "No Exceptions" Environment

Restrictions like these are normal in:

* Bare metal firmware
* Kernels and drivers
* Hard real-time systems
* Drone controllers
* Automotive ECUs
* Medical devices
* Safety-critical avionics

### Why disable exceptions?

Because stack unwinding introduces:

* Non-deterministic execution time
* Hidden control flow
* Hidden memory usage (unwind tables)
* ABI boundary problems
* Toolchain complexity

If you need deterministic worst-case latency, exceptions are often a design liability.

So in many serious systems:

```
-fno-exceptions
```

is not ideological. It's engineering.

And no - avoiding exceptions does not mean "not knowing modern C++."

It means knowing exactly where modern C++ fits.

---

# Typical "Embedded Diet" C++

In many freestanding codebases, C++ runs on a strict diet:

* Exceptions: **off**
* RTTI: **off**
* Dynamic polymorphism: avoided
* Heap allocation: banned or tightly controlled
* `iostream`, locales: avoided
* `std::thread`: replaced with vendor HAL
* Global constructors: tightly controlled
* Initialization order: explicitly managed

What's left?

Surprisingly: a lot.

---

# What Remains After the Purge

Even after you disable "the scary parts," C++ still gives you:

### 1. Classes With Invariants

Encapsulation is not "OOP fluff."
It's a tool to enforce correctness at compile time.

```cpp
class Register32 {
public:
    explicit Register32(uint32_t* addr) : addr_(addr) {}
    void write(uint32_t value) { *addr_ = value; }
    uint32_t read() const { return *addr_; }
private:
    uint32_t* addr_;
};
```

No runtime overhead.
Better semantics than raw pointers.

---

### 2. RAII (Yes, Even Without Exceptions)

RAII is not about exceptions. It's about deterministic cleanup.

And deterministic cleanup is gold in embedded.

Examples:

* Interrupt masking guard
* DMA buffer guard
* Peripheral power guard
* Spinlock guard

```cpp
class IrqGuard {
public:
    IrqGuard() { disable_irq(); }
    ~IrqGuard() { enable_irq(); }
};
```

Zero runtime penalty.
Predictable.
Harder to misuse.

C can simulate this with discipline.
C++ enforces it structurally.

---

### 3. Strong Typing

C++ lets you create:

* Unit-safe types
* Handle wrappers
* Register abstractions
* Bitfield types
* Tag types

Instead of:

```c
uint32_t timeout_ms;
```

You can write:

```cpp
struct Milliseconds {
    uint32_t value;
};
```

And prevent mixing milliseconds with microseconds at compile time.

That's not overhead. That's correctness.

---

# Memory in Freestanding Systems

"C++ uses heap" is a myth.

Freestanding systems use multiple memory strategies:

### 1. Static Storage

```cpp
static uint8_t buffer[256];
```

Most deterministic.
Common in safety-critical code.

---

### 2. Stack Allocation

Carefully bounded, predictable.
Often analyzed statically.

---

### 3. Placement New

```cpp
alignas(MyType) uint8_t arena[sizeof(MyType)];
MyType* obj = new (arena) MyType();
```

No heap. No allocator.

---

### 4. Fixed Pools / Arenas

Arena allocators are extremely common:

```cpp
class Arena {
public:
    void* allocate(size_t size);
private:
    uint8_t memory[1024];
    size_t offset;
};
```

Predictable. No fragmentation.
Deterministic.

---

### What if You Limit `libstdc++`?

You can:

* Use only `<array>`, `<span>`, `<type_traits>`
* Avoid `<iostream>`, `<locale>`
* Replace `std::vector` with static-capacity containers
* Provide custom allocators
* Use `-nostdlib` or partial linking

What if you forbid it entirely?

Still fine.

C++ the language is separate from `libstdc++`.

You keep:

* Templates
* constexpr
* Strong typing
* Overloads
* Namespaces
* Inline functions
* Zero-cost abstractions

You lose:

* High-level containers
* Formatting
* Locale machinery
* Threads

And that's often intentional.

---

# Templates: The Flash Size Tradeoff

Templates in embedded are a delicate balance.

### Problem

Templates can increase flash size because:

* Each instantiation generates code
* Excessive genericity duplicates logic

### Advantage

Templates can:

* Remove runtime branches
* Move computation to compile time
* Generate lookup tables
* Precompute state machines
* Remove dynamic dispatch

Example:

```cpp
template<uint32_t BaudRate>
struct UartConfig {
    static constexpr uint32_t divisor = compute_divisor(BaudRate);
};
```

Now the device does not compute divisor at runtime.

The compiler does.

Templates are not "slow."
They're a lever.

Used recklessly → flash explosion.
Used carefully → zero runtime overhead.

Embedded C++ is about restraint.

---

# Where C Still Makes Perfect Sense

Let's be honest. C is still pragmatic in many cases.

### 1. Extreme Hardware Constraints

* 8-bit MCUs
* < 16 KB flash
* Very limited toolchains

C might produce smaller binaries.

---

### 2. Vendor C-First Toolchains

Some vendors:

* Provide C headers only
* Ship C-only HALs
* Test primarily in C
* Provide poor C++ ABI support

You follow the ecosystem.

---

### 3. Certification Constraints

In aerospace or automotive:

* Existing certified C codebase
* Toolchain certified for C only
* DO-178C / ISO 26262 processes built around C

Re-certifying in C++ may be unjustifiable.

---

### 4. Legacy Codebases

Millions of lines of C.

Migration cost > benefit.

---

### 5. Mixed-Language Environments

When acting as:

* Stable C ABI boundary
* FFI layer
* Interop layer with Rust or C

C remains the lingua franca.

---

### 6. Organizational Skill Constraints

If the team:

* Knows disciplined C deeply
* Has no C++ experience
* Cannot enforce C++ discipline

C may be safer.

Language choice is engineering.
Not religion.

---

# The Real Problem: Undisciplined C++

Many critiques of C++ are true.

But they're critiques of:

* Undisciplined C++
* Cargo-cult OOP
* Over-engineering
* Misused dynamic polymorphism
* Uncontrolled heap use
* Unbounded templates

Freestanding C++ is the opposite of that.

It's C++ on a strict, athletic diet.

---

# "But Virtual Functions Ruin Performance"

Only if you use them.

Don't want dynamic polymorphism?

Don't use it.

Don't want RTTI?

Turn it off.

Don't want exceptions?

Turn them off.

Don't want heap?

Don't allocate.

C++ does not force you into runtime costs.

If you pay for something, it's usually because you wrote it.

---

# A Slightly Sarcastic Note

Hating a language because you don't know how to configure it is… educational.

It's a bit like saying:

> "Manual transmission cars are terrible because I only drove them in reverse."

You don't have to love C++.

You don't have to use it everywhere.

But dismissing it based on a narrow slice of features makes you look less like a pragmatic engineer and more like someone who never opened the hood.

---

# Explicit Error Handling Is Not a Step Back

In many freestanding systems, you'll see:

```cpp
enum class Error {
    Ok,
    Timeout,
    InvalidArgument
};

Error read_sensor(...);
```

No exceptions.

Just explicit, deterministic control flow.

That's not "primitive."

That's intentional design.

---

# Freestanding C++ Is About Control

Freestanding C++ gives you:

* Compile-time power
* Strong typing
* Deterministic destruction
* Zero-cost abstractions
* Structural correctness
* No mandatory runtime

Without:

* Forced heap
* Forced exceptions
* Forced polymorphism
* Forced standard library

It's not about maximalism.

It's about selective precision.

---

# Final Thought

C still makes sense in many scenarios.

C++ in freestanding environments makes sense in many others.

The real engineering skill isn't picking a tribe.

It's understanding:

* Your hardware
* Your toolchain
* Your latency budget
* Your memory model
* Your certification constraints
* Your team's discipline level

And choosing accordingly.

Because in serious systems - whether anti-malware kernels, drone controllers, or medical firmware - ideology crashes faster than code.
