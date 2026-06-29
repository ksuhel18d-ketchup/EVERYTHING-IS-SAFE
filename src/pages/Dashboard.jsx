import { useState } from 'react'

/* ─────────────────────────────────────────────────────────────
   DESIGN TOKENS
   #FF3B3B  — SOS red (primary)
   #0A0A0B  — near-black text
   #F5F5F7  — Apple surface gray
   #E8E8ED  — border
   #6B6B6B  — secondary text
   #ABABAB  — tertiary / placeholder
   #1C1C1E  — dark chip/pill bg
   #FFFFFF  — base white
───────────────────────────────────────────────────────────── */

const T = {
  red: '#FF3B3B',
  redDark: '#D92B2B',
  redGlow: 'rgba(255,59,59,0.25)',
  black: '#0A0A0B',
  surface: '#F5F5F7',
  border: '#E8E8ED',
  sub: '#6B6B6B',
  muted: '#ABABAB',
  dark: '#1C1C1E',
  white: '#FFFFFF',
}

/* ── Inline style helpers ──────────────────────────────────── */
const redGrad = {
  background: `linear-gradient(135deg, ${T.red} 0%, #FF6B6B 100%)`,
}

/* ── SVG icon primitives (zero dependency) ─────────────────── */
const Icon = {
  Home: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M3 12L12 3l9 9" /><path d="M9 21V12h6v9" /><path d="M3 12v9h18v-9" />
    </svg>
  ),
  Shield: ({ size = 20, filled = false }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  Bot: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect x="3" y="11" width="18" height="10" rx="2" /><circle cx="12" cy="5" r="2" /><path d="M12 7v4" /><line x1="8" y1="16" x2="8" y2="16" /><line x1="16" y1="16" x2="16" y2="16" />
    </svg>
  ),
  Settings: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  MapPin: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Bell: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
  ChevronRight: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M9 18l6-6-6-6" />
    </svg>
  ),
  Phone: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.34 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 5.55 5.55l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  Users: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Hospital: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /><line x1="12" y1="12" x2="12" y2="16" /><line x1="10" y1="14" x2="14" y2="14" />
    </svg>
  ),
  AlertTriangle: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  CheckCircle: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  Navigation: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <polygon points="3 11 22 2 13 21 11 13 3 11" />
    </svg>
  ),
}

