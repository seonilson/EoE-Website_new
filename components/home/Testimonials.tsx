"use client";
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

// ── All 15 Genuine Reviews (Images mapped to Gallery Folder) ──
const testimonials = [
  { id: 1, name: "Kashyap Kumbhani", university: "May Intake 2026", program: "Student Visa", destination: "United Kingdom", rating: 5, avatar: "/images/gallery/kashyab-kumbhani.jpg", 
    quote: "After a USA visa rejection, I was demotivated. The Edification team guided me to the UK, helped me overcome my interview fears with proper practice, and I finally got my visa after trying for 3 intakes. A true support system!" },
  { id: 2, name: "Sujal Gujjar", university: "Genetic Computer School", program: "Student Visa", destination: "Singapore", rating: 5, avatar: "/images/gallery/sujal-gujjar.jpg", 
    quote: "The whole process was very fast and smooth. The best part was that I didn’t have to pay any advance—all my payments were made only after my visa was approved, which built a massive amount of trust." },
  { id: 3, name: "Hitesh Rajpurohit", university: "Zero Advance Payment", program: "Student Visa", destination: "Singapore", rating: 5, avatar: "/images/gallery/hitesh-rajpurohit.jpg", 
    quote: "The entire process was very smooth and transparent. One thing I really appreciated is that I only had to make all my payments after my visa was approved. Supportive and highly professional team." },
  { id: 4, name: "Manish Vaniya", university: "Course & Docs Guidance", program: "Student Visa", destination: "Cyprus", rating: 5, avatar: "/images/gallery/manish-vaniya.jpg", 
    quote: "Special thanks to Sohel Qureshi sir. He managed everything perfectly from document preparation to file submission. Because of their honest guidance on Cyprus, my visa was confidently submitted." },
  { id: 5, name: "Yashi Bhatt", university: "Patient Counseling", program: "Student Visa", destination: "Cyprus", rating: 5, avatar: "/images/gallery/yashvi-bhatt.jpg", 
    quote: "My experience was very good. They explained every step clearly, helped me with documents, and supported me until my visa was approved. Whenever I had questions, they guided me patiently." },
  { id: 6, name: "Aryan Tiwari", university: "London Dreams", program: "Student Visa", destination: "United Kingdom", rating: 5, avatar: "/images/gallery/aryan-tiwari.jpg", 
    quote: "The whole team supported me like a family. From documentation to visa interview prep, their process was smooth, transparent, and super friendly. Without their help, it wouldn’t have been this easy." },
  { id: 7, name: "Hemil Panchal", university: "Approved in 1 Week", program: "Visitor Visa", destination: "Dubai", rating: 5, avatar: "/images/gallery/hemil-panchal.jpg", 
    quote: "I found them on Google while searching for a Dubai visitor visa. I got my visa within 1 week without any advance payment. I highly suggest them to everyone for fast, honest service." },
  { id: 8, name: "Alen Macwan", university: "Finding the Right Path", program: "Student Visa", destination: "Mauritius", rating: 5, avatar: "/images/gallery/alen-macwan.jpg", 
    quote: "I came seeking the right path, and with their support, I explored better options. Today, I proudly received my student visa! A heartfelt thank you to Himal sir for the invaluable guidance." },
  { id: 9, name: "Brijesh Patel", university: "Approved in 20 Days", program: "Student Visa", destination: "Russia", rating: 5, avatar: "/images/gallery/brijesh-patel.jpg", 
    quote: "Consulting with them online was a breeze. What truly blew me away was their lightning-fast efficiency—my visa was processed and approved in just 20 days! Seamless and enjoyable adventure." },
  { id: 10, name: "Kareenabanu Riyazkhan Pathan", university: "Approved in 30 Days", program: "Student Visa", destination: "Dubai", rating: 5, avatar: "/images/gallery/kareenabanu-riyazkhan-pathan.jpg", 
    quote: "They helped me secure my student visa in just 30 days! The team is highly professional, making sure all my documents were in perfect order. Thank you for making my dream come true." },
  { id: 11, name: "Joshi Krisha", university: "September Intake", program: "Student Visa", destination: "United Kingdom", rating: 5, avatar: "/images/gallery/krisha-joshi.jpg", 
    quote: "A wonderful journey. Meet & Sohel helped with my loan, CAS, and visa. They even booked my flight at 5 AM from Thailand without a single complaint. They helped me like big brothers, not agents." },
  { id: 12, name: "Vaibhav Dabhi", university: "Early Approval", program: "Student Visa", destination: "USA", rating: 5, avatar: "/images/gallery/vaibhav-dabhi.jpg", 
    quote: "Meet, Sohel, and Hemal explained every step in detail. I received my student visa a whole month earlier than expected. Their efficiency speaks volumes about their professionalism." },
  { id: 13, name: "Dharmit Dholakia", university: "Post-Visa Guidance", program: "Study Visa", destination: "Canada", rating: 5, avatar: "/images/gallery/dharmit-dholakia.jpg", 
    quote: "Meet Desai went out of his way to offer me essential advice on post-visa steps. His insights were instrumental. I feel completely confident embarking on my educational journey in Canada." },
  { id: 14, name: "Alauddin Shaikh", university: "Hassle-Free Process", program: "Student Visa", destination: "Malta", rating: 5, avatar: "/images/gallery/alauddin-shaikh.jpg", 
    quote: "The staff went above and beyond to ensure my application was completed accurately and on time. They made a stressful process so much easier. I couldn't be more pleased with the service." },
  { id: 15, name: "Harsh Panchal", university: "UCLan Cyprus", program: "MBA", destination: "Cyprus", rating: 5, avatar: "/images/gallery/harsh-panchal.jpg", 
    quote: "They were instrumental in helping me achieve my dream of studying for an MBA. A special thanks to Ajay and Meet for their incredible guidance through course selection, documentation, and visa filing." }
];

