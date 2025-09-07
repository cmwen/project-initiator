import { describe, it, expect } from 'vitest';
import { appState } from '../../../src/core/state';

describe('appState persistence', () => {
  it('allows subscribing and emits on set()', () => {
    let seen = 0;
    const unsub = appState.subscribe(() => { seen++; });
    appState.set({ runtime: 'node' as any });
    unsub();
    expect(seen).toBeGreaterThan(0);
  });
});
