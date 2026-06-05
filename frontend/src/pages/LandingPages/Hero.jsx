import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight, Star, Brain, Map, TrendingUp, Bot } from 'lucide-react';

import font1 from "../../assets/ai8.avif";
import font2 from "../../assets/ai4.webp";
import font3 from "../../assets/road7.jpg";
import font4 from "../../assets/aiImg2.jpg";
import { useNavigate } from 'react-router-dom';

const slides = [
  { mainImg: font1, tag: "Presidential Award '24", title: "Ranks #1 in", highlight: "AI Learning", stat: "98%", statLabel: "SUCCESS RATE", sub: "Intelligent and adaptive career roadmaps built for the future.", accent: "#17B6A8", icon: <Brain className="w-4 h-4" /> },
  { mainImg: font2, tag: "Global Excellence", title: "Build Skills That", highlight: "Get You Hired", stat: "200+", statLabel: "CAREER ROADMAPS", sub: "Real-world roadmaps aligned with industry demands.", accent: "#4fc3f7", icon: <Map className="w-4 h-4" /> },
  { mainImg: font3, tag: "Fast Track Career", title: "Zero to", highlight: "Job-Ready", stat: "50K+", statLabel: "ACTIVE LEARNERS", sub: "Structured paths for every tech career you can imagine.", accent: "#17B6A8", icon: <TrendingUp className="w-4 h-4" /> },
  { mainImg: font4, tag: "AI Adapted Learning", title: "Your Goals.", highlight: "Your Journey.", stat: "24/7", statLabel: "AI MENTORSHIP", sub: "AI adapts your roadmap as you grow and progress.", accent: "#4fc3f7", icon: <Bot className="w-4 h-4" /> },
];

const avatars = [
  "https://i.pravatar.cc/150?u=a042581f4e29026024d",
  "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  "https://i.pravatar.cc/150?u=a04258114e29026702d",
  "https://i.pravatar.cc/150?u=a048581f4e29026701d",
];

// Only show nodes on large screens — hidden via CSS on mobile
const nodes = [
  { x: "6%",  y: "16%", size: 54, delay: 0,   label: "Python", icon: "🐍" },
  { x: "12%", y: "68%", size: 48, delay: 0.7, label: "React",  icon: "⚛️" },
  { x: "3%",  y: "44%", size: 42, delay: 1.3, label: "ML",     icon: "🤖" },
  { x: "87%", y: "20%", size: 50, delay: 0.4, label: "DevOps", icon: "⚙️" },
  { x: "91%", y: "60%", size: 44, delay: 1.0, label: "Cloud",  icon: "☁️" },
  { x: "80%", y: "82%", size: 40, delay: 1.6, label: "SQL",    icon: "🗄️" },
];

