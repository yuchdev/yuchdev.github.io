Some people come for ideas about System Design interview. So, sharing one that would be pure joy to discuss both for interviewer and candidate:
"Imagine you are designing a modern version of Voyager-1 using today's technology. You are free to choose hardware, programming languages, operating systems and architecture - as long as it fits within realistic mission constraints."
---
### 1. Start with the right questions: before drawing architecture
* Mission success criteria? Lifetime – 10–30–50 years?
* Route: planetary flybys? Jupiter-level radiation?
* Power source and degradation curve?
* Contact frequency and data rate at deep space distances?
* Required autonomy during long comm blackouts?
Even for candidates without a background in Rocket Science™, asking about radiation, latency, and power shows real technical maturity: **physics still wins all architectural debates**. Software doesn't "run in the cloud", it runs inside chips and wires.
And for embedded engineers, this is basically a dream interview: finally, someone wants to talk about **brownouts, bitflips, watchdogs, and why electrons are the true product managers.**
---
### 2. Design for survival first: separate survive from operate
#### A. Minimal Safe Kernel
* Boots
* Power-governs
* Beacon-communicates
* Can rollback flight software
If everything fails, that's what keeps the probe alive.
#### B. Flight Executive (RTOS)
* Explicit state machine
* Command sequence
* FDIR (Fault Detection-Isolation-Recovery)
* Deterministic scheduling
* Telemetry / storage control
* Update / rollback
#### C. Payload
* Instruments, compression, edge cases
* Restartable and isolated
This pattern works for **spacecraft, factories, robotics**.
---
### 3. RTOS, bare metal, Linux?
* Bare metal for minimal survival core
* RTOS for deterministic control
* Linux only for isolated payload processing
**Complexity must never be required for survival.**
---
### 4. Redundancy done responsibly: SpaceX model
* Dual-string computers (A/B)
* ECC memory
* Software images with rollback
* Selective voting for critical sensors
Redundancy must be **testable for decades**.
---
### 5. IPC and containment: most failures are software propagation failures
* Message passing, shared memory
* Bounded queues only
* Clear QoS: events never dropped, science can be decimated
* Payload cannot directly command critical actors
Modes define allowed behavior:
**SAFE, CRUISE, SCIENCE, DOWNLINK, RECOVERY**
(drones use that too)
If you can't draw the **mode table**, you don't control the system.
---
### 6. How to test something that flies 40 years
* Digital twin with fault injection
* Processor-in-the-loop
* Hardware-in-the-loop
* Chaos tests: SEUs, brownouts, saturation
* Invariants: safe mode reachable from any state
---
### 7. How to conclude
One must understand: **Voyager-1 interview is not about space.**
It's about disciplined thinking:
* Ask constraints first
* Design survival before features
* Contain possible faults
* Plan rollback before launch
A candidate who can reason this way can design anything that **must not fail**.
---
