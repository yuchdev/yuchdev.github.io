I've seen this model work well: in the pre-AI era I worked in tandem with a privacy specialist - he brought domain expertise, I brought deep language/system expertise. That separation can be extremely effective.

But narrowly isolated specialists are relatively rare. Engineers often grow at intersections: C++ and performance, Java and finance, Python and ML. And that is where many of the most interesting problems appear.

Example: a normal REST API needs custom cryptography too heavy for Python. So the hot path is implemented in C++ and exposed as a native Python module. Now you need above-average knowledge of both ecosystems, memory/ABI boundaries, deployment and performance.

Another case I still remember proudly: fixing a performance problem in an embedded cross-platform columnar database, increased output by ~450%. The solution required deep knowledge of both POSIX and Windows system APIs.

So most companies may not need a pure language specialist, but they often need engineers with deep language knowledge combined with deep domain or systems expertise - otherwise we're simply losing too much time on communication between an army of narrow experts.
