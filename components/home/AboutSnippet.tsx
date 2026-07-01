"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

// ── Intersection-observer hook ────────────────────────────────
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

// ── Animated counter ──────────────────────────────────────────
function Counter({ target }: { target: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const steps = 55;
        const inc = target / steps;
        let cur = 0;
        const t = setInterval(() => {
          cur += inc;
          if (cur >= target) { setCount(target); clearInterval(t); }
          else setCount(Math.floor(cur));
        }, 1600 / steps);
      }
    }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{count}</span>;
}

// ── Data ──────────────────────────────────────────────────────
const stats = [
  { num: 4000, suffix: "+", label: "Students Placed",       accent: "#F16101" },
  { num: 98,   suffix: "%", label: "Visa Success Rate",     accent: "#C9A24D" },
  { num: 10,   suffix: "+", label: "Years Experience",      accent: "#07CBEB" },
  { num: 33,   suffix: "+", label: "Destination Countries", accent: "#F16101" },
  { num: 100,  suffix: "+", label: "University Partners",   accent: "#C9A24D" },
];

const pillars = [
  {
    label: "B2C Student Counselling",
    desc: "Personalised guidance from shortlisting to visa approval.",
    delay: "0.2s",
    floatDelay: "0s",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
  },
  {
    label: "B2B Institutional Partnerships",
    desc: "Authorised recruitment partner for 100+ global universities.",
    delay: "0.4s",
    floatDelay: "1s",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2"/>
        <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
      </svg>
    ),
  },
  {
    label: "End-to-End Service Suite",
    desc: "Career mapping, SOP, visa, pre-departure — all under one roof.",
    delay: "0.6s",
    floatDelay: "2s",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
];

