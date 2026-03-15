# Freestanding C++: The Language You Already Use (Even If You Pretend You Don't)

I once met an embedded developer who asked me, with genuine concern:

*"Why would I need C++? Virtual functions ruin kernel performance."*

At the time I was working in anti-malware, from GUI to kernel land, so I asked the only reasonable question:

*"Who told you that you must use virtual functions?"*

That was, apparently, a day of discoveries.

Because one of the central ideas of C++ is still widely misunderstood:

> *You don't pay for what you don't use.*

And freestanding C++ is where that principle stops being a slogan and becomes a practical engineering tool.

This is the kind of C++ used in kernels, bare metal firmware, drone controllers, automotive units, medical devices, boot code, and other places where software is not sitting comfortably on top of an OS with a rich runtime and a forgiving memory model. In those environments, C++ is often stripped down, tightly controlled, and forced to behave like a disciplined systems language. Which, inconveniently for some myths, it does quite well.

Let's unpack what freestanding C++ actually is, how it talks to bare metal, why certain language features are deliberately disabled, what remains after the "purge," and where plain C still has a legitimate edge.

---

## Hosted vs Freestanding: Same Language, Different World

In standard terms, C++ distinguishes between a *hosted* implementation and a *freestanding* one.

A hosted implementation is what most application developers know: OS present, runtime present, full standard library expected, process model assumed. The language lives in a comfortable apartment with plumbing, heating, and internet.

A freestanding implementation is different. It assumes little or nothing about the environment. There may be no OS, no file system, no threads, no full standard library, no dynamic loader, and in some cases barely a runtime at all.

Freestanding entry point is different from hosted `int main(int argc, char** argv)`. It is `void main()` - you don't have any entitiy where to return the exit code.

Freestanding does not mean "crippled C++" - it means C++ without the usual furniture.

And that distinction matters, because many arguments against C++ in embedded and low-level work are really arguments against *hosted assumptions*, not against the language itself.

---

## How C++ Actually Talks to Bare Metal

This part is often strangely mystical to people who have never worked below the application layer, so let's make it concrete.

C++ does not need an OS to become machine code. The compiler still translates your code into instructions for the target CPU. The linker still places code and data into specific memory regions. The only difference is that on bare metal, *you* or your platform must provide the things an operating system would normally provide for free.

That typically means:

* a startup routine that sets up the stack and initializes memory sections
* an interrupt vector table
* a linker script describing the memory map
* low-level code that brings the CPU and peripherals into a usable state
* optional vendor HAL or board support code

Once that is in place, C++ code can work with hardware the same way C does: through *memory-mapped registers*, *interrupt handlers*, *volatile access*, and direct calls into platform-specific routines.

At the lowest level, hardware usually appears as addresses. A UART control register, a GPIO register, a DMA control block, a timer peripheral - all of these are exposed as specific memory locations or special instructions. C++ does not "hide" this. It lets you wrap it.

Instead of scattering raw addresses and masks all over the program, you can expose them upward as structured interfaces: register wrappers, driver objects, interrupt guards, typed handles, state machines, or compile-time configuration objects.

So the basic shape looks like this:

* *Below*: raw silicon, MMIO addresses, interrupts, startup code
* *In the middle*: low-level register access and hardware abstraction
* *Above*: device drivers, protocol logic, control loops, business logic

The point is not that C++ magically makes hardware object-oriented. The point is that it gives you better tools to describe low-level mechanisms without paying a mandatory runtime tax.

For example, this is not "high-level fluff":

```cpp
class Register32 {
public:
    explicit Register32(std::uint32_t* addr) : addr_(addr) {}
    void write(std::uint32_t value) { *addr_ = value; }
    std::uint32_t read() const { return *addr_; }
private:
    std::uint32_t* addr_;
};
```

It is still just an address. But now the address has semantics. That matters.

---

## Why Freestanding Systems "Don't Have" Certain Features

Now we get to the part that confuses people.

In freestanding environments, you will often hear things like:

