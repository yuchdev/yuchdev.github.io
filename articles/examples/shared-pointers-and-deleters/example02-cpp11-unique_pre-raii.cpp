#include <cstdio>
#include <iostream>
#include <memory>
#include <type_traits>


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
