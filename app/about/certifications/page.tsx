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

// ── Data: Certifications ──────────────────────────────────────
const certificationsData = [
  { 
    title: "Pearson Certified Counsellor", 
    issuer: "Government Authority", 
    desc: "Officially trained and recognized educational consultancy, ensuring compliance with all legal and operational regulations.", 
    img: "/images/cert-pearson.png" 
  },
  { 
    title: "ICEF Agency Status", 
    issuer: "ICEF Global", 
    desc: "A globally recognized benchmark of quality for study abroad agencies, demonstrating strict adherence to ethical international education standards.", 
    img: "/images/certifications/icef.png" 
  },
  { 
    title: "ISO 9001:2015 Certified", 
    issuer: "International Organization for Standardization", 
    desc: "Recognized for maintaining stringent quality management systems in overseas education counseling and international student recruitment.", 
    img: "/images/cert-iso.png" 
  },
  { 
    title: "UniAgents Certified", 
    issuer: "UniAgents Global", 
    desc: "Verified global application and mobility ecosystem partner, connecting students to a wide network of international educational institutions.", 
    img: "/images/cert-uniagents.png" 
  },
  { 
    title: "IDP Certified Counsellor", 
    issuer: "IDP Education", 
    desc: "Officially trained and certified to provide expert, up-to-date guidance for students aspiring to enroll in top universities globally.", 
    img: "/images/cert-idp.jpg" 
  },
  { 
    title: "UK Agent & Counsellor", 
    issuer: "British Council UK", 
    desc: "Official certification award for successful completion of the comprehensive UK agent and counsellor training program.", 
    img: "/images/certifications/bc-agent-training.jpg" 
  },
  { 
    title: "Instructional Leadership", 
    issuer: "British Council UK", 
    desc: "Certificate of Achievement for Exploring Instructional Leadership in Education, demonstrating advanced leadership techniques.", 
    img: "/images/certifications/bc-instructional-leadership.jpg" 
  },
  { 
    title: "Study UK: Prepare to Study", 
    issuer: "British Council UK", 
    desc: "Certificate of Achievement for mastering the UK Higher Education system and preparing students for success in the UK.", 
    img: "/images/certifications/bc-prepare-to-study.jpg" 
  },
  { 
    title: "Guide for Education Agents", 
    issuer: "British Council UK", 
    desc: "Certification developing deep, actionable knowledge of UK education and the benefits of Study UK for aspiring international students.", 
    img: "/images/certifications/bc-guide-for-agents.jpg" 
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
function Heading({ line1, line2, color = "#111827" }: { line1: string; line2: string; color?: string }) {
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
//  CERTIFICATIONS PAGE
// ═══════════════════════════════════════════════════════════════
export default function CertificationsPage() {

  const heroRef = useInView(0.1);
  const gridRef = useInView(0.1);
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
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.85); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes badgePulse {
          0%, 100% { opacity: 1;   transform: scale(1);   }
          50%      { opacity: 0.5; transform: scale(1.4); }
        }
        
        /* Floating Graphic Animations */
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px); }
          50%      { transform: translateY(-15px); }
        }
        @keyframes floatMedium {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50%      { transform: translateY(-20px) rotate(2deg); }
        }
        @keyframes floatFast {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50%      { transform: translateY(-25px) rotate(-3deg); }
        }
        @keyframes pulseGlowOrange {
          0%, 100% { filter: drop-shadow(0 0 15px rgba(241,97,1,0.12)); }
          50%      { filter: drop-shadow(0 0 35px rgba(241,97,1,0.28)); }
        }

        /* Certificate Card Hover Effects */
        .cert-card {
          background: #ffffff;
          border-radius: 16px;
          border: 1px solid rgba(17,24,39,0.06);
          box-shadow: 0 8px 24px rgba(17,24,39,0.03);
          transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease, border-color 0.4s ease;
          overflow: hidden;
          position: relative;
        }
        .cert-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 24px 48px rgba(17,24,39,0.08);
          border-color: rgba(201,162,77,0.4);
        }
        
        /* Vertical Portrait Image Container for A4 Documents */
        .img-container {
          overflow: hidden;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f8fafc;
        }
        .img-zoom {
          transition: transform 0.7s cubic-bezier(0.22,1,0.36,1);
          width: 100%;
          height: 100%;
          position: relative;
        }
        .cert-card:hover .img-zoom {
          transform: scale(1.04);
        }

        /* Button Hover */
        .btn-outline {
          transition: all 0.3s cubic-bezier(0.22,1,0.36,1);
        }
        .btn-outline:hover {
          background: rgba(241,97,1,0.04) !important;
          border-color: rgba(241,97,1,0.3) !important;
          transform: translateY(-3px);
          box-shadow: 0 8px 16px rgba(241,97,1,0.08);
        }
        .cta-btn {
          transition: transform 0.18s cubic-bezier(0.4,0,0.2,1);
        }
        .cta-btn:hover {
          transform: translateY(-2px);
        }
      `}</style>

      {/* ════════════════════════════════════════════════════════
          1. HERO — Custom User Gradient with High-Contrast Elements
      ════════════════════════════════════════════════════════ */}
      <Section bg="linear-gradient(105deg, #ffffff 0%, #fdf6ee 40%, #fde8c8 100%)" style={{ padding: "0" }}>
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
                100% Verified & Compliant
              </span>
            </div>

            <h1 style={{
              fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 900, color: "#022C45", lineHeight: 1.12,
              letterSpacing: "-0.8px", marginBottom: "20px",
              overflow: "visible",
              paddingBottom: "14px",
              animation: heroRef.inView ? "fadeSlideUp 0.55s ease 0.2s both" : "none",
            }}>
              Globally Accredited<br/>
              Education<br/>
              <span style={{
                color: "#F16101",
                position: "relative", display: "inline-block",
                textShadow: "0 2px 16px rgba(241,97,1,0.18)",
              }}>
                Consultants.
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
              Partner with an internationally recognized overseas education consultant. We hold official certifications from the world's leading education authorities, ensuring your study abroad journey is secure, ethical, and successful.
            </p>
            
            <div style={{
              animation: heroRef.inView ? "fadeSlideUp 0.55s ease 0.4s both" : "none",
            }}>
              <Link href="/book-consultation" className="cta-btn" style={{
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
                  }}>Book Free Consultation</span>
                </span>
              </Link>
            </div>
          </div>

          {/* RIGHT: High-Contrast Solid White Floating Vectors — desktop only */}
          {!isMobile && <div style={{ 
            flex: "1 1 450px", position: "relative", minHeight: "450px", 
            display: "flex", justifyContent: "center", alignItems: "center",
            animation: heroRef.inView ? "scaleIn 0.8s cubic-bezier(0.22,1,0.36,1) 0.3s both" : "none",
            opacity: heroRef.inView ? 1 : 0,
          }}>
            {/* Ambient Back Glow */}
            <div style={{ position: "absolute", width: "350px", height: "350px", background: "radial-gradient(circle, rgba(241,97,1,0.15), transparent 70%)", borderRadius: "50%", animation: "pulseGlowOrange 4s infinite" }} />
            
            {/* Center Hub SVG (Verification Shield) */}
            <div style={{ position: "relative", zIndex: 2, animation: "floatSlow 6s infinite" }}>
              <div style={{ width: "140px", height: "140px", borderRadius: "24px", background: "#ffffff", border: "2px solid rgba(241,97,1,0.4)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 20px 40px rgba(241,97,1,0.15)", transform: "rotate(45deg)" }}>
                <div style={{ transform: "rotate(-45deg)", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <svg width="54" height="54" viewBox="0 0 24 24" fill="none" stroke="#F16101" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                        <path d="M9 12l2 2 4-4"/>
                    </svg>
                </div>
              </div>
            </div>

            {/* Connecting Vector Lines */}
            <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 1 }} viewBox="0 0 500 500">
              <path d="M250 250 L120 120" stroke="rgba(2,44,69,0.15)" strokeWidth="2" strokeDasharray="6 6" />
              <path d="M250 250 L380 140" stroke="rgba(2,44,69,0.15)" strokeWidth="2" strokeDasharray="6 6" />
              <path d="M250 250 L140 380" stroke="rgba(2,44,69,0.15)" strokeWidth="2" strokeDasharray="6 6" />
              <path d="M250 250 L360 360" stroke="rgba(2,44,69,0.15)" strokeWidth="2" strokeDasharray="6 6" />
            </svg>

            {/* Floating Vector Node 1: Globally Recognized (Orange) */}
            <div style={{ position: "absolute", top: "50px", left: "40px", zIndex: 3, animation: "floatFast 5s infinite" }}>
              <div style={{ background: "#ffffff", border: "1px solid rgba(255,255,255,1)", padding: "12px 16px", borderRadius: "16px", display: "flex", alignItems: "center", gap: "12px", boxShadow: "0 16px 40px rgba(2,44,69,0.08)" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(241,97,1,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F16101" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
                </div>
                <div>
                  <div style={{ fontSize: "12px", fontWeight: 800, color: "#022C45" }}>Globally</div>
                  <div style={{ fontSize: "10px", color: "#6B7280", textTransform: "uppercase", fontWeight: 700 }}>Recognized</div>
                </div>
              </div>
            </div>

            {/* Floating Vector Node 2: Strict Compliance (Gold) */}
            <div style={{ position: "absolute", top: "80px", right: "30px", zIndex: 3, animation: "floatMedium 7s infinite" }}>
              <div style={{ background: "#ffffff", border: "1px solid rgba(255,255,255,1)", padding: "12px 16px", borderRadius: "16px", display: "flex", alignItems: "center", gap: "12px", boxShadow: "0 16px 40px rgba(2,44,69,0.08)" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(201,162,77,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A24D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                </div>
                <div>
                  <div style={{ fontSize: "12px", fontWeight: 800, color: "#022C45" }}>Strict</div>
                  <div style={{ fontSize: "10px", color: "#6B7280", textTransform: "uppercase", fontWeight: 700 }}>Compliance</div>
                </div>
              </div>
            </div>

            {/* Floating Vector Node 3: ISO Certified (Cyan) */}
            <div style={{ position: "absolute", bottom: "80px", left: "20px", zIndex: 3, animation: "floatMedium 6s infinite reverse" }}>
              <div style={{ background: "#ffffff", border: "1px solid rgba(255,255,255,1)", padding: "12px 16px", borderRadius: "16px", display: "flex", alignItems: "center", gap: "12px", boxShadow: "0 16px 40px rgba(2,44,69,0.08)" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(7,203,235,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#07CBEB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                </div>
                <div>
                  <div style={{ fontSize: "12px", fontWeight: 800, color: "#022C45" }}>ISO 9001</div>
                  <div style={{ fontSize: "10px", color: "#6B7280", textTransform: "uppercase", fontWeight: 700 }}>Certified</div>
                </div>
              </div>
            </div>

            {/* Floating Vector Node 4: Ethical Practices (Navy) */}
            <div style={{ position: "absolute", bottom: "50px", right: "60px", zIndex: 3, animation: "floatFast 8s infinite reverse" }}>
              <div style={{ background: "#ffffff", border: "1px solid rgba(255,255,255,1)", padding: "12px 16px", borderRadius: "16px", display: "flex", alignItems: "center", gap: "12px", boxShadow: "0 16px 40px rgba(2,44,69,0.08)" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(2,44,69,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#022C45" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
                </div>
                <div>
                  <div style={{ fontSize: "12px", fontWeight: 800, color: "#022C45" }}>Ethical</div>
                  <div style={{ fontSize: "10px", color: "#6B7280", textTransform: "uppercase", fontWeight: 700 }}>Practices</div>
                </div>
              </div>
            </div>

          </div>}

        </div>

        {/* Deep Arch SVG — desktop only; on mobile it renders as an ugly rectangle due to narrow viewport */}
        {!isMobile && (
          <div style={{ position: "relative", lineHeight: 0, zIndex: 1, marginTop: "20px" }}>
            <svg viewBox="0 0 1440 120" style={{ display: "block", width: "100%", height: "80px" }} preserveAspectRatio="none">
              <path d="M0,0 C480,140 960,140 1440,0 L1440,120 L0,120 Z" fill="#F9FAFB"/>
            </svg>
          </div>
        )}
      </Section>

      {/* ════════════════════════════════════════════════════════
          2. CERTIFICATIONS GRID (Vertical Portrait Layout)
      ════════════════════════════════════════════════════════ */}
      <Section bg="#F9FAFB" style={{ padding: isMobile ? "48px 0 64px" : "80px 0 100px" }}>
        <div ref={gridRef.ref} style={{ maxWidth: "1280px", margin: "0 auto", padding: isMobile ? "0 16px" : "0 24px" }}>
          
          <div style={{ textAlign: "center", marginBottom: isMobile ? "36px" : "64px", animation: gridRef.inView ? "fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both" : "none", opacity: gridRef.inView ? 1 : 0 }}>
            <Eyebrow label="Official Documents" />
            <Heading line1="Our Global Accreditations" line2="& Authorizations" />
            <p style={{ fontSize: isMobile ? "14px" : "16px", color: "#6B7280", lineHeight: 1.6, maxWidth: "640px", margin: "20px auto 0" }}>
              Every certification below represents our commitment to providing students and partner institutions with the highest level of reliable, compliant service.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(auto-fill, minmax(280px, 1fr))", gap: isMobile ? "16px" : "32px" }}>
            {certificationsData.map((cert, i) => (
              <div key={i} className="cert-card" style={{
                animation: gridRef.inView ? `fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) ${0.1 + (i * 0.08)}s both` : "none",
                opacity: gridRef.inView ? 1 : 0,
                display: "flex", flexDirection: "column"
              }}>
                {/* 1:1.414 aspect ratio perfectly matches standard A4 document proportions */}
                <div className="img-container" style={{ width: "100%", aspectRatio: "1 / 1.414", borderBottom: "1px solid rgba(17,24,39,0.06)" }}>
                  
                  <div className="img-zoom" style={{ position: "relative", width: "100%", height: "100%" }}>
                     {/* Padding removed to allow image to span edge-to-edge natively */}
                     <Image src={cert.img} alt={cert.title} fill style={{ objectFit: "contain" }} />
                  </div>
                  
                </div>

                <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", flex: 1 }}>
                  <h3 style={{ fontSize: "17.5px", fontWeight: 900, color: "#111827", margin: "0 0 6px", letterSpacing: "-0.3px" }}>{cert.title}</h3>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "#C9A24D", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "12px", display: "flex", alignItems: "center", gap: "6px" }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    {cert.issuer}
                  </div>
                  <p style={{ fontSize: "13.5px", color: "#6B7280", lineHeight: 1.6, margin: 0 }}>
                    {cert.desc}
                  </p>
                </div>
                
                {/* Bottom Accent Bar */}
                <div style={{ height: "4px", width: "100%", background: "linear-gradient(90deg, #F16101, #C9A24D)" }} />
              </div>
            ))}
          </div>

        </div>
      </Section>

      {/* ════════════════════════════════════════════════════════
          3. CTA STRIP
      ════════════════════════════════════════════════════════ */}
      <Section bg="#FDF8F4" style={{ padding: isMobile ? "56px 0 72px" : "100px 0 140px" }}>
        <div ref={ctaRef.ref} style={{ maxWidth: "900px", margin: "0 auto", padding: isMobile ? "0 20px" : "0 24px", textAlign: "center", animation: ctaRef.inView ? "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both" : "none", opacity: ctaRef.inView ? 1 : 0 }}>
          <Eyebrow label="Trust & Transparency" />
          <h2 style={{ fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 900, color: "#111827", letterSpacing: "-0.6px", lineHeight: 1.1, margin: "0 0 16px" }}>
            Ready To Work With<br/>
            <span style={{ background: "linear-gradient(100deg, #F16101, #C9A24D)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>A Certified Partner?</span>
          </h2>
          <p style={{ fontSize: "16px", color: "#6B7280", lineHeight: 1.6, margin: "0 auto 36px", maxWidth: "560px" }}>
            Whether you are a student planning your future or a university looking for a reliable recruitment partner, we are fully accredited to assist you.
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
              border: "1.5px solid rgba(17,24,39,0.15)",
              background: "transparent", color: "#111827",
              fontSize: "14px", fontWeight: 800, textDecoration: "none",
              textTransform: "uppercase", letterSpacing: "1px",
            }}>
              Partner With Us
            </Link>
          </div>
        </div>
      </Section>

    </main>
  );
}