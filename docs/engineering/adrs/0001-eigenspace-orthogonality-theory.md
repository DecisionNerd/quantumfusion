# ADR-0001: Adopt the eigenspace-orthogonality theory as the core mechanism

- **Status:** Proposed
- **Date:** 2026-07-15

## Context

QuantumFusion needs a mechanism for discovering knowledge over fact triplets, with a specific
emphasis on *composite entity knowledge creation* — synthesizing new higher-order entities from
existing ones and inferring the facts that hold about them (see [`../../PRODUCT.md`](../../PRODUCT.md)).

The established options from the knowledge-graph embedding literature treat relations as scoring
functions and entities as points:

- **Translational** (TransE and variants): `t ≈ h + r`. Simple, but weak on symmetric/composed
  relations and offers no natural notion of a composite entity's *subspace*.
- **Bilinear / factorization** (RESCAL, DistMult, ComplEx): score `hᵀ M_r t`; RESCAL already
  represents each relation as a matrix `M_r`, which has a spectrum.
- **Rotational / unitary** (RotatE, and orthogonal-operator models): relations act as
  rotations, i.e. orthogonal/unitary operators with clean, stable spectra.

None of these were designed to answer "combine these entities into a new one and tell me — with
an explanation — what is true about it." We want a mechanism where (a) relations are *operators*
with inspectable eigenspaces, (b) entities and composites live as vectors/subspaces in the same
space, and (c) the validity of a fact is tied to a geometric, explainable quantity.

## Decision

Adopt an **eigenspace-orthogonality** formulation as the core mechanism:

1. Represent each relation as a linear **operator** `M_r` on the entity space (bilinear/RESCAL-
   style or a constrained orthogonal/unitary family — the exact family is a separate pending ADR).
2. Analyze each operator by its **spectral decomposition**, yielding eigenspaces `E_λ`.
3. Represent a **composite entity** as the subspace spanned by (a combination of) its
   constituent entity vectors.
4. Score a candidate fact about an entity or composite via the **orthogonality relationship**
   (principal angles / projection overlap) between the relevant subspace and the relation's
   eigenspaces.
5. Emit an **explanation** for every score: which eigenspaces and angles produced it.

The central, falsifiable hypothesis: *eigenspace orthogonality between a (composite) entity's
subspace and a relation's eigenspaces predicts whether the corresponding fact holds, and does so
better than a strong KG-embedding baseline on composite facts.*

## Consequences

**Positive**

- Relations become inspectable operators, not black-box scores — enabling the explanation
  requirement (FR-8).
- Composite entities get a natural representation (subspaces), directly serving the headline
  goal.
- The approach is measurable and falsifiable against baselines (FR-9), keeping the research
  honest.

**Negative / risks**

- The hypothesis may be false; the design must make a negative result cheap to reach and record.
- Eigendecomposition per relation is computationally heavier than dot-product scoring, bounding
  early work to small/medium graphs (NFR-4).
- Requires a linear-algebra backend with reliable eigendecomposition (separate pending ADR).
- The spectral interpretation is only meaningful if the operator family is constrained enough to
  be identifiable (separate pending ADR).

**Follow-up decisions (to be their own ADRs)**

- Linear-algebra backend selection.
- Relation operator family (real matrix vs. orthogonal/rotation vs. complex/unitary).
- Precise definition of the fusion operator.
