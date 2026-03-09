#include <cstdio>
#include <cerrno>
#include <iostream>
#include <utility>


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