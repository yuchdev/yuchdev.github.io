### QT SIGNAL/SLOT FOR AND AGAINST

Qt signal/slots are indeed very useful tool - but I wouldn't call them "universal" or a "game changer" in a broad sense.
They've been around for decades (including cross-thread delivery). They're a well-engineered take on the observer pattern + messaging, and Qt does a lot of heavylifting for you, especially in UI code

However, as it usually happen, there are constraints making them not the best fit:

- Thread safety isn't magic. Yes, queued connections are convenient, but they still introduce queueing, ordering and latency
- High-frequency pipelines, realtime, embedded, deterministic systems, or "no hidden allocations" environments often prefer explicit callbacks
- And sorry for being Captain, but they're *Qt mechanism* - you need the Qt meta-object system/event loop, which is not something you can assume in generic libraries, kernel/embedded, or mixed stacks

Signals/slots are excellent inside the Qt ecosystem (and arguably one of its strongest ideas - actually, close to what early OOP theoretists like Dijkstra hoped event-driven OOP code would feel like). But they're not a universal answer, and "imperative one-liners" like "stop using callbacks because signals are more elegant" usually don't survive contact with reality

In Qt, a signal delivery can be as cheap and deterministic as a normal function call, depending on how you connect it

Qt::DirectConnection is essentially "call slot now", which behaves like just another method call.

Also, Qt does have optimizations in the meta-object dispatch path, and signal-slotbare rarely real bottlenecks, especially in UI code, where Qt shines the best.

Flexibility is the whole point here. They're a tool with selectable semantics - not inherently slow or non-deterministic.
