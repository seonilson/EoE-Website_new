"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image"; 

// ── Reusable Footer Link Component ─────────────────────────────
function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const [h, setH] = useState(false);
  return (
    <li style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <span style={{ 
        width: "6px", height: "6px", 
        backgroundColor: h ? "#F16101" : "rgba(255,255,255,0.2)",
        borderRadius: "50%", display: "inline-block", flexShrink: 0,
        transition: "all 0.2s ease" 
      }} />
      <Link href={href} 
        style={{ 
          color: h ? "#F16101" : "white",
          fontSize: "14px", 
          fontWeight: 500,
          textDecoration: "none",
          transform: h ? "translateX(4px)" : "translateX(0)",
          transition: "all 0.2s ease",
          display: "inline-block"
        }}
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
 >
        {children}
      </Link>
    </li>
  );
}

// ── Reusable Social Icon Component (Compact Size) ──────────────
function SocialIcon({ label, href = "#", children }: { label: string; href?: string; children: React.ReactNode }) {
  const [h, setH] = useState(false);
  return (
    <a href={href} aria-label={label} title={label}
      target="_blank" rel="noreferrer"
      style={{ 
        width: "32px", height: "32px", borderRadius: "8px", 
        backgroundColor: h ? "#F16101" : "rgba(255,255,255,0.05)", 
        border: h ? "1px solid #F16101" : "1px solid rgba(255,255,255,0.1)",
        display: "flex", alignItems: "center", justifyContent: "center", 
        cursor: "pointer", color: "white",
        transform: h ? "translateY(-3px)" : "translateY(0)",
        transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
        flexShrink: 0
      }}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
 >
      <div style={{ display: "flex", transform: "scale(0.85)" }}>
        {children}
      </div>
    </a>
  );
}

