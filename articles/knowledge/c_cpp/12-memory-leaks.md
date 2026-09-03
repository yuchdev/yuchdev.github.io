### C++ AND MEMORY LEAK

A memory leak is truly dangerous when it happens inside a callback, loop, request handler, daemon, or other long-living path. That's how you get gradual RAM growth and eventually production crashes.

A single leak mostly just annoys perfectionists like me.

In fact, some applications intentionally delegate final cleanup to the OS because reclaiming memory manually at shutdown may cost more time than simply exiting. Compilers, build tools, and many CLI utilities often work this way: do the job ASAP, terminate, let the OS reclaim the process memory. Modern operating systems clean up process resources on exit anyway. 

Of course, this does not justify sloppy engineering - resource handles, sockets, shared memory still matter,and "the OS will clean it up" is not a valid excuse for any server software.
