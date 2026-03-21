Structured Post (~3000 chars)

But that "individual value" can also be a pointer to a larger structure.

Of course, we can't make the whole structure atomic - but we can make the pointer state atomic. One common trick is to include a generation (or version) counter together with the pointer itself.

You probably know that on modern systems we use only 48 bits for virtual addressing out of the 64-bit word. The remaining bits can be used to store a small generation counter. Updating the pointer and generation together with a single atomic operation helps avoid classic problems like ABA.

Naturally this requires a bit of pointer manipulation - masking, packing/unpacking the fields, and making sure the alignment assumptions hold - but it's a practical way to manage larger structures without locking the entire object with the mutex, used, for example, from Boost.Lockfree to Linux kernel (did not check where exactly).

Let's look at concrete examples.


---

1. Boost.Lockfree

Boost implements a tagged pointer specifically to address the ABA problem in lock-free structures.

Source file:

boost/lockfree/detail/tagged_ptr.hpp

Example concept:

struct tagged_ptr {
    pointer ptr;
    tag counter;
}

The tag acts as a generation counter.
CAS compares both pointer and generation to detect ABA transitions.

You can see it used in structures such as:

boost/lockfree/stack.hpp

Reference:

https://github.com/boostorg/lockfree/blob/develop/include/boost/lockfree/detail/tagged_ptr.hpp


---

2. Linux kernel

The Linux kernel also relies heavily on pointer tagging techniques.

Example: XArray

Documentation:

https://docs.kernel.org/core-api/xarray.html

Kernel code provides helpers like:

xa_tag_pointer()
xa_untag_pointer()

File:

include/linux/xarray.h

These functions encode metadata directly into pointer bits, relying on alignment guarantees.


---

3. Pointer encoding in Linux error handling

Another classic kernel trick is encoding error codes in pointers.

File:

include/linux/err.h

Example:

#define ERR_PTR(error) ((void *)((long)(error)))
#define IS_ERR(ptr) ...

This pattern has existed in the kernel for decades.

Reference:

https://github.com/torvalds/linux/blob/master/include/linux/err.h


---

4. Portability objection

The portability argument sounds stronger than it actually is.

In systems programming, portability never meant that every architecture runs the exact same implementation.

Instead we do what every serious low-level project does:

architecture-specific optimization paths

conditional compilation

safe fallback implementation


If an architecture lacks required atomic primitives, libraries can fall back to:

index-based structures

software atomics

or even a simple spinlock


And a spinlock fallback is not a catastrophe.
If the critical section is tiny and contention low, a few spins may still outperform heavier synchronization primitives.


---

5. The real rule

The rule has never been:

> "Never touch pointer bits."



The real rule is:

> Use architecture guarantees carefully, and provide a safe fallback when they are not available.

6. Examples

Proof:

1. Boost.Lockfree uses tagged_ptr against ABA
https://git.new/ZcGm1Wb

2. Linux kernel explicitly supports tagged pointers - xa_tag_pointer
https://git.new/Xa4IP64

These projects are maintained by top engineers of the industry. I'd be careful calling their solutions "stupid"

If it sometimes feels like you stand in the middle of the world and everyone around is doing something stupid, that's usually wrong and a sign of inflated ego (and require treatment)

Portability? That's solved the way it always does in C++ - platform optimizations with conditional compilation and safe fallback (a simple spinlock)

The real engineering progress never was driven by "never touch these forbidden API/implementation details/system constraints" or by people who call stupid what they don't understand

If the technique is safe within the architectural guarantees and provides a clean fallback, then it's not a trick but pattern. That's how engineering progresses. It's is driven by those who constantly cross the boundaries - because that's how new patterns, optimizations and algorithms are discovered.

This is exactly how:

- Boost
- the Linux kernel
- lock-free libraries
- runtimes like V8 and JVM

have been engineered for decades.

Conclusion

Pointer tagging and pointer+generation techniques are not "clever hacks".

They are well-understood engineering patterns used to implement:

lock-free algorithms

ABA protection

memory optimizations

runtime value encoding


And the fact that Boost and the Linux kernel both rely on them should already be a strong hint.

The real question is not whether the trick is "stupid".

The real question is whether the implementation respects architecture guarantees and fallback strategies.

That is where engineering quality actually lives.