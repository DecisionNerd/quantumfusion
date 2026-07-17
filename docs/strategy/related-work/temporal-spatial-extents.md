# Temporal, spatial & extents

**QuantumFusion claim covered:** relationships carry temporal/geospatial constraints; data points
may be points *or* extents (instants/spans, coordinates/areas); applicability is an overlap query
(C6).

Temporal KGE and spatial KGE are both active, and **box/region embeddings** are the shared
geometric idiom for extents. But the two are pursued in **separate, specialized models**, and
containment/overlap is acknowledged as awkward. QuantumFusion's contribution here is *unification*:
temporal and geospatial constraints as context-subspaces in one shared eigenspace, with
uncertainty.

## Key works — temporal

| Work | Year | Venue | What it does | Relevance |
|---|---|---|---|---|
| [HyTE (Dasgupta, Ray, Talukdar)](https://aclanthology.org/D18-1225/) | 2018 | EMNLP | Time-specific hyperplanes; project entities per timestamp; predicts time scopes | Early temporal projection |
| [TNTComplEx (Lacroix, Obozinski, Usunier)](https://openreview.net/forum?id=rke2P1BFwS) · [arXiv](https://arxiv.org/abs/2004.04926) | 2020 | ICLR | Order-4 temporal tensor factorization (ComplEx + time) with non-temporal component | Spectral temporal |
| [DE-SimplE (Goel, Kazemi, Brubaker, Poupart)](https://doi.org/10.1609/aaai.v34i04.5815) · [arXiv](https://arxiv.org/abs/1907.03143) | 2020 | AAAI | **Diachronic** entity embeddings (time-varying features); fully expressive | Time-dependent entities |
| [ATiSE (Xu, Nayyeri, Alkhoury, Yazdi, Lehmann)](https://arxiv.org/abs/1911.07893) · [DOI](https://doi.org/10.1007/978-3-030-62419-4_37) | 2020 | ISWC | Additive time series + **Gaussian** (temporal + uncertainty) | Temporal *and* uncertainty together |
| [BoxTE (Messner, Abboud, Ceylan)](https://doi.org/10.1609/aaai.v36i7.20746) | 2022 | AAAI | Extends **BoxE** to time via per-relation time "bumps"; fully expressive | Boxes for temporal facts; extents-as-boxes |
| [PTBox](https://aclanthology.org/2024.lrec-main.129/) · [arXiv](https://arxiv.org/pdf/2405.00358) | 2024 | LREC-COLING | **Polynomial** decomposition of time (continuous, even unseen timestamps) + box entities | Arbitrary/continuous time + regions |
| [TKG reasoning survey](https://doi.org/10.1109/dsc67331.2025.00019); TKGE survey | 2025 | DSC / survey | 7 method classes; interpolation vs. extrapolation; neuro-symbolic; calls for **falsifiability-inspired, interpretable** frameworks | Landscape + interpretability gap |

## Key works — spatial & regions

| Work | Year | Venue | What it does | Relevance |
|---|---|---|---|---|
| [Space2Vec (Mai et al.)](https://gengchenmai.github.io/papers/2020-ICLR2020-Space2Vec.pdf) | 2020 | ICLR | Multi-scale **sinusoidal location encoding** (grid-cell inspired); preserves position, distance, direction | Encoder for geospatial points |
| [SE-KGE (Mai et al.)](https://ar5iv.labs.arxiv.org/html/2004.14171) | 2020 | Trans. in GIS | Location-aware KGE encoding **point coordinates and bounding boxes**; geographic QA + spatial semantic lifting; **notes containment (isPartOf) is hard to encode** | Spatial extents in KGE; names a key difficulty |
| [BoxE (Abboud, Ceylan, Lukasiewicz, Salvatori)](https://proceedings.neurips.cc/paper/2020/file/6dbbe6abe5f14af882ff977fc3f35501-Paper.pdf) · [arXiv](https://arxiv.org/abs/2007.06267) | 2020 | NeurIPS | Entities as points, relations as boxes; spatial/logical inference; higher-arity + rule injection | Foundational region model |
| [Query2Box (Ren, Hu, Leskovec)](https://arxiv.org/abs/2002.05969) | 2020 | ICLR | Query regions as boxes (see [composite doc](composite-and-discovery.md)) | Regions for composition |

## What's solved

- Continuous and even unseen **timestamps** (PTBox), time-varying entities (DE-SimplE), and
  temporal + uncertainty jointly (ATiSE).
- **Boxes/regions** as the standard geometry for extents and containment-style inference (BoxE,
  BoxTE, Query2Box).
- **Geospatial** encoding of points and bounding boxes into KGE with spatial reasoning tasks
  (Space2Vec, SE-KGE).

## What's missing / relation to QuantumFusion

- **Temporal and geospatial are siloed.** Models handle one or the other; there's no single
  representation where a fact's *temporal span* and *geospatial area* are both context-subspaces
  of the same shared space, jointly queried for applicability.
- **Containment/overlap is acknowledged as hard** (SE-KGE on `isPartOf`) — precisely the
  point-vs-extent operation QuantumFusion makes central.
- **Constraints as applicability gates** (does this fact hold here-and-now?) aren't unified with
  the discovery/scoring mechanism; time/space are usually extra coordinates, not constraint
  overlaps feeding the same orthogonality score.
- **Arbitrary (non-temporal, non-spatial) constraints** aren't covered at all — consistent with
  our plan to keep those as an explicit gate.
- **Opportunity + toolkit:** adopt box/region geometry (BoxE/BoxTE/Query2Box) and Space2Vec-style
  encoders as the `encoders` for temporal and geospatial extents, but unify them as
  context-subspaces so overlap = applicability, and connect to the interpretability the 2025 TKG
  survey explicitly asks for.
