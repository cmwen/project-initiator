export type ProjectType = 'cli' | 'web-spa' | 'web-mpa' | 'api-rest' | 'library' | 'mcp-server';
export type Runtime = 'node' | 'browser' | 'python' | 'rust' | 'go';

export interface ProjectState {
  projectType: ProjectType;
  runtime: Runtime;
  theme?: 'system' | 'light' | 'dark';
  targets?: Array<'web' | 'cli' | 'mobile' | 'mcp' | 'api' | 'library'>;
  runtimes?: Runtime[];
  mobilePlatforms?: Array<'ios' | 'android'>;
  dataStores?: Array<'file' | 'database' | 'cloud'>;
  features?: Array<'dark-theme' | 'cli' | 'mobile-app'>;
  repoMode?: 'single' | 'monorepo';
  monorepoTooling?: Array<'workspace-npm' | 'workspace-pnpm' | 'workspace-yarn' | 'turbo' | 'nx'>;
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
  theme: 'system',
  targets: ['web'],
  runtimes: ['browser'],
  mobilePlatforms: [],
  dataStores: ['file'],
  features: ['dark-theme'],
  repoMode: 'single',
  monorepoTooling: [],
  quality: { linting: true, testing: 'unit', ci: true, formatting: true },
  hosting: 'github-pages',
  deployment: { customDomain: false, seo: true, analytics: false },
  documentation: { readme: true, license: 'MIT', changelog: true, contributing: true },
  advanced: { secrets: 'none', security: true, accessibility: true }
};
