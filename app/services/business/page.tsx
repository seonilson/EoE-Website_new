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

// ── Data: Business Process Flow ───────────────────────────────
const processSteps = [
  { step: "01", title: "Corporate Evaluation", desc: "Assessing your business history, financials, and global expansion goals to determine visa eligibility." },
  { step: "02", title: "Pathway Selection", desc: "Identifying the right route: Entrepreneur, Investor, Intra-Company Transfer, or Representative Visa." },
  { step: "03", title: "Business Plan Prep", desc: "Drafting immigration-compliant business plans, financial projections, and market research reports." },
  { step: "04", title: "Investment Routing", desc: "Guiding you through legal compliance, minimum investment thresholds, and escrow or fund routing." },
  { step: "05", title: "Visa & Legal Filing", desc: "Flawless submission of corporate applications, minimizing legal risks and ensuring rapid processing." },
  { step: "06", title: "Post-Landing Setup", desc: "Providing support for overseas company incorporation, local taxation compliance, and HR setup." }
];

// ── Data: Detailed SEO Business Services (6 Items) ────────────
const detailedServices = [
  { 
    size: "large", // Spans 2 columns
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
    title: "Investor & Golden Visas", tagline: "Residency by Investment", accent: "#07CBEB",
    desc: "Secure permanent residency or citizenship through strategic foreign investments. We offer end-to-end consulting for high-net-worth individuals looking to invest in real estate, government bonds, or national funds abroad.",
    benefits: ["USA EB-5 & UK Tier 1 Investor", "Europe Golden Visas (Spain, Portugal, Greece)", "Caribbean & Global Citizenship Programs"]
  },
  { 
    size: "small", // Spans 1 column
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>,
    title: "Startup Visas", tagline: "Global Innovation", accent: "#022C45",
    desc: "Take your ideas to top startup ecosystems. We assist founders with endorsement letters and pitches.",
    benefits: ["Canada SUV", "UK Innovator Founder", "Incubator Pitching"]
  },
  { 
    size: "small", // Spans 1 column
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" y1="22" x2="12" y2="12"/></svg>,
    title: "Intra-Company Transfer", tagline: "Executive Mobility", accent: "#F16101",
    desc: "Seamlessly transfer key executives or specialized knowledge workers to your overseas branch offices.",
    benefits: ["USA L-1A & L-1B Visas", "UK Global Business Mobility", "Branch Office Setup"]
  },
  { 
    size: "large", // Spans 2 columns
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
    title: "Short-Term Business Visas", tagline: "Conferences & Client Meetings", accent: "#07CBEB",
    desc: "Need to attend a trade fair, negotiate a contract, or undergo corporate training? We ensure rapid, hassle-free processing of short-term business visitor visas so you never miss a global opportunity.",
    benefits: ["USA B1/B2 Visas", "Schengen Business Visas", "Fast-Track Trade Fair Processing"]
  },
  { 
    size: "large", // Spans 2 columns
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
    title: "Immigration Business Plans", tagline: "Data-Driven Success", accent: "#022C45",
    desc: "Embassy officials require comprehensive, specialized business plans for investor and startup visas. Our financial experts draft highly detailed, immigration-compliant business plans that meet strict consulate standards.",
    benefits: ["5-Year Financial Projections", "Market & Competitor Analysis", "Job Creation Strategies"]
  },
  { 
    size: "small", // Spans 1 column
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
    title: "Corporate Compliance", tagline: "Mitigate Legal Risks", accent: "#F16101",
    desc: "Navigate international labor laws safely. We secure employer sponsorship licenses and LMIA approvals.",
    benefits: ["Sponsorship Licenses", "LMIA Assistance", "Audit & Checks"]
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
          <defs><linearGradient id="ulineBiz" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#07CBEB"/><stop offset="100%" stopColor="#022C45"/></linearGradient></defs>
          <path d="M0,3 Q75,0 150,3 Q225,7 300,3" stroke="url(#ulineBiz)" strokeWidth="3" fill="none" strokeLinecap="round"/>
        </svg>
      </span>
    </h2>
  );
}

