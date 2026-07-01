"use client";
import React, { useEffect, useState } from "react";

// ── Data: Table of Contents ───────────────────────────────────
const tableOfContents = [
  { id: "introduction", label: "1. Introduction" },
  { id: "information-collection", label: "2. Information We Collect" },
  { id: "how-we-use", label: "3. How We Use Your Information" },
  { id: "information-sharing", label: "4. Information Sharing & Disclosure" },
  { id: "data-security", label: "5. Data Security & Retention" },
  { id: "cookies", label: "6. Cookies & Tracking Technologies" },
  { id: "your-rights", label: "7. Your Privacy Rights" },
  { id: "contact-us", label: "8. Contact Us" },
];

export default function PrivacyPolicy() {
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
            Privacy Policy
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
            <h2>1. Introduction</h2>
            <p>Welcome to <strong>Edification Overseas Education</strong>. We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, safeguard, and disclose your data when you visit our website or utilize our overseas education and visa consultancy services.</p>
          </div>

          <hr style={{ border: "none", borderTop: "1px solid rgba(2,44,69,0.08)", margin: "40px 0" }} />

          <div id="information-collection">
            <h2>2. Information We Collect</h2>
            <p>To provide you with comprehensive study abroad and visa services, we collect:</p>
            <ul>
              <li><strong>Personal Identifiers:</strong> Name, date of birth, gender, marital status, and passport details.</li>
              <li><strong>Contact Information:</strong> Email address, phone number, and physical address.</li>
              <li><strong>Academic Records:</strong> Transcripts, diplomas, test scores (IELTS, TOEFL), and recommendation letters.</li>
              <li><strong>Financial Information:</strong> Bank statements and income proofs strictly for visa and university processing.</li>
            </ul>
          </div>

          <hr style={{ border: "none", borderTop: "1px solid rgba(2,44,69,0.08)", margin: "40px 0" }} />

          <div id="how-we-use">
            <h2>3. How We Use Your Information</h2>
            <p>We strictly use your personal information to facilitate your educational goals:</p>
            <ul>
              <li>Assess your eligibility for specific universities and programs.</li>
              <li>Submit official applications to international institutions on your behalf.</li>
              <li>Prepare and process visa applications according to embassy requirements.</li>
            </ul>
          </div>

          <hr style={{ border: "none", borderTop: "1px solid rgba(2,44,69,0.08)", margin: "40px 0" }} />

          <div id="information-sharing">
            <h2>4. Information Sharing & Disclosure</h2>
            <p>We do not sell your personal information. We only share your data with trusted third parties necessary for fulfilling our services:</p>
            <ul>
              <li><strong>Educational Institutions:</strong> Universities and colleges to process your admission.</li>
              <li><strong>Government Authorities:</strong> Embassies and immigration departments strictly for visa processing.</li>
            </ul>
          </div>

          <hr style={{ border: "none", borderTop: "1px solid rgba(2,44,69,0.08)", margin: "40px 0" }} />

          <div id="data-security">
            <h2>5. Data Security & Retention</h2>
            <p>We implement robust security measures to protect your personal documents from unauthorized access. We retain your personal data only for as long as is necessary to fulfill the purposes for which it was collected.</p>
          </div>

          <hr style={{ border: "none", borderTop: "1px solid rgba(2,44,69,0.08)", margin: "40px 0" }} />

          <div id="cookies">
            <h2>6. Cookies & Tracking Technologies</h2>
            <p>Our website uses cookies to enhance user experience and analyze site traffic. You can disable cookies through your browser settings, though this may limit functionality.</p>
          </div>

          <hr style={{ border: "none", borderTop: "1px solid rgba(2,44,69,0.08)", margin: "40px 0" }} />

          <div id="your-rights">
            <h2>7. Your Privacy Rights</h2>
            <p>Depending on your jurisdiction, you have the right to request access to your data, request corrections, request deletion, or withdraw consent for marketing communications.</p>
          </div>

          <hr style={{ border: "none", borderTop: "1px solid rgba(2,44,69,0.08)", margin: "40px 0" }} />

          <div id="contact-us">
            <h2>8. Contact Us</h2>
            <p>If you have any questions regarding this Privacy Policy, please reach out to us:</p>
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