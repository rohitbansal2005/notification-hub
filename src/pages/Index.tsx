import { ChatProvider, useChat } from '@/contexts/ChatContext';
import { ChatSidebar } from '@/components/chat/ChatSidebar';
import { MessageList } from '@/components/chat/MessageList';
import { MessageComposer } from '@/components/chat/MessageComposer';
import { ActivityHub } from '@/components/activity/ActivityHub';

function ChatApp() {
  const { activeView } = useChat();

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <ChatSidebar />
      <main className="flex-1 flex flex-col min-h-0 bg-card">
        {activeView === 'chat' ? (
          <>
            <MessageList />
            <MessageComposer />
          </>
        ) : (
          <ActivityHub />
        )}
      </main>
    </div>
  );
}

export default function Index() {
  return (
    <ChatProvider>
      <ChatApp />
    </ChatProvider>
  );
}
