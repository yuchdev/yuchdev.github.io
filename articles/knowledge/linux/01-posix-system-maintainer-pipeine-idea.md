Your example gave me quite a global idea of an AI system maintainer for opensource systems (Linux. BSD family, NixOS)

Opensource model gives us a useful six-level model of system AI-assisted control that is fundamentally impossible to reproduce on closed-source operating systems

1. Configure - change exposed settings, policies, services, kernel options
2. Automate - add scripts, systemd units, udev rules, scheduled or event-driven actions
3. Workaround - compensate for bugs or missing behavior without modifying upstream code
4. Patch userspace - modify and rebuild an application, library, desktop component or daemon
5. Patch a system component - fix infrastructure such as systemd, Mesa, networking, etc.
6. Patch the kernel/driver - descend all the way to the hardware-facing implementation

An AI system-maintenance agent could deliberately start at the least invasive level and descend only when the problem cannot be solved there.

Such a cooperative multy-agent Personal Linux Maintainer that can diagnose a problem, select the appropriate level, implement and test the change, preserve it declaratively, track the upstream fix, and eventually remove the local patch when it is no longer necessary.
