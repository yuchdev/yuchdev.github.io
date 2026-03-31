#include <stdint.h>
#include <stddef.h>

static uint32_t mix32(uint32_t x) {
    x ^= x >> 16;
    x *= 0x7feb352dU;
    x ^= x >> 15;
    x *= 0x846ca68bU;
    x ^= x >> 16;
    return x;
}

static void init_table(uint32_t table[256]) {
    for (size_t i = 0; i < 256; ++i) {
        table[i] = mix32((uint32_t)i);
    }
}

volatile uint32_t sink;

uint32_t use_table(const uint8_t* data, size_t n) {
    uint32_t table[256];
    init_table(table);

    uint32_t acc = 0;
    for (size_t i = 0; i < n; ++i) {
        acc ^= table[data[i]];
    }
    sink = acc;
    return acc;
}

int main(void) {
    static const uint8_t data[8] = {1, 7, 42, 255, 3, 9, 11, 19};
    return (int)use_table(data, 8);
}
