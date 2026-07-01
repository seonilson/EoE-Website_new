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

// ── Data: Process & Eligibility Flow ──────────────────────────
const dependentSteps = [
  { step: "01", title: "Sponsor Eligibility", desc: "Evaluating the primary applicant's current visa status, duration of stay, and eligibility to sponsor family members." },
  { step: "02", title: "Relationship Proof", desc: "Compiling undeniable evidence of genuine relationship, including marriage certificates, joint accounts, and shared history." },
  { step: "03", title: "Financial Verification", desc: "Calculating and validating the mandatory maintenance funds required by the embassy to support dependents." },
  { step: "04", title: "Document Legalization", desc: "Ensuring birth and marriage certificates are properly translated, notarized, and Apostilled if required." },
  { step: "05", title: "Visa Filing & Biometrics", desc: "Flawless submission of dependent visa applications and scheduling VFS biometric appointments." },
  { step: "06", title: "Family Reunion", desc: "Visa approval, flight booking assistance, and pre-departure briefings for a smooth relocation together." }
];

// ── Data: Countries & Visa Details ────────────────────────────
const detailedServices = [
  { 
    id: "canada",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    title: "Canada Spousal Open Work Permit", tagline: "Work Full-Time (SOWP)", accent: "#07CBEB",
    desc: "Reunite with your spouse studying or working in Canada. The SOWP allows dependents to work full-time for any employer in Canada, while accompanying children can apply for study permits to attend Canadian public schools.",
    benefits: ["Full-Time Open Work Rights", "Dependent Child Study Permits", "Pathway to Canadian PR"]
  },
  { 
    id: "usa",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
    title: "USA Dependent Visas", tagline: "F-2, J-2, H-4 & L-2", accent: "#022C45",
    desc: "Navigate the strict US consulate requirements for bringing your spouse and unmarried children under 21 to the United States.",
    benefits: ["F-2 Visas for Student Spouses", "H-4 & L-2 for Working Professionals", "DS-160 & Interview Prep"]
  },
  { 
    id: "uk",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    title: "UK Dependant Visa", tagline: "Student & Skilled Worker", accent: "#F16101",
    desc: "Join your partner in the UK. We meticulously handle IHS surcharges, maintenance fund proofs, and BRP applications.",
    benefits: ["Skilled Worker Dependants", "PhD Student Dependants", "Full Work Rights in the UK"]
  },
  { 
    id: "aus",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" y1="22" x2="12" y2="12"/></svg>,
    title: "Australia Subsequent Entrant", tagline: "Subclass 500 & 482", accent: "#07CBEB",
    desc: "If you didn't include your family in your original application, bring them later as subsequent entrants. We ensure your OSHC and financial capacities meet DHA criteria.",
    benefits: ["Subsequent Entrant Addition", "De Facto Partner Visas", "Family OSHC Insurance Setup"]
  },
  { 
    id: "proof",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
    title: "Crucial Proof of Relationship", tagline: "Overcoming Rejections", accent: "#022C45",
    desc: "Lack of genuine relationship proof is the #1 reason for dependent visa rejections. Our legal team meticulously compiles undeniable relationship dossiers.",
    benefits: ["Marriage Certificate Legalization", "De Facto Relationship Dossiers", "Joint Asset Documentation"]
  },
  { 
    id: "finance",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
    title: "Financial Sponsorship", tagline: "Maintenance Funds", accent: "#F16101",
    desc: "Embassies require strict proof that the sponsor can financially support dependents without relying on public funds. We handle all financial calculations.",
    benefits: ["Maintenance Fund Calculation", "Bank Statement Audits", "Employer NOC Letters"]
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
          <defs><linearGradient id="ulineDep" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#07CBEB"/><stop offset="100%" stopColor="#022C45"/></linearGradient></defs>
          <path d="M0,3 Q75,0 150,3 Q225,7 300,3" stroke="url(#ulineDep)" strokeWidth="3" fill="none" strokeLinecap="round"/>
        </svg>
      </span>
    </h2>
  );
}

