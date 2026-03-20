export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  status: 'online' | 'away' | 'busy' | 'offline';
}

export interface Channel {
  id: string;
  name: string;
  type: 'channel' | 'dm';
  description?: string;
  isPrivate?: boolean;
  unreadCount: number;
  members: string[];
  lastMessage?: string;
  lastMessageTime?: string;
}

export interface Message {
  id: string;
  channelId: string;
  senderId: string;
  content: string;
  timestamp: string;
  isStarred?: boolean;
  mentions?: string[];
}

export interface Notification {
  id: string;
  type: 'message' | 'mention' | 'reaction';
  channelId: string;
  channelName: string;
  senderId: string;
  senderName: string;
  messagePreview: string;
  timestamp: string;
  isRead: boolean;
}

export interface StarredMessage {
  id: string;
  messageId: string;
  channelId: string;
  channelName: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  starredAt: string;
}

export const currentUser: User = {
  id: 'u1',
  username: 'you',
  displayName: 'You',
  avatar: '',
  status: 'online',
};

export const users: User[] = [
  currentUser,
  { id: 'u2', username: 'pierre.lehnen', displayName: 'Pierre Lehnen', avatar: '', status: 'online' },
  { id: 'u3', username: 'milton.rucks', displayName: 'Milton Rucks', avatar: '', status: 'away' },
  { id: 'u4', username: 'sarah.chen', displayName: 'Sarah Chen', avatar: '', status: 'online' },
  { id: 'u5', username: 'alex.kumar', displayName: 'Alex Kumar', avatar: '', status: 'busy' },
  { id: 'u6', username: 'maria.garcia', displayName: 'Maria Garcia', avatar: '', status: 'offline' },
];

export const channels: Channel[] = [
  { id: 'c1', name: 'general', type: 'channel', description: 'General discussion for everyone', unreadCount: 3, members: ['u1','u2','u3','u4','u5','u6'], lastMessage: 'Welcome to the team!', lastMessageTime: '2024-03-20T10:30:00Z' },
  { id: 'c2', name: 'gsoc-2024', type: 'channel', description: 'Google Summer of Code 2024 discussions', unreadCount: 5, members: ['u1','u2','u3','u4'], lastMessage: 'Activity Hub PR is ready for review', lastMessageTime: '2024-03-20T11:00:00Z' },
  { id: 'c3', name: 'activity-hub', type: 'channel', description: 'Activity Hub feature development', unreadCount: 0, members: ['u1','u2','u3'], lastMessage: 'Merged the notification tab!', lastMessageTime: '2024-03-20T09:15:00Z' },
  { id: 'c4', name: 'random', type: 'channel', description: 'Random fun stuff', unreadCount: 1, members: ['u1','u4','u5','u6'], lastMessage: 'Check this meme 😂', lastMessageTime: '2024-03-19T22:00:00Z' },
  { id: 'c5', name: 'dev-frontend', type: 'channel', description: 'Frontend development discussions', isPrivate: true, unreadCount: 0, members: ['u1','u2','u4'], lastMessage: 'React 19 looks amazing', lastMessageTime: '2024-03-19T18:30:00Z' },
  { id: 'dm1', name: 'Pierre Lehnen', type: 'dm', unreadCount: 2, members: ['u1','u2'], lastMessage: 'Great progress on the PR!', lastMessageTime: '2024-03-20T11:30:00Z' },
  { id: 'dm2', name: 'Sarah Chen', type: 'dm', unreadCount: 0, members: ['u1','u4'], lastMessage: 'Thanks for the review!', lastMessageTime: '2024-03-19T16:00:00Z' },
];

