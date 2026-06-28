import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   DESIGN TOKENS (derived from plan)
   Base:    #FFFFFF / #F5F5F7
   Text:    #0A0A0B / #6B6B6B
   Red:     #EF2222 / #FF5555
   Border:  #E8E8ED
───────────────────────────────────────────── */

// ── Scroll-reveal hook ──────────────────────
function useReveal(delay = 0) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible, delay];
}

// ── Animated counter ─────────────────────────
function Counter({ to, suffix = "", prefix = "" }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const done = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true;
        const dur = 1800, start = Date.now();
        const tick = () => {
          const p = Math.min((Date.now() - start) / dur, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          setVal(Math.floor(ease * to));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{prefix}{val.toLocaleString()}{suffix}</span>;
}

// ── Feature pill badge ───────────────────────
function Pill({ children }) {
  return (
    <span className="inline-flex items-center gap-1.5 bg-red-50 text-red-600 text-xs font-semibold px-3 py-1 rounded-full border border-red-100">
      <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
      {children}
    </span>
  );
}

// ── Phone mockup with SOS button ─────────────
function PhoneMockup() {
  const [pressed, setPressed] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);

  const handleSOS = () => {
    setPressed(true);
    setTimeout(() => {
      setAlertVisible(true);
      setPressed(false);
    }, 600);
    setTimeout(() => setAlertVisible(false), 3200);
  };

  return (
    <div className="relative flex justify-center">
      {/* Glow behind phone */}
      <div className="absolute top-8 w-64 h-64 bg-red-400/20 rounded-full blur-3xl" />

      {/* Phone shell */}
      <div className="relative w-[260px] bg-[#0A0A0B] rounded-[44px] shadow-[0_40px_80px_rgba(0,0,0,0.25),0_0_0_1px_rgba(255,255,255,0.08)] overflow-hidden border border-white/10">
        {/* Status bar */}
        <div className="flex justify-between items-center px-6 pt-4 pb-2">
          <span className="text-white text-[11px] font-semibold">9:41</span>
          <div className="w-20 h-5 bg-[#1C1C1E] rounded-full" />
          <div className="flex gap-1.5 items-center">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M1.5 8.5a13 13 0 0 1 21 0M5 12a10 10 0 0 1 14 0M8.5 15.5a6 6 0 0 1 7 0M12 19h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/></svg>
            <div className="w-6 h-3 border border-white/60 rounded-sm relative"><div className="absolute inset-0.5 right-1 bg-white/80 rounded-sm" /></div>
          </div>
        </div>

        {/* Screen content */}
        <div className="px-4 pb-6 pt-1">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white/50 text-[10px]">Good evening,</p>
              <p className="text-white font-bold text-sm">Sarah</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center">
              <span className="text-white text-xs font-bold">S</span>
            </div>
          </div>

          {/* Status card */}
          <div className="bg-[#1C1C1E] rounded-2xl p-3 mb-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-[11px] font-semibold">Guardian Active</p>
              <p className="text-white/40 text-[10px] truncate">3 contacts watching • Live</p>
            </div>
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          </div>

          {/* SOS Button */}
          <div className="flex flex-col items-center my-5">
            <p className="text-white/40 text-[10px] mb-3 uppercase tracking-widest">Hold for SOS</p>
            <button
              onClick={handleSOS}
              className="relative w-28 h-28 rounded-full focus:outline-none select-none"
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              {/* Outer pulse rings */}
              <span className="absolute inset-0 rounded-full border-2 border-red-500/30 animate-ping" style={{ animationDuration: "2s" }} />
              <span className="absolute inset-2 rounded-full border border-red-500/20 animate-ping" style={{ animationDuration: "2s", animationDelay: "0.4s" }} />
              {/* Button face */}
              <span
                className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500 to-red-700 shadow-[0_8px_32px_rgba(239,34,34,0.6)] flex items-center justify-center transition-transform duration-200"
                style={{ transform: pressed ? "scale(0.93)" : "scale(1)" }}
              >
                <span className="text-white font-black text-xl tracking-tight">SOS</span>
              </span>
            </button>
          </div>

          {/* Alert toast */}
          <div
            className="bg-red-600 rounded-xl px-3 py-2 mb-3 transition-all duration-300"
            style={{ opacity: alertVisible ? 1 : 0, transform: alertVisible ? "scale(1)" : "scale(0.95)" }}
          >
            <p className="text-white text-[11px] font-bold">🚨 SOS Activated</p>
            <p className="text-red-100 text-[10px]">Alerting 3 contacts + 911...</p>
          </div>

          {/* Quick action tiles */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { icon: "🏥", label: "Hospital" },
              { icon: "👮", label: "Police" },
              { icon: "🤖", label: "AI Help" },
            ].map(({ icon, label }) => (
              <div key={label} className="bg-[#1C1C1E] rounded-xl p-2 flex flex-col items-center gap-1">
                <span className="text-lg">{icon}</span>
                <span className="text-white/60 text-[9px] font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Feature card ─────────────────────────────
function FeatureCard({ icon, title, desc, tag, delay = 0 }) {
  const [ref, visible] = useReveal(delay);
  return (
    <div
      ref={ref}
      className="bg-white border border-[#E8E8ED] rounded-2xl p-6 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-1 group"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms, box-shadow 0.3s, translate 0.3s`,
      }}
    >
      <div className="w-11 h-11 rounded-xl bg-[#F5F5F7] flex items-center justify-center mb-4 group-hover:bg-red-50 transition-colors duration-300 text-xl">
        {icon}
      </div>
      {tag && <div className="mb-3"><Pill>{tag}</Pill></div>}
      <h3 className="font-bold text-[#0A0A0B] text-base mb-2 leading-tight">{title}</h3>
      <p className="text-[#6B6B6B] text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

// ── Stat card ────────────────────────────────
function StatCard({ to, suffix, prefix, label, sub }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className="text-center"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.7s ease" }}
    >
      <div className="text-4xl md:text-5xl font-black text-[#0A0A0B] mb-1">
        <Counter to={to} suffix={suffix} prefix={prefix} />
      </div>
      <div className="font-semibold text-[#0A0A0B] text-sm mb-1">{label}</div>
      {sub && <div className="text-[#6B6B6B] text-xs">{sub}</div>}
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function EverythingIsSafe() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [aiMsg, setAiMsg] = useState("");
  const [aiReply, setAiReply] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const features = [
    { icon: "🆘", title: "One-Tap SOS", desc: "One press sends your GPS location and an emergency alert to all your contacts and local emergency services simultaneously.", tag: "Core" },
    { icon: "🛡️", title: "Guardian Mode", desc: "Let trusted people passively watch your journey. They see your location in real time and get alerted if you stop responding.", tag: "Popular" },
    { icon: "📍", title: "Live Location Sharing", desc: "Share your exact route with family during late nights, solo travel, or unfamiliar neighborhoods — no sign-up required for recipients." },
    { icon: "🤖", title: "AI Emergency Assistant", desc: "Powered by Gemini. Ask anything in a crisis — what to do after an accident, how to help someone unconscious, what symptoms mean.", tag: "AI" },
    { icon: "🩺", title: "AI First Aid Guidance", desc: "Step-by-step voice-guided instructions for CPR, burns, choking, fractures, and more — even when you've never trained." },
    { icon: "🎙️", title: "Voice-Activated SOS", desc: "Activate an alert with a custom wake phrase. Works with your phone in your pocket, bag, or across the room." },
    { icon: "🏥", title: "Nearby Hospitals & Police", desc: "Find the nearest emergency services instantly, with one-tap calling, estimated wait times, and turn-by-turn walking directions." },
    { icon: "📲", title: "Emergency Contact Alerts", desc: "Your emergency circle gets an SMS, push notification, and email the moment you trigger SOS — with your photo and last known location." },
    { icon: "📴", title: "Offline Emergency Guide", desc: "Critical survival instructions, local emergency numbers, and first aid steps are always available — no signal needed." },
    { icon: "⚡", title: "Fall Detection", desc: "If your phone detects a sudden impact with no movement for 30 seconds, EIS automatically initiates a safety check-in." },
  ];

  const steps = [
    { emoji: "📲", title: "Download the app", desc: "Available on iOS and Android. Set up takes under 2 minutes." },
    { emoji: "👥", title: "Add your safety circle", desc: "Add family, friends, or a roommate as your emergency contacts." },
    { emoji: "🛡️", title: "Turn on Guardian Mode", desc: "Enable passive monitoring whenever you're out — it runs quietly in the background." },
    { emoji: "🆘", title: "One tap when you need help", desc: "Press SOS. We handle the rest — alerts, location, and instructions." },
  ];

  const handleAiDemo = async () => {
    if (!aiMsg.trim() || aiLoading) return;
    setAiLoading(true);
    setAiReply("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          system: "You are the AI Emergency Assistant inside 'Everything Is Safe', a personal safety app. Answer emergency questions calmly, clearly, and concisely in 2–4 sentences. Prioritize safety. If someone is in immediate danger, tell them to call 911 first. Never provide medical diagnoses.",
          messages: [{ role: "user", content: aiMsg }],
        }),
      });
      const data = await res.json();
      setAiReply(data.content?.[0]?.text || "I'm here to help. Please call 112 or 911 if you're in immediate danger.");
    } catch {
      setAiReply("Connection issue. If you're in danger, call 112 or 911 immediately.");
    }
    setAiLoading(false);
  };

  return (
    <div className="bg-white text-[#0A0A0B] font-sans antialiased overflow-x-hidden">
      <style>{`
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes slide-up { from { opacity:0; transform:translateY(32px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fade-in { from { opacity:0; } to { opacity:1; } }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        .anim-float { animation: float 5s ease-in-out infinite; }
        .anim-su-1 { animation: slide-up 0.7s ease 0.05s both; }
        .anim-su-2 { animation: slide-up 0.7s ease 0.18s both; }
        .anim-su-3 { animation: slide-up 0.7s ease 0.32s both; }
        .anim-su-4 { animation: slide-up 0.7s ease 0.46s both; }
        .hero-grad { background: radial-gradient(ellipse 70% 55% at 50% -10%, rgba(239,34,34,0.08) 0%, transparent 65%); }
        .red-grad { background: linear-gradient(135deg, #EF2222 0%, #FF5555 100%); }
        .text-red-grad { background: linear-gradient(135deg, #EF2222, #FF7070); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .loading-shimmer { background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); background-size: 200% 100%; animation: shimmer 1.4s ease-in-out infinite; }
        * { -webkit-font-smoothing: antialiased; }
      `}</style>

      {/* ── NAV ─────────────────────────────────── */}
      <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-xl border-b border-[#E8E8ED]/80 shadow-sm" : ""}`}>
        <div className="max-w-6xl mx-auto px-5 h-[60px] flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 red-grad rounded-xl flex items-center justify-center shadow-[0_2px_12px_rgba(239,34,34,0.4)]">
              <span className="text-white font-black text-sm">EIS</span>
            </div>
            <span className="font-bold text-[#0A0A0B] text-[15px] hidden sm:block">Everything Is Safe</span>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7 text-sm text-[#6B6B6B]">
            {["Features", "How It Works", "Guardian Mode", "AI Assistant"].map(l => (
              <a key={l} href={`#${l.toLowerCase().replace(/ /g, "-")}`} className="hover:text-[#0A0A0B] transition-colors">{l}</a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a href="#download" className="red-grad text-white text-sm font-semibold px-5 py-2 rounded-xl hover:opacity-90 transition-opacity shadow-[0_2px_16px_rgba(239,34,34,0.3)]">
              Download Free
            </a>
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden p-2 text-[#6B6B6B]" onClick={() => setMenuOpen(o => !o)}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white border-b border-[#E8E8ED] px-5 pb-5 flex flex-col gap-3 text-sm text-[#6B6B6B]">
            {["Features", "How It Works", "Guardian Mode", "AI Assistant"].map(l => (
              <a key={l} href="#" onClick={() => setMenuOpen(false)} className="py-1.5 hover:text-[#0A0A0B] transition-colors">{l}</a>
            ))}
            <a href="#download" className="mt-1 red-grad text-white font-semibold py-3 rounded-xl text-center">Download Free</a>
          </div>
        )}
      </nav>

      {/* ── HERO ─────────────────────────────────── */}
      <section className="relative pt-28 pb-20 px-5 hero-grad overflow-hidden">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Left copy */}
          <div>
            <div className="anim-su-1">
              <Pill>Free · Available on iOS & Android</Pill>
            </div>
            <h1 className="mt-5 text-5xl sm:text-6xl font-black tracking-[-0.03em] leading-[1.0] anim-su-2">
              Your safety,<br />
              <span className="text-red-grad">one tap away.</span>
            </h1>
            <p className="mt-5 text-[#6B6B6B] text-lg leading-relaxed max-w-md anim-su-3">
              Everything Is Safe is the personal emergency app that detects danger, alerts your loved ones, and guides you through any crisis — instantly.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 anim-su-4">
              <a href="#download" className="red-grad text-white font-bold px-7 py-3.5 rounded-2xl text-[15px] text-center hover:opacity-90 transition-opacity shadow-[0_4px_24px_rgba(239,34,34,0.35)]">
                Download Free
              </a>
              <a href="#features" className="bg-[#F5F5F7] text-[#0A0A0B] font-semibold px-7 py-3.5 rounded-2xl text-[15px] text-center hover:bg-[#EBEBEF] transition-colors">
                See Features →
              </a>
            </div>
            {/* Social proof */}
            <div className="mt-8 flex items-center gap-3 anim-su-4">
              <div className="flex -space-x-2">
                {["🧑‍🦱","👩","🧓","👨‍🎓","👩‍💼"].map((e, i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-[#F5F5F7] border-2 border-white flex items-center justify-center text-sm">{e}</div>
                ))}
              </div>
              <div className="text-sm text-[#6B6B6B]">
                <span className="font-bold text-[#0A0A0B]">50,000+</span> people protected today
              </div>
            </div>
          </div>

          {/* Right phone */}
          <div className="anim-float flex justify-center md:justify-end">
            <PhoneMockup />
          </div>
        </div>
      </section>

      {/* ── WHY EIS ──────────────────────────────── */}
      <section className="py-24 px-5 bg-[#F5F5F7]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-red-600 text-xs font-bold uppercase tracking-[0.18em] mb-3">Why Everything Is Safe?</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">
              Designed for how<br />people actually get hurt.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                stat: "83%",
                title: "Emergencies happen alone",
                desc: "Most people face accidents, attacks, or medical crises when no one physically nearby can help. EIS closes that gap.",
                color: "bg-red-50 border-red-100",
                statColor: "text-red-600",
              },
              {
                stat: "4 min",
                title: "Average emergency response delay",
                desc: "Four minutes is a long time. EIS alerts your personal network in under 3 seconds — people who know you and care.",
                color: "bg-white border-[#E8E8ED]",
                statColor: "text-[#0A0A0B]",
              },
              {
                stat: "1 in 3",
                title: "Women feel unsafe regularly",
                desc: "Walking home, ridesharing, traveling solo — EIS is the silent guardian that runs in the background so you don't have to think about it.",
                color: "bg-white border-[#E8E8ED]",
                statColor: "text-[#0A0A0B]",
              },
            ].map(({ stat, title, desc, color, statColor }, i) => {
              const [r, v] = useReveal(i * 100);
              return (
                <div
                  key={title}
                  ref={r}
                  className={`border rounded-2xl p-7 ${color}`}
                  style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(20px)", transition: `opacity 0.6s ease ${i * 100}ms, transform 0.6s ease ${i * 100}ms` }}
                >
                  <div className={`text-5xl font-black mb-3 ${statColor}`}>{stat}</div>
                  <h3 className="font-bold text-[#0A0A0B] text-base mb-2">{title}</h3>
                  <p className="text-[#6B6B6B] text-sm leading-relaxed">{desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────── */}
      <section id="features" className="py-24 px-5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-red-600 text-xs font-bold uppercase tracking-[0.18em] mb-3">Everything You Need</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">
              10 features. One mission:<br />
              <span className="text-red-grad">keep you safe.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <FeatureCard key={f.title} {...f} delay={i * 60} />
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────── */}
      <section id="how-it-works" className="py-24 px-5 bg-[#F5F5F7]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-red-600 text-xs font-bold uppercase tracking-[0.18em] mb-3">Setup in Minutes</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">How it works</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {steps.map(({ emoji, title, desc }, i) => {
              const [r, v] = useReveal(i * 80);
              return (
                <div
                  key={title}
                  ref={r}
                  className="bg-white border border-[#E8E8ED] rounded-2xl p-6 flex gap-4 items-start"
                  style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(20px)", transition: `opacity 0.6s ease ${i * 80}ms, transform 0.6s ease ${i * 80}ms` }}
                >
                  <div className="w-12 h-12 bg-[#F5F5F7] rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">{emoji}</div>
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-red-600 text-xs font-bold">Step {i + 1}</span>
                    </div>
                    <h3 className="font-bold text-[#0A0A0B] text-[15px] mb-1">{title}</h3>
                    <p className="text-[#6B6B6B] text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── GUARDIAN MODE ────────────────────────── */}
      <section id="guardian-mode" className="py-24 px-5">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          {/* Visual */}
          <div className="order-2 md:order-1">
            <div className="bg-[#F5F5F7] rounded-3xl p-8">
              {/* Guardian UI simulation */}
              <div className="bg-white rounded-2xl shadow-sm border border-[#E8E8ED] p-5 mb-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-bold text-sm">Guardian Mode</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-green-600 text-xs font-semibold">Active</span>
                  </div>
                </div>
                <div className="bg-[#F5F5F7] rounded-xl h-36 flex items-center justify-center mb-4 relative overflow-hidden">
                  {/* Fake map */}
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(#ccc 1px,transparent 1px),linear-gradient(90deg,#ccc 1px,transparent 1px)", backgroundSize: "20px 20px" }} />
                  {/* Route line */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 120">
                    <path d="M 30 90 Q 80 40 170 30" stroke="#EF2222" strokeWidth="2.5" fill="none" strokeDasharray="4 3" strokeLinecap="round" />
                    <circle cx="30" cy="90" r="5" fill="#EF2222" />
                    <circle cx="170" cy="30" r="4" fill="#6B6B6B" />
                  </svg>
                  <div className="relative bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow">📍 Sarah is here</div>
                </div>
                <div className="space-y-2">
                  {[
                    { name: "Mom", status: "Watching", color: "text-green-600 bg-green-50" },
                    { name: "Roommate Priya", status: "Watching", color: "text-green-600 bg-green-50" },
                    { name: "Dad", status: "Offline", color: "text-[#6B6B6B] bg-[#F5F5F7]" },
                  ].map(({ name, status, color }) => (
                    <div key={name} className="flex items-center justify-between">
                      <span className="text-sm text-[#0A0A0B]">{name}</span>
                      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${color}`}>{status}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-red-50 border border-red-100 rounded-xl p-3 text-sm text-red-700">
                <span className="font-semibold">Auto-alert in 8 min</span> if Sarah doesn't check in at destination.
              </div>
            </div>
          </div>

          {/* Copy */}
          <div className="order-1 md:order-2">
            <Pill>Guardian Mode</Pill>
            <h2 className="mt-4 text-4xl md:text-5xl font-black tracking-tight leading-tight">
              Someone's always<br />
              <span className="text-red-grad">watching over you.</span>
            </h2>
            <p className="mt-5 text-[#6B6B6B] leading-relaxed">
              Guardian Mode lets people you trust see your live location and journey — silently running in the background. If you stop moving or don't check in, they're alerted automatically.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Share a journey with up to 5 guardians",
                "Auto-alert if you go off-route or stop moving",
                "Recipients need no app to receive alerts",
                "Turns off automatically when you arrive safe",
              ].map(item => (
                <li key={item} className="flex items-start gap-3 text-sm text-[#6B6B6B]">
                  <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-red-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── AI EMERGENCY ASSISTANT ───────────────── */}
      <section id="ai-assistant" className="py-24 px-5 bg-[#F5F5F7]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          {/* Copy */}
          <div>
            <Pill>Powered by Gemini AI</Pill>
            <h2 className="mt-4 text-4xl md:text-5xl font-black tracking-tight leading-tight">
              Ask anything.<br />
              <span className="text-red-grad">Get help instantly.</span>
            </h2>
            <p className="mt-5 text-[#6B6B6B] leading-relaxed">
              Our AI Emergency Assistant answers your crisis questions in seconds — from first aid steps to what to say when calling 911. Try it right here.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {[
                "Someone is choking, what do I do?",
                "I think I'm having a panic attack",
                "My child has a high fever",
                "I'm being followed, help",
              ].map(q => (
                <button
                  key={q}
                  onClick={() => setAiMsg(q)}
                  className="text-xs bg-white border border-[#E8E8ED] text-[#6B6B6B] px-3 py-1.5 rounded-full hover:border-red-300 hover:text-red-600 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Live AI demo */}
          <div className="bg-white border border-[#E8E8ED] rounded-2xl overflow-hidden shadow-sm">
            {/* Chat header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-[#E8E8ED]">
              <div className="w-9 h-9 red-grad rounded-xl flex items-center justify-center">
                <span className="text-white text-lg">🤖</span>
              </div>
              <div>
                <div className="font-bold text-sm">AI Emergency Assistant</div>
                <div className="text-[#6B6B6B] text-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Online · Powered by Claude
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="px-5 py-4 min-h-[160px] space-y-3">
              {!aiReply && !aiLoading && (
                <div className="flex gap-2">
                  <div className="w-7 h-7 red-grad rounded-lg flex-shrink-0 flex items-center justify-center text-white text-xs">AI</div>
                  <div className="bg-[#F5F5F7] rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-[#0A0A0B] max-w-xs">
                    Hi! I'm your emergency assistant. Ask me anything — first aid, what to do in a crisis, or where to get help nearby.
                  </div>
                </div>
              )}
              {aiMsg && (
                <div className="flex justify-end gap-2">
                  <div className="bg-red-600 text-white rounded-2xl rounded-tr-sm px-4 py-3 text-sm max-w-xs">
                    {aiMsg}
                  </div>
                </div>
              )}
              {aiLoading && (
                <div className="flex gap-2">
                  <div className="w-7 h-7 red-grad rounded-lg flex-shrink-0 flex items-center justify-center text-white text-xs">AI</div>
                  <div className="loading-shimmer h-14 w-48 rounded-2xl" />
                </div>
              )}
              {aiReply && (
                <div className="flex gap-2">
                  <div className="w-7 h-7 red-grad rounded-lg flex-shrink-0 flex items-center justify-center text-white text-xs">AI</div>
                  <div className="bg-[#F5F5F7] rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-[#0A0A0B] max-w-xs leading-relaxed">{aiReply}</div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="px-4 pb-4">
              <div className="flex gap-2 bg-[#F5F5F7] rounded-xl p-1.5">
                <input
                  className="flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-[#ABABAB]"
                  placeholder="Ask an emergency question..."
                  value={aiMsg}
                  onChange={e => setAiMsg(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleAiDemo()}
                />
                <button
                  onClick={handleAiDemo}
                  disabled={aiLoading || !aiMsg.trim()}
                  className="red-grad text-white px-4 py-2 rounded-lg text-xs font-bold disabled:opacity-50 transition-opacity"
                >
                  {aiLoading ? "..." : "Ask"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────── */}
      <section className="py-24 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-red-600 text-xs font-bold uppercase tracking-[0.18em] mb-3">Impact</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">Numbers that matter.</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            <StatCard to={50000} suffix="+" label="People protected" sub="Globally, every day" />
            <StatCard to={3} suffix="s" label="SOS alert speed" sub="Avg. notification time" />
            <StatCard to={98} suffix="%" label="User satisfaction" sub="Based on 12,000 reviews" />
            <StatCard to={14} label="Languages" sub="Fully supported" />
          </div>
        </div>
      </section>

      {/* ── DOWNLOAD CTA ─────────────────────────── */}
      <section id="download" className="py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="red-grad rounded-3xl px-8 py-16 md:py-20 text-center relative overflow-hidden">
            {/* Soft radial on the card */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(255,255,255,0.15),transparent)]" />
            <div className="relative z-10">
              <p className="text-red-100 text-xs font-bold uppercase tracking-[0.2em] mb-4">Free Forever · No Credit Card</p>
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight mb-5">
                Download EIS.<br />Feel safe anywhere.
              </h2>
              <p className="text-red-100 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
                Join thousands of students, travellers, and families who use Everything Is Safe every day. Free to download. Always.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {/* App Store button */}
                <a href="#" className="inline-flex items-center gap-3 bg-black text-white px-6 py-3.5 rounded-2xl hover:bg-[#1a1a1a] transition-colors">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-[10px] text-white/70 leading-none mb-0.5">Download on the</div>
                    <div className="font-bold text-base leading-none">App Store</div>
                  </div>
                </a>
                {/* Play Store button */}
                <a href="#" className="inline-flex items-center gap-3 bg-black text-white px-6 py-3.5 rounded-2xl hover:bg-[#1a1a1a] transition-colors">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.18 23.76c.37.21.8.24 1.2.08l12.12-6.97-2.62-2.62-10.7 9.51zM20.54 10.29L17.78 8.7l-2.94 2.94 2.94 2.95 2.78-1.6c.8-.46.8-1.65-.02-2.1zM2.36.22C2.14.43 2 .76 2 1.18v21.64c0 .42.14.75.36.96l.08.07L13.55 12.7v-.27L2.44.15l-.08.07zM14.88 9.35L3.18.24l10.7 9.51 1-1.4z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-[10px] text-white/70 leading-none mb-0.5">Get it on</div>
                    <div className="font-bold text-base leading-none">Google Play</div>
                  </div>
                </a>
              </div>
              <p className="text-red-200/60 text-sm mt-8">No ads. No data selling. Your privacy is protected.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────── */}
      <footer className="border-t border-[#E8E8ED] py-14 px-5">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 red-grad rounded-xl flex items-center justify-center shadow-[0_2px_12px_rgba(239,34,34,0.3)]">
                  <span className="text-white font-black text-sm">EIS</span>
                </div>
                <span className="font-bold text-[#0A0A0B]">Everything Is Safe</span>
              </div>
              <p className="text-[#6B6B6B] text-sm leading-relaxed max-w-xs mb-5">
                Personal safety for students, women, travellers, and families. Free on iOS and Android.
              </p>
              <div className="flex gap-2">
                {["𝕏", "in", "ig"].map(s => (
                  <a key={s} href="#" className="w-8 h-8 border border-[#E8E8ED] rounded-lg flex items-center justify-center text-[#6B6B6B] hover:text-[#0A0A0B] hover:border-[#0A0A0B] transition-colors text-xs font-bold">{s}</a>
                ))}
              </div>
            </div>
            {[
              { heading: "App", links: ["Features", "Guardian Mode", "AI Assistant", "Offline Guide", "Fall Detection"] },
              { heading: "Company", links: ["About", "Blog", "Hackathon", "Press Kit"] },
              { heading: "Legal", links: ["Privacy Policy", "Terms of Use", "Cookie Policy", "Security"] },
            ].map(({ heading, links }) => (
              <div key={heading}>
                <h4 className="font-semibold text-[#0A0A0B] text-sm mb-4">{heading}</h4>
                <ul className="space-y-3">
                  {links.map(l => <li key={l}><a href="#" className="text-[#6B6B6B] text-sm hover:text-[#0A0A0B] transition-colors">{l}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-[#E8E8ED] pt-7 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#ABABAB]">
            <p>© 2024 Everything Is Safe. Built for good.</p>
            <p>Made with ❤️ for safety — a hackathon project</p>
          </div>
        </div>
      </footer>
    </div>
  );
}