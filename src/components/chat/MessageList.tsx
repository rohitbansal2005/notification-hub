import { useChat } from '@/contexts/ChatContext';
import { getUserById, getInitials, formatTime, currentUser } from '@/lib/mock-data';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Star, Trash2, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function MessageList() {
  const { messages, activeChannelId, channels, toggleStarMessage, deleteMessage, starredMessages, insertMention } = useChat();
  const channelMessages = messages.filter(m => m.channelId === activeChannelId);
  const channel = channels.find(c => c.id === activeChannelId);

  if (!channel) return null;

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Channel Header */}
      <div className="h-14 px-5 flex items-center gap-3 border-b border-border bg-card shrink-0">
        <h2 className="font-semibold text-foreground">
          {channel.type === 'channel' ? '#' : ''} {channel.name}
        </h2>
        {channel.description && (
          <span className="text-xs text-muted-foreground hidden sm:inline">— {channel.description}</span>
        )}
        <div className="ml-auto text-xs text-muted-foreground">
          {channel.members.length} members
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 px-5 py-4">
        <div className="space-y-0.5">
          {channelMessages.map((msg, i) => {
            const sender = getUserById(msg.senderId);
            if (!sender) return null;
            const isOwn = msg.senderId === currentUser.id;
            const prevMsg = channelMessages[i - 1];
            const showHeader = !prevMsg || prevMsg.senderId !== msg.senderId;
            const isStarred = starredMessages.some(s => s.messageId === msg.id);

            return (
              <div
                key={msg.id}
                className={cn(
                  'group relative px-3 py-1 rounded-md transition-colors hover:bg-muted/50',
                  showHeader && 'mt-4 pt-2'
                )}
              >
                {showHeader && (
                  <div className="flex items-center gap-2.5 mb-1">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-[10px] bg-primary text-primary-foreground">
                        {getInitials(sender.displayName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex items-baseline gap-2">
                      <span
                        className="font-semibold text-sm text-foreground cursor-pointer hover:underline"
                        onClick={() => insertMention(sender.username)}
                        title={`Mention ${sender.displayName}`}
                      >
                        {sender.displayName}
                      </span>
                      <span className="text-xs text-muted-foreground">{sender.username}</span>
                    </div>
                    <span className="text-[11px] text-muted-foreground">{formatTime(msg.timestamp)}</span>
                    {isStarred && <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />}
                  </div>
                )}
                <div className={cn('text-sm text-foreground/90', showHeader ? 'pl-[42px]' : 'pl-[42px]')}>
                  {msg.content.split('\n').map((line, li) => (
                    <p key={li} className={li > 0 ? 'mt-0.5' : ''}>{line}</p>
                  ))}
                </div>
                {/* Actions */}
                <div className="absolute right-2 top-1 hidden group-hover:flex items-center gap-0.5 bg-card border border-border rounded-md shadow-sm p-0.5">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => toggleStarMessage(msg.id)}
                    title={isStarred ? 'Unstar' : 'Star'}
                  >
                    <Star className={cn('h-3.5 w-3.5', isStarred ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground')} />
                  </Button>
                  {isOwn && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-muted-foreground hover:text-destructive"
                      onClick={() => deleteMessage(msg.id)}
                      title="Delete"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
