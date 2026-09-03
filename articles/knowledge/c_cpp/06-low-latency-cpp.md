### LOW-LATENCY C++

No STL, no allocations, no exceptions, no kernel calls is a basic understanding.

It's also an understanding how code behaves on real hardware, under real load:

- Cache line size, false sharing, prefetching
- Data layout, AoS vs SoA
- NUMA effects and cross-socket penalties
- Instruction pipelining, stalls, vectorization
- CPU affinity
- Kernel bypass
- Tooling (Cachegrind, perf, VTune, flamegraphs)

Most interviews are really asking:

"Do you understand what your C++ turns into at runtime?"
