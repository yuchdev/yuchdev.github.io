Well, I came to Linux from FreeBSD.

At that point, zsh was already my favorite - honestly, almost my only - shell, vim was my editor, and compiling your whole system for your CPU architecture, down to the kernel, felt like a natural part of the workflow.

So at first I looked at Linux slightly "from the height of real UNIX." Something like:

> Wait, you don't have proper threading yet?
And you don't build your tools from source by default? 🙂

But then came the incredible Linux push of the mid-2000s: rapid hardware support, corporate investment, virtualization, KVM, containers, cloud infrastructure, and eventually the whole cloud-native ecosystem. That bet paid off enormously.

By the early 2010s, Linux had become the default operating system layer of the internet - not just "a server OS," but the base of almost every modern service.

At that point I migrated without much drama. I'm an engineer, not a tribesman. If the tool is better for the task, I use it - and Linux is incredibly good for many tasks.

And, of course, if you miss the old rituals, you can still compile your own kernel 🙂

---

### BSD, LINUX AND VIRTUALIZATION

I find it fascinating how Linux eventually outpaced BSD.

In the early 1990s, "POSIX" almost implicitly meant BSD. It was mature, stable, and academically respected. Linux 2.4 still didn't even have fully robust threading - NPTL only arrived later. For a long time, BSD looked like the "serious" Unix.

Yet by the late 2000s, even the most conservative infrastructures had switched to Linux.

The turning point wasn't ideology - it was virtualization and ecosystem velocity.

Linux embraced large-scale virtualization early:

- Xen integration in enterprise distros
- KVM becoming a first-class in-kernel hypervisor
- Tight integration with hardware vendors
- Rapid evolution around containers (cgroups, namespaces)
- Eventually becoming the natural substrate for Docker and Kubernetes

BSD remained technically elegant, but Linux optimized for momentum: broader hardware support, corporate backing (IBM, Red Hat), faster driver inclusion, and aggressive datacenter focus.

In the end, Linux didn't win because it was cleaner. It won because it moved faster in the domains that mattered most at the time: virtualization, cloud, and scale.

Architecture matters.
But ecosystem velocity decides history.
