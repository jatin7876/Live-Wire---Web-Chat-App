import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const LoginPage = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [showPwd, setShowPwd] = useState(false);
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(form);
  };

  return (
    <div className="relative min-h-screen bg-void flex items-center justify-center p-4 overflow-hidden">
      {/* Background */}
      <div className="aurora">
        <div className="aurora-orb aurora-orb-1" />
        <div className="aurora-orb aurora-orb-2" />
        <div className="aurora-orb aurora-orb-3" />
      </div>
      <div className="grid-bg" />

      {/* Nav bar */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-8 py-5 z-10">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{background:'linear-gradient(135deg,#22d3ee,#3b82f6)'}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M4 6c0-1.1.9-2 2-2h12a2 2 0 012 2v9a2 2 0 01-2 2h-3l-3 3-3-3H6a2 2 0 01-2-2V6z" fill="white"/>
            </svg>
          </div>
          <span className="font-display font-bold text-base" style={{color:'var(--text-primary)'}}>SyncTalk</span>
        </Link>
        <Link to="/register" className="btn-ghost text-sm py-2 px-4">
          Create account →
        </Link>
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md fade-up">
        <div className="card p-8" style={{animationDelay:'0.1s'}}>
          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 pill mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Secure encrypted session
            </div>
            <h1 className="font-display text-3xl font-bold mb-2" style={{color:'var(--text-primary)'}}>
              Welcome back
            </h1>
            <p style={{color:'var(--text-secondary)'}}>Sign in to continue your conversations</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium" style={{color:'var(--text-secondary)'}}>Username</label>
              <input
                type="text"
                className="input-field"
                placeholder="Enter your username"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                required
                autoComplete="username"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-medium" style={{color:'var(--text-secondary)'}}>Password</label>
              <div className="relative">
                <input
                  type={showPwd ? "text" : "password"}
                  className="input-field pr-12"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs transition-colors"
                  style={{color:'var(--text-muted)'}}
                >
                  {showPwd ? "HIDE" : "SHOW"}
                </button>
              </div>
            </div>

            <button type="submit" className="btn-primary w-full mt-2" disabled={isLoggingIn}>
              {isLoggingIn ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : "Sign in"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px" style={{background:'var(--border-subtle)'}} />
            <span className="text-xs" style={{color:'var(--text-muted)'}}>or</span>
            <div className="flex-1 h-px" style={{background:'var(--border-subtle)'}} />
          </div>

          <p className="text-center text-sm" style={{color:'var(--text-secondary)'}}>
            Don't have an account?{" "}
            <Link to="/register" className="font-semibold transition-colors" style={{color:'var(--accent)'}}>
              Create one free
            </Link>
          </p>
        </div>

        {/* Bottom trust signals */}
        <div className="flex items-center justify-center gap-6 mt-6">
          {["JWT Auth", "WebSocket", "Encrypted"].map((t) => (
            <span key={t} className="flex items-center gap-1.5 text-xs" style={{color:'var(--text-muted)'}}>
              <span className="w-1 h-1 rounded-full" style={{background:'var(--accent)'}} />
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
