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

// ── Data: Study Abroad Roadmap ────────────────────────────────
const roadmapSteps = [
  { step: "01", title: "Profile Assessment", desc: "Evaluating your academics and career goals to define the perfect global pathway." },
  { step: "02", title: "Course Selection", desc: "Mapping your interests to high-ROI programs with strong post-study work opportunities." },
  { step: "03", title: "Country Selection", desc: "Shortlisting destinations based on visa policies, PR pathways, and part-time work rights." },
  { step: "04", title: "Documents Prep", desc: "Expert drafting of your Statement of Purpose (SOP), LORs, and university forms." },
  { step: "05", title: "Visa Filing", desc: "Flawless visa application submission and rigorous mock embassy interview training." },
  { step: "06", title: "Post Arrival", desc: "Seamless landing support, accommodation setup, and pre-departure briefings." }
];

// ── Data: 12 Detailed SEO-Enriched Services ───────────────────
const detailedServices = [
  { 
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>,
    title: "Global Career Counselling", tagline: "Map Your Future", accent: "#F16101",
    desc: "Make an informed decision about your overseas education. We analyze your academic history and professional aspirations to recommend study abroad programs that offer the best global employability and Return on Investment (ROI).",
    benefits: ["Psychometric & Profile Evaluation", "Course vs. Career Mapping", "Post-Study Work Visa Guidance"]
  },
  { 
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>,
    title: "Language & Standardized Tests", tagline: "Achieve High Bands", accent: "#022C45",
    desc: "Your test scores are the gateway to top-tier global universities. We provide specialized resources, mock exams, and strategic guidance to help you clear crucial exams with exceptional scores.",
    benefits: ["IELTS, TOEFL, PTE & Duolingo Prep", "GRE, GMAT & SAT Guidance", "Score-Specific University Shortlisting"]
  },
  { 
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    title: "University Shortlisting & Admission", tagline: "Target The Best", accent: "#07CBEB",
    desc: "We help you apply to highly ranked, accredited international universities. Our team filters options based on tuition fees, acceptance rates, and course modules, ensuring a tailored fit for your profile.",
    benefits: ["Ivy League & Russell Group Admissions", "Public vs. Private College Analysis", "Application Fee Waiver Assistance"]
  },
  { 
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
    title: "Destination Selection", tagline: "Find Your Perfect Fit", accent: "#C9A24D",
    desc: "Different countries offer unique advantages. Whether you want the booming tech industry of the USA, the PR-friendly policies of Canada, or specialized, fast-track programs in Singapore, Cyprus, Mauritius, Belarus, Moldova, Russia, or Malta, we guide your destination choice.",
    benefits: ["USA F-1 & UK Tier 4 Visas", "Canada SDS & Non-SDS Pathways", "European & Asian Hub Expertise"]
  },
  { 
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>,
    title: "Scholarship & Financial Aid", tagline: "Fund Your Dreams", accent: "#F16101",
    desc: "Studying abroad doesn't have to be a financial burden. Our advisors proactively identify and apply for various grants, bursaries, and merit-based international scholarships to significantly reduce your tuition fees.",
    benefits: ["100% Fully-Funded Scholarships", "University-Specific Bursaries", "Government & NGO Grants"]
  },
  { 
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
    title: "SOP, LOR & Documentation", tagline: "Stand Out to Admissions", accent: "#022C45",
    desc: "Your paperwork makes or breaks your application. Our editorial team crafts compelling, plagiarism-free Statements of Purpose (SOP), formats impactful Resumes, and structures professional Letters of Recommendation (LOR).",
    benefits: ["Custom-Written, Plagiarism-Free SOPs", "Academic & Professional LORs", "Flawless Resume Structuring"]
  },
  { 
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
    title: "Education Loan Guidance", tagline: "Seamless Financial Support", accent: "#07CBEB",
    desc: "Showing Proof of Funds is critical for visa approval. We partner with leading Indian banks and NBFCs to fast-track your overseas education loan processing at the lowest possible interest rates.",
    benefits: ["Collateral & Non-Collateral Loans", "Proof of Funds Documentation", "Sanction Letters for I-20 & CAS"]
  },
  { 
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>,
    title: "Embassy Interview Prep", tagline: "Face Officers with Confidence", accent: "#C9A24D",
    desc: "A single mistake during a visa interview can lead to rejection. We conduct rigorous, simulated mock interviews to build your confidence, helping you articulate your study intentions clearly to embassy visa officers.",
    benefits: ["1-on-1 Mock Visa Interviews", "Country-Specific Questionnaire", "Body Language & Intent Coaching"]
  },
  { 
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>,
    title: "Student Visa Filing", tagline: "Zero Errors. High Success.", accent: "#F16101",
    desc: "Leverage our industry-leading 98% visa success rate. We handle complex application forms, biometric appointments, and embassy submissions with strict compliance for the UK, USA, Australia, New Zealand, Schengen countries, Europe, Germany, and Italy Study Visas.",
    benefits: ["Complete Document Checklists", "Biometric & VFS Appointment Setup", "Dependent & Spouse Visa Addition"]
  },
  { 
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    title: "Pre-Departure & Travel", tagline: "Fly Without the Stress", accent: "#022C45",
    desc: "Get ready to take off. Our pre-departure briefings cover everything from cultural assimilation to local laws. We also assist with booking discounted student flights and securing mandatory international health insurance.",
    benefits: ["Discounted Student Airfares", "OSHC / International Health Insurance", "Cultural Orientation & Packing Lists"]
  },
  { 
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    title: "Accommodation Setup", tagline: "Your Home Away from Home", accent: "#07CBEB",
    desc: "Arrive with peace of mind knowing your housing is secure. We help you find safe, budget-friendly student housing, whether you prefer on-campus dormitories or verified off-campus private apartments.",
    benefits: ["On-Campus & PBSA Bookings", "Private Apartment Lease Guidance", "Safe & Verified Neighborhoods"]
  },
  { 
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
    title: "Forex & Tuition Payments", tagline: "Secure Money Transfers", accent: "#C9A24D",
    desc: "Paying international tuition fees requires specific protocols. We facilitate fast, highly secure Swift transfers, provide the best Forex exchange rates, and guide you through country-specific banking requirements.",
    benefits: ["Canada GIC & Germany Blocked Accounts", "Wire Transfers & University Payments", "Forex Cards & International SIMs"]
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
          <defs><linearGradient id="ulineSrv" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#07CBEB"/><stop offset="100%" stopColor="#022C45"/></linearGradient></defs>
          <path d="M0,3 Q75,0 150,3 Q225,7 300,3" stroke="url(#ulineSrv)" strokeWidth="3" fill="none" strokeLinecap="round"/>
        </svg>
      </span>
    </h2>
  );
}

