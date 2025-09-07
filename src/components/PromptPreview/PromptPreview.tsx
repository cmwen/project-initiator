import { useEffect, useMemo, useState } from 'preact/hooks';
import { appState } from '../../core/state';
import { generatePrompt } from '../../core/prompt-engine';
import type { ProjectState } from '../../types/app';
import { IntegrationLinks } from './IntegrationLinks';

export function PromptPreview() {
  const [state, setState] = useState<ProjectState>(appState.get());
  useEffect(() => appState.subscribe(setState), []);

  const sections = useMemo(() => generatePrompt(state), [state]);
  const text = sections.map(s => `# ${s.heading}\n${s.content}`).join('\n\n');

  function copy() {
    navigator.clipboard?.writeText(text);
  }

  return (
    <div>
      <h2 className="text-lg font-medium mb-2">Live Prompt Preview</h2>
      <pre className="text-sm text-gray-300 whitespace-pre-wrap mb-3 max-h-[50vh] overflow-auto">{text}</pre>
      <div className="flex gap-2 mb-3">
        <button className="px-3 py-1 rounded bg-brand-600 hover:bg-brand-700" onClick={copy}>Copy</button>
      </div>
      <IntegrationLinks text={text} />
    </div>
  );
}
