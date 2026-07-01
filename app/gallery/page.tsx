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

// ── Real Data: Gallery (Images & Videos) ──────────────────────
const categories = ["All", "Photos", "Videos", "UK", "Canada", "USA", "Cyprus", "Singapore", "Mauritius", "Dubai", "Russia"];

// ═══════════════════════════════════════════════════════════════
//  GALLERY / SUCCESS STORIES PAGE
// ═══════════════════════════════════════════════════════════════
interface GalleryItem { id: string; type: string; category: string; title: string; desc: string; src: string; }
interface Testimonial  { id: string | number; name: string; university: string; program: string; destination: string; rating: number; avatar: string; quote: string; }

export default function GalleryPage() {
  const heroRef = useInView(0.1);
  const galleryRef = useInView(0.05);
  const testRef = useInView(0.1);
  const ctaRef = useInView(0.1);

  const [allGallery, setAllGallery]       = useState<GalleryItem[]>([]);
  const [testimonials, setTestimonials]   = useState<Testimonial[]>([]);

  // Fetch gallery + testimonials from API
  useEffect(() => {
    fetch("/api/gallery")
      .then(r => r.json())
      .then((data: GalleryItem[]) => setAllGallery(data))
      .catch(() => {});
  }, []);

  // Derive testimonials from gallery images (photos = testimonials)
  useEffect(() => {
    const photos = allGallery.filter(i => i.type === "image");
    // Map gallery images to testimonial format — quote pulled from hardcoded map
    const QUOTES: Record<string, string> = {
      "Kashyab Kumbhani": "After a previous rejection, I was demotivated. The Edification team guided me to the UK, helped me overcome my interview fears with proper practice, and I finally got my visa. A true support system!",
      "Hitesh Rajpurohit": "The entire process was very smooth and transparent. One thing I really appreciated is that I only had to make all my payments after my visa was approved. Supportive and highly professional team.",
      "Sujal Gujjar": "The whole process was very fast and smooth. The best part was that I didn't have to pay any advance—all my payments were made only after my visa was approved, which built a massive amount of trust.",
      "Bandish Panchal": "Special thanks to Sohel Qureshi sir. He managed everything perfectly from document preparation to file submission. Because of their honest guidance on Cyprus, my visa was confidently submitted.",
      "Yashvi Bhatt": "My experience was very good. They explained every step clearly, helped me with documents, and supported me until my visa was approved. Whenever I had questions, they guided me patiently.",
      "Aryan Tiwari": "The whole team supported me like a family. From documentation to visa interview prep, their process was smooth, transparent, and super friendly. Without their help, it wouldn't have been this easy.",
      "Hemil Panchal": "I found them on Google while searching for a Dubai visitor visa. I got my visa within 1 week without any advance payment. I highly suggest them to everyone for fast, honest service.",
      "Vishal Macwan": "I came seeking the right path, and with their support, I explored better options. Today, I proudly received my student visa! A heartfelt thank you to Himal sir for the invaluable guidance.",
      "Brijesh Patel": "Consulting with them online was a breeze. What truly blew me away was their lightning-fast efficiency—my visa was processed and approved in just 20 days! Seamless and enjoyable adventure.",
      "Vaibhav Dabhi": "Meet, Sohel, and Hemal explained every step in detail. I received my student visa a whole month earlier than expected. Their efficiency speaks volumes about their professionalism.",
    };
    setTestimonials(photos.map(p => ({
      id: p.id, name: p.title, university: p.desc, program: "Student Visa",
      destination: p.category, rating: 5, avatar: p.src,
      quote: QUOTES[p.title] || "Exceptional service and support throughout my visa journey. Highly recommended to anyone looking to study abroad.",
    })));
  }, [allGallery]);

  // Gallery Filter State
  const [filter, setFilter] = useState("All");
  const [filteredData, setFilteredData] = useState<GalleryItem[]>([]);

  useEffect(() => {
    if (filter === "All")    setFilteredData(allGallery);
    else if (filter === "Photos")  setFilteredData(allGallery.filter(i => i.type === "image"));
    else if (filter === "Videos")  setFilteredData(allGallery.filter(i => i.type === "video"));
    else setFilteredData(allGallery.filter(i => i.category === filter));
  }, [filter, allGallery]);
  
  // Lightbox Modal State
  const [activeMedia, setActiveMedia] = useState<{ src: string, type: 'video' | 'image' } | null>(null);

  // Disable background scrolling when modal is open
  useEffect(() => {
    if (activeMedia) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [activeMedia]);



  // Testimonials Pagination State
  const [page, setPage] = useState(0);
  const [turnDir, setTurnDir] = useState<"next" | "prev" | "">("");
  const itemsPerPage = 5; 
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);
  const visibleTestimonials = testimonials.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

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
    <main style={{ background: "#F9FAFB", overflowX: "hidden", minHeight: "100vh" }}>
      <style>{`
        /* Core Animations */
        @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        @keyframes fadeLeft { from { opacity: 0; transform: translateX(-40px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes float1 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
        @keyframes float2 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(12px); } }
        @keyframes glowPulseCyan { 0%, 100% { filter: drop-shadow(0 0 15px rgba(7,203,235,0.15)); } 50% { filter: drop-shadow(0 0 40px rgba(7,203,235,0.3)); } }

        /* Filter Buttons */
        .filter-container { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; margin-bottom: 48px; }
        .filter-btn {
          padding: 10px 24px; border-radius: 999px; font-size: 14px; font-weight: 700; cursor: pointer;
          transition: all 0.3s cubic-bezier(0.22,1,0.36,1); border: 1px solid rgba(2,44,69,0.1);
          background: #ffffff; color: #4B5563; box-shadow: 0 4px 12px rgba(0,0,0,0.02);
        }
        .filter-btn:hover { border-color: #07CBEB; color: #022C45; transform: translateY(-2px); box-shadow: 0 8px 16px rgba(7,203,235,0.1); }
        .filter-btn.active { background: #022C45; color: #ffffff; border-color: #022C45; box-shadow: 0 8px 20px rgba(2,44,69,0.2); }

        /* Gallery Grid: Force 4 columns on large screens to reduce size */
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
        /* Vertical Videos */
        .gallery-card.video-card { aspect-ratio: 9/16; }

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

        /* Video Play Button */
        .play-btn {
          position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) scale(1);
          width: 64px; height: 64px; border-radius: 50%; background: rgba(241,97,1,0.9); backdrop-filter: blur(4px);
          display: flex; align-items: center; justify-content: center; color: white; box-shadow: 0 8px 24px rgba(241,97,1,0.4);
          transition: all 0.3s cubic-bezier(0.22,1,0.36,1); z-index: 2; pointer-events: none;
        }
        .gallery-card:hover .play-btn { opacity: 0; transform: translate(-50%, -50%) scale(1.5); }

        .fallback-icon { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); opacity: 0.1; color: #ffffff; }

        /* ── BENTO GRID (Testimonials) ── */
        @keyframes slideInNext { 0% { opacity: 0; transform: translateX(40px); } 100% { opacity: 1; transform: translateX(0); } }
        @keyframes slideInPrev { 0% { opacity: 0; transform: translateX(-40px); } 100% { opacity: 1; transform: translateX(0); } }
        .slide-next { animation: slideInNext 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        .slide-prev { animation: slideInPrev 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards; }

        @keyframes writeSweep { to { background-position: 0 0; } }
        .writing-text {
          background: linear-gradient(to right, #374151 50%, transparent 50%);
          background-size: 200% 100%; background-position: 100% 0; color: transparent;
          -webkit-background-clip: text; animation: writeSweep 1.2s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }

        .bento-grid { display: grid; grid-template-columns: 1fr; gap: 20px; }
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

        .testi-card {
          background: #ffffff; border-radius: 16px; padding: 28px; display: flex; flex-direction: column;
          border: 1px solid rgba(241,97,1,0.08); transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1); height: 100%;
          position: relative; overflow: hidden;
        }
        .testi-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, #F16101, #C9A24D); transform: scaleX(0);
          transform-origin: left; transition: transform 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .testi-card:hover {
          border-color: rgba(241,97,1,0.15); box-shadow: 0 16px 48px rgba(2,44,69,0.08); transform: translateY(-4px);
        }
        .testi-card:hover::before { transform: scaleX(1); }

        .testi-header { display: flex; align-items: center; gap: 14px; margin-bottom: 18px; padding-bottom: 16px; border-bottom: 1px solid rgba(2,44,69,0.06); }
        .testi-avatar { width: 48px; height: 48px; border-radius: 50%; object-fit: cover; border: 2px solid rgba(241,97,1,0.2); }
        .testi-name { font-size: 15px; font-weight: 800; color: #022C45; margin: 0 0 2px; letter-spacing: -0.2px; }
        .testi-program { font-size: 11px; font-weight: 700; color: #F16101; margin: 0; text-transform: uppercase; letter-spacing: 0.5px; }
        .testi-quote-wrap { font-size: 14px; line-height: 1.75; flex-grow: 1; margin: 0 0 20px; color: #374151; }
        .testi-footer { display: flex; align-items: center; justify-content: space-between; margin-top: auto; }
        .testi-dest {
          display: inline-flex; align-items: center; gap: 5px; padding: 4px 10px; background: rgba(2,44,69,0.05);
          border-radius: 999px; font-size: 10px; font-weight: 800; color: #022C45; text-transform: uppercase; letter-spacing: 0.5px;
        }

        .nav-controls { display: flex; align-items: center; gap: 12px; }
        .nav-btn {
          width: 40px; height: 40px; border-radius: 50%; border: 1.5px solid rgba(2,44,69,0.12); background: #ffffff; color: #022C45;
          display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.3s ease;
        }
        .nav-btn:hover:not(:disabled) { background: #F16101; border-color: #F16101; color: #ffffff; }
        .nav-btn:disabled { opacity: 0.25; cursor: not-allowed; }
        .page-indicator { font-size: 13px; font-weight: 800; color: #9CA3AF; letter-spacing: 1px; min-width: 36px; text-align: center; }
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
                Gallery & Testimonials
              </span>
            </div>

            <h1 style={{
              fontSize: "clamp(40px, 5vw, 64px)", fontWeight: 900, color: "#022C45", lineHeight: 1.1,
              letterSpacing: "-1px", marginBottom: "24px",
              animation: heroRef.inView ? "fadeSlideUp 0.55s ease 0.2s both" : "none",
            }}>
              Real Students,<br/>
              <span style={{ color: "#F16101", position: "relative", display: "inline-block" }}>
                Global Success.
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
              Browse through hundreds of approved visas, campus videos, and hear directly from <strong>genuine students</strong> whose dreams we turned into reality across <strong>32+ Countries</strong>. Your success story could be next.
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
                 src="/images/hero-collage.png" 
                 alt="Visa Success Students" 
                 fill 
                 style={{ objectFit: "cover" }} 
                 priority
                 unoptimized
               />
            </div>

            {/* Floating Glass Badges */}
            <div style={{ position: "absolute", top: "20px", left: "-40px", zIndex: 3, animation: "float2 5s infinite" }}>
              <div style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,1)", padding: "12px 20px", borderRadius: "16px", display: "flex", alignItems: "center", gap: "10px", boxShadow: "0 16px 40px rgba(2,44,69,0.08)" }}>
                <span style={{ fontSize: "20px" }}>✈️</span>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "10px", color: "#F16101", textTransform: "uppercase", fontWeight: 800 }}>Visa Success</span>
                  <span style={{ fontSize: "14px", fontWeight: 900, color: "#022C45" }}>98% Approval Rate</span>
                </div>
              </div>
            </div>

            <div style={{ position: "absolute", bottom: "20px", right: "-30px", zIndex: 3, animation: "float1 7s infinite reverse" }}>
              <div style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,1)", padding: "12px 20px", borderRadius: "16px", display: "flex", alignItems: "center", gap: "10px", boxShadow: "0 16px 40px rgba(2,44,69,0.08)" }}>
                <span style={{ fontSize: "20px" }}>🌍</span>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "10px", color: "#F16101", textTransform: "uppercase", fontWeight: 800 }}>Global Reach</span>
                  <span style={{ fontSize: "14px", fontWeight: 900, color: "#022C45" }}>33+ Countries</span>
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
          2. GALLERY GRID SECTION (Photos & Videos)
      ════════════════════════════════════════════════════════ */}
      <Section bg="#F9FAFB" style={{ padding: "80px 0 100px" }}>
        <div ref={galleryRef.ref} style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
          
          <div style={{ textAlign: "center", marginBottom: "40px", animation: galleryRef.inView ? "fadeSlideUp 0.6s ease both" : "none" }}>
             <Eyebrow label="Visual Proof" />
             <h2 style={{ fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 900, color: "#022C45", margin: 0, letterSpacing: "-0.5px" }}>
              Explore Our Recent Approvals
            </h2>
          </div>

          {/* Filters */}
          <div className="filter-container" style={{ animation: galleryRef.inView ? "fadeSlideUp 0.6s ease 0.1s both" : "none" }}>
            {categories.map(cat => (
              <button 
                key={cat} 
                className={`filter-btn ${filter === cat ? "active" : ""}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid - Set to 4 Columns */}
          <div className="gallery-grid">
            {filteredData.map((item, index) => (
              <div 
                key={item.id} 
                className={`gallery-card ${item.type === 'video' ? 'video-card' : ''}`}
                style={{
                  animation: galleryRef.inView ? `scaleIn 0.5s cubic-bezier(0.22,1,0.36,1) ${Math.min(index * 0.05, 0.5)}s both` : "none",
                }}
                onClick={() => setActiveMedia({ src: item.src, type: item.type as 'video' | 'image' })}
              >
                {/* Fallback Icon */}
                <svg className="fallback-icon" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>

                {/* Main Media Render */}
                {item.type === "video" ? (
                  <video 
                    className="gallery-img"
                    style={{ objectFit: "cover" }}
                    muted 
                    loop 
                    playsInline
                    preload="metadata"
                    onMouseEnter={(e) => {
                      const playPromise = e.currentTarget.play();
                      if (playPromise !== undefined) {
                        playPromise.catch((error) => console.log("Auto-play prevented", error));
                      }
                    }}
                    onMouseLeave={(e) => e.currentTarget.pause()}
                  >
                    {/* Explicitly defining the source and type fixes the NotSupportedError */}
                    <source src={item.src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <Image 
                    src={item.src} 
                    alt={item.title} 
                    fill 
                    className="gallery-img" 
                    unoptimized 
                  />
                )}

                {/* Video Play Button overlay */}
                {item.type === "video" && (
                  <div className="play-btn">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  </div>
                )}

                {/* Dark Hover Overlay */}
                <div className="card-overlay">
                  <div style={{ display: "inline-block", background: "#F16101", color: "white", fontSize: "10px", fontWeight: 800, padding: "4px 8px", borderRadius: "4px", marginBottom: "8px", width: "fit-content", textTransform: "uppercase", letterSpacing: "1px" }}>
                    {item.category}
                  </div>
                  <h4 className="card-title">{item.title}</h4>
                  <p className="card-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredData.length === 0 && (
            <div style={{ textAlign: "center", padding: "60px 0", color: "#6B7280", fontWeight: 600 }}>
              No media found for this category.
            </div>
          )}

        </div>
      </Section>

      {/* ════════════════════════════════════════════════════════
          3. TESTIMONIALS SECTION (Bento Grid)
      ════════════════════════════════════════════════════════ */}
      <Section bg="#FDF8F4" style={{ padding: "100px 0" }}>
        <div ref={testRef.ref} style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
          
          {/* SECTION HEADER */}
          <div style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "flex-end", marginBottom: "56px",
            flexWrap: "wrap", gap: "24px",
            animation: testRef.inView ? "fadeSlideUp 0.6s cubic-bezier(0.22,1,0.36,1) both" : "none",
          }}>
            <div style={{ maxWidth: "620px" }}>
              <Eyebrow label="Student Reviews" />
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
                    <defs><linearGradient id="ulineTesti" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#F16101"/><stop offset="100%" stopColor="#C9A24D"/></linearGradient></defs>
                    <path d="M0,3 Q75,0 150,3 Q225,7 300,3" stroke="url(#ulineTesti)" strokeWidth="3" fill="none" strokeLinecap="round"/>
                  </svg>
                </span>
              </h2>
              <p style={{ fontSize: "16px", color: "#6B7280", lineHeight: 1.6, margin: "0", marginTop: "24px", maxWidth: "600px" }}>
                Hear directly from genuine students who successfully navigated their international journeys across 30+ countries and secured their visas with our expert guidance.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "24px" }}>
              <div className="nav-controls">
                <button onClick={prevPage} disabled={page === 0} className="nav-btn" aria-label="Previous Page">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
                </button>
                <span className="page-indicator">{page + 1} / {totalPages}</span>
                <button onClick={nextPage} disabled={page >= totalPages - 1} className="nav-btn" aria-label="Next Page">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </button>
              </div>
            </div>
          </div>

          {/* BENTO GRID */}
          <div
            key={page}
            className={`bento-grid ${turnDir === "next" ? "slide-next" : turnDir === "prev" ? "slide-prev" : ""}`}
            style={{ animation: testRef.inView && !turnDir ? "fadeSlideUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.2s both" : undefined }}
          >
            {visibleTestimonials.map((testi, index) => (
              <div key={testi.id} className="testi-card">
                <div className="testi-header">
                  <div style={{ position: "relative", width: "48px", height: "48px", flexShrink: 0 }}>
                    {/* Using unoptimized Image to prevent errors if the specific avatar JPG doesn't exist yet */}
                    <Image src={testi.avatar} alt={testi.name} fill sizes="48px" className="testi-avatar" unoptimized />
                  </div>
                  <div>
                    <h3 className="testi-name">{testi.name}</h3>
                    <p className="testi-program">{testi.program}</p>
                    <span style={{ fontSize: "11px", color: "#9CA3AF", marginTop: "1px", display: "block" }}>{testi.university}</span>
                  </div>
                </div>

                <div className="testi-quote-wrap">
                  <span className="writing-text" style={{ animationDelay: `${0.1 + index * 0.1}s` }}>
                    "{testi.quote}"
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

        </div>
      </Section>

      {/* ════════════════════════════════════════════════════════
          4. UNIFIED BOTTOM CTA BANNER 
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
                Ready to Join Our Success Wall?
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
          5. LIGHTBOX MODAL (For Fullscreen Video/Image Viewing)
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
            onClick={(e) => e.stopPropagation()} // Prevent background click from closing
            style={{ 
              position: "relative", width: "100%", maxWidth: "1000px", height: "100%", maxHeight: "85vh", 
              display: "flex", justifyContent: "center", alignItems: "center" 
            }}
          >
            {activeMedia.type === 'video' ? (
              <video 
                src={activeMedia.src} 
                controls 
                autoPlay 
                style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: "16px", boxShadow: "0 24px 64px rgba(0,0,0,0.5)" }}
              />
            ) : (
              <div style={{ position: "relative", width: "100%", height: "100%" }}>
                <Image 
                  src={activeMedia.src} 
                  alt="Gallery Full View" 
                  fill 
                  style={{ objectFit: "contain" }} 
                  unoptimized 
                />
              </div>
            )}
          </div>
        </div>
      )}

    </main>
  );
}