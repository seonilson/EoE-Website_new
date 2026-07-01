"use client";
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";

// ── Data ──────────────────────────────────────────────────────
const icefAccreditation = {
  title: "ICEF Accredited Agency",
  tagline: "The Gold Standard in Global Education",
  badge: "Global Recognition",
  icon: (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <path d="M8 11l3 3 5-5"/>
    </svg>
  )
};

const certifications = [
  {
    title: "British Council",
    tag: "UK Certified",
    desc: "Officially trained by the UK government's international organization.",
    accent: "#F16101",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>
      </svg>
    )
  },
  {
    title: "QEAC (PIER)",
    tag: "Aus Certified",
    desc: "Qualified Education Agent Counselor for the Australian framework.",
    accent: "#022C45",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    )
  },
  {
    title: "CCG Specialist",
    tag: "Canada Certified",
    desc: "Expert knowledge certified by the Canada Course for Education Agents.",
    accent: "#07CBEB",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3 7 7 1-5 5 1.5 7-6.5-4-6.5 4 1.5-7-5-5 7-1z"/>
      </svg>
    )
  },
  {
    title: "ISO 9001:2015",
    tag: "Global Standard",
    desc: "Internationally certified for exceptional quality management systems.",
    accent: "#C9A24D",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    )
  }
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

