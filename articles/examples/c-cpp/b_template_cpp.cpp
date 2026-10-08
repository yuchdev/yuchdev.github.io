#include <cstddef>
#include <cstdint>

template <class F>
void apply_transform(int* out, const int* in, std::size_t n, F op) {
    for (std::size_t i = 0; i < n; ++i) {
        out[i] = op(in[i]);
    }
}

volatile int sink;

int run_apply(const int* in, std::size_t n) {
    int out[64];
    if (n > 64) n = 64;

    apply_transform(out, in, n, [](int x) {
        return x * 3 + 1;
    });

    int sum = 0;
    for (std::size_t i = 0; i < n; ++i) {
        sum += out[i];
    }
    sink = sum;
    return sum;
}

int main() {
    const int in[8] = {1,2,3,4,5,6,7,8};
    return run_apply(in, 8);
}
