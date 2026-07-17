# Design

QuantumFusion has no graphical UI. Its "experience" is the Rust API, the sandbox CLI, the
research artifacts it emits (metrics + explanations), and the documentation and math notation it
uses. This document captures what should stay consistent across those surfaces so results are
legible and the crate is safe to extend — including by coding agents. It builds on
[`PRODUCT.md`](PRODUCT.md).

## Design Principles

- **Geometry is explainable.** Every discovered fact is accompanied by the geometric reason it
  scored as it did. A score with no rationale is a bug, not a feature.
- **Triplets are the noun.** The API and vocabulary center on `(node, rel, node)`; abstractions
  earn their place by making triplet computation clearer.
- **Notation matches code matches docs.** The math symbols in docs, the type names in code, and
  the domain terms in [`ARCHITECTURE.md`](engineering/ARCHITECTURE.md) refer to the same things.
- **Reproducible by construction.** Interfaces take explicit seeds and configs; nothing headline
  depends on hidden global state.
- **Honest about uncertainty.** Research-stage claims are labeled as hypotheses; negative
  results are first-class outputs.

## Design tool context

Design-aware or coding agents should read [`PRODUCT.md`](PRODUCT.md) for intent and this file
for conventions before changing public API, CLI output, or math notation. There is no Figma,
Storybook, or component library — the surfaces of truth are the crate's public API (`cargo doc`)
and the sandbox CLI output.

## Brand And Voice

- **Tone:** precise, understated, research-grade. Prefer the plain claim over the grand one.
- **Terminology:** use these words consistently — *triplet* (not "edge" or "fact tuple" in
  code), *entity* / *relation* (not "node"/"predicate" in the API, though "node" is fine
  conceptually), *relation operator*, *eigenspace*, *orthogonality*, *fusion*, *composite
  entity*, *discovery*, *explanation*. Avoid "quantum" as a technical claim — the name is
  evocative; the method is linear algebra, not quantum computing. Say so where it could mislead.
- **Writing rules:** name things after the domain, not the implementation. Errors state what was
  expected and what was found. Docs lead with the "why" then the "how".

## Visual And Content Style

No visual UI applies. The relevant style is for docs, math, and terminal output.

- **Color:** not applicable (no UI). CLI may use color for status only, and must remain readable
  with color disabled.
- **Typography / notation:** consistent math notation — entities lowercase `e`, relation
  operators `M_r`, eigenspaces `E_λ`, subspaces uppercase. Use inline/block math in docs, not
  ASCII math.
- **Diagrams:** use Mermaid fenced blocks (as in `ARCHITECTURE.md`), never ASCII art.
- **Content structure:** docs use short sections, tables for enumerations, and a runnable
  command for anything a reader might want to reproduce.
- **Run output:** metrics reported as compact tables; explanations structured (relation,
  eigenspaces, angles, score) rather than prose.

## Interaction Patterns

- **Navigation:** the crate is entered either as a library (public modules mirror
  `ARCHITECTURE.md` components) or via the `quantumfusion` sandbox subcommands.
- **Controls (CLI/API):** subcommands map to flows — e.g. `load`, `train`, `fuse`, `discover`,
  `eval`. Configuration is explicit flags/config files; sensible defaults, no hidden magic.
- **States:** long computations (training, decomposition) report progress; empty results
  (no candidate facts) are reported as such, not as an error; numerical failures are typed
  errors with context.
- **Motion:** none.

## Components And Patterns

| Component / pattern | Use it for | Notes / source |
|---|---|---|
| `Triplet` / `Graph` | Representing and querying facts | `triplet` module |
| Relation operator + spectrum | Relation semantics and eigenspaces | `operators` module |
| Orthogonality metric | Comparing subspaces | `orthogonality` module |
| `CompositeEntity` | Fused higher-order entities | `fusion` module |
| `Explanation` | Attaching geometric rationale to a score | `discovery` module |
| Reproducible run (`seed` + `config`) | Any experiment | `eval` / `sandbox` |

## Accessibility

- CLI output must be usable without color and readable in a plain terminal.
- Docs use semantic Markdown headings and real tables (screen-reader friendly), not ASCII
  layout.

## References

- Public API via `cargo doc`.
- [`engineering/ARCHITECTURE.md`](engineering/ARCHITECTURE.md) — canonical domain language.
- [`engineering/adrs/`](engineering/adrs/) — decisions on operators, fusion, and backend.