// ── ConnectedCerts (Desktop) ──────────────────────────────────
function ConnectedCerts({ inView }: { inView: boolean }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setDrawn(true), 300);
      return () => clearTimeout(t);
    }
  }, [inView]);

  const nodeColors = ["#F16101", "#022C45", "#07CBEB", "#C9A24D"];
  const nodePositions = [
    { cx: 112, cy: 80 },
    { cx: 370, cy: 35 },
    { cx: 630, cy: 35 },
    { cx: 888, cy: 80 },
  ];

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <style>{`
        @keyframes shimmer-sweep {
          0%   { transform: translateX(-120%) skewX(-18deg); }
          100% { transform: translateX(220%)  skewX(-18deg); }
        }
        @keyframes stamp-in {
          0%   { transform: scale(1.3); opacity: 0; }
          60%  { transform: scale(0.94); opacity: 1; }
          100% { transform: scale(1);   opacity: 1; }
        }
        .arc-card {
          transition: border-color 0.35s ease, background 0.35s ease, transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease;
        }
        .arc-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 60px rgba(2,44,69,0.10);
        }
        .arc-icon {
          transition: background 0.35s ease, color 0.35s ease, transform 0.35s cubic-bezier(0.22,1,0.36,1);
        }
        .arc-icon.active {
          animation: stamp-in 0.4s cubic-bezier(0.22,1,0.36,1) both;
        }
        .shimmer-layer {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          border-radius: 16px;
        }
        .shimmer-layer::after {
          content: '';
          position: absolute;
          top: -20%;
          left: 0;
          width: 45%;
          height: 140%;
          background: linear-gradient(
            105deg,
            transparent 0%,
            rgba(201,162,77,0.10) 40%,
            rgba(255,255,255,0.22) 50%,
            rgba(201,162,77,0.10) 60%,
            transparent 100%
          );
          transform: translateX(-120%) skewX(-18deg);
        }
        .arc-card:hover .shimmer-layer::after {
          animation: shimmer-sweep 0.7s cubic-bezier(0.4,0,0.2,1) both;
        }
      `}</style>

      {/* SVG Arc */}
      <svg
        viewBox="0 0 1000 140"
        style={{ width: "100%", display: "block", overflow: "visible" }}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="arcGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#F16101" stopOpacity="0.5"/>
            <stop offset="33%"  stopColor="#022C45" stopOpacity="0.5"/>
            <stop offset="66%"  stopColor="#07CBEB" stopOpacity="0.5"/>
            <stop offset="100%" stopColor="#C9A24D" stopOpacity="0.5"/>
          </linearGradient>
        </defs>

        {/* Main arc */}
        <path
          id="arcPath"
          d="M 112 80 C 200 10, 800 10, 888 80"
          fill="none"
          stroke="url(#arcGrad)"
          strokeWidth="1.5"
          strokeDasharray="1400"
          strokeDashoffset={drawn ? "0" : "1400"}
          style={{ transition: drawn ? "stroke-dashoffset 1.6s cubic-bezier(0.4,0,0.2,1)" : "none" }}
        />

        {/* Dashed secondary arc (depth) */}
        <path
          d="M 112 80 C 200 10, 800 10, 888 80"
          fill="none"
          stroke="rgba(2,44,69,0.06)"
          strokeWidth="6"
          strokeDasharray="1400"
          strokeDashoffset={drawn ? "0" : "1400"}
          style={{ transition: drawn ? "stroke-dashoffset 1.6s cubic-bezier(0.4,0,0.2,1)" : "none" }}
        />

        {/* Nodes */}
        {nodePositions.map(({ cx, cy }, i) => (
          <g key={i}
            style={{
              opacity: drawn ? 1 : 0,
              transition: `opacity 0.4s ease ${0.9 + i * 0.18}s`,
            }}
          >
            {/* Outer glow */}
            <circle cx={cx} cy={cy} r="22" fill={nodeColors[i]} opacity="0.08"/>
            {/* Main dot */}
            <circle
              cx={cx} cy={cy} r="13"
              fill={activeIndex === i ? nodeColors[i] : "#fff"}
              stroke={nodeColors[i]}
              strokeWidth="2"
              style={{ transition: "fill 0.3s ease" }}
            />
            {/* Inner dot */}
            <circle
              cx={cx} cy={cy} r="5"
              fill={activeIndex === i ? "#fff" : nodeColors[i]}
              style={{ transition: "fill 0.3s ease" }}
            />
            {/* Drop line */}
            <line
              x1={cx} y1={cy + 13}
              x2={cx} y2={132}
              stroke={nodeColors[i]}
              strokeWidth="1"
              strokeDasharray="4 3"
              opacity="0.25"
            />
          </g>
        ))}
      </svg>

      {/* Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "16px",
        marginTop: "-4px",
      }}>
        {certifications.map((cert, i) => (
          <div
            key={i}
            className="arc-card"
            onMouseEnter={() => setActiveIndex(i)}
            onMouseLeave={() => setActiveIndex(null)}
            style={{
              padding: "28px 22px 26px",
              borderRadius: "16px",
              border: `1.5px solid ${activeIndex === i ? cert.accent + "50" : "rgba(2,44,69,0.07)"}`,
              background: activeIndex === i
                ? `linear-gradient(160deg, ${cert.accent}07 0%, #fff 100%)`
                : "#fff",
              cursor: "default",
              opacity: drawn ? 1 : 0,
              transform: drawn
                ? (activeIndex === i ? "translateY(-6px)" : "translateY(0)")
                : "translateY(28px)",
              transition: `opacity 0.5s ease ${1.0 + i * 0.12}s, transform 0.5s cubic-bezier(0.22,1,0.36,1) ${1.0 + i * 0.12}s, border-color 0.35s ease, background 0.35s ease, box-shadow 0.35s ease`,
              boxShadow: activeIndex === i
                ? `0 20px 60px rgba(2,44,69,0.10), 0 0 0 0px ${cert.accent}30`
                : "0 1px 4px rgba(2,44,69,0.04)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Shimmer sweep overlay */}
            <div className="shimmer-layer"/>

            {/* Top accent bar */}
            <div style={{
              position: "absolute",
              top: 0, left: "20%", right: "20%",
              height: "2px",
              borderRadius: "0 0 4px 4px",
              background: cert.accent,
              opacity: activeIndex === i ? 1 : 0,
              transform: activeIndex === i ? "scaleX(1)" : "scaleX(0)",
              transition: "opacity 0.3s ease, transform 0.4s cubic-bezier(0.22,1,0.36,1)",
              transformOrigin: "center",
            }}/>

            {/* Icon box */}
            <div
              className={`arc-icon${activeIndex === i ? " active" : ""}`}
              style={{
                width: "52px", height: "52px",
                borderRadius: "14px",
                background: activeIndex === i ? cert.accent : `${cert.accent}12`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: activeIndex === i ? "#fff" : cert.accent,
                marginBottom: "20px",
                transform: activeIndex === i ? "scale(1.06) translateY(-2px)" : "scale(1)",
              }}
            >
              {cert.icon}
            </div>

            <span style={{
              fontSize: "11px",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "1px",
              color: cert.accent,
              display: "block",
              marginBottom: "8px",
            }}>
              {cert.tag}
            </span>

            <h4 style={{
              fontSize: "20px",
              fontWeight: 800,
              color: "#022C45",
              margin: "0 0 10px",
              letterSpacing: "-0.3px",
              lineHeight: 1.2,
            }}>
              {cert.title}
            </h4>

            <p style={{
              fontSize: "14px",
              color: "#6B7280",
              lineHeight: 1.6,
              margin: 0,
            }}>
              {cert.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── MobileCertList ────────────────────────────────────────────
function MobileCertList({ inView }: { inView: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      {certifications.map((cert, i) => (
        <div key={i} style={{
          display: "flex", gap: "16px", alignItems: "flex-start",
          padding: "20px",
          borderRadius: "14px",
          border: "1px solid rgba(2,44,69,0.08)",
          background: "#fff",
          opacity: inView ? 1 : 0,
          transform: inView ? "translateX(0)" : "translateX(-20px)",
          transition: `opacity 0.5s ease ${0.5 + i * 0.1}s, transform 0.5s cubic-bezier(0.22,1,0.36,1) ${0.5 + i * 0.1}s`,
        }}>
          <div style={{
            width: "44px", height: "44px", flexShrink: 0,
            borderRadius: "12px",
            background: cert.accent,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff",
          }}>
            {cert.icon}
          </div>
          <div>
            <span style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "1px", textTransform: "uppercase", color: cert.accent, display: "block", marginBottom: "4px" }}>{cert.tag}</span>
            <h4 style={{ fontSize: "16px", fontWeight: 800, color: "#022C45", margin: "0 0 6px", letterSpacing: "-0.2px" }}>{cert.title}</h4>
            <p style={{ fontSize: "14px", color: "#6B7280", lineHeight: 1.6, margin: 0 }}>{cert.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
export default function Accreditations() {
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
      padding: isMobile ? "56px 0" : "120px 0",
      background: "#ffffff",
      position: "relative",
      overflow: "hidden",
    }}>
      <style>{`
        @keyframes accFadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ── Decorative Background Grid ── */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: `
          linear-gradient(rgba(2,44,69,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(2,44,69,0.025) 1px, transparent 1px)
        `,
        backgroundSize: "64px 64px",
      }}/>
      <div style={{
        position: "absolute", top: "0", left: "50%", transform: "translateX(-50%)",
        width: "800px", height: "600px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(201,162,77,0.03) 0%, transparent 60%)",
        pointerEvents: "none", zIndex: 0,
      }}/>

      <div
        ref={ref}
        style={{
          maxWidth: "1280px", margin: "0 auto",
          padding: isMobile ? "0 16px" : "0 24px", position: "relative", zIndex: 1,
        }}
      >

        {/* ── SECTION HEADER ── */}
        <div style={{
          display: "flex",
          justifyContent: isMobile ? "flex-start" : "space-between",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "flex-end",
          flexWrap: "wrap", gap: isMobile ? "16px" : "24px",
          marginBottom: isMobile ? "28px" : "80px",
          animation: inView ? "accFadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both" : "none",
        }}>
          <div style={{ maxWidth: "620px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "9px", marginBottom: "16px" }}>
              <div style={{ width: "30px", height: "2px", borderRadius: "1px", background: "linear-gradient(90deg, #F16101, #C9A24D)" }}/>
              <span style={{
                fontSize: "11px", fontWeight: 800,
                letterSpacing: "2.5px", textTransform: "uppercase",
                background: "linear-gradient(90deg, #F16101, #C9A24D)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                Trust & Compliance
              </span>
            </div>

            <h2 style={{
              fontSize: "clamp(32px, 4vw, 44px)",
              fontWeight: 900, color: "#022C45",
              lineHeight: 1.1, letterSpacing: "-0.8px",
              margin: "0 0 16px",
            }}>
              Certified Excellence,<br/>
              <span style={{
                position: "relative", display: "inline-block",
                background: "linear-gradient(100deg, #F16101 0%, #C9A24D 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                Proven Trust
                <svg style={{ position: "absolute", bottom: "-6px", left: 0, width: "100%" }} height="5" viewBox="0 0 300 5" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="ulineAcc" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#F16101"/>
                      <stop offset="100%" stopColor="#C9A24D"/>
                    </linearGradient>
                  </defs>
                  <path d="M0,3 Q75,0 150,3 Q225,7 300,3" stroke="url(#ulineAcc)" strokeWidth="3" fill="none" strokeLinecap="round"/>
                </svg>
              </span>
            </h2>

            <p style={{
              fontSize: "16px", color: "#6B7280",
              lineHeight: 1.6, margin: "0", marginTop: "24px", maxWidth: "600px",
            }}>
              Recognized internationally for maintaining the highest standards of professional conduct, integrity, and ethical practices in global student counseling.
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", paddingBottom: isMobile ? "0" : "8px" }}>
            <Link
              href="/about/certifications"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                color: linkH ? "#F16101" : "#022C45",
                fontSize: "13.5px", fontWeight: 800, textTransform: "uppercase",
                letterSpacing: "0.8px", textDecoration: "none",
                transition: "color 0.3s ease",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={() => setLinkH(true)}
              onMouseLeave={() => setLinkH(false)}
            >
              View All Awards
              <span style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: "28px", height: "28px", borderRadius: "50%",
                background: linkH ? "rgba(241,97,1,0.1)" : "rgba(2,44,69,0.05)",
                transition: "all 0.3s ease"
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: linkH ? "translateX(2px)" : "translateX(0)", transition: "transform 0.3s ease" }}>
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </span>
            </Link>
          </div>
        </div>

        {/* ── ICEF HERO: Sleek Row ── */}
        <style>{`
          @keyframes sealSpin    { to { transform: rotate(360deg); } }
          @keyframes sealSpinRev { to { transform: rotate(-360deg); } }
          .icef-seal-r1 { animation: sealSpin    28s linear infinite; transform-origin: 44px 44px; }
          .icef-seal-r2 { animation: sealSpinRev 18s linear infinite; transform-origin: 44px 44px; }
        `}</style>

        <div style={{
          display: "flex",
          alignItems: isMobile ? "flex-start" : "center",
          flexWrap: "wrap",
          gap: isMobile ? "16px" : "24px",
          marginBottom: isMobile ? "32px" : "72px",
          padding: isMobile ? "20px 16px" : "24px 32px",
          borderRadius: "16px",
          border: "1px solid rgba(2,44,69,0.08)",
          background: "rgba(2,44,69,0.015)",
          animation: inView ? "accFadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.2s both" : "none",
        }}>

          {/* Small animated seal */}
          {(() => {
            const sealSize = isMobile ? 64 : 88;
            const shieldSize = isMobile ? 20 : 28;
            return (
              <div style={{ position: "relative", width: sealSize, height: sealSize, flexShrink: 0 }}>
                {/* SVG fills the container exactly */}
                <svg width={sealSize} height={sealSize} viewBox="0 0 88 88" style={{ display: "block" }}>
                  <g className="icef-seal-r1">
                    {Array.from({ length: 24 }).map((_, i) => {
                      const a = (i / 24) * 2 * Math.PI;
                      return <line key={i}
                        x1={(44 + 38 * Math.cos(a)).toFixed(4)}
                        y1={(44 + 38 * Math.sin(a)).toFixed(4)}
                        x2={(44 + 42 * Math.cos(a)).toFixed(4)}
                        y2={(44 + 42 * Math.sin(a)).toFixed(4)}
                        stroke="rgba(241,97,1,0.35)" strokeWidth="1.2" strokeLinecap="round"
                      />;
                    })}
                    <circle cx="44" cy="44" r="36" fill="none" stroke="rgba(241,97,1,0.12)" strokeWidth="0.5"/>
                  </g>
                  <g className="icef-seal-r2">
                    <circle cx="44" cy="44" r="30" fill="none"
                      stroke="rgba(241,97,1,0.18)" strokeWidth="0.8"
                      strokeDasharray="3 5"
                    />
                  </g>
                  <circle cx="44" cy="44" r="24" fill="rgba(241,97,1,0.06)" stroke="rgba(241,97,1,0.25)" strokeWidth="1"/>
                </svg>
                {/* Shield icon — absolutely centred over the SVG */}
                <div style={{
                  position: "absolute",
                  top: 0, left: 0,
                  width: sealSize, height: sealSize,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#F16101",
                }}>
                  <svg width={shieldSize} height={shieldSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    <path d="M8 11l3 3 5-5"/>
                  </svg>
                </div>
              </div>
            );
          })()}

          {/* Thin divider — hidden on mobile */}
          {!isMobile && <div style={{
            width: "1px", height: "52px", flexShrink: 0,
            background: "linear-gradient(180deg, transparent, rgba(2,44,69,0.12), transparent)",
          }}/>}

          {/* Text */}
          <div style={{ flex: 1 }}>
            <span style={{
              fontSize: "11px", fontWeight: 800,
              letterSpacing: "2px", textTransform: "uppercase",
              color: "#F16101", display: "block", marginBottom: "6px",
            }}>
              {icefAccreditation.badge}
            </span>
            <h3 style={{
              fontSize: "20px", fontWeight: 800,
              color: "#022C45", letterSpacing: "-0.3px",
              margin: "0 0 4px", lineHeight: 1.2,
            }}>
              {icefAccreditation.title}
            </h3>
            <p style={{
              fontSize: "14px", fontWeight: 500,
              color: "#F16101", margin: 0, opacity: 0.85,
            }}>
              {icefAccreditation.tagline}
            </p>
          </div>

          {/* Right: verified pill */}
          {!isMobile && <div style={{
            flexShrink: 0,
            display: "inline-flex", alignItems: "center", gap: "6px",
            padding: "7px 14px",
            borderRadius: "999px",
            border: "1px solid rgba(241,97,1,0.2)",
            background: "rgba(241,97,1,0.05)",
          }}>
            <span style={{
              width: "16px", height: "16px", borderRadius: "50%",
              background: "rgba(241,97,1,0.15)",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#F16101" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </span>
            <span style={{
              fontSize: "11px", fontWeight: 800,
              letterSpacing: "1.5px", textTransform: "uppercase",
              color: "#F16101",
            }}>Verified</span>
          </div>}

        </div>

        {/* ── CERTIFICATIONS ── */}
        <div style={{
          opacity: inView ? 1 : 0,
          transition: "opacity 0.6s ease 0.4s",
        }}>
          {isMobile
            ? <MobileCertList inView={inView} />
            : <ConnectedCerts inView={inView} />
          }
        </div>

      </div>
    </section>
  );
}