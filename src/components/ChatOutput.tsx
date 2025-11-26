import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Download, Loader2, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatOutputProps {
  messages: Message[];
  isLoading: boolean;
}

export const ChatOutput = ({ messages, isLoading }: ChatOutputProps) => {
  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success('Copied to clipboard');
  };

  const handleDownload = () => {
    const jsonData = JSON.stringify({ messages }, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Chat downloaded');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-medium">Output</h3>
        </div>
        {messages.length > 0 && (
          <Button size="sm" variant="outline" onClick={handleDownload}>
            <Download className="h-3.5 w-3.5 mr-1" />
            Download JSON
          </Button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-muted/30 rounded-lg border border-border">
        <AnimatePresence mode="popLayout">
          {messages.length === 0 && !isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full flex items-center justify-center text-muted-foreground text-sm"
            >
              No messages yet. Start by entering a prompt and clicking Generate.
            </motion.div>
          ) : (
            messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className={`p-4 ${message.role === 'user' ? 'bg-secondary' : 'bg-card'}`}>
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <span className="text-xs font-medium text-muted-foreground uppercase">
                      {message.role === 'user' ? 'You' : 'Assistant'}
                    </span>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0"
                      onClick={() => handleCopy(message.content)}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                  <p className="text-sm whitespace-pre-wrap font-mono leading-relaxed">{message.content}</p>
                </Card>
              </motion.div>
            ))
          )}

          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <Loader2 className="h-4 w-4 animate-spin" />
              Generating response...
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
