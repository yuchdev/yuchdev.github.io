Not sure what exactly Robert has in mind here, but modern agent systems absolutely can collaborate - and they can do it in both cooperative and adversarial modes.

You can have several agents work on different parts of a problem while sharing context, or deliberately assign one agent to challenge another: find counterexamples, attack assumptions, review the implementation, or argue for an alternative solution. A third "judge" or moderator agent can then evaluate the competing outputs and select or synthesize the strongest result.

This is not just theoretical. Multi-agent debate is already an active research direction, including fact-checking systems where agents argue opposing positions, retrieve evidence, critique each other, and a judge produces the final verdict. Recent systems have reported better fact-verification performance than comparable single-agent approaches.

https://www.sciencedirect.com/science/article/pii/S2405959526000883

Of course, simply putting several agents in a room does not magically create a good engineering team. Poorly designed debate can amplify errors, conformity, or even persuasive nonsense.

https://www.nature.com/articles/s41598-026-42705-7

So I'd agree with the narrower point: independent agents implementing disconnected stories without coordination is a bad architecture. But "if only we could get agents to pair" is already largely a tooling and orchestration problem, not an unsolved capability.