* no exceptions
* no RTTI
* no heap
* no `std::thread`
* no iostreams
* no fancy global constructors
* sometimes no recursion

To some developers this sounds like C++ has been reduced to a tragic museum exhibit. In reality, each removed feature usually corresponds to a very concrete engineering reason.

### No exceptions - because determinism matters more than elegance

Exceptions depend on runtime support for stack unwinding. That means extra metadata, more toolchain requirements, more hidden control flow, and execution paths that are harder to bound precisely.

In a desktop app, that may be acceptable. In a hard real-time controller or kernel boundary, it often is not.

If you must guarantee worst-case timing, "something somewhere unwinds an unknown number of frames" is not a sentence that inspires peace.

So in these systems, `-fno-exceptions` is usually not dogma. It is engineering.

And explicit error handling is not a primitive fallback. It is often the design that best matches the environment.

```cpp
enum class Error {
    Ok,
    Timeout,
    InvalidArgument
};

Error read_sensor(...);
```

That is not "less modern." It is more explicit.

### No RTTI - because space and dynamic discovery are not free

Run-time type information supports features like `dynamic_cast` and `typeid`. Useful sometimes, but they add metadata and encourage designs based on runtime type probing.

In constrained systems, that cost often buys very little. Many designs simply do not need runtime type discovery. So RTTI gets disabled, and the codebase moves toward static relationships instead.

### No unrestricted heap - because fragmentation and latency are real

The myth that "C++ means heap" refuses to die, although it deserves it.

Dynamic allocation is often restricted or banned in real-time and safety-critical systems because it introduces two problems engineers care about deeply: *fragmentation* and *unpredictable latency*.

If your allocator has variable-time behavior, or if heap health depends on past allocation history, you have already made your timing analysis miserable.

So many systems avoid general-purpose heap allocation entirely. They use static storage, bounded stack usage, object pools, fixed blocks, placement new, or arena allocators.

Not because they "don't know modern software engineering," but because they do.

### No `std::thread` - because there may be no OS scheduler under it

A thread abstraction assumes something underneath to schedule, block, wake, and synchronize execution contexts. On bare metal, that "something" may simply not exist.

Instead, concurrency is built using interrupts, cooperative loops, RTOS tasks, vendor primitives, lock-free queues, DMA completion events, or hand-rolled scheduling.

So the absence of `std::thread` is not a language failure. It is a reminder that abstractions need a substrate.

### No iostreams, locales, filesystem - because the whole hosted world may be missing

A lot of heavy standard library facilities assume an environment with files, locales, streams, and runtime services. Bare metal often has none of that.

So you may avoid large parts of `libstdc++`, or use only small and useful headers such as `<array>`, `<span>`, `<type_traits>`, `<utility>`, and selected algorithms.

Sometimes you limit the standard library. Sometimes you forbid it almost entirely.

And that is fine, because *C++ the language is not the same thing as the full hosted standard library*.

### No uncontrolled global initialization - because startup order must be obvious

Static objects with constructors are convenient until you are bringing up a board, touching hardware before clocks are configured, or debugging startup order at 3 a.m.

In low-level environments, initialization order is often tightly controlled because the machine itself comes alive in stages. That makes fancy global constructors less charming than they appear in textbooks.

### Sometimes no recursion - because bounded stack depth is not optional

In embedded, avionics, and certified systems, stack usage may need to be statically analyzable. Recursion makes that much harder. So it is often banned or tightly reviewed.

Again, not because recursion is sinful, but because stack overflow tends to be unpopular in devices people depend on.

---

## What Is Left After All These Restrictions?

Quite a lot, actually.

And this is the part many critics miss: once you remove the features that don't fit the environment, you still retain a surprisingly powerful language.

You still have *classes and structs with invariants*. That means you can represent hardware, handles, stateful components, and protocols as structured objects instead of loose piles of functions and integer macros.

You still have *constructors and destructors*, which means you still have RAII. And RAII in low-level code is not about exception safety. It is about deterministic cleanup and balanced operations.

An interrupt guard is a classic example:

