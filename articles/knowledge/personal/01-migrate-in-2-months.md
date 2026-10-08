### MIGRATE API IN 2 MONTHS

I once got hired for a "small" task: migrate an SDK client because the old version would lose support in two (!) months - a perfect risk management for financial-critical software!

Reality: not just the client was built with VC++ 11, but the entire ecosystem, so "migrating one client" actually meant dragging an entire ecosystem across new compiler

Of course
- no package manager
- no Cmake
- vendor-lock on MSVS
- a stack of proprietary libraries that needed repurchasing/updating
- build scripts hardwired to the ancient tooling possible 

I proposed going straight to VC++ 14 - if we're paying the migration cost anyway, let's move far enough to avoid doing it again soon. The answer was: no - migrate only to the oldest compiler supported by the SDK (VC++ 12) to "minimize risk"

What risk are you talking about? The biggest risk I saw is you have to repeat this horror in 2 years!

I warned them clearly: 2 months is not realistic. I got the buzzword "show you engineering spirit" pushback

Hell, even hiring second C++ contractor was not possible, because migration of ecosystem was a hard blocker!

In the end, I did rebuild the ecosystem to VC++ 12.0, and then we separated, both sides unhappy: they expected a miracle, I expected an actual plan
