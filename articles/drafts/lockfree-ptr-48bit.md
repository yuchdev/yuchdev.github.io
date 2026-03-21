# Tagged Pointers, Generational Pointers, and Lock-Free Code: Not a Hack, but a Pattern

Sometimes you meet a programmer who speaks about pointer tagging the way medieval people spoke about alchemy.

"Never touch pointer bits."
"Never encode metadata in addresses."
"Never do clever things in lock-free code."

And then, awkwardly, reality walks in wearing a Boost badge and a Linux kernel hoodie.

Because in real systems programming, the rule was never "never do this."
The rule was always: **know exactly which guarantees your platform gives you, and exploit them without lying to yourself.**

That is where tagged pointers, generational pointers, and related lock-free techniques live.

Not in the kingdom of black magic. In engineering.

## First: what is actually atomic in lock-free code?

When people first hear "lock-free," they sometimes imagine turning some huge mutable structure into one giant atomic blob.

Of course not.

What usually becomes atomic is not the whole structure, but the **state that grants access to it**: a head pointer, a tail pointer, a handle, an index, or a small descriptor. The object graph behind it may be large; the synchronisation point is usually tiny.

That is why an "individual atomic value" can absolutely be a pointer to a much larger structure.

And that is also where the famous **ABA problem** appears.

## The ABA problem in one unpleasant picture

Imagine a classic lock-free stack:

```cpp
#include <atomic>

struct Node {
    int value;
    Node* next;
};

std::atomic<Node*> head = nullptr;

bool pop(int& out) {
    Node* old_head = head.load(std::memory_order_acquire);

    while (old_head) {
        Node* next = old_head->next;

        if (head.compare_exchange_weak(
                old_head,
                next,
                std::memory_order_acq_rel,
                std::memory_order_acquire)) {
            out = old_head->value;
            return true;
        }
    }

    return false;
}
```

Looks innocent. Then concurrency happens.

Thread 1 reads `head = A`, and plans to swap it to `A->next`.

Before it performs the CAS, Thread 2 pops `A`, does other work, and later pushes a node such that `head` becomes `A` again.

Now Thread 1 wakes up. It still sees `A`. CAS succeeds.

Bitwise, nothing changed: `A == A`.

Semantically, everything changed.

That is ABA.

Boost's own lock-free rationale describes exactly this problem: a CAS sees the same old value again and therefore misses the fact that the state changed in between. Its documented remedy is to associate a version counter with the value and update both atomically. ([Boost][1])

## The core idea: pointer + generation

The classic fix is simple in concept:

```cpp
#include <atomic>
#include <cstdint>

struct Node {
    int value;
    Node* next;
};

struct PointerState {
    Node* ptr;
    std::uint64_t generation;
};

std::atomic<PointerState> head;
```

Now the state is not just "pointer `A`".

It is "pointer `A`, generation 17".

If another thread removes `A`, reuses memory, and later puts `A` back, the value is no longer "the same" from the CAS perspective:

* before: `(A, 17)`
* after round-trip reuse: `(A, 18)`

That is enough to prevent the simplest ABA illusion.

This is the key mental model:

> **You are not protecting the object. You are protecting the meaning of the observed state.**

## But can `std::atomic<PointerState>` be lock-free?

Maybe. Maybe not.

That depends on the platform and the size of the state.

A pointer plus counter often wants a **double-width compare-and-swap**, and Boost explicitly documents that this is not available everywhere. Its rationale mentions that tagged pointers often require double-width CAS, and that this is one reason implementations vary by architecture. ([Boost][1])

So in practice you usually see one of three strategies:

1. **True double-width CAS**
   Compare-and-swap a pair like `{pointer, tag}` directly.

2. **Compressed / packed representation**
   Fit pointer bits and tag bits into one machine word.

3. **Fallback representation**
   Use indices, fixed-size pools, or even a small lock when the hardware does not offer the needed atomic primitive.

That third option matters more than people think. Portability in systems code never meant "every CPU runs the exact same trick." It meant "fast path where available, safe path where not."

