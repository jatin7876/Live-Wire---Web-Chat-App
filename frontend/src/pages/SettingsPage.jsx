import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
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

const Toggle = ({ checked, onChange }) => (
  <button onClick={() => onChange(!checked)}
    className="relative w-11 h-6 rounded-full transition-all duration-300 flex-shrink-0"
    style={{background: checked ? 'linear-gradient(135deg,#22d3ee,#3b82f6)' : 'var(--bg-card)',
      border: checked ? 'none' : '1px solid var(--border-subtle)',
      boxShadow: checked ? '0 0 16px rgba(34,211,238,0.3)' : 'none'}}>
    <span className="absolute top-0.5 transition-all duration-300 w-5 h-5 bg-white rounded-full shadow-sm"
      style={{left: checked ? 'calc(100% - 22px)' : '2px'}} />
  </button>
);

export default function SettingsPage() {
  const { logout } = useAuthStore();
  const [settings, setSettings] = useState({
    notifications: true,
    sound: true,
    readReceipts: true,
    onlineStatus: true,
    darkMode: true,
    compactMode: false,
    enterToSend: true,
  });

  const set = (key, val) => {
    setSettings(s => ({ ...s, [key]: val }));
    toast.success("Saved", { duration: 1500, icon: "✓" });
  };

  const Section = ({ title, children }) => (
    <div className="card p-6 mb-4 fade-up">
      <h3 className="font-display font-semibold text-base mb-5" style={{color:'var(--text-primary)'}}>{title}</h3>
      <div className="space-y-0">
        {children}
      </div>
    </div>
  );

  const Row = ({ icon, label, desc, control }) => (
    <div className="flex items-center justify-between py-3.5" style={{borderBottom:'1px solid var(--border-subtle)'}}>
      <div className="flex items-center gap-3">
        <span className="text-lg w-7 text-center">{icon}</span>
        <div>
          <p className="text-sm font-medium" style={{color:'var(--text-primary)'}}>{label}</p>
          {desc && <p className="text-xs mt-0.5" style={{color:'var(--text-muted)'}}>{desc}</p>}
        </div>
      </div>
      {control}
    </div>
  );

  const themeColors = [
    { label:"Cyan", from:"#22d3ee", to:"#3b82f6" },
    { label:"Violet", from:"#a855f7", to:"#ec4899" },
    { label:"Emerald", from:"#10b981", to:"#3b82f6" },
    { label:"Amber", from:"#f59e0b", to:"#ef4444" },
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
              style={{color:active?'var(--accent)':'var(--text-muted)',background:active?'rgba(34,211,238,0.1)':'transparent'}}>
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

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-8 py-10">
          <div className="mb-8 fade-up">
            <h1 className="font-display text-3xl font-bold mb-1" style={{color:'var(--text-primary)'}}>Settings</h1>
            <p style={{color:'var(--text-secondary)'}}>Customize your SyncTalk experience</p>
          </div>

          <Section title="Notifications">
            <Row icon="🔔" label="Push notifications" desc="Get notified for new messages"
              control={<Toggle checked={settings.notifications} onChange={v => set('notifications',v)} />} />
            <Row icon="🔊" label="Message sounds" desc="Play a sound on new messages"
              control={<Toggle checked={settings.sound} onChange={v => set('sound',v)} />} />
          </Section>

          <Section title="Privacy">
            <Row icon="✓✓" label="Read receipts" desc="Let others see when you've read their messages"
              control={<Toggle checked={settings.readReceipts} onChange={v => set('readReceipts',v)} />} />
            <Row icon="🟢" label="Show online status" desc="Let others see when you're active"
              control={<Toggle checked={settings.onlineStatus} onChange={v => set('onlineStatus',v)} />} />
          </Section>

          <Section title="Appearance">
            <Row icon="🌙" label="Dark mode" desc="Use dark theme (recommended)"
              control={<Toggle checked={settings.darkMode} onChange={v => set('darkMode',v)} />} />
            <Row icon="📐" label="Compact messages" desc="Show messages with less spacing"
              control={<Toggle checked={settings.compactMode} onChange={v => set('compactMode',v)} />} />
            <div className="py-4" style={{borderBottom:'1px solid var(--border-subtle)'}}>
              <p className="text-sm font-medium mb-3" style={{color:'var(--text-primary)'}}>🎨 Accent color</p>
              <div className="flex gap-3">
                {themeColors.map(({ label, from, to }) => (
                  <button key={label} onClick={() => toast(`${label} theme coming soon!`, { icon: "🎨" })}
                    className="w-10 h-10 rounded-xl transition-all duration-200 hover:scale-110"
                    style={{background:`linear-gradient(135deg,${from},${to})`,border:'2px solid transparent'}}
                    title={label} />
                ))}
              </div>
            </div>
          </Section>

          <Section title="Messaging">
            <Row icon="⏎" label="Enter to send" desc="Press Enter to send (Shift+Enter for new line)"
              control={<Toggle checked={settings.enterToSend} onChange={v => set('enterToSend',v)} />} />
          </Section>

          {/* About */}
          <div className="card p-6 fade-up" style={{animationDelay:'0.4s'}}>
            <h3 className="font-display font-semibold text-base mb-4" style={{color:'var(--text-primary)'}}>About</h3>
            <div className="space-y-2">
              {[
                ["Version", "1.0.0"],
                ["Stack", "React · Socket.IO · Node.js · MongoDB"],
                ["License", "MIT Open Source"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between text-sm">
                  <span style={{color:'var(--text-muted)'}}>{k}</span>
                  <span style={{color:'var(--text-secondary)'}}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
