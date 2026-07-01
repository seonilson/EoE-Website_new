"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/lib/blogData";


// ── InView Hook ───────────────────────────────────────────────
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
export default function RecentBlogs() {
  const [blogs, setBlogs] = React.useState<BlogPost[]>([]);

  React.useEffect(() => {
    fetch("/api/blogs")
      .then(r => r.json())
      .then((data: BlogPost[]) => setBlogs(data.slice(0, 5)))
      .catch(() => {});
  }, []);

  const { ref, inView } = useInView();
  const [linkH, setLinkH] = useState(false);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const total = blogs.length;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const next = useCallback(() => {
    if (total > 0) setActive(a => (a + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    if (total > 0) setActive(a => (a - 1 + total) % total);
  }, [total]);

  // Auto-slide every 3.5s
  useEffect(() => {
    if (paused || total === 0) return;
    const t = setInterval(next, 3500);
    return () => clearInterval(t);
  }, [paused, next, total]);

  // Visible indices: prev, active, next
  const getIndex = (offset: number) => {
    if (total === 0) return 0;
    return (active + offset + total) % total;
  };

  // Touch-swipe state for mobile
  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) dx < 0 ? next() : prev();
    touchStartX.current = null;
  };

  return (
    <section style={{
      padding: isMobile ? "64px 0" : "120px 0",
      background: "#F9FAFB",
      position: "relative",
      overflow: "hidden",
    }}>
      <style>{`
        @keyframes editorialFadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .blog-card-wrap {
          transition: transform 0.7s cubic-bezier(0.22,1,0.36,1),
                      opacity 0.7s cubic-bezier(0.22,1,0.36,1),
                      filter 0.7s cubic-bezier(0.22,1,0.36,1);
          transform-style: preserve-3d;
          will-change: transform, opacity;
        }
      `}</style>

      {/* Decorative background */}
      <div style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width: "800px", height: "600px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(201,162,77,0.02) 0%, transparent 60%)",
        pointerEvents: "none", zIndex: 0,
      }}/>

      <div
        ref={ref}
        style={{ maxWidth: "1280px", margin: "0 auto", padding: isMobile ? "0 16px" : "0 24px", position: "relative", zIndex: 1 }}
      >

        {/* ── SECTION HEADER ── */}
        <div style={{
          display: "flex",
          justifyContent: isMobile ? "flex-start" : "space-between",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "flex-end",
          marginBottom: isMobile ? "36px" : "72px",
          gap: isMobile ? "16px" : "24px",
          animation: inView ? "editorialFadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both" : "none",
        }}>
          <div style={{ maxWidth: "620px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "9px", marginBottom: "16px" }}>
              <div style={{ width: "30px", height: "2px", borderRadius: "1px", background: "linear-gradient(90deg, #F16101, #C9A24D)" }}/>
              <span style={{
                fontSize: "11px", fontWeight: 800, letterSpacing: "2.5px", textTransform: "uppercase",
                background: "linear-gradient(90deg, #F16101, #C9A24D)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>The Edification Journal</span>
            </div>
            <h2 style={{
              fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900, color: "#022C45",
              lineHeight: 1.1, letterSpacing: "-0.8px", margin: "0 0 16px",
            }}>
              Master Your Study<br/>
              <span style={{
                position: "relative", display: "inline-block",
                background: "linear-gradient(100deg, #F16101 0%, #C9A24D 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>
                Abroad Journey
                <svg style={{ position: "absolute", bottom: "-6px", left: 0, width: "100%" }} height="5" viewBox="0 0 300 5" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="ulineBlog" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#F16101"/><stop offset="100%" stopColor="#C9A24D"/>
                    </linearGradient>
                  </defs>
                  <path d="M0,3 Q75,0 150,3 Q225,7 300,3" stroke="url(#ulineBlog)" strokeWidth="3" fill="none" strokeLinecap="round"/>
                </svg>
              </span>
            </h2>
            <p style={{ fontSize: isMobile ? "14px" : "16px", color: "#6B7280", lineHeight: 1.6, margin: "0", marginTop: "24px", maxWidth: "600px" }}>
              Stay updated with the latest visa policies, destination guides, and expert tips to ensure your international transition is flawless.
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", paddingBottom: isMobile ? "0" : "8px" }}>
            <Link href="/blog" style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              color: linkH ? "#F16101" : "#022C45",
              fontSize: "13.5px", fontWeight: 800, textTransform: "uppercase",
              letterSpacing: "0.8px", textDecoration: "none", transition: "color 0.3s ease", whiteSpace: "nowrap",
            }}
              onMouseEnter={() => setLinkH(true)}
              onMouseLeave={() => setLinkH(false)}
            >
              Explore All Articles
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
        </div>

        {/* ── CAROUSEL ── */}
        {blogs.length > 0 && (
          <div
            style={{ opacity: inView ? 1 : 0, transition: "opacity 0.7s ease 0.3s" }}
            onMouseEnter={() => !isMobile && setPaused(true)}
            onMouseLeave={() => !isMobile && setPaused(false)}
          >
            {isMobile ? (
              /* ── MOBILE: full-width single card with swipe ── */
              <div
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                {(() => {
                  const blog = blogs[active];
                  if (!blog) return null;
                  return (
                    <Link href={`/blog/${blog.slug}`} style={{ textDecoration: "none", display: "block" }}>
                      <div style={{
                        position: "relative", width: "100%", aspectRatio: "16 / 9",
                        borderRadius: "12px", overflow: "hidden", background: "#dde3ea",
                        marginBottom: "16px",
                      }}>
                        <Image
                          src={blog.coverImage || "/images/placeholder.jpg"}
                          alt={blog.title || "Blog Post"}
                          fill
                          style={{ objectFit: "cover" }}
                          sizes="100vw"
                        />
                        <div style={{
                          position: "absolute", top: "12px", left: "12px",
                          display: "inline-flex", alignItems: "center", justifyContent: "center",
                          padding: "4px 10px", borderRadius: "3px",
                          background: "rgba(255,255,255,0.95)", backdropFilter: "blur(6px)", lineHeight: 1,
                        }}>
                          <span style={{ fontSize: "9px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px", color: "#F16101", lineHeight: 1, display: "block" }}>
                            {blog.category}
                          </span>
                        </div>
                      </div>

                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "10px" }}>
                          <span style={{ fontSize: "11px", fontWeight: 500, color: "#B0B8C1" }}>{blog.date}</span>
                          <span style={{ fontSize: "8px", color: "#D1D5DB" }}>●</span>
                          <span style={{ fontSize: "11px", fontWeight: 500, color: "#B0B8C1" }}>{blog.readTime}</span>
                        </div>
                        <h3 style={{
                          fontSize: "17px", fontWeight: 800, color: "#022C45",
                          lineHeight: 1.4, margin: "0 0 10px", letterSpacing: "-0.2px",
                          display: "-webkit-box", WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical", overflow: "hidden",
                        }}>
                          {blog.title}
                        </h3>
                        <p style={{
                          fontSize: "13px", color: "#6B7280",
                          lineHeight: 1.65, margin: "0 0 18px",
                          display: "-webkit-box", WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical", overflow: "hidden",
                        }}>
                          {blog.excerpt}
                        </p>
                        <div style={{
                          display: "inline-flex", alignItems: "center", gap: "6px",
                          padding: "7px 16px", borderRadius: "4px",
                          border: "1px solid #F16101", background: "transparent",
                        }}>
                          <span style={{ fontSize: "9px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1.2px", color: "#F16101" }}>Read Article</span>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#F16101" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                          </svg>
                        </div>
                      </div>
                    </Link>
                  );
                })()}

                {/* Mobile dots + arrows */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "20px", marginTop: "24px" }}>
                  <button onClick={prev} style={{
                    width: "36px", height: "36px", borderRadius: "50%",
                    border: "1px solid rgba(2,44,69,0.12)", background: "#fff", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 18 9 12 15 6"/>
                    </svg>
                  </button>

                  <div style={{ display: "flex", gap: "7px", alignItems: "center" }}>
                    {blogs.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActive(i)}
                        style={{
                          width: i === active ? "24px" : "7px", height: "7px",
                          borderRadius: "999px", border: "none",
                          background: i === active ? "#F16101" : "rgba(2,44,69,0.15)",
                          cursor: "pointer", padding: 0,
                          transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)",
                        }}
                      />
                    ))}
                  </div>

                  <button onClick={next} style={{
                    width: "36px", height: "36px", borderRadius: "50%",
                    border: "1px solid rgba(2,44,69,0.12)", background: "#fff", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>
                  </button>
                </div>
              </div>
            ) : (
              /* ── DESKTOP: original 3D carousel ── */
              <>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1.55fr 1fr",
                  gap: "20px",
                  alignItems: "center",
                  marginBottom: "32px",
                  perspective: "1200px",
                }}>
                  {[-1, 0, 1].map((offset) => {
                    const blog = blogs[getIndex(offset)];
                    if (!blog) return <div key={`empty-${offset}`} />;

                    const isCenter = offset === 0;
                    const rotateY = offset === -1 ? "rotateY(32deg)" : offset === 1 ? "rotateY(-32deg)" : "rotateY(0deg)";

                    return (
                      <div
                        key={`${offset}-${active}`}
                        className="blog-card-wrap"
                        onClick={() => !isCenter && (offset === -1 ? prev() : next())}
                        style={{
                          opacity: isCenter ? 1 : 0.5,
                          filter: isCenter ? "none" : "blur(1px)",
                          transform: `${rotateY} scale(${isCenter ? 1 : 0.92})`,
                          transformOrigin: offset === -1 ? "right center" : offset === 1 ? "left center" : "center center",
                          cursor: isCenter ? "default" : "pointer",
                        }}
                      >
                        <Link
                          href={isCenter ? `/blog/${blog.slug}` : "#"}
                          onClick={e => !isCenter && e.preventDefault()}
                          style={{ textDecoration: "none", display: "block" }}
                        >
                          <div style={{
                            position: "relative", width: "100%", aspectRatio: "16 / 10",
                            borderRadius: isCenter ? "12px" : "8px", overflow: "hidden",
                            background: "#dde3ea", marginBottom: "16px",
                            transition: "border-radius 0.6s ease",
                          }}>
                            <Image
                              src={blog.coverImage || "/images/placeholder.jpg"}
                              alt={blog.title || "Blog Post"}
                              fill
                              style={{ objectFit: "cover" }}
                              sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            {isCenter && (
                              <div style={{
                                position: "absolute", top: "12px", left: "12px",
                                display: "inline-flex", alignItems: "center", justifyContent: "center",
                                padding: "4px 10px", borderRadius: "3px",
                                background: "rgba(255,255,255,0.95)", backdropFilter: "blur(6px)", lineHeight: 1,
                              }}>
                                <span style={{ fontSize: "9px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px", color: "#F16101", lineHeight: 1, display: "block" }}>
                                  {blog.category}
                                </span>
                              </div>
                            )}
                          </div>

                          {isCenter && (
                            <div>
                              <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "10px" }}>
                                <span style={{ fontSize: "11px", fontWeight: 500, color: "#B0B8C1" }}>{blog.date}</span>
                                <span style={{ fontSize: "8px", color: "#D1D5DB" }}>●</span>
                                <span style={{ fontSize: "11px", fontWeight: 500, color: "#B0B8C1" }}>{blog.readTime}</span>
                              </div>
                              <h3 style={{
                                fontSize: "17px", fontWeight: 800, color: "#022C45",
                                lineHeight: 1.4, margin: "0 0 10px", letterSpacing: "-0.2px",
                                display: "-webkit-box", WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical", overflow: "hidden",
                              }}>
                                {blog.title}
                              </h3>
                              <p style={{
                                fontSize: "13px", color: "#6B7280",
                                lineHeight: 1.65, margin: "0 0 18px",
                                display: "-webkit-box", WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical", overflow: "hidden",
                              }}>
                                {blog.excerpt}
                              </p>
                              <div style={{
                                display: "inline-flex", alignItems: "center", gap: "6px",
                                padding: "7px 16px", borderRadius: "4px",
                                border: "1px solid #F16101", background: "transparent",
                                transition: "all 0.3s ease",
                              }}>
                                <span style={{ fontSize: "9px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1.2px", color: "#F16101" }}>Read Article</span>
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#F16101" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                                </svg>
                              </div>
                            </div>
                          )}
                        </Link>
                      </div>
                    );
                  })}
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "24px" }}>
                  <button onClick={prev} style={{
                    width: "36px", height: "36px", borderRadius: "50%",
                    border: "1px solid rgba(2,44,69,0.12)",
                    background: "#fff", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.2s ease",
                  }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#F16101"; (e.currentTarget as HTMLButtonElement).style.background = "#F16101"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(2,44,69,0.12)"; (e.currentTarget as HTMLButtonElement).style.background = "#fff"; }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 18 9 12 15 6"/>
                    </svg>
                  </button>

                  <div style={{ display: "flex", gap: "7px", alignItems: "center" }}>
                    {blogs.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActive(i)}
                        style={{
                          width: i === active ? "24px" : "7px", height: "7px",
                          borderRadius: "999px", border: "none",
                          background: i === active ? "#F16101" : "rgba(2,44,69,0.15)",
                          cursor: "pointer", padding: 0,
                          transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)",
                        }}
                      />
                    ))}
                  </div>

                  <button onClick={next} style={{
                    width: "36px", height: "36px", borderRadius: "50%",
                    border: "1px solid rgba(2,44,69,0.12)",
                    background: "#fff", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.2s ease",
                  }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#F16101"; (e.currentTarget as HTMLButtonElement).style.background = "#F16101"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(2,44,69,0.12)"; (e.currentTarget as HTMLButtonElement).style.background = "#fff"; }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}