/* ── Reusable card shell ────────────────────────────────────── */
function Card({ children, className = '', style = {}, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-3xl border border-[#E8E8ED] ${onClick ? 'cursor-pointer active:scale-[0.98] transition-transform duration-150' : ''} ${className}`}
      style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.06)', ...style }}
    >
      {children}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   SECTION: Greeting
───────────────────────────────────────────────────────────── */
function GreetingSection() {
  return (
    <div className="flex items-center justify-between px-5 pt-6 pb-2">
      <div>
        <p className="text-sm font-medium text-[#6B6B6B] mb-0.5">Good morning,</p>
        <h1 className="text-2xl font-black tracking-tight text-[#0A0A0B]">
          Sarah 👋
        </h1>
        <p className="text-sm text-[#6B6B6B] mt-0.5">You have 3 guardians watching over you.</p>
      </div>

      {/* Avatar with notification dot */}
      <div className="relative">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-lg"
          style={{ background: 'linear-gradient(135deg, #FF3B3B, #FF6B6B)', boxShadow: '0 4px 16px rgba(255,59,59,0.35)' }}
        >
          S
        </div>
        <span
          className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white bg-green-500"
          style={{ boxShadow: '0 0 6px rgba(34,197,94,0.6)' }}
        />
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   SECTION: Guardian Status Card
───────────────────────────────────────────────────────────── */
function GuardianCard() {
  const contacts = [
    { name: 'Mom', initials: 'M', watching: true },
    { name: 'Priya', initials: 'P', watching: true },
    { name: 'Dad', initials: 'D', watching: false },
  ]

  return (
    <Card className="mx-5 p-5">
      {/* Header row */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center text-white"
            style={redGrad}
          >
            <Icon.Shield size={18} filled={false} />
          </div>
          <div>
            <p className="font-bold text-[#0A0A0B] text-[15px] leading-tight">Guardian Mode</p>
            <p className="text-xs text-[#6B6B6B] mt-0.5">Active protection</p>
          </div>
        </div>

        {/* Live badge */}
        <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 px-2.5 py-1 rounded-full">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-green-700 text-[11px] font-bold uppercase tracking-wider">Live</span>
        </div>
      </div>

      {/* Contact avatars row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {contacts.map(({ initials, watching, name }) => (
            <div key={name} className="relative">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 border-white"
                style={{
                  background: watching
                    ? 'linear-gradient(135deg,#FF3B3B,#FF6B6B)'
                    : '#E8E8ED',
                  color: watching ? '#fff' : '#ABABAB',
                  boxShadow: watching ? '0 2px 8px rgba(255,59,59,0.3)' : 'none',
                }}
              >
                {initials}
              </div>
              <span
                className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white ${watching ? 'bg-green-500' : 'bg-[#D0D0D5]'}`}
              />
            </div>
          ))}
          <div className="flex flex-col ml-1">
            <span className="text-[#0A0A0B] font-semibold text-sm">3 contacts</span>
            <span className="text-[#6B6B6B] text-[11px]">watching now</span>
          </div>
        </div>

        <button
          className="flex items-center gap-1 text-[#FF3B3B] text-xs font-semibold hover:opacity-70 transition-opacity"
        >
          Manage <Icon.ChevronRight />
        </button>
      </div>

      {/* Thin progress bar — "safety score" */}
      <div className="mt-4">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-[11px] text-[#6B6B6B]">Safety score</span>
          <span className="text-[11px] font-bold text-[#0A0A0B]">98%</span>
        </div>
        <div className="h-1.5 bg-[#F5F5F7] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{ width: '98%', background: 'linear-gradient(90deg,#FF3B3B,#FF6B6B)' }}
          />
        </div>
      </div>
    </Card>
  )
}

/* ─────────────────────────────────────────────────────────────
   SECTION: SOS Button
───────────────────────────────────────────────────────────── */
function SOSButton() {
  const [pressing, setPressing] = useState(false)
  const [held, setHeld] = useState(false)
  const [progress, setProgress] = useState(0)

  let holdTimer = null
  let progTimer = null

  const startHold = () => {
    setPressing(true)
    setProgress(0)

    // Increment progress bar
    const start = Date.now()
    progTimer = setInterval(() => {
      const pct = Math.min(((Date.now() - start) / 2000) * 100, 100)
      setProgress(pct)
    }, 30)

    // After 2s fire SOS
    holdTimer = setTimeout(() => {
      clearInterval(progTimer)
      setProgress(100)
      setHeld(true)
      setTimeout(() => { setHeld(false); setProgress(0); setPressing(false) }, 2500)
    }, 2000)
  }

  const cancelHold = () => {
    clearTimeout(holdTimer)
    clearInterval(progTimer)
    setPressing(false)
    setProgress(0)
  }

  return (
    <div className="flex flex-col items-center py-6 px-5">
      {/* Label above */}
      <p className="text-xs font-semibold text-[#ABABAB] uppercase tracking-[0.18em] mb-5">
        Emergency Trigger
      </p>

      {/* Glow rings + button */}
      <div className="relative flex items-center justify-center mb-5">
        {/* Outermost ambient ring */}
        <div
          className="absolute w-52 h-52 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, rgba(255,59,59,0.10) 0%, transparent 70%)`,
            transform: pressing ? 'scale(1.12)' : 'scale(1)',
            transition: 'transform 0.4s ease',
          }}
        />
        {/* Pulse rings (always on) */}
        <div
          className="absolute w-44 h-44 rounded-full border border-[rgba(255,59,59,0.15)]"
          style={{ animation: 'sosPing 2.4s ease-out infinite' }}
        />
        <div
          className="absolute w-40 h-40 rounded-full border border-[rgba(255,59,59,0.12)]"
          style={{ animation: 'sosPing 2.4s ease-out 0.5s infinite' }}
        />
        <div
          className="absolute w-36 h-36 rounded-full border border-[rgba(255,59,59,0.10)]"
          style={{ animation: 'sosPing 2.4s ease-out 1s infinite' }}
        />

        {/* Button */}
        <button
          className="relative w-32 h-32 rounded-full flex flex-col items-center justify-center select-none focus:outline-none z-10 transition-transform duration-150"
          style={{
            background: held
              ? 'linear-gradient(135deg,#22c55e,#16a34a)'
              : pressing
                ? 'linear-gradient(135deg,#D92B2B,#FF3B3B)'
                : 'linear-gradient(135deg,#FF3B3B,#FF6B6B)',
            boxShadow: pressing
              ? `0 0 0 6px rgba(255,59,59,0.15), 0 0 48px rgba(255,59,59,0.55), 0 12px 40px rgba(255,59,59,0.5)`
              : `0 0 0 4px rgba(255,59,59,0.10), 0 8px 32px rgba(255,59,59,0.45)`,
            transform: pressing ? 'scale(0.93)' : 'scale(1)',
          }}
          onMouseDown={startHold}
          onMouseUp={cancelHold}
          onMouseLeave={cancelHold}
          onTouchStart={startHold}
          onTouchEnd={cancelHold}
          aria-label="Hold for SOS emergency alert"
        >
          {/* Glass sheen overlay */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 15%, rgba(255,255,255,0.28), transparent)' }}
          />

          {held ? (
            <>
              <svg className="w-8 h-8 text-white mb-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
              <span className="text-white text-[10px] font-bold tracking-widest">SENT</span>
            </>
          ) : (
            <>
              <span className="text-white font-black text-2xl tracking-tight leading-none">SOS</span>
              <span className="text-white/75 text-[9px] font-semibold tracking-widest mt-1 uppercase">
                {pressing ? 'HOLD…' : 'HOLD'}
              </span>
            </>
          )}
        </button>
      </div>

      {/* Hold progress bar */}
      <div className="w-32 h-1 bg-[#E8E8ED] rounded-full overflow-hidden mb-3">
        <div
          className="h-full rounded-full transition-all duration-75"
          style={{ width: `${progress}%`, background: progress === 100 ? '#22c55e' : 'linear-gradient(90deg,#FF3B3B,#FF6B6B)' }}
        />
      </div>

      <p className="text-[#ABABAB] text-[11px] font-medium text-center">
        {held ? '🚨 Alerting your contacts + 112' : pressing ? 'Keep holding to send SOS…' : 'Hold 2 seconds to trigger emergency alert'}
      </p>

      {/* Keyframe injected once */}
      <style>{`
        @keyframes sosPing {
          0%   { transform: scale(0.92); opacity: 0.7; }
          100% { transform: scale(1.9);  opacity: 0;   }
        }
      `}</style>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   SECTION: Quick Actions 2×2
───────────────────────────────────────────────────────────── */
function QuickActions({ setActiveTab }) {
  const actions = [
    {
      label: 'Hospital',
      sub: 'Nearest in 1.2 km',
      icon: <Icon.Hospital />,
      color: '#FF3B3B',
      bg: '#FFF1F1',
    },
    {
      label: 'Police',
      sub: 'Station 0.8 km away',
      icon: <Icon.Phone />,
      color: '#3B82F6',
      bg: '#EFF6FF',
    },
    {
      label: 'AI Assistant',
      sub: 'Ask anything',
      icon: <Icon.Bot />,
      color: '#8B5CF6',
      bg: '#F5F3FF',
    },
    {
      label: 'Contacts',
      sub: '3 contacts saved',
      icon: <Icon.Users />,
      color: '#10B981',
      bg: '#ECFDF5',
    },
  ]

  return (
    <div className="px-5">
      <div className="flex items-center justify-between mb-3">
        <p className="text-base font-bold text-[#0A0A0B]">Quick Actions</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {actions.map(({ label, sub, icon, color, bg }) => (
          <button
            key={label}
            onClick={() => label === 'AI Assistant' && setActiveTab('ai')}
            className="flex items-center gap-3 p-4 rounded-2xl border border-[#E8E8ED] bg-white text-left hover:border-[#D0D0D5] hover:shadow-md active:scale-[0.97] transition-all duration-150"
            style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.05)' }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: bg, color }}
            >
              {icon}
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-[#0A0A0B] text-sm truncate">{label}</p>
              <p className="text-[#ABABAB] text-[11px] truncate">{sub}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   SECTION: Live Location Card
───────────────────────────────────────────────────────────── */
function LiveLocationCard() {
  const [sharing, setSharing] = useState(true)

  return (
    <Card className="mx-5 overflow-hidden">
      {/* Fake map area */}
      <div
        className="relative h-28 w-full overflow-hidden"
        style={{ background: 'linear-gradient(160deg,#E8F4FD 0%,#D4EDFA 100%)' }}
      >
        {/* Grid lines to simulate map */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'linear-gradient(#93C5FD 1px,transparent 1px),linear-gradient(90deg,#93C5FD 1px,transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        {/* Fake roads */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 360 112" preserveAspectRatio="none">
          <path d="M0 56 Q90 30 180 56 T360 56" stroke="#BFDBFE" strokeWidth="6" fill="none" />
          <path d="M120 0 Q150 56 120 112" stroke="#BFDBFE" strokeWidth="4" fill="none" />
          <path d="M240 0 Q210 56 240 112" stroke="#BFDBFE" strokeWidth="4" fill="none" />
        </svg>
        {/* Location pin */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full flex flex-col items-center">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg"
            style={{ background: 'linear-gradient(135deg,#FF3B3B,#FF6B6B)', boxShadow: '0 4px 12px rgba(255,59,59,0.5)' }}
          >
            S
          </div>
          <div className="w-0.5 h-2 bg-[#FF3B3B] opacity-60" />
        </div>
        {/* Accuracy ring */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-2 border-[rgba(255,59,59,0.3)]"
          style={{ background: 'rgba(255,59,59,0.07)' }}
        />
        {/* Map label chip */}
        <div className="absolute top-2.5 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1.5 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-[10px] font-semibold text-[#0A0A0B]">HSR Layout, Bengaluru</span>
        </div>
        {/* Accuracy label */}
        <div className="absolute bottom-2 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-0.5">
          <span className="text-[10px] font-medium text-[#6B6B6B]">±4m GPS</span>
        </div>
      </div>

      {/* Controls row */}
      <div className="flex items-center justify-between px-4 py-3.5">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[#FF3B3B]" style={{ background: '#FFF1F1' }}>
            <Icon.Navigation />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#0A0A0B]">Location Sharing</p>
            <p className="text-[11px] text-[#6B6B6B]">{sharing ? 'Shared with 3 contacts' : 'Off — tap to enable'}</p>
          </div>
        </div>

        {/* Toggle */}
        <button
          onClick={() => setSharing(v => !v)}
          className="relative w-12 h-6.5 rounded-full transition-colors duration-250 focus:outline-none"
          style={{
            background: sharing ? 'linear-gradient(135deg,#FF3B3B,#FF6B6B)' : '#E8E8ED',
            height: '26px',
            width: '48px',
          }}
          aria-label="Toggle location sharing"
        >
          <span
            className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-all duration-200"
            style={{ left: sharing ? '26px' : '2px', boxShadow: '0 1px 4px rgba(0,0,0,0.18)' }}
          />
        </button>
      </div>
    </Card>
  )
}

/* ─────────────────────────────────────────────────────────────
   SECTION: Recent Alerts Timeline
───────────────────────────────────────────────────────────── */
function RecentAlerts() {
  const alerts = [
    {
      type: 'checkin',
      icon: <Icon.CheckCircle />,
      color: '#10B981',
      bg: '#ECFDF5',
      title: 'Safe check-in confirmed',
      sub: 'Reached home safely · Guardians notified',
      time: '2 min ago',
    },
    {
      type: 'guardian',
      icon: <Icon.Shield size={14} />,
      color: '#FF3B3B',
      bg: '#FFF1F1',
      title: 'Guardian joined',
      sub: 'Priya started watching your journey',
      time: '18 min ago',
    },
    {
      type: 'alert',
      icon: <Icon.AlertTriangle />,
      color: '#F59E0B',
      bg: '#FFFBEB',
      title: 'Area alert nearby',
      sub: 'Police advisory issued — 2.1 km away',
      time: '1 hr ago',
    },
    {
      type: 'location',
      icon: <Icon.MapPin />,
      color: '#3B82F6',
      bg: '#EFF6FF',
      title: 'Live location shared',
      sub: 'Started sharing with Mom & Dad',
      time: '3 hrs ago',
    },
  ]

  return (
    <div className="px-5 pb-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-base font-bold text-[#0A0A0B]">Recent Activity</p>
        <button className="text-[#FF3B3B] text-xs font-semibold hover:opacity-70 transition-opacity flex items-center gap-0.5">
          View all <Icon.ChevronRight />
        </button>
      </div>

      <Card className="divide-y divide-[#F0F0F5] overflow-hidden">
        {alerts.map(({ icon, color, bg, title, sub, time }, i) => (
          <div
            key={i}
            className="flex items-start gap-3.5 px-4 py-3.5 hover:bg-[#FAFAFA] transition-colors cursor-pointer"
          >
            {/* Icon + connector line */}
            <div className="flex flex-col items-center flex-shrink-0 pt-0.5">
              <div
                className="w-7 h-7 rounded-xl flex items-center justify-center"
                style={{ background: bg, color }}
              >
                {icon}
              </div>
              {i < alerts.length - 1 && <div className="w-px h-full mt-1 bg-[#E8E8ED] flex-1 min-h-[10px]" />}
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#0A0A0B] leading-tight">{title}</p>
              <p className="text-[#6B6B6B] text-xs mt-0.5 leading-relaxed">{sub}</p>
            </div>

            {/* Time */}
            <span className="text-[#ABABAB] text-[10px] font-medium flex-shrink-0 pt-0.5">{time}</span>
          </div>
        ))}
      </Card>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   TAB: Guardian
───────────────────────────────────────────────────────────── */
function GuardianTab() {
  const contacts = [
    { name: 'Mom', phone: '+91 98765 43210', status: 'Watching', active: true },
    { name: 'Priya Sharma', phone: '+91 87654 32109', status: 'Watching', active: true },
    { name: 'Dad', phone: '+91 76543 21098', status: 'Offline', active: false },
  ]

  return (
    <div className="px-5 pt-6 pb-4 space-y-4">
      <div>
        <h2 className="text-2xl font-black text-[#0A0A0B] tracking-tight">Guardian Mode</h2>
        <p className="text-sm text-[#6B6B6B] mt-1">People watching over you right now.</p>
      </div>

      {/* Status hero card */}
      <div
        className="rounded-3xl p-5 text-white relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg,#FF3B3B 0%,#FF6B6B 100%)', boxShadow: '0 8px 32px rgba(255,59,59,0.35)' }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,255,255,0.18), transparent)' }} />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-white/80 text-xs font-semibold uppercase tracking-wider">Active Now</span>
          </div>
          <p className="text-2xl font-black leading-tight">2 of 3 contacts<br />are watching</p>
          <p className="text-white/70 text-xs mt-1.5">Auto-alert fires if you don't check in by 11 PM</p>
        </div>
      </div>

      {/* Contact cards */}
      <div className="space-y-3">
        {contacts.map(({ name, phone, status, active }) => (
          <Card key={name} className="flex items-center gap-3.5 p-4">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
              style={{ background: active ? 'linear-gradient(135deg,#FF3B3B,#FF6B6B)' : '#E8E8ED', color: active ? '#fff' : '#ABABAB' }}
            >
              {name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-[#0A0A0B] text-sm">{name}</p>
              <p className="text-[#ABABAB] text-xs">{phone}</p>
            </div>
            <div className="flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-green-500 animate-pulse' : 'bg-[#D0D0D5]'}`} />
              <span className={`text-xs font-semibold ${active ? 'text-green-600' : 'text-[#ABABAB]'}`}>{status}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Add contact CTA */}
      <button
        className="w-full py-3.5 rounded-2xl border-2 border-dashed border-[#E8E8ED] text-[#6B6B6B] text-sm font-semibold hover:border-[#FF3B3B] hover:text-[#FF3B3B] transition-colors"
      >
        + Add Guardian Contact
      </button>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   TAB: AI Assistant
───────────────────────────────────────────────────────────── */
function AITab() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Hi Sarah! I'm your AI Emergency Assistant. Ask me anything — first aid, what to do in a crisis, or where to get help nearby." },
  ])
  const [loading, setLoading] = useState(false)

  const suggestions = [
  "Someone is choking",
  "I think I'm being followed",
  "How do I do CPR?",
  "Nearest hospital",
];

  const sendMessage = async (text) => {
    const msg = text || input.trim()
    if (!msg || loading) return
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text: msg }])
    setLoading(true)
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 1000,
          system: `You are the AI Emergency Assistant inside "Everything Is Safe", a personal safety app.
Answer emergency questions calmly, clearly, and concisely in 2–4 sentences.
Prioritise immediate safety. If someone is in immediate danger tell them to call 112 or 911 first.
Never provide medical diagnoses. Use plain, easy-to-follow language.`,
          messages: [
            ...messages.filter(m => m.role === 'user' || m.role === 'ai').map(m => ({
              role: m.role === 'ai' ? 'assistant' : 'user',
              content: m.text,
            })),
            { role: 'user', content: msg },
          ],
        }),
      })
      const data = await res.json()
      const reply = data.content?.[0]?.text || "If you're in immediate danger, call 112 or 911 now."
      setMessages(prev => [...prev, { role: 'ai', text: reply }])
    } catch {
      setMessages(prev => [...prev, { role: 'ai', text: "Connection issue. If you're in danger, call 112 or 911 immediately." }])
    }
    setLoading(false)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-5 pt-6 pb-3">
        <h2 className="text-2xl font-black text-[#0A0A0B] tracking-tight">AI Assistant</h2>
        <p className="text-sm text-[#6B6B6B] mt-0.5">Powered by Claude · Always here for you</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 space-y-3 pb-2">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} gap-2`}>
            {m.role === 'ai' && (
              <div className="w-7 h-7 rounded-xl flex-shrink-0 flex items-center justify-center text-white text-[10px] font-bold self-end" style={redGrad}>AI</div>
            )}
            <div
              className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${m.role === 'user'
                  ? 'text-white rounded-tr-sm'
                  : 'bg-[#F5F5F7] text-[#0A0A0B] rounded-tl-sm'
                }`}
              style={m.role === 'user' ? redGrad : {}}
            >
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-2">
            <div className="w-7 h-7 rounded-xl flex-shrink-0 flex items-center justify-center text-white text-[10px] font-bold self-end" style={redGrad}>AI</div>
            <div className="bg-[#F5F5F7] rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
              {[0, 1, 2].map(i => (
                <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#ABABAB]" style={{ animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite` }} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Suggestions */}
      {messages.length <= 2 && (
        <div className="px-5 flex gap-2 flex-wrap pb-2">
          {suggestions.map(s => (
            <button
              key={s}
              onClick={() => sendMessage(s)}
              className="text-xs bg-white border border-[#E8E8ED] text-[#6B6B6B] px-3 py-1.5 rounded-full hover:border-[#FF3B3B] hover:text-[#FF3B3B] transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="px-5 pb-5 pt-2">
        <div className="flex gap-2 bg-[#F5F5F7] rounded-2xl p-1.5 border border-[#E8E8ED]">
          <input
            className="flex-1 bg-transparent px-3 text-sm text-[#0A0A0B] outline-none placeholder:text-[#ABABAB]"
            placeholder="Ask an emergency question…"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
          />
          <button
            onClick={() => sendMessage()}
            disabled={loading || !input.trim()}
            className="text-white px-4 py-2 rounded-xl text-xs font-bold disabled:opacity-40 transition-opacity"
            style={redGrad}
          >
            {loading ? '…' : 'Send'}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%,100% { transform:translateY(0); }
          50%      { transform:translateY(-4px); }
        }
      `}</style>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   TAB: Settings
───────────────────────────────────────────────────────────── */
function SettingsTab() {
  const [toggles, setToggles] = useState({
    guardian: true, location: true, fallDetect: true, notifications: true, voiceSOS: false,
  })

  const toggle = key => setToggles(v => ({ ...v, [key]: !v[key] }))

  const items = [
    { key: 'guardian', label: 'Guardian Mode', sub: 'Auto-alert your circle' },
    { key: 'location', label: 'Live Location', sub: 'Share with contacts' },
    { key: 'fallDetect', label: 'Fall Detection', sub: 'Impact + stillness check' },
    { key: 'notifications', label: 'Push Notifications', sub: 'Alerts and reminders' },
    { key: 'voiceSOS', label: 'Voice SOS', sub: 'Activate by wake phrase' },
  ]

  return (
    <div className="px-5 pt-6 pb-4 space-y-4">
      <div>
        <h2 className="text-2xl font-black text-[#0A0A0B] tracking-tight">Settings</h2>
        <p className="text-sm text-[#6B6B6B] mt-0.5">Manage your safety preferences.</p>
      </div>

      {/* Profile card */}
      <Card className="flex items-center gap-4 p-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-xl flex-shrink-0"
          style={{ background: 'linear-gradient(135deg,#FF3B3B,#FF6B6B)', boxShadow: '0 4px 16px rgba(255,59,59,0.3)' }}
        >
          S
        </div>
        <div>
          <p className="font-bold text-[#0A0A0B] text-base">Sarah Johnson</p>
          <p className="text-[#ABABAB] text-xs mt-0.5">sarah@example.com</p>
          <span className="inline-block mt-1.5 text-[10px] font-semibold text-[#FF3B3B] bg-[#FFF1F1] border border-red-100 px-2 py-0.5 rounded-full">
            Premium Member
          </span>
        </div>
      </Card>

      {/* Toggles */}
      <Card className="divide-y divide-[#F0F0F5] overflow-hidden">
        {items.map(({ key, label, sub }) => (
          <div key={key} className="flex items-center justify-between px-4 py-3.5">
            <div>
              <p className="text-sm font-semibold text-[#0A0A0B]">{label}</p>
              <p className="text-[11px] text-[#ABABAB]">{sub}</p>
            </div>
            <button
              onClick={() => toggle(key)}
              className="relative flex-shrink-0 rounded-full transition-colors duration-200 focus:outline-none"
              style={{ width: 48, height: 26, background: toggles[key] ? 'linear-gradient(135deg,#FF3B3B,#FF6B6B)' : '#E8E8ED' }}
            >
              <span
                className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all duration-200"
                style={{ left: toggles[key] ? 26 : 2, boxShadow: '0 1px 4px rgba(0,0,0,0.18)' }}
              />
            </button>
          </div>
        ))}
      </Card>

      {/* Action row */}
      <div className="space-y-2.5">
        {['Privacy Policy', 'Terms of Use', 'Help & Support'].map(l => (
          <button
            key={l}
            className="w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-white border border-[#E8E8ED] hover:bg-[#F5F5F7] transition-colors"
            style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
          >
            <span className="text-sm text-[#0A0A0B] font-medium">{l}</span>
            <Icon.ChevronRight />
          </button>
        ))}
      </div>

      <button className="w-full py-3 rounded-2xl border border-red-200 text-[#FF3B3B] text-sm font-semibold hover:bg-[#FFF1F1] transition-colors">
        Sign Out
      </button>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   BOTTOM NAVIGATION
───────────────────────────────────────────────────────────── */
function BottomNav({ active, setActive }) {
  const tabs = [
    { key: 'home', label: 'Home', icon: <Icon.Home /> },
    { key: 'guardian', label: 'Guardian', icon: <Icon.Shield size={20} /> },
    { key: 'ai', label: 'AI', icon: <Icon.Bot /> },
    { key: 'settings', label: 'Settings', icon: <Icon.Settings /> },
  ]

  return (
    <nav
      className="fixed bottom-0 inset-x-0 mx-auto max-w-lg bg-white/90 border-t border-[#E8E8ED] flex items-center"
      style={{
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: '0 -1px 0 rgba(0,0,0,0.06), 0 -8px 24px rgba(0,0,0,0.05)',
        paddingBottom: 'env(safe-area-inset-bottom)',
        height: 64,
      }}
    >
      {tabs.map(({ key, label, icon }) => {
        const isActive = active === key
        return (
          <button
            key={key}
            onClick={() => setActive(key)}
            className="flex-1 flex flex-col items-center justify-center gap-0.5 py-2 transition-all duration-150 active:scale-90 focus:outline-none"
          >
            <span
              className="transition-colors duration-150"
              style={{ color: isActive ? T.red : T.muted }}
            >
              {icon}
            </span>
            <span
              className="text-[10px] font-semibold transition-colors duration-150"
              style={{ color: isActive ? T.red : T.muted }}
            >
              {label}
            </span>
            {isActive && (
              <span
                className="w-1 h-1 rounded-full mt-0.5"
                style={{ background: T.red }}
              />
            )}
          </button>
        )
      })}
    </nav>
  )
}

/* ─────────────────────────────────────────────────────────────
   HOME FEED (scrollable content)
───────────────────────────────────────────────────────────── */
function HomeTab({ setActiveTab }) {
  return (
    <div className="space-y-4 pb-4">
      <GreetingSection />
      <GuardianCard />
      <SOSButton />
      <QuickActions setActiveTab={setActiveTab} />
      <div className="pt-1">
        <LiveLocationCard />
      </div>
      <RecentAlerts />
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   ROOT DASHBOARD
───────────────────────────────────────────────────────────── */
export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('home')

  const renderTab = () => {
    switch (activeTab) {
      case 'home': return <HomeTab setActiveTab={setActiveTab} />
      case 'guardian': return <GuardianTab />
      case 'ai': return <AITab />
      case 'settings': return <SettingsTab />
      default: return <HomeTab setActiveTab={setActiveTab} />
    }
  }

  return (
    /* Full-viewport container, centers the "phone app" column on wide screens */
    <div
      className="min-h-screen bg-[#F5F5F7]"
      style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif', WebkitFontSmoothing: 'antialiased' }}
    >
      {/* Centered phone-width column */}
      <div className="relative mx-auto max-w-lg bg-[#F5F5F7] min-h-screen">

        {/* Scrollable content area (leaves room for fixed bottom nav) */}
        <main
          className="overflow-y-auto"
          style={{ paddingBottom: 'calc(64px + env(safe-area-inset-bottom))' }}
        >
          {/* White top status bar simulation */}
          <div
            className="sticky top-0 z-40 h-3 w-full bg-white/80"
            style={{ backdropFilter: 'blur(8px)' }}
          />

          {/* Tab content */}
          <div
            className="bg-white min-h-screen"
            style={{ borderRadius: activeTab === 'home' ? '0' : '0' }}
          >
            {renderTab()}
          </div>
        </main>

        {/* Fixed bottom nav */}
        <BottomNav active={activeTab} setActive={setActiveTab} />
      </div>
    </div>
  )
}