"use client";
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";

// ── useInView ─────────────────────────────────────────────────
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ── Data: Educational Info ────────────────────────────────────
const conversionInfo = [
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>,
    title: "CBSE Grading System",
    accent: "#07CBEB",
    desc: "The Central Board of Secondary Education (CBSE) officially uses a multiplier of 9.5. To convert your CBSE CGPA to a percentage, multiply it by 9.5 (e.g., 9.0 CGPA = 85.5%)."
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>,
    title: "Standard & University",
    accent: "#022C45",
    desc: "Many state boards, ICSE equivalents, and Indian universities (like AICTE approved B.Tech programs) use a standard multiplier of 10.0 or a specific formula provided on the back of your transcript."
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" y1="22" x2="12" y2="12"/></svg>,
    title: "WES & International Specs",
    accent: "#F16101",
    desc: "When applying to the USA or Canada, universities often require your score to be converted to a 4.0 or 4.33 GPA scale. While this calculator gives an accurate estimate, WES will do a formal course-by-course evaluation."
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
    title: "Study Abroad Minimums",
    accent: "#07CBEB",
    desc: "Most top-tier global universities require a minimum equivalent of 60% to 65% (roughly 6.5 to 7.0 CGPA) for Master's programs, though elite institutions often expect 75%+."
  }
];

// ── Section Wrapper ───────────────────────────────────────────
function Section({ children, bg = "#ffffff", style = {} }: { children: React.ReactNode; bg?: string; style?: React.CSSProperties }) {
  return (
    <section style={{ background: bg, position: "relative", overflow: "hidden", ...style }}>
      {children}
    </section>
  );
}

// ── Eyebrow ───────────────────────────────────────────────────
function Eyebrow({ label }: { label: string }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "9px", marginBottom: "16px" }}>
      <div style={{ width: "30px", height: "2px", borderRadius: "1px", background: "linear-gradient(90deg, #07CBEB, #022C45)" }}/>
      <span style={{
        fontSize: "11px", fontWeight: 800, letterSpacing: "2.5px", textTransform: "uppercase",
        background: "linear-gradient(90deg, #07CBEB, #022C45)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
      }}>{label}</span>
    </div>
  );
}

