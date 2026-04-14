I want to share an interview experience that goes against the usual LinkedIn folklore.

This happened a while ago, and no, this is not a story about "never giving up". This is a story about failing in details - and succeed in general.

1. First interview - C++ deep dive until brains boil

The first interview was C++, both theory and coding. Long, really long - somewhere between 1.5 and 2 hours.

The format was simple and brutal:

> "We keep going deeper."

It started politely, from virtual destructors and OOP fundamentals.
Then escalated quickly to memory management, templates, multithreading
And then, no survivors: intrinsics, lock-free structures, data locality, vectorization, data cache vs instruction cache.

At some point I noticed something important: our brains boiled simultaneously - mine and the interviewer's. It creates a certain rapport.

That, I count as a success.

Not because I knew everything - but because we were speaking the same language and hitting the same limits.

2. Second interview - algorithmic problem

This was the classic algorithmic interview.

Some kind of a double-linked tree. Not AVL, I remember clearly, maybe some variation of Red-Black.
Balancing, traversal, invariants.

And here's the uncomfortable truth:

In university 20 years ago, I could balance a tree in my sleep. I did a capstone project on trees.
In practice, I don't write algorithmic libraries. I use well-tested ones, I design systems around them.

This was moderately complex and solvable problem, I did move toward a solution by pure logic - but slowly, painfully, and I did not fit into the 1-hour slot.

I left that interview thinking:

"Well, that's it. I'm out."

3. Third interview - system design

Then came the surprise - I got invited to the system design interview.

Typical task:

- design a distributed system
- clarify requirements
- estimate average and peak load
- reason about scaling

This is where experience actually matters.
We discussed trade-offs, failure modes, bottlenecks. When we reached subtle Mongo sharding details, I said honestly:
"This part I would delegate to a MongoDB expert" which seemingly satisfied the interviewer.

4. Soft skills interview

Nothing dramatic here.

As Alan Ford said in Snatch:

"Thank you, Turkish. I'm sweet enough."

📩 Offer

Yes.
Despite spectacularly failing the algorithmic interview - I got the offer.

Reflections

A few thoughts that stayed with me:

Leetcode performance is not equal to seniority.
It measures a very specific, narrow skill - not day-to-day engineering impact.

Experience shows differently
In reasoning, trade-offs, asking the right questions, and knowing when to delegate.

Honesty beats heroics
Saying "I don't know" or "I'd ask an expert" is not weakness - it's realism.

Good interviews look for fit, not perfection. Depth of thinking matters more than finishing a puzzle on time.

So yes - you can fail a Leetcode-style interview, and still be a good engineer, and still get hired.
