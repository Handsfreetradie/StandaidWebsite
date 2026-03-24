import { useState, useEffect, useRef } from "react";
import { Routes, Route, Link, useNavigate } from "react-router";
import { motion, useInView, useMotionValue, useTransform, animate, AnimatePresence } from "motion/react";
import {
  ArrowRight, Menu, X, ChevronDown, Mic,
  PenTool, Calculator, ShieldCheck, Instagram, Linkedin, Youtube,
  Brain, GraduationCap, Wrench, FileText, Zap
} from "lucide-react";
import { StandAIdLogo } from "./components/StandAIdLogo";
import { allLogos } from "./components/StandardsLogos";
import { supabase } from "../lib/supabase";

/* ───── Kinso-matched palette ───── */
const ACCENT = "#DC2626"; // Changed from lavender to red
const BG = "#F7F5F2";
const DARK = "#1D1D1F";
const MUTED = "#86868B";
const BORDER = "rgba(0,0,0,0.06)";

/* ───── Scroll animation wrapper ───── */

function Reveal({ children, className = "", delay = 0 }: {
  children: React.ReactNode; className?: string; delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

/* ───── Animated counter ───── */

function CountUp({ target, duration = 2 }: { target: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) => Math.floor(v).toLocaleString());
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      animate(motionVal, target, { duration, ease: [0.25, 0.1, 0.25, 1] });
    }
  }, [inView, motionVal, target, duration]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

/* ───── Typing text hook ───── */

function useTypingText(text: string, startDelay: number, speed = 30) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(t);
  }, [startDelay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [started, text, speed]);

  return { displayed, started, done };
}

/* ──── Handwriting Animation ───── */

function HandwritingAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const lines = [
    { text: "Vd = (2 × L × I × R) / 1000", delay: 0 },
    { text: "L = 45m, I = 16A", delay: 0.6 },
    { text: "R = 1.15 Ω/km (2.5mm²)", delay: 1.2 },
    { text: "Vd = (2 × 45 × 16 × 1.15) / 1000", delay: 1.8 },
    { text: "Vd = 1.656V", delay: 2.4 },
  ];

  return (
    <div ref={ref} className="mt-3 flex flex-col gap-1.5 rounded-xl px-4 py-3" style={{ background: BG, minHeight: 120 }}>
      {lines.map((line, i) => (
        <motion.div
          key={i}
          className="text-xs"
          style={{ 
            color: DARK, 
            fontFamily: "'Caveat', cursive",
            fontSize: i === lines.length - 1 ? "15px" : "13px",
            fontWeight: i === lines.length - 1 ? 600 : 400
          }}
          initial={{ opacity: 0, x: -10 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: line.delay, ease: "easeOut" }}
        >
          {line.text}
        </motion.div>
      ))}
    </div>
  );
}

/* ───── iPhone Trade Tools Mockup ───── */

