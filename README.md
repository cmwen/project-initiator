# Project Initiator

A static web app that helps developers craft high-quality, vendor-neutral prompts for coding agents when starting new projects.

## Quick Start

*Development setup coming soon - currently in foundation phase*

## Quickstart

- Install Node.js 20+
- Install dependencies: `npm ci`
- Start dev server: `npm run dev`
- Run tests: `npm test`
- Build: `npm run build`

Deployed via GitHub Pages from `dist/` with base `/project-initiator/`.

## Problem We're Solving

Many developers struggle to create effective "first prompts" when asking coding agents to start new projects. They often jump in without clarifying scope, constraints, delivery targets, or downstream needs (publishing, CI/CD, licensing, etc.). This leads to misaligned outputs, rework, and wasted time.

Project Initiator guides users through key considerations, then generates a comprehensive, shareable prompt that sets clear direction for any coding agent.

## Documentation

### Core Documents
- **[Vision](docs/vision.md)** - Complete project vision, user scenarios, and success criteria
- **[Product Backlog](docs/product_backlog.md)** - Living backlog with prioritized features and acceptance criteria
- **[Design](docs/design.md)** - Technical architecture, UX design, and implementation specifications
- **[Design Decisions](docs/design_decisions.md)** - Architectural choices and technical trade-offs
- **[QA Plan](docs/qa_plan.md)** - Testing strategy, quality gates, and acceptance criteria
- **[Execution Log](docs/execution_log.md)** - Development progress and implementation decisions
- **[Governance Traceability](docs/governance_traceability.md)** - Cross-document linkage and consistency tracking

### Key Features (Planned)
- **Decision Checklist**: Guide users through project type, hosting, quality automation, documentation needs
- **Live Prompt Preview**: Real-time generation of structured, vendor-neutral prompts  
- **Preset Templates**: Common scenarios (CLI tool, web app, library) with sensible defaults
- **Local State Management**: Privacy-first approach with browser-only persistence
- **Shareable URLs**: Export decision state for collaboration
- **Direct Integration**: One-click sharing to ChatGPT, Claude, Cursor, and other coding assistants
- **Mobile-First Design**: Touch-optimized interface with responsive accordion navigation

## Architecture

- **Hosting**: GitHub Pages (static site)
- **Privacy**: Client-side only, no data leaves browser
- **Performance**: <1s load time, responsive design
- **Accessibility**: WCAG AA compliance

## Contributing

This project follows a documentation-first development approach. All contributions should:

1. Link back to requirements in the [Product Backlog](docs/product_backlog.md)
2. Document design decisions in [Design Decisions](docs/design_decisions.md)  
3. Update progress in the [Execution Log](docs/execution_log.md)
4. Ensure [QA Plan](docs/qa_plan.md) coverage for new features

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Project Status

**Current Phase**: Foundation Setup (Epic 1)  
**Next Milestone**: Core MVP Features (Epic 2)

See [Execution Log](docs/execution_log.md) for detailed progress and [Product Backlog](docs/product_backlog.md) for roadmap.
