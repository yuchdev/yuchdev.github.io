# Part I. Why I Don't Believe in Rewrites

Every few years, the industry rediscovers the same idea and presents it as progress:

> “This system is old. We should rewrite it”

It sounds responsible. Even courageous.

But before we dive deeper, I need to say something important: software rewrites are almost never purely technical decisions. Technical arguments may play a role, but they are usually just bishops and rooks in a much larger political chess game.

Eventually, the rewrite faction declares checkmate. The papers are signed, budgets approved, presentations delivered, and entire armies of developers, QAs, analysts, architects, and managers roll up their sleeves and get to work.

And yet, no matter how many sleeves are rolled up, statistically, rewrites keep failing - even when backed by:

* seemingly unlimited budgets
* top-tier engineers
* architects, analysts, and risk managers
* brand-new infrastructure
* and full executive sponsorship

The central example is a **risk management system in an investment bank** - the kind of system where failure doesn't mean "downtime", but **real money and real consequences**.

*Guess if it worked out.*

Long story short, after years of effort, the bank quietly went back to the **20-year-old "legacy" system** that everyone initially wanted to kill.

Let's talk about why that outcome is not an accident.

---

## The Rewrite Fantasy

Rewrites usually start with a clean narrative:

* "The architecture is outdated"
* "The code is messy"
* "Nobody understands it anymore"
* "We can't hire for this stack anymore"
* "Modern hardware will compensate"
* "We'll design it properly this time"

Somewhere in a slide deck, two columns appear:

### Legacy System

* Hard to maintain
* Slow to change
* Ugly code
* Tribal knowledge
* Risky
* Total: cost of support

### New System

* Clean architecture
* Modern stack
* Easier hiring
* Better correctness
* Lower long-term cost
* Total: cost of implementation

At the end of the deck, a sentence appears:

> "When the cost of maintaining the legacy system exceeds the cost of rewriting..."

This sentence sounds precise. It even looks good in a slide deck.

Unfortunately, in fact it is not.

---

## Costs Are Not "Estimated" - They're Believed

Here's the uncomfortable truth:

**Rewrite decisions are not based on estimates.**

At least not on realistic ones.

They are made under uncertainty, using proxies, heuristics, and political pressure.

Let's break this down.

### 1. Legacy Costs Are Painful - and Visible

Legacy systems hurt in ways people can feel - not in spreadsheets, but at 3 am:

* Pager fatigue
* Build systems older than some junior developers
* Onboarding measured in geological time
* "Don't touch unless the building is on fire" principle
* Entire teams practicing fear-driven development

These costs are **present, emotional, and constant**.

So they look expensive.

---

### 2. Rewrite Costs Are Abstract - and Imaginary

Rewrite costs live in the future.

They are:

* optimistic
* spreadsheet-friendly
* and framed as "temporary"

What those spreadsheets never include:

* Edge cases encoded in 15 years of hacks
* Latency cliffs discovered under stress
* Cache behavior tuned by accident
* Regulatory quirks from old incidents
* "This makes no sense but breaks if removed"

In finance, those are not bugs - they are **survival adaptations**

---

## The Bank Rewrite: How It Actually Unfolds

Let's walk through how the rewrite of a risk system typically develops.

### Stage 1: The Pompous Beginning

* Executive sponsorship secured
* Big-name engineers hired or transfered
* Analysts model risk flows
* New top hardware ordered
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

* market bursts
* end-of-day spikes
* pathological portfolios
* regulatory reporting windows

Latency assumptions crack.

Throughput graphs flatten.

People say:

> "We'll optimize later."

---
### Stage 3: The Parallel Run

The new system is fed real data.
Discrepancies appear:

* slight risk mismatches
* delayed calculations
* unexplained spikes
* "rare" scenarios that suddenly aren't rare

Someone says:

> "The old system must be wrong."

Then auditors get involved.

---

### Stage 4: Performance Paradox

Here's the shock:

> The old, ugly, poorly designed system is faster.

Not marginally. **Embarrassingly faster.**

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
* Ugly hacks are tolerated as long as they boost the performance

The rewrite:

* assumes "reasonable" workloads
* reintroduces abstraction overhead
* trusts frameworks too much
* assumes hardware behaves politely

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
they lose **institutional memory**. And only the system itself posesses this knowledge.

---

## Why Smart People Still Get This Wrong

Even with top engineers and analysts, rewrites fail because:

### ❌ Software Is Treated Like Construction

Software is not a building you demolish and rebuild.
It's closer to a coral reef - layers accumulated over years, inhabited by all sorts of living organisms under selective pressure.

### ❌ Behavioral Coupling Is Ignored

New system != same users
Same users != same behavior
Same behavior != same load
Small changes cascade.

### ❌ Abstractions Are Overtrusted

> "The compiler will optimize it."
> "The JVM will handle it."
> "The framework knows best."

Until it doesn't.

---

## How Rewrites End

Quietly.

6-12 before the end:

* Deadlines slip
* Scope narrows
* "Temporary" bridges become permanent
* The legacy system stays online "just in case"

Then one day:

* Traffic is shifted back
* The old system becomes "authoritative" again
* The rewrite is rebranded as "support tooling"

No postmortem.

No press release.

---

## The Only Rewrite Strategies That Sometimes Work

Notice the keyword: **sometimes**.

### 1. Strangler Pattern - Never a Big Bang

* New system grows around the old
* Old system is never fully turned off
* Performance is compared continuously

### 2. Rewrite Only One Axis

