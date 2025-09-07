# Vision Log — Project Initiator

Tag: [Vision → Product]

Last updated: 2025-09-07

## Problem Statement
Many developers struggle to craft a strong “first prompt” when asking a coding agent to start a new project. They often jump in without clarifying scope, constraints, delivery targets, or downstream needs (publishing, CI/CD, licensing, etc.). This leads to misaligned outputs, rework, and wasted tokens/time.

We will build a static web app (hosted on GitHub Pages) that helps users think before they build. It guides them through key considerations, then generates a high-quality, vendor-neutral kickoff prompt tailored to their selections. The result is a shareable, repeatable prompt that sets a clear direction for any coding agent.

Scope v0–v1: Client-side only (no backend), privacy-friendly, lightweight, fast. The app emphasizes thinking and clarity over “one-click code generation.”

## Target Users and Scenarios
- New indie dev starting a side project
  - Goal: Decide between CLI vs Web app, pick language, and outline minimal release steps (README, license, package publishing).
  - Value: Confidence and a crisp prompt that the agent can execute from scratch.
- Experienced engineer kicking off a work PoC
  - Goal: Capture non-functional needs (testing, linting, CI), repo layout, and deliverables for a 1-week prototype.
  - Value: Alignment with team standards; lower back-and-forth with the agent.
- Educator/mentor teaching agent best practices
  - Goal: Demonstrate a checklist of considerations and show how they map to a strong prompt.
  - Value: Teachable artifacts and consistent outcomes across students.
- OSS maintainer proposing a new tool
  - Goal: Ensure license, contribution guidelines, and release automation are planned up front.
  - Value: Fewer surprises at PR/release time.

## Success Criteria and Initial Metrics
- [Vision → Product] 70%+ prompt completion rate (user reaches “Copy prompt”) in first session.
- [Vision → Product] Median time-to-complete < 5 minutes for default flow.
- [Vision → Product] 50%+ of prompts copied at least once; 20%+ shared/exported.
- [Vision → Product] Post-use survey (1–5): “Prompt covered my needs” ≥ 4.2 avg.
- [Vision → Product] Return visits (7-day) ≥ 20% once stable.

Note: For v0, use anonymous, privacy-preserving telemetry if included at all; otherwise run local UX tests and collect manual feedback.

## Assumptions, Constraints, and Trade-offs
- Hosting: GitHub Pages serves static HTML/CSS/JS; no server runtime. One Pages site per repo; project sites are at <owner>.github.io/<repo> (per GitHub Docs). Custom domains optional.
- Offline/local-first: Client can store state locally (LocalStorage). Full offline via PWA is possible but optional for v1; adds complexity.
- Agent neutrality: Generated prompt should work across coding agents (don’t hardcode proprietary features). Provide optional vendor-specific toggles.
- Privacy: No code or selections leave the browser unless the user explicitly exports/shares.
- Simplicity over exhaustiveness: Start with the most impactful choices. Avoid overwhelming users with jargon; use progressive disclosure and tooltips.

## Risks and Open Questions
- Cognitive overload: Long checklists can intimidate users. Mitigation: presets, progressive steps, defaults.
- Prompt quality variance: Different agents interpret prompts differently. Mitigation: structure prompts with clear sections and acceptance criteria.
- Scope creep into scaffolding: We are not Yeoman; we help think and prompt. Mitigation: integrate with, not replace, scaffolding tools.
- Telemetry/privacy: Collecting metrics conflicts with local-first. Mitigation: local-only by default; explicit opt-in for anonymous metrics.
- Content drift: Best practices evolve quickly. Mitigation: community contributions via PRs; versioned templates.

Open questions
- Should we add import/export of JSON “decision profiles” at v0 or v0.1?
- Which stacks to feature in presets first (JS/TS, Python, Rust, Go)?
- Add MCP-specific flows now or later? (Server vs Client templates)

## Competitive Landscape (positioning)
- Prompt marketplaces (e.g., FlowGPT): catalogs of prompts, not project-kickoff decision support.
- Scaffolding tools (e.g., Yeoman): generate code from templates but don’t help think holistically across distribution, licensing, CI, and hosting.
- Starter repos/templates: opinionated stacks; lack interactive requirement capture.

Differentiation: decision support + vendor-neutral prompt composer that captures scope, constraints, and success criteria in one artifact.

## Core Interaction Principles
- Ask clarifying questions; don’t accept vague inputs.
- Reframe user intent in plain language; reflect assumptions and trade-offs.
- Show impact of choices (e.g., “GitHub Pages is static—no server code”).
- Provide safe defaults and presets; allow advanced overrides.

## Decision Checklist (content taxonomy)
Each item informs a section in the generated prompt. Users can select multiple where applicable.

1) Project type
- CLI, Web app (SPA/MPA), REST API, GraphQL API
- Library/SDK, MCP Server, MCP Client, VS Code Extension, Browser Extension

2) Target platforms and runtime
- Node.js, Deno, Bun; Browser; Python; Rust; Go; Java; .NET

3) Local-first and data
- Local-only state, Local-first sync later, Remote DB from day one
- Data storage: none, LocalStorage/IndexedDB/SQLite WASM, hosted DB (Postgres, SQLite, KV)

