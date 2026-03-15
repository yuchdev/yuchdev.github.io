Alright, let's turn this into a **proper dev.to article** - opinionated, analytical, a bit uncomfortable, and grounded in real systems thinking rather than folklore.

---

# Why I Don't Believe in Rewriting Software

*Rewrites are not a technical decision. They're a psychological one.*

Every few years, the industry rediscovers the same idea and treats it like progress:

> "This system is old. We should rewrite it."

It sounds responsible. Even brave.
And it is almost always wrong.

This article is about **why rewrites keep failing**, even in organizations with:

* unlimited budgets,
* top-tier engineers,
* analysts, architects, and risk managers,
* brand-new hardware,
* and executive sponsorship.

The central example is a **risk management system in an investment bank** - the kind of system where failure doesn't mean "downtime", but **real money and real consequences**.

Spoiler: the system wasn't replaced.
After years of effort, the bank quietly went back to the **20-year-old "legacy" system** that everyone initially wanted to kill.

Let's talk about why that outcome is not an accident.

---

## The Rewrite Fantasy

Rewrites usually start with a clean narrative:

* "The architecture is outdated"
* "The code is messy"
* "Nobody understands it anymore"
* "We can't hire for this stack"
* "Modern hardware will compensate"
* "We'll design it properly this time"

Somewhere in a slide deck, two columns appear:

### Legacy System

* Hard to maintain
* Slow to change
* Ugly code
* Tribal knowledge
* Risky

### New System

* Clean architecture
* Modern stack
* Easier hiring
* Better correctness
* Lower long-term cost

At the end of the deck, a sentence appears:

> "When the cost of maintaining the legacy system exceeds the cost of rewriting…"

This sentence sounds precise.

It is not.

---

## Costs Are Not "Estimated" - They're Believed

Here's the uncomfortable truth:

**Rewrite decisions are not based on estimates.**
They are made under uncertainty, using proxies, heuristics, and political pressure.

Let's break this down.

### 1. Legacy Costs Are Painful - and Visible

Legacy systems hurt in ways people can feel:

* Pager fatigue
* Ancient build systems
* Slow onboarding
* "Don't touch this" modules
* Fear-driven development

These costs are **present, emotional, and constant**.

So they look expensive.

---

### 2. Rewrite Costs Are Abstract - and Imaginary

Rewrite costs live in the future.

They are:

* optimistic,
* spreadsheet-friendly,
* and framed as "temporary".

What those spreadsheets never include:

* Edge cases encoded in 15 years of hacks
* Latency cliffs discovered under stress
* Cache behavior tuned by accident
* Regulatory quirks from old incidents
* "This makes no sense but breaks if removed"

In finance, those are not bugs - they are **survival adaptations**.

---

## The Bank Rewrite: How It Actually Unfolds

Let's walk through how the rewrite of a risk system typically develops.

### Stage 1: The Pompous Beginning

* Executive sponsorship secured
* Big-name engineers hired
* Analysts model risk flows
* New hardware ordered
* Architecture diagrams look beautiful

The language changes:

* "Greenfield"
* "Correct by design"
* "Scalable"
* "Industry best practices"

Morale is high.

---

### Stage 2: The First Reality Gap

Early prototypes work - in isolation.

Then real constraints show up:

* market bursts,
* end-of-day spikes,
* pathological portfolios,
* regulatory reporting windows.

Latency assumptions crack.
Throughput graphs flatten.

People say:

> "We'll optimize later."

---

### Stage 3: The Parallel Run

The new system is fed real data.

Discrepancies appear:

* slight risk mismatches,
* delayed calculations,
* unexplained spikes,
* "rare" scenarios that suddenly aren't rare.

Someone says:

> "The old system must be wrong."

Then auditors get involved.

---

### Stage 4: Performance Paradox

Here's the shock:

> The old, ugly, poorly designed system is faster.

Not marginally.
**Systemically.**

Why?

Because performance is not an architectural property.

It's an **emergent one**.

---

## Performance Is Trained, Not Designed

Legacy systems survive because they are shaped by production:

* Hot paths were discovered accidentally
* Bottlenecks were hammered flat over years
* Data distributions trained the code
* Abstractions were violated where needed
* Cache lines mattered - even if nobody documented why

The rewrite:

* assumes "reasonable" workloads,
* reintroduces abstraction overhead,
* trusts frameworks too much,
* assumes hardware behaves politely.

Finance doesn't reward politeness.

---

## The Most Valuable Part of the System Is Invisible

The most valuable thing in a 20-year-old system is **not the code**.

It's knowledge like:

* "Because regulator X in 2014…"
* "Because exchange Y opens 37 seconds early"
* "Because this market lies under stress"
* "Because this breaks only on Fridays"

You cannot spec this.
You cannot model it.
You can only **inherit it**.

Rewrites don't lose code -
they lose **institutional memory**.

---

## Why Smart People Still Get This Wrong

Even with top engineers and analysts, rewrites fail because:

### ❌ Software Is Treated Like Construction

Software is not a building.

It's a **living organism under selective pressure**.

### ❌ Behavioral Coupling Is Ignored

New system ≠ same users
Same users ≠ same behavior
Same behavior ≠ same load

Small changes cascade.

### ❌ Abstractions Are Overtrusted

> "The compiler will optimize it."
> "The JVM will handle it."
> "The framework knows best."

Until it doesn't.

---

## How Rewrites End

Quietly.

Deadlines slip.
Scope narrows.
"Temporary" bridges become permanent.
The legacy system stays online "just in case".

Then one day:

* traffic is shifted back,
* the old system becomes "authoritative" again,
* the rewrite is rebranded as "support tooling".

