#include <stddef.h>
#include <stdint.h>

static int transform_value(int x) {
    return x * 3 + 1;
}

void apply_transform(int* out, const int* in, size_t n, int (*op)(int)) {
    for (size_t i = 0; i < n; ++i) {
        out[i] = op(in[i]);
    }
}

volatile int sink;

int run_apply(const int* in, size_t n) {
    int out[64];
    if (n > 64) n = 64;

    apply_transform(out, in, n, transform_value);

    int sum = 0;
    for (size_t i = 0; i < n; ++i) {
        sum += out[i];
    }
    sink = sum;
    return sum;
}

int main(void) {
    const int in[8] = {1,2,3,4,5,6,7,8};
    return run_apply(in, 8);
}
