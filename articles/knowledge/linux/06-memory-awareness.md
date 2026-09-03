Interesting question: has anyone seriously attempted a kernel or hardware-software co-design where applications could express physical memory topology awareness instead of seeing only a flat virtual address space?

We already expose NUMA nodes, huge pages, CPU affinity, cache hierarchy hints, memory tiers, and even HBM on some platforms. But what about going further?

Imagine a Linux extension where applications could request:

- placement within specific DRAM banks/ranks/channels
- row-aware allocation for predictable access patterns
- cache-line and page coloring at scale
- topology-aware matrix and tensor layouts
- explicit avoidance of bank conflicts and row-buffer thrashing.

The API could look conceptually similar to NUMA policies today, but extended down to DRAM topology. HPC, HFT, telecom, industrial control, and other latency-sensitive domains would be happy to gain couple of nanoceconds from such deterministic placement.

Of course, there are enormous challenges. Still, I'm curious whether there were research kernels, Linux patches, academic projects, or specialized RTOSes that explored this idea seriously.
