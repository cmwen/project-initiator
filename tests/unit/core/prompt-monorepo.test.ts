import { describe, it, expect } from 'vitest';
import { generatePrompt } from '../../../src/core/prompt-engine';
import { defaultState } from '../../../src/types/app';
import type { ProjectType } from '../../../src/types/app';

describe('prompt includes monorepo details', () => {
  it('mentions repo mode and project types', () => {
    const s = {
      ...defaultState,
      repoMode: 'monorepo' as const,
      projectTypes: ['web-spa', 'cli', 'mcp-server'] as ProjectType[],
    };
    const sections = generatePrompt(s);
    const text = sections.map(x => x.content).join('\n');
    const headings = sections.map(x => x.heading).join('\n');
    
    // Check the title/heading
    expect(headings).toContain('Kick off: Monorepo (web-spa, cli, mcp-server)');
    
    // Check the content
    expect(text).toContain('Repository Layout: monorepo');
    expect(text).toContain('Project Type(s): web-spa, cli, mcp-server');
  });
});
