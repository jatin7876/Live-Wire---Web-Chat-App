import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { useSocketStore } from "../store/useSocketStore";

const Logo = () => (
  <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
    style={{background:'linear-gradient(135deg,#22d3ee,#3b82f6)'}}>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M4 6c0-1.1.9-2 2-2h12a2 2 0 012 2v9a2 2 0 01-2 2h-3l-3 3-3-3H6a2 2 0 01-2-2V6z" fill="white"/>
    </svg>
  </div>
);

const Sidebar = () => {
  const { users, getUsers, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { authUser, logout } = useAuthStore();
  const { onlineUsers } = useSocketStore();
  const [search, setSearch] = useState("");
  const location = useLocation();

  useEffect(() => { getUsers(); }, [getUsers]);

  const isOnline = (id) => onlineUsers.includes(id);
  const filtered = users.filter(u => u.username.toLowerCase().includes(search.toLowerCase()));
  const onlineCount = Math.max(0, onlineUsers.length - 1);

  const navItems = [
    { to: "/", icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 6c0-1.1.9-2 2-2h12a2 2 0 012 2v9a2 2 0 01-2 2h-3l-3 3-3-3H6a2 2 0 01-2-2V6z"/>
      </svg>
    ), label: "Messages" },
    { to: "/profile", icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
      </svg>
    ), label: "Profile" },
    { to: "/settings", icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 2v2m0 16v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M2 12h2m16 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
      </svg>
    ), label: "Settings" },
  ];

  return (
    <div className="flex h-full" style={{width:'280px',flexShrink:0}}>
      {/* Icon rail */}
      <div className="flex flex-col items-center py-5 gap-2"
        style={{width:'60px',background:'var(--bg-deep)',borderRight:'1px solid var(--border-subtle)'}}>
        <div className="mb-3"><Logo /></div>
        {navItems.map(({ to, icon, label }) => {
          const active = location.pathname === to;
          return (
            <Link key={to} to={to} title={label}
              className="relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 group"
              style={{
                color: active ? 'var(--accent)' : 'var(--text-muted)',
                background: active ? 'rgba(34,211,238,0.1)' : 'transparent',
              }}>
              {icon}
              {active && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r"
                style={{background:'var(--accent)'}} />}
            </Link>
          );
        })}
        <div className="flex-1" />
        <button onClick={logout} title="Logout"
          className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200"
          style={{color:'var(--text-muted)'}}
          onMouseEnter={e => e.currentTarget.style.color='#ef4444'}
          onMouseLeave={e => e.currentTarget.style.color='var(--text-muted)'}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4m7 14l5-5-5-5m5 5H9"/>
          </svg>
        </button>
      </div>

      {/* User list panel */}
      <div className="flex flex-col flex-1 overflow-hidden"
        style={{background:'var(--bg-surface)',borderRight:'1px solid var(--border-subtle)'}}>
        {/* Header */}
        <div className="px-4 pt-5 pb-3">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-base" style={{color:'var(--text-primary)'}}>Messages</h2>
            <span className="pill text-xs">{onlineCount} online</span>
          </div>
          {/* Search */}
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{color:'var(--text-muted)'}}>
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              className="input-field pl-9 py-2 text-sm"
              placeholder="Search users..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{borderRadius:'12px'}}
            />
          </div>
        </div>

        {/* Me */}
        <div className="mx-3 mb-3 flex items-center gap-3 px-3 py-2.5 rounded-xl"
          style={{background:'rgba(34,211,238,0.05)',border:'1px solid rgba(34,211,238,0.1)'}}>
          <div className="relative flex-shrink-0">
            <img
              src={authUser?.profilePic || `https://api.dicebear.com/7.x/avataaars/svg?seed=${authUser?.username}`}
              alt="me" className="w-9 h-9 rounded-xl object-cover"
              style={{background:'var(--bg-card)'}}
            />
            <span className="absolute -bottom-0.5 -right-0.5 pulse-green border-2"
              style={{borderColor:'var(--bg-surface)'}} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate" style={{color:'var(--text-primary)'}}>{authUser?.username}</p>
            <p className="text-xs" style={{color:'var(--accent)'}}>You · Active now</p>
          </div>
        </div>

        {/* Divider label */}
        <div className="px-5 mb-2">
          <p className="text-xs font-medium uppercase tracking-widest" style={{color:'var(--text-muted)'}}>
            All Users · {users.length}
          </p>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto pb-3 space-y-0.5">
          {isUsersLoading ? (
            <div className="px-3 space-y-2 mt-2">
              {[1,2,3,4].map(i => (
                <div key={i} className="flex items-center gap-3 px-3 py-2.5">
                  <div className="skeleton w-10 h-10 rounded-xl flex-shrink-0" />
                  <div className="flex-1 space-y-1.5">
                    <div className="skeleton h-3 w-24 rounded" />
                    <div className="skeleton h-2.5 w-16 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-center text-sm py-8" style={{color:'var(--text-muted)'}}>No users found</p>
          ) : filtered.map((user, i) => (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`user-item w-full text-left fade-up ${selectedUser?._id === user._id ? "active" : ""}`}
              style={{animationDelay:`${i * 0.04}s`}}
            >
              <div className="relative flex-shrink-0">
                <img
                  src={user.profilePic || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`}
                  alt={user.username}
                  className="w-10 h-10 rounded-xl object-cover"
                  style={{background:'var(--bg-card)'}}
                />
                {isOnline(user._id) && (
                  <span className="absolute -bottom-0.5 -right-0.5 pulse-green border-2"
                    style={{borderColor:'var(--bg-surface)'}} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate" style={{color:'var(--text-primary)'}}>{user.username}</p>
                <p className="text-xs" style={{color: isOnline(user._id) ? '#22c55e' : 'var(--text-muted)'}}>
                  {isOnline(user._id) ? "Active now" : "Offline"}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
