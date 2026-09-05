TODO: post screenshot

C++ does not have to be a "behemoth." You do not need to use every feature described across thousands of pages of the standard to benefit from the language.

Different domains naturally use different subsets of C++. In ordinary business logic, you may barely touch advanced templates, concepts, or metaprogramming. In embedded, kernel, or bare-metal work, you may avoid exceptions, dynamic allocation, large parts of the STL, RTTI, and anything else that violates your runtime constraints.

Why C++ instead of C? Having worked with both for roughly two decades, I think modern C++ has matured enough to compete even in many of the traditional strongholds of C: embedded systems, low-level infrastructure, kernels, firmware, and bare metal.

The advantages have been discussed many times: stronger typing, RAII and deterministic resource management, better abstraction without necessarily paying for it at runtime, richer compile-time guarantees, and more opportunities for the compiler to optimize through well-structured types and templates. You can still write code that is extremely close to the hardware when necessary.

I am perfectly comfortable maintaining C in an established codebase where migration would provide little economic benefit, introduce unnecessary risk, or trigger an expensive certification cycle. There is no reason to rewrite working systems simply because another language is newer.

But for a greenfield systems project today, I would normally start with C++ or Rust rather than C. Which one depends less on language ideology and more on practical factors: available libraries, toolchains, platform support, certification requirements, team expertise, hiring market, and the economics of the project.

That may also explain some of the job-market imbalance. A company advertising for C++ can still hire someone to work very close to the hardware, while retaining the option to use higher-level abstractions elsewhere in the same codebase. A pure-C requirement is increasingly associated with a narrower set of platforms, legacy systems, or very specific constraints.
