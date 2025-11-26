import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ModelSelector } from '@/components/ModelSelector';
import { ParametersPanel } from '@/components/ParametersPanel';
import { PromptEditor } from '@/components/PromptEditor';
import { ChatOutput } from '@/components/ChatOutput';
import { ThemeToggle } from '@/components/ThemeToggle';
import { fetchModels, fetchTemplates, generateResponse, Model, Template } from '@/lib/mockApi';
import { Loader2, Zap } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const Index = () => {
  const [models, setModels] = useState<Model[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>('gpt-4');
  const [prompt, setPrompt] = useState<string>('');
  const [temperature, setTemperature] = useState<number>(0.7);
  const [maxTokens, setMaxTokens] = useState<number>(1000);
  const [topP, setTopP] = useState<number>(0.9);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [modelsData, templatesData] = await Promise.all([
          fetchModels(),
          fetchTemplates(),
        ]);
        setModels(modelsData);
        setTemplates(templatesData);
      } catch (error) {
        toast.error('Failed to load data');
      } finally {
        setIsLoadingData(false);
      }
    };
    loadData();
  }, []);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt');
      return;
    }

    setIsLoading(true);
    const userMessage: Message = { role: 'user', content: prompt };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await generateResponse(prompt, selectedModel);
      const assistantMessage: Message = { role: 'assistant', content: response };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      toast.error('Failed to generate response');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId);
    if (template) {
      setPrompt(template.content);
      toast.success(`Template "${template.name}" loaded`);
    }
  };

  if (isLoadingData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-subtle">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold">AI Playground</h1>
          </motion.div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Controls */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-3"
          >
            <Card className="p-6 space-y-6 sticky top-24">
              <ModelSelector
                models={models}
                selectedModel={selectedModel}
                onModelChange={setSelectedModel}
              />
              <div className="border-t border-border pt-6">
                <ParametersPanel
                  temperature={temperature}
                  maxTokens={maxTokens}
                  topP={topP}
                  onTemperatureChange={setTemperature}
                  onMaxTokensChange={setMaxTokens}
                  onTopPChange={setTopP}
                />
              </div>
            </Card>
          </motion.div>

          {/* Main Content Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-9 space-y-6"
          >
            {/* Prompt Editor */}
            <Card className="p-6">
              <PromptEditor
                prompt={prompt}
                templates={templates}
                onPromptChange={setPrompt}
                onTemplateSelect={handleTemplateSelect}
              />
              <div className="mt-4 flex justify-end">
                <Button
                  onClick={handleGenerate}
                  disabled={isLoading || !prompt.trim()}
                  className="bg-gradient-primary hover:opacity-90 transition-opacity"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 mr-2" />
                      Generate
                    </>
                  )}
                </Button>
              </div>
            </Card>

            {/* Chat Output */}
            <Card className="p-6 min-h-[400px] flex flex-col">
              <ChatOutput messages={messages} isLoading={isLoading} />
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Index;
