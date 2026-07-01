"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

// ── Destinations — updated list ───────────────────────────────
const destinations = [
  { label: "Canada",         sub: "Student · Work · PR",         flag: "/images/flags/ca.png", href: "/countries/canada"         },
  { label: "United Kingdom", sub: "Top Universities",            flag: "/images/flags/gb.png", href: "/countries/united-kingdom" },
  { label: "USA",            sub: "F-1 · H-1B · B-1/B-2",        flag: "/images/flags/us.png", href: "/countries/usa"            },
  { label: "Europe",         sub: "Schengen · Student Visa",     flag: "/images/flags/eu.png", href: "/countries/europe"         },
  { label: "Singapore",      sub: "Study · Work · Settle",       flag: "/images/flags/sg.png", href: "/countries/singapore"      },
  { label: "Germany",        sub: "Student · Job Seeker Visa",   flag: "/images/flags/de.png", href: "/countries/germany"        },
  { label: "Cyprus",         sub: "Student · Work Permit",       flag: "/images/flags/cy.png", href: "/countries/cyprus"         },
  { label: "Mauritius",      sub: "Student · Part-Time Work",    flag: "/images/flags/mu.png", href: "/countries/mauritius"      },
];

// ── Programs — 4 programs for the mini-slider ─────────────────
const programs = [
  {
    country: "Singapore",
    flag: "/images/flags/sg.png",
    href: "/countries/singapore",
    accentColor: "#07CBEB",
    title: "Diploma in Hospitality Management",
    duration: "12 Months",
    tags: ["6M Study", "6M Paid Internship", "Employment Pass"],
    desc: "World-class hospitality training with a guaranteed paid industry internship in Singapore's booming tourism sector.",
  },
  {
    country: "Cyprus",
    flag: "/images/flags/cy.png",
    href: "/countries/cyprus",
    accentColor: "#F16101",
    title: "Bachelor's in Computer Science",
    duration: "48 Months",
    tags: ["Part-Time Work", "EU Degree", "Tech Pathway"],
    desc: "Earn a recognised European CS degree in Cyprus with the right to work part-time, opening EU tech market doors.",
  },
  {
    country: "Mauritius",
    flag: "/images/flags/mu.png",
    href: "/countries/mauritius",
    accentColor: "#F59E0B",
    title: "Diploma in Hospitality / Business Management",
    duration: "12 Months",
    tags: ["Part-Time Work", "Island Campus", "Affordable Fees"],
    desc: "Study business or hospitality on a stunning island with flexible part-time work rights and low tuition fees.",
  },
  {
    country: "United Kingdom",
    flag: "/images/flags/gb.png",
    href: "/countries/united-kingdom",
    accentColor: "#022C45",
    title: "MBA — Master in Business Administration",
    duration: "12 Months",
    tags: ["Part-Time Work", "Post-Study Work Permit", "Top Ranked"],
    desc: "Fast-track your career with a UK MBA. Work part-time during studies and stay 2 years on the Graduate Visa.",
  },
];

// ── Destination Card — original design, flag now round ────────
function DestCard({ dest }: { dest: typeof destinations[0] }) {
  const [h, setH] = useState(false);
  return (
    <Link
      href={dest.href}
      className="dest-card"
      style={{
        display: "flex", alignItems: "center", gap: "14px",
        background: h ? "#ffffff" : "rgba(255,255,255,0.7)",
        border: h ? "1px solid rgba(241,97,1,0.3)" : "1px solid rgba(0,0,0,0.04)",
        boxShadow: h ? "0 8px 20px rgba(0,0,0,0.06)" : "0 2px 8px rgba(0,0,0,0.02)",
        borderRadius: "14px", padding: "12px 16px",
        textDecoration: "none", cursor: "pointer",
        transform: h ? "translateX(-4px)" : "translateX(0)",
        transition: "all 0.22s cubic-bezier(0.4,0,0.2,1)",
      }}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
    >
      {/* Round flag */}
      <div className="dest-flag" style={{
        width: "36px", height: "36px", borderRadius: "50%",
        overflow: "hidden", position: "relative", flexShrink: 0,
        border: "1.5px solid rgba(255,255,255,0.9)",
        boxShadow: "0 1px 6px rgba(0,0,0,0.1)",
      }}>
        <Image src={dest.flag} alt={dest.label} fill sizes="36px" style={{ objectFit: "cover" }} />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="dest-title" style={{
          fontSize: "13.5px", fontWeight: 700, color: "#022C45",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>{dest.label}</div>
        <div className="dest-sub" style={{ fontSize: "11.5px", color: "#6B7280", marginTop: "2px" }}>
          {dest.sub}
        </div>
      </div>

      <svg
        width="14" height="14" viewBox="0 0 24 24" fill="none"
        stroke={h ? "#F16101" : "rgba(2,44,69,0.2)"}
        strokeWidth="2.5"
        style={{ flexShrink: 0, transition: "stroke 0.2s, transform 0.2s", transform: h ? "translateX(3px)" : "translateX(0)" }}
      >
        <polyline points="9 18 15 12 9 6"/>
      </svg>
    </Link>
  );
}

// ── Video Modal ───────────────────────────────────────────────
function VideoModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.88)",
        display: "flex", alignItems: "center", justifyContent: "center",
        animation: "fadeIn 0.2s ease",
        backdropFilter: "blur(6px)",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: "min(900px,92vw)", aspectRatio: "16/9",
          borderRadius: "20px", overflow: "hidden",
          position: "relative",
          animation: "scaleIn 0.25s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <iframe
          src="https://www.youtube.com/embed/1vFVeU1hfxY?autoplay=1&rel=0"
          style={{ width: "100%", height: "100%", border: "none" }}
          allow="autoplay; fullscreen"
          allowFullScreen
        />
      </div>
      <button
        onClick={onClose}
        style={{
          position: "fixed", top: "24px", right: "28px",
          background: "rgba(255,255,255,0.12)",
          border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: "50%", width: "44px", height: "44px",
          color: "white", fontSize: "22px", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "background 0.2s",
        }}
      >✕</button>
    </div>
  );
}

