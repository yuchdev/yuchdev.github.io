Kind of expected, once you think about how the ABI has to work.

A vtable is a concrete runtime structure with a fixed set of slots, and those slots ultimately point to functions with concrete signatures. Those functions may of course mention types whose definitions live in other translation units, but the set of virtual overloads itself has to be fixed.

That is why a templated virtual function would be such an awkward concept. A template does not denote one function - it denotes a potentially unbounded family of functions instantiated for different T.

What would the vtable contain then? One slot per possible T? That is impossible in general, because the compiler does not even know all future instantiations, and the set is not necessarily finite at the point the class is defined.

For my own mental model, instead of thinking "templates are forbidden in virtuals" as an arbitrary language restriction, I see it as a consequence of two incompatible dispatch models:

1. virtual dispatch chooses an override at runtime

2. template instantiation chooses a concrete function at compile time

3. vtbl completed when linked all symbols of translation unit