## The part people oversimplify: pointer bits are not universally free

This is where folklore usually enters the room.

On x86-64 with **4-level paging**, linear addresses are checked for **48-bit canonicality**. Intel's documentation explains that bits `47:0` participate in translation, while bits `63:48` must match the sign-extension of bit 47. On systems with **5-level paging**, the usable linear-address width expands to **57 bits**, and canonicality rules change accordingly. ([Intel CDRD][2])

So the sentence:

> "We use only 48 bits out of 64, the rest are free"

is not a law of nature.

It is, at best, an architecture- and mode-specific observation.

Arm has its own story. AArch64's tagging ecosystem is built on **Top Byte Ignore (TBI)**, and Linux's arm64 MTE documentation states that MTE builds on TBI and derives logical tags from bits `59:56` of the virtual address. ([Kernel Documentation][3])

So yes, spare pointer bits are real.
No, they are not one universal C++ guarantee bestowed by the heavens.

They are platform contracts.

And platform contracts are exactly what systems programmers work with.

## A small illustrative tagging example

For metadata in **low bits**, alignment is often the simplest entry point.

If your nodes are aligned to 16 bytes, the lower 4 bits of the pointer are guaranteed zero and can carry tiny metadata:

```cpp
#include <cstdint>
#include <cassert>

template <class T>
class AlignedTaggedPtr {
    static_assert(alignof(T) >= 16, "Need at least 4 free low bits");

    static constexpr std::uintptr_t TAG_MASK = 0xF;
    static constexpr std::uintptr_t PTR_MASK = ~TAG_MASK;

public:
    static std::uintptr_t pack(T* ptr, std::uint8_t tag) {
        auto raw = reinterpret_cast<std::uintptr_t>(ptr);
        assert((raw & TAG_MASK) == 0);
        return raw | (tag & TAG_MASK);
    }

    static T* ptr(std::uintptr_t packed) {
        return reinterpret_cast<T*>(packed & PTR_MASK);
    }

    static std::uint8_t tag(std::uintptr_t packed) {
        return static_cast<std::uint8_t>(packed & TAG_MASK);
    }
};
```

This is a perfectly respectable technique for **small state flags**.

But notice the limitation: 4 bits give you only 16 tag values. That is enough for some protocols, but not a magic universal ABA shield. A tiny generation counter wraps quickly.

So for serious ABA defense, low-bit tagging is often just one tool among others, not the whole solution.

## What Boost.Lockfree actually does

This is not theoretical chest-thumping. Boost documents the pattern directly.

Its lock-free rationale says the common way to avoid ABA is to associate a version counter with the value and change both atomically. It also states that `boost.lockfree` uses a `tagged_ptr` helper for this purpose. On platforms where double-width CAS is unavailable, Boost documents alternative approaches, including fixed-size structures that use indices instead of full pointers. ([Boost][1])

The source layout reflects that design: `tagged_ptr.hpp` dispatches between a double-CAS implementation and a pointer-compression implementation. ([beta.boost.org][4])

And this is not just dead architecture. In Boost's queue implementation you can see tag handling in the node logic itself, including a comment that the tag is incremented "to avoid ABA problem." ([GitHub][5])

That is about as far from "stupid hack" as software gets.

## Linux: same family, different purpose

Now comes the part that often gets blurred in online arguments:

**not all tagged pointers are ABA counters.**

Linux uses related pointer-encoding ideas for several different jobs.

### XArray: tagged pointers as entry metadata

The XArray documentation says normal pointers stored in an XArray must be **4-byte aligned**, and it explicitly provides `xa_tag_pointer()`, `xa_untag_pointer()`, and `xa_pointer_tag()`. It also states that tagged pointers use the same bits that distinguish value entries from normal pointers. ([Kernel Documentation][6])

This is pointer tagging, yes.

But here the purpose is not "generation counter for ABA."
It is **compact metadata encoding inside the entry representation**.

