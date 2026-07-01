"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

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
function Counter({ target, suffix, prefix = "" }: { target: number; suffix: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const steps = 60;
        const inc = target / steps;
        let cur = 0;
        const t = setInterval(() => {
          cur += inc;
          if (cur >= target) { setCount(target); clearInterval(t); }
          else setCount(Math.floor(cur));
        }, 1800 / steps);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

// ── Data ──────────────────────────────────────────────────────
const pillars = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
    title: "B2C — Student Counselling",
    body: "Personalised one-on-one guidance from university shortlisting and application to visa filing and pre-departure orientation. Every student gets a dedicated advisor.",
    accent: "#F16101",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
        <line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/>
      </svg>
    ),
    title: "B2B — Institutional Partnerships",
    body: "We act as authorised recruitment partners for 100+ universities across 33+ countries, managing pipelines, agent training, marketing co-ops, and enrolment reporting.",
    accent: "#022C45",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/>
      </svg>
    ),
    title: "33+ Destination Countries",
    body: "From Canada, UK, USA and Australia to Germany, Singapore, Ireland, Hungary and beyond — our counsellors hold destination-specific expertise and active institutional MOUs.",
    accent: "#07CBEB",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: "End-to-End Service Delivery",
    body: "Career mapping → course selection → SOP & LOR drafting → application submission → visa documentation → IELTS/PTE prep → forex & insurance → airport assist.",
    accent: "#C9A24D",
  },
];

const services = [
  { label: "Career Counselling",        icon: "🎯" },
  { label: "University Shortlisting",   icon: "🏫" },
  { label: "SOP & LOR Drafting",        icon: "📝" },
  { label: "Application Management",   icon: "📋" },
  { label: "Visa Documentation",        icon: "🛂" },
  { label: "IELTS / PTE Coaching",      icon: "📚" },
  { label: "Scholarship Guidance",      icon: "🎓" },
  { label: "Pre-Departure Briefing",    icon: "✈️"  },
  { label: "Forex & Insurance",         icon: "💱" },
  { label: "University Partner Network",icon: "🤝" },
  { label: "Event & Fair Management",   icon: "📅" },
  { label: "Post-Landing Support",      icon: "🏠" },
];

const milestones = [
  { year: "2014", event: "Founded in Ahmedabad with a team of 4 and a vision to democratise study abroad." },
  { year: "2017", event: "Crossed 500 successful placements. Opened second counselling centre." },
  { year: "2019", event: "Signed first batch of institutional MOUs with UK and Canadian universities." },
  { year: "2021", event: "Launched B2B division. Onboarded 40+ sub-agent partners across India." },
  { year: "2023", event: "Now covering 33+ destination countries. Team grew to 50+ specialists." },
  { year: "2026", event: "4000+ students placed. Recognised as a top recruitment partner by 12 universities." },
];

const leadership = [
  {
    name: "Rajan",
    role: "Co-Founder & Principal Consultant",
    credentials: "MBA · Certified Education Counsellor · 10+ Yrs Experience",
    focus: "B2B Strategy · Institutional Partnerships · Leadership",
    initials: "R",
    color: "#022C45",
  },
  {
    name: "Co-Founder",
    role: "Principal Consultant",
    credentials: "MBA · AIRC Certified · International Admissions Expert",
    focus: "B2C Counselling · Student Success · University Relations",
    initials: "C",
    color: "#F16101",
  },
];

// ── Service Chip ──────────────────────────────────────────────
function ServiceChip({ label, icon }: { label: string; icon: string }) {
  const [h, setH] = useState(false);
  return (
    <div
      style={{
        display: "inline-flex", alignItems: "center", gap: "8px",
        background: h ? "rgba(241,97,1,0.06)" : "rgba(2,44,69,0.03)",
        border: `1px solid ${h ? "rgba(241,97,1,0.25)" : "rgba(2,44,69,0.08)"}`,
        borderRadius: "10px", padding: "9px 14px",
        transition: "all 0.2s ease", cursor: "default",
        transform: h ? "translateY(-2px)" : "translateY(0)",
      }}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
    >
      <span style={{ fontSize: "15px" }}>{icon}</span>
      <span style={{
        fontSize: "12.5px", fontWeight: 700,
        color: h ? "#F16101" : "#022C45",
        transition: "color 0.2s", letterSpacing: "0.2px",
      }}>{label}</span>
    </div>
  );
}

