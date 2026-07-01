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

// ── Data: Accommodation & Forex Flow ──────────────────────────
const serviceSteps = [
  { step: "01", title: "Needs Assessment", desc: "We evaluate your university location, budget, and lifestyle preferences to shortlist the safest and most convenient student housing." },
  { step: "02", title: "Property Shortlisting", desc: "Review verified virtual tours of on-campus dormitories, private apartments, or Purpose-Built Student Accommodations (PBSA)." },
  { step: "03", title: "Lease & Deposit", desc: "We guide you through signing legitimate tenancy agreements and securing your accommodation with a safe initial deposit." },
  { step: "04", title: "Forex Consultation", desc: "Analyze your tuition and living expense requirements to secure the lowest possible exchange rates for your international transfers." },
  { step: "05", title: "Mandatory Accounts", desc: "We facilitate the rapid opening of mandatory country-specific accounts, such as Canadian GICs or German Blocked Accounts." },
  { step: "06", title: "Secure Fund Transfer", desc: "Execute highly secure, bank-to-bank SWIFT transfers for your university tuition fees with complete tracking." }
];

// ── Data: Housing & Financial Services (6 Items) ──────────────
const detailedServices = [
  { 
    size: "large", // Spans 2 columns
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    title: "Purpose-Built Student Housing (PBSA)", tagline: "Safe & Premium Living", accent: "#07CBEB",
    desc: "We partner with top-tier student housing providers globally. Secure a fully-furnished, utility-inclusive apartment located just minutes from your university campus, complete with 24/7 security and student communities.",
    benefits: ["Fully Furnished En-suites & Studios", "Utility Bills & High-Speed Wi-Fi Included", "Verified & Safe Student Neighborhoods"]
  },
  { 
    size: "small", // Spans 1 column
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
    title: "Canada GIC Processing", tagline: "Guaranteed Investment Cert.", accent: "#022C45",
    desc: "Mandatory for the SDS Visa pathway. We partner with Scotia, CIBC, and ICICI to open and fund your GIC instantly.",
    benefits: ["Fast-Track SDS Visa Compliance", "Partnerships with Top Canadian Banks", "Secure Wire Transfer Guidance"]
  },
  { 
    size: "small", // Spans 1 column
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
    title: "Germany Blocked Account", tagline: "Sperrkonto Setup", accent: "#F16101",
    desc: "Crucial for your German Student Visa. We assist in setting up your Blocked Account via Fintiba, Coracle, or Expatrio.",
    benefits: ["Official Embassy Approved Providers", "Health Insurance Integration (TK)", "Fast Account Confirmation (06)"]
  },
  { 
    size: "large", // Spans 2 columns
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
    title: "University Tuition Transfers", tagline: "Lowest Exchange Rates", accent: "#07CBEB",
    desc: "Paying international tuition shouldn't cost you extra in hidden fees. We utilize our network of trusted RBI-authorized AD-II Forex partners to execute secure A2 transfers directly to your university at the lowest margins.",
    benefits: ["RBI Authorized SWIFT Transfers", "Zero Hidden Bank Charges", "A2 Form Documentation Support"]
  },
  { 
    size: "large", // Spans 2 columns
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2" ry="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>,
    title: "Multi-Currency Forex Cards", tagline: "Travel Cashless", accent: "#022C45",
    desc: "Arrive in your new country prepared. We provide highly secure, reloadable multi-currency travel cards that allow you to pay for immediate expenses like groceries and transport without exorbitant credit card conversion fees.",
    benefits: ["Lock-In Favorable Exchange Rates", "Zero Cross-Currency Markup", "Instant Reload via Mobile App"]
  },
  { 
    size: "small", // Spans 1 column
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>,
    title: "Private Lease Checking", tagline: "Avoid Rental Scams", accent: "#F16101",
    desc: "Renting off-campus? Our experts review private tenancy contracts to protect students from illegal clauses and deposit scams.",
    benefits: ["Tenancy Contract Review", "Deposit Protection Guidance", "Guarantor Service Advice"]
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
          <defs><linearGradient id="ulineAcc" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#07CBEB"/><stop offset="100%" stopColor="#022C45"/></linearGradient></defs>
          <path d="M0,3 Q75,0 150,3 Q225,7 300,3" stroke="url(#ulineAcc)" strokeWidth="3" fill="none" strokeLinecap="round"/>
        </svg>
      </span>
    </h2>
  );
}

