#include <stdlib.h>
#include <stdint.h>
#include <stddef.h>

typedef struct {
    uint64_t ts;
    uint32_t id;
    uint32_t qty;
} Order;

static int cmp_order(const void* a, const void* b) {
    const Order* lhs = (const Order*)a;
    const Order* rhs = (const Order*)b;
    if (lhs->ts < rhs->ts) return -1;
    if (lhs->ts > rhs->ts) return 1;
    if (lhs->id < rhs->id) return -1;
    if (lhs->id > rhs->id) return 1;
    return 0;
}

volatile uint64_t sink;

uint64_t sort_orders(Order* data, size_t n) {
    qsort(data, n, sizeof(Order), cmp_order);

    uint64_t sum = 0;
    for (size_t i = 0; i < n; ++i) {
        sum += data[i].ts;
        sum += data[i].id;
        sum += data[i].qty;
    }
    sink = sum;
    return sum;
}

int main(void) {
    Order data[8] = {
        {9, 4, 10}, {3, 2, 11}, {7, 1, 12}, {3, 1, 13},
        {8, 8, 14}, {1, 9, 15}, {5, 7, 16}, {5, 3, 17}
    };
    return (int)sort_orders(data, 8);
}