// ── Pillar Card ───────────────────────────────────────────────
function PillarCard({ p, delay }: { p: typeof pillars[0]; delay: number }) {
  const [h, setH] = useState(false);
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      style={{
        background: h ? "#ffffff" : "rgba(255,255,255,0.7)",
        border: `1px solid ${h ? p.accent + "33" : "rgba(0,0,0,0.05)"}`,
        borderRadius: "18px", padding: "28px 24px",
        boxShadow: h ? `0 12px 32px ${p.accent}18` : "0 2px 12px rgba(0,0,0,0.03)",
        transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
        transform: inView
          ? h ? "translateY(-4px)" : "translateY(0)"
          : "translateY(20px)",
        opacity: inView ? 1 : 0,
        transitionDelay: `${delay}ms`,
        cursor: "default",
        position: "relative", overflow: "hidden",
      }}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
    >
      {/* Top accent line */}
      <div style={{
        position: "absolute", top: 0, left: "24px", right: "24px", height: "2px",
        background: h ? p.accent : "transparent",
        borderRadius: "0 0 2px 2px",
        transition: "background 0.25s",
      }}/>

      <div style={{
        width: "48px", height: "48px", borderRadius: "14px",
        background: `${p.accent}12`,
        border: `1px solid ${p.accent}22`,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: p.accent, marginBottom: "16px",
        transition: "background 0.2s",
      }}>
        {p.icon}
      </div>

      <div style={{
        fontSize: "14px", fontWeight: 800, color: "#022C45",
        marginBottom: "10px", letterSpacing: "-0.1px", lineHeight: 1.3,
      }}>{p.title}</div>

      <div style={{
        fontSize: "13px", color: "#6B7280", lineHeight: 1.75,
      }}>{p.body}</div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  ABOUT SECTION
// ═══════════════════════════════════════════════════════════════
export default function AboutSection() {
  const { ref: headRef, inView: headIn } = useInView(0.2);
  const { ref: storyRef, inView: storyIn } = useInView(0.15);
  const { ref: timeRef, inView: timeIn } = useInView(0.1);
  const { ref: serviceRef, inView: serviceIn } = useInView(0.1);
  const { ref: leaderRef, inView: leaderIn } = useInView(0.15);

  return (
    <section style={{
      background: "linear-gradient(180deg, #f7f9fc 0%, #ffffff 50%, #f7f9fc 100%)",
      position: "relative", overflow: "hidden",
    }}>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeLeft {
          from { opacity: 0; transform: translateX(-24px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeRight {
          from { opacity: 0; transform: translateX(24px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.92); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes timelineDrop {
          from { height: 0; }
          to   { height: 100%; }
        }
        .about-chip-row { display: flex; flex-wrap: wrap; gap: 10px; }
      `}</style>

      {/* ── Subtle background grid ── */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: `
          linear-gradient(rgba(2,44,69,0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(2,44,69,0.02) 1px, transparent 1px)
        `,
        backgroundSize: "48px 48px",
      }}/>

      {/* ── Ambient glow ── */}
      <div style={{
        position: "absolute", top: "-80px", right: "-120px",
        width: "500px", height: "500px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(241,97,1,0.04) 0%, transparent 65%)",
        zIndex: 0, pointerEvents: "none",
      }}/>

      <div style={{ position: "relative", zIndex: 1 }}>

        {/* ══════════════════════════════════════════
            SECTION 1 — HEADLINE + PILLARS
        ══════════════════════════════════════════ */}
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "96px 24px 0" }}>

          {/* Section label + headline */}
          <div
            ref={headRef}
            style={{
              textAlign: "center", marginBottom: "60px",
              animation: headIn ? "fadeUp 0.6s ease both" : "none",
              opacity: headIn ? 1 : 0,
            }}
          >
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "rgba(241,97,1,0.07)",
              border: "1px solid rgba(241,97,1,0.18)",
              borderRadius: "999px", padding: "5px 16px",
              marginBottom: "20px",
            }}>
              <span style={{
                width: "6px", height: "6px", borderRadius: "50%",
                background: "#F16101", display: "inline-block",
              }}/>
              <span style={{ fontSize: "11.5px", fontWeight: 800, color: "#F16101", letterSpacing: "1px", textTransform: "uppercase" }}>
                About Us
              </span>
            </div>

            <h2 style={{
              fontSize: "clamp(28px, 4vw, 46px)", fontWeight: 900,
              color: "#022C45", lineHeight: 1.1, letterSpacing: "-0.5px",
              margin: "0 0 18px",
            }}>
              A Decade of Turning{" "}
              <span style={{
                color: "#F16101", position: "relative", display: "inline-block",
              }}>
                Ambitions
                <svg style={{ position: "absolute", bottom: "-6px", left: 0, width: "100%" }} height="5" viewBox="0 0 200 5" preserveAspectRatio="none">
                  <path d="M0,4 Q50,0 100,4 Q150,8 200,4" stroke="#C9813A" strokeWidth="3" fill="none" strokeLinecap="round"/>
                </svg>
              </span>
              {" "}Into Arrivals
            </h2>

            <p style={{
              fontSize: "clamp(15px, 1.6vw, 17px)", color: "#4A5568",
              lineHeight: 1.8, maxWidth: "640px", margin: "0 auto",
            }}>
              Edification Overseas Education is a full-spectrum study abroad consultancy serving
              both students and institutions. Founded in 2014 by highly educated, progressive
              leaders with real-world international experience — we have grown into one of India's
              most trusted names in overseas education.
            </p>
          </div>

          {/* ── 4 Pillar cards ── */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "16px",
            marginBottom: "80px",
          }}>
            {pillars.map((p, i) => (
              <PillarCard key={p.title} p={p} delay={i * 80}/>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════
            SECTION 2 — STORY + STATS SPLIT
        ══════════════════════════════════════════ */}
        <div style={{
          background: "#022C45",
          position: "relative", overflow: "hidden",
        }}>
          {/* Dark section grid */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}/>
          <div style={{
            position: "absolute", bottom: "-80px", left: "-80px",
            width: "400px", height: "400px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(241,97,1,0.08) 0%, transparent 65%)",
            pointerEvents: "none",
          }}/>

          <div
            ref={storyRef}
            style={{ maxWidth: "1280px", margin: "0 auto", padding: "80px 24px", position: "relative", zIndex: 1 }}
          >
            <div style={{ display: "flex", gap: "64px", alignItems: "center", flexWrap: "wrap" }}>

              {/* Left — story text */}
              <div style={{
                flex: "1 1 420px",
                animation: storyIn ? "fadeLeft 0.65s ease both" : "none",
                opacity: storyIn ? 1 : 0,
              }}>
                <div style={{
                  fontSize: "11px", fontWeight: 800, color: "#F16101",
                  letterSpacing: "1.8px", textTransform: "uppercase", marginBottom: "16px",
                }}>Our Story</div>

                <h3 style={{
                  fontSize: "clamp(22px, 2.8vw, 34px)", fontWeight: 900,
                  color: "#ffffff", lineHeight: 1.15, letterSpacing: "-0.3px",
                  marginBottom: "20px",
                }}>
                  Built on Expertise,<br/>
                  Driven by Outcomes
                </h3>

                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "14.5px", lineHeight: 1.85, marginBottom: "20px" }}>
                  We started with a simple belief: every student deserves honest, expert guidance —
                  not a sales pitch. Our founders, both post-graduates with international exposure,
                  identified a critical gap in the Indian market where counselling was transactional
                  and outcomes were never guaranteed.
                </p>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "14.5px", lineHeight: 1.85, marginBottom: "32px" }}>
                  Today, Edification Overseas serves two distinct segments with equal rigour —
                  individual students seeking personalised support, and educational institutions
                  seeking verified, high-quality recruitment partners. Our B2B division works
                  with universities across the UK, Canada, Australia, Europe and beyond,
                  managing agent pipelines, events, and enrolment data with institutional-grade
                  professionalism.
                </p>

                {/* Two USP badges */}
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  {[
                    { label: "AIRC Affiliated",         icon: "🏅" },
                    { label: "ISO Certified Process",    icon: "✅" },
                    { label: "IELTS Authorised Centre",  icon: "📘" },
                  ].map(b => (
                    <div key={b.label} style={{
                      display: "inline-flex", alignItems: "center", gap: "7px",
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "999px", padding: "6px 14px",
                      fontSize: "12px", fontWeight: 700, color: "rgba(255,255,255,0.8)",
                    }}>
                      <span>{b.icon}</span>{b.label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — stat grid */}
              <div style={{
                flex: "1 1 320px",
                animation: storyIn ? "fadeRight 0.65s ease 0.15s both" : "none",
                opacity: storyIn ? 1 : 0,
              }}>
                <div style={{
                  display: "grid", gridTemplateColumns: "1fr 1fr",
                  gap: "2px", borderRadius: "20px", overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}>
                  {[
                    { num: 4000, suffix: "+",  label: "Students Placed",     sub: "Across 33+ countries",      bg: "rgba(241,97,1,0.12)"     },
                    { num: 98,   suffix: "%",  label: "Visa Success Rate",    sub: "Consistently maintained",   bg: "rgba(255,255,255,0.04)"  },
                    { num: 10,   suffix: "+",  label: "Years of Excellence",  sub: "Since 2014",                bg: "rgba(255,255,255,0.04)"  },
                    { num: 100,  suffix: "+",  label: "University Partners",  sub: "Across 25 destinations",    bg: "rgba(7,203,235,0.08)"    },
                    { num: 50,   suffix: "+",  label: "Expert Team Members",  sub: "Certified counsellors",     bg: "rgba(255,255,255,0.04)"  },
                    { num: 40,   suffix: "+",  label: "B2B Agent Partners",   sub: "Pan-India network",         bg: "rgba(201,162,77,0.1)"    },
                  ].map((s, i) => (
                    <div key={s.label} style={{
                      background: s.bg,
                      padding: "24px 20px",
                      borderBottom: i < 4 ? "1px solid rgba(255,255,255,0.04)" : "none",
                      borderRight: i % 2 === 0 ? "1px solid rgba(255,255,255,0.04)" : "none",
                    }}>
                      <div style={{
                        fontSize: "28px", fontWeight: 900,
                        color: i === 0 ? "#F16101" : i === 3 ? "#07CBEB" : i === 5 ? "#C9A24D" : "white",
                        lineHeight: 1, marginBottom: "6px",
                      }}>
                        <Counter target={s.num} suffix={s.suffix}/>
                      </div>
                      <div style={{ fontSize: "12.5px", fontWeight: 700, color: "rgba(255,255,255,0.85)", marginBottom: "3px" }}>
                        {s.label}
                      </div>
                      <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)" }}>
                        {s.sub}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            SECTION 3 — END-TO-END SERVICES
        ══════════════════════════════════════════ */}
        <div
          ref={serviceRef}
          style={{ maxWidth: "1280px", margin: "0 auto", padding: "88px 24px" }}
        >
          <div style={{
            display: "flex", gap: "64px", alignItems: "flex-start", flexWrap: "wrap",
          }}>

            {/* Left sticky label */}
            <div style={{
              flex: "0 0 280px",
              animation: serviceIn ? "fadeLeft 0.6s ease both" : "none",
              opacity: serviceIn ? 1 : 0,
            }}>
              <div style={{
                fontSize: "11px", fontWeight: 800, color: "#F16101",
                letterSpacing: "1.8px", textTransform: "uppercase", marginBottom: "14px",
              }}>What We Do</div>

              <h3 style={{
                fontSize: "clamp(22px, 2.5vw, 32px)", fontWeight: 900,
                color: "#022C45", lineHeight: 1.15, letterSpacing: "-0.3px",
                marginBottom: "16px",
              }}>
                End-to-End<br/>Service Suite
              </h3>

              <p style={{ fontSize: "14px", color: "#6B7280", lineHeight: 1.8, marginBottom: "28px" }}>
                From your very first career conversation to the moment you land at your destination,
                we handle every step — so you never have to navigate the process alone.
              </p>

              <Link
                href="/services"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  background: "#F16101", color: "white",
                  padding: "13px 24px", borderRadius: "10px",
                  fontWeight: 800, fontSize: "13px", textDecoration: "none",
                  letterSpacing: "0.3px", textTransform: "uppercase",
                  boxShadow: "0 4px 14px rgba(241,97,1,0.3)",
                }}
              >
                Explore Services
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </Link>
            </div>

            {/* Right — service chips */}
            <div style={{
              flex: 1,
              animation: serviceIn ? "fadeRight 0.6s ease 0.15s both" : "none",
              opacity: serviceIn ? 1 : 0,
            }}>
              <div className="about-chip-row">
                {services.map(s => (
                  <ServiceChip key={s.label} label={s.label} icon={s.icon}/>
                ))}
              </div>

              {/* Flow diagram — a simple horizontal step strip */}
              <div style={{
                marginTop: "40px",
                background: "linear-gradient(135deg, rgba(2,44,69,0.03) 0%, rgba(241,97,1,0.03) 100%)",
                border: "1px solid rgba(2,44,69,0.06)",
                borderRadius: "16px", padding: "24px",
              }}>
                <div style={{
                  fontSize: "11px", fontWeight: 800, color: "rgba(2,44,69,0.4)",
                  letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: "18px",
                }}>Student Journey</div>

                <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "0" }}>
                  {[
                    { step: "01", label: "Career\nMapping"     },
                    { step: "02", label: "Course\nSelection"   },
                    { step: "03", label: "Application\n& SOP"  },
                    { step: "04", label: "Visa\nFiling"        },
                    { step: "05", label: "Pre-Departure\nPrep" },
                    { step: "06", label: "Arrival\nSupport"    },
                  ].map((item, i, arr) => (
                    <div key={item.step} style={{ display: "flex", alignItems: "center", flex: "1 1 auto" }}>
                      <div style={{ textAlign: "center", minWidth: "64px" }}>
                        <div style={{
                          width: "36px", height: "36px", borderRadius: "50%",
                          background: i === 0 ? "#F16101" : i === arr.length - 1 ? "#022C45" : "rgba(2,44,69,0.08)",
                          border: `2px solid ${i === 0 ? "#F16101" : i === arr.length - 1 ? "#022C45" : "rgba(2,44,69,0.12)"}`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          margin: "0 auto 8px",
                          fontSize: "11px", fontWeight: 900,
                          color: i === 0 || i === arr.length - 1 ? "white" : "#022C45",
                        }}>
                          {item.step}
                        </div>
                        <div style={{
                          fontSize: "10.5px", fontWeight: 700,
                          color: "#022C45", lineHeight: 1.3, whiteSpace: "pre-line",
                          textAlign: "center",
                        }}>{item.label}</div>
                      </div>
                      {i < arr.length - 1 && (
                        <div style={{
                          flex: 1, height: "2px",
                          background: "linear-gradient(90deg, rgba(241,97,1,0.3), rgba(2,44,69,0.12))",
                          margin: "0 4px", marginBottom: "24px",
                        }}/>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ══════════════════════════════════════════
            SECTION 4 — TIMELINE
        ══════════════════════════════════════════ */}
        <div style={{
          background: "linear-gradient(135deg, #f7f9fc 0%, #fff8f5 100%)",
          borderTop: "1px solid rgba(2,44,69,0.06)",
          borderBottom: "1px solid rgba(2,44,69,0.06)",
        }}>
          <div
            ref={timeRef}
            style={{ maxWidth: "1280px", margin: "0 auto", padding: "80px 24px" }}
          >
            <div style={{
              textAlign: "center", marginBottom: "52px",
              animation: timeIn ? "fadeUp 0.6s ease both" : "none",
              opacity: timeIn ? 1 : 0,
            }}>
              <div style={{
                fontSize: "11px", fontWeight: 800, color: "#F16101",
                letterSpacing: "1.8px", textTransform: "uppercase", marginBottom: "12px",
              }}>Our Journey</div>
              <h3 style={{
                fontSize: "clamp(22px, 2.8vw, 36px)", fontWeight: 900,
                color: "#022C45", lineHeight: 1.1, letterSpacing: "-0.3px", margin: 0,
              }}>10 Years of Milestones</h3>
            </div>

            {/* Timeline */}
            <div style={{ position: "relative", maxWidth: "860px", margin: "0 auto" }}>
              {/* Vertical spine */}
              <div style={{
                position: "absolute", left: "50%", top: 0, bottom: 0,
                width: "2px", transform: "translateX(-50%)",
                background: "linear-gradient(180deg, #F16101 0%, #022C45 100%)",
                opacity: timeIn ? 1 : 0,
                transition: "opacity 0.6s ease 0.3s",
              }}/>

              {milestones.map((m, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <div
                    key={m.year}
                    style={{
                      display: "flex",
                      justifyContent: isLeft ? "flex-start" : "flex-end",
                      marginBottom: "36px",
                      animation: timeIn ? `${isLeft ? "fadeLeft" : "fadeRight"} 0.55s ease ${0.1 + i * 0.1}s both` : "none",
                      opacity: timeIn ? 1 : 0,
                    }}
                  >
                    <div style={{
                      width: "calc(50% - 28px)",
                      background: "#ffffff",
                      border: "1px solid rgba(2,44,69,0.07)",
                      borderRadius: "14px", padding: "18px 20px",
                      boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                      position: "relative",
                    }}>
                      {/* Arrow pointing to spine */}
                      <div style={{
                        position: "absolute", top: "20px",
                        [isLeft ? "right" : "left"]: "-8px",
                        width: "14px", height: "14px",
                        background: "#ffffff",
                        border: `1px solid rgba(2,44,69,0.07)`,
                        transform: "rotate(45deg)",
                        borderRight: isLeft ? "none" : undefined,
                        borderTop: isLeft ? "none" : undefined,
                        borderLeft: !isLeft ? "none" : undefined,
                        borderBottom: !isLeft ? "none" : undefined,
                      }}/>

                      <div style={{
                        display: "inline-block",
                        background: i === milestones.length - 1 ? "rgba(241,97,1,0.1)" : "rgba(2,44,69,0.06)",
                        color: i === milestones.length - 1 ? "#F16101" : "#022C45",
                        fontSize: "12px", fontWeight: 900, padding: "3px 10px",
                        borderRadius: "999px", marginBottom: "8px", letterSpacing: "0.5px",
                      }}>{m.year}</div>

                      <p style={{
                        fontSize: "13.5px", color: "#4A5568",
                        lineHeight: 1.7, margin: 0,
                      }}>{m.event}</p>
                    </div>

                    {/* Centre dot */}
                    <div style={{
                      position: "absolute", left: "50%", top: "18px",
                      transform: "translateX(-50%)",
                      width: "14px", height: "14px", borderRadius: "50%",
                      background: i === milestones.length - 1 ? "#F16101" : "#022C45",
                      border: "3px solid #f7f9fc",
                      boxShadow: `0 0 0 2px ${i === milestones.length - 1 ? "#F16101" : "#022C45"}`,
                      zIndex: 2,
                    }}/>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            SECTION 5 — LEADERSHIP
        ══════════════════════════════════════════ */}
        <div
          ref={leaderRef}
          style={{ maxWidth: "1280px", margin: "0 auto", padding: "88px 24px 96px" }}
        >
          <div style={{
            textAlign: "center", marginBottom: "52px",
            animation: leaderIn ? "fadeUp 0.6s ease both" : "none",
            opacity: leaderIn ? 1 : 0,
          }}>
            <div style={{
              fontSize: "11px", fontWeight: 800, color: "#F16101",
              letterSpacing: "1.8px", textTransform: "uppercase", marginBottom: "12px",
            }}>Leadership</div>
            <h3 style={{
              fontSize: "clamp(22px, 2.8vw, 36px)", fontWeight: 900,
              color: "#022C45", lineHeight: 1.1, letterSpacing: "-0.3px", margin: 0,
            }}>
              Progressive Minds,<br/>Proven Results
            </h3>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "24px", maxWidth: "800px", margin: "0 auto",
          }}>
            {leadership.map((l, i) => (
              <div
                key={l.name}
                style={{
                  background: "#ffffff",
                  border: "1px solid rgba(2,44,69,0.07)",
                  borderRadius: "20px", padding: "32px 28px",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
                  animation: leaderIn ? `${i === 0 ? "fadeLeft" : "fadeRight"} 0.6s ease ${0.1 * i}s both` : "none",
                  opacity: leaderIn ? 1 : 0,
                  position: "relative", overflow: "hidden",
                }}
              >
                {/* Top accent */}
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: "3px",
                  background: `linear-gradient(90deg, ${l.color}, transparent)`,
                }}/>

                <div style={{ display: "flex", alignItems: "flex-start", gap: "18px", marginBottom: "20px" }}>
                  {/* Avatar */}
                  <div style={{
                    width: "60px", height: "60px", borderRadius: "16px",
                    background: `${l.color}15`,
                    border: `2px solid ${l.color}25`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "22px", fontWeight: 900, color: l.color,
                    flexShrink: 0,
                  }}>
                    {l.initials}
                  </div>

                  <div>
                    <div style={{ fontSize: "17px", fontWeight: 800, color: "#022C45", marginBottom: "4px" }}>
                      {l.name}
                    </div>
                    <div style={{ fontSize: "12.5px", fontWeight: 700, color: l.color, marginBottom: "6px" }}>
                      {l.role}
                    </div>
                    <div style={{ fontSize: "11.5px", color: "#6B7280" }}>
                      {l.credentials}
                    </div>
                  </div>
                </div>

                {/* Focus area */}
                <div style={{
                  background: `${l.color}08`,
                  border: `1px solid ${l.color}18`,
                  borderRadius: "10px", padding: "12px 16px",
                }}>
                  <div style={{
                    fontSize: "10.5px", fontWeight: 800, color: l.color,
                    letterSpacing: "1px", textTransform: "uppercase", marginBottom: "5px",
                  }}>Focus Areas</div>
                  <div style={{ fontSize: "13px", color: "#4A5568", fontWeight: 600 }}>
                    {l.focus}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA row */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: "16px", marginTop: "52px", flexWrap: "wrap",
            animation: leaderIn ? "fadeUp 0.6s ease 0.3s both" : "none",
            opacity: leaderIn ? 1 : 0,
          }}>
            <Link href="/about" style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "#022C45", color: "white",
              padding: "14px 28px", borderRadius: "12px",
              fontWeight: 800, fontSize: "13.5px", textDecoration: "none",
              letterSpacing: "0.3px", textTransform: "uppercase",
              boxShadow: "0 4px 16px rgba(2,44,69,0.2)",
              transition: "all 0.2s",
            }}>
              Meet Our Full Team
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </Link>
            <Link href="/contact" style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "transparent", color: "#F16101",
              border: "2px solid #F16101",
              padding: "13px 28px", borderRadius: "12px",
              fontWeight: 800, fontSize: "13.5px", textDecoration: "none",
              letterSpacing: "0.3px", textTransform: "uppercase",
              transition: "all 0.2s",
            }}>
              Book a Free Consultation
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}