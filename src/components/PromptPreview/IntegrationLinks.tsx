import { integrations } from '../../core/integrations';

export function IntegrationLinks({ text }: { text: string }) {
  return (
    <div className="space-y-2">
      <div className="text-sm text-[var(--muted)]">Open in:</div>
      <div className="flex flex-wrap gap-2">
        <button className="px-3 py-1 rounded bg-brand-600 hover:bg-brand-700" onClick={() => integrations.chatgpt(text)}>ChatGPT</button>
        <button className="px-3 py-1 rounded bg-brand-600 hover:bg-brand-700" onClick={() => integrations.claude(text)}>Claude</button>
        <button className="px-3 py-1 rounded bg-brand-600 hover:bg-brand-700" onClick={() => integrations.gemini(text)}>Gemini</button>
        <button className="px-3 py-1 rounded bg-brand-600 hover:bg-brand-700" onClick={() => integrations.cursor(text)}>Cursor</button>
        <button className="px-3 py-1 rounded bg-brand-600 hover:bg-brand-700" onClick={() => integrations.perplexity(text)}>Perplexity</button>
      </div>
    </div>
  );
}
