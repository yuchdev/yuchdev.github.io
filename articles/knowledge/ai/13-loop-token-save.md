I haven't measured the exact token consumption, but loops, just like prompts, can be either expensive or efficient, depending on how smart you design them.

A well-designed loop shouldn't reload the entire world on every iteration. There are many ways to reduce token usage after the first pass is over

- pass only the relevant files or diffs for the iteration, not the whole repository;
- summarize previous iterations instead of replaying the full conversation;
- save the output of previous iteration (e.g. unit test output) and instead of loading same output in the context on the second iteration load its diff

In practice, the first iteration is usually the most expensive because it builds context. Subsequent iterations can be much cheaper if the loop carries only incremental state.
