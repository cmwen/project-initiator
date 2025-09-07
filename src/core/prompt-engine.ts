import type { ProjectState } from '../types/app';
import type { PromptSection } from '../types/templates';

export function generatePrompt(state: ProjectState): PromptSection[] {
  const sections: PromptSection[] = [];
  sections.push({
    heading: `Kick off: ${state.projectType}`,
    content: `Context: Building a ${state.projectType} targeting ${state.runtime}.\n` +
      `Targets: ${(state.targets ?? ['web']).join(', ')}.\n` +
      `Runtimes: ${(state.runtimes ?? [state.runtime]).join(', ')}.\n` +
      (state.mobilePlatforms && state.mobilePlatforms.length ? `Mobile: ${state.mobilePlatforms.join(', ')}.\n` : '') +
      `Data: ${(state.dataStores ?? ['file']).join(', ')}.\n` +
      `Features: ${(state.features ?? []).join(', ') || 'none'}.\n` +
  `Repository: ${(state.repoMode ?? 'single')}${state.repoMode === 'monorepo' ? ` (${(state.monorepoTooling ?? []).join(', ') || 'no tooling selected'})` : ''}.\n` +
  `Hosting: ${state.hosting}.`,
    priority: 'required'
  });

  sections.push({
    heading: 'Quality & Automation',
    content: `Linting: ${state.quality.linting ? 'yes' : 'no'}, Testing: ${state.quality.testing}, CI: ${state.quality.ci ? 'yes' : 'no'}, Formatting: ${state.quality.formatting ? 'yes' : 'no'}.`,
    priority: 'recommended'
  });

  sections.push({
    heading: 'Docs & Advanced',
    content: `Docs: README ${state.documentation.readme ? 'yes' : 'no'}, License ${state.documentation.license}. Accessibility: ${state.advanced.accessibility ? 'yes' : 'no'}.`,
    priority: 'optional'
  });

  return sections;
}