// ═══════════════════════════════════════════════════════════════
//  BUSINESS VISA PAGE
// ═══════════════════════════════════════════════════════════════
export default function BusinessVisaPage() {
  useEffect(() => { document.title = "Business Visa Consultancy — Expert Guidance for Entrepreneurs | Edification Overseas"; }, []);

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
        @keyframes pulseGlowCyan { 0%, 100% { filter: drop-shadow(0 0 15px rgba(7,203,235,0.15)); } 50% { filter: drop-shadow(0 0 40px rgba(7,203,235,0.3)); } }
        @keyframes badgePulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.4); } }

        /* ── B2B HERO DASHBOARD CARDS ── */
        .dashboard-card {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 1);
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 16px 40px rgba(2, 44, 69, 0.08);
          display: flex; align-items: center; gap: 16px;
        }

        /* ── CORPORATE PROCESS GRID ── */
        .process-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          margin-top: 48px;
        }
        .process-card {
          background: #ffffff; border-radius: 16px; padding: 32px 24px;
          border: 1px solid rgba(2,44,69,0.06); box-shadow: 0 8px 24px rgba(2,44,69,0.03);
          position: relative; transition: all 0.3s ease;
          border-top: 4px solid transparent; 
        }
        .process-card:hover {
          transform: translateY(-4px); box-shadow: 0 16px 32px rgba(7,203,235,0.1);
          border-top: 4px solid #07CBEB;
        }
        .process-arrow {
          position: absolute; right: 24px; top: 32px; color: rgba(2,44,69,0.15);
          transition: color 0.3s ease;
        }
        .process-card:hover .process-arrow { color: #07CBEB; }
        .process-num {
          font-size: 48px; font-weight: 900; color: rgba(7,203,235,0.1);
          line-height: 1; margin-bottom: 16px; font-family: monospace;
        }

        @media (max-width: 960px) {
          .process-grid { grid-template-columns: 1fr; gap: 24px; }
          .process-arrow { transform: rotate(90deg); top: auto; bottom: -20px; right: 50%; }
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
          1. HERO — Corporate "Trust" Theme with Grounded Vector
      ════════════════════════════════════════════════════════ */}
      <Section bg="linear-gradient(105deg, #ffffff 0%, #f2f9fb 45%, #dcf2f7 100%)" style={{ padding: "0" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: `linear-gradient(rgba(2,44,69,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(2,44,69,0.03) 1px, transparent 1px)`, backgroundSize: "64px 64px" }}/>
        
        <div ref={heroRef.ref} style={{ maxWidth: "1280px", margin: "auto", padding: isMobile ? "28px 20px 40px" : "60px 24px 0", position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: isMobile ? "32px" : "64px", flexWrap: "wrap" }}>
          
          {/* LEFT: B2B Focused SEO Text */}
          <div style={{ flex: isMobile ? "0 0 100%" : "1 1 500px", width: isMobile ? "100%" : undefined, paddingBottom: isMobile ? "0" : "60px" }}>
            
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "rgba(7,203,235,0.1)", border: "1px solid rgba(7,203,235,0.3)",
              borderRadius: "999px", padding: "6px 16px", marginBottom: "24px",
              animation: heroRef.inView ? "fadeSlideUp 0.5s ease 0.1s both" : "none",
            }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#07CBEB", display: "inline-block", animation: "badgePulse 1.6s infinite" }}/>
              <span style={{ fontSize: "12px", fontWeight: 800, color: "#022C45", letterSpacing: "0.4px", textTransform: "uppercase" }}>
                Corporate & Investor Immigration
              </span>
            </div>

            <h1 style={{
              fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 900, color: "#022C45", lineHeight: 1.12,
              letterSpacing: "-0.8px", marginBottom: "20px", overflow: "visible", paddingBottom: "14px",
              animation: heroRef.inView ? "fadeSlideUp 0.55s ease 0.2s both" : "none",
            }}>
              Expand Your<br/>
              Business<br/>
              <span style={{
                color: "#07CBEB", position: "relative", display: "inline-block",
                textShadow: "0 2px 16px rgba(7,203,235,0.2)",
              }}>
                Globally.
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
              Seamless business visas, investor programs, and corporate immigration solutions. Whether you&apos;re attending a conference, transferring executives, or securing residency by investment, we handle the legal complexities.
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
                  }}>Assess Corporate Eligibility</span>
                </span>
              </Link>
            </div>
          </div>

          {/* RIGHT: vector — desktop only */}
          {!isMobile && <div style={{ 
            flex: "1 1 450px", position: "relative", minHeight: "500px", 
            display: "flex", justifyContent: "center", alignItems: "flex-end", // Aligns content strictly to the bottom
            transform: "translateY(50px)", // Pushes the image down into the SVG wave
            zIndex: 2,
            animation: heroRef.inView ? "scaleIn 0.8s cubic-bezier(0.22,1,0.36,1) 0.3s both" : "none",
            opacity: heroRef.inView ? 1 : 0,
          }}>
            {/* Ambient Cyan Glow */}
            <div style={{ position: "absolute", bottom: "10%", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(7,203,235,0.2), transparent 70%)", borderRadius: "50%", animation: "pulseGlowCyan 4s infinite", zIndex: 0 }} />
            
            {/* Main Business Vector Image - Static and anchored perfectly to bottom */}
            <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: "420px", height: "500px" }}>
              <Image 
                src="/images/business-hero-vectorss.png" 
                alt="Corporate Immigration and Investor Visas"
                fill
                style={{ objectFit: "contain", objectPosition: "bottom center" }}
                priority
              />
            </div>
          </div>}
        </div>

        {!isMobile && (
          <div style={{ position: "relative", lineHeight: 0, zIndex: 3, marginTop: "-50px" }}>
            <svg viewBox="0 0 1440 120" style={{ display: "block", width: "100%", height: "80px" }} preserveAspectRatio="none">
              <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,42.7C1120,32,1280,32,1360,32L1440,32L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" fill="#F9FAFB"/>
            </svg>
          </div>
        )}
      </Section>

      {/* ════════════════════════════════════════════════════════
          2. CORPORATE WORKFLOW (Grid Layout)
      ════════════════════════════════════════════════════════ */}
      <Section bg="#F9FAFB" style={{ padding: isMobile ? "48px 0 56px" : "80px 0 100px" }}>
        <div ref={flowRef.ref} style={{ maxWidth: "1280px", margin: "0 auto", padding: isMobile ? "0 16px" : "0 24px" }}>
          
          <div style={{ textAlign: "center", animation: flowRef.inView ? "fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both" : "none", opacity: flowRef.inView ? 1 : 0 }}>
            <Eyebrow label="Corporate Workflow" />
            <Heading line1="Business Immigration Process" line2="Step-by-Step" />
            <p style={{ fontSize: "16px", color: "#6B7280", lineHeight: 1.6, maxWidth: "600px", margin: "20px auto 0" }}>
              We mitigate legal risks and eliminate delays by breaking down complex corporate immigration protocols into six transparent, manageable steps.
            </p>
          </div>

          <div className="process-grid">
            {processSteps.map((step, i) => (
              <div key={i} className="process-card" style={{
                animation: flowRef.inView ? `fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) ${i * 0.1}s both` : "none",
                opacity: flowRef.inView ? 1 : 0
              }}>
                <div className="process-num">{step.step}</div>
                <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#022C45", margin: "0 0 12px" }}>{step.title}</h3>
                <p style={{ fontSize: "14px", color: "#6B7280", lineHeight: 1.6, margin: 0 }}>{step.desc}</p>
                
                {/* Arrow pointing to next step (Hidden on last item) */}
                {i !== processSteps.length - 1 && (
                  <svg className="process-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                )}
              </div>
            ))}
          </div>

        </div>
      </Section>

      {/* ════════════════════════════════════════════════════════
          3. BENTO BOX BUSINESS SERVICES
      ════════════════════════════════════════════════════════ */}
      <Section bg="#ffffff" style={{ padding: isMobile ? "48px 0 56px" : "100px 0 120px" }}>
        <div ref={bentoRef.ref} style={{ maxWidth: "1280px", margin: "0 auto", padding: isMobile ? "0 16px" : "0 24px" }}>
          
          <div style={{ textAlign: "center", marginBottom: "64px", animation: bentoRef.inView ? "fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both" : "none", opacity: bentoRef.inView ? 1 : 0 }}>
            <Eyebrow label="Corporate Expertise" />
            <Heading line1="End-to-End Solutions" line2="For Global Business" />
            <p style={{ fontSize: "16px", color: "#6B7280", lineHeight: 1.6, maxWidth: "700px", margin: "20px auto 0" }}>
              Our immigration experts provide comprehensive corporate solutions. From drafting immigration-compliant business plans <br className="hidden md:block" />
              to securing Golden Visas and managing Intra-Company Transfers, we protect your expansion.
            </p>
          </div>

          <div className="bento-grid">
            {detailedServices.map((service, i) => (
              <div key={i} className={`bento-card ${service.size === 'large' ? 'bento-large' : 'bento-small'}`} style={{
                animation: bentoRef.inView ? `fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) ${i * 0.08}s both` : "none",
                opacity: bentoRef.inView ? 1 : 0,
              }}>
                
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
                Confidential Corporate Assessment
              </div>
              <h2 style={{ fontSize: "clamp(28px, 3.5vw, 36px)", fontWeight: 900, color: "white", letterSpacing: "-0.5px", margin: "0 0 16px" }}>
                Ready to Expand Globally?
              </h2>
              <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.7)", margin: 0, lineHeight: 1.6, maxWidth: "480px" }}>
                Connect with our certified business immigration experts today to discuss investment thresholds, compliance requirements, and your expansion timeline.
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