function IPhoneMockup() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [view, setView] = useState<"list" | "detail">("list");

  const tools = [
    { icon: <Zap size={18} />, name: "Volt Drop Calculator", color: "#DC2626" },
    { icon: <Calculator size={18} />, name: "Cable Sizing", color: "#EA580C" },
    { icon: <ArrowRight size={18} />, name: "Pipe Fall Calculator", color: "#CA8A04" },
    { icon: <FileText size={18} />, name: "Stair Rise & Going", color: "#16A34A" },
    { icon: <Wrench size={18} />, name: "Concrete Volume", color: "#2563EB" },
  ];

  useEffect(() => {
    if (!inView) return;
    
    // Only animate once - go to detail view after 2 seconds
    const timer = setTimeout(() => setView("detail"), 2000);
    
    return () => {
      clearTimeout(timer);
    };
  }, [inView]);

  return (
    <div ref={ref} className="flex items-center justify-center py-8">
      {/* iPhone Frame */}
      <div 
        className="relative rounded-[3rem] p-3 shadow-[0_20px_80px_rgba(0,0,0,0.15)]"
        style={{ 
          background: "linear-gradient(135deg, #2D2D2D 0%, #1A1A1A 100%)",
          width: "280px",
          height: "570px"
        }}
      >
        {/* Notch */}
        <div 
          className="absolute left-1/2 top-3 z-20 h-6 -translate-x-1/2 rounded-full"
          style={{ 
            background: "#000",
            width: "120px"
          }}
        />
        
        {/* Screen */}
        <div 
          className="relative h-full w-full overflow-hidden rounded-[2.5rem]"
          style={{ background: "#FAFAFA" }}
        >
          {/* Status Bar */}
          <div className="flex items-center justify-between px-6 pt-3 pb-2">
            <span className="text-[11px]" style={{ color: DARK }}>9:41</span>
            <div className="flex items-center gap-1">
              <div className="h-2.5 w-4 rounded-sm border" style={{ borderColor: DARK, borderWidth: "1px" }}>
                <div className="h-full w-3/4 rounded-sm" style={{ background: DARK }} />
              </div>
            </div>
          </div>

          {/* App Content */}
          <div className="px-5 pt-2">
            <AnimatePresence mode="wait">
              {view === "list" ? (
                <motion.div
                  key="list"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Logo */}
                  <div className="mb-6 flex items-center justify-center">
                    <StandAIdLogo className="text-lg" />
                  </div>

                  {/* Tools List */}
                  <div className="flex flex-col gap-2">
                    {tools.map((tool, i) => (
                      <motion.div
                        key={tool.name}
                        className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm"
                        style={{ border: `1px solid ${BORDER}` }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div 
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                          style={{ background: `${tool.color}15`, color: tool.color }}
                        >
                          {tool.icon}
                        </div>
                        <span className="text-sm" style={{ color: DARK }}>{tool.name}</span>
                        <ChevronDown size={14} className="ml-auto rotate-[-90deg]" style={{ color: MUTED }} />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="detail"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Back Button */}
                  <button className="mb-4 flex items-center gap-1 text-sm" style={{ color: ACCENT }}>
                    <ChevronDown size={16} className="rotate-90" />
                    <span>Tools</span>
                  </button>

                  {/* Tool Detail - Scrollable Content */}
                  <div className="rounded-2xl bg-white p-4 shadow-sm overflow-y-auto" style={{ border: `1px solid ${BORDER}`, maxHeight: "480px" }}>
                    <div className="mb-4 flex items-center gap-3">
                      <div 
                        className="flex h-12 w-12 items-center justify-center rounded-xl"
                        style={{ background: `${ACCENT}15`, color: ACCENT }}
                      >
                        <Zap size={22} />
                      </div>
                      <h3 className="text-base" style={{ color: DARK }}>Volt Drop Calculator</h3>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-medium" style={{ color: MUTED }}>Supply Type</label>
                        <div className="mt-1 rounded-lg bg-gray-50 px-3 py-2 text-sm" style={{ color: DARK }}>Single Phase</div>
                      </div>
                      
                      <div>
                        <label className="text-xs font-medium" style={{ color: MUTED }}>Cable Type</label>
                        <div className="mt-1 rounded-lg bg-gray-50 px-3 py-2 text-sm" style={{ color: DARK }}>Copper - PVC</div>
                      </div>
                      
                      <div>
                        <label className="text-xs font-medium" style={{ color: MUTED }}>Installation Method</label>
                        <div className="mt-1 rounded-lg bg-gray-50 px-3 py-2 text-sm" style={{ color: DARK }}>Enclosed (Method 3)</div>
                      </div>
                      
                      <div>
                        <label className="text-xs font-medium" style={{ color: MUTED }}>Cable Size (mm²)</label>
                        <div className="mt-1 rounded-lg bg-gray-50 px-3 py-2 text-sm" style={{ color: DARK }}>2.5</div>
                      </div>
                      
                      <div>
                        <label className="text-xs font-medium" style={{ color: MUTED }}>Cable Length (m)</label>
                        <div className="mt-1 rounded-lg bg-gray-50 px-3 py-2 text-sm" style={{ color: DARK }}>45</div>
                      </div>
                      
                      <div>
                        <label className="text-xs font-medium" style={{ color: MUTED }}>Load Current (A)</label>
                        <div className="mt-1 rounded-lg bg-gray-50 px-3 py-2 text-sm" style={{ color: DARK }}>16</div>
                      </div>
                      
                      <div>
                        <label className="text-xs font-medium" style={{ color: MUTED }}>Operating Temperature (°C)</label>
                        <div className="mt-1 rounded-lg bg-gray-50 px-3 py-2 text-sm" style={{ color: DARK }}>30</div>
                      </div>
                      
                      <div className="mt-4 rounded-xl px-4 py-3" style={{ background: `${ACCENT}10` }}>
                        <div className="text-xs font-medium" style={{ color: MUTED }}>Voltage Drop</div>
                        <div className="mt-1 text-xl font-semibold" style={{ color: ACCENT }}>1.66V (0.72%)</div>
                        <div className="mt-2 text-[10px]" style={{ color: MUTED }}>
                          ✓ Within AS/NZS 3000 limits (5%)
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───── Reusable bits ───── */

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-block rounded-full px-3.5 py-1 text-[11px] tracking-[.14em] uppercase"
      style={{ color: ACCENT, background: `${ACCENT}0c`, border: `1px solid ${ACCENT}20` }}
    >
      {children}
    </span>
  );
}

function Btn({ children, ghost, href, type, onClick }: {
  children: React.ReactNode; ghost?: boolean; href?: string; type?: "submit"; onClick?: () => void;
}) {
  const cls =
    "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm transition-all cursor-pointer " +
    (ghost ? "text-[#1D1D1F] hover:bg-[#00000008]" : "text-white hover:opacity-90");
  const style = ghost ? { border: `1px solid ${BORDER}` } : { background: ACCENT };
  if (href) {
    return <a href={href} onClick={onClick} className={cls} style={style}>{children}</a>;
  }
  return <button type={type ?? "button"} onClick={onClick} className={cls} style={style}>{children}</button>;
}

/* ───── NAV ───── */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let rafId: number;
    const fn = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => setScrolled(window.scrollY > 10));
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => {
      window.removeEventListener("scroll", fn);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const links = ["Features", "Tools", "How It Works", "FAQs"];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed inset-x-0 top-0 z-50 transition-all"
      style={{
        background: scrolled ? `${BG}dd` : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid ${BORDER}` : "1px solid transparent",
      }}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <StandAIdLogo className="text-xl" />
        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase().replace(/ /g, "-")}`}
              className="text-sm transition-colors"
              style={{ color: MUTED }}
              onMouseEnter={(e) => (e.currentTarget.style.color = DARK)}
              onMouseLeave={(e) => (e.currentTarget.style.color = MUTED)}
            >{l}</a>
          ))}
        </div>
        <div className="hidden md:block"><Btn href="#waitlist">Join the Waitlist</Btn></div>
        <button className="md:hidden" style={{ color: DARK }} onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="flex flex-col gap-4 px-6 pb-6 md:hidden" style={{ background: BG }}>
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase().replace(/ /g, "-")}`} className="text-sm" style={{ color: MUTED }} onClick={() => setOpen(false)}>{l}</a>
          ))}
          <Btn href="#waitlist" onClick={() => setOpen(false)}>Join the Waitlist</Btn>
        </div>
      )}
    </motion.nav>
  );
}

/* ───── HERO ───── */

const HERO_QUESTION = "What is the minimum main earth conductor size?";
const HERO_ANSWER = "Clause 5.3.3.2, AS/NZS 3000:2018 — The main earthing conductor size is determined from Table 5.1 based on your largest active conductor. The minimum is 4 mm² copper, and it need not exceed 120 mm².";

function TypingCursor() {
  return (
    <motion.span
      className="inline-block w-[2px] h-[1em] align-text-bottom ml-0.5"
      style={{ background: ACCENT }}
      animate={{ opacity: [1, 0] }}
      transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
    />
  );
}

function HeroChatMockup() {
  const question = useTypingText(HERO_QUESTION, 1800, 40);
  const answer = useTypingText(HERO_ANSWER, 1800 + HERO_QUESTION.length * 40 + 800, 18);

  return (
    <motion.div
      className="mx-auto mt-16 w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-[0_8px_40px_rgba(0,0,0,0.06)]"
      style={{ border: `1px solid ${BORDER}` }}
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.75 }}
    >
      <div className="flex items-center gap-2 px-5 py-3" style={{ borderBottom: `1px solid ${BORDER}` }}>
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: ACCENT }} />
        <span className="h-2.5 w-2.5 rounded-full bg-gray-200" />
        <span className="h-2.5 w-2.5 rounded-full bg-gray-200" />
        <span className="ml-3 text-xs" style={{ color: MUTED }}>AS/NZS 3000:2018 — Wiring Rules</span>
      </div>
      <div className="flex flex-col gap-4 p-6" style={{ minHeight: 160 }}>
        <AnimatePresence>
          {question.started && (
            <motion.div
              className="mb-3 ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-sm px-4 py-2.5 text-sm text-white text-left"
              style={{ background: ACCENT }}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {question.displayed}
              {!question.done && <TypingCursor />}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {question.done && answer.started && (
            <motion.div
              className="max-w-[85%] rounded-2xl rounded-bl-sm px-4 py-2.5 text-sm text-left"
              style={{ background: BG, color: DARK }}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {answer.displayed}
              {!answer.done && <TypingCursor />}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Typing indicator dots while waiting for answer */}
        <AnimatePresence>
          {question.done && !answer.started && (
            <motion.div
              className="max-w-fit rounded-2xl rounded-bl-sm px-4 py-3"
              style={{ background: BG }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="h-2 w-2 rounded-full"
                    style={{ background: MUTED }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function Hero({ count }: { count: number }) {
  return (
    <section className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden px-6 pt-28 pb-20 text-center">
      {/* Kinso-style gradient orbs */}
      <div className="pointer-events-none absolute inset-0 -z-10" style={{ background: `radial-gradient(ellipse 70% 55% at 50% -5%, ${ACCENT}12 0%, transparent 65%)` }} />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.15 }}
      >
        <Tag>Coming Soon</Tag>
      </motion.div>

      <motion.h1
        className="mx-auto mt-7 max-w-2xl text-4xl sm:text-5xl md:text-[3.5rem]"
        style={{ color: DARK, lineHeight: 1.08, letterSpacing: "-0.025em" }}
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
      >
        Your standards.<br />Answered instantly.
      </motion.h1>

      <motion.p
        className="mx-auto mt-6 max-w-lg text-base sm:text-lg"
        style={{ color: MUTED, lineHeight: 1.65 }}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.45 }}
      >
        Upload the standards you own. Ask any question by text or voice. Get exact answers sourced directly from your documents — not the internet. No hallucinations. Ever.
      </motion.p>

      <motion.div
        className="mt-9 flex flex-wrap items-center justify-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.6 }}
      >
        <Btn href="#waitlist">Join the Waitlist <ArrowRight size={15} /></Btn>
        <Btn ghost href="#how-it-works">See how it works</Btn>
      </motion.div>

      {/* Waitlist counter */}
      <motion.p
        className="mt-5 text-sm"
        style={{ color: MUTED }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        Join <span style={{ color: ACCENT }}><CountUp target={count} duration={2.5} /></span> others already on the waitlist
      </motion.p>

      {/* App mockup with typing animation */}
      <HeroChatMockup />
    </section>
  );
}

/* ───── STATEMENT ───── */

function Statement() {
  return (
    <section className="relative overflow-hidden py-28 px-6">
      <div className="pointer-events-none absolute inset-0 -z-10" style={{ background: "radial-gradient(ellipse 55% 45% at 50% 50%, #F0E6FF0a 0%, transparent 70%)" }} />
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl md:text-[2.75rem]" style={{ color: DARK, lineHeight: 1.15, letterSpacing: "-0.02em" }}>
            "AI gives you answers.<br />
            <span style={{ color: ACCENT }}>StandAId</span> gives you the <em>right</em> ones."
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mx-auto mt-8 max-w-xl" style={{ color: MUTED, lineHeight: 1.7 }}>
            Generic AI hallucinates standards — wrong clauses, outdated editions, made-up references. StandAId only ever answers from the documents you upload. Every answer is traceable back to your source.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ───── LOGO MARQUEE ───── */

function Marquee() {
  const LogoSet = () => (
    <>
      {allLogos.map((Logo, i) => (
        <div key={i} className="shrink-0">
          <Logo />
        </div>
      ))}
    </>
  );

  return (
    <Reveal>
      <section className="overflow-hidden py-14" id="tools" style={{ borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <p className="mb-10 text-center text-[11px] uppercase tracking-[.14em]" style={{ color: ACCENT }}>
          Works With Your Standards
        </p>
        <div className="relative">
          <div className="flex items-center gap-0 whitespace-nowrap" style={{ animation: "marquee 45s linear infinite" }}>
            <LogoSet />
            <LogoSet />
            <LogoSet />
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-28" style={{ background: `linear-gradient(to right, ${BG}, transparent)` }} />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-28" style={{ background: `linear-gradient(to left, ${BG}, transparent)` }} />
        </div>
      </section>
    </Reveal>
  );
}

/* ───── FEATURE DEEP-DIVES ───── */

function FeatureSection({ tag, title, body, mockup, reverse }: {
  tag: string; title: string; body: string; mockup: React.ReactNode; reverse?: boolean;
}) {
  return (
    <div className={`flex flex-col items-center gap-12 py-24 lg:gap-16 ${reverse ? "lg:flex-row-reverse" : "lg:flex-row"}`}>
      <Reveal className="flex flex-1 flex-col gap-5">
        <Tag>{tag}</Tag>
        <h3 className="text-3xl sm:text-4xl" style={{ color: DARK, lineHeight: 1.12, letterSpacing: "-0.02em" }}>{title}</h3>
        <p style={{ color: MUTED, lineHeight: 1.7 }}>{body}</p>
      </Reveal>
      <Reveal className="w-full flex-1" delay={0.15}>
        {mockup}
      </Reveal>
    </div>
  );
}

function MockCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl bg-white p-5 shadow-[0_2px_20px_rgba(0,0,0,0.04)] ${className}`} style={{ border: `1px solid ${BORDER}` }}>
      {children}
    </div>
  );
}

