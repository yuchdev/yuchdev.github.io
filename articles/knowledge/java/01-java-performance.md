There are multiple ways to make Java competitive with C++ in performance-sensitive workloads.

You can use a fixed heap with -Xms/-Xmx and huge pages, aggressive JIT optimizations, C++-style cache-locality and allocation discipline, SIMD through the Vector API, native interop through FFM, and choose a GC strategy that actually matches the workload.

Of course, Java will not magically beat carefully tuned native apps everywhere. But "Java is slow" is becoming the same kind of slogan as "C++ is memory-unsafe." That is, technically rooted in real but outdated class of problems from the previous century, but far too simplistic to describe what experienced engineers can achieve with the language today.
