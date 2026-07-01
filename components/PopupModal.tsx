"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const testimonials = [
  {
    name: "Kashyap Kumbhani",
    destination: "UK",
    quote: "After a USA visa rejection, the Edification team guided me to the UK and I finally got my visa. A true support system.",
    img: "/images/gallery/kashyab-kumbhani.jpg",
  },
  {
    name: "Sujal Gujjar",
    destination: "Singapore",
    quote: "Very fast and smooth process. No advance payments built massive trust. Highly professional team.",
    img: "/images/gallery/sujal-gujjar.jpg",
  },
  {
    name: "Yashvi Bhatt",
    destination: "Cyprus",
    quote: "They explained every step clearly and supported me until my visa was approved. Excellent guidance.",
    img: "/images/gallery/yashvi-bhatt.jpg",
  },
];

const flags = [
  { src: "/images/flags/gb.png", alt: "UK" },
  { src: "/images/flags/ca.png", alt: "Canada" },
  { src: "/images/flags/au.png", alt: "Australia" },
  { src: "/images/flags/us.png", alt: "USA" },
  { src: "/images/flags/sg.png", alt: "Singapore" },
  { src: "/images/flags/mu.png", alt: "Mauritius" },
  { src: "/images/flags/de.png", alt: "Germany" },
  { src: "/images/flags/cy.png", alt: "Cyprus" },
];

const COUNTRIES = [
  "United Kingdom", "Canada", "USA", "Australia", "Singapore",
  "Germany", "France", "Ireland", "Cyprus", "Netherlands",
  "Dubai (UAE)", "Malaysia", "New Zealand", "Japan", "South Korea",
  "Europe (Other)", "Not Decided Yet",
];

interface PopupConfig {
  announcementEnabled: boolean;
  announcementImage:   string;
  announcementLink:    string;
  announcementAlt:     string;
}

