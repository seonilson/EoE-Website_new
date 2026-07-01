"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// ── useInView (For Hero Entrance) ─────────────────────────────
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

// ── Data: Quick Facts ─────────────────────────────────────────
const quickFacts = [
  { icon: "🏛️", label: "Capital", value: "Singapore" },
  { icon: "💵", label: "Currency", value: "SGD (Singapore Dollar)" },
  { icon: "🗣️", label: "Language", value: "English (Primary)" },
  { icon: "🌡️", label: "Weather", value: "Tropical (Warm year-round)" },
  { icon: "🎓", label: "Top Intakes", value: "Multiple (Jan, May, Sep)" },
];

// ── Data: Section Navigation ──────────────────────────────────
const tabsData = [
  { id: "overview", icon: "🦁", label: "Why Singapore?" },
  { id: "institutions", icon: "🏛️", label: "PEIs & Public Unis" },
  { id: "courses", icon: "🎯", label: "Top Courses" },
  { id: "admissions", icon: "📝", label: "Student Pass (STP)" },
  { id: "documents", icon: "📂", label: "Documents" },
  { id: "careers", icon: "💼", label: "EP & Careers" },
  { id: "faqs", icon: "❓", label: "FAQs" }
];

// ── Data: Other Destinations (Swipe Track) ────────────────────
const otherDestinations = [
  { id: "cyprus", name: "Cyprus", flag: "/images/flags/cy.png" },
  { id: "mauritius", name: "Mauritius", flag: "/images/flags/mu.png" },
  { id: "belarus", name: "Belarus", flag: "/images/flags/by.png" },
  { id: "moldova", name: "Moldova", flag: "/images/flags/md.png" }
];

