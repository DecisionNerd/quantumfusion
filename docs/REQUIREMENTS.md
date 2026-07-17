# Requirements

This contract covers the first research-grade version of the `quantumfusion` crate: the core
triplet representation (with typed data points, extents, uncertainty, and relationship
properties/constraints), relation-as-operator embedding with spectral analysis, per-type
encoding into a shared space, an entity-fusion operation, orthogonality-based knowledge
discovery for composite entities, **composite hygiene** (clustering composites to flag duplicates
and munged composites), incremental fact accumulation, and a reproducible evaluation harness that
tests both the **accuracy** and **cost** hypotheses against baselines. It serves the product goals
in [`PRODUCT.md`](PRODUCT.md): model triplets as objects, make heterogeneous facts comparable,
model the full richness of facts, represent relations as operators, define fusion, cluster and
validate composites, accumulate knowledge cheaply, test the hypotheses, and explain results.

Scope is the **algorithm**, not a data-system integration; using it inside a live knowledge store
is a follow-on library (see Constraints).

> Research contract: some requirements are about *being able to test a hypothesis*, not about
> the hypothesis being true. Two hypotheses are in play — an **accuracy** hypothesis
> (orthogonality predicts composite facts) and a **cost** hypothesis (shared-space accumulation
> is cheaper than graph-combinatorial approaches). Targets marked TBD are tracked under Open
> questions.

## Functional requirements

| ID | Requirement | Derived from | Acceptance behavior |
|---|---|---|---|
| FR-1 | The system shall represent a fact as a `(head, relation, tail)` triplet and store a collection as a queryable graph | Goal: model triplets as objects | Given a set of triplets, When loaded, Then each is retrievable by head, relation, or tail without loss |
| FR-2 | The system shall load a triplet dataset from disk and report basic statistics (entity, relation, triplet counts) | Sandbox scope | Given a dataset file, When loaded, Then counts are reported and malformed rows are rejected with a clear error |
| FR-3 | The system shall represent each entity as a vector and each relation as an operator in a shared space, and persist/reload learned parameters | Goal: represent relations as operators | Given a trained space, When saved and reloaded, Then scores are identical within numerical tolerance |
| FR-4 | The system shall compute the spectral decomposition (eigenvalues and eigenspaces) of a relation operator | Goal: eigenspace structure | Given a relation operator, When decomposed, Then reconstruction error is within tolerance and eigenspaces are retrievable |
| FR-5 | The system shall measure orthogonality between two subspaces (e.g. principal angles) | Goal: test orthogonality hypothesis | Given two subspaces, When compared, Then it returns a score that is 0 for identical and maximal for orthogonal subspaces |
| FR-6 | The system shall fuse a set of two or more entities into a composite entity with provenance to its constituents | Goal: define fusion | Given entities A and B, When fused, Then a composite entity is produced whose constituents are recoverable |
| FR-7 | The system shall rank candidate facts about a composite entity using orthogonality between the composite's subspace and relation eigenspaces | Goal: composite knowledge creation | Given a composite entity, When discovery runs, Then candidate `(composite, rel, tail)` facts are returned ranked by score |
| FR-8 | The system shall attach a geometric explanation (eigenspaces + orthogonality measures) to each discovered fact | Goal: explain, don't just score | Given a discovered fact, When inspected, Then it exposes the eigenspaces and angles that produced its score |
| FR-9 | The system shall evaluate discovery against a KG-embedding baseline with standard metrics (MRR, Hits@k) over a held-out split | Goal: test the hypothesis | Given a train/test split, When evaluated, Then metrics for the method and the baseline are reported side by side |
| FR-10 | The system shall make any headline result reproducible from a single command plus a seed and config | Quality stance: reproducibility | Given the same seed, dataset, and config, When rerun, Then metrics match within tolerance |
| FR-11 | The system shall represent data points with an explicit data type and provide intra-type analysis (clustering, outlier detection) in each type's native space | Goal: make heterogeneous facts comparable | Given a set of single-type data points, When analyzed, Then clusters/outliers are returned using that type's native metric |
| FR-12 | The system shall encode a typed data point into the shared space via a per-type encoder | Goal: make heterogeneous facts comparable | Given a typed value, When encoded, Then it maps to a vector/subspace in the shared space, and near native-neighbors remain near after encoding (within tolerance) |
| FR-13 | The system shall compare two multi-data-type facts, returning a holistic similarity and a per-type decomposition | Goal: make heterogeneous facts comparable | Given two facts with data points of differing types, When compared, Then an overall score and per-type contributions are returned |
| FR-14 | The system shall represent data points as either points or extents (temporal spans, geospatial areas) and compare them by containment/overlap | Goal: model the full richness of facts | Given an instant and a span (or a point and an area), When compared, Then containment/overlap is returned rather than an equality mismatch |
| FR-15 | The system shall attach optional uncertainty to any data point and propagate it through encoding, fusion, and scoring into a derived confidence | Goal: model the full richness of facts | Given uncertain inputs, When a fact is discovered, Then its confidence reflects the input uncertainty |
| FR-16 | The system shall represent relationships with their own properties and constraints (temporal, geospatial, arbitrary) and evaluate whether a fact applies in a given context | Goal: model the full richness of facts | Given a constrained fact and a query context (time/place), When evaluated, Then the fact is applicable only where the constraint overlaps the context |
| FR-17 | The system shall accumulate a new fact incrementally (without a full retrain) and record the cost of the update | Goal: accumulate knowledge cheaply | Given a trained space and a new fact, When accumulated, Then the space updates and per-fact update cost (time/compute) is recorded |
| FR-18 | The system shall report cost/scaling metrics (per-fact accumulation cost, per-inference cost, knowledge density) against a graph-traversal baseline as the graph grows | Goal: accumulate knowledge cheaply | Given a growing fact stream, When evaluated, Then method vs. baseline cost curves and density are reported |
| FR-19 | The system shall cluster existing composite entities in the shared space and flag likely **duplicates** (near-identical subspaces) and likely **munged** composites (incoherent/implausible fusions), each with a geometric rationale | Goal: cluster and validate composites | Given a set of composites, When hygiene runs, Then suspected duplicates and munged composites are returned ranked, each with the angles/eigenspaces that justify the flag |