// ═══════════════════════════════════════════════════════════════
//  DEPENDENT VISA PAGE
// ═══════════════════════════════════════════════════════════════
export default function DependentVisaPage() {
  useEffect(() => { document.title = "Dependent Visa — Bring Your Family Abroad Hassle-Free | Edification Overseas"; }, []);

  const heroRef = useInView(0.1);
  const zigzagRef = useInView(0.1);
  const tabRef = useInView(0.05);
  const ctaRef = useInView(0.1);

  // State for the Interactive Command Center (Tabs)
  const [activeTab, setActiveTab] = useState(0);
  const activeService = detailedServices[activeTab];


  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <main style={{ background: "#ffffff", overflowX: "hidden" }}>

      <style dangerouslySetInnerHTML={{ __html: `
        /* Entrance Animations */
        @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.85); } to { opacity: 1; transform: scale(1); } }
        @keyframes floatSlow { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
        @keyframes floatMedium { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-20px) rotate(3deg); } }
        @keyframes floatFast { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-25px) rotate(-4deg); } }
        @keyframes pulseGlowCyan { 0%, 100% { filter: drop-shadow(0 0 15px rgba(7,203,235,0.15)); } 50% { filter: drop-shadow(0 0 40px rgba(7,203,235,0.3)); } }
        @keyframes badgePulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.4); } }
        
        /* ── ZIG-ZAG TIMELINE CSS ── */
        .zigzag-container {
          position: relative; max-width: 1000px; margin: 40px auto 0; padding: 0 24px;
        }
        .zigzag-line {
          position: absolute; top: 0; bottom: 0; left: 50%; width: 2px;
          background: rgba(7, 203, 235, 0.3); transform: translateX(-50%); z-index: 0;
        }
        .zigzag-item {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 48px; position: relative; width: 100%; z-index: 1;
        }
        .zigzag-item:nth-child(odd) { flex-direction: row; }
        .zigzag-item:nth-child(even) { flex-direction: row-reverse; }
        
        .zigzag-content {
          width: 45%; background: #ffffff; border-radius: 16px; padding: 36px 32px;
          border: 1px solid rgba(2, 44, 69, 0.06); box-shadow: 0 12px 32px rgba(2, 44, 69, 0.03);
          position: relative; transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .zigzag-content:hover {
          transform: translateY(-4px); box-shadow: 0 20px 40px rgba(7, 203, 235, 0.1);
          border-color: rgba(7, 203, 235, 0.3);
        }
        .zigzag-empty { width: 45%; }
        
        .zigzag-dot {
          position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);
          width: 48px; height: 48px; background: #022C45; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          color: #ffffff; font-weight: 900; font-size: 16px;
          border: 4px solid #F9FAFB; box-shadow: 0 0 0 4px rgba(7, 203, 235, 0.2); z-index: 2;
        }

        @media (max-width: 768px) {
          .zigzag-line { left: 32px; }
          .zigzag-item { flex-direction: column !important; align-items: flex-end; margin-bottom: 32px; }
          .zigzag-content { width: calc(100% - 64px); padding: 24px; text-align: left; }
          .zigzag-empty { display: none; }
          .zigzag-dot { left: 32px; top: 32px; transform: translate(-50%, -50%); }
        }

        /* ── INTERACTIVE COMMAND CENTER (Tabs System CSS) ── */
        .tabs-container {
          display: flex; gap: 48px; align-items: flex-start; margin-top: 40px;
        }
        .tabs-list {
          flex: 0 0 380px; display: flex; flex-direction: column; gap: 12px;
        }
        .tab-btn {
          width: 100%; text-align: left; padding: 20px 24px; background: #ffffff;
          border-radius: 16px; border: 1px solid rgba(2,44,69,0.06); box-shadow: 0 4px 12px rgba(2,44,69,0.02);
          cursor: pointer; display: flex; align-items: center; gap: 16px;
          transition: all 0.3s cubic-bezier(0.22,1,0.36,1); color: #4B5563; position: relative; overflow: hidden;
        }
        .tab-btn:hover { background: #f4fbfc; border-color: rgba(7,203,235,0.3); }
        .tab-btn.active {
          background: #022C45; color: #ffffff; transform: translateX(12px);
          box-shadow: 0 16px 32px rgba(2,44,69,0.2); border-color: transparent;
        }
        .tab-icon-wrap {
          width: 40px; height: 40px; border-radius: 10px; background: rgba(2,44,69,0.05);
          display: flex; align-items: center; justify-content: center; color: #022C45; transition: all 0.3s;
        }
        .tab-btn.active .tab-icon-wrap { background: rgba(255,255,255,0.15); color: #ffffff; }
        .tab-title { font-size: 15px; font-weight: 800; }
        
        .tab-content-panel {
          flex: 1; background: linear-gradient(135deg, #fcfdfd 0%, #ffffff 100%);
          border-radius: 32px; padding: 56px; border: 1px solid rgba(7,203,235,0.2);
          box-shadow: 0 32px 64px rgba(2,44,69,0.06); position: relative; overflow: hidden;
          min-height: auto; display: flex; flex-direction: column; justify-content: center;
        }
        .tab-fade-enter {
          animation: fadeScaleUp 0.5s cubic-bezier(0.22,1,0.36,1) forwards;
        }
        @keyframes fadeScaleUp {
          from { opacity: 0; transform: scale(0.96) translateY(15px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        @media (max-width: 1024px) {
          .tabs-container { flex-direction: column; gap: 32px; }
          .tabs-list { flex: auto; width: 100%; flex-direction: row; overflow-x: auto; scroll-snap-type: x mandatory; padding-bottom: 20px; }
          .tab-btn { min-width: 300px; scroll-snap-align: center; }
          .tab-btn.active { transform: translateY(-6px) translateX(0); }
          .tab-content-panel { padding: 40px 24px; min-height: auto; }
        }

        .cta-btn { transition: transform 0.18s cubic-bezier(0.4,0,0.2,1); }
        .cta-btn:hover { transform: translateY(-2px); }
      `}} />

      {/* ════════════════════════════════════════════════════════
          1. HERO — Dependent Theme (Centered Image + 4 Floating Tags)
      ════════════════════════════════════════════════════════ */}
      <Section bg="linear-gradient(105deg, #ffffff 0%, #f2f9fb 45%, #dcf2f7 100%)" style={{ padding: "0" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: `linear-gradient(rgba(2,44,69,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(2,44,69,0.03) 1px, transparent 1px)`, backgroundSize: "64px 64px" }}/>
        
        <div ref={heroRef.ref} style={{ maxWidth: "1280px", margin: "auto", padding: isMobile ? "28px 20px 48px" : "60px 24px 80px", position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: isMobile ? "32px" : "64px", flexWrap: "wrap" }}>
          
          {/* LEFT: Dependent Focused SEO Text */}
          <div style={{ flex: isMobile ? "0 0 100%" : "1 1 500px", width: isMobile ? "100%" : undefined }}>
            
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "rgba(7,203,235,0.1)", border: "1px solid rgba(7,203,235,0.3)",
              borderRadius: "999px", padding: "6px 16px", marginBottom: "24px",
              animation: heroRef.inView ? "fadeSlideUp 0.5s ease 0.1s both" : "none",
            }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#07CBEB", display: "inline-block", animation: "badgePulse 1.6s infinite" }}/>
              <span style={{ fontSize: "12px", fontWeight: 800, color: "#022C45", letterSpacing: "0.4px", textTransform: "uppercase" }}>
                Spouse & Child Dependent Visas
              </span>
            </div>

            <h1 style={{
              fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 900, color: "#022C45", lineHeight: 1.12,
              letterSpacing: "-0.8px", marginBottom: "20px", overflow: "visible", paddingBottom: "14px",
              animation: heroRef.inView ? "fadeSlideUp 0.55s ease 0.2s both" : "none",
            }}>
              Keep Your<br/>
              Family<br/>
              <span style={{
                color: "#07CBEB", position: "relative", display: "inline-block",
                textShadow: "0 2px 16px rgba(7,203,235,0.2)",
              }}>
                Together.
                <svg aria-hidden="true" style={{ position: "absolute", bottom: "-6px", left: 0, width: "100%", overflow: "visible" }} height="6" viewBox="0 0 200 6" preserveAspectRatio="none">
                  <path d="M0,5 Q50,0 100,5 Q150,10 200,5" stroke="#022C45" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>

            <p style={{
              fontSize: "clamp(15px, 1.8vw, 17px)", color: "#4A5568", lineHeight: 1.75,
              marginBottom: "32px", maxWidth: "540px",
              animation: heroRef.inView ? "fadeSlideUp 0.55s ease 0.3s both" : "none",
            }}>
              Don&apos;t let borders separate you from your loved ones. We specialize in complex dependent visa applications, from Canadian Spousal Open Work Permits (SOWP) to US F-2 visas, ensuring flawless documentation for your family&apos;s reunion.
            </p>
            
            <div style={{ animation: heroRef.inView ? "fadeSlideUp 0.55s ease 0.4s both" : "none" }}>
              <Link href="/contact" className="cta-btn" style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                position: "relative", overflow: "hidden", background: "#011929",
                borderRadius: "12px", padding: "0 0 4px 0", textDecoration: "none",
              }}>
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: "10px",
                  padding: "14px 28px", background: "#022C45", borderRadius: "12px",
                  position: "relative", overflow: "hidden",
                }}>
                  <span style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: "45%",
                    background: "linear-gradient(180deg,rgba(255,255,255,0.1),transparent)",
                    borderRadius: "12px 12px 0 0", pointerEvents: "none",
                  }}/>
                  <span style={{
                    fontSize: "14.5px", fontWeight: 800, color: "white",
                    letterSpacing: "0.4px", textTransform: "uppercase", position: "relative", zIndex: 1,
                  }}>Assess Eligibility</span>
                </span>
              </Link>
            </div>
          </div>

          {/* RIGHT: vector — desktop only */}
          {!isMobile && <div style={{ 
            flex: "1 1 450px", position: "relative", minHeight: "450px", 
            display: "flex", justifyContent: "center", alignItems: "center",
            animation: heroRef.inView ? "scaleIn 0.8s cubic-bezier(0.22,1,0.36,1) 0.3s both" : "none",
            opacity: heroRef.inView ? 1 : 0,
          }}>
            {/* Ambient Cyan Glow */}
            <div style={{ position: "absolute", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(7,203,235,0.2), transparent 70%)", borderRadius: "50%", animation: "pulseGlowCyan 4s infinite" }} />
            
            {/* Main Dependent Vector Image */}
            <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: "380px", aspectRatio: "1/1", animation: "floatSlow 8s infinite ease-in-out" }}>
              <Image 
                src="/images/dependent-hero-vector.png" 
                alt="Dependent Visa and Family Immigration"
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </div>

            {/* 4 Floating Glass Vectors for Family Visas */}
            <div style={{ position: "absolute", top: "40px", left: "20px", zIndex: 3, animation: "floatFast 5s infinite" }}>
              <div style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,1)", padding: "10px 16px", borderRadius: "999px", display: "flex", alignItems: "center", gap: "8px", boxShadow: "0 16px 40px rgba(2,44,69,0.08)" }}>
                <span style={{ fontSize: "16px" }}>👨‍👩‍👧</span>
                <span style={{ fontSize: "12px", fontWeight: 800, color: "#022C45" }}>Family Reunion</span>
              </div>
            </div>

            <div style={{ position: "absolute", top: "100px", right: "10px", zIndex: 3, animation: "floatMedium 7s infinite" }}>
              <div style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,1)", padding: "10px 16px", borderRadius: "999px", display: "flex", alignItems: "center", gap: "8px", boxShadow: "0 16px 40px rgba(2,44,69,0.08)" }}>
                <span style={{ fontSize: "16px" }}>🛂</span>
                <span style={{ fontSize: "12px", fontWeight: 800, color: "#022C45" }}>Spouse Visa</span>
              </div>
            </div>

            <div style={{ position: "absolute", bottom: "90px", left: "10px", zIndex: 3, animation: "floatMedium 6s infinite reverse" }}>
              <div style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,1)", padding: "10px 16px", borderRadius: "999px", display: "flex", alignItems: "center", gap: "8px", boxShadow: "0 16px 40px rgba(2,44,69,0.08)" }}>
                <span style={{ fontSize: "16px" }}>💼</span>
                <span style={{ fontSize: "12px", fontWeight: 800, color: "#022C45" }}>Open Work Permit</span>
              </div>
            </div>

            <div style={{ position: "absolute", bottom: "40px", right: "40px", zIndex: 3, animation: "floatFast 8s infinite reverse" }}>
              <div style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,1)", padding: "10px 16px", borderRadius: "999px", display: "flex", alignItems: "center", gap: "8px", boxShadow: "0 16px 40px rgba(2,44,69,0.08)" }}>
                <span style={{ fontSize: "16px" }}>👶</span>
                <span style={{ fontSize: "12px", fontWeight: 800, color: "#022C45" }}>Child Dependent</span>
              </div>
            </div>

          </div>}
        </div>

        {!isMobile && (
          <div style={{ position: "relative", lineHeight: 0, zIndex: 1, marginTop: "20px" }}>
            <svg viewBox="0 0 1440 120" style={{ display: "block", width: "100%", height: "80px" }} preserveAspectRatio="none">
              <path d="M0,0 C480,140 960,140 1440,0 L1440,120 L0,120 Z" fill="#F9FAFB"/>
            </svg>
          </div>
        )}
      </Section>

      {/* ════════════════════════════════════════════════════════
          2. THE VERTICAL ZIG-ZAG ROADMAP (Fully Responsive & Wide)
      ════════════════════════════════════════════════════════ */}
      <Section bg="#F9FAFB" style={{ padding: isMobile ? "40px 0 32px" : "80px 0 60px" }}>
        <div ref={zigzagRef.ref} style={{ maxWidth: "100%", margin: "0 auto" }}>
          
          <div style={{ textAlign: "center", padding: isMobile ? "0 16px" : "0 24px", animation: zigzagRef.inView ? "fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both" : "none", opacity: zigzagRef.inView ? 1 : 0 }}>
            <Eyebrow label="The Process" />
            <Heading line1="Eligibility & Application" line2="Step-by-Step" />
            <p style={{ fontSize: "16px", color: "#6B7280", lineHeight: 1.6, maxWidth: "600px", margin: "20px auto 0" }}>
              We eliminate rejection risks by breaking down complex dependent visa requirements and sponsorship documentation into six manageable steps.
            </p>
          </div>

          <div className="zigzag-container" style={{
            animation: zigzagRef.inView ? "fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.2s both" : "none",
            opacity: zigzagRef.inView ? 1 : 0
          }}>
            <div className="zigzag-line" />
            
            {dependentSteps.map((step, i) => (
              <div key={i} className="zigzag-item">
                
                <div className="zigzag-content">
                  <div style={{ fontSize: "12px", fontWeight: 800, color: "#07CBEB", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "12px" }}>Phase {step.step}</div>
                  <h3 style={{ fontSize: "20px", fontWeight: 900, color: "#022C45", margin: "0 0 12px", lineHeight: 1.2 }}>
                    {step.title}
                  </h3>
                  <p style={{ fontSize: "15px", color: "#6B7280", lineHeight: 1.6, margin: 0 }}>
                    {step.desc}
                  </p>
                </div>
                
                <div className="zigzag-dot">{step.step}</div>
                <div className="zigzag-empty" />

              </div>
            ))}
          </div>

        </div>
      </Section>

      {/* ════════════════════════════════════════════════════════
          3. INTERACTIVE COMMAND CENTER (Tabs System Layout)
      ════════════════════════════════════════════════════════ */}
      <Section bg="#ffffff" style={{ padding: isMobile ? "48px 0 56px" : "100px 0 120px" }}>
        <div ref={tabRef.ref} style={{ maxWidth: "1280px", margin: "0 auto", padding: isMobile ? "0 16px" : "0 24px" }}>
          
          <div style={{ textAlign: "center", marginBottom: "64px", animation: tabRef.inView ? "fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both" : "none", opacity: tabRef.inView ? 1 : 0 }}>
            <Eyebrow label="Global Destinations" />
            <Heading line1="Supported Countries &" line2="Important Requirements" />
            <p style={{ fontSize: "16px", color: "#6B7280", lineHeight: 1.6, maxWidth: "720px", margin: "20px auto 0" }}>
              Every country has unique dependent policies. From proving genuine relationships to validating <br className="hidden md:block" />
              sponsor finances, our legal team ensures your family meets all stringent criteria.
            </p>
          </div>

          <div className="tabs-container" style={{
            animation: tabRef.inView ? "fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.1s both" : "none",
            opacity: tabRef.inView ? 1 : 0
          }}>
            
            {/* Left Side: Navigation Tabs */}
            <div className="tabs-list">
              {detailedServices.map((service, index) => {
                const isActive = activeTab === index;
                return (
                  <button 
                    key={service.id} 
                    className={`tab-btn ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveTab(index)}
                  >
                    <div className="tab-icon-wrap">
                      {/* SAFELY TYPED TO ANY */}
                      {React.cloneElement(service.icon as React.ReactElement<any>, { width: 24, height: 24, strokeWidth: 2 })}
                    </div>
                    <span className="tab-title">{service.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Right Side: Active Content Panel */}
            <div className="tab-content-panel">
              <div key={activeTab} className="tab-fade-enter" style={{ position: "relative", zIndex: 1 }}>
                
                {/* Large Decorative Icon Background - SAFELY TYPED TO ANY */}
                <div style={{ position: "absolute", right: "-40px", top: "-40px", color: activeService.accent, opacity: 0.05, pointerEvents: "none" }}>
                   {React.cloneElement(activeService.icon as React.ReactElement<any>, { width: 300, height: 300, strokeWidth: 1 })}
                </div>

                <div style={{ display: "inline-block", background: `${activeService.accent}15`, color: activeService.accent, fontSize: "12px", fontWeight: 800, padding: "8px 16px", borderRadius: "8px", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "24px" }}>
                  {activeService.tagline}
                </div>
                
                <h3 style={{ fontSize: "clamp(28px, 3vw, 36px)", fontWeight: 900, color: "#022C45", margin: "0 0 20px", letterSpacing: "-0.5px", lineHeight: 1.1 }}>
                  {activeService.title}
                </h3>
                
                <p style={{ fontSize: "17px", color: "#4B5563", lineHeight: 1.7, margin: "0 0 40px", maxWidth: "600px" }}>
                  {activeService.desc}
                </p>

                <div>
                  <div style={{ fontSize: "13px", fontWeight: 800, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "16px" }}>Key Benefits & Features</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {activeService.benefits.map((benefit, bIndex) => (
                      <div key={bIndex} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        {/* CSS syntax properly formatted in React style object */}
                        <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#ffffff", boxShadow: "0 4px 12px rgba(2,44,69,0.05)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={activeService.accent} strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                        </div>
                        <span style={{ fontSize: "16px", fontWeight: 600, color: "#111827" }}>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </Section>

      {/* ════════════════════════════════════════════════════════
          4. BOTTOM CTA BANNER 
      ════════════════════════════════════════════════════════ */}
      <Section bg="#f4fbfc" style={{ padding: isMobile ? "48px 0" : "100px 0" }}>
        <div ref={ctaRef.ref} style={{ maxWidth: "1000px", margin: "0 auto", padding: isMobile ? "0 16px" : "0 24px" }}>
          
          <div style={{
            background: "linear-gradient(135deg, #022C45 0%, #054f77 100%)",
            borderRadius: "24px", padding: isMobile ? "32px 20px" : "56px 64px",
            display: "flex", alignItems: "center", justifyContent: "space-between", gap: "40px", flexWrap: "wrap",
            position: "relative", overflow: "hidden",
            boxShadow: "0 24px 48px rgba(7,203,235,0.15)",
            animation: ctaRef.inView ? "scaleIn 0.6s cubic-bezier(0.22,1,0.36,1) both" : "none", opacity: ctaRef.inView ? 1 : 0
          }}>
            <div style={{ position: "absolute", right: "-80px", top: "-80px", width: "320px", height: "320px", borderRadius: "50%", background: "radial-gradient(circle, rgba(7,203,235,0.2) 0%, transparent 70%)", pointerEvents: "none" }}/>
            <div style={{ position: "absolute", left: "-80px", bottom: "-80px", width: "240px", height: "240px", borderRadius: "50%", background: "radial-gradient(circle, rgba(7,203,235,0.1) 0%, transparent 70%)", pointerEvents: "none" }}/>

            <div style={{ position: "relative", zIndex: 1, flex: "1 1 400px" }}>
              <div style={{ display: "inline-block", background: "rgba(7,203,235,0.2)", color: "#8ce7f7", fontSize: "11px", fontWeight: 800, padding: "6px 12px", borderRadius: "6px", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "1px" }}>
                Confidential Visa Assessment
              </div>
              <h2 style={{ fontSize: "clamp(28px, 3.5vw, 36px)", fontWeight: 900, color: "white", letterSpacing: "-0.5px", margin: "0 0 16px" }}>
                Ready to Reunite Your Family?
              </h2>
              <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.7)", margin: 0, lineHeight: 1.6, maxWidth: "480px" }}>
                Connect with our certified dependent visa experts today to review your sponsorship eligibility and document checklist.
              </p>
            </div>

            <Link href="/contact" className="cta-btn" style={{
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