const NoChatSelected = () => (
  <div className="flex-1 flex flex-col items-center justify-center p-8 relative overflow-hidden"
    style={{background:'var(--bg-void)'}}>
    {/* Subtle grid */}
    <div className="absolute inset-0" style={{
      backgroundImage:'linear-gradient(rgba(34,211,238,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(34,211,238,0.02) 1px,transparent 1px)',
      backgroundSize:'60px 60px'
    }} />

    {/* Center glow */}
    <div className="absolute w-96 h-96 rounded-full pointer-events-none"
      style={{background:'radial-gradient(circle,rgba(34,211,238,0.05) 0%,transparent 70%)'}} />

    <div className="relative z-10 text-center max-w-sm fade-up">
      {/* Animated icon */}
      <div className="relative inline-flex mb-8">
        <div className="absolute inset-0 rounded-3xl animate-ping"
          style={{background:'rgba(34,211,238,0.1)',animationDuration:'3s'}} />
        <div className="relative w-24 h-24 rounded-3xl flex items-center justify-center"
          style={{background:'var(--bg-card)',border:'1px solid rgba(34,211,238,0.15)'}}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M6 10C6 7.79 7.79 6 10 6h20c2.21 0 4 1.79 4 4v16c0 2.21-1.79 4-4 4H26l-6 6-6-6h-4c-2.21 0-4-1.79-4-4V10z"
              fill="url(#grad1)"/>
            <circle cx="14" cy="18" r="2" fill="white" opacity=".8"/>
            <circle cx="20" cy="18" r="2" fill="white" opacity=".8"/>
            <circle cx="26" cy="18" r="2" fill="white" opacity=".8"/>
            <defs>
              <linearGradient id="grad1" x1="6" y1="6" x2="34" y2="36" gradientUnits="userSpaceOnUse">
                <stop stopColor="#22d3ee"/><stop offset="1" stopColor="#3b82f6"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      <h2 className="font-display text-2xl font-bold mb-3" style={{color:'var(--text-primary)'}}>
        Your messages
      </h2>
      <p className="text-base leading-relaxed mb-8" style={{color:'var(--text-secondary)'}}>
        Select a contact from the sidebar to start a real-time encrypted conversation.
      </p>

      {/* Feature pills */}
      <div className="flex flex-wrap justify-center gap-2">
        {[
          { icon: "⚡", label: "Real-time WebSocket" },
          { icon: "🔐", label: "JWT Auth" },
          { icon: "💾", label: "MongoDB Backed" },
        ].map(({ icon, label }) => (
          <span key={label} className="pill">
            <span>{icon}</span>
            {label}
          </span>
        ))}
      </div>
    </div>
  </div>
);

export default NoChatSelected;
