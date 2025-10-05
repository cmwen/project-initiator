import { describe, it, expect } from 'vitest';
import { chatgptUrl, geminiUrl, perplexityUrl, cursorUrl } from '../../../src/core/integrations';

describe('integrations URLs', () => {
  it('encodes ChatGPT hash payload', () => {
    const u = chatgptUrl('hello world');
    expect(u).toContain('#hello%20world');
  });
  it('encodes Gemini query parameter', () => {
    const u = geminiUrl('test prompt');
    expect(u).toContain('q=test%20prompt');
    expect(u).toContain('gemini.google.com');
  });
  it('encodes Perplexity query', () => {
    const u = perplexityUrl('a b');
    expect(u).toContain('q=a%20b');
  });
  it('encodes Cursor custom protocol', () => {
    const u = cursorUrl('x+y');
    expect(u).toContain('x%2By');
  });
});
