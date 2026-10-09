const LoadingScreen = () => (
  <div className="relative flex items-center justify-center h-screen bg-void overflow-hidden">
    <div className="aurora">
      <div className="aurora-orb aurora-orb-1" />
      <div className="aurora-orb aurora-orb-2" />
    </div>
    <div className="grid-bg" />
    <div className="relative flex flex-col items-center gap-6 z-10">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 rounded-3xl border-2 border-accent/20 animate-ping" style={{animationDuration:'2s'}} />
        <div className="w-20 h-20 rounded-3xl card flex items-center justify-center">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <path d="M6 10C6 7.79 7.79 6 10 6h16c2.21 0 4 1.79 4 4v12c0 2.21-1.79 4-4 4H22l-4 4-4-4h-4c-2.21 0-4-1.79-4-4V10z" fill="url(#lg1)"/>
            <defs>
              <linearGradient id="lg1" x1="6" y1="6" x2="30" y2="30" gradientUnits="userSpaceOnUse">
                <stop stopColor="#22d3ee"/>
                <stop offset="1" stopColor="#3b82f6"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-display text-lg font-bold text-primary tracking-widest uppercase" style={{color:'var(--text-primary)'}}>
          SyncTalk
        </span>
      </div>
      <div className="flex gap-2">
        <div className="typing-dot" />
        <div className="typing-dot" />
        <div className="typing-dot" />
      </div>
    </div>
  </div>
);

export default LoadingScreen;
