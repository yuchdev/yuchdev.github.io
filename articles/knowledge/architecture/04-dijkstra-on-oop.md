### DIJKSTRA AND HIS VISION OF OOP

Dijkstra, by the way, envisioned OOP very differently from how it's was practiced over the course of history. His idea was much closer to message passing signal-slot style interaction, not deep inheritance trees.

Ironically, that vision is rarely implemented, but still it did and pretty faithfully, in Qt signal-slot system. Objects communicate via well-defined events, slots subscribe to multiple signals as generalized Observer pattern, objects stay loosely coupled. So Qt is arguably one of the closest reference implementations of OOP as the Creator himself originally imagined it 😄
