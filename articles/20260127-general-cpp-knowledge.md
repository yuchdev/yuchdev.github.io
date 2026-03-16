# What "General C++ Knowledge" Actually Means

Every time C++ hiring is discussed for more than five minutes, one phrase eventually crawls out of the shadows like an old macro from a forgotten header:

> "The candidate has weak general C++ knowledge."

This is usually pronounced with the confidence of a medieval doctor diagnosing imbalance of humors.

But what does it actually mean?

Is "general C++ knowledge" the ability to recite all value categories from memory like a prayer? Is it knowing three ways to implement a singleton nobody should write? Is it the sacred ritual of explaining the Rule of Five while pretending nobody has ever accidentally broken move semantics at 2 AM?

Not quite.

The problem is that C++ is not one neat, straight road. It is more like a large, old city that grew without a master plan. One district is Roman. Another is Soviet. Then suddenly there is a glass business center called `std::ranges`, built right on top of ancient catacombs full of raw pointers and undefined behavior.

So when we talk about "good C++ knowledge," we are not talking about one slider from 1 to 100. We are talking about several different domains of competence that overlap only partially. A developer can be strong in some, weaker in others, and still be perfectly effective - up to a point.

Below is the model I usually have in mind when I think about what "general C++ knowledge" means in practice.

It is subjective, of course. But it comes not from abstract language worship, only from years of writing production code, reviewing code, interviewing engineers, and occasionally watching software catch fire in fascinatingly educational ways.

---

## C++ knowledge is not one thing

A lot of interview confusion comes from treating C++ as a single skill.

It is not.

Knowing C++ is not like knowing the multiplication table. It is closer to being a competent mechanic in a city where half the vehicles are electric, half are diesel, and one of them is a horse wearing a Tesla badge.

You can meet developers who are excellent at templates and terrible at concurrency. Or people who can write lock-free structures but become strangely philosophical when asked about exception safety. Or engineers who know every dark corner of object layout and ABI behavior, but still write class hierarchies like they are trying to avenge themselves on future maintainers.

That is why "general C++ knowledge" must be broken into subsets.

And yes, the borders are blurry. That is normal. C++ itself was never accused of being too clean and symmetrical.

---

## 1. The C-legacy and low-level subset

Let us begin in the basement.

This part is where C++ still smells faintly of C, machine oil, and questionable life choices from the 1970s. It includes fundamental types, memory layout, object lifetime, alignment, pointers, references, pointer arithmetic, `new`, `delete`, `delete[]`, ownership, allocators, and all the delicious little traps that make systems programming either rewarding or emotionally expensive.

This is the layer where a developer understands that memory is not a magical cloud where objects go to meditate. It is actual storage, with actual layout, actual lifetime, and very real consequences if you get it wrong.

A person weak in this area may still be able to write C++ that compiles and even passes tests on a good day. But they often operate as if variables simply "exist," objects "disappear somehow," and references are "basically nicer pointers but emotionally safer."

That illusion lasts right until performance matters, resource ownership becomes nontrivial, or a bug appears that only reproduces once every three weeks under customer load.

Low-level C++ knowledge does not mean fetishizing raw pointers or writing your own memory allocator to feel powerful. It means understanding what the abstractions are hiding. It means being able to reason about storage duration, stack versus heap, alignment issues, object lifetime, move versus copy costs, and the consequences of manual allocation when you must step outside the safer parts of the language.

In other words: you do not need to live in the basement. But if you work in C++, you should at least know where the stairs are.

---

## 2. The Object-Oriented Programming subset

This is the district most people meet first: classes, encapsulation, inheritance, virtual functions, polymorphism, interfaces, composition, design patterns, and the graveyard of design patterns that should never have left PowerPoint.

A lot of developers think "knowing OOP" means being able to chant terms like "inheritance" and "abstraction" while drawing UML rectangles. That is the easy part. The harder part is understanding where OOP helps and where it quietly turns your codebase into a Victorian mansion full of locked doors and family secrets.

Mature OOP knowledge in C++ means understanding both the mechanism and the cost.

Yes, virtual functions are useful. No, they are not evil. But they are also not fairy dust to sprinkle on every design problem. Inheritance can express relationships elegantly - until it becomes a giant dependency web where changing one base class causes ten derived classes to scream.

And then there is multiple inheritance, which is the sort of feature that makes beginners curious, intermediates enthusiastic, and seniors suddenly stare out of the window for a few seconds before answering.

A good C++ engineer should understand not only how polymorphism works, but when composition is the saner choice. They should know why object slicing is bad, why virtual destructors matter, why over-engineered class hierarchies are a maintenance tax, and why some "beautiful" OOP designs age like milk.

The real sign of maturity here is not loving OOP. It is no longer being seduced by it.

---

## 3. Template programming and metaprogramming

Ah yes. Templates.

The area where C++ stops being a programming language and briefly becomes a legal system.

