 # "Let's Take Safe-by-Design and Ordinary C++ Languages" (from 90s ads)
"C++ is under attack", "Rust is safe by design", "WG21 has 10 years" - all of these catchy headlines miss the real issue.
### 1. Security is not a property of a programming language in isolation
It's an emergent result of engineering practice.
Memory safety helps, but real security still comes from reviews, threat modeling, fuzzing, SAST/DAST, CI gates, dependency hygiene, incident response - and experienced engineers. With poor practices or inexperienced teams, the most "safe-by-design" tool becomes unsafe.
What is often ignored is that real-world security comes from:
- code review culture and reviewer competence
- fuzzing, sanitizers, static and dynamic analysis
- CI gates, deployment discipline, and incident response
- ecosystem maturity and operational experience
### 2. Leave the old bugs in the past
Then, If not for a decade, then at least for the last 7-8 years, I honestly haven't seen classic C/C++ memory bugs in production code outside of multithreading contexts.
With C++11 and later, single-threaded code is increasingly hard to break in "old-school" ways.
RAII, smart pointers, containers, move semantics, lifetime-bound references, sanitizers - the language and tooling stack is simply too strong now.
In practice, memory safety issues today are overwhelmingly concurrency issues:
- A thread accessing an object that has already been destroyed
- A lambda / async task outliving the scope it captured
- ABA' problems in lock-free structures
- Incorrect ownership transfer between threads
- Subtle data races turning into "ghost" UAFs
These are not the classic double delete, "memory leaks", or dangling references bugs we associate with 90s C++.
Those are largely engineered out by modern idioms and standard library usage.
In other words, modern C++ didn't just make memory safer - it pushed most remaining danger into the concurrency domain, where reasoning is fundamentally harder and tooling is still catching up.
If you see a memory bug today, chances are high it's really a lifetime + threading bug.
### 3. A *theoretically* safer language does not guarantee a safer system.
"Safer but obscure" tool can actually be more dangerous.
A mature C++ stack typically means: battle-tested libraries, known failure modes, robust debugging/profiling, and deep operational knowledge.
A "new shiny safe language" with weaker ecosystem, thin tooling, fewer experienced maintainers and reviewers can increase risk - because the organization's ability to detect and respond to threats degrades.
We've just seen critical CVEs in Rust - I wonder why it even surprise anyone. You can make any tool unsafe with poor practices, rushed deadlines, or inexperienced teams. "Safe by design" does not mean "safe without discipline"
There's also an uncomfortable but important factor: economics.
If a language is hard to hire for, organizations often compensate by hiring less experienced developers, overloading seniors, accumulating "temporary" solutions, and cutting corners under deadlines. That's not hypothetical - security failures often look like staffing/training/ops failures more than just "oops, unsafe pointer"
And the C++ in 2025 is not "C++ from the 90s". With modern subsets, RAII, ownership conventions, sanitizers, fuzzers, and strict guidelines, it can be made dramatically safer today, at scale, in ecosystems that already exist. Waiting for WG21 to "solve safety" in one leap is neither realistic nor necessary.
The right discussion isn't C++ vs Rust.
It's engineering discipline vs wishful thinking.
Use memory-safe languages where they fit.
Use C++ where it fits. But don't pretend that switching syntax replaces process, experience, and responsibility - because that belief is far more dangerous than any raw pointer ever was.
