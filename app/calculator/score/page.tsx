"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
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

// ── Data: Score Concordance (Equivalency Table) ───────────────
const scoreData = [
  { level: "C2", ielts: "9.0", pte: "86 - 90", toefl: "118 - 120", det: "160+" },
  { level: "C2", ielts: "8.5", pte: "83 - 85", toefl: "115 - 117", det: "160" },
  { level: "C1", ielts: "8.0", pte: "79 - 82", toefl: "110 - 114", det: "150 - 155" },
  { level: "C1", ielts: "7.5", pte: "73 - 78", toefl: "102 - 109", det: "140 - 145" },
  { level: "C1", ielts: "7.0", pte: "65 - 72", toefl: "94 - 101",  det: "130 - 135" },
  { level: "B2", ielts: "6.5", pte: "58 - 64", toefl: "79 - 93",   det: "120 - 125" },
  { level: "B2", ielts: "6.0", pte: "50 - 57", toefl: "60 - 78",   det: "105 - 115" },
  { level: "B2", ielts: "5.5", pte: "42 - 49", toefl: "46 - 59",   det: "95 - 100" },
  { level: "B1", ielts: "5.0", pte: "36 - 41", toefl: "35 - 45",   det: "80 - 90" },
  { level: "B1", ielts: "4.5", pte: "30 - 35", toefl: "32 - 34",   det: "65 - 75" },
];

const tests = [
  { id: "ielts", label: "IELTS", color: "#E02A36" },
  { id: "pte",   label: "PTE",   color: "#00A5D7" },
  { id: "toefl", label: "TOEFL", color: "#0064A4" },
  { id: "det",   label: "DET",   color: "#1CB0F6" }, // Duolingo
];

// ── Data: Test Information ────────────────────────────────────
const testDetails = [
  {
    id: "ielts",
    name: "IELTS",
    fullName: "International English Language Testing System",
    owners: "British Council, IDP & Cambridge",
    modules: "Listening, Reading, Writing, Speaking",
    scoring: "0 to 9.0 Bands (0.5 increments)",
    validity: "2 Years",
    bestFor: "Universally accepted for Study & PR globally (UK, Canada, Aus).",
    accent: "#E02A36"
  },
  {
    id: "pte",
    name: "PTE Academic",
    fullName: "Pearson Test of English",
    owners: "Pearson PLC",
    modules: "Speaking & Writing (Integrated), Reading, Listening",
    scoring: "10 to 90 Points",
    validity: "2 Years",
    bestFor: "Fastest results. Highly preferred for Australia & UK visas.",
    accent: "#00A5D7"
  },
  {
    id: "toefl",
    name: "TOEFL iBT",
    fullName: "Test of English as a Foreign Language",
    owners: "ETS (Educational Testing Service)",
    modules: "Reading, Listening, Speaking, Writing",
    scoring: "0 to 120 Points (30 per module)",
    validity: "2 Years",
    bestFor: "Top choice for US universities and North American institutions.",
    accent: "#0064A4"
  },
  {
    id: "det",
    name: "Duolingo (DET)",
    fullName: "Duolingo English Test",
    owners: "Duolingo",
    modules: "Adaptive Test (Literacy, Comprehension, Conversation, Production)",
    scoring: "10 to 160 Points (5 point increments)",
    validity: "2 Years",
    bestFor: "Convenient at-home testing. Widely accepted by US/UK undergrads.",
    accent: "#1CB0F6"
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
          <defs><linearGradient id="ulineCalc" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#07CBEB"/><stop offset="100%" stopColor="#022C45"/></linearGradient></defs>
          <path d="M0,3 Q75,0 150,3 Q225,7 300,3" stroke="url(#ulineCalc)" strokeWidth="3" fill="none" strokeLinecap="round"/>
        </svg>
      </span>
    </h2>
  );
}

