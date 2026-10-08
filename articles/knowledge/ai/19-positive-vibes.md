I'd define "vibe coding" here somewhat narrowly: using mostly general-purpose AI coding tools to produce software when the person driving them is not themselves a software engineer.

At one extreme - "make me a game" with little understanding of either programming or game development - the result can indeed become a disaster surprisingly quickly. This is a good example of the failure mode:

[https://yuchdev.github.io/article.html?slug=vibe-coding-from-engineering](https://yuchdev.github.io/article.html?slug=vibe-coding-from-engineering)

But there is an important distinction: not being a software engineer is not the same as being technically incompetent in the problem domain.

A complete beginner has difficulty even recognizing when the AI is producing nonsense. A domain expert often does not. A game designer who understands engines and scripting, a statistician who understands the mathematics, a business analyst who understands workflows and data, or an SEO specialist who understands the mechanics of their field can use AI to bridge a substantial part of the programming gap.

They may not know how to design a large maintainable software system, but they often know very precisely what the system is supposed to do, what assumptions are valid, and whether the output makes sense. That changes the equation considerably.

So I suspect "vibe coding" actually covers two very different phenomena:

AI replacing knowledge you don't have - risky, because neither the user nor the model reliably knows when the result is wrong.

AI translating expertise you already have into software - potentially extremely productive.

The second case is probably one of the most interesting consequences of LLMs. Programming is gradually becoming less of a mandatory intermediary skill between domain knowledge and executable software. You may still need software engineers when reliability, architecture, security, performance, or long-term maintenance matter - but the threshold for turning an idea, analysis, or domain-specific procedure into a working program has fallen dramatically.

And mathematics is actually an excellent field in which to test that distinction: if you understand the mathematics well enough to verify the reasoning, AI can handle a great deal of the implementation. If you understand neither the mathematics nor the implementation, then you are not really experimenting with mathematics - you are experimenting with how convincingly an LLM can make you believe it did mathematics.
