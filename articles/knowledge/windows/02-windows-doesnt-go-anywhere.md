### WHY WINDOWS DOES NOT GO ANYWHERE

1. Consumer market (99% of users)
Non-technical users buy a cheap laptop and run the stock OS. That is usually Windows 11 out of the box, that spy with its telemetry everywhere, show ads in an OS they already paid for, and steadily growing hardware requirements

They don't choose this - it's simply what comes preinstalled. Consumers don't optimize systems, they consume defaults.

2. Enterprise market (the real "golden cow" of Nadella)

Windows isn't going anywhere, because

- contracts are signed for 10 years ahead
- decision-makers aren't daily users (they use Mac 😁)
- enterprises already paid and will continue to do so

And the saddest part that Microsoft doesn't even need to care much about UX and usability in such a picture of the world.

At least enterprises have DevOps teams who know how to strip spyware, harden images, and clean Windows before deploying it.

Different markets. Different rules. End of story.

---

Calling Windows "dead" because Linux dominates cloud infrastructure is like calling trucks dead because cargo ships move more freight. Different platforms solve different business problems.

Windows controls roughly 60%+ of the desktop market and still holds 10%+ of the server market. That's very far from "dead"

The main reason Windows remains dominant isn't the absence of alternatives. Enterprise IT decisions are driven by business risk and total cost of ownership, not by whether a Linux equivalent exists.

When companies choose a platform, they evaluate:

- Existing software investments and licenses
- Employee training and retraining costs
- Availability of qualified staff
- Vendor support and SLAs
- Compliance and regulatory requirements
- Identity management (Active Directory / Entra ID)
- Migration risk and downtime costs
- Long-term support guarantees

A Linux alternative may be technically excellent, yet still lose economically once migration, integration, validation, and operational risks are included.

Linux unquestionably dominates hyperscale cloud infrastructure. But Windows remains deeply embedded in enterprise desktops, corporate networks, healthcare, finance, and countless line-of-business applications.
---
I think you mix engineering with personal OS preference.

As of the end of 2025, Windows still holds ~61% of the desktop market and ~11% of the server. More importantly, enterprise Windows deployments are driven by business decisions, not technical fashion. Replacing Active Directory, Microsoft 365, endpoint management, security policies, legacy applications, user training, and vendor support costs far more than any OS license.

That's why, for enterprise desktop software, Windows remains the only target. For consumer software, macOS is added. Linux is added when the product itself targets developers or infrastructure.

Corporate networks, finance, healthcare, manufacturing, government, countless businesses are deeply integrated with Windows. Engineers build for customers, not for their favorite OS.

And software quality has very little to do with the kernel. A well-architected service can be reliable on Windows or Linux; a poorly designed one will fail on either. Pragmatic engineers choose the platform that best fits the customer's ecosystem and requirements, not his personal views.

---

People have been predicting "the end of Windows" for over 30 years, yet it still dominates enterprise desktops. That's because platform adoption is primarily a business decision, not a technical one.

Take healthcare, for example. I'm currently working on a medical hardware/software complex that is certified only for Windows. Replacing the OS isn't just recompiling the code - it's recertifying the entire product, repeating validation, satisfying regulators, retraining staff, and dealing with software that may have evolved over 30 years. The legal and financial costs are enormous.

The same applies across finance, manufacturing, government, and business automation. There are countless systems with no business case for migration, even if another platform is technically excellent.

And most importantly, there are no serious plans inside these organizations to replace Windows. Stability, support contracts, compliance, existing infrastructure, and total cost of ownership outweigh your ideological preferences.

---

In every large enterprise I worked for, the IT department was very much on the users' side.

Corporate Windows images were heavily customized: crapware removed, unneeded services disabled, telemetry turned off (often as a compliance requirement), and updates controlled through Group Policy, WSUS, or PowerShell. Keeping Microsoft from re-enabling unwanted features is a solved problem if your administrators know the platform well.

So yes, users should absolutely be vocal about problems - I certainly have reported my share of Windows bugs to Microsoft over the years. Note that I well could've ranted about them on social media, and then they had not been fixed. 

Concluding, good enterprise IT doesn't just accept the defaults; it actively shapes the environment to make users' lives easier.

A small pro tip: I do almost all my Windows work remotely over SSH (and only occasionally RDP). My happiness increased by at least 37% 😄

---

No, that is not "spreading too thin." It is called business diversification and risk management.

If your cloud customers want Linux workloads, you support Linux. If they want Kubernetes, you support Kubernetes. If they want databases, you support them too. Otherwise they go to AWS, GCP, or another provider that does.

Microsoft's core business now is enterprise platforms, cloud, developer tools, security, and AI. Supporting Linux in Azure is not a distraction from that strategy - it is part of the strategy.

Ignoring where the market is going because it does not match your old product identity would be bad business.
