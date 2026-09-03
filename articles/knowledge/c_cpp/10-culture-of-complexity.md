### C++ CULTURE OF COMPLEXITY

IMO the main source of C++ complexity isn't fact of legacy itself, but the uneven way the language evolved. C++ didn't grow along a single paradigm, like, for example, Rust - it accumulated distinct layers, each introduced at a different time, under different constraints, and with different goals in mind.

The OOP wave, templates, the STL, and later the big C++11 push (move semantics, concurrency, lambdas) all solved real problem - but each introduced its own idioms, mental models, and stylistic norms. The result isn't one coherent style, but several overlapping ones that often coexist in the same codebase.

That's why modern C++ can feel inconsistent or hard to read at a glance: you're often switching contexts between fundamentally different "dialects" of the same language.

So if the developer picks up C++ today, the real challenge isn't learning syntax - it's learning to navigate this culture of complexity (it's not my phrase, but Scott Meyers' - who know about the C++ more than 99% of developers): understanding which subset you're in, why it exists, and when not to use it.

### WHAT IS MODERN C++

The examples you mentioned aren't really "modern C++" anymore - they're baseline C++ at this point.

RAII has been there since the beginning. Smart pointers came from Boost in 90s and landed in C++11. Move semantics is also C++11 - that's ~15 years old now. If a codebase is still struggling with those, the problem isn't the language, it's adoption.

What's actually modern C++ (23-26 era) looks different:

Concepts - constraints become part of the interface, not comments

Ranges, views -composable, lazy pipelines instead of iterator gymnastics, like generators in Python

std::expected - explicit error handling instead of exceptions or ad-hoc codes

Coroutines - structured async without callback hell

std::span/mdspan - safe, non-owning memory views

Modules - real dependency boundaries, not preprocessor

So yes - C++ didn't get "too complex" - it kept evolving. The gap people feel is often talk about the immense distance between C++98 habits and C++26 reality.
