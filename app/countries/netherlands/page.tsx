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
  { icon: "🏛️", label: "Capital", value: "Amsterdam" },
  { icon: "💶", label: "Currency", value: "EUR (€ / Euro)" },
  { icon: "🗣️", label: "Language", value: "Dutch & English" },
  { icon: "🌧️", label: "Weather", value: "Temperate Maritime" },
  { icon: "🎓", label: "Top Intakes", value: "September (Main) & February" },
];

// ── Data: Section Navigation ──────────────────────────────────
const tabsData = [
  { id: "overview", icon: "🌍", label: "Why Netherlands?" },
  { id: "institutions", icon: "🏛️", label: "Top Universities" },
  { id: "courses", icon: "🎯", label: "Tech & Top Courses" },
  { id: "admissions", icon: "📝", label: "MVV Visa Process" },
  { id: "documents", icon: "📂", label: "Documents" },
  { id: "careers", icon: "💼", label: "Orientation Year Visa" },
  { id: "faqs", icon: "❓", label: "FAQs" }
];

// ── Data: Other Destinations (Swipe Track) ────────────────────
const otherDestinations = [
  { id: "germany", name: "Germany", flag: "/images/flags/de.png" },
  { id: "ireland", name: "Ireland", flag: "/images/flags/ie.png" },
  { id: "finland", name: "Finland", flag: "/images/flags/fi.png" },
  { id: "france", name: "France", flag: "/images/flags/fr.png" }
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
//  NETHERLANDS MASTER PAGE
// ═══════════════════════════════════════════════════════════════
export default function CountryNetherlandsPage() {
  useEffect(() => { document.title = "Study in Netherlands 2026 — MVV Visa, Universities & Work Permit | Edification Overseas"; }, []);

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
                The Innovator of Europe
              </span>
            </div>

            <h1 style={{
              fontSize: "clamp(40px, 5vw, 64px)", fontWeight: 900, color: "#ffffff", lineHeight: 1.1,
              letterSpacing: "-1px", marginBottom: "24px",
              animation: heroRef.inView ? "fadeSlideUp 0.55s ease 0.2s both" : "none",
            }}>
              Study in the <br/>
              <span style={{ color: "#07CBEB", position: "relative", display: "inline-block" }}>
                Netherlands
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
              Accelerate your career in one of Europe's most progressive tech and business hubs. A <strong>Netherlands Student Visa</strong> grants Indian students access to world-class <strong>English-taught degrees</strong>, highly practical universities, and the lucrative <strong>1-Year Orientation Visa</strong> to kickstart a global career.
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
                src="/images/monuments/netherlands.png" 
                alt="Netherlands Windmill Monument" 
                fill 
                style={{ objectFit: "contain" }} 
                priority
              />
            </div>

            {/* Floating Circular Country Flag */}
            <div style={{ position: "absolute", top: "10%", right: "10%", width: "90px", height: "90px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.2)", zIndex: 9, animation: "float2 7s infinite reverse", overflow: "hidden", boxShadow: "0 16px 40px rgba(0,0,0,0.3)" }}>
               <Image src="/images/flags/nl.png" alt="Netherlands Flag" fill style={{ objectFit: "cover" }} />
            </div>

            {/* Floating Glass Badges */}
            <div style={{ position: "absolute", top: "40px", left: "0px", zIndex: 3, animation: "float2 5s infinite" }}>
              <div style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.2)", padding: "12px 20px", borderRadius: "16px", display: "flex", alignItems: "center", gap: "10px", boxShadow: "0 16px 40px rgba(0,0,0,0.2)" }}>
                <span style={{ fontSize: "20px" }}>🗣️</span>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "10px", color: "#07CBEB", textTransform: "uppercase", fontWeight: 800 }}>Language</span>
                  <span style={{ fontSize: "14px", fontWeight: 800, color: "#ffffff" }}>95% Speak English</span>
                </div>
              </div>
            </div>

            <div style={{ position: "absolute", bottom: "60px", right: "0px", zIndex: 3, animation: "float1 7s infinite reverse" }}>
              <div style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.2)", padding: "12px 20px", borderRadius: "16px", display: "flex", alignItems: "center", gap: "10px", boxShadow: "0 16px 40px rgba(0,0,0,0.2)" }}>
                <span style={{ fontSize: "20px" }}>💼</span>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "10px", color: "#07CBEB", textTransform: "uppercase", fontWeight: 800 }}>Career Growth</span>
                  <span style={{ fontSize: "14px", fontWeight: 800, color: "#ffffff" }}>1-Year Job Visa</span>
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
              Your Complete Guide to Education in the Netherlands
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
              <h2>Why Study in the Netherlands? The Progressive Hub of Europe</h2>
              <p>The Netherlands (Holland) consistently ranks as one of the best study destinations in the world. For Indian students, a <strong>Dutch Study Visa</strong> offers an exceptional, stress-free European experience. Known for its highly innovative teaching methods, you will study entirely in English while living in one of the safest and most eco-friendly countries on earth.</p>
              
              <h3>Key Advantages of Education in the Netherlands</h3>
              <div className="info-grid">
                <div className="info-card">
                  <h4>💼 1-Year Orientation Visa</h4>
                  <p>Graduates are highly encouraged to stay. The "Zoekjaar" (Search Year) visa grants you 12 months to find a job or start a business as a highly skilled migrant.</p>
                </div>
                <div className="info-card">
                  <h4>🗣️ 95% English Speaking</h4>
                  <p>You do not need to learn Dutch to survive. The Netherlands has the highest English proficiency in the world for non-native speakers, making daily life and studying effortless.</p>
                </div>
                <div className="info-card">
                  <h4>🌍 Schengen Area Travel</h4>
                  <p>Your Dutch residence permit allows you complete freedom to travel across 27 Schengen countries, expanding your professional and personal horizons.</p>
                </div>
                <div className="info-card">
                  <h4>📝 University-Sponsored Visa</h4>
                  <p>The visa process is incredibly smooth. Once admitted, your university formally applies to the IND (Immigration) on your behalf, guaranteeing a high success rate.</p>
                </div>
              </div>
            </div>

            {/* CHAPTER 2: ACADEMICS & COST */}
            <div id="institutions" className="scroll-section">
              <h2>Top Universities & Universities of Applied Sciences</h2>
              <p>Higher education in the Netherlands is strictly regulated for high quality. It is divided into two distinct streams: <strong>Research Universities</strong> (highly academic) and <strong>Universities of Applied Sciences (HBO)</strong> (highly practical and internship-focused).</p>
              
              <h3>Elite Research Universities</h3>
              <p>These institutions are globally ranked and focus on deep academic and scientific research:</p>
              <div className="course-tags">
                <span className="course-tag-blue">🏛️ Delft University of Technology (TU Delft)</span>
                <span className="course-tag-blue">🏛️ University of Amsterdam (UvA)</span>
                <span className="course-tag-blue">🏛️ Wageningen University & Research</span>
                <span className="course-tag-blue">🏛️ Erasmus University Rotterdam</span>
                <span className="course-tag-blue">🏛️ Eindhoven University of Technology (TU/e)</span>
              </div>

              <h3>Top Universities of Applied Sciences (UAS)</h3>
              <p>These are massive favorites for Indian students seeking high employability, as they require mandatory internships (work placements) to graduate:</p>
              <div className="course-tags">
                <span className="course-tag">🏫 Fontys University of Applied Sciences</span>
                <span className="course-tag">🏫 Hanze University of Applied Sciences</span>
                <span className="course-tag">🏫 HAN University of Applied Sciences</span>
                <span className="course-tag">🏫 Saxion University of Applied Sciences</span>
                <span className="course-tag">🏫 Amsterdam University of Applied Sciences</span>
                <span className="course-tag">🏫 Breda University of Applied Sciences</span>
              </div>
              
              <h3>Estimated Financial Requirements</h3>
              <p>Studying in the Netherlands requires careful financial planning. The immigration department (IND) requires proof of funds for your first year.</p>
              
              <div className="stat-grid">
                <div className="stat-card">
                  <div className="stat-value">€ 8k - € 15k</div>
                  <div className="stat-label">Avg. Tuition / Year<br/>(Bachelors Degrees)</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">€ 12k - € 20k</div>
                  <div className="stat-label">Avg. Tuition / Year<br/>(Masters Programs)</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">€ 900 - € 1,200</div>
                  <div className="stat-label">Avg. Monthly<br/>Living Cost</div>
                </div>
                <div className="stat-card" style={{ background: "#fff5ee", borderColor: "rgba(241,97,1,0.3)" }}>
                  <div className="stat-value" style={{ color: "#F16101" }}>€ 12,000+</div>
                  <div className="stat-label">Required Living Funds<br/>(Show Money for IND)</div>
                </div>
              </div>
            </div>

            {/* CHAPTER 3: COURSES */}
            <div id="courses" className="scroll-section">
              <h2>High-Demand Courses in the Netherlands</h2>
              <p>The Netherlands is a global leader in water management, sustainable energy, high-tech systems, and logistics. Aligning your studies with these sectors ensures massive career growth.</p>
              
              <h3>Engineering, Tech & Sustainability</h3>
              <p>Dutch tech hubs (like Eindhoven) are aggressively hiring. TU Delft and TU/e are the premier choices for these fields.</p>
              <div className="course-tags">
                <span className="course-tag">⚙️ Civil & Water Engineering</span>
                <span className="course-tag">💻 Computer Science & AI</span>
                <span className="course-tag">🌿 Sustainable Energy Technology</span>
              </div>

              <h3>Business, Logistics & Supply Chain</h3>
              <p>Home to the Port of Rotterdam (Europe's largest port), the Netherlands is the undisputed king of global supply chain management.</p>
              <div className="course-tags">
                <span className="course-tag">📦 Supply Chain Management & Logistics</span>
                <span className="course-tag">📈 International Business (BBA/MBA)</span>
                <span className="course-tag">💰 Finance & Economics</span>
              </div>

              <h3>Agriculture & Life Sciences</h3>
              <p>Wageningen University is consistently ranked #1 globally for agriculture and forestry.</p>
              <div className="course-tags">
                <span className="course-tag">🌾 Agricultural Sciences</span>
                <span className="course-tag">🧬 Biotechnology</span>
                <span className="course-tag">🍎 Food Science</span>
              </div>
            </div>

            {/* CHAPTER 4: ADMISSIONS & VISAS */}
            <div id="admissions" className="scroll-section">
              <h2>Navigating the MVV & VVR Visa Process</h2>
              <p>The Dutch student visa process is highly unique and stress-free. You do not apply directly to the embassy. Instead, the university acts as your recognized sponsor and applies to the Dutch Immigration and Naturalisation Service (IND) on your behalf.</p>
              
              <h3>The Step-by-Step Visa Process</h3>
              <div className="timeline">
                <div className="timeline-step">
                  <div className="step-num">1</div>
                  <div className="step-content"><strong>Apply via Studielink:</strong> Register and apply to your chosen universities through Studielink (the centralized Dutch application portal).</div>
                </div>
                <div className="timeline-step">
                  <div className="step-num">2</div>
                  <div className="step-content"><strong>Accept Offer & Pay Fees:</strong> Once accepted, you must transfer your first year’s tuition fee PLUS the required living expenses (approx €12,000) directly to the university's bank account.</div>
                </div>
                <div className="timeline-step">
                  <div className="step-num">3</div>
                  <div className="step-content"><strong>University IND Application:</strong> The university uses your funds to prove your financial stability and applies to the IND for your visa approval.</div>
                </div>
                <div className="timeline-step">
                  <div className="step-num">4</div>
                  <div className="step-content"><strong>Collect MVV Visa:</strong> Once the IND approves, you book an appointment at the Dutch Embassy/VFS in India to collect your MVV (Provisional Residence Permit) sticker in your passport.</div>
                </div>
                <div className="timeline-step">
                  <div className="step-num">5</div>
                  <div className="step-content"><strong>Arrival & VVR Card:</strong> Travel to the Netherlands. The university will refund your living expense deposit into your new Dutch bank account. You then collect your physical VVR (Residence Permit) card from the IND.</div>
                </div>
              </div>
            </div>

            {/* CHAPTER 5: DOCUMENTS */}
            <div id="documents" className="scroll-section">
              <h2>Official Document Checklist</h2>
              <p>Because the university handles the IND application, your documentation must be provided flawlessly to the university during the admission stage.</p>
              
              <h3>Required Admission & Visa Documents</h3>
              <ul className="doc-list">
                <li>Valid Passport (All pages scanned)</li>
                <li>All Academic Transcripts & Degree Certificates</li>
                <li><strong>Valid IELTS, TOEFL, or PTE Scorecard</strong> (Strictly enforced by most universities)</li>
                <li>Comprehensive Letter of Motivation (SOP)</li>
                <li>Updated Curriculum Vitae (CV)</li>
                <li>Proof of Transfer (EFT) for Tuition and Living Expenses</li>
                <li>Birth Certificate (May need Apostille for municipality registration)</li>
                <li>Tuberculosis (TB) Test (Conducted after arriving in the Netherlands)</li>
              </ul>
            </div>

            {/* CHAPTER 6: CAREERS */}
            <div id="careers" className="scroll-section">
              <h2>Work Rights, Search Year Visa, and Careers</h2>
              <p>The Netherlands highly values international talent and provides excellent frameworks to retain skilled graduates in their workforce.</p>
              
              <h3>Part-Time Work During Studies</h3>
              <p>International students (non-EU) can work part-time for a maximum of <strong>16 hours per week</strong> during the academic year, OR full-time during the summer months (June to August). Your employer must apply for a specific work permit for you, which is a straightforward process.</p>

              <div className="content-highlight">
                <p><strong>The "Zoekjaar" (Orientation Year) Visa:</strong> After completing your Bachelor's or Master's degree, you are eligible to apply for the Orientation Year for Highly Educated Persons. This grants you <strong>1 full year</strong> to stay in the Netherlands to find a job or start a business, with unrestricted access to the Dutch labor market.</p>
              </div>

              <h3>Highly Skilled Migrant Status</h3>
              <p>If you find a job during your Orientation Year that meets the minimum salary threshold, your employer will sponsor you for a Highly Skilled Migrant visa, offering a secure path to long-term residency and eventually Dutch citizenship.</p>
            </div>

            {/* CHAPTER 7: FAQS */}
            <div id="faqs" className="scroll-section">
              <h2>Frequently Asked Questions (FAQs)</h2>
              
              <div className="faq-card">
                <h4>What is the difference between Research Universities and UAS?</h4>
                <p>Research Universities focus on theoretical academics, deep research, and usually prepare students for Master's/PhDs or high-level corporate roles. Universities of Applied Sciences (UAS/HBO) focus on practical skills, project-based learning, and require mandatory internships, preparing you directly for the workforce.</p>
              </div>
              
              <div className="faq-card">
                <h4>Why do I have to send my living expenses to the university?</h4>
                <p>This is standard Dutch immigration law to prevent visa fraud. Instead of showing bank statements to the embassy, you transfer the required living funds (approx €12,000) to the university. The university shows this to the IND to get your visa approved. Once you arrive and open a Dutch bank account, the university immediately refunds the full amount back to you.</p>
              </div>

              <div className="faq-card">
                <h4>Is it mandatory to learn Dutch to get a job?</h4>
                <p>While the Netherlands is a highly English-proficient country and many multinational companies (like ASML, Philips, Booking.com) operate entirely in English, learning basic conversational Dutch significantly improves your chances of landing a job and integrating socially.</p>
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
              Every country offers unique opportunities. Compare the Netherlands with other top global study destinations to find your perfect fit.
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
                Ready to Apply to the Netherlands?
              </h2>
              <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.7)", margin: 0, lineHeight: 1.6, maxWidth: "480px" }}>
                Connect with our certified experts to secure your admission letter, accurately manage your university fund transfers, and seamlessly process your Dutch MVV Visa.
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