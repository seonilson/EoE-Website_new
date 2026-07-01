"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// ── useInView ─────────────────────────────────────────────────
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

// ── Section Wrapper ───────────────────────────────────────────
function Section({ children, bg = "#ffffff", style = {} }: { children: React.ReactNode; bg?: string; style?: React.CSSProperties }) {
  return (
    <section style={{ background: bg, position: "relative", overflow: "hidden", ...style }}>
      {children}
    </section>
  );
}

// ── Eyebrow ───────────────────────────────────────────────────
function Eyebrow({ label, isLight = false }: { label: string, isLight?: boolean }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "9px", marginBottom: "16px" }}>
      <div style={{ width: "30px", height: "2px", borderRadius: "1px", background: "linear-gradient(90deg, #F16101, #C9A24D)" }}/>
      <span style={{
        fontSize: "11px", fontWeight: 800, letterSpacing: "2.5px", textTransform: "uppercase",
        background: isLight ? "linear-gradient(90deg, #F16101, #C9A24D)" : "linear-gradient(90deg, #F16101, #C9A24D)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
      }}>{label}</span>
    </div>
  );
}

// ── Data: 36 Event Photos dynamically generated ───────────────
const eventData = Array.from({ length: 36 }, (_, i) => ({
  id: i + 1,
  type: "image",
  category: "Events",
  title: `Global Event ${i + 1}`,
  desc: "Edification Overseas Seminars",
  src: `/images/gallery/event/${i + 1}.jpg`
}));

