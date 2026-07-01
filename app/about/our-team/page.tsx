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

// ── Data: Leadership & Process Flow ───────────────────────────
const leadership = [
  { 
    name: "Himal Chauhan", 
    role: "Director - B2B Strategy & Partnerships", 
    focus: "Pan-India B2B Market Development",
    background: "Fortune 500 Corporate Background",
    desc: "Himal leads Edification Overseas' business-to-business outreach across India, developing and managing strategic relationships with education agents, institutions, and partner networks nationwide.\n\nBefore transitioning into the education sector, Himal built a strong foundation working within Fortune 500 organisations, gaining expertise in structured operations, stakeholder management, and large-scale business development.\n\nHe brings that corporate discipline into the education space — creating a B2B framework that is organised, reliable, and built for long-term growth across diverse regional markets.", 
    img: "/images/himal.jpg" 
  },
  { 
    name: "Meet Desai", 
    role: "Director - Marketing & Student Engagement", 
    focus: "B2C Student Relations & Marketing",
    background: "Master's Degree Holder",
    desc: "Meet Desai is the student-facing voice of Edification Overseas, building direct connections with prospective students and guiding them through their study abroad journey with clarity and confidence.\n\nHolding a Master's degree, Meet understands the academic path firsthand and uses that perspective to create marketing communications that are honest, relatable, and genuinely useful for students at every stage of decision-making.\n\nHe oversees all marketing activities for the company — from digital presence to student outreach — ensuring our message reaches the right audience in the right way.", 
    img: "/images/meet.jpg" 
  },
  { 
    name: "Sohel Kureshi", 
    role: "Director - Global University Relations", 
    focus: "International University Communication",
    background: "Master's Graduate, Australia",
    desc: "Sohel Kureshi serves as the primary bridge between Edification Overseas and universities across international study destinations. Having completed his Master's degree from Australia, he brings first-hand experience of the overseas academic environment to every partnership he builds.\n\nHis role centres on maintaining direct communication with admissions offices, faculty contacts, and institutional representatives at partner universities — ensuring that students and agents receive accurate, up-to-date guidance at every stage.\n\nWith a deep understanding of how international institutions operate from the inside, Sohel ensures that our partnerships remain strong, informed, and consistently aligned with institutional expectations.", 
    img: "/images/sohel.jpg" 
  }
];

