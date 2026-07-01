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
  { icon: "🏛️", label: "Capital", value: "Seoul" },
  { icon: "💵", label: "Currency", value: "KRW (South Korean Won)" },
  { icon: "🗣️", label: "Language", value: "Korean & English" },
  { icon: "🌸", label: "Weather", value: "Four Distinct Seasons" },
  { icon: "🎓", label: "Top Intakes", value: "Spring (March) & Fall (Sept)" },
];

// ── Data: Section Navigation ──────────────────────────────────
const tabsData = [
  { id: "overview", icon: "🚀", label: "Why South Korea?" },
  { id: "institutions", icon: "🏛️", label: "SKY & Top Unis" },
  { id: "courses", icon: "🎯", label: "Top Courses" },
  { id: "admissions", icon: "📝", label: "D-2 Student Visa" },
  { id: "documents", icon: "📂", label: "Documents" },
  { id: "careers", icon: "💼", label: "D-10 & Careers" },
  { id: "faqs", icon: "❓", label: "FAQs" }
];

// ── Data: Other Destinations (Swipe Track) ────────────────────
const otherDestinations = [
  { id: "japan", name: "Japan", flag: "/images/flags/jp.png" },
  { id: "singapore", name: "Singapore", flag: "/images/flags/sg.png" },
  { id: "united-kingdom", name: "United Kingdom", flag: "/images/flags/gb.png" },
  { id: "germany", name: "Germany", flag: "/images/flags/de.png" }
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
//  SOUTH KOREA MASTER COUNTRY PAGE 
// ═══════════════════════════════════════════════════════════════
export default function CountrySouthKoreaPage() {
useEffect(() => { document.title = "Study in South Korea 2026 — D-2 Visa, GKS Scholarship & SKY Universities | Edification Overseas"; }, []);

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
                The Tech & Cultural Hub of Asia
              </span>
            </div>

            <h1 style={{
              fontSize: "clamp(40px, 5vw, 64px)", fontWeight: 900, color: "#ffffff", lineHeight: 1.1,
              letterSpacing: "-1px", marginBottom: "24px",
              animation: heroRef.inView ? "fadeSlideUp 0.55s ease 0.2s both" : "none",
            }}>
              Study in <br/>
              <span style={{ color: "#07CBEB", position: "relative", display: "inline-block" }}>
                South Korea
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
              Experience world-class education powered by global tech giants. A <strong>South Korea Student Visa (D-2)</strong> offers Indian students highly affordable tuition, English-taught programs, massive scholarship opportunities, and a thriving international career landscape.
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
              {/* Ensure you upload a 'south-korea.png' (e.g. N Seoul Tower or Gyeongbokgung Palace) in your public/images/monuments folder */}
              <Image 
                src="/images/monuments/south-korea.png" 
                alt="South Korea Monument" 
                fill 
                style={{ objectFit: "contain" }} 
                priority
              />
            </div>

            {/* Floating Circular Country Flag */}
            <div style={{ position: "absolute", top: "10%", right: "10%", width: "90px", height: "90px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.2)", zIndex: 9, animation: "float2 7s infinite reverse", overflow: "hidden", boxShadow: "0 16px 40px rgba(0,0,0,0.3)" }}>
               <Image src="/images/flags/kr.png" alt="South Korea Flag" fill style={{ objectFit: "cover" }} />
            </div>

            {/* Floating Glass Badges */}
            <div style={{ position: "absolute", top: "40px", left: "0px", zIndex: 3, animation: "float2 5s infinite" }}>
              <div style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.2)", padding: "12px 20px", borderRadius: "16px", display: "flex", alignItems: "center", gap: "10px", boxShadow: "0 16px 40px rgba(0,0,0,0.2)" }}>
                <span style={{ fontSize: "20px" }}>🏆</span>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "10px", color: "#07CBEB", textTransform: "uppercase", fontWeight: 800 }}>Global Standing</span>
                  <span style={{ fontSize: "14px", fontWeight: 800, color: "#ffffff" }}>GKS Scholarships</span>
                </div>
              </div>
            </div>

            <div style={{ position: "absolute", bottom: "60px", right: "0px", zIndex: 3, animation: "float1 7s infinite reverse" }}>
              <div style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.2)", padding: "12px 20px", borderRadius: "16px", display: "flex", alignItems: "center", gap: "10px", boxShadow: "0 16px 40px rgba(0,0,0,0.2)" }}>
                <span style={{ fontSize: "20px" }}>💼</span>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "10px", color: "#07CBEB", textTransform: "uppercase", fontWeight: 800 }}>Post-Study Visa</span>
                  <span style={{ fontSize: "14px", fontWeight: 800, color: "#ffffff" }}>D-10 Job Seeker</span>
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
              Your Complete Guide to Education in South Korea
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
              <h2>Why Study in South Korea? The Innovation Capital</h2>
              <p>For Indian students, studying in South Korea offers an incredible blend of high-tech academic infrastructure, rich cultural heritage (the "Korean Wave" or Hallyu), and highly affordable living costs compared to the US and UK. With giants like Samsung, LG, and Hyundai headquartered here, graduates are perfectly positioned for global careers.</p>
              
              <h3>Key Advantages of South Korean Education</h3>
              <div className="info-grid">
                <div className="info-card">
                  <h4>💡 Tech & Innovation Hub</h4>
                  <p>Consistently ranked among the top countries for R&D. Universities have incredible funding and state-of-the-art laboratories.</p>
                </div>
                <div className="info-card">
                  <h4>💰 Highly Affordable</h4>
                  <p>Tuition fees and living expenses are remarkably lower than western countries, offering an unbeatable Return on Investment (ROI).</p>
                </div>
                <div className="info-card">
                  <h4>🏆 Global Scholarships</h4>
                  <p>Programs like the Global Korea Scholarship (GKS) cover full tuition, flights, and living stipends for talented international students.</p>
                </div>
                <div className="info-card">
                  <h4>🛡️ Exceptional Safety</h4>
                  <p>South Korea boasts one of the lowest crime rates globally, making it a highly secure and welcoming environment for Indian students.</p>
                </div>
              </div>
            </div>

            {/* CHAPTER 2: ACADEMICS & COST */}
            <div id="institutions" className="scroll-section">
              <h2>Top Universities: The "SKY" Elite & Tech Giants</h2>
              <p>South Korea’s higher education is globally respected. While many courses are taught in Korean, top universities now offer hundreds of programs 100% in English, specifically catering to the international student market.</p>
              
              <h3>The Legendary "SKY" Universities</h3>
              <p>The three most prestigious and competitive universities in South Korea:</p>
              <div className="course-tags">
                <span className="course-tag-blue">🏛️ Seoul National University (SNU)</span>
                <span className="course-tag-blue">🏛️ Korea University (KU)</span>
                <span className="course-tag-blue">🏛️ Yonsei University</span>
              </div>

              <h3>Top Institutes for Indian Students</h3>
              <p>These universities are immensely popular for their strong English-taught curriculums, massive international student communities, and STEM dominance:</p>
              <div className="course-tags">
                <span className="course-tag">🏫 KAIST (Korea Advanced Institute of Science & Technology)</span>
                <span className="course-tag">🏫 Sungkyunkwan University (SKKU)</span>
                <span className="course-tag">🏫 Hanyang University</span>
                <span className="course-tag">🏫 Kyung Hee University</span>
                <span className="course-tag">🏫 POSTECH (Pohang University)</span>
                <span className="course-tag">🏫 KDI School of Public Policy and Management</span>
                <span className="course-tag">🏫 Ewha Womans University</span>
              </div>
              
              <h3>Estimated Financial Requirements</h3>
              <p>Compared to studying in the west, South Korea is incredibly budget-friendly. *Note: Figures are approximate standard values in USD for easier calculation.*</p>
              
              <div className="stat-grid">
                <div className="stat-card">
                  <div className="stat-value">$4,000 - $8,000</div>
                  <div className="stat-label">Avg. Tuition / Year<br/>(Bachelors in USD)</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">$5,000 - $10,000</div>
                  <div className="stat-label">Avg. Tuition / Year<br/>(Masters in USD)</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">$10,000 - $20,000</div>
                  <div className="stat-label">Mandatory Funds Proof<br/>(For Visa Application)</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">$800 - $1,200</div>
                  <div className="stat-label">Estimated Living Cost<br/>(Per Month in USD)</div>
                </div>
              </div>

              <div className="content-highlight">
                <p><strong>Visa Financial Proof:</strong> To secure your D-2 Student Visa, the Korean Embassy requires proof of financial capacity. Generally, you must show a bank balance of <strong>$20,000 USD</strong> if studying in the capital (Seoul), or <strong>$18,000 USD</strong> if studying in provincial cities outside Seoul.</p>
              </div>
            </div>

            {/* CHAPTER 3: COURSES */}
            <div id="courses" className="scroll-section">
              <h2>High-Demand Courses in South Korea</h2>
              <p>South Korea’s economy relies heavily on exports, heavy engineering, and digital technology. Choosing a program aligned with these industries guarantees massive career growth.</p>
              
              <h3>Engineering, IT & Robotics</h3>
              <p>Institutions like KAIST and SNU are global leaders in STEM.</p>
              <div className="course-tags">
                <span className="course-tag">🤖 Artificial Intelligence & Robotics</span>
                <span className="course-tag">💻 Software Engineering & Computer Science</span>
                <span className="course-tag">⚡ Electrical & Mechanical Engineering</span>
              </div>

              <h3>Business, Trade & International Relations</h3>
              <p>With its massive export economy, Korea is ideal for corporate studies.</p>
              <div className="course-tags">
                <span className="course-tag">📈 International Business Administration</span>
                <span className="course-tag">🌍 Global Studies & Relations</span>
                <span className="course-tag">📦 Supply Chain & Logistics</span>
              </div>

              <h3>Media, Arts & Cosmetology</h3>
              <p>The "K-Wave" has made Korea the epicenter of modern entertainment and beauty.</p>
              <div className="course-tags">
                <span className="course-tag">🎬 Media & Communication</span>
                <span className="course-tag">💄 K-Beauty & Cosmetology Arts</span>
                <span className="course-tag">🎮 Game Design & Animation</span>
              </div>
            </div>

            {/* CHAPTER 4: ADMISSIONS & VISAS */}
            <div id="admissions" className="scroll-section">
              <h2>Navigating the D-2 Student Visa Process</h2>
              <p>For degree programs (Bachelors, Masters, PhD), Indian students must apply for the <strong>D-2 Student Visa</strong>. The process requires meticulous document preparation, especially regarding financial proofs and the "Certificate of Admission".</p>
              
              <h3>The Step-by-Step Visa Pathway</h3>
              <div className="timeline">
                <div className="timeline-step">
                  <div className="step-num">1</div>
                  <div className="step-content"><strong>University Application & Acceptance:</strong> Apply to your chosen university. Upon passing interviews and document checks, receive your acceptance letter.</div>
                </div>
                <div className="timeline-step">
                  <div className="step-num">2</div>
                  <div className="step-content"><strong>Tuition Payment & CoA:</strong> Pay your first semester/year tuition fees. The university will then issue the <strong>Certificate of Admission (CoA)</strong>, the most crucial document for your visa.</div>
                </div>
                <div className="timeline-step">
                  <div className="step-num">3</div>
                  <div className="step-content"><strong>Document Legalization (Apostille):</strong> Ensure your Indian academic degrees and transcripts are officially Apostilled by the Ministry of External Affairs (MEA), India.</div>
                </div>
                <div className="timeline-step">
                  <div className="step-num">4</div>
                  <div className="step-content"><strong>Tuberculosis (TB) Test:</strong> Undergo a mandatory TB screening at a hospital specifically designated by the Korean Embassy in India.</div>
                </div>
                <div className="timeline-step">
                  <div className="step-num">5</div>
                  <div className="step-content"><strong>Visa Lodgment (VFS):</strong> Submit your complete file (CoA, TB Test, Apostilled Docs, Bank Statements) to the VFS Global center for the Korean Embassy.</div>
                </div>
              </div>
            </div>

            {/* CHAPTER 5: DOCUMENTS */}
            <div id="documents" className="scroll-section">
              <h2>Official Document Checklist</h2>
              <p>The Korean Embassy in India is extremely strict regarding document authenticity. Any discrepancy in financial proofs will result in a visa rejection.</p>
              
              <h3>Academic & Identity Documents</h3>
              <ul className="doc-list">
                <li>Valid Passport (Minimum 6 months validity)</li>
                <li><strong>Apostilled</strong> Academic Transcripts and Degrees</li>
                <li>Certificate of Admission (CoA) from the Korean University</li>
                <li>Business Registration Certificate of the Korean University</li>
                <li>Standardized Test Scores (IELTS, TOEFL, or TOPIK if applicable)</li>
                <li>Completed Visa Application Form & Passport Photos</li>
              </ul>

              <h3>Financial & Medical Proofs</h3>
              <ul className="doc-list">
                <li>Bank statements showing <strong>$20,000 USD</strong> equivalent (for Seoul) or $18,000 USD (Provincial)</li>
                <li>Income Tax Returns (ITR) of financial sponsors (Parents) for the last 3 years</li>
                <li>Family Relations Certificate (to prove relationship with sponsor)</li>
                <li><strong>Tuberculosis (TB) Test Certificate</strong> from a designated hospital</li>
              </ul>
            </div>

            {/* CHAPTER 6: CAREERS */}
            <div id="careers" className="scroll-section">
              <h2>Post-Study Work Visa (D-10) & Career Pathways</h2>
              <p>South Korea is actively opening its doors to international talent to combat demographic shifts. The transition from student to working professional is highly structured.</p>

              <h3>Part-Time Work During Studies</h3>
              <p>International students on a D-2 visa can work part-time (usually up to <strong>20 hours per week</strong> for undergrads, 30 for postgrads) only <strong>after completing 6 months</strong> of study in Korea. You must obtain official permission from your university and immigration office before starting any job.</p>

              <div className="content-highlight">
                <p><strong>The D-10 Job Seeker Visa:</strong> After graduation, if you haven't secured a job yet, you can easily apply for the D-10 Job Seeking Visa. This allows you to stay in South Korea for <strong>6 months</strong> to look for work. It can be renewed for up to a maximum of <strong>2 years</strong>.</p>
              </div>

              <h3>Full-Time Work (E-7 Professional Visa)</h3>
              <p>Once you secure employment in a field related to your degree, your employer will sponsor you to convert your D-10 (or D-2) into an <strong>E-7 (Specially Designated Activities) Visa</strong>, allowing you to work long-term as a professional.</p>

              <h3>Pathways to Permanent Residency (F-5)</h3>
              <p>South Korea operates a <strong>Points-Based System (F-2 Resident Visa)</strong>. By accumulating points through your Korean degree, age, income, and importantly, your <strong>Korean Language Proficiency (TOPIK)</strong>, you can transition to an F-2 visa, and eventually the F-5 Permanent Residency visa.</p>
            </div>

            {/* CHAPTER 7: FAQS */}
            <div id="faqs" className="scroll-section">
              <h2>Frequently Asked Questions (FAQs)</h2>
              
              <div className="faq-card">
                <h4>Do I need to know Korean to study there?</h4>
                <p>No, you do not need to know Korean to get admitted if you choose a 100% English-taught program. However, learning Korean (aiming for TOPIK Level 3 or 4) is highly recommended for daily survival, part-time jobs, and securing full-time employment after graduation.</p>
              </div>
              
              <div className="faq-card">
                <h4>What is the Global Korea Scholarship (GKS)?</h4>
                <p>GKS is a prestigious, fully-funded scholarship managed by the Korean government. It covers full tuition, monthly stipends, airfare, and even includes a mandatory 1-year Korean language training program before your degree starts. Competition is extremely high for Indian applicants.</p>
              </div>

              <div className="faq-card">
                <h4>Is the Apostille process mandatory for Indian students?</h4>
                <p>Yes. The Korean Embassy strictly requires that your highest degree certificates and marksheets be Apostilled by the Ministry of External Affairs (MEA) in India. Simple notarization by a lawyer is not accepted for the visa process.</p>
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
              Every country offers unique opportunities. Compare South Korea with other top global study destinations to find your perfect fit.
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
                Ready to Apply to South Korea?
              </h2>
              <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.7)", margin: 0, lineHeight: 1.6, maxWidth: "480px" }}>
                Connect with our certified experts to secure your admission letter, prepare your strict financial document file, and confidently lodge your D-2 Student Visa.
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