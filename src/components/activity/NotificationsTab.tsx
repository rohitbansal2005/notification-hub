import { useChat } from '@/contexts/ChatContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X, Trash2, Hash, MessageCircle } from 'lucide-react';
import { getInitials, formatTime } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export function NotificationsTab() {
  const { notifications, removeNotification, clearAllNotifications, setActiveChannelId } = useChat();

  if (notifications.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground py-20">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <MessageCircle className="h-8 w-8" />
        </div>
        <p className="text-sm font-medium">No notifications</p>
        <p className="text-xs mt-1">You're all caught up!</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex items-center justify-between px-3 sm:px-5 py-3">
        <span className="text-xs text-muted-foreground">{notifications.length} notifications</span>
        <Button variant="ghost" size="sm" className="text-xs text-destructive hover:text-destructive" onClick={clearAllNotifications}>
          <Trash2 className="h-3.5 w-3.5 mr-1" /> Clear All
        </Button>
      </div>
      <ScrollArea className="flex-1 px-3 sm:px-5 max-h-[28rem] md:max-h-[36rem]">
        <div className="space-y-1 pb-4">
          {notifications.map(n => (
            <div
              key={n.id}
              className={cn(
                'flex items-start gap-3 p-2 sm:p-3 rounded-lg transition-colors cursor-pointer hover:bg-muted/60 group',
                !n.isRead && 'bg-primary/5 border-l-2 border-l-primary'
              )}
              onClick={() => setActiveChannelId(n.channelId)}
            >
              <Avatar className="h-7 w-7 sm:h-8 sm:w-8 shrink-0 mt-0.5">
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
                  {n.type === 'mention' && (
                    <Badge className="text-[10px] h-4 px-1.5 bg-primary/10 text-primary border-primary/20">mention</Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 truncate">{n.messagePreview}</p>
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
