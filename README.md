# QuantumFusion

QuantumFusion is an early-stage research project for **unsupervised knowledge discovery over
facts** — assertions that can span multiple data types — within a single, unified vector space. A
fact is a `(head, relation, tail)` triplet whose data points each carry a type: numerical,
categorical, textual, temporal, geospatial, or relational. By representing these heterogeneous,
typed facts as vectors and subspaces, QuantumFusion surfaces patterns, similarities, and groupings
among them **without labeled data** — and goes one step further: it **fuses facts into higher-order
composite entities** and infers what must be true about them.

Putting everything — entities, relations, constraints, places, times, and their uncertainty — in
one shared space is what makes heterogeneous knowledge comparable and integrable, and is meant to
make accumulating facts into **deeper, denser knowledge** cheaper as the graph grows. Relations are
treated as linear operators; discovery is scored by the **orthogonality between a fact's (or
composite's) subspace and a relation operator's eigenspaces**, and every result carries a geometric
explanation.

A critical companion focus is **composite hygiene**: pointing the same clustering machinery *back
at the composites themselves* to catch **duplicates** (the same composite represented more than
once) and **"munged" composites** (false combinations that fused entities which don't belong
together) — before they pollute the knowledge.

> **Scope: this is the algorithm, not a data system.** QuantumFusion defines and validates the
> method over triplet datasets. Wiring it into a live knowledge store — for continuous curation,
> integration, and querying at scale — is envisioned as a separate follow-on library (e.g., a
> GraphForge plugin) and is out of scope here.

> Early-stage research. The core mechanism is a falsifiable hypothesis being tested against
> baselines, not a proven result. The name evokes **fusing individual _quanta_ of knowledge in a
> shared space** — the method is linear algebra, not quantum computing.

## ✨ What it aims to do

- 🔄 **Multi-data-type facts, one space** — make numerical, categorical, textual, temporal,
  geospatial, and relational data points directly comparable, with a per-type breakdown of *why*
  two facts are alike.
- 🎯 **Unsupervised discovery** — learn the space and surface patterns, groupings, and candidate
  facts without labeled data.
- 🔗 **Unified vector space** — represent entities, relations (as operators), constraints, places,
  times, and uncertainty together.
- 🧬 **Composite entity creation** *(headline)* — fuse facts and entities into higher-order
  composites and derive the facts that hold about them.
- 🧹 **Composite hygiene** *(critical sub-focus)* — cluster existing composite nodes to flag
  duplicates and false ("munged") composites, each with a geometric rationale.
- 🧭 **Explainable by construction** — every score exposes the eigenspaces and angles that produced
  it.
- 📊 **Knowledge discovery** — turn scattered, heterogeneous facts into deeper, denser knowledge.
  *(Integration/curation inside a real data store is a follow-on library, not this project.)*

## The idea in brief

- **Triplets as objects.** A fact is `(head, relation, tail)` whose data points carry their type; a
  knowledge graph is a collection of them to compute over.
- **Relations as operators.** Each relation `r` is a linear operator `M_r`; its eigenspaces are the
  primitive the theory reasons about.
- **Composite entities as subspaces.** Fusing entities produces a composite whose meaning is a
  subspace of the shared space.
- **Discovery via orthogonality.** A candidate fact about a (composite) entity is scored by the
  orthogonality between its subspace and a relation's eigenspaces — and every score carries a
  geometric explanation.

## Status

Design and research-record stage. The full product, requirements, architecture, and a verified
**literature review** are written; implementation of the core modules has not started yet.
QuantumFusion is a **Rust** crate (the repository scaffolds one); a **Python binding** may follow
later for interop with the ML ecosystem, but Rust is the primary implementation.

## Documentation

The living design record lives in [`docs/`](docs/):

- [Product](docs/PRODUCT.md) — what this is and why it exists.
- [Requirements](docs/REQUIREMENTS.md) — what v1 must demonstrably do.
- [Architecture](docs/engineering/ARCHITECTURE.md) — components, data model, and key flows.
- [Design](docs/DESIGN.md) — API/notation conventions.
- [ADR-0001](docs/engineering/adrs/0001-eigenspace-orthogonality-theory.md) — the core theory decision.
- [Related work](docs/strategy/related-work/) — the literature review, positioning matrix,
  novelty, green-field areas, and known challenges.

## License

See repository history; a license file is not yet included.
