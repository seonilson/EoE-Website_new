"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";

// ── Dummy Data (Replace paths with your actual logos) ─────────
// Ideal logo size: roughly 300x150px, transparent PNGs
const row1 = [
  { name: "University 1", src: "/images/universities/uni-1.png" },
  { name: "University 2", src: "/images/universities/uni-2.png" },
  { name: "University 3", src: "/images/universities/uni-3.png" },
  { name: "University 4", src: "/images/universities/uni-4.png" },
  { name: "University 5", src: "/images/universities/uni-5.png" },
  { name: "University 6", src: "/images/universities/uni-6.png" },
  { name: "University 7", src: "/images/universities/uni-7.png" },
  { name: "University 8", src: "/images/universities/uni-8.png" },
  { name: "University 8", src: "/images/universities/uni-9.png" },
  { name: "University 8", src: "/images/universities/uni-10.png" },
  { name: "University 8", src: "/images/universities/uni-11.png" },
  { name: "University 8", src: "/images/universities/uni-12.png" },
  { name: "University 8", src: "/images/universities/uni-13.png" },
  { name: "University 8", src: "/images/universities/uni-14.png" },
  { name: "University 9",  src: "/images/universities/uni-15.png" },
];

const row2 = [
  { name: "University 10", src: "/images/universities/uni-16.png" },
  { name: "University 11", src: "/images/universities/uni-17.png" },
  { name: "University 12", src: "/images/universities/uni-18.png" },
  { name: "University 13", src: "/images/universities/uni-19.png" },
  { name: "University 14", src: "/images/universities/uni-20.png" },
  { name: "University 15", src: "/images/universities/uni-21.png" },
  { name: "University 16", src: "/images/universities/uni-22.png" },
  { name: "University 16", src: "/images/universities/uni-23.png" },
  { name: "University 16", src: "/images/universities/uni-24.png" },
  { name: "University 16", src: "/images/universities/uni-25.png" },
  { name: "University 16", src: "/images/universities/uni-26.png" },
  { name: "University 16", src: "/images/universities/uni-27.png" },
  { name: "University 16", src: "/images/universities/uni-28.png" },
  { name: "University 16", src: "/images/universities/uni-29.png" },
  { name: "University 9",  src: "/images/universities/uni-30.png" },
  { name: "University 9",  src: "/images/universities/uni-31.png" },
];

// ── Intersection Observer for Entrance Animation ──────────────
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

