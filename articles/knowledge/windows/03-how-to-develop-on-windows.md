### HOW TO DEVELOP ON WINDOWS

From my experience, problems usually fall into three buckets:

1. The ecosystem

Terminals, IDEs, file managers - the default Windows stack is сraрру

The good news: you're not forced to use it

You don't need Visual Studio - you can wire the MSVC toolset into anything from Neovim to CLion. You don't even need to work on Windows - SSH into Linux or Mac is a perfectly valid workflow nowadays 

You don't have to use Explorer - there are several decent Bash implementations, and tools like FarManager are still fantastic, fast, and cross-platform

You don't have to use the stock package manager 

A native POSIX-style toolchain has existed on Windows for a long time and is easily available via package managers:

- Git Bash&pacman (quick and pragmatic)
- Cygwin (very complete POSIX layer)
- Choco (system-wide installs, clean automation)

MS ecosystem can be reduced to just a kernel + compiler if you need

2. Everything is slow

The one hurts the most

What needed 2GB RAM ten years ago now happily eats 16 GB, with no visible benefit. There are two solutions to that

If you're forced (by client or employer) to run a full Windows image, the only real option is to strip it down:

- disable telemetry
- remove spyware/сrарware
- kill unnecessary services

It won't make Windows fly - but you will feel the difference

If you only need Windows to build something, there's a second option:
community builds like Tiny10, which run comfortably in 2GB RAM, much like Windows 7 once did. Of course, with zero MS vetting, but real engineers don't need it

3. Support reality

This one is unfortunately simple: unless you're a "gold partner", you're out of luck.

So we do what engineers always do: minimize dependency on fragile components, isolate what we can't control, build the most efficient setup you can reach around the system

Your frustration is valid. But my point it that endless complaining won't fix it, and just reinforce your frustrations. 
And it's not what we're paid for anyway. 
Pragmatism beats ideology - reduce the surface area, keep what works, replace what doesn't - and move on.

----------------------------------------------------------------------------------------

### HOW TO DEVELOP ON WINDOWS 2

I think the original post mixes current Linux advantages with historically messed and definitely overstated claims about Windows - especially if we talk about development, not ideology.

I didn't work directly with Windows recently, but for ~15 years I developed C/C++ across Linux/Windows/Macos, starting around the Windows XP&7 era. Coincidentally, that period included what I still consider the best OS Microsoft ever shipped.

1. Performance & resource usage - context matters

Yes, modern Linux distributions can be lighter than modern Windows - especially compared to Windows 10/11 with telemetry, background services, and consumer features.

But historically - I ran Windows 7 in a Parallels VM with ~1.5 GB RAM, used it daily for native compilation, code signing, tooling - performance was comparable to macOS and Linux for dev workloads.

So "Linux is incomparably faster" is not a universal truth - it's version-, configuration- and workload-dependent.

Tooling was cross-platform long before WSL

I wouldn't call lack of developer tooling a real issue, even back then. Most tools I used were cross-platform by design:

Editors/IDEs: Sublime - CLion - VS Code
Toolchains: CMake, Clang, GCC
Languages: C/C++, Python, Java
Linters, static analyzers, build systems - all portable

Yes, some Linux-native tools were missing:
Valgrind was a pain point (though Windows had alternatives)
Docker is not truly cross-platform by design. That's not a Windows flaw; it's a Docker architecture choice. HyperV now run same tool sharing Windows kernel.

Over time, I learned to replace Docker tooling with automation (mostly Python) and platform-agnostic workflows.

3. Windows was never "CLI-hostile"

Options existed for years:

Cygwin/MinGW - full POSIX toolchains with Unix tooling and package managers.

PS - not POSIX, but extremely powerful for system automation.

Far Manager/Midnight Commander - identical file managers across 3 OS, with identical plugins and shortcuts.

My file manager, shortcuts, plugins, and muscle memory were the same on all three systems.

4. Updates - policy issue, not a technical impossibility

Forced updates became aggressive only with Windows 10. Even then, updates can be paused or disabled indefinitely. Enterprises do this routinely

I agree the default behavior is hostile - but technically, Windows never fully removed control.

5. The opposite showstoppers went the other way too

For a long time, Linux/macOS bothering me because of missing professional software:

- Enterprise Architect
- Full Adobe Photoshop
- Full MS Office stack (especially Excel + DB integration)

Every OS has strong and weak sides. Pretending otherwise is just bias.

Bottom line

Linux is excellent for development - especially today. Windows was never "unusable" for serious dev work

At that point, the OS stopped being the main bottleneck - bad architecture and bad tooling did.

That's the argument worth making.

----------------------------------------------------------------------------------------

### HOW TO DEVELOP ON WINDOWS 3

Back in the Windows 7 era (still the best OS Microsoft shipped, IMO), I felt equally productive on all three platforms. Even today, Windows can be a first-class dev environment if you treat it as engineers do - not as a consumer appliance.

Here's how Windows was (and still is) perfectly usable for serious development:

1. Dev tooling has been cross-platform for a long time

CMake, Clang/GCC, Python, Java, linters and static analyzers, Sublime, VSCode, CLion - most serious dev tooling stopped being OS-locked years ago.
I have scripts for each system installing identical toolset for system I'm planning to work with through respective package manager (apt, yum/dnf, brew, choco, winget) 

2. Windows was never "CLI-unfriendly"

Cygwin/MinGW provided full POSIX environments; PowerShell is extremely powerful for system automation (even if not portable). 
My daily workflows and file managers were identical across all three OS, with all plugins and keyboard shortcuts.

3. Linux-only tools aren't Windows flaws

Docker is Linux-kernel-centric, it's a design choice. Valgrind was always missed, yes - but Windows had alternatives, and automation often bridged the gap.

4. You always have control - just not by default (even in Windows 10)

Windows 10 brought most hated features so far - intrusive updates, telemetry, bloatware. However.

- Bloatware can be removed with a single PowerShell script
- Updates can be paused or disabled via policies/registry
- Telemetry and intrusive features can be turned down or off

Tools like ShutUp10 do it with single click.

Enterprises do this routinely when building baseline images.

5. Every OS has professional showstoppers
For years, Linux/MacOS were deal-breakers for me due to missing tools like SolidWorks, Enterprise Architect, full MS Office (Excel with ODBC), old good  Photoshop CS. There are trade-offs everywhere.

Bottom line:

Linux gives you control by default.
Windows requires you to assert it - but the control is still there.

As engineers, we should evaluate platforms based on capability and constraints, not ideology. Once tooling and workflows are portable, architecture matters more than the logo on the boot screen.

---

The funny thing is that most people discussing this don't realize there's an entire ecosystem of custom Windows builds.

Projects such as Windows 10/11 Nano, Tiny11 and similar community builds strip out a large portion of the bundled crapware, telemetry, background services, consumer apps, and other non-essential features. The result is a dramatically smaller memory footprint and a much lighter system.

Of course, the tradeoff is obvious: no official support, no guarantees, and you need to know exactly what you're removing. It's not something I'd recommend to a typical non-tech user.

People often compare Windows 11 to Windows 7 and conclude that "software got worse." The reality is that a large portion of the extra RAM is consumed by services, telemetry, pre-caching, cloud integration, security features, and bundled applications - not by the kernel itself.

If you're willing to trade convenience and support for efficiency, modern Windows can be made remarkably lean. Not quite 2009-era Windows 7 lean, but certainly far closer to the "2 GB RAM runs smoothly" experience than most people realize.

---

