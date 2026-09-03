### 1. I SUFFER THEREFORE I LEAD [published]

I disturbingly regularly see such posts with the clear message "I suffer therefore I lead"

Let's be honest about good parts - C is not just a good language to learn programming - it's one of the best ways to learn how computers actually work.
It exposes memory layout, pointer arithmetic, stack vs heap, calling conventions, data representation, and the real cost of every abstraction. Nothing is hidden behind a runtime, GC, safety barriers, or opaque object model. If something happens, it's because you caused it - and you can usually trace it down to a few assembly instructions.

Studying C forces you to understand:
- how source code maps to machine code
- how the CPU, memory, and ABI interact
- why performance, alignment, and data locality matter
- and where higher-level languages start adding workload on top of real hardware constraints

Manual design of any memory, security, or concurrency pipeline would give students discipline which no other language would - because any abstraction, even zero-cost, hides crucial part from them. 

On this basis you can study Rust, C++, Java, Haskell, and Brainf*ck for god sake :)

But for the same reason, writing in C in production is like crossing an ocean on a hand-made wooden boat.

You surely will learn the ocean. You'll feel every wave, every creak, and every design mistake right in the point when it becomes interesting, that's for sure 😆

You'll become a better sailor - assuming this was the actual goal of the journey. 

But if your plan is to enjoy the ocean views in good company, arrive on time, and not spend the night bailing water… a yacht or a cruise liner tends to deliver a noticeably better experience.

Modern production systems demand:

- security by default
- correctness under concurrency
- maintainability by teams, not heroes drinking liters of coffee at 4 AM
- tooling that catches mistakes before customers do

In 2026, writing large systems in C means spending enormous effort recreating:

- safety that other languages give you for free
- tooling that fights the language instead of helping it
- conventions that rely on discipline rather than enforcement

Don't get me wrong, there are absolutely valid reasons to use C nowadays. They are:

- Extreme resource constraints, like tiny controller of 32-128kb of RAM, no MMU, no OS
- Lack of safer compiler and tooling (read C++/Rust) - many hardware vendors deliver C toolchains as the only option for compiler, tooling and examples 
- Historically ancient toolchains and codebases. Telecom stacks, avionics software, industrial controllers. Billions of lines in C, battle-tested, certified, and passed through regulatory approvals.

But these are constraints, not virtues.

Using C in places where it can be avoided is driving a race car with no seatbelt - educational, exhilarating, and absolutely the wrong default for daily commuting.

Learn C. Respect C.
But don't romanticize it into places where it doesn't belong.