// ═══════════════════════════════════════════════════════════════
//  UNIVERSITIES SECTION
// ═══════════════════════════════════════════════════════════════
export default function Universities() {
  const { ref, inView } = useInView();

  return (
    // Background updated to match the About Us snippet (#f8f9fa)
    <section style={{ padding: "100px 0", background: "#ffffff", position: "relative", overflow: "hidden" }}>
      
      <style>{`
        @keyframes uniFadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Orb Animation from About Us */
        @keyframes orbFloat {
          0%, 100% { transform: translateY(0px);   }
          50%      { transform: translateY(-18px);  }
        }

        /* Continuous Infinite Scroll Animations */
        @keyframes scrollLeft {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); } 
        }
        @keyframes scrollRight {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }

        /* Container for the moving tracks */
        .marquee-container {
          display: flex;
          width: 200%; /* Double width to hold two sets of the array */
          gap: 24px;   /* Tighter gap for smaller logos */
        }

        /* Individual logo styling */
        .uni-logo {
          width: 150px;  /* Reduced from 200px */
          height: 75px;  /* Reduced from 100px */
          position: relative;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #ffffff; /* Solid white card to pop off the grid */
          border: 1px solid rgba(2,44,69,0.06);
          border-radius: 12px;
          padding: 12px;
          
          /* Full Color, slight opacity default */
          opacity: 0.85;
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
          cursor: pointer;
        }

        .uni-logo:hover {
          opacity: 1;
          transform: scale(1.05) translateY(-2px);
          box-shadow: 0 12px 24px rgba(2,44,69,0.08);
          border-color: rgba(241,97,1,0.3);
        }
      `}</style>

      {/* ── Background Grid & Orbs (Matching About Us) ── */}
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

      {/* Decorative Top Border Line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "1px", zIndex: 2,
        background: "linear-gradient(90deg, transparent 0%, rgba(241,97,1,0.2) 30%, rgba(201,162,77,0.2) 70%, transparent 100%)",
      }}/>

      <div ref={ref} style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1, padding: "0 24px" }}>
        
        {/* ── SEO HEADER (Centered Design) ── */}
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
          marginBottom: "64px",
          animation: inView ? "uniFadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both" : "none",
        }}>
          
          <div style={{ display: "inline-flex", alignItems: "center", gap: "9px", marginBottom: "16px" }}>
            <div style={{ width: "30px", height: "2px", borderRadius: "1px", background: "linear-gradient(90deg, #F16101, #C9A24D)" }}/>
            <span style={{ fontSize: "12px", fontWeight: 800, letterSpacing: "2.5px", textTransform: "uppercase", background: "linear-gradient(90deg, #F16101, #C9A24D)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Global Institutional Network
            </span>
            <div style={{ width: "30px", height: "2px", borderRadius: "1px", background: "linear-gradient(90deg, #C9A24D, #F16101)" }}/>
          </div>
          
          <h2 style={{ fontSize: "clamp(32px, 4vw, 44px)", fontWeight: 900, color: "#022C45", lineHeight: 1.1, letterSpacing: "-0.8px", margin: "0 0 16px" }}>
            Trusted by the World's<br/>
            <span style={{ position: "relative", display: "inline-block", background: "linear-gradient(100deg, #F16101 0%, #C9A24D 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Top Universities
              {/* SVG Underline uniquely ID'd */}
              <svg style={{ position: "absolute", bottom: "-6px", left: 0, width: "100%" }} height="5" viewBox="0 0 300 5" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="ulineUni" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#F16101"/>
                    <stop offset="100%" stopColor="#C9A24D"/>
                  </linearGradient>
                </defs>
                <path d="M0,3 Q75,0 150,3 Q225,7 300,3" stroke="url(#ulineUni)" strokeWidth="3" fill="none" strokeLinecap="round"/>
              </svg>
            </span>
          </h2>
          
          <p style={{ fontSize: "16px", color: "#6B7280", margin: 0, lineHeight: 1.6, marginTop: "24px", maxWidth: "600px" }}>
            We bridge the gap to the world's best classrooms. With 100+ partnerships, we secure fast-tracked admissions, fee waivers, and seamless enrollments.
          </p>
        </div>
      </div>

      {/* ── THE MARQUEE SECTION ── */}
      <div style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        display: "flex", flexDirection: "column", gap: "24px", // Tighter gap between rows
        animation: inView ? "uniFadeUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.2s both" : "none",
        /* CSS Mask to create seamless fade on left and right edges */
        WebkitMaskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
        maskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
      }}>
        
        {/* Row 1: Scrolling Left - Sped up from 45s to 25s */}
        <div 
          className="marquee-container" 
          style={{ animation: "scrollLeft 25s linear infinite" }}
          onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = "paused")}
          onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = "running")}
        >
          {/* We render the array twice so it loops seamlessly */}
          {[...row1, ...row1].map((uni, idx) => (
            <div key={`row1-${idx}`} className="uni-logo">
              <Image 
                src={uni.src} 
                alt={uni.name} 
                fill 
                style={{ objectFit: "contain", padding: "12px" }} 
                sizes="150px"
              />
            </div>
          ))}
        </div>

        {/* Row 2: Scrolling Right - Sped up from 45s to 25s */}
        <div 
          className="marquee-container" 
          style={{ animation: "scrollRight 25s linear infinite" }}
          onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = "paused")}
          onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = "running")}
        >
          {[...row2, ...row2].map((uni, idx) => (
            <div key={`row2-${idx}`} className="uni-logo">
              <Image 
                src={uni.src} 
                alt={uni.name} 
                fill 
                style={{ objectFit: "contain", padding: "12px" }} 
                sizes="150px"
              />
            </div>
          ))}
        </div>

      </div>

      {/* Decorative Bottom Border Line */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "1px", zIndex: 2,
        background: "linear-gradient(90deg, transparent, rgba(2,44,69,0.08) 50%, transparent)",
      }}/>
    </section>
  );
}