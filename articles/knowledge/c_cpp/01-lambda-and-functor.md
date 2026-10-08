It is surprising how many people mindlessly repeat the long-outdated mantra "lambda is just syntactic sugar over a functor"

There are multiple cases where you cannot create an equivalent ordinary functor in the same context. The attached C++20 example is one: a generic lambda can have a templated, concept-constrained `operator()`, while an ordinary local class cannot declare member templates. To reproduce it with a named functor, you have to move the type outside the local scope, which is an architectural change.

Another example is capture `[&]`. You can't just tell the struct to capture the context around, there are no such tools in C++. Yes, you may argue that at the compiler level this is "just" generating class state for referenced variables. But then we should be consistent: at the compiler-output level there is no such thing as a "functor" and there's no `struct` either. There is data layout, generated functions, and effectively a this pointer passed to member function operator()

So the useful abstraction level is the language itself. At that level, lambdas have capabilities and lexical access rules that ordinary user-defined functors do not.

Calling all of that "just syntax sugar" is a professional illiteracy. Knowing it is not and calling it "just syntax sugar" is a persistent ignorance.
