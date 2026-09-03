### LINUX IN SPACE (TODO: MAYBE FIND MORE DETAILS)

If seeing Linux on an aircraft screen feels impressive, them realizing that Linux (or Linux-derived systems) routinely operate hundreds of kilometers above Earth and millions beyond it - is beyond impressive.

Satellites & space probes

Many modern satellites and scientific probes rely on classic and RT Linux systems for non-flight-critical and mission-critical workloads:

- Payload control (cameras, spectrometers, radar)
- Data compression and preprocessing in orbit
- Secure scheduling and buffering
- A hardcore RT Linux for attitude control

SpaceX: Linux at launch scale

SpaceX is one of the most cited real-world examples of Linux in mission-critical aerospace systems.

Key architectural idea is:

- Multiple independent Linux computers onboard each spacecraft
- Voting & cross-checking between nodes (no single point of failure)
- Each computer runs the same flight software, but on different cores/different physical instances
- If one node misbehaves, it is outvoted and ignored

Why Linux works here:

- Deterministic behavior when properly configured (PREEMPT_RT, CPU isolation)
- Mature networking stacks for unstable/buffered links
- Ability to run complex software stacks that would be unrealistic on 100% bare metal
- Full control over the kernel and drivers - mo hidden vendor drivers/software
- Ability to inspect, test, and certify exact behavior
- It dramatically reduces validation cost: the same codebase can be tested on Earth and deployed in orbit

Linux did fly on Mars aboard the Ingenuity Helicopter.

Ingenuity wasn't just a camera drone- it was a fully autonomous aircraft operating in an environment where:

- No GPS exists
- Communication latency is ~5-20 minutes
- Failure means permanent loss

And its main onboard computer run Linux, which respponsible for

Computer vision
Navigation without GPS
Terrain-relative motion estimation
Mission logic ("fly here, hover, land")