function Features() {
  return (
    <section className="relative overflow-hidden px-6" id="features">
      <div className="pointer-events-none absolute inset-0 -z-10" style={{ background: `radial-gradient(ellipse 60% 25% at 25% 35%, ${ACCENT}08 0%, transparent 60%)` }} />
      <div className="pointer-events-none absolute inset-0 -z-10" style={{ background: "radial-gradient(ellipse 45% 25% at 80% 55%, #FFE8D608 0%, transparent 55%)" }} />
      <div className="mx-auto max-w-6xl">

        <FeatureSection
          tag="Standards AI"
          title="Ask your standards anything."
          body="Upload the standards you've purchased. StandAId extracts and chunks every clause, table and diagram. Ask questions by text or voice and get precise answers with clause references — sourced only from your documents. No internet. No guessing."
          mockup={
            <MockCard>
              <div className="mb-4 flex items-center gap-2 text-xs" style={{ color: MUTED }}>
                <FileText size={14} /> AS/NZS 3000:2018
              </div>
              <div className="mb-3 ml-auto inline-block max-w-fit rounded-2xl rounded-br-sm px-4 py-2.5 text-sm text-white" style={{ background: ACCENT }}>
                What is the minimum main earth conductor size?
              </div>
              <div className="inline-block max-w-fit rounded-2xl rounded-bl-sm px-4 py-2.5 text-sm" style={{ background: BG, color: DARK }}>
                <strong style={{ color: ACCENT }}>Clause 5.3.3.2, AS/NZS 3000:2018</strong> — The main earthing conductor size is determined from <strong>Table 5.1</strong> based on your largest active conductor. The minimum is <strong>4 mm²</strong> copper, and it need not exceed <strong>120 mm²</strong>.
              </div>
            </MockCard>
          }
        />

        <FeatureSection
          reverse
          tag="Exam Helper"
          title="Study smarter. Pass faster."
          body="Generate mock exams and study guides built directly from your uploaded standards. Upload a photo of your handwritten working and the AI reviews it like a teacher — giving detailed feedback and guidance without ever giving you the answer directly."
          mockup={
            <div className="grid grid-cols-2 gap-3">
              <MockCard>
                <span className="text-[11px] uppercase tracking-wider" style={{ color: ACCENT }}>Mock Exam</span>
                <p className="mt-3 text-sm" style={{ color: DARK }}>Q3: What is the maximum demand for a 3-phase motor rated at 7.5 kW?</p>
                <div className="mt-4 flex gap-2">
                  {["A", "B", "C", "D"].map((o) => (
                    <span key={o} className="flex h-8 w-8 items-center justify-center rounded-lg text-xs" style={{ border: `1px solid ${BORDER}`, color: MUTED }}>{o}</span>
                  ))}
                </div>
              </MockCard>
              <MockCard>
                <span className="text-[11px] uppercase tracking-wider" style={{ color: ACCENT }}>Handwriting Review</span>
                <HandwritingAnimation />
                <p className="mt-3 text-xs" style={{ color: MUTED }}>AI Feedback: Your calculation is on track but check your power factor assumption…</p>
              </MockCard>
            </div>
          }
        />

        <FeatureSection
          tag="Trade Tools"
          title="Every calculation. Every trade."
          body="Built-in tools covering every trade discipline. Volt drop, cable sizing, pipe sizing, fall calculator, stair rise and going, concrete volume and more. Fast, accurate and always on hand — no app switching required."
          mockup={<IPhoneMockup />}
        />
      </div>
    </section>
  );
}

