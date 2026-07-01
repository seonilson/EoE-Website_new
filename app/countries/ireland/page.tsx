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
  { icon: "🏛️", label: "Capital", value: "Dublin" },
  { icon: "💶", label: "Currency", value: "EUR (€ / Euro)" },
  { icon: "🗣️", label: "Language", value: "English" },
  { icon: "🌧️", label: "Weather", value: "Temperate Maritime" },
  { icon: "🎓", label: "Top Intakes", value: "September & January" },
];

// ── Data: Section Navigation ──────────────────────────────────
const tabsData = [
  { id: "overview", icon: "☘️", label: "Why Ireland?" },
  { id: "institutions", icon: "🏛️", label: "Top Universities" },
  { id: "courses", icon: "🎯", label: "Top Courses" },
  { id: "admissions", icon: "📝", label: "Visa Process" },
  { id: "documents", icon: "📂", label: "Documents" },
  { id: "careers", icon: "💼", label: "PSW & Careers" },
  { id: "faqs", icon: "❓", label: "FAQs" }
];

// ── Data: Other Destinations (Swipe Track) ────────────────────
const otherDestinations = [
  { id: "united-kingdom", name: "United Kingdom", flag: "/images/flags/gb.png" },
  { id: "germany", name: "Germany", flag: "/images/flags/de.png" },
  { id: "australia", name: "Australia", flag: "/images/flags/au.png" },
  { id: "canada", name: "Canada", flag: "/images/flags/ca.png" }
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
//  IRELAND MASTER PAGE
// ═══════════════════════════════════════════════════════════════
export default function CountryIrelandPage() {
  useEffect(() => { document.title = "Study in Ireland 2026 — Stamp 2 Visa, Universities & Work Rights | Edification Overseas"; }, []);

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
        @keyframes badgePulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.4); } }
        @keyframes float1 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
        @keyframes float2 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(12px); } }
        @keyframes glowPulse { 0%, 100% { filter: blur(40px) brightness(1); } 50% { filter: blur(60px) brightness(1.3); } }
        
        /* Floating Vector Animations */
        @keyframes floatSlow { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
        @keyframes floatMedium { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-20px) rotate(2deg); } }
        @keyframes floatFast { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-25px) rotate(-3deg); } }

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
                The Silicon Valley of Europe
              </span>
            </div>

            <h1 style={{
              fontSize: "clamp(40px, 5vw, 64px)", fontWeight: 900, color: "#ffffff", lineHeight: 1.1,
              letterSpacing: "-1px", marginBottom: "24px",
              animation: heroRef.inView ? "fadeSlideUp 0.55s ease 0.2s both" : "none",
            }}>
              Study in <br/>
              <span style={{ color: "#07CBEB", position: "relative", display: "inline-block" }}>
                Ireland
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
              Accelerate your career in Europe's booming tech and pharma hub. An <strong>Ireland Student Visa</strong> offers Indian students world-class English-taught education, immense corporate opportunities, and a guaranteed <strong>2-Year Post-Study Work (PSW) Visa</strong> for Master's graduates.
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
                src="/images/monuments/ireland.png" 
                alt="Ireland Monument" 
                fill 
                style={{ objectFit: "contain" }} 
                priority
              />
            </div>

            {/* Floating Circular Country Flag */}
            <div style={{ position: "absolute", top: "10%", right: "10%", width: "90px", height: "90px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.2)", zIndex: 9, animation: "float2 7s infinite reverse", overflow: "hidden", boxShadow: "0 16px 40px rgba(0,0,0,0.3)" }}>
               <Image src="/images/flags/ie.png" alt="Ireland Flag" fill style={{ objectFit: "cover" }} />
            </div>

            {/* Floating Glass Badges */}
            <div style={{ position: "absolute", top: "40px", left: "0px", zIndex: 3, animation: "float2 5s infinite" }}>
              <div style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.2)", padding: "12px 20px", borderRadius: "16px", display: "flex", alignItems: "center", gap: "10px", boxShadow: "0 16px 40px rgba(0,0,0,0.2)" }}>
                <span style={{ fontSize: "20px" }}>💼</span>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "10px", color: "#07CBEB", textTransform: "uppercase", fontWeight: 800 }}>Career Growth</span>
                  <span style={{ fontSize: "14px", fontWeight: 800, color: "#ffffff" }}>2-Year PSW Visa</span>
                </div>
              </div>
            </div>

            <div style={{ position: "absolute", bottom: "60px", right: "0px", zIndex: 3, animation: "float1 7s infinite reverse" }}>
              <div style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.2)", padding: "12px 20px", borderRadius: "16px", display: "flex", alignItems: "center", gap: "10px", boxShadow: "0 16px 40px rgba(0,0,0,0.2)" }}>
                <span style={{ fontSize: "20px" }}>💻</span>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "10px", color: "#07CBEB", textTransform: "uppercase", fontWeight: 800 }}>Industry</span>
                  <span style={{ fontSize: "14px", fontWeight: 800, color: "#ffffff" }}>European Tech Hub</span>
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
              Your Complete Guide to Education in Ireland
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
              <h2>Why Study in Ireland? The European Corporate Gateway</h2>
              <p>Following Brexit, Ireland is the only majority English-speaking country in the European Union. For Indian students, an <strong>Ireland Student Visa</strong> offers unparalleled access to the European headquarters of global giants like Google, Meta, Apple, and Pfizer. It combines friendly locals, a high-paying job market, and highly attractive post-study work rights.</p>
              
              <h3>Key Advantages of Education in Ireland</h3>
              <div className="info-grid">
                <div className="info-card">
                  <h4>💼 2-Year Post Study Work Visa</h4>
                  <p>Graduates with a Master's degree (Level 9) are entitled to the Stamp 1G visa, allowing them to work full-time in Ireland for 2 years after graduation.</p>
                </div>
                <div className="info-card">
                  <h4>💻 The Silicon Valley of Europe</h4>
                  <p>Dublin is the European hub for IT and Business. Studying here places you at the epicenter of international networking and recruitment.</p>
                </div>
                <div className="info-card">
                  <h4>🗣️ 100% English Speaking</h4>
                  <p>You do not need to learn a foreign language to navigate daily life, secure part-time jobs, or integrate into the corporate workforce.</p>
                </div>
                <div className="info-card">
                  <h4>🌟 High Visa Success Rate</h4>
                  <p>With transparent financial requirements and no mandatory embassy interviews, genuine Indian applicants enjoy excellent visa success rates.</p>
                </div>
              </div>
            </div>

            {/* CHAPTER 2: ACADEMICS & COST */}
            <div id="institutions" className="scroll-section">
              <h2>Top Universities, Colleges & Cost of Living</h2>
              <p>Ireland offers a dual higher-education structure: Highly ranked traditional Universities, and incredibly practical, industry-focused Colleges and Technological Universities (TUs).</p>
              
              <h3>Elite Public Universities</h3>
              <p>These internationally ranked institutions are known for rigorous academics and global prestige:</p>
              <div className="course-tags">
                <span className="course-tag-blue">🏛️ Trinity College Dublin (TCD)</span>
                <span className="course-tag-blue">🏛️ University College Dublin (UCD)</span>
                <span className="course-tag-blue">🏛️ University of Galway (NUI Galway)</span>
                <span className="course-tag-blue">🏛️ University College Cork (UCC)</span>
                <span className="course-tag-blue">🏛️ University of Limerick (UL)</span>
                <span className="course-tag-blue">🏛️ Dublin City University (DCU)</span>
              </div>

              <h3>Highly Popular Colleges & Tech Universities</h3>
              <p>These institutions are massively popular in the Indian market for their affordable fees, slightly relaxed entry requirements, and fantastic industry linkages:</p>
              <div className="course-tags">
                <span className="course-tag">🏫 National College of Ireland (NCI)</span>
                <span className="course-tag">🏫 Dublin Business School (DBS)</span>
                <span className="course-tag">🏫 Griffith College</span>
                <span className="course-tag">🏫 Technological University Dublin (TU Dublin)</span>
                <span className="course-tag">🏫 TUS (Technological University of the Shannon)</span>
                <span className="course-tag">🏫 Maynooth University</span>
              </div>
              
              <h3>Estimated Financial Requirements</h3>
              <p>Ireland requires highly precise financial planning. The visa authorities strictly monitor your ability to sustain yourself without relying on public funds.</p>
              
              <div className="stat-grid">
                <div className="stat-card">
                  <div className="stat-value">€10k - €15k</div>
                  <div className="stat-label">Avg. Tuition / Year<br/>(Colleges/TUs)</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">€15k - €25k</div>
                  <div className="stat-label">Avg. Tuition / Year<br/>(Public Universities)</div>
                </div>
                <div className="stat-card" style={{ background: "#fff5ee", borderColor: "rgba(241,97,1,0.3)" }}>
                  <div className="stat-value" style={{ color: "#F16101" }}>€10,000</div>
                  <div className="stat-label">Mandatory Living Funds<br/>(Bank Balance Proof)</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">€800 - €1,200</div>
                  <div className="stat-label">Avg. Monthly<br/>Living Cost</div>
                </div>
              </div>

              <div className="content-highlight">
                <p><strong>Strict Financial Capacity Rules:</strong> To secure your Irish Student Visa, you must show clear, verifiable evidence that you have immediate access to at least <strong>€10,000</strong> to cover your first year's living expenses, IN ADDITION to having fully paid your first year's tuition fee (or providing an approved Education Loan letter).</p>
              </div>
            </div>

            {/* CHAPTER 3: COURSES */}
            <div id="courses" className="scroll-section">
              <h2>High-Demand Courses in Ireland</h2>
              <p>Choosing courses aligned with Ireland’s <strong>Critical Skills Employment List</strong> significantly boosts your chances of securing long-term work permits after graduation.</p>
              
              <h3>Data Science, AI & IT</h3>
              <p>Ireland is Europe's tech capital. Graduates in these fields are aggressively recruited by multinational corporations based in Dublin.</p>
              <div className="course-tags">
                <span className="course-tag">💻 Data Science & Big Data</span>
                <span className="course-tag">🤖 Artificial Intelligence</span>
                <span className="course-tag">☁️ Cloud Computing</span>
                <span className="course-tag">🔒 Cyber Security</span>
              </div>

              <h3>Business Analytics & Management</h3>
              <p>A massive sector catering to the operational headquarters of international tech and finance giants.</p>
              <div className="course-tags">
                <span className="course-tag">📊 Business Analytics</span>
                <span className="course-tag">📈 Master of Business Administration (MBA)</span>
                <span className="course-tag">📱 Digital Marketing</span>
              </div>

              <h3>Pharmaceuticals & Biotechnology</h3>
              <p>Ireland is one of the world's largest exporters of pharmaceuticals, hosting companies like Pfizer and Johnson & Johnson.</p>
              <div className="course-tags">
                <span className="course-tag">💊 Pharmaceutical Sciences</span>
                <span className="course-tag">🧬 Biotechnology</span>
                <span className="course-tag">🏥 Regulatory Affairs</span>
              </div>
            </div>

            {/* CHAPTER 4: ADMISSIONS & VISAS */}
            <div id="admissions" className="scroll-section">
              <h2>Navigating the Ireland Visa Process</h2>
              <p>The Irish Student Visa process requires heavy documentation but is highly systematic. You apply for a <strong>Long Stay (D) Study Visa</strong>.</p>
              
              <h3>The Step-by-Step Visa Process</h3>
              <div className="timeline">
                <div className="timeline-step">
                  <div className="step-num">1</div>
                  <div className="step-content"><strong>Offer Letter:</strong> Submit your academics, SOP, and English proficiency scores (IELTS/PTE/Duolingo) to secure an unconditional offer.</div>
                </div>
                <div className="timeline-step">
                  <div className="step-num">2</div>
                  <div className="step-content"><strong>Pay 1st Year Tuition:</strong> Unlike many countries, Ireland requires you to pay your complete first-year tuition fee up-front before you can apply for the visa.</div>
                </div>
                <div className="timeline-step">
                  <div className="step-num">3</div>
                  <div className="step-content"><strong>Buy Medical Insurance:</strong> Purchase mandatory private medical insurance from an Irish provider to cover your stay.</div>
                </div>
                <div className="timeline-step">
                  <div className="step-num">4</div>
                  <div className="step-content"><strong>VFS Visa Submission:</strong> Compile your heavy financial documentation and lodge your physical visa file at VFS Global in India.</div>
                </div>
                <div className="timeline-step">
                  <div className="step-num">5</div>
                  <div className="step-content"><strong>Arrival & IRP Registration:</strong> Travel to Ireland. Within 90 days of arrival, register at the local immigration office to receive your Irish Residence Permit (IRP) card.</div>
                </div>
              </div>
            </div>

            {/* CHAPTER 5: DOCUMENTS */}
            <div id="documents" className="scroll-section">
              <h2>Official Document Checklist</h2>
              <p>The Irish embassy scrutinizes financial documents meticulously. Any unexplained large deposits will lead to visa refusal.</p>
              
              <h3>Required Admission & Visa Documents</h3>
              <ul className="doc-list">
                <li>Valid Passport (Front & Back scanned)</li>
                <li>All Academic Transcripts & Degree Certificates</li>
                <li><strong>Valid IELTS, PTE, or Duolingo Scorecard</strong></li>
                <li>Comprehensive Statement of Purpose (SOP)</li>
                <li>Official Letter of Acceptance from an Irish College</li>
                <li>Electronic Transfer Receipt (EFT) proving tuition fee payment</li>
                <li>Proof of €10,000 living funds (6-month bank statements, ITRs, Education Loan)</li>
                <li>Proof of Private Medical Insurance</li>
                <li>Police Clearance Certificate (Recommended)</li>
              </ul>
            </div>

            {/* CHAPTER 6: CAREERS */}
            <div id="careers" className="scroll-section">
              <h2>Post-Study Work (PSW) and Careers</h2>
              <p>Ireland's immigration system is designed to retain international talent, specifically in the STEM and corporate business sectors.</p>
              
              <h3>Part-Time Work During Studies</h3>
              <p>International students with a valid IRP card (Stamp 2) can work up to <strong>20 hours per week</strong> during the academic semester, and up to <strong>40 hours per week</strong> during standard university holiday periods (June-September and mid-Dec to mid-Jan). With minimum wage constantly rising, students can comfortably manage their rent and groceries.</p>

              <div className="content-highlight">
                <p><strong>The Stamp 1G (Post-Study Work Visa):</strong> Graduates of a Bachelor's Degree (Level 8) receive a <strong>1-Year</strong> PSW visa. Graduates of a Master's Degree (Level 9) or PhD (Level 10) are entitled to a <strong>2-Year</strong> PSW visa. During this time, you can work full-time without needing a specific work permit.</p>
              </div>

              <h3>Critical Skills Employment Permit</h3>
              <p>If you secure a job in a highly-demanded sector (like IT, Engineering, or Data Analysis) paying a minimum threshold salary, your employer can sponsor you for a Critical Skills Permit. This is the fastest track to Irish Permanent Residency (PR), often taking just 2 years on this permit.</p>
            </div>

            {/* CHAPTER 7: FAQS */}
            <div id="faqs" className="scroll-section">
              <h2>Frequently Asked Questions (FAQs)</h2>
              
              <div className="faq-card">
                <h4>Is Duolingo accepted for Irish Universities and Visas?</h4>
                <p>Yes. Since the pandemic, many top Irish colleges (like NCI and DBS) and the Irish Visa office accept the Duolingo English Test (DET) as valid proof of English proficiency, making the admission process much faster and cheaper for Indian students.</p>
              </div>
              
              <div className="faq-card">
                <h4>Do I really have to pay the full tuition fee before the visa?</h4>
                <p>Yes. As per Irish immigration guidelines, you must pay at least €6,000, but almost all major colleges require the full first-year tuition fee to be paid upfront to secure your unconditional offer letter, which is necessary to lodge your visa.</p>
              </div>

              <div className="faq-card">
                <h4>Can I travel to the UK or Europe with an Irish Student Visa?</h4>
                <p>Ireland is NOT in the Schengen zone. Your Irish visa does not automatically grant you access to mainland Europe. Similarly, although it shares a border with the UK (Northern Ireland), you will still need a separate UK visitor visa to travel to London or mainland UK.</p>
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
              Every country offers unique opportunities. Compare Ireland with other top global study destinations to find your perfect fit.
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
                Ready to Apply to Ireland?
              </h2>
              <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.7)", margin: 0, lineHeight: 1.6, maxWidth: "480px" }}>
                Connect with our certified experts to secure your admission letter, accurately prepare your rigorous financial documentation, and confidently lodge your Irish Student Visa.
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