## Why I don't believe in rewriting software (Part 1)
Every few years, our industry rediscovers the same idea and calls it progress:
> "This system is old. We should rewrite it."
I've seen this play out in environments with *everything* going for them:
top engineers, analysts, risk managers, big budgets, new hardware, executive support.
Including a rewrite of a **risk management system in an investment bank**.
It still failed.
Not because people were incompetent.
Not because the architecture was "wrong".
But because rewrites misunderstand what legacy systems actually are.
Legacy systems aren't just messy codebases.
They're systems **trained by reality**.
Years of production shaped them:
• hot paths discovered accidentally
• bottlenecks hammered flat under load
• regulatory quirks encoded as "weird hacks"
• performance tuned to real data, not models
The rewrite looked cleaner.
It was theoretically better.
And it was slower, less predictable, and riskier.
Why rewrites keep failing:
• Maintenance costs are *visible and painful*
• Rewrite costs are *abstract and optimistic*
• Performance is emergent, not architectural
• The most valuable knowledge is undocumented
• Software is treated like construction, not a living organism
Eventually the rewrite was quietly sidelined, and the "20-year-old legacy" system became authoritative again.
No postmortem. No announcement. Just silence.
I wrote a longer piece unpacking:
– how rewrite decisions are actually made
– the psychology behind rewrite zeal
– why even elite teams get this wrong
– and the *very few* strategies that sometimes work
👇 Full article here:
[link to dev.to article]
## Why I don't believe in rewriting software (Part 2)
"Fine. I'll make it right."
After I published *Why I don't believe in rewriting software*, several people replied with:
> "But I've seen rewrites that worked."
Same.
They exist.
They're just nothing like the rewrites people usually imagine.
I wrote a follow-up about **what "doing it right" actually looks like** - and it's far less glamorous.
One case: the *same* risk management system everyone wanted to kill.
No greenfield. No parallel platform.
Just one ugly system, slowly untangled.
• responsibilities isolated without deleting code
• real modules emerged with stable APIs
• old and new implementations coexisted
• discrepancies measured, not argued about
• bottlenecks isolated before being "cleaned"
• new tech introduced late, locally, carefully
No launch date.
But steady, measurable progress.
Another case: a **COBOL → Java rewrite** where failure wasn't an option.
That one "succeeded" - but only after:
• fixed-point math surprises
• batch vs request model mismatches
• implicit data layouts vs explicit objects
• multiple budget increases
• pushed deadlines
• and a lot of humility
It survived. That's the honest word.
The pattern is simple:
Successful rewrites respect reality longer than they respect aesthetics.
If the plan starts with:
> "We'll design it properly this time"
…be careful.
If it starts with:
> "We will not lose contact with production"
-you might have a chance.
👇 Full article here:
[link to dev.to article]
Curious how many of you have lived through a "successful" rewrite - and what that word really meant in practice.