```cpp
class IrqGuard {
public:
    IrqGuard() { disable_irq(); }
    ~IrqGuard() { enable_irq(); }
};
```

Nothing dynamic. Nothing magical. Just "do the paired thing correctly, every time."

That pattern is excellent for:

* interrupt masking
* spinlock acquisition/release
* peripheral enable/disable
* DMA ownership guards
* temporary mode switching

C can imitate this with discipline. C++ lets the structure do part of the discipline for you.

You also keep *strong typing*, which is one of the most underrated advantages in low-level programming. In bare metal work, bugs often come from mixing things that are all technically integers but semantically very different: milliseconds vs microseconds, raw addresses vs handles, register masks vs values, sensor units vs control coefficients.

C++ lets you say "these are not the same thing" and make the compiler enforce it.

You keep *inheritance* too, and here people often overreact. Freestanding C++ does not forbid inheritance. What is usually avoided is uncontrolled *dynamic polymorphism* with virtual dispatch in hot or sensitive paths. But plain inheritance for code organization, interface factoring, or static relationships is still there. And if you do need polymorphism, you can often use templates, CRTP, tagged unions, or carefully isolated virtual interfaces.

You keep *templates* and *`constexpr`*, which are some of the strongest weapons C++ brings to embedded work. This is where the language becomes not just tolerable, but genuinely superior in some cases.

---

## Templates: Dangerous in Excess, Brilliant in Moderation

Templates in embedded are a delicate balance between flash size and optimization.

Used carelessly, templates can absolutely bloat code. Every new instantiation may generate more machine code. Generic layers piled on generic layers can turn firmware into a cathedral of duplicate symbols.

That criticism is real.

But that is only half the story.

Used well, templates let you move work from the device into the compiler:

* precompute lookup tables
* resolve configuration at compile time
* eliminate runtime branches
* encode policies without virtual dispatch
* generate specialized register accessors
* build state machines without runtime overhead

For example:

```cpp
template<std::uint32_t BaudRate>
struct UartConfig {
    static constexpr std::uint32_t divisor = compute_divisor(BaudRate);
};
```

Now the device does not calculate the divisor at runtime. The compiler does. The branch disappears, the constant appears, and the code path gets simpler.

That is one of C++'s killer advantages in constrained systems:

> *Don't compute on the device what the compiler can compute for you.*

So yes, templates are a tradeoff. They are neither automatically good nor automatically bad. They are a lever. Pull it intelligently.

---

## Memory in Freestanding C++: Not One Model, but Several

Another persistent misunderstanding is that freestanding C++ must either use the heap or be reduced to glorified C with semicolons.

In practice, low-level C++ uses a spectrum of memory strategies.

Sometimes everything is *static storage*, because determinism matters most and lifetime is effectively whole-program.

Sometimes objects live on the *stack*, with strict depth rules and careful review.

Sometimes there is *placement new*, where an object is constructed into preallocated memory:

```cpp
alignas(MyType) std::byte arena[sizeof(MyType)];
MyType* obj = new (arena) MyType();
```

No heap. No allocator. Just explicit lifetime in explicit memory.

And sometimes systems use *fixed pools or arenas*, which are very common because they avoid fragmentation and make allocation bounded and predictable. Arena-based models are particularly attractive when you need many objects during a phase and can release them together.

So the real question is not "does C++ use memory dynamically?" but "which memory discipline matches the system?"

Freestanding C++ is fully capable of living under strict memory law.

---

## What If You Limit `libstdc++`? What If You Forbid It?

Both are common.

If you *limit* the standard library, you might keep lightweight headers and avoid the heavy hosted machinery. That gives you utilities, type traits, fixed-size containers, and compile-time tools without dragging in things you do not need.

If you *forbid it entirely*, you still retain the language itself:

* classes
* templates
* overloads
* namespaces
* inline functions
* `constexpr`
* strong typing
* deterministic object lifetime

You lose convenience, certainly. But you do not lose the essence.

This matters because many anti-C++ arguments quietly assume that "C++" means "full desktop-flavored runtime with the kitchen sink." In freestanding work, that assumption is simply false.

