#include <cstddef>
#include <cstdlib>

extern "C" int process(unsigned char* data, std::size_t size);

class Buffer {
public:
    explicit Buffer(std::size_t size)
        : data_(static_cast<unsigned char*>(std::malloc(size))),
          size_(size)
    {
    }

    ~Buffer()
    {
        std::free(data_);
    }

    unsigned char* data() const { return data_; }
    std::size_t size() const { return size_; }

private:
    unsigned char* data_;
    std::size_t size_;
};

extern "C" int run(std::size_t size)
{
    Buffer buffer(size);

    if (buffer.data() == nullptr)
        return -1;

    return process(buffer.data(), buffer.size());
}
