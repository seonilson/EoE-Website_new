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
  { icon: "🏛️", label: "Capital", value: "Tokyo" },
  { icon: "💵", label: "Currency", value: "JPY (Japanese Yen)" },
  { icon: "🗣️", label: "Language", value: "Japanese & English" },
  { icon: "🌸", label: "Weather", value: "Four Distinct Seasons" },
  { icon: "🎓", label: "Top Intakes", value: "April (Spring) & September (Fall)" },
];

// ── Data: Section Navigation ──────────────────────────────────
const tabsData = [
  { id: "overview", icon: "🚄", label: "Why Japan?" },
  { id: "institutions", icon: "🏛️", label: "Imperial & Top Unis" },
  { id: "courses", icon: "🎯", label: "Top Courses" },
  { id: "admissions", icon: "📝", label: "CoE & Visa Process" },
  { id: "documents", icon: "📂", label: "Documents" },
  { id: "careers", icon: "💼", label: "Careers & PR" },
  { id: "faqs", icon: "❓", label: "FAQs" }
];

// ── Data: Other Destinations (Swipe Track) ────────────────────
const otherDestinations = [
  { id: "south-korea", name: "South Korea", flag: "/images/flags/kr.png" },
  { id: "singapore", name: "Singapore", flag: "/images/flags/sg.png" },
  { id: "germany", name: "Germany", flag: "/images/flags/de.png" },
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

// ═══════════════════════════════════════════════════════════════
//  JAPAN MASTER COUNTRY PAGE 
// ═══════════════════════════════════════════════════════════════
export default function CountryJapanPage() {
useEffect(() => { document.title = "Study in Japan 2026 — Student Visa, MEXT Scholarship & Universities | Edification Overseas"; }, []);

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
                The Innovation & Cultural Powerhouse
              </span>
            </div>

            <h1 style={{
              fontSize: "clamp(40px, 5vw, 64px)", fontWeight: 900, color: "#ffffff", lineHeight: 1.1,
              letterSpacing: "-1px", marginBottom: "24px",
              animation: heroRef.inView ? "fadeSlideUp 0.55s ease 0.2s both" : "none",
            }}>
              Study in <br/>
              <span style={{ color: "#07CBEB", position: "relative", display: "inline-block" }}>
                Japan
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
              Unleash your potential in a country that seamlessly blends cutting-edge technology with ancient traditions. A <strong>Japan Student Visa</strong> opens doors to English-taught degrees (G30/SGU), the highly prestigious <strong>MEXT Scholarship</strong>, and massive career opportunities driven by Japan's demand for global talent.
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
              {/* Ensure you upload a 'japan.png' (e.g. Mount Fuji / Tokyo Tower / Pagoda) in your public/images/monuments folder */}
              <Image 
                src="/images/monuments/japan.png" 
                alt="Japan Monument" 
                fill 
                style={{ objectFit: "contain" }} 
                priority
              />
            </div>

            {/* Floating Circular Country Flag */}
            <div style={{ position: "absolute", top: "10%", right: "10%", width: "90px", height: "90px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.2)", zIndex: 9, animation: "float2 7s infinite reverse", overflow: "hidden", boxShadow: "0 16px 40px rgba(0,0,0,0.3)" }}>
               <Image src="/images/flags/jp.png" alt="Japan Flag" fill style={{ objectFit: "cover" }} />
            </div>

            {/* Floating Glass Badges */}
            <div style={{ position: "absolute", top: "40px", left: "0px", zIndex: 3, animation: "float2 5s infinite" }}>
              <div style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.2)", padding: "12px 20px", borderRadius: "16px", display: "flex", alignItems: "center", gap: "10px", boxShadow: "0 16px 40px rgba(0,0,0,0.2)" }}>
                <span style={{ fontSize: "20px" }}>🏆</span>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "10px", color: "#07CBEB", textTransform: "uppercase", fontWeight: 800 }}>Global Prestige</span>
                  <span style={{ fontSize: "14px", fontWeight: 800, color: "#ffffff" }}>MEXT Scholarship</span>
                </div>
              </div>
            </div>

            <div style={{ position: "absolute", bottom: "60px", right: "0px", zIndex: 3, animation: "float1 7s infinite reverse" }}>
              <div style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.2)", padding: "12px 20px", borderRadius: "16px", display: "flex", alignItems: "center", gap: "10px", boxShadow: "0 16px 40px rgba(0,0,0,0.2)" }}>
                <span style={{ fontSize: "20px" }}>💼</span>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "10px", color: "#07CBEB", textTransform: "uppercase", fontWeight: 800 }}>Employment</span>
                  <span style={{ fontSize: "14px", fontWeight: 800, color: "#ffffff" }}>High Job Demand</span>
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
              Your Complete Guide to Education in Japan
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
              <h2>Why Study in Japan? A Future-Proof Destination</h2>
              <p>Japan is globally revered for its incredible technological advancements, impeccable safety, and rich cultural heritage. For Indian students, studying in Japan means accessing world-class education at a fraction of the cost of western universities, backed by massive employment opportunities created by Japan's aging demographic.</p>
              
              <h3>Key Advantages of Japanese Education</h3>
              <div className="info-grid">
                <div className="info-card">
                  <h4>💡 Unmatched Technological Infrastructure</h4>
                  <p>Home to giants like Toyota, Sony, and Nintendo. Universities offer unparalleled research facilities in robotics, AI, and engineering.</p>
                </div>
                <div className="info-card">
                  <h4>🌍 English-Taught Programs (SGU)</h4>
                  <p>The "Top Global University Project" has led to hundreds of degree programs being taught entirely in English, removing the language barrier.</p>
                </div>
                <div className="info-card">
                  <h4>🏆 The MEXT Scholarship</h4>
                  <p>One of the most generous scholarships in the world, covering 100% of tuition, flights, and a monthly living allowance.</p>
                </div>
                <div className="info-card">
                  <h4>🛡️ Exceptional Safety & Quality of Life</h4>
                  <p>Japan consistently ranks among the safest nations globally, with world-class public transport, healthcare, and incredibly clean cities.</p>
                </div>
              </div>
            </div>

            {/* CHAPTER 2: ACADEMICS & COST */}
            <div id="institutions" className="scroll-section">
              <h2>Top Universities: Imperial Giants & Private Elites</h2>
              <p>Japan’s higher education system features prestigious National Universities (often heavily funded by the government) and elite Private Universities that boast incredible global alumni networks.</p>
              
              <h3>The Elite National "Imperial" Universities</h3>
              <p>Highly competitive and research-driven, perfect for STEM, Science, and Medical research:</p>
              <div className="course-tags">
                <span className="course-tag-blue">🏛️ The University of Tokyo (UTokyo)</span>
                <span className="course-tag-blue">🏛️ Kyoto University</span>
                <span className="course-tag-blue">🏛️ Osaka University</span>
                <span className="course-tag-blue">🏛️ Tohoku University</span>
                <span className="course-tag-blue">🏛️ Nagoya University</span>
              </div>

              <h3>Top Private & Specialized Universities</h3>
              <p>These universities are heavily favored for Business, Humanities, and cutting-edge tech, with strong English program offerings:</p>
              <div className="course-tags">
                <span className="course-tag">🏫 Waseda University</span>
                <span className="course-tag">🏫 Keio University</span>
                <span className="course-tag">🏫 Science Tokyo (formerly Tokyo Tech)</span>
                <span className="course-tag">🏫 Sophia University</span>
                <span className="course-tag">🏫 Ritsumeikan University</span>
                <span className="course-tag">🏫 Kyushu University</span>
                <span className="course-tag">🏫 APU (Ritsumeikan Asia Pacific University)</span>
              </div>
              
              <h3>Estimated Financial Requirements</h3>
              <p>Japan offers incredibly competitive tuition rates compared to the US, UK, and Australia. *Note: Figures are approximate standard values in USD for easier calculation.*</p>
              
              <div className="stat-grid">
                <div className="stat-card">
                  <div className="stat-value">$4,000 - $6,000</div>
                  <div className="stat-label">Avg. Tuition / Year<br/>(National Universities)</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">$7,000 - $12,000</div>
                  <div className="stat-label">Avg. Tuition / Year<br/>(Private Universities)</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">$12,000 - $15,000</div>
                  <div className="stat-label">Mandatory Funds Proof<br/>(For Visa Application)</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">$600 - $900</div>
                  <div className="stat-label">Estimated Living Cost<br/>(Per Month in USD)</div>
                </div>
              </div>

              <div className="content-highlight">
                <p><strong>Affordable Living outside Tokyo:</strong> While central Tokyo is expensive, studying in cities like Kyoto, Osaka, or Fukuoka can reduce your monthly living expenses by 20% to 30%, making Japan highly accessible for middle-class Indian families.</p>
              </div>
            </div>

            {/* CHAPTER 3: COURSES */}
            <div id="courses" className="scroll-section">
              <h2>High-Demand Courses in Japan</h2>
              <p>Aligning your education with Japan's primary industries—technology, manufacturing, and global trade—ensures a massive advantage in the job market.</p>
              
              <h3>Robotics, AI & Engineering</h3>
              <p>Japan is the undisputed global king of robotics and automotive engineering.</p>
              <div className="course-tags">
                <span className="course-tag">🤖 Robotics & Mechatronics</span>
                <span className="course-tag">🚗 Automotive Engineering</span>
                <span className="course-tag">💻 Artificial Intelligence & IT</span>
              </div>

              <h3>Business & Economics</h3>
              <p>With a massive global corporate presence, bilingual business graduates are in high demand.</p>
              <div className="course-tags">
                <span className="course-tag">📈 International Business</span>
                <span className="course-tag">💰 Finance & Economics</span>
                <span className="course-tag">🌍 Global Governance</span>
              </div>

              <h3>Creative Arts, Animation & Design</h3>
              <p>For those passionate about the creative industry, Japan is the holy grail.</p>
              <div className="course-tags">
                <span className="course-tag">🎨 Animation & Manga Studies</span>
                <span className="course-tag">🎮 Game Design & Development</span>
                <span className="course-tag">🏛️ Architecture & Industrial Design</span>
              </div>
            </div>

            {/* CHAPTER 4: ADMISSIONS & VISAS */}
            <div id="admissions" className="scroll-section">
              <h2>Navigating the CoE and Japan Student Visa</h2>
              <p>The Japanese visa process is unique. You do not apply directly to the embassy first. Instead, you must obtain a <strong>Certificate of Eligibility (CoE)</strong>, which your university procures for you from the Japanese Immigration Bureau.</p>
              
              <h3>The Step-by-Step Visa Pathway</h3>
              <div className="timeline">
                <div className="timeline-step">
                  <div className="step-num">1</div>
                  <div className="step-content"><strong>University Admission:</strong> Apply, pass the screening (and interviews), and receive your official admission letter from the Japanese university.</div>
                </div>
                <div className="timeline-step">
                  <div className="step-num">2</div>
                  <div className="step-content"><strong>CoE Application:</strong> Send your financial and academic documents to your university. The university applies for the <strong>Certificate of Eligibility (CoE)</strong> on your behalf in Japan.</div>
                </div>
                <div className="timeline-step">
                  <div className="step-num">3</div>
                  <div className="step-content"><strong>Receive the CoE:</strong> After 1-3 months, the Japanese Immigration Bureau approves the CoE and the university mails the physical or digital certificate to you in India.</div>
                </div>
                <div className="timeline-step">
                  <div className="step-num">4</div>
                  <div className="step-content"><strong>Visa Lodgment (VFS):</strong> Submit the CoE, your passport, and the visa application form to the VFS Global center for the Japanese Embassy in India.</div>
                </div>
                <div className="timeline-step">
                  <div className="step-num">5</div>
                  <div className="step-content"><strong>Visa Issuance:</strong> Because the CoE is pre-approved by immigration, the final visa stamping in India usually takes only 4 to 7 working days.</div>
                </div>
              </div>
            </div>

            {/* CHAPTER 5: DOCUMENTS */}
            <div id="documents" className="scroll-section">
              <h2>Official Document Checklist</h2>
              <p>Japanese immigration is meticulous. Any irregularities in your financial sponsor's documents can lead to a CoE rejection.</p>
              
              <h3>For the CoE Application (Sent to University)</h3>
              <ul className="doc-list">
                <li>Application Form & Passport Copy</li>
                <li>Academic Transcripts & Degree Certificates</li>
                <li>Financial Sponsor Letter (Usually a parent)</li>
                <li>Bank statements showing sufficient funds (~$12,000 - $15,000 USD equivalent)</li>
                <li>Income Tax Returns (ITR) and Employment Certificate of the sponsor</li>
                <li>Proof of Relationship (Birth Certificate)</li>
              </ul>

              <h3>For the Embassy Visa Stamping (In India)</h3>
              <ul className="doc-list">
                <li>Original Passport</li>
                <li>Original and Copy of the <strong>Certificate of Eligibility (CoE)</strong></li>
                <li>Completed Visa Application Form with Photo</li>
                <li>Admission Letter from the University</li>
              </ul>
            </div>

            {/* CHAPTER 6: CAREERS */}
            <div id="careers" className="scroll-section">
              <h2>Post-Study Work & Settlement in Japan</h2>
              <p>Due to its declining birth rate, Japan is urgently seeking young, educated international talent to sustain its economy, making it one of the best countries for long-term career settlement.</p>

              <h3>Part-Time Work During Studies</h3>
              <p>International students can work up to <strong>28 hours per week</strong> during the semester and up to 40 hours during long holidays. <strong>Important:</strong> You must apply for "Permission to Engage in Activity Other Than That Permitted Under the Status of Residence" at the airport immigration counter when you arrive.</p>

              <div className="content-highlight">
                <p><strong>The "Designated Activities" Visa (Job Hunting):</strong> If you haven't secured a job before graduation, Japan allows you to change your student visa to a "Designated Activities" visa. This gives you <strong>6 months (extendable up to 1 year)</strong> to stay in Japan exclusively to hunt for full-time employment.</p>
              </div>

              <h3>Full-Time Work Visa</h3>
              <p>Once hired by a Japanese company, your visa is converted to a standard Work Visa (e.g., "Engineer/Specialist in Humanities/International Services"). Your employer sponsors this process.</p>

              <h3>Pathways to Permanent Residency (PR)</h3>
              <p>Typically, PR requires 10 years of residency. However, Japan has introduced a <strong>Highly Skilled Professional (HSP) Point System</strong>. If you score enough points (based on your Japanese degree, salary, age, and JLPT proficiency), you can fast-track your PR application in just <strong>1 to 3 years</strong>.</p>
            </div>

            {/* CHAPTER 7: FAQS */}
            <div id="faqs" className="scroll-section">
              <h2>Frequently Asked Questions (FAQs)</h2>
              
              <div className="faq-card">
                <h4>Do I absolutely need to speak Japanese?</h4>
                <p>To get admitted to an English-taught degree, no. However, learning Japanese (aiming for JLPT N2 level) is essentially mandatory if you want to secure a high-paying corporate job in Japan after graduation.</p>
              </div>
              
              <div className="faq-card">
                <h4>What is the MEXT Scholarship?</h4>
                <p>The Ministry of Education, Culture, Sports, Science and Technology (MEXT) scholarship is a fully-funded government grant for international students. You can apply via the Embassy recommendation route in India or directly through university recommendation. It is highly competitive.</p>
              </div>

              <div className="faq-card">
                <h4>Can I bring dependents on a student visa?</h4>
                <p>If you are studying at the Master's or PhD level, you are generally allowed to invite your spouse and children to Japan on a Dependent Visa. Undergraduate students typically cannot sponsor dependents.</p>
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
              Every country offers unique opportunities. Compare Japan with other top global study destinations to find your perfect fit.
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
                Ready to Apply to Japan?
              </h2>
              <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.7)", margin: 0, lineHeight: 1.6, maxWidth: "480px" }}>
                Connect with our certified experts to secure your university admission, flawlessly process your CoE application, and obtain your Japan Student Visa.
              </p>
            </div>

            <Link href="/book-consultation" style={{
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