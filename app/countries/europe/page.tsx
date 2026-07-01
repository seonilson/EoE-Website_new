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

// ── Data: SEO Optimized Study Destinations ────────────────────
const destinations = [
  { id: "canada", region: "americas", name: "Study in Canada", flag: "/images/flags/ca.png", tagline: "Canada Study Visa & PR", desc: "Secure your Canada Study Visa to access world-class education, favorable immigration pathways, and up to 3 years of PGWP.", highlights: ["3-Year PGWP", "High PR Success Rate", "Tech & Healthcare Focus"] },
  { id: "united-kingdom", region: "europe", name: "Study in UK", flag: "/images/flags/gb.png", tagline: "UK Study Visa", desc: "A UK Study Visa grants you access to historical universities, 1-year master's degrees, and the highly coveted 2-year Graduate Route.", highlights: ["1-Year Master's", "2-Year Work Visa", "Russell Group"] },
  { id: "usa", region: "americas", name: "Study in USA", flag: "/images/flags/us.png", tagline: "USA F1 Student Visa", desc: "The ultimate destination for STEM. An F1 Study Visa offers flexible Ivy League curriculums and up to 3 years of OPT for STEM graduates.", highlights: ["3-Year STEM OPT", "Global Tech Hubs", "Flexible Study Options"] },
  { id: "australia", region: "apac", name: "Study in Australia", flag: "/images/flags/au.png", tagline: "Australia Study Visa", desc: "Obtain an Australia Study Visa to experience vibrant cities, exceptional 5-year post-study work rights, and high part-time wages.", highlights: ["Up to 5-Year PSW", "High Part-Time Wages", "Safe Campuses"] },
  { id: "singapore", region: "apac", name: "Study in Singapore", flag: "/images/flags/sg.png", tagline: "Singapore Study Visa", desc: "Fast-track your Singapore Study Visa to enter Asia's hyper-modern financial hub with elite global business and tech degrees.", highlights: ["Global Financial Hub", "Extremely Safe", "Close to India"] },
  { id: "new-zealand", region: "apac", name: "Study in New Zealand", flag: "/images/flags/nz.png", tagline: "NZ Student Visa", desc: "A peaceful environment with highly practical education systems. Secure your visa for excellent post-study work opportunities.", highlights: ["3-Year Work Visa", "In-Demand Skills", "Scenic Campuses"] },
  { id: "ireland", region: "europe", name: "Study in Ireland", flag: "/images/flags/ie.png", tagline: "Europe Study Visa", desc: "A prime Europe Study Visa choice. This English-speaking nation hosts European HQs for Google and Apple, offering a 2-year stay-back visa.", highlights: ["EU Tech HQ", "2-Year Stay Back", "English-Speaking"] },
  { id: "germany", region: "europe", name: "Study in Germany", flag: "/images/flags/de.png", tagline: "Germany Study Visa", desc: "Leverage a Germany Study Visa for free public university education, followed by an 18-month job-seeking visa in Europe's strongest economy.", highlights: ["Free Universities", "18-Month Job Visa", "Automotive Hub"] },
  { id: "cyprus", region: "europe", name: "Study in Cyprus", flag: "/images/flags/cy.png", tagline: "Affordable Europe Visa", desc: "A highly accessible Europe Study Visa offering premium education with very affordable tuition fees, ideal for business and hospitality.", highlights: ["Low Tuition Fees", "European Lifestyle", "Easy Admissions"] },
  { id: "georgia", region: "europe", name: "Study in Georgia", flag: "/images/flags/ge.png", tagline: "MBBS Study Visa", desc: "The top Europe Study Visa choice for Indian students seeking affordable, WHO-approved medical (MBBS) programs without entrance exams.", highlights: ["WHO Approved MBBS", "No Entrance Exams", "Low Living Cost"] },
  { id: "poland", region: "europe", name: "Study in Poland", flag: "/images/flags/pl.png", tagline: "Schengen Study Visa", desc: "Your gateway to a Europe Study Visa. Poland offers globally recognized IT and business degrees at a fraction of Western European costs.", highlights: ["Schengen Access", "Highly Affordable", "Growing IT Sector"] },
  { id: "mauritius", region: "africa", name: "Study in Mauritius", flag: "/images/flags/mu.png", tagline: "Island Campus Visa", desc: "Secure a study visa for international university branch campuses in a stunning, bilingual, and extremely safe island environment.", highlights: ["Global Campuses", "Bilingual Nation", "Tropical Lifestyle"] },
  { id: "italy", region: "europe", name: "Study in Italy", flag: "/images/flags/it.png", tagline: "Italy Study Visa", desc: "An incredible Europe Study Visa option. Enjoy highly subsidized education and massive scholarship opportunities for international students.", highlights: ["100% Scholarships", "Rich Heritage", "Top Design Schools"] },
  { id: "hungary", region: "europe", name: "Study in Hungary", flag: "/images/flags/hu.png", tagline: "Central Europe Visa", desc: "A premier Europe Study Visa destination known for the Stipendium Hungaricum scholarship, offering high-quality STEM programs.", highlights: ["Govt. Scholarships", "Central EU Location", "Strong STEM Focus"] }
];

