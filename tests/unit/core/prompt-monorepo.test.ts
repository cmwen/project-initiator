import { describe, it, expect } from 'vitest';
import { generatePrompt } from '../../../src/core/prompt-engine';
import { defaultState } from '../../../src/types/app';

describe('prompt includes monorepo details', () => {
  it('mentions repo mode and tooling', () => {
    const s = {
      ...defaultState,
      repoMode: 'monorepo' as const,
  monorepoTooling: ['turbo', 'workspace-pnpm'] as ('turbo'|'workspace-pnpm')[],
  targets: ['web','cli','mcp'] as ('web'|'cli'|'mcp')[],
    };
    const sections = generatePrompt(s);
    const text = sections.map(x => x.content).join('\n');
    expect(text).toContain('Repository: monorepo (turbo, workspace-pnpm)');
    expect(text).toContain('Targets: web, cli, mcp');
  });
});
