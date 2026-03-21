I'd say documentation in the AI era requires a different approach in some dimensions - and the same discipline in others.

1. Documentation is still often written "just in case" It may or may not be read.
2. Drift becomes even more dangerous now. If AI consumes stale docs, it will confidently hallucinate. That means docs must be explicitly vetted by humans.
3. This is the big one - docs should not be static. It shouldn't just describe what exists. It should capture state of the system, decisions that led there, alternatives rejected

In other words, context matters more than state. Without decision history, documentation becomes archaeology.
Another shift: documentation search must evolve. Doc engines should behave more like vector databases than keyword indexes. If someone asks something "about module A," they should receive not just pages that literally mention module A, but all the system evolutions that shaped it.
AI is actually strong here. It can surface hidden relationships and generate fresh artifacts (e.g. UML diagrams)
People now call this a "knowledge base." I don't mind the term. What matters isn't the label. It's acknowledging that docs is no longer a static artifact - it's a living, queryable, contextual system.