export const messages: Message[] = [
  // general
  { id: 'm1', channelId: 'c1', senderId: 'u2', content: 'Hey everyone! Welcome to the Rocket.Chat Activity Hub project 🚀', timestamp: '2024-03-20T09:00:00Z' },
  { id: 'm2', channelId: 'c1', senderId: 'u4', content: 'Excited to be here! Looking forward to contributing.', timestamp: '2024-03-20T09:05:00Z' },
  { id: 'm3', channelId: 'c1', senderId: 'u3', content: 'Welcome @sarah.chen! Feel free to ask any questions.', timestamp: '2024-03-20T09:10:00Z', mentions: ['u4'] },
  { id: 'm4', channelId: 'c1', senderId: 'u1', content: 'Thanks everyone! Really pumped about the Activity Hub feature.', timestamp: '2024-03-20T09:15:00Z' },
  { id: 'm5', channelId: 'c1', senderId: 'u5', content: '@you Have you checked the latest design mockups?', timestamp: '2024-03-20T10:00:00Z', mentions: ['u1'] },
  { id: 'm6', channelId: 'c1', senderId: 'u2', content: 'Welcome to the team!', timestamp: '2024-03-20T10:30:00Z' },
  // gsoc-2024
  { id: 'm7', channelId: 'c2', senderId: 'u2', content: 'GSoC 2024 proposals are due next week. Make sure your PRs are up to date.', timestamp: '2024-03-20T08:00:00Z' },
  { id: 'm8', channelId: 'c2', senderId: 'u1', content: 'I\'ve been working on the Activity Hub. Here\'s my progress so far:', timestamp: '2024-03-20T08:30:00Z' },
  { id: 'm9', channelId: 'c2', senderId: 'u1', content: '✅ Notification history tab\n✅ Mentions tab\n🔄 Starred messages tab (in progress)', timestamp: '2024-03-20T08:31:00Z' },
  { id: 'm10', channelId: 'c2', senderId: 'u3', content: '@you Great progress! The notification tab looks solid. Let\'s review the UX together.', timestamp: '2024-03-20T09:00:00Z', mentions: ['u1'] },
  { id: 'm11', channelId: 'c2', senderId: 'u4', content: 'I can help with the starred messages implementation if needed.', timestamp: '2024-03-20T10:00:00Z' },
  { id: 'm12', channelId: 'c2', senderId: 'u2', content: 'Activity Hub PR is ready for review', timestamp: '2024-03-20T11:00:00Z' },
  // activity-hub
  { id: 'm13', channelId: 'c3', senderId: 'u2', content: 'Let\'s track Activity Hub progress in this channel.', timestamp: '2024-03-19T14:00:00Z' },
  { id: 'm14', channelId: 'c3', senderId: 'u1', content: 'Sounds good! I\'ll push updates here.', timestamp: '2024-03-19T14:30:00Z' },
  { id: 'm15', channelId: 'c3', senderId: 'u3', content: 'Remember to handle edge cases for cleared notifications.', timestamp: '2024-03-20T08:00:00Z' },
  { id: 'm16', channelId: 'c3', senderId: 'u1', content: 'Merged the notification tab!', timestamp: '2024-03-20T09:15:00Z' },
  // random
  { id: 'm17', channelId: 'c4', senderId: 'u5', content: 'Anyone up for a virtual coffee? ☕', timestamp: '2024-03-19T20:00:00Z' },
  { id: 'm18', channelId: 'c4', senderId: 'u6', content: 'Check this meme 😂', timestamp: '2024-03-19T22:00:00Z' },
  // DM with Pierre
  { id: 'm19', channelId: 'dm1', senderId: 'u2', content: 'Hey! How\'s the Activity Hub coming along?', timestamp: '2024-03-20T11:00:00Z' },
  { id: 'm20', channelId: 'dm1', senderId: 'u1', content: 'Going well! Just finished the notification tab.', timestamp: '2024-03-20T11:15:00Z' },
  { id: 'm21', channelId: 'dm1', senderId: 'u2', content: 'Great progress on the PR!', timestamp: '2024-03-20T11:30:00Z' },
  // DM with Sarah
  { id: 'm22', channelId: 'dm2', senderId: 'u4', content: 'Can you review my PR for the channel list?', timestamp: '2024-03-19T15:00:00Z' },
  { id: 'm23', channelId: 'dm2', senderId: 'u1', content: 'Sure! I\'ll take a look this afternoon.', timestamp: '2024-03-19T15:30:00Z' },
  { id: 'm24', channelId: 'dm2', senderId: 'u4', content: 'Thanks for the review!', timestamp: '2024-03-19T16:00:00Z' },
];

