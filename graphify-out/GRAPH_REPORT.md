# Graph Report - .  (2026-06-14)

## Corpus Check
- 182 files · ~305,546 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 46 nodes · 40 edges · 10 communities (8 shown, 2 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]

## God Nodes (most connected - your core abstractions)
1. `scripts` - 4 edges
2. `updateActiveButtons()` - 4 edges
3. `Blog` - 3 edges
4. `Bug Bounty` - 3 edges
5. `filterPosts()` - 2 edges
6. `resetButtonStyles()` - 2 edges
7. `setActiveButton()` - 2 edges
8. `CTF Writeups` - 2 edges
9. `Projects` - 2 edges
10. `$schema` - 1 edges

## Surprising Connections (you probably didn't know these)
- `Bug Bounty` --references--> `Blog`  [EXTRACTED]
  content/blog/bugbounty/_index.md → content/blog/_index.md
- `CTF Writeups` --references--> `Blog`  [EXTRACTED]
  content/blog/ctf/_index.md → content/blog/_index.md
- `Projects` --references--> `Blog`  [EXTRACTED]
  content/blog/projects/_index.md → content/blog/_index.md
- `Open redirect on a login request` --references--> `Bug Bounty`  [EXTRACTED]
  content/blog/bugbounty/open-redirect-on-login.md → content/blog/bugbounty/_index.md
- `Reflected XSS in a corporate marketing site` --references--> `Bug Bounty`  [EXTRACTED]
  content/blog/bugbounty/reflected-xss-corporate-marketing-site.md → content/blog/bugbounty/_index.md

## Import Cycles
- None detected.

## Communities (10 total, 2 thin omitted)

### Community 1 - "Community 1"
Cohesion: 0.25
Nodes (8): Blog, Bug Bounty, Open redirect on a login request, Reflected XSS in a corporate marketing site, CTF Writeups, Billing, Projects, Wazuh SIEM Lab

### Community 2 - "Community 2"
Cohesion: 0.25
Nodes (7): name, private, scripts, build, build:css, dev, version

### Community 3 - "Community 3"
Cohesion: 0.70
Nodes (4): filterPosts(), resetButtonStyles(), setActiveButton(), updateActiveButtons()

### Community 4 - "Community 4"
Cohesion: 0.40
Nodes (5): devDependencies, autoprefixer, postcss, postcss-cli, tailwindcss

## Knowledge Gaps
- **17 isolated node(s):** `$schema`, `plugin`, `@opencode-ai/plugin`, `name`, `version` (+12 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `Community 4` to `Community 2`?**
  _High betweenness centrality (0.038) - this node is a cross-community bridge._
- **What connects `$schema`, `plugin`, `@opencode-ai/plugin` to the rest of the system?**
  _17 weakly-connected nodes found - possible documentation gaps or missing edges._