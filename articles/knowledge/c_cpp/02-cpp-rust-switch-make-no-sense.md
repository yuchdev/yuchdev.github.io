I don't know many serious companies that simply "replace C++ with Rust"

Any experienced architect or tech lead will tell you that replacing an active ecosystem - codebase, team expertise, documentation, tooling, CI, debugging practices, libraries, certification - is usually a very expensive way to create new problems.

What happens in reality is much more gradual. Rust appears in selected modules, new subteams form around it, boundaries are defined, experience is exchanged.

Unfortunately, "this technology is cooler" is only one tiny part of the decision. Engineering managers also have to answer much less glamorous questions. How expensive is the transition? How hard is hiring? How scarce are experienced engineers? How will C++ and Rust teams communicate? What about libraries, build systems, compliance, certification, debugging, deployment, and long-term maintenance?

Linux is probably one of the best examples of how to introduce Rust pragmatically: not as a ideological rewrite, but as an additional tool with carefully controlled scope.

And a large part of why that works is leadership. Linus had decades to become a very pragmatic manager of distributed subteams, competing priorities, and limited resources.
