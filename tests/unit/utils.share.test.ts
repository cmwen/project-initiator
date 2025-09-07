import { describe, it, expect, vi } from 'vitest';
import { buildShareUrl } from '../../src/utils/share';
import { defaultState } from '../../src/types/app';

describe('share utils', () => {
  it('buildShareUrl returns current origin+path with hash', () => {
    // JSDOM default origin is about:blank; set to a fake location
    const old = window.location;
    // @ts-expect-error override for test
    delete (window as any).location;
    // @ts-expect-error assign stub
    (window as any).location = { origin: 'https://example.com', pathname: '/app/' };

    const url = buildShareUrl(defaultState);
    expect(url.startsWith('https://example.com/app/#')).toBe(true);

    // restore
    (window as any).location = old;
  });
});
