"use client";
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

// ── Data ──────────────────────────────────────────────────────
const services = [
  {
    title: "Student Visa",
    tagline: "Study Anywhere. We Handle the Rest.",
    desc: "Expert guidance for study permits, ensuring a high success rate for your global university transition.",
    href: "/services/student",
    img: "/images/serv-student.jpg", 
    accent: "#F16101",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    ),
  },
  {
    title: "Business Visa",
    tagline: "Expand Borders. Build Empires.",
    desc: "Streamlined processing for entrepreneurs, investors, and professionals expanding their global footprint.",
    href: "/services/business",
    img: "/images/serv-business.jpg",
    accent: "#022C45",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
      </svg>
    ),
  },
  {
    title: "Visitor Visa",
    tagline: "See the World. Stress-Free.",
    desc: "Hassle-free tourist and visitor visas so you can explore international destinations with complete peace of mind.",
    href: "/services/visitor",
    img: "/images/serv-visitor.jpg",
    accent: "#07CBEB",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
  },
  {
    title: "Dependent Visa",
    tagline: "Keep Your Family Close.",
    desc: "Reunite with your loved ones swiftly with our dedicated spouse, child, and family visa assistance.",
    href: "/services/dependent",
    img: "/images/serv-dependent.jpg",
    accent: "#C9A24D",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    title: "Apostille & Translation",
    tagline: "Documents That Open Doors.",
    desc: "Fast, secure document legalization, MEA apostille, and certified translations for international applications.",
    href: "/services/apostille-translation",
    img: "/images/serv-apostille.jpg",
    accent: "#3B6D11",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
  },
  {
    title: "Accommodation & Forex",
    tagline: "Arrive Ready. Stay Comfortable.",
    desc: "Pre-departure support including verified student housing, travel insurance, and competitive foreign exchange.",
    href: "/services/accommodation-forex",
    img: "/images/serv-accommodation.jpg",
    accent: "#534AB7",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
];

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

