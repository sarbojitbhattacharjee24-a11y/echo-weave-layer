// Mock API for models and templates

export interface Model {
  id: string;
  name: string;
  provider: string;
  maxTokens: number;
}

export interface Template {
  id: string;
  name: string;
  content: string;
  category: string;
}

export const models: Model[] = [
  { id: 'gpt-4', name: 'GPT-4', provider: 'OpenAI', maxTokens: 8192 },
  { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', provider: 'OpenAI', maxTokens: 4096 },
  { id: 'claude-3-opus', name: 'Claude 3 Opus', provider: 'Anthropic', maxTokens: 4096 },
  { id: 'claude-3-sonnet', name: 'Claude 3 Sonnet', provider: 'Anthropic', maxTokens: 4096 },
  { id: 'custom', name: 'Custom Model', provider: 'Custom', maxTokens: 2048 },
];

export const templates: Template[] = [
  {
    id: '1',
    name: 'Code Review',
    content: 'Review the following code and provide suggestions for improvement:\n\n',
    category: 'Development',
  },
  {
    id: '2',
    name: 'Creative Writing',
    content: 'Write a creative story about:\n\n',
    category: 'Writing',
  },
  {
    id: '3',
    name: 'Data Analysis',
    content: 'Analyze this data and provide insights:\n\n',
    category: 'Analysis',
  },
  {
    id: '4',
    name: 'Translation',
    content: 'Translate the following text to [target language]:\n\n',
    category: 'Language',
  },
];

export const fetchModels = (): Promise<Model[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(models), 300);
  });
};

export const fetchTemplates = (): Promise<Template[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(templates), 300);
  });
};

export const generateResponse = (prompt: string, model: string): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        `This is a mock response from ${model}. In a real implementation, this would call the actual AI model API.\n\nYour prompt was: "${prompt}"`
      );
    }, 1500);
  });
};
