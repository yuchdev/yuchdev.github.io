# Debugging in Orbit: How to Design a Space Probe in a System Design Interview

A couple of colleagues came for ideas about the System Design interview. I was considering this one for a while already, and I think it should be a pure joy to discuss both for interviewer and candidate.

"Imagine you are designing a modern version of Voyager-1 using today's technology. You are free to choose hardware, programming languages, operating systems and architecture - as long as it fits within realistic mission constraints."

Of course, not the rocket or the launch vehicle - just the probe.

One thing should be understood upfront: this is not really a space engineering question. In most interviews, neither the interviewer nor the candidate has the experience required to design an actual deep-space probe - and that's perfectly fine. The point of the exercise is a systems thinking question. Like many system design discussions, there are rarely result completely right or completely wrong answers. What matters is how you reason about constraints, trade-offs, and failure modes. The architecture you propose depends heavily on the angle from which you approach the problem and the context of the components you choose to design.

Let's walk through how a strong candidate might approach our future space triumph.

---

# Step 1 - Ask the Right Questions First

The biggest mistake candidates make in system design interviews is jumping straight to architecture diagrams.

Experienced engineers approach differently - they start with questions.

Before drawing anything, a candidate should clarify the constraints that will shape the system.

* What exactly counts as mission success?
* Is the probe expected to operate for ten years, thirty years, or perhaps half a century?
* Where will it travel? Will it pass Jupiter, where radiation becomes brutal? Or will it remain in relatively calmer regions of space?
* What communication constraints exist? When a probe is dozens of astronomical units away, round-trip latency is not seconds - it's hours.
* And of course, there is power. Deep-space probes live on extremely limited energy budgets that slowly decline over decades.

Even for candidates without a background in Rocket Science™, asking about radiation, latency, and power shows real technical maturity: *physics still wins all architectural debates*. Software doesn't "run in the cloud", it runs inside chips and wires.

And for embedded engineers, this is basically a dream interview: finally, someone wants to talk about brownouts, bitflips, watchdogs, and why electrons are the true product managers.

---

# Step 2 - Design for Survival Before Functionality

Once the constraints are understood, the most important design principle appears.

Separate *survival* from *mission functionality*.

If a spacecraft fails completely, the mission is over.
But if some functionality fails, the spacecraft might still survive and recover.

So the architecture naturally splits into layers.

---

## Layer 0 - The Safe Kernel

At the very bottom is a tiny, extremely conservative piece of software: the *safe kernel*.

Its job is not to run science experiments, but simply to keep the spacecraft alive.

The safe kernel can:

* boot the system
* monitor power levels
* switch to beacon communication mode
* shutdown non-essential loads
* verify and roll back flight software images

If everything else crashes, this layer must still function.

In many missions, this code is stored in protected memory and almost never updated after launch. It is intentionally small and heavily verified.

Think of it as the spacecraft's survival instinct.

---

## Layer 1 - The Flight Executive

Above the safe kernel sits the *flight executive*, usually running on an RTOS.

This is where the real spacecraft logic lives.

* The flight executive manages the probe through a series of operational modes, resembling an explicit state machine.
* It receives commands from Earth, schedules activities, monitors health signals, and reacts to faults.
* It performs a critical cycle of long-duration missions: *FDIR* - Fault Detection, Isolation, and Recovery.
* The scheduling and timing must remain deterministic and predictable.
* It packages telemetry and scientific data for sending it to Earth.
* Since it's unlikely to send all data in a single transmission, it's responsible for storage, implements efficient compression and error correction techniques.
* And finally, it is responsible for update and rollback of flight software images.

But you said the Safe Kernel is responsible for it? No, the kernel rolls back the flight executive in an emergency mode, when it's not capable to do it on its own. Mission core does it in a regular more.

And of course, the mission core must be able to survive in the face of decades to pass.
Radiation flips bits. Sensors drift. Electronics age.
The flight executive must constantly watch for anomalies and decide how to respond.

---

## Layer 2 - Payload Software

Finally, we reach the payload layer.

This is where instruments live. Cameras, spectrometers, magnetometers, particle detectors - all the scientific tools that make the mission worthwhile.

