import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const StrengthBar = ({ password }) => {
  const score = [/.{8,}/, /[A-Z]/, /[0-9]/, /[^A-Za-z0-9]/].filter(r => r.test(password)).length;
  const labels = ["", "Weak", "Fair", "Good", "Strong"];
  const colors = ["", "#ef4444", "#f97316", "#eab308", "#22c55e"];
  return password ? (
    <div className="mt-2 space-y-1">
      <div className="flex gap-1">
        {[1,2,3,4].map(i => (
          <div key={i} className="flex-1 h-1 rounded-full transition-all duration-300"
            style={{background: i <= score ? colors[score] : 'var(--border-subtle)'}} />
        ))}
      </div>
      <p className="text-xs" style={{color: colors[score]}}>{labels[score]}</p>
    </div>
  ) : null;
};

const RegisterPage = () => {
  const [form, setForm] = useState({ username: "", password: "", confirmPassword: "" });
  const [showPwd, setShowPwd] = useState(false);
  const { register, isRegistering } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      import("react-hot-toast").then(({ default: toast }) => toast.error("Passwords do not match"));
      return;
    }
    register({ username: form.username, password: form.password });
  };

  return (
    <div className="relative min-h-screen bg-void flex items-center justify-center p-4 overflow-hidden">
      <div className="aurora">
        <div className="aurora-orb aurora-orb-1" />
        <div className="aurora-orb aurora-orb-2" />
        <div className="aurora-orb aurora-orb-3" />
      </div>
      <div className="grid-bg" />

      {/* Nav */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-8 py-5 z-10">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{background:'linear-gradient(135deg,#22d3ee,#3b82f6)'}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M4 6c0-1.1.9-2 2-2h12a2 2 0 012 2v9a2 2 0 01-2 2h-3l-3 3-3-3H6a2 2 0 01-2-2V6z" fill="white"/>
            </svg>
          </div>
          <span className="font-display font-bold text-base" style={{color:'var(--text-primary)'}}>SyncTalk</span>
        </Link>
        <Link to="/login" className="btn-ghost text-sm py-2 px-4">
          Sign in →
        </Link>
      </div>

      <div className="relative z-10 w-full max-w-md fade-up">
        <div className="card p-8">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 pill mb-5">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                <path d="M5 0L6.12 3.38H9.51L6.76 5.47L7.94 9L5 6.91L2.06 9L3.24 5.47L0.49 3.38H3.88L5 0Z"/>
              </svg>
              Free forever · No credit card
            </div>
            <h1 className="font-display text-3xl font-bold mb-2" style={{color:'var(--text-primary)'}}>
              Create account
            </h1>
            <p style={{color:'var(--text-secondary)'}}>Join thousands of users on SyncTalk</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium" style={{color:'var(--text-secondary)'}}>Username</label>
              <input
                type="text"
                className="input-field"
                placeholder="Choose a username"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                required
                minLength={3}
                autoComplete="username"
              />
              <p className="text-xs" style={{color:'var(--text-muted)'}}>At least 3 characters</p>
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-medium" style={{color:'var(--text-secondary)'}}>Password</label>
              <div className="relative">
                <input
                  type={showPwd ? "text" : "password"}
                  className="input-field pr-12"
                  placeholder="At least 6 characters"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                  minLength={6}
                  autoComplete="new-password"
                />
                <button type="button" onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs transition-colors"
                  style={{color:'var(--text-muted)'}}>
                  {showPwd ? "HIDE" : "SHOW"}
                </button>
              </div>
              <StrengthBar password={form.password} />
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-medium" style={{color:'var(--text-secondary)'}}>Confirm Password</label>
              <div className="relative">
                <input
                  type={showPwd ? "text" : "password"}
                  className="input-field pr-12"
                  placeholder="Repeat your password"
                  value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  required
                  autoComplete="new-password"
                />
                {form.confirmPassword && (
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs">
                    {form.password === form.confirmPassword
                      ? <span style={{color:'#22c55e'}}>✓</span>
                      : <span style={{color:'#ef4444'}}>✗</span>}
                  </span>
                )}
              </div>
            </div>

            <button type="submit" className="btn-primary w-full mt-2" disabled={isRegistering}>
              {isRegistering ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account...
                </span>
              ) : "Create free account"}
            </button>
          </form>

          <p className="text-center text-sm mt-6" style={{color:'var(--text-secondary)'}}>
            Already have an account?{" "}
            <Link to="/login" className="font-semibold transition-colors" style={{color:'var(--accent)'}}>
              Sign in
            </Link>
          </p>
        </div>

        <p className="text-center text-xs mt-4" style={{color:'var(--text-muted)'}}>
          By creating an account you agree to our Terms of Service
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
