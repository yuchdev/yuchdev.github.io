### HOW TO IMPLEMENT TODO COMMENTS

Recently came across a discussion about TODO comments.

What I'm absolutely agree with - the TODO is one of the worst forms of technical debt.

Not because it exists - but because it's invisible, ownerless, timeless and immortal.

A regular TODO has no deadline, no accountability, and no friction. It survives refactors, outlives team members, passes reviews unnoticed, and quietly teaches the developers that "later" means "never"

It's hard underestimate how harmful such a habit can be for junior developers. 

However, it's actually possible if not outright prohibit it (I don't believe in such a measures), then put on some useful service.

In teams where I was responsible for the codebase, a naked TODO was treated as a "code smell" and rejected - it won't pass review, and it won't pass CI either.

If you introduce a TODO, it must include:

1. Author name - ownership is explicit
2. Ticket number - created first if it doesn’t already exist
3. Date - so aging debt is visible

// TODO: Yurii Cherkasov [CDS-1732][26.01.2026] The reason of leaving TODO, detailed and comprehensive 

The goal isn't to ban TODOs entirely, but to stop them from becoming invisible debt.

Technical debt itself isn't dangerous because it exists - it's dangerous because it’s easy to ignore. Once the debt has a name, a ticket, and a timestamp, it stops being a vague intention and becomes a tracked obligation - uncomfortable to forget, easy to audit, and much easier to pay down.

