"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// ── useInView ─────────────────────────────────────────────────
function useInView(threshold = 0.12) {
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

// ── Data: Quick Facts ─────────────────────────────────────────
const quickFacts = [
  { icon: "🏛️", label: "Capital", value: "Warsaw" },
  { icon: "💵", label: "Currency", value: "PLN (Polish Złoty)" },
  { icon: "🗣️", label: "Language", value: "Polish & English" },
  { icon: "❄️", label: "Weather", value: "Continental (Cold Winters, Warm Summers)" },
  { icon: "🎓", label: "Top Intakes", value: "October (Main) & February" },
];

// ── Data: Section Navigation ──────────────────────────────────
const tabsData = [
  { id: "overview", icon: "🌍", label: "Why Poland?" },
  { id: "institutions", icon: "🏛️", label: "Top Universities" },
  { id: "courses", icon: "🎯", label: "MBBS & Tech Courses" },
  { id: "admissions", icon: "📝", label: "Visa Process" },
  { id: "documents", icon: "📂", label: "Documents" },
  { id: "careers", icon: "💼", label: "TRC & Work Rights" },
  { id: "faqs", icon: "❓", label: "FAQs" }
];

// ── Data: Other Destinations (Swipe Track) ────────────────────
const otherDestinations = [
  { id: "germany", name: "Germany", flag: "/images/flags/de.png" },
  { id: "latvia", name: "Latvia", flag: "/images/flags/lv.png" },
  { id: "lithuania", name: "Lithuania", flag: "/images/flags/lt.png" },
  { id: "ireland", name: "Ireland", flag: "/images/flags/ie.png" }
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
function Eyebrow({ label, isLight = false }: { label: string, isLight?: boolean }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "9px", marginBottom: "16px" }}>
      <div style={{ width: "30px", height: "2px", borderRadius: "1px", background: "linear-gradient(90deg, #F16101, #C9A24D)" }}/>
      <span style={{
        fontSize: "11px", fontWeight: 800, letterSpacing: "2.5px", textTransform: "uppercase",
        background: isLight ? "linear-gradient(90deg, #F16101, #C9A24D)" : "linear-gradient(90deg, #F16101, #C9A24D)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
      }}>{label}</span>
    </div>
  );
}