## Non-functional requirements

| ID | Quality attribute | Target / constraint | Why it matters |
|---|---|---|---|
| NFR-1 | Numerical correctness | Spectral decomposition and orthogonality match a reference (e.g. NumPy/known-good) within a documented tolerance | The entire theory rests on the linear-algebra core being right |
| NFR-2 | Reproducibility | Deterministic given seed + config; run artifacts record the config used | Research results must be regenerable and trustworthy |
| NFR-3 | Portability | Builds and runs on macOS and Linux via `cargo` with no proprietary dependency | Solo/OSS research workflow |
| NFR-4 | Performance | Handles small–medium graphs (target scale TBD) within a practical single-run time budget | Enables fast iteration; scale is explicitly not a v1 goal |
| NFR-5 | Inspectability | Core intermediate objects (operators, eigenspaces, composites, explanations) are printable/serializable | Debugging and explanation depend on seeing the geometry |
| NFR-6 | API clarity | Public crate API is documented with `cargo doc`; domain terms match [`ARCHITECTURE.md`](engineering/ARCHITECTURE.md) | Future consumers and coding agents extend it safely |
| NFR-7 | Accumulation cost | Per-fact accumulation and inference cost grow flat or sub-linearly with graph size, and beat a graph-traversal baseline on multi-hop inference (target TBD) | This is the cost hypothesis — the core value claim beyond accuracy |
| NFR-8 | Uncertainty calibration | Predicted confidence matches observed correctness within a documented calibration error | Uncertain data is pervasive; miscalibrated confidence is misleading |

## Behavior trace

