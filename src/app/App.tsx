import { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight, Menu, X, ChevronDown, Mic, Check,
  PenTool, ShieldCheck, Instagram, Facebook,
  Brain, GraduationCap, Wrench
} from "lucide-react";
import { StandAIdLogo } from "./components/StandAIdLogo";
import { allLogos } from "./components/StandardsLogos";

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

  const links = ["Features", "Tools", "Pricing", "How It Works", "FAQs"];

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
        <StandAIdLogo className="text-2xl" />
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
        <div className="hidden md:block"><Btn href="https://standaid-9mas.vercel.app">Get Started</Btn></div>
        <button className="md:hidden" style={{ color: DARK }} onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="flex flex-col gap-4 px-6 pb-6 md:hidden" style={{ background: BG }}>
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase().replace(/ /g, "-")}`} className="text-sm" style={{ color: MUTED }} onClick={() => setOpen(false)}>{l}</a>
          ))}
          <Btn href="https://standaid-9mas.vercel.app" onClick={() => setOpen(false)}>Get Started</Btn>
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

function Hero() {
  return (
    <section className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden px-6 pt-28 pb-20 text-center">
      {/* Kinso-style gradient orbs */}
      <div className="pointer-events-none absolute inset-0 -z-10" style={{ background: `radial-gradient(ellipse 70% 55% at 50% -5%, ${ACCENT}12 0%, transparent 65%)` }} />
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
        <Btn href="https://standaid-9mas.vercel.app">Get Started <ArrowRight size={15} /></Btn>
        <Btn ghost href="#how-it-works">See how it works</Btn>
      </motion.div>

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
            <span style={{ color: DARK }}>Stand</span><span style={{ color: ACCENT }}>AI</span><span style={{ color: DARK }}>d</span> gives you the <em>right</em> ones."
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
      <Reveal className="flex flex-1 flex-col gap-5 lg:max-w-sm">
        <Tag>{tag}</Tag>
        <h3 className="text-3xl sm:text-4xl" style={{ color: DARK, lineHeight: 1.12, letterSpacing: "-0.02em" }}>{title}</h3>
        <p style={{ color: MUTED, lineHeight: 1.7 }}>{body}</p>
      </Reveal>
      <Reveal className="w-full flex-[1.4]" delay={0.15}>
        {mockup}
      </Reveal>
    </div>
  );
}

function ScreenshotMock({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-2xl bg-white shadow-[0_2px_20px_rgba(0,0,0,0.06)] ${className}`} style={{ border: `1px solid ${BORDER}` }}>
      <img src={src} alt={alt} className="block w-full h-auto" />
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
          mockup={<ScreenshotMock src="/screenshots/chat-answer.png" alt="StandAId chat answering a real earth fault-loop impedance question, with clause references" />}
        />

        <FeatureSection
          reverse
          tag="Exam Helper"
          title="Study smarter. Pass faster."
          body="Generate mock exams and study guides built directly from your uploaded standards. Upload a photo of your handwritten working and the AI reviews it like a teacher — giving detailed feedback and guidance without ever giving you the answer directly."
          mockup={<ScreenshotMock src="/screenshots/quiz-question.png" alt="A real StandAId practice quiz question with multiple-choice answers" />}
        />

        <FeatureSection
          tag="Trade Tools"
          title="Every calculation. Every trade."
          body="Built-in tools covering every trade discipline. Volt drop, cable sizing, pipe sizing, fall calculator, stair rise and going, concrete volume and more. Fast, accurate and always on hand — no app switching required."
          mockup={<ScreenshotMock src="/screenshots/voltage-drop-result.png" alt="A real StandAId Voltage Drop Calculator result: compliant, with drop percentage and derating" />}
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

/* ───── PRICING ───── */