// ═══════════════════════════════════════════════════════════════
//  ACCOMMODATION & FOREX PAGE
// ═══════════════════════════════════════════════════════════════
export default function AccommodationPage() {
  useEffect(() => { document.title = "Overseas Accommodation Assistance — Find Your Home Abroad | Edification Overseas"; }, []);

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

      <style dangerouslySetInnerHTML={{ __html: `
        /* Entrance Animations */
        @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.85); } to { opacity: 1; transform: scale(1); } }
        @keyframes floatSlow { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
        @keyframes pulseGlowCyan { 0%, 100% { filter: drop-shadow(0 0 15px rgba(7,203,235,0.15)); } 50% { filter: drop-shadow(0 0 40px rgba(7,203,235,0.3)); } }
        @keyframes pulseActivity { 0% { transform: scale(0.8); opacity: 0.5; } 50% { transform: scale(1.2); opacity: 1; } 100% { transform: scale(0.8); opacity: 0.5; } }
        
        /* ── INTERACTIVE TIMELINE NODE SYSTEM CSS (Housing & Forex) ── */
        .node-track {
          display: flex; flex-direction: column; position: relative; padding: 40px 0; max-width: 900px; margin: 0 auto;
        }
        .node-line {
          position: absolute; left: 50%; top: 0; bottom: 0; width: 2px; background: rgba(2,44,69,0.05); transform: translateX(-50%); z-index: 0;
        }
        .node-row {
          display: flex; width: 100%; position: relative; margin-bottom: 48px; align-items: center; justify-content: space-between;
        }
        .node-row.left .node-content { text-align: right; padding-right: 40px; }
        .node-row.left .node-empty { padding-left: 40px; }
        .node-row.right .node-content { text-align: left; padding-left: 40px; }
        .node-row.right .node-empty { padding-right: 40px; }

        .node-content, .node-empty { width: 50%; }

        .node-center {
          position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);
          width: 56px; height: 56px; border-radius: 50%; background: #ffffff;
          box-shadow: 0 8px 24px rgba(2,44,69,0.08); border: 2px solid #07CBEB;
          display: flex; align-items: center; justify-content: center; z-index: 2;
          color: #022C45; transition: transform 0.3s ease;
        }
        .node-row:hover .node-center { transform: translate(-50%, -50%) scale(1.1); background: #07CBEB; color: white; }

        .node-text-card {
          background: #ffffff; border-radius: 16px; padding: 24px;
          border: 1px solid rgba(2,44,69,0.04); box-shadow: 0 4px 16px rgba(2,44,69,0.02);
          transition: box-shadow 0.3s ease; display: inline-block; width: 100%; max-width: 380px;
        }
        .node-row:hover .node-text-card { box-shadow: 0 12px 32px rgba(7,203,235,0.08); border-color: rgba(7,203,235,0.2); }

        .activity-dot {
          width: 8px; height: 8px; border-radius: 50%; background: #F16101;
          display: inline-block; margin-bottom: 8px; animation: pulseActivity 2s infinite;
        }

        @media (max-width: 768px) {
          .node-line { left: 28px; }
          .node-row { flex-direction: column; align-items: flex-start; margin-bottom: 32px; }
          .node-content { width: 100% !important; text-align: left !important; padding: 0 0 0 70px !important; }
          .node-empty { display: none; }
          .node-center { left: 28px; width: 44px; height: 44px; }
          .node-text-card { max-width: 100%; }
        }

        /* ── THE BENTO BOX SERVICES GRID ── */
        .bento-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 40px;
        }
        .bento-card {
          background: #ffffff; border-radius: 20px; padding: 40px;
          border: 1px solid rgba(2,44,69,0.06); box-shadow: 0 12px 32px rgba(2,44,69,0.03);
          position: relative; overflow: hidden; display: flex; flex-direction: column;
          transition: transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;
        }
        .bento-card:hover {
          transform: translateY(-6px); box-shadow: 0 24px 48px rgba(7,203,235,0.1); border-color: rgba(7,203,235,0.3);
        }
        .bento-large { grid-column: span 2; }
        .bento-small { grid-column: span 1; }
        .bento-watermark {
          position: absolute; right: -20px; bottom: -20px; opacity: 0.03; pointer-events: none;
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
          1. HERO — Trust Theme (Centered Vector, No Floating Tags)
      ════════════════════════════════════════════════════════ */}
      <Section bg="linear-gradient(105deg, #ffffff 0%, #f2f9fb 45%, #dcf2f7 100%)" style={{ padding: "0" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: `linear-gradient(rgba(2,44,69,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(2,44,69,0.03) 1px, transparent 1px)`, backgroundSize: "64px 64px" }}/>
        
        <div ref={heroRef.ref} style={{ maxWidth: "1280px", margin: "auto", padding: isMobile ? "28px 20px 48px" : "60px 24px 80px", position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: isMobile ? "32px" : "64px", flexWrap: "wrap" }}>
          
          {/* LEFT: Trust & Security Focused Text */}
          <div style={{ flex: isMobile ? "0 0 100%" : "1 1 500px", width: isMobile ? "100%" : undefined }}>
            
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "rgba(7,203,235,0.1)", border: "1px solid rgba(7,203,235,0.3)",
              borderRadius: "999px", padding: "6px 16px", marginBottom: "24px",
              animation: heroRef.inView ? "fadeSlideUp 0.5s ease 0.1s both" : "none",
            }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#07CBEB", display: "inline-block" }}/>
              <span style={{ fontSize: "12px", fontWeight: 800, color: "#022C45", letterSpacing: "0.4px", textTransform: "uppercase" }}>
                100% Secure Student Services
              </span>
            </div>

            <h1 style={{
              fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 900, color: "#022C45", lineHeight: 1.12,
              letterSpacing: "-0.8px", marginBottom: "20px", overflow: "visible", paddingBottom: "14px",
              animation: heroRef.inView ? "fadeSlideUp 0.55s ease 0.2s both" : "none",
            }}>
              Arrive Safe.<br/>
              Transfer Securely.<br/>
              <span style={{
                color: "#07CBEB", position: "relative", display: "inline-block",
                textShadow: "0 2px 16px rgba(7,203,235,0.2)",
              }}>
                Zero Stress.
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
              Your journey doesn't end with a visa. We secure verified, premium student housing near your campus and execute highly secure, RBI-authorized international tuition fee transfers at the lowest margins.
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
                  }}>Explore Housing Options</span>
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
            
            {/* Main Accommodation Vector Image - Assumed filename standard */}
            <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: "450px", aspectRatio: "1/1", animation: "floatSlow 8s infinite ease-in-out" }}>
              <Image 
                src="/images/accommodation-hero-vector.png" 
                alt="Student Accommodation and Forex Transfer Services"
                fill
                style={{ objectFit: "contain" }}
                priority
              />
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
          2. THE FINANCIAL & HOUSING TIMELINE (Animated Nodes)
      ════════════════════════════════════════════════════════ */}
      <Section bg="#F9FAFB" style={{ padding: isMobile ? "48px 0 56px" : "80px 0 100px" }}>
        <div ref={flowRef.ref} style={{ maxWidth: "1280px", margin: "0 auto", padding: isMobile ? "0 16px" : "0 24px" }}>
          
          <div style={{ textAlign: "center", marginBottom: "64px", animation: flowRef.inView ? "fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both" : "none", opacity: flowRef.inView ? 1 : 0 }}>
            <Eyebrow label="Your Setup Process" />
            <Heading line1="Securing Your Stay & Funds" line2="Step-by-Step" />
            <p style={{ fontSize: "16px", color: "#6B7280", lineHeight: 1.6, maxWidth: "600px", margin: "20px auto 0" }}>
              We eliminate anxiety by managing both your international financial transfers and overseas housing through one unified, transparent process.
            </p>
          </div>

          <div className="node-track">
            {/* The Central Connecting Line */}
            <div className="node-line" />
            
            {serviceSteps.map((step, i) => {
              const isLeft = i % 2 === 0;
              // Alternate icons between Housing and Finance themes based on the step index
              const getIcon = (index: number) => {
                if (index === 0 || index === 1 || index === 2) return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
                return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>;
              };

              return (
                <div key={i} className={`node-row ${isLeft ? 'left' : 'right'}`} style={{
                  animation: flowRef.inView ? `fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) ${i * 0.15}s both` : "none",
                  opacity: flowRef.inView ? 1 : 0
                }}>
                  
                  {isLeft ? (
                    <>
                      <div className="node-content">
                        <div className="node-text-card">
                          <div className="activity-dot" />
                          <h3 style={{ fontSize: "18px", fontWeight: 900, color: "#022C45", margin: "0 0 8px" }}>{step.step}. {step.title}</h3>
                          <p style={{ fontSize: "14px", color: "#6B7280", lineHeight: 1.6, margin: 0 }}>{step.desc}</p>
                        </div>
                      </div>
                      <div className="node-empty" />
                    </>
                  ) : (
                    <>
                      <div className="node-empty" />
                      <div className="node-content">
                        <div className="node-text-card">
                          <div className="activity-dot" />
                          <h3 style={{ fontSize: "18px", fontWeight: 900, color: "#022C45", margin: "0 0 8px" }}>{step.step}. {step.title}</h3>
                          <p style={{ fontSize: "14px", color: "#6B7280", lineHeight: 1.6, margin: 0 }}>{step.desc}</p>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Center Node Icon */}
                  <div className="node-center">
                    {getIcon(i)}
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </Section>

      {/* ════════════════════════════════════════════════════════
          3. BENTO BOX SERVICES GRID (Housing & Forex)
      ════════════════════════════════════════════════════════ */}
      <Section bg="#ffffff" style={{ padding: isMobile ? "48px 0 56px" : "100px 0 120px" }}>
        <div ref={bentoRef.ref} style={{ maxWidth: "1280px", margin: "0 auto", padding: isMobile ? "0 16px" : "0 24px" }}>
          
          <div style={{ textAlign: "center", marginBottom: "64px", animation: bentoRef.inView ? "fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both" : "none", opacity: bentoRef.inView ? 1 : 0 }}>
            <Eyebrow label="Premium Partnerships" />
            <Heading line1="Trusted Financial & Housing" line2="Solutions Globally" />
            <p style={{ fontSize: "16px", color: "#6B7280", lineHeight: 1.6, maxWidth: "720px", margin: "20px auto 0" }}>
              Our dedicated network provides comprehensive post-visa solutions. From securing PBSA student leases <br className="hidden md:block" />
              to executing low-margin SWIFT tuition transfers and Canadian GICs, we protect your funds.
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
                Secure Housing & Finance
              </div>
              <h2 style={{ fontSize: "clamp(28px, 3.5vw, 36px)", fontWeight: 900, color: "white", letterSpacing: "-0.5px", margin: "0 0 16px" }}>
                Ready to Secure Your Move?
              </h2>
              <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.7)", margin: 0, lineHeight: 1.6, maxWidth: "480px" }}>
                Connect with our dedicated housing and financial advisors to view property availability or lock in today's best exchange rate.
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