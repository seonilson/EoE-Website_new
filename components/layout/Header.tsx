"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const aboutLinks = [
  { label: "Company Profile",    href: "/about/company-profile", icon: "🏢", desc: "Learn about our mission and vision" },
  { label: "Our Leadership",     href: "/about/our-team",        icon: "👥", desc: "Meet our expert counselors and staff" },
  { label: "Our Certifications", href: "/about/certifications",  icon: "🏆", desc: "View our accreditations and awards" },
];

const visaLinks = [
  { label: "Student Visa",            href: "/services/student",       icon: "🎓", desc: "Study at top universities abroad" },
  { label: "Business Visa",           href: "/services/business",      icon: "💼", desc: "Expand your business globally" },
  { label: "Visitor Visa",            href: "/services/visitor",       icon: "✈️", desc: "Travel & tourism visa assistance" },
  { label: "Dependent Visa",          href: "/services/dependent",     icon: "👨‍👩‍👧", desc: "Bring your family along" },
  { label: "Apostille & Translation", href: "/services/apostille",     icon: "🏛️", desc: "Legalize & translate documents" },
  { label: "Accommodation & Forex",   href: "/services/accommodation", icon: "🏦", desc: "Secure housing & fund transfers" },
  { label: "Score Calculator",        href: "/calculator/score",       icon: "📊", desc: "For IELTS/PTE, TOEFL & Duolingo" },
  { label: "CGPA Calculator",         href: "/calculator/cgpa",        icon: "💯", desc: "CGPA to Percentage Calculator" },
];

// Added Gallery Links
const galleryLinks = [
  { label: "Student Success", href: "/gallery",        icon: "🎓", desc: "Visas & student testimonials" },
  { label: "Event Photos",    href: "/gallery/events", icon: "📸", desc: "Our global seminars and events" },
];

const countryLinks = [
  { label: "Singapore",      href: "/countries/singapore",      flag: "/images/flags/sg.png" },
  { label: "Cyprus",         href: "/countries/cyprus",         flag: "/images/flags/cy.png" },
  { label: "Mauritius",      href: "/countries/mauritius",      flag: "/images/flags/mu.png" },
  { label: "Malaysia",       href: "/countries/malaysia",       flag: "/images/flags/my.png" },
  { label: "Belarus",        href: "/countries/belarus",        flag: "/images/flags/by.png" },
  { label: "Moldova",        href: "/countries/moldova",        flag: "/images/flags/md.png" },
  { label: "Russia",         href: "/countries/russia",         flag: "/images/flags/ru.png" },
  { label: "Malta",          href: "/countries/malta",          flag: "/images/flags/mt.png" },
  { label: "Georgia",        href: "/countries/georgia",        flag: "/images/flags/ge.png" },
  { label: "Dubai",          href: "/countries/dubai",          flag: "/images/flags/ae.png" },
  { label: "Canada",         href: "/countries/canada",         flag: "/images/flags/ca.png" },
  { label: "Australia",      href: "/countries/australia",      flag: "/images/flags/au.png" },
  { label: "New Zealand",    href: "/countries/new-zealand",    flag: "/images/flags/nz.png" },
  { label: "UK",             href: "/countries/united-kingdom", flag: "/images/flags/gb.png" },
  { label: "Ireland",        href: "/countries/ireland",        flag: "/images/flags/ie.png" },
  { label: "USA",            href: "/countries/usa",            flag: "/images/flags/us.png" },
  { label: "Greece",         href: "/countries/greece",         flag: "/images/flags/gr.png" },
  { label: "Germany",        href: "/countries/germany",        flag: "/images/flags/de.png" },
  { label: "France",         href: "/countries/france",         flag: "/images/flags/fr.png" },
  { label: "Spain",          href: "/countries/spain",          flag: "/images/flags/es.png" },
  { label: "Italy",          href: "/countries/italy",          flag: "/images/flags/it.png" },
  { label: "Romania",        href: "/countries/romania",        flag: "/images/flags/ro.png" },
  { label: "South Korea",    href: "/countries/south-korea",    flag: "/images/flags/kr.png" },
  { label: "Japan",          href: "/countries/japan",          flag: "/images/flags/jp.png" },
  { label: "Finland",        href: "/countries/finland",        flag: "/images/flags/fi.png" },
  { label: "Denmark",        href: "/countries/denmark",        flag: "/images/flags/dk.png" },
  { label: "Netherlands",    href: "/countries/netherlands",    flag: "/images/flags/nl.png" },
  { label: "Switzerland",    href: "/countries/switzerland",    flag: "/images/flags/ch.png" },
  { label: "Latvia",         href: "/countries/latvia",         flag: "/images/flags/lv.png" },
  { label: "Lithuania",      href: "/countries/lithuania",      flag: "/images/flags/lt.png" },
  { label: "Hungary",        href: "/countries/hungary",        flag: "/images/flags/hu.png" },
  { label: "Poland",         href: "/countries/poland",         flag: "/images/flags/pl.png" },
];

const languages = [
  { code: "en", label: "English",  short: "EN" },
  { code: "hi", label: "हिंदी",    short: "HI" },
  { code: "gu", label: "ગુજરાતી",  short: "GU" },
];

const waLink = "https://wa.me/918799450049?text=Hello%21%20I%20would%20like%20to%20get%20more%20information%20about%20studying%20abroad.";