// ── Reusable Horizontal Contact Card Component ─────────────────
function ContactCard({ icon, title, children, href }: { icon: React.ReactNode; title: string; children: React.ReactNode; href?: string }) {
  const [h, setH] = useState(false);
  
  const content = (
    <div style={{
      display: "flex", flexDirection: "column",
      background: h ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.03)",
      border: h ? "1px solid #F16101" : "1px solid rgba(255,255,255,0.1)",
      borderRadius: "14px", padding: "12px 16px", 
      transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
      transform: h ? "translateY(-4px)" : "translateY(0)",
      boxShadow: h ? "0 12px 24px rgba(0,0,0,0.15)" : "none",
      height: "100%",
      cursor: href ? "pointer" : "default"
    }}
    onMouseEnter={() => setH(true)}
    onMouseLeave={() => setH(false)}>
      <div style={{
        width: "36px", height: "36px", borderRadius: "8px", 
        background: h ? "#F16101" : "rgba(255,255,255,0.06)",
        color: h ? "white" : "#07CBEB",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.3s ease",
        marginBottom: "8px" 
      }}>
        <div style={{ transform: "scale(0.8)" }}>{icon}</div> 
      </div>
      <div style={{ fontSize: "14.5px", fontWeight: 700, color: "white", marginBottom: "2px" }}>{title}</div>
      <div style={{ fontSize: "13px", color: "white", lineHeight: 1.4, flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {children}
      </div>
    </div>
  );

  if (href) {
    return <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" style={{ textDecoration: "none", display: "block", height: "100%" }}>{content}</a>;
  }
  return <div style={{ height: "100%" }}>{content}</div>;
}

function PhoneIcon() {
  return (
    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.56a16 16 0 0 0 6.07 6.07l.97-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════
export default function Footer() {
  const currentYear = new Date().getFullYear();

  // ── ICEF Script Loader ──
  useEffect(() => {
    if (!document.querySelector(`script[src="https://www-cdn.icef.com/scripts/iasbadgeid.js"]`)) {
      const script = document.createElement("script");
      script.src = "https://www-cdn.icef.com/scripts/iasbadgeid.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <footer style={{ 
      backgroundColor: "#022C45", 
      color: "white", position: "relative", marginTop: "60px", 
    }}>
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at top right, rgba(7,203,235,0.08) 0%, transparent 50%)" }}/>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/images/bg-footer.jpg')", backgroundSize: "cover", backgroundPosition: "center center", opacity: 0.08 }}/>
      </div>

      <div style={{ 
        maxWidth: "1280px", margin: "0 auto", 
        padding: "64px 24px 0", // Reduced bottom padding since badges are below
        position: "relative", zIndex: 1
      }}>
        
        {/* ── Top Section: 4 Columns ── */}
        <div style={{ 
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "32px",
          marginBottom: "48px"
        }}>
          
          {/* Column 1: Brand */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ 
              marginBottom: "24px", display: "inline-block", position: "relative", 
              background: "#ffffff", borderRadius: "6px", padding: "5px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              alignSelf: "flex-start" 
            }}>
              <Image src="/images/logo-main.png" alt="Edification Overseas" width={500} height={110} style={{ width: "110px", height: "110px", display: "block" }} />
            </div>

            <div style={{ position: "relative", paddingLeft: "16px" }}>
              <div style={{ position: "absolute", top: "4px", bottom: "4px", left: 0, width: "3px", background: "linear-gradient(to bottom, #F16101, rgba(241,97,1,0))", borderRadius: "3px" }} />
              <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "14.5px", fontWeight: 500, lineHeight: "1.8", margin: 0 }}>
                Edification Overseas Education. We turn complex visa and study abroad processes into clear, achievable pathways. Honest guidance for the global future you want to build.
              </p>
            </div>
          </div>

          {/* Column 2: Explore */}
          <div>
            <h4 style={{ fontWeight: "700", marginBottom: "16px", fontSize: "16px", color: "#F16101" }}>Explore</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/about/company-profile">Company Profile</FooterLink>
              <FooterLink href="/about/our-team">Our Leadership</FooterLink>
              <FooterLink href="/about/certifications">Our Certifications</FooterLink>
              <FooterLink href="/countries">Study Abroad</FooterLink>
              <FooterLink href="/gallery">Gallery</FooterLink>
              <FooterLink href="/blog">Latest Blog & News</FooterLink>
              <FooterLink href="/contact">Contact Us</FooterLink>
            </ul>
          </div>

          {/* Column 3: Visa Services */}
          <div>
            <h4 style={{ fontWeight: "700", marginBottom: "16px", fontSize: "16px", color: "#F16101" }}>Visa Services</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
              <FooterLink href="/services/student">Student Visa</FooterLink>
              <FooterLink href="/services/business">Business Visa</FooterLink>
              <FooterLink href="/services/visitor">Visitor Visa</FooterLink>
              <FooterLink href="/services/dependent">Dependent Visa</FooterLink>
              <FooterLink href="/services/apostille">Apostille & Translation</FooterLink>
              <FooterLink href="/services/accommodation">Accommodation & Forex</FooterLink>
              <FooterLink href="/calculator/score">Score Calculator</FooterLink>
              <FooterLink href="/calculator/cgpa">CGPA Calculator</FooterLink>
            </ul>
          </div>

          {/* Column 4: Destinations */}
          <div style={{ minWidth: "260px" }}>
            <h4 style={{ fontWeight: "700", marginBottom: "16px", fontSize: "16px", color: "#F16101" }}>Destinations</h4>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              {/* Left Column */}
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                <FooterLink href="/countries/united-kingdom">UK</FooterLink>
                <FooterLink href="/countries/canada">Canada</FooterLink>
                <FooterLink href="/countries/australia">Australia</FooterLink>
                <FooterLink href="/countries/usa">USA</FooterLink>
                <FooterLink href="/countries/germany">Germany</FooterLink>
                <FooterLink href="/countries/malta">Malta</FooterLink>
                <FooterLink href="/countries/dubai">Dubai</FooterLink>
                <FooterLink href="/countries/greece">Greece</FooterLink>
              </ul>
              {/* Right Column */}
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                <FooterLink href="/countries/singapore">Singapore</FooterLink>
                <FooterLink href="/countries/cyprus">Cyprus</FooterLink>
                <FooterLink href="/countries/mauritius">Mauritius</FooterLink>
                <FooterLink href="/countries/georgia">Georgia</FooterLink>
                <FooterLink href="/countries/moldova">Moldova</FooterLink>
                <FooterLink href="/countries/belarus">Belarus</FooterLink>
                <FooterLink href="/countries/russia">Russia</FooterLink>
                <FooterLink href="/countries">More...</FooterLink>
              </ul>
            </div>
          </div>
        </div>

        {/* ── PERMANENT FIX: Full-Width Accreditations Banner ── */}
<div style={{ 
  borderTop: "1px solid rgba(255,255,255,0.08)", 
  padding: "28px 0", 
  display: "flex", flexDirection: "column", alignItems: "center"
}}>
  <h4 style={{ fontSize: "13px", color: "#F16101", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "24px", fontWeight: 800, textAlign: "center" }}>
    Our Global Accreditations & Memberships
  </h4>
  
  <div style={{ 
    display: "flex", flexWrap: "wrap", justifyContent: "center", 
    alignItems: "center", gap: "32px" 
  }}>
    
    {/* ICEF */}
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "72px", height: "72px" }}>
      <span id="iasBadge" data-account-id="6409"></span>
    </div>
    
    {/* ISO */}
    <div style={{ position: "relative", width: "72px", height: "72px" }}>
      <Image src="/images/cert-iso.png" alt="ISO Certified" fill style={{ objectFit: "contain" }} />
    </div>

    {/* UniAgents */}
    <div style={{ position: "relative", width: "72px", height: "72px" }}>
      <Image src="/images/cert-uniagents.png" alt="UniAgents Certified" fill style={{ objectFit: "contain" }} />
    </div>

    {/* Pearson */}
    <div style={{ position: "relative", width: "72px", height: "72px" }}>
      <Image src="/images/cert-pearson.png" alt="Pearson Certified" fill style={{ objectFit: "contain" }} />
    </div>

    {/* British Council */}
    <div style={{ position: "relative", width: "100px", height: "54px" }}>
      <Image src="/images/cert-british-council.jpg" alt="British Council Certified" fill style={{ objectFit: "contain" }} />
    </div>

    {/* Idp */}
    <div style={{ position: "relative", width: "100px", height: "54px" }}>
      <Image src="/images/cert-idp.jpg" alt="Idp Certified" fill style={{ objectFit: "contain" }} />
    </div>
    
  </div>
