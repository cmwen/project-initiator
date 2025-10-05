import { useEffect, useState } from 'preact/hooks';
import { appState } from '../../core/state';
import type { ProjectState } from '../../types/app';

export function DecisionAccordion() {
  const [state, setState] = useState<ProjectState>(appState.get());
  useEffect(() => appState.subscribe(setState), []);

  // Handle accordion animations
  useEffect(() => {
    const details = document.querySelectorAll('details');
    details.forEach(detail => {
      detail.addEventListener('toggle', () => {
        // Force reflow to ensure smooth animation
        detail.offsetHeight;
      });
    });
  }, []);

  return (
    <div className="space-y-3">
      <details className="rounded border border-[var(--muted)]/30" open>
        <summary className="cursor-pointer select-none p-3 text-sm font-medium text-[var(--text)]">1. Repository Layout</summary>
        <div className="p-3 pt-0 text-sm space-y-3">
          <div>
            <label className="block mb-1">Layout</label>
            <select
              className="bg-transparent border border-[var(--muted)]/40 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-brand-600"
              value={state.repoMode}
              onChange={(e) => {
                const repoMode = (e.currentTarget as HTMLSelectElement).value as any;
                if (repoMode === 'single' && state.projectTypes.length > 1) {
                  appState.set({ repoMode, projectTypes: [state.projectTypes[0]] });
                } else {
                  appState.set({ repoMode });
                }
              }}
            >
              <option value="single">Single Package</option>
              <option value="monorepo">Monorepo</option>
            </select>
          </div>
        </div>
      </details>

      <details className="rounded border border-[var(--muted)]/30" open>
        <summary className="cursor-pointer select-none p-3 text-sm font-medium text-[var(--text)]">2. Project Type(s)</summary>
        <div className="p-3 pt-0 text-sm space-y-3">
          {state.repoMode === 'monorepo' ? (
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                {(
                  [
                    'web-spa',
                    'web-mpa',
                    'api-rest',
                    'cli',
                    'library',
                    'api-graphql',
                    'mcp-server',
                    'mcp-client',
                    'vscode-extension',
                    'browser-extension',
                    'custom',
                  ] as const
                ).map((p) => (
                  <label className="flex items-center gap-2" key={p}>
                    <input
                      type="checkbox"
                      checked={state.projectTypes.includes(p)}
                      onChange={(e) => {
                        const checked = (e.currentTarget as HTMLInputElement).checked;
                        const list = new Set(state.projectTypes);
                        checked ? list.add(p) : list.delete(p);
                        appState.set({ projectTypes: Array.from(list) });
                      }}
                    />
                    {p === 'custom' ? 'Custom/Other' : p}
                  </label>
                ))}
              </div>
              {state.projectTypes.includes('custom') && (
                <input
                  type="text"
                  placeholder="Specify custom project type..."
                  className="w-full bg-transparent border border-[var(--muted)]/40 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-brand-600"
                  value={state.customProjectType ?? ''}
                  onChange={(e) => appState.set({ customProjectType: (e.currentTarget as HTMLInputElement).value })}
                />
              )}
            </div>
          ) : (
            <div className="space-y-2">
              <select
                aria-label="Project Type"
                className="bg-transparent border border-[var(--muted)]/40 rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-brand-600"
                value={state.projectTypes[0] ?? 'web-spa'}
                onChange={(e) =>
                  appState.set({ projectTypes: [(e.currentTarget as HTMLSelectElement).value as any] })
                }
              >
                <option value="web-spa">Web App (SPA)</option>
                <option value="web-mpa">Web App (MPA)</option>
                <option value="api-rest">API (REST)</option>
                <option value="cli">CLI</option>
                <option value="library">Library/SDK</option>
                <option value="api-graphql">API (GraphQL)</option>
                <option value="mcp-server">MCP Server</option>
                <option value="mcp-client">MCP Client</option>
                <option value="vscode-extension">VS Code Extension</option>
                <option value="browser-extension">Browser Extension</option>
                <option value="custom">Custom/Other</option>
              </select>
              {state.projectTypes[0] === 'custom' && (
                <input
                  type="text"
                  placeholder="Specify custom project type..."
                  className="w-full bg-transparent border border-[var(--muted)]/40 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-brand-600"
                  value={state.customProjectType ?? ''}
                  onChange={(e) => appState.set({ customProjectType: (e.currentTarget as HTMLInputElement).value })}
                />
              )}
            </div>
          )}
        </div>
      </details>

      <details className="rounded border border-[var(--muted)]/30">
        <summary className="cursor-pointer select-none p-3 text-sm font-medium text-[var(--text)]">3. Runtime & Data</summary>
        <div className="p-3 pt-0 text-sm space-y-3">
          <div className="space-y-2">
            <label className="block mb-2">Primary Runtime</label>
            <select
              aria-label="Runtime"
              className="w-full bg-transparent border border-[var(--muted)]/40 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-brand-600"
              value={state.runtime}
              onChange={(e) => appState.set({ runtime: (e.currentTarget as HTMLSelectElement).value as any })}
            >
              <option value="node">Node.js</option>
              <option value="browser">Browser</option>
              <option value="python">Python</option>
              <option value="bun">Bun</option>
              <option value="deno">Deno</option>
              <option value="rust">Rust</option>
              <option value="go">Go</option>
              <option value="java">Java</option>
              <option value="dotnet">.NET</option>
              <option value="custom">Custom/Other</option>
            </select>
            {state.runtime === 'custom' && (
              <input
                type="text"
                placeholder="Specify custom runtime..."
                className="w-full bg-transparent border border-[var(--muted)]/40 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-brand-600"
                value={state.customRuntime ?? ''}
                onChange={(e) => appState.set({ customRuntime: (e.currentTarget as HTMLInputElement).value })}
              />
            )}
          </div>
          <div>
            <div className="mb-1">Data Storage</div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'none', label: 'None' },
                { id: 'localstorage', label: 'LocalStorage' },
                { id: 'indexeddb', label: 'IndexedDB' },
                { id: 'sqlite-wasm', label: 'SQLite (WASM)' },
                { id: 'hosted-db', label: 'Hosted DB' },
              ].map((d) => (
                <label className="flex items-center gap-2" key={d.id}>
                  <input
                    type="checkbox"
                    checked={state.dataStores?.includes(d.id as any) ?? false}
                    onChange={(e) => {
                      const checked = (e.currentTarget as HTMLInputElement).checked;
                      const list = new Set(state.dataStores ?? []);
                      checked ? list.add(d.id as any) : list.delete(d.id as any);
                      appState.set({ dataStores: Array.from(list) as any });
                    }}
                  />
                  {d.label}
                </label>
              ))}
            </div>
          </div>
        </div>
      </details>

      <details className="rounded border border-[var(--muted)]/30">
        <summary className="cursor-pointer select-none p-3 text-sm font-medium text-[var(--text)]">4. Quality & Automation</summary>
        <div className="p-3 pt-0 text-sm grid grid-cols-2 gap-3">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={state.quality.linting}
              onChange={(e) => appState.set({ quality: { ...state.quality, linting: (e.currentTarget as HTMLInputElement).checked } })}
            />
            Linting
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={state.quality.formatting}
              onChange={(e) => appState.set({ quality: { ...state.quality, formatting: (e.currentTarget as HTMLInputElement).checked } })}
            />
            Formatting
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={state.quality.ci}
              onChange={(e) => appState.set({ quality: { ...state.quality, ci: (e.currentTarget as HTMLInputElement).checked } })}
            />
            CI
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={state.quality.conventionalCommits}
              onChange={(e) =>
                appState.set({
                  quality: { ...state.quality, conventionalCommits: (e.currentTarget as HTMLInputElement).checked },
                })
              }
            />
            Conventional Commits
          </label>
          <div>
            <label className="block mb-1">Testing Level</label>
            <select
              className="bg-transparent border border-[var(--muted)]/40 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-brand-600"
              value={state.quality.testing}
              onChange={(e) =>
                appState.set({ quality: { ...state.quality, testing: (e.currentTarget as HTMLSelectElement).value as any } })
              }
            >
              <option value="none">None</option>
              <option value="unit">Unit Tests</option>
              <option value="e2e">E2E Tests</option>
            </select>
          </div>
        </div>
      </details>

      <details className="rounded border border-[var(--muted)]/30">
        <summary className="cursor-pointer select-none p-3 text-sm font-medium text-[var(--text)]">5. Hosting & Packaging</summary>
        <div className="p-3 pt-0 text-sm space-y-3">
          <div>
            <label className="block mb-1">Host</label>
            <select
              className="w-full bg-transparent border border-[var(--muted)]/40 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-brand-600"
              value={state.hosting}
              onChange={(e) => appState.set({ hosting: (e.currentTarget as HTMLSelectElement).value as any })}
            >
              <option value="vercel">Vercel</option>
              <option value="netlify">Netlify</option>
              <option value="github-pages">GitHub Pages</option>
              <option value="selfhosted">Self-hosted (Fly, Railway, etc.)</option>
            </select>
          </div>
          <div>
            <div className="mb-1">Packaging & Publishing</div>
            <div className="grid grid-cols-2 gap-2">
              {(['npm', 'pypi', 'crates', 'docker', 'homebrew'] as const).map((p) => (
                <label className="flex items-center gap-2" key={p}>
                  <input
                    type="checkbox"
                    checked={state.packaging[p]}
                    onChange={(e) => {
                      const checked = (e.currentTarget as HTMLInputElement).checked;
                      appState.set({ packaging: { ...state.packaging, [p]: checked } });
                    }}
                  />
                  {p}
                </label>
              ))}
            </div>
          </div>
        </div>
      </details>

      <details className="rounded border border-[var(--muted)]/30">
        <summary className="cursor-pointer select-none p-3 text-sm font-medium text-[var(--text)]">6. Documentation</summary>
        <div className="p-3 pt-0 text-sm grid grid-cols-2 gap-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={state.documentation.readme}
              onChange={(e) => appState.set({ documentation: { ...state.documentation, readme: (e.currentTarget as HTMLInputElement).checked } })}
            />
            README
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={state.documentation.agentsMd}
              onChange={(e) => appState.set({ documentation: { ...state.documentation, agentsMd: (e.currentTarget as HTMLInputElement).checked } })}
            />
            AGENTS.md
          </label>
          <label className="flex items-center gap-2">
            License
            <select
              className="bg-transparent border border-[var(--muted)]/40 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-brand-600"
              value={state.documentation.license}
              onChange={(e) =>
                appState.set({ documentation: { ...state.documentation, license: (e.currentTarget as HTMLSelectElement).value as any } })
              }
            >
              <option value="MIT">MIT</option>
              <option value="Apache-2.0">Apache-2.0</option>
              <option value="GPL-3.0">GPL-3.0</option>
              <option value="none">None</option>
            </select>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={state.documentation.changelog}
              onChange={(e) =>
                appState.set({ documentation: { ...state.documentation, changelog: (e.currentTarget as HTMLInputElement).checked } })
              }
            />
            Changelog
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={state.documentation.contributing}
              onChange={(e) =>
                appState.set({ documentation: { ...state.documentation, contributing: (e.currentTarget as HTMLInputElement).checked } })
              }
            />
            Contributing
          </label>
        </div>
      </details>

      <details className="rounded border border-[var(--muted)]/30">
        <summary className="cursor-pointer select-none p-3 text-sm font-medium text-[var(--text)]">7. Dev Environment & CI/CD</summary>
        <div className="p-3 pt-0 text-sm space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={state.devEnvironment.devcontainer}
                onChange={(e) => appState.set({ devEnvironment: { ...state.devEnvironment, devcontainer: e.currentTarget.checked } })}
              />
              Devcontainer
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={state.devEnvironment.dockerCompose}
                onChange={(e) => appState.set({ devEnvironment: { ...state.devEnvironment, dockerCompose: e.currentTarget.checked } })}
              />
              Docker Compose
            </label>
          </div>
          <div>
            <label className="block mb-1">CI Pipeline</label>
            <select
              className="w-full bg-transparent border border-[var(--muted)]/40 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-brand-600"
              value={state.devEnvironment.ciPipeline}
              onChange={(e) => appState.set({ devEnvironment: { ...state.devEnvironment, ciPipeline: (e.currentTarget as HTMLSelectElement).value as any } })}
            >
              <option value="none">None</option>
              <option value="github-actions">GitHub Actions</option>
              <option value="gitlab-ci">GitLab CI</option>
              <option value="circleci">CircleCI</option>
            </select>
          </div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={state.devEnvironment.cdPipeline}
              onChange={(e) => appState.set({ devEnvironment: { ...state.devEnvironment, cdPipeline: e.currentTarget.checked } })}
            />
            CD Pipeline (Continuous Deployment)
          </label>
        </div>
      </details>

      <details className="rounded border border-[var(--muted)]/30">
        <summary className="cursor-pointer select-none p-3 text-sm font-medium text-[var(--text)]">8. Repo Setup</summary>
        <div className="p-3 pt-0 text-sm space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={state.repoSetup.issueTemplates}
                onChange={(e) => appState.set({ repoSetup: { ...state.repoSetup, issueTemplates: e.currentTarget.checked } })}
              />
              Issue Templates
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={state.repoSetup.dirStructure}
                onChange={(e) => appState.set({ repoSetup: { ...state.repoSetup, dirStructure: e.currentTarget.checked } })}
              />
              Directory Structure
            </label>
          </div>
        </div>
      </details>

      <details className="rounded border border-[var(--muted)]/30">
        <summary className="cursor-pointer select-none p-3 text-sm font-medium text-[var(--text)]">8. Advanced</summary>
        <div className="p-3 pt-0 text-sm grid grid-cols-2 gap-2">
          <label className="flex items-center gap-2">
            Secrets
            <select
              className="bg-transparent border border-[var(--muted)]/40 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-brand-600"
              value={state.advanced.secrets}
              onChange={(e) => appState.set({ advanced: { ...state.advanced, secrets: (e.currentTarget as HTMLSelectElement).value as any } })}
            >
              <option value="none">None</option>
              <option value="env">.env</option>
              <option value="ci-secrets">CI Secrets</option>
            </select>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={state.advanced.security}
              onChange={(e) => appState.set({ advanced: { ...state.advanced, security: (e.currentTarget as HTMLInputElement).checked } })}
            />
            Security
          </label>
        </div>
      </details>
    </div>
  );
}
