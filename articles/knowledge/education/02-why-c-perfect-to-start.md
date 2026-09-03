1. I started with C - and I'm still convinced it's a strong choice as a first programming language -  provided you have a basic understanding of computer architecture and algorithms.
C doesn't hide the mechanics of code execution, so it forces you to think about addressing, the stack, data lifecycle, and the cost of each abstraction.
It does not mask the hardware reality - and that is why it shapes the right engineering mindset from the very beginning.

2. Why exactly C, not C++

wouldn't say C++ (specifically modern C++) is the best language for beginners. Over more than 40 years of evolution, it has developed what Scott Meyers called a "culture of complexity" 

Uneven evolution introduced several loosely intersecting domains - low-level programming, OOP, templates, the STL, concurrency and lock-free - that often coexist in the same codebase but follow very different rules and mental models.

That doesn't make C++ a bad language, it means it demands a proper foundation. Without that foundation, beginners are often overwhelmed not by concepts themselves, but by the sheer number of ways to express them.

---

3. What is we skip C entirely

So basically you're saying a software engineer doesn't need to understand how a computer works to write code.

In theory, it's possible. You can even train the rat to run through a maze, and you can train a coder to press right keys.
In practice however, it's a terrible idea

1. You can afford not to micromanage memory only if you understand what you're abstracting away. Otherwise you'll happily write O(n^2) instead of O(n), allocate gigabytes in a loop, trigger massive GC, blow the stack with recursion, copy large structures instead of passing by reference. Without a mental model of stack vs heap, cache locality, allocation cost, and data layout, performance issues look like "magic"

2. A coder who never learned the mechanics becomes locked into high-level tooling. If the only model is "I press A -> B happens", C++, Rust, Go, Java performance tuning become inaccessible, because the foundation is missing. All what remains - being bad Python or JS coder

3. And what would you do if the problem *is* the computer-level? Lock-free structures, memory ordering, cache coherence, freestanding envs - should we still "ignore the computer"?

In all said cases you're not focusing on the problem - you're repeating learned actions, like a monkey that discovered pressing the red button produces a banana.
