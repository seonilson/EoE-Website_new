"use client";
import React, { useEffect, useState } from "react";

// ── Data: Table of Contents ───────────────────────────────────
const tableOfContents = [
  { id: "introduction", label: "1. Introduction & Acceptance" },
  { id: "services", label: "2. Our Overseas Education Services" },
  { id: "user-obligations", label: "3. Your Responsibilities" },
  { id: "payments-refunds", label: "4. Fees, Payments & Refunds" },
  { id: "liability", label: "5. Limitation of Liability" },
  { id: "intellectual-property", label: "6. Intellectual Property" },
  { id: "governing-law", label: "7. Governing Law & Jurisdiction" },
  { id: "contact-us", label: "8. Contact Us" },
];

export default function TermsAndConditions() {
  const [activeSection, setActiveSection] = useState("introduction");

  useEffect(() => {
    const handleScroll = () => {
      const sections = tableOfContents.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 200; 

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 120; 
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <main style={{ backgroundColor: "#F9FAFB", minHeight: "100vh", paddingBottom: "120px" }}>
      <style>{`
        .legal-prose h2 { font-size: 24px; font-weight: 800; color: #022C45; margin: 0 0 16px 0; letter-spacing: -0.3px; }
        .legal-prose p { font-size: 16px; color: #4B5563; line-height: 1.75; margin: 0 0 24px 0; }
        .legal-prose ul { margin: 0 0 24px 0; padding-left: 20px; color: #4B5563; font-size: 16px; line-height: 1.75; }
        .legal-prose li { margin-bottom: 8px; }
        .legal-prose strong { color: #022C45; font-weight: 700; }
        .toc-link { display: block; padding: 8px 16px; font-size: 14px; font-weight: 600; color: #6B7280; text-decoration: none; border-left: 2px solid transparent; transition: all 0.2s ease; }
        .toc-link:hover { color: #F16101; background: rgba(241,97,1,0.03); }
        .toc-link.active { color: #F16101; border-left-color: #F16101; background: rgba(241,97,1,0.05); }
      `}</style>

      {/* ── HERO SECTION ── */}
      <section style={{ background: "#022C45", padding: "120px 24px 80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-100px", right: "10%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(241,97,1,0.15) 0%, transparent 70%)", pointerEvents: "none" }}/>
        <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1, textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "9px", marginBottom: "20px" }}>
            <div style={{ width: "30px", height: "2px", borderRadius: "1px", background: "linear-gradient(90deg, #F16101, #C9A24D)" }}/>
            <span style={{ fontSize: "12px", fontWeight: 800, letterSpacing: "2.5px", textTransform: "uppercase", background: "linear-gradient(90deg, #F16101, #C9A24D)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Legal</span>
            <div style={{ width: "30px", height: "2px", borderRadius: "1px", background: "linear-gradient(90deg, #C9A24D, #F16101)" }}/>
          </div>
          <h1 style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 900, color: "white", lineHeight: 1.1, letterSpacing: "-1px", margin: "0 0 20px" }}>
            Terms & Conditions
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "16px", margin: 0 }}>
            Effective Date: <span style={{ color: "white", fontWeight: 600 }}>May 1, 2026</span>
          </p>
        </div>
      </section>

      {/* ── CONTENT LAYOUT ── */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "64px 24px 0", display: "flex", gap: "64px", alignItems: "flex-start", flexWrap: "wrap" }}>
        
        <aside style={{ flex: "1 1 280px", position: "sticky", top: "120px", background: "white", borderRadius: "16px", padding: "24px 0", boxShadow: "0 12px 32px rgba(2,44,69,0.04), 0 1px 2px rgba(0,0,0,0.02)", border: "1px solid rgba(2,44,69,0.06)" }}>
          <h3 style={{ fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px", color: "#022C45", margin: "0 0 16px 24px" }}>Contents</h3>
          <nav style={{ display: "flex", flexDirection: "column" }}>
            {tableOfContents.map((item) => (
              <a key={item.id} href={`#${item.id}`} onClick={(e) => scrollToSection(e, item.id)} className={`toc-link ${activeSection === item.id ? "active" : ""}`}>
                {item.label}
              </a>
            ))}
          </nav>
        </aside>

        <article className="legal-prose" style={{ flex: "3 1 600px", background: "white", borderRadius: "20px", padding: "48px", boxShadow: "0 12px 32px rgba(2,44,69,0.03), 0 1px 2px rgba(0,0,0,0.02)", border: "1px solid rgba(2,44,69,0.06)" }}>
          
          <div id="introduction" style={{ paddingTop: "8px" }}>
            <h2>1. Introduction & Acceptance</h2>
            <p>Welcome to <strong>Edification Overseas Education</strong>. By accessing our platform, booking a consultation, or engaging our services for university admissions or visa applications, you agree to comply with these terms.</p>
          </div>

          <hr style={{ border: "none", borderTop: "1px solid rgba(2,44,69,0.08)", margin: "40px 0" }} />

          <div id="services">
            <h2>2. Our Overseas Education Services</h2>
            <p>We provide expert guidance to facilitate your international transition. Our core services include:</p>
            <ul>
              <li><strong>University Admissions:</strong> Counseling, shortlisting, and applying to global universities.</li>
              <li><strong>Visa Services:</strong> Complete guidance on document preparation and visa application filing.</li>
            </ul>
            <p>While we strive to provide the most accurate guidance, immigration laws change frequently. The final decisions rest entirely with the institutions and government bodies.</p>
          </div>

          <hr style={{ border: "none", borderTop: "1px solid rgba(2,44,69,0.08)", margin: "40px 0" }} />

          <div id="user-obligations">
            <h2>3. Your Responsibilities & Documents</h2>
            <ul>
              <li><strong>Genuine Information:</strong> You must provide 100% accurate, genuine, and authentic information regarding your academic and financial history.</li>
              <li><strong>No Fraudulent Documents:</strong> We maintain a strict zero-tolerance policy for fake or altered documents. If discovered, we reserve the right to immediately terminate our services without any refund.</li>
            </ul>
          </div>

          <hr style={{ border: "none", borderTop: "1px solid rgba(2,44,69,0.08)", margin: "40px 0" }} />

          <div id="payments-refunds">
            <h2>4. Fees, Payments & Refunds</h2>
            <ul>
              <li><strong>Consultation Fees:</strong> Processing fees will be outlined clearly before any contract is signed.</li>
              <li><strong>Third-Party Fees:</strong> You are directly responsible for paying all third-party costs (embassy fees, couriers, medical tests).</li>
              <li><strong>Refund Policy:</strong> Our professional consulting fees are strictly non-refundable once the application process has commenced. We do not offer refunds in the event of a visa refusal.</li>
            </ul>
          </div>

          <hr style={{ border: "none", borderTop: "1px solid rgba(2,44,69,0.08)", margin: "40px 0" }} />

          <div id="liability">
            <h2>5. Limitation of Liability (Visa Approvals)</h2>
            <p><strong>We Do Not Guarantee Visas or Admissions.</strong> We provide expert assistance to maximize your chances of success, but the final authority to grant or deny an admission offer or a visa rests solely with the University and the Embassy.</p>
          </div>

          <hr style={{ border: "none", borderTop: "1px solid rgba(2,44,69,0.08)", margin: "40px 0" }} />

          <div id="intellectual-property">
            <h2>6. Intellectual Property</h2>
            <p>All content on this website is the intellectual property of Edification Overseas Education. You may not copy, reproduce, or distribute our content for commercial purposes without our explicit written consent.</p>
          </div>

          <hr style={{ border: "none", borderTop: "1px solid rgba(2,44,69,0.08)", margin: "40px 0" }} />

          <div id="governing-law">
            <h2>7. Governing Law & Jurisdiction</h2>
            <p>These Terms and Conditions shall be governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the competent courts located in <strong>Ahmedabad, Gujarat, India</strong>.</p>
          </div>

          <hr style={{ border: "none", borderTop: "1px solid rgba(2,44,69,0.08)", margin: "40px 0" }} />

          <div id="contact-us">
            <h2>8. Contact Us</h2>
            <div style={{ background: "#F9FAFB", padding: "24px", borderRadius: "12px", border: "1px solid rgba(2,44,69,0.08)", marginTop: "24px" }}>
              <p style={{ margin: "0 0 8px 0", color: "#022C45" }}><strong>Edification Overseas Education</strong></p>
              <p style={{ margin: "0 0 8px 0" }}>A-411, 4th Floor, Sun West Bank, Ashram Road</p>
              <p style={{ margin: "0 0 8px 0" }}>Ahmedabad, Gujarat 380009, India</p>
              <p style={{ margin: "0 0 8px 0" }}><strong>Email:</strong> <a href="mailto:info@edificationoverseas.in" style={{ color: "#F16101", textDecoration: "none" }}>info@edificationoverseas.in</a></p>
            </div>
          </div>

        </article>
      </div>
    </main>
  );
}