No postmortem.
No press release.
Just institutional silence.

---

## The Only Rewrite Strategies That Sometimes Work

Notice the word: **sometimes**.

### 1. Strangler Pattern - Never a Big Bang

* New system grows around the old
* Old system is never fully turned off
* Performance is compared continuously

### 2. Rewrite Only One Axis

Either:

* same language, new architecture
  or
* same architecture, new language

Never both.

### 3. Performance-First Shadowing

* New system runs in parallel
* Receives real production traffic
* Must prove equivalence under load

If it can't keep up - it dies early and cheaply.

---

## The Lie Hidden in Rewrite Justifications

That familiar sentence again:

> "When the costs exceed…"

Those costs are unknowable in advance.

So what actually happens is:

* someone believes the rewrite must be true,
* someone needs it to be true,
* someone sells the narrative.

Reality always arrives later.

---

## The Hard Conclusion

Rewrites don't fail because teams are stupid.

They fail because **legacy systems are optimized for reality, not correctness**.

And once a system has survived:

* real users,
* real money,
* real outages,
* real regulators,

…it contains knowledge that cannot be specified.

Only inherited.

If you feel skeptical about rewrites, that's not cynicism.

That's experience speaking.

---

Alright, let's write **Part II** as a companion article - lighter tone, still sharp, titled around the idea of
**"Okay, I'll make it right"** 😄

---

# "Fine. I'll Make It Right."

## When Rewrites *Actually* Work (and Why That's Rare)

After writing *Why I Don't Believe in Rewriting Software*, a predictable reaction followed:

> "Sure, rewrites fail - but **I've seen ones that worked**."

Same.
They exist.

They're just nothing like the rewrites people usually mean.

This article is about **what successful rewrites actually look like** - and why calling them "rewrites" is often misleading.

---

## Case 1: The Same Risk System - This Time With Patience

Same domain.
Same terrifying, decades-old risk management system.
Same spaghetti code that everyone was afraid to touch.

Different mindset.

### Step 1: No Rewrite. One System.

The first key decision was boring but crucial:

> There will be **one system**.

No parallel greenfield replacement.
No "new platform" running in shadow.

Everything happens **inside** the existing system.

---

### Step 2: Decouple Without Deleting

Instead of ripping code out, engineers started doing something slower and harder:

* patiently isolating responsibilities,
* carving out *actual* modules,
* defining real APIs around behavior that already existed.

The code stayed ugly for a long time.
But suddenly, some parts had **edges**.

That's progress.

---

### Step 3: Multiple Implementations, Same Interface

Once a module had a stable API, something interesting became possible:

* keep the old implementation,
* introduce a new one behind the same interface,
* switch between them **at runtime or per release**.

Not for heroics.
For **measurement**.

Discrepancies were logged, analyzed, explained.
Nothing was deleted until it was boring.

---

### Step 4: Bottlenecks First, Beauty Later

Instead of "clean architecture", the focus was ruthless:

* isolate hot paths,
* understand why they're hot,
* measure before touching,
* optimize before abstracting.

Some bottlenecks turned out to be architectural.
Others were data-related.
A few were "this looks insane but saves 40% latency".

Those stayed.

---

### Step 5: New Tech - Carefully, Late

Only after years of refactoring muscle memory did new tech appear:

* newer language features,
* better concurrency primitives,
* improved tooling.

Introduced locally.
Measured continuously.
Never all at once.

No launch party.
But real progress.

---

### Why This Worked

Because it wasn't a rewrite.

It was **continuous inheritance**.

The system never lost contact with reality.

---

## Case 2: The "Can't Fail" Rewrite - COBOL to Java

Now let's look at the opposite extreme.

A classic enterprise scenario:

* ancient COBOL financial system,
* shrinking talent pool,
* regulatory pressure,
* vendor support ending.

Rewrite is not optional.

This kind of project doesn't aim for elegance.
It aims for **survival**.

---

### The First Surprise: Fixed-Point Arithmetic

COBOL's fixed-point arithmetic is *fantastic* for finance.

Java's `double` is not.

Suddenly:

* rounding errors appear,
* reconciliations don't match,
* auditors get nervous.

Result:

* custom fixed-point libraries,
* explicit scale everywhere,
* performance costs nobody planned for.

---

### Then Came the Hidden Traps

Typical COBOL → Java surprises:

* implicit record layouts vs explicit object graphs
* batch-oriented logic vs request-driven execution
* "impossible" states that happen daily
* reliance on file ordering guarantees
* overnight jobs that assume time stands still

Each one required:

* redesign,
* re-validation,
* re-approval.

Budgets grew.
Deadlines slipped.
More than once.

---

### Did It Succeed?

Define success carefully.

The system:

* eventually replaced the COBOL one,
* passed audits,
* kept the business running.

But:

* it cost several times the original estimate,
* took years longer,
* and never became "simple".

It survived - because failure wasn't allowed.

That's not a success story you can generalize.

---

## The Pattern Behind "Successful" Rewrites

If you strip the romance away, successful rewrites share traits:

* they move **slowly**,
* they keep production feedback at all times,
* they privilege equivalence over elegance,
* they treat legacy behavior as *truth*, not a bug,
* they accept higher cost as the price of safety.

They are closer to **system transplantation** than rebuilding.

---

## The Real Lesson

The most successful "rewrites" are actually:

* refactorings with discipline
* forced migrations under existential pressure.

The disastrous ones are fueled by optimism and aesthetics.

So when someone says:

> "We'll do it right this time"

The real question isn't *how modern the stack is*.

It's:

> **How long are you willing to respect reality before trying to improve it?**

That's where rewrites live or die.
