import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import {
  channels as initialChannels,
  messages as initialMessages,
  notifications as initialNotifications,
  starredMessages as initialStarred,
  currentUser,
  users,
  type Channel,
  type Message,
  type Notification,
  type StarredMessage,
  getUserById,
} from '@/lib/mock-data';

interface ChatContextType {
  channels: Channel[];
  messages: Message[];
  notifications: Notification[];
  starredMessages: StarredMessage[];
  activeChannelId: string | null;
  activeView: 'chat' | 'activity-hub';
  activeActivityTab: 'notifications' | 'mentions' | 'starred';
  setActiveChannelId: (id: string) => void;
  setActiveView: (view: 'chat' | 'activity-hub') => void;
  setActiveActivityTab: (tab: 'notifications' | 'mentions' | 'starred') => void;
  sendMessage: (content: string) => void;
  composerText: string;
  setComposerText: (text: string) => void;
  insertMention: (username: string) => void;
  registerComposerFocus: (fn: () => void) => void;
  toggleStarMessage: (messageId: string) => void;
  deleteMessage: (messageId: string) => void;
  removeNotification: (notificationId: string) => void;
  clearAllNotifications: () => void;
  removeStarredMessage: (starredId: string) => void;
  unreadNotificationCount: number;
}

const ChatContext = createContext<ChatContextType | null>(null);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [channels, setChannels] = useState<Channel[]>(initialChannels);
  const [messagesList, setMessages] = useState<Message[]>(initialMessages);
  const [notificationsList, setNotifications] = useState<Notification[]>(initialNotifications);
  const [starred, setStarred] = useState<StarredMessage[]>(initialStarred);
  const [activeChannelId, setActiveChannelId] = useState<string | null>('c1');
  const [activeView, setActiveView] = useState<'chat' | 'activity-hub'>('chat');
  const [activeActivityTab, setActiveActivityTab] = useState<'notifications' | 'mentions' | 'starred'>('notifications');
  const [composerText, setComposerText] = useState('');
  // focus function registered by MessageComposer to allow other components to focus it
  const focusRef = React.useRef<() => void>(() => {});

  const sendMessage = useCallback((content: string) => {
    if (!activeChannelId || !content.trim()) return;
    const newMsg: Message = {
      id: `m${Date.now()}`,
      channelId: activeChannelId,
      senderId: currentUser.id,
      content: content.trim(),
      timestamp: new Date().toISOString(),
    };
    // detect @mentions in the message (e.g. @username)
    const mentionRegex = /@([a-zA-Z0-9._-]+)/g;
    const mentions: string[] = [];
    let match;
    while ((match = mentionRegex.exec(content)) !== null) {
      const username = match[1];
      const user = users.find(u => u.username === username);
      if (user && !mentions.includes(user.id)) mentions.push(user.id);
    }
    if (mentions.length) {
      newMsg.mentions = mentions;
    }

    setMessages(prev => [...prev, newMsg]);
    // clear composer text when sending
    setComposerText('');

    // create mention notifications for each mentioned user
    if (mentions.length) {
      const channel = channels.find(c => c.id === activeChannelId);
      const now = new Date().toISOString();
      const newNotifications: Notification[] = mentions.map((userId, i) => {
        const user = getUserById(userId);
        return {
          id: `n${Date.now()}${i}`,
          type: 'mention',
          channelId: activeChannelId,
          channelName: channel?.name || '',
          senderId: currentUser.id,
          senderName: currentUser.displayName,
          messagePreview: content.trim().slice(0, 120),
          timestamp: now,
          isRead: false,
        };
      });
      setNotifications(prev => [...prev, ...newNotifications]);
    }
  }, [activeChannelId, channels]);

  const registerComposerFocus = useCallback((fn: () => void) => {
    focusRef.current = fn;
  }, []);

  const insertMention = useCallback((username: string) => {
    if (!username) return;
    setComposerText(prev => {
      const sep = prev === '' || prev.endsWith(' ') ? '' : ' ';
      return `${prev}${sep}@${username} `;
    });
    // focus the composer if available
    try { focusRef.current(); } catch (e) { /* ignore */ }
  }, []);

  const toggleStarMessage = useCallback((messageId: string) => {
    const existing = starred.find(s => s.messageId === messageId);
    if (existing) {
      setStarred(prev => prev.filter(s => s.messageId !== messageId));
      setMessages(prev => prev.map(m => m.id === messageId ? { ...m, isStarred: false } : m));
    } else {
      const msg = messagesList.find(m => m.id === messageId);
      if (!msg) return;
      const channel = channels.find(c => c.id === msg.channelId);
      const sender = getUserById(msg.senderId);
      const newStarred: StarredMessage = {
        id: `s${Date.now()}`,
        messageId: msg.id,
        channelId: msg.channelId,
        channelName: channel?.name || '',
        senderId: msg.senderId,
        senderName: sender?.displayName || '',
        content: msg.content,
        timestamp: msg.timestamp,
        starredAt: new Date().toISOString(),
      };
      setStarred(prev => [...prev, newStarred]);
      setMessages(prev => prev.map(m => m.id === messageId ? { ...m, isStarred: true } : m));
    }
  }, [starred, messagesList, channels]);

  const deleteMessage = useCallback((messageId: string) => {
    setMessages(prev => prev.filter(m => m.id !== messageId));
  }, []);

  const removeNotification = useCallback((notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  }, []);

  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  const removeStarredMessage = useCallback((starredId: string) => {
    const star = starred.find(s => s.id === starredId);
    if (star) {
      setMessages(prev => prev.map(m => m.id === star.messageId ? { ...m, isStarred: false } : m));
    }
    setStarred(prev => prev.filter(s => s.id !== starredId));
  }, [starred]);

  const unreadNotificationCount = notificationsList.filter(n => !n.isRead).length;

  const handleSetActiveChannel = useCallback((id: string) => {
    setActiveChannelId(id);
    setActiveView('chat');
    // Clear unread for that channel
    setChannels(prev => prev.map(c => c.id === id ? { ...c, unreadCount: 0 } : c));
  }, []);

  return (
    <ChatContext.Provider value={{
      channels,
      messages: messagesList,
      notifications: notificationsList,
      starredMessages: starred,
      activeChannelId,
      activeView,
      activeActivityTab,
      setActiveChannelId: handleSetActiveChannel,
      setActiveView,
      setActiveActivityTab,
      sendMessage,
      composerText,
      setComposerText,
      insertMention,
      registerComposerFocus,
      toggleStarMessage,
      deleteMessage,
      removeNotification,
      clearAllNotifications,
      removeStarredMessage,
      unreadNotificationCount,
    }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error('useChat must be used within ChatProvider');
  return ctx;
}
