Why Pyston Failed - A Timeline of a Fast but Unstable Revolution

In 2013, Dropbox unveiled an ambitious C++ project: Pyston. The goal was bold but simple - make Python significantly faster without breaking compatibility. The first generation of Pyston was built around LLVM, aiming to bring modern JIT compilation to a language long criticized for interpreter overhead.

2013-2017: The Dropbox Era - Ambition Meets Reality

Pyston v1 delivered impressive benchmark results. On selected macrobenchmarks, it reported ~30% performance gains over CPython. The architecture used method-at-a-time JIT compilation, inline caching, and aggressive optimizations of attribute lookups and function calls.

On paper, it worked.

In production, it struggled.

The problem wasn't raw speed - it was compatibility. Python's ecosystem depends heavily on C extensions compiled against the CPython ABI. Even small divergences in object layout, refcounting behavior, or interpreter internals caused subtle breakages. Packages that "just worked" under CPython required rebuilding or failed entirely.

Even for a company like Dropbox, maintaining a forked interpreter while tracking and merging upstream Python became increasingly expensive. Meanwhile, the Python core team was independently improving performance.

In 2017, Dropbox officially discontinued active development of Pyston v1.

Not because it was slow - but because sustaining a divergent runtime was too costly relative to its gains.

---

2019-2022: The Bloomberg Revival - Pragmatism Over Reinvention

The story didn't end there.

In 2019, Bloomberg engineers revived the project, launching what became known as Pyston v2. This time, the strategy changed. Instead of building a semi-independent runtime, the team forked CPython and applied targeted optimizations while preserving ABI compatibility.

The result: measurable improvements catch-up again - often 20-30% faster on real workloads. Crucially, Pyston v2 maintained compatibility with most C-extension wheels.

It was technically sound. It was production-grade. It even found niche adoption in performance-sensitive backend services.

And yet - it never became mainstream.

Why?

1. CPython Itself Got Faster

Between Python 3.10 and 3.12, the core interpreter underwent major improvements:

- Adaptive bytecode specialization
- Inline caching
- Zero-cost exceptions
- Faster frame evaluation

What once required a fork could now be achieved upstream.

2. Marginal Gains vs Ecosystem Inertia

A 25% speedup sounds impressive - but most real-world Python bottleneck were:

- Filesystem I/O
- Extensions interop (NumPy, Pandas)
- Network
- Database

In those cases, interpreter speed does not matter. For many users, switching runtimes simply wasn't worth the operational risk.

3. Maintenance Economics

Even a carefully maintained fork must constantly track CPython evolution. As Python's internals modernized (PEG parser, improved bytecode, experimental JIT work), the cost of divergence rose again.

Eventually, active commercial backing faded, and development stalled.

---

The Deeper Lesson

Pyston didn't fail because it was slow.

It failed because Python's ecosystem gravity is enormous.

Compatibility is more valuable than raw speed.

Maintaining a fork is organizationally expensive (usually more than estimated)

Upstream optimization proved more sustainable than parallel evolution.

And ecosystem is harder to beat than a benchmark.

---
