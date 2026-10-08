### DOCUMENTATION IN AI ERA

I'd say documentation in the AI era requires a different approach in some dimensions - and the same discipline in others.

1. Documentation is still often written "just in case". It may or may not be read.

2. Drift becomes even more dangerous now. If AI consumes stale docs, it will confidently hallucinate. That means docs must be explicitly vetted by humans.

3. This is the big one - docs should not be static. It shouldn't just describe what exists. It should capture state of the system, decisions that led there, alternatives rejected.

In other words, context matters more than state. Without decision history, documentation becomes archaeology.

Another shift: documentation search must evolve. Doc engines should behave more like vector databases than keyword indexes. If someone asks something "about module A," they should receive not just pages that literally mention module A, but all the system evolutions that shaped it.

AI is actually strong here. It can surface hidden relationships and generate fresh artifacts (e.g. UML diagrams)

People now call this a "knowledge base" - I don't mind the term. What matters isn't the label. It's acknowledging that docs is no longer a static artifact - it's a living, queryable, contextual system.

---

I think LLMs actually make documentation more valuable, not less.

The point is thst documentation is read not only by humans. It's read by AI.

If you look at modern AI-assisted repositories you notice we create all these CLAUDE.md, AGENTS.md, and they keep registry of entry points that link to more detailed documents under docs/*.md. Why? Because we don't want the model to rediscover the architecture by parsing thousands of files and burning tens of thousands of tokens on every task.

Good documentation compresses intent into a few hundred tokens. That's valuable for humans and even more valuable for LLMs.

Code tells AI what the system does. Documentation tells it where to look, which abstractions matter, what is canonical, what not to touch, and why certain decisions were made.

In that sense, documentation is becoming less of a user manual and more of an optimization layer for both human and AI comprehension.

Ironically, the better LLMs become, the more valuable high-quality architectural documentation becomes. It doesn't compete with code - it guides the AI to understand the code correctly and efficiently.

---

Yep - "comments get stale" was true for a long time for a boring reason: they were everyone's lowest-priority responsibility. Authors optimize for "make it work + pass tests," reviewers optimize for "correctness + style," and nobody is interested to spend extra cycles validating prose. So comments/docstrings drift, then teams conclude "comments are harmful," when the real issue is process, not the medium.

What's changed is that we can finally make "docstring correctness" a first-class, enforceable step instead of "coding vibes"
Now it's trivial to add a dedicated agent in an agentic pipeline whose jobs are:
- verify docstrings/comments match current behavior and signatures
- flag contradictions ("this says O(1) but it's O(n) now")
- update comments when code changed (and remove comments that are now lies)
- enforce style: concise, precise, no re-stating the obvious

In addition I usually add procedural linter rules dedicated to checking comment style and wired it to test pipeline. Tests don't turn green until comments are properly written.

I learned the same lesson long before the current AI wave helping with the docs immensely - back when I was tech lead at a startup, and I was *annoyingly* strict about documenting architectures, workflows, and testplans.
People pushed back hard:

"The code is self-documenting"
"Once you write docs once, they stop making sense"
"In fast-paced projects docs become outdated instantly"
"We remember everything 😀 "

Until the project got put on hold for 9 months... and later resumed with ~50% of the old team, and the rest were newcomers.
The impact was beautiful: we reconstructed the architecture in days, not weeks. Onboarding of new team members took a week at worst. And yes - the former skeptics were the first to say "thank you"
Because when you write docs for strangers, after 6 months, you are the stranger.
