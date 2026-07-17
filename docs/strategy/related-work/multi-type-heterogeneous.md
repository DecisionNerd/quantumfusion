# Multi-type / heterogeneous facts

**QuantumFusion claim covered:** map typed data points into a shared space so multi-data-type
facts are comparable, with a per-type decomposition and cheap native-space intra-type analysis
(C4).

The field that most directly addresses "facts have different data types" is **literal-aware and
multi-modal KGE**. It folds numbers, text, images, and dates into embeddings — but almost always
by *fusing into a single scoring function*, not by giving each type its own subspace with a
native metric and a decomposable comparison.

## Key works

| Work | Year | Venue | What it does | Relevance |
|---|---|---|---|---|
| [KBLRN (García-Durán & Niepert)](https://www.auai.org/uai2018/proceedings/papers/149.pdf) · [arXiv](https://arxiv.org/abs/1709.04676) | 2018 | UAI | Product-of-experts over relational, latent, **numeric** features (numeric via radial basis functions) | Multi-feature fusion |
| [MTKGNN (Tay, Luu, Phan, Hui)](https://doi.org/10.1145/3132847.3132937) · [arXiv](https://arxiv.org/abs/1708.04828); MKBE | 2017–18 | CIKM / EMNLP | Multi-task / multi-modal literal embedding (numeric, text, image) via shared entity space | Early multi-modal |
| [LiteralE (Kristiadi, Khan, Lukovnikov, Lehmann, Fischer)](https://arxiv.org/abs/1802.00934) · [ISWC PDF](http://jens-lehmann.org/files/2019/iswc_literal_e.pdf) | 2019 | ISWC | Learnable **gate** `g(e, xₑ)` merges numeric literals into entity embeddings; drop-in for DistMult/ComplEx | Canonical numeric-literal method (fusion by gating) |
| [Gesese et al., "KG embeddings with literals" survey](https://journals.sagepub.com/doi/10.3233/SW-200404) | 2021 | Semantic Web | Taxonomy: text / numeric / image / multi-modal literals; **explicitly flags that data-typed literals (date, time) need extra semantics and are underserved** | Names our exact gap |
| [Numerical literals: a critical examination](https://arxiv.org/html/2407.18241v1) | 2024 | arXiv | Audits models/datasets; notes brittle handling (e.g. "0" as missing) | Reality check on numeric handling |
| [KGs Meet Multi-Modal Learning survey](https://arxiv.org/html/2402.05391v4); [Multi-modal KG survey (ACM)](https://doi.org/10.1145/3656579) | 2024 | arXiv / ACM CSUR | 300+ paper surveys of MMKG / MMKGC; representation spaces, fusion strategies | Landscape; fusion-centric |
| ReaLitE (relation-centric numeric) | 2024–25 | (line) | Dynamically aggregates numeric attributes per relation rather than static concat | Moving beyond naive concatenation |

Classical cross-type comparison worth citing: Gower distance (mixed-type similarity, [Gower
1971](https://doi.org/10.2307/2528823)), and **Canonical Correlation Analysis** ([Hotelling,
"Relations Between Two Sets of Variates", Biometrika 28(3/4):321–377,
1936](https://doi.org/10.2307/2333955)) / multi-view learning, where aligning heterogeneous views
involves — notably — orthogonality.

## What's solved

- Incorporating **numeric, text, and image** literals into KGE and improving link prediction.
- A recognized taxonomy of literal types and fusion strategies (gating, PoE, concatenation,
  attention).
- Growing awareness that naive fusion (concatenation) is weak; relation-aware aggregation helps.

## What's missing / relation to QuantumFusion

- **Fusion, not decomposition.** Types are merged into one representation to boost scoring; there
  is no per-type subspace giving a **per-type breakdown** of *why* two facts are (dis)similar.
- **Data-typed literals (date/time, geo) are explicitly underserved** (Gesese et al. 2021) —
  exactly the types QuantumFusion treats as first-class (extents + native metrics).
- **No native-space intra-type analysis** (cluster/outlier in each type's own metric) feeding a
  shared-space comparison; it's shared-space only.
- **No orthogonality between type-subspaces** as the device that keeps type contributions
  separable.
- **Opportunity:** the per-type-encoder + (near-)orthogonal-subspace + decomposable-comparison
  design is a genuine differentiator here. LiteralE-style gating and ReaLitE-style relation-aware
  aggregation are useful encoder baselines; CCA is a principled tool for learning aligned yet
  separable type-subspaces.
