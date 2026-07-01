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

// ── Animated Counter ──────────────────────────────────────────
function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const steps = 60;
        const inc = target / steps;
        let cur = 0;
        const t = setInterval(() => {
          cur += inc;
          if (cur >= target) { setCount(target); clearInterval(t); }
          else setCount(Math.floor(cur));
        }, 1800 / steps);
      }
    }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

// ── Data ──────────────────────────────────────────────────────
const stats = [
  { num: 4000, suffix: "+", label: "Students Placed Globally", accent: "#F16101" },
  { num: 98,   suffix: "%", label: "Visa Success Rate", accent: "#C9A24D" },
  { num: 10,   suffix: "+", label: "Years Experience", accent: "#07CBEB" },
  { num: 30,   suffix: "+", label: "Study Destinations", accent: "#F16101" },
  { num: 100,  suffix: "+", label: "University Partners", accent: "#C9A24D" },
];

const certifications = [
  { label: "ISO 9001:2015", sub: "Quality Management" },
  { label: "ICEF Accredited", sub: "Global Standard" },
  { label: "IDP Certified", sub: "Counsellor" },
  { label: "British Council", sub: "UK Trained" },
];

const officialRep = [
  { country: "Singapore", flag: "/images/flags/sg.png" },
  { country: "Malaysia", flag: "/images/flags/my.png" },
  { country: "Cyprus", flag: "/images/flags/cy.png" },
  { country: "Mauritius", flag: "/images/flags/mu.png" },
  { country: "Malta", flag: "/images/flags/mt.png" },
  { country: "Belarus", flag: "/images/flags/by.png" },
  { country: "Russia", flag: "/images/flags/ru.png" },
];

const services = [
  {
    title: "Expert Student Counselling",
    desc: "Personalised career counselling to shortlist top universities and programs tailored to your profile.",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
    accent: "#F16101",
  },
  {
    title: "Direct University Admissions",
    desc: "End-to-end support for offer letters, SOPs, LORs, and direct admission into global institutions.",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
    accent: "#022C45",
  },
  {
    title: "Scholarship & Financial Aid",
    desc: "Assistance with merit-based scholarships and education loans to fund your study abroad journey.",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>,
    accent: "#07CBEB",
  },
  {
    title: "B2B Recruitment Network",
    desc: "Authorized representative for universities. We empower sub-agents with transparent payouts.",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>,
    accent: "#C9A24D",
  },
  {
    title: "Student Visa Services",
    desc: "Comprehensive visa filing support, mock interviews, and high-success embassy submissions.",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>,
    accent: "#F16101",
  },
  {
    title: "Pre-Departure Briefings",
    desc: "Complete pre and post-arrival assistance including airport pickup and local SIM cards.",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    accent: "#022C45",
  },
  {
    title: "Accommodation Setup",
    desc: "Securing safe, verified international student housing and mandatory health insurance.",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    accent: "#07CBEB",
  },
  {
    title: "Forex & Money Transfers",
    desc: "Reliable foreign exchange guidance and support for GIC/blocked account setup.",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
    accent: "#C9A24D",
  },
];

const studentReasons = [
  { title: "Top India Education Consultants", desc: "Over 10 years of proven expertise placing Indian students in elite global universities." },
  { title: "98% Visa Success Rate", desc: "Meticulous documentation resulting in one of the highest student visa approval rates in India." },
  { title: "End-to-End Study Abroad Support", desc: "From IELTS coaching and profile evaluation to university enrollment and post-arrival care." },
  { title: "100% Transparent Processing", desc: "Ethical counseling with no hidden fees and honest university recommendations." },
  { title: "ICEF & IDP Certified Counselors", desc: "Guidance from internationally certified advisors with deep destination-specific knowledge." },
  { title: "4,000+ Alumni Network", desc: "Join thousands of successful Edification alumni currently studying or working abroad." },
];

const partnerReasons = [
  { title: "Authorized India Representative", desc: "Direct recruitment partner for institutions across Europe, Asia, and North America." },
  { title: "Quality Student Pipeline", desc: "Rigorous screening processes ensuring highly qualified and genuine student applications." },
  { title: "Industry-Leading Commission Payouts", desc: "We offer highly competitive and strictly timely commission structures for our B2B partners." },
  { title: "Extensive B2B Agent Network", desc: "Tap into our vast, verified sub-agent network expanding across all major Indian cities." },
  { title: "Dedicated B2B Support Team", desc: "A specialized institutional relations team built to understand and meet university intake targets." },
  { title: "British Council Compliant", desc: "Strict adherence to ethical recruitment standards aligned with global education authorities." },
];