export const notifications: Notification[] = [
  { id: 'n1', type: 'mention', channelId: 'c1', channelName: 'general', senderId: 'u5', senderName: 'Alex Kumar', messagePreview: '@you Have you checked the latest design mockups?', timestamp: '2024-03-20T10:00:00Z', isRead: false },
  { id: 'n2', type: 'mention', channelId: 'c2', channelName: 'gsoc-2024', senderId: 'u3', senderName: 'Milton Rucks', messagePreview: '@you Great progress! The notification tab looks solid.', timestamp: '2024-03-20T09:00:00Z', isRead: false },
  { id: 'n3', type: 'message', channelId: 'dm1', channelName: 'Pierre Lehnen', senderId: 'u2', senderName: 'Pierre Lehnen', messagePreview: 'Great progress on the PR!', timestamp: '2024-03-20T11:30:00Z', isRead: false },
  { id: 'n4', type: 'message', channelId: 'c2', channelName: 'gsoc-2024', senderId: 'u2', senderName: 'Pierre Lehnen', messagePreview: 'Activity Hub PR is ready for review', timestamp: '2024-03-20T11:00:00Z', isRead: true },
  { id: 'n5', type: 'message', channelId: 'c1', channelName: 'general', senderId: 'u2', senderName: 'Pierre Lehnen', messagePreview: 'Welcome to the team!', timestamp: '2024-03-20T10:30:00Z', isRead: true },
  { id: 'n6', type: 'message', channelId: 'c3', channelName: 'activity-hub', senderId: 'u3', senderName: 'Milton Rucks', messagePreview: 'Remember to handle edge cases for cleared notifications.', timestamp: '2024-03-20T08:00:00Z', isRead: true },
];

export const starredMessages: StarredMessage[] = [
  { id: 's1', messageId: 'm7', channelId: 'c2', channelName: 'gsoc-2024', senderId: 'u2', senderName: 'Pierre Lehnen', content: 'GSoC 2024 proposals are due next week. Make sure your PRs are up to date.', timestamp: '2024-03-20T08:00:00Z', starredAt: '2024-03-20T08:05:00Z' },
  { id: 's2', messageId: 'm10', channelId: 'c2', channelName: 'gsoc-2024', senderId: 'u3', senderName: 'Milton Rucks', content: '@you Great progress! The notification tab looks solid. Let\'s review the UX together.', timestamp: '2024-03-20T09:00:00Z', starredAt: '2024-03-20T09:05:00Z' },
  { id: 's3', messageId: 'm15', channelId: 'c3', channelName: 'activity-hub', senderId: 'u3', senderName: 'Milton Rucks', content: 'Remember to handle edge cases for cleared notifications.', timestamp: '2024-03-20T08:00:00Z', starredAt: '2024-03-20T08:10:00Z' },
  { id: 's4', messageId: 'm1', channelId: 'c1', channelName: 'general', senderId: 'u2', senderName: 'Pierre Lehnen', content: 'Hey everyone! Welcome to the Rocket.Chat Activity Hub project 🚀', timestamp: '2024-03-20T09:00:00Z', starredAt: '2024-03-20T09:02:00Z' },
];

export function getUserById(id: string): User | undefined {
  return users.find(u => u.id === id);
}

export function getChannelMessages(channelId: string): Message[] {
  return messages.filter(m => m.channelId === channelId);
}

export function formatTime(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  }
}

export function getInitials(name: string): string {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}