// ── Hook: Intersection Observer ───────────────────────────────
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
//  TESTIMONIALS SECTION - 5-ITEM BENTO GRID & PEN REVEAL
// ═══════════════════════════════════════════════════════════════
export default function Testimonials() {
  const { ref, inView } = useInView();
  const [linkH, setLinkH] = useState(false);
  
  // Pagination State
  const [page, setPage] = useState(0);
  const [turnDir, setTurnDir] = useState<"next" | "prev" | "">("");

  // Always exactly 5 per page
  const itemsPerPage = 5;
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);
  const visibleTestimonials = testimonials.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

  // Mobile carousel state
  const [isMobile, setIsMobile] = useState(false);
  const [activeCard, setActiveCard] = useState(0);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const goNext = () => setActiveCard(c => Math.min(c + 1, testimonials.length - 1));
  const goPrev = () => setActiveCard(c => Math.max(c - 1, 0));

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 40) goNext();
    if (diff < -40) goPrev();
  };

  const nextPage = () => {
    if (page >= totalPages - 1) return;
    setTurnDir("next");
    setPage((p) => p + 1);
  };

  const prevPage = () => {
    if (page <= 0) return;
    setTurnDir("prev");
    setPage((p) => p - 1);
  };

  return (
    <section style={{
      padding: "120px 0",
      background: "#FDF8F4",
      position: "relative",
      overflow: "hidden",
    }}>
      <style>{`
        @keyframes testiFadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInNext {
          0%   { opacity: 0; transform: translateX(40px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInPrev {
          0%   { opacity: 0; transform: translateX(-40px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .slide-next { animation: slideInNext 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        .slide-prev { animation: slideInPrev 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards; }

        @keyframes writeSweep {
          to { background-position: 0 0; }
        }
        .writing-text {
          background: linear-gradient(to right, #374151 50%, transparent 50%);
          background-size: 200% 100%;
          background-position: 100% 0;
          color: transparent;
          -webkit-background-clip: text;
          animation: writeSweep 1.2s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }

        /* ── BENTO GRID ── */
        .bento-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        @media (min-width: 768px) {
          .bento-grid { grid-template-columns: repeat(2, 1fr); }
          .testi-card:nth-child(3) { grid-column: span 2; }
        }
        @media (min-width: 1100px) {
          .bento-grid { grid-template-columns: repeat(6, 1fr); gap: 20px; }
          .testi-card:nth-child(1) { grid-column: span 2; }
          .testi-card:nth-child(2) { grid-column: span 2; }
          .testi-card:nth-child(3) { grid-column: span 2; }
          .testi-card:nth-child(4) { grid-column: span 3; }
          .testi-card:nth-child(5) { grid-column: span 3; }
        }

        /* ── CARD ── */
        .testi-card {
          background: #ffffff;
          border-radius: 16px;
          padding: 28px;
          display: flex;
          flex-direction: column;
          border: 1px solid rgba(241,97,1,0.08);
          transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
          height: 100%;
          position: relative;
          overflow: hidden;
        }
        .testi-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #F16101, #C9A24D);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .testi-card:hover {
          background: #ffffff;
          border-color: rgba(241,97,1,0.15);
          box-shadow: 0 16px 48px rgba(2,44,69,0.08);
          transform: translateY(-4px);
        }
        .testi-card:hover::before {
          transform: scaleX(1);
        }

        .testi-header {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 18px;
          padding-bottom: 16px;
          border-bottom: 1px solid rgba(2,44,69,0.06);
        }

        .testi-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid rgba(241,97,1,0.2);
        }

        .testi-name {
          font-size: 15px;
          font-weight: 800;
          color: #022C45;
          margin: 0 0 2px;
          letter-spacing: -0.2px;
        }

        .testi-program {
          font-size: 11px;
          font-weight: 700;
          color: #F16101;
          margin: 0;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .testi-quote-wrap {
          font-size: 14px;
          line-height: 1.75;
          flex-grow: 1;
          margin: 0 0 20px;
          color: #374151;
        }

        .testi-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: auto;
        }

        .testi-dest {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px 10px;
          background: rgba(2,44,69,0.05);
          border-radius: 999px;
          font-size: 10px;
          font-weight: 800;
          color: #022C45;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        /* ── MOBILE CAROUSEL ── */
        @media (max-width: 767px) {
          section { padding: 56px 0 !important; }

          .testi-section-header {
            flex-direction: column !important;
            align-items: flex-start !important;
            margin-bottom: 28px !important;
            gap: 16px !important;
          }
          .testi-header-right {
            display: none !important;
          }

          .mobile-carousel {
            position: relative;
            overflow: hidden;
          }

          .mobile-card-track {
            display: flex;
            transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
          }

          .mobile-card-slide {
            flex: 0 0 100%;
            padding: 0 4px;
          }

          .mobile-nav {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 20px;
            padding: 0 4px;
          }

          .mobile-dots {
            display: flex;
            gap: 6px;
            align-items: center;
          }

          .mobile-dot {
            border-radius: 999px;
            background: rgba(2,44,69,0.15);
            height: 6px;
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
            padding: 0;
          }

          .mobile-dot.active {
            background: #F16101;
          }
        }

        /* ── NAV ── */
        .nav-controls {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .nav-btn {
          width: 40px; height: 40px;
          border-radius: 50%;
          border: 1.5px solid rgba(2,44,69,0.12);
          background: #ffffff;
          color: #022C45;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .nav-btn:hover:not(:disabled) {
          background: #F16101;
          border-color: #F16101;
          color: #ffffff;
        }
        .nav-btn:disabled { opacity: 0.25; cursor: not-allowed; }
        .page-indicator {
          font-size: 13px;
          font-weight: 800;
          color: #9CA3AF;
          letter-spacing: 1px;
          min-width: 36px;
          text-align: center;
        }
      `}</style>

      {/* Decorative glow only - no grid to avoid clash with Accreditations */}
      <div style={{
        position: "absolute", top: "-100px", right: "-50px",
        width: "500px", height: "500px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(241,97,1,0.04) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }}/>

      <div
        ref={ref}
        style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}
 >

        {/* ── SECTION HEADER ── */}
        <div className="testi-section-header" style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "flex-end", marginBottom: "56px",
          flexWrap: "wrap", gap: "24px",
          animation: inView ? "testiFadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both" : "none",
        }}>
          <div style={{ maxWidth: "620px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "9px", marginBottom: "16px" }}>
              <div style={{ width: "30px", height: "2px", borderRadius: "1px", background: "linear-gradient(90deg, #F16101, #C9A24D)" }}/>
              <span style={{
                fontSize: "11px", fontWeight: 800, letterSpacing: "2.5px", textTransform: "uppercase",
                background: "linear-gradient(90deg, #F16101, #C9A24D)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>Global Success Stories</span>
            </div>
            <h2 style={{
              fontSize: "clamp(32px, 4vw, 44px)", fontWeight: 900, color: "#022C45",
              lineHeight: 1.1, letterSpacing: "-0.8px", margin: "0 0 16px",
            }}>
              Transforming Ambitions Into<br/>
              <span style={{
                position: "relative", display: "inline-block",
                background: "linear-gradient(100deg, #F16101 0%, #C9A24D 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>
                Global Realities
                <svg style={{ position: "absolute", bottom: "-6px", left: 0, width: "100%" }} height="5" viewBox="0 0 300 5" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="ulineTesti" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#F16101"/><stop offset="100%" stopColor="#C9A24D"/>
                    </linearGradient>
                  </defs>
                  <path d="M0,3 Q75,0 150,3 Q225,7 300,3" stroke="url(#ulineTesti)" strokeWidth="3" fill="none" strokeLinecap="round"/>
                </svg>
              </span>
            </h2>
            <p style={{ fontSize: "16px", color: "#6B7280", lineHeight: 1.6, margin: "0", marginTop: "24px", maxWidth: "600px" }}>
              Hear directly from the 15+ students, professionals, and families who successfully navigated their international journeys with our guidance.
            </p>
          </div>

          <div className="testi-header-right" style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", paddingBottom: "8px" }}>
              <Link href="/gallery" style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                color: linkH ? "#F16101" : "#022C45",
                fontSize: "13.5px", fontWeight: 800, textTransform: "uppercase",
                letterSpacing: "0.8px", textDecoration: "none", transition: "color 0.3s ease", whiteSpace: "nowrap",
              }}
                onMouseEnter={() => setLinkH(true)} onMouseLeave={() => setLinkH(false)}
 >
                Read All Reviews
                <span style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  width: "28px", height: "28px", borderRadius: "50%",
                  background: linkH ? "rgba(241,97,1,0.1)" : "rgba(2,44,69,0.05)", transition: "all 0.3s ease",
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    style={{ transform: linkH ? "translateX(2px)" : "translateX(0)", transition: "transform 0.3s ease" }}>
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </span>
              </Link>
            </div>

            <div className="nav-controls">
              <button onClick={prevPage} disabled={page === 0} className="nav-btn" aria-label="Previous Page">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
                </svg>
              </button>
              <span className="page-indicator">{page + 1} / {totalPages}</span>
              <button onClick={nextPage} disabled={page >= totalPages - 1} className="nav-btn" aria-label="Next Page">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* ── MOBILE CAROUSEL ── */}
        {isMobile ? (
          <div
            className="mobile-carousel"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
 >
            {/* Sliding track */}
            <div
              className="mobile-card-track"
              style={{ transform: `translateX(-${activeCard * 100}%)` }}
 >
              {testimonials.map((testi) => (
                <div key={testi.id} className="mobile-card-slide">
                  <div className="testi-card">
                    <div className="testi-header">
                      <div style={{ position: "relative", width: "52px", height: "52px", flexShrink: 0 }}>
                        <Image src={testi.avatar} alt={testi.name} fill sizes="52px" className="testi-avatar" />
                      </div>
                      <div>
                        <h3 className="testi-name">{testi.name}</h3>
                        <p className="testi-program">{testi.program}</p>
                        <span style={{ fontSize: "11px", color: "#9CA3AF", marginTop: "1px", display: "block" }}>{testi.university}</span>
                      </div>
                    </div>

                    {/* Stars */}
                    <div style={{ display: "flex", gap: "2px", color: "#F16101", marginBottom: "14px" }}>
                      {[...Array(testi.rating)].map((_, i) => (
                        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                        </svg>
                      ))}
                    </div>

                    <div className="testi-quote-wrap">
                      &ldquo;{testi.quote}&rdquo;
                    </div>

                    <div className="testi-footer">
                      <div className="testi-dest">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                        </svg>
                        {testi.destination}
                      </div>
                      <span style={{ fontSize: "11px", color: "#9CA3AF", fontWeight: 600 }}>{activeCard + 1} of {testimonials.length}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile nav */}
            <div className="mobile-nav">
              <button
                onClick={goPrev}
                disabled={activeCard === 0}
                className="nav-btn"
                aria-label="Previous"
 >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
                </svg>
              </button>

              {/* Dot indicators */}
              <div className="mobile-dots">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    className={`mobile-dot ${i === activeCard ? "active" : ""}`}
                    style={{ width: i === activeCard ? "20px" : "6px" }}
                    onClick={() => setActiveCard(i)}
                    aria-label={`Go to review ${i + 1}`}
 />
                ))}
              </div>

              <button
                onClick={goNext}
                disabled={activeCard === testimonials.length - 1}
                className="nav-btn"
                aria-label="Next"
 >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </button>
            </div>

            {/* Read all link on mobile */}
            <div style={{ textAlign: "center", marginTop: "24px" }}>
              <Link href="/gallery" style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                color: "#022C45", fontSize: "13px", fontWeight: 800,
                textTransform: "uppercase", letterSpacing: "0.8px", textDecoration: "none",
              }}>
                Read All Reviews
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
            </div>
          </div>

        ) : (

        /* ── DESKTOP BENTO GRID ── */
        <div
          key={page}
          className={`bento-grid ${turnDir === "next" ? "slide-next" : turnDir === "prev" ? "slide-prev" : ""}`}
          style={{ animation: inView && !turnDir ? "testiFadeUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.2s both" : undefined }}
 >
          {visibleTestimonials.map((testi, index) => (
            <div key={testi.id} className="testi-card">
              <div className="testi-header">
                <div style={{ position: "relative", width: "48px", height: "48px", flexShrink: 0 }}>
                  <Image src={testi.avatar} alt={testi.name} fill sizes="48px" className="testi-avatar" />
                </div>
                <div>
                  <h3 className="testi-name">{testi.name}</h3>
                  <p className="testi-program">{testi.program}</p>
                  <span style={{ fontSize: "11px", color: "#9CA3AF", marginTop: "1px", display: "block" }}>{testi.university}</span>
                </div>
              </div>

              <div className="testi-quote-wrap">
                <span className="writing-text" style={{ animationDelay: `${0.1 + index * 0.1}s` }}>
                  {testi.quote}
                </span>
              </div>

              <div className="testi-footer">
                <div className="testi-dest">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                  {testi.destination}
                </div>
                <div style={{ display: "flex", gap: "2px", color: "#F16101" }}>
                  {[...Array(testi.rating)].map((_, i) => (
                    <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        )}{/* end mobile/desktop */}

      </div>
    </section>
  );
}