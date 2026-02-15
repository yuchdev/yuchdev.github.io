# Vibe-Coding from the Engineering Perspective: A Horror Story

I can tell about the "vibe-coding" experiment from an engineering prospective.

I asked an AI agent to write a game, and I asked for all the "grown-up" things too: documentation per component, ADRs, and a full test suite - unit tests for logic, mocks for boundaries, integration for the wiring. And I made one rule: I would not look at the code, only at errors. No architecture reviews. No "wait, why is this class doing that?" I wanted the pure experiment: can vibe-coded momentum outrun engineering gravity?

Features landed fast. Bugs got fixed faster than I could reproduce them. The agent looked like a disciplined team: every module had docstrings, everything was neatly formatted, the tests were green. It felt like watching a factory line - request goes in, working feature comes out. And because I wasn't inspecting anything, the codebase stayed "Schrödinger-maintainable" - alive as long as nobody opened the box.

Then came a totally normal request. I wanted more power in (already implemented) scripting engine - the part you extend when you want flexible game logic without rewriting the core - more hooks, more events, a better API. Slightly richer state access. Nothing exotic.

And that's where the system hit the wall.
Not "one more bug." Not "we need a refactor." A wall. Every attempt to add feature produced a new weird failure somewhere else: some unrelated subsystem broke, tests stayed green when they should have screamed, or everything "worked" but the behavior was wrong. I tried more precise prompts, additional tests, "don't touch unrelated files", "preserve public API" - nothing worked.

Then, under a fanfare, I revealed the code.

It was a horror story written in perfect grammar.

A pseudo-organized horrific mess: clean docstrings and neat formatting wrapped around an architecture that didn't exist. The ADRs read like a thoughtful team's decisions - and the implementation read like a desperate person crawling through air ducts.

Encapsulation was "in name only." Classes that should never touch each other were hacking into internal state like burglars. "Temporary" hacks were permanent load-bearing beams. There were huge slabs of code that did *absolutely nothing* - functions called for side effects that never happened, values computed and discarded, dead branches preserved like museum exhibits.

The tests were the darkest punchline.

Unit tests that asserted "true" and celebrated.

Mocks that mocked nothing important.

Integration tests that "tested wiring" by calling an entrypoint and checking that it didn't crash.

Error paths that were "covered" only because exceptions were completely silenced in places where the program *should* have died loudly.

At that point the "complexity barrier" finally made sense.
Vibe-coding can sprint on surface plausibility: clean code style, confident explanations, locally reasonable changes. And if you keep requesting features, it can keep producing output that resembles progress.

But software complexity isn't just "more code." It's interlocking constraints: invariants that must hold everywhere,
boundaries that prevent state from leaking, contracts that make composition possible, tests that fail for the right reason.

And the funniest part - abd the real twist - is this:

It's not surprising the code was a mess.

What's surprising is how far it got before collapsing.

Vibe-coding doesn't fail immediately. It fails when the cost of lies exceeds the speed of its production.

And eventually, sooner or later, you open the door that requires real engineering, and you discover the truth:

You didn't build a system.

You built a haunted house with tests and documentation.