Payload software processes data, compresses results, and prepares them for transmission back to Earth.

But there is an important rule: *payload code must never threaten spacecraft survival*.

If an instrument crashes, the executive restarts it.
If it crashes repeatedly, the executive disables it.

Science is important.
But survival is mandatory.

This pattern works for *spacecraft, aircraft, factories, robotics*.

---

# Step 3 - Choosing the Right Software Platform

A natural follow-up question in the interview is operating systems (we're still designing a software system, right?)

Should the spacecraft run bare metal code? An RTOS? Linux?

The correct answer is rarely ideological.

The safe kernel layer is often implemented as extremely minimal software, sometimes even bare metal.

The flight executive benefits from an RTOS, which provides deterministic scheduling, message queues, and reliable timing primitives.

Linux, while powerful, is usually reserved for non-critical payload processing where complex software ecosystems may be useful.

The key idea is simple:

*Complex software should never be required for spacecraft survival.*

---

# Step 4 - Redundancy Without Unnecessary Complexity

This subject does not change much from discussing the cloud software.

It might be tempting to propose full triple-modular redundancy - three computers constantly voting on every decision.

In reality, spacecraft designers usually prefer something simpler and more testable.

Two independent computers - commonly called *A/B strings* - provide redundancy. One runs the spacecraft while the other waits as a spare.
But the candidate can absolutely discuss both possibilities, with evaluating the benefits and tradeoffs.

Memory is protected with ECC and periodically scrubbed to correct radiation-induced errors.

Software images are stored in pairs so that updates can roll back safely if something goes wrong.

Voting is typically used only where it makes sense - for example, when comparing readings from multiple sensors.

The goal is not maximal redundancy.
The goal is *reliable redundancy that can be validated before launch*.

---

# Step 5 - Communication Between Subsystems

One of the most fragile parts of complex systems is inter-process communication (hello, microservice lovers!)

Poor IPC design can lead to deadlocks, memory leaks, and cascading failures.

So spacecraft software follows a few strict rules.

* Message passing is preferred over shared memory.
* Queues must always have bounded size.
* Payload cannot directly command critical actors
* Clear QoS: events never dropped, science can be decimated in favor of survivability.

Housekeeping telemetry can tolerate delays, yes.
But fault events must always get through.

Another important principle is *capability boundaries*.

Payload code cannot directly command thrusters or power switches.
Instead, it sends requests to controlled services that validate the action before executing it.

This prevents one faulty subsystem from taking down the entire spacecraft.

---

# Step 6 - Modes Control Everything

At its core, a spacecraft is really just a sophisticated *state machine*.

Typical operational modes might include:

* Safe Boot
* Beacon Safe Mode
* Cruise
* Science Collection
* High-Gain Downlink
* Diagnostic Recovery

Each mode defines what systems are active, how power is distributed, how the spacecraft points its antenna, and how faults are handled.

Transitions between modes must be carefully controlled. Transition to the survival should be available from each mode.

If engineers cannot clearly describe the mode table, they probably do not truly control the system.

---

# Step 7 - Testing Something that Flies 40 Years

Of course, designing such a system is only half the story.

It must also be tested.

A typical verification strategy involves three levels.

* First comes a *digital twin* - a sophisticated simulation environment that allows engineers to inject faults, accelerate time, and explore edge cases.
* Next comes *processor-in-the-loop testing*, where the real flight software runs against simulated hardware interfaces.
* Finally, *hardware-in-the-loop testing* comes, where the real flight computer interacts with emulated sensors, communication links, and power systems.

Engineers deliberately introduce faults:

* radiation-like bit flips
* power brownouts
* communication dropouts
* queue overloads

The system must demonstrate that it can always reach safe mode and recover, because debugging a spacecraft once it reaches Saturn orbit is... inconvenient.

---

# The Real Lesson

The Voyager design question isn't really about space exploration.

It's about disciplined engineering thinking.

* Ask constraints first.
* Separate survival from functionality.
* Make operational modes explicit.
* Contain faults before they spread.
* Design rollback mechanisms before deployment.

If a candidate can reason through a system like this, they can design far more than a spacecraft. They can design any system that must not fail.