4) Hosting & distribution
- GitHub Pages (static), Static host (Vercel/Netlify), Server hosting (Railway/Fly/Cloud Run)
- Custom domain? SEO needs? SSG vs SPA?

5) Packaging & publishing
- npm, PyPI, crates.io, Docker image, Homebrew, none (internal)

6) Quality & automation
- Linting/formatting (ESLint/Prettier, Ruff, Clippy), unit tests, minimal e2e
- CI (GitHub Actions) for build/test/lint/release, conventional commits/release

7) Documentation & compliance
- README, LICENSE, CHANGELOG, Contribution guide, Code of Conduct
- License type (MIT/Apache-2.0/GPL-3.0), Security policy

8) Security & secrets
- No secrets (static), dev secrets via .env (agent should not hardcode), secret scanning

9) LLM/agent specifics
- Vendor neutrality, model choice left to user
- Provide a “contract” style prompt with inputs/outputs, acceptance criteria, edge cases

10) Repo setup
- Monorepo vs single package, directory structure, issue templates

## Prompt Template (structure)
The generated prompt follows a consistent, scannable format.

- Title: “Kick off: <Project Type> — <One-liner>”
- Context: Short description of the goal and constraints
- Deliverables: Files, scripts, docs, and outcomes expected
- Requirements: Functional and non-functional, mapped from checklist
- Assumptions & Constraints: Hosting, privacy, licensing, etc.
- Acceptance Criteria: Concrete checks the agent must satisfy
- Edge Cases & Risks: 3–5 items
- Out-of-scope: What not to do in this iteration
- Next Steps: Suggested follow-ups (optional)

## Prioritized Backlog (high-level)
- [Vision → Product] P0: Minimal UI with decision checklist, live prompt preview, copy button
- [Vision → Product] P0: Presets (CLI/Web app/Library) with sensible defaults
- [Vision → Product] P0: Local save/restore (LocalStorage), reset
- [Vision → Product] P1: Shareable URL (encode state in query/hash)
- [Vision → Product] P1: Export/import JSON decision profile
- [Vision → Product] P1: Prompt templates for MCP Server/Client, REST API, Library
- [Vision → Product] P2: Theming and accessibility polish
- [Vision → Product] P2: Optional PWA for offline-first
- [Vision → Product] P2: Vendor-specific toggles (e.g., GitHub Actions templates)

## Milestones and Acceptance Criteria

v0.1 (MVP)
- Scope: Single-page app, core checklist (project type, hosting, quality, docs), live prompt preview, copy
- Acceptance:
  - Given a user selects options, the generated prompt contains: Context, Deliverables, Requirements, Assumptions, Acceptance Criteria, Out-of-scope
  - Works on desktop and mobile modern browsers; no errors in console; TTI < 1s on typical broadband
  - State persists locally; “Reset” clears state

v0.2
- Scope: Presets, shareable URL, export/import JSON, basic theming
- Acceptance:
  - Sharing a URL recreates the same prompt state without remote storage
  - Importing a JSON profile reproduces UI selections exactly

v1.0
- Scope: Additional templates (MCP, Library, REST), accessibility polish, optional PWA
- Acceptance:
  - MCP templates produce vendor-neutral prompts with clear server/client contracts
  - Passes WCAG AA color contrast; keyboard navigable; basic screen reader labels

## Implementation Notes (GitHub Pages)
- Static site only (HTML/CSS/JS). Any build (e.g., Vite) must output static assets.
- Project site URL form: https://<owner>.github.io/<repo>.
- No server-side secrets or dynamic APIs. If needed later, use third-party APIs with client tokens only if safe.

## Initial “Happy Path” Prompt Example (abbreviated)
Title
Kick off: Web App (SPA) — “Project Initiator”

Context
I’m building a static web app hosted on GitHub Pages to help users generate a robust first prompt for coding agents. Keep it vendor-neutral and privacy-friendly.

Deliverables
- Source structure (src/, public/)
- Minimal UI for checklist with live prompt preview
- Copy-to-clipboard and local persistence
- README with usage, LICENSE (MIT), and lightweight CI (lint/test) suggestions (commented)

Requirements
- SPA with no backend; fast load, responsive
- Decision sections: project type, hosting, publishing, quality, docs, etc.
- Progressive disclosure; presets for CLI/Web app/Library

Assumptions & Constraints
- Hosted on GitHub Pages (static only)
- No telemetry by default; store state locally

Acceptance Criteria
- Selecting options updates the prompt preview immediately
- Generated prompt includes Context, Deliverables, Requirements, Assumptions, Acceptance Criteria, Out-of-scope
- No console errors; Lighthouse performance ≥ 90 on desktop

Out-of-scope
- Code scaffolding beyond suggested structure

## Collaboration & Traceability
- Keep this Vision Log in `docs/vision.md`; iterate via PRs.
- Tag backlog and requirements with [Vision → Product] for traceability.

## Clarifying Questions
1) Which initial presets matter most (pick 2–3): CLI, Web app, REST API, Library, MCP Server/Client?
2) Which languages/stacks should v0 highlight (JS/TS default; add Python/Rust/Go?)
3) Do you want shareable URLs in v0, or is that okay in v0.2?
4) Any branding constraints (name, logo, color scheme), or keep minimal?
5) Preference on license (default MIT) and telemetry (opt-in only vs none)?
