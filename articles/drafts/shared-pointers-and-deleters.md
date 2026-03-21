# RAII: One of the Most Powerful Patterns in C++

One of the most powerful ideas in C++ is surprisingly simple: *tie resource management to object lifetime*.
It sounds almost trivial - until you realize how many systems in other languages are still trying to reinvent this idea thirty years later.

This pattern is known as *RAII* - Resource Acquisition Is Initialization. Despite the slightly confusing name, the principle is straightforward:

> When an object is constructed, it acquires a resource.
> When the object is destroyed, the resource is released.

The consequences of this idea are profound.

First, RAII gives C++ *deterministic resource management*. Resources such as files, memory, locks, sockets, or GPU handles are released exactly when objects go out of scope. No garbage collector wandering through memory later. No background cleanup thread trying to guess your intent. The structure of the program itself decides exactly when cleanup happens.

Second, RAII provides strong exception safety almost for free. If an exception occurs and the stack unwinds, destructors of all fully constructed objects are still executed. Resources are automatically released even in failure paths, which dramatically simplifies error handling.

Third, RAII scales naturally with program complexity. Complex systems become easier to reason about because *ownership and lifetime are expressed directly in the type system* rather than hidden in procedural cleanup logic.

For these reasons RAII became one of the defining idioms of C++ programming long before the modern standard library appeared. 
Developers routinely wrote tiny wrapper classes around files, sockets, mutexes, and other resources, relying on destructors to guarantee cleanup. Entire codebases quietly accumulated small RAII guardians protecting resources from leaks and forgotten cleanup paths.

Modern smart pointers did not invent this pattern - they simply standardized one of its most common applications.
C++ developers often discuss smart pointers in terms of ownership models: `unique_ptr`, `shared_ptr`, `weak_ptr`. But historically, smart pointers are really something simpler.

### The RAII pattern before C++11

Before C++11, the RAII pattern was already deeply embedded in everyday C++ programming. We routinely wrote small wrappers around resources with a simple rule:

> Acquire the resource once, and forget about cleanup - the destructor will handle it.

Files, sockets, mutexes, transactions, GUI state guards, C API handles - the pattern appeared everywhere.
Often these wrappers were extremely small. It was common to define them locally inside functions, exactly the way we use lambdas today.
The following example shows a typical RAII wrapper that many C++ developers wrote long before the standard library provided smart pointers.