// ═══════════════════════════════════════════════════════════════
//  STUDENT VISA PAGE
// ═══════════════════════════════════════════════════════════════
export default function StudentVisaPage() {
  useEffect(() => { document.title = "Student Visa Consultancy — Study Abroad Expert Guidance | Edification Overseas"; }, []);

  const heroRef = useInView(0.1);
  const roadRef = useInView(0.1);
  const detailRef = useInView(0.05);
  const ctaRef = useInView(0.1);


  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <main style={{ background: "#ffffff", overflowX: "hidden" }}>

      <style>{`
        /* Entrance Animations */
        @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.85); } to { opacity: 1; transform: scale(1); } }
        @keyframes floatSlow { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
        @keyframes floatMedium { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-20px) rotate(3deg); } }
        @keyframes floatFast { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-25px) rotate(-4deg); } }
        @keyframes pulseGlowCyan { 0%, 100% { filter: drop-shadow(0 0 15px rgba(7,203,235,0.15)); } 50% { filter: drop-shadow(0 0 40px rgba(7,203,235,0.3)); } }
        @keyframes badgePulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.4); } }
        
        /* ── THE METRO LINE ROADMAP CSS ── */
        .metro-track {
          display: flex; position: relative; width: 100%; align-items: center; justify-content: space-between;
          padding: 220px 0; margin-top: 40px;
        }
        .metro-line {
          position: absolute; top: 50%; left: 5%; right: 5%; height: 4px; border-radius: 4px;
          background: linear-gradient(90deg, rgba(7,203,235,0.1), #07CBEB, rgba(7,203,235,0.1));
          transform: translateY(-50%); z-index: 0;
          box-shadow: 0 0 15px rgba(7,203,235,0.4);
        }
        .metro-node {
          position: relative; z-index: 1; display: flex; flex-direction: column; align-items: center;
          width: calc(100% / 6);
        }
        .metro-dot {
          width: 44px; height: 44px; border-radius: 50%; background: #ffffff;
          border: 3px solid #07CBEB; box-shadow: 0 0 0 6px rgba(7,203,235,0.15);
          display: flex; align-items: center; justify-content: center;
          font-weight: 900; color: #022C45; font-size: 14px; position: relative; z-index: 2;
        }
        .metro-stem-up, .metro-stem-down {
          position: absolute; width: 2px; background: rgba(7,203,235,0.4); z-index: 1;
        }
        .metro-stem-up { bottom: calc(50% + 22px); height: 50px; }
        .metro-stem-down { top: calc(50% + 22px); height: 50px; }

        .metro-card-up, .metro-card-down {
          position: absolute; width: 280px; background: #ffffff; border-radius: 16px;
          padding: 24px; border: 1px solid rgba(2,44,69,0.06);
          box-shadow: 0 12px 32px rgba(2,44,69,0.05); text-align: center;
          transition: transform 0.3s ease; z-index: 3;
        }
        .metro-card-up:hover, .metro-card-down:hover { transform: translateY(-4px); border-color: rgba(7,203,235,0.3); }
        .metro-card-up { bottom: calc(50% + 72px); }
        .metro-card-down { top: calc(50% + 72px); }

        /* Mobile Roadmap Fallback */
        @media (max-width: 960px) {
          .metro-track { flex-direction: column; padding: 40px 0; margin-top: 0; align-items: flex-start; gap: 32px; margin-left: 20px; }
          .metro-line { left: 21px; top: 0; bottom: 0; width: 4px; height: auto; transform: none; background: linear-gradient(180deg, #07CBEB, rgba(7,203,235,0.1)); }
          .metro-node { width: 100%; flex-direction: row; align-items: center; justify-content: flex-start; }
          .metro-stem-up, .metro-stem-down { display: none; }
          .metro-card-up, .metro-card-down { position: static; width: calc(100% - 60px); margin-left: 24px; text-align: left; padding: 20px; }
        }

        /* ── ZIG ZAG REFRESHED TIMELINE CSS ── */
        .zz-timeline-container { position: relative; padding: 40px 0; }
        .zz-timeline-line {
          position: absolute; left: 50%; top: 0; bottom: 0; width: 2px;
          transform: translateX(-50%);
          background: linear-gradient(180deg, rgba(7,203,235,0.05) 0%, rgba(7,203,235,0.4) 15%, rgba(7,203,235,0.4) 85%, rgba(7,203,235,0.05) 100%);
          z-index: 0;
        }
        .zz-row { display: flex; width: 100%; position: relative; margin-bottom: 60px; }
        .zz-row.left { justify-content: flex-start; }
        .zz-row.right { justify-content: flex-end; }
        
        .zz-dot {
          position: absolute; left: 50%; top: 40px; transform: translate(-50%, -50%);
          width: 20px; height: 20px; border-radius: 50%; background: #07CBEB;
          border: 5px solid #ffffff; box-shadow: 0 0 0 1px rgba(7,203,235,0.3); z-index: 2;
        }
        
        .zz-card {
          width: calc(50% - 60px); /* Creates the 120px central gap for the timeline */
          background: #ffffff; border-radius: 24px; padding: 40px;
          border: 1px solid rgba(2,44,69,0.06); box-shadow: 0 12px 32px rgba(2,44,69,0.03);
          position: relative; overflow: hidden; z-index: 1;
          transition: transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;
        }
        .zz-card:hover {
          transform: translateY(-6px); box-shadow: 0 24px 48px rgba(7,203,235,0.1); border-color: rgba(7,203,235,0.3);
        }
        
        .zz-card-mesh {
          position: absolute; top: -50px; right: -50px; width: 180px; height: 180px;
          border-radius: 50%; filter: blur(45px); opacity: 0.12; pointer-events: none; z-index: 0;
        }

        @media (max-width: 960px) {
          .zz-timeline-line { left: 24px; }
          .zz-row { flex-direction: column; justify-content: flex-start !important; margin-bottom: 32px; }
          .zz-dot { left: 24px; top: 40px; }
          .zz-card { width: calc(100% - 60px); margin-left: 60px; padding: 32px 24px; }
        }

        .cta-btn { transition: transform 0.18s cubic-bezier(0.4,0,0.2,1); }
        .cta-btn:hover { transform: translateY(-2px); }
      `}</style>

      {/* ════════════════════════════════════════════════════════
          1. HERO — Sleek Icy-Blue "Trust" Gradient
      ════════════════════════════════════════════════════════ */}
      <Section bg="linear-gradient(105deg, #ffffff 0%, #f2f9fb 45%, #dcf2f7 100%)" style={{ padding: "0" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: `linear-gradient(rgba(2,44,69,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(2,44,69,0.03) 1px, transparent 1px)`, backgroundSize: "64px 64px" }}/>
        
        <div ref={heroRef.ref} style={{ maxWidth: "1280px", margin: "auto", padding: isMobile ? "28px 20px 48px" : "60px 24px 80px", position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: isMobile ? "32px" : "64px", flexWrap: "wrap" }}>
          
          {/* LEFT: High-Converting SEO Text */}
          <div style={{ flex: isMobile ? "0 0 100%" : "1 1 500px", width: isMobile ? "100%" : undefined }}>
            
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "rgba(7,203,235,0.1)", border: "1px solid rgba(7,203,235,0.3)",
              borderRadius: "999px", padding: "6px 16px", marginBottom: "24px",
              animation: heroRef.inView ? "fadeSlideUp 0.5s ease 0.1s both" : "none",
            }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#07CBEB", display: "inline-block", animation: "badgePulse 1.6s infinite" }}/>
              <span style={{ fontSize: "12px", fontWeight: 800, color: "#022C45", letterSpacing: "0.4px", textTransform: "uppercase" }}>
                100% Transparent Admissions
              </span>
            </div>

            <h1 style={{
              fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 900, color: "#022C45", lineHeight: 1.12,
              letterSpacing: "-0.8px", marginBottom: "20px", overflow: "visible", paddingBottom: "14px",
              animation: heroRef.inView ? "fadeSlideUp 0.55s ease 0.2s both" : "none",
            }}>
              Your Gateway To<br/>
              Top Global<br/>
              <span style={{
                color: "#07CBEB", position: "relative", display: "inline-block",
                textShadow: "0 2px 16px rgba(7,203,235,0.2)",
              }}>
                Universities.
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
              Don't let complicated paperwork hold back your future. We specialize in end-to-end student visa processing, university shortlisting, and education loans, ensuring a seamless journey from India to your dream campus abroad.
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
                  }}>Evaluate My Profile</span>
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
            
            {/* Main Student Vector Image */}
            <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: "380px", aspectRatio: "1/1", animation: "floatSlow 8s infinite ease-in-out" }}>
              <Image 
                src="/images/student-hero-vector.png" 
                alt="Student Visa and University Admissions Guidance"
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </div>

            {/* Floating Glass Vectors */}
            <div style={{ position: "absolute", top: "40px", left: "20px", zIndex: 3, animation: "floatFast 5s infinite" }}>
              <div style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,1)", padding: "10px 16px", borderRadius: "999px", display: "flex", alignItems: "center", gap: "8px", boxShadow: "0 16px 40px rgba(2,44,69,0.08)" }}>
                <span style={{ fontSize: "16px" }}>✈️</span>
                <span style={{ fontSize: "12px", fontWeight: 800, color: "#022C45" }}>Global Visas</span>
              </div>
            </div>

            <div style={{ position: "absolute", top: "100px", right: "10px", zIndex: 3, animation: "floatMedium 7s infinite" }}>
              <div style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,1)", padding: "10px 16px", borderRadius: "999px", display: "flex", alignItems: "center", gap: "8px", boxShadow: "0 16px 40px rgba(2,44,69,0.08)" }}>
                <span style={{ fontSize: "16px" }}>🎓</span>
                <span style={{ fontSize: "12px", fontWeight: 800, color: "#022C45" }}>Admissions</span>
              </div>
            </div>

            <div style={{ position: "absolute", bottom: "90px", left: "10px", zIndex: 3, animation: "floatMedium 6s infinite reverse" }}>
              <div style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,1)", padding: "10px 16px", borderRadius: "999px", display: "flex", alignItems: "center", gap: "8px", boxShadow: "0 16px 40px rgba(2,44,69,0.08)" }}>
                <span style={{ fontSize: "16px" }}>💼</span>
                <span style={{ fontSize: "12px", fontWeight: 800, color: "#022C45" }}>B2B Network</span>
              </div>
            </div>

            <div style={{ position: "absolute", bottom: "40px", right: "40px", zIndex: 3, animation: "floatFast 8s infinite reverse" }}>
              <div style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,1)", padding: "10px 16px", borderRadius: "999px", display: "flex", alignItems: "center", gap: "8px", boxShadow: "0 16px 40px rgba(2,44,69,0.08)" }}>
                <span style={{ fontSize: "16px" }}>📝</span>
                <span style={{ fontSize: "12px", fontWeight: 800, color: "#022C45" }}>Legalization</span>
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
          2. THE METRO LINE ROADMAP (High-End Alternating UI)
      ════════════════════════════════════════════════════════ */}
      <Section bg="#F9FAFB" style={{ padding: isMobile ? "40px 0 32px" : "80px 0 60px" }}>
        <div ref={roadRef.ref} style={{ maxWidth: "1280px", margin: "0 auto", padding: isMobile ? "0 16px" : "0 24px" }}>
          
          <div style={{ textAlign: "center", animation: roadRef.inView ? "fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both" : "none", opacity: roadRef.inView ? 1 : 0 }}>
            <Eyebrow label="Your Journey" />
            <Heading line1="The Study Abroad Roadmap" line2="Step-by-Step" />
            <p style={{ fontSize: "16px", color: "#6B7280", lineHeight: 1.6, maxWidth: "600px", margin: "20px auto 0" }}>
              We eliminate confusion by breaking down the complex international admission and visa process into six transparent, manageable steps.
            </p>
          </div>

          <div className="metro-track" style={{
            animation: roadRef.inView ? "fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.2s both" : "none",
            opacity: roadRef.inView ? 1 : 0
          }}>
            {/* The Central Glowing Track */}
            <div className="metro-line" />
            
            {roadmapSteps.map((step, i) => {
              const isTop = i % 2 === 0; // Evens go UP, Odds go DOWN
              return (
                <div key={i} className="metro-node">
                  {/* The Central Dot */}
                  <div className="metro-dot">
                    {step.step}
                  </div>
                  
                  {/* The Connecting Stem */}
                  <div className={isTop ? "metro-stem-up" : "metro-stem-down"} />

                  {/* The Info Card */}
                  <div className={isTop ? "metro-card-up" : "metro-card-down"}>
                    <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#022C45", margin: "0 0 8px", lineHeight: 1.2 }}>
                      {step.title}
                    </h3>
                    <p style={{ fontSize: "12.5px", color: "#6B7280", lineHeight: 1.5, margin: 0 }}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </Section>

      {/* ════════════════════════════════════════════════════════
          3. ZIG ZAG REFRESHED TIMELINE (Text & Icons, No Images)
      ════════════════════════════════════════════════════════ */}
      <Section bg="#ffffff" style={{ padding: isMobile ? "48px 0 56px" : "100px 0 120px" }}>
        <div ref={detailRef.ref} style={{ maxWidth: "1200px", margin: "0 auto", padding: isMobile ? "0 16px" : "0 24px" }}>
          
          <div style={{ textAlign: "center", marginBottom: "80px", animation: detailRef.inView ? "fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both" : "none", opacity: detailRef.inView ? 1 : 0 }}>
            <Eyebrow label="Complete Support" />
            <Heading line1="End-to-End Solutions" line2="For Your Education Goals" />
            <p style={{ fontSize: "16px", color: "#6B7280", lineHeight: 1.6, maxWidth: "700px", margin: "20px auto 0" }}>
              Our certified counselors provide an all-inclusive suite of services. From your first IELTS mock test to securing an education loan and booking your final flight ticket, we are with you.
            </p>
          </div>

          <div className="zz-timeline-container">
            {/* The Central Visual Anchor Line */}
            <div className="zz-timeline-line" />

            {detailedServices.map((service, i) => {
              const isLeft = i % 2 === 0; // True if card should sit on the left half
              return (
                <div key={i} className={`zz-row ${isLeft ? 'left' : 'right'}`} style={{
                  animation: detailRef.inView ? `fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) ${i * 0.08}s both` : "none",
                  opacity: detailRef.inView ? 1 : 0,
                }}>
                  
                  {/* Center Timeline Node */}
                  <div className="zz-dot" />

                  {/* Wide Text Card */}
                  <div className="zz-card">
                    
                    {/* The soft background color mesh for a premium, image-less design */}
                    <div className="zz-card-mesh" style={{ background: service.accent }} />
                    
                    <div style={{ position: "relative", zIndex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "24px" }}>
                        <div style={{ width: "64px", height: "64px", flexShrink: 0, borderRadius: "16px", background: `${service.accent}15`, color: service.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          {service.icon}
                        </div>
                        <div>
                          <h3 style={{ fontSize: "24px", fontWeight: 900, color: "#022C45", margin: "0 0 6px", letterSpacing: "-0.5px" }}>{service.title}</h3>
                          <div style={{ fontSize: "13px", fontWeight: 800, color: service.accent, textTransform: "uppercase", letterSpacing: "1px" }}>{service.tagline}</div>
                        </div>
                      </div>

                      <p style={{ fontSize: "15.5px", color: "#4B5563", lineHeight: 1.75, margin: "0 0 28px" }}>
                        {service.desc}
                      </p>

                      <div style={{ borderTop: "1px solid rgba(2,44,69,0.06)", paddingTop: "24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
                        {service.benefits.map((benefit, bIndex) => (
                          <div key={bIndex} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                            <div style={{ 
                              width: "20px", height: "20px", borderRadius: "50%", background: `${service.accent}15`, 
                              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" 
                            }}>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={service.accent} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                            </div>
                            <span style={{ fontSize: "14.5px", fontWeight: 600, color: "#111827", lineHeight: 1.4 }}>{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </Section>

      {/* ════════════════════════════════════════════════════════
          4. BOTTOM CTA BANNER (Theme-Aligned & Centered)
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
            {/* Background orbs */}
            <div style={{ position: "absolute", right: "-80px", top: "-80px", width: "320px", height: "320px", borderRadius: "50%", background: "radial-gradient(circle, rgba(7,203,235,0.2) 0%, transparent 70%)", pointerEvents: "none" }}/>
            <div style={{ position: "absolute", left: "-80px", bottom: "-80px", width: "240px", height: "240px", borderRadius: "50%", background: "radial-gradient(circle, rgba(7,203,235,0.1) 0%, transparent 70%)", pointerEvents: "none" }}/>

            <div style={{ position: "relative", zIndex: 1, flex: "1 1 400px" }}>
              <div style={{ display: "inline-block", background: "rgba(7,203,235,0.2)", color: "#8ce7f7", fontSize: "11px", fontWeight: 800, padding: "6px 12px", borderRadius: "6px", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "1px" }}>
                Free Profile Assessment
              </div>
              <h2 style={{ fontSize: "clamp(28px, 3.5vw, 36px)", fontWeight: 900, color: "white", letterSpacing: "-0.5px", margin: "0 0 16px" }}>
                Ready to Start Your Application?
              </h2>
              <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.7)", margin: 0, lineHeight: 1.6, maxWidth: "480px" }}>
                Connect with our certified student visa experts today to discuss your university options, costs, and timeline. 
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