</div>

      </div>

      {/* ── Contact Cards ── */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", padding: "24px 24px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
            
            <ContactCard title="Head Office" href="https://maps.app.goo.gl/JBjxvyVDGLJQVVZw7" icon={<svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>}>
              A-411, 4th Floor and A-1123, 11th floor, Sun West Bank, Ashram Road, Ahmedabad,<br />Gujarat - 380009
              <div style={{ color: "#07CBEB", fontSize: "12.5px", fontWeight: 700, marginTop: "8px", display: "flex", alignItems: "center", gap: "4px" }}>Get Directions <span>→</span></div>
            </ContactCard>
            
            <ContactCard title="Branch Office" href="https://maps.app.goo.gl/JBjxvyVDGLJQVVZw7" icon={<svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>}>
              211, Jalan Loyang Besar, #01-03,<br /> Edgewater, Singapore – 509504<br />UEN: T23LL1297G
              <div style={{ color: "#07CBEB", fontSize: "12.5px", fontWeight: 700, marginTop: "8px", display: "flex", alignItems: "center", gap: "4px" }}>Get Directions <span>→</span></div>
            </ContactCard>
            
            <ContactCard title="Email Support" href="mailto:info@edificationoverseas.in" icon={<svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>}>
              info@edificationoverseas.in
              <div style={{ color: "#07CBEB", fontSize: "12.5px", fontWeight: 700, marginTop: "8px", display: "flex", alignItems: "center", gap: "4px" }}>Send a Message <span>→</span></div>
            </ContactCard>
            
            <ContactCard title="Call Us" icon={<PhoneIcon />}>
              <div style={{ 
                display: "grid", gridTemplateColumns: "auto auto auto", 
                alignItems: "center", justifyContent: "start", gap: "8px 12px", marginTop: "8px" 
              }}>
                <a href="tel:+918799450049" style={{ color: "inherit", textDecoration: "none", fontSize: "14px", fontWeight: 600, whiteSpace: "nowrap" }}>+91 87994 50049</a>
                <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "12px", display: "flex", justifyContent: "center" }}>|</span>
                <a href="tel:+6580782915" style={{ color: "inherit", textDecoration: "none", fontSize: "14px", fontWeight: 600, whiteSpace: "nowrap" }}>+65 8078 2915</a>
                <a href="tel:+917016351347" style={{ color: "inherit", textDecoration: "none", fontSize: "14px", fontWeight: 600, whiteSpace: "nowrap" }}>+91 70163 51347</a>
                <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "12px", display: "flex", justifyContent: "center" }}>|</span>
                <a href="tel:+919376878378" style={{ color: "inherit", textDecoration: "none", fontSize: "14px", fontWeight: 600, whiteSpace: "nowrap" }}>+91 93768 78378</a>
              </div>
            </ContactCard>
            
          </div>
        </div>
      </div>

      {/* ── Bottom Bar & Socials ── */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", padding: "20px 24px", position: "relative", zIndex: 1 }}>
        <div style={{ 
          maxWidth: "1280px", margin: "0 auto", display: "flex",
          flexWrap: "wrap", justifyContent: "space-between", alignItems: "center",
          gap: "24px", fontSize: "13px", color: "white", fontWeight: 500
        }}>
          
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
            <span>© {currentYear} Edification Overseas Education. All rights reserved.</span>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>|</span>
            <Link href="/privacy" style={{ color: "white", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#F16101"} onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "white"}>Privacy Policy</Link>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>|</span>
            <Link href="/terms" style={{ color: "white", textDecoration: "none", transition: "color: 0.2s" }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#F16101"} onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "white"}>Terms & Conditions</Link>
          </div>
          
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ display: "flex", gap: "8px" }}>
              <SocialIcon label="Facebook" href="https://www.facebook.com/EdificationOverseas/">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
              </SocialIcon>
              <SocialIcon label="Instagram" href="https://www.instagram.com/edificationoverseas/">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/></svg>
              </SocialIcon>
              <SocialIcon label="YouTube" href="https://www.youtube.com/@edification_overseas">
                <svg width="18" height="18" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#FF0000"/><polygon fill="white" points="9.5,7 9.5,17 17,12"/></svg>
              </SocialIcon>
              <SocialIcon label="LinkedIn" href="https://www.linkedin.com/company/edification-overseas-education/">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4V9h4v1.76A6 6 0 0116 8zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
              </SocialIcon>
            </div>

            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", width: "36px", height: "36px", borderRadius: "50%",
                background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)", color: "white", cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)"
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#F16101"; (e.currentTarget as HTMLElement).style.borderColor = "#F16101"; (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
 >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
}