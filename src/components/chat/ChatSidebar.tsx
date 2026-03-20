import { Hash, Lock, MessageCircle, Bell, ChevronDown, Plus, Search, Menu } from 'lucide-react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { useChat } from '@/contexts/ChatContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getInitials, currentUser } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export function ChatSidebar() {
  const { channels, activeChannelId, activeView, setActiveChannelId, setActiveView, unreadNotificationCount } = useChat();
  const [search, setSearch] = useState('');
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = useState(false);

  const channelList = channels.filter(c => c.type === 'channel');
  const dmList = channels.filter(c => c.type === 'dm');

  const filtered = (list: typeof channels) =>
    search ? list.filter(c => c.name.toLowerCase().includes(search.toLowerCase())) : list;

  const SidebarContent = (
    <div className="w-64 h-full flex flex-col" style={{ background: 'hsl(var(--sidebar-bg))', color: 'hsl(var(--sidebar-fg))' }}>
      {/* Header */}
      <div className="p-4 border-b" style={{ borderColor: 'hsl(var(--sidebar-border))' }}>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold" style={{ background: 'hsl(var(--sidebar-active))' }}>
            <span className="text-white">RC</span>
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-sm font-semibold text-white truncate">notificationhub</h1>
            <p className="text-xs" style={{ color: 'hsl(var(--sidebar-muted))' }}>Activity Hub Demo</p>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5" style={{ color: 'hsl(var(--sidebar-muted))' }} />
          <Input
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="h-8 pl-8 text-xs border-none text-white placeholder:text-[hsl(var(--sidebar-muted))]"
            style={{ background: 'hsl(var(--sidebar-hover))' }}
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">
          {/* Activity Hub Button */}
          <button
            onClick={() => setActiveView('activity-hub')}
            className={cn(
              'w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors mb-2',
              activeView === 'activity-hub'
                ? 'text-white'
                : 'hover:text-white'
            )}
            style={{
              background: activeView === 'activity-hub' ? 'hsl(var(--sidebar-active))' : 'transparent',
            }}
            onMouseEnter={e => { if (activeView !== 'activity-hub') (e.target as HTMLElement).style.background = 'hsl(var(--sidebar-hover))'; }}
            onMouseLeave={e => { if (activeView !== 'activity-hub') (e.target as HTMLElement).style.background = 'transparent'; }}
          >
            <Bell className="h-4 w-4 shrink-0" />
            <span className="flex-1 text-left">Activity Hub</span>
            {unreadNotificationCount > 0 && (
              <Badge className="h-5 min-w-[20px] px-1.5 text-[10px] bg-[hsl(var(--destructive))] text-white border-none">
                {unreadNotificationCount}
              </Badge>
            )}
          </button>

          {/* Channels */}
          <div className="mb-1">
            <div className="flex items-center justify-between px-3 py-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'hsl(var(--sidebar-muted))' }}>
                Channels
              </span>
              <Plus className="h-3.5 w-3.5 cursor-pointer opacity-60 hover:opacity-100" />
            </div>
            {filtered(channelList).map(channel => (
              <button
                key={channel.id}
                onClick={() => setActiveChannelId(channel.id)}
                className={cn(
                  'w-full flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors',
                  activeChannelId === channel.id && activeView === 'chat'
                    ? 'text-white'
                    : 'hover:text-white'
                )}
                style={{
                  background: activeChannelId === channel.id && activeView === 'chat' ? 'hsl(var(--sidebar-hover))' : 'transparent',
                }}
                onMouseEnter={e => { if (!(activeChannelId === channel.id && activeView === 'chat')) (e.target as HTMLElement).style.background = 'hsl(var(--sidebar-hover))'; }}
                onMouseLeave={e => { if (!(activeChannelId === channel.id && activeView === 'chat')) (e.target as HTMLElement).style.background = 'transparent'; }}
              >
                {channel.isPrivate ? <Lock className="h-3.5 w-3.5 shrink-0 opacity-60" /> : <Hash className="h-3.5 w-3.5 shrink-0 opacity-60" />}
                <span className={cn('flex-1 text-left truncate', channel.unreadCount > 0 && 'font-semibold text-white')}>
                  {channel.name}
                </span>
                {channel.unreadCount > 0 && (
                  <Badge className="h-5 min-w-[20px] px-1.5 text-[10px] bg-[hsl(var(--sidebar-active))] text-white border-none">
                    {channel.unreadCount}
                  </Badge>
                )}
              </button>
            ))}
          </div>

          {/* DMs */}
          <div className="mb-1">
            <div className="flex items-center justify-between px-3 py-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'hsl(var(--sidebar-muted))' }}>
                Direct Messages
              </span>
              <Plus className="h-3.5 w-3.5 cursor-pointer opacity-60 hover:opacity-100" />
            </div>
            {filtered(dmList).map(channel => (
              <button
                key={channel.id}
                onClick={() => setActiveChannelId(channel.id)}
                className={cn(
                  'w-full flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors',
                  activeChannelId === channel.id && activeView === 'chat'
                    ? 'text-white'
                    : 'hover:text-white'
                )}
                style={{
                  background: activeChannelId === channel.id && activeView === 'chat' ? 'hsl(var(--sidebar-hover))' : 'transparent',
                }}
                onMouseEnter={e => { if (!(activeChannelId === channel.id && activeView === 'chat')) (e.target as HTMLElement).style.background = 'hsl(var(--sidebar-hover))'; }}
                onMouseLeave={e => { if (!(activeChannelId === channel.id && activeView === 'chat')) (e.target as HTMLElement).style.background = 'transparent'; }}
              >
                <Avatar className="h-5 w-5">
                  <AvatarFallback className="text-[9px] bg-[hsl(var(--sidebar-active))] text-white">
                    {getInitials(channel.name)}
                  </AvatarFallback>
                </Avatar>
                <span className={cn('flex-1 text-left truncate', channel.unreadCount > 0 && 'font-semibold text-white')}>
                  {channel.name}
                </span>
                {channel.unreadCount > 0 && (
                  <Badge className="h-5 min-w-[20px] px-1.5 text-[10px] bg-[hsl(var(--sidebar-active))] text-white border-none">
                    {channel.unreadCount}
                  </Badge>
                )}
              </button>
            ))}
          </div>
        </div>
      </ScrollArea>

      {/* User */}
      <div className="p-3 border-t flex items-center gap-2" style={{ borderColor: 'hsl(var(--sidebar-border))' }}>
        <div className="relative">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-xs bg-[hsl(var(--sidebar-active))] text-white">
              {getInitials(currentUser.displayName)}
            </AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2" style={{ borderColor: 'hsl(var(--sidebar-bg))', background: 'hsl(var(--online))' }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-white truncate">{currentUser.displayName}</p>
          <p className="text-[10px]" style={{ color: 'hsl(var(--sidebar-muted))' }}>Online</p>
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        <button
          aria-label="Open sidebar"
          className="fixed top-3 left-3 z-50 inline-flex items-center justify-center rounded-md p-2 bg-[hsl(var(--sidebar-active))] text-white shadow-md md:hidden"
          onClick={() => setOpenMobile(true)}
        >
          <Menu className="h-5 w-5" />
        </button>
        <Sheet open={openMobile} onOpenChange={setOpenMobile}>
          <SheetContent side="left" className="w-[18rem] p-0">
            {SidebarContent}
          </SheetContent>
        </Sheet>
      </>
    );
  }

  return SidebarContent;
}
