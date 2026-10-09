import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useSocketStore } from "../store/useSocketStore";
import toast from "react-hot-toast";

const Logo = () => (
  <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
    style={{background:'linear-gradient(135deg,#22d3ee,#3b82f6)'}}>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M4 6c0-1.1.9-2 2-2h12a2 2 0 012 2v9a2 2 0 01-2 2h-3l-3 3-3-3H6a2 2 0 01-2-2V6z" fill="white"/>
    </svg>
  </div>
);

const navItems = [
  { to: "/", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 6c0-1.1.9-2 2-2h12a2 2 0 012 2v9a2 2 0 01-2 2h-3l-3 3-3-3H6a2 2 0 01-2-2V6z"/></svg>, label:"Messages" },
  { to: "/profile", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>, label:"Profile" },
  { to: "/settings", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="3"/><path d="M12 2v2m0 16v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M2 12h2m16 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>, label:"Settings" },
];

export default function ProfilePage() {
  const { authUser, logout } = useAuthStore();
  const { onlineUsers } = useSocketStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const avatarUrl = authUser?.profilePic || `https://api.dicebear.com/7.x/avataaars/svg?seed=${authUser?.username}`;

  const stats = [
    { label: "Member since", value: authUser?.createdAt ? new Date(authUser.createdAt).toLocaleDateString('en-US',{month:'short',year:'numeric'}) : "—" },
    { label: "Status", value: "Active" },
    { label: "Account type", value: "Free" },
  ];

  return (
    <div className="flex h-screen" style={{background:'var(--bg-void)'}}>
      {/* Icon rail */}
      <div className="flex flex-col items-center py-5 gap-2"
        style={{width:'60px',background:'var(--bg-deep)',borderRight:'1px solid var(--border-subtle)',flexShrink:0}}>
        <div className="mb-3"><Logo /></div>
        {navItems.map(({ to, icon, label }) => {
          const active = window.location.pathname === to;
          return (
            <Link key={to} to={to} title={label}
              className="relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200"
              style={{color: active ? 'var(--accent)' : 'var(--text-muted)',background: active ? 'rgba(34,211,238,0.1)' : 'transparent'}}>
              {icon}
              {active && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r" style={{background:'var(--accent)'}} />}
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

      {/* Main content */}
      <div className="flex-1 overflow-y-auto" style={{background:'var(--bg-void)'}}>
        <div className="max-w-2xl mx-auto px-8 py-10">
          {/* Header */}
          <div className="mb-8 fade-up">
            <h1 className="font-display text-3xl font-bold mb-1" style={{color:'var(--text-primary)'}}>Profile</h1>
            <p style={{color:'var(--text-secondary)'}}>Manage your account and preferences</p>
          </div>

          {/* Avatar card */}
          <div className="card p-8 mb-6 fade-up" style={{animationDelay:'0.1s'}}>
            <div className="flex items-start gap-6">
              <div className="relative flex-shrink-0">
                <img src={avatarUrl} alt="avatar" className="w-24 h-24 rounded-3xl object-cover"
                  style={{background:'var(--bg-card)',border:'2px solid rgba(34,211,238,0.2)'}} />
                <span className="absolute -bottom-1 -right-1 pulse-green border-2"
                  style={{borderColor:'var(--bg-card)'}} />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-display text-2xl font-bold mb-1" style={{color:'var(--text-primary)'}}>
                  {authUser?.username}
                </h2>
                <div className="flex items-center gap-2 mb-4">
                  <span className="pill">Active</span>
                  <span className="pill" style={{background:'rgba(59,130,246,0.08)',borderColor:'rgba(59,130,246,0.15)',color:'var(--accent-blue)'}}>Free plan</span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {stats.map(({ label, value }) => (
                    <div key={label}>
                      <p className="text-xs mb-0.5" style={{color:'var(--text-muted)'}}>{label}</p>
                      <p className="text-sm font-medium" style={{color:'var(--text-primary)'}}>{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Avatar seed info */}
          <div className="card p-6 mb-6 fade-up" style={{animationDelay:'0.2s'}}>
            <h3 className="font-display font-semibold text-base mb-4" style={{color:'var(--text-primary)'}}>
              Your Avatar
            </h3>
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                {['adventurer','avataaars','bottts','fun-emoji','lorelei'].map(style => (
                  <img key={style}
                    src={`https://api.dicebear.com/7.x/${style}/svg?seed=${authUser?.username}`}
                    alt={style}
                    className="w-12 h-12 rounded-xl cursor-pointer transition-all duration-200 object-cover"
                    style={{background:'var(--bg-card)',border:'1px solid var(--border-subtle)',opacity:style==='avataaars'?1:0.5}}
                    title={style}
                    onClick={() => toast("Avatar customization coming soon!", { icon: "🎨" })}
                  />
                ))}
              </div>
              <div className="flex-1">
                <p className="text-sm" style={{color:'var(--text-secondary)'}}>
                  Avatars are auto-generated from your username. More customization coming soon!
                </p>
              </div>
            </div>
          </div>

          {/* Account info */}
          <div className="card p-6 mb-6 fade-up" style={{animationDelay:'0.3s'}}>
            <h3 className="font-display font-semibold text-base mb-4" style={{color:'var(--text-primary)'}}>
              Account Details
            </h3>
            <div className="space-y-4">
              {[
                { label: "Username", value: authUser?.username, icon: "👤" },
                { label: "User ID", value: authUser?._id?.slice(-8)?.toUpperCase(), icon: "🔑", mono: true },
              ].map(({ label, value, icon, mono }) => (
                <div key={label} className="flex items-center justify-between py-3"
                  style={{borderBottom:'1px solid var(--border-subtle)'}}>
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{icon}</span>
                    <div>
                      <p className="text-xs mb-0.5" style={{color:'var(--text-muted)'}}>{label}</p>
                      <p className={`text-sm font-medium ${mono ? 'font-mono' : ''}`} style={{color:'var(--text-primary)'}}>{value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Danger zone */}
          <div className="card p-6 fade-up" style={{animationDelay:'0.4s',borderColor:'rgba(239,68,68,0.12)'}}>
            <h3 className="font-display font-semibold text-base mb-1" style={{color:'#ef4444'}}>
              Sign Out
            </h3>
            <p className="text-sm mb-4" style={{color:'var(--text-secondary)'}}>
              You'll be redirected to the login page.
            </p>
            <button onClick={logout}
              className="py-2.5 px-5 rounded-xl text-sm font-semibold transition-all duration-200"
              style={{background:'rgba(239,68,68,0.08)',border:'1px solid rgba(239,68,68,0.2)',color:'#ef4444'}}
              onMouseEnter={e => e.currentTarget.style.background='rgba(239,68,68,0.15)'}
              onMouseLeave={e => e.currentTarget.style.background='rgba(239,68,68,0.08)'}>
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
