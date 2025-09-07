export type ProjectType = 'cli' | 'web-spa' | 'web-mpa' | 'api-rest' | 'library' | 'mcp-server';
export type Runtime = 'node' | 'browser' | 'python' | 'rust' | 'go';

export interface ProjectState {
  projectType: ProjectType;
  runtime: Runtime;
  quality: {
    linting: boolean;
    testing: 'none' | 'unit' | 'integration' | 'e2e';
    ci: boolean;
    formatting: boolean;
  };
  hosting: 'github-pages' | 'vercel' | 'netlify' | 'selfhosted';
  deployment: {
    customDomain: boolean;
    seo: boolean;
    analytics: boolean;
  };
  documentation: {
    readme: boolean;
    license: 'MIT' | 'Apache-2.0' | 'GPL-3.0' | 'none';
    changelog: boolean;
    contributing: boolean;
  };
  advanced: {
    secrets: 'none' | 'env' | 'ci-secrets';
    security: boolean;
    accessibility: boolean;
  };
}

export const defaultState: ProjectState = {
  projectType: 'web-spa',
  runtime: 'browser',
  quality: { linting: true, testing: 'unit', ci: true, formatting: true },
  hosting: 'github-pages',
  deployment: { customDomain: false, seo: true, analytics: false },
  documentation: { readme: true, license: 'MIT', changelog: true, contributing: true },
  advanced: { secrets: 'none', security: true, accessibility: true }
};