---

## C++ Is a Solid Choice for Kernels and Bare Metal

This point deserves to be said plainly.

C++ is not merely "usable" in kernels and bare-metal software. It is often a *solid engineering choice*.

If you configure it properly, it gives you structure without mandatory runtime baggage. It lets you model hardware more safely, express invariants more clearly, push logic into compile time, wrap dangerous operations in deterministic scopes, and build interfaces that are harder to misuse.

That is valuable in exactly the kind of environments where mistakes are expensive.

And yet, despite all this, there is still a recurring habit of criticizing the language for features that can simply be disabled.

That is a bit like condemning a workshop because you saw a chainsaw and concluded that every project must therefore involve chainsaw juggling.

No one is making you use exceptions, RTTI, virtual dispatch, iostreams, heap allocation, or elaborate metaprogramming in a bootloader. If you did, that was your design decision, not an unavoidable property of the language.

---

## When C Still Has an Edge

Now for the part that tribal discussions usually ruin.

C still absolutely makes sense in a number of cases, and pretending otherwise would be silly.

The first case is *extreme hardware limitation*. On tiny 8-bit microcontrollers or severely constrained targets, the toolchain may simply handle C better, the binary may be smaller, and the engineering budget may not justify more abstraction.

The second is *vendor ecosystem reality*. Some vendors are unapologetically C-first. Their HALs, examples, debuggers, headers, documentation, and support culture all assume C. You can fight the ecosystem, but the ecosystem usually wins.

The third is *certification and process inertia*. In aerospace, automotive, medical, and industrial systems, there may already be certified C code, certified tools, established review checklists, approved subsets, and audit expectations. Reworking all that for C++ can be technically possible and economically absurd.

The fourth is *legacy*. If you have millions of lines of stable C, "let's rewrite this in C++ because it is nicer" is how people accidentally create new bugs while feeling architecturally superior.

A fifth case is *ABI and interoperability*. When you need a stable, minimal boundary across languages or runtimes, C remains the common denominator and often the cleanest external interface.

And finally, there is the uncomfortable but very real issue of *team discipline*. Bad C++ is more dangerous than good C. If a team knows disciplined C well and has neither the experience nor the review culture to keep C++ under control, C may be the safer choice.

Language choice is engineering, not faith.

---

## The Real Problem Is Usually Not C++. It's Undisciplined C++

Many critiques of C++ are true.

Yes, it is possible to write bloated, over-abstracted, heap-happy, template-exploding, runtime-heavy nonsense in C++.

It is also possible to write unreadable macro jungles and undefined-behavior roulette in C.

The real problem is not the language alone. It is whether the team understands the environment, the cost model, and the discipline required.

Freestanding C++ is, in fact, the opposite of careless C++. It is C++ under constraints. C++ on a strict athletic diet. C++ that has been told, very firmly, that there will be no dessert and no hidden allocations.

That version of the language is often far more practical than its reputation suggests.

---

## A Closing Remark for C++ Haters

You do not have to love C++.

You do not have to use it in every kernel, every firmware image, every controller, every driver, or every toaster with ambitions.

But hating a language for features you can turn off - and then declaring it unfit for systems work - does not make you look battle-hardened. It mostly makes you look like someone reviewing a vehicle by complaining that you refuse to move the gear selector out of reverse.

Freestanding C++ is not a fantasy, not a compromise, and not "C with classes and bad ideas."

It is a disciplined subset-plus-style of using C++ where the language keeps what is valuable:

* structure
* type safety
* deterministic lifetime
* compile-time power
* zero-cost abstraction when done right

and drops what the environment cannot afford.

C still has places where it is the better tool. Absolutely.

But in kernels, bare metal, real-time controllers, and safety-critical systems, well-configured freestanding C++ is not a gimmick. It is often a very serious option - and sometimes a very strong one.

Because in the end, serious engineering is not about choosing a tribe.

It is about understanding the hardware, the runtime you do or do not have, the guarantees you must provide, and the costs you are willing to pay.

And in that world, ideology crashes faster than code.
