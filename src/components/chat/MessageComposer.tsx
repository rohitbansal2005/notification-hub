import { useState, KeyboardEvent } from 'react';
import { useChat } from '@/contexts/ChatContext';
import { Button } from '@/components/ui/button';
import { Send, Paperclip, Smile } from 'lucide-react';

export function MessageComposer() {
  const [text, setText] = useState('');
  const { sendMessage, activeChannelId, channels } = useChat();
  const channel = channels.find(c => c.id === activeChannelId);

  const handleSend = () => {
    if (!text.trim()) return;
    sendMessage(text);
    setText('');
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!channel) return null;

  return (
    <div className="px-5 py-3 border-t border-border bg-card">
      <div className="flex items-end gap-2 rounded-lg border border-input bg-background p-2">
        <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 text-muted-foreground">
          <Paperclip className="h-4 w-4" />
        </Button>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`Message #${channel.name}`}
          rows={1}
          className="flex-1 bg-transparent text-sm resize-none outline-none min-h-[32px] max-h-[120px] py-1.5 text-foreground placeholder:text-muted-foreground"
        />
        <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 text-muted-foreground">
          <Smile className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          className="h-8 w-8 shrink-0"
          onClick={handleSend}
          disabled={!text.trim()}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
