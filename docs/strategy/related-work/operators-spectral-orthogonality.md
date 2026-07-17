# Relations as operators, spectral & orthogonal structure

**QuantumFusion claim covered:** relations as linear operators `M_r` whose eigenspaces — and
the orthogonality between them and (composite) entity subspaces — drive discovery (C1, C2).

This is the closest technical lineage. Representing relations as matrices/operators is standard,
and orthogonality has become a mainstream tool for expressiveness — but as a property of the
*relation transform*, not as an eigenspace-overlap *discovery* signal.

## Key works

| Work | Year | Venue | What it does | Relevance |
|---|---|---|---|---|
| [RESCAL (Nickel, Tresp, Kriegel)](https://icml.cc/2011/papers/438_icmlpaper.pdf) | 2011 | ICML | Three-way tensor factorization; relation = matrix `M_r`, score `hᵀ M_r t` | The original relation-as-matrix; `M_r` has a spectrum |
| [DistMult (Yang, Yih, He, Gao, Deng)](https://arxiv.org/abs/1412.6575) | 2015 | ICLR | Diagonal `M_r` (bilinear) | Restricted-spectrum special case |
| [ComplEx (Trouillon, Welbl, Riedel, Gaussier, Bouchard)](https://proceedings.mlr.press/v48/trouillon16.html) · [arXiv](https://arxiv.org/abs/1606.06357) | 2016 | ICML | Complex bilinear; handles asymmetry via the Hermitian dot product | ≈ eigendecomposition of `M_r`; complex spectra |
| **[ANALOGY (Liu, Wu, Yang)](https://proceedings.mlr.press/v70/liu17d.html) · [arXiv](https://arxiv.org/abs/1705.02426)** | 2017 | ICML | Constrains relation matrices to be **normal & commuting** → jointly (unitarily) diagonalizable; analyzed via the spectral theorem | **Orthogonal eigenspaces by construction** — closest classical ancestor to our idea |
| [TuckER (Balažević, Allen, Hospedales)](https://aclanthology.org/D19-1522/) · [arXiv](https://arxiv.org/abs/1901.09590) | 2019 | EMNLP | Tucker decomposition of the KG tensor; subsumes RESCAL/DistMult/ComplEx/SimplE | Spectral/tensor view; ties to Kolda & Bader (2009) |
| [RotatE (Sun, Deng, Nie, Tang)](https://openreview.net/forum?id=HkgEQnRqYQ) · [arXiv](https://arxiv.org/abs/1902.10197) | 2019 | ICLR | Relations as rotations in complex space (unitary) | Orthogonal/unitary operators; relation patterns |
| [OTE — Orthogonal Transform Embedding (Tang et al.)](https://aclanthology.org/2020.acl-main.241/) | 2020 | ACL | Extends RotatE to high-dim **orthogonal transforms** + graph context | High-dimensional orthogonalized relations |
| [GoldE (Li et al.)](https://proceedings.mlr.press/v235/li24ah.html) · [arXiv](https://arxiv.org/html/2405.08540v1) | 2024 | ICML | **Universal orthogonal parameterization** via generalized Householder reflections; product manifolds (Euclidean/elliptic/hyperbolic) | SOTA; unifies orthogonal relation transforms across geometries |
| [OrthogonalE (Yang et al.)](https://aclanthology.org/2024.findings-emnlp.987.pdf) · [arXiv](https://arxiv.org/html/2401.05967v2) | 2024 | Findings of EMNLP | **Matrices for entities**, block-diagonal orthogonal matrices for relations, Riemannian optimization | Entities-as-matrices + orthogonal relations; fewer params, more patterns |

Math foundations (verified): principal angles between subspaces — [Björck & Golub, *Numerical
Methods for Computing Angles Between Linear Subspaces*, Math. Comp. 27(123):579–594,
1973](https://doi.org/10.1090/S0025-5718-1973-0348991-3) — plus Grassmann-manifold methods, the
spectral theorem, and tensor-decomposition background in [Kolda & Bader, *Tensor Decompositions
and Applications*, SIAM Review 51(3):455–500, 2009](https://doi.org/10.1137/07070111X). This is
the actual math of our `orthogonality` module.

## What's solved

- Relations as operators with rich spectra (RESCAL/ComplEx/TuckER).
- Orthogonality/unitarity as a route to expressiveness and relation-pattern modeling
  (symmetry, inversion, composition) — RotatE → OTE → GoldE/OrthogonalE.
- Simultaneous diagonalization / orthogonal eigenspaces (ANALOGY) with an analogical-reasoning
  interpretation.
- Entities represented as matrices, not just vectors (OrthogonalE), edging toward subspaces.

## What's missing / relation to QuantumFusion

- **Orthogonality is used *inside* the relation transform, not *between* an entity/composite
  subspace and a relation's eigenspaces.** Nobody (found) scores a fact by the principal
  angle/overlap of a subspace against `M_r`'s eigenspaces.
- **No composite-entity creation.** These models do link prediction over existing entities;
  none fuse entities into a new one and derive its facts.
- **No explanation surface.** Spectra exist but aren't exposed as a per-fact geometric rationale.
- **ANALOGY is the anchor to build from** — its normal/commuting constraint gives orthogonal
  eigenspaces "for free," which is exactly the substrate our discovery mechanism needs. GoldE's
  Householder parameterization and OrthogonalE's Riemannian optimization are the practical
  toolkit for learning well-behaved orthogonal operators.
