"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  GraduationCap,
  Globe2,
  Award,
  Briefcase,
} from "lucide-react";

// ── InView hook (matches site-wide pattern) ───────────────────
function useInView(threshold = 0.15) {
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

// ── Data ─────────────────────────────────────────────────────
const features = [
  {
    icon: GraduationCap,
    title: "Singapore Study Visa",
    desc: "Professional admission and student visa guidance for top Singapore institutions.",
  },
  {
    icon: Globe2,
    title: "UK & Europe Admissions",
    desc: "International education opportunities across UK and European destinations.",
  },
  {
    icon: Award,
    title: "Scholarship Guidance",
    desc: "Support for scholarships, SOP preparation, and application strategy.",
  },
  {
    icon: Briefcase,
    title: "Career & Visa Counselling",
    desc: "Complete overseas education and international career consultation services.",
  },
];

const chips = [
  { label: "Ahmedabad", href: "/study-abroad-consultants-ahmedabad" },
  { label: "Surat",     href: "/study-abroad-consultants-surat" },
  { label: "Vadodara",  href: "/study-abroad-consultants-vadodara" },
  { label: "Rajkot",    href: "/study-abroad-consultants-rajkot" },
  { label: "Gandhinagar", href: "/study-abroad-consultants-ahmedabad" },
  { label: "Anand",     href: "/study-abroad-consultants-ahmedabad" },
  { label: "Bhavnagar", href: "/study-abroad-consultants-ahmedabad" },
  { label: "Singapore", href: "/countries/singapore" },
  { label: "Europe",    href: "/countries/europe" },
];

// ═══════════════════════════════════════════════════════════════
export default function GujaratSeoSection() {
  const { ref, inView } = useInView(0.12);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section style={{
      position: "relative",
      background: "#ffffff",
      overflow: "hidden",
    }}>
      <style>{`
        @keyframes gujaratFadeLeft {
          from { opacity: 0; transform: translateX(-28px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes gujaratFadeRight {
          from { opacity: 0; transform: translateX(28px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes gujaratFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes gujaratOrb {
          0%, 100% { transform: translateY(0px); }
          50%      { transform: translateY(-16px); }
        }
        .guj-card {
          background: #ffffff;
          border: 1px solid rgba(2,44,69,0.08);
          border-radius: 20px;
          padding: 28px 24px;
          box-shadow: 0 8px 24px rgba(2,44,69,0.04);
          transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
        }
        .guj-card:hover {
          border-color: rgba(241,97,1,0.25);
          box-shadow: 0 20px 40px rgba(2,44,69,0.10);
          transform: translateY(-4px);
        }
        .guj-card:hover .guj-icon-wrap {
          background: rgba(241,97,1,0.14);
        }
        .guj-chip {
          padding: 8px 16px;
          border-radius: 999px;
          background: rgba(2,44,69,0.04);
          color: #022C45;
          font-size: 13px;
          font-weight: 700;
          border: 1px solid rgba(2,44,69,0.08);
          transition: all 0.25s ease;
        }
        .guj-chip:hover {
          background: rgba(241,97,1,0.08);
          border-color: rgba(241,97,1,0.22);
          color: #F16101;
        }
        @media (max-width: 767px) {
          .guj-grid { grid-template-columns: 1fr 1fr !important; gap: 12px !important; }
          .guj-card { padding: 20px 16px !important; border-radius: 16px !important; }
        }
        @media (max-width: 400px) {
          .guj-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── Subtle grid background (matches site pattern) ── */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: `
          linear-gradient(rgba(2,44,69,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(2,44,69,0.03) 1px, transparent 1px)
        `,
        backgroundSize: "56px 56px",
      }}/>

      {/* ── Ambient orbs (matches AboutSnippet pattern) ── */}
      <div style={{
        position: "absolute", top: "-100px", right: "-80px",
        width: "480px", height: "480px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(201,162,77,0.05) 0%, transparent 65%)",
        animation: "gujaratOrb 12s ease-in-out infinite",
        zIndex: 0, pointerEvents: "none",
      }}/>
      <div style={{
        position: "absolute", bottom: "-80px", left: "-60px",
        width: "360px", height: "360px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(241,97,1,0.04) 0%, transparent 65%)",
        animation: "gujaratOrb 9s ease-in-out infinite 2s",
        zIndex: 0, pointerEvents: "none",
      }}/>

      {/* ── Top border line (matches site pattern) ── */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "1px",
        background: "linear-gradient(90deg, transparent 0%, rgba(201,162,77,0.25) 30%, rgba(241,97,1,0.2) 70%, transparent 100%)",
        zIndex: 2,
      }}/>
      {/* ── Bottom border line ── */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "1px",
        background: "linear-gradient(90deg, transparent 0%, rgba(2,44,69,0.08) 50%, transparent 100%)",
        zIndex: 2,
      }}/>

      {/* ── Main content ── */}
      <div
        ref={ref}
        style={{
          position: "relative", zIndex: 1,
          maxWidth: "1280px", margin: "0 auto",
          padding: isMobile ? "56px 20px 64px" : "88px 32px 96px",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1.1fr 1fr",
          gap: isMobile ? "40px" : "64px",
          alignItems: "center",
        }}
      >

        {/* ══ LEFT COLUMN ══ */}
        <div style={{
          animation: inView ? "gujaratFadeLeft 0.65s cubic-bezier(0.22,1,0.36,1) both" : "none",
          opacity: inView ? 1 : 0,
        }}>

          {/* Eyebrow label — matches site-wide pattern exactly */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "9px", marginBottom: "24px" }}>
            <div style={{
              width: "30px", height: "2px", borderRadius: "1px",
              background: "linear-gradient(90deg, #F16101, #C9A24D)",
            }}/>
            <span style={{
              fontSize: "12px", fontWeight: 800,
              letterSpacing: "2.5px", textTransform: "uppercase",
              background: "linear-gradient(90deg, #F16101, #C9A24D)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              Global Education Opportunities
            </span>
          </div>

          {/* Heading — matches site-wide heading style with gradient underline */}
          <h2 style={{
            fontSize: "clamp(30px, 3.6vw, 46px)",
            fontWeight: 900, color: "#022C45",
            lineHeight: 1.1, letterSpacing: "-0.8px",
            margin: "0 0 24px",
          }}>
            Trusted Study Abroad Consultants
            <br />
            <span style={{
              position: "relative", display: "inline-block",
              background: "linear-gradient(100deg, #F16101 0%, #C9A24D 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              in Gujarat & Across India
              <svg
                style={{ position: "absolute", bottom: "-6px", left: 0, width: "100%" }}
                height="5" viewBox="0 0 300 5" preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="gujaratUline" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#F16101"/>
                    <stop offset="100%" stopColor="#C9A24D"/>
                  </linearGradient>
                </defs>
                <path
                  d="M0,3 Q75,0 150,3 Q225,7 300,3"
                  stroke="url(#gujaratUline)" strokeWidth="3"
                  fill="none" strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>

          {/* Description */}
          <p style={{
            fontSize: "clamp(14px, 1.4vw, 16px)",
            lineHeight: 1.85, color: "#6B7280",
            maxWidth: "580px", margin: "0 0 32px",
          }}>
            Students across Ahmedabad, Surat, Vadodara, Rajkot, Gandhinagar,
            Bhavnagar, Anand, and other cities in Gujarat trust{" "}
            <span style={{ color: "#022C45", fontWeight: 600 }}>Edification Overseas</span>{" "}
            for expert guidance on studying abroad — with professional support for
            admissions, student visas, scholarships, and international career
            opportunities in Singapore, Cyprus, Mauritius, UK, Belarus, Moldova,
            Greece, Malta, Germany, and other European destinations.
          </p>

          {/* Location chips — linked to city pages */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {chips.map((chip) => (
              <Link key={chip.label} href={chip.href} className="guj-chip"
                style={{ textDecoration: "none" }}>
                {chip.label}
              </Link>
            ))}
          </div>
        </div>

        {/* ══ RIGHT COLUMN — Feature cards ══ */}
        <div
          className="guj-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "18px",
            animation: inView ? "gujaratFadeRight 0.65s cubic-bezier(0.22,1,0.36,1) 0.15s both" : "none",
            opacity: inView ? 1 : 0,
          }}
        >
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div key={i} className="guj-card">

                {/* Icon */}
                <div className="guj-icon-wrap" style={{
                  width: "52px", height: "52px",
                  borderRadius: "14px",
                  background: "rgba(241,97,1,0.07)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "18px",
                  transition: "background 0.3s ease",
                }}>
                  <Icon size={24} color="#F16101" />
                </div>

                {/* Card heading */}
                <h3 style={{
                  fontSize: "15px", fontWeight: 800,
                  color: "#022C45", marginBottom: "8px",
                  lineHeight: 1.35,
                }}>
                  {feature.title}
                </h3>

                {/* Card description */}
                <p style={{
                  fontSize: "13px", lineHeight: 1.65,
                  color: "#6B7280", margin: 0,
                }}>
                  {feature.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}