// ── Icons ─────────────────────────────────────────────────────
function WhatsAppIcon({ size = 16, color = "currentColor" }: { size?: number, color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12.031 0C5.398 0 .015 5.385.011 12.022a11.968 11.968 0 0 0 1.603 6.012L0 24l6.104-1.65c1.874.982 3.974 1.503 6.136 1.504h.005c6.634 0 12.018-5.385 12.022-12.022A11.96 11.96 0 0 0 20.536 3.52 11.966 11.966 0 0 0 12.031 0zM12.037 21.84h-.004a9.957 9.957 0 0 1-5.076-1.39l-.364-.216-3.774.99.992-3.68-.236-.376A9.966 9.966 0 0 1 2.05 12.022c.002-5.498 4.475-9.972 9.975-9.972a9.927 9.927 0 0 1 7.054 2.923 9.927 9.927 0 0 1 2.92 7.052c-.004 5.498-4.478 9.972-9.977 9.972zm5.467-7.464c-.299-.15-1.774-.875-2.049-.976-.274-.101-.475-.15-.675.15-.2.301-.774.976-.949 1.176-.176.2-.352.226-.652.076-.299-.15-1.266-.467-2.413-1.492-.89-.796-1.492-1.78-1.667-2.08-.176-.301-.019-.464.131-.613.135-.135.301-.351.45-.526.15-.175.2-.301.301-.501.101-.2.05-.376-.025-.526-.075-.15-.675-1.626-.925-2.226-.244-.588-.493-.508-.675-.517-.176-.009-.376-.01-.576-.01-.2 0-.526.075-.8.375-.276.3-.1051 1.026-1.051 2.501 0 1.476 1.076 2.902 1.226 3.102.15.2 2.115 3.227 5.122 4.527.716.31 1.275.495 1.71.634.718.23 1.371.197 1.886.119.585-.088 1.774-.725 2.024-1.426.25-.7.25-1.301.176-1.426-.075-.126-.276-.201-.576-.351z"/>
    </svg>
  );
}

function YouTubeIcon({ size = 16, color = "currentColor" }: { size?: number, color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.17 1 12 1 12s0 3.83.46 5.58a2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.83 23 12 23 12s0-3.83-.46-5.58z"></path>
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill={color}></polygon>
    </svg>
  );
}

function VideoCamIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" fill="rgba(255,255,255,0.95)" stroke="none"/>
      <circle cx="8.5" cy="12" r="3" fill="#F16101" stroke="none"/>
      <circle cx="8.5" cy="12" r="1.5" fill="rgba(255,255,255,0.9)" stroke="none"/>
      <polygon points="16,9 22,6 22,18 16,15" fill="rgba(255,255,255,0.95)" stroke="none"/>
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  );
}

function HeadsetIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
    </svg>
  );
}

function CalendarIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  );
}

function PhoneIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  );
}

function MailIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
    </svg>
  );
}

function MapPinIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  );
}

// ── PERFECTLY ALIGNED NAV LINK ───────────────────────────────
function NavLink({ href, children, pathname }: { href: string; children: React.ReactNode; pathname: string; }) {
  const [h, setH] = useState(false);
  const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
  
  return (
    <Link href={href} 
      onClick={(e) => {
        if (pathname === href) {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }}
      style={{
        position: "relative", padding: "8px 12px", fontSize: "14.5px", fontWeight: 700,
        letterSpacing: "0.5px", textTransform: "uppercase", color: isActive || h ? "#F16101" : "#022C45",
        background: "transparent", borderRadius: "9px", textDecoration: "none",
        transition: "all 0.22s cubic-bezier(0.4,0,0.2,1)", whiteSpace: "nowrap",
        display: "flex", alignItems: "center", justifyContent: "center"
      }}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
    >
      {children}
      <span style={{
        position: "absolute", bottom: "0px", left: "50%", transform: "translateX(-50%)",
        width: isActive ? "20px" : h ? "12px" : "0px", height: "2.5px", background: "#F16101",
        borderRadius: "2px", transition: "width 0.25s cubic-bezier(0.4,0,0.2,1)",
      }}/>
    </Link>
  );
}

// ── Mega menu item ────────────────────────────────────────────
function MegaItem({ href, icon, label, desc }: { href: string; icon: string; label: string; desc: string; }) {
  const [h, setH] = useState(false);
  return (
    <Link href={href} style={{
      display: "flex", alignItems: "flex-start", gap: "10px", padding: "8px 12px", borderRadius: "10px",
      background: h ? "#FFF5EE" : "transparent", border: h ? "1px solid rgba(241,97,1,0.12)" : "1px solid transparent",
      textDecoration: "none", transition: "all 0.18s ease",
    }}
    onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}>
      <span style={{
        width: "32px", height: "32px", borderRadius: "8px", background: h ? "#F16101" : "#F1F5EB",
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", flexShrink: 0,
        transition: "background 0.18s ease",
      }}>{icon}</span>
      <div>
        <div style={{ fontSize: "14px", fontWeight: 600, color: h ? "#F16101" : "#022C45", lineHeight: 1.2 }}>{label}</div>
        <div style={{ fontSize: "12px", color: "#888", marginTop: "2px", lineHeight: 1.3 }}>{desc}</div>
      </div>
    </Link>
  );
}

// ── Country item ──────────────────────────────────────────────
function CountryItem({ href, flag, label }: { href: string; flag: string; label: string; }) {
  const [h, setH] = useState(false);
  return (
    <Link href={href} style={{
      display: "flex", alignItems: "center", gap: "10px", padding: "8px 12px", borderRadius: "8px",
      background: h ? "#FFF5EE" : "transparent", border: h ? "1px solid rgba(241,97,1,0.12)" : "1px solid transparent",
      textDecoration: "none", transition: "all 0.18s ease",
    }}
    onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}>
      <div style={{
        width: "24px", height: "24px", position: "relative", borderRadius: "50%", overflow: "hidden", 
        flexShrink: 0, border: "0.5px solid rgba(0,0,0,0.08)",
      }}>
        <Image src={flag} alt={`${label} flag`} fill sizes="24px" style={{ objectFit: "cover" }} />
      </div>
      <span style={{ fontSize: "13.5px", fontWeight: 600, color: h ? "#F16101" : "#022C45", transition: "color 0.18s" }}>{label}</span>
    </Link>
  );
}

