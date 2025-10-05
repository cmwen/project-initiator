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
  | 'browser-extension'
  | 'custom';
export type Runtime = 'node' | 'browser' | 'deno' | 'bun' | 'python' | 'rust' | 'go' | 'java' | 'dotnet' | 'custom';
export type DataStore = 'none' | 'localstorage' | 'indexeddb' | 'sqlite-wasm' | 'hosted-db';

export interface ProjectState {
  projectType: ProjectType;
  projectTypes: ProjectType[];
  runtime: Runtime;
  theme?: 'system' | 'light' | 'dark';
  dataStores?: DataStore[];
  repoMode: 'single' | 'monorepo';
  customProjectType?: string;
  customRuntime?: string;
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
    agentsMd: boolean;
  };
  devEnvironment: {
    devcontainer: boolean;
    dockerCompose: boolean;
    ciPipeline: 'none' | 'github-actions' | 'gitlab-ci' | 'circleci';
    cdPipeline: boolean;
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
  runtime: 'node',
  theme: 'system',
  dataStores: [],
  repoMode: 'single',
  quality: { linting: true, testing: 'unit', ci: true, formatting: true, conventionalCommits: true },
  hosting: 'vercel',
  packaging: { npm: false, pypi: false, crates: false, docker: false, homebrew: false },
  documentation: { readme: true, license: 'MIT', changelog: false, contributing: false, codeOfConduct: false, agentsMd: true },
  devEnvironment: { devcontainer: false, dockerCompose: false, ciPipeline: 'github-actions', cdPipeline: true },
  repoSetup: { issueTemplates: false, dirStructure: true },
  advanced: { secrets: 'none', security: false },
};