// ═══════════════════════════════════════════════════════════════
//  ABOUT SNIPPET
// ═══════════════════════════════════════════════════════════════
export default function AboutSnippet() {
  const { ref, inView } = useInView(0.12);
  const [linkH, setLinkH] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section style={{ position: "relative", background: "#ffffff", overflow: "hidden" }}>
      <style>{`
        @keyframes snipFadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes snipFadeLeft {
          from { opacity: 0; transform: translateX(-28px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes snipFadeRight {
          from { opacity: 0; transform: translateX(28px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes orbFloat {
          0%, 100% { transform: translateY(0px);   }
          50%      { transform: translateY(-18px);  }
        }
        @keyframes floatCard {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-10px); }
        }
        @keyframes imgBreathe {
          0%, 100% { transform: scale(1); }
          50%      { transform: scale(1.05); }
        }
        .b-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .b-card:hover {
          transform: translateX(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(2,44,69,0.12);
          border-color: rgba(241,97,1,0.4) !important;
          z-index: 10;
        }
        .b-card:hover .b-icon {
          background: #F16101 !important;
          color: white !important;
          border-color: #F16101 !important;
        }
        .b-card:hover .b-title {
          color: #F16101 !important;
        }

        /* ── MOBILE OVERRIDES (hover only) ── */
        @media (max-width: 767px) {
          .b-card:hover {
            transform: none !important;
          }
        }
      `}</style>

      {/* Background layers */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: `
          linear-gradient(rgba(2,44,69,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(2,44,69,0.04) 1px, transparent 1px)
        `,
        backgroundSize: "56px 56px",
      }}/>
      <div style={{
        position: "absolute", top: "-160px", left: "-120px",
        width: "580px", height: "580px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(241,97,1,0.06) 0%, transparent 65%)",
        animation: "orbFloat 10s ease-in-out infinite",
        zIndex: 0, pointerEvents: "none",
      }}/>
      <div style={{
        position: "absolute", bottom: "-120px", right: "-80px",
        width: "440px", height: "440px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(7,203,235,0.06) 0%, transparent 65%)",
        animation: "orbFloat 13s ease-in-out infinite 3s",
        zIndex: 0, pointerEvents: "none",
      }}/>

      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "1px", zIndex: 2,
        background: "linear-gradient(90deg, transparent 0%, rgba(241,97,1,0.2) 30%, rgba(201,162,77,0.2) 70%, transparent 100%)",
      }}/>

      <div
        ref={ref}
        style={{
          position: "relative", zIndex: 1, maxWidth: "1280px", margin: "0 auto",
          padding: isMobile ? "56px 20px 64px" : "88px 32px 96px",
        }}
      >

        {/* ── TOP ROW ── */}
        <div
          className="about-top-row"
          style={{
            display: "flex", gap: isMobile ? "24px" : "64px",
            alignItems: isMobile ? "flex-start" : "center",
            flexWrap: "wrap",
            marginBottom: isMobile ? "32px" : "72px",
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          {/* Left Column — Text & CTA */}
          <div style={{
            flex: isMobile ? "0 0 100%" : "1 1 440px",
            width: isMobile ? "100%" : undefined,
            display: "flex", flexDirection: "column",
            animation: inView ? "snipFadeLeft 0.65s cubic-bezier(0.22,1,0.36,1) both" : "none",
            opacity: inView ? 1 : 0,
          }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "9px", marginBottom: "24px" }}>
              <div style={{ width: "30px", height: "2px", borderRadius: "1px", background: "linear-gradient(90deg, #F16101, #C9A24D)" }}/>
              <span style={{ fontSize: "12px", fontWeight: 800, letterSpacing: "2.5px", textTransform: "uppercase", background: "linear-gradient(90deg, #F16101, #C9A24D)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                About Us
              </span>
            </div>

            <h2 style={{ fontSize: "clamp(32px, 3.8vw, 48px)", fontWeight: 900, color: "#022C45", lineHeight: 1.1, letterSpacing: "-0.8px", margin: "0 0 24px" }}>
              A Decade of Turning<br/>
              <span style={{ position: "relative", display: "inline-block", background: "linear-gradient(100deg, #F16101 0%, #C9A24D 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Ambitions Into Arrivals
                <svg style={{ position: "absolute", bottom: "-6px", left: 0, width: "100%" }} height="5" viewBox="0 0 300 5" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="uline" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#F16101"/>
                      <stop offset="100%" stopColor="#C9A24D"/>
                    </linearGradient>
                  </defs>
                  <path d="M0,3 Q75,0 150,3 Q225,7 300,3" stroke="url(#uline)" strokeWidth="3" fill="none" strokeLinecap="round"/>
                </svg>
              </span>
            </h2>

            <p style={{ fontSize: "clamp(15px, 1.5vw, 16.5px)", color: "#6B7280", lineHeight: 1.8, margin: "0 0 32px", maxWidth: "480px" }}>
              Founded in 2014 by progressive, highly educated leaders,{" "}
              <span style={{ color: "#022C45", fontWeight: 600 }}>Edification Overseas Education</span>{" "}
              delivers end-to-end study abroad solutions for both individual students and
              institutional partners — across 33+ countries with a record 98% visa success rate.
            </p>

            {/* ── SLEEK UNIFIED CTA BUTTON ── */}
            <Link
              href="/about/company-profile"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                color: linkH ? "#F16101" : "#022C45",
                fontSize: "13.5px", fontWeight: 800, textTransform: "uppercase",
                letterSpacing: "0.8px", textDecoration: "none",
                transition: "color 0.3s ease",
                alignSelf: "flex-start"
              }}
              onMouseEnter={() => setLinkH(true)}
              onMouseLeave={() => setLinkH(false)}
            >
              Our Company Profile
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

          {/* Right Column: Image + Pillar Cards */}
          <div
            className="about-right-col"
            style={{
              flex: "1 1 500px",
              position: "relative",
              minHeight: isMobile ? "unset" : "520px",
              display: "flex",
              alignItems: isMobile ? "flex-start" : "center",
              width: isMobile ? "100%" : undefined,
            }}
          >
            {isMobile ? (
              /* ── MOBILE: image then 3 separate pillar cards ── */
              <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "12px" }}>

                {/* Hero image — full-width, clean, no overlay text */}
                <div style={{
                  position: "relative", width: "100%", height: "220px",
                  borderRadius: "16px", overflow: "hidden",
                  boxShadow: "0 12px 32px rgba(2,44,69,0.15)",
                  animation: inView ? "snipFadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s both" : "none",
                }}>
                  <Image
                    src="/images/about-team.jpg"
                    alt="Edification Overseas counsellors guiding students abroad"
                    fill
                    style={{ objectFit: "cover", objectPosition: "center top" }}
                    sizes="100vw"
                  />
                  {/* Subtle bottom fade so it blends into the white background */}
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to bottom, transparent 60%, rgba(255,255,255,0.08) 100%)",
                  }}/>
                </div>

                {/* Pillar cards — 3 separate rows below the image */}
                {pillars.map((p, i) => (
                  <div
                    key={p.label}
                    style={{
                      display: "flex", alignItems: "center", gap: "14px",
                      padding: "14px 16px",
                      background: "#fff",
                      border: "1px solid rgba(2,44,69,0.08)",
                      borderRadius: "14px",
                      boxShadow: "0 2px 12px rgba(2,44,69,0.05)",
                      animation: inView ? `snipFadeUp 0.55s cubic-bezier(0.22,1,0.36,1) ${0.15 + i * 0.1}s both` : "none",
                    }}
                  >
                    <div style={{
                      width: "40px", height: "40px", borderRadius: "10px", flexShrink: 0,
                      background: "rgba(2,44,69,0.04)",
                      border: "1px solid rgba(2,44,69,0.08)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#022C45",
                    }}>
                      {p.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: 800, color: "#022C45", lineHeight: 1.3, marginBottom: "2px" }}>{p.label}</div>
                      <div style={{ fontSize: "12px", color: "#6B7280", lineHeight: 1.4 }}>{p.desc}</div>
                    </div>
                  </div>
                ))}

              </div>
            ) : (
              /* ── DESKTOP: original asymmetric layout ── */
              <>
                <div style={{ position: "absolute", right: 0, top: "20px", bottom: "20px", width: "65%", borderRadius: "24px", overflow: "hidden", boxShadow: "0 24px 64px rgba(2,44,69,0.15)", animation: inView ? "snipFadeRight 0.8s cubic-bezier(0.22,1,0.36,1) both" : "none", zIndex: 1 }}>
                  <div style={{ width: "100%", height: "100%", animation: "imgBreathe 16s ease-in-out infinite" }}>
                    <Image src="/images/about-team.jpg" alt="Edification Overseas counsellors guiding students abroad" fill style={{ objectFit: "cover", objectPosition: "center" }} sizes="(max-width: 768px) 100vw, 40vw" />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(2,44,69,0.5) 0%, transparent 100%)" }}/>
                  </div>
                </div>

                <div style={{ position: "relative", zIndex: 2, width: "60%", display: "flex", flexDirection: "column", gap: "20px" }}>
                  {pillars.map((p) => (
                    <div key={p.label} style={{ animation: inView ? `snipFadeLeft 0.6s cubic-bezier(0.22,1,0.36,1) ${p.delay} both` : "none" }}>
                      <div style={{ animation: `floatCard 6s ease-in-out infinite ${p.floatDelay}` }}>
                        <div className="b-card" style={{ display: "flex", alignItems: "flex-start", gap: "18px", background: "rgba(255,255,255,0.85)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.6)", padding: "22px", borderRadius: "16px", boxShadow: "0 12px 32px rgba(2,44,69,0.06)", cursor: "default" }}>
                          <div className="b-icon" style={{ width: "48px", height: "48px", borderRadius: "12px", flexShrink: 0, background: "rgba(2,44,69,0.04)", border: "1px solid rgba(2,44,69,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "#022C45", transition: "all 0.3s ease" }}>
                            {p.icon}
                          </div>
                          <div>
                            <h4 className="b-title" style={{ fontSize: "15px", fontWeight: 800, color: "#022C45", margin: "0 0 6px 0", transition: "color 0.3s ease" }}>{p.label}</h4>
                            <p style={{ fontSize: "13.5px", color: "#6B7280", margin: 0, lineHeight: 1.5 }}>{p.desc}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* ── STATS ANCHOR ── */}
        <div style={{
          animation: inView ? "snipFadeUp 0.65s cubic-bezier(0.22,1,0.36,1) 0.2s both" : "none",
          opacity: inView ? 1 : 0,
        }}>
          {isMobile ? (
            /* ── MOBILE STATS: 2-column card grid, generous spacing ── */
            <div>
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
                marginBottom: "12px",
              }}>
                {stats.slice(0, 4).map((s) => (
                  <div key={s.label} style={{
                    background: "#022C45",
                    borderRadius: "16px",
                    padding: "24px 16px 20px",
                    display: "flex", flexDirection: "column", alignItems: "center",
                    gap: "8px", textAlign: "center",
                    border: "1px solid rgba(255,255,255,0.06)",
                    boxShadow: "0 8px 24px rgba(2,44,69,0.18)",
                    position: "relative", overflow: "hidden",
                  }}>
                    {/* Subtle top accent line */}
                    <div style={{
                      position: "absolute", top: 0, left: "15%", right: "15%", height: "2px",
                      borderRadius: "0 0 4px 4px",
                      background: s.accent,
                      opacity: 0.7,
                    }}/>
                    <div style={{ fontSize: "34px", fontWeight: 900, color: "#fff", lineHeight: 1, letterSpacing: "-1px" }}>
                      <Counter target={s.num} />
                      <span style={{ color: s.accent }}>{s.suffix}</span>
                    </div>
                    <div style={{ fontSize: "10px", fontWeight: 700, color: "rgba(255,255,255,0.65)", letterSpacing: "0.8px", textTransform: "uppercase", lineHeight: 1.4 }}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
              {/* 5th stat — full width banner */}
              <div style={{
                background: "#022C45",
                borderRadius: "16px",
                padding: "20px 24px",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "12px",
                border: "1px solid rgba(255,255,255,0.06)",
                boxShadow: "0 8px 24px rgba(2,44,69,0.18)",
                position: "relative", overflow: "hidden",
              }}>
                <div style={{
                  position: "absolute", top: 0, left: "30%", right: "30%", height: "2px",
                  borderRadius: "0 0 4px 4px",
                  background: stats[4].accent, opacity: 0.7,
                }}/>
                <div style={{ fontSize: "36px", fontWeight: 900, color: "#fff", lineHeight: 1, letterSpacing: "-1px" }}>
                  <Counter target={stats[4].num} />
                  <span style={{ color: stats[4].accent }}>{stats[4].suffix}</span>
                </div>
                <div style={{ fontSize: "11px", fontWeight: 700, color: "rgba(255,255,255,0.65)", letterSpacing: "0.8px", textTransform: "uppercase", lineHeight: 1.4 }}>
                  {stats[4].label}
                </div>
              </div>
            </div>
          ) : (
            /* ── DESKTOP STATS: original 5-col navy bar ── */
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                borderRadius: "20px",
                overflow: "hidden",
                background: "#022C45",
                boxShadow: "0 32px 64px rgba(2,44,69,0.25)",
                border: "1px solid rgba(255,255,255,0.1)",
                position: "relative",
              }}
            >
              <div style={{
                position: "absolute", top: 0, left: "20%", right: "20%", height: "1px",
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                pointerEvents: "none"
              }}/>
              {stats.map((s, i) => (
                <StatCard key={s.label} s={s} isLast={i === stats.length - 1} isMobile={false} />
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Bottom border */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(2,44,69,0.08) 50%, transparent)",
        zIndex: 2,
      }}/>
    </section>
  );
}

// ── Dark Authority Stat card ─────────────────────────────────────────
function StatCard({ s, isLast, isMobile }: { s: typeof stats[0]; isLast: boolean; isMobile: boolean }) {
  const [h, setH] = useState(false);
  return (
    <div
      style={{
        padding: isMobile ? "24px 10px" : "36px 20px",
        background: h ? "rgba(255,255,255,0.03)" : "transparent",
        borderRight: !isLast ? "1px solid rgba(255,255,255,0.08)" : "none",
        borderBottom: isMobile ? "1px solid rgba(255,255,255,0.06)" : "none",
        display: "flex", flexDirection: "column", alignItems: "center", gap: isMobile ? "6px" : "10px",
        position: "relative", overflow: "hidden",
        transition: "all 0.3s ease", cursor: "default",
        textAlign: "center",
      }}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
    >
      {/* Dynamic Animated Bottom Neon Line */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: h ? "4px" : "0px",
        background: s.accent,
        transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
        boxShadow: h ? `0 0 20px ${s.accent}` : "none",
      }}/>

      {/* Number */}
      <div style={{
        fontSize: isMobile ? "clamp(22px, 5vw, 30px)" : "clamp(32px, 3.2vw, 44px)",
        fontWeight: 900,
        color: "white",
        lineHeight: 1, letterSpacing: "-1px",
        textShadow: h ? `0 0 24px rgba(255,255,255,0.4)` : "none",
        transition: "text-shadow 0.3s ease",
        position: "relative", zIndex: 2
      }}>
        <Counter target={s.num} />
        <span style={{ color: s.accent }}>{s.suffix}</span>
      </div>

      {/* Label */}
      <div style={{
        fontSize: isMobile ? "9px" : "12px", fontWeight: 700,
        color: h ? "white" : "rgba(255,255,255,0.6)",
        letterSpacing: isMobile ? "0.5px" : "1px", lineHeight: 1.4,
        textTransform: "uppercase",
        transition: "color 0.3s ease",
        position: "relative", zIndex: 2
      }}>
        {s.label}
      </div>

      {/* Ambient center pulse glow behind the text */}
      {h && (
        <div style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          width: "120px", height: "120px", borderRadius: "50%",
          background: `radial-gradient(circle, ${s.accent}25 0%, transparent 70%)`,
          pointerEvents: "none",
          zIndex: 0
        }}/>
      )}
    </div>
  );
}