import { useChat } from '@/contexts/ChatContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Star, Hash } from 'lucide-react';
import { getInitials, formatTime } from '@/lib/mock-data';

export function StarredTab() {
  const { starredMessages, removeStarredMessage, setActiveChannelId } = useChat();

  if (starredMessages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground py-20">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <Star className="h-8 w-8" />
        </div>
        <p className="text-sm font-medium">No starred messages</p>
        <p className="text-xs mt-1">Star important messages to find them here</p>
      </div>
    );
  }

  // Group by channel
  const grouped = starredMessages.reduce((acc, s) => {
    if (!acc[s.channelId]) acc[s.channelId] = { channelName: s.channelName, items: [] };
    acc[s.channelId].items.push(s);
    return acc;
  }, {} as Record<string, { channelName: string; items: typeof starredMessages }>);

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex items-center justify-between px-5 py-3">
        <span className="text-xs text-muted-foreground">{starredMessages.length} starred messages</span>
      </div>
      <ScrollArea className="flex-1 px-5">
        <div className="space-y-4 pb-4">
          {Object.entries(grouped).map(([channelId, { channelName, items }]) => (
            <div key={channelId}>
              <div className="flex items-center gap-1.5 mb-2">
                <Hash className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{channelName}</span>
              </div>
              <div className="space-y-1">
                {items.map(s => (
                  <div
                    key={s.id}
                    className="flex items-start gap-3 p-3 rounded-lg transition-colors cursor-pointer hover:bg-muted/60 group"
                    onClick={() => setActiveChannelId(channelId)}
                  >
                    <Avatar className="h-8 w-8 shrink-0 mt-0.5">
                      <AvatarFallback className="text-[10px] bg-primary text-primary-foreground">
                        {getInitials(s.senderName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground">{s.senderName}</span>
                        <span className="text-[10px] text-muted-foreground">{formatTime(s.timestamp)}</span>
                      </div>
                      <p className="text-sm text-foreground/80 mt-0.5">{s.content}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 shrink-0 opacity-0 group-hover:opacity-100 text-yellow-500 hover:text-yellow-600"
                      onClick={e => { e.stopPropagation(); removeStarredMessage(s.id); }}
                      title="Unstar"
                    >
                      <Star className="h-3.5 w-3.5 fill-current" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
