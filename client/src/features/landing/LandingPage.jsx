import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  RiCrosshair2Line, RiFlaskLine, RiMapLine, RiBookOpenLine, RiMedalLine,
  RiBrainLine, RiNodeTree, RiLinksLine, RiShieldCheckLine, RiBuilding2Line,
  RiGiftLine, RiGraduationCapLine, RiBriefcaseLine, RiTeamLine,
} from 'react-icons/ri';

/* ─── Logo ──────────────────────────────────────────────────── */
const Logo = ({ size = 30, light = false }) => (
  <svg width={size} height={size} viewBox="0 0 30 30" fill="none">
    <circle cx="7" cy="22" r="3.2" fill="#D4613E" />
    <circle cx="15" cy="9" r="3.2" fill="#F0B41E" />
    <circle cx="23" cy="22" r="3.2" fill="#B84C2F" />
    <path d="M9.2 20 L13 11 M16.8 11 L21 20" stroke={light ? "#ffffff" : "#0E2A2B"} strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

/* ─── Animate-on-scroll hook ─────────────────────────────────── */
const useReveal = (threshold = 0.15) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
};

/* ─── SkillPathBackdrop (from login page) ────────────────────── */
const SkillPathBackdrop = () => (
  <svg
    viewBox="0 0 1600 900"
    className="absolute inset-0 h-full w-full"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
  >
    <path d="M -40 140 Q 300 60, 600 160 T 1300 110 T 1700 160" fill="none" stroke="#D4613E" strokeOpacity="0.14" strokeWidth="2" />
    <path d="M -40 220 Q 320 130, 640 240 T 1340 180 T 1700 230" fill="none" stroke="#D4613E" strokeOpacity="0.10" strokeWidth="2" />
    <path d="M -40 720 Q 340 640, 660 740 T 1360 680 T 1700 730" fill="none" stroke="#F0B41E" strokeOpacity="0.16" strokeWidth="2" />
    <path d="M -40 800 Q 360 860, 680 770 T 1380 830 T 1700 780" fill="none" stroke="#D4613E" strokeOpacity="0.10" strokeWidth="2" />

    <path
      d="M 60 100 L 220 280 L 130 460 L 340 560 L 260 760
         M 1540 110 L 1380 260 L 1480 440 L 1280 540 L 1360 740"
      fill="none"
      stroke="#D4613E"
      strokeOpacity="0.35"
      strokeWidth="2.5"
      className="path-trace"
    />

    <circle cx="60"   cy="100" r="6" fill="#D4613E" />
    <circle cx="220"  cy="280" r="6" fill="#E8855A" />
    <circle cx="130"  cy="460" r="7" fill="#F0B41E" />
    <circle cx="340"  cy="560" r="5" fill="#D4613E" fillOpacity="0.55" />
    <circle cx="260"  cy="760" r="5" fill="#D4613E" fillOpacity="0.3" />

    <circle cx="1540" cy="110" r="6" fill="#D4613E" />
    <circle cx="1380" cy="260" r="5" fill="#E8855A" fillOpacity="0.55" />
    <circle cx="1480" cy="440" r="5" fill="#D4613E" fillOpacity="0.4" />
    <circle cx="1280" cy="540" r="5" fill="#D4613E" fillOpacity="0.3" />
    <circle cx="1360" cy="740" r="5" fill="#D4613E" fillOpacity="0.22" />
  </svg>
);