Templates are one of the most powerful parts of C++, and one of the easiest ways to produce code that is technically brilliant, practically unreadable, and emotionally hostile to everyone around you.

Knowing templates is not the same as knowing how to write `template<typename T>`. That is like saying someone knows architecture because they can draw a rectangle and call it a house.

Real competence here means understanding generic programming, type deduction, specialization, constraints, type traits, SFINAE, concepts, compile-time computation, and the tradeoffs that come with all of it.

And the tradeoffs matter.

Templates are fantastic for libraries, reusable components, zero-cost abstractions, and strong type-safe APIs. They are much less fantastic when used as an ego sport. Every senior C++ engineer has eventually seen a piece of template code so abstract and pure that nobody dared touch it for two years, even though it contained at least one bug and three personal grudges.

My own motto is simple:

> Templates are for libraries.

That is not literally true in every case, but it is a useful instinct. Advanced template machinery should usually solve a real structural problem, not merely demonstrate that the author defeated the compiler in single combat.

A strong engineer should be able to write advanced template code when needed. But they should also know when *not* to. That second part is often the rarer skill.

---

## 4. The C++ Standard Library subset

This is where modern daily C++ actually lives.

Containers, iterators, algorithms, utilities, smart pointers, strings, tuples, optional, variant, filesystem, ranges, threads, mutexes, chrono - the standard library is the practical toolkit that separates idiomatic C++ from hand-rolled folklore.

Developers who do not know the standard library well tend to reinvent things with touching sincerity and terrible results. They write manual loops where algorithms would be clearer. They build strange custom containers where `std::vector` would have done the job with less drama. They treat the STL like suspicious foreign cuisine instead of the foundation of modern C++.

And yes, the standard library has grown. A lot.

It is no longer enough to know `vector`, `map`, and perhaps `sort` if you are feeling adventurous. Modern professional C++ should include working fluency with algorithms, iterator behavior, ownership tools, error-handling helpers, and the newer additions that now shape idiomatic code.

This is not about memorizing every header. It is about having instincts.

When should this be a `vector` and when a `deque`? When is `unordered_map` a win and when is it just fashionable chaos? When is `emplace_back` actually useful instead of cargo cult? When does a range pipeline improve clarity, and when does it start reading like a plumbing accident?

That is the difference between using the standard library and merely being aware that it exists.

---

## 5. Multithreading and concurrency

This is where interviews get serious, and production systems get haunted.

Concurrency is not merely another C++ topic. It is a separate mental universe. Many developers who are otherwise capable and intelligent walk into multithreading like tourists entering a swamp in polished shoes.

They assume the code will "probably work." Sometimes it does. Until it does not. Then it fails in a way that disappears under the debugger, returns under load, and leaves behind only a vague smell of betrayal.

This subset includes threads, mutexes, condition variables, atomics, futures, promises, async models, lock-free programming, memory ordering, false sharing, ABA, and all the other charming ways modern processors remind us that reality is not sequential.

The important thing here is not just API familiarity. It is mindset.

Concurrency requires a different habit of thought. You must reason not only about what code does, but what can happen *between* operations, *during* operations, and because two things that look unrelated are actually sharing a cache line and ruining each other's week.

And unlike many other weak areas, this one cannot be patched quickly with a half-hour reading session and bold posture. You can refresh syntax quickly. You cannot fake intuition built from months or years of mistakes, deadlocks, race conditions, incorrect memory assumptions, and those special bugs that vanish whenever someone important starts watching.

If a senior C++ candidate is weak in concurrency, I pay attention. If they are completely empty there, that is much harder to excuse.

Because in real systems, sooner or later, concurrency finds you.

---

## 6. Compilation, optimization, and performance

This is the area where source code stops being a philosophical statement and turns into instructions for actual silicon.

A surprisingly large number of developers talk about performance with the confidence of race car mechanics and the methodology of medieval astronomy. They have theories. They have feelings. They have opinions that begin with "the compiler probably…" and end with software running slower than a tired donkey.

Professional C++ knowledge should include a working relationship with compilers and performance tools.

Not worship. Not obsession. Relationship.

A senior engineer should understand build modes, optimization levels, inlining, basic assembly output, calling conventions at a practical level, vectorization, cache behavior, branch prediction, architecture-specific flags, and the difference between measurable performance and folklore passed between developers like campfire ghost stories.

This does not mean everyone must become a compiler engineer.

But if someone works in C++ and performance is part of the job - and let us be honest, in C++ it often is - then they should not be afraid of Compiler Explorer, profiler output, cache effects, or a quick glance at generated assembly.

Because otherwise "optimization" becomes theater.

You get heroic refactors that improve nothing. Tiny code changes that accidentally make things slower. Wild confidence about `inline`, `reserve`, or "stack is always faster than heap" without context, measurement, or mercy.

