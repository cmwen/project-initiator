import { describe, it, expect } from 'vitest';
import { generatePrompt } from '../../../src/core/prompt-engine';
import { defaultState } from '../../../src/types/app';

describe('prompt-engine', () => {
  it('generates required sections', () => {
    const sections = generatePrompt(defaultState);
    expect(sections.length).toBeGreaterThan(0);
    expect(sections[0].heading.toLowerCase()).toContain('kick off');
  });

  it('handles custom project type', () => {
    const state = { 
      ...defaultState, 
      projectTypes: ['custom'],
      customProjectType: 'Desktop Application'
    };
    const sections = generatePrompt(state);
    const content = sections.map(s => s.content).join('\n');
    expect(content).toContain('Desktop Application');
  });

  it('handles custom runtime', () => {
    const state = { 
      ...defaultState, 
      runtime: 'custom' as any,
      customRuntime: 'PHP'
    };
    const sections = generatePrompt(state);
    const content = sections.map(s => s.content).join('\n');
    expect(content).toContain('PHP');
  });

  it('includes AGENTS.md when enabled', () => {
    const state = {
      ...defaultState,
      documentation: { ...defaultState.documentation, agentsMd: true }
    };
    const sections = generatePrompt(state);
    const headings = sections.map(s => s.heading).join('\n');
    expect(headings).toContain('AGENTS.md');
  });

  it('includes devcontainer in prompt when enabled', () => {
    const state = {
      ...defaultState,
      devEnvironment: { ...defaultState.devEnvironment, devcontainer: true }
    };
    const sections = generatePrompt(state);
    const content = sections.map(s => s.content).join('\n');
    expect(content).toContain('Devcontainer');
  });

  it('includes CI/CD pipeline configuration', () => {
    const state = {
      ...defaultState,
      devEnvironment: { 
        ...defaultState.devEnvironment, 
        ciPipeline: 'github-actions',
        cdPipeline: true
      }
    };
    const sections = generatePrompt(state);
    const content = sections.map(s => s.content).join('\n');
    expect(content).toContain('github-actions');
    expect(content).toContain('CD Pipeline');
  });

  it('omits CI/CD section when all options disabled', () => {
    const state = {
      ...defaultState,
      devEnvironment: {
        devcontainer: false,
        dockerCompose: false,
        ciPipeline: 'none',
        cdPipeline: false
      }
    };
    const sections = generatePrompt(state);
    const headings = sections.map(s => s.heading).join('\n');
    expect(headings).not.toContain('CI/CD');
  });
});
