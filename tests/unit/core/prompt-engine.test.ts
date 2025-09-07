import { describe, it, expect } from 'vitest';
import { generatePrompt } from '../../../src/core/prompt-engine';
import { defaultState } from '../../../src/types/app';

describe('prompt-engine', () => {
  it('generates required sections', () => {
    const sections = generatePrompt(defaultState);
    expect(sections.length).toBeGreaterThan(0);
    expect(sections[0].heading.toLowerCase()).toContain('kick off');
  });
});