// ═══════════════════════════════════════════════════════════════
//  EVENT PHOTOS PAGE
// ═══════════════════════════════════════════════════════════════
export default function EventPhotosPage() {
  const heroRef = useInView(0.1);
  const galleryRef = useInView(0.05);
  const ctaRef = useInView(0.1);

  // Lightbox Modal State
  const [activeMedia, setActiveMedia] = useState<{ src: string } | null>(null);

  // Disable background scrolling when modal is open
  useEffect(() => {
    if (activeMedia) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [activeMedia]);

  return (
    <main style={{ background: "#F9FAFB", overflowX: "hidden", minHeight: "100vh" }}>
      <style>{`
        /* Core Animations */
        @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        @keyframes float1 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
        @keyframes float2 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(12px); } }
        @keyframes glowPulseCyan { 0%, 100% { filter: drop-shadow(0 0 15px rgba(7,203,235,0.15)); } 50% { filter: drop-shadow(0 0 40px rgba(7,203,235,0.3)); } }

        /* Gallery Grid: Force 4 columns on large screens */
        .gallery-grid { 
          display: grid; 
          grid-template-columns: repeat(1, 1fr); 
          gap: 24px; 
        }
        @media (min-width: 640px) {
          .gallery-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .gallery-grid { grid-template-columns: repeat(4, 1fr); }
        }

        /* Gallery Card */
        .gallery-card {
          position: relative; border-radius: 20px; overflow: hidden; background: #022C45;
          aspect-ratio: 4/5; cursor: pointer; box-shadow: 0 12px 32px rgba(2,44,69,0.05);
          transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease;
        }

        .gallery-card:hover { transform: translateY(-8px); box-shadow: 0 24px 48px rgba(2,44,69,0.15); }
        
        .gallery-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.7s cubic-bezier(0.22,1,0.36,1); }
        .gallery-card:hover .gallery-img { transform: scale(1.05); }

        /* Overlay & Text */
        .card-overlay {
          position: absolute; inset: 0; background: linear-gradient(180deg, transparent 40%, rgba(2,44,69,0.95) 100%);
          opacity: 0; transition: opacity 0.4s ease; display: flex; flex-direction: column; justify-content: flex-end; padding: 24px; pointer-events: none;
        }
        .gallery-card:hover .card-overlay { opacity: 1; }
        
        .card-title { color: #ffffff; font-size: 20px; font-weight: 900; margin: 0 0 6px; transform: translateY(15px); transition: transform 0.4s cubic-bezier(0.22,1,0.36,1); }
        .card-desc { color: #07CBEB; font-size: 13.5px; font-weight: 700; margin: 0; transform: translateY(15px); transition: transform 0.4s cubic-bezier(0.22,1,0.36,1) 0.05s; }
        .gallery-card:hover .card-title, .gallery-card:hover .card-desc { transform: translateY(0); }

        .fallback-icon { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); opacity: 0.1; color: #ffffff; }
      `}</style>

      {/* ════════════════════════════════════════════════════════
          1. PREMIUM LIGHT HERO SECTION
      ════════════════════════════════════════════════════════ */}
      <Section bg="linear-gradient(105deg, #f4fbfc 0%, #e0f7fa 100%)" style={{ padding: "0", minHeight: "auto", display: "flex", alignItems: "center", paddingTop: "40px" }}>
        
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: `linear-gradient(rgba(7,203,235,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(7,203,235,0.1) 1px, transparent 1px)`, backgroundSize: "64px 64px" }}/>
        
        <div ref={heroRef.ref} style={{ maxWidth: "1280px", width: "100%", margin: "0 auto", padding: "20px 24px 80px", position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: "40px", flexWrap: "wrap" }}>
          
          {/* LEFT: SEO Text */}
          <div style={{ flex: "1 1 550px" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "rgba(255,255,255,0.6)", border: "1px solid rgba(7,203,235,0.3)",
              borderRadius: "999px", padding: "6px 16px", marginBottom: "24px",
              animation: heroRef.inView ? "fadeSlideUp 0.5s ease 0.1s both" : "none",
            }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#F16101", display: "inline-block", boxShadow: "0 0 10px rgba(241,97,1,0.5)" }}/>
              <span style={{ fontSize: "12px", fontWeight: 800, color: "#022C45", letterSpacing: "0.4px", textTransform: "uppercase" }}>
                Global Footprint
              </span>
            </div>

            <h1 style={{
              fontSize: "clamp(40px, 5vw, 64px)", fontWeight: 900, color: "#022C45", lineHeight: 1.1,
              letterSpacing: "-1px", marginBottom: "24px",
              animation: heroRef.inView ? "fadeSlideUp 0.55s ease 0.2s both" : "none",
            }}>
              Seminars &<br/>
              <span style={{ color: "#F16101", position: "relative", display: "inline-block" }}>
                Global Events.
                <svg aria-hidden="true" style={{ position: "absolute", bottom: "-14px", left: "-2%", width: "104%", overflow: "visible" }} height="8" viewBox="0 0 200 8" preserveAspectRatio="none">
                  <path d="M0,5 Q50,0 100,5 Q150,10 200,5" stroke="#F16101" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>

            <p style={{
              fontSize: "clamp(15px, 1.8vw, 17px)", color: "#4B5563", lineHeight: 1.7,
              marginBottom: "40px", maxWidth: "540px",
              animation: heroRef.inView ? "fadeSlideUp 0.55s ease 0.3s both" : "none",
            }}>
              Take a visual journey through our international education summits, university partner meetings, and local student seminars. Witness how we bridge the gap between students and global institutions.
            </p>
          </div>

          {/* RIGHT: Visual Image Container */}
          <div style={{ 
            flex: "1 1 450px", position: "relative", minHeight: "400px", 
            animation: heroRef.inView ? "scaleIn 0.8s cubic-bezier(0.22,1,0.36,1) 0.3s both" : "none",
            display: "flex", justifyContent: "center", alignItems: "center"
          }}>
            <div style={{ position: "absolute", width: "350px", height: "350px", background: "rgba(255,255,255,0.4)", borderRadius: "50%", animation: "glowPulseCyan 4s infinite" }} />
            
            <div style={{ 
              position: "relative", zIndex: 2, width: "100%", maxWidth: "380px", aspectRatio: "1/1", 
              borderRadius: "24px", overflow: "hidden", animation: "float1 6s infinite ease-in-out", 
              boxShadow: "0 24px 48px rgba(7,203,235,0.15)", border: "4px solid #ffffff" 
            }}>
               <Image 
                 src="/images/events-hero.png" 
                 alt="Edification Overseas Events" 
                 fill 
                 style={{ objectFit: "cover" }} 
                 priority
                 unoptimized
               />
            </div>

            {/* Floating Glass Badges */}
            <div style={{ position: "absolute", top: "20px", left: "-40px", zIndex: 3, animation: "float2 5s infinite" }}>
              <div style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,1)", padding: "12px 20px", borderRadius: "16px", display: "flex", alignItems: "center", gap: "10px", boxShadow: "0 16px 40px rgba(2,44,69,0.08)" }}>
                <span style={{ fontSize: "20px" }}>🏛️</span>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "10px", color: "#F16101", textTransform: "uppercase", fontWeight: 800 }}>Institutions</span>
                  <span style={{ fontSize: "14px", fontWeight: 900, color: "#022C45" }}>Global Seminars</span>
                </div>
              </div>
            </div>

            <div style={{ position: "absolute", bottom: "20px", right: "-30px", zIndex: 3, animation: "float1 7s infinite reverse" }}>
              <div style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,1)", padding: "12px 20px", borderRadius: "16px", display: "flex", alignItems: "center", gap: "10px", boxShadow: "0 16px 40px rgba(2,44,69,0.08)" }}>
                <span style={{ fontSize: "20px" }}>🤝</span>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "10px", color: "#F16101", textTransform: "uppercase", fontWeight: 800 }}>Community</span>
                  <span style={{ fontSize: "14px", fontWeight: 900, color: "#022C45" }}>Connecting Students</span>
                </div>
              </div>
            </div>

          </div>
        </div>
        
        {/* Deep Arch SVG connecting to the Gray Section */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, lineHeight: 0, zIndex: 1 }}>
          <svg viewBox="0 0 1440 120" style={{ display: "block", width: "100%", height: "60px" }} preserveAspectRatio="none">
            <path d="M0,120 C480,0 960,0 1440,120 L0,120 Z" fill="#F9FAFB"/>
          </svg>
        </div>
      </Section>

      {/* ════════════════════════════════════════════════════════
          2. EVENTS GALLERY GRID (36 Images)
      ════════════════════════════════════════════════════════ */}
      <Section bg="#F9FAFB" style={{ padding: "80px 0 100px" }}>
        <div ref={galleryRef.ref} style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
          
          <div style={{ textAlign: "center", marginBottom: "50px", animation: galleryRef.inView ? "fadeSlideUp 0.6s ease both" : "none" }}>
             <Eyebrow label="Event Highlights" />
             <h2 style={{ fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 900, color: "#022C45", margin: 0, letterSpacing: "-0.5px" }}>
              Our Past Events & Seminars
            </h2>
          </div>

          {/* Grid - Set to 4 Columns */}
          <div className="gallery-grid">
            {eventData.map((item, index) => (
              <div 
                key={item.id} 
                className="gallery-card"
                style={{
                  animation: galleryRef.inView ? `scaleIn 0.5s cubic-bezier(0.22,1,0.36,1) ${Math.min(index * 0.02, 0.5)}s both` : "none",
                }}
                onClick={() => setActiveMedia({ src: item.src })}
              >
                {/* Fallback Icon */}
                <svg className="fallback-icon" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>

                <Image 
                  src={item.src} 
                  alt={item.title} 
                  fill 
                  className="gallery-img" 
                  unoptimized 
                />

                {/* Dark Hover Overlay */}
                <div className="card-overlay">
                  <div style={{ display: "inline-block", background: "#F16101", color: "white", fontSize: "10px", fontWeight: 800, padding: "4px 8px", borderRadius: "4px", marginBottom: "8px", width: "fit-content", textTransform: "uppercase", letterSpacing: "1px" }}>
                    Events
                  </div>
                  <h4 className="card-title">{item.title}</h4>
                  <p className="card-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </Section>

      {/* ════════════════════════════════════════════════════════
          3. UNIFIED BOTTOM CTA BANNER 
      ════════════════════════════════════════════════════════ */}
      <Section bg="#ffffff" style={{ padding: "60px 0 100px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{
            background: "linear-gradient(135deg, #022C45 0%, #054f77 100%)",
            borderRadius: "24px", padding: "56px 64px",
            display: "flex", alignItems: "center", justifyContent: "space-between", gap: "40px", flexWrap: "wrap",
            position: "relative", overflow: "hidden",
            boxShadow: "0 24px 48px rgba(7,203,235,0.15)",
            animation: ctaRef.inView ? "scaleIn 0.6s cubic-bezier(0.22,1,0.36,1) both" : "none", opacity: ctaRef.inView ? 1 : 0
          }}>
            <div style={{ position: "absolute", right: "-80px", top: "-80px", width: "320px", height: "320px", borderRadius: "50%", background: "radial-gradient(circle, rgba(7,203,235,0.2) 0%, transparent 70%)", pointerEvents: "none" }}/>
            
            <div ref={ctaRef.ref} style={{ position: "relative", zIndex: 1, flex: "1 1 400px" }}>
              <h2 style={{ fontSize: "clamp(28px, 3.5vw, 36px)", fontWeight: 900, color: "white", letterSpacing: "-0.5px", margin: "0 0 16px" }}>
                Ready to Start Your Journey?
              </h2>
              <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.7)", margin: 0, lineHeight: 1.6, maxWidth: "480px" }}>
                Don't leave your visa to chance. Consult with our certified experts to ensure a flawless application and maximize your approval chances.
              </p>
            </div>

            <div style={{ display: "flex", gap: "16px", position: "relative", zIndex: 1 }}>
              <Link href="/book-consultation" style={{
                display: "inline-flex", alignItems: "center", gap: "10px", 
                background: "#c94e00", borderRadius: "12px", padding: "0 0 4px 0", textDecoration: "none", flexShrink: 0,
              }}>
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: "10px", padding: "16px 32px",
                  background: "#F16101", borderRadius: "12px", fontSize: "15px", fontWeight: 800,
                  color: "white", textTransform: "uppercase", letterSpacing: "0.5px", position: "relative",
                }}>
                  <span style={{ position: "absolute", top: 0, left: 0, right: 0, height: "45%", background: "linear-gradient(180deg,rgba(255,255,255,0.15),transparent)", borderRadius: "12px 12px 0 0", pointerEvents: "none" }}/>
                  Start Your Journey →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* ════════════════════════════════════════════════════════
          4. LIGHTBOX MODAL
      ════════════════════════════════════════════════════════ */}
      {activeMedia && (
        <div 
          style={{
            position: "fixed", inset: 0, zIndex: 99999, 
            background: "rgba(0, 0, 0, 0.92)", backdropFilter: "blur(8px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "24px", animation: "scaleIn 0.3s ease",
            cursor: "pointer" // Clicking background closes it
          }}
          onClick={() => setActiveMedia(null)}
        >
          {/* Close Button */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setActiveMedia(null);
            }}
            style={{
              position: "absolute", top: "24px", right: "24px",
              background: "rgba(255,255,255,0.1)", border: "none", color: "white",
              width: "48px", height: "48px", borderRadius: "50%", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "background 0.2s"
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
            onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>

          {/* Modal Content Container */}
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{ 
              position: "relative", width: "100%", maxWidth: "1000px", height: "100%", maxHeight: "85vh", 
              display: "flex", justifyContent: "center", alignItems: "center" 
            }}
          >
            <div style={{ position: "relative", width: "100%", height: "100%" }}>
              <Image 
                src={activeMedia.src} 
                alt="Event Full View" 
                fill 
                style={{ objectFit: "contain" }} 
                unoptimized 
              />
            </div>
          </div>
        </div>
      )}

    </main>
  );
}