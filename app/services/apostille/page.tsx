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

// ── Data: Legalization Process Flow ───────────────────────────
const documentSteps = [
  { step: "01", title: "Document Verification", desc: "We conduct a thorough pre-check of your original documents to ensure they meet the formatting standards for international legalization." },
  { step: "02", title: "Notary & State Attestation", desc: "Your documents are authenticated by local notaries and the respective State Home Department or HRD." },
  { step: "03", title: "MEA Apostille", desc: "We secure the official Apostille stamp from the Ministry of External Affairs (MEA) for Hague Convention countries." },
  { step: "04", title: "Certified Translation", desc: "If required by the destination country, documents are translated by certified, sworn native translators." },
  { step: "05", title: "Embassy & MOFA", desc: "For non-Hague countries (e.g., UAE, Qatar), we process the final attestation through the Embassy and MOFA." },
  { step: "06", title: "Secure Dispatch", desc: "Your fully legalized, stamped, and translated documents are securely dispatched back to you via insured courier." }
];

// ── Data: Attestation & Translation Services (6 Items) ────────
const detailedServices = [
  { 
    size: "large", // Spans 2 columns
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    title: "Hague Apostille Services", tagline: "For Europe & the Americas", accent: "#07CBEB",
    desc: "Traveling or moving to a Hague Convention country (like Germany, Italy, UK, or USA)? We secure direct MEA Apostilles, eliminating the need for further embassy legalization, ensuring your documents are globally recognized.",
    benefits: ["Ministry of External Affairs (MEA) Stamp", "Birth & Marriage Certificate Apostille", "Police Clearance Certificate (PCC)"]
  },
  { 
    size: "small", // Spans 1 column
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
    title: "UAE & GCC Attestation", tagline: "MOFA & Embassy Legalization", accent: "#022C45",
    desc: "Dubai, Qatar, and Saudi Arabia require strict multi-step attestation. We handle the entire Home Department, MEA, UAE Embassy, and MOFA process.",
    benefits: ["UAE Embassy Attestation", "MOFA Legalization", "Degree & Diploma Verification"]
  },
  { 
    size: "small", // Spans 1 column
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
    title: "Certified Translation", tagline: "Sworn & NAATI Translators", accent: "#F16101",
    desc: "European and Asian embassies mandate document translation. We provide flawless translations by certified, sworn native linguists.",
    benefits: ["German, French, Spanish & Arabic", "NAATI Certified for Australia", "Notarized Translated Copies"]
  },
  { 
    size: "large", // Spans 2 columns
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>,
    title: "WES & ECA Verification", tagline: "Educational Credential Assessment", accent: "#07CBEB",
    desc: "Applying for Canada PR or US Universities? We manage the rigorous transcript verification process directly with Indian universities, ensuring secure transmission of sealed envelopes to WES, IQAS, or ICAS.",
    benefits: ["University Transcript Retrieval", "Sealed Envelope Dispatch", "WES Canada & USA Compliance"]
  },
  { 
    size: "large", // Spans 2 columns
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="21"/></svg>,
    title: "Commercial Document Legalization", tagline: "For B2B Global Expansion", accent: "#022C45",
    desc: "Establishing an overseas branch or exporting goods? We legalize complex corporate documents, requiring authentication from the Chamber of Commerce, MEA, and respective international embassies.",
    benefits: ["Certificate of Origin & Invoices", "Memorandum of Association (MOA)", "Board Resolutions & Power of Attorney"]
  },
  { 
    size: "small", // Spans 1 column
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
    title: "Personal Documents", tagline: "Vital Records Services", accent: "#F16101",
    desc: "Fast-track legalization for vital personal records needed for dependent visas, spouse visas, or long-term residency.",
    benefits: ["Marriage Certificates", "Birth Certificates", "Affidavits & Medical Reports"]
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
          <defs><linearGradient id="ulineDoc" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#07CBEB"/><stop offset="100%" stopColor="#022C45"/></linearGradient></defs>
          <path d="M0,3 Q75,0 150,3 Q225,7 300,3" stroke="url(#ulineDoc)" strokeWidth="3" fill="none" strokeLinecap="round"/>
        </svg>
      </span>
    </h2>
  );
}

