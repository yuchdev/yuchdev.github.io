### PROFILING-DRIVEN ALLOCATION-POOL (TODO: ARTICLE)

One one more interesting use of memory pools is profiling-driven allocation.

A pool can collect real statistics per run (object size distribution, lifetime, peak usage). That data then feeds the next run: pre-sized blocks, better slab ratios, fewer fallbacks.

It's essentially feedback-guided memory layout - simple, practical, and very effective in long-running systems (we designed it for the huge risk-management system)
