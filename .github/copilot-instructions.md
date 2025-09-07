# Project Initiator - AI Coding Agent Instructions

## Project Overview
A privacy-first static web app that generates high-quality, vendor-neutral prompts for coding agents when starting new projects. Built with Preact, TypeScript, and Tailwind CSS, deployed via GitHub Pages.

## Core Architecture Patterns

### State Management - Singleton Observable Pattern
- **Central state**: `src/core/state.ts` - Single `appState` instance with pub/sub pattern
- **State shape**: `src/types/app.ts` - `ProjectState` interface defines complete app state
- **Persistence strategy**: Dual-layer - URL hash for sharing + localStorage for sessions
- **Theme integration**: Automatic CSS custom property application via `data-theme` attribute

```typescript
// State subscription pattern used throughout components
const [state, setState] = useState(appState.get());
useEffect(() => appState.subscribe(setState), []);
```

### Component Architecture - Functional + Hooks
- **UI Framework**: Preact (React-compatible but smaller bundle)
- **Styling**: Tailwind CSS with CSS custom properties for theming (`--text`, `--card`, `--muted`)
- **Component structure**: Accordion-based decision UI + live prompt preview
- **Key components**:
  - `DecisionAccordion`: Multi-section form with conditional project type selection
  - `PromptPreview`: Live-updating prompt generation with copy/share functionality

### Conditional Project Type Logic
**Critical Pattern**: Repository mode determines project type UI behavior:
- `repoMode: 'single'` → Single dropdown selection (`projectTypes[0]`)
- `repoMode: 'monorepo'` → Multi-checkbox selection (`projectTypes[]`)

```typescript
// Always check repoMode when handling project types
{state.repoMode === 'monorepo' ? (
  // Multi-select checkboxes
) : (
  // Single dropdown
)}
```

## Testing Strategy

### Unit Test Patterns
- **Framework**: Vitest + @testing-library/preact
- **Setup**: `tests/setup.ts` includes JSDOM polyfills (e.g., `matchMedia`)
- **Test organization**: Mirror `src/` structure in `tests/unit/`
- **Key test types**:
  - State management: `tests/unit/core/state.test.ts`
  - Prompt generation: `tests/unit/core/prompt-engine.test.ts` 
  - Monorepo-specific: `tests/unit/core/prompt-monorepo.test.ts`

### Testing Prompt Generation
**Critical**: Prompt tests must check both `heading` and `content` separately:
```typescript
const sections = generatePrompt(state);
const headings = sections.map(x => x.heading).join('\n');
const content = sections.map(x => x.content).join('\n');
// Test titles in headings, details in content
```

## Development Workflows

### Commands
```bash
npm run dev        # Vite dev server on port 3000
npm test           # Run all tests (--run mode)
npm run test:ui    # Vitest UI for test debugging
npm run build      # Build for GitHub Pages (base: /project-initiator/)
npm run format     # Prettier formatting
npm run lint       # ESLint
```

### Build Configuration
- **Base path**: `/project-initiator/` for GitHub Pages deployment
- **Output**: `dist/` directory
- **Environment**: Vite with Preact preset, TypeScript strict mode

## Privacy & Sharing Architecture

### Data Flow
1. **Local-first**: All decisions stored in browser (localStorage + URL hash)
2. **Sharing mechanism**: State encoded in URL hash (base64 JSON)
3. **Export options**: JSON download, shareable URLs, direct integration links
4. **No telemetry**: Privacy-preserving by design

### URL Hash State Encoding
```typescript
// State persistence pattern in state.ts
const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(state))));
history.replaceState(null, '', `#${encoded}`);
```

## Key Dependencies & Integration Points

- **UI**: Preact (React-like, smaller bundle)
- **Styling**: Tailwind CSS + CSS custom properties
- **Build**: Vite (fast dev server, optimized builds)
- **Testing**: Vitest + Testing Library
- **Deployment**: GitHub Pages (static hosting)

## Documentation-First Development

Follow the established pattern:
1. **Vision**: `docs/vision.md` - Product requirements and user scenarios
2. **Backlog**: `docs/product_backlog.md` - Prioritized features
3. **Decisions**: `docs/design_decisions.md` - Technical choices with rationale
4. **Progress**: `docs/execution_log.md` - Development tracking

## Common Patterns to Follow

### Theme Implementation
Use CSS custom properties with Tailwind:
```css
/* Themes in global.css */
[data-theme="dark"] { --text: #e5e7eb; --card: #1f2937; }
/* Components use custom properties */
className="text-[var(--text)] bg-[var(--card)]"
```

### State Updates
Always use partial updates with spread:
```typescript
appState.set({ quality: { ...state.quality, linting: checked } });
```

### Error Handling
Graceful degradation for storage/sharing features:
```typescript
try {
  localStorage.setItem('app-state', JSON.stringify(state));
} catch (err) {
  // Ignore storage quota/security errors
}
```
