Yes, Windows has probably the strongest backward compatibility story of any mainstream OS: compatibility modes, WOW64, Hyper-V (Windows analog of Docker), registry and filesystem virtualization - which is a significant advantage of the ecosystem.
It's not unusual to find 15-20 year old 32-bit business applications still running on modern Windows releases.

Linux simply has a different approach. The kernel ABI is remarkably stable, but user-space compatibility is not guaranteed. Common solutions include containers (Docker, Podman), chroots, KVM, and require way more technical effort to launch legacy product. 

In fact, many organizations find it easier to run a 20-year-old Windows application than to run a 20-year-old Linux binary that depends on a specific version of glibc and a long-extinct distribution.

MacOS is the outlier. Apple historically prioritizes platform evolution over backward compatibility, despite originating from BSD kernel with perfect Jails mechanism. Each transition improved the platform but left some software behind. I suspect this is the main reason why Apple is not welcome in the enterprise.

So the accurate conclusion is:

Windows tries very hard to preserve the past.
Linux preserves the kernel and lets you preserve the rest yourself through containers and VMs.
Apple tends to say: "That was a great application. Please buy a new one"
