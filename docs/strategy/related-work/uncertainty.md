# Uncertainty in embeddings

**QuantumFusion claim covered:** any data point may carry uncertainty, which propagates through
encoding → fusion → scoring into a derived, calibrated confidence (C5, NFR-8).

Probabilistic embeddings are a mature line: represent an entity/relation as a distribution
(usually Gaussian) rather than a point, with variance as uncertainty. The frontier (2025) has
turned critical — showing that *entity-level, relation-agnostic* uncertainty fails on novel
contexts — and toward calibrated, conformal guarantees. QuantumFusion's need is specifically to
propagate uncertainty through a **fusion/composite** step into created-fact confidence, which is
under-addressed.

## Key works

| Work | Year | Venue | What it does | Relevance |
|---|---|---|---|---|
| [Word2Gauss (Vilnis & McCallum)](https://arxiv.org/abs/1412.6623) | 2015 | ICLR | Words as **Gaussians** (mean + covariance); KL-divergence energy | Origin of "point → distribution" |
| [KG2E (He, Liu, Ji, Zhao)](https://doi.org/10.1145/2806416.2806502) | 2015 | CIKM | KG entities/relations as Gaussians; diagonal covariance = uncertainty; KL scoring | First Gaussian KGE |
| [TransG (Xiao, Huang, Zhu)](https://aclanthology.org/P16-1219/) · [arXiv](https://arxiv.org/abs/1509.05488) | 2016 | ACL | Bayesian non-parametric **mixture-of-Gaussians** for multiple relation semantics | Multi-modal relation uncertainty |
| [Gaussian attention model (He et al.)](https://ar5iv.labs.arxiv.org/html/1611.02266) | 2016 | (arXiv) | Gaussian scoring that **propagates uncertainty along relation paths** and handles conjunction | Precedent for uncertainty propagation through composition |
| UKGE (Chen et al.) | 2019 | AAAI | Embeddings for **uncertain KGs** with confidence scores on triples | Canonical uncertain-KG model |
| BEUrRE (Chen et al.) | 2021 | NAACL | **Box** embeddings where volume = uncertainty | Region-based uncertainty |
| GP-KGE (Chen et al.) | 2021 | (line) | Gaussian-process KG embeddings | Non-parametric uncertainty |
| [PERM (Choudhary et al.)](https://proceedings.neurips.cc/paper_files/paper/2021/file/c4d2ce3f3ebb5393a77c33c0cd95dc93-Paper.pdf) | 2021 | NeurIPS | Gaussian entities; closed-form existential queries | Uncertainty + composition |
| [Co-embedding VAE](https://www.mdpi.com/2076-3417/12/2/715) | 2022 | Applied Sciences | VAE representing KG components as Gaussians in one space | Shared-space Gaussians + interpretability |
| [Decomposing uncertainty / CAGP](https://arxiv.org/html/2512.22318v2) | 2025 | arXiv | **Impossibility result:** relation-agnostic (entity-only) variance ≈ random on novel contexts; proposes coverage-augmented GP | Critical frontier — uncertainty must be relation/context aware |
| UnKGCP / CondKGCP; [UKGEBN](https://link.springer.com/article/10.1007/s11063-025-11794-2) | 2025 | (various) | **Conformal prediction** confidence intervals; LLM encoding + Bayesian-network inference | Calibrated guarantees; open-world inference |

The density-matrix view from [quantum-inspired meaning](quantum-inspired-meaning.md) is an
alternative uncertainty representation (mixed states over subspaces) worth considering.

## What's solved

- Distributions (Gaussian, box-volume, GP) as first-class entity/relation representations with
  variance-as-uncertainty.
- **Propagating uncertainty along relation paths and through conjunction** (Gaussian attention,
  PERM) — a precedent for our fusion-propagation need.
- A hard lesson (2025): entity-only variance is **relation-agnostic and fails OOD**; uncertainty
  must condition on the relation/context.
- **Calibration via conformal prediction** — statistically guaranteed intervals.

## What's missing / relation to QuantumFusion

- **No propagation through composite-entity *fusion*** into a created-fact confidence within an
  eigenspace-orthogonality setting; existing propagation is along paths/queries, not through a
  fusion operator that mints a new entity.
- **Uncertainty and heterogeneous types aren't jointly handled** — no per-type uncertainty
  (a fuzzy temporal span vs. a noisy scalar) combined into one confidence.
- **Design guidance for us:** make uncertainty **relation/context-aware from the start** (heed
  the 2025 impossibility result), adopt **conformal calibration** to satisfy NFR-8, and evaluate
  on **temporal/distribution-shift OOD**, not just random corruptions (where everything looks
  good). Gaussian-in-shared-space (KG2E/PERM/Co-embedding) is the natural baseline; density
  matrices are a stretch alternative.
