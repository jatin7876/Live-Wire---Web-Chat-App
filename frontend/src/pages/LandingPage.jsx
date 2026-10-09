import { Link } from "react-router-dom";

const features = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
    title: "Real-Time WebSocket",
    desc: "Messages delivered instantly via Socket.IO. No polling, no delays — pure real-time.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
      </svg>
    ),
    title: "JWT Authentication",
    desc: "Stateless secure sessions using JSON Web Tokens. Your identity is always protected.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/>
      </svg>
    ),
    title: "MongoDB Persistence",
    desc: "Every conversation is stored securely in MongoDB. Your history, always there.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
      </svg>
    ),
    title: "Online Presence",
    desc: "See who's online in real time. Green means they're ready to chat.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75"/>
      </svg>
    ),
    title: "User Avatars",
    desc: "Unique auto-generated avatars via DiceBear for every user. Personality by default.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: "Message History",
    desc: "Full conversation history loaded on demand. Pick up where you left off.",
  },
];

const stats = [
  { num: "< 50ms", label: "Message latency" },
  { num: "100%", label: "Open source" },
  { num: "∞", label: "Messages free" },
  { num: "256-bit", label: "JWT security" },
];

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-void overflow-x-hidden">
      {/* Ambient bg */}
      <div className="aurora">
        <div className="aurora-orb aurora-orb-1" />
        <div className="aurora-orb aurora-orb-2" />
        <div className="aurora-orb aurora-orb-3" />
      </div>
      <div className="grid-bg" />

      {/* Nav */}
      <nav className="relative z-20 flex items-center justify-between px-8 py-5 max-w-6xl mx-auto">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{background:'linear-gradient(135deg,#22d3ee,#3b82f6)'}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M4 6c0-1.1.9-2 2-2h12a2 2 0 012 2v9a2 2 0 01-2 2h-3l-3 3-3-3H6a2 2 0 01-2-2V6z" fill="white"/>
            </svg>
          </div>
          <span className="font-display font-bold text-lg" style={{color:'var(--text-primary)'}}>SyncTalk</span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login" className="nav-link px-4 py-2 rounded-xl text-sm">Sign in</Link>
          <Link to="/register" className="btn-primary py-2 px-5 text-sm">
            Get started free →
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 text-center px-6 pt-20 pb-24 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 pill mb-8 fade-up">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          Open source · Real-time messaging
        </div>

        <h1 className="font-display font-bold text-6xl md:text-7xl leading-none mb-6 fade-up"
          style={{animationDelay:'0.1s',color:'var(--text-primary)'}}>
          Chat without{" "}
          <span style={{
            background:'linear-gradient(135deg,#22d3ee 30%,#3b82f6 70%)',
            WebkitBackgroundClip:'text',
            WebkitTextFillColor:'transparent',
            backgroundClip:'text',
          }}>
            limits
          </span>
        </h1>

        <p className="text-xl leading-relaxed mb-10 max-w-2xl mx-auto fade-up"
          style={{animationDelay:'0.2s',color:'var(--text-secondary)'}}>
          SyncTalk is a blazing-fast, real-time messaging platform built with React, Socket.IO, and MongoDB.
          Connect instantly with anyone, anywhere.
        </p>

        <div className="flex items-center justify-center gap-4 fade-up" style={{animationDelay:'0.3s'}}>
          <Link to="/register" className="btn-primary text-base px-8 py-3.5">
            Start chatting — it's free
          </Link>
          <Link to="/login" className="btn-ghost text-base px-6 py-3.5">
            Sign in
          </Link>
        </div>

        {/* Mini preview */}
        <div className="mt-16 fade-up" style={{animationDelay:'0.4s'}}>
          <div className="relative max-w-2xl mx-auto card p-6"
            style={{border:'1px solid rgba(34,211,238,0.15)',boxShadow:'0 0 80px rgba(34,211,238,0.07)'}}>
            {/* Fake chat preview */}
            <div className="flex items-center gap-3 pb-4 mb-4" style={{borderBottom:'1px solid var(--border-subtle)'}}>
              <div className="w-8 h-8 rounded-xl" style={{background:'linear-gradient(135deg,#22d3ee,#3b82f6)'}} />
              <div>
                <p className="text-sm font-semibold" style={{color:'var(--text-primary)'}}>Alex</p>
                <p className="text-xs" style={{color:'#22c55e'}}>Active now</p>
              </div>
            </div>
            <div className="space-y-3 text-left">
              {[
                { mine: false, text: "Hey! Did you see the new update? 🚀" },
                { mine: true,  text: "Just checked it out — the real-time delivery is insane fast!" },
                { mine: false, text: "Right?! Under 50ms latency 🔥" },
              ].map((m, i) => (
                <div key={i} className={`flex ${m.mine ? "justify-end" : "justify-start"}`}>
                  <div className={`px-4 py-2.5 text-sm max-w-xs ${m.mine ? "bubble-mine" : "bubble-theirs"}`}>
                    {m.text}
                  </div>
                </div>
              ))}
              <div className="flex items-center gap-2 pt-1">
                <div className="flex gap-1">
                  <div className="typing-dot" /><div className="typing-dot" /><div className="typing-dot" />
                </div>
                <span className="text-xs" style={{color:'var(--text-muted)'}}>Alex is typing...</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map(({ num, label }, i) => (
            <div key={label} className="feature-card text-center fade-up" style={{animationDelay:`${0.1*i}s`}}>
              <div className="stat-num mb-1">{num}</div>
              <p className="text-sm" style={{color:'var(--text-secondary)'}}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pb-24">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl font-bold mb-4" style={{color:'var(--text-primary)'}}>
            Built to be fast
          </h2>
          <p style={{color:'var(--text-secondary)'}}>
            Everything you need for real-time communication, nothing you don't.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map(({ icon, title, desc }, i) => (
            <div key={title} className="feature-card fade-up" style={{animationDelay:`${0.08*i}s`}}>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                style={{background:'rgba(34,211,238,0.08)',border:'1px solid rgba(34,211,238,0.12)',color:'var(--accent)'}}>
                {icon}
              </div>
              <h3 className="font-display font-semibold text-base mb-2" style={{color:'var(--text-primary)'}}>{title}</h3>
              <p className="text-sm leading-relaxed" style={{color:'var(--text-secondary)'}}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 max-w-2xl mx-auto px-6 pb-24 text-center">
        <div className="card p-12" style={{border:'1px solid rgba(34,211,238,0.15)',boxShadow:'0 0 60px rgba(34,211,238,0.06)'}}>
          <h2 className="font-display text-4xl font-bold mb-4" style={{color:'var(--text-primary)'}}>
            Ready to sync?
          </h2>
          <p className="mb-8" style={{color:'var(--text-secondary)'}}>
            Create your free account and start messaging in seconds.
          </p>
          <Link to="/register" className="btn-primary text-base px-8 py-3.5 inline-block">
            Create free account →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 text-center pb-8 px-6">
        <p className="text-sm" style={{color:'var(--text-muted)'}}>
          SyncTalk · Real-time messaging for everyone · Built with ❤️ using React & Socket.IO
        </p>
      </footer>
    </div>
  );
}