| Requirement | Given | When | Then |
|---|---|---|---|
| FR-6, FR-7 | A trained space and two entities A, B | The two are fused and discovery runs | A composite entity and a ranked list of candidate facts about it are returned |
| FR-8 | A discovered composite fact | It is inspected | The eigenspaces and orthogonality measures behind its score are available |
| FR-9 | A dataset with held-out composite facts | Evaluation runs | Method vs. baseline metrics are reported, testing the orthogonality hypothesis |
| FR-11, FR-13 | Facts carrying data points of different types | They are compared | An overall similarity plus a per-type breakdown is returned |
| FR-16 | A fact constrained to a time span and area | Queried at a time/place | It is reported applicable only where the constraint overlaps the query context |
| FR-17, FR-18 | A growing stream of facts | Accumulated one by one | Per-fact cost is recorded and stays flat/sub-linear vs. a graph baseline |
| FR-19 | A set of composites seeded with known duplicates and munged composites | Hygiene clustering runs | Duplicates and munged composites are flagged and ranked, each with a geometric rationale |

## Constraints & assumptions

- **Constraint:** Scope is the *algorithm*, not a data-system integration. Embedding it in a live
  knowledge store (continuous curation / integration / query at scale) is a follow-on library
  (e.g., a GraphForge plugin) and out of scope for this contract.
- **Constraint:** Implementation is a Rust crate (`edition = 2024`), built with `cargo`. A Python
  binding may be added later for ML-ecosystem interop, but it is out of scope for v1.
- **Constraint:** Input is triplets that already exist; extraction from text is out of scope.
- **Assumption:** Relations can be usefully represented as linear operators on a fixed-dimension
  entity space.
- **Assumption:** Composite-entity meaning can be captured by a subspace/operator combination of
  constituent entities.
- **Assumption:** Each data type admits a per-type encoder into the shared space that preserves
  enough of its native geometry for cross-type comparison to be meaningful.
- **Assumption:** Temporal and geospatial constraints can be represented as context-subspaces so
  applicability is an overlap query (arbitrary predicates may need an explicit gate).
- **Assumption:** Facts can be accumulated incrementally without a full retrain and without
  unacceptable quality drift.
- **Assumption:** Uncertainty can be propagated with a tractable approximation (e.g. Gaussian)
  that stays well-calibrated enough to be useful.
- **Assumption:** Datasets with (or admitting) ground-truth composite facts are available for
  evaluation.

## Dependencies

- **Linear-algebra backend** (candidate: `nalgebra`, `ndarray` + `ndarray-linalg`, or `faer`) —
  provides eigendecomposition; choice is a pending ADR.
- **Triplet dataset(s)** — public KG benchmarks (e.g. FB15k-237, WN18RR) or a purpose-built set
  with composite facts.
- **A baseline embedding** — for accuracy comparison in evaluation (may be reimplemented
  minimally or imported).
- **A graph-traversal baseline** — for the cost/scaling comparison (e.g. an in-memory graph or
  graph DB) to measure accumulation and multi-hop inference cost against.

## Open questions

- What is the target margin over baseline that counts as "the theory works"? — owner: researcher
- Which operator family (real matrix, orthogonal/rotation, complex/unitary) best exposes usable
  eigenspaces? — owner: researcher (→ ADR)
- What is the precise definition of the fusion operator? — owner: researcher (→ ADR)
- What geometrically distinguishes a *duplicate* from a *munged* composite, and what
  precision/recall target counts as success for composite hygiene (FR-19)? — owner: researcher
- Should per-type subspaces be *enforced* orthogonal, or should encoders learn placement with
  orthogonality merely *measured*? — owner: researcher (→ ADR)
- Which set of data types must v1 support, and what is the native metric + encoder for each?
  (Known so far: entity names/properties, relationship properties, temporal point/span,
  geospatial point/area, plus uncertainty on any of them.) — owner: researcher
- How exactly are "deeper knowledge" and "denser knowledge" defined and measured? Working
  definitions: *deeper* = higher-order composites / multi-hop inferences; *denser* = ratio of
  derivable to stored facts. Confirm or refine. — owner: researcher
- What is the cost baseline and target for the accumulation hypothesis (NFR-7)? Which
  graph-traversal engine and which workloads? — owner: researcher
- How is uncertainty represented and propagated (Gaussian vs. sampling vs. fuzzy)? — owner: researcher (→ ADR)
- How are constraints evaluated — context-subspace overlap vs. explicit gate, and which
  constraint kinds get which treatment? — owner: researcher (→ ADR)
- Which dataset provides credible ground-truth *composite* facts for evaluation? — owner: researcher
- What target graph scale must a single run handle for v1 (NFR-4)? — owner: researcher
