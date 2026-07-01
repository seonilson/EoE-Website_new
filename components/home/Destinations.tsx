"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

// ── Highly SEO-Optimized Data (Strictly 15 Words Max) ─────────
const destinations = [
  {
    name: "United Kingdom",
    slug: "united-kingdom",
    desc: "Study in the UK. Fast-track degrees, prestigious universities, and excellent post-study work opportunities.",
    image: "/images/dest-uk.jpg", flag: "/images/flags/gb.png",
  },
  {
    name: "Canada",
    slug: "canada",
    desc: "Study in Canada. Affordable world-class education, welcoming communities, and seamless permanent residency pathways.",
    image: "/images/dest-canada.jpg", flag: "/images/flags/ca.png",
  },
  {
    name: "Australia",
    slug: "australia",
    desc: "Study in Australia. Top-ranked institutions, vibrant lifestyle, and up to four years of work rights.",
    image: "/images/dest-australia.jpg", flag: "/images/flags/au.png",
  },
  {
    name: "USA",
    slug: "usa",
    desc: "Study in the USA. Ivy League excellence, STEM OPT extensions, and unmatched global career networking.",
    image: "/images/dest-usa.jpg", flag: "/images/flags/us.png",
  },
  {
    name: "Germany",
    slug: "germany",
    desc: "Study in Germany. Zero tuition fees, top engineering programs, and excellent EU Blue Card prospects.",
    image: "/images/dest-germany.jpg", flag: "/images/flags/de.png",
  },
  {
    name: "Dubai",
    slug: "dubai",
    desc: "Study in Dubai. Tax-free earning, booming tech sector, and global university campuses in a futuristic hub.",
    image: "/images/dest-dubai.jpg", flag: "/images/flags/ae.png",
  },
  {
    name: "Singapore",
    slug: "singapore",
    desc: "Study in Singapore. Asia's premier education hub, innovative tech ecosystem, and gateway to global MNCs.",
    image: "/images/dest-singapore.jpg", flag: "/images/flags/sg.png",
  },
  {
    name: "France",
    slug: "france",
    desc: "Study in France. Prestigious Grandes Écoles, rich European history, and generous government housing subsidies.",
    image: "/images/dest-france.jpg", flag: "/images/flags/fr.png",
  },
  {
    name: "Netherlands",
    slug: "netherlands",
    desc: "Study in the Netherlands. Innovative English-taught programs, interactive teaching, and strong global industry ties.",
    image: "/images/dest-netherlands.jpg", flag: "/images/flags/nl.png",
  },
  {
    name: "New Zealand",
    slug: "new-zealand",
    desc: "Study in New Zealand. Safe, welcoming environment, excellent research facilities, and generous post-study work rights.",
    image: "/images/dest-new-zealand.jpg", flag: "/images/flags/nz.png",
  },
  {
    name: "Ireland",
    slug: "ireland",
    desc: "Study in Ireland. The tech hub of Europe, offering friendly communities and 2-year post-study visas.",
    image: "/images/dest-ireland.jpg", flag: "/images/flags/ie.png",
  },
  {
    name: "Hungary",
    slug: "hungary",
    desc: "Study in Hungary. Excellent medical schools, the Stipendium Hungaricum scholarship, and highly affordable living costs.",
    image: "/images/dest-hungary.jpg", flag: "/images/flags/hu.png",
  },
  {
    name: "Malta",
    slug: "malta",
    desc: "Study in Malta. An English-speaking Mediterranean hub offering excellent business, tech, and tourism programs.",
    image: "/images/dest-malta.jpg", flag: "/images/flags/mt.png",
  },
  {
    name: "Cyprus",
    slug: "cyprus",
    desc: "Study in Cyprus. High-quality European education, sunny Mediterranean lifestyle, and incredibly affordable living costs.",
    image: "/images/dest-cyprus.jpg", flag: "/images/flags/cy.png",
  },
  {
    name: "Russia",
    slug: "russia",
    desc: "Study in Russia. World-renowned medical and engineering universities offering highly affordable international tuition fees.",
    image: "/images/dest-russia.jpg", flag: "/images/flags/ru.png",
  },
  {
    name: "Belarus",
    slug: "belarus",
    desc: "Study in Belarus. Globally recognized degrees, exceptionally low tuition fees, and excellent technical programs.",
    image: "/images/dest-belarus.jpg", flag: "/images/flags/by.png",
  },
  {
    name: "Moldova",
    slug: "moldova",
    desc: "Study in Moldova. Affordable, high-quality medical programs, European standards, and a rich cultural experience.",
    image: "/images/dest-moldova.jpg", flag: "/images/flags/md.png",
  },
  {
    name: "Mauritius",
    slug: "mauritius",
    desc: "Study in Mauritius. Tropical campus life, internationally accredited degrees, and a booming regional tech sector.",
    image: "/images/dest-mauritius.jpg", flag: "/images/flags/mu.png",
  }
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
//  DESTINATIONS SECTION
// ═══════════════════════════════════════════════════════════════
export default function Destinations() {
  const router = useRouter();
  const { ref, inView } = useInView();
  const trackRef = useRef<HTMLDivElement>(null);
  const [btnHover, setBtnHover] = useState(false);
  
  // Navigation & Hover States
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // ── Exact Scroll Logic ──
  const checkScroll = () => {
    if (trackRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
      setCanScrollLeft(scrollLeft > 10); 
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (trackRef.current) {
      const cardElement = trackRef.current.children[0] as HTMLElement;
      const scrollAmount = cardElement.offsetWidth + 24; 

      trackRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScroll, 500); 
    }
  };

  // ── Auto-Slider Logic ──
  useEffect(() => {
    if (!inView || isHovered) return;

    const interval = setInterval(() => {
      if (trackRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
        const cardElement = trackRef.current.children[0] as HTMLElement;
        const scrollAmount = cardElement.offsetWidth + 24;

        if (Math.ceil(scrollLeft + clientWidth) >= scrollWidth - 10) {
          trackRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          trackRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
        setTimeout(checkScroll, 500);
      }
    }, 4000); 

    return () => clearInterval(interval);
  }, [inView, isHovered]);

  useEffect(() => {
    checkScroll(); 
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  return (
    <section style={{ padding: "64px 0 80px", background: "#F9FAFB", position: "relative" }}>
      
      <style>{`
        @keyframes destFadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        
        .dest-track::-webkit-scrollbar { display: none; }
        .dest-track {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .dest-card {
          flex: 0 0 calc(85% - 24px); 
          scroll-snap-align: start;
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          height: auto;
        }
        
        @media (min-width: 768px) {
          .dest-card { flex: 0 0 calc(50% - 12px); }
          .dest-header-controls { display: flex !important; }
        }
        
        @media (min-width: 1100px) {
          .dest-card { flex: 0 0 calc(25% - 18px); }
        }

        .dest-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 24px 48px rgba(2,44,69,0.12);
          border-color: rgba(241,97,1,0.3) !important;
        }
        .dest-card:hover .dest-img-inner {
          transform: scale(1.08);
        }
        .dest-card:hover .dest-title {
          color: #F16101 !important;
        }

        /* ── MOBILE OVERRIDES ── */
        @media (max-width: 767px) {
          .dest-section-padding { padding: 56px 0 64px !important; }

          /* Header stacks — hide controls row entirely, show Explore link below heading */
          .dest-header { flex-direction: column !important; align-items: flex-start !important; gap: 16px !important; margin-bottom: 28px !important; }
          .dest-header-text { max-width: 100% !important; }
          .dest-mobile-cta { display: flex !important; }

          /* Slider — remove negative margin bleed, use native padding scroll instead */
          .dest-slider-outer {
            margin: 0 !important;
            padding: 0 !important;
            overflow: hidden !important;
          }
          .dest-track {
            padding-left: 16px !important;
            padding-right: 16px !important;
            padding-bottom: 24px !important;
            gap: 16px !important;
          }
          .dest-card {
            flex: 0 0 80vw !important;
            max-width: 320px;
          }
          /* Card content tighter on mobile */
          .dest-card-content { padding: 28px 18px 18px !important; }
        }
      `}</style>

      {/* Decorative Background */}
      <div style={{
        position: "absolute", top: "-100px", right: "-100px",
        width: "500px", height: "500px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(241,97,1,0.04) 0%, transparent 70%)",
        zIndex: 0, pointerEvents: "none"
      }}/>

      <div ref={ref} style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1, padding: "0 24px" }}>
        
        {/* ── SEO HEADER & NAVIGATION AREA ── */}
        <div className="dest-header" style={{
          display: "flex", justifyContent: "space-between", alignItems: "flex-end",
          marginBottom: "48px", flexWrap: "wrap", gap: "24px",
          animation: inView ? "destFadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both" : "none",
        }}>
          {/* Left Side: Headings & Text */}
          <div className="dest-header-text" style={{ maxWidth: "700px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "9px", marginBottom: "16px" }}>
              <div style={{ width: "30px", height: "2px", borderRadius: "1px", background: "linear-gradient(90deg, #F16101, #C9A24D)" }}/>
              <span style={{ fontSize: "12px", fontWeight: 800, letterSpacing: "2.5px", textTransform: "uppercase", background: "linear-gradient(90deg, #F16101, #C9A24D)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Top Destinations for International Students
              </span>
            </div>
            
            <h2 style={{ fontSize: "clamp(32px, 4vw, 44px)", fontWeight: 900, color: "#022C45", lineHeight: 1.1, letterSpacing: "-0.8px", margin: "0 0 16px" }}>
              Study Abroad at the World's<br/>
              <span style={{ position: "relative", display: "inline-block", background: "linear-gradient(100deg, #F16101 0%, #C9A24D 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Top Universities
                <svg style={{ position: "absolute", bottom: "-6px", left: 0, width: "100%" }} height="5" viewBox="0 0 300 5" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="ulineDest" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#F16101"/>
                      <stop offset="100%" stopColor="#C9A24D"/>
                    </linearGradient>
                  </defs>
                  <path d="M0,3 Q75,0 150,3 Q225,7 300,3" stroke="url(#ulineDest)" strokeWidth="3" fill="none" strokeLinecap="round"/>
                </svg>
              </span>
            </h2>
            
            <p style={{ fontSize: "16px", color: "#6B7280", margin: 0, lineHeight: 1.6, marginTop: "24px", maxWidth: "600px" }}>
              From post-study work visas to permanent residency pathways, explore our curated list of premier study destinations offering global career opportunities.
            </p>

            {/* Mobile-only Explore All CTA — shown below text, hidden on desktop */}
            <Link
              className="dest-mobile-cta"
              href="/countries"
              style={{
                display: "none",
                alignItems: "center", gap: "8px",
                marginTop: "20px",
                color: "#022C45", fontSize: "13.5px", fontWeight: 800,
                textTransform: "uppercase", letterSpacing: "0.8px",
                textDecoration: "none",
              }}
            >
              Explore All Destinations
              <span style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: "28px", height: "28px", borderRadius: "50%",
                background: "rgba(2,44,69,0.05)",
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </span>
            </Link>
          </div>

          {/* Right Side: Sleek CTA & Arrows */}
          <div className="dest-header-controls" style={{ display: "none", alignItems: "center", gap: "32px", paddingBottom: "8px" }}>
            
            <Link href="/countries" 
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                color: btnHover ? "#F16101" : "#022C45",
                fontSize: "13.5px", fontWeight: 800, textTransform: "uppercase",
                letterSpacing: "0.8px", textDecoration: "none",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={() => setBtnHover(true)}
              onMouseLeave={() => setBtnHover(false)}
            >
              Explore All
              <span style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: "28px", height: "28px", borderRadius: "50%",
                background: btnHover ? "rgba(241,97,1,0.1)" : "rgba(2,44,69,0.05)",
                transition: "all 0.3s ease"
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: btnHover ? "translateX(2px)" : "translateX(0)", transition: "transform 0.3s ease" }}>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </span>
            </Link>

            <div style={{ display: "flex", gap: "12px", borderLeft: "1px solid rgba(2,44,69,0.1)", paddingLeft: "32px" }}>
              <button 
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                style={{
                  width: "44px", height: "44px", borderRadius: "50%",
                  background: canScrollLeft ? "white" : "#f8f9fa",
                  border: canScrollLeft ? "1px solid rgba(2,44,69,0.15)" : "1px solid rgba(2,44,69,0.05)",
                  color: canScrollLeft ? "#022C45" : "#d1d5db",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: canScrollLeft ? "pointer" : "not-allowed",
                  transition: "all 0.3s ease",
                  boxShadow: canScrollLeft ? "0 4px 12px rgba(0,0,0,0.06)" : "none",
                }}
                onMouseEnter={(e) => { if(canScrollLeft) { e.currentTarget.style.borderColor = "#F16101"; e.currentTarget.style.color = "#F16101"; } }}
                onMouseLeave={(e) => { if(canScrollLeft) { e.currentTarget.style.borderColor = "rgba(2,44,69,0.15)"; e.currentTarget.style.color = "#022C45"; } }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <button 
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                style={{
                  width: "44px", height: "44px", borderRadius: "50%",
                  background: canScrollRight ? "white" : "#f8f9fa",
                  border: canScrollRight ? "1px solid rgba(2,44,69,0.15)" : "1px solid rgba(2,44,69,0.05)",
                  color: canScrollRight ? "#022C45" : "#d1d5db",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: canScrollRight ? "pointer" : "not-allowed",
                  transition: "all 0.3s ease",
                  boxShadow: canScrollRight ? "0 4px 12px rgba(0,0,0,0.06)" : "none",
                }}
                onMouseEnter={(e) => { if(canScrollRight) { e.currentTarget.style.borderColor = "#F16101"; e.currentTarget.style.color = "#F16101"; } }}
                onMouseLeave={(e) => { if(canScrollRight) { e.currentTarget.style.borderColor = "rgba(2,44,69,0.15)"; e.currentTarget.style.color = "#022C45"; } }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* ── THE STRICT SLIDER CONTAINER ── */}
        <div
          className="dest-slider-outer"
          style={{ 
            margin: "0 -24px", 
            padding: "0 24px", 
            overflow: "hidden" 
          }}
        >
          <div 
            ref={trackRef}
            className="dest-track"
            onScroll={checkScroll}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)} 
            onTouchEnd={() => setIsHovered(false)}
            style={{
              display: "flex",
              gap: "24px",
              alignItems: "stretch", // Ensures all cards match the height of the tallest one
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              paddingBottom: "40px", 
              paddingTop: "10px",
              WebkitOverflowScrolling: "touch",
              animation: inView ? "destFadeUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.1s both" : "none",
            }}
          >
            {destinations.map((country) => (
              
              <div key={country.slug} className="dest-card" style={{
                background: "white",
                borderRadius: "20px",
                border: "1px solid rgba(2,44,69,0.08)",
                overflow: "hidden", 
                display: "flex", flexDirection: "column",
              }}>
                {/* Image & Flag Wrapper */}
                <div style={{ position: "relative", height: "180px", flexShrink: 0 }}>
                  <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
                    <div className="dest-img-inner" style={{ width: "100%", height: "100%", position: "relative", transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)" }}>
                      <Image 
                        src={country.image} 
                        alt={`Study in ${country.name}`} 
                        fill 
                        style={{ objectFit: "cover" }} 
                      />
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 40%, rgba(2,44,69,0.6) 100%)" }}/>
                    </div>
                  </div>
                  
                  <div style={{
                    position: "absolute",
                    bottom: "-24px",
                    right: "24px",
                    width: "56px", height: "56px",
                    borderRadius: "50%",
                    background: "white",
                    padding: "2px", 
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    zIndex: 2
                  }}>
                    <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: "50%", overflow: "hidden", border: "1px solid rgba(0,0,0,0.05)" }}>
                      <Image src={country.flag} alt={`${country.name} Flag`} fill style={{ objectFit: "cover" }} />
                    </div>
                  </div>
                </div>

                {/* Content Wrapper */}
                <div className="dest-card-content" style={{ padding: "32px 24px 24px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                  <h3 className="dest-title" style={{ fontSize: "24px", fontWeight: 900, color: "#022C45", margin: "0 0 10px 0", transition: "color 0.3s ease", letterSpacing: "-0.5px" }}>
                    {country.name}
                  </h3>
                  {/* Fixed minimum height guarantees text variations don't shift layout */}
                  <p style={{ fontSize: "14px", color: "#6B7280", margin: "0 0 24px 0", lineHeight: 1.5, minHeight: "63px" }}>
                    {country.desc}
                  </p>

                  {/* marginTop: 'auto' forces buttons to the absolute bottom of the card */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "auto" }}>
                    <Link href={`/countries/${country.slug}`} style={{
                      display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                      width: "100%", padding: "12px", borderRadius: "10px",
                      background: "#022C45", color: "white", textDecoration: "none",
                      fontSize: "13.5px", fontWeight: 700, transition: "background 0.2s ease"
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#F16101")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "#022C45")}
                    >
                      View Country Guide
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </Link>

                    <button 
                      onClick={() => {
                        router.push(`/contact?country=${encodeURIComponent(country.name)}`);
                      }}
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                        width: "100%", padding: "11px", borderRadius: "10px",
                        background: "transparent", border: "1px solid rgba(2,44,69,0.2)",
                        color: "#022C45", fontSize: "13.5px", fontWeight: 700, 
                        cursor: "pointer", transition: "all 0.2s ease",
                        fontFamily: "inherit"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(241,97,1,0.05)";
                        e.currentTarget.style.borderColor = "#F16101";
                        e.currentTarget.style.color = "#F16101";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.borderColor = "rgba(2,44,69,0.2)";
                        e.currentTarget.style.color = "#022C45";
                      }}
                    >
                      Check Eligibility
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}