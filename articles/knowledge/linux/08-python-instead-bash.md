In theory, Python is of course not part of POSIX, so a POSIX system is not required to provide it.

In practice though, Python installed by default on most of Unix-like systems. Most Linux distributions and many BSD installations include it by default. If you make a Linux/BSD installation from scratch, it a trivial package install.

For ordinary system-maintenance scripts you usually don't need any third-party Python dependencies at all. The standard library already provides filesystem, process management, networking, JSON/XML/CSV, compression, SQLite, hashing, HTTP clients and servers, concurrency, and much more.

Essentially, by order of magnitude more powerful system-management tool than Bash.
