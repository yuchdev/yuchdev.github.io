### MONOLITH AND MICROLITH

Splitting a monolith into a "microlith" (microservices with unnatural boundaries) rarely buys you anything. You just trade in-process calls for IPC/RPC, add network failure modes, introduce versioning problems, and your CI/CD, observability, and integration testing become more complex than the product itself.

A well-structured monolith with clear internal boundaries (modules, ownership, contracts) scales much further than people expect - and it's faster to build, easier to debug, and cheaper to operate.

Microservices do make sense, but only when the complexity is justified. In practice, I've seen three strong signals:

1. You need independent scaling characteristics (e.g. one component is 10x hotter than the rest)

2. The service is consumed by multiple independent systems/teams, not just your own app

3. Independent deployment velocity actually matters and coordination is a real bottleneck

If none of these are true, you're likely just adding wiring without solving a real problem.
