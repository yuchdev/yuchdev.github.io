### WHEN TDD UNFIT

TDD is one of those ideas that sounds morally correct: write tests first, let them drive design, end up with clean, reliable code. And sometimes it genuinely works that way. But the uncomfortable truth is that TDD is far from the universal tool - and forcing it everywhere without analyzing domain almost always make things worse.

The core assumption behind TDD is stability: you know what the system should do, at least at the level of behavior. But in many real-world scenarios, that assumption simply doesn't hold.

Take early-stage systems where requirements are always moving. You're not refining behavior - you're discovering it. Writing tests first in this context often means encoding guesses. A week later, half those tests become obsolete, not because the code is wrong, but because reality changed. Now you're maintaining a test suite that reflects a past version of the product that never truly existed.

Architecture-heavy work has a similar problem. When you're designing a subsystem and its wiring - say, a new concurrency model or a cross-platform abstraction layer - the shape of the solution evolves as you go. Interfaces shift, responsibilities move, boundaries collapse and reappear. TDD in this phase can anchor you too early to a design that felt right in the first hour, but doesn't survive contact with complexity.

Then there are research-driven projects. Machine learning, signal processing, experimental algorithms - here, the expected output is often unknown. You don't write a test that says "this is correct," you write code to explore whether something can be correct. In such cases, TDD becomes almost absurd: you're asked to assert truth before you've even defined it.

Even in more conventional domains, there are counterexamples. UI-heavy applications, for instance, often resist meaningful test-first workflows because the value lies in interaction, not pure function output. Or performance-critical systems, where correctness is trivial but timing, memory layout, and cache behavior is real subject of testing - and those are notoriously hard to estimate as tests upfront.

None of this makes TDD useless. In stable domains - well-defined APIs, data transformations, business logic with clear rules - it shines. It enforces discipline, prevents regressions, and documents intent. But outside those boundaries, it can turn into a ritual, process for the sake of process: writing tests not because they help, but because the workflow and habit demand it.