// ── Programs mini-slider (inside the original white card) ─────
function ProgramsSlider() {
  const [active, setActive] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setActive(prev => (prev + 1) % programs.length);
      setAnimKey(k => k + 1);
    }, 2800);
    return () => clearInterval(t);
  }, []);

  const prog = programs[active];

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>

      {/* Animated content */}
      <div key={animKey} style={{ animation: "progSlideIn 0.42s cubic-bezier(0.22,1,0.36,1) both" }}>
        {/* Country + flag row */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
          <div style={{
            width: "32px", height: "32px", borderRadius: "50%",
            position: "relative", overflow: "hidden", flexShrink: 0,
            border: "1.5px solid rgba(0,0,0,0.08)",
            boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
          }}>
            <Image src={prog.flag} alt={prog.country} fill sizes="32px" style={{ objectFit: "cover" }}/>
          </div>
          <span style={{ color: prog.accentColor, fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px" }}>
            {prog.country} Admissions
          </span>
        </div>

        <h3 className="prog-title" style={{ color: "#022C45", fontSize: "20px", fontWeight: 800, lineHeight: 1.22, margin: "0 0 6px 0" }}>
          {prog.title}
        </h3>

        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "12px" }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" style={{ flexShrink: 0 }}>
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
          <span style={{ fontSize: "12.5px", color: "#6B7280", fontWeight: 600 }}>{prog.duration}</span>
        </div>

        <p className="prog-desc" style={{ color: "#4A5568", fontSize: "13.5px", margin: "0 0 14px 0", lineHeight: 1.55 }}>
          {prog.desc}
        </p>

        <div style={{ display: "flex", gap: "7px", flexWrap: "wrap" }}>
          {prog.tags.map(tag => (
            <span key={tag} style={{
              background: "rgba(2,44,69,0.05)",
              border: "1px solid rgba(2,44,69,0.08)",
              borderRadius: "999px", padding: "3px 10px",
              fontSize: "11px", fontWeight: 700, color: "#022C45",
            }}>{tag}</span>
          ))}
        </div>
      </div>

      {/* Dot nav + CTA */}
      <div style={{ marginTop: "18px" }}>
        {/* Dot indicators */}
        <div style={{ display: "flex", gap: "5px", marginBottom: "14px" }}>
          {programs.map((_, i) => (
            <button
              key={i}
              onClick={() => { setActive(i); setAnimKey(k => k + 1); }}
              style={{
                width: i === active ? "20px" : "6px", height: "6px",
                borderRadius: "999px", border: "none", cursor: "pointer", padding: 0,
                background: i === active ? "#F16101" : "rgba(2,44,69,0.15)",
                transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
              }}
            />
          ))}
        </div>

        <Link
          href={prog.href}
          style={{
            background: "transparent", color: "#022C45",
            border: "2px solid #022C45", textAlign: "center",
            padding: "12px", borderRadius: "10px", fontWeight: 800,
            textTransform: "uppercase", letterSpacing: "0.5px",
            textDecoration: "none", fontSize: "13.5px",
            transition: "all 0.2s", display: "block",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = "#022C45";
            (e.currentTarget as HTMLElement).style.color = "white";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = "transparent";
            (e.currentTarget as HTMLElement).style.color = "#022C45";
          }}
        >Explore Program →</Link>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  HERO SECTION
// ═══════════════════════════════════════════════════════════════
interface EventSlide {
  badge: string;
  title: string;
  dateLocation: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

export default function HeroSection() {
  const [videoOpen,    setVideoOpen]   = useState(false);
  const [ctaH,         setCtaH]        = useState(false);
  const [b2bH,         setB2bH]        = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered,    setIsHovered]   = useState(false);
  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [eventForm,      setEventForm]      = useState({ name: "", phone: "", email: "" });
  const [eventFormStatus,setEventFormStatus]= useState<"idle"|"loading"|"success"|"error">("idle");
  const [eventFormMsg,   setEventFormMsg]   = useState("");
  const [eventSlide,     setEventSlide]     = useState<EventSlide>({
    badge: "Upcoming Event",
    title: "Education Fair 2026",
    dateLocation: "Coming Soon",
    description: "Stay tuned for our next event.",
    buttonText: "Register Interest →",
    buttonLink: "/contact",
  });
  const totalSlides = 3;

  // Fetch live event slide data
  useEffect(() => {
    fetch("/api/events-slide")
      .then(r => r.json())
      .then((data: EventSlide) => { if (data?.title) setEventSlide(data); })
      .catch(() => {});
  }, []);

  // Auto-play slider
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(timer);
  }, [isHovered, totalSlides]);

  return (
    <>
      <style>{`
        /* Core Animations */
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideLeft {
          from { opacity: 0; transform: translateX(20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.92); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes pulseOrb {
          0%, 100% { transform: scale(1);    opacity: 0.6; }
          50%      { transform: scale(1.08); opacity: 0.9; }
        }
        @keyframes badgePulse {
          0%, 100% { opacity: 1;   transform: scale(1);   }
          50%      { opacity: 0.5; transform: scale(1.4); }
        }
        @keyframes progressFill {
          from { width: 0%; }
          to   { width: 100%; }
        }
        @keyframes progSlideIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── MOBILE RESPONSIVE CSS ── */
        .hero-main-section { min-height: 90vh; }

        @media (max-width: 960px) {
          .hero-main-section { min-height: auto !important; }
          .hero-wrapper {
            flex-direction: column !important;
            padding-top: 60px !important;
            gap: 32px !important;
          }
          .hero-text {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
          }
          .hero-h1 {
            text-align: center !important;
            font-size: clamp(32px, 7vw, 42px) !important;
          }
          .hero-p {
            text-align: center !important;
            font-size: 15px !important;
            line-height: 1.6 !important;
            margin-bottom: 24px !important;
          }
          .hero-buttons {
            justify-content: center !important;
          }
          .hero-slider {
            width: 100% !important;
            max-width: 500px !important;
          }
        }

        @media (max-width: 600px) {
          .hero-wrapper {
            padding-top: 10px !important; /* Drastically reduced gap from header */
            padding-bottom: 40px !important;
          }
          .hero-h1 {
            font-size: clamp(28px, 8vw, 36px) !important;
            margin-bottom: 24px !important; /* Increased gap to de-clutter from paragraph below */
            padding-bottom: 10px !important; /* Wavy underline space */
          }
          .hero-p {
            font-size: 14px !important; /* De-cluttered text */
            line-height: 1.5 !important;
            margin-bottom: 28px !important;
          }
          .hero-buttons {
            flex-direction: column !important;
            width: 100% !important;
            gap: 10px !important;
          }
          
          /* Smaller Buttons */
          .hero-btn {
            width: 100% !important;
            justify-content: center !important;
            padding-bottom: 3px !important; /* Thinner 3D bottom edge */
          }
          .hero-btn-inner {
            width: 100% !important;
            justify-content: center !important;
            padding: 10px 20px !important; /* Reduced padding for smaller button size */
          }
          .hero-btn-text {
            font-size: 13px !important; /* Smaller button text */
          }
          
          /* Smaller Video/Success Button */
          .hero-video-btn {
            font-size: 13px !important;
            padding: 8px !important;
          }
          .hero-video-icon {
            width: 28px !important;
            height: 28px !important;
          }
          .hero-video-icon svg {
            width: 10px !important;
            height: 10px !important;
          }
          
          /* Card resizing to fit screen perfectly */
          .dest-card { padding: 8px 12px !important; gap: 10px !important; }
          .dest-flag { width: 28px !important; height: 28px !important; }
          .dest-title { font-size: 12.5px !important; }
          .dest-sub { font-size: 10.5px !important; }

          .prog-card { padding: 20px 16px !important; min-height: auto !important; }
          .prog-title { font-size: 18px !important; }
          .prog-desc { font-size: 12.5px !important; line-height: 1.4 !important; }

          /* Slider Pill Buttons forcing onto one neat row */
          .nav-pills {
            flex-wrap: nowrap !important;
            width: 100% !important;
            padding: 4px !important;
            gap: 2px !important;
            border-radius: 999px !important;
            justify-content: space-between !important;
          }
          .nav-pill-btn {
            flex: 1 1 0 !important;
            justify-content: center !important;
            padding: 8px 4px !important;
          }
          .nav-pill-btn span:nth-child(1) { font-size: 12px !important; } /* Icon */
          .nav-pill-btn span:nth-child(2) { 
            font-size: 10.5px !important; 
            letter-spacing: 0px !important; 
          } /* Text */
        }
      `}</style>

      {videoOpen && <VideoModal onClose={() => setVideoOpen(false)} />}

      <section className="hero-main-section" style={{
        position: "relative",
        display: "flex", alignItems: "center",
        overflow: "hidden",
        background: "#fdf6ee", // Base background matched to new aesthetic
      }}>

        {/* ── BG GRADIENT OVERLAY ── */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(105deg, rgba(255,255,255,1) 0%, rgba(253,246,238,1) 40%, rgba(253,232,200,0.9) 75%, rgba(253,220,160,0.5) 100%)",
          }}/>
        </div>

        {/* ── DECORATIVE ORBS (Warmed up) ── */}
        <div style={{
          position: "absolute", top: "10%", left: "38%", width: "340px", height: "340px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(241,97,1,0.12) 0%, transparent 70%)",
          animation: "pulseOrb 6s ease-in-out infinite", zIndex: 1, pointerEvents: "none",
        }}/>
        <div style={{
          position: "absolute", bottom: "5%", right: "5%", width: "280px", height: "280px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,162,77,0.12) 0%, transparent 70%)",
          animation: "pulseOrb 8s ease-in-out infinite 2s", zIndex: 1, pointerEvents: "none",
        }}/>

        {/* ── MAIN CONTENT ── */}
        <div className="hero-wrapper" style={{
          position: "relative", zIndex: 2, maxWidth: "1280px", margin: "0 auto",
          padding: "48px 24px 60px", width: "100%",
          display: "flex", alignItems: "center", gap: "48px",
        }}>

          {/* ═══════════════════════
              LEFT — TEXT CONTENT
          ═══════════════════════ */}
          <div className="hero-text" style={{ flex: 1, minWidth: 0 }}>

            {/* Trust badge */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "rgba(241,97,1,0.08)",
              border: "1px solid rgba(241,97,1,0.2)",
              borderRadius: "999px", padding: "6px 16px", marginBottom: "24px",
              animation: "fadeSlideUp 0.5s ease 0.1s both",
            }}>
              <span style={{
                width: "8px", height: "8px", borderRadius: "50%",
                background: "#F16101", display: "inline-block",
                animation: "badgePulse 1.6s infinite",
              }}/>
              <span style={{ fontSize: "12px", fontWeight: 800, color: "#F16101", letterSpacing: "0.4px" }}>
                India's Most Trusted Education Consultancy
              </span>
            </div>

            {/* H1 — overflow:visible + paddingBottom fix stops descenders/underline clipping */}
            <h1 className="hero-h1" style={{
              fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 900, color: "#022C45", lineHeight: 1.12,
              letterSpacing: "-0.8px", marginBottom: "20px",
              overflow: "visible",       /* never clip glyphs or decorative SVG */
              paddingBottom: "14px",     /* room for the wavy underline on last line */
              animation: "fadeSlideUp 0.55s ease 0.2s both",
            }}>
              Your Dream Country<br/>
              Is Just One<br/>
              <span style={{
                color: "#F16101",
                position: "relative", display: "inline-block",
                textShadow: "0 2px 16px rgba(241,97,1,0.18)",
              }}>
                Step Away.
                <svg
                  aria-hidden="true"
                  style={{ position: "absolute", bottom: "-6px", left: 0, width: "100%", overflow: "visible" }}
                  height="6" viewBox="0 0 200 6" preserveAspectRatio="none"
                >
                  <path
                    d="M0,5 Q50,0 100,5 Q150,10 200,5"
                    stroke="#C9813A" strokeWidth="3.5" fill="none" strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="hero-p" style={{
              fontSize: "clamp(15px, 1.8vw, 17px)", color: "#4A5568", lineHeight: 1.75,
              marginBottom: "32px", maxWidth: "540px",
              animation: "fadeSlideUp 0.55s ease 0.3s both",
            }}>
              Worried about visa rejections? Leave the hard work to us. We safely guide thousands
              of students to their dream universities abroad, and work closely with global
              institutions as their{" "}
              <strong style={{ color: "#022C45", fontWeight: 700 }}>trusted recruitment partners.</strong>
            </p>

            {/* CTA Buttons */}
            <div className="hero-buttons" style={{
              display: "flex", gap: "14px", flexWrap: "wrap", alignItems: "center", marginBottom: "44px",
              animation: "fadeSlideUp 0.55s ease 0.4s both",
            }}>

              {/* Primary */}
              <Link
                href="/book-consultation"
                className="hero-btn"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "10px",
                  position: "relative", overflow: "hidden",
                  background: "#c94e00", borderRadius: "12px", padding: "0 0 4px 0",
                  textDecoration: "none",
                  transform: ctaH ? "translateY(-2px)" : "translateY(0)",
                  transition: "transform 0.18s cubic-bezier(0.4,0,0.2,1)",
                }}
                onMouseEnter={() => setCtaH(true)}
                onMouseLeave={() => setCtaH(false)}
              >
                <span className="hero-btn-inner" style={{
                  display: "inline-flex", alignItems: "center", gap: "10px",
                  padding: "14px 28px", background: "#F16101", borderRadius: "12px",
                  position: "relative", overflow: "hidden",
                }}>
                  <span style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: "45%",
                    background: "linear-gradient(180deg,rgba(255,255,255,0.18),transparent)",
                    borderRadius: "12px 12px 0 0", pointerEvents: "none",
                  }}/>
                  <span className="hero-btn-text" style={{
                    fontSize: "14.5px", fontWeight: 800, color: "white",
                    letterSpacing: "0.4px", textTransform: "uppercase",
                    position: "relative", zIndex: 1,
                  }}>Book Consultation</span>
                </span>
              </Link>

              {/* Secondary */}
              <Link
                href="/contact"
                className="hero-btn"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "10px",
                  position: "relative", overflow: "hidden",
                  background: "#011929", borderRadius: "12px", padding: "0 0 4px 0",
                  textDecoration: "none",
                  transform: b2bH ? "translateY(-2px)" : "translateY(0)",
                  transition: "transform 0.18s cubic-bezier(0.4,0,0.2,1)",
                }}
                onMouseEnter={() => setB2bH(true)}
                onMouseLeave={() => setB2bH(false)}
              >
                <span className="hero-btn-inner" style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  padding: "14px 28px", background: "#022C45", borderRadius: "12px",
                  position: "relative", overflow: "hidden",
                }}>
                  <span className="hero-btn-text" style={{
                    fontSize: "14.5px", fontWeight: 800, color: "white",
                    letterSpacing: "0.4px", textTransform: "uppercase",
                    position: "relative", zIndex: 1,
                  }}>Partner With Us</span>
                </span>
              </Link>

              {/* Tertiary — video */}
              <button
                onClick={() => setVideoOpen(true)}
                className="hero-video-btn"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "12px",
                  border: "none", padding: "13px 8px",
                  color: "rgba(2,44,69,0.55)", fontSize: "14.5px", fontWeight: 700,
                  cursor: "pointer", fontFamily: "inherit",
                  background: "transparent", transition: "color 0.18s ease",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#022C45"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(2,44,69,0.55)"; }}
              >
                <span className="hero-video-icon" style={{
                  width: "34px", height: "34px", borderRadius: "50%",
                  background: "rgba(2,44,69,0.06)", border: "1px solid rgba(2,44,69,0.1)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, transition: "background 0.18s",
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#022C45">
                    <polygon points="5,3 19,12 5,21"/>
                  </svg>
                </span>
                Success Stories
              </button>
            </div>

          </div>

          {/* ═══════════════════════
              RIGHT — SLIDER
          ═══════════════════════ */}
          <div
            className="hero-slider"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              flexShrink: 0, width: "clamp(300px, 35%, 420px)",
              position: "relative",
              animation: "fadeSlideLeft 0.5s ease 0.2s both",
            }}
          >
            {/* CSS Grid Stack */}
            <div style={{ display: "grid", gridTemplateAreas: "'slideStack'", width: "100%" }}>

              {/* ── SLIDE 1: Popular Destinations ── */}
              <div style={{
                gridArea: "slideStack", display: "flex", flexDirection: "column",
                opacity: currentSlide === 0 ? 1 : 0,
                visibility: currentSlide === 0 ? "visible" : "hidden",
                transition: "opacity 0.6s ease-in-out, visibility 0.6s",
              }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                  <span style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "1.4px", textTransform: "uppercase", color: "#022C45" }}>
                    Popular Destinations
                  </span>
                  <Link href="/countries" style={{ fontSize: "12px", fontWeight: 800, color: "#022C45", textDecoration: "none", display: "flex", alignItems: "center", gap: "4px" }}>
                    View All
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#022C45" strokeWidth="2.5">
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>
                  </Link>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                  {destinations.slice(0, 8).map(dest => (
                    <DestCard key={dest.href} dest={dest}/>
                  ))}
                </div>
              </div>

              {/* ── SLIDE 2: Upcoming Event — original dark blue card ── */}
              <div style={{
                gridArea: "slideStack", display: "flex", flexDirection: "column",
                opacity: currentSlide === 1 ? 1 : 0,
                visibility: currentSlide === 1 ? "visible" : "hidden",
                transition: "opacity 0.6s ease-in-out, visibility 0.6s",
              }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                  <span style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "1.4px", textTransform: "uppercase", color: "#022C45" }}>
                    Upcoming Event
                  </span>
                </div>
                <div className="prog-card" style={{
                  flex: 1,
                  background: "linear-gradient(135deg, #022C45 0%, #034a72 100%)",
                  borderRadius: "16px", padding: "28px 24px",
                  display: "flex", flexDirection: "column", justifyContent: "space-between",
                  boxShadow: "0 12px 32px rgba(2,44,69,0.15)",
                  border: "1px solid rgba(0,0,0,0.1)",
                }}>
                  <div>
                    <div style={{
                      display: "inline-block",
                      background: "rgba(241,97,1,0.2)", color: "#ffb480",
                      fontSize: "11px", fontWeight: 800, padding: "4px 10px",
                      borderRadius: "6px", marginBottom: "16px",
                      textTransform: "uppercase", letterSpacing: "1px",
                    }}>{eventSlide.badge}</div>

                    <h3 style={{ color: "white", fontSize: "24px", fontWeight: 800, lineHeight: 1.2, margin: "0 0 10px 0" }}>
                      {eventSlide.title}
                    </h3>

                    {eventSlide.dateLocation && (
                      <div style={{ display: "flex", alignItems: "center", gap: "7px", margin: "0 0 12px 0" }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" style={{ flexShrink: 0 }}>
                          <rect x="3" y="4" width="18" height="18" rx="2"/>
                          <line x1="16" y1="2" x2="16" y2="6"/>
                          <line x1="8" y1="2" x2="8" y2="6"/>
                          <line x1="3" y1="10" x2="21" y2="10"/>
                        </svg>
                        <span style={{ color: "rgba(255,255,255,0.55)", fontSize: "13px" }}>
                          {eventSlide.dateLocation}
                        </span>
                      </div>
                    )}

                    <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px", margin: 0, lineHeight: 1.5 }}>
                      {eventSlide.description}
                    </p>
                  </div>
                  <button
                    onClick={() => { setEventModalOpen(true); setEventFormStatus("idle"); setEventFormMsg(""); setEventForm({ name: "", phone: "", email: "" }); }}
                    style={{
                      background: "#F16101", color: "white", textAlign: "center",
                      padding: "14px", borderRadius: "10px", fontWeight: 800,
                      textTransform: "uppercase", letterSpacing: "0.5px",
                      border: "none", cursor: "pointer", fontSize: "13.5px", marginTop: "20px",
                      display: "block", width: "100%", fontFamily: "inherit",
                      transition: "transform 0.2s",
                    }}
                    onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"}
                    onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"}
                  >{eventSlide.buttonText}</button>
                </div>
              </div>

              {/* ── SLIDE 3: Featured Programs ── */}
              <div style={{
                gridArea: "slideStack", display: "flex", flexDirection: "column",
                opacity: currentSlide === 2 ? 1 : 0,
                visibility: currentSlide === 2 ? "visible" : "hidden",
                transition: "opacity 0.6s ease-in-out, visibility 0.6s",
              }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                  <span style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "1.4px", textTransform: "uppercase", color: "#022C45" }}>
                    Featured Pathways
                  </span>
                </div>
                <div className="prog-card" style={{
                  flex: 1,
                  background: "linear-gradient(135deg, #ffffff 0%, #fdf6ee 100%)", // Warmed up background
                  borderRadius: "16px", padding: "28px 24px",
                  display: "flex", flexDirection: "column",
                  boxShadow: "0 12px 32px rgba(0,0,0,0.05)",
                  border: "1px solid rgba(0,0,0,0.06)",
                  minHeight: "420px",
                }}>
                  {/* 4-program auto-cycling slider lives here */}
                  <ProgramsSlider />
                </div>
              </div>

            </div>{/* end grid stack */}

            {/* ── Navigation Pills ── */}
            <div className="nav-pills" style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              gap: "6px",
              background: "rgba(2,44,69,0.04)",
              border: "1px solid rgba(2,44,69,0.08)",
              borderRadius: "999px",
              padding: "6px 8px",
              width: "fit-content",
              margin: "20px auto 0",
            }}>
              {[
                { label: "Destinations", icon: "🌍" },
                { label: "Events",       icon: "📅" },
                { label: "Programs",     icon: "🎓" },
              ].map((item, i) => {
                const isActive = currentSlide === i;
                return (
                  <button
                    key={i}
                    className="nav-pill-btn"
                    onClick={() => setCurrentSlide(i)}
                    style={{
                      display: "flex", alignItems: "center", gap: "6px",
                      background: isActive ? "#022C45" : "transparent",
                      border: "none", cursor: "pointer",
                      padding: "6px 14px",
                      borderRadius: "999px",
                      fontFamily: "inherit",
                      transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
                    }}
                    onMouseEnter={e => {
                      if (!isActive) (e.currentTarget as HTMLElement).style.background = "rgba(2,44,69,0.06)";
                    }}
                    onMouseLeave={e => {
                      if (!isActive) (e.currentTarget as HTMLElement).style.background = "transparent";
                    }}
                  >
                    <span style={{ fontSize: "13px", opacity: isActive ? 1 : 0.5, transition: "opacity 0.3s" }}>
                      {item.icon}
                    </span>
                    <span style={{
                      fontSize: "11.5px", fontWeight: 700, letterSpacing: "0.4px",
                      color: isActive ? "white" : "rgba(2,44,69,0.4)",
                      transition: "color 0.3s", whiteSpace: "nowrap",
                    }}>
                      {item.label}
                    </span>

                    {/* Progress bar */}
                    {isActive && (
                      <span style={{
                        display: "block", width: "20px", height: "3px",
                        borderRadius: "2px", background: "rgba(255,255,255,0.25)",
                        overflow: "hidden", flexShrink: 0,
                      }}>
                        <span
                          key={currentSlide}
                          style={{
                            display: "block", height: "100%",
                            background: "#F16101", borderRadius: "2px",
                            animation: isHovered ? "none" : "progressFill 5s linear forwards",
                            width: isHovered ? "0%" : undefined,
                          }}
                        />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* ── EVENT REGISTRATION MODAL ── */}
      {eventModalOpen && (
        <>
          <style>{`
            @keyframes eoeEventBdIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes eoeEventMdIn { from { opacity: 0; transform: scale(0.94) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }
            @keyframes eoeEventSlideIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
          `}</style>
          <div
            onClick={() => setEventModalOpen(false)}
            style={{
              position: "fixed", inset: 0, zIndex: 999999,
              background: "rgba(2, 28, 44, 0.75)",
              backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "16px",
              animation: "eoeEventBdIn 0.35s ease forwards",
            }}
          >
            <div
              onClick={e => e.stopPropagation()}
              style={{
                width: "100%", maxWidth: "480px",
                background: "#ffffff", borderRadius: "24px",
                boxShadow: "0 40px 80px rgba(2,44,69,0.3)",
                overflow: "hidden",
                animation: "eoeEventMdIn 0.5s cubic-bezier(0.22,1,0.36,1) forwards",
                position: "relative",
              }}
            >
              {/* Header */}
              <div style={{
                background: "linear-gradient(135deg, #022C45 0%, #033d5e 100%)",
                padding: "28px 28px 24px",
                position: "relative",
                overflow: "hidden",
              }}>
                <div style={{ position: "absolute", top: "-40px", right: "-40px", width: "160px", height: "160px", background: "radial-gradient(circle, rgba(241,97,1,0.2) 0%, transparent 65%)", borderRadius: "50%", pointerEvents: "none" }}/>
                <button
                  onClick={() => setEventModalOpen(false)}
                  style={{
                    position: "absolute", top: "14px", right: "14px",
                    width: "32px", height: "32px", borderRadius: "50%",
                    background: "rgba(255,255,255,0.1)", border: "none",
                    cursor: "pointer", display: "flex", alignItems: "center",
                    justifyContent: "center", color: "rgba(255,255,255,0.7)",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(241,97,1,0.8)"; (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.1)"; (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.7)"; }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>

                <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(241,97,1,0.2)", borderRadius: "999px", padding: "4px 12px", marginBottom: "12px" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#F16101", display: "inline-block", boxShadow: "0 0 6px #F16101" }}/>
                  <span style={{ fontSize: "10px", fontWeight: 800, color: "#ffb480", textTransform: "uppercase", letterSpacing: "1.2px" }}>{eventSlide.badge || "Upcoming Event"}</span>
                </div>
                <h2 style={{ color: "#ffffff", fontSize: "22px", fontWeight: 900, margin: "0 0 6px", lineHeight: 1.2, letterSpacing: "-0.3px" }}>{eventSlide.title}</h2>
                {eventSlide.dateLocation && (
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.55)", fontWeight: 600 }}>{eventSlide.dateLocation}</span>
                  </div>
                )}
              </div>

              {/* Form body */}
              <div style={{ padding: "28px" }}>
                {eventFormStatus === "success" ? (
                  <div style={{ textAlign: "center", padding: "20px 0", animation: "eoeEventSlideIn 0.4s ease both" }}>
                    <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <h3 style={{ fontSize: "18px", fontWeight: 900, color: "#022C45", margin: "0 0 8px" }}>Spot Reserved! 🎉</h3>
                    <p style={{ fontSize: "14px", color: "#6B7280", margin: "0 0 20px", lineHeight: 1.6 }}>{eventFormMsg}</p>
                    <button
                      onClick={() => setEventModalOpen(false)}
                      style={{ padding: "10px 24px", borderRadius: "8px", background: "#022C45", color: "#fff", fontWeight: 700, fontSize: "13px", border: "none", cursor: "pointer", fontFamily: "inherit" }}
                    >Close</button>
                  </div>
                ) : (
                  <>
                    <p style={{ fontSize: "14px", color: "#6B7280", margin: "0 0 20px", lineHeight: 1.6 }}>
                      Reserve your free spot. Our team will send you the joining details before the event.
                    </p>

                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        setEventFormStatus("loading");
                        try {
                          const res  = await fetch("/api/contact", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                              type:    "student",
                              name:    eventForm.name,
                              phone:   eventForm.phone,
                              email:   eventForm.email,
                              message: `Event Registration: ${eventSlide.title} — ${eventSlide.dateLocation}`,
                            }),
                          });
                          const data = await res.json();
                          if (data.success) {
                            setEventFormStatus("success");
                            setEventFormMsg("We have received your registration. Our team will reach out with event details shortly.");
                          } else {
                            setEventFormStatus("error");
                            setEventFormMsg(data.message || "Something went wrong. Please try again.");
                          }
                        } catch {
                          setEventFormStatus("error");
                          setEventFormMsg("Network error. Please try again.");
                        }
                      }}
                      style={{ display: "flex", flexDirection: "column", gap: "14px" }}
                    >
                      <div>
                        <label style={{ fontSize: "11px", fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.8px", display: "block", marginBottom: "6px" }}>Full Name *</label>
                        <input
                          type="text" required placeholder="Rahul Sharma"
                          value={eventForm.name}
                          onChange={e => setEventForm(f => ({ ...f, name: e.target.value }))}
                          style={{ width: "100%", padding: "11px 14px", border: "1.5px solid rgba(2,44,69,0.1)", borderRadius: "10px", background: "#F9FAFB", fontSize: "14px", color: "#022C45", outline: "none", fontFamily: "inherit", boxSizing: "border-box", transition: "border-color 0.2s" }}
                          onFocus={e => (e.target as HTMLInputElement).style.borderColor = "#F16101"}
                          onBlur={e  => (e.target as HTMLInputElement).style.borderColor = "rgba(2,44,69,0.1)"}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: "11px", fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.8px", display: "block", marginBottom: "6px" }}>Phone Number *</label>
                        <input
                          type="tel" required placeholder="+91 98765 43210"
                          value={eventForm.phone}
                          onChange={e => setEventForm(f => ({ ...f, phone: e.target.value }))}
                          style={{ width: "100%", padding: "11px 14px", border: "1.5px solid rgba(2,44,69,0.1)", borderRadius: "10px", background: "#F9FAFB", fontSize: "14px", color: "#022C45", outline: "none", fontFamily: "inherit", boxSizing: "border-box", transition: "border-color 0.2s" }}
                          onFocus={e => (e.target as HTMLInputElement).style.borderColor = "#F16101"}
                          onBlur={e  => (e.target as HTMLInputElement).style.borderColor = "rgba(2,44,69,0.1)"}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: "11px", fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.8px", display: "block", marginBottom: "6px" }}>Email Address *</label>
                        <input
                          type="email" required placeholder="rahul@example.com"
                          value={eventForm.email}
                          onChange={e => setEventForm(f => ({ ...f, email: e.target.value }))}
                          style={{ width: "100%", padding: "11px 14px", border: "1.5px solid rgba(2,44,69,0.1)", borderRadius: "10px", background: "#F9FAFB", fontSize: "14px", color: "#022C45", outline: "none", fontFamily: "inherit", boxSizing: "border-box", transition: "border-color 0.2s" }}
                          onFocus={e => (e.target as HTMLInputElement).style.borderColor = "#F16101"}
                          onBlur={e  => (e.target as HTMLInputElement).style.borderColor = "rgba(2,44,69,0.1)"}
                        />
                      </div>

                      {eventFormStatus === "error" && (
                        <div style={{ padding: "10px 14px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "8px" }}>
                          <p style={{ margin: 0, fontSize: "13px", color: "#dc2626", fontWeight: 600 }}>⚠ {eventFormMsg}</p>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={eventFormStatus === "loading"}
                        style={{
                          width: "100%", padding: "15px", borderRadius: "12px",
                          background: eventFormStatus === "loading" ? "#9CA3AF" : "#F16101",
                          color: "#fff", fontSize: "14px", fontWeight: 800,
                          textTransform: "uppercase", letterSpacing: "1px",
                          border: "none", cursor: eventFormStatus === "loading" ? "not-allowed" : "pointer",
                          fontFamily: "inherit",
                          boxShadow: eventFormStatus === "loading" ? "none" : "0 8px 20px rgba(241,97,1,0.25)",
                          transition: "transform 0.2s",
                        }}
                        onMouseEnter={e => { if (eventFormStatus !== "loading") (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; }}
                        onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"}
                      >
                        {eventFormStatus === "loading" ? "Reserving..." : "Reserve My Spot →"}
                      </button>

                      <p style={{ fontSize: "11px", color: "#9CA3AF", textAlign: "center", margin: 0 }}>
                        🔒 Free to attend. No spam, ever.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}