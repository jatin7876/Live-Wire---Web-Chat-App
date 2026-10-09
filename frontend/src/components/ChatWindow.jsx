import { useEffect, useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { useSocketStore } from "../store/useSocketStore";

const formatTime = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  if (d.toDateString() === today.toDateString()) return "Today";
  if (d.toDateString() === yesterday.toDateString()) return "Yesterday";
  return d.toLocaleDateString([], { month: "short", day: "numeric" });
};

const ChatWindow = () => {
  const { messages, getMessages, sendMessage, selectedUser, isMessagesLoading, subscribeToMessages, unsubscribeFromMessages } = useChatStore();
  const { authUser } = useAuthStore();
  const { onlineUsers } = useSocketStore();
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  const isOnline = onlineUsers.includes(selectedUser?._id);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
      subscribeToMessages();
      setTimeout(() => inputRef.current?.focus(), 100);
    }
    return () => unsubscribeFromMessages();
  }, [selectedUser?._id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    await sendMessage({ message: text.trim() });
    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(e);
    }
  };

  // Group messages by date
  const grouped = messages.reduce((acc, msg) => {
    const label = formatDate(msg.createdAt);
    if (!acc[label]) acc[label] = [];
    acc[label].push(msg);
    return acc;
  }, {});

  return (
    <div className="flex flex-col flex-1 h-full overflow-hidden" style={{background:'var(--bg-void)'}}>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 flex-shrink-0"
        style={{background:'var(--bg-surface)',borderBottom:'1px solid var(--border-subtle)'}}>
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={selectedUser.profilePic || `https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedUser.username}`}
              alt={selectedUser.username}
              className="w-10 h-10 rounded-xl object-cover"
              style={{background:'var(--bg-card)'}}
            />
            {isOnline && (
              <span className="absolute -bottom-0.5 -right-0.5 pulse-green border-2"
                style={{borderColor:'var(--bg-surface)'}} />
            )}
          </div>
          <div>
            <p className="font-semibold text-sm font-display" style={{color:'var(--text-primary)'}}>{selectedUser.username}</p>
            <p className="text-xs" style={{color: isOnline ? '#22c55e' : 'var(--text-muted)'}}>
              {isOnline ? "Active now" : "Offline"}
            </p>
          </div>
        </div>

        {/* Header actions */}
        <div className="flex items-center gap-1">
          {[
            <svg key="phone" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.25 2.2 2 2 0 012.24 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.16 6.16l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>,
            <svg key="video" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>,
            <svg key="info" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/></svg>,
          ].map((icon, i) => (
            <button key={i} className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
              style={{color:'var(--text-muted)'}}
              onMouseEnter={e => { e.currentTarget.style.color='var(--accent)'; e.currentTarget.style.background='rgba(34,211,238,0.07)'; }}
              onMouseLeave={e => { e.currentTarget.style.color='var(--text-muted)'; e.currentTarget.style.background='transparent'; }}>
              {icon}
            </button>
          ))}
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4"
        style={{background:'var(--bg-void)'}}>
        {isMessagesLoading ? (
          <div className="space-y-4 pt-4">
            {[1,2,3].map(i => (
              <div key={i} className={`flex ${i % 2 === 0 ? "justify-end" : "justify-start"}`}>
                <div className={`skeleton h-10 rounded-2xl ${i % 2 === 0 ? "w-48" : "w-64"}`} />
              </div>
            ))}
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center fade-up">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
              style={{background:'var(--bg-card)',border:'1px solid var(--border-subtle)'}}>
              <span className="text-2xl">👋</span>
            </div>
            <p className="font-semibold mb-1" style={{color:'var(--text-primary)'}}>Say hello!</p>
            <p className="text-sm" style={{color:'var(--text-secondary)'}}>
              Start your conversation with <span style={{color:'var(--accent)'}}>{selectedUser.username}</span>
            </p>
          </div>
        ) : (
          Object.entries(grouped).map(([label, msgs]) => (
            <div key={label}>
              {/* Date separator */}
              <div className="flex items-center gap-3 my-4">
                <div className="flex-1 h-px" style={{background:'var(--border-subtle)'}} />
                <span className="text-xs px-3 py-1 rounded-full" style={{color:'var(--text-muted)',background:'var(--bg-card)',border:'1px solid var(--border-subtle)'}}>
                  {label}
                </span>
                <div className="flex-1 h-px" style={{background:'var(--border-subtle)'}} />
              </div>

              <div className="space-y-2">
                {msgs.map((msg, i) => {
                  const isMine = msg.senderId === authUser._id;
                  const showAvatar = !isMine && (i === 0 || msgs[i-1]?.senderId !== msg.senderId);
                  return (
                    <div key={msg._id} className={`flex items-end gap-2 ${isMine ? "justify-end" : "justify-start"} fade-up`}
                      style={{animationDelay:`${Math.min(i * 0.03, 0.3)}s`}}>
                      {!isMine && (
                        <div className="flex-shrink-0 w-7">
                          {showAvatar && (
                            <img
                              src={selectedUser.profilePic || `https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedUser.username}`}
                              className="w-7 h-7 rounded-lg object-cover"
                              style={{background:'var(--bg-card)'}}
                              alt=""
                            />
                          )}
                        </div>
                      )}
                      <div className={`max-w-xs lg:max-w-md xl:max-w-lg`}>
                        <div className={`px-4 py-2.5 text-sm break-words ${isMine ? "bubble-mine" : "bubble-theirs"}`}>
                          {msg.message}
                        </div>
                        <p className={`text-xs mt-1 ${isMine ? "text-right" : "text-left"}`}
                          style={{color:'var(--text-muted)'}}>
                          {formatTime(msg.createdAt)}
                          {isMine && <span className="ml-1.5" style={{color:'var(--accent)'}}>✓✓</span>}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-6 py-4 flex-shrink-0"
        style={{background:'var(--bg-surface)',borderTop:'1px solid var(--border-subtle)'}}>
        <form onSubmit={handleSend} className="flex items-center gap-3">
          {/* Emoji button */}
          <button type="button" className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200"
            style={{color:'var(--text-muted)',background:'var(--bg-card)',border:'1px solid var(--border-subtle)'}}
            onMouseEnter={e => e.currentTarget.style.color='var(--accent)'}
            onMouseLeave={e => e.currentTarget.style.color='var(--text-muted)'}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="12" r="10"/><path d="M8 13s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>
            </svg>
          </button>

          <input
            ref={inputRef}
            type="text"
            className="input-field flex-1"
            placeholder={`Message ${selectedUser.username}...`}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{borderRadius:'14px',paddingTop:'11px',paddingBottom:'11px'}}
          />

          {/* Attach */}
          <button type="button" className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200"
            style={{color:'var(--text-muted)',background:'var(--bg-card)',border:'1px solid var(--border-subtle)'}}
            onMouseEnter={e => e.currentTarget.style.color='var(--accent)'}
            onMouseLeave={e => e.currentTarget.style.color='var(--text-muted)'}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
            </svg>
          </button>

          {/* Send */}
          <button type="submit" disabled={!text.trim()}
            className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 disabled:opacity-40"
            style={{background: text.trim() ? 'linear-gradient(135deg,#22d3ee,#3b82f6)' : 'var(--bg-card)',
              border: text.trim() ? 'none' : '1px solid var(--border-subtle)',
              color: text.trim() ? 'white' : 'var(--text-muted)',
              boxShadow: text.trim() ? '0 0 20px rgba(34,211,238,0.3)' : 'none'}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
