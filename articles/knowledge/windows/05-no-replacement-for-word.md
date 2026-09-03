### ONLY MS CAN REPLACE WORD

1. I think in Word's case MS don't even need "dirty tricks" for lock-in in the classic sense. Office OpenXML data format is more than enough.

Formally the format is "open", but in practice it's huge, underdocumented, versioned, and full of historical baggage

I can't say this is technically trivial to implement all real-world edge cases either. A non-exhaustive list of it may include

- VBA macros (full interpreter, OLE/COM compatible interfaces, interaction with document state)
- ODBC external data connections to the document
- Fields and dynamic content (TOC, refs to other documents, mail merge)
- Embedded OLE objects (charts, slides, Excel sheets inside Word)
- Custom(ized) styles, numberings, layouts
- Add-ins both for classic Office (C++) and 365 (JS)

Not about Word, but I once attempted migrating a single tricky Excel datasheet to LibreOffice - the whole effort collapsed on incompatible data adapters alone. And that was Excel, not Word with its formatting and macro soup.

Without comprehensive coverage of the data format, with real examples, edge cases, version compatibility re-implementing all of Word is an enormous undertaking - and Microsoft has very little interest to provide that level of clarity.

2. I don't know if you remember, in the early 2000s there was great BSD system OpenDarwin.

Formally, it was open. The source was available. BSD opensource license.
In practice, community support collapsed for very similar reasons

- Key components were developed by Apple behind closed doors and never documented
- The community never knew what was coming or why decisions were made
- External contributions had little real influence on direction or architecture

In short, critical knowledge lived exclusively inside the company.

And that leads to the uncomfortable but realistic conclusion: corporations have very little interest to loosen their grip on platforms that define their power.
