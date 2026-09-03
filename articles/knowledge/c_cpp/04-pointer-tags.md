Yes, but the important nuance is that on some architectures we already do store metadata in "pointers" - just not in a fully general 128-bit way.

On mainstream x64, a pointer is 64 bits, but historically only 48 virtual-address bits were implemented; newer 5-level paging extends this to 57 bits. The remaining high bits are not arbitrary free storage: addresses must be canonical, so abusing them is fragile and mode-dependent. 

Still, pointer tagging is real and used in practical development - I used them already in 2012-2013 in low-latency systems with well-defined hardware setup. Lock-free algorithms often pack a pointer plus a generation counter/version tag to avoid ABA problems, assuming alignment leaves low bits unused. Runtimes also use tagged pointers for small integers, type tags, GC marks, etc.

ARM goes further architecturally: features like Top Byte Ignore, Pointer Authentication, and Memory Tagging explicitly use pointer-adjacent metadata for security and diagnostics.

So I agree with the direction, in a sense that 128-bit chips are better, but for many use cases, 64-bit pointers already have exploitable structure: unused low bits from alignment, partially unused high bits depending on ABI/paging mode, and architecture-supported tagging. Luckily, the industry is already walking that road incrementally: tagged pointers, PAC, MTE, fat pointers