Either:

* Same technical stack, new architecture, or
* Same architecture, new technical stack

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

* Someone believes the rewrite must be true
* Someone needs it to be true
* Someone sells the narrative

Reality always arrives later.

---

## The Hard Conclusion

Rewrites don't fail because teams are stupid.
They fail because **legacy systems are optimized for reality, not correctness**.

And once a system has survived:

* real users
* real money
* real outages
* real regulators

...it contains knowledge that cannot be specified.
Only inherited.

If you feel skeptical about rewrites, that's not cynicism.
That's experience speaking.

---

# Part II. "Fine, I'll Make It Right."

## When Rewrites *Actually* Work (and Why That's Rare)

After writing *Why I Don't Believe in Rewriting Software*, a predictable reaction followed:

> "Sure, rewrites fail - but **I've seen ones that worked**."

I've actually seen the same.

They exist.

They're just nothing like the "rewrites" people usually mean.
This article is about **what successful rewrites actually look like** - and why calling them "rewrites" is often misleading.

---

## Case 1: This Time With Patience

Same domain.
Same terrifying, decades-old risk management system.
Same spaghetti code that everyone was afraid to touch.
Different mindset.

### Step 1: No Rewrite. One System.

The first major decision sounds almost disappointingly conservative - but crucial:

> There will always be **only one system**.

* No parallel greenfield replacement
* No "new platform" running in shadow
* No years-long divergence between "legacy" and "future"
* Everything happens **inside** the existing system

Because the moment you maintain two systems in parallel, you also create two sources of truth, two operational realities, two sets of bugs, and eventually two competing political camps inside the organization.

Do not split reality in half.

---

### Step 2: Decouple Without Deleting

Instead of ripping code out, engineers started doing something slower and harder:

* Patiently isolating responsibilities intertwined for years
* extracting real modules from accidental ones
* Defining stable APIs around behavior that already existed
* Cover every critical path (and I mean it) with regression tests

Not because testing is fashionable, but because once you start changing internals of a live production system, undocumented behavior becomes your biggest enemy.

The code stayed ugly for a long time.
But suddenly, some parts had **edges**.
That's progress.

---

### Step 3: Multiple Implementations, Same Interface

Once a module had a stable API, something powerful became possible.

The team no longer had to choose between "keep the old system" and "rewrite everything." They could do both simultaneously:

* Keep the old implementation
* Introduce a new one behind the same interface
* Switch between them **at runtime**
* Compare behavior under real workloads
* Roll back instantly if necessary

This changes the entire risk profile.

A rewrite is no longer a giant irreversible migration event. It becomes a controlled engineering experiment.

---

### Step 4: Bottlenecks First, Beauty Later

The priority was never “clean architecture.”

The priority was survival under real load.

So the engineering approach became almost brutally pragmatic:

* Isolate hot paths
* Understand why they're hot
* Measure before touching
* Optimize before abstracting
* Remove complexity only when reality proves it unnecessary

Some bottlenecks turned out to be architectural.
Others were data-related.
A few were "this looks insane but saves 40% latency."

Those pieces stayed.

---

### Step 5: New Tech - Carefully and Slow

Only after years of refactoring muscle memory did new tech appear:

* Newer language features
* Safer concurrency primitives
* Improved tooling and observability
* Better testing and deployment infrastructure

But none of it arrived through a giant migration initiative.

New technology was introduced gradually. Locally. Under measurement. Behind stable interfaces. One subsystem at a time.

Just slow, measurable progress.

---

### Why This Actually Worked

Because it was never treated as a rewrite.

It was **continuous inheritance**.

The system evolved without severing itself from production reality. Without discarding operational knowledge. Without betting the company on a multi-year engineering gamble.
At every moment, the software remained alive, tested, deployed, and exposed to real users - and that changed everything.

---

## Case 2: The "Can't Fail" Rewrite - COBOL to Java

Now let's look at the opposite extreme.

A classic enterprise scenario:

* ancient COBOL financial system
* shrinking talent pool
* regulatory pressure
* vendor support ending

Rewrite is not optional.
This kind of project doesn't aim for elegance.
It aims for **survival**.

---

### The First Surprise: Fixed-Point Arithmetic

COBOL's fixed-point arithmetic is *fantastic* for finance.

Java's `double` is not.

Suddenly:

* Rounding errors appear
* Reconciliations don't match
* Auditors get nervous

Result:

* Custom fixed-point libraries
* Explicit scale everywhere
* Performance costs nobody planned for

---

### Then Came the Hidden Traps

Typical COBOL-to-Java surprises:

* Implicit record layouts vs explicit object graphs
* Batch-oriented logic vs request-driven execution
* "Impossible" states that happen daily
* Reliance on file ordering guarantees
* Overnight jobs that assume time stands still

Each one required:

* redesign
* re-validation
* re-approval

Budgets grew.
Deadlines slipped.

It happened more than once.

---

### Did It Succeed?

Define success carefully.

The system:

* Eventually replaced the COBOL one
* Passed audits
* Kept the business running

But:

* It cost several times the original estimate
* Took years longer
* And never became "simple"

It survived - because failure wasn't allowed.

That's not a success story you can generalize.

---

## The Pattern Behind "Successful" Rewrites

If you strip the romance away, successful rewrites share traits:

* They move **slowly**
* They keep production feedback at all times
* They privilege equivalence over elegance
* They treat legacy behavior as *truth*, not a bug
* They accept higher cost as the price of safety

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