The same docs also note that XArray does **not** support storing `IS_ERR()` pointers, because some of those encodings conflict with value entries or internal entries. ([Kernel Documentation][6])

That detail is beautiful, because it shows the real engineering tradeoff:
once you start encoding meaning into pointer representations, the encoding space becomes a resource.

### `ERR_PTR`: pointers as error carriers

Linux's `err.h` contains another classic trick.

The header explains that kernel pointers have redundant information, allowing a scheme where a function can return either a normal pointer or an encoded error in the same value. It defines helpers like `ERR_PTR`, `PTR_ERR`, and `IS_ERR`. The docs also warn that users should treat the encoding as opaque rather than assume a particular layout. ([GitHub][7])

Again: same family of technique, different goal.

Not ABA prevention.
Not lock-free progress.
Just efficient value encoding.

That distinction matters.

## The real portability rule

The immature version of the argument says:

> "This is non-portable, therefore stupid."

The adult version says:

> "This relies on architecture and ABI guarantees, so the implementation must encode those assumptions explicitly and provide a fallback."

That is exactly how serious low-level software is built.

Boost says so openly by providing different implementation paths depending on available hardware support. ([Boost][1])

Intel's own documentation shows that even the meaning of "unused address bits" changes with paging mode. ([Intel CDRD][2])

Arm's tagging story is explicitly tied to TBI/MTE support. ([Kernel Documentation][3])

So the portability answer is not "never do it."

It is "do it where the contract exists, and don't pretend the contract exists where it does not."

## One more important caveat: ABA is not the whole memory-safety story

This is the point people often miss after discovering tags and feeling invincible.

A generation counter helps with **state identity**.
It does **not** automatically solve **memory reclamation**.

If another thread can still dereference a node after it has been retired, you still need an actual reclamation strategy:

* hazard pointers
* epoch-based reclamation
* RCU-style schemes
* controlled object pools
* another lifetime-management protocol

Tagged pointers solve one class of concurrency bug. They do not grant immortality to freed memory.

## Conclusion

Tagged pointers and pointer+generation techniques are not dirty little tricks hidden in the basement of systems programming.

They are established patterns for representing more state in less space, or for making atomic state transitions more meaningful.

Sometimes they help fight ABA.
Sometimes they encode metadata.
Sometimes they carry compact error values.

Boost.Lockfree uses tagged pointers specifically for ABA prevention. Linux XArray exposes tagged pointer helpers for entry metadata. Linux `ERR_PTR` encodes errors in pointer-shaped values. Intel and Arm documentation both show that the exact feasibility of pointer tagging depends on architectural rules, not on wishful thinking. ([Boost][1])

So the real engineering question is not:

> "Is pointer tagging a stupid hack?"

It is:

> **Which guarantees am I relying on, and what is my safe fallback when they are absent?**

That is where quality lives.

---

If you want, I can also turn this into a sharper LinkedIn companion post with a more sarcastic opening and a shorter punchier ending.

[1]: https://www.boost.org/doc/libs/latest/doc/html/lockfree/rationale.html "Rationale"
[2]: https://cdrdv2-public.intel.com/671442/5-level-paging-white-paper.pdf "5-Level Paging and 5-Level EPT"
[3]: https://docs.kernel.org/arch/arm64/memory-tagging-extension.html "Memory Tagging Extension (MTE) in AArch64 Linux - The Linux Kernel  documentation"
[4]: https://beta.boost.org/doc/libs/1_72_0/boost/lockfree/detail/tagged_ptr.hpp "boost/lockfree/detail/tagged_ptr.hpp - 1.72.0"
[5]: https://github.com/boostorg/lockfree/blob/develop/include/boost/lockfree/queue.hpp "lockfree/include/boost/lockfree/queue.hpp at develop · boostorg/lockfree · GitHub"
[6]: https://docs.kernel.org/core-api/xarray.html "XArray - The Linux Kernel  documentation"
[7]: https://github.com/torvalds/linux/blob/master/include/linux/err.h "linux/include/linux/err.h at master · torvalds/linux · GitHub"
