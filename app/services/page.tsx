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

// ── Expanded Data for High SEO & Psychological Trust ──────────
const servicesData = [
  {
    title: "Student Visa & Admissions",
    tagline: "Study Anywhere. We Handle the Rest.",
    desc: "Navigate the complex landscape of international education with ease. From shortlisting Ivy League universities to securing your study permits, we boast an industry-leading success rate for Indian students transitioning globally.",
    benefits: ["Profile Evaluation & University Shortlisting", "SOP, LOR & Resume Structuring", "High-Success Embassy Interview Prep"],
    href: "/visa/student",
    img: "/images/serv-student.jpg", 
    accent: "#F16101",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    ),
  },
  {
    title: "Business & Investor Visa",
    tagline: "Expand Borders. Build Empires.",
    desc: "Take your business to the global stage. We provide streamlined, confidential visa processing for entrepreneurs, startup founders, and corporate professionals looking to establish or expand their international footprint.",
    benefits: ["Investment & Startup Visa Pathways", "Corporate Immigration Compliance", "Fast-Track Processing for Executives"],
    href: "/visa/business",
    img: "/images/serv-business.jpg",
    accent: "#022C45",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
      </svg>
    ),
  },
  {
    title: "Tourist & Visitor Visa",
    tagline: "See the World. Stress-Free.",
    desc: "Whether it's a European holiday, a USA road trip, or visiting family abroad, we take the stress out of travel documentation. Enjoy hassle-free tourist visa filings with meticulous attention to embassy requirements.",
    benefits: ["Flawless Itinerary & Cover Letter Drafting", "Financial Documentation Support", "Schengen, UK, USA & Canada Expertise"],
    href: "/visa/visitor",
    img: "/images/serv-visitor.jpg",
    accent: "#07CBEB",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
  },
  {
    title: "Dependent & Family Visa",
    tagline: "Keep Your Family Close.",
    desc: "Reuniting families is our priority. We offer dedicated, empathetic assistance for spouse, child, and parent visas, ensuring your loved ones can join you abroad without unnecessary delays or paperwork confusion.",
    benefits: ["Spouse & Child Dependent Permits", "Relationship Proof Documentation", "Post-Study Work Dependent Guidance"],
    href: "/visa/dependent",
    img: "/images/serv-dependent.jpg",
    accent: "#C9A24D",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    title: "Apostille & Legal Translation",
    tagline: "Documents That Open Doors.",
    desc: "International authorities require strict document authentication. We handle complex MEA apostille, state HRD attestations, and certified legal translations to ensure your paperwork is globally recognized.",
    benefits: ["Ministry of External Affairs (MEA) Apostille", "Notary & State HRD Attestation", "Certified Multi-Language Translations"],
    href: "/services/apostille-translation",
    img: "/images/serv-apostille.jpg",
    accent: "#3B6D11",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
  },
  {
    title: "Accommodation & Forex",
    tagline: "Arrive Ready. Stay Comfortable.",
    desc: "Your journey doesn't end when the visa is stamped. We provide vital pre-departure support, helping you secure verified international student housing and facilitating safe, competitive foreign currency exchanges.",
    benefits: ["Verified On/Off-Campus Housing", "GIC & Blocked Account Setup", "Travel Insurance & Flight Ticketing"],
    href: "/services/accommodation-forex",
    img: "/images/serv-accommodation.jpg",
    accent: "#534AB7",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
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
//  SERVICES PAGE
// ═══════════════════════════════════════════════════════════════
export default function ServicesPage() {

  const heroRef = useInView(0.1);
  const listRef = useInView(0.05);
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
        /* Animations */
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideLeft {
          from { opacity: 0; transform: translateX(30px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.85); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes badgePulse {
          0%, 100% { opacity: 1;   transform: scale(1);   }
          50%      { opacity: 0.5; transform: scale(1.4); }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px); }
          50%      { transform: translateY(-15px); }
        }
        @keyframes floatMedium {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50%      { transform: translateY(-20px) rotate(3deg); }
        }
        @keyframes floatFast {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50%      { transform: translateY(-25px) rotate(-4deg); }
        }
        @keyframes pulseGlowCyan {
          0%, 100% { filter: drop-shadow(0 0 15px rgba(7,203,235,0.15)); }
          50%      { filter: drop-shadow(0 0 40px rgba(7,203,235,0.3)); }
        }

        /* Service Detail Card Hover */
        .svc-detail-card {
          border-radius: 24px;
          background: #ffffff;
          border: 1px solid rgba(2,44,69,0.06);
          box-shadow: 0 12px 32px rgba(2,44,69,0.03);
          transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease, border-color 0.4s ease;
          overflow: hidden;
        }
        .svc-detail-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 24px 48px rgba(2,44,69,0.08);
          border-color: rgba(7,203,235,0.4);
        }
        
        /* Image Zoom */
        .img-zoom-container {
          overflow: hidden;
          position: relative;
        }
        .img-zoom {
          transition: transform 0.7s cubic-bezier(0.22,1,0.36,1);
        }
        .svc-detail-card:hover .img-zoom {
          transform: scale(1.05);
        }

        .cta-btn {
          transition: transform 0.18s cubic-bezier(0.4,0,0.2,1);
        }
        .cta-btn:hover {
          transform: translateY(-2px);
        }
      `}</style>

      {/* ════════════════════════════════════════════════════════
          1. HERO — Sleek "Trust & Efficiency" Cool Cyan Gradient
      ════════════════════════════════════════════════════════ */}
      <Section bg="linear-gradient(105deg, #ffffff 0%, #f2f9fb 45%, #dcf2f7 100%)" style={{ padding: "0" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: `linear-gradient(rgba(2,44,69,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(2,44,69,0.03) 1px, transparent 1px)`, backgroundSize: "64px 64px" }}/>
        
        <div ref={heroRef.ref} style={{ maxWidth: "1280px", margin: "auto", padding: isMobile ? "28px 20px 48px" : "60px 24px 80px", position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: isMobile ? "32px" : "64px", flexWrap: "wrap" }}>
          
          {/* LEFT: SEO Optimized Text */}
          <div style={{ flex: isMobile ? "0 0 100%" : "1 1 500px", width: isMobile ? "100%" : undefined }}>
            
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "rgba(7,203,235,0.1)", border: "1px solid rgba(7,203,235,0.3)",
              borderRadius: "999px", padding: "6px 16px", marginBottom: "24px",
              animation: heroRef.inView ? "fadeSlideUp 0.5s ease 0.1s both" : "none",
            }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#07CBEB", display: "inline-block", animation: "badgePulse 1.6s infinite" }}/>
              <span style={{ fontSize: "12px", fontWeight: 800, color: "#022C45", letterSpacing: "0.4px", textTransform: "uppercase" }}>
                Comprehensive Global Solutions
              </span>
            </div>

            <h1 style={{
              fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 900, color: "#022C45", lineHeight: 1.12,
              letterSpacing: "-0.8px", marginBottom: "20px", overflow: "visible", paddingBottom: "14px",
              animation: heroRef.inView ? "fadeSlideUp 0.55s ease 0.2s both" : "none",
            }}>
              Expert Visa &<br/>
              Study Abroad<br/>
              <span style={{
                color: "#07CBEB", position: "relative", display: "inline-block",
                textShadow: "0 2px 16px rgba(7,203,235,0.2)",
              }}>
                Services.
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
              Navigating international admissions and complex visa processes can be overwhelming. As India's premier overseas education consultants, we turn your global aspirations into reality with 100% transparent, expert-led guidance.
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
                  }}>Assess My Profile</span>
                </span>
              </Link>
            </div>
          </div>

          {/* RIGHT: floating nodes — desktop only */}
          {!isMobile && <div style={{ 
            flex: "1 1 450px", position: "relative", minHeight: "450px", 
            display: "flex", justifyContent: "center", alignItems: "center",
            animation: heroRef.inView ? "scaleIn 0.8s cubic-bezier(0.22,1,0.36,1) 0.3s both" : "none",
            opacity: heroRef.inView ? 1 : 0,
          }}>
            {/* Cool Cyan Ambient Glow */}
            <div style={{ position: "absolute", width: "350px", height: "350px", background: "radial-gradient(circle, rgba(7,203,235,0.2), transparent 70%)", borderRadius: "50%", animation: "pulseGlowCyan 4s infinite" }} />
            
            {/* Central Vector Image - Next/Image setup for your transparent PNG */}
            <div style={{ position: "relative", zIndex: 2, width: "380px", height: "380px", animation: "floatSlow 8s infinite" }}>
              <Image 
                src="/images/services-hero-vector.png" 
                alt="Global Visa and Education Services"
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </div>

            {/* Floating Glass Tags */}
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
          2. DETAILED SERVICES LIST (High SEO & Psychological UX)
      ════════════════════════════════════════════════════════ */}
      <Section bg="#F9FAFB" style={{ padding: isMobile ? "48px 0 56px" : "80px 0 100px" }}>
        <div ref={listRef.ref} style={{ maxWidth: "1280px", margin: "0 auto", padding: isMobile ? "0 16px" : "0 24px" }}>
          
          <div style={{ textAlign: "center", marginBottom: "80px", animation: listRef.inView ? "fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both" : "none", opacity: listRef.inView ? 1 : 0 }}>
            <Eyebrow label="Our Expertise" />
            <Heading line1="End-to-End Processing" line2="For Every Requirement" />
            <p style={{ fontSize: "16px", color: "#6B7280", lineHeight: 1.6, maxWidth: "640px", margin: "20px auto 0" }}>
              We eliminate the guesswork. Choose from our comprehensive suite of services, backed by certified professionals and a proven track record.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
            {servicesData.map((serv, i) => (
              <div key={i} className="svc-detail-card" style={{
                display: "flex", flexDirection: isMobile ? "column" : i % 2 !== 0 ? "row-reverse" : "row",
                flexWrap: "wrap",
                animation: listRef.inView ? `fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) ${0.1 + (i * 0.1)}s both` : "none",
                opacity: listRef.inView ? 1 : 0,
              }}>
                
                {/* Image Side */}  
                <div className="img-zoom-container" style={{ flex: isMobile ? "0 0 auto" : "1 1 400px", minHeight: isMobile ? "220px" : "350px", position: "relative", background: "#f0f4f8" }}>
                  <div className="img-zoom" style={{ position: "absolute", inset: 0, background: `url(${serv.img}) center/cover no-repeat` }}>
                     {/* Fallback Icon if image missing */}
                     <svg style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", opacity: 0.05 }} width="80" height="80" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
                  </div>
                  <div style={{ position: "absolute", inset: 0, background: `linear-gradient(${i % 2 !== 0 ? '270deg' : '90deg'}, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 25%)` }} />
                </div>

                {/* Content Side */}
                <div style={{ flex: isMobile ? "0 0 auto" : "1 1 500px", padding: isMobile ? "24px 20px" : "48px 40px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
                    <div style={{ width: "56px", height: "56px", borderRadius: "14px", background: `${serv.accent}15`, color: serv.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {serv.icon}
                    </div>
                    <div>
                      <h3 style={{ fontSize: "26px", fontWeight: 900, color: "#022C45", margin: "0 0 4px", letterSpacing: "-0.5px" }}>{serv.title}</h3>
                      <div style={{ fontSize: "13px", fontWeight: 700, color: serv.accent, textTransform: "uppercase", letterSpacing: "0.5px" }}>{serv.tagline}</div>
                    </div>
                  </div>

                  <p style={{ fontSize: "15px", color: "#4B5563", lineHeight: 1.7, margin: "0 0 28px" }}>
                    {serv.desc}
                  </p>

                  <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "32px", flex: 1 }}>
                    {serv.benefits.map((benefit, bIndex) => (
                      <div key={bIndex} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#07CBEB" strokeWidth="2.5" style={{ flexShrink: 0, marginTop: "2px" }}><polyline points="20 6 9 17 4 12"/></svg>
                        <span style={{ fontSize: "14px", fontWeight: 600, color: "#111827" }}>{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <div>
                    <Link href={serv.href} style={{
                      display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 24px",
                      borderRadius: "8px", border: `1.5px solid ${serv.accent}30`, color: serv.accent,
                      fontSize: "14px", fontWeight: 800, textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.5px",
                      transition: "all 0.3s ease", background: "transparent"
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = serv.accent; e.currentTarget.style.color = "#ffffff"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = serv.accent; }}
                    >
                      View Full Details
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                    </Link>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </Section>

      {/* ════════════════════════════════════════════════════════
          3. BOTTOM CTA BANNER (Decision Paralysis Solver)
      ════════════════════════════════════════════════════════ */}
      <Section bg="#F9FAFB" style={{ padding: isMobile ? "32px 0 56px" : "40px 0 120px" }}>
        <div ref={ctaRef.ref} style={{ maxWidth: "1000px", margin: "0 auto", padding: isMobile ? "0 16px" : "0 24px" }}>
          
          <div style={{
            background: "linear-gradient(135deg, #022C45 0%, #034a72 60%, #022C45 100%)",
            borderRadius: "24px", padding: isMobile ? "28px 20px" : "48px",
            display: "flex", alignItems: "center", justifyContent: "space-between", gap: "32px", flexWrap: "wrap",
            position: "relative", overflow: "hidden",
            boxShadow: "0 24px 48px rgba(2,44,69,0.15)",
            animation: ctaRef.inView ? "scaleIn 0.6s cubic-bezier(0.22,1,0.36,1) both" : "none", opacity: ctaRef.inView ? 1 : 0
          }}>
            {/* Background orb */}
            <div style={{ position: "absolute", right: "-80px", top: "-80px", width: "320px", height: "320px", borderRadius: "50%", background: "radial-gradient(circle, rgba(7,203,235,0.15) 0%, transparent 70%)", pointerEvents: "none" }}/>

            <div style={{ position: "relative", zIndex: 1, flex: "1 1 400px" }}>
              <div style={{ display: "inline-block", background: "rgba(7,203,235,0.2)", color: "#8ce7f7", fontSize: "11px", fontWeight: 800, padding: "6px 12px", borderRadius: "6px", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "1px" }}>
                Expert Guidance
              </div>
              <h2 style={{ fontSize: "clamp(26px, 3vw, 32px)", fontWeight: 900, color: "white", letterSpacing: "-0.5px", margin: "0 0 12px" }}>
                Not Sure Which Service You Need?
              </h2>
              <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.7)", margin: 0, lineHeight: 1.6, maxWidth: "480px" }}>
                Don't let document confusion delay your future. Speak with an expert today for a free, no-obligation profile assessment.
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
                Book Free Consultation →
              </span>
            </Link>
          </div>

        </div>
      </Section>

    </main>
  );
}