// ── Mega menu panels ─────────────────────────────────────
function AboutMegaMenu({ open }: { open: boolean }) {
  return (
    <div style={{
      position: "absolute", top: "100%", left: "50%",
      transform: open ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(-10px)",
      opacity: open ? 1 : 0, pointerEvents: open ? "all" : "none",
      transition: "all 0.22s cubic-bezier(0.4,0,0.2,1)", zIndex: 400, paddingTop: "12px",
    }}>
      <div style={{
        background: "white", borderRadius: "18px", padding: "20px", width: "340px", 
        boxShadow: "0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)", position: "relative"
      }}>
        <div style={{ position: "absolute", top: "-5px", left: "50%", transform: "translateX(-50%) rotate(45deg)", width: "10px", height: "10px", background: "white", boxShadow: "-2px -2px 5px rgba(0,0,0,0.04)" }}/>
        <div style={{ marginBottom: "14px", paddingBottom: "12px", borderBottom: "1px solid #f0f0f0" }}>
          <div style={{ fontSize: "11.5px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "#F16101" }}>Discover Edification</div>
          <div style={{ fontSize: "13.5px", color: "#888", marginTop: "2px" }}>Your trusted overseas education partner</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {aboutLinks.map(l => <MegaItem key={l.href} href={l.href} icon={l.icon} label={l.label} desc={l.desc}/>)}
        </div>
      </div>
    </div>
  );
}

function VisaMegaMenu({ open }: { open: boolean }) {
  return (
    <div style={{
      position: "absolute", top: "100%", left: "50%",
      transform: open ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(-10px)",
      opacity: open ? 1 : 0, pointerEvents: open ? "all" : "none",
      transition: "all 0.22s cubic-bezier(0.4,0,0.2,1)", zIndex: 400, paddingTop: "12px",
    }}>
      <div style={{
        background: "white", borderRadius: "18px", padding: "24px", width: "640px", 
        boxShadow: "0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)", position: "relative"
      }}>
        <div style={{ position: "absolute", top: "-5px", left: "50%", transform: "translateX(-50%) rotate(45deg)", width: "10px", height: "10px", background: "white", boxShadow: "-2px -2px 5px rgba(0,0,0,0.04)" }}/>
        <div style={{ marginBottom: "16px", paddingBottom: "14px", borderBottom: "1px solid #f0f0f0" }}>
          <div style={{ fontSize: "11.5px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "#F16101" }}>Visa Services</div>
          <div style={{ fontSize: "13.5px", color: "#888", marginTop: "4px" }}>Expert guidance for every visa type</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
          {visaLinks.map(l => <MegaItem key={l.href} href={l.href} icon={l.icon} label={l.label} desc={l.desc}/>)}
        </div>
        <div style={{ marginTop: "16px", paddingTop: "14px", borderTop: "1px solid #f0f0f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "12.5px", color: "#888" }}>Explore all visa categories and requirements</span>
          <Link href="/services" style={{ background: "#022C45", color: "white", padding: "8px 18px", borderRadius: "999px", fontSize: "12.5px", fontWeight: 700, textDecoration: "none", whiteSpace: "nowrap" }}>All Visas →</Link>
        </div>
      </div>
    </div>
  );
}

function CountryMegaMenu({ open }: { open: boolean }) {
  return (
    <div style={{
      position: "absolute", top: "100%", left: "50%",
      transform: open ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(-10px)",
      opacity: open ? 1 : 0, pointerEvents: open ? "all" : "none",
      transition: "all 0.22s cubic-bezier(0.4,0,0.2,1)", zIndex: 400, paddingTop: "12px", 
    }}>
      <div style={{
        background: "white", borderRadius: "18px", padding: "24px", width: "840px", 
        boxShadow: "0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)", position: "relative"
      }}>
        <div style={{ position: "absolute", top: "-5px", left: "50%", transform: "translateX(-50%) rotate(45deg)", width: "10px", height: "10px", background: "white", boxShadow: "-2px -2px 5px rgba(0,0,0,0.04)" }}/>
        <div style={{ marginBottom: "16px", paddingBottom: "14px", borderBottom: "1px solid #f0f0f0" }}>
          <div style={{ fontSize: "11.5px", fontWeight: 700, letterSpacing: "1px",
            textTransform: "uppercase", color: "#F16101" }}>Study Abroad Destinations</div>
          <div style={{ fontSize: "13.5px", color: "#888", marginTop: "4px" }}>32 countries · 4000+ students placed</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "6px" }}>
          {countryLinks.map(l => <CountryItem key={l.href} href={l.href} flag={l.flag} label={l.label}/>)}
        </div>
        <div style={{ marginTop: "16px", paddingTop: "14px", borderTop: "1px solid #f0f0f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "12.5px", color: "#888" }}>View all destinations with university guides</span>
          <Link href="/countries" style={{ background: "#022C45", color: "white", padding: "8px 18px", borderRadius: "999px", fontSize: "12.5px", fontWeight: 700, textDecoration: "none", whiteSpace: "nowrap" }}>All Countries →</Link>
        </div>
      </div>
    </div>
  );
}

function GalleryMegaMenu({ open }: { open: boolean }) {
  return (
    <div style={{
      position: "absolute", top: "100%", left: "50%",
      transform: open ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(-10px)",
      opacity: open ? 1 : 0, pointerEvents: open ? "all" : "none",
      transition: "all 0.22s cubic-bezier(0.4,0,0.2,1)", zIndex: 400, paddingTop: "12px",
    }}>
      <div style={{
        background: "white", borderRadius: "18px", padding: "20px", width: "320px", 
        boxShadow: "0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)", position: "relative"
      }}>
        <div style={{ position: "absolute", top: "-5px", left: "50%", transform: "translateX(-50%) rotate(45deg)", width: "10px", height: "10px", background: "white", boxShadow: "-2px -2px 5px rgba(0,0,0,0.04)" }}/>
        <div style={{ marginBottom: "14px", paddingBottom: "12px", borderBottom: "1px solid #f0f0f0" }}>
          <div style={{ fontSize: "11.5px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "#F16101" }}>Gallery</div>
          <div style={{ fontSize: "13.5px", color: "#888", marginTop: "2px" }}>Success stories and global events</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {galleryLinks.map(l => <MegaItem key={l.href} href={l.href} icon={l.icon} label={l.label} desc={l.desc}/>)}
        </div>
      </div>
    </div>
  );
}

function LangSelector() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState(languages[0]);
  const [pos,  setPos]  = useState({ top: 0, right: 0 });
  const btnRef = useRef<HTMLButtonElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node) && btnRef.current && !btnRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleOpen = () => {
    if (btnRef.current) {
      const r = btnRef.current.getBoundingClientRect();
      setPos({ top: r.bottom + 6, right: window.innerWidth - r.right });
    }
    setOpen(o => !o);
  };

  const handleLanguageChange = (selectedLang: typeof languages[0]) => {
    setLang(selectedLang);
    setOpen(false);
    document.cookie = `googtrans=/en/${selectedLang.code}; path=/; domain=${window.location.hostname}`;
    window.location.reload();
  };

  return (
    <>
      <button ref={btnRef} onClick={handleOpen} style={{
        display: "flex", alignItems: "center", gap: "6px", background: open ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.1)",
        border: "1px solid rgba(255,255,255,0.2)", borderRadius: "7px", padding: "4px 12px", fontSize: "12.5px", fontWeight: 700, 
        color: "white", cursor: "pointer", transition: "all 0.2s", fontFamily: "inherit",
      }}>
        <GlobeIcon/> {lang.short}
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      {open && (
        <div ref={dropRef} style={{
          position: "fixed", top: `${pos.top}px`, right: `${pos.right}px`, background: "white", borderRadius: "12px", padding: "8px",
          minWidth: "150px", boxShadow: "0 8px 24px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.06)", zIndex: 9999, animation: "slideDown 0.18s ease",
        }}>
          {languages.map(l => (
            <button key={l.code} onClick={() => handleLanguageChange(l)} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "10px 14px", background: "transparent",
                border: "none", borderRadius: "8px", fontSize: "13.5px", fontWeight: 600, color: lang.code === l.code ? "#F16101" : "#022C45",
                cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#F16101"; (e.currentTarget as HTMLElement).style.background = "#FFF5EE"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = lang.code === l.code ? "#F16101" : "#022C45"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
              <span>{l.label}</span>
              {lang.code === l.code && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F16101" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>}
            </button>
          ))}
        </div>
      )}
    </>
  );
}

// ═══════════════════════════════════════════════════════════════
//  MAIN HEADER
// ═══════════════════════════════════════════════════════════════
export default function Header() {
  const pathname = usePathname();

  const [scrolled,      setScrolled]      = useState(false);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  const [mobileOpen,    setMobileOpen]    = useState(false);
  const [mobileAbout,   setMobileAbout]   = useState(false);
  const [mobileVisa,    setMobileVisa]    = useState(false);
  const [mobileCountry, setMobileCountry] = useState(false);
  const [mobileGallery, setMobileGallery] = useState(false); // New Mobile State
  const [aboutOpen,     setAboutOpen]     = useState(false);
  const [visaOpen,      setVisaOpen]      = useState(false);
  const [countryOpen,   setCountryOpen]   = useState(false);
  const [galleryOpen,   setGalleryOpen]   = useState(false); // New Desktop State
  const [ctaH,          setCtaH]          = useState(false);
  
  // SUPPORT MODAL STATE
  const [supportOpen,   setSupportOpen]   = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setScrolled(false);
    setMobileOpen(false);
    setSupportOpen(false); 
  }, [pathname]);

  useEffect(() => {
    let ticking = false;
    const updateScroll = () => {
      const y = window.scrollY;
      if (y > 60) setScrolled(true);
      else if (y < 20) setScrolled(false);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const tbLink: React.CSSProperties = {
    display: "flex", alignItems: "center", gap: "8px",
    color: "rgba(255,255,255,0.85)", fontSize: "12.5px", 
    fontWeight: 500,
    textDecoration: "none", transition: "color 0.2s",
  };

  const ModalGridBtn = ({ href, target, color, bg, children, onClick }: any) => {
    const [h, setH] = useState(false);
    return (
      <a href={href} target={target} onClick={onClick} style={{
        display: "flex", alignItems: "center", gap: "8px",
        background: h ? color : bg, color: h ? "white" : color,
        padding: "10px 14px", borderRadius: "10px", textDecoration: "none",
        fontSize: "13.5px", fontWeight: 700, transition: "all 0.2s",
        border: `1px solid ${h ? color : "rgba(0,0,0,0.05)"}`
      }}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}>
        {children}
      </a>
    );
  };

  const SocialBtn = ({ href, hoverColor, children }: any) => {
    const [h, setH] = useState(false);
    return (
      <a href={href} target="_blank" rel="noreferrer" style={{
        width: "36px", height: "36px", borderRadius: "10px",
        background: h ? hoverColor : "rgba(2, 44, 69, 0.05)",
        color: h ? "white" : "#4B5563",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)", textDecoration: "none",
        border: `1px solid ${h ? hoverColor : "transparent"}`,
        transform: h ? "translateY(-2px)" : "translateY(0)",
      }}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}>
        {children}
      </a>
    );
  };

  return (
    <>
      <style>{`
        @keyframes slideDown { from { opacity:0; transform:translateY(-12px); } to { opacity:1; transform:translateY(0); } }
        @keyframes headerEntrance { from { opacity:0; transform:translateY(-100%); } to { opacity:1; transform:translateY(0); } }
        @keyframes sonarPulse { 0% { box-shadow: 0 0 0 0 rgba(241,97,1,0.6); } 70% { box-shadow: 0 0 0 15px rgba(241,97,1,0); } 100% { box-shadow: 0 0 0 0 rgba(241,97,1,0); } }
        @keyframes glowPulse { 0%, 100% { box-shadow: 0 0 8px rgba(16, 185, 129, 0.4); } 50% { box-shadow: 0 0 16px rgba(16, 185, 129, 0.8); } }
        
        .eo-header-wrap { animation: headerEntrance 0.5s cubic-bezier(0.4,0,0.2,1) both; }
        
        .support-btn {
          width: 60px; height: 60px; border-radius: 50%;
          background: #F16101; color: white; border: none;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; box-shadow: 0 12px 24px rgba(241, 97, 1, 0.4);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative; z-index: 10000; outline: none;
        }
        .support-btn:hover { transform: scale(1.05); }
        .support-btn::after {
          content: ''; position: absolute; inset: 0; border-radius: 50%;
          box-shadow: 0 0 0 0 rgba(241, 97, 1, 0.6);
          animation: sonarPulse 2.5s infinite;
          z-index: -1;
        }

        @media (max-width:1100px) {
          .eo-nav      { display:none !important; }
          .eo-ham      { display:flex !important; }
          .eo-cta      { display:none !important; }
          .eo-tb-email { display:none !important; }
        }
        @media (min-width:1101px) {
          .eo-ham { display:none !important; }
        }
      `}</style>

      <div style={{ width: "100%", height: "168px" }} aria-hidden="true" />

      <div className="eo-header-wrap" style={{ position: "fixed", top: 0, left: 0, right: 0, width: "100%", zIndex: 9999 }}>

        {/* ══ TOP BAR ═══════════════════════════════════════════════ */}
        {isMobile === null ? null : isMobile ? (
          /* ── MOBILE TOP BAR — both numbers, each with icon ── */
          <div style={{
            background: "#034a72",
            maxHeight: scrolled ? "0px" : "36px",
            overflow: "hidden",
            transition: "all 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
          }}>
            <div style={{
              height: "36px",
              display: "flex", alignItems: "center", justifyContent: "center",
              gap: "14px",
            }}>
              {/* India number */}
              <a href="tel:+918799450049" style={{
                display: "flex", alignItems: "center", gap: "5px",
                color: "rgba(255,255,255,0.92)", fontSize: "12px", fontWeight: 700,
                textDecoration: "none", letterSpacing: "0.3px",
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.69 12 19.79 19.79 0 011.61 3.38 2 2 0 013.59 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.91 8.56a16 16 0 006.07 6.07l.97-.97a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
                +91 87994 50049
              </a>

              {/* Divider */}
              <div style={{ width: "1px", height: "14px", background: "rgba(255,255,255,0.25)", flexShrink: 0 }}/>

              {/* Singapore number */}
              <a href="tel:+6580782915" style={{
                display: "flex", alignItems: "center", gap: "5px",
                color: "rgba(255,255,255,0.92)", fontSize: "12px", fontWeight: 700,
                textDecoration: "none", letterSpacing: "0.3px",
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.69 12 19.79 19.79 0 011.61 3.38 2 2 0 013.59 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.91 8.56a16 16 0 006.07 6.07l.97-.97a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
                +65 8078 2915
              </a>
            </div>
          </div>
        ) : (
          /* ── DESKTOP TOP BAR — full info ── */
          <div style={{
            background: "#034a72",
            maxHeight: scrolled ? "0px" : "60px",
            overflow: "hidden",
            transition: "all 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
          }}>
            <div style={{
              maxWidth: "1280px", margin: "0 auto",
              height: "44px", padding: "0 24px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>

                {/* India number */}
                <a href="tel:+918799450049" style={tbLink}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color="#F16101"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color="rgba(255,255,255,0.85)"}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.69 12 19.79 19.79 0 011.61 3.38 2 2 0 013.59 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.91 8.56a16 16 0 006.07 6.07l.97-.97a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                  +91 87994 50049
                </a>

                {/* Pipe divider between the two numbers */}
                <div style={{ width: "1px", height: "14px", background: "rgba(255,255,255,0.2)" }}/>

                {/* Singapore number */}
                <a href="tel:+6580782915" style={tbLink}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color="#F16101"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color="rgba(255,255,255,0.85)"}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.69 12 19.79 19.79 0 011.61 3.38 2 2 0 013.59 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.91 8.56a16 16 0 006.07 6.07l.97-.97a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                  +65 8078 2915
                </a>

                <div className="eo-tb-hide" style={{ width: "1px", height: "14px", background: "rgba(255,255,255,0.2)" }}/>
                <a href="mailto:info@edificationoverseas.in"
                  className="eo-tb-hide" style={tbLink}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color="#F16101"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color="rgba(255,255,255,0.85)"}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  info@edificationoverseas.in
                </a>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div className="eo-tb-hide" style={{ display: "flex", alignItems: "center", gap: "6px", color: "rgba(255,255,255,0.85)", fontSize: "12.5px", fontWeight: 500 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                  Ahmedabad | Singapore
                </div>
                <div className="eo-tb-hide" style={{ width: "1px", height: "14px", background: "rgba(255,255,255,0.2)" }}/>
                <div className="eo-tb-hide" style={{ display: "flex", alignItems: "center", gap: "6px", color: "rgba(255,255,255,0.85)", fontSize: "12.5px", fontWeight: 500 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                  Mon-Sat: 10 AM - 6 PM
                </div>
                <div className="eo-tb-hide" style={{ width: "1px", height: "14px", background: "rgba(255,255,255,0.2)", marginRight: "-8px" }}/>
                <LangSelector/>
              </div>
            </div>
          </div>
        )}{/* end top bar */}

        {/* ══ WHITE CONTAINER ════════════════════════════════════ */}
        <div style={{
          backgroundColor: "#ffffff",
          boxShadow: scrolled ? "0 4px 16px rgba(2, 44, 69, 0.08)" : "none",
          borderBottom: scrolled ? "1px solid rgba(2, 44, 69, 0.05)" : "1px solid transparent",
          padding: scrolled ? "10px 16px" : "16px 16px", 
          transition: "all 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
        }}>
          
          <div style={{
            maxWidth: "1280px", margin: "0 auto",
            backgroundColor: "#ffffff",
            borderRadius: "20px", 
            height: "90px", 
            padding: "0 24px",
            display: "flex", alignItems: "center", justifyContent: "space-between", 
            position: "relative",
            border: "1px solid rgba(255,255,255,0.95)",
            boxShadow: "0 1px 0 rgba(255,255,255,.95) inset, 0 -1px 0 rgba(0,0,0,.04) inset, 0 4px 8px rgba(0,0,0,.05), 0 12px 28px rgba(0,0,0,.1), 0 32px 56px rgba(0,0,0,.07)",
          }}>
            <div style={{
              position: "absolute", top: 0, left: "8%", right: "8%", height: "1px",
              background: "linear-gradient(90deg,transparent,rgba(255,255,255,1),rgba(241,97,1,0.15),rgba(255,255,255,1),transparent)",
            }}/>

            <Link href="/" 
              onClick={(e) => {
                if (pathname === "/") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              style={{ display: "flex", alignItems: "center", textDecoration: "none", flexShrink: 0 }}>
              <div style={{ width: "auto", height: "75px", position: "relative", flexShrink: 0 }}>
                <Image src="/images/logo-main.png" alt="Edification Overseas" width={500} height={110} style={{ height: "100%", width: "auto" }} priority />
              </div>
            </Link>

            <nav className="eo-nav" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <NavLink href="/" pathname={pathname}>Home</NavLink>

              <div style={{ position: "relative" }} onMouseEnter={() => setAboutOpen(true)} onMouseLeave={() => setAboutOpen(false)}>
                <Link href="/about/company-profile" style={{
                  position: "relative", padding: "8px 12px", fontSize: "14.5px", fontWeight: 700, 
                  letterSpacing: "0.5px", textTransform: "uppercase", textDecoration: "none",
                  color: aboutOpen || pathname.startsWith("/about") ? "#F16101" : "#022C45",
                  background: "transparent", borderRadius: "9px", border: "none", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "4px",
                  transition: "all 0.22s cubic-bezier(0.4,0,0.2,1)", fontFamily: "inherit", whiteSpace: "nowrap",
                }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    About Us
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transition: "transform 0.25s", transform: aboutOpen ? "rotate(180deg)" : "rotate(0deg)", opacity: 0.5 }}><polyline points="6 9 12 15 18 9"/></svg>
                  </span>
                  <span style={{ position: "absolute", bottom: "0px", left: "50%", transform: "translateX(-50%)", width: pathname.startsWith("/about") ? "20px" : aboutOpen ? "12px" : "0px", height: "2.5px", background: "#F16101", borderRadius: "2px", transition: "width 0.25s cubic-bezier(0.4,0,0.2,1)" }}/>
                </Link>
                <AboutMegaMenu open={aboutOpen}/>
              </div>

              <div style={{ position: "relative" }} onMouseEnter={() => setVisaOpen(true)} onMouseLeave={() => setVisaOpen(false)}>
                <Link href="/services" style={{
                  position: "relative", padding: "8px 12px", fontSize: "14.5px", fontWeight: 700,
                  letterSpacing: "0.5px", textTransform: "uppercase", textDecoration: "none",
                  color: visaOpen || pathname.startsWith("/services") ? "#F16101" : "#022C45",
                  background: "transparent", borderRadius: "9px", border: "none", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "4px",
                  transition: "all 0.22s cubic-bezier(0.4,0,0.2,1)", fontFamily: "inherit", whiteSpace: "nowrap",
                }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    Visa Services
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transition: "transform 0.25s", transform: visaOpen ? "rotate(180deg)" : "rotate(0deg)", opacity: 0.5 }}><polyline points="6 9 12 15 18 9"/></svg>
                  </span>
                  <span style={{ position: "absolute", bottom: "0px", left: "50%", transform: "translateX(-50%)", width: pathname.startsWith("/services") ? "20px" : visaOpen ? "12px" : "0px", height: "2.5px", background: "#F16101", borderRadius: "2px", transition: "width 0.25s cubic-bezier(0.4,0,0.2,1)" }}/>
                </Link>
                <VisaMegaMenu open={visaOpen}/>
              </div>

              <div style={{ position: "relative" }} onMouseEnter={() => setCountryOpen(true)} onMouseLeave={() => setCountryOpen(false)}>
                <Link href="/countries" style={{
                  position: "relative", padding: "8px 12px", fontSize: "14.5px", fontWeight: 700,
                  letterSpacing: "0.5px", textTransform: "uppercase", textDecoration: "none",
                  color: countryOpen || pathname.startsWith("/countries") ? "#F16101" : "#022C45",
                  background: "transparent", borderRadius: "9px", border: "none", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "4px",
                  transition: "all 0.22s cubic-bezier(0.4,0,0.2,1)", fontFamily: "inherit", whiteSpace: "nowrap",
                }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    Study Abroad
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transition: "transform 0.25s", transform: countryOpen ? "rotate(180deg)" : "rotate(0deg)", opacity: 0.5 }}><polyline points="6 9 12 15 18 9"/></svg>
                  </span>
                  <span style={{ position: "absolute", bottom: "0px", left: "50%", transform: "translateX(-50%)", width: pathname.startsWith("/countries") ? "20px" : countryOpen ? "12px" : "0px", height: "2.5px", background: "#F16101", borderRadius: "2px", transition: "width 0.25s cubic-bezier(0.4,0,0.2,1)" }}/>
                </Link>
                <CountryMegaMenu open={countryOpen}/>
              </div>

              {/* Added Gallery Dropdown Component */}
              <div style={{ position: "relative" }} onMouseEnter={() => setGalleryOpen(true)} onMouseLeave={() => setGalleryOpen(false)}>
                <Link href="/gallery" style={{
                  position: "relative", padding: "8px 12px", fontSize: "14.5px", fontWeight: 700,
                  letterSpacing: "0.5px", textTransform: "uppercase", textDecoration: "none",
                  color: galleryOpen || pathname.startsWith("/gallery") ? "#F16101" : "#022C45",
                  background: "transparent", borderRadius: "9px", border: "none", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "4px",
                  transition: "all 0.22s cubic-bezier(0.4,0,0.2,1)", fontFamily: "inherit", whiteSpace: "nowrap",
                }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    Gallery
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transition: "transform 0.25s", transform: galleryOpen ? "rotate(180deg)" : "rotate(0deg)", opacity: 0.5 }}><polyline points="6 9 12 15 18 9"/></svg>
                  </span>
                  <span style={{ position: "absolute", bottom: "0px", left: "50%", transform: "translateX(-50%)", width: pathname.startsWith("/gallery") ? "20px" : galleryOpen ? "12px" : "0px", height: "2.5px", background: "#F16101", borderRadius: "2px", transition: "width 0.25s cubic-bezier(0.4,0,0.2,1)" }}/>
                </Link>
                <GalleryMegaMenu open={galleryOpen}/>
              </div>

              <NavLink href="/blog"    pathname={pathname}>Blog</NavLink>
              <NavLink href="/contact" pathname={pathname}>Contact</NavLink>
            </nav>

            <div style={{ display: "flex", alignItems: "center", gap: "16px", flexShrink: 0 }}>
              <Link href="/book-consultation" className="eo-cta"
                style={{
                  position: "relative", display: "flex",
                  textDecoration: "none", borderRadius: "12px",
                  flexShrink: 0, background: "#c94e00",
                  padding: "0 0 4px 0",
                  transform: ctaH ? "translateY(-2px)" : "translateY(0)",
                  transition: "transform 0.18s cubic-bezier(0.4,0,0.2,1)",
                }}
                onMouseEnter={() => setCtaH(true)}
                onMouseLeave={() => setCtaH(false)}>
                <span style={{
                  position: "relative", display: "flex", alignItems: "center", gap: "10px",
                  padding: "12px 24px",
                  background: "#F16101", borderRadius: "12px",
                  overflow: "hidden",
                }}>
                  <span style={{ position: "absolute", top: 0, left: 0, right: 0, height: "40%", background: "linear-gradient(180deg,rgba(255,255,255,0.15),transparent)", borderRadius: "12px 12px 0 0", pointerEvents: "none" }}/>
                  <span style={{ width: "24px", height: "24px", borderRadius: "7px", background: "rgba(255,255,255,0.2)", border: "1.5px solid white", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, position: "relative", zIndex: 1 }}>
                    <VideoCamIcon/>
                  </span>
                  <span style={{ fontSize: "13.5px", fontWeight: 800, color: "white", letterSpacing: "0.5px", textTransform: "uppercase", whiteSpace: "nowrap", position: "relative", zIndex: 1 }}>Book Consultation</span>
                </span>
              </Link>

              <button className="eo-ham"
                onClick={() => setMobileOpen(!mobileOpen)}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  padding: "6px", color: "#022C45", borderRadius: "8px",
                  transition: "background 0.2s", 
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background="#FFF5EE"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background="none"}>
                {mobileOpen
                  ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  : <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="3" y1="8" x2="21" y2="8"/><line x1="3" y1="16" x2="21" y2="16"/></svg>
                }
              </button>
            </div>
          </div>

          {/* ── MOBILE MENU ── */}
          {mobileOpen && (
            <div style={{
              maxWidth: "1280px", margin: "8px auto 0",
              background: "white", borderRadius: "16px", padding: "12px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04)",
              animation: "slideDown 0.22s cubic-bezier(0.4,0,0.2,1)",
              maxHeight: "75vh", overflowY: "auto"
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#034a72", borderRadius: "10px", padding: "12px 16px", marginBottom: "12px" }}>
                <a href="tel:+918799450049" style={{ display: "flex", alignItems: "center", gap: "8px", color: "white", fontSize: "14.5px", fontWeight: 600, textDecoration: "none" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.69 12 19.79 19.79 0 011.61 3.38 2 2 0 013.59 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.91 8.56a16 16 0 006.07 6.07l.97-.97a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                  +91 87994 50049
                </a>
                <a href={waLink} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: "6px", background: "#25D366", borderRadius: "7px", padding: "6px 14px", fontSize: "13.5px", fontWeight: 700, color: "white", textDecoration: "none" }}>
                  <WhatsAppIcon size={14}/> WhatsApp
                </a>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                <Link href="/" 
                  onClick={(e) => {
                    setMobileOpen(false);
                    if (pathname === "/") {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }} 
                  style={{ padding: "14px 16px", fontWeight: 700, fontSize: "14.5px", letterSpacing: "0.7px", color: pathname === "/" ? "#F16101" : "#022C45", background: pathname === "/" ? "#FFF5EE" : "transparent", textDecoration: "none", borderRadius: "10px", borderBottom: "1px solid #f4f4f4" }}>
                  HOME
                </Link>

                <button onClick={() => setMobileAbout(!mobileAbout)} style={{ padding: "14px 16px", fontWeight: 700, fontSize: "14.5px", letterSpacing: "0.7px", color: pathname.startsWith("/about") ? "#F16101" : "#022C45", background: pathname.startsWith("/about") ? "#FFF5EE" : "none", border: "none", borderBottom: "1px solid #f4f4f4", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "inherit", borderRadius: "10px" }}>
                  ABOUT US
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transform: mobileAbout ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}><polyline points="6 9 12 15 18 9"/></svg>
                </button>
                {mobileAbout && (
                  <div style={{ paddingLeft: "10px", display: "flex", flexDirection: "column", gap: "2px" }}>
                    {aboutLinks.map(l => (
                      <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)} style={{ padding: "10px 16px", fontSize: "14.5px", fontWeight: 600, color: pathname === l.href ? "#F16101" : "#555", textDecoration: "none", borderRadius: "8px", display: "flex", alignItems: "center", gap: "10px", background: pathname === l.href ? "#FFF5EE" : "transparent" }}>
                        <span style={{ fontSize: "16px" }}>{l.icon}</span>{l.label}
                      </Link>
                    ))}
                  </div>
                )}

                <button onClick={() => setMobileVisa(!mobileVisa)} style={{ padding: "14px 16px", fontWeight: 700, fontSize: "14.5px", letterSpacing: "0.7px", color: pathname.startsWith("/services") ? "#F16101" : "#022C45", background: pathname.startsWith("/services") ? "#FFF5EE" : "none", border: "none", borderBottom: "1px solid #f4f4f4", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "inherit", borderRadius: "10px" }}>
                  VISA SERVICES
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transform: mobileVisa ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}><polyline points="6 9 12 15 18 9"/></svg>
                </button>
                {mobileVisa && (
                  <div style={{ paddingLeft: "10px", display: "flex", flexDirection: "column", gap: "2px" }}>
                    {visaLinks.map(l => (
                      <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)} style={{ padding: "10px 16px", fontSize: "14.5px", fontWeight: 600, color: pathname === l.href ? "#F16101" : "#555", textDecoration: "none", borderRadius: "8px", display: "flex", alignItems: "center", gap: "10px", background: pathname === l.href ? "#FFF5EE" : "transparent" }}>
                        <span style={{ fontSize: "16px" }}>{l.icon}</span>{l.label}
                      </Link>
                    ))}
                  </div>
                )}

                <button onClick={() => setMobileCountry(!mobileCountry)} style={{ padding: "14px 16px", fontWeight: 700, fontSize: "14.5px", letterSpacing: "0.7px", color: pathname.startsWith("/countries") ? "#F16101" : "#022C45", background: pathname.startsWith("/countries") ? "#FFF5EE" : "none", border: "none", borderBottom: "1px solid #f4f4f4", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "inherit", borderRadius: "10px" }}>
                  STUDY ABROAD
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transform: mobileCountry ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}><polyline points="6 9 12 15 18 9"/></svg>
                </button>
                {mobileCountry && (
                  <div style={{ paddingLeft: "10px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px" }}>
                    {countryLinks.map(l => (
                      <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)} style={{ padding: "10px 14px", fontSize: "14.5px", fontWeight: 600, color: pathname === l.href ? "#F16101" : "#555", textDecoration: "none", borderRadius: "8px", display: "flex", alignItems: "center", gap: "8px", background: pathname === l.href ? "#FFF5EE" : "transparent" }}>
                        <div style={{ width: "24px", height: "24px", position: "relative", borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
                          <Image src={l.flag} alt={`${l.label} flag`} fill sizes="24px" style={{ objectFit: "cover" }} />
                        </div>
                        {l.label}
                      </Link>
                    ))}
                  </div>
                )}

                {/* Mobile Gallery Dropdown */}
                <button onClick={() => setMobileGallery(!mobileGallery)} style={{ padding: "14px 16px", fontWeight: 700, fontSize: "14.5px", letterSpacing: "0.7px", color: pathname.startsWith("/gallery") ? "#F16101" : "#022C45", background: pathname.startsWith("/gallery") ? "#FFF5EE" : "none", border: "none", borderBottom: "1px solid #f4f4f4", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "inherit", borderRadius: "10px" }}>
                  GALLERY
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transform: mobileGallery ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}><polyline points="6 9 12 15 18 9"/></svg>
                </button>
                {mobileGallery && (
                  <div style={{ paddingLeft: "10px", display: "flex", flexDirection: "column", gap: "2px" }}>
                    {galleryLinks.map(l => (
                      <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)} style={{ padding: "10px 16px", fontSize: "14.5px", fontWeight: 600, color: pathname === l.href ? "#F16101" : "#555", textDecoration: "none", borderRadius: "8px", display: "flex", alignItems: "center", gap: "10px", background: pathname === l.href ? "#FFF5EE" : "transparent" }}>
                        <span style={{ fontSize: "16px" }}>{l.icon}</span>{l.label}
                      </Link>
                    ))}
                  </div>
                )}

                {[ { label: "BLOG",     href: "/blog" }, { label: "CONTACT",  href: "/contact" } ].map(item => (
                  <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} style={{ padding: "14px 16px", fontWeight: 700, fontSize: "14.5px", letterSpacing: "0.7px", color: pathname === item.href ? "#F16101" : "#022C45", background: pathname === item.href ? "#FFF5EE" : "transparent", textDecoration: "none", borderRadius: "10px", borderBottom: "1px solid #f4f4f4" }}>
                    {item.label}
                  </Link>
                ))}

                <Link href="/book-consultation" onClick={() => setMobileOpen(false)} style={{ marginTop: "12px", background: "#c94e00", borderRadius: "12px", padding: "0 0 4px 0", textDecoration: "none", display: "block" }}>
                  <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "16px", background: "#F16101", borderRadius: "12px", fontSize: "14.5px", fontWeight: 800, color: "white", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    <VideoCamIcon/> Book Consultation
                  </span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ══ FLOATING SUPPORT MODAL (GLASS CONNECT) ══ */}
      <div style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 9999, display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
        
        {/* The Glass Modal */}
        <div style={{
          position: "absolute", bottom: "76px", right: 0, width: "320px", background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(255, 255, 255, 0.8)",
          borderRadius: "24px", padding: "24px", boxShadow: "0 24px 48px rgba(2, 44, 69, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.5) inset",
          transformOrigin: "bottom right", transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
          opacity: supportOpen ? 1 : 0, transform: supportOpen ? "scale(1) translateY(0)" : "scale(0.9) translateY(20px)", pointerEvents: supportOpen ? "all" : "none",
        }}>
          {/* Top Status */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#10B981", boxShadow: "0 0 8px rgba(16, 185, 129, 0.6)", animation: "glowPulse 2s infinite" }}/>
            <span style={{ fontSize: "13px", fontWeight: 800, color: "#022C45", textTransform: "uppercase", letterSpacing: "0.5px" }}>Online • Ready to Help</span>
          </div>

          {/* Primary CTA */}
          <Link href="/book-consultation" onClick={() => setSupportOpen(false)} style={{ 
            display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", 
            background: "#F16101", color: "white", padding: "14px", borderRadius: "12px", 
            textDecoration: "none", fontSize: "14.5px", fontWeight: 800, marginBottom: "16px", 
            boxShadow: "0 8px 20px rgba(241, 97, 1, 0.25)", transition: "all 0.2s" 
          }}>
            <CalendarIcon size={18} />
            Book 30-Min Free Session
          </Link>

          {/* Quick Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "20px" }}>
            <ModalGridBtn href={waLink} target="_blank" color="#25D366" bg="#f0fdf4">
               <WhatsAppIcon size={16} color="currentColor" /> WhatsApp
            </ModalGridBtn>
            <ModalGridBtn href="tel:+918799450049" color="#022C45" bg="#f4fbfc">
               <PhoneIcon size={16} /> Call Us
            </ModalGridBtn>
            <ModalGridBtn href="mailto:info@edificationoverseas.in" color="#022C45" bg="#f4fbfc">
               <MailIcon size={16} /> Email Us
            </ModalGridBtn>
            <ModalGridBtn href="/contact" onClick={() => setSupportOpen(false)} color="#022C45" bg="#f4fbfc">
               <MapPinIcon size={16} /> Contact
            </ModalGridBtn>
          </div>

          {/* Redesigned Social Footer */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", borderTop: "1px solid rgba(2, 44, 69, 0.08)", paddingTop: "20px" }}>
             <SocialBtn href="https://www.facebook.com/EdificationOverseas/" hoverColor="#1877F2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
             </SocialBtn>
             <SocialBtn href="https://www.instagram.com/edificationoverseas/" hoverColor="#E4405F">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/></svg>
             </SocialBtn>
             <SocialBtn href="https://www.youtube.com/@edification_overseas" hoverColor="#FF0000">
                <YouTubeIcon size={18} color="currentColor" />
             </SocialBtn>
             <SocialBtn href="https://www.linkedin.com/company/edification-overseas-education/" hoverColor="#0A66C2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4V9h4v1.76A6 6 0 0116 8zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
             </SocialBtn>
          </div>
        </div>

        {/* Toggle Button */}
        <button onClick={() => setSupportOpen(!supportOpen)} className="support-btn" aria-label="Toggle Support Modal">
          {supportOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ animation: "scaleIn 0.3s" }}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          ) : (
            <div style={{ animation: "scaleIn 0.3s" }}><HeadsetIcon /></div>
          )}
        </button>
      </div>
    </>
  );
}