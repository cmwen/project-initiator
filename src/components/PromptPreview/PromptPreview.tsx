import { useEffect, useMemo, useState } from 'preact/hooks';
import { appState } from '../../core/state';
import { generatePrompt } from '../../core/prompt-engine';
import type { ProjectState } from '../../types/app';
import { IntegrationLinks } from './IntegrationLinks';
import { buildShareUrl, downloadJson } from '../../utils/share';

export function PromptPreview() {
  const [state, setState] = useState<ProjectState>(appState.get());
  useEffect(() => appState.subscribe(setState), []);

  const sections = useMemo(() => generatePrompt(state), [state]);
  const text = sections.map(s => `# ${s.heading}\n${s.content}`).join('\n\n');

  const [copied, setCopied] = useState(false);
  function copy() {
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(true);
      const duration = 1500;
      const id = window.setTimeout(() => setCopied(false), duration);
      return () => window.clearTimeout(id);
    });
  }

  return (
    <div>
      <h2 className="text-lg font-medium mb-2">Live Prompt Preview</h2>
      <pre className="text-sm text-gray-300 whitespace-pre-wrap mb-3 max-h-[50vh] overflow-auto">{text}</pre>
      <div className="flex flex-wrap gap-2 mb-3">
        <button aria-label="Copy prompt to clipboard" className="px-3 py-1 rounded bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-600" onClick={copy}>Copy</button>
        <button aria-label="Share via URL" className="px-3 py-1 rounded bg-brand-600 hover:bg-brand-700" onClick={() => navigator.clipboard?.writeText(buildShareUrl(state))}>Share URL</button>
        <button aria-label="Export state as JSON" className="px-3 py-1 rounded bg-brand-600 hover:bg-brand-700" onClick={() => downloadJson(state)}>Export JSON</button>
      </div>
      {copied && (
        <div role="status" aria-live="polite" className="mb-3 text-xs text-green-300">Copied to clipboard</div>
      )}
      <IntegrationLinks text={text} />
    </div>
  );
}
