import type { ProjectState } from '../types/app';
import type { PromptSection } from '../types/templates';

export function generatePrompt(state: ProjectState): PromptSection[] {
  const sections: PromptSection[] = [];
  
  // Generate title and project type description
  const isMonorepo = state.repoMode === 'monorepo';
  const projectTypes = state.projectTypes || [];
  const title = isMonorepo 
    ? `Kick off: Monorepo (${projectTypes.join(', ')})` 
    : `Kick off: ${projectTypes[0] || 'Project'}`;
  
  sections.push({
    heading: title,
    content: `Context: Building a ${isMonorepo ? 'monorepo' : 'single package'} project targeting ${state.runtime}.\n` +
      `Project Type(s): ${projectTypes.join(', ') || 'none selected'}.\n` +
      `Data Storage: ${(state.dataStores ?? []).join(', ') || 'none'}.\n` +
      `Repository Layout: ${state.repoMode}.\n` +
      `Hosting: ${state.hosting}.`,
    priority: 'required'
  });

  sections.push({
    heading: 'Quality & Automation',
    content: `Linting: ${state.quality.linting ? 'yes' : 'no'}, ` +
      `Formatting: ${state.quality.formatting ? 'yes' : 'no'}, ` +
      `Testing: ${state.quality.testing}, ` +
      `CI: ${state.quality.ci ? 'yes' : 'no'}, ` +
      `Conventional Commits: ${state.quality.conventionalCommits ? 'yes' : 'no'}.`,
    priority: 'recommended'
  });

  // Packaging section
  const enabledPackaging = Object.entries(state.packaging)
    .filter(([_, enabled]) => enabled)
    .map(([name, _]) => name);
  
  if (enabledPackaging.length > 0) {
    sections.push({
      heading: 'Packaging & Publishing',
      content: `Publishing to: ${enabledPackaging.join(', ')}.`,
      priority: 'recommended'
    });
  }

  sections.push({
    heading: 'Documentation & Compliance',
    content: `README: ${state.documentation.readme ? 'yes' : 'no'}, ` +
      `License: ${state.documentation.license}, ` +
      `Changelog: ${state.documentation.changelog ? 'yes' : 'no'}, ` +
      `Contributing Guide: ${state.documentation.contributing ? 'yes' : 'no'}, ` +
      `Code of Conduct: ${state.documentation.codeOfConduct ? 'yes' : 'no'}.`,
    priority: 'optional'
  });

  sections.push({
    heading: 'Repository Setup',
    content: `Issue Templates: ${state.repoSetup.issueTemplates ? 'yes' : 'no'}, ` +
      `Directory Structure: ${state.repoSetup.dirStructure ? 'yes' : 'no'}.`,
    priority: 'optional'
  });

  sections.push({
    heading: 'Security & Advanced',
    content: `Secrets Management: ${state.advanced.secrets}, ` +
      `Security Scanning: ${state.advanced.security ? 'yes' : 'no'}.`,
    priority: 'optional'
  });

  return sections;
}
