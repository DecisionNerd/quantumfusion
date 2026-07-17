# Composite construction: complex queries & knowledge discovery

**QuantumFusion claim covered:** composite entity knowledge creation — synthesizing new
higher-order entities and deriving the facts that hold about them (C3).

Two adjacent fields bracket this claim from opposite sides: **complex logical query answering
(CLQA)** composes operations in embedding space but retrieves *existing* answer entities, while
**literature-based discovery (LBD)** creates genuinely *new* knowledge but as bridging links,
not as new composite entities. QuantumFusion sits in the gap between them.

## Key works — complex query answering

| Work | Year | Venue | What it does | Relevance |
|---|---|---|---|---|
| [GQE (Hamilton, Bajaj, Zitnik, Jurafsky, Leskovec)](https://proceedings.neurips.cc/paper/2018/file/ef50c335cca9f340bde656363ebd02fd-Paper.pdf) | 2018 | NeurIPS | Conjunctive queries as geometric operations in embedding space | First "query embedding" |
| [Query2Box (Ren, Hu, Leskovec)](https://openreview.net/forum?id=BJgr4kSFDS) · [arXiv](https://arxiv.org/abs/2002.05969) | 2020 | ICLR | Entities/queries as **boxes**; projection & intersection as box ops | Region-based composition |
| [BetaE (Ren & Leskovec)](https://proceedings.neurips.cc/paper/2020/file/e43739bba7cdb577e9e3e4e42447f5a5-Paper.pdf) · [arXiv](https://arxiv.org/abs/2010.11465) | 2020 | NeurIPS | Queries as **Beta distributions**; supports negation + **uncertainty** | Probabilistic composition |
| [PERM (Choudhary et al.)](https://proceedings.neurips.cc/paper_files/paper/2021/file/c4d2ce3f3ebb5393a77c33c0cd95dc93-Paper.pdf) | 2021 | NeurIPS | Entities as **Gaussians**; first-order existential queries in closed form | Gaussian composition + chain reasoning |
| GNN-QE (Zhu et al.) | 2022 | ICML | GNN + fuzzy logic; predicts answer probability directly | Neuro-symbolic composition |
| [FIT / EFO1](https://proceedings.iclr.cc/paper_files/paper/2024/file/55ce0d74cf90dc79f08a422ab61295cb-Paper-Conference.pdf) | 2024 | ICLR | Extends to full Existential First-Order (single free var) queries via neural link predictors + strict fuzzy logic | Theoretical expansion of composable queries |
| [Neural Graph Reasoning survey / NGDB (Ren, Galkin et al.)](https://mlanthology.org/tmlr/2024/ren2024tmlr-neural/) · [arXiv](https://arxiv.org/pdf/2303.14617) | 2024 | TMLR | Taxonomy of CLQA; proposes **Neural Graph Databases** (neural storage + engine; vector retrieval instead of traversal, robust to incompleteness) | Framing ally for our cost hypothesis (C7) |
| [QE representation-learning survey](https://dl.acm.org/doi/10.1145/3771692) | 2025 | ACM CSUR | Comprehensive taxonomy of query-embedding methods | Landscape reference |

## Key works — knowledge discovery / new knowledge

| Work | Year | Venue | What it does | Relevance |
|---|---|---|---|---|
| Swanson — [ABC model / "Undiscovered public knowledge"](https://doi.org/10.1086/601720) | 1986 | Library Quarterly | Literature-based discovery: if A–B and B–C in disjoint literatures, hypothesize A–C (fish-oil↔Raynaud's; magnesium↔migraine) | The original "create new knowledge by combining facts" |
| [LBD surveys](https://arxiv.org/pdf/2506.12385) ([2](https://arxiv.org/pdf/2310.03766)) | 2023–25 | arXiv | LBD formalized as **knowledge-graph completion**; open vs. closed discovery; move to **hypergraphs** for multi-entity relations; LLMs for hypothesis eval | Modern LBD = KGC; multi-entity direction |
| [Implicit-concept-embedding LBD](https://www.frontiersin.org/journals/research-metrics-and-analytics/articles/10.3389/frma.2025.1509502/pdf); [SKiM-GPT](https://link.springer.com/article/10.1186/s12859-025-06350-7) | 2025 | Frontiers / BMC Bioinf. | Predict interconnecting vertex embeddings; LLM-graded hypotheses | Embedding-based discovery + evaluation |

## What's solved

- **Composing operations** (projection, intersection, union, negation) over embeddings to answer
  multi-hop logical queries, robustly even on incomplete graphs.
- Region/box (Query2Box) and distributional (BetaE, PERM) composites — geometric precedents for
  "an entity/query is a region, not a point."
- **Creating new knowledge** by bridging disjoint facts (LBD), now framed as KGC and pushing
  toward multi-entity (hypergraph) relations.
- **NGDB** reframes a KG as neural storage + engine with vector retrieval — the closest existing
  articulation of "inference as linear algebra, not traversal."

## What's missing / relation to QuantumFusion

- **CLQA retrieves existing entities; it does not mint a new composite entity** with its own
  derived facts and provenance. Our composite is a first-class *object*, not a query result set.
- **LBD creates links (A–C), not composite entities**, and typically via co-occurrence/bridging
  concepts rather than a geometric fusion operator with an eigenspace rationale.
- **No eigenspace-orthogonality mechanism** underlies either; composition is boxes, fuzzy logic,
  or distributions.
- **Opportunity:** position composite-entity creation as the missing middle — more constructive
  than CLQA (it makes a new entity), more geometric/explainable than LBD (fusion + orthogonality
  with a rationale). Borrow NGDB framing for the cost story and BetaE/PERM for uncertainty-aware
  composition.
