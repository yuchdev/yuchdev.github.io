If not for a decade, then at least for the last 7-8 years, I honestly haven't seen classic C/C++ memory bugs in production code outside of multithreading contexts.

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
