#include <algorithm>
#include <array>
#include <cstdint>
#include <cstddef>

struct Order {
    std::uint64_t ts;
    std::uint32_t id;
    std::uint32_t qty;
};

volatile std::uint64_t sink;

std::uint64_t sort_orders(Order* data, std::size_t n) {
    std::sort(data, data + n, [](const Order& lhs, const Order& rhs) {
        if (lhs.ts != rhs.ts) return lhs.ts < rhs.ts;
        return lhs.id < rhs.id;
    });

    std::uint64_t sum = 0;
    for (std::size_t i = 0; i < n; ++i) {
        sum += data[i].ts;
        sum += data[i].id;
        sum += data[i].qty;
    }
    sink = sum;
    return sum;
}

int main() {
    std::array<Order, 8> data{{
        {9, 4, 10}, {3, 2, 11}, {7, 1, 12}, {3, 1, 13},
        {8, 8, 14}, {1, 9, 15}, {5, 7, 16}, {5, 3, 17}
    }};
    return static_cast<int>(sort_orders(data.data(), data.size()));
}
