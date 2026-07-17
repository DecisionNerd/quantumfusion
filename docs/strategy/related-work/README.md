# Related work

This folder is the literature review for QuantumFusion. Rather than one monolithic document,
it keeps **one focused file per research theme** so findings accumulate independently, plus this
index which carries the **method, the positioning matrix, and the gap statement** that synthesize
them.

The review is organized around QuantumFusion's *claims* (see [`../../PRODUCT.md`](../../PRODUCT.md)
and [`../../REQUIREMENTS.md`](../../REQUIREMENTS.md)), not around keywords — nobody publishes our
exact combination, so novelty lives in the seams between established fields.

> Provenance: all entries were verified via live web search (July 2026); author, year, venue, and
> a primary link (arXiv / proceedings / DOI) were confirmed for every cited work, pre-2020
> classics included. Theme-file tables carry the confirmed citations. Flag anything that looks off.

## Themes

| Theme | File | Maps to our claim |
|---|---|---|
| Relations as operators, spectral & orthogonal structure | [`operators-spectral-orthogonality.md`](operators-spectral-orthogonality.md) | Relations as operators; eigenspace orthogonality |
| Quantum-inspired meaning & concept combination | [`quantum-inspired-meaning.md`](quantum-inspired-meaning.md) | Orthogonality as meaning; composite creation |
| Composite construction: complex queries & discovery | [`composite-and-discovery.md`](composite-and-discovery.md) | Composite entity knowledge creation |
| Multi-type / heterogeneous facts | [`multi-type-heterogeneous.md`](multi-type-heterogeneous.md) | Make heterogeneous facts comparable |
| Uncertainty in embeddings | [`uncertainty.md`](uncertainty.md) | Uncertainty → derived confidence |
| Temporal, spatial & extents | [`temporal-spatial-extents.md`](temporal-spatial-extents.md) | Constraints; points vs. extents |
| Efficiency & accumulation | [`efficiency-accumulation.md`](efficiency-accumulation.md) | Cheap accumulation; knowledge density |

## Method

- **Decompose by claim.** Each theme file reviews one claim's field and ends with "what's
  solved / what's missing / relation to QuantumFusion."
- **Snowball both directions.** From each anchor, walk references (ancestors) and citations
  (descendants) via Semantic Scholar / Connected Papers; arXiv for preprints.
- **Venues scanned:** NeurIPS, ICLR, ICML, ACL/EMNLP/LREC, AAAI, IJCAI, TheWebConf/WWW,
  ISWC/ESWC, SIGIR, TMLR, and the Quantum Interaction / QNLP community.
- **Log discipline:** every entry gets one line — what it does, which claim it covers, how we
  differ.

## Positioning matrix

Columns are QuantumFusion's claims; rows are representative work clusters (see theme files for
citations). ✓ = directly addresses, ~ = partial/adjacent, ✗ = not addressed.

| Work cluster | Ops+eigen (C1) | Eigenspace **orthogonality** as discovery (C2) | Composite **entity** creation (C3) | Multi-type decomposition (C4) | Uncertainty→confidence (C5) | Temporal+geo constraints (C6) | Cheap accumulation / density (C7) | Geometric explainability (C8) |
|---|---|---|---|---|---|---|---|---|
| Bilinear/rotational KGE (RESCAL, ComplEx, ANALOGY, RotatE, GoldE, OrthogonalE) | ✓ | ~ | ✗ | ✗ | ✗ | ✗ | ✗ | ~ |
| Quantum cognition / QNLP (Aerts–Gabora, Widdows, DisCoCat) | ~ | ✓ | ✓ (concepts) | ~ | ~ | ✗ | ✗ | ~ |
| Complex query answering (Query2Box, BetaE, PERM, GNN-QE, NGDB) | ✗ | ✗ | ~ (query sets, not new entities) | ~ | ~ | ~ | ~ | ~ |
| Literature-based discovery (Swanson, LBD-as-KGC) | ✗ | ✗ | ~ (new links, not entities) | ✗ | ~ | ✗ | ✗ | ~ |
| Literal-aware / multi-modal KGE (LiteralE, KBLRN, MMKG) | ~ | ✗ | ✗ | ~ (fused, not decomposed) | ✗ | ✗ | ✗ | ✗ |
| Uncertain / probabilistic KGE (KG2E, UKGE, GP-KGE, CAGP) | ✗ | ✗ | ✗ | ✗ | ✓ | ~ | ✗ | ~ |
| Temporal & spatial KGE (BoxTE, PTBox, Space2Vec, SE-KGE) | ~ | ✗ | ✗ | ~ | ~ | ✓ (siloed) | ✗ | ~ |
| Continual/incremental KGE (IncDE, FastKGE, DyGM) | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ~ (training cost) | ✗ |
| **QuantumFusion (target)** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ (unified) | ✓ | ✓ |

