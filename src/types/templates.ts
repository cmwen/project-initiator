export interface PromptSection {
  heading: string;
  content: string;
  priority: 'required' | 'recommended' | 'optional';
}

export interface PromptTemplate {
  id: string;
  name: string;
  generate: (state: any) => PromptSection[];
}