// ═══════════════════════════════════════════════════════════════
//  APOSTILLE & TRANSLATION PAGE
// ═══════════════════════════════════════════════════════════════
export default function ApostillePage() {
  useEffect(() => { document.title = "Apostille & Document Attestation — MEA Certified Services | Edification Overseas"; }, []);

  const heroRef = useInView(0.1);
  const docRef = useInView(0.1);
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

      {/* Embedded CSS safely using dangerouslySetInnerHTML */}
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
        
        /* ── SECURE CERTIFICATE GRID CSS (New Unique Design) ── */
        .cert-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px;
          margin-top: 48px;
        }
        .cert-card {
          background: #ffffff;
          border-radius: 16px;
          box-shadow: 0 12px 32px rgba(2,44,69,0.04);
          border: 1px solid rgba(2,44,69,0.06);
          overflow: hidden;
          position: relative;
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }
        .cert-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 24px 48px rgba(7,203,235,0.12);
        }
        .cert-header {
          background: linear-gradient(135deg, #022C45 0%, #054f77 100%);
          padding: 20px 24px;
          display: flex;
          align-items: center;
          gap: 16px;
          border-bottom: 3px solid #07CBEB;
        }
        .cert-seal {
          width: 44px; height: 44px; flex-shrink: 0;
          background: #ffffff;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          color: #022C45; font-weight: 900; font-size: 16px;
          box-shadow: 0 0 0 4px rgba(7,203,235,0.2);
        }
        .cert-title {
          color: #ffffff; font-size: 19px; font-weight: 800; margin: 0; letter-spacing: -0.3px;
        }
        .cert-body {
          padding: 32px 24px;
          position: relative;
          background-image: radial-gradient(rgba(2,44,69,0.05) 1px, transparent 1px);
          background-size: 16px 16px;
        }
        .cert-watermark {
          position: absolute; right: -10px; bottom: -10px; opacity: 0.02;
          pointer-events: none; width: 120px; height: 120px; color: #022C45;
        }

        @media (max-width: 960px) {
          .cert-grid { grid-template-columns: 1fr; gap: 24px; }
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
          1. HERO — Legalization Theme with 4 Floating Elements
      ════════════════════════════════════════════════════════ */}
      <Section bg="linear-gradient(105deg, #ffffff 0%, #f2f9fb 45%, #dcf2f7 100%)" style={{ padding: "0" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: `linear-gradient(rgba(2,44,69,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(2,44,69,0.03) 1px, transparent 1px)`, backgroundSize: "64px 64px" }}/>
        
        <div ref={heroRef.ref} style={{ maxWidth: "1280px", margin: "auto", padding: isMobile ? "28px 20px 48px" : "60px 24px 80px", position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: isMobile ? "32px" : "64px", flexWrap: "wrap" }}>
          
          {/* LEFT: Apostille Focused SEO Text */}
          <div style={{ flex: isMobile ? "0 0 100%" : "1 1 500px", width: isMobile ? "100%" : undefined }}>
            
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "rgba(7,203,235,0.1)", border: "1px solid rgba(7,203,235,0.3)",
              borderRadius: "999px", padding: "6px 16px", marginBottom: "24px",
              animation: heroRef.inView ? "fadeSlideUp 0.5s ease 0.1s both" : "none",
            }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#07CBEB", display: "inline-block", animation: "badgePulse 1.6s infinite" }}/>
              <span style={{ fontSize: "12px", fontWeight: 800, color: "#022C45", letterSpacing: "0.4px", textTransform: "uppercase" }}>
                Document Verification & Legalization
              </span>
            </div>

            <h1 style={{
              fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 900, color: "#022C45", lineHeight: 1.12,
              letterSpacing: "-0.8px", marginBottom: "20px", overflow: "visible", paddingBottom: "14px",
              animation: heroRef.inView ? "fadeSlideUp 0.55s ease 0.2s both" : "none",
            }}>
              Legalize Your<br/>
              Documents<br/>
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
              End-to-end Apostille, MEA Attestation, and Certified Translation services. Whether Dubai requires a MOFA attestation or Europe requires a certified translation and Hague Apostille, we ensure your documents are internationally recognized.
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
                  }}>Verify My Documents</span>
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
            
            {/* Main Apostille Vector Image mapped precisely to your file requirement */}
            <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: "380px", aspectRatio: "1/1", animation: "floatSlow 8s infinite ease-in-out" }}>
              <Image 
                src="/images/apostille-hero-vector.png" 
                alt="Apostille and Document Translation"
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </div>

            {/* 4 Floating Glass Vectors for Documents & Legalization */}
            <div style={{ position: "absolute", top: "40px", left: "20px", zIndex: 3, animation: "floatFast 5s infinite" }}>
              <div style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,1)", padding: "10px 16px", borderRadius: "999px", display: "flex", alignItems: "center", gap: "8px", boxShadow: "0 16px 40px rgba(2,44,69,0.08)" }}>
                <span style={{ fontSize: "16px" }}>🏛️</span>
                <span style={{ fontSize: "12px", fontWeight: 800, color: "#022C45" }}>Hague Apostille</span>
              </div>
            </div>

            <div style={{ position: "absolute", top: "100px", right: "10px", zIndex: 3, animation: "floatMedium 7s infinite" }}>
              <div style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,1)", padding: "10px 16px", borderRadius: "999px", display: "flex", alignItems: "center", gap: "8px", boxShadow: "0 16px 40px rgba(2,44,69,0.08)" }}>
                <span style={{ fontSize: "16px" }}>🔤</span>
                <span style={{ fontSize: "12px", fontWeight: 800, color: "#022C45" }}>Certified Translation</span>
              </div>
            </div>

            <div style={{ position: "absolute", bottom: "50px", left: "-30px", zIndex: 3, animation: "floatMedium 6s infinite reverse" }}>
              <div style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,1)", padding: "10px 16px", borderRadius: "999px", display: "flex", alignItems: "center", gap: "8px", boxShadow: "0 16px 40px rgba(2,44,69,0.08)" }}>
                <span style={{ fontSize: "16px" }}>🎓</span>
                <span style={{ fontSize: "12px", fontWeight: 800, color: "#022C45" }}>WES Verification</span>
              </div>
            </div>

            <div style={{ position: "absolute", bottom: "30px", right: "40px", zIndex: 3, animation: "floatFast 8s infinite reverse" }}>
              <div style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,1)", padding: "10px 16px", borderRadius: "999px", display: "flex", alignItems: "center", gap: "8px", boxShadow: "0 16px 40px rgba(2,44,69,0.08)" }}>
                <span style={{ fontSize: "16px" }}>📜</span>
                <span style={{ fontSize: "12px", fontWeight: 800, color: "#022C45" }}>Official Documents</span>
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
          2. THE SECURE CERTIFICATE GRID (Unique Process Design)
      ════════════════════════════════════════════════════════ */}
      <Section bg="#F9FAFB" style={{ padding: isMobile ? "48px 0 56px" : "80px 0 100px" }}>
        <div ref={docRef.ref} style={{ maxWidth: "1280px", margin: "0 auto", padding: isMobile ? "0 16px" : "0 24px" }}>
          
          <div style={{ textAlign: "center", marginBottom: "64px", animation: docRef.inView ? "fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both" : "none", opacity: docRef.inView ? 1 : 0 }}>
            <Eyebrow label="Document Verification" />
            <Heading line1="The Attestation Process" line2="Step-by-Step" />
            <p style={{ fontSize: "16px", color: "#6B7280", lineHeight: 1.6, maxWidth: "600px", margin: "20px auto 0" }}>
              We ensure flawless authentication by managing the strict, sequential process required for global document legalization.
            </p>
          </div>

          <div className="cert-grid">
            {documentSteps.map((step, i) => (
              <div key={i} className="cert-card" style={{
                animation: docRef.inView ? `fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) ${i * 0.1}s both` : "none",
                opacity: docRef.inView ? 1 : 0
              }}>
                <div className="cert-header">
                  <div className="cert-seal">{step.step}</div>
                  <h3 className="cert-title">{step.title}</h3>
                </div>
                <div className="cert-body">
                  {/* Subtle verified watermark svg */}
                  <svg className="cert-watermark" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM10.8 16.2l-3.8-3.8 1.4-1.4 2.4 2.4 5.4-5.4 1.4 1.4-6.8 6.8z"/>
                  </svg>
                  <p style={{ fontSize: "15px", color: "#4B5563", lineHeight: 1.7, margin: 0, position: "relative", zIndex: 1 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </Section>

      {/* ════════════════════════════════════════════════════════
          3. BENTO BOX LEGAL SERVICES (High SEO)
      ════════════════════════════════════════════════════════ */}
      <Section bg="#ffffff" style={{ padding: isMobile ? "48px 0 56px" : "100px 0 120px" }}>
        <div ref={bentoRef.ref} style={{ maxWidth: "1280px", margin: "0 auto", padding: isMobile ? "0 16px" : "0 24px" }}>
          
          <div style={{ textAlign: "center", marginBottom: "64px", animation: bentoRef.inView ? "fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both" : "none", opacity: bentoRef.inView ? 1 : 0 }}>
            <Eyebrow label="Complete Legalization" />
            <Heading line1="Global Document Attestation" line2="& Certified Translations" />
            <p style={{ fontSize: "16px", color: "#6B7280", lineHeight: 1.6, maxWidth: "720px", margin: "20px auto 0" }}>
              Our experts provide comprehensive legalization solutions. From NAATI certified translations <br className="hidden md:block" />
              to UAE MOFA attestations and Hague Apostilles, we ensure global document acceptance.
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
                Fast & Secure Processing
              </div>
              <h2 style={{ fontSize: "clamp(28px, 3.5vw, 36px)", fontWeight: 900, color: "white", letterSpacing: "-0.5px", margin: "0 0 16px" }}>
                Need Documents Legalized?
              </h2>
              <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.7)", margin: 0, lineHeight: 1.6, maxWidth: "480px" }}>
                Connect with our certified attestation experts today to verify your document requirements for your target country.
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
                Verify Documents →
              </span>
            </Link>
          </div>

        </div>
      </Section>

    </main>
  );
}