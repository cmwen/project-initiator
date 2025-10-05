import type { ProjectState } from '../types/app';
import type { PromptSection } from '../types/templates';

export function generatePrompt(state: ProjectState): PromptSection[] {
  const sections: PromptSection[] = [];
  
  // Generate title and project type description
  const isMonorepo = state.repoMode === 'monorepo';
  const projectTypes = state.projectTypes || [];
  
  // Handle custom project types
  const displayProjectTypes = projectTypes.map(type => {
    if (type === 'custom' && state.customProjectType) {
      return state.customProjectType;
    }
    return type;
  });
  
  const title = isMonorepo 
    ? `Kick off: Monorepo (${displayProjectTypes.join(', ')})` 
    : `Kick off: ${displayProjectTypes[0] || 'Project'}`;
  
  // Handle custom runtime
  const displayRuntime = state.runtime === 'custom' && state.customRuntime 
    ? state.customRuntime 
    : state.runtime;
  
  sections.push({
    heading: title,
    content: `Context: Building a ${isMonorepo ? 'monorepo' : 'single package'} project targeting ${displayRuntime}.\n` +
      `Project Type(s): ${displayProjectTypes.join(', ') || 'none selected'}.\n` +
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
      `AGENTS.md: ${state.documentation.agentsMd ? 'yes' : 'no'}, ` +
      `License: ${state.documentation.license}, ` +
      `Changelog: ${state.documentation.changelog ? 'yes' : 'no'}, ` +
      `Contributing Guide: ${state.documentation.contributing ? 'yes' : 'no'}, ` +
      `Code of Conduct: ${state.documentation.codeOfConduct ? 'yes' : 'no'}.`,
    priority: 'optional'
  });

  // Dev Environment & CI/CD section
  const cicdContent = [];
  if (state.devEnvironment.devcontainer) {
    cicdContent.push('Devcontainer configuration for consistent development environment');
  }
  if (state.devEnvironment.dockerCompose) {
    cicdContent.push('Docker Compose for local service orchestration');
  }
  if (state.devEnvironment.ciPipeline !== 'none') {
    cicdContent.push(`CI Pipeline: ${state.devEnvironment.ciPipeline} with build, test, and lint steps`);
  }
  if (state.devEnvironment.cdPipeline) {
    cicdContent.push(`CD Pipeline: Automated deployment to ${state.hosting}`);
  }

  if (cicdContent.length > 0) {
    sections.push({
      heading: 'Development Environment & CI/CD',
      content: cicdContent.join('.\n'),
      priority: 'recommended'
    });
  }

  // AGENTS.md specific content
  if (state.documentation.agentsMd) {
    sections.push({
      heading: 'AGENTS.md Requirements',
      content: `Create an AGENTS.md file documenting:\n` +
        `- Project architecture and key design decisions\n` +
        `- Coding agent instructions and context\n` +
        `- Common development workflows and patterns\n` +
        `- Testing strategies and quality standards\n` +
        `- Deployment procedures and environment setup\n` +
        `- Integration patterns and external dependencies`,
      priority: 'recommended'
    });
  }

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