[Example 1](https://godbolt.org/z/sYen75jsM) - classic RAII wrapper "before standard smart pointers"
```cpp
int main()
{
    class FileHandle
    {
    public:
        FileHandle(const char* path, const char* mode)
            : f_(std::fopen(path, mode)), err_(f_ ? 0 : errno) {}
        ~FileHandle()
        {
            if (f_) std::fclose(f_);
        }
        FILE* get() const { return f_; }
        int error() const { return err_; }
        bool valid() const { return f_ != 0; }
    private:
        FileHandle(const FileHandle&);
        FileHandle& operator=(const FileHandle&);
        FILE* f_;
        int err_;
    };
    FileHandle file("example.txt", "w");
    if (!file.valid())
    {
        std::cerr << "Failed to open file\n";
        return 1;
    }
    std::fputs("Hello from classic RAII\n", file.get());
    return 0;
}
```
---
### Why `unique_ptr` became the default RAII tool
Modern C++ (starting from C++11) simply standardized this ownership pattern.
In most real code, `std::unique_ptr` is enough in the overwhelming majority of cases (such an `std::vector` of smart pointers). It expresses exclusive ownership, has no reference counting overhead, and requires no additional allocations.
A container like
```
std::vector<std::unique_ptr<T>>
```
represents exactly what RAII was designed for: clear ownership and deterministic cleanup.
#### Optimized smart pointer
In practice, `unique_ptr` is often optimized down to something as small and cheap as a raw pointer.
There is also a nuance many developers overlook.
If the deleter is *stateless*, `unique_ptr` usually *does not increase the pointer size at all*. This works thanks to *Empty Base Optimization*: the deleter occupies no storage.
This means wrapping C APIs like `FILE*`, `SDL_Window*`, or other handles can remain *pointer-sized*, while still being fully RAII-safe.
#### Type-safety and compile-time control
Another important detail is that the deleter is *part of the `unique_ptr` type itself*
For example:
```cpp
std::unique_ptr<T>
std::unique_ptr<T, FileCloser>
```
These are *different types*. The deletion policy is encoded directly in the type system.
At first glance this may look like a minor technical detail, but it reflects a core philosophy of C++: important program properties should be visible in the type system whenever possible.
With `unique_ptr`, the compiler knows exactly:
* what object is owned
* how it will be destroyed
* whether ownership can be transferred
This information is available *at compile time*, which allows the compiler to optimize aggressively and catch certain mistakes early.
It also reinforces one of the classic C++ principles:

> *You don't pay for what you don't use.*

Because the deleter type is known at compile time, the compiler can often inline it completely. When the deleter is stateless, Empty Base Optimization ensures it consumes no storage, so the smart pointer remains pointer-sized.
This is one of the reasons `unique_ptr` is such a good match for wrapping low-level C APIs. We gain type safety and deterministic lifetime management without paying any runtime overhead.
The following example demonstrates this property.

[Example 2](https://godbolt.org/z/GbcfxrKnv) - `std::unique_ptr` with stateless deleter
```cpp
int main()
{
    struct FileCloser
    {
        void operator()(FILE* f) const noexcept
        {
            if (f) std::fclose(f);
        }
    };
    using DefaultIntPtr = std::unique_ptr<int>;
    using CustomIntPtr  = std::unique_ptr<int, FileCloser>; // for size demo only, type differs
    static_assert(
        std::is_empty_v<FileCloser>, 
        "Deleter must be stateless"
    );
    // Correct size comparison with matching pointee type
    using DefaultFilePtr = std::unique_ptr<FILE, std::default_delete<FILE>>;
    using CustomFilePtr  = std::unique_ptr<FILE, FileCloser>;
    // std::default_delete<FILE> is also stateless, but calling delete on FILE* is wrong for fopen
    // We compare sizes only, not actual usage of DefaultFilePtr
    static_assert(
        sizeof(DefaultFilePtr) == sizeof(CustomFilePtr),
        "Stateless deleter should not increase unique_ptr size"
    );
    auto file = std::unique_ptr<FILE, FileCloser>(std::fopen("example.txt", "w"));
    if (!file)
    {
        std::cerr << "Failed to open file\n";
        return 1;
    }
    std::fputs("Hello from unique_ptr\n", file.get());
    return 0;
}
```

---

### A note on allocators and `unique_ptr`

Interestingly, during the standardization process there were *several proposals to add allocator support to `unique_ptr`*. These proposals were repeatedly discussed by the committee and ultimately rejected.

The reason is tied to the philosophy of `unique_ptr` itself.
`unique_ptr` models *exclusive ownership of a single object*. Allocation strategy is considered a separate concern. If a custom allocation mechanism is required, it is expected to be handled:

* by the allocation site (`new`, factory, custom allocator),
* or by the deleter itself.

Adding allocator machinery directly to `unique_ptr` would complicate a type that is intentionally designed to remain *minimal and zero-overhead*.
In contrast, `shared_ptr` *does* support allocators (`allocate_shared`) because its control block and object storage are tightly coupled.

---

## Where `shared_ptr` becomes powerful

`std::shared_ptr` solves a different problem.

Its main advantage is not convenience but *runtime flexibility*.

Unlike `unique_ptr`, the deleter is stored inside the *control block* and is *type-erased*. This means the deletion policy can be selected at runtime without changing the pointer type.

That is what allows patterns such as:

* `shared_ptr<void>`
* dynamically selected cleanup policies
* safe integration with external memory management systems

The following example demonstrates this idea: the program chooses the deletion mechanism at runtime via a command-line parameter.

[Example 3](https://godbolt.org/z/G4cMPTPYY) - `std::shared_ptr` with runtime-selected deleter
```cpp
/ runtime decision from CLI
 * ./example03 -> uses new/delete
 * ./example03 x -> uses malloc/free
 */
int main(int argc, char argv)
{
    bool use_malloc = (argc > 1);
    std::shared_ptr<int> ptr(
        use_malloc
            ? static_cast<int*>(std::malloc(sizeof(int)))
            : new int,
        [use_malloc](int* p)
        {
            if (!p) return;
            if (use_malloc)
            {
                std::cout << "free()\n";
                std::free(p);
            }
            else
            {
                std::cout << "delete\n";
                delete p;
            }
        });
    *ptr = 42;
    std::cout << *ptr << std::endl;
}
```

---

### The cost of flexibility

This flexibility comes with real costs.

A `shared_ptr` seems extremely convenient, but but under the hood it carries a small accounting department tracking reference counts, deleters, and control blocks. As a result, using `shared_ptr` typically involves additional allocations and atomic operations.

There is also a subtle consequence of this design that surprises many developers.
When using `make_shared`, the object is constructed inside the control block, which allows the implementation to allocate both the control structure and the object in a single memory block. However, this optimization means that `make_shared` cannot accept a custom deleter. If a custom deletion policy is required, the object must be created manually:

```cpp
std::shared_ptr<Foo> p(new Foo, deleter);

```

In that case the implementation usually performs two allocations again - one for the object and one for the control block.
Another cost becomes visible in multithreaded systems. Every copy and destruction of a `shared_ptr` updates the reference counter:

| High-level action | Resulting count |
|-------------------|------------------|
| copy | atomic increment |
| destruction | atomic decrement |

In high-performance systems - servers, real-time pipelines, or low-latency applications - these atomic operations can become visible in profiling.
For that reason many performance-oriented codebases prefer a simpler ownership model: a single `std::unique_ptr` representing the owner, while other parts of the system access the object through non-owning raw pointers or references.

```cpp
class System {
    std::unique_ptr<Resource> resource;
};
Resource* r = system.resource.get(); // non-owning observation
```

The ownership remains explicit, but the system avoids the overhead of shared reference counting.
These costs are usually acceptable - but they are not free.

---

For this reason many performance-sensitive codebases follow a very simple rule of thumb:

* `std::unique_ptr` - default ownership tool
* `std::shared_ptr` - only when lifetime is genuinely shared or deletion must be chosen at runtime
* `std::weak_ptr` (or raw pointers / references) - non-owning access

---

## Conclusion

RAII itself did not change with modern C++.
What changed is that the standard library provided reusable, well-defined implementations of the most common RAII ownership patterns.

`unique_ptr` represents deterministic ownership with minimal overhead.
`shared_ptr` represents shared lifetime with runtime flexibility.

Both are simply different ways of expressing the same fundamental C++ idea:

> Resource management belongs in the object lifetime.

And smart pointers post-C++11 are an industrialized RAII generalization tool.
