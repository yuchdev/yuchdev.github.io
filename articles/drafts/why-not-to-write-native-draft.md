## If AI can generate any language, why do Python/Ruby still win so often?

The premise sounds reasonable: if an AI assistant can “write anything,” why not start every backend in a fast, “serious” language (C++/Rust) and skip scripting languages entirely?

Because AI changes *how* we type code, but it doesn’t change three stubborn realities:

1. **models are uneven across languages and ecosystems (training data gravity is real)**
2. **most backend work is not CPU-bound, and Python is already a thin control layer over native code**
3. **integration, verification, and operations dominate total cost—not keystrokes**

Below is the “shifted weight” version of the argument—more about *why AI itself* makes Python/Ruby rational defaults, not less.

---

## 1) AI is not “language-agnostic” in practice: training data decides competence

LLMs don’t learn “programming” the way humans do; they learn statistical patterns from huge corpora of existing code. When a language has far more public code, examples, libraries, blog posts, and idioms available, the model is simply *more likely to be correct* and *less likely to hallucinate*.

Research on code LLMs is explicit about this:

* Code LLM quality varies by language and **depends on how much training data exists for that language**. ([arXiv][1])
* In *The Stack* (a major open code pretraining dataset), one paper notes **~64GB of Python** but only **~1GB of OCaml** and **~0.5GB of Scheme/Racket** after deduplication. That’s a 64× gap before you even discuss ecosystem breadth. ([arXiv][1])

Even for popular languages, performance still tracks “language frequency” effects. The MultiPL-E benchmark (HumanEval/MBPP translated across many languages) reports that **models perform best on high-frequency languages**, and that performance is **correlated with language popularity**. 

So yes—your intuition is right: if you “rewrite a Pandas-based product in ARM assembly” (or any relatively low-resource niche), you’ve moved into a zone where:

* there are fewer examples for the model to imitate,
* fewer canonical solutions,
* fewer library usage patterns,
* and less reliable “muscle memory” in the model.

That increases hallucination risk, and increases *verification cost*.

---

## 2) The hidden trick: Python backends already run “in C/C++” where it matters

A lot of “Python performance” debates miss what production Python systems actually look like:

* Python is frequently the **orchestration / control plane** (data plumbing, API glue, scheduling, feature logic).
* Heavy computation is pushed into **native extensions and optimized runtimes**.

This isn’t hand-wavy; it’s how the flagship AI stack is built:

* PyTorch’s Python API sits atop a “substantial C++ codebase” providing tensors and autograd; there’s also a first-class C++ frontend. ([PyTorch Documentation][2])
* TensorFlow encourages implementing performance-critical ops as **C++ kernels**, with Python wrappers as the public API. ([TensorFlow][3])
* Pandas explicitly uses **Cython and C/C++ extensions** for performance (and documents how to debug those extensions). ([Pandas][4])
* NumPy is built around C-level components and exposes a C-API for extensions/integration. ([numpy.org][5])

So the practical question is often not “Python vs C++”, but:

> Do we want our *entire product surface area* to pay the complexity tax of C++/Rust,
> or do we want a small, well-tested native core with a high-leverage Python layer?

AI doesn’t change this—if anything, it strengthens it, because AI is great at generating glue code and refactors, and you can keep the “danger zone” (unsafe memory, UB, tricky concurrency) small.

---

## 3) AI reduces typing cost, not **verification** cost—and systems languages shift cost into verification

When you move “from the beginning” into C++/Rust, you don’t just change runtime speed. You change the *shape of correctness work*:

* **Build systems**, toolchains, linkers, cross-compilation, ABI compatibility
* **Dependency complexity** (esp. C++), versioning, packaging native artifacts
* **Undefined behavior risk** (C++), unsafe blocks/FFI edges (Rust)
* **Debugging surface area** (memory, races, perf cliffs)

AI can generate code for all of that—but it doesn’t magically guarantee:

* the build is reproducible,
* the binary is deployable everywhere you need it,
* the FFI boundary is safe,
* the concurrency model is correct,
* the operational behavior matches your SLOs.

And code LLM research repeatedly finds that correctness is the hard part: MultiPL-E evaluates with unit tests because “looks plausible” is not a useful standard. 

**Important nuance:** compilers help catch syntax/type errors, but they don’t prove the *logic* is right. MultiPL-E even reports that **static type-checking neither helps nor hinders overall model performance** in their evaluation—meaning “just use Rust so the compiler saves you” is not a guaranteed shortcut in AI-generated code. 

So the economic center of gravity stays: the expensive part is validation + integration + operating the system, not writing the first draft.

---

## 4) Backend reality: most services are I/O-bound, and Python optimizes *time-to-correctness*

For typical backends, your top bottlenecks are:

* database queries and schema design,
* network and serialization,
* caching,
* queue behavior,
* observability gaps,
* tail latencies from dependencies,
* operational mistakes.

In that world, Python/Ruby buy you:

* fast iteration,
* expressive domain logic,
* mature frameworks,
* enormous ecosystem coverage,
* a hiring/training pipeline.

And in 2024 GitHub data, Python became the most used language on GitHub, with its rise linked to AI/ML activity and Jupyter growth. ([The GitHub Blog][6])

AI amplifies the advantage of *ecosystem-first* languages because:

* assistants are strongest where there’s lots of precedent (libraries, patterns, Q/A),
* the “glue work” multiplies (integrations, pipelines, agents, scripts),
* and the surface area of generated code is huge—so you want it in a language where humans can review quickly.

---

## 5) When starting in C++/Rust *is* the right call (even with AI)

There are real cases where “start systems-language-first” is correct:

* hard latency budgets (HFT-ish, realtime media, trading gateways)
* extreme throughput per core
* memory-constrained deployments / edge
* environments where a single static-ish binary is operational gold
* security boundaries where memory safety is the dominant risk
* platforms where Python packaging is a liability (some embedded, some regulated stacks)

AI can make those teams faster too—but they already have the *operational reason* to pay the complexity tax.

---

## 6) The AI-era rule of thumb that actually matches reality

A more accurate statement than “AI can generate anything” is:

> AI can generate plausible drafts in many languages;
> correctness and integration quality track training data + ecosystem maturity;
> and the cost of verification dominates.

That leads to a pragmatic default architecture:

* **Start in Python/Ruby** for product velocity and integration density.
* **Measure bottlenecks** (profiling + production telemetry).
* **Carve out hot paths** into Rust/C++ (or Go/Java), behind stable boundaries.
* Keep the native surface area small, aggressively tested, and easy to swap.

This is not “inertia.” It’s minimizing *total uncertainty*.

---

## Closing: AI didn’t make Python obsolete—it made “high-resource ecosystems” more valuable

Your core claim—**models hallucinate more when there’s less canonical material**—is supported by current research on code LLMs and low-resource languages. ([arXiv][1])

So the real answer to the original question is:

* If you want *maximum probability of correct, maintainable, integrable output per unit effort*, you choose the languages where both humans *and* models have the most reliable prior art.
* Today, that set still heavily includes Python (and in many orgs Ruby), while C++/Rust remain the right tool for the parts where the machine-level constraints are non-negotiable.
