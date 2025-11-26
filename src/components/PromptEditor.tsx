import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Template } from '@/lib/mockApi';
import { FileText, Save } from 'lucide-react';
import { toast } from 'sonner';

interface PromptEditorProps {
  prompt: string;
  templates: Template[];
  onPromptChange: (value: string) => void;
  onTemplateSelect: (templateId: string) => void;
}

export const PromptEditor = ({ prompt, templates, onPromptChange, onTemplateSelect }: PromptEditorProps) => {
  const handleSaveTemplate = () => {
    if (!prompt.trim()) {
      toast.error('Cannot save empty template');
      return;
    }
    
    // In a real app, this would save to backend/localStorage
    toast.success('Template saved successfully');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label htmlFor="prompt" className="text-sm font-medium flex items-center gap-2">
          <FileText className="h-4 w-4 text-primary" />
          Prompt
        </Label>
        <div className="flex gap-2">
          <Select onValueChange={onTemplateSelect}>
            <SelectTrigger className="w-[180px] h-8">
              <SelectValue placeholder="Load template" />
            </SelectTrigger>
            <SelectContent className="bg-popover z-50">
              {templates.map((template) => (
                <SelectItem key={template.id} value={template.id}>
                  {template.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button size="sm" variant="outline" onClick={handleSaveTemplate}>
            <Save className="h-3.5 w-3.5 mr-1" />
            Save
          </Button>
        </div>
      </div>
      <Textarea
        id="prompt"
        placeholder="Enter your prompt here..."
        value={prompt}
        onChange={(e) => onPromptChange(e.target.value)}
        className="min-h-[200px] font-mono text-sm resize-none"
      />
    </div>
  );
};