// ── Heading ───────────────────────────────────────────────────
function Heading({ line1, line2 }: { line1: string; line2: string }) {
  return (
    <h2 style={{ fontSize: "clamp(32px, 4vw, 44px)", fontWeight: 900, color: "#022C45", lineHeight: 1.1, letterSpacing: "-0.8px", margin: "0 0 16px" }}>
      {line1}<br/>
      <span style={{ position: "relative", display: "inline-block", background: "linear-gradient(100deg, #07CBEB 0%, #022C45 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
        {line2}
        <svg style={{ position: "absolute", bottom: "-6px", left: 0, width: "100%" }} height="5" viewBox="0 0 300 5" preserveAspectRatio="none">
          <defs><linearGradient id="ulineCGPA" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#07CBEB"/><stop offset="100%" stopColor="#022C45"/></linearGradient></defs>
          <path d="M0,3 Q75,0 150,3 Q225,7 300,3" stroke="url(#ulineCGPA)" strokeWidth="3" fill="none" strokeLinecap="round"/>
        </svg>
      </span>
    </h2>
  );
}

// ═══════════════════════════════════════════════════════════════
//  CGPA CALCULATOR PAGE
// ═══════════════════════════════════════════════════════════════
export default function CgpaCalculatorPage() {
  useEffect(() => { document.title = "CGPA to Percentage Calculator — Free Tool | Edification Overseas"; }, []);

  const heroRef = useInView(0.1);
  const infoRef = useInView(0.1);

  // Calculator State
  const [board, setBoard] = useState<"cbse" | "standard" | "icse">("cbse");
  const [multiplier, setMultiplier] = useState<number>(9.5);
  
  // 4-Way Sync Inputs
  const [cgpa, setCgpa] = useState<string>("");
  const [percentage, setPercentage] = useState<string>("");
  const [usaGpa, setUsaGpa] = useState<string>("");
  const [canGpa, setCanGpa] = useState<string>("");

  // Performance Interpretation State
  const [interpretation, setInterpretation] = useState<{label: string, color: string, bg: string} | null>(null);

  // Unified Calculation Engine
  const calculateAll = (value: number, type: 'cgpa' | 'perc' | 'usa' | 'can', currentMultiplier: number) => {
    if (isNaN(value) || value < 0) {
      setCgpa(""); setPercentage(""); setUsaGpa(""); setCanGpa(""); setInterpretation(null);
      return;
    }

    let p = 0;
    if (type === 'cgpa') p = value * currentMultiplier;
    else if (type === 'perc') p = value;
    else if (type === 'usa') p = (value / 4.0) * 100;
    else if (type === 'can') p = (value / 4.33) * 100;

    // Strict clamp percentage between 0 and 100
    p = Math.min(Math.max(p, 0), 100);

    // Sync all states
    setPercentage(p.toFixed(2));
    setCgpa(Math.min(p / currentMultiplier, 10).toFixed(2));
    setUsaGpa((p / 100 * 4.0).toFixed(2));
    setCanGpa((p / 100 * 4.33).toFixed(2));

    // Determine Performance Badge
    if (p >= 85) setInterpretation({ label: "Excellent (Highly Competitive)", color: "#059669", bg: "#ECFDF5" });
    else if (p >= 70) setInterpretation({ label: "Good (Above Average)", color: "#0284C7", bg: "#E0F2FE" });
    else if (p >= 60) setInterpretation({ label: "Satisfactory", color: "#D97706", bg: "#FEF3C7" });
    else setInterpretation({ label: "Below Average", color: "#DC2626", bg: "#FEF2F2" });
  };

  // Handle Board Change
  useEffect(() => {
    let newMultiplier = 9.5;
    if (board === "cbse") newMultiplier = 9.5;
    if (board === "standard") newMultiplier = 10.0;
    if (board === "icse") newMultiplier = 10.0;
    
    setMultiplier(newMultiplier);

    // Recalculate based on existing CGPA if board changes
    if (cgpa && !isNaN(parseFloat(cgpa))) {
      calculateAll(parseFloat(cgpa), 'cgpa', newMultiplier);
    }
  }, [board]);

  // Input Handlers
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>, type: 'cgpa' | 'perc' | 'usa' | 'can') => {
    const val = e.target.value;
    if (val === "") {
      setCgpa(""); setPercentage(""); setUsaGpa(""); setCanGpa(""); setInterpretation(null);
      return;
    }
    
    // Optimistic UI update for the field currently being typed in
    if (type === 'cgpa') setCgpa(val);
    if (type === 'perc') setPercentage(val);
    if (type === 'usa') setUsaGpa(val);
    if (type === 'can') setCanGpa(val);

    calculateAll(parseFloat(val), type, multiplier);
  };

  // Quick Select Helper
  const applyQuickSelect = (val: number) => {
    setCgpa(val.toString());
    calculateAll(val, 'cgpa', multiplier);
  };

  return (
    <main style={{ background: "#F9FAFB", overflowX: "hidden" }}>

      <style dangerouslySetInnerHTML={{ __html: `
        /* Entrance Animations */
        @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        
        /* ── CALCULATOR UI CSS ── */
        .calc-wrapper {
          background: #ffffff; border-radius: 32px; padding: 48px;
          box-shadow: 0 24px 64px rgba(2,44,69,0.06); border: 1px solid rgba(7,203,235,0.2);
          max-width: 900px; margin: 0 auto;
        }

        .board-toggle {
          display: flex; background: rgba(2,44,69,0.03); border-radius: 16px; padding: 6px;
          margin-bottom: 32px;
        }
        .board-btn {
          flex: 1; padding: 14px 20px; border-radius: 12px; font-weight: 800; font-size: 14.5px;
          cursor: pointer; border: none; background: transparent; color: #6B7280;
          transition: all 0.25s ease;
        }
        .board-btn.active {
          background: #022C45; color: #ffffff; box-shadow: 0 8px 16px rgba(2,44,69,0.15);
        }

        .input-grid {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; align-items: center;
        }
        .input-group {
          display: flex; flex-direction: column; gap: 8px; position: relative;
        }
        .input-label {
          font-size: 13px; font-weight: 800; color: #9CA3AF; text-transform: uppercase; letter-spacing: 1px;
        }
        .number-input {
          width: 100%; padding: 24px; border-radius: 16px; border: 2px solid rgba(2,44,69,0.1);
          font-size: 32px; font-weight: 900; color: #022C45; background: #fcfdfd;
          text-align: center; outline: none; transition: all 0.3s;
        }
        .number-input:focus { border-color: #07CBEB; background: #ffffff; box-shadow: 0 0 0 4px rgba(7,203,235,0.1); }
        .number-input::placeholder { color: #D1D5DB; }

        .quick-select {
          display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin-top: 32px;
          padding-top: 32px; border-top: 1px dashed rgba(2,44,69,0.1);
        }
        .quick-btn {
          padding: 8px 16px; border-radius: 999px; font-size: 13px; font-weight: 700;
          background: #ffffff; border: 1px solid rgba(2,44,69,0.1); color: #4B5563;
          cursor: pointer; transition: all 0.2s;
        }
        .quick-btn:hover { border-color: #07CBEB; color: #07CBEB; background: rgba(7,203,235,0.05); }

        @media (max-width: 768px) {
          .calc-wrapper { padding: 32px 20px; }
          .board-toggle { flex-direction: column; }
          .input-grid { grid-template-columns: 1fr; gap: 16px; }
          .number-input { font-size: 28px; padding: 20px; }
        }

        /* ── INFO BENTO GRID ── */
        .info-grid {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; margin-top: 40px;
        }
        .info-card {
          background: #ffffff; border-radius: 24px; padding: 40px;
          border: 1px solid rgba(2,44,69,0.06); box-shadow: 0 12px 32px rgba(2,44,69,0.03);
          transition: transform 0.4s ease, box-shadow 0.4s ease; display: flex; gap: 20px;
        }
        .info-card:hover {
          transform: translateY(-6px); box-shadow: 0 24px 48px rgba(7,203,235,0.1);
        }
        .info-icon-wrap {
          width: 56px; height: 56px; border-radius: 14px; display: flex; align-items: center;
          justify-content: center; flex-shrink: 0;
        }

        @media (max-width: 960px) {
          .info-grid { grid-template-columns: 1fr; }
          .info-card { padding: 32px 24px; flex-direction: column; }
        }
      `}} />

      {/* ════════════════════════════════════════════════════════
          1. HERO & CALCULATOR SECTION
      ════════════════════════════════════════════════════════ */}
      <Section bg="linear-gradient(105deg, #ffffff 0%, #f2f9fb 45%, #dcf2f7 100%)" style={{ padding: "80px 0 120px" }}>
        {/* Background Grid Pattern */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: `linear-gradient(rgba(2,44,69,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(2,44,69,0.03) 1px, transparent 1px)`, backgroundSize: "64px 64px" }}/>
        
        <div ref={heroRef.ref} style={{ maxWidth: "1280px", margin: "auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
          
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "rgba(7,203,235,0.1)", border: "1px solid rgba(7,203,235,0.3)",
              borderRadius: "999px", padding: "6px 16px", marginBottom: "20px",
              animation: heroRef.inView ? "fadeSlideUp 0.5s ease 0.1s both" : "none",
            }}>
              <span style={{ fontSize: "12px", fontWeight: 800, color: "#022C45", letterSpacing: "0.4px", textTransform: "uppercase" }}>
                Academic Conversion Tool
              </span>
            </div>

            <h1 style={{
              fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 900, color: "#022C45", lineHeight: 1.1,
              letterSpacing: "-1px", margin: "0 0 20px",
              animation: heroRef.inView ? "fadeSlideUp 0.55s ease 0.2s both" : "none",
            }}>
              CGPA & Global <span style={{ color: "#07CBEB" }}>GPA</span><br/>
              Calculator
            </h1>
            <p style={{
              fontSize: "17px", color: "#4A5568", lineHeight: 1.6, maxWidth: "600px", margin: "0 auto",
              animation: heroRef.inView ? "fadeSlideUp 0.55s ease 0.3s both" : "none",
            }}>
              Instantly convert your Indian CGPA to Percentage, USA GPA (4.0 scale), and Canada GPA (4.33 scale) to evaluate your global admission chances.
            </p>
          </div>

          {/* THE FOUR-WAY CALCULATOR WIDGET */}
          <div className="calc-wrapper" style={{
            animation: heroRef.inView ? "scaleIn 0.7s cubic-bezier(0.22,1,0.36,1) 0.4s both" : "none",
            opacity: heroRef.inView ? 1 : 0
          }}>
            
            {/* 1. Board Selector */}
            <div className="board-toggle">
              <button 
                className={`board-btn ${board === "cbse" ? "active" : ""}`} 
                onClick={() => setBoard("cbse")}
              >
                CBSE Board (x9.5)
              </button>
              <button 
                className={`board-btn ${board === "standard" ? "active" : ""}`} 
                onClick={() => setBoard("standard")}
              >
                Standard / Univ. (x10.0)
              </button>
              <button 
                className={`board-btn ${board === "icse" ? "active" : ""}`} 
                onClick={() => setBoard("icse")}
              >
                ICSE / State (x10.0)
              </button>
            </div>

            {/* 2. 4-Way Conversion Inputs */}
            <div className="input-grid">
              
              <div className="input-group">
                <label className="input-label">Indian CGPA (Out of 10)</label>
                <input 
                  type="number" 
                  className="number-input" 
                  placeholder="0.0" 
                  value={cgpa}
                  onChange={(e) => handleInput(e, 'cgpa')}
                  min="0" max="10" step="0.1"
                />
              </div>

              <div className="input-group">
                <label className="input-label">Percentage (%)</label>
                <input 
                  type="number" 
                  className="number-input" 
                  placeholder="0%" 
                  value={percentage}
                  onChange={(e) => handleInput(e, 'perc')}
                  min="0" max="100" step="0.1"
                />
              </div>

              <div className="input-group">
                <label className="input-label">USA GPA (4.0 Scale)</label>
                <input 
                  type="number" 
                  className="number-input" 
                  placeholder="0.0" 
                  value={usaGpa}
                  onChange={(e) => handleInput(e, 'usa')}
                  min="0" max="4.0" step="0.01"
                />
              </div>

              <div className="input-group">
                <label className="input-label">Canada GPA (4.33 Scale)</label>
                <input 
                  type="number" 
                  className="number-input" 
                  placeholder="0.0" 
                  value={canGpa}
                  onChange={(e) => handleInput(e, 'can')}
                  min="0" max="4.33" step="0.01"
                />
              </div>

            </div>

            {/* Performance Interpretation Badge */}
            {interpretation && (
              <div style={{
                marginTop: "32px", padding: "16px", borderRadius: "16px",
                background: interpretation.bg, border: `1px solid ${interpretation.color}30`,
                display: "flex", alignItems: "center", justifyContent: "center", gap: "12px",
                animation: "fadeSlideUp 0.4s ease"
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={interpretation.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                <span style={{ fontSize: "16px", fontWeight: 800, color: interpretation.color }}>
                  Profile Strength: {interpretation.label}
                </span>
              </div>
            )}

            {/* 3. Quick Select Chips */}
            <div className="quick-select">
              <span style={{ fontSize: "13px", fontWeight: 800, color: "#9CA3AF", alignSelf: "center", marginRight: "8px", textTransform: "uppercase" }}>Quick Select:</span>
              {[10.0, 9.5, 9.0, 8.5, 8.0, 7.5, 7.0, 6.5, 6.0].map(val => (
                <button key={val} className="quick-btn" onClick={() => applyQuickSelect(val)}>
                  {val.toFixed(1)} CGPA
                </button>
              ))}
            </div>

            <div style={{ textAlign: "center", marginTop: "24px", fontSize: "13px", color: "#6B7280" }}>
              Calculation applied: <strong style={{ color: "#022C45" }}>CGPA × {multiplier.toFixed(1)} = Percentage</strong>
            </div>

          </div>
          
        </div>
      </Section>

      {/* ════════════════════════════════════════════════════════
          2. EDUCATIONAL INFO BENTO GRID
      ════════════════════════════════════════════════════════ */}
      <Section bg="#ffffff" style={{ padding: "100px 0 120px" }}>
        <div ref={infoRef.ref} style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
          
          <div style={{ textAlign: "center", marginBottom: "64px", animation: infoRef.inView ? "fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both" : "none", opacity: infoRef.inView ? 1 : 0 }}>
            <Eyebrow label="Academic Evaluation" />
            <Heading line1="Understanding CGPA" line2="& Global Equivalency" />
            <p style={{ fontSize: "16px", color: "#6B7280", lineHeight: 1.6, maxWidth: "720px", margin: "20px auto 0" }}>
              Every board and university has a specific conversion formula. Understanding how your grades <br className="hidden md:block" />
              translate internationally is the first step in your study abroad journey.
            </p>
          </div>

          <div className="info-grid">
            {conversionInfo.map((info, i) => (
              <div key={i} className="info-card" style={{
                animation: infoRef.inView ? `fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) ${i * 0.1}s both` : "none",
                opacity: infoRef.inView ? 1 : 0
              }}>
                
                <div className="info-icon-wrap" style={{ background: `${info.accent}15`, color: info.accent }}>
                  {info.icon}
                </div>

                <div>
                  <h3 style={{ fontSize: "22px", fontWeight: 900, color: "#022C45", margin: "0 0 12px", letterSpacing: "-0.5px" }}>
                    {info.title}
                  </h3>
                  <p style={{ fontSize: "15px", color: "#4B5563", lineHeight: 1.7, margin: 0 }}>
                    {info.desc}
                  </p>
                </div>

              </div>
            ))}
          </div>

        </div>
      </Section>

      {/* ════════════════════════════════════════════════════════
          3. BOTTOM CTA BANNER 
      ════════════════════════════════════════════════════════ */}
      <Section bg="#f4fbfc" style={{ padding: "0 0 100px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 24px" }}>
          
          <div style={{
            background: "linear-gradient(135deg, #022C45 0%, #054f77 100%)",
            borderRadius: "24px", padding: "56px 64px",
            display: "flex", alignItems: "center", justifyContent: "space-between", gap: "40px", flexWrap: "wrap",
            position: "relative", overflow: "hidden",
            boxShadow: "0 24px 48px rgba(7,203,235,0.15)",
          }}>
            <div style={{ position: "absolute", right: "-80px", top: "-80px", width: "320px", height: "320px", borderRadius: "50%", background: "radial-gradient(circle, rgba(7,203,235,0.2) 0%, transparent 70%)", pointerEvents: "none" }}/>
            
            <div style={{ position: "relative", zIndex: 1, flex: "1 1 400px" }}>
              <div style={{ display: "inline-block", background: "rgba(7,203,235,0.2)", color: "#8ce7f7", fontSize: "11px", fontWeight: 800, padding: "6px 12px", borderRadius: "6px", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "1px" }}>
                Free Profile Assessment
              </div>
              <h2 style={{ fontSize: "clamp(28px, 3.5vw, 36px)", fontWeight: 900, color: "white", letterSpacing: "-0.5px", margin: "0 0 16px" }}>
                Does Your Score Qualify?
              </h2>
              <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.7)", margin: 0, lineHeight: 1.6, maxWidth: "480px" }}>
                Connect with our certified counselors to evaluate your academic profile, CGPA, and match it with top global universities.
              </p>
            </div>

            <Link href="/contact" style={{
              display: "inline-flex", alignItems: "center", gap: "10px", position: "relative", zIndex: 1,
              background: "#c94e00", borderRadius: "12px", padding: "0 0 4px 0", textDecoration: "none", flexShrink: 0,
            }}>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: "10px", padding: "16px 32px",
                background: "#F16101", borderRadius: "12px", fontSize: "15px", fontWeight: 800,
                color: "white", textTransform: "uppercase", letterSpacing: "0.5px", position: "relative",
              }}>
                <span style={{ position: "absolute", top: 0, left: 0, right: 0, height: "45%", background: "linear-gradient(180deg,rgba(255,255,255,0.15),transparent)", borderRadius: "12px 12px 0 0", pointerEvents: "none" }}/>
                Check Eligibility →
              </span>
            </Link>
          </div>

        </div>
      </Section>

    </main>
  );
}