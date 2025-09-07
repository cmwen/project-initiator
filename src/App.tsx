import { useEffect } from 'preact/hooks';
import { appState } from './core/state';
import { DecisionAccordion } from './components/DecisionAccordion';
import { PromptPreview } from './components/PromptPreview';

export default function App() {
  // Restore state on first load
  useEffect(() => {
    appState.restore();
  }, []);

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Project Initiator</h1>
        <nav className="flex items-center gap-3 text-sm text-[var(--muted)]">
          <label className="flex items-center gap-2">
            Theme
            <select aria-label="Theme"
              className="bg-transparent border border-gray-600 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-brand-600"
              onChange={(e) => appState.set({ theme: (e.currentTarget as HTMLSelectElement).value as any })}
              value={appState.get().theme ?? 'system'}
            >
              <option value="system">System</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </label>
          <button aria-label="Reset state" className="hover:text-[var(--text)]" onClick={() => location.reload()}>Reset</button>
          <button aria-label="Open presets" className="hover:text-[var(--text)]" onClick={() => { /* preset modal placeholder */ }}>Presets</button>
        </nav>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <section className="bg-[var(--card)] rounded-lg p-4">
          <h2 className="text-lg font-medium mb-2">Decision Categories</h2>
          <DecisionAccordion />
        </section>
        <aside className="bg-[var(--card)] rounded-lg p-4">
          <PromptPreview />
        </aside>
      </main>
    </div>
  );
}
