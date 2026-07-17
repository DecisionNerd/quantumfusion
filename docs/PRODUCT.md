# Product

QuantumFusion is a research crate for knowledge discovery over fact triplets. It treats each
`(node, relation, node)` triplet as a first-class computational object, embeds entities and
relations into a shared vector space, and uses the eigenspace structure of relation operators —
and the orthogonality relationships between those eigenspaces — to surface latent knowledge.
Its distinctive bet is **composite entity knowledge creation**: synthesizing new, higher-order
entities from existing ones and inferring the facts that must hold about them. A critical companion
focus is **composite hygiene**: clustering existing composite nodes in the same shared space to
find *duplicates* (the same composite represented more than once) and *munged* composites (false
combinations that fused entities which don't belong together).

**Scope: this is the algorithm, not a data system.** QuantumFusion defines and validates the
*method* over triplet datasets. Wiring it into a live knowledge store — for continuous curation,
integration, and querying at scale — is envisioned as a separate follow-on library (e.g., a
GraphForge plugin) and is out of scope for this project.

> Status: early research. Much of this document states hypotheses to be tested, not proven
> results. Sections that encode unproven claims are flagged, and open questions are tracked in
> [`REQUIREMENTS.md`](REQUIREMENTS.md).

## Problem

Knowledge graphs store facts as triplets, but the dominant ways of computing over them —
graph traversal and knowledge-graph embeddings (TransE, DistMult, ComplEx, RotatE, RESCAL) —
are optimized for **link prediction between entities that already exist**. They answer "does
this edge belong?" well, but they are weak at a harder question: *what new entity emerges when
you combine several existing ones, and what is then true about it?*

Compositional knowledge — "the joint venture of A and B", "the alloy of these metals", "the
protein complex formed by these subunits" — is where much real insight lives, yet it is
underserved:

- Existing embeddings represent entities as isolated points, with no principled operator for
  *fusing* several entities into a new composite whose properties are derivable.
- Relation semantics are treated as black-box scoring functions rather than as linear
  operators with inspectable structure (eigenspaces, invariant subspaces, orthogonality).
- There is little tooling to *explain* a discovered fact in terms of the geometry that
  produced it.
- And once composites *are* created (or accumulated over time), there is no principled way to keep
  them clean — to spot **duplicates** (two subspaces that are really the same composite) and
  **munged** composites (a fusion that combined entities which don't belong together) before they
  pollute the knowledge.

And beneath all of that sits a **data-type problem**. Every data point in a fact carries a
type — scalar, categorical, ordinal, temporal, geospatial, text, boolean, embedding. Within a
single type the analysis is easy: there is a native metric, so clustering and outlier detection
are well-posed (numbers cluster in ℝ, categories by co-occurrence, dates by time distance, text
by cosine). The hard part is **comparing multi-data-type facts** — facts carrying several data
points of different types — because there is no common metric across types. Without a shared
representation, "is fact A like fact B?" is ill-defined the moment the facts are heterogeneous,
and composite entities (which almost always fuse data of *different* types) are exactly the
heterogeneous case.

Now is a reasonable time to explore this: mature linear-algebra tooling exists in Rust, and
the KG-embedding literature has made relation-as-operator representations (especially
orthogonal/unitary operators) standard, which is exactly the substrate an eigenspace theory
needs.

## Audience

- **Knowledge-graph / ML researchers** — need a fast, inspectable substrate to test whether
  eigenspace orthogonality predicts and explains composite-entity facts.
- **The maintainer (research author)** — needs a Rust library plus a research sandbox
  (experiments, notebooks, reproducible runs) to iterate on the core theory.
- **Downstream engineers (later, secondary)** — would consume a stable crate API to run these
  algorithms over their own triplet datasets.
- **Coding agents** — operate on this repo and need the theory, domain language, and
  invariants documented so they can extend algorithms without re-deriving the math.

## Vision

If this succeeds, "fusing" entities becomes a first-class operation over knowledge graphs:
given a set of entities you can compute a composite entity, read off the facts that hold about
it with a confidence grounded in eigenspace geometry, and get a geometric *explanation* for
each inferred fact. You can also point the same machinery *back at the composites themselves* —
clustering them to catch duplicates and false ("munged") composites before they pollute the graph.
Just as importantly, **accumulating facts gets cheaper as the graph grows**:
because everything — entities, relationships and their constraints, places, times, and their
uncertainty — lives in one shared vector space, adding knowledge is an incremental
vector/operator update and inference is linear algebra rather than combinatorial graph search.
QuantumFusion is the reference crate and research record for that idea — the place where the
eigenspace-orthogonality theory of compositional knowledge is defined, tested, and either
validated or falsified, on both **accuracy** and **cost**.

## Goals

- **Model triplets as objects.** Provide a clean Rust representation of entities, relations,
  and `(node, rel, node)` triplets that algorithms operate on directly, where data points carry
  their type.
- **Make heterogeneous facts comparable.** Map typed data points into a shared space via
  per-type encoders so multi-data-type facts can be compared holistically and decomposed per
  type — while keeping cheap intra-type analysis (clustering, outliers) in each type's native
  space.
- **Model the full richness of facts.** Represent entity properties, relationships with
  properties and constraints (temporal / geospatial / arbitrary), places as points *and* areas,
  times as instants *and* spans, and **uncertainty** on any measurement — with uncertainty
  propagating through fusion and scoring.
- **Accumulate knowledge cheaply.** Test whether the shared vector space makes fact accumulation
  into deeper, denser knowledge lower-cost and faster than graph-combinatorial and KG-embedding
  baselines, especially as graph size and inference depth grow.
- **Represent relations as operators.** Learn/derive relation operators whose eigenspaces are
  computable and inspectable.
- **Define composite fusion.** Give a precise, reproducible operation that fuses a set of
  entities into a composite entity in the same space.
- **Cluster and validate composites (composite hygiene).** Cluster existing composite nodes in the
  shared space to detect *duplicates* (near-identical subspaces) and *munged* composites
  (incoherent or implausible fusions), with a geometric rationale for each flag.
- **Test the orthogonality hypothesis.** Empirically measure whether eigenspace orthogonality
  predicts which facts hold about composite entities better than a strong KG-embedding
  baseline.
- **Explain, don't just score.** Every discovered/created fact should carry a geometric
  rationale (which eigenspaces, what orthogonality) a human can inspect.

## Quality stance

- **Hypothesis-driven.** Each claim about the theory is written as a testable hypothesis with
  a baseline to beat; results are recorded as ADRs or experience artifacts, not folklore.
- **Reproducible experiments.** Sandbox runs are deterministic given a seed and a dataset, and
  scripted so a result can be regenerated.
- **Behavior + numerics tested.** Unit tests for the linear-algebra core (against known-good
  decompositions), plus evaluation runs scored against baselines. See
  [`engineering/TESTING.md`](engineering/TESTING.md).
- **Decisions recorded.** Significant modeling choices (operator family, fusion operator,
  scoring function) get an ADR in [`engineering/adrs/`](engineering/adrs/).

## Non-goals

- **Not a data-system integration.** This project is the *algorithm and research record*. Running
  it inside a live knowledge store — for continuous curation, integration, and querying at scale —
  is a separate **follow-on library** (e.g., a GraphForge plugin), not part of this repo.
- **Not a production graph database.** It computes over triplets; it does not aim to be the
  system of record or a query engine at scale.
- **Not a general KG-embedding library.** Existing baselines are used for comparison, not
  reimplemented as a product surface.
- **Not (yet) an LLM/NLP pipeline.** Triplet *extraction* from text is out of scope; the crate
  starts from triplets that already exist.
- **Not a UI product.** The interface is a Rust API plus research tooling, not an application.

## Success Metrics

- **Composite-fact accuracy.** On held-out facts about composite entities, prediction quality
  (e.g. MRR / Hits@k) exceeds a strong KG-embedding baseline by a target margin. _(Target TBD —
  see open questions.)_
- **Composite hygiene.** On a set seeded with known duplicate and munged composites, clustering
  flags them with precision/recall above a target, each with a geometric rationale a human can
  check. _(Target TBD — see open questions.)_
- **Orthogonality signal.** A measurable correlation between eigenspace orthogonality and
  fact validity, strong enough to be predictive rather than incidental.
- **Explanation fidelity.** A human reviewer can, from the geometric rationale alone, agree
  with or refute a created fact in the majority of sampled cases.
- **Accumulation cost.** Time and compute per accumulated fact stay flat or grow sub-linearly
  as the graph grows, and beat a graph-traversal baseline on multi-hop / compositional inference.
  _(Baseline and target TBD — see open questions.)_
- **Knowledge density.** The ratio of derivable facts to stored facts increases as facts
  accumulate — the representation implies more than it stores. _(Definition to firm up.)_
- **Uncertainty calibration.** Confidence attached to discovered facts is calibrated (predicted
  confidence matches observed correctness).
- **Reproducibility.** Any headline result regenerates from a single scripted command + seed.

## Stakeholders

- **Owner / researcher** — David Spencer — defines the theory, runs experiments, owns the crate.
- **Consumers (future)** — researchers and engineers who would adopt the crate once validated.