const stars = Array.from({ length: 55 }, (_, i) => ({
  x: Math.random() * 100,
  y: Math.random() * 60,
  size: Math.random() * 2 + 0.5,
  opacity: Math.random() * 0.5 + 0.15,
  dur: Math.random() * 3 + 2,
}));

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);

  const startInterval = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % slides.length);
    }, 6000);
  };

  useEffect(() => { startInterval(); return () => clearInterval(intervalRef.current); }, []);

  const next = () => { setCurrent(p => (p + 1) % slides.length); startInterval(); };
  const prev = () => { setCurrent(p => (p - 1 + slides.length) % slides.length); startInterval(); };

  const s = slides[current];
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center overflow-hidden pt-[160px]">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&display=swap');

        .hero-sky {
          background: linear-gradient(
            180deg,
            #040e18 0%, #071e2e 18%, #083344 32%, #0a4a5e 48%,
            #0d6070 58%, #1a7a85 68%, #2a9098 76%,
            #4aacac 84%, #7ecaca 91%, #b0dede 96%, #d4eeee 100%
          );
        }
        .hero-horizon {
          background: radial-gradient(ellipse 90% 35% at 50% 100%,
            rgba(100,220,220,0.22) 0%, rgba(40,160,170,0.12) 40%, transparent 70%);
        }
        .hero-left-fade {
          background: linear-gradient(
            to right,
            rgba(4,14,24,0.97) 0%, rgba(4,14,24,0.90) 28%,
            rgba(4,14,24,0.55) 52%, transparent 75%
          );
        }

        @keyframes twinkle   { 0%,100%{opacity:var(--op);} 50%{opacity:calc(var(--op)*0.3);} }
        @keyframes floatY    { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-11px);} }
        @keyframes pulseRing { 0%,100%{opacity:0.25;transform:scale(1);} 50%{opacity:0.65;transform:scale(1.18);} }
        @keyframes shimmerTag{ 0%,100%{box-shadow:0 0 0 rgba(23,182,168,0);} 50%{box-shadow:0 0 18px rgba(23,182,168,0.35);} }

        .float-node { animation: floatY 4.5s ease-in-out infinite; }
        .pulse-ring  { animation: pulseRing 2.8s ease-in-out infinite; }
        .hero-tag    { animation: shimmerTag 3s ease-in-out infinite; }

        .hero-heading {
          font-family: 'Playfair Display', Georgia, serif;
          font-weight: 900;
          line-height: 1.08;
          letter-spacing: -1.5px;
          color: #fff;
          text-shadow: 0 2px 30px rgba(0,0,0,0.55);
        }
        .hero-highlight {
          font-style: italic;
          background: linear-gradient(135deg, #17B6A8 0%, #4fc3f7 50%, #17d4c4 100%);
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 20px rgba(23,182,168,0.45));
        }
        .hero-sub {
          font-family: system-ui, sans-serif;
          color: rgba(255,255,255,0.72);
          line-height: 1.8;
          font-weight: 400;
        }
        .hero-btn-primary {
          background: linear-gradient(135deg, #17B6A8 0%, #0d9e92 100%);
          color: #fff; font-weight: 700; letter-spacing: 0.03em;
          box-shadow: 0 8px 32px -6px rgba(23,182,168,0.6);
          border: none; cursor: pointer; transition: all 0.25s;
          font-family: system-ui, sans-serif;
          display: flex; align-items: center; gap: 10px;
        }
        .hero-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 14px 40px -6px rgba(23,182,168,0.7); }
        .hero-btn-secondary {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.20);
          color: rgba(255,255,255,0.85); font-weight: 600;
          cursor: pointer; transition: all 0.25s; backdrop-filter: blur(8px);
          font-family: system-ui, sans-serif;
        }
        .hero-btn-secondary:hover { background: rgba(255,255,255,0.12); border-color: rgba(255,255,255,0.35); }

        .slide-frame {
          border-radius: 2.8rem;
          border: 2px solid rgba(255,255,255,0.10);
          box-shadow: 0 40px 90px -20px rgba(0,0,0,0.75), 0 0 0 1px rgba(23,182,168,0.08);
          object-fit: cover; width: 100%;
          image-rendering: -webkit-optimize-contrast;
          filter: brightness(1.04) contrast(1.06) saturate(1.08);
        }

        /* ── Floating nodes: hide on small screens ── */
        .hero-nodes-wrap { display: block; }
        @media (max-width: 1024px) { .hero-nodes-wrap { display: none; } }

        /* ── Hero grid layout ── */
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
          width: 100%;
        }
        @media (max-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        /* ── Image height responsive ── */
        .hero-img-height { height: 680px; }
        @media (max-width: 1024px) { .hero-img-height { height: 420px; } }
        @media (max-width: 640px)  { .hero-img-height { height: 300px; } }

        /* ── Stat card position ── */
        .stat-card-wrap {
          position: absolute;
          top: 48px;
          left: -56px;
          z-index: 20;
        }
        @media (max-width: 1200px) { .stat-card-wrap { left: -20px; } }
        @media (max-width: 1024px) { .stat-card-wrap { left: 12px; top: 16px; } }
        @media (max-width: 480px)  { .stat-card-wrap { left: 8px; top: 10px; } }

        /* ── Review card position ── */
        .review-card-wrap {
          position: absolute;
          bottom: -40px;
          right: -32px;
          z-index: 20;
          width: 295px;
        }
        @media (max-width: 1200px) { .review-card-wrap { right: 0; } }
        @media (max-width: 1024px) { .review-card-wrap { right: 8px; bottom: -24px; width: 260px; } }
        @media (max-width: 480px)  { .review-card-wrap { right: 4px; bottom: -16px; width: 220px; } }

        /* ── Left text section ── */
        .hero-left {
          space-y: 8;
        }
        @media (max-width: 1024px) {
          .hero-left { text-align: center; }
          .hero-left .checklist-item { justify-content: center; }
          .hero-left .hero-sub { margin-left: auto; margin-right: auto; }
          .hero-left .btn-row { justify-content: center; }
        }

        /* ── Buttons responsive ── */
        .hero-btn-row {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          padding-top: 4px;
        }
        @media (max-width: 1024px) {
          .hero-btn-row { justify-content: center; }
        }
        @media (max-width: 480px) {
          .hero-btn-row { flex-direction: column; align-items: stretch; }
          .hero-btn-row button { width: 100%; justify-content: center; }
        }

        /* ── Image wrapper ── */
        .hero-img-wrap {
          position: relative;
          width: 100%;
          max-width: 520px;
          margin-left: auto;
        }
        @media (max-width: 1024px) {
          .hero-img-wrap { max-width: 100%; margin: 0 auto; }
        }

        /* ── Navigation bottom offset ── */
        .hero-nav {
          bottom: 40px;
        }
        @media (max-width: 640px) {
          .hero-nav { bottom: 16px; }
        }

        /* ── Section padding ── */
        .hero-content-pad {
          padding-top: 64px;
          padding-bottom: 64px;
          padding-left: 32px;
          padding-right: 32px;
        }
        @media (max-width: 768px) {
          .hero-content-pad {
            padding-top: 40px;
            padding-bottom: 100px;
            padding-left: 20px;
            padding-right: 20px;
          }
        }
        @media (max-width: 480px) {
          .hero-content-pad {
            padding-left: 16px;
            padding-right: 16px;
          }
        }
      `}</style>

      {/* ── Sky background ── */}
      <div className="hero-sky absolute inset-0" />
      <div className="hero-horizon absolute inset-0 pointer-events-none" />
      <div className="hero-left-fade absolute inset-0 pointer-events-none z-[1]" />

      {/* ── Stars ── */}
      {stars.map((st, i) => (
        <div key={i} style={{
          position: "absolute", left: `${st.x}%`, top: `${st.y}%`,
          width: st.size, height: st.size, borderRadius: "50%",
          background: "#fff", opacity: st.opacity,
          "--op": st.opacity,
          animation: `twinkle ${st.dur}s ease-in-out infinite`,
          animationDelay: `${i * 0.11}s`,
          pointerEvents: "none", zIndex: 0,
        }} />
      ))}

      {/* ── Floating skill nodes (desktop only) ── */}
      <div className="hero-nodes-wrap absolute inset-0 z-[2] pointer-events-none">
        {nodes.map((n, i) => (
          <div key={i} className="float-node absolute"
            style={{ left: n.x, top: n.y, animationDelay: `${n.delay}s` }}>
            <div className="pulse-ring absolute inset-0 rounded-full"
              style={{ border: "1px solid rgba(23,182,168,0.28)", margin: -7, animationDelay: `${n.delay + 0.4}s` }} />
            <div style={{
              width: n.size, height: n.size, borderRadius: "50%",
              background: "rgba(4,14,24,0.75)", border: "1px solid rgba(255,255,255,0.14)",
              backdropFilter: "blur(14px)",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)", gap: 1,
            }}>
              <span style={{ fontSize: n.size * 0.32 }}>{n.icon}</span>
              <span style={{ fontSize: 7.5, color: "rgba(180,240,240,0.85)", fontWeight: 700, letterSpacing: "0.05em" }}>{n.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Main content ── */}
      <div className="relative z-[10] max-w-7xl mx-auto w-full hero-content-pad">
        <div className="hero-grid">

          {/* LEFT */}
          <div className="hero-left" style={{ display: "flex", flexDirection: "column", gap: 28 }}>

            {/* Tag */}
            <AnimatePresence mode="wait">
              <motion.div key={`tag-${current}`}
                initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="hero-tag inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full"
                style={{
                  border: "1px solid rgba(23,182,168,0.40)",
                  background: "rgba(4,14,24,0.55)",
                  backdropFilter: "blur(14px)",
                  alignSelf: "flex-start",
                }}
              >
                <span style={{ color: "#17B6A8" }}>{s.icon}</span>
                <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#4fc3f7" }}>
                  {s.tag}
                </span>
              </motion.div>
            </AnimatePresence>

            {/* Heading */}
            <AnimatePresence mode="wait">
              <motion.h1 key={`title-${current}`}
                initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.55, delay: 0.05 }}
                className="hero-heading"
                style={{ fontSize: "clamp(38px, 6vw, 88px)", margin: 0 }}
              >
                {s.title}<br />
                <span className="hero-highlight">{s.highlight}</span>
              </motion.h1>
            </AnimatePresence>

            {/* Subtitle */}
            <AnimatePresence mode="wait">
              <motion.p key={`sub-${current}`}
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="hero-sub"
                style={{ fontSize: "clamp(15px, 1.5vw, 20px)", maxWidth: 490, margin: 0 }}
              >
                {s.sub}
              </motion.p>
            </AnimatePresence>

            {/* Checklist */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
              style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {["100% Free to use", "AI-powered personalization", "Verified career roadmaps"].map((item, i) => (
                <div key={i} className="checklist-item" style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: "50%",
                    background: "rgba(23,182,168,0.18)", border: "1px solid rgba(23,182,168,0.40)",
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}>
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4l2.5 2.5L9 1" stroke="#17B6A8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span style={{ fontSize: 15.5, color: "rgba(255,255,255,0.72)", fontFamily: "system-ui,sans-serif" }}>{item}</span>
                </div>
              ))}
            </motion.div>

            {/* Buttons */}
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="hero-btn-row">
              <button
                onClick={() => navigate("/roadmap/generate")}
                className="hero-btn-primary"
                style={{ padding: "clamp(13px,2vw,18px) clamp(24px,3vw,42px)", borderRadius: 14, fontSize: "clamp(14px,1.4vw,16px)" }}
              >
                Get Started Free <ArrowRight style={{ width: 18, height: 18 }} />
              </button>
              <button
                onClick={() => navigate("/courses")}
                className="hero-btn-secondary"
                style={{ padding: "clamp(13px,2vw,18px) clamp(20px,2.5vw,38px)", borderRadius: 14, fontSize: "clamp(14px,1.4vw,16px)" }}
              >
                Watch Demo
              </button>
            </motion.div>
          </div>

          {/* RIGHT — slide image */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="hero-img-wrap">

              <AnimatePresence mode="wait">
                <motion.div key={`main-${current}`}
                  initial={{ opacity: 0, scale: 0.93, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.04, y: -10 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  style={{ position: "relative", zIndex: 10 }}
                >
                  <div style={{
                    position: "absolute", inset: -12, borderRadius: "3.2rem",
                    background: `radial-gradient(ellipse at center, ${s.accent}33 0%, transparent 70%)`,
                    filter: "blur(24px)",
                  }} />
                  <img src={s.mainImg} alt="AI Learning" className="slide-frame hero-img-height relative" />
                  <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0, height: "38%",
                    borderRadius: "0 0 2.8rem 2.8rem",
                    background: "linear-gradient(to top, rgba(4,14,24,0.65) 0%, transparent 100%)",
                  }} />
                </motion.div>
              </AnimatePresence>

              {/* Stat Card */}
              <AnimatePresence>
                <motion.div key={`stat-${current}`}
                  initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -30, opacity: 0 }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 130 }}
                  className="stat-card-wrap"
                  style={{
                    padding: 1, borderRadius: 18,
                    background: `linear-gradient(135deg, ${s.accent}55, rgba(255,255,255,0.08))`,
                    backdropFilter: "blur(20px)",
                    boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 20px", borderRadius: 17, background: "rgba(4,14,24,0.92)", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, overflow: "hidden", border: `1.5px solid ${s.accent}55`, boxShadow: `0 0 16px ${s.accent}44`, flexShrink: 0 }}>
                      <img src={s.mainImg} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(1.05) contrast(1.08)" }} />
                    </div>
                    <div>
                      <span style={{ fontSize: "clamp(22px,3vw,32px)", fontWeight: 900, color: "#fff", lineHeight: 1, display: "block", fontFamily: "system-ui" }}>{s.stat}</span>
                      <span style={{ fontSize: 10, fontWeight: 800, color: s.accent, letterSpacing: "0.15em", textTransform: "uppercase", display: "block", marginTop: 4 }}>{s.statLabel}</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Review Card */}
              <motion.div
                initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.65, type: "spring" }}
                className="review-card-wrap"
                style={{
                  padding: 1, borderRadius: "2rem",
                  background: "linear-gradient(135deg, rgba(255,255,255,0.14), rgba(23,182,168,0.20))",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.55)",
                }}
              >
                <div style={{ background: "rgba(4,12,22,0.96)", borderRadius: "1.9rem", border: "1px solid rgba(255,255,255,0.05)", padding: "16px 18px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                    <div style={{ display: "flex" }}>
                      {avatars.map((url, i) => (
                        <div key={i} style={{ width: 28, height: 28, borderRadius: "50%", overflow: "hidden", border: "2px solid #040e16", marginLeft: i === 0 ? 0 : -8 }}>
                          <img src={url} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.85, filter: "brightness(1.05)" }} />
                        </div>
                      ))}
                      <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#17B6A8", border: "2px solid #040e16", marginLeft: -8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 900, color: "#fff", boxShadow: "0 0 12px rgba(23,182,168,0.45)" }}>+</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "4px 10px", borderRadius: 8, background: "rgba(23,182,168,0.10)", border: "1px solid rgba(23,182,168,0.22)" }}>
                      <Star style={{ width: 12, height: 12, color: "#F5C842", fill: "#F5C842" }} />
                      <span style={{ fontSize: 11, fontWeight: 800, color: "#17B6A8" }}>4.9</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <Sparkles style={{ width: 13, height: 13, color: "#4fc3f7", flexShrink: 0 }} />
                    <span style={{ fontSize: 11, fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: "0.1em" }}>AI Smart Roadmap</span>
                  </div>
                  <p style={{ fontSize: 12, lineHeight: 1.65, fontStyle: "italic", color: "rgba(255,255,255,0.65)", margin: 0 }}>
                    "This platform completely changed how I approach my tech career."
                  </p>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </div>

      {/* ── Navigation ── */}
      <div className="hero-nav absolute left-1/2 -translate-x-1/2 flex items-center gap-8 z-30" style={{ position: "absolute" }}>
        <button onClick={prev}
          style={{ padding: 12, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.15)", background: "rgba(4,14,24,0.5)", backdropFilter: "blur(10px)", cursor: "pointer", transition: "all 0.2s" }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(23,182,168,0.5)"; e.currentTarget.style.background = "rgba(23,182,168,0.10)"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.background = "rgba(4,14,24,0.5)"; }}>
          <ChevronLeft style={{ width: 22, height: 22, color: "rgba(255,255,255,0.60)" }} />
        </button>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          {slides.map((_, i) => (
            <button key={i} onClick={() => { setCurrent(i); startInterval(); }}
              style={{
                height: 6, width: i === current ? 50 : 7,
                borderRadius: 9999,
                background: i === current ? "#17B6A8" : "rgba(255,255,255,0.22)",
                boxShadow: i === current ? "0 0 18px rgba(23,182,168,0.65)" : "none",
                border: "none", cursor: "pointer", padding: 0, transition: "all 0.6s ease",
              }} />
          ))}
        </div>

        <button onClick={next}
          style={{ padding: 12, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.15)", background: "rgba(4,14,24,0.5)", backdropFilter: "blur(10px)", cursor: "pointer", transition: "all 0.2s" }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(23,182,168,0.5)"; e.currentTarget.style.background = "rgba(23,182,168,0.10)"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.background = "rgba(4,14,24,0.5)"; }}>
          <ChevronRight style={{ width: 22, height: 22, color: "rgba(255,255,255,0.60)" }} />
        </button>
      </div>

    </div>
  );
};

export default Hero;