// ── Section Wrapper ───────────────────────────────────────────
function Section({ children, bg = "#ffffff", style = {} }: { children: React.ReactNode; bg?: string; style?: React.CSSProperties }) {
  return (
    <section style={{ background: bg, position: "relative", overflow: "hidden", ...style }}>
      {children}
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
//  SINGAPORE MASTER COUNTRY PAGE 
// ═══════════════════════════════════════════════════════════════
export default function CountrySingaporePage() {
  useEffect(() => { document.title = "Study in Singapore 2026 — Student Pass, NUS NTU & Top Universities | Edification Overseas"; }, []);

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
    <main style={{ background: "#F9FAFB", overflowX: "hidden" }}>

      <style dangerouslySetInnerHTML={{ __html: `
        /* Animations */
        @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.85); } to { opacity: 1; transform: scale(1); } }
        @keyframes float1 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
        @keyframes float2 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(12px); } }
        @keyframes glowPulse { 0%, 100% { filter: blur(40px) brightness(1); } 50% { filter: blur(60px) brightness(1.3); } }

        /* Quick Facts Bar */
        .qf-bar {
          background: #ffffff; border-radius: 20px; padding: 24px 32px;
          box-shadow: 0 12px 32px rgba(2,44,69,0.04); border: 1px solid rgba(2,44,69,0.05);
          display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap: wrap;
          margin-top: -40px; position: relative; z-index: 10;
        }
        .qf-item { display: flex; align-items: center; gap: 12px; }

        /* Main Content Container */
        .content-container { padding: 56px 0 100px; width: 100%; }

        /* Sticky Tabs Wrapper */
        .tabs-sticky-wrapper { position: sticky; top: 60px; z-index: 20; padding: 20px 0; background: #F9FAFB; box-sizing: border-box; max-width: 100%; overflow: hidden; }

        /* Tabs Container */
        .tabs-container {
          background: #ffffff; border-radius: 16px; padding: 12px 16px; 
          border: 1px solid rgba(2,44,69,0.08); box-shadow: 0 12px 24px rgba(2,44,69,0.04); 
          display: flex; gap: 16px; align-items: center; justify-content: space-between; flex-wrap: wrap;
          box-sizing: border-box; max-width: 100%;
        }
        .tabs-nav { display: flex; gap: 8px; flex-wrap: wrap; flex: 1; align-items: center; }
        .tab-btn {
          padding: 10px 14px; border-radius: 10px; font-size: 13.5px; font-weight: 700;
          background: #f4fbfc; color: #4B5563; border: 1px solid rgba(7,203,235,0.1); cursor: pointer;
          white-space: nowrap; transition: all 0.2s ease; flex-shrink: 0; display: flex; align-items: center; gap: 6px;
        }
        .tab-btn:hover { color: #022C45; background: #e0f7fa; border-color: rgba(7,203,235,0.3); }
        .tab-btn.active { background: #022C45; color: #ffffff; border-color: #022C45; }

        .tabs-cta-btn {
          background: #F16101; color: #ffffff; padding: 12px 20px; border-radius: 10px;
          font-size: 13px; font-weight: 800; text-transform: uppercase; text-decoration: none;
          white-space: nowrap; box-shadow: 0 4px 12px rgba(241,97,1,0.2); transition: all 0.3s;
          flex-shrink: 0; display: inline-flex; align-items: center; gap: 8px;
        }
        .tabs-cta-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(241,97,1,0.3); background: #d95701; }

        /* Standardized Scrollable Content Sections */
        .scroll-section {
          scroll-margin-top: 180px; 
          background: #ffffff; border-radius: 20px; padding: 48px;
          border: 1px solid rgba(2,44,69,0.06); box-shadow: 0 12px 32px rgba(2,44,69,0.02); margin-bottom: 24px;
        }
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

        /* Updated Stat Grid for 4 Columns */
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
        
        /* New Blue Tags for Public Universities */
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
        
        .explore-all-btn {
          flex: 1 1 200px; max-width: 250px; background: linear-gradient(135deg, #022C45 0%, #054f77 100%);
          border-radius: 16px; padding: 20px; text-decoration: none; transition: all 0.3s;
          display: flex; align-items: center; justify-content: center; gap: 10px; color: #ffffff;
          box-shadow: 0 12px 24px rgba(2,44,69,0.15);
        }
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
      `}} />

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
                Asia's Financial Hub
              </span>
            </div>

            <h1 style={{
              fontSize: "clamp(40px, 5vw, 64px)", fontWeight: 900, color: "#ffffff", lineHeight: 1.1,
              letterSpacing: "-1px", marginBottom: "24px",
              animation: heroRef.inView ? "fadeSlideUp 0.55s ease 0.2s both" : "none",
            }}>
              Study in <br/>
              <span style={{ color: "#07CBEB", position: "relative", display: "inline-block" }}>
                Singapore
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
              Accelerate your career in one of the safest and most advanced countries globally. A <strong>Singapore Student Pass</strong> offers Indian students fast-track degrees, English-medium exemptions, and access to top corporate headquarters without showing heavy financial funds.
            </p>
          </div>

          {/* RIGHT: Floating Monument, Badges & Circular Flag */}
          <div style={{ 
            flex: "1 1 450px", position: "relative", minHeight: "450px", 
            animation: heroRef.inView ? "scaleIn 0.8s cubic-bezier(0.22,1,0.36,1) 0.3s both" : "none",
            display: "flex", justifyContent: "center", alignItems: "center"
          }} className="hero-right-col">
            <div style={{ position: "absolute", width: "350px", height: "350px", background: "rgba(7,203,235,0.12)", borderRadius: "50%", animation: "glowPulse 4s infinite" }} />
            
            {/* CLEAN Monument Image Holder with Next.js Image Component */}
            <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: "420px", aspectRatio: "1/1", animation: "float1 6s infinite ease-in-out" }}>
              <Image 
                src="/images/monuments/singapore.png" 
                alt="Singapore Monument Marina Bay" 
                fill 
                style={{ objectFit: "contain" }} 
                priority
              />
            </div>

            {/* Floating Circular Country Flag */}
            <div style={{ position: "absolute", top: "10%", right: "10%", width: "90px", height: "90px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.2)", zIndex: 9, animation: "float2 7s infinite reverse", overflow: "hidden", boxShadow: "0 16px 40px rgba(0,0,0,0.3)" }}>
               <Image src="/images/flags/sg.png" alt="Singapore Flag" fill style={{ objectFit: "cover" }} />
            </div>

            {/* Floating Glass Badges */}
            <div style={{ position: "absolute", top: "40px", left: "0px", zIndex: 3, animation: "float2 5s infinite" }}>
              <div style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.2)", padding: "12px 20px", borderRadius: "16px", display: "flex", alignItems: "center", gap: "10px", boxShadow: "0 16px 40px rgba(0,0,0,0.2)" }}>
                <span style={{ fontSize: "20px" }}>⚡</span>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "10px", color: "#07CBEB", textTransform: "uppercase", fontWeight: 800 }}>Visa Process</span>
                  <span style={{ fontSize: "14px", fontWeight: 800, color: "#ffffff" }}>2-4 Weeks</span>
                </div>
              </div>
            </div>

            <div style={{ position: "absolute", bottom: "60px", right: "0px", zIndex: 3, animation: "float1 7s infinite reverse" }}>
              <div style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.2)", padding: "12px 20px", borderRadius: "16px", display: "flex", alignItems: "center", gap: "10px", boxShadow: "0 16px 40px rgba(0,0,0,0.2)" }}>
                <span style={{ fontSize: "20px" }}>🛡️</span>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "10px", color: "#07CBEB", textTransform: "uppercase", fontWeight: 800 }}>Environment</span>
                  <span style={{ fontSize: "14px", fontWeight: 800, color: "#ffffff" }}>Extremely Safe</span>
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
              Your Complete Guide to Singapore Education
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
              <h2>Why Study in Singapore? Asia’s Global Hub</h2>
              <p>For Indian students, studying in Singapore is the ultimate gateway to international business, tech, and hospitality. With a robust Indian community, short flight distances to India, and incredibly fast-tracked academic degrees, a <strong>Singapore Student Pass</strong> is highly sought after by those wanting rapid career growth.</p>
              
              <h3>Key Advantages of Singapore Education</h3>
              <div className="info-grid">
                <div className="info-card">
                  <h4>✈️ Close to Home</h4>
                  <p>Just a 4-6 hour flight from major Indian cities, offering a comforting cultural familiarity and easy travel.</p>
                </div>
                <div className="info-card">
                  <h4>⚡ Fast-Track Degrees</h4>
                  <p>Many PEIs offer intensive structures where you can complete a Bachelor's in 2 years and a Master's in 1 year.</p>
                </div>
                <div className="info-card">
                  <h4>🚫 IELTS Exemptions</h4>
                  <p>Most Singapore institutions waive IELTS/PTE requirements if your previous education medium was English.</p>
                </div>
                <div className="info-card">
                  <h4>🛡️ Zero Crime Rate</h4>
                  <p>Singapore has incredibly strict laws, making it arguably the safest country in the world for international students.</p>
                </div>
              </div>
            </div>

            {/* CHAPTER 2: ACADEMICS & COST */}
            <div id="institutions" className="scroll-section">
              <h2>Top Institutions & Cost of Living</h2>
              <p>Singapore’s education is categorized into highly competitive Public Universities and incredibly popular, industry-focused <strong>Private Education Institutions (PEIs)</strong>. PEIs often partner with top UK and Australian universities, allowing you to earn a western degree in Asia.</p>
              
              <h3>Top Public Universities</h3>
              <div className="course-tags">
                <span className="course-tag-blue">🏛️ National University of Singapore (NUS)</span>
                <span className="course-tag-blue">🏛️ Nanyang Technological University (NTU)</span>
                <span className="course-tag-blue">🏛️ Singapore Management University (SMU)</span>
                <span className="course-tag-blue">🏛️ Singapore University of Technology and Design (SUTD)</span>
              </div>

              <h3>Top EduTrust Certified PEIs</h3>
              <p>These institutions are the most popular choices for Indian students due to their flexible admissions, multiple intakes, and practical curriculums:</p>
              <div className="course-tags">
                <span className="course-tag">🏫 PSB Academy</span>
                <span className="course-tag">🏫 DIMENSIONS International College</span>
                <span className="course-tag">🏫 IMSC (International Management Sports College)</span>
                <span className="course-tag">🏫 SISH Institute</span>
                <span className="course-tag">🏫 TEG International College</span>
                <span className="course-tag">🏫 TMC Academy</span>
                <span className="course-tag">🏫 STEI Institute</span>
                <span className="course-tag">🏫 ICASTEC</span>
                <span className="course-tag">🏫 CSM Academy</span>
                <span className="course-tag">🏫 Birmingham Academy</span>
                <span className="course-tag">🏫 AllSpice Institute</span>
                <span className="course-tag">🏫 Acetek</span>
                <span className="course-tag">🏫 GSTM</span>
                <span className="course-tag">🏫 ERC Institute</span>
                <span className="course-tag">🏫 James Cook University Singapore</span>
                <span className="course-tag">🏫 Ascensus Institute</span>
                <span className="course-tag">🏫 Educare Global Academy</span>
                <span className="course-tag">🏫 Genetic Computer Institute</span>
              </div>
              
              <h3>Estimated Financial Requirements</h3>
              <p>The most popular programs for international students are <strong>Diploma (Level 3)</strong> and <strong>Advance Diploma (Level 4 and 5)</strong> courses, alongside fast-tracked Bachelors and Masters degrees.</p>
              
              <div className="stat-grid">
                <div className="stat-card">
                  <div className="stat-value">SGD 4k - 6k</div>
                  <div className="stat-label">Avg. Tuition<br/>(Diploma)</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">SGD 5k - 8k</div>
                  <div className="stat-label">Avg. Tuition<br/>(Adv. Diploma)</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">SGD 25k - 40k</div>
                  <div className="stat-label">Avg. Tuition<br/>(Bachelors)</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">SGD 20k - 35k</div>
                  <div className="stat-label">Avg. Tuition<br/>(Masters)</div>
                </div>
              </div>

              <div className="content-highlight">
                <p><strong>Living Expenses:</strong> Students should budget approximately <strong>SGD 1,000 - SGD 1,200 per month</strong> for off-campus housing (like HDB sharing or private hostels), transport, and groceries in Singapore.</p>
              </div>
            </div>

            {/* CHAPTER 3: COURSES */}
            <div id="courses" className="scroll-section">
              <h2>High-Demand Courses in Singapore</h2>
              <p>Singapore is the financial and logistical heartbeat of Asia. Choosing a Level 3, 4, or 5 Diploma aligned with their massive corporate infrastructure ensures high employability.</p>
              
              <h3>Business, Finance & Management</h3>
              <div className="course-tags">
                <span className="course-tag">📈 Global Business Management</span>
                <span className="course-tag">💰 Banking & Finance</span>
                <span className="course-tag">📦 Supply Chain & Logistics</span>
                <span className="course-tag">📊 International Accounting</span>
              </div>

              <h3>Hospitality & Tourism</h3>
              <p>Singapore's tourism sector is massive, with many PEIs offering 6-month paid internships (OJT - On-the-Job Training) built into the degree.</p>
              <div className="course-tags">
                <span className="course-tag">🏨 Hotel Management</span>
                <span className="course-tag">✈️ Tourism & Events</span>
                <span className="course-tag">👨‍🍳 Culinary Arts</span>
              </div>

              <h3>Information Technology</h3>
              <div className="course-tags">
                <span className="course-tag">💻 Data Science</span>
                <span className="course-tag">🔒 Cyber Security</span>
                <span className="course-tag">⚙️ Software Engineering</span>
              </div>
            </div>

            {/* CHAPTER 4: ADMISSIONS & VISAS */}
            <div id="admissions" className="scroll-section">
              <h2>Navigating the Singapore Student Pass (STP)</h2>
              <p>The visa process for Singapore is highly streamlined and primarily digital. Instead of a traditional embassy visa, you apply for a <strong>Student Pass (STP)</strong> via the SOLAR (Student's Pass On-Line Application & Registration) system.</p>
              
              <h3>The Step-by-Step Visa Process</h3>
              <div className="timeline">
                <div className="timeline-step">
                  <div className="step-num">1</div>
                  <div className="step-content"><strong>Secure Admission:</strong> Get an offer letter from an EduTrust certified PEI or Public University.</div>
                </div>
                <div className="timeline-step">
                  <div className="step-num">2</div>
                  <div className="step-content"><strong>SOLAR Registration:</strong> Your institute registers your details in the SOLAR system. You log in to submit e-Form 16.</div>
                </div>
                <div className="timeline-step">
                  <div className="step-num">3</div>
                  <div className="step-content"><strong>IPA Letter Approval:</strong> ICA processes the visa (usually 2-4 weeks). Once approved, you receive an In-Principle Approval (IPA) letter.</div>
                </div>
                <div className="timeline-step">
                  <div className="step-num">4</div>
                  <div className="step-content"><strong>Travel to Singapore:</strong> The IPA letter acts as your single-entry visa to enter Singapore.</div>
                </div>
                <div className="timeline-step">
                  <div className="step-num">5</div>
                  <div className="step-content"><strong>Medical & Pass Collection:</strong> Complete your medical checkup in Singapore, pay the issuance fee, and collect your physical Student Pass.</div>
                </div>
              </div>
            </div>

            {/* CHAPTER 5: DOCUMENTS */}
            <div id="documents" className="scroll-section">
              <h2>Official Document Checklist</h2>
              <p>The Singapore visa process relies heavily on accurate, un-forged documentation. Here is what you need:</p>
              
              <h3>University Admission Checklist</h3>
              <ul className="doc-list">
                <li>10th & 12th Grade Marksheets</li>
                <li>Bachelor’s Degree & Transcripts (For PG)</li>
                <li>Valid Passport</li>
                <li>MOI (Medium of Instruction) Letter (To waive IELTS)</li>
                <li>Updated Resume / CV</li>
                <li>Passport-sized Photograph (White background)</li>
              </ul>

              <h3>Student Pass (SOLAR) Checklist</h3>
              <ul className="doc-list">
                <li>Printed e-Form 16 and e-Form V36</li>
                <li>In-Principle Approval (IPA) Letter</li>
                <li>Original Birth Certificate (Translated if not in English)</li>
                <li>Bank Statements (If requested by ICA, though often waived for India)</li>
                <li>Medical Examination Report</li>
              </ul>
            </div>

            {/* CHAPTER 6: CAREERS */}
            <div id="careers" className="scroll-section">
              <h2>Work Rights, Employment Pass (EP), and PR</h2>
              <p>Understanding the work rules in Singapore is critical, as they differ greatly from western countries. The government strictly regulates the labor market to prioritize high-skilled talent.</p>
              
              <div className="content-highlight">
                <p><strong>Crucial Fact on Part-Time Work:</strong> International students enrolled in Private Education Institutions (PEIs) are <strong>strictly prohibited</strong> from working part-time in Singapore. Do not fall for scams promising part-time jobs during PEI studies.</p>
              </div>

              <h3>On-The-Job Training (OJT)</h3>
              <p>While you cannot work part-time at a PEI, many Hospitality and Business programs feature mandatory 6-month OJT modules. These are legal, full-time paid internships arranged by the college, paying around SGD 800 - 1,200 per month.</p>

              <h3>Full-Time Work Post-Graduation (EP & S-Pass)</h3>
              <p>Singapore does not have a generic "Post-Study Work Visa." Instead, upon graduation, your prospective employer must sponsor your work visa:</p>
              <ul className="doc-list">
                <li><strong>Employment Pass (EP):</strong> For highly skilled professionals earning a minimum qualifying salary (approx SGD 5,000+).</li>
                <li><strong>S-Pass:</strong> For mid-level skilled staff earning a minimum of SGD 3,150.</li>
              </ul>

              <h3>Pathways to Permanent Residency (PR)</h3>
              <p>You can apply for Singapore PR once you have been working in the country on an EP or S-Pass for at least 6 months. Approval is based on your economic contribution, skills, and industry demand.</p>
            </div>

            {/* CHAPTER 7: FAQS */}
            <div id="faqs" className="scroll-section">
              <h2>Frequently Asked Questions (FAQs)</h2>
              
              <div className="faq-card">
                <h4>Is IELTS strictly mandatory for Singapore?</h4>
                <p>No. The vast majority of PEIs in Singapore will waive the IELTS requirement if you provide a Medium of Instruction (MOI) letter from your previous Indian school/college proving you studied in English.</p>
              </div>
              
              <div className="faq-card">
                <h4>Do I need to show heavy bank funds for the visa?</h4>
                <p>Unlike Canada or the UK, Indian students applying to Singapore PEIs are frequently approved without needing to show heavy "show money." However, ICA reserves the right to ask for bank statements (approx SGD 30,000) on a case-by-case basis.</p>
              </div>

              <div className="faq-card">
                <h4>Can I transition from Singapore to Australia/UK?</h4>
                <p>Yes! Many students use Singapore as a stepping stone. Because PEIs offer dual-degrees from partner universities (like University of London or Curtin Australia), you can easily transfer your credits to the main campus in year 2 or 3.</p>
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
              Every country offers unique opportunities. Compare Singapore with other top global study destinations to find your perfect fit.
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
                Ready to Apply to Singapore?
              </h2>
              <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.7)", margin: 0, lineHeight: 1.6, maxWidth: "480px" }}>
                Connect with our certified experts to secure your admission letter, build your SOLAR document file, and confidently lodge your Singapore Student Pass.
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