// ── Service Card ──────────────────────────────────────────────
function ServiceCard({
  serv, index, inView,
}: {
  serv: typeof services[0];
  index: number;
  inView: boolean;
}) {
  const [h, setH] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <Link
      href={serv.href}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        textDecoration: "none",
        borderRadius: "20px",
        overflow: "hidden",
        background: "white",
        border: `1px solid ${h ? serv.accent + "40" : "rgba(2,44,69,0.08)"}`,
        boxShadow: h
          ? `0 20px 48px ${serv.accent}18, 0 4px 12px rgba(0,0,0,0.06)`
          : "0 2px 12px rgba(2,44,69,0.05)",
        transform: h ? "translateY(-6px)" : "translateY(0)",
        transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
        animation: inView
          ? `srvFadeUp 0.55s cubic-bezier(0.22,1,0.36,1) ${index * 0.08}s both`
          : "none",
        opacity: inView ? 1 : 0,
        position: "relative",
      }}
    >
      {/* ── Image area ── */}
      <div style={{
        position: "relative",
        height: "200px",
        overflow: "hidden",
        flexShrink: 0,
        background: "#f0f2f5",
      }}>
        <Image
          src={serv.img}
          alt={serv.title}
          fill
          sizes="(max-width:768px) 100vw, 33vw"
          style={{
            objectFit: "cover",
            transform: h ? "scale(1.07)" : "scale(1)",
            transition: "transform 0.7s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease",
            opacity: imgLoaded ? 1 : 0,
          }}
          onLoad={() => setImgLoaded(true)}
        />

        {/* Gradient overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(180deg, transparent 40%, ${serv.accent}22 100%)`,
          transition: "opacity 0.35s ease",
          opacity: h ? 1 : 0,
        }}/>
      </div>

      {/* ── Content area ── */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        padding: "24px",
        borderTop: `2px solid ${h ? serv.accent : "transparent"}`,
        transition: "border-color 0.35s ease",
      }}>

        {/* Icon + Title row */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: "14px", marginBottom: "10px" }}>
          <div style={{
            width: "44px", height: "44px", borderRadius: "12px",
            background: h ? serv.accent : `${serv.accent}12`,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: h ? "white" : serv.accent,
            flexShrink: 0,
            transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
            transform: h ? "rotate(-6deg) scale(1.08)" : "rotate(0deg) scale(1)",
          }}>
            {serv.icon}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontSize: "18px", fontWeight: 900,
              color: "#022C45", lineHeight: 1.15,
              letterSpacing: "-0.3px",
              transition: "color 0.2s",
            }}>
              {serv.title}
            </div>
            <div style={{
              fontSize: "12px", fontWeight: 600,
              color: serv.accent,
              marginTop: "3px", fontStyle: "italic",
              opacity: h ? 1 : 0.75,
              transition: "opacity 0.2s",
            }}>
              {serv.tagline}
            </div>
          </div>
        </div>

        {/* Description */}
        <p style={{
          fontSize: "13.5px", color: "#6B7280",
          lineHeight: 1.7, margin: "0 0 20px",
          flex: 1,
        }}>
          {serv.desc}
        </p>

        {/* CTA row */}
        <div style={{
          display: "flex", alignItems: "center",
          justifyContent: "space-between",
          paddingTop: "16px",
          borderTop: "1px solid rgba(2,44,69,0.06)",
        }}>
          <span style={{
            fontSize: "12px", fontWeight: 800,
            color: h ? serv.accent : "#9CA3AF",
            textTransform: "uppercase", letterSpacing: "0.8px",
            transition: "color 0.25s",
          }}>
            Learn More
          </span>

          {/* Animated arrow */}
          <div style={{
            width: "34px", height: "34px", borderRadius: "50%",
            background: h ? serv.accent : "rgba(2,44,69,0.05)",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
            transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
            transform: h ? "translateX(3px)" : "translateX(0)",
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke={h ? "white" : "#9CA3AF"}
              strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              style={{ transition: "stroke 0.3s" }}>
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ═══════════════════════════════════════════════════════════════
//  SERVICES SECTION
// ═══════════════════════════════════════════════════════════════
export default function Services() {
  const { ref, inView } = useInView();
  const [linkH, setLinkH] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section style={{
      padding: isMobile ? "56px 0 64px" : "108px 0 120px",
      background: "#F9FAFB",
      position: "relative",
      overflow: "hidden",
    }}>
      <style>{`
        @keyframes srvFadeUp {
          from { opacity: 0; transform: translateY(36px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes srvHeaderFade {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .srv-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        @media (min-width: 700px) {
          .srv-grid { grid-template-columns: repeat(2, 1fr); gap: 24px; }
        }
        @media (min-width: 1060px) {
          .srv-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 767px) {
          .srv-header { flex-direction: column !important; align-items: flex-start !important; margin-bottom: 32px !important; }
          .srv-cta-link { padding-bottom: 0 !important; }
          .srv-banner { flex-direction: column !important; padding: 28px 20px !important; gap: 20px !important; border-radius: 16px !important; }
          .srv-banner-btn { width: 100% !important; justify-content: center; }
          .srv-banner-btn span { width: 100% !important; justify-content: center !important; }
        }
      `}</style>

      {/* Background decoration */}
      <div style={{
        position: "absolute", top: "-80px", right: "-80px",
        width: "500px", height: "500px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(241,97,1,0.05) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }}/>
      <div style={{
        position: "absolute", bottom: "-100px", left: "-60px",
        width: "420px", height: "420px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(7,203,235,0.05) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }}/>

      <div
        ref={ref}
        style={{
          maxWidth: "1280px", margin: "0 auto",
          padding: isMobile ? "0 16px" : "0 24px", position: "relative", zIndex: 1,
        }}
      >

        {/* ── Section header ── */}
        <div className="srv-header" style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "flex-end", marginBottom: "56px",
          flexWrap: "wrap", gap: "16px",
          animation: inView
            ? "srvHeaderFade 0.6s cubic-bezier(0.22,1,0.36,1) both"
            : "none",
        }}>
          <div style={{ maxWidth: "620px" }}>

            {/* Eyebrow */}
            <div style={{
              display: "inline-flex", alignItems: "center",
              gap: "9px", marginBottom: "16px",
            }}>
              <div style={{
                width: "30px", height: "2px", borderRadius: "1px",
                background: "linear-gradient(90deg, #F16101, #C9A24D)",
              }}/>
              <span style={{
                fontSize: "11px", fontWeight: 800,
                letterSpacing: "2.5px", textTransform: "uppercase",
                background: "linear-gradient(90deg, #F16101, #C9A24D)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                Comprehensive Solutions
              </span>
            </div>

            <h2 style={{
              fontSize: "clamp(28px, 3.5vw, 44px)",
              fontWeight: 900, color: "#022C45",
              lineHeight: 1.1, letterSpacing: "-0.6px",
              margin: "0 0 16px",
            }}>
              Your Global Journey<br/>
              <span style={{
                position: "relative", display: "inline-block",
                background: "linear-gradient(100deg, #F16101 0%, #C9A24D 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                Starts Here
                <svg style={{
                  position: "absolute", bottom: "-6px",
                  left: 0, width: "100%",
                }} height="5" viewBox="0 0 300 5" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="ulineSrv" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#F16101"/>
                      <stop offset="100%" stopColor="#C9A24D"/>
                    </linearGradient>
                  </defs>
                  <path d="M0,3 Q75,0 150,3 Q225,7 300,3"
                    stroke="url(#ulineSrv)" strokeWidth="3"
                    fill="none" strokeLinecap="round"/>
                </svg>
              </span>
            </h2>

            <p style={{
              fontSize: "16px", color: "#6B7280",
              lineHeight: 1.6, margin: "0", marginTop: "24px", maxWidth: "600px",
            }}>
              From securing complex visa approvals to arranging your pre-departure currency and accommodation, we provide complete end-to-end support.
            </p>
          </div>

          {/* Consistent "Explore All" sleek button */}
          <div className="srv-cta-link" style={{ display: "flex", alignItems: "center", paddingBottom: "8px" }}>
            <Link 
              href="/services" 
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                color: linkH ? "#F16101" : "#022C45",
                fontSize: "13.5px", fontWeight: 800, textTransform: "uppercase",
                letterSpacing: "0.8px", textDecoration: "none",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={() => setLinkH(true)}
              onMouseLeave={() => setLinkH(false)}
            >
              Explore All Services
              <span style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: "28px", height: "28px", borderRadius: "50%",
                background: linkH ? "rgba(241,97,1,0.1)" : "rgba(2,44,69,0.05)",
                transition: "all 0.3s ease"
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: linkH ? "translateX(2px)" : "translateX(0)", transition: "transform 0.3s ease" }}>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </span>
            </Link>
          </div>
        </div>

        {/* ── Cards grid ── */}
        <div className="srv-grid">
          {services.map((serv, i) => (
            <ServiceCard
              key={serv.title}
              serv={serv}
              index={i}
              inView={inView}
            />
          ))}
        </div>

        {/* ── Bottom CTA banner ── */}
        <div className="srv-banner" style={{
          marginTop: isMobile ? "36px" : "56px",
          background: "linear-gradient(135deg, #022C45 0%, #034a72 60%, #022C45 100%)",
          borderRadius: "20px",
          padding: "40px 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "24px",
          flexWrap: "wrap",
          position: "relative",
          overflow: "hidden",
          animation: inView
            ? "srvHeaderFade 0.6s cubic-bezier(0.22,1,0.36,1) 0.5s both"
            : "none",
        }}>
          {/* Background orb */}
          <div style={{
            position: "absolute", right: "-60px", top: "-60px",
            width: "260px", height: "260px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(241,97,1,0.15) 0%, transparent 70%)",
            pointerEvents: "none",
          }}/>

          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{
              fontSize: "22px", fontWeight: 900,
              color: "white", letterSpacing: "-0.3px",
              marginBottom: "8px",
            }}>
              Not Sure Which Visa You Need?
            </div>
            <p style={{
              fontSize: "15px", color: "rgba(255,255,255,0.65)",
              margin: 0, lineHeight: 1.6,
            }}>
              Speak with an expert today — free 30-minute consultation, no obligation.
            </p>
          </div>

          <Link href="/book-consultation" className="srv-banner-btn" style={{
            display: "inline-flex", alignItems: "center", gap: "10px",
            position: "relative", zIndex: 1,
            background: "#c94e00", borderRadius: "12px",
            padding: "0 0 4px 0", textDecoration: "none", flexShrink: 0,
          }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              padding: "13px 28px",
              background: "#F16101", borderRadius: "12px",
              fontSize: "14px", fontWeight: 800,
              color: "white", textTransform: "uppercase",
              letterSpacing: "0.4px", position: "relative",
            }}>
              <span style={{
                position: "absolute", top: 0, left: 0, right: 0, height: "45%",
                background: "linear-gradient(180deg,rgba(255,255,255,0.15),transparent)",
                borderRadius: "12px 12px 0 0", pointerEvents: "none",
              }}/>
              Book Free Consultation →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}