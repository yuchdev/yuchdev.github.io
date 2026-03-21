If you've spent more than five minutes in a room with AI enthusiasts lately, you've likely heard the Great Performance Prophecy. It goes like this: "Since AI can type at ten thousand words per minute and doesn't care about syntax, why are we still using 'slow' languages like Python or JavaScript? Why not just ask the LLM to generate everything in C++, Rust, or hand-optimized Assembly? We could have the performance of a Ferrari with the development cost of a bicycle."

It’s a seductive vision. If the cost of typing code has dropped to near zero, surely we should move to the most "optimal" stack possible. Why bother with heavy frameworks when AI can generate a bespoke, tiny runtime tailored exactly for your specific task?

The logic seems sound at the first glance, but it usually collapses into a heap of technical debt already at the second.

The fundamental misunderstanding is this: AI has dramatically reduced the cost of writing code, but it hasn't touched the cost of correctness, verification, and ecosystem support. And in professional software engineering, those aren't just details—they are the entire game.

In this article, we explore why the "native-everything" future is a mirage, and why AI actually makes existing ecosystems *more* valuable, not less:

1.  The Statistical Gravity of Training Data: LLMs don't "know" languages; they learn patterns. Python and JavaScript dominate the training sets. When you ask for a React component, the AI is operating in a dense, well-mapped city. When you ask it to invent a custom C++ runtime, you're asking it to guide you through a dark forest where even the AI hasn't been before.
2.  The "Reviewer's Nightmare" Effect: If AI generates a custom framework for you, congratulations—you are now the only person on Earth who knows how it works. You've traded a well-known ecosystem for a private archaeological site that your colleagues (and your future self) will have to painstakingly reverse-engineer.
3.  The Complexity Tax: Most systems aren't CPU-bound; they are bound by network latency, databases, and human error. Moving from Python to Rust doesn't magically fix a slow database query, but it *does* force you to pay the "complexity tax" of memory safety and low-level management where it might not be needed.
4.  Verification is the New Typing: In an AI-driven world, the bottleneck isn't getting characters into the editor. It's ensuring the resulting binary doesn't explode in production. Frameworks are "pre-paid cognitive infrastructure"—they provide the safety rails that AI-generated code desperately needs.

The real takeaway? AI didn't kill the framework. It amplified its necessity. The more code we can generate, the more we need the "prior art" of millions of existing projects to keep us sane.

Read the full article here: [If AI can generate any language, why don't we write everything in C++/Rust?](articles/drafts/why-not-to-write-native.md)