import { useChat } from '@/contexts/ChatContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Bell, AtSign, Star } from 'lucide-react';
import { NotificationsTab } from './NotificationsTab';
import { MentionsTab } from './MentionsTab';
import { StarredTab } from './StarredTab';

export function ActivityHub() {
  const { activeActivityTab, setActiveActivityTab, notifications, starredMessages } = useChat();
  const mentionCount = notifications.filter(n => n.type === 'mention').length;
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-card">
      <div className="px-5 pt-5 pb-0">
        <h1 className="text-xl font-bold text-foreground mb-1">Activity Hub</h1>
        <p className="text-xs text-muted-foreground mb-4">Track your notifications, mentions, and starred messages</p>
      </div>
      <Tabs
        value={activeActivityTab}
        onValueChange={v => setActiveActivityTab(v as any)}
        className="flex-1 flex flex-col min-h-0"
      >
        <div className="px-5">
          <TabsList className="w-full justify-start bg-muted/50 h-10">
            <TabsTrigger value="notifications" className="gap-1.5 text-xs">
              <Bell className="h-3.5 w-3.5" />
              Notifications
              {unreadCount > 0 && (
                <Badge className="h-4 min-w-[16px] px-1 text-[9px] bg-destructive text-destructive-foreground border-none ml-1">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="mentions" className="gap-1.5 text-xs">
              <AtSign className="h-3.5 w-3.5" />
              Mentions
              {mentionCount > 0 && (
                <Badge className="h-4 min-w-[16px] px-1 text-[9px] bg-primary/20 text-primary border-none ml-1">
                  {mentionCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="starred" className="gap-1.5 text-xs">
              <Star className="h-3.5 w-3.5" />
              Starred
              {starredMessages.length > 0 && (
                <Badge className="h-4 min-w-[16px] px-1 text-[9px] bg-yellow-500/20 text-yellow-600 border-none ml-1">
                  {starredMessages.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="notifications" className="flex-1 mt-0 min-h-0">
          <NotificationsTab />
        </TabsContent>
        <TabsContent value="mentions" className="flex-1 mt-0 min-h-0">
          <MentionsTab />
        </TabsContent>
        <TabsContent value="starred" className="flex-1 mt-0 min-h-0">
          <StarredTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
