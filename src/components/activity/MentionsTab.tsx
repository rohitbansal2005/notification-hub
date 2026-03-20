import { useChat } from '@/contexts/ChatContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X, Trash2, AtSign, Hash } from 'lucide-react';
import { getInitials, formatTime } from '@/lib/mock-data';

export function MentionsTab() {
  const { notifications, removeNotification, setActiveChannelId } = useChat();
  const mentions = notifications.filter(n => n.type === 'mention');

  if (mentions.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground py-20">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <AtSign className="h-8 w-8" />
        </div>
        <p className="text-sm font-medium">No mentions</p>
        <p className="text-xs mt-1">Nobody has mentioned you yet</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex items-center justify-between px-5 py-3">
        <span className="text-xs text-muted-foreground">{mentions.length} mentions</span>
      </div>
      <ScrollArea className="flex-1 px-5">
        <div className="space-y-1 pb-4">
          {mentions.map(n => (
            <div
              key={n.id}
              className="flex items-start gap-3 p-3 rounded-lg transition-colors cursor-pointer hover:bg-muted/60 group"
              onClick={() => setActiveChannelId(n.channelId)}
            >
              <Avatar className="h-8 w-8 shrink-0 mt-0.5">
                <AvatarFallback className="text-[10px] bg-primary text-primary-foreground">
                  {getInitials(n.senderName)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">{n.senderName}</span>
                  <Badge variant="outline" className="text-[10px] h-4 px-1.5">
                    <Hash className="h-2.5 w-2.5 mr-0.5" />{n.channelName}
                  </Badge>
                </div>
                <p className="text-sm text-foreground/80 mt-1">{n.messagePreview}</p>
                <p className="text-[10px] text-muted-foreground mt-1">{formatTime(n.timestamp)}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 shrink-0 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive"
                onClick={e => { e.stopPropagation(); removeNotification(n.id); }}
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