// ── Heading ───────────────────────────────────────────────────
function Heading({ line1, line2, color = "#022C45" }: { line1: string; line2: string; color?: string }) {
  return (
    <h2 style={{ fontSize: "clamp(32px, 4vw, 44px)", fontWeight: 900, color, lineHeight: 1.1, letterSpacing: "-0.8px", margin: "0 0 16px" }}>
      {line1}<br/>
      <span style={{ position: "relative", display: "inline-block", background: "linear-gradient(100deg, #F16101 0%, #C9A24D 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
        {line2}
        <svg style={{ position: "absolute", bottom: "-6px", left: 0, width: "100%" }} height="5" viewBox="0 0 300 5" preserveAspectRatio="none">
          <defs><linearGradient id="ulineAbout" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#F16101"/><stop offset="100%" stopColor="#C9A24D"/></linearGradient></defs>
          <path d="M0,3 Q75,0 150,3 Q225,7 300,3" stroke="url(#ulineAbout)" strokeWidth="3" fill="none" strokeLinecap="round"/>
        </svg>
      </span>
    </h2>
  );
}

// ═══════════════════════════════════════════════════════════════
//  POLAND MASTER PAGE
// ═══════════════════════════════════════════════════════════════
export default function CountryPolandPage() {
  useEffect(() => { document.title = "Study in Poland 2026 — Residence Permit, Universities & Costs | Edification Overseas"; }, []);

  const heroRef = useInView(0.1);
  const contentRef = useInView(0.05);

  const [activeTab, setActiveTab] = useState("overview");

  // Smooth Scroll Logic
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll-Spy Observer
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; 
      let currentSection = tabsData[0].id;
      for (const tab of tabsData) {
        const section = document.getElementById(tab.id);
        if (section && section.offsetTop <= scrollPosition) {
          currentSection = tab.id;
        }
      }
      setActiveTab(currentSection);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main style={{ background: "#ffffff", overflowX: "hidden" }}>

      <style>{`
        /* Entrance Animations */
        @keyframes fadeUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeLeft { from { opacity: 0; transform: translateX(-40px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fadeRight { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.85); } to { opacity: 1; transform: scale(1); } }
        @keyframes float1 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
        @keyframes float2 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(12px); } }
        @keyframes glowPulse { 0%, 100% { filter: blur(40px) brightness(1); } 50% { filter: blur(60px) brightness(1.3); } }

        /* Quick Facts Bar */
        .qf-bar { background: #ffffff; border-radius: 20px; padding: 24px 32px; box-shadow: 0 12px 32px rgba(2,44,69,0.04); border: 1px solid rgba(2,44,69,0.05); display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap: wrap; margin-top: -40px; position: relative; z-index: 10; }
        .qf-item { display: flex; align-items: center; gap: 12px; }

        /* Main Content Container */
        .content-container { padding: 56px 0 100px; width: 100%; }

        /* Sticky Tabs Wrapper */
        .tabs-sticky-wrapper { position: sticky; top: 60px; z-index: 20; padding: 20px 0; background: #ffffff; box-sizing: border-box; max-width: 100%; overflow: hidden; }

        /* Tabs Container */
        .tabs-container { background: #ffffff; border-radius: 16px; padding: 12px 16px; border: 1px solid rgba(2,44,69,0.08); box-shadow: 0 12px 24px rgba(2,44,69,0.04); display: flex; gap: 16px; align-items: center; justify-content: space-between; flex-wrap: wrap; box-sizing: border-box; max-width: 100%; }
        .tabs-nav { display: flex; gap: 8px; flex-wrap: wrap; flex: 1; align-items: center; }
        .tab-btn { padding: 10px 14px; border-radius: 10px; font-size: 13.5px; font-weight: 700; background: #f4fbfc; color: #4B5563; border: 1px solid rgba(7,203,235,0.1); cursor: pointer; white-space: nowrap; transition: all 0.2s ease; flex-shrink: 0; display: flex; align-items: center; gap: 6px; }
        .tab-btn:hover { color: #022C45; background: #e0f7fa; border-color: rgba(7,203,235,0.3); }
        .tab-btn.active { background: #022C45; color: #ffffff; border-color: #022C45; }

        .tabs-cta-btn { background: #F16101; color: #ffffff; padding: 12px 20px; border-radius: 10px; font-size: 13px; font-weight: 800; text-transform: uppercase; text-decoration: none; white-space: nowrap; box-shadow: 0 4px 12px rgba(241,97,1,0.2); transition: all 0.3s; flex-shrink: 0; display: inline-flex; align-items: center; gap: 8px; }
        .tabs-cta-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(241,97,1,0.3); background: #d95701; }

        /* Standardized Scrollable Content Sections */
        .scroll-section { scroll-margin-top: 180px; background: #ffffff; border-radius: 20px; padding: 48px; border: 1px solid rgba(2,44,69,0.06); box-shadow: 0 12px 32px rgba(2,44,69,0.02); margin-bottom: 24px; }
        .scroll-section:last-child { margin-bottom: 0; }

        /* Typography */
        .scroll-section h2 { font-size: 28px; font-weight: 900; color: #022C45; margin: 0 0 20px; letter-spacing: -0.5px; line-height: 1.2; }
        .scroll-section h3 { font-size: 20px; font-weight: 800; color: #022C45; margin: 32px 0 20px; padding-bottom: 6px; border-bottom: 2px solid rgba(7,203,235,0.2); display: inline-block; }
        .scroll-section p { font-size: 15.5px; color: #4B5563; line-height: 1.8; margin: 0 0 20px; }
        .scroll-section strong { color: #022C45; font-weight: 800; }

        /* ── VISUAL COMPONENTS ── */
        .info-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin: 24px 0; }
        .info-card { background: #fcfdfd; border: 1px solid rgba(2,44,69,0.06); border-radius: 16px; padding: 24px; transition: transform 0.3s; }
        .info-card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(7,203,235,0.08); border-color: rgba(7,203,235,0.3); }
        .info-card h4 { font-size: 16px; font-weight: 800; color: #022C45; margin: 0 0 8px; display: flex; align-items: center; gap: 8px; }
        .info-card p { font-size: 14.5px; margin: 0; line-height: 1.6; }

        .stat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin: 24px 0; }
        .stat-card { background: #f4fbfc; border: 1px solid rgba(7,203,235,0.2); border-radius: 16px; padding: 24px 16px; text-align: center; }
        .stat-value { font-size: 22px; font-weight: 900; color: #022C45; margin-bottom: 6px; }
        .stat-label { font-size: 12px; font-weight: 800; color: #F16101; text-transform: uppercase; letter-spacing: 0.5px; line-height: 1.4; }

        .timeline { display: flex; flex-direction: column; gap: 16px; margin: 24px 0; }
        .timeline-step { display: flex; gap: 16px; background: #ffffff; border: 1px solid rgba(2,44,69,0.06); padding: 20px; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.02); align-items: center; }
        .step-num { width: 36px; height: 36px; background: #022C45; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 16px; flex-shrink: 0; }
        .step-content { font-size: 15.5px; color: #4B5563; }
        .step-content strong { color: #022C45; }

        .course-tags { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 16px; margin-bottom: 24px; }
        .course-tag { background: #fff5ee; color: #F16101; padding: 8px 16px; border-radius: 8px; font-size: 14px; font-weight: 700; border: 1px solid rgba(241,97,1,0.15); display: inline-flex; align-items: center; gap: 6px; }
        .course-tag-blue { background: #f4fbfc; color: #07CBEB; padding: 8px 16px; border-radius: 8px; font-size: 14px; font-weight: 700; border: 1px solid rgba(7,203,235,0.2); display: inline-flex; align-items: center; gap: 6px; }

        .content-highlight { background: #f4fbfc; border-left: 4px solid #07CBEB; padding: 20px; border-radius: 0 12px 12px 0; margin: 24px 0; }
        .content-highlight p { margin: 0; color: #022C45; font-weight: 700; font-size: 15px; }

        .faq-card { border: 1px solid rgba(2,44,69,0.08); border-radius: 16px; padding: 24px; margin-bottom: 16px; }
        .faq-card h4 { font-size: 16.5px; font-weight: 800; color: #022C45; margin: 0 0 12px; }
        .faq-card p { margin: 0; font-size: 15px; }

        .doc-list { padding-left: 0; margin: 0 0 24px; list-style: none; display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
        .doc-list li { background: #ffffff; border: 1px solid rgba(2,44,69,0.06); padding: 12px 16px 12px 36px; border-radius: 8px; position: relative; font-size: 14.5px; color: #4B5563; }
        .doc-list li::before { content: "✓"; position: absolute; left: 14px; top: 12px; color: #F16101; font-weight: 900; font-size: 14px; }

        /* Exploring Section Track */
        .explore-track { display: flex; gap: 20px; flex-wrap: wrap; justify-content: center; margin-top: 32px; }
        .explore-card { flex: 1 1 200px; max-width: 250px; background: #ffffff; border-radius: 16px; padding: 20px; border: 1px solid rgba(2,44,69,0.06); display: flex; align-items: center; gap: 16px; text-decoration: none; transition: all 0.3s; box-shadow: 0 8px 24px rgba(2,44,69,0.03); }
        .explore-card:hover { transform: translateY(-4px); box-shadow: 0 16px 32px rgba(7,203,235,0.1); border-color: #07CBEB; }
        
        .explore-all-btn { flex: 1 1 200px; max-width: 250px; background: linear-gradient(135deg, #022C45 0%, #054f77 100%); border-radius: 16px; padding: 20px; text-decoration: none; transition: all 0.3s; display: flex; align-items: center; justify-content: center; gap: 10px; color: #ffffff; box-shadow: 0 12px 24px rgba(2,44,69,0.15); }
        .explore-all-btn:hover { transform: translateY(-4px); box-shadow: 0 16px 32px rgba(2,44,69,0.25); background: linear-gradient(135deg, #054f77 0%, #022C45 100%); }

        @media (max-width: 1024px) {
          .qf-bar { flex-wrap: wrap; justify-content: flex-start; }
          .qf-item { width: calc(50% - 12px); }
          .stat-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          /* Hero */
          .hero-right-col { display: none !important; }
          .hero-left-col { flex: 0 0 100% !important; width: 100% !important; }
          .hero-inner { padding: 24px 20px 40px !important; gap: 0 !important; }
          /* Tabs */
          .tabs-sticky-wrapper { padding: 10px 16px; }
          .tabs-container {
            flex-direction: column; align-items: stretch;
            gap: 10px; padding: 10px; border-radius: 12px;
            overflow: hidden;
          }
          .tabs-nav {
            display: flex; flex-wrap: nowrap !important;
            overflow-x: auto; -webkit-overflow-scrolling: touch;
            scrollbar-width: none; padding-bottom: 4px;
            gap: 6px; width: 100%;
            /* prevent nav from stretching container wider than screen */
            min-width: 0; max-width: 100%;
          }
          .tabs-nav::-webkit-scrollbar { display: none; }
          .tab-btn {
            flex-shrink: 0; padding: 8px 10px;
            font-size: 12px; border-radius: 8px;
          }
          .tabs-cta-btn {
            width: 100%; justify-content: center;
            padding: 11px 16px; font-size: 12px;
            box-sizing: border-box;
          }
          /* Content sections */
          .scroll-section { padding: 24px 16px; scroll-margin-top: 160px; }
          .content-container { padding: 32px 0 64px; }
          .tabs-sticky-wrapper { top: 56px; padding: 12px 0; }
          /* Quick facts */
          .qf-bar { padding: 16px; gap: 12px; }
          .qf-item { width: 100%; }
          /* Grids */
          .info-grid, .doc-list { grid-template-columns: 1fr; }
          .stat-grid { grid-template-columns: repeat(2, 1fr); }
          /* Explore track */
          .explore-track { flex-direction: column; align-items: stretch; }
          .explore-card, .explore-all-btn { max-width: 100%; }
        }
        @media (max-width: 400px) {
          .stat-grid { grid-template-columns: 1fr; }
        }

        /* Button Hover */
        .btn-outline { transition: all 0.3s cubic-bezier(0.22,1,0.36,1); }
        .btn-outline:hover { background: rgba(2,44,69,0.04) !important; border-color: rgba(2,44,69,0.3) !important; transform: translateY(-3px); box-shadow: 0 8px 16px rgba(2,44,69,0.06); }
        .cta-btn { transition: transform 0.18s cubic-bezier(0.4,0,0.2,1); }
        .cta-btn:hover { transform: translateY(-2px); }
      `}</style>

      {/* ════════════════════════════════════════════════════════
          1. PREMIUM HERO (Dark Mode + Monument)
      ════════════════════════════════════════════════════════ */}
      <Section bg="#011624" style={{ padding: "0", minHeight: "auto", display: "flex", alignItems: "center", paddingTop: "40px" }}>
        <div style={{ position: "absolute", top: "20%", left: "-10%", width: "50vw", height: "50vw", background: "radial-gradient(circle, rgba(7,203,235,0.05) 0%, transparent 60%)", pointerEvents: "none" }}/>
        
        <div ref={heroRef.ref} className="hero-inner" style={{ maxWidth: "1280px", width: "100%", margin: "0 auto", padding: "20px 24px 60px", position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: "40px", flexWrap: "wrap" }}>
          
          {/* LEFT: SEO Text */}
          <div className="hero-left-col" style={{ flex: "1 1 550px" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "999px", padding: "6px 16px", marginBottom: "24px",
              animation: heroRef.inView ? "fadeSlideUp 0.5s ease 0.1s both" : "none",
            }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#07CBEB", display: "inline-block", boxShadow: "0 0 10px #07CBEB" }}/>
              <span style={{ fontSize: "12px", fontWeight: 800, color: "rgba(255,255,255,0.9)", letterSpacing: "0.4px", textTransform: "uppercase" }}>
                The Heart of Europe
              </span>
            </div>

            <h1 style={{
              fontSize: "clamp(40px, 5vw, 64px)", fontWeight: 900, color: "#ffffff", lineHeight: 1.1,
              letterSpacing: "-1px", marginBottom: "24px",
              animation: heroRef.inView ? "fadeSlideUp 0.55s ease 0.2s both" : "none",
            }}>
              Study in <br/>
              <span style={{ color: "#07CBEB", position: "relative", display: "inline-block" }}>
                Poland
                <svg aria-hidden="true" style={{ position: "absolute", bottom: "-14px", left: "-2%", width: "104%", overflow: "visible" }} height="8" viewBox="0 0 200 8" preserveAspectRatio="none">
                  <path d="M0,5 Q50,0 100,5 Q150,10 200,5" stroke="#07CBEB" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>

            <p style={{
              fontSize: "clamp(15px, 1.8vw, 17px)", color: "#ffffff", lineHeight: 1.7,
              marginBottom: "40px", maxWidth: "540px",
              animation: heroRef.inView ? "fadeSlideUp 0.55s ease 0.3s both" : "none",
            }}>
              Experience world-class academics with incredibly low living costs. A <strong>Poland Student Visa</strong> offers Indian students premier English-taught degrees, highly esteemed <strong>NMC-approved MBBS programs</strong>, full <strong>Schengen Area</strong> access, and post-study work opportunities via the TRC.
            </p>
          </div>

          {/* RIGHT: Floating Monument, Badges & Circular Flag */}
          <div style={{ 
            flex: "1 1 450px", position: "relative", minHeight: "450px", 
            animation: heroRef.inView ? "scaleIn 0.8s cubic-bezier(0.22,1,0.36,1) 0.3s both" : "none",
            display: "flex", justifyContent: "center", alignItems: "center"
          }} className="hero-right-col">
            <div style={{ position: "absolute", width: "350px", height: "350px", background: "rgba(7,203,235,0.12)", borderRadius: "50%", animation: "glowPulse 4s infinite" }} />
            
            {/* CLEAN Monument Image Holder */}
            <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: "420px", aspectRatio: "1/1", animation: "float1 6s infinite ease-in-out" }}>
              <Image 
                src="/images/monuments/poland.png" 
                alt="Poland Monument Warsaw" 
                fill 
                style={{ objectFit: "contain" }} 
                priority
              />
            </div>

            {/* Floating Circular Country Flag */}
            <div style={{ position: "absolute", top: "10%", right: "10%", width: "90px", height: "90px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.2)", zIndex: 9, animation: "float2 7s infinite reverse", overflow: "hidden", boxShadow: "0 16px 40px rgba(0,0,0,0.3)" }}>
               <Image src="/images/flags/pl.png" alt="Poland Flag" fill style={{ objectFit: "cover" }} />
            </div>

            {/* Floating Glass Badges */}
            <div style={{ position: "absolute", top: "40px", left: "0px", zIndex: 3, animation: "float2 5s infinite" }}>
              <div style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.2)", padding: "12px 20px", borderRadius: "16px", display: "flex", alignItems: "center", gap: "10px", boxShadow: "0 16px 40px rgba(0,0,0,0.2)" }}>
                <span style={{ fontSize: "20px" }}>🌍</span>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "10px", color: "#07CBEB", textTransform: "uppercase", fontWeight: 800 }}>European Union</span>
                  <span style={{ fontSize: "14px", fontWeight: 800, color: "#ffffff" }}>Schengen Country</span>
                </div>
              </div>
            </div>

            <div style={{ position: "absolute", bottom: "60px", right: "0px", zIndex: 3, animation: "float1 7s infinite reverse" }}>
              <div style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.2)", padding: "12px 20px", borderRadius: "16px", display: "flex", alignItems: "center", gap: "10px", boxShadow: "0 16px 40px rgba(0,0,0,0.2)" }}>
                <span style={{ fontSize: "20px" }}>💶</span>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "10px", color: "#07CBEB", textTransform: "uppercase", fontWeight: 800 }}>Living Cost</span>
                  <span style={{ fontSize: "14px", fontWeight: 800, color: "#ffffff" }}>Highly Affordable</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </Section>

      {/* ════════════════════════════════════════════════════════
          2. QUICK FACTS BAR
      ════════════════════════════════════════════════════════ */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
        <div className="qf-bar">
          {quickFacts.map((fact, i) => (
            <div key={i} className="qf-item">
              <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "rgba(7,203,235,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", flexShrink: 0 }}>
                {fact.icon}
              </div>
              <div>
                <div style={{ fontSize: "11px", fontWeight: 900, color: "#F16101", textTransform: "uppercase", letterSpacing: "1px" }}>{fact.label}</div>
                <div style={{ fontSize: "15px", fontWeight: 800, color: "#022C45" }}>{fact.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════
          3. MAIN CONTENT CONTAINER (Scroll-Spy Layout)
      ════════════════════════════════════════════════════════ */}
      <div ref={contentRef.ref} style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", boxSizing: "border-box", overflow: "hidden" }}>
        <div className="content-container">
          
          {/* THE MASTER HEADING */}
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 900, color: "#022C45", margin: 0, letterSpacing: "-0.5px" }}>
              Your Complete Guide to Education in Poland
            </h2>
          </div>

          {/* Sticky Tab Navigation ("Table of Contents") + Right Button */}
          <div className="tabs-sticky-wrapper">
            <div className="tabs-container">
              <div className="tabs-nav">
                {tabsData.map(tab => (
                  <button 
                    key={tab.id}
                    className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`} 
                    onClick={() => scrollToSection(tab.id)}
                  >
                    <span>{tab.icon}</span> {tab.label}
                  </button>
                ))}
              </div>
              
              <Link href="/contact" className="tabs-cta-btn">
                Check Eligibility →
              </Link>
            </div>
          </div>

          {/* SEQUENTIAL SCROLLING SECTIONS (Full Width) */}
          <div style={{ minWidth: 0 }}>
            
            {/* CHAPTER 1: OVERVIEW */}
            <div id="overview" className="scroll-section">
              <h2>Why Study in Poland? The Budget-Friendly Gateway to Europe</h2>
              <p>Poland has emerged as one of the most attractive destinations in Europe for Indian students. Known for its strong economy, rapidly growing tech sector, and rich academic history, a <strong>Polish Student Visa (National D-Visa)</strong> grants you access to top-tier, English-taught education at a fraction of the cost of studying in the UK or Western Europe.</p>
              
              <h3>Key Advantages of Education in Poland</h3>
              <div className="info-grid">
                <div className="info-card">
                  <h4>🌍 Full Schengen Access</h4>
                  <p>As a member of the EU and Schengen zone, your Polish TRC allows you to travel freely to 27 European countries for tourism and networking.</p>
                </div>
                <div className="info-card">
                  <h4>💰 Extremely Low Living Costs</h4>
                  <p>Compared to other European nations, daily expenses, rent, and public transport in Poland are highly affordable for Indian students.</p>
                </div>
                <div className="info-card">
                  <h4>🚫 Flexible English Rules</h4>
                  <p>Many Polish universities accept Indian students without strict IELTS requirements, often accepting a Medium of Instruction (MOI) letter or an internal Skype interview.</p>
                </div>
                <div className="info-card">
                  <h4>💼 Post-Study Work Opportunities</h4>
                  <p>Graduates from full-time programs in Poland are exempt from needing a work permit and can easily apply for a 9-month TRC extension to search for employment.</p>
                </div>
              </div>
            </div>

            {/* CHAPTER 2: ACADEMICS & COST */}
            <div id="institutions" className="scroll-section">
              <h2>Top Universities & Cost of Living</h2>
              <p>Poland boasts an incredible mix of world-renowned Public Universities and highly focused Private Institutions, catering heavily to Medicine, Engineering, and Business students.</p>
              
              <h3>Top Public Universities (General & Tech)</h3>
              <p>These historic institutions are globally ranked and feature excellent English-taught programs:</p>
              <div className="course-tags">
                <span className="course-tag-blue">🏛️ University of Warsaw</span>
                <span className="course-tag-blue">🏛️ Jagiellonian University</span>
                <span className="course-tag-blue">🏛️ Warsaw University of Technology</span>
                <span className="course-tag-blue">🏛️ Poznan University of Technology</span>
                <span className="course-tag-blue">🏛️ AGH University of Science and Technology</span>
              </div>

              <h3>Top Medical Universities (NMC Approved)</h3>
              <p>Highly sought after by Indian students for their rigorous, English-medium MBBS programs:</p>
              <div className="course-tags">
                <span className="course-tag">🏥 Medical University of Warsaw</span>
                <span className="course-tag">🏥 Wroclaw Medical University</span>
                <span className="course-tag">🏥 Medical University of Lodz</span>
                <span className="course-tag">🏥 Medical University of Gdansk</span>
              </div>

              <h3>Top Private Business Universities</h3>
              <div className="course-tags">
                <span className="course-tag">🏫 Vistula University</span>
                <span className="course-tag">🏫 Kozminski University</span>
                <span className="course-tag">🏫 SWPS University</span>
              </div>
              
              <h3>Estimated Financial Requirements</h3>
              <p>While the currency is the Polish Złoty (PLN), tuition fees for international students are generally quoted and paid in Euros (€).</p>
              
              <div className="stat-grid">
                <div className="stat-card">
                  <div className="stat-value">€ 2k - € 4k</div>
                  <div className="stat-label">Avg. Tuition / Year<br/>(Bachelors / Business)</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">€ 3k - € 5k</div>
                  <div className="stat-label">Avg. Tuition / Year<br/>(Masters / Engineering)</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">€ 10k - € 15k</div>
                  <div className="stat-label">Avg. Tuition / Year<br/>(MBBS Medical Degree)</div>
                </div>
                <div className="stat-card" style={{ background: "#fff5ee", borderColor: "rgba(241,97,1,0.3)" }}>
                  <div className="stat-value" style={{ color: "#F16101" }}>€ 300 - € 500</div>
                  <div className="stat-label">Avg. Monthly<br/>Living Cost</div>
                </div>
              </div>
            </div>

            {/* CHAPTER 3: COURSES */}
            <div id="courses" className="scroll-section">
              <h2>High-Demand Courses in Poland</h2>
              <p>Choosing the right course is crucial for securing post-study employment. Poland excels globally in Medical sciences, Engineering, and Information Technology.</p>
              
              <h3>Medicine & Healthcare (MBBS)</h3>
              <p>Poland is a premier destination for Indian medical aspirants, offering 6-year English-taught degrees recognized by the NMC (India), WHO, and across the EU.</p>
              <div className="course-tags">
                <span className="course-tag">🩺 General Medicine (MD/MBBS)</span>
                <span className="course-tag">🦷 Dentistry</span>
                <span className="course-tag">💊 Pharmacy</span>
              </div>

              <h3>Engineering & Information Technology</h3>
              <p>Poland is home to major European tech hubs. Graduates from Technical Universities are in exceptionally high demand.</p>
              <div className="course-tags">
                <span className="course-tag">💻 Computer Science & IT</span>
                <span className="course-tag">⚙️ Mechanical Engineering</span>
                <span className="course-tag">🤖 Mechatronics & Robotics</span>
              </div>

              <h3>Business & Management</h3>
              <div className="course-tags">
                <span className="course-tag">📈 Master of Business Administration (MBA)</span>
                <span className="course-tag">📊 International Business Management</span>
                <span className="course-tag">📦 Supply Chain & Logistics</span>
              </div>
            </div>

            {/* CHAPTER 4: ADMISSIONS & VISAS */}
            <div id="admissions" className="scroll-section">
              <h2>Navigating the Poland Visa Process</h2>
              <p>Indian students must apply for a <strong>National D-Type Visa</strong> for long-term studies. The process is straightforward but requires precise financial documentation and an embassy appointment.</p>
              
              <h3>The Step-by-Step Visa Process</h3>
              <div className="timeline">
                <div className="timeline-step">
                  <div className="step-num">1</div>
                  <div className="step-content"><strong>University Admission:</strong> Submit your academic transcripts, passport, and English proficiency proof to secure your unconditional Offer Letter.</div>
                </div>
                <div className="timeline-step">
                  <div className="step-num">2</div>
                  <div className="step-content"><strong>Pay Tuition Fees:</strong> Pay your first-year tuition fee (or first semester, depending on the university) to receive your Final Acceptance Letter and Visa Support Letter.</div>
                </div>
                <div className="timeline-step">
                  <div className="step-num">3</div>
                  <div className="step-content"><strong>Prepare Financials & Insurance:</strong> Arrange your living expense proofs (bank statements or sponsor letters) and purchase mandatory travel/medical insurance.</div>
                </div>
                <div className="timeline-step">
                  <div className="step-num">4</div>
                  <div className="step-content"><strong>VFS Embassy Submission:</strong> Book a National D-Visa appointment via VFS Global in India. Submit your complete Apostilled file and attend a short visa interview if required.</div>
                </div>
                <div className="timeline-step">
                  <div className="step-num">5</div>
                  <div className="step-content"><strong>Arrival & TRC:</strong> Travel to Poland. During your first semester, you will apply for your Temporary Residence Card (TRC) (Karta Pobytu) to formalize your legal stay in the EU.</div>
                </div>
              </div>
            </div>

            {/* CHAPTER 5: DOCUMENTS */}
            <div id="documents" className="scroll-section">
              <h2>Official Document Checklist</h2>
              <p>The Polish Embassy strictly reviews documents for authenticity. Your educational documents must be legalized in India.</p>
              
              <h3>Required Admission & Visa Documents</h3>
              <ul className="doc-list">
                <li>Valid Passport (Front & Back scanned)</li>
                <li>All Academic Transcripts & Degrees (<strong>Apostilled by MEA</strong>)</li>
                <li>Official Acceptance Letter from a Polish University</li>
                <li>Proof of Tuition Fee Payment</li>
                <li>Valid IELTS/PTE Score OR Medium of Instruction (MOI) Letter</li>
                <li>Proof of Financial Means (Bank statements covering living costs and return flight)</li>
                <li>Proof of Accommodation in Poland (Hostel or Private Rent agreement)</li>
                <li>Comprehensive Travel & Health Insurance (Covering at least €30,000)</li>
              </ul>
            </div>

            {/* CHAPTER 6: CAREERS */}
            <div id="careers" className="scroll-section">
              <h2>Work Rights and Career Opportunities</h2>
              <p>Poland offers an incredibly welcoming environment for international graduates, providing clear pathways to integrate into the European labor market.</p>
              
              <h3>Part-Time Work During Studies</h3>
              <p>International students enrolled in a full-time university program in Poland are legally permitted to work part-time (up to <strong>20 hours per week</strong>) during the academic year, and full-time during holidays, <strong>without needing a separate work permit</strong>.</p>

              <div className="content-highlight">
                <p><strong>Post-Study TRC (Job Seeker Visa):</strong> Upon successful graduation from a full-time program at a Polish university, you are completely exempt from work permit requirements. You can apply to extend your Temporary Residence Card (TRC) for up to <strong>9 months</strong> specifically to search for employment or start a business. Once you secure a job, you transition to a standard European Work/Residence Permit.</p>
              </div>
            </div>

            {/* CHAPTER 7: FAQS */}
            <div id="faqs" className="scroll-section">
              <h2>Frequently Asked Questions (FAQs)</h2>
              
              <div className="faq-card">
                <h4>Is the MBBS degree from Poland valid in India?</h4>
                <p>Yes. Medical degrees from recognized Polish state universities are fully recognized by the National Medical Commission (NMC) of India. Indian students simply need to pass the FMGE/NEXT exam upon returning to practice in India.</p>
              </div>
              
              <div className="faq-card">
                <h4>Can I study in Poland without IELTS?</h4>
                <p>Yes. Many Polish universities (especially private ones like Vistula University) will accept Indian students without IELTS if they provide a Medium of Instruction (MOI) letter proving their previous education was in English, often followed by a short Skype interview.</p>
              </div>

              <div className="faq-card">
                <h4>Can I travel to Germany or France with a Polish student visa?</h4>
                <p>Absolutely. Poland is part of the Schengen Agreement. Your Polish National D-Visa and subsequent Temporary Residence Card (TRC) allow you to travel freely across 27 European countries for tourism and networking.</p>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* ════════════════════════════════════════════════════════
          4. EXPLORE OTHER DESTINATIONS (Warm, Premium Footer)
      ════════════════════════════════════════════════════════ */}
      <Section bg="linear-gradient(180deg, #F9FAFB 0%, #ffffff 100%)" style={{ padding: "80px 0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
          
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <h3 style={{ fontSize: "28px", fontWeight: 900, color: "#022C45", margin: "0 0 12px", letterSpacing: "-0.5px" }}>
              Still Exploring Your Options?
            </h3>
            <p style={{ fontSize: "16px", color: "#4B5563", margin: 0, maxWidth: "600px", marginInline: "auto", lineHeight: 1.6 }}>
              Every country offers unique opportunities. Compare Poland with other top global study destinations to find your perfect fit.
            </p>
          </div>
          
          <div className="explore-track">
            {otherDestinations.map((dest) => (
              <Link href={`/countries/${dest.id}`} key={dest.id} className="explore-card">
                <div style={{ width: "48px", height: "48px", borderRadius: "50%", position: "relative", overflow: "hidden", flexShrink: 0, border: "2px solid #f4fbfc", boxShadow: "0 4px 12px rgba(2,44,69,0.08)" }}>
                  <Image src={dest.flag} alt={dest.name} fill style={{ objectFit: "cover" }} />
                </div>
                <div style={{ fontSize: "16px", fontWeight: 800, color: "#022C45" }}>{dest.name}</div>
              </Link>
            ))}
            
            {/* The 5th Action Item: Explore All */}
            <Link href="/countries" className="explore-all-btn">
              <span style={{ fontSize: "15px", fontWeight: 800 }}>Explore All 30+ Destinations</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </Link>
          </div>

        </div>
      </Section>

      {/* ════════════════════════════════════════════════════════
          5. BOTTOM CTA BANNER 
      ════════════════════════════════════════════════════════ */}
      <Section bg="#ffffff" style={{ padding: "60px 0 100px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{
            background: "linear-gradient(135deg, #022C45 0%, #054f77 100%)",
            borderRadius: "24px", padding: "56px 64px",
            display: "flex", alignItems: "center", justifyContent: "space-between", gap: "40px", flexWrap: "wrap",
            position: "relative", overflow: "hidden",
            boxShadow: "0 24px 48px rgba(7,203,235,0.15)"
          }}>
            <div style={{ position: "absolute", right: "-80px", top: "-80px", width: "320px", height: "320px", borderRadius: "50%", background: "radial-gradient(circle, rgba(7,203,235,0.2) 0%, transparent 70%)", pointerEvents: "none" }}/>
            
            <div style={{ position: "relative", zIndex: 1, flex: "1 1 400px" }}>
              <h2 style={{ fontSize: "clamp(28px, 3.5vw, 36px)", fontWeight: 900, color: "white", letterSpacing: "-0.5px", margin: "0 0 16px" }}>
                Ready to Apply to Poland?
              </h2>
              <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.7)", margin: 0, lineHeight: 1.6, maxWidth: "480px" }}>
                Connect with our certified experts to secure your university admission, accurately organize your Apostilled and financial documents, and successfully lodge your Polish Student Visa.
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