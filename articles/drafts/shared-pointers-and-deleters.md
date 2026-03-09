Inspired by the post above, I'd add one broader angle.

Smart pointers are really just a standardized generalization of RAII

Long before C++11, many of us were already writing tiny wrapper classes or functors around resources with a very simple idea: create the resource and forget about cleanup - the destructor will handle it. Files, sockets, locks, C API objects, transactions, temporary state guards - the pattern was everywhere.

Often they were created as local classes inside functions, like we do with lambdas today.

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

In a modern C++, `unique_ptr` is enough in the overwhelming majority of cases - such an `std::vector` of smart pointers. It expresses exclusive ownership, has zero reference counting overhead, no heap allocation for control block, and usually optimized down to something as small and cheap as a raw pointer.

Here a small nuance worth mentioning: if the deleter is stateless, the size of `unique_ptr` typically does not increase at all. It happens thanks to Empty Base Optimization, and the deleter occupies no storage. So wrapping C APIs like `FILE*`, `SDL_Window*`, or similar resources can remain as compact as a raw pointer while still being fully RAII-safe.

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

Where `shared_ptr` becomes extremely useful is runtime. Its deleter is stored in the control block and type-erased, which means the deletion policy can be chosen at runtime without affecting the pointer type itself. That's what allows patterns like `shared_ptr<void>` or dynamically selecting the cleanup strategy when integrating with external libraries.

[Example 3](https://godbolt.org/z/G4cMPTPYY) - `std::shared_ptr` with runtime-selected deleter

```cpp
// runtime decision from CLI
// ./example03 -> uses new/delete
// ./example03 x -> uses malloc/free
int main(int argc, char** argv)
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

Of course, that flexibility comes with trade-offs: control blocks, atomic reference counting, and additional allocations. That's why I follow a simple rule of thumb:

* `std::unique_ptr` - default ownership tool
* `std::shared_ptr` - only when lifetime is genuinely shared or deletion policy must be runtime-erased
* `std::weak_ptr` (or raw pointers, or references) - non-owning access
