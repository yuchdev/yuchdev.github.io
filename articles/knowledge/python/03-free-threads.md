### PYTHON FREE THREADS

The flip side is that Python spent decades assuming a single-threaded world. A lot of libraries quietly relied on that - sometimes for performance, sometimes for correctness. Remove that assumption, and you may expose races, subtle bugs, or just plain breakage.

So I wouldn't rush to flip the switch on mature systems.

Where it really shines is new code. If you design with real multithreading in mind from day one - clear ownership, minimal shared state, well-defined synchronization - you can actually benefit from it instead of fighting it.

In a way, it's a reset: Python is finally getting proper parallelism, but we also have to relearn some discipline that other ecosystems have lived with for years.
