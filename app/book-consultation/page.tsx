"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// ── Intersection Observer Hook ────────────────────────────────
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

// ── Icons ─────────────────────────────────────────────────────
const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F16101" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const TargetIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#07CBEB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
  </svg>
);

const MapIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#07CBEB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/>
  </svg>
);

const ShieldIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#07CBEB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

export default function BookConsultationPage() {
  const heroRef = useInView(0.1);
  const infoRef = useInView(0.1);
  const processRef = useInView(0.1);
  const calendlyRef = useInView(0.1);

  // 💥 THE FIX: Unique key to force iframe reload on navigation 💥
  const [iframeKey, setIframeKey] = useState("");

  useEffect(() => {
    // Every time this page mounts, generate a fresh timestamp.
    // Attaching this to the iframe 'key' forces React to render a brand new iframe.
    setIframeKey(Date.now().toString());
  }, []);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);


  return (
    <main style={{ background: "#F9FAFB", minHeight: "100vh", overflowX: "hidden" }}>
      
      <style>{`
        @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        @keyframes float1 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
        
        .section-title { fontSize: 32px; fontWeight: 900; color: #022C45; letterSpacing: -0.5px; marginBottom: 16px; }
        .section-desc { fontSize: 16px; color: #4B5563; lineHeight: 1.6; }
        
        .glass-card { background: #ffffff; border: 1px solid rgba(2,44,69,0.06); border-radius: 24px; padding: 40px; box-shadow: 0 16px 40px rgba(2,44,69,0.03); transition: all 0.3s cubic-bezier(0.22,1,0.36,1); }
        @media (max-width: 767px) { .glass-card { padding: 24px 20px; border-radius: 16px; } }
        .glass-card:hover { transform: translateY(-4px); box-shadow: 0 24px 56px rgba(2,44,69,0.06); border-color: rgba(7,203,235,0.2); }
        
        .step-card { background: #ffffff; border: 1px solid rgba(2,44,69,0.06); border-radius: 20px; padding: 32px 24px; display: flex; flex-direction: column; align-items: center; text-align: center; position: relative; box-shadow: 0 12px 24px rgba(2,44,69,0.02); transition: transform 0.3s; z-index: 1; }
        .step-card:hover { transform: translateY(-8px); border-color: #07CBEB; }
        .step-num { width: 48px; height: 48px; border-radius: 50%; background: #022C45; color: #ffffff; font-size: 20px; font-weight: 900; display: flex; align-items: center; justify-content: center; margin-bottom: 24px; position: relative; z-index: 2; border: 4px solid #F9FAFB; }
      `}</style>

      {/* ════════════════════════════════════════════════════════
          1. PREMIUM LIGHT HERO SECTION (Matches Contact Page)
      ════════════════════════════════════════════════════════ */}
      <section style={{ background: "linear-gradient(105deg, #f4fbfc 0%, #e0f7fa 100%)", padding: "0", minHeight: "auto", display: "flex", alignItems: "center", paddingTop: "40px", position: "relative" }}>
        
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: `linear-gradient(rgba(7,203,235,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(7,203,235,0.1) 1px, transparent 1px)`, backgroundSize: "64px 64px" }}/>
        
        <div ref={heroRef.ref} style={{ maxWidth: "1280px", width: "100%", margin: "0 auto", padding: isMobile ? "20px 20px 48px" : "20px 24px 100px", position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: isMobile ? "28px" : "60px", flexWrap: "wrap" }}>
          
          <div style={{ flex: isMobile ? "0 0 100%" : "1 1 550px", width: isMobile ? "100%" : undefined }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "rgba(255,255,255,0.6)", border: "1px solid rgba(7,203,235,0.3)",
              borderRadius: "999px", padding: "6px 16px", marginBottom: "24px",
              animation: heroRef.inView ? "fadeSlideUp 0.5s ease 0.1s both" : "none",
            }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#F16101", display: "inline-block", boxShadow: "0 0 10px rgba(241,97,1,0.5)" }}/>
              <span style={{ fontSize: "12px", fontWeight: 800, color: "#022C45", letterSpacing: "1px", textTransform: "uppercase" }}>
                Expert Guidance
              </span>
            </div>

            <h1 style={{
              fontSize: "clamp(40px, 5vw, 64px)", fontWeight: 900, color: "#022C45", lineHeight: 1.1,
              letterSpacing: "-1px", marginBottom: "24px",
              animation: heroRef.inView ? "fadeSlideUp 0.55s ease 0.2s both" : "none",
            }}>
              Book Your <br/>
              <span style={{ color: "#F16101", position: "relative", display: "inline-block" }}>
                Consultation.
                <svg aria-hidden="true" style={{ position: "absolute", bottom: "-14px", left: "-2%", width: "104%", overflow: "visible" }} height="8" viewBox="0 0 200 8" preserveAspectRatio="none">
                  <path d="M0,5 Q50,0 100,5 Q150,10 200,5" stroke="#F16101" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>

            <div style={{ position: "relative", zIndex: 1, marginTop: "32px", animation: heroRef.inView ? "fadeSlideUp 0.6s ease 0.3s both" : "none" }}>
              <p style={{ fontSize: "17.5px", color: "#4B5563", fontWeight: 500, lineHeight: 1.8, margin: 0, maxWidth: "540px" }}>
                Skip the generic advice. Schedule a 1-on-1 strategy session with our certified experts to evaluate your profile, shortlist universities, and map out your exact visa pathway.
              </p>
            </div>
            
            <div style={{ marginTop: "32px", animation: heroRef.inView ? "fadeSlideUp 0.6s ease 0.4s both" : "none" }}>
              <button 
                onClick={() => { document.getElementById('booking-calendar')?.scrollIntoView({ behavior: 'smooth' }); }}
                style={{
                  background: "#022C45", color: "#ffffff", padding: "16px 32px", borderRadius: "12px",
                  fontSize: "15px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px", border: "none",
                  cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "10px", boxShadow: "0 12px 24px rgba(2,44,69,0.2)",
                  transition: "all 0.3s"
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 16px 32px rgba(2,44,69,0.3)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 12px 24px rgba(2,44,69,0.2)"; }}
              >
                Schedule Now
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              </button>
            </div>
          </div>

          {!isMobile && (<div style={{ 
            flex: "1 1 450px", position: "relative", minHeight: "400px", 
            animation: heroRef.inView ? "scaleIn 0.8s cubic-bezier(0.22,1,0.36,1) 0.3s both" : "none",
            display: "flex", justifyContent: "center", alignItems: "center"
          }}>
            <div style={{ 
              position: "relative", zIndex: 2, width: "100%", maxWidth: "420px", aspectRatio: "1/1", 
              display: "flex", alignItems: "center", justifyContent: "center", 
              animation: "float1 6s infinite ease-in-out", overflow: "visible" 
            }}>
               <Image 
                 src="/images/consultation-vector.png" 
                 alt="Book Consultation Vector" 
                 fill 
                 style={{ objectFit: "contain" }} 
                 priority 
                 unoptimized 
               />
            </div>
          </div>)}

        </div>
        
        {!isMobile && (
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, lineHeight: 0, zIndex: 1 }}>
            <svg viewBox="0 0 1440 120" style={{ display: "block", width: "100%", height: "60px" }} preserveAspectRatio="none">
              <path d="M0,120 C480,0 960,0 1440,120 L0,120 Z" fill="#F9FAFB"/>
            </svg>
          </div>
        )}
      </section>

      {/* ════════════════════════════════════════════════════════
          2. VALUE PROPOSITION: Who It's For & What You Get
      ════════════════════════════════════════════════════════ */}
      <section style={{ padding: isMobile ? "40px 0 32px" : "80px 0 60px" }}>
        <div ref={infoRef.ref} style={{ maxWidth: "1280px", margin: "0 auto", padding: isMobile ? "0 16px" : "0 24px", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(400px, 1fr))", gap: isMobile ? "20px" : "40px" }}>
          
          <div className="glass-card" style={{ animation: infoRef.inView ? "fadeSlideUp 0.6s ease 0.1s both" : "none" }}>
            <h2 style={{ fontSize: "28px", fontWeight: 900, color: "#022C45", marginBottom: "24px", letterSpacing: "-0.5px", display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "40px", height: "40px", background: "rgba(241,97,1,0.1)", color: "#F16101", borderRadius: "10px" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              </span>
              Who is this for?
            </h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                "High school students planning their undergraduate studies abroad.",
                "Graduates looking for Master's programs and specialized diplomas.",
                "Working professionals seeking global career transition pathways.",
                "Parents wanting clarity on budgets, safety, and ROI.",
                "Applicants seeking visa refusal reviews and reapplications."
              ].map((text, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px", fontSize: "15.5px", color: "#4B5563", lineHeight: 1.6 }}>
                  <span style={{ marginTop: "2px", flexShrink: 0 }}><CheckIcon /></span>
                  {text}
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-card" style={{ animation: infoRef.inView ? "fadeSlideUp 0.6s ease 0.2s both" : "none" }}>
            <h2 style={{ fontSize: "28px", fontWeight: 900, color: "#022C45", marginBottom: "24px", letterSpacing: "-0.5px", display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "40px", height: "40px", background: "rgba(7,203,235,0.1)", color: "#07CBEB", borderRadius: "10px" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              </span>
              What to expect?
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ display: "flex", gap: "16px" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "#f4fbfc", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><TargetIcon/></div>
                <div>
                  <div style={{ fontSize: "16px", fontWeight: 800, color: "#022C45", marginBottom: "4px" }}>Profile Assessment</div>
                  <div style={{ fontSize: "14.5px", color: "#4B5563", lineHeight: 1.5 }}>An honest review of your academic and professional background to find matching universities.</div>
                </div>
              </div>
              <div style={{ width: "100%", height: "1px", background: "rgba(2,44,69,0.06)" }} />
              <div style={{ display: "flex", gap: "16px" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "#f4fbfc", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><MapIcon/></div>
                <div>
                  <div style={{ fontSize: "16px", fontWeight: 800, color: "#022C45", marginBottom: "4px" }}>Clear Cost & Timeline Roadmap</div>
                  <div style={{ fontSize: "14.5px", color: "#4B5563", lineHeight: 1.5 }}>Complete transparency on tuition fees, living expenses, and step-by-step visa processing times.</div>
                </div>
              </div>
              <div style={{ width: "100%", height: "1px", background: "rgba(2,44,69,0.06)" }} />
              <div style={{ display: "flex", gap: "16px" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "#f4fbfc", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><ShieldIcon/></div>
                <div>
                  <div style={{ fontSize: "16px", fontWeight: 800, color: "#022C45", marginBottom: "4px" }}>Visa Strategy</div>
                  <div style={{ fontSize: "14.5px", color: "#4B5563", lineHeight: 1.5 }}>Expert advice on financial documentation and meeting strict embassy requirements.</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          3. THE PROCESS (Horizontal Steps)
      ════════════════════════════════════════════════════════ */}
      <section style={{ padding: isMobile ? "24px 0 40px" : "40px 0 80px" }}>
        <div ref={processRef.ref} style={{ maxWidth: "1280px", margin: "0 auto", padding: isMobile ? "0 16px" : "0 24px" }}>
          
          <div style={{ textAlign: "center", marginBottom: "48px", animation: processRef.inView ? "fadeSlideUp 0.6s ease both" : "none" }}>
            <h2 style={{ fontSize: "32px", fontWeight: 900, color: "#022C45", letterSpacing: "-0.5px", margin: "0 0 16px" }}>How it Works</h2>
            <p style={{ fontSize: "16px", color: "#4B5563", margin: "0 auto", maxWidth: "600px" }}>Our consultation process is designed to be frictionless, ensuring you get the answers you need without any hassle.</p>
          </div>

          <div style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "32px" }}>
            <div style={{ position: "absolute", top: "24px", left: "10%", right: "10%", height: "2px", background: "rgba(2,44,69,0.06)", zIndex: 0 }} className="process-line" />
            
            <style>{`
              @media (max-width: 900px) { .process-line { display: none; } }
            `}</style>

            <div className="step-card" style={{ animation: processRef.inView ? "fadeSlideUp 0.6s ease 0.1s both" : "none" }}>
              <div className="step-num">1</div>
              <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#022C45", marginBottom: "12px" }}>Pick a Time</h3>
              <p style={{ fontSize: "15px", color: "#4B5563", margin: 0, lineHeight: 1.6 }}>Use the calendar below to select a date and time that fits perfectly into your schedule.</p>
            </div>

            <div className="step-card" style={{ animation: processRef.inView ? "fadeSlideUp 0.6s ease 0.2s both" : "none" }}>
              <div className="step-num" style={{ background: "#07CBEB" }}>2</div>
              <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#022C45", marginBottom: "12px" }}>Share Your Details</h3>
              <p style={{ fontSize: "15px", color: "#4B5563", margin: 0, lineHeight: 1.6 }}>Answer a few quick questions about your academic background so our experts come prepared.</p>
            </div>

            <div className="step-card" style={{ animation: processRef.inView ? "fadeSlideUp 0.6s ease 0.3s both" : "none" }}>
              <div className="step-num" style={{ background: "#F16101" }}>3</div>
              <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#022C45", marginBottom: "12px" }}>Join the Session</h3>
              <p style={{ fontSize: "15px", color: "#4B5563", margin: 0, lineHeight: 1.6 }}>Get on a direct call (Phone or Zoom) with your dedicated counselor and map out your future.</p>
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          4. CALENDLY EMBED SECTION
      ════════════════════════════════════════════════════════ */}
      <section id="booking-calendar" style={{ padding: isMobile ? "20px 0 60px" : "20px 0 120px" }}>
        <div ref={calendlyRef.ref} style={{ maxWidth: "1000px", margin: "0 auto", padding: isMobile ? "0 16px" : "0 24px", animation: calendlyRef.inView ? "scaleIn 0.8s cubic-bezier(0.22,1,0.36,1) both" : "none" }}>
          
          <div style={{ background: "#ffffff", border: "1px solid rgba(2,44,69,0.08)", borderRadius: "24px", padding: "4px", boxShadow: "0 24px 64px rgba(2,44,69,0.06)", overflow: "hidden" }}>
            
            {/* By passing 'key={iframeKey}', React is forced to destroy and recreate this iframe 
              every single time the page is opened, preventing caching glitches!
            */}
            <iframe 
              key={iframeKey}
              src="https://calendly.com/edification-overseas/15min?hide_gdpr_banner=1" 
              width="100%" 
              height={isMobile ? "580" : "700"} 
              frameBorder="0" 
              style={{ display: "block", borderRadius: "20px", background: "#ffffff" }}
              title="Schedule a Consultation"
            ></iframe>
            
          </div>

          {/* What happens after booking */}
          <div style={{ marginTop: "28px", background: "#F9FAFB", borderRadius: "16px", border: "1px solid rgba(2,44,69,0.07)", padding: isMobile ? "20px 16px" : "24px 28px", display: "flex", gap: "20px", alignItems: "flex-start", flexWrap: "wrap" }}>
            <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "rgba(7,203,235,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#07CBEB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: "15px", fontWeight: 800, color: "#022C45", margin: "0 0 6px" }}>What happens after you book?</p>
              <p style={{ fontSize: "13px", color: "#4B5563", margin: "0 0 12px", lineHeight: 1.65 }}>
                Once you schedule your session, you'll receive a <strong>calendar confirmation</strong> and a reminder email from Calendly. Our counsellor will call you at your scheduled time on the number provided. Sessions are conducted via <strong>Phone or Zoom</strong> and typically last 30 minutes.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {[
                  "📧 Confirmation email sent instantly",
                  "📅 Add to Google / Apple Calendar",
                  "🔔 Reminder 1 hour before session",
                  "📞 Phone or Zoom — your choice",
                ].map((item, i) => (
                  <span key={i} style={{ fontSize: "12px", fontWeight: 600, color: "#022C45", background: "#fff", border: "1px solid rgba(2,44,69,0.08)", borderRadius: "999px", padding: "5px 12px" }}>{item}</span>
                ))}
              </div>
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <p style={{ fontSize: "14px", color: "#9CA3AF", fontWeight: 600 }}>
              Need urgent assistance? Call us directly at <a href="tel:+918799450049" style={{ color: "#F16101", textDecoration: "none", fontWeight: 700 }}>+91 87994 50049</a>
            </p>
          </div>

        </div>
      </section>

    </main>
  );
}