const teamProcess = [
  { 
    title: "Discover & Strategize", 
    team: "Step 01", 
    desc: "We evaluate your academic profile, career goals, and budget to find the perfect global university and program for you.", 
    icon: "🎯",
    num: "01"
  },
  { 
    title: "Apply & Enroll", 
    team: "Step 02", 
    desc: "We guide you through document preparation, SOP drafting, and flawless application submission to secure your offer letter.", 
    icon: "📝",
    num: "02"
  },
  { 
    title: "Visa Processing", 
    team: "Step 03", 
    desc: "We simplify complex embassy requirements and manage your financial documentation for a smooth, stress-free visa approval.", 
    icon: "⚖️",
    num: "03"
  },
  { 
    title: "Departure & Beyond", 
    team: "Step 04", 
    desc: "From booking flights and securing accommodation to post-landing support, we prepare you for your new life abroad.", 
    icon: "✈️",
    num: "04"
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
//  OUR TEAM PAGE
// ═══════════════════════════════════════════════════════════════
export default function OurTeamPage() {
  useEffect(() => { document.title = "Our Leadership Team — Expert Visa Counsellors | Edification Overseas"; }, []);

  const heroRef = useInView(0.1);
  const dirRef = useInView(0.1);
  const processRef = useInView(0.05);
  const trustRef = useInView(0.1);
  const ctaRef = useInView(0.1);

  // Wheel State
  const [activeStep, setActiveStep] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Auto-Player
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 4000); 
    return () => clearInterval(timer);
  }, [isHovered]);

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
        
        /* Floating Vector Animations */
        @keyframes floatSlow { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
        @keyframes floatMedium { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-20px) rotate(2deg); } }
        @keyframes floatFast { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-25px) rotate(-3deg); } }
        @keyframes pulseGlowOrange { 0%, 100% { filter: drop-shadow(0 0 15px rgba(241,97,1,0.12)); } 50% { filter: drop-shadow(0 0 35px rgba(241,97,1,0.28)); } }

        /* ── FULL SIZE WHITE LEADERSHIP CARDS ── */
        .leadership-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          position: relative;
          z-index: 2;
        }
        @media (max-width: 767px) {
          .leadership-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .leader-content-wrap {
            padding: 24px 20px !important;
          }
          .leader-photo-wrap {
            aspect-ratio: 3 / 2 !important;
          }
        }
        
        .leader-card-white {
          background: #ffffff;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 16px 40px rgba(0,0,0,0.15);
          transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease;
          display: flex;
          flex-direction: column;
        }
        
        .leader-card-white:hover {
          transform: translateY(-8px);
          box-shadow: 0 24px 56px rgba(0,0,0,0.25);
        }
        
        .leader-photo-wrap {
          width: 100%;
          aspect-ratio: 4 / 5; /* Forces the perfect full-portrait proportion */
          position: relative;
          background: #eef2f6;
          overflow: hidden;
        }

        .leader-photo-wrap img {
          transition: transform 0.7s cubic-bezier(0.22,1,0.36,1);
        }

        .leader-card-white:hover .leader-photo-wrap img {
          transform: scale(1.05);
        }
        
        .leader-content-wrap {
          padding: 32px 28px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        
        .leader-name {
          font-size: 24px;
          font-weight: 900;
          color: #022C45;
          margin: 0 0 6px;
          letter-spacing: -0.3px;
        }
        
        .leader-role {
          font-size: 13px;
          font-weight: 800;
          color: #F16101;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 24px;
        }
        
        .leader-desc {
          font-size: 15px;
          color: #4B5563;
          line-height: 1.65;
          margin: 0 0 28px 0;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .leader-meta {
          background: #f4fbfc;
          border-radius: 14px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          border: 1px solid rgba(7,203,235,0.15);
        }
        
        .meta-item {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        
        .meta-label {
          font-size: 11px;
          font-weight: 800;
          color: #022C45;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .meta-value {
          font-size: 14px;
          font-weight: 700;
          color: #F16101;
        }

        @media (max-width: 1024px) {
          .leadership-grid {
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          }
        }

        /* ── HIGH-END ORBITAL WHEEL CSS ── */
        .wheel-wrapper {
          display: grid;
          grid-template-columns: 400px 1fr;
          gap: 80px;
          align-items: center;
          max-width: 1040px;
          margin: 60px auto 0;
        }
        .wheel-container {
          width: 400px;
          height: 400px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .wheel-ambient-glow {
          position: absolute;
          width: 280px;
          height: 280px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(241,97,1,0.08) 0%, transparent 70%);
          z-index: 0;
        }
        @keyframes spinTrack {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .wheel-track {
          position: absolute;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          border: 2px dashed rgba(2,44,69,0.15);
          animation: spinTrack 40s linear infinite;
          z-index: 1;
        }
        .wheel-rotator {
          position: absolute;
          inset: 0;
          transition: transform 1s cubic-bezier(0.68, -0.15, 0.265, 1.15); 
          z-index: 2;
        }
        .wheel-node {
          position: absolute;
          width: 64px;
          height: 64px;
          margin-left: -32px;
          margin-top: -32px;
          border-radius: 50%;
          background: #ffffff;
          border: 2px solid rgba(2,44,69,0.08);
          box-shadow: 0 4px 12px rgba(0,0,0,0.04);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .node-0 { top: 50px; left: 200px; }
        .node-1 { top: 200px; left: 350px; }
        .node-2 { top: 350px; left: 200px; }
        .node-3 { top: 200px; left: 50px; }
        .wheel-node.active {
          background: #F16101;
          border-color: #F16101;
          transform: scale(1.2);
          box-shadow: 0 12px 24px rgba(241,97,1,0.3);
        }
        .node-icon {
          font-size: 24px;
          transition: transform 1s cubic-bezier(0.68, -0.15, 0.265, 1.15);
          display: flex;
        }
        .wheel-node:not(.active) .node-icon {
          filter: grayscale(1);
          opacity: 0.5;
        }
        .wheel-hub {
          position: absolute;
          width: 140px;
          height: 140px;
          border-radius: 50%;
          background: #022C45;
          box-shadow: 0 0 0 8px rgba(255,255,255,1), 0 12px 32px rgba(2,44,69,0.15);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 5;
        }
        .hub-svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          transform: rotate(-90deg); 
        }
        .hub-progress {
          transition: stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .wheel-panel {
          background: #ffffff;
          border: 1px solid rgba(2,44,69,0.06);
          border-radius: 24px;
          padding: 48px;
          box-shadow: 0 20px 40px rgba(2,44,69,0.04);
          position: relative;
          overflow: hidden;
        }
        .panel-fade {
          animation: fadeSlideUp 0.5s cubic-bezier(0.22,1,0.36,1) both;
        }
        .info-watermark {
          position: absolute; top: -10px; right: 20px;
          font-size: 140px; font-weight: 900;
          color: rgba(2,44,69,0.02);
          line-height: 1;
          pointer-events: none;
        }
        @media (max-width: 960px) {
          .wheel-wrapper { grid-template-columns: 1fr; gap: 40px; justify-items: center; }
          .wheel-panel { width: 100%; padding: 40px 24px; }
        }

        /* Button Hover */
        .btn-outline { transition: all 0.3s cubic-bezier(0.22,1,0.36,1); }
        .btn-outline:hover { background: rgba(2,44,69,0.04) !important; border-color: rgba(2,44,69,0.3) !important; transform: translateY(-3px); box-shadow: 0 8px 16px rgba(2,44,69,0.06); }
        .cta-btn { transition: transform 0.18s cubic-bezier(0.4,0,0.2,1); }
        .cta-btn:hover { transform: translateY(-2px); }
      `}</style>

      {/* ════════════════════════════════════════════════════════
          1. HERO
      ════════════════════════════════════════════════════════ */}
      <Section bg="linear-gradient(105deg, #ffffff 0%, #fdf6ee 40%, #fde8c8 100%)" style={{ padding: "0" }}>
        {/* Subtle grid pattern overlay for texture */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: `linear-gradient(rgba(241,97,1,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(241,97,1,0.04) 1px, transparent 1px)`, backgroundSize: "64px 64px" }}/>
        
        <div ref={heroRef.ref} style={{ maxWidth: "1280px", margin: "auto", padding: isMobile ? "28px 20px 48px" : "60px 24px 80px", position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: isMobile ? "36px" : "64px", flexWrap: "wrap" }}>
          
          <div style={{ flex: isMobile ? "0 0 100%" : "1 1 500px", width: isMobile ? "100%" : undefined }}>
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
              <span style={{ fontSize: "12px", fontWeight: 800, color: "#F16101", letterSpacing: "0.4px" }}>
                The Engine Behind Your Success
              </span>
            </div>

            <h1 style={{
              fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 900, color: "#022C45", lineHeight: 1.12,
              letterSpacing: "-0.8px", marginBottom: "20px",
              overflow: "visible",
              paddingBottom: "14px",
              animation: heroRef.inView ? "fadeSlideUp 0.55s ease 0.2s both" : "none",
            }}>
              Our Expert <br/>
              <span style={{
                color: "#F16101",
                position: "relative", display: "inline-block",
                textShadow: "0 2px 16px rgba(241,97,1,0.18)",
              }}>
                Enrolment Process.
                <svg
                  aria-hidden="true"
                  style={{ position: "absolute", bottom: "-6px", left: 0, width: "100%", overflow: "visible" }}
                  height="6" viewBox="0 0 200 6" preserveAspectRatio="none"
                >
                  <path
                    d="M0,5 Q50,0 100,5 Q150,10 200,5"
                    stroke="#C9813A" strokeWidth="3.5" fill="none" strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p style={{
              fontSize: "clamp(15px, 1.8vw, 17px)", color: "#4A5568", lineHeight: 1.75,
              marginBottom: "32px", maxWidth: "540px",
              animation: heroRef.inView ? "fadeSlideUp 0.55s ease 0.3s both" : "none",
            }}>
              Studying abroad is a life-changing decision. At Edification Overseas, your applications and visas are driven by a synchronized process where dedicated, highly experienced teams work together to guarantee your global future.
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
                  }}>Consult Our Experts</span>
                </span>
              </Link>
            </div>
          </div>

          {/* RIGHT: floating nodes — desktop only, they overflow on mobile */}
          {!isMobile && <div style={{ 
            flex: "1 1 450px", position: "relative", minHeight: "450px", 
            display: "flex", justifyContent: "center", alignItems: "center",
            animation: heroRef.inView ? "scaleIn 0.8s cubic-bezier(0.22,1,0.36,1) 0.3s both" : "none",
            opacity: heroRef.inView ? 1 : 0,
          }}>
            <div style={{ position: "absolute", width: "350px", height: "350px", background: "radial-gradient(circle, rgba(241,97,1,0.15), transparent 70%)", borderRadius: "50%", animation: "pulseGlowOrange 4s infinite" }} />
            
            <div style={{ position: "relative", zIndex: 2, animation: "floatSlow 6s infinite" }}>
              <div style={{ width: "140px", height: "140px", borderRadius: "50%", background: "#ffffff", border: "2px solid rgba(241,97,1,0.4)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 20px 40px rgba(241,97,1,0.15)" }}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#F16101" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
              </div>
            </div>

            <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 1 }} viewBox="0 0 500 500">
              <path d="M250 250 L120 120" stroke="rgba(2,44,69,0.15)" strokeWidth="2" strokeDasharray="6 6" />
              <path d="M250 250 L380 140" stroke="rgba(2,44,69,0.15)" strokeWidth="2" strokeDasharray="6 6" />
              <path d="M250 250 L140 380" stroke="rgba(2,44,69,0.15)" strokeWidth="2" strokeDasharray="6 6" />
              <path d="M250 250 L360 360" stroke="rgba(2,44,69,0.15)" strokeWidth="2" strokeDasharray="6 6" />
            </svg>

            <div style={{ position: "absolute", top: "50px", left: "40px", zIndex: 3, animation: "floatFast 5s infinite" }}>
              <div style={{ background: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", border: "1px solid rgba(2,44,69,0.06)", padding: "12px 16px", borderRadius: "16px", display: "flex", alignItems: "center", gap: "12px", boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(241,97,1,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F16101" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
                </div>
                <div>
                  <div style={{ fontSize: "12px", fontWeight: 800, color: "#022C45" }}>Admissions</div>
                  <div style={{ fontSize: "10px", color: "#6B7280", textTransform: "uppercase", fontWeight: 700 }}>Experts</div>
                </div>
              </div>
            </div>

            <div style={{ position: "absolute", top: "80px", right: "30px", zIndex: 3, animation: "floatMedium 7s infinite" }}>
              <div style={{ background: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", border: "1px solid rgba(2,44,69,0.06)", padding: "12px 16px", borderRadius: "16px", display: "flex", alignItems: "center", gap: "12px", boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(201,162,77,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A24D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
                </div>
                <div>
                  <div style={{ fontSize: "12px", fontWeight: 800, color: "#022C45" }}>Certified</div>
                  <div style={{ fontSize: "10px", color: "#6B7280", textTransform: "uppercase", fontWeight: 700 }}>Visa Team</div>
                </div>
              </div>
            </div>

            <div style={{ position: "absolute", bottom: "80px", left: "20px", zIndex: 3, animation: "floatMedium 6s infinite reverse" }}>
              <div style={{ background: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", border: "1px solid rgba(2,44,69,0.06)", padding: "12px 16px", borderRadius: "16px", display: "flex", alignItems: "center", gap: "12px", boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(7,203,235,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#07CBEB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                </div>
                <div>
                  <div style={{ fontSize: "12px", fontWeight: 800, color: "#022C45" }}>University</div>
                  <div style={{ fontSize: "10px", color: "#6B7280", textTransform: "uppercase", fontWeight: 700 }}>Relations</div>
                </div>
              </div>
            </div>

            <div style={{ position: "absolute", bottom: "50px", right: "60px", zIndex: 3, animation: "floatFast 8s infinite reverse" }}>
              <div style={{ background: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", border: "1px solid rgba(2,44,69,0.06)", padding: "12px 16px", borderRadius: "16px", display: "flex", alignItems: "center", gap: "12px", boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(241,97,1,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F16101" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                </div>
                <div>
                  <div style={{ fontSize: "12px", fontWeight: 800, color: "#022C45" }}>1-on-1</div>
                  <div style={{ fontSize: "10px", color: "#6B7280", textTransform: "uppercase", fontWeight: 700 }}>Mentorship</div>
                </div>
              </div>
            </div>

          </div>}

        </div>

        {/* Top arch SVG: hero→navy — desktop only, renders as blue rectangle on mobile */}
        {!isMobile && (
          <div style={{ position: "relative", lineHeight: 0, zIndex: 1, marginTop: "20px" }}>
            <svg viewBox="0 0 1440 120" style={{ display: "block", width: "100%", height: "80px" }} preserveAspectRatio="none">
              <path d="M0,0 C480,140 960,140 1440,0 L1440,120 L0,120 Z" fill="#022C45"/> 
            </svg>
          </div>
        )}
      </Section>

      {/* ════════════════════════════════════════════════════════
          2. LEADERSHIP (Full Portrait Cards on Navy)
      ════════════════════════════════════════════════════════ */}
      <Section bg="#022C45" style={{ padding: isMobile ? "40px 0 48px" : "40px 0 120px" }}>
        
        {/* Subtle glowing ambient orbs in background */}
        <div style={{ position: "absolute", top: "10%", left: "-10%", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(241,97,1,0.05), transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "-10%", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(7,203,235,0.03), transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />

        <div ref={dirRef.ref} style={{ maxWidth: "1280px", margin: "0 auto", padding: isMobile ? "0 16px" : "0 24px" }}>
          
          <div style={{ textAlign: "center", marginBottom: "64px", animation: dirRef.inView ? "fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both" : "none", opacity: dirRef.inView ? 1 : 0, position: "relative", zIndex: 2 }}>
            <Eyebrow label="Our Leadership" isLight={true} />
            <Heading line1="Guiding With Vision" line2="Leading With Integrity" color="#ffffff" />
            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.7)", lineHeight: 1.6, maxWidth: "600px", margin: "20px auto 0" }}>
              Our directors combine decades of educational expertise to ensure Edification remains India's most trusted and forward-thinking study abroad brand.
            </p>
          </div>

          <div className="leadership-grid">
            {leadership.map((dir, i) => (
              <div key={i} className="leader-card-white" style={{
                animation: dirRef.inView ? `fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) ${0.2 + (i * 0.15)}s both` : "none",
                opacity: dirRef.inView ? 1 : 0,
              }}>
                <div className="leader-photo-wrap">
                  <Image src={dir.img} alt={dir.name} fill style={{ objectFit: "cover", objectPosition: "top center" }} />
                </div>
                
                <div className="leader-content-wrap">
                  <h3 className="leader-name">{dir.name}</h3>
                  <div className="leader-role">{dir.role}</div>
                  
                  <div className="leader-desc">
                    {dir.desc.split('\n\n').map((paragraph, index) => (
                      <p key={index} style={{ margin: 0 }}>{paragraph}</p>
                    ))}
                  </div>

                  <div className="leader-meta">
                    <div className="meta-item">
                      <span className="meta-label">Focus</span>
                      <span className="meta-value">{dir.focus}</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">Background</span>
                      <span className="meta-value">{dir.background}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom arch: navy→white — desktop only, broken on mobile */}
        {!isMobile && (
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, lineHeight: 0, zIndex: 1 }}>
            <svg viewBox="0 0 1440 120" style={{ display: "block", width: "100%", height: "80px" }} preserveAspectRatio="none">
              <path d="M0,120 C480,-20 960,-20 1440,120 L1440,120 L0,120 Z" fill="#ffffff"/>
            </svg>
          </div>
        )}
      </Section>

      {/* ════════════════════════════════════════════════════════
          3. HIGH-END ORBITAL WHEEL PROCESS (Zero Collision)
      ════════════════════════════════════════════════════════ */}
      <Section bg="#ffffff" style={{ padding: isMobile ? "56px 0" : "100px 0" }}>
        <div ref={processRef.ref} style={{ maxWidth: "1280px", margin: "0 auto", padding: isMobile ? "0 16px" : "0 24px" }}>
          
          <div style={{ textAlign: "center", animation: processRef.inView ? "fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both" : "none", opacity: processRef.inView ? 1 : 0 }}>
            <Eyebrow label="Our Methodology" />
            <Heading line1="A Seamless Student" line2="Enrolment Journey" />
            <p style={{ fontSize: "16px", color: "#6B7280", lineHeight: 1.6, maxWidth: "680px", margin: "20px auto 0" }}>
              Our transparent 4-step process ensures that you are expertly guided through every phase of your application, eliminating errors and securing your global future.
            </p>
          </div>

          <div 
            className="wheel-wrapper"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              animation: processRef.inView ? `fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.2s both` : "none",
              opacity: processRef.inView ? 1 : 0,
            }}
          >
            {/* LEFT: THE ORBITAL WHEEL */}
            <div className="wheel-container">
              
              <div className="wheel-ambient-glow"></div>
              <div className="wheel-track"></div>
              
              {/* Spring Animated Rotator */}
              <div 
                className="wheel-rotator"
                style={{ transform: `rotate(${-activeStep * 90}deg)` }}
              >
                {teamProcess.map((step, i) => (
                  <div 
                    key={i} 
                    className={`wheel-node node-${i} ${activeStep === i ? 'active' : ''}`}
                    onClick={() => setActiveStep(i)}
                  >
                    <div 
                      className="node-icon"
                      style={{ transform: `rotate(${activeStep * 90}deg)` }} 
                    >
                      {step.icon}
                    </div>
                  </div>
                ))}
              </div>

              {/* Central Hub with SVG Progress Ring */}
              <div className="wheel-hub">
                <svg className="hub-svg" viewBox="0 0 140 140">
                  <circle 
                    cx="70" cy="70" r="62" 
                    fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4"
                  />
                  <circle 
                    className="hub-progress"
                    cx="70" cy="70" r="62" 
                    fill="none" stroke="#F16101" strokeWidth="4"
                    strokeDasharray={2 * Math.PI * 62}
                    strokeDashoffset={(2 * Math.PI * 62) * (1 - ((activeStep + 1) / 4))}
                    strokeLinecap="round"
                  />
                </svg>
                <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", fontWeight: 800, letterSpacing: "1px", zIndex: 2 }}>Step</span>
                <span style={{ fontSize: "36px", color: "#ffffff", fontWeight: 900, lineHeight: 1, zIndex: 2 }}>{activeStep + 1}</span>
              </div>

            </div>

            {/* RIGHT: THE CONTENT PANEL */}
            <div className="wheel-panel">
              <div key={activeStep} className="panel-fade">
                <div className="info-watermark">{teamProcess[activeStep].num}</div>
                
                <div style={{ display: "inline-block", background: "rgba(241,97,1,0.1)", color: "#F16101", padding: "6px 14px", borderRadius: "8px", fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "16px" }}>
                  {teamProcess[activeStep].team}
                </div>
                
                <h3 style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 900, color: "#022C45", margin: "0 0 16px", lineHeight: 1.2, letterSpacing: "-0.5px", position: "relative", zIndex: 2 }}>
                  {teamProcess[activeStep].title}
                </h3>
                
                <p style={{ fontSize: "16px", color: "#4B5563", lineHeight: 1.8, margin: 0, position: "relative", zIndex: 2 }}>
                  {teamProcess[activeStep].desc}
                </p>

                {/* Manual Navigation Dots */}
                <div style={{ display: "flex", gap: "8px", marginTop: "40px", position: "relative", zIndex: 2 }}>
                  {teamProcess.map((_, i) => (
                    <div 
                      key={i} 
                      onClick={() => setActiveStep(i)}
                      style={{ 
                        width: activeStep === i ? "24px" : "8px", 
                        height: "8px", 
                        borderRadius: "4px", 
                        background: activeStep === i ? "#F16101" : "rgba(2,44,69,0.1)",
                        transition: "all 0.4s ease",
                        cursor: "pointer"
                      }} 
                    />
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>
      </Section>

      {/* ════════════════════════════════════════════════════════
          4. TRUST & EXPERTISE
      ════════════════════════════════════════════════════════ */}
      <Section bg="#022C45" style={{ padding: isMobile ? "40px 0" : "64px 0" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`, backgroundSize: "64px 64px" }}/>
        <div ref={trustRef.ref} style={{ maxWidth: "1280px", margin: "0 auto", padding: isMobile ? "0 16px" : "0 24px", position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "40px" }}>
          
          <div style={{ flex: "1 1 400px", animation: trustRef.inView ? "fadeLeft 0.6s cubic-bezier(0.22,1,0.36,1) both" : "none", opacity: trustRef.inView ? 1 : 0 }}>
            <h3 style={{ fontSize: "28px", fontWeight: 900, color: "#ffffff", margin: "0 0 12px", letterSpacing: "-0.5px" }}>Trained. Certified. Compliant.</h3>
            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.6)", margin: 0, lineHeight: 1.6, maxWidth: "500px" }}>
              Our entire counseling team undergoes rigorous periodic training and is certified by leading global education authorities.
            </p>
          </div>

          <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", animation: trustRef.inView ? "fadeRight 0.6s cubic-bezier(0.22,1,0.36,1) 0.2s both" : "none", opacity: trustRef.inView ? 1 : 0 }}>
             <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", padding: "16px 24px", borderRadius: "12px", display: "flex", alignItems: "center", gap: "12px", transition: "transform 0.3s ease", cursor: "default" }} onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"} onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#07CBEB", boxShadow: "0 0 10px #07CBEB" }} />
                <span style={{ color: "#ffffff", fontWeight: 800, fontSize: "14px", letterSpacing: "1px" }}>ICEF Accredited</span>
             </div>
             <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", padding: "16px 24px", borderRadius: "12px", display: "flex", alignItems: "center", gap: "12px", transition: "transform 0.3s ease", cursor: "default" }} onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"} onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#F16101", boxShadow: "0 0 10px #F16101" }} />
                <span style={{ color: "#ffffff", fontWeight: 800, fontSize: "14px", letterSpacing: "1px" }}>IDP Certified</span>
             </div>
          </div>

        </div>
      </Section>

      {/* ════════════════════════════════════════════════════════
          5. CTA STRIP
      ════════════════════════════════════════════════════════ */}
      <Section bg="#FDF8F4" style={{ padding: isMobile ? "56px 0 72px" : "100px 0 140px" }}>
        <div ref={ctaRef.ref} style={{ maxWidth: "900px", margin: "0 auto", padding: isMobile ? "0 20px" : "0 24px", textAlign: "center", animation: ctaRef.inView ? "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both" : "none", opacity: ctaRef.inView ? 1 : 0 }}>
          <Eyebrow label="Get Started" />
          <h2 style={{ fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 900, color: "#022C45", letterSpacing: "-0.6px", lineHeight: 1.1, margin: "0 0 16px" }}>
            Speak Directly With<br/>
            <span style={{ background: "linear-gradient(100deg, #F16101, #C9A24D)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Your Regional Expert</span>
          </h2>
          <p style={{ fontSize: "16px", color: "#6B7280", lineHeight: 1.6, margin: "0 auto 36px", maxWidth: "560px" }}>
            Book a free session with your target country's admissions head for accurate, real-time advice tailored to your profile.
          </p>
          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/book-consultation" style={{
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