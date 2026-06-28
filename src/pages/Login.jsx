import { useState } from 'react'

/* ─────────────────────────────────────────────────────────────
   DESIGN TOKENS (match landing page exactly)
   Base:    #FFFFFF / #F5F5F7
   Text:    #0A0A0B / #6B6B6B / #ABABAB
   Red:     #EF2222 → #FF5555  (gradient)
   Border:  #E8E8ED
   Shadow:  rgba(0,0,0,0.06)
───────────────────────────────────────────────────────────── */

/* ── Inline style constants ── */
const redGrad  = { background: 'linear-gradient(135deg, #EF2222 0%, #FF5555 100%)' }
const redShadow = { boxShadow: '0 4px 24px rgba(239,34,34,0.32)' }

/* ── SVG Google logo ── */
function GoogleLogo() {
  return (
    <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}

/* ── Shield icon (matches EIS brand) ── */
function ShieldIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  )
}

/* ── Eye toggle icon ── */
function EyeIcon({ open }) {
  return open ? (
    <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ) : (
    <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-10-7-10-7a18.45 18.45 0 0 1 5.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 10 7 10 7a18.5 18.5 0 0 1-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  )
}

/* ─────────────────────────────────────────────────────────────
   POST-LOGIN PHONE MOCKUP
   Shows the "You're Safe" guardian state the user unlocks
───────────────────────────────────────────────────────────── */
function PostLoginPhone() {
  return (
    <div className="relative flex justify-center select-none">
      {/* Blurred glow */}
      <div
        className="absolute top-8 w-56 h-56 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(239,34,34,0.18) 0%, transparent 70%)' }}
      />

      {/* Phone shell */}
      <div
        className="relative w-[252px] overflow-hidden"
        style={{
          background: '#0A0A0B',
          borderRadius: 44,
          boxShadow: '0 48px 96px rgba(0,0,0,0.28), 0 0 0 1px rgba(255,255,255,0.07)',
        }}
      >
        {/* Status bar */}
        <div className="flex items-center justify-between px-6 pt-4 pb-2">
          <span className="text-white text-[11px] font-semibold">9:41</span>
          <div className="w-20 h-5 rounded-full bg-[#1C1C1E]" />
          <div className="flex items-center gap-1.5">
            <svg className="w-3 h-3 text-white/60" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24">
              <path d="M1.5 8.5a13 13 0 0 1 21 0M5 12a10 10 0 0 1 14 0M8.5 15.5a6 6 0 0 1 7 0M12 19h.01"/>
            </svg>
            <div className="w-6 h-3 border border-white/50 rounded-sm relative">
              <div className="absolute inset-0.5 right-1 rounded-sm bg-white/75" />
            </div>
          </div>
        </div>

        {/* Screen body */}
        <div className="px-4 pb-7 pt-1 space-y-3">
          {/* Welcome back header */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/40 text-[10px]">Welcome back,</p>
              <p className="text-white font-bold text-sm">Sarah 👋</p>
            </div>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
              style={redGrad}
            >S</div>
          </div>

          {/* "You're Safe" hero card */}
          <div
            className="rounded-2xl p-4 relative overflow-hidden"
            style={redGrad}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,255,255,0.18), transparent)' }}
            />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                  </svg>
                </div>
                <span className="text-white/80 text-[10px] font-semibold uppercase tracking-wider">You're Safe</span>
              </div>
              <p className="text-white font-black text-lg leading-tight">Guardian Mode<br/>is Active</p>
              <p className="text-white/70 text-[10px] mt-1">3 contacts watching · Live</p>
            </div>
          </div>

          {/* Guardian contact list */}
          <div className="bg-[#1C1C1E] rounded-2xl p-3 space-y-2.5">
            {[
              { name: 'Mom',    time: 'Now',    active: true  },
              { name: 'Priya',  time: '2m ago', active: true  },
              { name: 'Dad',    time: 'Offline', active: false },
            ].map(({ name, time, active }) => (
              <div key={name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold text-white ${active ? 'bg-red-600' : 'bg-[#333]'}`}>
                    {name[0]}
                  </div>
                  <span className="text-white text-[11px] font-medium">{name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-green-400 animate-pulse' : 'bg-[#555]'}`} />
                  <span className="text-white/40 text-[9px]">{time}</span>
                </div>
              </div>
            ))}
          </div>

          {/* SOS button (mini) */}
          <button
            className="w-full py-3 rounded-2xl text-white font-black text-sm tracking-wide relative overflow-hidden"
            style={redGrad}
            onClick={e => e.preventDefault()}
          >
            <span
              className="absolute inset-0 rounded-2xl"
              style={{ animation: 'ping 2.5s cubic-bezier(0,0,0.2,1) infinite', border: '2px solid rgba(239,34,34,0.4)' }}
            />
            🆘 Hold for SOS
          </button>

          {/* Quick actions */}
          <div className="grid grid-cols-3 gap-2">
            {[{ i: '🏥', l: 'Hospital' }, { i: '👮', l: 'Police' }, { i: '🤖', l: 'AI Help' }].map(({ i, l }) => (
              <div key={l} className="bg-[#1C1C1E] rounded-xl py-2 flex flex-col items-center gap-0.5">
                <span className="text-base">{i}</span>
                <span className="text-white/40 text-[9px]">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   FORM FIELD
───────────────────────────────────────────────────────────── */
function Field({ label, id, type = 'text', placeholder, value, onChange, error, rightSlot }) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-semibold text-[#0A0A0B]">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete={id}
          className={`
            w-full px-4 py-3 rounded-xl text-[15px] text-[#0A0A0B]
            bg-[#F5F5F7] border transition-all duration-200 outline-none
            placeholder:text-[#ABABAB]
            focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-500/15
            ${error ? 'border-red-400 bg-red-50/50' : 'border-[#E8E8ED]'}
            ${rightSlot ? 'pr-11' : ''}
          `}
        />
        {rightSlot && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3.5">
            {rightSlot}
          </div>
        )}
      </div>
      {error && (
        <p className="text-red-600 text-xs font-medium flex items-center gap-1">
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
          </svg>
          {error}
        </p>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   MAIN LOGIN PAGE
───────────────────────────────────────────────────────────── */
export default function LoginPage() {
  const [email, setEmail]         = useState('')
  const [password, setPassword]   = useState('')
  const [showPass, setShowPass]   = useState(false)
  const [errors, setErrors]       = useState({})
  const [loading, setLoading]     = useState(false)
  const [submitted, setSubmitted] = useState(false)

  /* ── Validate ── */
  const validate = () => {
    const e = {}
    if (!email.trim())                        e.email    = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid email address.'
    if (!password)                            e.password = 'Password is required.'
    else if (password.length < 6)            e.password = 'Password must be at least 6 characters.'
    return e
  }

  /* ── Submit ── */
  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setLoading(true)
    // Simulate async (replace with real auth)
    setTimeout(() => { setLoading(false); setSubmitted(true) }, 1400)
  }

  /* ── Success state ── */
  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-5">
        <div className="text-center">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-white mx-auto mb-5"
            style={{ ...redGrad, ...redShadow }}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5"/>
            </svg>
          </div>
          <h2 className="text-2xl font-black text-[#0A0A0B] mb-2">You're signed in!</h2>
          <p className="text-[#6B6B6B] text-sm">Welcome back. Guardian Mode is ready.</p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-6 text-sm text-red-600 font-semibold hover:underline"
          >
            ← Back to login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* ── Minimal nav bar ── */}
      <header className="flex items-center justify-between px-6 md:px-10 h-[60px] border-b border-[#E8E8ED]">
        <a href="/" className="flex items-center gap-2" aria-label="Everything Is Safe home">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ ...redGrad, boxShadow: '0 2px 12px rgba(239,34,34,0.38)' }}
          >
            <span className="text-white font-black text-[11px]">EIS</span>
          </div>
          <span className="font-bold text-[#0A0A0B] text-[15px] hidden sm:block">Everything Is Safe</span>
        </a>

        <p className="text-sm text-[#6B6B6B]">
          Don't have an account?{' '}
          <a href="/signup" className="text-red-600 font-semibold hover:text-red-700 transition-colors">
            Create account
          </a>
        </p>
      </header>

      {/* ── Main two-column split ── */}
      <div className="flex flex-1">

        {/* ── LEFT: Form panel ── */}
        <div className="flex-1 flex items-center justify-center px-6 py-14 md:px-14 lg:px-20">
          <div className="w-full max-w-[400px]">

            {/* Heading */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 text-xs font-semibold px-3 py-1 rounded-full border border-red-100 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                Secure Sign In
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#0A0A0B] leading-tight">
                Welcome back.<br />
                <span
                  style={{
                    background: 'linear-gradient(135deg,#EF2222,#FF7070)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  You're safe with us.
                </span>
              </h1>
              <p className="mt-2.5 text-[#6B6B6B] text-sm leading-relaxed">
                Sign in to activate Guardian Mode and keep your circle informed.
              </p>
            </div>

            {/* Google SSO */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 bg-white border border-[#E8E8ED] rounded-xl py-3 text-[15px] font-semibold text-[#0A0A0B] hover:bg-[#F5F5F7] hover:border-[#C8C8D0] active:scale-[0.98] transition-all duration-150 mb-6"
              style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
            >
              <GoogleLogo />
              Continue with Google
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-[#E8E8ED]" />
              <span className="text-[#ABABAB] text-xs font-medium">or sign in with email</span>
              <div className="flex-1 h-px bg-[#E8E8ED]" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <Field
                label="Email address"
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => { setEmail(e.target.value); setErrors(v => ({ ...v, email: '' })) }}
                error={errors.email}
              />

              <Field
                label="Password"
                id="password"
                type={showPass ? 'text' : 'password'}
                placeholder="At least 6 characters"
                value={password}
                onChange={e => { setPassword(e.target.value); setErrors(v => ({ ...v, password: '' })) }}
                error={errors.password}
                rightSlot={
                  <button
                    type="button"
                    onClick={() => setShowPass(v => !v)}
                    className="text-[#ABABAB] hover:text-[#6B6B6B] transition-colors"
                    aria-label={showPass ? 'Hide password' : 'Show password'}
                  >
                    <EyeIcon open={showPass} />
                  </button>
                }
              />

              {/* Forgot password */}
              <div className="flex justify-end -mt-1">
                <a
                  href="/forgot-password"
                  className="text-xs text-[#6B6B6B] hover:text-red-600 transition-colors font-medium"
                >
                  Forgot password?
                </a>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl text-white font-bold text-[15px] tracking-wide transition-all duration-200 active:scale-[0.98] disabled:opacity-70 relative overflow-hidden"
                style={{ ...redGrad, ...(loading ? {} : redShadow) }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                    </svg>
                    Signing in…
                  </span>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            {/* Create account */}
            <p className="mt-6 text-center text-sm text-[#6B6B6B]">
              New to Everything Is Safe?{' '}
              <a
                href="/signup"
                className="text-red-600 font-semibold hover:text-red-700 transition-colors"
              >
                Create a free account →
              </a>
            </p>

            {/* Trust badges */}
            <div className="mt-8 pt-6 border-t border-[#F0F0F5]">
              <div className="flex items-center justify-center gap-6">
                {[
                  { icon: '🔒', text: 'End-to-end encrypted' },
                  { icon: '🚫', text: 'No data selling' },
                  { icon: '⚡', text: 'Always free' },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex flex-col items-center gap-1 text-center">
                    <span className="text-base">{icon}</span>
                    <span className="text-[10px] text-[#ABABAB] font-medium leading-tight max-w-[60px]">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Phone showcase ── (hidden on small screens) ── */}
        <div
          className="hidden md:flex flex-1 items-center justify-center relative overflow-hidden"
          style={{ background: 'linear-gradient(160deg, #FFF5F5 0%, #FFFFFF 45%, #FFF8F8 100%)' }}
        >
          {/* Background radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 65% 55% at 50% 40%, rgba(239,34,34,0.07) 0%, transparent 70%)',
            }}
          />

          {/* Decorative grid dots */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage: 'radial-gradient(circle, #0A0A0B 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center gap-10 px-8">
            {/* Floating label above phone */}
            <div
              className="flex items-center gap-2.5 bg-white border border-[#E8E8ED] rounded-2xl px-4 py-3 text-sm font-semibold text-[#0A0A0B]"
              style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}
            >
              <span
                className="w-7 h-7 rounded-xl flex items-center justify-center text-white text-xs flex-shrink-0"
                style={redGrad}
              >
                <ShieldIcon size={14} />
              </span>
              Sign in to activate Guardian Mode
            </div>

            {/* Phone with float animation */}
            <div style={{ animation: 'floatPhone 5s ease-in-out infinite' }}>
              <PostLoginPhone />
            </div>

            {/* Caption below */}
            <p className="text-center text-sm text-[#6B6B6B] max-w-[220px] leading-relaxed">
              Your safety circle sees you're online and protected.
            </p>
          </div>

          {/* Float keyframe injected inline */}
          <style>{`
            @keyframes floatPhone {
              0%, 100% { transform: translateY(0px);   }
              50%       { transform: translateY(-10px); }
            }
          `}</style>
        </div>
      </div>
    </div>
  )
}