const destinations = [
  { country: "United Kingdom", flag: "/images/flags/gb.png", universities: "40+" },
  { country: "Canada", flag: "/images/flags/ca.png", universities: "30+" },
  { country: "Australia", flag: "/images/flags/au.png", universities: "35+" },
  { country: "USA", flag: "/images/flags/us.png", universities: "25+" },
  { country: "Singapore", flag: "/images/flags/sg.png", universities: "20+" },
  { country: "Malaysia", flag: "/images/flags/my.png", universities: "18+" },
  { country: "Cyprus", flag: "/images/flags/cy.png", universities: "12+" },
  { country: "Germany", flag: "/images/flags/de.png", universities: "15+" },
  { country: "New Zealand", flag: "/images/flags/nz.png", universities: "10+" },
  { country: "Mauritius", flag: "/images/flags/mu.png", universities: "8+" },
  { country: "Malta", flag: "/images/flags/mt.png", universities: "6+" },
  { country: "Ireland", flag: "/images/flags/ie.png", universities: "10+" },
  { country: "Dubai / UAE", flag: "/images/flags/ae.png", universities: "12+" },
  { country: "Belarus", flag: "/images/flags/by.png", universities: "8+" },
  { country: "Russia", flag: "/images/flags/ru.png", universities: "10+" },
  { country: "France", flag: "/images/flags/fr.png", universities: "8+" },
  { country: "Netherlands", flag: "/images/flags/nl.png", universities: "7+" },
  { country: "Italy", flag: "/images/flags/it.png", universities: "6+" },
  { country: "Sweden", flag: "/images/flags/se.png", universities: "5+" },
  { country: "Switzerland", flag: "/images/flags/ch.png", universities: "4+" },
  { country: "Japan", flag: "/images/flags/jp.png", universities: "6+" },
  { country: "South Korea", flag: "/images/flags/kr.png", universities: "5+" },
  { country: "Poland", flag: "/images/flags/pl.png", universities: "6+" },
  { country: "Hungary", flag: "/images/flags/hu.png", universities: "5+" },
  { country: "Greece", flag: "/images/flags/gr.png", universities: "4+" },
  { country: "France", flag: "/images/flags/fr.png", universities: "8+" },
  { country: "Spain", flag: "/images/flags/es.png", universities: "4+" },
  { country: "Denmark", flag: "/images/flags/dk.png", universities: "5+" },
  { country: "Georgia", flag: "/images/flags/ge.png", universities: "4+" },
  { country: "Latvia", flag: "/images/flags/lv.png", universities: "4+" },
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
//  ABOUT PAGE (COMPANY PROFILE)
// ═══════════════════════════════════════════════════════════════
export default function AboutPage() {
  useEffect(() => { document.title = "Company Profile — Edification Overseas Education"; }, []);

  const heroRef = useInView(0.1);
  const repRef = useInView(0.1);
  const mvgRef = useInView(0.1);
  const statsRef = useInView(0.1);
  const servRef = useInView(0.1);
  const studRef = useInView(0.1);
  const partRef = useInView(0.1);
  const destRef = useInView(0.1);
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
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(36px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeLeft {
          from { opacity: 0; transform: translateX(-32px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeRight {
          from { opacity: 0; transform: translateX(32px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes badgePulse {
          0%, 100% { opacity: 1;   transform: scale(1);   }
          50%      { opacity: 0.5; transform: scale(1.4); }
        }
        @keyframes orbFloat {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-20px); }
        }
        @keyframes pulseGlowOrange {
          0%, 100% { filter: drop-shadow(0 0 15px rgba(241,97,1,0.12)); }
          50%      { filter: drop-shadow(0 0 35px rgba(241,97,1,0.28)); }
        }
        
        @keyframes drawLine {
          from { transform: scaleY(0); }
          to { transform: scaleY(1); }
        }
        @keyframes drawHorizontal {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 10px rgba(7, 203, 235, 0.4); }
          50% { box-shadow: 0 0 20px rgba(7, 203, 235, 0.8), 0 0 40px rgba(7, 203, 235, 0.4); }
        }
        
        .reason-card {
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease, border-color 0.35s ease, background 0.35s ease;
        }
        .reason-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 14px 40px rgba(2,44,69,0.08);
          border-color: rgba(241,97,1,0.2) !important;
          background: #ffffff !important;
        }
        .dest-card {
          transition: transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .dest-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(2,44,69,0.08);
          border-color: rgba(241,97,1,0.25) !important;
        }

        .explore-link {
          transition: all 0.3s ease;
        }
        .explore-link:hover {
          color: #c94e00 !important;
        }
        .explore-link:hover svg {
          transform: translateX(5px);
        }

        .btn-outline {
          transition: all 0.3s cubic-bezier(0.22,1,0.36,1);
        }
        .btn-outline:hover {
          background: rgba(2,44,69,0.04) !important;
          border-color: rgba(2,44,69,0.3) !important;
          transform: translateY(-3px);
          box-shadow: 0 8px 16px rgba(2,44,69,0.06);
        }
        
        .cta-btn {
          transition: transform 0.18s cubic-bezier(0.4,0,0.2,1);
        }
        .cta-btn:hover {
          transform: translateY(-2px);
        }

        .service-card {
          background: #ffffff;
          border-radius: 16px;
          padding: 20px 24px;
          border: 1px solid rgba(2,44,69,0.07);
          box-shadow: 0 8px 24px rgba(2,44,69,0.03);
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .service-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 40px rgba(2,44,69,0.08);
          border-color: rgba(241,97,1,0.2);
        }

        .tree-desktop { display: flex; }
        .tree-mobile { display: none; }
        @media (max-width: 900px) {
          .tree-desktop { display: none; }
          .tree-mobile { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 16px; width: 100%; }
        }
        
        .services-layout {
          display: grid;
          grid-template-columns: 1fr 260px 1fr;
          gap: 32px;
          align-items: center;
        }
        @media (max-width: 1024px) {
          .services-layout {
            grid-template-columns: 1fr;
          }
          .svc-logo-container {
            order: -1;
            margin-bottom: 32px;
          }
          .svc-left-card {
            flex-direction: row !important;
            text-align: left !important;
          }
        }
      `}</style>

      {/* ════════════════════════════════════════════════════════
          1. HERO — Unified Design Language
      ════════════════════════════════════════════════════════ */}
      <Section bg="linear-gradient(105deg, #ffffff 0%, #fdf6ee 40%, #fde8c8 100%)" style={{ padding: "0" }}>
        {/* Subtle grid pattern overlay */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: `linear-gradient(rgba(241,97,1,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(241,97,1,0.04) 1px, transparent 1px)`, backgroundSize: "64px 64px" }}/>

        {/* Reduced top padding for "above the fold" visibility */}
        <div ref={heroRef.ref} style={{ maxWidth: "1280px", margin: "auto", padding: isMobile ? "28px 20px 40px" : "60px 24px 80px", position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: isMobile ? "28px" : "80px", flexWrap: "wrap" }}>

          {/* LEFT: SEO Optimized Headline + Desc */}
          <div style={{ flex: isMobile ? "0 0 100%" : "1 1 520px", width: isMobile ? "100%" : undefined }}>
            
            {/* Trust badge */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "rgba(241,97,1,0.08)",
              border: "1px solid rgba(241,97,1,0.2)",
              borderRadius: "999px", padding: "6px 16px", marginBottom: "24px",
              animation: heroRef.inView ? "fadeSlideUp 0.5s ease 0.1s both" : "none",
            }}>
              <span style={{
                width: "8px", height: "8px", borderRadius: "50%",
                background: "#F16101", display: "inline-block",
                animation: "badgePulse 1.6s infinite",
              }}/>
              <span style={{ fontSize: "12px", fontWeight: 800, color: "#F16101", letterSpacing: "0.4px", textTransform: "uppercase" }}>
                Premier Education Consultants
              </span>
            </div>

            <h1 style={{
              fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 900, color: "#022C45", lineHeight: 1.12,
              letterSpacing: "-0.8px", marginBottom: "20px",
              overflow: "visible",
              paddingBottom: "14px",
              animation: heroRef.inView ? "fadeSlideUp 0.55s ease 0.2s both" : "none",
            }}>
              Opening Doors<br/>
              <span style={{
                color: "#F16101",
                position: "relative", display: "inline-block",
                textShadow: "0 2px 16px rgba(241,97,1,0.18)",
              }}>
                To The World.
                <svg aria-hidden="true" style={{ position: "absolute", bottom: "-6px", left: 0, width: "100%", overflow: "visible" }} height="6" viewBox="0 0 200 6" preserveAspectRatio="none">
                  <path d="M0,5 Q50,0 100,5 Q150,10 200,5" stroke="#C9813A" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>

            <p style={{
              fontSize: "clamp(15px, 1.8vw, 17px)", color: "#4A5568", lineHeight: 1.75,
              marginBottom: "32px", maxWidth: "540px",
              animation: heroRef.inView ? "fadeSlideUp 0.55s ease 0.3s both" : "none",
            }}>
              India's trusted study abroad consultants. We provide expert university admissions counseling, student visa processing, and complete overseas education guidance for 33+ countries.
            </p>

            <div style={{
              animation: heroRef.inView ? "fadeSlideUp 0.55s ease 0.4s both" : "none",
            }}>
              <Link href="/contact" className="cta-btn" style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                position: "relative", overflow: "hidden",
                background: "#c94e00", borderRadius: "12px", padding: "0 0 4px 0",
                textDecoration: "none",
              }}>
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: "10px",
                  padding: "14px 28px", background: "#F16101", borderRadius: "12px",
                  position: "relative", overflow: "hidden",
                }}>
                  <span style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: "45%",
                    background: "linear-gradient(180deg,rgba(255,255,255,0.18),transparent)",
                    borderRadius: "12px 12px 0 0", pointerEvents: "none",
                  }}/>
                  <span style={{
                    fontSize: "14.5px", fontWeight: 800, color: "white",
                    letterSpacing: "0.4px", textTransform: "uppercase",
                    position: "relative", zIndex: 1,
                  }}>Free Consultation</span>
                </span>
              </Link>
            </div>
          </div>

          {/* RIGHT: Accreditations Panel — desktop only, fixed 360px overflows on mobile */}
          {!isMobile && <div style={{ position: "relative", flex: "0 0 360px" }}>
            
            {/* Ambient Back Glow Behind the Glass */}
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "120%", height: "120%", background: "radial-gradient(circle, rgba(241,97,1,0.15), transparent 70%)", borderRadius: "50%", animation: "pulseGlowOrange 4s infinite alternate", pointerEvents: "none", zIndex: 1 }} />
            
            <div style={{
              position: "relative",
              background: "linear-gradient(145deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.4) 100%)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.6)",
              borderTop: "1px solid rgba(255,255,255,1)",
              borderLeft: "1px solid rgba(255,255,255,1)",
              borderRadius: "24px",
              padding: "32px 24px",
              boxShadow: "0 24px 48px rgba(2,44,69,0.06), inset 0 0 0 1px rgba(255,255,255,0.5)",
              animation: heroRef.inView ? "fadeRight 0.7s cubic-bezier(0.22,1,0.36,1) 0.3s both" : "none",
              opacity: heroRef.inView ? 1 : 0,
              zIndex: 2
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(241,97,1,0.15)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(255,255,255,0.6)" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F16101" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
                </div>
                <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#022C45", margin: 0, letterSpacing: "1px", textTransform: "uppercase" }}>
                  Our Accreditations
                </h3>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {certifications.map((c, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: "16px",
                    animation: heroRef.inView ? `fadeRight 0.5s cubic-bezier(0.22,1,0.36,1) ${0.4 + i * 0.08}s both` : "none",
                    opacity: heroRef.inView ? 1 : 0,
                  }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#F16101", flexShrink: 0, boxShadow: "0 0 8px rgba(241,97,1,0.4)" }} />
                    <div>
                      <div style={{ fontSize: "14.5px", fontWeight: 800, color: "#022C45", letterSpacing: "0.5px" }}>{c.label}</div>
                      <div style={{ fontSize: "11px", fontWeight: 700, color: "rgba(2,44,69,0.55)", textTransform: "uppercase", letterSpacing: "0.8px", marginTop: "2px" }}>{c.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>}

        </div>

        {/* Arch SVG — desktop only; on mobile renders as a visible rectangle */}
        {!isMobile && (
          <div style={{ position: "relative", lineHeight: 0, zIndex: 1, marginTop: "20px" }}>
            <svg viewBox="0 0 1440 120" style={{ display: "block", width: "100%", height: "80px" }} preserveAspectRatio="none">
              <path d="M0,0 C480,140 960,140 1440,0 L1440,120 L0,120 Z" fill="#F9FAFB"/>
            </svg>
          </div>
        )}
      </Section>

      {/* ════════════════════════════════════════════════════════
          1.5. OFFICIAL REPRESENTATIVES (Modern Tech Flowchart)
      ════════════════════════════════════════════════════════ */}
      <Section bg="#F9FAFB" style={{ padding: isMobile ? "48px 0 56px" : "80px 0 100px" }}>
        <div ref={repRef.ref} style={{ maxWidth: "1280px", margin: "0 auto", padding: isMobile ? "0 16px" : "0 24px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          
          {/* SEO Optimized Section Description */}
          <div style={{ textAlign: "center", marginBottom: "40px", animation: repRef.inView ? "fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both" : "none", opacity: repRef.inView ? 1 : 0 }}>
            <Eyebrow label="Institutional Partnerships" />
            <Heading line1="Official India Representative" line2="For 7 Top Countries" />
            <p style={{ fontSize: "16px", color: "#6B7280", lineHeight: 1.6, maxWidth: "620px", margin: "16px auto 0" }}>
              As authorized student recruitment partners for elite international universities, we ensure your admission application is prioritized, fast-tracked, and authenticated.
            </p>
          </div>

          <div className="tree-desktop" style={{
            flexDirection: "column", alignItems: "center", width: "100%", maxWidth: "1000px",
            animation: repRef.inView ? "fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.2s both" : "none",
            opacity: repRef.inView ? 1 : 0,
          }}>
            <div style={{
              width: "120px", height: "120px", borderRadius: "50%",
              background: "linear-gradient(135deg, #022C45, #044b75)",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              boxShadow: "0 16px 40px rgba(2,44,69,0.2)",
              zIndex: 10, border: "4px solid #ffffff", position: "relative"
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#07CBEB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "6px" }}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
              <div style={{ fontSize: "11px", fontWeight: 800, color: "white", textTransform: "uppercase", letterSpacing: "1px", textAlign: "center", lineHeight: 1.2 }}>Official<br/>Hub</div>
            </div>

            <div style={{ 
              width: "3px", height: "40px", 
              background: "linear-gradient(180deg, #07CBEB, #F16101)", 
              transformOrigin: "top", animation: repRef.inView ? "drawLine 0.6s ease 0.5s both" : "none",
              boxShadow: "0 0 12px rgba(7,203,235,0.5)"
            }} />

            <div style={{ position: "relative", width: "100%", display: "flex", justifyContent: "space-between", paddingTop: "0px" }}>
              <div style={{ 
                position: "absolute", top: 0, left: "7%", right: "7%", height: "3px", 
                background: "linear-gradient(90deg, rgba(241,97,1,0), #F16101, #07CBEB, #F16101, rgba(241,97,1,0))", 
                transformOrigin: "center", borderRadius: "2px",
                animation: repRef.inView ? "drawHorizontal 0.8s ease 1s both" : "none",
                boxShadow: "0 0 10px rgba(241,97,1,0.4)"
              }} />

              {officialRep.map((item, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative", width: "120px" }}>
                  <div style={{
                    position: "absolute", top: "-5px", left: "50%", transform: "translateX(-50%)",
                    width: "12px", height: "12px", borderRadius: "50%", background: "#07CBEB",
                    animation: repRef.inView ? `pulseGlow 2s infinite ${1.5 + (i * 0.1)}s` : "none",
                    opacity: repRef.inView ? 1 : 0, zIndex: 5
                  }}/>

                  <div style={{ 
                    position: "absolute", top: "0px", left: "50%", width: "2px", height: "40px", transform: "translateX(-50%)",
                    background: "linear-gradient(180deg, #07CBEB, rgba(7,203,235,0))", 
                    transformOrigin: "top",
                    animation: repRef.inView ? `drawLine 0.4s ease ${1.5 + (i * 0.1)}s both` : "none" 
                  }} />
                  
                  <div style={{
                    background: "#ffffff", borderRadius: "12px", padding: "20px 10px", marginTop: "40px",
                    textAlign: "center", width: "100%",
                    boxShadow: "0 8px 24px rgba(2,44,69,0.06)",
                    border: "1px solid rgba(2,44,69,0.05)",
                    animation: repRef.inView ? `fadeUp 0.4s ease ${1.8 + (i * 0.1)}s both` : "none",
                    opacity: repRef.inView ? 1 : 0,
                    position: "relative", zIndex: 2
                  }}>
                    <div style={{ 
                      width: "40px", height: "40px", position: "relative", 
                      margin: "0 auto 10px", borderRadius: "50%", overflow: "hidden", 
                      border: "2px solid rgba(2,44,69,0.05)" 
                    }}>
                      <Image src={item.flag} alt={`${item.country} flag`} fill style={{ objectFit: "cover" }} sizes="40px" />
                    </div>
                    <div style={{ fontSize: "13px", fontWeight: 800, color: "#022C45" }}>{item.country}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="tree-mobile">
            {officialRep.map((item, i) => (
              <div key={i} style={{
                background: "#ffffff", border: "1px solid rgba(2,44,69,0.05)",
                padding: "20px", borderRadius: "12px", textAlign: "center",
                boxShadow: "0 4px 12px rgba(2,44,69,0.03)",
                display: "flex", flexDirection: "column", alignItems: "center"
              }}>
                <div style={{ 
                  width: "40px", height: "40px", position: "relative", 
                  marginBottom: "10px", borderRadius: "50%", overflow: "hidden"
                }}>
                  <Image src={item.flag} alt={`${item.country} flag`} fill style={{ objectFit: "cover" }} sizes="40px" />
                </div>
                <div style={{ fontSize: "14px", fontWeight: 800, color: "#022C45" }}>{item.country}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ════════════════════════════════════════════════════════
          2. MISSION / VISION / GOAL
      ════════════════════════════════════════════════════════ */}
      <Section bg="#ffffff" style={{ padding: isMobile ? "48px 0" : "100px 0" }}>
        <div ref={mvgRef.ref} style={{ maxWidth: "1280px", margin: "0 auto", padding: isMobile ? "0 16px" : "0 24px" }}>

          <div style={{ textAlign: "center", marginBottom: "64px", animation: mvgRef.inView ? "fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both" : "none", opacity: mvgRef.inView ? 1 : 0 }}>
            <Eyebrow label="Our Foundation" />
            <Heading line1="Purpose That" line2="Drives Everything" />
            <p style={{ fontSize: "16px", color: "#6B7280", lineHeight: 1.6, maxWidth: "560px", margin: "24px auto 0" }}>
              Three core principles shape every student visa and university placement decision we make — guiding our global team every day.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
            {[
              {
                label: "Mission",
                icon: "🎯",
                text: "Empowering students with expert guidance for seamless access to top global universities.",
                accent: "#F16101",
                bg: "#FDF8F4",
              },
              {
                label: "Vision",
                icon: "🔭",
                text: "Becoming India's most trusted partner in breaking barriers to quality international education.",
                accent: "#022C45",
                bg: "#F0F4F8",
              },
              {
                label: "Goal",
                icon: "🏆",
                text: "Connecting students to leading universities through transparent, student-centric services for academic and career success.",
                accent: "#07CBEB",
                bg: "#F0FBFD",
              },
            ].map((item, i) => (
              <div key={i} style={{
                background: item.bg,
                borderRadius: "20px",
                padding: "36px 32px",
                border: `1px solid ${item.accent}20`,
                position: "relative",
                overflow: "hidden",
                animation: mvgRef.inView ? `fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) ${0.1 + i * 0.12}s both` : "none",
                opacity: mvgRef.inView ? 1 : 0,
              }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: item.accent, borderRadius: "20px 20px 0 0" }}/>
                <div style={{ fontSize: "40px", marginBottom: "16px" }}>{item.icon}</div>
                <div style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "2px", color: item.accent, marginBottom: "12px" }}>{item.label}</div>
                <p style={{ fontSize: "16px", color: "#374151", lineHeight: 1.65, margin: 0, fontWeight: 500 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ════════════════════════════════════════════════════════
          3. STATS STRIP
      ════════════════════════════════════════════════════════ */}
      <Section bg="#022C45" style={{ padding: isMobile ? "48px 0" : "72px 0" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`, backgroundSize: "64px 64px" }}/>
        <div ref={statsRef.ref} style={{ maxWidth: "1280px", margin: "0 auto", padding: isMobile ? "0 16px" : "0 24px", position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0" }}>
            {stats.map((s, i) => (
              <div key={i} style={{
                flex: "1 1 180px",
                textAlign: "center",
                padding: "32px 24px",
                borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none",
                animation: statsRef.inView ? `fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) ${i * 0.1}s both` : "none",
                opacity: statsRef.inView ? 1 : 0,
              }}>
                <div style={{ fontSize: "clamp(36px, 4vw, 52px)", fontWeight: 900, color: s.accent, lineHeight: 1, marginBottom: "8px" }}>
                  <Counter target={s.num} suffix={s.suffix} />
                </div>
                <div style={{ fontSize: "13px", fontWeight: 600, color: "rgba(255,255,255,0.55)", textTransform: "uppercase", letterSpacing: "1px" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ════════════════════════════════════════════════════════
          4. WHAT WE DO
      ════════════════════════════════════════════════════════ */}
      <Section bg="#F9FAFB" style={{ padding: isMobile ? "48px 0" : "120px 0" }}>
        <div ref={servRef.ref} style={{ maxWidth: "1280px", margin: "0 auto", padding: isMobile ? "0 16px" : "0 24px" }}>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "24px", marginBottom: "64px", animation: servRef.inView ? "fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both" : "none", opacity: servRef.inView ? 1 : 0 }}>
            <div>
              <Eyebrow label="What We Do" />
              <Heading line1="Complete Support" line2="At Every Step" />
              <p style={{ fontSize: "16px", color: "#6B7280", lineHeight: 1.6, maxWidth: "560px", margin: "20px 0 0" }}>
                From your first free counselling session to post-arrival settlement — we manage your entire international education journey.
              </p>
            </div>
            
            <Link href="/services" className="explore-link" style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              color: "#F16101", fontSize: "14px", fontWeight: 800, textDecoration: "none",
              textTransform: "uppercase", letterSpacing: "1px",
            }}>
              Explore All Services 
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
          </div>

          <div className="services-layout">
            
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {services.slice(0, 4).map((s, i) => (
                <div key={i} className="service-card svc-left-card" style={{ 
                  display: "flex", alignItems: "center", gap: "16px", 
                  textAlign: "right", flexDirection: "row-reverse", 
                  animation: servRef.inView ? `fadeLeft 0.5s ease ${i * 0.1}s both` : "none", opacity: servRef.inView ? 1 : 0
                }}>
                  <div style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: "4px", background: s.accent }} />
                  
                  <div style={{
                    width: "52px", height: "52px", borderRadius: "14px", flexShrink: 0,
                    background: `${s.accent}15`, color: s.accent,
                    display: "flex", alignItems: "center", justifyContent: "center"
                  }}>
                    {s.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: "15px", fontWeight: 800, color: "#022C45", marginBottom: "4px" }}>{s.title}</h3>
                    <p style={{ fontSize: "13px", color: "#6B7280", lineHeight: 1.5, margin: 0 }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="svc-logo-container" style={{ 
              display: "flex", justifyContent: "center", alignItems: "center", position: "relative",
              animation: servRef.inView ? "scaleIn 0.8s ease 0.3s both" : "none", opacity: servRef.inView ? 1 : 0
            }}>
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "240px", height: "240px", borderRadius: "50%", background: "radial-gradient(circle, rgba(241,97,1,0.15) 0%, transparent 60%)", zIndex: 0 }} />
              
              <div style={{ 
                background: "#ffffff", padding: "5px 8px", borderRadius: "0",
                boxShadow: "0 16px 40px rgba(2,44,69,0.08)", border: "1px solid rgba(2,44,69,0.05)",
                position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "center"
              }}>
                <Image src="/images/logo-main.png" alt="Edification Overseas" width={180} height={60} style={{ objectFit: "contain" }} />
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {services.slice(4, 8).map((s, i) => (
                <div key={i} className="service-card" style={{ 
                  display: "flex", alignItems: "center", gap: "16px", 
                  textAlign: "left", flexDirection: "row", 
                  animation: servRef.inView ? `fadeRight 0.5s ease ${i * 0.1}s both` : "none", opacity: servRef.inView ? 1 : 0
                }}>
                  <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: "4px", background: s.accent }} />
                  
                  <div style={{
                    width: "52px", height: "52px", borderRadius: "14px", flexShrink: 0,
                    background: `${s.accent}15`, color: s.accent,
                    display: "flex", alignItems: "center", justifyContent: "center"
                  }}>
                    {s.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: "15px", fontWeight: 800, color: "#022C45", marginBottom: "4px" }}>{s.title}</h3>
                    <p style={{ fontSize: "13px", color: "#6B7280", lineHeight: 1.5, margin: 0 }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </Section>

      {/* ════════════════════════════════════════════════════════
          5. WHY STUDENTS CHOOSE US
      ════════════════════════════════════════════════════════ */}
      <Section bg="#ffffff" style={{ padding: isMobile ? "48px 0" : "100px 0" }}>
        <div ref={studRef.ref} style={{ maxWidth: "1280px", margin: "0 auto", padding: isMobile ? "0 16px" : "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "32px" : "80px", alignItems: "center" }}>

            <div style={{
              position: "relative",
              animation: studRef.inView ? "fadeLeft 0.7s cubic-bezier(0.22,1,0.36,1) both" : "none",
              opacity: studRef.inView ? 1 : 0,
            }}>
              <div style={{ borderRadius: "20px", overflow: "hidden", aspectRatio: isMobile ? "16/9" : "4/5", position: "relative" }}>
                <Image
                  src="/images/about/students.jpg"
                  alt="Students who chose Edification Overseas"
                  fill style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              {/* Badge — inside image on mobile, outside on desktop */}
              <div style={{
                position: "absolute",
                bottom: isMobile ? "12px" : "-24px",
                right: isMobile ? "12px" : "-24px",
                background: "#022C45", borderRadius: "16px",
                padding: isMobile ? "12px 16px" : "20px 24px",
                boxShadow: "0 16px 40px rgba(2,44,69,0.2)",
              }}>
                <div style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1.5px", color: "rgba(255,255,255,0.5)", marginBottom: "4px" }}>Visa Success</div>
                <div style={{ fontSize: isMobile ? "28px" : "36px", fontWeight: 900, color: "#F16101", lineHeight: 1 }}>98%</div>
                <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", marginTop: "4px" }}>Approval Rate</div>
              </div>
            </div>

            <div style={{
              animation: studRef.inView ? "fadeRight 0.7s cubic-bezier(0.22,1,0.36,1) 0.15s both" : "none",
              opacity: studRef.inView ? 1 : 0,
            }}>
              <Eyebrow label="For Students" />
              <Heading line1="Why Students Choose" line2="Edification" />
              <p style={{ fontSize: "16px", color: "#6B7280", lineHeight: 1.6, margin: "20px 0 32px", maxWidth: "460px" }}>
                We don't just process applications — we build overseas careers. Here's why thousands of Indian students trust us with their global education futures.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {studentReasons.map((r, i) => (
                  <div key={i} className="reason-card" style={{
                    display: "flex", alignItems: "flex-start", gap: "14px",
                    padding: "16px 18px",
                    borderRadius: "12px",
                    border: "1px solid rgba(2,44,69,0.07)",
                    background: "#F9FAFB",
                    animation: studRef.inView ? `fadeRight 0.5s cubic-bezier(0.22,1,0.36,1) ${0.2 + i * 0.08}s both` : "none",
                    opacity: studRef.inView ? 1 : 0,
                  }}>
                    <div style={{
                      width: "28px", height: "28px", borderRadius: "8px",
                      background: "rgba(241,97,1,0.1)", color: "#F16101",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0, marginTop: "1px",
                    }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: 800, color: "#022C45", marginBottom: "3px" }}>{r.title}</div>
                      <div style={{ fontSize: "13px", color: "#6B7280", lineHeight: 1.5 }}>{r.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/book-consultation" style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                marginTop: "32px", padding: "13px 28px",
                background: "#F16101", color: "#ffffff",
                borderRadius: "8px", fontSize: "13px", fontWeight: 800,
                textDecoration: "none", textTransform: "uppercase", letterSpacing: "1px",
              }}>
                Book Free Consultation
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* ════════════════════════════════════════════════════════
          6. WHY PARTNERS CHOOSE US
      ════════════════════════════════════════════════════════ */}
      <Section bg="#F9FAFB" style={{ padding: isMobile ? "48px 0" : "100px 0" }}>
        <div ref={partRef.ref} style={{ maxWidth: "1280px", margin: "0 auto", padding: isMobile ? "0 16px" : "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "32px" : "80px", alignItems: "center" }}>

            <div style={{
              animation: partRef.inView ? "fadeLeft 0.7s cubic-bezier(0.22,1,0.36,1) both" : "none",
              opacity: partRef.inView ? 1 : 0,
            }}>
              <Eyebrow label="For Recruitment Partners" />
              <Heading line1="Why Partners Choose" line2="Edification" />
              <p style={{ fontSize: "16px", color: "#6B7280", lineHeight: 1.6, margin: "20px 0 32px", maxWidth: "460px" }}>
                Top-tier universities and global colleges trust our B2B network to deliver highly qualified, genuine international students.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {partnerReasons.map((r, i) => (
                  <div key={i} className="reason-card" style={{
                    display: "flex", alignItems: "flex-start", gap: "14px",
                    padding: "16px 18px",
                    borderRadius: "12px",
                    border: "1px solid rgba(2,44,69,0.07)",
                    background: "#ffffff",
                    animation: partRef.inView ? `fadeLeft 0.5s cubic-bezier(0.22,1,0.36,1) ${0.2 + i * 0.08}s both` : "none",
                    opacity: partRef.inView ? 1 : 0,
                  }}>
                    <div style={{
                      width: "28px", height: "28px", borderRadius: "8px",
                      background: "rgba(7,203,235,0.1)", color: "#07CBEB",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0, marginTop: "1px",
                    }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: 800, color: "#022C45", marginBottom: "3px" }}>{r.title}</div>
                      <div style={{ fontSize: "13px", color: "#6B7280", lineHeight: 1.5 }}>{r.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/contact" style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                marginTop: "32px", padding: "13px 28px",
                background: "#022C45", color: "#ffffff",
                borderRadius: "8px", fontSize: "13px", fontWeight: 800,
                textDecoration: "none", textTransform: "uppercase", letterSpacing: "1px",
              }}>
                Partner With Us
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
            </div>

            <div style={{
              position: "relative",
              order: isMobile ? 1 : 0,
              animation: partRef.inView ? "fadeRight 0.7s cubic-bezier(0.22,1,0.36,1) 0.15s both" : "none",
              opacity: partRef.inView ? 1 : 0,
            }}>
              <div style={{ borderRadius: "20px", overflow: "hidden", aspectRatio: isMobile ? "16/9" : "4/5", position: "relative" }}>
                <Image
                  src="/images/about/partners.jpg"
                  alt="University partnerships"
                  fill style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              {/* Badge — inside image on mobile, outside on desktop */}
              <div style={{
                position: "absolute",
                top: isMobile ? "12px" : "-20px",
                left: isMobile ? "12px" : "-20px",
                background: "#07CBEB", borderRadius: "14px",
                padding: isMobile ? "12px 16px" : "18px 22px",
                boxShadow: "0 12px 32px rgba(7,203,235,0.3)",
              }}>
                <div style={{ fontSize: isMobile ? "24px" : "32px", fontWeight: 900, color: "#ffffff", lineHeight: 1 }}>100+</div>
                <div style={{ fontSize: "11px", fontWeight: 700, color: "rgba(255,255,255,0.85)", textTransform: "uppercase", letterSpacing: "0.8px" }}>University Partners</div>
              </div>
            </div>

          </div>
        </div>
      </Section>

      {/* ════════════════════════════════════════════════════════
          7. STUDY DESTINATIONS
      ════════════════════════════════════════════════════════ */}
      <Section bg="#022C45" style={{ padding: isMobile ? "48px 0" : "100px 0" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`, backgroundSize: "64px 64px" }}/>
        <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(241,97,1,0.08) 0%, transparent 60%)", pointerEvents: "none" }}/>

        <div ref={destRef.ref} style={{ maxWidth: "1280px", margin: "0 auto", padding: isMobile ? "0 16px" : "0 24px", position: "relative", zIndex: 1 }}>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "24px", marginBottom: "56px", animation: destRef.inView ? "fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both" : "none", opacity: destRef.inView ? 1 : 0 }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "9px", marginBottom: "16px" }}>
                <div style={{ width: "30px", height: "2px", borderRadius: "1px", background: "linear-gradient(90deg, #F16101, #C9A24D)" }}/>
                <span style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "2.5px", textTransform: "uppercase", background: "linear-gradient(90deg, #F16101, #C9A24D)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Global Reach</span>
                <div style={{ width: "30px", height: "2px", borderRadius: "1px", background: "linear-gradient(90deg, #C9A24D, #F16101)" }}/>
              </div>
              <h2 style={{ fontSize: "clamp(32px, 4vw, 44px)", fontWeight: 900, color: "#ffffff", lineHeight: 1.1, letterSpacing: "-0.8px", margin: "0 0 16px" }}>
                Study Destinations<br/>
                <span style={{ background: "linear-gradient(100deg, #F16101 0%, #C9A24D 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>We Deal In</span>
              </h2>
              <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.6)", margin: "0", maxWidth: "520px", lineHeight: 1.6 }}>
                Representing 100+ universities across 30+ global study destinations. Where do you want to build your future?
              </p>
            </div>

            <Link href="/countries" className="explore-link" style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              color: "#F16101", fontSize: "14px", fontWeight: 800, textDecoration: "none",
              textTransform: "uppercase", letterSpacing: "1px",
            }}>
              Explore All Destinations 
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(175px, 1fr))", gap: "12px" }}>
            {destinations.map((d, i) => (
              <div key={i} className="dest-card" style={{
                padding: "16px 18px",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.04)",
                display: "flex", alignItems: "center", gap: "12px",
                animation: destRef.inView ? `fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) ${0.03 + (i % 6) * 0.05}s both` : "none",
                opacity: destRef.inView ? 1 : 0,
              }}>
                <div style={{ width: "28px", height: "28px", position: "relative", flexShrink: 0, borderRadius: "50%", overflow: "hidden", background: "rgba(255,255,255,0.1)" }}>
                  <Image src={d.flag} alt={`${d.country} flag`} fill style={{ objectFit: "cover" }} sizes="28px" />
                </div>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: "#ffffff", lineHeight: 1.2 }}>{d.country}</div>
                  <div style={{ fontSize: "11px", color: "#F16101", fontWeight: 700, marginTop: "2px" }}>{d.universities} Universities</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ════════════════════════════════════════════════════════
          8. CTA STRIP 
      ════════════════════════════════════════════════════════ */}
      <Section bg="#FDF8F4" style={{ padding: isMobile ? "56px 0 72px" : "100px 0 140px" }}>
        <div ref={ctaRef.ref} style={{ maxWidth: "900px", margin: "0 auto", padding: isMobile ? "0 20px" : "0 24px", textAlign: "center", animation: ctaRef.inView ? "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both" : "none", opacity: ctaRef.inView ? 1 : 0 }}>
          <Eyebrow label="Get Started" />
          <h2 style={{ fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 900, color: "#022C45", letterSpacing: "-0.6px", lineHeight: 1.1, margin: "0 0 16px" }}>
            Ready to Begin Your<br/>
            <span style={{ background: "linear-gradient(100deg, #F16101, #C9A24D)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Global Journey?</span>
          </h2>
          <p style={{ fontSize: "16px", color: "#6B7280", lineHeight: 1.6, margin: "0 0 36px" }}>
            Book a free counselling session with our certified advisors. <br/> No obligation, no pressure — just honest guidance tailored to your profile.
          </p>
          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact" style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "14px 32px", borderRadius: "8px",
              background: "#F16101", color: "#ffffff",
              fontSize: "14px", fontWeight: 800, textDecoration: "none",
              textTransform: "uppercase", letterSpacing: "1px",
              boxShadow: "0 8px 24px rgba(241,97,1,0.25)",
            }}>
              Book Free Consultation
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
            
            <Link href="/contact" className="btn-outline" style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "14px 32px", borderRadius: "8px",
              border: "1.5px solid rgba(2,44,69,0.15)",
              background: "transparent", color: "#022C45",
              fontSize: "14px", fontWeight: 800, textDecoration: "none",
              textTransform: "uppercase", letterSpacing: "1px",
            }}>
              Get in Touch
            </Link>
          </div>
        </div>
      </Section>

    </main>
  );
}