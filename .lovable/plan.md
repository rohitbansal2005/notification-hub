

## Rocket.Chat Activity Hub — GSoC Proposal Demo

A modern chat application with core messaging features and the **Activity Hub** — your GSoC contribution highlight.

### Authentication
- Sign up / Login with email & password via Supabase Auth
- User profiles with avatar and display name

### Core Chat Features
- **Channels**: Browse, create, and join public/private channels
- **Direct Messages**: 1-on-1 conversations with other users
- **Message Composer**: Send text messages with timestamps and sender info
- **Message Actions**: Star messages, reply, delete own messages
- **Channel Sidebar**: List of joined channels and DMs with unread indicators

### Activity Hub (Main GSoC Feature)
A dedicated screen accessible from the sidebar with three tabs:

1. **Notifications History**
   - Chronological list of all notifications (new messages in joined channels, @mentions)
   - Each item shows: channel name, sender, message preview, timestamp
   - "Remove" button per item + "Clear All" button
   
2. **Mentions**
   - Filtered view of messages where the user was @mentioned
   - Shows context: channel, sender, full message, timestamp
   - Same remove/clear actions as notifications

3. **Starred Messages**
   - Aggregated list of all starred messages across every channel
   - Grouped by channel for easy scanning
   - Click to navigate to the original message in its channel
   - Unstar action available inline

### Layout & Design
- Modern, clean UI with a dark sidebar and light content area
- Left sidebar: channels list, DMs, Activity Hub shortcut
- Main area: message view or Activity Hub screen
- Responsive design for desktop viewing
- Badge counters on Activity Hub icon showing unread notification count

### Backend (Supabase/Lovable Cloud)
- **Database tables**: profiles, channels, channel_members, messages, notifications, starred_messages
- **Row-Level Security**: Users can only access channels they've joined and their own notifications/starred items
- **Auth**: Supabase email/password authentication

### Data
- Seed with demo channels, users, and sample messages so the app feels alive on first login

