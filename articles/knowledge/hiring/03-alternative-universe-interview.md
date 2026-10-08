### INTERVIEW WITH SORTED FLOAT

Another episode of "alternative-reality interview questions"

I was once asked: "What's the correct way to sum many floating-point values?"

Fair question. Fairly standard answer too. If numerical error matters, you keep the values in a contiguous container, sort them by magnitude, and then accumulate from smallest to largest. This reduces catastrophic cancellation and rounding error. Classic stuff.

The interviewer immediately declared: "That solution is NOT OPTIMAL"

No criteria given. No constraints. Just... not optimal :)

Naturally I asked, what is more optimal - expecting some crazy manual SIMD and intrincics. Eventually, he revealed his "optimal" idea, to use... priority_queue

I explained why that's actually worse in most realistic scenarios:

A priority_queue is typically backed by a binary heap, which means:
- Poor cache locality: elements are accessed in a tree-like pattern, jumping around memory
- No SIMD/vectorization opportunities: the compiler can't efficiently pipeline or vectorize heap pops
- Higher constant factors: each extraction is O(log n) with multiple comparisons and pointer arithmetic


A std::vector, on the other hand:

- Is contiguous in memory, which plays perfectly with CPU cache lanes and prefetching
- Enables auto-vectorization during accumulation
- Has predictable memory access patterns that modern CPU love

If you actually need permanently-sorted order:

Sorting a vector once (O(n log n)) and then doing a linear pass is often faster than repeated heap operations.

And for cute-sized containers, the entire vector may live in L1/L2 CPU cache, making the maintaining sorted state cost almost trivial.

Then came the hand-waving and desperate attempts to "save face"

"But priority_queue keeps the container sorted!"

First, there were no such requirement in the first place.

Second, no, it doesn't.

A heap is not sorted. It only guarantees that the top element is extremal. Everything else is partially ordered at best. If you need sorted traversal, you still end up paying for repeated heap operations.

At that point it became clear: the entire interview question was about demonstrating familiarity of interviewer with priority_queue

By this moment, I largely lost interest - both in the interview and in the company.

Good interviews test reasoning.

Bad ones test vocabulary.

And of course it's extremely disappointing when company put in charge of preparing interview plan people who didn't do homework.

---

### SCAM AND IBM

I recently faced a strange recruiter experience - curious if you've seen something like that.

I was contacted by a recruiter offering what looked like a dream role:
fully remote (!) position at IBM (!!)

Luckily, I'm not since yesterday in the industry, and that alone raised an eyebrow. The "blue giant" is not exactly famous for mass fully-remote hiring, especially for senior technical roles. Not impossible - but unusual enough to raise attention.

Then I read the job description.
And that's where it got... just odd.

The description was essentially a point-by-point rewrite of my own CV:
- technologies I used, from different projects and time spans
- domains mixed together with no real production logic
- stacks that don't naturally coexist suddenly presented as "daily work"

C++ high-performance systems, C++ GUI in Qt, Java enterprise-grade, backend in Python, GUI in Python, my favorite - agentic guardrails in Python 😁 - and so on.

What made it especially suspicious is that no real team or problem was described. Just me, reassembled into a fictional role.

Individually, every bullet made sense.
Together, they formed a technological chimera - something that supposed to look impressive on paper but wouldn't exist as a real role.

It felt less like a job description and more like a profile mirror, or a synthetic role generated from my LinkedIn history - or a bait, designed to keep conversation going. 

My working theories (pure speculation)

I can imagine a few possible goals behind this kind of outreach:

- Data harvesting: keep you talking, extract more detailed CV/project info for further use/resell
- Pipeline inflation: create the illusion of "active candidates"
- Market probing: test how senior engineers react to certain offers
- Outright scam attempts down the line (documents, "equipment fees", identity info)

I didn't proceed further of course, but the pattern stuck with me.

Question to the community

Have you encountered something similar on LinkedIn? 👀

- Roles that feel tailored a bit "too perfectly"
- Job descriptions that look like your profile reflected back at you
- Big-name companies used as credibility anchors

Is this an isolated case - or a new normal we should all be more alert about?

---

### SCAM SAP

And here we go again - the same scam template.

> BELOW HERE'S A BRIEF OVERVIEW FOR YOUR REVIEW:
> Position: Senior Software Engineer / DevOps Technical Lead
> Company: SAP
> Location: Europe | Asia | North America | > > On-site / Hybrid / Remote
> Employment Type: Full-time
> Start Date: Immediate"

Conveniently tailored from my profile:

* roles I'm open to
* locations I'm targeting
* keywords sprinkled just enough to look "relevant"

But then it falls apart:

"SAP hiring remote across Europe, Asia and North America" - right, because global hiring compliance is that simple.

"Office, Hybrid, Remote" - wait, what happened to North America?

"Senior Software Engineer / DevOps Technical Lead" - always reassuring when a role tries to be two different jobs at once.

"Start date: Immediate" - of course. SAP is apparently urgently waiting to hire a random person from LinkedIn.

At this point it's less recruiting and more copy-paste phishing from a fake account.

Stay cautious, folks.

---

Another episode in my collection of "alternative-reality interviews"

I was invited to interview for a C++/Qt position. The interviewer insisted on keeping the camera on. Fair enough - I actually enjoy live technical dialogue. We moved from basic questions to deeper ones, even conversation seemed oddly onesided and mechanical. While discussing class design, I mentioned Qt's signal/slot mechanism is the closest practical implementation to what Dijkstra envisioned as disciplined OOP abstractions - and tried to steer the conversation into more meaningful territory, still answering everything precisely.

The interviewer smiled and said:
"Sorry, I'm not a technical person. I was just given a list of questions and answers."

At that moment, the mandatory video suddenly made perfect sense. It wasn't about discussion - it was about surveillance. Making sure the candidate doesn't have Mark Sommerfeld's book on his knees like we did in college exams.

I withdrew my candidacy from consideration.

It's hard to invent a more faceless, tasteless, unimaginative, and frankly disrespectful way to treat a senior candidate. On that background, even a well-designed online test or take-home assignment feels more honest - even in the age of AI, where framing evaluation properly is its own challenge.

This format sends a simple message:

"We value your time less than ours. And we value your expertise even less."
