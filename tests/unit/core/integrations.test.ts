import { describe, it, expect } from 'vitest';
import { chatgptUrl, perplexityUrl, cursorUrl } from '../../../src/core/integrations';

describe('integrations URLs', () => {
  it('encodes ChatGPT hash payload', () => {
    const u = chatgptUrl('hello world');
    expect(u).toContain('#hello%20world');
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