A serious C++ engineer should know how to measure, how to verify, and how to distrust intuition until the tools confirm it.

That alone already puts them above a distressing percentage of the field.

---

## What level is actually expected?

Now comes the part that matters in hiring.

No reasonable team expects a candidate to possess flawless, book-perfect, cathedral-grade mastery of all these domains. C++ is too large, too old, and too gloriously uneven for that.

But there is a baseline.

A professional C++ developer should have working knowledge in all of these subsets. Not necessarily equal strength - that would be unrealistic - but enough competence to understand the basics, communicate clearly, and avoid causing structural damage.

One weaker area may be acceptable. Everyone has a natural center of gravity. Some people are more library-oriented. Some come from embedded. Some are stronger in performance or architecture than in deep template machinery.

Two weak areas already deserve closer scrutiny.

And a total void in one of the core professional domains is usually a red flag, especially at senior level.

Why? Because seniority in C++ is not just time spent near `.cpp` files. It is breadth of judgment. It is the ability to connect language features with engineering consequences. It is knowing not only *what* the tool does, but what mess it creates if used in the wrong place.

That is what teams are actually paying for.

---

## The ability to close gaps matters too

There is another part of competence that interviews often miss.

A strong C++ engineer does not need to know everything instantly from memory. What matters is how they react to gaps.

If they encounter an unfamiliar standard-library component, obscure language rule, or niche corner case, can they find accurate information quickly? Can they separate authoritative sources from nonsense? Can they apply what they found correctly instead of copy-pasting a half-understood pattern from a random forum post written in 2011 by someone named `DarkTemplateLord69`?

That is real professional behavior.

Because actual engineering is not an exam hall. It is a constant cycle of solving, verifying, learning, checking assumptions, and closing knowledge gaps before they become production incidents.

So no, I do not expect encyclopedic recall.

I do expect technical honesty.

And technical honesty is rarer, more useful, and much easier to work with than fake confidence.

---

## What this list does *not* include

This classification intentionally focuses on the language and its standard ecosystem.

It does **not** include major libraries like Boost, because Boost is practically a parallel civilization. Some parts are everyday utilities. Some parts are elegant. Some parts are a test of character. And many of them stretch across several subsets anyway.

It also does **not** include frameworks and applied system domains.

Qt, Windows APIs, POSIX, Linux internals, embedded constraints, GPU programming, finance-specific latency practices, real-time systems, network stacks - all of those matter enormously in real jobs, but they are adjacent layers. They sit on top of language competence and interact with it in very real ways.

A developer can know C++ well and still be weak in Qt. Or be superb in Qt while having suspicious blind spots in the language itself.

Those are different evaluation axes.

They should not be confused, although interviews often enthusiastically do exactly that.

---

## What separates good engineers from outstanding ones

Now we come to the interesting part.

Outstanding C++ engineers are not merely those who know each subset in isolation. Plenty of people know isolated facts. The internet is full of them. Some even capitalize them for emphasis.

What distinguishes truly strong engineers is their understanding of the **connections**.

They see how templates can damage readability and encapsulation when overused. They understand why custom allocation affects exception safety and container behavior. They know that object models, ownership rules, concurrency, and performance are not separate checkboxes but interacting forces.

They can reason about things like:

- why overloading `operator new` is not just a neat trick but a design commitment,
- how exception guarantees influence container and API design,
- what is required to make a truly STL-friendly type,
- why "zero-cost abstraction" still demands discipline,
- and where elegant language features become expensive engineering decisions.

That is where expertise stops being trivia and becomes judgment.

And judgment is what makes pull requests pleasant instead of exhausting.

Everyone who has reviewed code for long enough knows this feeling. One developer sends a change, and you can almost relax before opening it. The code is coherent. The tradeoffs are visible. The abstractions are proportionate. The edge cases are considered. Even if you disagree on something, it feels like a discussion between adults.

Another developer sends a change, and it reads like the language features were selected by raffle.

That difference is often not raw intelligence. It is not even always experience in years.

Very often it is fundamentals.

---

## Final thought

So when I say "general C++ knowledge," I do not mean a ceremonial ability to answer quiz questions under fluorescent lighting.

I mean the practical foundation a professional C++ engineer needs in order to write safe, efficient, maintainable, reviewable software without accidentally turning the codebase into an archaeological site.

C++ is too broad to reduce to one dimension. That is precisely why hiring for it should be more thoughtful than "does the candidate know obscure syntax from chapter 18?"

The real question is simpler and harder:

Can this person navigate the major territories of C++ well enough to build serious systems, understand the costs of their decisions, and learn quickly where they are weak?

If yes, that is real knowledge.

If no, then no amount of confident terminology will save them.

C++ has always been generous in one respect:

it lets you write brilliant software.

It also lets you manufacture industrial-grade nonsense with exceptional speed.

"General C++ knowledge" is the difference between those two outcomes.
