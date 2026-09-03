### DESIGN OF CI/CD

I mostly agree with the concern - and I'd frame it like this.

From about 10 years of working with different CI systems (it just happen in each team I knew more about it and willing to do), one rule consistently holds: pipeline code should stay thin. It should describe when things happen, not how they happen.

CI/CD definitions (Groovy, YAML, Kotlin) are a control plane, not an execution environment. The moment real logic starts living there, you lock knowledge into a vendor-specific DSL with very low reuse value.

The rule of thumb: anything that can be reproduced on a developer machine must be isolated:

- build logic
- test orchestration
- packaging
- environment checks

Put that logic into something portable - a Python script, Make/CMake, Gradle, Bash, etc. Then CI only calls it.

This gives you:

- identical behavior locally and in CI
- faster debugging (no "push to test" loops)
- minimal CI vendor lock-in and easier migrations between Jenkins/TeamCity/GitLab/GitHub

This part of the project should be treated as 1st-class code as well. Pipelines are glue, your build logic is the CLI application.
