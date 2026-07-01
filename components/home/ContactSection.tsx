"use client";
import React, { useRef, useState, useEffect } from "react";

// ── InView hook ───────────────────────────────────────────────
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

// ═══════════════════════════════════════════════════════════════
//  CONTACT SECTION - SPLIT CONVERSION LAYOUT
// ═══════════════════════════════════════════════════════════════
export default function ContactSection() {
  const { ref, inView } = useInView();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus,  setSubmitStatus]  = useState<"idle"|"success"|"error">("idle");
  const [submitMsg,     setSubmitMsg]     = useState("");

  // 💥 UPDATED SUBMIT LOGIC WITH HOSTINGER WAF BYPASS HEADERS 💥
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Automatically collect all input fields that have a "name" attribute
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest' // Tells the WAF this is a legitimate React request
        },
        body: JSON.stringify({
          type: 'student', // Default to student from the homepage
          ...data
        }),
      });

      // Fixed: Renamed `data` to `resData` to avoid variable shadowing conflicts
      const resData = await response.json(); 
      
      if (response.ok && resData.success) {
        setSubmitStatus("success");
        setSubmitMsg("Thank you! Your enquiry has been received. Our counsellor will contact you within 24 hours.");
        (e.target as HTMLFormElement).reset();
      } else {
        setSubmitStatus("error");
        setSubmitMsg(resData.message || 'Something went wrong. Please try again or call us directly.');
      }
    } catch (error) {
      setSubmitStatus("error");
      setSubmitMsg('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section style={{
      padding: "120px 0",
      background: "#ffffff",
      position: "relative",
      overflow: "hidden",
    }}>
      <style>{`
        @keyframes contactFadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0;
          align-items: stretch;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 32px 80px rgba(2,44,69,0.10);
        }
        @media (min-width: 1024px) {
          .contact-grid { grid-template-columns: 1fr 1.3fr; }
        }

        /* ── LEFT DARK PANEL ── */
        .contact-left {
          background: #022C45;
          padding: 56px 48px;
          position: relative;
          overflow: hidden;
        }
        .contact-left::before {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            -55deg,
            transparent,
            transparent 20px,
            rgba(255,255,255,0.015) 20px,
            rgba(255,255,255,0.015) 21px
          );
          pointer-events: none;
        }

        /* ── FORM CARD (right white panel) ── */
        .form-card {
          background: #ffffff;
          padding: 56px 48px;
          position: relative;
          z-index: 2;
        }
        @media (max-width: 600px) {
          .contact-left { padding: 36px 24px; }
          .form-card { padding: 36px 24px; }
        }

        .input-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }
        @media (min-width: 600px) {
          .input-row { grid-template-columns: 1fr 1fr; }
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-label {
          font-size: 11px;
          font-weight: 800;
          color: #022C45;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .form-input {
          width: 100%;
          padding: 13px 16px;
          border-radius: 10px;
          border: 1.5px solid rgba(2,44,69,0.1);
          background: #F9FAFB;
          font-size: 14px;
          color: #022C45;
          transition: all 0.3s ease;
          font-family: inherit;
        }
        .form-input:focus {
          outline: none;
          border-color: #F16101;
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(241,97,1,0.08);
        }
        .form-input::placeholder { color: #9CA3AF; }

        select.form-input {
          appearance: none;
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23022C45' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right 14px center;
          background-size: 14px;
          cursor: pointer;
        }

        .checkbox-container {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-top: 12px;
          margin-bottom: 28px;
          cursor: pointer;
        }
        .checkbox-input {
          position: absolute; opacity: 0; cursor: pointer; height: 0; width: 0;
        }
        .checkmark {
          flex-shrink: 0; height: 20px; width: 20px;
          background-color: #F9FAFB;
          border: 1.5px solid rgba(2,44,69,0.2);
          border-radius: 6px;
          transition: all 0.2s ease;
          display: flex; align-items: center; justify-content: center;
          margin-top: 2px;
        }
        .checkbox-container:hover input ~ .checkmark { border-color: #F16101; }
        .checkbox-container input:checked ~ .checkmark {
          background-color: #F16101; border-color: #F16101;
        }
        .checkmark:after {
          content: ""; display: none;
          width: 4px; height: 10px;
          border: solid white; border-width: 0 2px 2px 0;
          transform: rotate(45deg); margin-bottom: 2px;
        }
        .checkbox-container input:checked ~ .checkmark:after { display: block; }
        .checkbox-text { font-size: 13px; color: #6B7280; line-height: 1.5; }

        .submit-btn {
          width: 100%;
          padding: 15px 32px;
          background: #F16101;
          color: #ffffff;
          border: none;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex; align-items: center; justify-content: center; gap: 10px;
        }
        .submit-btn:hover {
          background: #c94e00;
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(241,97,1,0.3);
        }
        .submit-btn:active { transform: translateY(0); }

        /* ── INFO BOXES ── */
        .info-box {
          display: flex; align-items: flex-start; gap: 16px;
          margin-bottom: 28px;
        }
        .info-icon {
          width: 44px; height: 44px;
          border-radius: 12px;
          background: rgba(7,203,235,0.12);
          color: #07CBEB;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
      `}</style>

      {/* Decorative glow */}
      <div style={{
        position: "absolute", bottom: "-200px", right: "-100px",
        width: "600px", height: "600px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(241,97,1,0.04) 0%, transparent 60%)",
        pointerEvents: "none", zIndex: 0,
      }}/>

      <div
        ref={ref}
        style={{
          maxWidth: "1180px", margin: "0 auto",
          padding: "0 24px", position: "relative", zIndex: 1,
        }}
      >
        <div
          className="contact-grid"
          style={{ animation: inView ? "contactFadeUp 0.8s cubic-bezier(0.22,1,0.36,1) both" : "none" }}
        >

          {/* ── LEFT: dark navy info panel ── */}
          <div className="contact-left">

            {/* Decorative glow inside panel */}
            <div style={{
              position: "absolute", top: "-80px", right: "-80px",
              width: "300px", height: "300px", borderRadius: "50%",
              background: "radial-gradient(circle, rgba(241,97,1,0.1) 0%, transparent 60%)",
              pointerEvents: "none",
            }}/>

            {/* Eyebrow */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "20px", position: "relative" }}>
              <div style={{ width: "24px", height: "2px", borderRadius: "1px", background: "linear-gradient(90deg, #F16101, #C9A24D)" }}/>
              <span style={{
                fontSize: "10px", fontWeight: 800, letterSpacing: "2.5px", textTransform: "uppercase",
                background: "linear-gradient(90deg, #F16101, #C9A24D)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>Free Consultation</span>
            </div>

            {/* Heading */}
            <h2 style={{
              fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 900,
              color: "#ffffff", lineHeight: 1.1, letterSpacing: "-0.8px",
              margin: "0 0 16px", position: "relative",
            }}>
              Let's Plan Your<br/>
              <span style={{
                background: "linear-gradient(100deg, #F16101 0%, #C9A24D 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>Global Journey</span>
            </h2>

            <p style={{
              fontSize: "15px", color: "rgba(255,255,255,0.65)",
              lineHeight: 1.65, margin: "0 0 44px",
            }}>
              Fill out the form and our expert counselors will map out your personalized pathway within 24 hours.
            </p>

            {/* Contact info boxes */}
            <div style={{ position: "relative" }}>
              <div className="info-box">
                <div className="info-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div>
                  <h4 style={{ fontSize: "14px", fontWeight: 800, color: "#ffffff", margin: "0 0 3px" }}>Call Us Directly</h4>
                  <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", margin: 0 }}>+91 87994 50049</p>
                </div>
              </div>

              <div className="info-box">
                <div className="info-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div>
                  <h4 style={{ fontSize: "14px", fontWeight: 800, color: "#ffffff", margin: "0 0 3px" }}>Email Support</h4>
                  <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", margin: 0 }}>info@edificationoverseas.in</p>
                </div>
              </div>

              <div className="info-box" style={{ marginBottom: 0 }}>
                <div className="info-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div>
                  <h4 style={{ fontSize: "14px", fontWeight: 800, color: "#ffffff", margin: "0 0 3px" }}>Head Office</h4>
                  <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", margin: 0, lineHeight: 1.5 }}>
                    A-411, 4th Floor, Sun West Bank,<br/>
                    Ashram Road, Ahmedabad, Gujarat 380009
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* ── RIGHT: white form panel ── */}
          <div className="form-card">
            <form onSubmit={handleSubmit}>

              <div className="input-row">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Full Name *</label>
                  <input type="text" id="name" name="name" required placeholder="John Doe" className="form-input" />
                </div>
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">Contact Number *</label>
                  <input type="tel" id="phone" name="phone" required placeholder="+91 00000 00000" className="form-input" />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: "20px" }}>
                <label htmlFor="email" className="form-label">Email Address *</label>
                <input type="email" id="email" name="email" required placeholder="john@example.com" className="form-input" />
              </div>

              <div className="input-row">
                <div className="form-group">
                  <label htmlFor="qualification" className="form-label">Highest Qualification</label>
                  <select id="qualification" name="qualification" defaultValue="" className="form-input">
                    <option value="" disabled>Select Qualification</option>
                    <option value="12th Standard">12th Standard / High School</option>
                    <option value="Diploma">Diploma</option>
                    <option value="Bachelors">Bachelor's Degree</option>
                    <option value="Masters">Master's Degree</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="destination" className="form-label">Preferred Destination</label>
                  <select id="destination" name="country" defaultValue="" className="form-input">
                    <option value="" disabled>Select Country</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="USA">USA</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                    <option value="New Zealand">New Zealand</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Europe">Europe</option>
                    <option value="Undecided">Still Undecided</option>
                  </select>
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: "20px" }}>
                <label htmlFor="course" className="form-label">Preferred Course / Major</label>
                <input type="text" id="course" name="course" placeholder="e.g., MSc Data Science, MBA..." className="form-input" />
              </div>

              <div className="form-group" style={{ marginBottom: "20px" }}>
                <label htmlFor="message" className="form-label">Anything Else We Should Know? (Optional)</label>
                <textarea id="message" name="message" rows={3} placeholder="e.g., budget range, intake year, English test scores, visa refusals..." className="form-input" style={{ resize: "none" }}></textarea>
              </div>

              <label className="checkbox-container">
                <input type="checkbox" className="checkbox-input" required />
                <span className="checkmark"></span>
                <span className="checkbox-text">
                  I consent to receive updates, calls, emails, and WhatsApp messages from Edification Overseas Education regarding my inquiry.
                </span>
              </label>

              {/* Success state */}
              {submitStatus === "success" && (
                <div style={{
                  padding: "20px 24px", borderRadius: "14px",
                  background: "linear-gradient(135deg, #f0fdf4, #dcfce7)",
                  border: "1px solid #86efac",
                  display: "flex", alignItems: "flex-start", gap: "14px",
                  marginBottom: "20px",
                }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#22c55e", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <div>
                    <p style={{ fontSize: "15px", fontWeight: 800, color: "#15803d", margin: "0 0 4px" }}>Enquiry Sent Successfully! 🎉</p>
                    <p style={{ fontSize: "13px", color: "#166534", margin: 0, lineHeight: 1.6 }}>{submitMsg}</p>
                  </div>
                </div>
              )}

              {/* Error state */}
              {submitStatus === "error" && (
                <div style={{
                  padding: "14px 18px", borderRadius: "12px",
                  background: "#fef2f2", border: "1px solid #fecaca",
                  display: "flex", alignItems: "center", gap: "10px",
                  marginBottom: "20px",
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  <p style={{ fontSize: "13px", color: "#dc2626", fontWeight: 600, margin: 0 }}>{submitMsg}</p>
                </div>
              )}

              {/* Submit button */}
              {submitStatus !== "success" && (
                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Submit Enquiry"}
                  {!isSubmitting && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                    </svg>
                  )}
                </button>
              )}

            </form>
          </div>

        </div>
      </div>
    </section>
  );
}