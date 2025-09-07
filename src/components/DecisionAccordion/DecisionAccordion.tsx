import { useEffect, useState } from 'preact/hooks';
import { appState } from '../../core/state';
import type { ProjectState } from '../../types/app';

export function DecisionAccordion() {
  const [state, setState] = useState<ProjectState>(appState.get());
  useEffect(() => appState.subscribe(setState), []);

  return (
    <div className="space-y-3">
      <details className="rounded border border-gray-700" open>
        <summary className="cursor-pointer select-none p-3 text-sm font-medium">1. Project Type</summary>
        <div className="p-3 pt-0 text-sm">
          <label className="block mb-2">Type</label>
          <select
            aria-label="Project Type"
            className="bg-transparent border border-gray-600 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-brand-600"
            value={state.projectType}
            onChange={(e) => appState.set({ projectType: (e.currentTarget as HTMLSelectElement).value as any })}
          >
            <option value="cli">CLI</option>
            <option value="web-spa">Web App (SPA)</option>
            <option value="web-mpa">Web App (MPA)</option>
            <option value="api-rest">API (REST)</option>
            <option value="library">Library</option>
            <option value="mcp-server">MCP Server</option>
          </select>
        </div>
      </details>

      <details className="rounded border border-gray-700">
        <summary className="cursor-pointer select-none p-3 text-sm font-medium">2. Runtime & Tech</summary>
        <div className="p-3 pt-0 text-sm">
          <label className="block mb-2">Runtime</label>
          <select
            aria-label="Runtime"
            className="bg-transparent border border-gray-600 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-brand-600"
            value={state.runtime}
            onChange={(e) => appState.set({ runtime: (e.currentTarget as HTMLSelectElement).value as any })}
          >
            <option value="browser">Browser</option>
            <option value="node">Node.js</option>
            <option value="python">Python</option>
            <option value="rust">Rust</option>
            <option value="go">Go</option>
          </select>
        </div>
      </details>

      <details className="rounded border border-gray-700">
        <summary className="cursor-pointer select-none p-3 text-sm font-medium">3. Quality & CI</summary>
        <div className="p-3 pt-0 text-sm grid grid-cols-2 gap-2">
          <label className="flex items-center gap-2"><input type="checkbox" checked={state.quality.linting} onChange={(e) => appState.set({ quality: { ...state.quality, linting: (e.currentTarget as HTMLInputElement).checked } })}/> Linting</label>
          <label className="flex items-center gap-2"><input type="checkbox" checked={state.quality.ci} onChange={(e) => appState.set({ quality: { ...state.quality, ci: (e.currentTarget as HTMLInputElement).checked } })}/> CI</label>
          <label className="flex items-center gap-2"><input type="checkbox" checked={state.quality.formatting} onChange={(e) => appState.set({ quality: { ...state.quality, formatting: (e.currentTarget as HTMLInputElement).checked } })}/> Formatting</label>
          <div>
            <label className="block mb-1">Testing</label>
            <select className="bg-transparent border border-gray-600 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-brand-600" value={state.quality.testing} onChange={(e) => appState.set({ quality: { ...state.quality, testing: (e.currentTarget as HTMLSelectElement).value as any } })}>
              <option value="none">None</option>
              <option value="unit">Unit</option>
              <option value="integration">Integration</option>
              <option value="e2e">E2E</option>
            </select>
          </div>
        </div>
      </details>

      <details className="rounded border border-gray-700">
        <summary className="cursor-pointer select-none p-3 text-sm font-medium">4. Hosting</summary>
        <div className="p-3 pt-0 text-sm">
          <label className="block mb-2">Host</label>
          <select className="bg-transparent border border-gray-600 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-brand-600" value={state.hosting} onChange={(e) => appState.set({ hosting: (e.currentTarget as HTMLSelectElement).value as any })}>
            <option value="github-pages">GitHub Pages</option>
            <option value="vercel">Vercel</option>
            <option value="netlify">Netlify</option>
            <option value="selfhosted">Self-hosted</option>
          </select>
        </div>
      </details>

      <details className="rounded border border-gray-700">
        <summary className="cursor-pointer select-none p-3 text-sm font-medium">5. Documentation</summary>
        <div className="p-3 pt-0 text-sm grid grid-cols-2 gap-2">
          <label className="flex items-center gap-2"><input type="checkbox" checked={state.documentation.readme} onChange={(e) => appState.set({ documentation: { ...state.documentation, readme: (e.currentTarget as HTMLInputElement).checked } })}/> README</label>
          <label className="flex items-center gap-2">
            License
            <select className="bg-transparent border border-gray-600 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-brand-600" value={state.documentation.license} onChange={(e) => appState.set({ documentation: { ...state.documentation, license: (e.currentTarget as HTMLSelectElement).value as any } })}>
              <option value="MIT">MIT</option>
              <option value="Apache-2.0">Apache-2.0</option>
              <option value="GPL-3.0">GPL-3.0</option>
              <option value="none">None</option>
            </select>
          </label>
          <label className="flex items-center gap-2"><input type="checkbox" checked={state.documentation.changelog} onChange={(e) => appState.set({ documentation: { ...state.documentation, changelog: (e.currentTarget as HTMLInputElement).checked } })}/> Changelog</label>
          <label className="flex items-center gap-2"><input type="checkbox" checked={state.documentation.contributing} onChange={(e) => appState.set({ documentation: { ...state.documentation, contributing: (e.currentTarget as HTMLInputElement).checked } })}/> Contributing</label>
        </div>
      </details>

      <details className="rounded border border-gray-700">
        <summary className="cursor-pointer select-none p-3 text-sm font-medium">6. Advanced</summary>
        <div className="p-3 pt-0 text-sm grid grid-cols-2 gap-2">
          <label className="flex items-center gap-2">Secrets
            <select className="bg-transparent border border-gray-600 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-brand-600" value={state.advanced.secrets} onChange={(e) => appState.set({ advanced: { ...state.advanced, secrets: (e.currentTarget as HTMLSelectElement).value as any } })}>
              <option value="none">None</option>
              <option value="env">.env</option>
              <option value="ci-secrets">CI Secrets</option>
            </select>
          </label>
          <label className="flex items-center gap-2"><input type="checkbox" checked={state.advanced.security} onChange={(e) => appState.set({ advanced: { ...state.advanced, security: (e.currentTarget as HTMLInputElement).checked } })}/> Security</label>
          <label className="flex items-center gap-2"><input type="checkbox" checked={state.advanced.accessibility} onChange={(e) => appState.set({ advanced: { ...state.advanced, accessibility: (e.currentTarget as HTMLInputElement).checked } })}/> Accessibility</label>
        </div>
      </details>
    </div>
  );
}
