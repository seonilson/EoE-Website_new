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

// ── Data: Visitor Visa Process Flow ───────────────────────────
const processSteps = [
  { step: "01", title: "Travel Consultation", desc: "We evaluate your travel history, financial standing, and ties to your home country to ensure a strong application." },
  { step: "02", title: "Itinerary Planning", desc: "Crafting detailed, day-by-day travel itineraries and securing verifiable flight and hotel bookings." },
  { step: "03", title: "Document Prep", desc: "Gathering crucial documents including cover letters, NOCs from employers, and certified bank statements." },
  { step: "04", title: "Visa Filing", desc: "Flawless completion of complex embassy applications tailored specifically to tourist and visitor requirements." },
  { step: "05", title: "Interview & Biometrics", desc: "Scheduling VFS appointments and providing comprehensive prep for potential consulate interviews." },
  { step: "06", title: "Visa Approval", desc: "Passport collection and final pre-departure guidance, including foreign exchange and travel insurance." }
];

// ── Data: Destinations & Visitor Services (6 Items) ───────────
const detailedServices = [
  { 
    size: "large", // Spans 2 columns
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    title: "Schengen Visa Specialists", tagline: "Access 27 European Nations", accent: "#07CBEB",
    desc: "Experience the ultimate European vacation. We simplify the complex Schengen visa process, ensuring your application meets the strict requirements of your primary destination country.",
    benefits: ["Single & Multiple Entry Visas", "France, Switzerland, Germany & Italy", "Detailed EU Travel Itineraries"]
  },
  { 
    size: "small", // Spans 1 column
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
    title: "USA B1/B2 Visas", tagline: "10-Year Multiple Entry", accent: "#022C45",
    desc: "From tourism to visiting family, we prep you rigorously for the crucial DS-160 and US Embassy interview.",
    benefits: ["DS-160 Form Assistance", "Mock Embassy Interviews", "B1/B2 Category Guidance"]
  },
  { 
    size: "small", // Spans 1 column
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
    title: "UK Visitor Visas", tagline: "Standard & Family Visits", accent: "#F16101",
    desc: "Expert documentation support for UK standard visitor visas, ensuring all proof of funds and ties are presented perfectly.",
    benefits: ["6-Month Tourist Visas", "Family & Friends Sponsorship", "VFS Appointment Booking"]
  },
  { 
    size: "large", // Spans 2 columns
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
    title: "Custom Travel Itineraries", tagline: "Flawless Day-by-Day Plans", accent: "#07CBEB",
    desc: "Embassy officials demand clear travel intent. Our travel experts draft comprehensive, realistic daily itineraries that align perfectly with your finances and visa duration, minimizing the risk of rejection.",
    benefits: ["Day-by-Day Activity Outlines", "Inter-City Transport Planning", "Attraction & Tour Inclusions"]
  },
  { 
    size: "large", // Spans 2 columns
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
    title: "Flight & Hotel Bookings", tagline: "Secure Verifiable Reservations", accent: "#022C45",
    desc: "Never risk losing money on non-refundable tickets before your visa is approved. We provide legitimate, verifiable flight itineraries and hotel bookings that strictly satisfy embassy documentary requirements.",
    benefits: ["Verifiable Flight Itineraries", "Refundable Hotel Reservations", "Proof of Accommodation"]
  },
  { 
    size: "small", // Spans 1 column
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    title: "Travel Insurance", tagline: "Mandatory Protection", accent: "#F16101",
    desc: "Secure embassy-approved international travel insurance covering medical emergencies and trip cancellations.",
    benefits: ["Schengen-Approved Policies", "COVID-19 & Medical Coverage", "Zero-Deductible Options"]
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
          <defs><linearGradient id="ulineVis" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#07CBEB"/><stop offset="100%" stopColor="#022C45"/></linearGradient></defs>
          <path d="M0,3 Q75,0 150,3 Q225,7 300,3" stroke="url(#ulineVis)" strokeWidth="3" fill="none" strokeLinecap="round"/>
        </svg>
      </span>
    </h2>
  );
}

