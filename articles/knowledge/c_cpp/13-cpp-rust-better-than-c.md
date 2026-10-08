### C++/RUST VS C

Now addressing "we're talking about kernel, not any other app"

Kernel work doesn't mean "use the poorest tools available"
It means "use tools that give you control and reduce risk"

C was the only realistic option in the past. That's no longer true.

There are entire classes of things that are entirely impossible or unsafe to express in C, but natural in Rust or modern C++(23-26)

1. Memory safety invariants (ownership, lifetimes): in C they're discipline; in Rust they're enforced by compiler.

2. Type-safe resource management (RAII): deterministic cleanup tied to scope. In C this is manual on each exit path and fragile

3. Zero-cost abstractions: generics/templates that produce specialized code without runtime overhead. In C, you fall back to macros or void*, losing type safety.

4. Thread safety guarantees: Rust's Send/Sync or C++'s strong type systems prevent classes of data races at compile time. In C, it's all on the reviewer.

5. Safer APIs by construction: encoding constraints in types (e.g., "this buffer is initialized and sized correctly") instead of comments.

Yes, we're talking about kernels. That's exactly where these guarantees matter most - where a bug isn't "just a bug" but a crash or CVE
