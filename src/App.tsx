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
        <nav className="flex gap-2 text-sm text-gray-300">
          <button className="hover:text-white" onClick={() => location.reload()}>Reset</button>
          <button className="hover:text-white" onClick={() => { /* preset modal placeholder */ }}>Presets</button>
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