const regions = [
  { id: "all", label: "All Destinations" },
  { id: "europe", label: "Europe Study Visas" },
  { id: "americas", label: "North America" },
  { id: "apac", label: "Asia & Pacific" },
  { id: "africa", label: "Middle East & Africa" }
];

// ── Section Wrapper ───────────────────────────────────────────
function Section({ children, bg = "#ffffff", style = {} }: { children: React.ReactNode; bg?: string; style?: React.CSSProperties }) {
  return (
    <section style={{ background: bg, position: "relative", overflow: "hidden", ...style }}>
      {children}
    </section>
  );
}

// ── Eyebrow (Light Theme) ─────────────────────────────────────
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

// ── Heading (Light Theme with Sub-letter Spacing) ─────────────
function Heading({ line1, line2 }: { line1: string; line2: string }) {
  return (
    <h2 style={{ fontSize: "clamp(32px, 4vw, 44px)", fontWeight: 900, color: "#022C45", lineHeight: 1.1, letterSpacing: "-0.8px", margin: "0 0 16px" }}>
      {line1}<br/>
      <span style={{ position: "relative", display: "inline-block", paddingBottom: "10px", background: "linear-gradient(100deg, #07CBEB 0%, #022C45 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
        {line2}
        <svg style={{ position: "absolute", bottom: "0px", left: 0, width: "100%" }} height="5" viewBox="0 0 300 5" preserveAspectRatio="none">
          <defs><linearGradient id="ulineCountries" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#07CBEB"/><stop offset="100%" stopColor="#022C45"/></linearGradient></defs>
          <path d="M0,3 Q75,0 150,3 Q225,7 300,3" stroke="url(#ulineCountries)" strokeWidth="3" fill="none" strokeLinecap="round"/>
        </svg>
      </span>
    </h2>
  );
}

// ═══════════════════════════════════════════════════════════════
//  STUDY ABROAD DESTINATIONS PAGE
// ═══════════════════════════════════════════════════════════════
export default function StudyAbroadPage() {
  useEffect(() => { document.title = "Study in Europe 2026 — Best Countries, Visas & Scholarships | Edification Overseas"; }, []);

  const heroRef = useInView(0.1);
  const gridRef = useInView(0.05);
  const ctaRef = useInView(0.1);

  const [activeRegion, setActiveRegion] = useState("all");
  
  // Filter logic for compact grid
  const filteredDestinations = destinations.filter(d => activeRegion === "all" || d.region === activeRegion);

  return (
    <main style={{ background: "#F9FAFB", overflowX: "hidden" }}>

      <style dangerouslySetInnerHTML={{ __html: `
        /* Entrance Animations */
        @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.85); } to { opacity: 1; transform: scale(1); } }
        
        /* Floating Animations for Hero Flags */
        @keyframes floatFlag1 { 0%, 100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-20px) scale(1.05); } }
        @keyframes floatFlag2 { 0%, 100% { transform: translateY(0) scale(1); } 50% { transform: translateY(15px) scale(0.95); } }
        @keyframes floatFlag3 { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-10px) rotate(5deg); } }
        @keyframes glowPulse { 0%, 100% { box-shadow: 0 0 20px rgba(7,203,235,0.2); } 50% { box-shadow: 0 0 40px rgba(7,203,235,0.6); } }

        /* ── REGIONAL FILTER TABS ── */
        .filter-track {
          display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-top: 40px; margin-bottom: 48px;
        }
        .filter-btn {
          padding: 12px 24px; border-radius: 999px; font-size: 13.5px; font-weight: 800;
          background: #ffffff; border: 1px solid rgba(2,44,69,0.08); color: #4B5563;
          cursor: pointer; transition: all 0.3s ease; text-transform: uppercase; letter-spacing: 0.5px;
        }
        .filter-btn:hover { background: rgba(7,203,235,0.05); border-color: #07CBEB; color: #07CBEB; }
        .filter-btn.active {
          background: #022C45; color: #ffffff; border-color: #022C45; box-shadow: 0 8px 16px rgba(2,44,69,0.15);
        }

        /* ── COMPACT DESTINATION GRID CSS ── */
        .dest-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;
        }
        .dest-card {
          background: #ffffff; border-radius: 20px; padding: 32px 28px;
          border: 1px solid rgba(2,44,69,0.06); box-shadow: 0 8px 24px rgba(2,44,69,0.02);
          position: relative; overflow: hidden; display: flex; flex-direction: column;
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }
        
        /* HOVER FIX: Orange Outline */
        .dest-card:hover {
          transform: translateY(-6px); box-shadow: 0 20px 40px rgba(241,97,1,0.08);
          border-color: #F16101; 
        }
        .dest-card::before {
          content: ""; position: absolute; top: 0; left: 0; right: 0; height: 4px;
          background: #F16101; opacity: 0; transition: opacity 0.3s;
        }
        .dest-card:hover::before { opacity: 1; }
        
        /* ALIGNMENT FIX: Perfectly aligned flag and header text */
        .dest-header {
          display: flex; align-items: center; gap: 16px; margin-bottom: 20px;
        }
        .dest-flag {
          width: 56px; height: 56px; border-radius: 50%; border: 2px solid #f4fbfc;
          box-shadow: 0 4px 12px rgba(2,44,69,0.08); position: relative; overflow: hidden; flex-shrink: 0;
        }
        .dest-tagline {
          font-size: 11px; font-weight: 800; color: #07CBEB; text-transform: uppercase;
          letter-spacing: 1px; margin-bottom: 4px; line-height: 1.2;
        }
        .dest-title {
          font-size: 22px; font-weight: 900; color: #022C45; margin: 0; letter-spacing: -0.5px; line-height: 1.2;
        }
        
        .dest-desc {
          font-size: 14.5px; color: #4B5563; lineHeight: 1.6; margin: 0 0 24px; flex: 1;
        }

        /* HIGHLIGHTS FIX: Simple orange checkmarks */
        .dest-benefits {
          display: flex; flex-direction: column; gap: 8px; margin-bottom: 24px;
        }
        .dest-benefit-item {
          display: flex; align-items: center; gap: 10px;
        }
        .dest-benefit-icon {
          flex-shrink: 0; color: #F16101;
        }

        /* BUTTON FIX: Navy by default, Orange on Hover, Centered */
        .dest-btn-wrap {
          display: flex; justify-content: center; margin-top: auto; border-top: 1px solid rgba(2,44,69,0.04); padding-top: 20px;
        }
        .dest-btn {
          display: flex; align-items: center; justify-content: center; width: 100%;
          padding: 12px 24px; background: #022C45; color: #ffffff;
          border-radius: 10px; font-size: 13.5px; font-weight: 800; text-transform: uppercase;
          textDecoration: none; transition: all 0.3s ease; letter-spacing: 0.5px; text-align: center;
        }
        .dest-card:hover .dest-btn {
          background: #F16101; color: #ffffff;
        }

        @media (max-width: 1024px) {
          .dest-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .dest-grid { grid-template-columns: 1fr; }
          .filter-track { justify-content: flex-start; overflow-x: auto; padding-bottom: 12px; flex-wrap: nowrap; }
          .filter-btn { white-space: nowrap; flex-shrink: 0; }
          .europe-hero-right { display: none !important; }
          .europe-hero-left { flex: 0 0 100% !important; width: 100% !important; }
        }

        .cta-btn { transition: transform 0.18s cubic-bezier(0.4,0,0.2,1); }
        .cta-btn:hover { transform: translateY(-2px); }
      `}} />

      {/* ════════════════════════════════════════════════════════
          1. HERO — Premium Dark Mode "Constellation"
      ════════════════════════════════════════════════════════ */}
      <Section bg="#011624" style={{ padding: "0", minHeight: "80vh", display: "flex", alignItems: "center" }}>
        
        {/* Subtle glowing background effects */}
        <div style={{ position: "absolute", top: "20%", left: "-10%", width: "50vw", height: "50vw", background: "radial-gradient(circle, rgba(7,203,235,0.05) 0%, transparent 60%)", pointerEvents: "none" }}/>
        <div style={{ position: "absolute", bottom: "-10%", right: "-10%", width: "60vw", height: "60vw", background: "radial-gradient(circle, rgba(241,97,1,0.05) 0%, transparent 60%)", pointerEvents: "none" }}/>

        <div ref={heroRef.ref} style={{ maxWidth: "1280px", width: "100%", margin: "0 auto", padding: "clamp(40px, 8vw, 100px) 20px clamp(60px, 8vw, 100px)", position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: "clamp(24px, 5vw, 64px)", flexWrap: "wrap" }}>
          
          {/* LEFT: Premium White/Cyan SEO Text */}
          <div className="europe-hero-left" style={{ flex: "1 1 500px" }}>
            
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "999px", padding: "6px 16px", marginBottom: "24px",
              animation: heroRef.inView ? "fadeSlideUp 0.5s ease 0.1s both" : "none",
            }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#07CBEB", display: "inline-block", boxShadow: "0 0 10px #07CBEB" }}/>
              <span style={{ fontSize: "12px", fontWeight: 800, color: "rgba(255,255,255,0.9)", letterSpacing: "0.4px", textTransform: "uppercase" }}>
                Global Education Consultants
              </span>
            </div>

            <h1 style={{
              fontSize: "clamp(38px, 5vw, 64px)", fontWeight: 900, color: "#ffffff", lineHeight: 1.1,
              letterSpacing: "-1px", marginBottom: "24px",
              animation: heroRef.inView ? "fadeSlideUp 0.55s ease 0.2s both" : "none",
            }}>
              Discover Your<br/>
              <span style={{
                color: "#07CBEB", position: "relative", display: "inline-block",
                textShadow: "0 2px 16px rgba(7,203,235,0.2)", paddingBottom: "14px"
              }}>
                Dream Destinations
                <svg aria-hidden="true" style={{ position: "absolute", bottom: "0px", left: 0, width: "100%", overflow: "visible" }} height="6" viewBox="0 0 200 6" preserveAspectRatio="none">
                  <path d="M0,5 Q50,0 100,5 Q150,10 200,5" stroke="#07CBEB" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>

            <p style={{
              fontSize: "clamp(16px, 1.8vw, 18px)", color: "#ffffff", lineHeight: 1.75,
              marginBottom: "40px", maxWidth: "540px",
              animation: heroRef.inView ? "fadeSlideUp 0.55s ease 0.3s both" : "none",
            }}>
              From securing your fast-track <strong>Singapore Study Visa</strong> to pursuing a premium <strong>Europe Study Visa</strong>, or navigating the ultimate process to <strong>Study in Australia</strong>, we guide you to the perfect country for your academic and career goals.
            </p>
            
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", animation: heroRef.inView ? "fadeSlideUp 0.55s ease 0.4s both" : "none" }}>
              <Link href="/contact" className="cta-btn" style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                padding: "16px 32px", background: "#F16101", borderRadius: "12px",
                fontSize: "15px", fontWeight: 800, color: "white", textTransform: "uppercase", letterSpacing: "0.5px", textDecoration: "none"
              }}>
                Start Your Journey
              </Link>
            </div>
          </div>

          {/* RIGHT: Floating Flag Constellation */}
          <div className="europe-hero-right" style={{ 
            flex: "1 1 450px", position: "relative", minHeight: "500px", 
            animation: heroRef.inView ? "scaleIn 0.8s cubic-bezier(0.22,1,0.36,1) 0.3s both" : "none",
            opacity: heroRef.inView ? 1 : 0, display: "flex", justifyContent: "center", alignItems: "center"
          }}>
            {/* Central Glow */}
            <div style={{ position: "absolute", width: "300px", height: "300px", background: "rgba(7,203,235,0.15)", borderRadius: "50%", filter: "blur(40px)", animation: "glowPulse 4s infinite" }} />
            
            {/* Central Main Flag (Singapore) */}
            <div style={{ position: "absolute", width: "140px", height: "140px", borderRadius: "50%", border: "4px solid rgba(255,255,255,0.1)", zIndex: 10, animation: "floatFlag1 6s infinite", overflow: "hidden" }}>
               <Image src="/images/flags/sg.png" alt="Study in Singapore" fill style={{ objectFit: "cover" }} />
            </div>

            {/* Orbiting Flags */}
            <div style={{ position: "absolute", top: "10%", left: "10%", width: "90px", height: "90px", borderRadius: "50%", border: "3px solid rgba(255,255,255,0.1)", zIndex: 9, animation: "floatFlag2 7s infinite reverse", overflow: "hidden", boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }}>
               <Image src="/images/flags/gb.png" alt="Study in UK" fill style={{ objectFit: "cover" }} />
            </div>

            <div style={{ position: "absolute", top: "5%", right: "15%", width: "80px", height: "80px", borderRadius: "50%", border: "3px solid rgba(255,255,255,0.1)", zIndex: 8, animation: "floatFlag3 8s infinite", overflow: "hidden", boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }}>
               <Image src="/images/flags/cy.png" alt="Study in Cyprus" fill style={{ objectFit: "cover" }} />
            </div>

            <div style={{ position: "absolute", bottom: "15%", left: "5%", width: "100px", height: "100px", borderRadius: "50%", border: "3px solid rgba(255,255,255,0.1)", zIndex: 9, animation: "floatFlag3 5s infinite reverse", overflow: "hidden", boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }}>
               <Image src="/images/flags/au.png" alt="Study in Australia" fill style={{ objectFit: "cover" }} />
            </div>

            <div style={{ position: "absolute", bottom: "10%", right: "10%", width: "110px", height: "110px", borderRadius: "50%", border: "3px solid rgba(255,255,255,0.1)", zIndex: 8, animation: "floatFlag1 7.5s infinite", overflow: "hidden", boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }}>
               <Image src="/images/flags/de.png" alt="Study in Germany" fill style={{ objectFit: "cover" }} />
            </div>

            <div style={{ position: "absolute", top: "45%", right: "-5%", width: "70px", height: "70px", borderRadius: "50%", border: "2px solid rgba(255,255,255,0.1)", zIndex: 7, animation: "floatFlag2 6.5s infinite", overflow: "hidden", boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }}>
               <Image src="/images/flags/ca.png" alt="Study in Canada" fill style={{ objectFit: "cover" }} />
            </div>
            
          </div>
        </div>

        {/* Diagonal Cut Bottom Transition to White */}
        <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", overflow: "hidden", lineHeight: 0, zIndex: 2 }}>
            <svg viewBox="0 0 1440 120" style={{ display: "block", width: "100%", height: "80px" }} preserveAspectRatio="none">
              <path d="M0,120 L1440,0 L1440,120 Z" fill="#F9FAFB"/>
            </svg>
        </div>
      </Section>

      {/* ════════════════════════════════════════════════════════
          2. THE COMPACT DESTINATION MATRIX & FILTERS
      ════════════════════════════════════════════════════════ */}
      <Section bg="#F9FAFB" style={{ padding: "60px 0 120px" }}>
        <div ref={gridRef.ref} style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
          
          <div style={{ textAlign: "center", animation: gridRef.inView ? "fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both" : "none", opacity: gridRef.inView ? 1 : 0 }}>
            <Eyebrow label="Top Choices" />
            <Heading line1="Explore 14+ Countries for" line2="Your Higher Education" />
            <p style={{ fontSize: "16px", color: "#6B7280", lineHeight: 1.6, maxWidth: "600px", margin: "10px auto 0" }}>
              Filter by region below to compare post-study work rights, academic excellence, and lifestyle to find your perfect international destination.
            </p>
          </div>

          {/* Regional Filter Tabs */}
          <div className="filter-track" style={{ animation: gridRef.inView ? "fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.1s both" : "none", opacity: gridRef.inView ? 1 : 0 }}>
            {regions.map(region => (
              <button 
                key={region.id}
                className={`filter-btn ${activeRegion === region.id ? 'active' : ''}`}
                onClick={() => setActiveRegion(region.id)}
              >
                {region.label}
              </button>
            ))}
          </div>

          {/* Filtered Compact Grid */}
          <div className="dest-grid">
            {filteredDestinations.map((dest, i) => (
              <div key={dest.id} className="dest-card" style={{
                animation: gridRef.inView ? `fadeUp 0.4s cubic-bezier(0.22,1,0.36,1) ${i * 0.05}s both` : "none",
                opacity: gridRef.inView ? 1 : 0
              }}>
                
                {/* Compact ALIGNED Header */}
                <div className="dest-header">
                  <div className="dest-flag">
                    <Image src={dest.flag} alt={`${dest.name} Flag`} fill style={{ objectFit: "cover" }} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <div className="dest-tagline">{dest.tagline}</div>
                    <h3 className="dest-title">{dest.name}</h3>
                  </div>
                </div>

                <p className="dest-desc">{dest.desc}</p>

                {/* HIGHLIGHT FIX: Vertical Checkmark List */}
                <div className="dest-benefits">
                  {dest.highlights.map((highlight, hIndex) => (
                    <div key={hIndex} className="dest-benefit-item">
                      <svg className="dest-benefit-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                      <span style={{ fontSize: "14px", fontWeight: 600, color: "#111827" }}>{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* BUTTON FIX: Navy Default, Orange Hover, Centered */}
                <div className="dest-btn-wrap">
                  <Link href={`/countries/${dest.id}`} className="dest-btn">
                    View Complete Guide →
                  </Link>
                </div>

              </div>
            ))}
          </div>

        </div>
      </Section>

      {/* ════════════════════════════════════════════════════════
          3. BOTTOM CTA BANNER 
      ════════════════════════════════════════════════════════ */}
      <Section bg="#ffffff" style={{ padding: "100px 0" }}>
        <div ref={ctaRef.ref} style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 24px" }}>
          
          <div style={{
            background: "linear-gradient(135deg, #022C45 0%, #054f77 100%)",
            borderRadius: "24px", padding: "56px 64px",
            display: "flex", alignItems: "center", justifyContent: "space-between", gap: "40px", flexWrap: "wrap",
            position: "relative", overflow: "hidden",
            boxShadow: "0 24px 48px rgba(7,203,235,0.15)",
            animation: ctaRef.inView ? "scaleIn 0.6s cubic-bezier(0.22,1,0.36,1) both" : "none", opacity: ctaRef.inView ? 1 : 0
          }}>
            <div style={{ position: "absolute", right: "-80px", top: "-80px", width: "320px", height: "320px", borderRadius: "50%", background: "radial-gradient(circle, rgba(7,203,235,0.2) 0%, transparent 70%)", pointerEvents: "none" }}/>
            <div style={{ position: "absolute", left: "-80px", bottom: "-80px", width: "240px", height: "240px", borderRadius: "50%", background: "radial-gradient(circle, rgba(7,203,235,0.1) 0%, transparent 70%)", pointerEvents: "none" }}/>

            <div style={{ position: "relative", zIndex: 1, flex: "1 1 400px" }}>
              <div style={{ display: "inline-block", background: "rgba(7,203,235,0.2)", color: "#8ce7f7", fontSize: "11px", fontWeight: 800, padding: "6px 12px", borderRadius: "6px", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "1px" }}>
                Free Profile Assessment
              </div>
              <h2 style={{ fontSize: "clamp(28px, 3.5vw, 36px)", fontWeight: 900, color: "white", letterSpacing: "-0.5px", margin: "0 0 16px" }}>
                Confused About Where to Apply?
              </h2>
              <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.7)", margin: 0, lineHeight: 1.6, maxWidth: "480px" }}>
                Connect with our certified counselors to evaluate your academic profile, budget, and career goals to shortlist the perfect universities and country for you.
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