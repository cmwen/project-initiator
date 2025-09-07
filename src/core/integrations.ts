// URL-based deep links to assistants (DD-007)
function open(u: string) {
  window.open(u, '_blank', 'noopener,noreferrer');
}

function enc(s: string) {
  return encodeURIComponent(s);
}

export function chatgptUrl(prompt: string) {
  return `https://chat.openai.com/?model=gpt-4o#${enc(prompt)}`;
}
export function claudeUrl() {
  return `https://claude.ai/new`;
}
export function perplexityUrl(prompt: string) {
  return `https://www.perplexity.ai/?q=${enc(prompt)}`;
}
export function cursorUrl(prompt: string) {
  return `cursor://chat?text=${enc(prompt)}`;
}

export const integrations = {
  chatgpt(prompt: string) { open(chatgptUrl(prompt)); },
  claude(prompt: string) { open(claudeUrl()); },
  perplexity(prompt: string) { open(perplexityUrl(prompt)); },
  cursor(prompt: string) { open(cursorUrl(prompt)); }
};
