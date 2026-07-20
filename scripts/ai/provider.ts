import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { createAnthropic } from '@ai-sdk/anthropic';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import type { LanguageModelV1 } from 'ai';

export type AIProviderName =
  | 'openai'
  | 'anthropic'
  | 'google'
  | 'deepseek'
  | 'nvidia-nim';

interface ProviderFactory {
  create(): LanguageModelV1;
}

const NVIDIA_NIM_BASE_URL = 'https://integrate.api.nvidia.com/v1';
const NVIDIA_NIM_DEFAULT_MODEL = 'stepfun-ai/step-3.5-flash';

const providers: Record<AIProviderName, ProviderFactory> = {
  openai: {
    create() {
      // Supports any OpenAI-compatible endpoint via OPENAI_BASE_URL
      const openai = createOpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        baseURL: process.env.OPENAI_BASE_URL || undefined,
      });
      return openai(process.env.AI_MODEL || 'gpt-4o') as LanguageModelV1;
    },
  },
  anthropic: {
    create() {
      const anthropic = createAnthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
      return anthropic(process.env.AI_MODEL || 'claude-sonnet-4-20250514') as LanguageModelV1;
    },
  },
  google: {
    create() {
      const google = createGoogleGenerativeAI({
        apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
      });
      return google(process.env.AI_MODEL || 'gemini-2.0-flash') as LanguageModelV1;
    },
  },
  deepseek: {
    create() {
      // DeepSeek uses OpenAI-compatible API
      const deepseek = createOpenAI({
        apiKey: process.env.DEEPSEEK_API_KEY,
        baseURL: 'https://api.deepseek.com',
      });
      return deepseek(process.env.AI_MODEL || 'deepseek-chat') as LanguageModelV1;
    },
  },
  'nvidia-nim': {
    create() {
      // NVIDIA NIM OpenAI-compatible API
      // https://integrate.api.nvidia.com/v1
      const nim = createOpenAI({
        apiKey: process.env.OPENAI_API_KEY || process.env.NVIDIA_API_KEY,
        baseURL: process.env.OPENAI_BASE_URL || NVIDIA_NIM_BASE_URL,
      });
      return nim(process.env.AI_MODEL || NVIDIA_NIM_DEFAULT_MODEL) as LanguageModelV1;
    },
  },
};

export function getModel(): LanguageModelV1 {
  // Treat empty string as unset (GitHub Actions may inject empty env vars)
  const providerName = (process.env.AI_PROVIDER || 'nvidia-nim') as AIProviderName;
  const factory = providers[providerName];
  if (!factory) {
    const available = Object.keys(providers).join(', ');
    throw new Error(`Unknown AI provider "${providerName}". Available: ${available}`);
  }
  return factory.create();
}

export async function aiGenerate(prompt: string): Promise<string> {
  const model = getModel();
  const { text } = await generateText({ model, prompt, maxTokens: 16000 });
  return text;
}
