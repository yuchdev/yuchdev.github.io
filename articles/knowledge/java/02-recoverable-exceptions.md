### EXCEPTIONS AS A PART OF CONTRACT

Both Java and C++ tried to make declaring all possible failures in advance part of their type systems, and both failed spectacularly. 

Remember, in C++98 we had exception specifications: throw(T1, T2, ...) in function signatures - an attempt very similar in spirit to Java's checked exceptions: "make error behavior explicit and enforce it at compile time"

When I was a young engineer, I remember thinking:

Why on earth developers don't use exception specifications everywhere?

They are explicit! Safe! Academically correct! This is for developers with iron will,who clearly knows how error handling is supposed to work.

At least in a perfect world where unicorns involved 🦄 , APIs never change, abstractions don't leak, and every failure neatly fits into a predefined category.

Let's carefully unfold why I was wrong.

- Such API is hard to evolve (changing the list is an ABI and API nightmare)
- It is actively hostile to templates (generics in Java, respectively) and layered code. How do we know what exceptions type T throws?
- Mostly useless in real error handling
- Worst of all, they actively fought application stability at runtime instead of giving meaningful guarantees.

As a result, compilers started to ignore specifications, limiting consequences to a warning. 

### HOW IT PLAYED OUT IN JAVA

This seem similar to Java's checked exceptions, but only partly. Java made exceptions part of the contract - "Checked exceptions for recoverable conditions, runtime exceptions for programming errors". Sounds reasonable, until you try to apply it consistently.

Take checked IOException. 

In practice, whether it is recoverable or not, we can say only from the context where the code used:

In a CLI or GUI -> maybe recoverable?
In a service or backend -> maybe not?
In a pipeline -> maybe try retry?
In a library -> the author has no idea

The library author can't know the recovery strategy.
Yet checked exceptions force every caller to pretend they do.
The result? IOException becomes mandatory noise, not useful guidance.

LET'S FIX THIS MESS OF A DESIGN 

C++ eventually admitted the mistake.

In C++11, exception specifications were replaced by noexcept(), which is not a declaration, but a compile-time expression. The compiler can reason about it, optimize guarantees based on it, and enforce it consistently. That was the crucial fix.

But Java never had that escape hatch!

It is fundamentally harder to fix checked exceptions in Java:

- No compile-time metaprogramming. There's no equivalent of conditional noexcept(expr) that evaluated in compile-time
- Deep legacy entanglement. Checked exceptions are deeply wired into method signatures, interfaces, inheritance, overrides, lambdas, and interfaces
- Binary compatibility guarantees - 

Java "don't break old code" promise makes retrofitting semantics nearly impossible.

What they could afford is half-measures like introducing UncheckedIOException appeared in Java 8 - an explicit acknowledgment that the checked model doesn't compose well in modern codebases.

However, Java developers are crafty, and they came with several technically solid solutions:

- Wrapping checked exceptions into unchecked
- Translate checked exceptions into unchecked
- Use Optional<T> and result-style APIs instead of exceptions

### CONCLUSION

According to designers of C++ and Java, the contract assumes the callee knows the caller's intent.
That assumption is almost always wrong, and complicates API support by an order of magnitude.

None of this happened because language designers were not smart.
It happened because software engineering doesn't progress by deduction - it progresses by collision with reality. Learning by doing. That's not a failure of our industry. That's how our industry learning - the only way it actually can.
