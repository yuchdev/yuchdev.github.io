### AI BUILD ITS OWN GUARDRAILS (TODO: fold into single post)

Version 1. What I eventually learned to do was force the AI to build its own guardrails.

Not just behavior-level tests, but structural and code tests: static analysis, custom linters, some are very sophisticated and adjusted for the edge cases, but the make certain classes of "clever monkey fixes" impossible

The simplest examples:

- import something from an internal/private module - test fails
- use a legacy or deprecated API - test fails
- sneak in a local import or circular dependency to "trick" the system - test fails

At that point, the agent stops behaving like a burglar and starts behaving like an employee working under a strict working code.

Once these constraints exist, I can move further:

- make AI draw a system diagram
- formalize high-level architectural rules
- encode them as enforceable checks

and the agent actually follows them!

That said, this exact process must be heavily supervised by a human, especially at the beginning. You're not delegating responsibility to sneaky AI you're shaping the environment in which it operates.

The payoff is real, though. After the guardrails are in place, progress becomes steadier, regressions drop sharply, and the system stops collapsing under its own "helpfulness"

Version 2. Guidelines should contain only very basic, high-level project information. A few thousand symbols at best.

The key is to use them as an entry point, ToC with references to more precise guidelines, specs, and agentic instructions rather than trying to squeeze instructions about the whole project into a single document.

And don't forget you can use MCP server: running a project-specific MCP gives you more controlled context, and far more reliable results than prompt-only approach.

Be ready this even this won't always work perfectly - LLM reasoning is probabilistic by nature. That's precisely why I recommend to take a look at workflow I described above - make AI build strict, simple, deterministic rules that are impossible to avoid by definition of your task

- follow this document layout - run lexic parser that will check the layout 
- don't mute exceptions - custom linter that would return failed test if it finds one
- don't use legacy API - custom linter or reflection-based test

And so on.

It's not a generic approach by definition, and is heavily adjusted for a project. But on a big project it pays itself tenfold.

3. Version 3

After the boilerplate is in place, the hardest part for me is turning AI from "fast but probabilistic" into "fast and constrained"

The key is to watch which side the model keeps violating in your codebase, then build guardrails exactly there

1. Start with agentic guidelines
"Don't access internal state"
"Don't bypass abstractions" 
"No circular deps"
"Use the new API, never the legacy one"

This catches a lot - but it's still probabilistic.

2. Then formalize rules to make it deterministic - you can use custom linter based on Python lexical analysis subsystems

Add lexical, structural and architectural checks that fail the build when violated. Examples I've had to guard against:

- Reaching into internals (grabbing private members, poking globals/singletons, reading internals instead of using an interface)
- Breaking abstraction layers (UI calling storage, domain calling infra, "convenience" shortcuts)
- Sneaking in local imports and drifting module boundaries, circular dependencies
- Using legacy APIs because they "look familiar" or appear in old code snippets

This is a process you have to monitor closely for a while: observe failure modes - tighten the guardrail - repeat
Once the checks are solid and the model learns the constraints, you can relax review a bit for low-risk changes

### IDEA OF STANDARDIZED GUARDRAILS (USE IN 2 ARTICLES)

"Standardized guardrails" is a grand idea, but they only become real once they turn deterministic. We already have guidelines and MCP server, but properly hallucinating agent may overrule them.
We need something like that: the model wants to overrule guidelines, but it physically can't ship code unless the pipeline says "green"

It's hard however to find a "common denominator" for all programming languages, and all types of output in general.

For example, Python hallucinations are often 
- import graph
- runtime surprises
- packaging problems
- dynamic typing
- legacy API use

C++ hallucinations are very different:
- API drift (calling methods that don't exist)
- Lifetime/ownership mistakes
- Encapsulation violation (quietly exposes into private internals)
- Build system mismatches (CMake targets, wrong include paths)

In the Python case, I rely on a set of YAML-defined rules wired directly into PyTest, and I instruct the agent to keep iterating until the test suite is green. A lexical analyzer does most of the dirty work here: "hey buddy, you just snuck a local import into module internals, bypassing the official API"

With C++, the same idea applies in theory: you can hook lexical or AST-level rules into GTest or Boost Test. In practice, it's far more effective to push those constraints down into the toolchain itself - sanitizers, compiler warnings, static analysis - and treat any violation as a compiler error.

Crucially, the developer doesn't even have to hand-write those YAML rules or even more, parse AST manually. With standardized guardrails, you can say something high-level as: "strictly forbid yourself to ship code that silences exceptions" - and the agent generates the corresponding YAML file on its own. From that moment, swallowed exceptions are no longer a stylistic concern; they simply turn the test suite red.

---

Where I see progress is in turning probabilistic agent output into deterministic gates. In my workflows, the strongest guardrails are not prompts, but hooks and tests based on custom AST linters.

Very basic Python examples that cause hook to fail and reroute AI effort

- import from a private module
- use a legacy or deprecated API
- add a local import to bypass architecture boundaries
- introduce a circular dependency

Then come hundreds of project-specific checks: ownership boundaries, dependency directions, forbidden APIs, serialization rules, etc.

This does not make the model deterministic. It makes the allowed output space much smaller. The agent cannot cross lines we already know are unsafe.

And AI can help build that fence. AST analysis and compiler tooling are real CS topics, but models are useful for exploring these topics.

Something similar, but lower-level, may eventually power an LLVM/AI pipeline: probabilistic generation surrounded by deterministic verification. And building this verification is the "human gate" in the pipeline.
