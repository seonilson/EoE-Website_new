"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

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

// ── Edification Data Configurations ─────────────────────────────
const studyCountries = [
  'Canada', 'United Kingdom', 'USA', 'Australia', 'Singapore', 
  'Germany', 'Cyprus', 'Mauritius', 'Belarus', 'Moldova', 'Malta', 'Other'
];

const qualifications = [
  '10th Standard', '12th Standard', 'Diploma',
  "Bachelor's Degree", "Master's Degree", 'Other'
];

// WhatsApp pre-filled message
const waLink = "https://wa.me/918799450049?text=Hello%21%20I%20would%20like%20to%20get%20more%20information%20about%20studying%20abroad.";

export default function ContactPage() {
  const heroRef = useInView(0.1);
  const contentRef = useInView(0.05);

  // Layout States
  const [activeTab, setActiveTab] = useState<'enquiry' | 'booking'>('enquiry');
  const [enquirerType, setEnquirerType] = useState<'student' | 'partner' | 'university'>('student');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Anti-cache state for Calendly iframe
  const [iframeKey, setIframeKey] = useState<number>(0);

  // Form State
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', companyName: '', designation: '', 
    location: '', country: '', qualification: '', message: ''
  });

  // Force a fresh render of Calendly every time the booking tab is clicked,
  // and automatically clear success messages when switching any tabs!
  useEffect(() => {
    setStatus('idle'); // Instantly hides the success message
    if (activeTab === 'booking') {
      setIframeKey(Date.now());
    }
  }, [activeTab, enquirerType]);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: enquirerType, 
          ...formData
        }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', companyName: '', designation: '', location: '', country: '', qualification: '', message: '' });
      } else {
        setStatus('error');
        alert('Something went wrong. Please try again or email us directly.');
      }
    } catch (error) {
      setStatus('error');
      alert('Network error. Please try again.');
    }
  };

  return (
    <main style={{ background: "#F9FAFB", minHeight: "100vh", overflowX: "hidden" }}>
      
      <style>{`
        @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        @keyframes float1 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
        
        .input-field {
          width: 100%; background: #F9FAFB; border: 1px solid rgba(2,44,69,0.1); border-radius: 12px;
          padding: 14px 20px; font-size: 15.5px; color: #4B5563; outline: none; transition: all 0.3s ease;
          font-family: inherit;
        }
        .input-field::placeholder { color: #9CA3AF; }
        .input-field:focus { border-color: #07CBEB; background: #ffffff; box-shadow: 0 0 0 4px rgba(7,203,235,0.1); }
        
        .label-text { display: block; font-size: 12px; font-weight: 800; color: #9CA3AF; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; padding-left: 4px; }
        
        /* Unified Interface Tabs */
        .tab-btn { flex: 1; display: flex; align-items: center; justify-content: center; gap: 6px; padding: 12px 10px; border-radius: 12px; font-size: 13px; font-weight: 800; cursor: pointer; transition: all 0.3s ease; border: none; background: transparent; }
        @media (min-width: 480px) { .tab-btn { padding: 14px 24px; font-size: 14.5px; gap: 8px; } }
        .tab-btn.active { background: #ffffff; color: #022C45; box-shadow: 0 4px 16px rgba(2,44,69,0.06); }
        .tab-btn.inactive { color: #6B7280; }
        .tab-btn.inactive:hover { color: #022C45; }
        
        /* Type Selector */
        .type-btn { padding: 10px 14px; border-radius: 12px; font-size: 13px; font-weight: 800; cursor: pointer; transition: all 0.3s ease; border: 1px solid rgba(2,44,69,0.1); background: #ffffff; color: #4B5563; flex: 1; min-width: 0; text-align: center; }
        @media (min-width: 480px) { .type-btn { padding: 12px 24px; font-size: 14px; } }
        .type-btn.active { background: #022C45; color: #ffffff; border-color: #022C45; box-shadow: 0 8px 20px rgba(2,44,69,0.15); }
        .type-btn:hover:not(.active) { border-color: #F16101; color: #F16101; }
        
        /* Clean Info Cards */
        .info-card {
          background: #ffffff; border: 1px solid rgba(2,44,69,0.06); border-radius: 20px;
          padding: 40px 32px; display: flex; flex-direction: column; align-items: center; text-align: center;
          transition: all 0.4s cubic-bezier(0.22,1,0.36,1); box-shadow: 0 12px 24px rgba(2,44,69,0.02); position: relative; overflow: hidden;
        }
        .info-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px;
          background: linear-gradient(90deg, #07CBEB, #F16101); transform: scaleX(0); transition: transform 0.4s ease; transform-origin: center;
        }
        .info-card:hover { transform: translateY(-8px); box-shadow: 0 24px 48px rgba(2,44,69,0.08); border-color: rgba(7,203,235,0.2); }
        .info-card:hover::before { transform: scaleX(1); }
        .info-icon-wrap {
          width: 64px; height: 64px; border-radius: 16px; background: #F4FBFC; color: #07CBEB;
          display: flex; align-items: center; justify-content: center; margin-bottom: 24px; transition: all 0.4s ease;
        }
        .info-card:hover .info-icon-wrap { background: #07CBEB; color: #ffffff; border-radius: 50%; box-shadow: 0 8px 16px rgba(7,203,235,0.2); }
        .info-card-title { font-size: 18px; font-weight: 800; color: #022C45; margin-bottom: 12px; letter-spacing: -0.3px; }
        .info-card-text { font-size: 15px; font-weight: 500; color: #4B5563; line-height: 1.6; }
        .info-card-link { color: #022C45; text-decoration: none; transition: color 0.2s; }
        .info-card-link:hover { color: #F16101; }
      `}</style>

      {/* ════════════════════════════════════════════════════════
          1. PREMIUM LIGHT HERO SECTION
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
                Connect With Us
              </span>
            </div>

            <h1 style={{
              fontSize: "clamp(44px, 5vw, 64px)", fontWeight: 900, color: "#022C45", lineHeight: 1.1,
              letterSpacing: "-1px", marginBottom: "24px",
              animation: heroRef.inView ? "fadeSlideUp 0.55s ease 0.2s both" : "none",
            }}>
              Get in <span style={{ color: "#F16101", position: "relative", display: "inline-block" }}>
                Touch.
                <svg aria-hidden="true" style={{ position: "absolute", bottom: "-14px", left: "-2%", width: "104%", overflow: "visible" }} height="8" viewBox="0 0 200 8" preserveAspectRatio="none">
                  <path d="M0,5 Q50,0 100,5 Q150,10 200,5" stroke="#F16101" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>

            <div style={{ position: "relative", zIndex: 1, marginTop: "32px", animation: heroRef.inView ? "fadeSlideUp 0.6s ease 0.3s both" : "none" }}>
              <p style={{ fontSize: "17.5px", color: "#4B5563", fontWeight: 500, lineHeight: 1.8, margin: 0, maxWidth: "540px" }}>
                Take the first step towards your international future. We provide honest, step-by-step visa assistance and direct university placements, ensuring a smooth and reliable journey from India to your dream destination.
              </p>
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
                 src="/images/contact-vector.png" 
                 alt="Contact Support Vector" 
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
          2. UNCLUTTERED CONTACT SECTION
      ════════════════════════════════════════════════════════ */}
      <section style={{ padding: isMobile ? "40px 0 64px" : "80px 0 120px" }}>
        <div ref={contentRef.ref} style={{ maxWidth: "1280px", margin: "0 auto", padding: isMobile ? "0 16px" : "0 24px" }}>
          
          <div style={{ 
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px", 
            marginBottom: "64px", animation: contentRef.inView ? "fadeSlideUp 0.6s cubic-bezier(0.22,1,0.36,1) both" : "none" 
          }}>
            
            <div className="info-card">
              <div className="info-icon-wrap">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.56a16 16 0 0 0 6.07 6.07l.97-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <div className="info-card-title">Direct Lines</div>
              <div className="info-card-text" style={{ display: "flex", flexDirection: "column", gap: "6px", width: "100%", alignItems: "center" }}>
                
                {/* 2x2 Grid Layout for perfectly aligned numbers matching the footer */}
                <div style={{ 
                  display: "grid", gridTemplateColumns: "auto auto auto", 
                  alignItems: "center", justifyContent: "center", gap: "6px 8px", marginTop: "4px", fontSize: "clamp(12px, 3.5vw, 15px)" 
                }}>
                  {/* Row 1 */}
                  <a href="tel:+918799450049" className="info-card-link" style={{ whiteSpace: "nowrap", fontWeight: 700 }}>+91 87994 50049</a>
                  <span style={{ color: "rgba(2,44,69,0.2)", fontSize: "12px", display: "flex", justifyContent: "center" }}>|</span>
                  <a href="tel:+6580782915" className="info-card-link" style={{ whiteSpace: "nowrap", fontWeight: 700 }}>+65 8078 2915</a>

                  {/* Row 2 */}
                  <a href="tel:+917016351347" className="info-card-link" style={{ whiteSpace: "nowrap", fontWeight: 700 }}>+91 70163 51347</a>
                  <span style={{ color: "rgba(2,44,69,0.2)", fontSize: "12px", display: "flex", justifyContent: "center" }}>|</span>
                  <a href="tel:+919376878378" className="info-card-link" style={{ whiteSpace: "nowrap", fontWeight: 700 }}>+91 93768 78378</a>
                </div>

                <a href={waLink} target="_blank" rel="noreferrer" style={{ color: "#F16101", fontWeight: 700, textDecoration: "none", display: "flex", alignItems: "center", gap: "6px", justifyContent: "center", marginTop: "12px" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.422-.885-.746-1.482-1.668-1.656-1.965-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.012c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.052 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
                  WhatsApp Available
                </a>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon-wrap">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </div>
              <div className="info-card-title">Email Support</div>
              <div className="info-card-text">
                <a href="mailto:info@edificationoverseas.in" className="info-card-link">info@edificationoverseas.in</a>
              </div>
              <div style={{ marginTop: "16px", fontSize: "12.5px", color: "#9CA3AF", fontWeight: 600 }}>We typically respond within 24 hours.</div>
            </div>

            <div className="info-card">
              <div className="info-icon-wrap">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <div className="info-card-title">Our Offices</div>
              <div className="info-card-text" style={{ fontSize: "14px" }}>
                <strong>Head Office:</strong> A-411 4th floor and A-1123 11th floor, Sun West Bank, Ashram Road, Ahmedabad<br/><br/>
                <strong>Branch Office:</strong> 211, Jalan Loyang Besar, #01-03, Edgewater, Singapore
              </div>
            </div>

          </div>

          <div style={{ 
            maxWidth: "900px", margin: "0 auto", background: "#ffffff", borderRadius: "24px", 
            boxShadow: "0 24px 64px rgba(2,44,69,0.06)", border: "1px solid rgba(2,44,69,0.08)", 
            padding: "clamp(32px, 5vw, 64px)",
            animation: contentRef.inView ? "fadeSlideUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.2s both" : "none" 
          }}>
            
            <div style={{ display: "flex", background: "rgba(2,44,69,0.03)", borderRadius: "16px", padding: "8px", marginBottom: "48px" }}>
              <button 
                onClick={() => setActiveTab('enquiry')} 
                className={`tab-btn ${activeTab === 'enquiry' ? 'active' : 'inactive'}`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: activeTab === 'enquiry' ? '#F16101' : 'inherit' }}><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                Send Enquiry
              </button>
              <button 
                onClick={() => setActiveTab('booking')} 
                className={`tab-btn ${activeTab === 'booking' ? 'active' : 'inactive'}`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: activeTab === 'booking' ? '#F16101' : 'inherit' }}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                Book Consultation
              </button>
            </div>

            {/* ── FORM VIEW ── */}
            {activeTab === 'enquiry' && (
              <div style={{ animation: "fadeSlideUp 0.4s ease both" }}>
                <div style={{ marginBottom: "40px", textAlign: "center" }}>
                  <h2 style={{ fontSize: "32px", fontWeight: 900, color: "#022C45", marginBottom: "8px", letterSpacing: "-0.5px" }}>How can we help?</h2>
                  <p style={{ fontSize: "16px", color: "#6B7280", margin: 0 }}>Fill out the form below and our dedicated team will get back to you promptly.</p>
                </div>

                <div style={{ marginBottom: "32px" }}>
                  <span className="label-text">I am a:</span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                    <button type="button" onClick={() => setEnquirerType('student')} className={`type-btn ${enquirerType === 'student' ? 'active' : ''}`}>Student / Parent</button>
                    <button type="button" onClick={() => setEnquirerType('partner')} className={`type-btn ${enquirerType === 'partner' ? 'active' : ''}`}>Recruitment Partner</button>
                    <button type="button" onClick={() => setEnquirerType('university')} className={`type-btn ${enquirerType === 'university' ? 'active' : ''}`}>University / Institution</button>
                  </div>
                </div>

                <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                  
                  {(enquirerType === 'partner' || enquirerType === 'university') && (
                    <div>
                      <label className="label-text">{enquirerType === 'university' ? 'Institution Name' : 'Company / Agency Name'} *</label>
                      <input type="text" name="companyName" value={formData.companyName} onChange={handleInputChange} required className="input-field" placeholder={enquirerType === 'university' ? "e.g. University of London" : "Global Education Services"} />
                    </div>
                  )}

                  {enquirerType === 'university' && (
                    <div>
                      <label className="label-text">Designation / Role</label>
                      <input type="text" name="designation" value={formData.designation} onChange={handleInputChange} className="input-field" placeholder="e.g. Regional Manager" />
                    </div>
                  )}

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }}>
                    <div>
                      <label className="label-text">{enquirerType === 'student' ? 'Full Name' : 'Contact Person Name'} *</label>
                      <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="input-field" placeholder="Your full name" />
                    </div>
                    <div>
                      <label className="label-text">Email Address *</label>
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="input-field" placeholder="you@example.com" />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }}>
                    <div>
                      <label className="label-text">Contact Number *</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required className="input-field" placeholder="+91 XXXXX XXXXX" />
                    </div>
                    
                    {enquirerType === 'student' ? (
                      <div>
                        <label className="label-text">Preferred Destination</label>
                        <select name="country" value={formData.country} onChange={handleInputChange} className="input-field" style={{ cursor: "pointer" }}>
                          <option value="">Select a country...</option>
                          {studyCountries.map(c => <option key={c} value={c}>{c}</option>)}
                          <option value="Not decided">Not decided yet</option>
                        </select>
                      </div>
                    ) : (
                      <div>
                        <label className="label-text">Location (City/Country)</label>
                        <input type="text" name="location" value={formData.location} onChange={handleInputChange} className="input-field" placeholder="e.g. New Delhi, India" />
                      </div>
                    )}
                  </div>

                  {enquirerType === 'student' && (
                    <div>
                      <label className="label-text">Highest Qualification</label>
                      <select name="qualification" value={formData.qualification} onChange={handleInputChange} className="input-field" style={{ cursor: "pointer" }}>
                        <option value="">Select qualification...</option>
                        {qualifications.map(q => <option key={q} value={q}>{q}</option>)}
                      </select>
                    </div>
                  )}
                  
                  <div>
                    <label className="label-text">How Can We Help?</label>
                    <textarea name="message" value={formData.message} onChange={handleInputChange} rows={4} className="input-field" style={{ resize: "vertical" }} placeholder="Brief description of your requirements..."></textarea>
                  </div>

                  {status === 'success' && (() => {
                    const msgs = {
                      student: {
                        title: "Enquiry Submitted! 🎉",
                        body: "Thank you for reaching out! Our ICEF-accredited counsellor will review your profile and call you within 24 hours to discuss your study abroad options.",
                        sub: "In the meantime, explore our",
                        link: { href: "/countries", label: "33 destination guides →" },
                      },
                      partner: {
                        title: "Partnership Request Received! 🤝",
                        body: "Thank you for your interest in partnering with Edification Overseas! Our B2B partnerships manager will contact you within 24 hours to discuss how we can grow together.",
                        sub: "Learn more about our network at",
                        link: { href: "/about/certifications", label: "our certifications page →" },
                      },
                      university: {
                        title: "Institution Enquiry Received! 🏛️",
                        body: "Thank you for your interest! Our university relations team will review your submission and reach out within 24 hours to explore how Edification Overseas can represent your institution in India.",
                        sub: "View our current partner institutions at",
                        link: { href: "/about/company-profile", label: "our company profile →" },
                      },
                    };
                    const m = msgs[enquirerType] || msgs.student;
                    return (
                      <div style={{
                        padding: "24px", borderRadius: "16px",
                        background: "linear-gradient(135deg, #f0fdf4, #dcfce7)",
                        border: "1px solid #86efac",
                        display: "flex", flexDirection: "column", alignItems: "center",
                        textAlign: "center", gap: "14px",
                      }}>
                        <div style={{ width: "52px", height: "52px", borderRadius: "50%", background: "#22c55e", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 20px rgba(34,197,94,0.3)" }}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        </div>
                        <div>
                          <p style={{ fontSize: "17px", fontWeight: 900, color: "#15803d", margin: "0 0 8px" }}>{m.title}</p>
                          <p style={{ fontSize: "14px", color: "#166534", margin: "0 0 8px", lineHeight: 1.65 }}>{m.body}</p>
                          <p style={{ fontSize: "13px", color: "#16a34a", margin: 0 }}>
                            {m.sub}{" "}
                            <a href={m.link.href} style={{ color: "#15803d", fontWeight: 700 }}>{m.link.label}</a>
                          </p>
                        </div>
                      </div>
                    );
                  })()}

                  <button 
                    type="submit" 
                    disabled={status === 'loading' || status === 'success'}
                    style={{ 
                      width: "100%", padding: "18px", borderRadius: "12px", background: status === 'success' ? "#10B981" : "#F16101", 
                      color: "#ffffff", fontSize: "15px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px", 
                      border: "none", cursor: (status === 'loading' || status === 'success') ? "not-allowed" : "pointer", 
                      transition: "all 0.3s ease", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                      boxShadow: status === 'success' ? "none" : "0 8px 24px rgba(241,97,1,0.25)", marginTop: "16px"
                    }}
                  >
                    {status === 'loading' ? (
                      <>Sending Message...</>
                    ) : status === 'success' ? (
                      <>Submit Another Enquiry</>
                    ) : (
                      <>
                        Submit Enquiry
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                      </>
                    )}
                  </button>
                  <div style={{ textAlign: "center", fontSize: "13.5px", color: "#9CA3AF", fontWeight: 600, marginTop: "8px" }}>
                    Expert guidance for your overseas education journey.
                  </div>
                </form>
              </div>
            )}

            {/* ── CALENDLY BOOKING VIEW ── */}
            {activeTab === 'booking' && (
              <div style={{ animation: "fadeSlideUp 0.4s ease both" }}>
                <div style={{ marginBottom: "40px", textAlign: "center" }}>
                  <h2 style={{ fontSize: "32px", fontWeight: 900, color: "#022C45", marginBottom: "8px", letterSpacing: "-0.5px" }}>Schedule a Consultation</h2>
                  <p style={{ fontSize: "16px", color: "#6B7280", margin: 0 }}>Pick a date and time that works best for you to discuss directly with our experts.</p>
                </div>
                
                <div style={{ border: "1px solid rgba(2,44,69,0.1)", borderRadius: "16px", overflow: "hidden", background: "#f9fafb", display: "flex", flexDirection: "column" }}>
                   {/* By passing 'key={iframeKey}', React is forced to destroy and recreate this iframe 
                     every single time the tab is opened, preventing caching glitches!
                   */}
                   <iframe 
                     key={iframeKey}
                     src="https://calendly.com/edification-overseas/15min?hide_gdpr_banner=1" 
                     width="100%" 
                     height={isMobile ? 580 : 700} 
                     frameBorder="0" 
                     style={{ display: "block", borderRadius: "16px", background: "#ffffff" }}
                     title="Schedule a Consultation"
                   ></iframe>
                </div>
              </div>
            )}

          </div>

        </div>
      </section>

    </main>
  );
}