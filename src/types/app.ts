export type ProjectType =
  | 'cli'
  | 'web-spa'
  | 'web-mpa'
  | 'api-rest'
  | 'api-graphql'
  | 'library'
  | 'mcp-server'
  | 'mcp-client'
  | 'vscode-extension'
  | 'browser-extension';
export type Runtime = 'node' | 'browser' | 'deno' | 'bun' | 'python' | 'rust' | 'go' | 'java' | 'dotnet';
export type DataStore = 'none' | 'localstorage' | 'indexeddb' | 'sqlite-wasm' | 'hosted-db';

export interface ProjectState {
  projectType: ProjectType;
  projectTypes: ProjectType[];
  runtime: Runtime;
  theme?: 'system' | 'light' | 'dark';
  dataStores?: DataStore[];
  repoMode: 'single' | 'monorepo';
  quality: {
    linting: boolean;
    testing: 'none' | 'unit' | 'e2e';
    ci: boolean;
    formatting: boolean;
    conventionalCommits: boolean;
  };
  hosting: 'github-pages' | 'vercel' | 'netlify' | 'selfhosted';
  packaging: {
    npm: boolean;
    pypi: boolean;
    crates: boolean;
    docker: boolean;
    homebrew: boolean;
  };
  documentation: {
    readme: boolean;
    license: 'MIT' | 'Apache-2.0' | 'GPL-3.0' | 'none';
    changelog: boolean;
    contributing: boolean;
    codeOfConduct: boolean;
  };
  repoSetup: {
    issueTemplates: boolean;
    dirStructure: boolean;
  };
  advanced: {
    secrets: 'none' | 'env' | 'ci-secrets';
    security: boolean;
  };
}

export const defaultState: ProjectState = {
  projectType: 'web-spa',
  projectTypes: ['web-spa'],
  runtime: 'browser',
  theme: 'system',
  dataStores: [],
  repoMode: 'single',
  quality: { linting: true, testing: 'unit', ci: true, formatting: true, conventionalCommits: true },
  hosting: 'github-pages',
  packaging: { npm: false, pypi: false, crates: false, docker: false, homebrew: false },
  documentation: { readme: true, license: 'MIT', changelog: false, contributing: false, codeOfConduct: false },
  repoSetup: { issueTemplates: false, dirStructure: true },
  advanced: { secrets: 'none', security: false },
};
