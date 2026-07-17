# Efficiency & accumulation

**QuantumFusion claim covered:** the shared vector space makes fact accumulation into deeper,
denser knowledge cheaper and faster than graph-combinatorial approaches; knowledge density
increases as facts accumulate (C7, NFR-7).

This is the **least directly addressed** claim. The closest field, **continual / incremental KGE
(CKGE)**, optimizes the cost of *learning* new facts without forgetting — but frames the win as
training-time and parameter savings, not as a general accumulation-vs-traversal cost law, and
nobody (found) measures **knowledge density** (derivable ÷ stored facts).

## Key works

| Work | Year | What it does | Relevance |
|---|---|---|---|
| [IncDE (Liu et al., AAAI)](https://ojs.aaai.org/index.php/AAAI/article/view/28722) | 2024 | Continual KGE via **incremental distillation**; hierarchical triple ordering; two-stage training to prevent forgetting | Incremental accumulation with quality preservation |
| [FastKGE / IncLoRA (IJCAI)](https://www.ijcai.org/proceedings/2024/243) · [arXiv](https://arxiv.org/html/2407.05705) | 2024 | Incremental **low-rank adapters** with adaptive rank; **34–49% less training time**, competitive MRR | Efficient incremental updates |
| [DyGM — Dynamic Global Memory](https://doi.org/10.1145/3773966.3777936) | 2025 | Lifelong KGE under **non-stationary growth**; connectivity-aware ordering, replay + distillation, dynamic weighting | Realistic growing-graph setting |
| CMKGE (Continual Mask KGE) | 2024–25 | Masking-based continual embedding | Alternative CKGE strategy |
| [NGDB — Neural Graph Databases](https://arxiv.org/pdf/2303.14617) (see [composite doc](composite-and-discovery.md)) | 2024 | KG as neural storage + engine; **vector retrieval instead of traversal**, robust to incompleteness | Conceptual ally for "inference as linear algebra, not graph search" |

Supporting evidence for the cost intuition: the vector-database / approximate-nearest-neighbor
literature (sub-linear retrieval at scale) underpins the claim that shared-space inference can
beat traversal as graphs grow.

## What's solved

- **Incremental learning** of new facts while mitigating catastrophic forgetting (IncDE, DyGM).
- **Measured training-cost reductions** from incremental low-rank updates (FastKGE: 34–49%).
- Handling **non-stationary, growing** graphs (DyGM).
- A conceptual framing (NGDB) where retrieval is vector math over neural storage rather than
  index traversal, robust to missing edges.

## What's missing / relation to QuantumFusion

- **The win is framed as training efficiency, not an accumulation-vs-traversal cost law.** No
  study (found) directly compares *per-fact accumulation + multi-hop inference cost* of a
  shared-space method against a **graph-traversal baseline** as graph size and hop depth grow —
  which is exactly QuantumFusion's NFR-7 experiment.
- **"Knowledge density" is unmeasured.** The ratio of derivable-to-stored facts (the
  representation implying more than it stores) is not, to our knowledge, an established metric.
  This is an opportunity to *define* it.
- **Accumulation isn't tied to composite/deeper knowledge.** CKGE preserves link-prediction MRR;
  it doesn't measure whether accumulation yields *deeper* (higher-order composite) knowledge more
  cheaply.
- **Design guidance:** build the `space` incremental-update path on CKGE techniques (incremental
  distillation, IncLoRA-style low-rank updates), adopt NGDB framing for positioning, and make the
  headline experiment an explicit **cost/scaling + density** comparison vs. a graph-traversal
  baseline. Until "deeper/denser" are operationalized (see [`../../REQUIREMENTS.md`](../../REQUIREMENTS.md)
  open questions), this claim stays directional.