## Gap statement (working)

Each column is well-populated in isolation, and two clusters are strikingly close in *spirit*:

- **Quantum-cognition / QNLP** already models *concept combination* via tensor products and
  *orthogonal projections* in Hilbert space (Aerts–Gabora's pet-fish solution; Widdows' quantum
  logic; Coecke–Sadrzadeh–Clark's DisCoCat). This is essentially QuantumFusion's mechanism —
  but applied to human cognition and sentence meaning, **not** to structured, typed, constrained
  knowledge-graph facts at link-prediction scale.
- **Orthogonal-transform KGE** (RotatE → OTE → GoldE, OrthogonalE) uses orthogonality of the
  *relation transform* for expressiveness and relation patterns — but never as an
  eigenspace-**overlap** signal between a (composite) entity subspace and a relation's
  eigenspaces, and never to *create* composite entities.

What no single line of work does is **unify** them: treat eigenspace orthogonality as the one
mechanism that simultaneously (a) creates composite *entities* with derived facts, (b) makes
heterogeneous typed data comparable via per-type subspaces with a per-type decomposition,
(c) folds temporal and geospatial *constraints* and point-vs-extent geometry into the same
overlap query, (d) propagates *uncertainty* into a derived, calibrated confidence, and (e) does
so with cheap incremental accumulation and an explicit *knowledge-density* claim — all while
emitting a geometric *explanation* per discovered fact.

That synthesis is the candidate contribution. The matrix is the falsification tool: if any
column turns out to be fully covered *in combination* with the others by a work we missed, that
part of the claim collapses. Priority follow-up searches: (1) quantum-cognition applied to
knowledge graphs specifically; (2) any KGE using principal angles / subspace overlap as a score;
(3) "knowledge density" or derivable-vs-stored metrics.

## Novelty

The individual ingredients all exist; the **combination and the mechanism** do not. Stated as
falsifiable contributions, in priority order:

1. **Eigenspace-*overlap* as a discovery signal (C2).** Prior orthogonal-transform KGE (RotatE →
   OTE → GoldE, OrthogonalE) and ANALOGY put orthogonality *inside* the relation transform.
   QuantumFusion instead scores a fact by the **principal angles between a (composite) entity
   subspace and a relation operator's eigenspaces**. ANALOGY's normal/commuting constraint is the
   ancestor that hands us orthogonal eigenspaces "for free"; using the *overlap* between those
   eigenspaces and an entity subspace as the score is the new step.
2. **Composite *entities* as first-class objects (C3).** CLQA (Query2Box, BetaE, PERM) composes
   operators but returns *existing* answer entities; LBD (Swanson) creates *links*, not entities.
   QuantumFusion mints a **new entity** (a subspace with provenance) and derives the facts that
   hold about it — the "missing middle" between CLQA and LBD.
3. **Typed data as (near-)orthogonal subspaces with a per-type decomposition (C4).** Literal-aware
   KGE (LiteralE, KBLRN, MTKGNN) *fuses* types into one score. QuantumFusion keeps a per-type
   subspace so a similarity decomposes into "how alike numerically / temporally / textually," and
   cheap intra-type analysis still happens in each type's native metric.
4. **One overlap query for constraints *and* extents (C6).** Temporal and spatial KGE are siloed
   and treat point-vs-extent containment as awkward. QuantumFusion folds temporal span and
   geospatial area into the *same* shared space as context-subspaces, so "does this fact apply
   here-and-now?" is the same overlap operation as scoring.
5. **Uncertainty propagated through *fusion* into calibrated confidence (C5).** Probabilistic KGE
   propagates along paths/queries, not through a fusion operator that creates an entity.
6. **Knowledge density as an explicit metric (C7).** Continual KGE measures training-cost savings;
   nobody (found) measures *derivable ÷ stored facts* or benchmarks per-fact accumulation +
   multi-hop inference cost against a graph-traversal baseline.
7. **A geometric explanation per fact (C8).** Every score ships with the eigenspaces and angles
   that produced it — a byproduct of the mechanism, not a bolt-on.

The one-line framing: **operationalize quantum-cognitive concept combination (tensor products +
orthogonal projections) for typed, constrained knowledge-graph facts, using eigenspace-overlap as
the discovery signal, and pay for it with cheap incremental accumulation.**

## Green-field research areas

Where the literature is thin or silent — the highest-leverage, highest-risk places to plant a
flag:

- **Subspace-overlap scoring functions.** No established KGE scores facts by principal
  angles / projection overlap between an entity subspace and relation eigenspaces. The scoring
  function, its gradients, and its behavior vs. dot-product baselines are unexplored.
- **A fusion operator with a spectral rationale.** How to combine constituent subspaces (span vs.
  operator composition vs. tensor product) so the composite's derived facts are both accurate and
  *explainable* is open. Density matrices (from quantum cognition) are an attractive but untested
  unification of composite + uncertainty.
- **"Knowledge density."** The derivable-vs-stored ratio is, to our knowledge, undefined as a
  metric. Defining it rigorously and showing it *rises* with accumulation is green field.
- **Accumulation-vs-traversal cost law.** A head-to-head cost/scaling study (shared-space linear
  algebra vs. graph traversal) as graph size and hop depth grow does not exist in this framing.
- **Type-subspace geometry.** Whether per-type subspaces should be *enforced* orthogonal or
  *learned and merely measured* (via CCA-style alignment) is an open design question with no
  precedent in literal-aware KGE.
- **Unified temporal+geospatial+arbitrary constraints.** A single context-subspace overlap
  covering time spans, geo areas, *and* arbitrary predicates is unattempted.

## Known challenges (inherited from the related work)

Problems these fields have already hit that QuantumFusion will inherit — forewarnings, not
excuses:

- **Operator identifiability.** Many operator families fit the same triples; the spectral
  interpretation is only meaningful if the family is constrained (ANALOGY's normal/commuting
  condition; GoldE's Householder parameterization; OrthogonalE's Riemannian optimization).
- **Cost of eigendecomposition.** Per-relation spectral analysis is heavier than dot-product
  scoring — a real tension with the cost hypothesis (C7); bounds early work to small/medium graphs.
- **Uncertainty is relation/context-dependent.** The 2025 impossibility result (CAGP) shows
  entity-only variance ≈ random on novel contexts; uncertainty must condition on the relation, and
  calibration should be conformal and evaluated under distribution shift, not random corruption.
- **Data-typed literals are underserved and brittle.** Gesese et al. (2021) flag date/time as
  under-supported; the 2024 numeric-literals audit shows brittle handling (e.g. "0" read as
  missing). Encoders must be validated against each type's native geometry before fused comparison
  is trusted.
- **Containment/overlap is genuinely hard.** SE-KGE explicitly notes `isPartOf` is difficult to
  encode — the exact point-vs-extent operation we make central.
- **Catastrophic forgetting under accumulation.** Continual KGE (IncDE, DyGM) shows incremental
  updates drift; keeping quality while claiming cheap accumulation requires distillation / low-rank
  update discipline.
- **Composite ground truth is scarce.** Evaluating "facts about a new composite entity" needs
  datasets that barely exist; dataset construction is itself a research task.
- **"Deeper/denser knowledge" is under-defined.** Until *deep* (higher-order composites) and
  *dense* (derivable ÷ stored) are operationalized, the value claim is directional, not falsifiable
  (tracked in [`../../REQUIREMENTS.md`](../../REQUIREMENTS.md) open questions).