function Pricing() {
  const tiers: {
    name: string; price: string; period: string; desc: string;
    features: string[]; cta: string; highlight?: boolean;
  }[] = [
    {
      name: "Free",
      price: "$0",
      period: "/forever",
      desc: "Try it out, no commitment.",
      features: [
        "3 AI queries per day",
        "1 standard upload",
        "Partial clause detail in answers",
        "Public/government standards access only",
        "1 basic calculator",
        "Basic compliance chat",
      ],
      cta: "Get Started Free",
    },
    {
      name: "Pro",
      price: "$19.99",
      period: "/month",
      desc: "For tradies who want it all.",
      features: [
        "Unlimited AI queries",
        "Unlimited standards uploads",
        "Full clause detail in every answer",
        "Voice input & photo/video analysis",
        "20+ trade calculators with clause references",
        "7-day free trial, no card required",
      ],
      cta: "Start Free Trial",
      highlight: true,
    },
    {
      name: "Business",
      price: "$49.99",
      period: "/seat/month",
      desc: "For crews and teams.",
      features: [
        "Everything in Pro",
        "Shared team libraries — standards uploaded by one member are searchable by the whole crew",
        "Per-seat billing, add or remove seats anytime (up to 500 seats)",
        "Managed via a team owner/admin account",
      ],
      cta: "Contact Sales",
    },
  ];

  return (
    <section className="relative overflow-hidden py-28 px-6" id="pricing" style={{ borderTop: `1px solid ${BORDER}` }}>
      <div className="pointer-events-none absolute inset-0 -z-10" style={{ background: `radial-gradient(ellipse 55% 40% at 50% 20%, ${ACCENT}06 0%, transparent 60%)` }} />
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-14 text-center">
            <Tag>Pricing</Tag>
            <h2 className="mt-5 text-3xl sm:text-4xl" style={{ color: DARK, letterSpacing: "-0.02em" }}>Simple, honest pricing.</h2>
            <p className="mx-auto mt-4 max-w-lg" style={{ color: MUTED, lineHeight: 1.7 }}>
              Start free. Upgrade when you need unlimited answers and the full set of trade tools.
            </p>
          </div>
        </Reveal>
        <div className="grid items-start gap-6 lg:grid-cols-3">
          {tiers.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <div
                className="relative flex h-full flex-col rounded-2xl bg-white p-8"
                style={{
                  border: t.highlight ? `2px solid ${ACCENT}` : `1px solid ${BORDER}`,
                  boxShadow: t.highlight ? "0 12px 50px rgba(220,38,38,0.12)" : "none",
                }}
              >
                {t.highlight && (
                  <span
                    className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[11px] uppercase tracking-wide text-white"
                    style={{ background: ACCENT }}
                  >
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl" style={{ color: DARK }}>{t.name}</h3>
                <p className="mt-1 text-sm" style={{ color: MUTED }}>{t.desc}</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl" style={{ color: DARK, letterSpacing: "-0.02em" }}>{t.price}</span>
                  <span className="text-sm" style={{ color: MUTED }}>{t.period}</span>
                </div>
                <ul className="mt-6 flex flex-1 flex-col gap-3">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm" style={{ color: DARK, lineHeight: 1.5 }}>
                      <Check size={16} className="mt-0.5 shrink-0" style={{ color: ACCENT }} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Btn href="https://standaid-9mas.vercel.app" ghost={!t.highlight}>{t.cta}</Btn>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
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
    ["How do I get started?", "StandAId is live now. Sign up for free directly in the app — no waitlist. Upgrade to Pro or Business any time from your account."],
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
    <footer className="py-16 px-6" style={{ borderTop: `1px solid ${BORDER}`, background: "#FFFFFF" }}>
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
            { label: "Terms of Service", to: "/terms-of-use" },
            { label: "Privacy Policy", to: "/privacy-policy" },
          ].map(({ label, to }) => (
            <Link key={label} to={to} className="text-sm transition-colors" style={{ color: MUTED }}
              onMouseEnter={(e) => (e.currentTarget.style.color = DARK)}
              onMouseLeave={(e) => (e.currentTarget.style.color = MUTED)}
            >{label}</Link>
          ))}
        </div>
        <div className="flex gap-4">
          {[
            { Icon: Instagram, href: "https://www.instagram.com/standaid.ai/" },
            { Icon: Facebook, href: "https://www.facebook.com/share/1EojQSpcoh/?mibextid=wwXIfr" },
          ].map(({ Icon, href }, i) => (
            <a key={i} href={href} target="_blank" rel="noopener noreferrer" style={{ color: MUTED }} className="transition-colors hover:opacity-70"><Icon size={18} /></a>
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

/* ───── TERMS OF USE PAGE ───── */

const LEGAL_LAST_UPDATED = "4 July 2026";
const LEGAL_SUPPORT_EMAIL = "hello@standaid.ai";

function LegalContactLink() {
  return <a href={`mailto:${LEGAL_SUPPORT_EMAIL}`} style={{ color: ACCENT }}>{LEGAL_SUPPORT_EMAIL}</a>;
}

function TermsPage() {
  return (
    <LegalPage title="Terms of Service">
      <p className="text-sm" style={{ color: MUTED }}>Last updated: {LEGAL_LAST_UPDATED}</p>
      <div style={{ height: 1, background: BORDER }} />

      <LegalSection heading="1. What StandAId is">
        <p>StandAId is an app that helps Australian tradespeople search, understand and study standards documents that they upload themselves. It uses artificial intelligence (AI) to answer questions about your uploaded documents, generate study material, and provide trade calculators.</p>
      </LegalSection>

      <LegalSection heading="2. It's a reference aid — not a substitute for the standard">
        <p>AI-generated answers, study material and calculator results can contain errors. They are provided as a convenience to help you find and understand information faster — they are not professional advice, not a compliance certification, and not a replacement for the published standard, the National Construction Code, or the judgement of a licensed tradesperson.</p>
        <p className="mt-2" style={{ color: DARK }}>Always verify safety-critical values against the published standard before relying on them. You remain fully responsible for work you carry out.</p>
      </LegalSection>

      <LegalSection heading="3. Your uploads and copyright">
        <p>You may only upload documents you are legally entitled to use — for example, a standard you have purchased or hold a valid licence or subscription for. By uploading, you confirm this and accept responsibility for complying with the publisher's terms.</p>
        <p className="mt-2">Your uploaded documents are stored privately against your account. They are never shared with, or made searchable by, other users — even if another user owns the same standard, they cannot access, view or search your copy. This reflects the licensing terms Standards Australia and other publishers place on their documents. Processing (text extraction, indexing and answering your questions) happens solely to provide the service to you.</p>
      </LegalSection>

      <LegalSection heading="4. Your account">
        <p>Keep your login details secure — you're responsible for activity on your account. One account is for one person; don't share access. We may suspend accounts that breach these terms or abuse the service.</p>
      </LegalSection>

      <LegalSection heading="5. Subscriptions and fair use">
        <p>Free accounts include a limited number of AI queries per day and partial document indexing. Paid plans lift those limits, subject to fair-use caps that protect the service from runaway automated usage. To manage or cancel a subscription, contact us at <LegalContactLink />.</p>
      </LegalSection>

      <LegalSection heading="6. Liability">
        <p>To the maximum extent permitted by law (including the Australian Consumer Law, whose consumer guarantees are not excluded), StandAId is provided "as is" and we are not liable for loss arising from reliance on AI-generated content or calculator results. Where liability cannot be excluded, it is limited to re-supplying the service or the amount you paid for it in the previous 12 months.</p>
      </LegalSection>

      <LegalSection heading="7. Changes and contact">
        <p>We may update these terms as the service evolves; material changes will be flagged in the app. These terms are governed by the laws of Western Australia. Questions: <LegalContactLink /></p>
      </LegalSection>
    </LegalPage>
  );
}

/* ───── PRIVACY POLICY PAGE ───── */

function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p className="text-sm" style={{ color: MUTED }}>Last updated: {LEGAL_LAST_UPDATED}</p>
      <div style={{ height: 1, background: BORDER }} />

      <LegalSection heading="1. What we collect">
        <p>Account details (email, name), the documents you upload, the questions you ask (text, voice transcripts and photos you submit for analysis), your quiz and exam activity, feedback you give on answers, and basic usage information needed to run and secure the service.</p>
      </LegalSection>

      <LegalSection heading="2. How we use it">
        <p>To provide the service: extracting and indexing your documents so they're searchable, generating answers and study material with AI, tracking your study progress, and enforcing plan limits. Feedback you submit on answers may be reviewed to improve accuracy.</p>
        <p className="mt-2" style={{ color: DARK }}>We do not sell your data, and your uploaded documents are never shared with or made available to other users.</p>
      </LegalSection>

      <LegalSection heading="3. AI processing">
        <p>To generate answers, relevant excerpts of your documents, your questions and any photos you submit are processed by our AI providers (Anthropic and OpenAI) under their API terms, which do not permit them to train their models on this data. Voice input is transcribed on your device by your browser, not on our servers.</p>
      </LegalSection>

      <LegalSection heading="4. Where it's stored">
        <p>Data is stored with our hosting provider (Supabase) in access-controlled databases and private file storage. Documents are served only to your logged-in account via short-lived links, and are never accessible to any other user — this reflects Standards Australia's licensing requirements as well as our own security design. We take reasonable steps to protect your information in line with the Privacy Act 1988 (Cth) and the Australian Privacy Principles.</p>
      </LegalSection>

      <LegalSection heading="5. Retention and deletion">
        <p>Your data is kept while your account is active. Deleting a standard removes its content from your library. To delete your account and associated data, or to request a copy of your data, email <LegalContactLink /> and we'll action it within 30 days.</p>
      </LegalSection>

      <LegalSection heading="6. Contact and complaints">
        <p>Privacy questions or complaints: <LegalContactLink />. If you're not satisfied with our response, you can contact the Office of the Australian Information Commissioner (oaic.gov.au).</p>
      </LegalSection>
    </LegalPage>
  );
}

/* ───── APP ───── */

export default function App() {
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
            linear-gradient(to right, rgba(0,0,0,0.07) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.07) 1px, transparent 1px)
          `,
          backgroundSize: "8px 8px",
          maskImage: "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage: "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%)",
        }}
      />
      <Nav />
      <Hero />
      <Statement />
      <Marquee />
      <Features />
      <Bento />
      <HowItWorks />
      <Pricing />
      <FAQs />
      <Footer />
    </div>
  );

  return (
    <Routes>
      <Route path="/" element={homePage} />
      <Route path="/terms-of-use" element={<TermsPage />} />
      <Route path="/privacy-policy" element={<PrivacyPage />} />
    </Routes>
  );
}