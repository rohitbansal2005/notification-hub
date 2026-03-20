import { useRef, useState, useEffect, KeyboardEvent } from 'react';
import { useChat } from '@/contexts/ChatContext';
import { Button } from '@/components/ui/button';
import { Send, Paperclip, Smile } from 'lucide-react';
import { users } from '@/lib/mock-data';

export function MessageComposer() {
  const { sendMessage, activeChannelId, channels, composerText, setComposerText, registerComposerFocus } = useChat();
  const textRef = useRef<HTMLTextAreaElement | null>(null);
  const channel = channels.find(c => c.id === activeChannelId);
  const [suggestionsVisible, setSuggestionsVisible] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState<typeof users>(users);
  const [activeIndex, setActiveIndex] = useState(0);

  // register focus function with context so other components can focus composer
  useEffect(() => {
    registerComposerFocus(() => {
      textRef.current?.focus();
      // place caret at end
      if (textRef.current) {
        const len = textRef.current.value.length;
        textRef.current.setSelectionRange(len, len);
      }
    });
  // register only once
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSend = () => {
    if (!composerText.trim()) return;
    sendMessage(composerText);
    setComposerText('');
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    // navigate suggestions
    if (suggestionsVisible) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex(i => Math.min(i + 1, filteredUsers.length - 1));
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex(i => Math.max(i - 1, 0));
        return;
      }
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        // choose active suggestion
        const u = filteredUsers[activeIndex];
        if (u) selectSuggestion(u.username);
        return;
      }
      if (e.key === 'Escape') {
        setSuggestionsVisible(false);
        return;
      }
    }

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  function getMentionStart(text: string, caret: number) {
    // find last '@' before caret that's not preceded by non-whitespace (or is start)
    const upto = text.slice(0, caret);
    const at = upto.lastIndexOf('@');
    if (at === -1) return -1;
    // ensure char before @ is whitespace or start
    if (at > 0) {
      const prev = upto[at - 1];
      if (!/\s/.test(prev)) return -1;
    }
    return at;
  }

  function updateSuggestions() {
    const el = textRef.current;
    if (!el) return;
    const caret = el.selectionStart || 0;
    const text = composerText;
    const at = getMentionStart(text, caret);
    if (at === -1) {
      setSuggestionsVisible(false);
      return;
    }
    const query = text.slice(at + 1, caret).toLowerCase();
    const filtered = users.filter(u => u.username.toLowerCase().startsWith(query) || u.displayName.toLowerCase().includes(query));
    setFilteredUsers(filtered);
    setActiveIndex(0);
    setSuggestionsVisible(true);
  }

  useEffect(() => {
    // update suggestions when composerText changes
    updateSuggestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [composerText]);

  function replaceMentionWith(username: string) {
    const el = textRef.current;
    if (!el) return;
    const caret = el.selectionStart || 0;
    const text = composerText;
    const at = getMentionStart(text, caret);
    if (at === -1) return;
    const before = text.slice(0, at);
    const after = text.slice(caret);
    const newText = `${before}@${username} ${after}`;
    setComposerText(newText);
    setSuggestionsVisible(false);
    // place caret after inserted mention
    requestAnimationFrame(() => {
      const pos = (before + `@${username} `).length;
      el.focus();
      el.setSelectionRange(pos, pos);
    });
  }

  function selectSuggestion(username: string) {
    replaceMentionWith(username);
    // also notify context insertMention for consistency (optional)
    // insertMention(username);
  }

  if (!channel) return null;

  return (
    <div className="px-5 py-3 border-t border-border bg-card">
      <div className="flex items-end gap-2 rounded-lg border border-input bg-background p-2">
        <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 text-muted-foreground">
          <Paperclip className="h-4 w-4" />
        </Button>
        <textarea
          ref={textRef}
          value={composerText}
          onChange={e => setComposerText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`Message #${channel.name}`}
          rows={1}
          className="flex-1 bg-transparent text-sm resize-none outline-none min-h-[32px] max-h-[120px] py-1.5 text-foreground placeholder:text-muted-foreground"
        />
        {suggestionsVisible && filteredUsers.length > 0 && (
          <div className="absolute bottom-14 left-4 z-40 w-64 max-h-40 overflow-auto rounded-md border bg-popover p-1 shadow-lg">
            {filteredUsers.map((u, i) => (
              <div
                key={u.id}
                className={`px-2 py-1 rounded text-sm cursor-pointer ${i === activeIndex ? 'bg-primary/10' : 'hover:bg-muted/50'}`}
                onMouseDown={e => { e.preventDefault(); selectSuggestion(u.username); }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{u.displayName}</span>
                  <span className="text-xs text-muted-foreground">{u.username}</span>
                </div>
              </div>
            ))}
          </div>
        )}
        <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 text-muted-foreground">
          <Smile className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          className="h-8 w-8 shrink-0"
          onClick={handleSend}
          disabled={!composerText.trim()}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