/* ───── BENTO GRID ───── */

function Bento() {
  const cards = [
    { icon: <Brain size={22} />, title: "Standards AI", desc: "Exact answers from your uploaded documents. Every answer cites the clause." },
    { icon: <Mic size={22} />, title: "Voice & Text Queries", desc: "Ask questions hands-free on site or at the desk. Text or voice, your choice." },
    { icon: <GraduationCap size={22} />, title: "Exam Helper", desc: "AI-generated mock exams and study guides built from your own standards." },
    { icon: <PenTool size={22} />, title: "Handwriting Check", desc: "Upload a photo of your working. AI reviews it like a teacher and guides you." },
    { icon: <Wrench size={22} />, title: "Trade Tools", desc: "Volt drop, cable size, pipe fall, stair rise, concrete volume and more built in." },
    { icon: <ShieldCheck size={22} />, title: "Zero Hallucinations", desc: "StandAId only answers from what you upload. No internet. No made-up references." },
  ];
  return (
    <section className="relative overflow-hidden py-28 px-6">
      <div className="pointer-events-none absolute inset-0 -z-10" style={{ background: `radial-gradient(ellipse 55% 40% at 55% 30%, ${ACCENT}06 0%, transparent 60%)` }} />
      <div className="pointer-events-none absolute inset-0 -z-10" style={{ background: "radial-gradient(ellipse 40% 35% at 15% 65%, #FFE8D606 0%, transparent 50%)" }} />
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-14 text-center">
            <Tag>Features</Tag>
            <h2 className="mt-5 text-3xl sm:text-4xl" style={{ color: DARK, letterSpacing: "-0.02em" }}>Everything you need, built in.</h2>
          </div>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <motion.div
                className="rounded-2xl bg-white p-6 h-full"
                style={{ border: `1px solid ${BORDER}` }}
                whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(0,0,0,0.06)" }}
                transition={{ duration: 0.25 }}
              >
                <span style={{ color: ACCENT }}>{c.icon}</span>
                <h4 className="mt-4 text-lg sm:text-xl" style={{ color: DARK }}>{c.title}</h4>
                <p className="mt-2 text-sm" style={{ color: MUTED, lineHeight: 1.6 }}>{c.desc}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───── HOW IT WORKS ───── */

function HowItWorks() {
  const steps = [
    { n: "01", t: "Upload your standards", d: "Add the standards you own. PDFs, documents, whatever you have." },
    { n: "02", t: "Ask anything", d: "Type or speak your question. StandAId finds the exact answer from your documents." },
    { n: "03", t: "Study, calculate, pass", d: "Use exam tools, trade calculators and handwriting feedback all in one place." },
  ];
  return (
    <section className="relative overflow-hidden py-28 px-6" id="how-it-works" style={{ borderTop: `1px solid ${BORDER}` }}>
      <div className="pointer-events-none absolute inset-0 -z-10" style={{ background: `radial-gradient(ellipse 50% 45% at 50% 40%, #F0E6FF08 0%, transparent 60%)` }} />
      <Reveal>
        <div className="mx-auto max-w-4xl text-center">
          <Tag>How It Works</Tag>
          <h2 className="mt-5 text-3xl sm:text-4xl" style={{ color: DARK, letterSpacing: "-0.02em" }}>Take a look inside</h2>
        </div>
      </Reveal>
      <div className="mx-auto mt-16 grid max-w-4xl gap-12 md:grid-cols-3">
        {steps.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.12}>
            <div className="text-center">
              <span className="text-5xl" style={{ color: `${ACCENT}20`, letterSpacing: "-0.04em" }}>{s.n}</span>
              <h4 className="mt-4" style={{ color: DARK }}>{s.t}</h4>
              <p className="mt-2 text-sm" style={{ color: MUTED, lineHeight: 1.65 }}>{s.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ───── WAITLIST ───── */

function Waitlist({ count, onSignup }: { count: number; onSignup: () => void }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError(null);
    const { error: sbError } = await supabase
      .from("waitlist")
      .insert({ email });
    setLoading(false);
    if (sbError) {
      if (sbError.code === "23505") {
        // unique constraint — email already on the list
        setDone(true);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } else {
      setDone(true);
      onSignup();
    }
  };

  return (
    <section className="relative overflow-hidden py-28 px-6" id="waitlist" style={{ background: "#F2F0ED" }}>
      <div className="pointer-events-none absolute inset-0 -z-10" style={{ background: `radial-gradient(ellipse 55% 45% at 50% 50%, ${ACCENT}08 0%, transparent 65%)` }} />
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl" style={{ color: DARK, letterSpacing: "-0.02em" }}>Be first to get access.</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p style={{ color: MUTED, lineHeight: 1.7 }}>
            We're onboarding tradies, engineers and students in stages. Join the waitlist and get early access when your invite is ready.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          {done ? (
            <motion.p
              className="rounded-full px-6 py-3 text-sm"
              style={{ background: `${ACCENT}10`, color: ACCENT }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              You're on the list! We'll be in touch.
            </motion.p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
            >
              <label htmlFor="waitlist-email" className="sr-only">Email address</label>
              <input
                id="waitlist-email"
                name="email"
                type="email" required placeholder="Enter your email" value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="flex-1 rounded-full bg-white px-5 py-3 text-sm outline-none transition-shadow focus:shadow-[0_0_0_2px_rgba(108,92,231,0.15)] disabled:opacity-60"
                style={{ color: DARK, border: `1px solid ${BORDER}` }}
              />
              <Btn type="submit" onClick={loading ? undefined : undefined}>
                {loading ? "Joining…" : <>Join the Waitlist <ArrowRight size={15} /></>}
              </Btn>
            </form>
          )}
          {error && (
            <p className="mt-2 text-sm" style={{ color: ACCENT }}>{error}</p>
          )}
        </Reveal>
        <Reveal delay={0.25}>
          <p className="text-xs" style={{ color: MUTED }}>Join {count.toLocaleString()} others already on the waitlist</p>
        </Reveal>
      </div>
    </section>
  );
}

/* ───── FAQS ───── */

function FAQItem({ q, a, isOpen, toggle }: { q: string; a: string; isOpen: boolean; toggle: () => void }) {
  return (
    <div style={{ borderBottom: `1px solid ${BORDER}` }}>
      <button
        className="flex w-full items-center justify-between py-5 text-left cursor-pointer"
        style={{ color: DARK }}
        onClick={toggle}
      >
        <span>{q}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="ml-4 shrink-0"
        >
          <ChevronDown size={17} style={{ color: MUTED }} />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="overflow-hidden"
      >
        <p className="pb-5 text-sm" style={{ color: MUTED, lineHeight: 1.7 }}>{a}</p>
      </motion.div>
    </div>
  );
}

function FAQs() {
  const [open, setOpen] = useState<number | null>(null);
  const qs: [string, string][] = [
    ["What makes StandAId different from ChatGPT?", "StandAId only answers from the standards you upload. ChatGPT and other AI tools draw from the internet and can hallucinate incorrect clause numbers, outdated editions or completely fabricated references. StandAId never does."],
    ["What standards can I upload?", "Any standard you have purchased or own. AS/NZS, NCC, AIRAH guides, manufacturer specs, company procedures — if you own it, you can upload it."],
    ["How does the Exam Helper work?", "Upload your standards and StandAId generates mock exam questions and study guides from the actual content. You can also photograph your handwritten working and the AI reviews it and gives feedback — without giving you the answer directly."],
    ["What trade tools are included?", "Volt drop, cable sizing, pipe sizing, fall calculator, stair rise and going, concrete volume calculator and more. New tools are added regularly."],
    ["Is my data private?", "Yes. Your uploaded documents are private to your account and are never used to train AI models or shared with third parties."],
    ["What happens when I join the waitlist?", "You'll receive an early access invite when your spot is ready. We're onboarding in stages to ensure quality and collect feedback from real tradies and engineers first."],
  ];
  return (
    <section className="py-28 px-6" id="faqs">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <div className="mb-14 text-center">
            <Tag>FAQs</Tag>
            <h2 className="mt-5 text-3xl sm:text-4xl" style={{ color: DARK, letterSpacing: "-0.02em" }}>Frequently asked questions</h2>
          </div>
        </Reveal>
        {qs.map(([q, a], i) => (
          <Reveal key={i} delay={i * 0.06}>
            <FAQItem q={q} a={a} isOpen={open === i} toggle={() => setOpen(open === i ? null : i)} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ───── FOOTER ───── */

function Footer() {
  return (
    <footer className="py-16 px-6" style={{ borderTop: `1px solid ${BORDER}` }}>
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <StandAIdLogo className="text-xl" />
          <p className="text-sm" style={{ color: MUTED }}>AI-powered standards companion for tradies and engineers.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {[
            { label: "Features", href: "/#features" },
            { label: "Tools", href: "/#tools" },
            { label: "FAQs", href: "/#faqs" },
          ].map(({ label, href }) => (
            <a key={label} href={href} className="text-sm transition-colors" style={{ color: MUTED }}
              onMouseEnter={(e) => (e.currentTarget.style.color = DARK)}
              onMouseLeave={(e) => (e.currentTarget.style.color = MUTED)}
            >{label}</a>
          ))}
          {[
            { label: "Terms of Use", to: "/terms-of-use" },
            { label: "Privacy Policy", to: "/privacy-policy" },
            { label: "Disclaimer", to: "/disclaimer" },
          ].map(({ label, to }) => (
            <Link key={label} to={to} className="text-sm transition-colors" style={{ color: MUTED }}
              onMouseEnter={(e) => (e.currentTarget.style.color = DARK)}
              onMouseLeave={(e) => (e.currentTarget.style.color = MUTED)}
            >{label}</Link>
          ))}
        </div>
        <div className="flex gap-4">
          {[Instagram, Linkedin, Youtube].map((Icon, i) => (
            <a key={i} href="#" style={{ color: MUTED }} className="transition-colors hover:opacity-70"><Icon size={18} /></a>
          ))}
        </div>
      </div>
      <p className="mt-12 text-center text-xs" style={{ color: `${MUTED}88` }}>&copy; 2026 StandAId. All rights reserved.</p>
    </footer>
  );
}

/* ───── LEGAL PAGE LAYOUT ───── */

const NOISE_BG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen relative" style={{ background: `linear-gradient(to right, #FFFFFF, #FFF5F5)`, fontFamily: "'Inter', sans-serif" }}>
      <div className="pointer-events-none fixed inset-0 z-[99] opacity-[0.15]" style={{ backgroundImage: NOISE_BG }} />
      <Nav />
      <main className="relative z-10 mx-auto max-w-3xl px-6 pt-32 pb-24">
        <button
          onClick={() => navigate("/")}
          className="mb-10 flex items-center gap-2 text-sm transition-colors"
          style={{ color: MUTED }}
          onMouseEnter={(e) => (e.currentTarget.style.color = DARK)}
          onMouseLeave={(e) => (e.currentTarget.style.color = MUTED)}
        >
          <ArrowRight size={14} style={{ transform: "rotate(180deg)" }} />
          Back to home
        </button>
        <h1 className="mb-10 text-3xl font-semibold tracking-tight" style={{ color: DARK }}>{title}</h1>
        <div className="flex flex-col gap-8" style={{ color: DARK }}>
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}

function LegalSection({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-3 text-base font-semibold" style={{ color: DARK }}>{heading}</h2>
      <div className="text-sm leading-relaxed" style={{ color: MUTED }}>{children}</div>
    </section>
  );
}

function LegalList({ items }: { items: string[] }) {
  return (
    <ul className="mt-2 flex flex-col gap-1 pl-4">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2">
          <span style={{ color: ACCENT }}>—</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/* ───── TERMS OF USE PAGE ───── */

function TermsPage() {
  return (
    <LegalPage title="Terms of Use">
      <p className="text-sm" style={{ color: MUTED }}>
        <strong style={{ color: DARK }}>Effective Date:</strong> [EFFECTIVE DATE]&ensp;|&ensp;
        <strong style={{ color: DARK }}>Entity:</strong> [ENTITY NAME] (ABN: [ABN])&ensp;|&ensp;
        <strong style={{ color: DARK }}>Contact:</strong> [CONTACT EMAIL]
      </p>
      <div style={{ height: 1, background: BORDER }} />

      <LegalSection heading="1. Acceptance of Terms">
        <p>By accessing or using the StandAId platform ("Platform"), you agree to be bound by these Terms of Use, together with our Privacy Policy and Disclaimer (collectively, "Agreement"). If you do not agree, you must not use the Platform.</p>
      </LegalSection>

      <LegalSection heading="2. Nature of the Platform">
        <p>The Platform provides AI-assisted tools for interacting with technical documents, including Australian Standards.</p>
        <p className="mt-2">The Platform is a reference tool only. It is not a source of truth and must not be relied upon as such.</p>
      </LegalSection>

      <LegalSection heading="3. No Reliance and Verification Obligation">
        <p>You must independently verify all information obtained through the Platform against current, authoritative source materials.</p>
        <p className="mt-2">You acknowledge that:</p>
        <LegalList items={[
          "AI-generated outputs may be incorrect, incomplete, misleading, or fabricated",
          "Outputs may omit critical qualifications or context",
          "Apparent accuracy does not guarantee correctness",
        ]} />
        <p className="mt-2">You must not rely on the Platform as a substitute for:</p>
        <LegalList items={[
          "Reviewing official standards",
          "Obtaining professional advice",
          "Complying with legal or regulatory obligations",
        ]} />
      </LegalSection>

      <LegalSection heading="4. No Professional Advice">
        <p>Nothing on the Platform constitutes professional, engineering, electrical, building, legal, or other regulated advice.</p>
        <p className="mt-2">You are solely responsible for ensuring compliance with all applicable laws, codes, standards, and licence conditions.</p>
      </LegalSection>

      <LegalSection heading="5. Assumption of Risk">
        <p>You acknowledge that use of the Platform involves inherent risk due to the limitations of AI technology.</p>
        <p className="mt-2">You accept full responsibility for:</p>
        <LegalList items={[
          "All decisions made based on Platform outputs",
          "Any work performed using Platform information",
          "Any consequences arising from such use",
        ]} />
        <p className="mt-2">This includes risks of property damage, regulatory breach, personal injury, or death.</p>
      </LegalSection>

      <LegalSection heading="6. Acceptable Use">
        <p>You must not:</p>
        <LegalList items={[
          "Use the Platform for unlawful purposes",
          "Upload content you do not have the right to use",
          "Infringe intellectual property rights",
          "Interfere with or disrupt the Platform",
          "Engage in excessive, automated, or abusive usage",
        ]} />
        <p className="mt-2">We may suspend or restrict access for misuse.</p>
      </LegalSection>

      <LegalSection heading="7. Intellectual Property">
        <p>You retain ownership of your uploaded content.</p>
        <p className="mt-2">You grant us a non-exclusive, worldwide licence to use, process, and store that content for the purpose of operating the Platform.</p>
        <p className="mt-2">You are solely responsible for ensuring that uploaded materials comply with applicable copyright laws.</p>
      </LegalSection>

      <LegalSection heading="8. Subscriptions and Fees">
        <p>Where applicable:</p>
        <LegalList items={[
          "Subscriptions renew automatically unless cancelled",
          "Fees may be varied with reasonable notice",
          "Changes apply from the next billing cycle",
        ]} />
      </LegalSection>

      <LegalSection heading="9. Platform Availability">
        <p>The Platform is provided on an "as is" and "as available" basis.</p>
        <p className="mt-2">We do not guarantee that the Platform will be:</p>
        <LegalList items={["Uninterrupted", "Error-free", "Secure"]} />
      </LegalSection>

      <LegalSection heading="10. Limitation of Liability">
        <p>To the maximum extent permitted by law:</p>
        <p className="mt-2">We exclude all liability for any loss or damage, including:</p>
        <LegalList items={[
          "Indirect or consequential loss",
          "Loss of profits or business",
          "Personal injury or property damage",
        ]} />
        <p className="mt-2">arising from use of the Platform.</p>
        <p className="mt-2">Where liability cannot be excluded under the Australian Consumer Law, it is limited to:</p>
        <LegalList items={[
          "Resupply of services, or",
          "Payment of the cost of resupply",
        ]} />
      </LegalSection>

      <LegalSection heading="11. No Duty of Care">
        <p>To the extent permitted by law, we do not owe you a duty of care in relation to the accuracy or reliability of Platform outputs.</p>
      </LegalSection>

      <LegalSection heading="12. Suspension and Termination">
        <p>We may suspend or terminate your access at any time, including where:</p>
        <LegalList items={[
          "You breach this Agreement",
          "Your usage is excessive or abnormal",
          "Required for operational or legal reasons",
        ]} />
      </LegalSection>

      <LegalSection heading="13. Changes to Platform">
        <p>We may modify, suspend, or discontinue any part of the Platform at any time without liability.</p>
      </LegalSection>

      <LegalSection heading="14. Governing Law">
        <p>This Agreement is governed by the laws of Western Australia, Australia.</p>
      </LegalSection>

      <LegalSection heading="15. Contact">
        <p>[CONTACT EMAIL]</p>
      </LegalSection>
    </LegalPage>
  );
}

/* ───── PRIVACY POLICY PAGE ───── */

function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p className="text-sm" style={{ color: MUTED }}>
        <strong style={{ color: DARK }}>Effective Date:</strong> [EFFECTIVE DATE]&ensp;|&ensp;
        <strong style={{ color: DARK }}>Entity:</strong> [ENTITY NAME] (ABN: [ABN])
      </p>
      <div style={{ height: 1, background: BORDER }} />

      <LegalSection heading="1. Collection of Personal Information">
        <p>We may collect:</p>
        <LegalList items={[
          "Account details (name, email)",
          "Uploaded documents and content",
          "Usage data and interaction logs",
          "Device and technical data",
        ]} />
      </LegalSection>

      <LegalSection heading="2. Purpose of Collection">
        <p>We collect and use information to:</p>
        <LegalList items={[
          "Provide and operate the Platform",
          "Process AI queries and outputs",
          "Improve performance and functionality",
          "Maintain security and prevent misuse",
        ]} />
      </LegalSection>

      <LegalSection heading="3. AI and Third-Party Processing">
        <p>Your data may be processed by third-party service providers, including AI providers.</p>
        <p className="mt-2">By using the Platform, you consent to such processing, including potential overseas data transfer.</p>
      </LegalSection>

      <LegalSection heading="4. Disclosure of Information">
        <p>We do not sell personal information.</p>
        <p className="mt-2">We may disclose information to:</p>
        <LegalList items={[
          "Service providers",
          "Legal or regulatory authorities where required",
          "Contractors assisting in operation of the Platform",
        ]} />
      </LegalSection>

      <LegalSection heading="5. Data Security">
        <p>We take reasonable steps to protect personal information from misuse, interference, loss, and unauthorised access.</p>
        <p className="mt-2">However, no system is completely secure.</p>
      </LegalSection>

      <LegalSection heading="6. Data Retention">
        <p>We retain information only as long as necessary for business or legal purposes.</p>
      </LegalSection>

      <LegalSection heading="7. Access and Correction">
        <p>You may request access to or correction of your personal information by contacting us.</p>
      </LegalSection>

      <LegalSection heading="8. Cookies and Analytics">
        <p>We may use cookies and analytics tools to improve user experience.</p>
      </LegalSection>

      <LegalSection heading="9. Overseas Disclosure">
        <p>Some service providers may store or process data outside Australia.</p>
      </LegalSection>

      <LegalSection heading="10. Contact">
        <p>[CONTACT EMAIL]</p>
      </LegalSection>
    </LegalPage>
  );
}

/* ───── DISCLAIMER PAGE ───── */

function DisclaimerPage() {
  return (
    <LegalPage title="Disclaimer">
      <p className="text-sm" style={{ color: MUTED }}>
        <strong style={{ color: DARK }}>Effective Date:</strong> [EFFECTIVE DATE]&ensp;|&ensp;
        <strong style={{ color: DARK }}>Entity:</strong> [ENTITY NAME]
      </p>
      <div style={{ height: 1, background: BORDER }} />

      <LegalSection heading="1. Reference Tool Only">
        <p>The Platform is provided as a reference tool only and must not be relied upon.</p>
      </LegalSection>

      <LegalSection heading="2. AI Limitations">
        <p>The Platform uses artificial intelligence which may generate outputs that are:</p>
        <LegalList items={[
          "Incorrect",
          "Incomplete",
          "Outdated",
          "Misleading",
          "Fabricated",
        ]} />
        <p className="mt-2">AI outputs may omit critical information necessary for compliance.</p>
      </LegalSection>

      <LegalSection heading="3. No Professional Advice">
        <p>Nothing on the Platform constitutes professional advice of any kind.</p>
        <p className="mt-2">You must obtain independent professional advice where required.</p>
      </LegalSection>

      <LegalSection heading="4. Verification Requirement">
        <p>You must independently verify all information against current, authoritative standards before acting on it.</p>
      </LegalSection>

      <LegalSection heading="5. Assumption of Risk">
        <p>You acknowledge that use of the Platform involves inherent risk.</p>
        <p className="mt-2">You accept full responsibility for all outcomes arising from your use, including:</p>
        <LegalList items={[
          "Regulatory breaches",
          "Property damage",
          "Personal injury or death",
        ]} />
      </LegalSection>

      <LegalSection heading="6. No Liability">
        <p>To the maximum extent permitted by law, we disclaim all liability for any loss or damage arising from use of the Platform.</p>
      </LegalSection>

      <LegalSection heading="7. Availability">
        <p>We do not guarantee continuous or error-free operation of the Platform.</p>
      </LegalSection>

      <LegalSection heading="8. Updates">
        <p>We may update this Disclaimer at any time. Continued use constitutes acceptance.</p>
      </LegalSection>
    </LegalPage>
  );
}

/* ───── APP ───── */

export default function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    supabase
      .from("waitlist")
      .select("*", { count: "exact", head: true })
      .then(({ count: c }) => { if (c !== null) setCount(545 + c); });
  }, []);

  const homePage = (
    <div className="min-h-screen relative" style={{ background: `linear-gradient(to right, #FFFFFF, #FFF5F5)`, fontFamily: "'Inter', sans-serif" }}>
      {/* Noise texture overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-[99] opacity-[0.15]"
        style={{ backgroundImage: NOISE_BG }}
      />
      {/* Kinso-style grid pattern with fade from left to right */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.02) 1px, transparent 1px)
          `,
          backgroundSize: "8px 8px",
          maskImage: "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage: "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%)",
        }}
      />
      <Nav />
      <Hero count={count} />
      <Statement />
      <Marquee />
      <Features />
      <Bento />
      <HowItWorks />
      <Waitlist count={count} onSignup={() => setCount((c) => c + 1)} />
      <FAQs />
      <Footer />
    </div>
  );

  return (
    <Routes>
      <Route path="/" element={homePage} />
      <Route path="/terms-of-use" element={<TermsPage />} />
      <Route path="/privacy-policy" element={<PrivacyPage />} />
      <Route path="/disclaimer" element={<DisclaimerPage />} />
    </Routes>
  );
}