Imagine a team can work purely on vibes for a week (which happens almost everywhere in the industry), for example on a fast-moving mobile app, without stopping to reflect what actually changed.

Then Monday arrives and suddenly it is a David Blaine moment:

"Guys, what are you writing? - It's a mobile app. Yeah, an Android application. - Look closely, guys. - Oh my god... it's the operating system for car keychains!"

Jokes aside, your "comprehension debt" is something many teams feel but rarely measure: the codebase keeps moving, but the shared mental model does not move at the same speed (or even degrade, like in the joke above)

On practical view based on team leading experience, I would say that teams probably need a multi-layer defense, not a single solution. There's no magic bullet.

The classic layer is still old good code review, but review has to become more than "is this correct?" 
It should include: "Can another engineer explain this change?", "Does this alter the solution on the architectural level?", and "Did we update the operational team knowledge?"

Then comes old good documentation, but again, not giant wiki pages that nobody reads. I would prefer lightweight, enforced artifacts: ADRs for architectural decisions, short "how this subsystem works" notes, runbooks for critical flows.

Another useful practice could be a comprehension review for critical systems: once per sprint or month, ask engineers to explain a subsystem they do not own. If only one person can explain it, that is a bus-factor risk.

Of course, the modern layer is AI-assisted comprehension. AI can be used not only to generate code, but to continuously explain diffs, summarize PRs, detect undocumented behavior changes, generate onboarding guides, and create "system maps" for repositories. 

An interesting solution in this specific direction is building a kind of collective team memory around the codebase. Not just classic documentation as static pages, but a searchable engineering memory made from PR discussions, ADRs, incident reports, architecture notes, important Slack/Teams decisions, and AI-reviewed code explanations. Technically, this can be implemented with pgvector on top of PSQL, or with a dedicated vector database if the scale requires it.

The important part is not the database itself, but the workflow: every important engineering decision and explanation becomes retrievable later by semantic search. A new engineer or reviewer could ask: "Why does this service retry this way?", "What incidents involved this subsystem?", "Someone worked on rendering bug on Monday - who was that and what was the solution?"

That turns AI from a code generator into a memory interface for the team. It does not replace ownership or review, but it reduces the chance that your knowledge silently disappears.