export default function PopupModal() {
  const [isOpen,      setIsOpen]      = useState(false);
  const [activeTesti, setActiveTesti] = useState(0);
  const [config,      setConfig]      = useState<PopupConfig | null>(null);
  const [isMobile,    setIsMobile]    = useState<boolean | null>(null);
  const [formData,    setFormData]    = useState({ name: "", phone: "", email: "", destination: "" });
  const [formStatus,  setFormStatus]  = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formMsg,     setFormMsg]     = useState("");

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Fetch popup config
  useEffect(() => {
    fetch("/api/popup")
      .then(r => r.json())
      .then((d: PopupConfig) => setConfig(d))
      .catch(() => setConfig({ announcementEnabled: false, announcementImage: "", announcementLink: "/contact", announcementAlt: "Special Offer" }));
  }, []);

  // Show popup once per session — wait for both config and isMobile
  useEffect(() => {
    if (config === null || isMobile === null) return;
    const seen = sessionStorage.getItem("eoe_popup_shown");
    if (!seen) {
      const t = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem("eoe_popup_shown", "true");
      }, 3000);
      return () => clearTimeout(t);
    }
  }, [config, isMobile]);

  // Rotate testimonials
  useEffect(() => {
    if (!isOpen || config?.announcementEnabled) return;
    const iv = setInterval(() => setActiveTesti(p => (p + 1) % testimonials.length), 4000);
    return () => clearInterval(iv);
  }, [isOpen, config]);

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("loading");
    try {
      const res  = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "student", name: formData.name, phone: formData.phone,
          email: formData.email, country: formData.destination,
          message: "Enquiry submitted via popup modal.",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setFormStatus("success");
        setFormMsg("Thank you! Our counsellor will call you shortly.");
        setTimeout(() => setIsOpen(false), 3000);
      } else {
        setFormStatus("error");
        setFormMsg(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setFormStatus("error");
      setFormMsg("Network error. Please try again.");
    }
  };

  if (!isOpen || config === null || isMobile === null) return null;

  const showAnnouncement = config.announcementEnabled && !!config.announcementImage;

  return (
    <>
      <style>{`
        @keyframes backdropIn { from { opacity:0; } to { opacity:1; } }
        @keyframes modalIn {
          from { opacity:0; transform:scale(0.95) translateY(20px); }
          to   { opacity:1; transform:scale(1) translateY(0); }
        }
        @keyframes slideIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }

        .eoe-overlay {
          position:fixed; inset:0; z-index:999999;
          background:rgba(2,28,44,0.75);
          backdrop-filter:blur(8px); -webkit-backdrop-filter:blur(8px);
          display:flex; align-items:center; justify-content:center;
          padding:12px;
          animation:backdropIn 0.35s ease forwards;
        }
        .eoe-modal {
          width:100%;
          max-width:${showAnnouncement ? "480px" : isMobile ? "400px" : "820px"};
          max-height:94vh; overflow-y:auto; overflow-x:hidden;
          background:#ffffff;
          border-radius:20px;
          box-shadow:0 32px 64px rgba(2,44,69,0.28);
          position:relative;
          animation:modalIn 0.45s cubic-bezier(0.22,1,0.36,1) forwards;
          display:flex; flex-direction:column;
        }
        .eoe-modal::-webkit-scrollbar { width:0; }

        /* Desktop: side by side */
        .eoe-grid {
          display:grid;
          grid-template-columns:${isMobile ? "1fr" : "1fr 1.1fr"};
        }

        .eoe-input {
          width:100%; background:#F9FAFB;
          border:1.5px solid rgba(2,44,69,0.1); border-radius:9px;
          padding:10px 13px; font-size:14px; color:#022C45;
          outline:none; transition:all 0.2s ease; font-family:inherit;
          box-sizing:border-box;
        }
        .eoe-input:focus {
          border-color:#F16101; background:#fff;
          box-shadow:0 0 0 3px rgba(241,97,1,0.08);
        }
        .eoe-label {
          font-size:11px; font-weight:700; color:#9CA3AF;
          text-transform:uppercase; letter-spacing:0.8px;
          display:block; margin-bottom:5px;
        }
        .eoe-close {
          position:absolute; top:12px; right:12px; z-index:20;
          width:32px; height:32px; border-radius:50%;
          background:rgba(255,255,255,0.92); border:1px solid rgba(2,44,69,0.1);
          cursor:pointer; display:flex; align-items:center; justify-content:center;
          color:#6B7280; transition:all 0.2s ease;
          box-shadow:0 2px 6px rgba(0,0,0,0.08);
        }
        .eoe-close:hover { background:#F16101; color:white; border-color:#F16101; }
        .testi-slide {
          position:absolute; inset:0;
          transition:opacity 0.6s ease;
          display:flex; flex-direction:column; gap:12px;
        }
      `}</style>

      <div className="eoe-overlay" onClick={() => setIsOpen(false)}>
        <div className="eoe-modal" onClick={e => e.stopPropagation()}>

          {/* Close */}
          <button className="eoe-close" onClick={() => setIsOpen(false)} aria-label="Close">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>

          {/* ══ ANNOUNCEMENT MODE ══ */}
          {showAnnouncement ? (
            <div style={{ display:"flex", flexDirection:"column" }}>
              <Link href={config.announcementLink} onClick={() => setIsOpen(false)} style={{ display:"block", textDecoration:"none" }}>
                <div style={{ position:"relative", width:"100%", aspectRatio:"16/10", borderRadius:"20px 20px 0 0", overflow:"hidden", background:"#e8ecf0" }}>
                  <Image src={config.announcementImage} alt={config.announcementAlt} fill style={{ objectFit:"cover" }} priority/>
                </div>
              </Link>
              <div style={{ padding:"16px 20px 20px", textAlign:"center" }}>
                <div style={{ display:"flex", gap:"10px", justifyContent:"center", flexWrap:"wrap" }}>
                  <Link href={config.announcementLink} onClick={() => setIsOpen(false)}
                    style={{ padding:"10px 22px", borderRadius:"8px", background:"#F16101", color:"#fff", fontWeight:800, fontSize:"13px", textDecoration:"none", textTransform:"uppercase", letterSpacing:"0.8px" }}>
                    Learn More →
                  </Link>
                  <button onClick={() => setConfig(c => c ? { ...c, announcementEnabled:false } : c)}
                    style={{ padding:"10px 18px", borderRadius:"8px", border:"1.5px solid rgba(2,44,69,0.12)", background:"#fff", color:"#022C45", fontWeight:700, fontSize:"13px", cursor:"pointer", fontFamily:"inherit" }}>
                    Book Consultation
                  </button>
                </div>
              </div>
            </div>

          ) : (
          /* ══ NORMAL CONTACT MODAL ══ */
          <>
            <div className="eoe-grid">

              {/* ── LEFT: Social Proof — desktop only ── */}
              {!isMobile && (
                <div style={{
                  background:"linear-gradient(150deg, #022C45 0%, #033d5e 60%, #041f30 100%)",
                  padding:"28px 24px",
                  position:"relative", overflow:"hidden",
                  display:"flex", flexDirection:"column",
                  borderRadius:"20px 0 0 20px",
                  minHeight:"360px",
                }}>
                  <div style={{ position:"absolute", top:"-50px", left:"-50px", width:"180px", height:"180px", background:"radial-gradient(circle, rgba(241,97,1,0.18) 0%, transparent 65%)", borderRadius:"50%", pointerEvents:"none" }}/>
                  <div style={{ position:"absolute", bottom:"-30px", right:"-30px", width:"130px", height:"130px", background:"radial-gradient(circle, rgba(7,203,235,0.12) 0%, transparent 65%)", borderRadius:"50%", pointerEvents:"none" }}/>

                  {/* Header */}
                  <div style={{ marginBottom:"20px", position:"relative", zIndex:1 }}>
                    <div style={{ display:"inline-flex", alignItems:"center", gap:"6px", background:"rgba(7,203,235,0.12)", border:"1px solid rgba(7,203,235,0.2)", borderRadius:"999px", padding:"4px 10px", marginBottom:"12px" }}>
                      <span style={{ width:"5px", height:"5px", borderRadius:"50%", background:"#07CBEB", display:"inline-block" }}/>
                      <span style={{ fontSize:"9px", fontWeight:800, color:"#07CBEB", textTransform:"uppercase", letterSpacing:"1.2px" }}>Real Student Success</span>
                    </div>
                    <h3 style={{ color:"#fff", fontSize:"17px", fontWeight:900, margin:0, lineHeight:1.25 }}>
                      Join 4,000+ students<br/>who made it abroad
                    </h3>
                  </div>

                  {/* Testimonials */}
                  <div style={{ position:"relative", flex:1, zIndex:1, minHeight:"160px" }}>
                    {testimonials.map((t, i) => (
                      <div key={i} className="testi-slide" style={{ opacity:activeTesti===i ? 1 : 0, pointerEvents:activeTesti===i ? "auto" : "none" }}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="rgba(241,97,1,0.35)">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                        </svg>
                        <p style={{ color:"rgba(255,255,255,0.85)", fontSize:"13px", lineHeight:1.6, fontStyle:"italic", margin:0, flex:1 }}>"{t.quote}"</p>
                        <div style={{ display:"flex", alignItems:"center", gap:"9px" }}>
                          <div style={{ width:"36px", height:"36px", borderRadius:"50%", overflow:"hidden", position:"relative", flexShrink:0, border:"2px solid rgba(241,97,1,0.5)" }}>
                            <Image src={t.img} alt={t.name} fill sizes="36px" style={{ objectFit:"cover" }} />
                          </div>
                          <div>
                            <div style={{ color:"#fff", fontSize:"12px", fontWeight:800 }}>{t.name}</div>
                            <div style={{ display:"flex", alignItems:"center", gap:"4px", marginTop:"2px" }}>
                              <span style={{ fontSize:"9px", fontWeight:700, color:"#07CBEB", textTransform:"uppercase", letterSpacing:"0.8px" }}>Visa Approved</span>
                              <span style={{ width:"2px", height:"2px", borderRadius:"50%", background:"rgba(255,255,255,0.3)", display:"inline-block" }}/>
                              <span style={{ fontSize:"9px", color:"rgba(255,255,255,0.5)", fontWeight:600 }}>{t.destination}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Dots */}
                  <div style={{ display:"flex", gap:"5px", marginTop:"16px", position:"relative", zIndex:1 }}>
                    {testimonials.map((_, i) => (
                      <button key={i} onClick={() => setActiveTesti(i)}
                        style={{ width:activeTesti===i ? "18px" : "5px", height:"5px", borderRadius:"3px", background:activeTesti===i ? "#F16101" : "rgba(255,255,255,0.2)", transition:"width 0.3s ease", border:"none", cursor:"pointer", padding:0 }}/>
                    ))}
                  </div>

                  {/* Mini stats */}
                  <div style={{ display:"flex", gap:"16px", marginTop:"16px", paddingTop:"16px", borderTop:"1px solid rgba(255,255,255,0.07)", position:"relative", zIndex:1 }}>
                    {[["98%","Visa Success"],["10+","Years"],["33+","Countries"],["100+","Universities"]].map(([num,lbl]) => (
                      <div key={lbl}>
                        <div style={{ fontSize:"16px", fontWeight:900, color:"#F16101", lineHeight:1 }}>{num}</div>
                        <div style={{ fontSize:"9px", color:"rgba(255,255,255,0.45)", fontWeight:600, marginTop:"3px", textTransform:"uppercase", letterSpacing:"0.5px" }}>{lbl}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── RIGHT: Form ── */}
              <div style={{ padding: isMobile ? "28px 20px 20px" : "24px 24px 20px", display:"flex", flexDirection:"column" }}>

                {/* Mobile: tiny badge at top */}
                {isMobile && (
                  <div style={{ display:"flex", alignItems:"center", gap:"6px", marginBottom:"14px" }}>
                    <div style={{ display:"inline-flex", alignItems:"center", gap:"5px", background:"rgba(7,203,235,0.08)", border:"1px solid rgba(7,203,235,0.2)", borderRadius:"999px", padding:"3px 10px" }}>
                      <span style={{ width:"5px", height:"5px", borderRadius:"50%", background:"#07CBEB", display:"inline-block" }}/>
                      <span style={{ fontSize:"9px", fontWeight:800, color:"#07CBEB", textTransform:"uppercase", letterSpacing:"1px" }}>98% Visa Success · 4,000+ Students</span>
                    </div>
                  </div>
                )}

                {/* Header */}
                <div style={{ marginBottom: isMobile ? "16px" : "18px" }}>
                  {!isMobile && (
                    <div style={{ display:"inline-flex", alignItems:"center", gap:"5px", background:"rgba(241,97,1,0.07)", border:"1px solid rgba(241,97,1,0.15)", borderRadius:"999px", padding:"3px 10px", marginBottom:"10px" }}>
                      <span style={{ width:"5px", height:"5px", borderRadius:"50%", background:"#F16101", display:"inline-block" }}/>
                      <span style={{ fontSize:"9px", fontWeight:800, color:"#F16101", textTransform:"uppercase", letterSpacing:"1.2px" }}>Free Consultation</span>
                    </div>
                  )}
                  <h2 style={{ fontSize: isMobile ? "20px" : "22px", fontWeight:900, color:"#022C45", margin:"0 0 6px", lineHeight:1.2, letterSpacing:"-0.4px" }}>
                    {isMobile ? "Book a Free Consultation" : "Start Your Study\nAbroad Journey"}
                  </h2>
                  <p style={{ fontSize:"12px", color:"#6B7280", margin:0, lineHeight:1.55 }}>
                    Free 30-min session with our ICEF counsellors. No fees.
                  </p>
                </div>

                {/* Success */}
                {formStatus === "success" ? (
                  <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center", padding:"16px 0", animation:"slideIn 0.4s ease both" }}>
                    <div style={{ width:"48px", height:"48px", borderRadius:"50%", background:"#dcfce7", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"12px" }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <h3 style={{ fontSize:"16px", fontWeight:900, color:"#022C45", margin:"0 0 6px" }}>Request Received!</h3>
                    <p style={{ fontSize:"13px", color:"#6B7280", margin:0, lineHeight:1.55 }}>{formMsg}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap: isMobile ? "10px" : "12px", flex:1 }}>
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px" }}>
                      <div>
                        <label className="eoe-label">Full Name *</label>
                        <input className="eoe-input" type="text" placeholder="Rahul Sharma" required
                          value={formData.name} onChange={e => setFormData(f => ({ ...f, name:e.target.value }))}/>
                      </div>
                      <div>
                        <label className="eoe-label">Phone *</label>
                        <input className="eoe-input" type="tel" placeholder="+91 98765 43210" required
                          value={formData.phone} onChange={e => setFormData(f => ({ ...f, phone:e.target.value }))}/>
                      </div>
                    </div>

                    <div>
                      <label className="eoe-label">Email *</label>
                      <input className="eoe-input" type="email" placeholder="rahul@example.com" required
                        value={formData.email} onChange={e => setFormData(f => ({ ...f, email:e.target.value }))}/>
                    </div>

                    <div>
                      <label className="eoe-label">Preferred Destination *</label>
                      <select className="eoe-input" required style={{ appearance:"none", cursor:"pointer" }}
                        value={formData.destination} onChange={e => setFormData(f => ({ ...f, destination:e.target.value }))}>
                        <option value="">Select a country...</option>
                        {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>

                    {formStatus === "error" && (
                      <div style={{ padding:"8px 12px", background:"#fef2f2", border:"1px solid #fecaca", borderRadius:"8px" }}>
                        <p style={{ margin:0, fontSize:"12px", color:"#dc2626", fontWeight:600 }}>⚠ {formMsg}</p>
                      </div>
                    )}

                    <button type="submit" disabled={formStatus==="loading"}
                      style={{
                        marginTop:"2px", width:"100%",
                        padding: isMobile ? "13px" : "13px",
                        borderRadius:"10px",
                        background:formStatus==="loading" ? "#9CA3AF" : "#F16101",
                        color:"white", fontSize:"13px", fontWeight:800,
                        textTransform:"uppercase", letterSpacing:"0.8px",
                        border:"none", cursor:formStatus==="loading" ? "not-allowed" : "pointer",
                        boxShadow:formStatus==="loading" ? "none" : "0 6px 16px rgba(241,97,1,0.25)",
                        fontFamily:"inherit",
                      }}>
                      {formStatus==="loading" ? "Submitting..." : "Book Free Consultation →"}
                    </button>

                    <p style={{ fontSize:"11px", color:"#9CA3AF", textAlign:"center", margin:0 }}>
                      🔒 Private & secure. No spam, ever.
                    </p>
                  </form>
                )}
              </div>
            </div>

            {/* ── BOTTOM STRIP — desktop only ── */}
            {!isMobile && (
              <div style={{ background:"#F9FAFB", borderTop:"1px solid rgba(2,44,69,0.06)", padding:"12px 24px" }}>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"6px", flexWrap:"wrap" }}>
                  <span style={{ fontSize:"10px", fontWeight:800, color:"#9CA3AF", textTransform:"uppercase", letterSpacing:"1px" }}>We Cover:</span>
                  {flags.map((f, i) => (
                    <div key={i} style={{ width:"20px", height:"20px", borderRadius:"50%", overflow:"hidden", position:"relative", border:"1.5px solid rgba(0,0,0,0.08)", flexShrink:0 }}>
                      <Image src={f.src} alt={f.alt} fill sizes="20px" style={{ objectFit:"cover" }} />
                    </div>
                  ))}
                  <span style={{ fontSize:"11px", fontWeight:700, color:"#022C45" }}>+25 more countries</span>
                </div>
              </div>
            )}
          </>
          )}

        </div>
      </div>
    </>
  );
}