// ═══════════════════════════════════════════════════════════════
//  SCORE CONVERTER PAGE
// ═══════════════════════════════════════════════════════════════
export default function ScoreCalculatorPage() {
  useEffect(() => { document.title = "IELTS / PTE / TOEFL Score Calculator — Free Tool | Edification Overseas"; }, []);

  const heroRef = useInView(0.1);
  const infoRef = useInView(0.1);

  // State for the Calculator
  const [sourceTest, setSourceTest] = useState<"ielts" | "pte" | "toefl" | "det">("ielts");
  const [selectedIndex, setSelectedIndex] = useState<number>(5); // Default to IELTS 6.5 (Index 5)

  // Derived Values
  const currentData = scoreData[selectedIndex];
  const targetTests = tests.filter(t => t.id !== sourceTest);

  return (
    <main style={{ background: "#F9FAFB", overflowX: "hidden" }}>

      <style dangerouslySetInnerHTML={{ __html: `
        /* Entrance Animations */
        @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        
        /* ── CALCULATOR CSS ── */
        .calc-wrapper {
          background: #ffffff; border-radius: 32px; padding: 48px;
          box-shadow: 0 24px 64px rgba(2,44,69,0.06); border: 1px solid rgba(7,203,235,0.2);
          display: flex; gap: 64px; align-items: stretch;
        }
        .calc-left { flex: 1; display: flex; flex-direction: column; }
        .calc-right { flex: 1; display: flex; flex-direction: column; justify-content: center; gap: 16px; border-left: 1px solid rgba(2,44,69,0.06); padding-left: 64px; }
        
        .test-tab-btn {
          padding: 12px 20px; border-radius: 12px; font-weight: 800; font-size: 14px;
          cursor: pointer; border: 1.5px solid transparent; background: rgba(2,44,69,0.03);
          color: #6B7280; transition: all 0.2s ease; flex: 1; text-align: center;
        }
        .test-tab-btn:hover { background: rgba(2,44,69,0.06); }
        .test-tab-btn.active {
          background: #ffffff; color: #022C45; border-color: #07CBEB;
          box-shadow: 0 4px 12px rgba(7,203,235,0.15);
        }

        .score-select {
          width: 100%; padding: 20px 24px; border-radius: 16px; border: 2px solid rgba(2,44,69,0.1);
          font-size: 24px; font-weight: 900; color: #022C45; background: #ffffff;
          appearance: none; cursor: pointer; outline: none; transition: border-color 0.3s;
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23022C45' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
          background-repeat: no-repeat; background-position: right 24px center; background-size: 16px;
        }
        .score-select:focus { border-color: #07CBEB; }

        .result-card {
          background: #fcfdfd; border-radius: 16px; padding: 24px 32px;
          display: flex; align-items: center; justify-content: space-between;
          border: 1px solid rgba(2,44,69,0.06); box-shadow: 0 8px 24px rgba(2,44,69,0.02);
          transition: transform 0.3s ease;
        }
        .result-card:hover { transform: translateX(8px); border-color: rgba(7,203,235,0.3); }

        @media (max-width: 960px) {
          .calc-wrapper { flex-direction: column; gap: 40px; padding: 32px 24px; }
          .calc-right { border-left: none; padding-left: 0; border-top: 1px solid rgba(2,44,69,0.06); padding-top: 40px; }
          .test-tab-btn { padding: 10px; font-size: 13px; }
        }

        /* ── INFO BENTO GRID ── */
        .info-grid {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; margin-top: 40px;
        }
        .info-card {
          background: #ffffff; border-radius: 24px; padding: 40px;
          border: 1px solid rgba(2,44,69,0.06); box-shadow: 0 12px 32px rgba(2,44,69,0.03);
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }
        .info-card:hover {
          transform: translateY(-6px); box-shadow: 0 24px 48px rgba(7,203,235,0.1);
        }
        @media (max-width: 960px) {
          .info-grid { grid-template-columns: 1fr; }
          .info-card { padding: 32px 24px; }
        }
      `}} />

      {/* ════════════════════════════════════════════════════════
          1. HERO & CALCULATOR SECTION
      ════════════════════════════════════════════════════════ */}
      <Section bg="linear-gradient(105deg, #ffffff 0%, #f2f9fb 45%, #dcf2f7 100%)" style={{ padding: "80px 0 120px" }}>
        {/* Background Grid Pattern */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: `linear-gradient(rgba(2,44,69,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(2,44,69,0.03) 1px, transparent 1px)`, backgroundSize: "64px 64px" }}/>
        
        <div ref={heroRef.ref} style={{ maxWidth: "1000px", margin: "auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
          
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "rgba(7,203,235,0.1)", border: "1px solid rgba(7,203,235,0.3)",
              borderRadius: "999px", padding: "6px 16px", marginBottom: "20px",
              animation: heroRef.inView ? "fadeSlideUp 0.5s ease 0.1s both" : "none",
            }}>
              <span style={{ fontSize: "12px", fontWeight: 800, color: "#022C45", letterSpacing: "0.4px", textTransform: "uppercase" }}>
                Score Equivalency Tool
              </span>
            </div>

            <h1 style={{
              fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 900, color: "#022C45", lineHeight: 1.1,
              letterSpacing: "-1px", margin: "0 0 20px",
              animation: heroRef.inView ? "fadeSlideUp 0.55s ease 0.2s both" : "none",
            }}>
              Convert Your <span style={{ color: "#07CBEB" }}>English</span><br/>
              Proficiency Scores
            </h1>
            <p style={{
              fontSize: "17px", color: "#4A5568", lineHeight: 1.6, maxWidth: "600px", margin: "0 auto",
              animation: heroRef.inView ? "fadeSlideUp 0.55s ease 0.3s both" : "none",
            }}>
              Instantly compare and convert scores across IELTS, PTE Academic, TOEFL iBT, and Duolingo (DET) to see your exact proficiency level.
            </p>
          </div>

          {/* THE CALCULATOR WIDGET */}
          <div className="calc-wrapper" style={{
            animation: heroRef.inView ? "scaleIn 0.7s cubic-bezier(0.22,1,0.36,1) 0.4s both" : "none",
            opacity: heroRef.inView ? 1 : 0
          }}>
            
            {/* Left Side: Inputs */}
            <div className="calc-left">
              <div style={{ fontSize: "12px", fontWeight: 800, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "16px" }}>1. Select Your Test</div>
              
              <div style={{ display: "flex", gap: "8px", marginBottom: "40px" }}>
                {tests.map(test => (
                  <button 
                    key={test.id}
                    className={`test-tab-btn ${sourceTest === test.id ? 'active' : ''}`}
                    onClick={() => setSourceTest(test.id as any)}
                  >
                    {test.label}
                  </button>
                ))}
              </div>

              <div style={{ fontSize: "12px", fontWeight: 800, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "16px" }}>2. Choose Your Score</div>
              <div style={{ position: "relative" }}>
                <select 
                  className="score-select"
                  value={selectedIndex}
                  onChange={(e) => setSelectedIndex(Number(e.target.value))}
                >
                  {scoreData.map((data, index) => (
                    <option key={index} value={index}>
                      {data[sourceTest]} {sourceTest === "ielts" ? "Bands" : "Points"}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ marginTop: "40px", padding: "20px", background: "#f4fbfc", borderRadius: "16px", border: "1px solid rgba(7,203,235,0.2)" }}>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "#022C45", marginBottom: "4px" }}>CEFR Level Indicator:</div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ fontSize: "32px", fontWeight: 900, color: "#07CBEB" }}>{currentData.level}</span>
                  <span style={{ fontSize: "14px", color: "#6B7280", lineHeight: 1.4 }}>
                    {currentData.level === "C2" ? "Mastery (Highly Proficient)" :
                     currentData.level === "C1" ? "Advanced (Operational)" :
                     currentData.level === "B2" ? "Upper Intermediate" : "Intermediate"}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Side: Outputs */}
            <div className="calc-right">
              <div style={{ fontSize: "12px", fontWeight: 800, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "8px" }}>Equivalent Scores</div>
              
              {targetTests.map((test, index) => (
                <div key={test.id} className="result-card" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div>
                    <div style={{ fontSize: "12px", fontWeight: 800, color: test.color, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>{test.label}</div>
                    <div style={{ fontSize: "14px", fontWeight: 600, color: "#6B7280" }}>{test.id === "ielts" ? "Bands" : "Points"}</div>
                  </div>
                  <div style={{ fontSize: "28px", fontWeight: 900, color: "#022C45" }}>
                    {/* Access the score dynamically from the data row based on test ID */}
                    {(currentData as any)[test.id]}
                  </div>
                </div>
              ))}
            </div>

          </div>
          
        </div>
      </Section>

      {/* ════════════════════════════════════════════════════════
          2. UNDERSTAND ENGLISH PROFICIENCY (Test Details)
      ════════════════════════════════════════════════════════ */}
      <Section bg="#ffffff" style={{ padding: "100px 0 120px" }}>
        <div ref={infoRef.ref} style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
          
          <div style={{ textAlign: "center", marginBottom: "64px", animation: infoRef.inView ? "fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both" : "none", opacity: infoRef.inView ? 1 : 0 }}>
            <Eyebrow label="Know Your Test" />
            <Heading line1="Understand English" line2="Proficiency Exams" />
            <p style={{ fontSize: "16px", color: "#6B7280", lineHeight: 1.6, maxWidth: "720px", margin: "20px auto 0" }}>
              Every university and visa authority has specific preferences. Understand the core differences <br className="hidden md:block" />
              between the top four English exams to choose the one that suits your academic goals.
            </p>
          </div>

          <div className="info-grid">
            {testDetails.map((test, i) => (
              <div key={test.id} className="info-card" style={{
                animation: infoRef.inView ? `fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) ${i * 0.1}s both` : "none",
                opacity: infoRef.inView ? 1 : 0
              }}>
                
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "24px", borderBottom: "1px solid rgba(2,44,69,0.06)", paddingBottom: "24px" }}>
                  <div>
                    <h3 style={{ fontSize: "26px", fontWeight: 900, color: "#022C45", margin: "0 0 4px", letterSpacing: "-0.5px" }}>{test.name}</h3>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: test.accent }}>{test.fullName}</div>
                  </div>
                  <div style={{ padding: "8px 16px", background: `${test.accent}15`, color: test.accent, borderRadius: "8px", fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px" }}>
                    {test.validity}
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  
                  <div>
                    <div style={{ fontSize: "11px", fontWeight: 800, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>Owned By</div>
                    <div style={{ fontSize: "15px", fontWeight: 600, color: "#111827" }}>{test.owners}</div>
                  </div>
                  
                  <div>
                    <div style={{ fontSize: "11px", fontWeight: 800, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>Test Modules</div>
                    <div style={{ fontSize: "15px", fontWeight: 600, color: "#111827" }}>{test.modules}</div>
                  </div>

                  <div style={{ display: "flex", gap: "40px" }}>
                    <div>
                      <div style={{ fontSize: "11px", fontWeight: 800, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>Scoring Scale</div>
                      <div style={{ fontSize: "15px", fontWeight: 800, color: test.accent }}>{test.scoring}</div>
                    </div>
                  </div>

                  <div style={{ marginTop: "8px", padding: "16px", background: "#F9FAFB", borderRadius: "12px", borderLeft: `3px solid ${test.accent}` }}>
                    <div style={{ fontSize: "11px", fontWeight: 800, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "6px" }}>Best Used For</div>
                    <div style={{ fontSize: "14px", color: "#4B5563", lineHeight: 1.6 }}>{test.bestFor}</div>
                  </div>

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
                Confidential Profile Assessment
              </div>
              <h2 style={{ fontSize: "clamp(28px, 3.5vw, 36px)", fontWeight: 900, color: "white", letterSpacing: "-0.5px", margin: "0 0 16px" }}>
                Need Help Achieving Your Score?
              </h2>
              <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.7)", margin: 0, lineHeight: 1.6, maxWidth: "480px" }}>
                Connect with our certified counselors to evaluate your current English proficiency and match it with the admission requirements of your dream university.
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
                Book Consultation →
              </span>
            </Link>
          </div>

        </div>
      </Section>

    </main>
  );
}