/* ─── Journey Flowchart (original vertical) ──────────────────── */
const JourneyFlowchart = () => {
  const steps = [
    { title: 'Choose a Topic',      subtitle: 'Pick any skill you want to master',      color: '#D4613E' },
    { title: 'Diagnostic Quiz',     subtitle: 'AI probes what you actually know',        color: '#E8855A' },
    { title: 'Gap Analysis',        subtitle: 'See your strengths & weak spots',         color: '#ef4444' },
    { title: 'Smart Learning Path', subtitle: 'Curated free resources, just for you',   color: '#F0B41E' },
    { title: 'Build a Project',     subtitle: 'Prove it with real work',                 color: '#D4613E' },
    { title: 'Earn Credits',        subtitle: 'AI evaluates the quality of your work',  color: '#E8855A' },
    { title: 'Redeem Rewards',      subtitle: 'Turn your skills into real prizes',       color: '#B84C2F' },
  ];

  return (
    <div className="relative w-full select-none">
      <div className="relative text-center mb-7">
        <span className="text-[10px] font-bold tracking-[0.2em] text-terra-500/70 uppercase">Your Journey</span>
        <h3 className="font-display text-lg md:text-xl font-bold text-ink-900 mt-1">From curious to certified</h3>
      </div>

      <div className="relative pl-6 md:pl-8">
        {/* Vertical line */}
        <div className="absolute left-[13px] md:left-[17px] top-[20px] bottom-[20px] w-[2px] rounded-full"
             style={{ background: 'linear-gradient(to bottom, #D4613E40, #F0B41E40, #B84C2F40)' }} />

        {steps.map((step, i) => (
          <div key={i} className="relative flex items-start gap-4 mb-5 last:mb-0">
            <div className="relative z-10 shrink-0 w-[28px] h-[28px] md:w-[34px] md:h-[34px] -ml-6 md:-ml-8
                            rounded-full flex items-center justify-center
                            text-[11px] md:text-xs font-bold text-white shadow-sm"
                 style={{ backgroundColor: step.color }}>
              {i + 1}
            </div>
            <div className="pt-0.5 md:pt-1 min-w-0">
              <p className="font-display font-semibold text-ink-900 text-[13px] md:text-[14px] leading-tight">{step.title}</p>
              <p className="text-ink-400 text-[11px] md:text-xs mt-0.5 leading-snug">{step.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─── Step Card ──────────────────────────────────────────────── */
const StepCard = ({ number, title, description, icon: Icon, delay }) => {
  const [ref, visible] = useReveal(0.2);
  return (
    <div ref={ref}
      className={`relative group transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${delay}ms` }}>
      <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-terra-100/60 p-6 h-full
                      hover:shadow-[0_12px_40px_-12px_rgba(212,97,62,0.15)] hover:border-terra-500/30 transition-all duration-300 hover:-translate-y-1">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-9 h-9 rounded-xl bg-terra-500/10 text-terra-500 flex items-center justify-center text-lg font-bold font-display">{number}</span>
          <span className="w-9 h-9 rounded-xl bg-terra-500/[0.08] flex items-center justify-center">
            <Icon size={18} className="text-terra-500" />
          </span>
        </div>
        <h3 className="font-display font-semibold text-ink-900 text-lg mb-2">{title}</h3>
        <p className="text-sm text-ink-400 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

/* ─── Feature Card ───────────────────────────────────────────── */
const FeatureCard = ({ icon: Icon, title, description, accentColor, delay }) => {
  const [ref, visible] = useReveal(0.15);
  return (
    <div ref={ref}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${delay}ms` }}>
      <div className="group relative bg-white/70 backdrop-blur-sm rounded-2xl border border-ink-900/[0.06] p-6 h-full
                      hover:shadow-[0_16px_48px_-12px_rgba(212,97,62,0.14)] transition-all duration-300 hover:-translate-y-1 hover:border-terra-500/25">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
             style={{ backgroundColor: `${accentColor}15` }}>
          <Icon size={22} style={{ color: accentColor }} />
        </div>
        <h3 className="font-display font-semibold text-ink-900 text-[17px] mb-2">{title}</h3>
        <p className="text-sm text-ink-400 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

/* ─── Audience Card ──────────────────────────────────────────── */
const AudienceCard = ({ icon: Icon, title, description, delay }) => {
  const [ref, visible] = useReveal(0.15);
  return (
    <div ref={ref}
      className={`transition-all duration-700 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
      style={{ transitionDelay: `${delay}ms` }}>
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-ink-900/[0.06] p-7 h-full
                      hover:shadow-[0_12px_36px_-8px_rgba(212,97,62,0.12)] transition-all duration-300">
        <div className="w-12 h-12 rounded-xl bg-terra-500/10 flex items-center justify-center mb-5">
          <Icon size={22} className="text-terra-500" />
        </div>
        <h3 className="font-display font-semibold text-ink-900 text-lg mb-2">{title}</h3>
        <p className="text-sm text-ink-400 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

/* ─── Stat Counter ───────────────────────────────────────────── */
const StatCounter = ({ value, label, suffix = '' }) => {
  const [ref, visible] = useReveal(0.3);
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const duration = 1500;
    const step = Math.ceil(value / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= value) { setCount(value); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [visible, value]);
  return (
    <div ref={ref} className="text-center">
      <div className="font-display font-bold text-4xl md:text-5xl text-terra-500">{visible ? count : 0}{suffix}</div>
      <p className="text-sm text-ink-400 mt-1 font-medium">{label}</p>
    </div>
  );
};

/* ─── Navbar ─────────────────────────────────────────────────── */
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const navLinks = [['How It Works','#how-it-works'],['Features','#features'],["Who It's For",'#audience']];
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-paper-50/85 backdrop-blur-xl shadow-[0_1px_0_rgba(212,97,62,0.08)]' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-2.5">
          <Logo size={28} />
          <span className="font-display font-bold text-lg text-ink-900 tracking-tight">GapFinder</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(([label,href]) => (
            <a key={href} href={href} className="text-sm text-ink-400 font-medium hover:text-terra-500 transition-colors relative
              after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-terra-500 after:rounded-full after:transition-all hover:after:w-full">
              {label}
            </a>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <Link to="/login" className="text-sm font-semibold text-ink-700 px-4 py-2 rounded-xl hover:bg-paper-100 transition-colors">Log in</Link>
          <Link to="/register" className="text-sm font-semibold text-white bg-terra-500 px-5 py-2.5 rounded-xl hover:bg-terra-600 transition-all active:scale-[0.97]">
            Get Started — Free
          </Link>
        </div>
        <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          <span className={`w-5 h-0.5 bg-ink-900 rounded-full transition-transform ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-5 h-0.5 bg-ink-900 rounded-full transition-opacity ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`w-5 h-0.5 bg-ink-900 rounded-full transition-transform ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>
      <div className={`md:hidden overflow-hidden transition-all duration-300 bg-paper-50/95 backdrop-blur-xl ${mobileOpen ? 'max-h-80 border-b border-terra-100/50' : 'max-h-0'}`}>
        <div className="px-5 py-4 flex flex-col gap-3">
          {navLinks.map(([label,href]) => (
            <a key={href} href={href} onClick={() => setMobileOpen(false)} className="text-sm font-medium text-ink-700 py-2">{label}</a>
          ))}
          <hr className="border-ink-900/5" />
          <Link to="/login" className="text-sm font-semibold text-ink-700 py-2">Log in</Link>
          <Link to="/register" className="text-sm font-semibold text-white bg-terra-500 px-5 py-2.5 rounded-xl text-center transition-all">Get Started — Free</Link>
        </div>
      </div>
    </nav>
  );
};

/* ═══════════════════════════════════════════════════════════════
   LANDING PAGE
   ═══════════════════════════════════════════════════════════════ */
export const LandingPage = () => {
  const [heroRef, heroVisible] = useReveal(0.05);

  return (
    <div className="min-h-screen bg-paper-50 overflow-x-hidden topo-field bg-fixed">
      <Navbar />

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section id="hero" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
        {/* Login-page backdrop: two node-maps on left & right */}
        <SkillPathBackdrop />

        <div ref={heroRef} className="relative max-w-6xl mx-auto px-5">
          <div className="grid md:grid-cols-2 gap-12 md:gap-8 items-center">

            {/* Left: Copy */}
            <div className={`transition-all duration-1000 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <div className="inline-flex items-center gap-2 bg-terra-500/10 rounded-full px-4 py-1.5 mb-6">
                <span className="w-2 h-2 rounded-full bg-terra-500 animate-pulse" />
                <span className="text-xs font-semibold text-terra-500 tracking-wide uppercase">AI-Powered Learning</span>
              </div>
              <h1 className="font-display text-[2.5rem] md:text-[3.25rem] font-bold text-ink-900 leading-[1.1] tracking-tight">
                Learn what you
                <span className="relative inline-block ml-2">
                  <span className="relative z-10">actually</span>
                  <span className="absolute bottom-1 left-0 w-full h-3 bg-gold-400/40 rounded-sm -z-0" />
                </span>
                <br />don't know.
              </h1>
              <p className="mt-5 text-lg text-ink-400 leading-relaxed max-w-lg">
                GapFinder diagnoses your real skill gaps with adaptive quizzes, builds a personalized
                path to close them, then proves you actually learned it — with AI‑evaluated projects,
                not just certificates.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link to="/register"
                      className="inline-flex items-center justify-center gap-2 bg-terra-500 text-white font-semibold
                                 px-7 py-3.5 rounded-xl text-[15px] hover:bg-terra-600 transition-all active:scale-[0.97]">
                  Start for Free
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
                <a href="#how-it-works"
                   className="inline-flex items-center justify-center gap-2 bg-white text-ink-700 font-semibold
                              px-7 py-3.5 rounded-xl text-[15px] border border-ink-900/10 hover:border-ink-900/20 hover:bg-paper-100 transition-all">
                  See How It Works
                </a>
              </div>
              <p className="mt-5 text-xs text-ink-400 flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M4.5 7L6.5 9L9.5 5M13 7A6 6 0 111 7a6 6 0 0112 0z" stroke="#D4613E" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Works for any topic
              </p>
            </div>

            {/* Right: Flowchart */}
            <div className={`transition-all duration-1000 delay-300 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <JourneyFlowchart />
            </div>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF BAR ──────────────────────────────────── */}
      <section className="relative py-12 bg-white/50 border-y border-ink-900/[0.04]">
        <div className="max-w-4xl mx-auto px-5 grid grid-cols-3 gap-6">
          <StatCounter value={100} suffix="%" label="Free forever" />
          <StatCounter value={50} suffix="+" label="Topics supported" />
          <StatCounter value={10} suffix="min" label="To find your gaps" />
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────── */}
      <section id="how-it-works" className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold tracking-widest text-terra-500 uppercase">The Process</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-ink-900 mt-2 tracking-tight">
              From "I want to learn X" to<br className="hidden sm:block" /> proven mastery in 5 steps
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            <StepCard number="1" icon={RiCrosshair2Line} title="Pick Any Topic" delay={0}
              description="Type whatever you want to learn — React, calculus, guitar theory. The AI builds a skill map instantly." />
            <StepCard number="2" icon={RiFlaskLine} title="Diagnostic Quiz" delay={100}
              description="A short adaptive quiz probes your knowledge. Get one wrong, and it digs deeper into that exact weak spot." />
            <StepCard number="3" icon={RiMapLine} title="See Your Gaps" delay={200}
              description="An interactive, color-coded skill map shows precisely what you know and what you don't. No guesswork." />
            <StepCard number="4" icon={RiBookOpenLine} title="Guided Learning" delay={300}
              description="Each weak skill links to the best free resource — videos, docs, exercises. A short quiz unlocks the next skill." />
            <StepCard number="5" icon={RiMedalLine} title="Prove It" delay={400}
              description="Build a real project using everything you learned. AI evaluates genuine quality — not just completion." />
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────── */}
      <section id="features" className="py-20 md:py-28 bg-white/40 relative overflow-hidden">
        <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1600 900" aria-hidden="true">
          <path d="M -40 250 Q 300 150, 700 350 T 1400 250 T 1700 300" fill="none" stroke="#F0B41E" strokeOpacity="0.07" strokeWidth="2" />
          <path d="M -40 650 Q 350 750, 800 550 T 1300 700 T 1700 650" fill="none" stroke="#D4613E" strokeOpacity="0.06" strokeWidth="2" />
        </svg>
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold tracking-widest text-terra-500 uppercase">Why GapFinder</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-ink-900 mt-2 tracking-tight">Not another course platform.</h2>
            <p className="text-ink-400 mt-3 max-w-xl mx-auto">Most platforms teach everyone the same thing. GapFinder adapts to what you specifically don't know.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <FeatureCard delay={0}   accentColor="#D4613E" icon={RiBrainLine}       title="Adaptive Diagnostics"
              description="Questions adjust in real time based on your answers. Wrong answers trigger deeper probing — surfacing gaps you didn't know existed." />
            <FeatureCard delay={100} accentColor="#F0B41E" icon={RiNodeTree}        title="Visual Skill Maps"
              description="An interactive node graph shows your mastery level for every sub-topic. Color-coded nodes let you see strengths and gaps at a glance." />
            <FeatureCard delay={200} accentColor="#D4613E" icon={RiLinksLine}       title="Curated Free Resources"
              description="Each weak skill links directly to the single best free resource — the right YouTube video, the right docs page, the right exercise." />
            <FeatureCard delay={300} accentColor="#D4613E" icon={RiShieldCheckLine} title="Structured Progression"
              description="You can't skip fundamentals. Each skill unlocks only after a quiz proves you've actually understood the prerequisite." />
            <FeatureCard delay={400} accentColor="#F0B41E" icon={RiBuilding2Line}   title="AI Project Evaluation"
              description="At the end, you build a real project. GapFinder's AI evaluates whether you genuinely applied what you learned — no fake certificates." />
            <FeatureCard delay={500} accentColor="#D4613E" icon={RiGiftLine}        title="Real Rewards"
              description="Earn points based on the quality of your work, redeemable for actual rewards. Performance matters, not just participation." />
          </div>
        </div>
      </section>

      {/* ── PROBLEM vs SOLUTION ──────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-5">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-red-50/80 border-2 border-red-300/60 rounded-2xl p-8">
              <span className="text-xs font-bold tracking-widest text-red-600 uppercase">The Problem</span>
              <h3 className="font-display text-2xl font-bold text-red-900 mt-3 mb-5">Learning today is broken</h3>
              <ul className="space-y-3.5">
                {[
                  "Generic courses assume everyone starts at the same level",
                  "No way to know what you actually don't know until it's too late",
                  "Certificates prove completion — not comprehension",
                  'Expensive coaching or "figure it out yourself" are the only options',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-red-800 leading-relaxed font-medium">
                    <svg className="w-5 h-5 text-red-500 shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.75 9.25a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-green-50/80 border-2 border-green-300/60 rounded-2xl p-8">
              <span className="text-xs font-bold tracking-widest text-green-700 uppercase">GapFinder's Approach</span>
              <h3 className="font-display text-2xl font-bold text-green-900 mt-3 mb-5">Personalized. Verified. Free.</h3>
              <ul className="space-y-3.5">
                {[
                  "AI adapts to your specific weak points — not a one-size-fits-all syllabus",
                  "Adaptive diagnostics reveal gaps before exams or interviews do",
                  "Real projects prove real skill — verified by AI, not just timestamps",
                  "Completely free for any topic, from school subjects to tech stacks",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-green-800 leading-relaxed font-medium">
                    <svg className="w-5 h-5 text-green-600 shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO IT'S FOR ─────────────────────────────────────── */}
      <section id="audience" className="py-20 md:py-28 bg-white/40 relative overflow-hidden">
        <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1600 900" aria-hidden="true">
          <path d="M -40 400 Q 400 550, 800 350 T 1400 450 T 1700 400" fill="none" stroke="#D4613E" strokeOpacity="0.05" strokeWidth="2" />
        </svg>
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold tracking-widest text-terra-500 uppercase">Built For</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-ink-900 mt-2 tracking-tight">
              Anyone who's tired of guessing<br className="hidden sm:block" /> what they don't know
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            <AudienceCard delay={0}   icon={RiGraduationCapLine} title="Students"
              description="From school exams to college tech skills — stop studying everything blindly and focus on the exact topics where you're weakest." />
            <AudienceCard delay={150} icon={RiBriefcaseLine}     title="Self-Learners & Job Seekers"
              description="Upskilling from tier 2 & 3 cities without expensive coaching? GapFinder is the personal tutor that tracks what you actually need next." />
            <AudienceCard delay={300} icon={RiTeamLine}          title="Teachers & Educators"
              description="Managing 40-60 students? Get instant visibility into where each student is genuinely struggling — without individual assessments." />
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────── */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-ink-900 via-[#0a2324] to-[#2a1a14]" />
        <div className="absolute inset-0 topo-field opacity-30" />
        <div className="relative max-w-3xl mx-auto px-5 text-center">
          <div className="inline-flex items-center gap-2 mb-6"><Logo size={36} light={true} /></div>
          <h2 className="font-display text-3xl md:text-[2.75rem] font-bold text-white leading-tight tracking-tight">
            Stop guessing.<br />Start knowing.
          </h2>
          <p className="mt-4 text-lg text-white/60 max-w-lg mx-auto">
            Tell GapFinder what you want to learn. In 10 minutes, you'll know exactly what you're missing — and have a clear path to fix it.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/register"
                  className="inline-flex items-center justify-center gap-2 bg-terra-500 text-white font-semibold
                             px-8 py-4 rounded-xl text-base hover:bg-terra-400 transition-all active:scale-[0.97]">
              Create Free Account
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
          <p className="mt-5 text-xs text-white/40">Works for any topic</p>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer className="bg-ink-900 py-12">
        <div className="max-w-6xl mx-auto px-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <Logo size={24} light={true} />
              <span className="font-display font-bold text-white/90 text-base">GapFinder</span>
            </div>
            <div className="flex items-center gap-6">
              {[['How It Works','#how-it-works'],['Features','#features'],["Who It's For",'#audience']].map(([label,href]) => (
                <a key={href} href={href} className="text-sm text-white/40 hover:text-white/70 transition-colors">{label}</a>
              ))}
            </div>
            <p className="text-xs text-white/30">© {new Date().getFullYear()} GapFinder. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};