// ═══════════════════════════════════════════════════════════════
//  VISITOR VISA PAGE
// ═══════════════════════════════════════════════════════════════
export default function VisitorVisaPage() {
  useEffect(() => { document.title = "Visitor & Tourist Visa — Fast Track Application Support | Edification Overseas"; }, []);

  const heroRef = useInView(0.1);
  const flowRef = useInView(0.1);
  const bentoRef = useInView(0.05);
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

      {/* Embedded CSS safely using dangerouslySetInnerHTML to prevent parsing errors */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* Entrance Animations */
        @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.85); } to { opacity: 1; transform: scale(1); } }
        @keyframes floatSlow { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
        @keyframes floatMedium { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-20px) rotate(3deg); } }
        @keyframes floatFast { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-25px) rotate(-4deg); } }
        @keyframes pulseGlowCyan { 0%, 100% { filter: drop-shadow(0 0 15px rgba(7,203,235,0.15)); } 50% { filter: drop-shadow(0 0 40px rgba(7,203,235,0.3)); } }
        @keyframes badgePulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.4); } }
        
        /* Airplane Flight Animation inside the Boarding Pass */
        @keyframes flyPlane {
          0% { transform: translate(0px, 80px) rotate(0deg); opacity: 0; }
          15% { opacity: 1; transform: translate(30px, 60px) rotate(25deg); }
          85% { opacity: 1; transform: translate(120px, 10px) rotate(25deg); }
          100% { transform: translate(150px, -10px) rotate(30deg); opacity: 0; }
        }

        /* ── AIRLINE TICKET ROADMAP CSS ── */
        .ticket-card {
          display: flex; width: 100%; background: #ffffff; border-radius: 20px;
          box-shadow: 0 12px 32px rgba(2,44,69,0.04); border: 1px solid rgba(2,44,69,0.04);
          overflow: hidden; margin-bottom: 32px; position: relative;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .ticket-card:hover {
          transform: translateY(-4px); box-shadow: 0 20px 40px rgba(7,203,235,0.1);
        }
        .ticket-stub {
          width: 140px; background: linear-gradient(135deg, #022C45 0%, #054f77 100%);
          display: flex; flex-direction: column; justify-content: center; align-items: center;
          padding: 24px; color: white; flex-shrink: 0;
        }
        .ticket-tear {
          width: 0px; position: relative; border-right: 2px dashed #E5E7EB;
        }
        .ticket-cutout-top {
          position: absolute; top: -12px; left: -10px; width: 22px; height: 22px;
          border-radius: 50%; background: #F9FAFB;
        }
        .ticket-cutout-bottom {
          position: absolute; bottom: -12px; left: -10px; width: 22px; height: 22px;
          border-radius: 50%; background: #F9FAFB;
        }
        .ticket-body {
          flex: 1; padding: 40px; position: relative; display: flex; align-items: center;
        }
        .flight-animation-wrapper {
          position: absolute; right: 40px; top: 50%; transform: translateY(-50%);
          width: 150px; height: 100px; pointer-events: none;
        }

        /* Mobile Adjustments for Boarding Pass */
        @media (max-width: 768px) {
          .ticket-card { flex-direction: column; }
          .ticket-stub { width: 100%; flex-direction: row; height: auto; padding: 20px 24px; justify-content: flex-start; gap: 20px; }
          .ticket-tear { border-right: none; border-bottom: 2px dashed #E5E7EB; width: 100%; height: 0; }
          .ticket-cutout-top { top: -10px; left: -10px; }
          .ticket-cutout-bottom { bottom: auto; top: -10px; left: auto; right: -10px; }
          .ticket-body { padding: 24px; }
          .flight-animation-wrapper { display: none; }
        }

        /* ── THE BENTO BOX SERVICES GRID ── */
        .bento-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-top: 40px;
        }
        .bento-card {
          background: #ffffff; border-radius: 20px; padding: 40px;
          border: 1px solid rgba(2,44,69,0.06); box-shadow: 0 12px 32px rgba(2,44,69,0.03);
          position: relative; overflow: hidden; display: flex; flex-direction: column;
          transition: transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;
        }
        .bento-card:hover {
          transform: translateY(-6px); box-shadow: 0 24px 48px rgba(7,203,235,0.1);
          border-color: rgba(7,203,235,0.3);
        }
        .bento-large { grid-column: span 2; }
        .bento-small { grid-column: span 1; }
        .bento-watermark {
          position: absolute; right: -20px; bottom: -20px;
          opacity: 0.03; pointer-events: none;
        }
        
        @media (max-width: 1024px) {
          .bento-grid { grid-template-columns: 1fr; }
          .bento-large, .bento-small { grid-column: span 1; }
          .bento-card { padding: 32px 24px; }
        }

        .cta-btn { transition: transform 0.18s cubic-bezier(0.4,0,0.2,1); }
        .cta-btn:hover { transform: translateY(-2px); }
      `}} />

      {/* ════════════════════════════════════════════════════════
          1. HERO — Visitor Theme with 4 Floating Elements
      ════════════════════════════════════════════════════════ */}
      <Section bg="linear-gradient(105deg, #ffffff 0%, #f2f9fb 45%, #dcf2f7 100%)" style={{ padding: "0" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: `linear-gradient(rgba(2,44,69,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(2,44,69,0.03) 1px, transparent 1px)`, backgroundSize: "64px 64px" }}/>
        
        <div ref={heroRef.ref} style={{ maxWidth: "1280px", margin: "auto", padding: isMobile ? "28px 20px 48px" : "60px 24px 80px", position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: isMobile ? "32px" : "64px", flexWrap: "wrap" }}>
          
          {/* LEFT: Tourist Focused SEO Text */}
          <div style={{ flex: isMobile ? "0 0 100%" : "1 1 500px", width: isMobile ? "100%" : undefined }}>
            
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "rgba(7,203,235,0.1)", border: "1px solid rgba(7,203,235,0.3)",
              borderRadius: "999px", padding: "6px 16px", marginBottom: "24px",
              animation: heroRef.inView ? "fadeSlideUp 0.5s ease 0.1s both" : "none",
            }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#07CBEB", display: "inline-block", animation: "badgePulse 1.6s infinite" }}/>
              <span style={{ fontSize: "12px", fontWeight: 800, color: "#022C45", letterSpacing: "0.4px", textTransform: "uppercase" }}>
                Global Travel & Tourist Visas
              </span>
            </div>

            <h1 style={{
              fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 900, color: "#022C45", lineHeight: 1.12,
              letterSpacing: "-0.8px", marginBottom: "20px", overflow: "visible", paddingBottom: "14px",
              animation: heroRef.inView ? "fadeSlideUp 0.55s ease 0.2s both" : "none",
            }}>
              Explore The<br/>
              World<br/>
              <span style={{
                color: "#07CBEB", position: "relative", display: "inline-block",
                textShadow: "0 2px 16px rgba(7,203,235,0.2)",
              }}>
                Freely.
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
              Seamless tourist and visitor visa processing. Whether you&apos;re planning a European vacation, visiting relatives in the US, or exploring new destinations, we handle the complex itineraries and embassy paperwork so you can focus on the journey.
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
                  }}>Evaluate Travel Profile</span>
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
            
            {/* Main Visitor Vector Image */}
            <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: "380px", aspectRatio: "1/1", animation: "floatSlow 8s infinite ease-in-out" }}>
              <Image 
                src="/images/visitor-hero-vector.png" 
                alt="Tourist and Visitor Visa Processing"
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </div>

            {/* 4 Floating Glass Vectors for Visitor Visas */}
            <div style={{ position: "absolute", top: "40px", left: "20px", zIndex: 3, animation: "floatFast 5s infinite" }}>
              <div style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,1)", padding: "10px 16px", borderRadius: "999px", display: "flex", alignItems: "center", gap: "8px", boxShadow: "0 16px 40px rgba(2,44,69,0.08)" }}>
                <span style={{ fontSize: "16px" }}>🏖️</span>
                <span style={{ fontSize: "12px", fontWeight: 800, color: "#022C45" }}>Tourist Visa</span>
              </div>
            </div>

            <div style={{ position: "absolute", top: "100px", right: "10px", zIndex: 3, animation: "floatMedium 7s infinite" }}>
              <div style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,1)", padding: "10px 16px", borderRadius: "999px", display: "flex", alignItems: "center", gap: "8px", boxShadow: "0 16px 40px rgba(2,44,69,0.08)" }}>
                <span style={{ fontSize: "16px" }}>✈️</span>
                <span style={{ fontSize: "12px", fontWeight: 800, color: "#022C45" }}>Flight Booking</span>
              </div>
            </div>

            <div style={{ position: "absolute", bottom: "90px", left: "10px", zIndex: 3, animation: "floatMedium 6s infinite reverse" }}>
              <div style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,1)", padding: "10px 16px", borderRadius: "999px", display: "flex", alignItems: "center", gap: "8px", boxShadow: "0 16px 40px rgba(2,44,69,0.08)" }}>
                <span style={{ fontSize: "16px" }}>🗺️</span>
                <span style={{ fontSize: "12px", fontWeight: 800, color: "#022C45" }}>Planned Itinerary</span>
              </div>
            </div>

            <div style={{ position: "absolute", bottom: "40px", right: "40px", zIndex: 3, animation: "floatFast 8s infinite reverse" }}>
              <div style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,1)", padding: "10px 16px", borderRadius: "999px", display: "flex", alignItems: "center", gap: "8px", boxShadow: "0 16px 40px rgba(2,44,69,0.08)" }}>
                <span style={{ fontSize: "16px" }}>🛂</span>
                <span style={{ fontSize: "12px", fontWeight: 800, color: "#022C45" }}>Visitor Visa</span>
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
          2. THE DIGITAL BOARDING PASS ROADMAP (Flight UI)
      ════════════════════════════════════════════════════════ */}
      <Section bg="#F9FAFB" style={{ padding: isMobile ? "48px 0 56px" : "80px 0 100px" }}>
        <div ref={flowRef.ref} style={{ maxWidth: "900px", margin: "0 auto", padding: isMobile ? "0 16px" : "0 24px" }}>
          
          <div style={{ textAlign: "center", marginBottom: "64px", animation: flowRef.inView ? "fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both" : "none", opacity: flowRef.inView ? 1 : 0 }}>
            <Eyebrow label="Your Journey" />
            <Heading line1="The Visitor Visa Process" line2="Step-by-Step" />
            <p style={{ fontSize: "16px", color: "#6B7280", lineHeight: 1.6, maxWidth: "600px", margin: "20px auto 0" }}>
              We eliminate confusion by breaking down the complex international tourist and visitor visa process into six transparent, manageable steps.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {processSteps.map((step, i) => (
              <div key={i} className="ticket-card" style={{
                animation: flowRef.inView ? `fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) ${i * 0.15}s both` : "none",
                opacity: flowRef.inView ? 1 : 0
              }}>
                
                {/* Left Stub - The 'Departure' */}
                <div className="ticket-stub">
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "2px", textTransform: "uppercase", color: "#07CBEB", marginBottom: "8px" }}>Phase</div>
                    <div style={{ fontSize: "44px", fontWeight: 900, lineHeight: 1 }}>{step.step}</div>
                  </div>
                  {/* Minimal Barcode Graphic */}
                  <div style={{ display: "flex", gap: "3px", marginTop: "16px", height: "16px", opacity: 0.4 }}>
                    <div style={{ width: "3px", background: "white" }}/>
                    <div style={{ width: "1px", background: "white" }}/>
                    <div style={{ width: "4px", background: "white" }}/>
                    <div style={{ width: "2px", background: "white" }}/>
                    <div style={{ width: "3px", background: "white" }}/>
                    <div style={{ width: "1px", background: "white" }}/>
                    <div style={{ width: "4px", background: "white" }}/>
                  </div>
                </div>

                {/* The Tear Line */}
                <div className="ticket-tear">
                  <div className="ticket-cutout-top" />
                  <div className="ticket-cutout-bottom" />
                </div>

                {/* Right Body - Content and Animation */}
                <div className="ticket-body">
                  
                  {/* Animated Flight Path strictly visible on Desktop */}
                  <div className="flight-animation-wrapper">
                    <svg width="150" height="100" viewBox="0 0 150 100" style={{ position: "absolute", top: 0, left: 0 }}>
                      <path d="M0,80 Q75,80 150,20" fill="none" stroke="#07CBEB" strokeWidth="2" strokeDasharray="4 4" style={{ opacity: 0.3 }} />
                    </svg>
                    <div style={{ position: "absolute", top: "-15px", left: "-15px", animation: "flyPlane 5s ease-in-out infinite", animationDelay: `${i * 0.8}s` }}>
                      <svg width="30" height="30" viewBox="0 0 24 24" fill="#07CBEB">
                         <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                      </svg>
                    </div>
                  </div>

                  <div style={{ position: "relative", zIndex: 1, maxWidth: "calc(100% - 160px)" }}>
                    <h3 style={{ fontSize: "22px", fontWeight: 900, color: "#022C45", marginBottom: "12px" }}>{step.title}</h3>
                    <p style={{ fontSize: "15px", color: "#6B7280", lineHeight: 1.6, margin: 0 }}>{step.desc}</p>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      </Section>

      {/* ════════════════════════════════════════════════════════
          3. BENTO BOX VISITOR SERVICES (High SEO)
      ════════════════════════════════════════════════════════ */}
      <Section bg="#ffffff" style={{ padding: isMobile ? "48px 0 56px" : "100px 0 120px" }}>
        <div ref={bentoRef.ref} style={{ maxWidth: "1280px", margin: "0 auto", padding: isMobile ? "0 16px" : "0 24px" }}>
          
          <div style={{ textAlign: "center", marginBottom: "64px", animation: bentoRef.inView ? "fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both" : "none", opacity: bentoRef.inView ? 1 : 0 }}>
            <Eyebrow label="Complete Support" />
            <Heading line1="End-to-End Solutions" line2="For Global Travelers" />
            {/* Perfectly shortened and broken text to guarantee 2 uniform rows */}
            <p style={{ fontSize: "16px", color: "#6B7280", lineHeight: 1.6, maxWidth: "720px", margin: "20px auto 0" }}>
              From drafting precise itineraries and booking verifiable flight tickets<br className="hidden md:block" />
              to securing travel insurance and embassy prep, we ensure a smooth journey.
            </p>
          </div>

          <div className="bento-grid">
            {detailedServices.map((service, i) => (
              <div key={i} className={`bento-card ${service.size === 'large' ? 'bento-large' : 'bento-small'}`} style={{
                animation: bentoRef.inView ? `fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) ${i * 0.08}s both` : "none",
                opacity: bentoRef.inView ? 1 : 0,
              }}>
                
                {/* SVG Watermark safely casted */}
                <div className="bento-watermark" style={{ color: service.accent }}>
                  {React.cloneElement(service.icon as any, { width: 160, height: 160, strokeWidth: 1 })}
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px", position: "relative", zIndex: 1 }}>
                  <div style={{ width: "56px", height: "56px", flexShrink: 0, borderRadius: "14px", background: `${service.accent}10`, color: service.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {service.icon}
                  </div>
                  <div>
                    <h3 style={{ fontSize: "22px", fontWeight: 900, color: "#022C45", margin: "0 0 4px", letterSpacing: "-0.5px" }}>{service.title}</h3>
                    <div style={{ fontSize: "12px", fontWeight: 800, color: service.accent, textTransform: "uppercase", letterSpacing: "1px" }}>{service.tagline}</div>
                  </div>
                </div>

                <p style={{ fontSize: "15px", color: "#4B5563", lineHeight: 1.7, margin: "0 0 28px", position: "relative", zIndex: 1, flex: 1 }}>
                  {service.desc}
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px", borderTop: "1px solid rgba(2,44,69,0.06)", paddingTop: "20px", position: "relative", zIndex: 1 }}>
                  {service.benefits.map((benefit, bIndex) => (
                    <div key={bIndex} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={service.accent} strokeWidth="2.5" style={{ flexShrink: 0, marginTop: "3px" }}><polyline points="20 6 9 17 4 12"/></svg>
                      <span style={{ fontSize: "14px", fontWeight: 600, color: "#111827", lineHeight: 1.4 }}>{benefit}</span>
                    </div>
                  ))}
                </div>

              </div>
            ))}
          </div>

        </div>
      </Section>

      {/* ════════════════════════════════════════════════════════
          4. BOTTOM CTA BANNER 
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
            <div style={{ position: "absolute", right: "-80px", top: "-80px", width: "320px", height: "320px", borderRadius: "50%", background: "radial-gradient(circle, rgba(7,203,235,0.2) 0%, transparent 70%)", pointerEvents: "none" }}/>
            <div style={{ position: "absolute", left: "-80px", bottom: "-80px", width: "240px", height: "240px", borderRadius: "50%", background: "radial-gradient(circle, rgba(7,203,235,0.1) 0%, transparent 70%)", pointerEvents: "none" }}/>

            <div style={{ position: "relative", zIndex: 1, flex: "1 1 400px" }}>
              <div style={{ display: "inline-block", background: "rgba(7,203,235,0.2)", color: "#8ce7f7", fontSize: "11px", fontWeight: 800, padding: "6px 12px", borderRadius: "6px", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "1px" }}>
                Free Travel Assessment
              </div>
              <h2 style={{ fontSize: "clamp(28px, 3.5vw, 36px)", fontWeight: 900, color: "white", letterSpacing: "-0.5px", margin: "0 0 16px" }}>
                Ready to Start Your Journey?
              </h2>
              <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.7)", margin: 0, lineHeight: 1.6, maxWidth: "480px" }}>
                Connect with our certified travel and visa experts today to discuss your destination, required documents, and itinerary planning.
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