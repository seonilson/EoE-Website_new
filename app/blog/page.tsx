"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/blogData";

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

function Section({ children, bg = "#ffffff", style = {} }: { children: React.ReactNode; bg?: string; style?: React.CSSProperties }) {
  return <section style={{ background: bg, position: "relative", overflow: "hidden", ...style }}>{children}</section>;
}

function Eyebrow({ label }: { label: string }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "9px", marginBottom: "16px" }}>
      <div style={{ width: "30px", height: "2px", borderRadius: "1px", background: "linear-gradient(90deg, #F16101, #C9A24D)" }}/>
      <span style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "2.5px", textTransform: "uppercase", background: "linear-gradient(90deg, #F16101, #C9A24D)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{label}</span>
    </div>
  );
}

export default function BlogsPage() {
  const heroRef = useInView(0.1);
  const gridRef = useInView(0.05);
  const ctaRef  = useInView(0.1);

  const [allPosts, setAllPosts]   = useState<BlogPost[]>([]);
  const [loading, setLoading]     = useState(true);
  const [filter, setFilter]       = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [nlEmail, setNlEmail]     = useState("");
  const [nlStatus, setNlStatus]   = useState<"idle"|"loading"|"success"|"error">("idle");
  const [nlMsg, setNlMsg]         = useState("");
  const itemsPerPage = 30;
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);


  // Fetch posts from API on mount
  useEffect(() => {
    fetch("/api/blogs")
      .then(r => r.json())
      .then((data: BlogPost[]) => { setAllPosts(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => { setCurrentPage(1); }, [filter]);

  const categories    = ["All", ...Array.from(new Set(allPosts.map(b => b.category)))];
  const filteredBlogs = filter === "All" ? allPosts : allPosts.filter(b => b.category === filter);
  const featuredBlog  = filteredBlogs[0];
  const remainingBlogs = filteredBlogs.slice(1);
  const totalPages    = Math.ceil(remainingBlogs.length / itemsPerPage);
  const paginatedBlogs = remainingBlogs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(p => p + 1);
      window.scrollTo({ top: document.getElementById("blog-grid")?.offsetTop || 0, behavior: "smooth" });
    }
  };
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(p => p - 1);
      window.scrollTo({ top: document.getElementById("blog-grid")?.offsetTop || 0, behavior: "smooth" });
    }
  };

  return (
    <main style={{ background: "#F9FAFB", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        @keyframes float1 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
        @keyframes float2 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(12px); } }
        @keyframes glowPulseCyan { 0%, 100% { filter: drop-shadow(0 0 15px rgba(7,203,235,0.15)); } 50% { filter: drop-shadow(0 0 40px rgba(7,203,235,0.3)); } }
        @keyframes spin { to { transform: rotate(360deg); } }

        .filter-btn { padding: 10px 24px; border-radius: 999px; font-size: 14px; font-weight: 700; cursor: pointer; transition: all 0.3s cubic-bezier(0.22,1,0.36,1); border: 1px solid rgba(2,44,69,0.1); background: #ffffff; color: #4B5563; box-shadow: 0 4px 12px rgba(0,0,0,0.02); font-family: inherit; }
        .filter-btn:hover { border-color: #07CBEB; color: #022C45; transform: translateY(-2px); box-shadow: 0 8px 16px rgba(7,203,235,0.1); }
        .filter-btn.active { background: #022C45; color: #ffffff; border-color: #022C45; box-shadow: 0 8px 20px rgba(2,44,69,0.2); }

        .blog-card { background: #ffffff; border-radius: 20px; overflow: hidden; border: 1px solid rgba(2,44,69,0.06); box-shadow: 0 12px 32px rgba(2,44,69,0.03); transition: all 0.4s cubic-bezier(0.22,1,0.36,1); display: flex; flex-direction: column; height: 100%; }
        .blog-card:hover { transform: translateY(-8px); box-shadow: 0 24px 48px rgba(2,44,69,0.12); border-color: rgba(241,97,1,0.2); }
        .blog-img-wrap { width: 100%; aspect-ratio: 16/10; position: relative; overflow: hidden; background: #eaedf0; }
        .blog-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.7s cubic-bezier(0.22,1,0.36,1); }
        .blog-card:hover .blog-img { transform: scale(1.08); }

        .featured-card { display: flex; flex-wrap: wrap; background: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 24px 48px rgba(2,44,69,0.06); border: 1px solid rgba(2,44,69,0.05); transition: all 0.4s cubic-bezier(0.22,1,0.36,1); cursor: pointer; text-decoration: none; }
        .featured-card:hover { transform: translateY(-8px); box-shadow: 0 32px 64px rgba(2,44,69,0.12); border-color: rgba(7,203,235,0.3); }
        .featured-img-wrap { flex: 1 1 50%; position: relative; min-height: 400px; overflow: hidden; }
        @media (max-width: 767px) {
          .featured-card { flex-direction: column !important; }
          .featured-img-wrap { flex: 0 0 auto; min-height: 220px; width: 100%; }
          .featured-content { flex: 0 0 auto; padding: 24px 20px !important; }
        }
        .featured-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.7s cubic-bezier(0.22,1,0.36,1); }
        .featured-card:hover .featured-img { transform: scale(1.05); }
        .featured-content { flex: 1 1 50%; padding: 56px 48px; display: flex; flex-direction: column; justify-content: center; }

        .page-btn { width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 1px solid rgba(2,44,69,0.1); background: #ffffff; color: #022C45; font-weight: 800; cursor: pointer; transition: all 0.3s ease; font-family: inherit; }
        .page-btn:hover:not(:disabled) { background: #F16101; color: white; border-color: #F16101; box-shadow: 0 8px 16px rgba(241,97,1,0.2); }
        .page-btn:disabled { opacity: 0.3; cursor: not-allowed; }
        .newsletter-input::placeholder { color: rgba(255,255,255,0.5); }
      `}</style>

      {/* ── HERO ── */}
      <Section bg="linear-gradient(105deg, #f4fbfc 0%, #e0f7fa 100%)" style={{ padding: "0", minHeight: "auto", display: "flex", alignItems: "center", paddingTop: "40px" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: `linear-gradient(rgba(7,203,235,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(7,203,235,0.1) 1px, transparent 1px)`, backgroundSize: "64px 64px" }}/>

        <div ref={heroRef.ref} style={{ maxWidth: "1280px", width: "100%", margin: "0 auto", padding: isMobile ? "20px 20px 40px" : "20px 24px 80px", position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: isMobile ? "24px" : "40px", flexWrap: "wrap" }}>
          <div style={{ flex: isMobile ? "0 0 100%" : "1 1 550px", width: isMobile ? "100%" : undefined }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.6)", border: "1px solid rgba(7,203,235,0.3)", borderRadius: "999px", padding: "6px 16px", marginBottom: "24px", animation: heroRef.inView ? "fadeSlideUp 0.5s ease 0.1s both" : "none" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#F16101", display: "inline-block", boxShadow: "0 0 10px rgba(241,97,1,0.5)" }}/>
              <span style={{ fontSize: "12px", fontWeight: 800, color: "#022C45", letterSpacing: "0.4px", textTransform: "uppercase" }}>The Edification Journal</span>
            </div>
            <h1 style={{ fontSize: "clamp(40px, 5vw, 64px)", fontWeight: 900, color: "#022C45", lineHeight: 1.1, letterSpacing: "-1px", marginBottom: "24px", animation: heroRef.inView ? "fadeSlideUp 0.55s ease 0.2s both" : "none" }}>
              Master Your Study<br/>
              <span style={{ color: "#F16101", position: "relative", display: "inline-block" }}>
                Abroad Journey.
                <svg aria-hidden="true" style={{ position: "absolute", bottom: "-14px", left: "-2%", width: "104%", overflow: "visible" }} height="8" viewBox="0 0 200 8" preserveAspectRatio="none"><path d="M0,5 Q50,0 100,5 Q150,10 200,5" stroke="#F16101" strokeWidth="4.5" fill="none" strokeLinecap="round"/></svg>
              </span>
            </h1>
            <p style={{ fontSize: "clamp(15px, 1.8vw, 17px)", color: "#4B5563", lineHeight: 1.7, marginBottom: "40px", maxWidth: "540px", animation: heroRef.inView ? "fadeSlideUp 0.55s ease 0.3s both" : "none" }}>
              Stay completely updated with the latest visa policies, destination guides, and expert tips to ensure your international transition is flawless.
            </p>
          </div>

          {!isMobile && (<div style={{ flex: "1 1 450px", position: "relative", minHeight: "400px", animation: heroRef.inView ? "scaleIn 0.8s cubic-bezier(0.22,1,0.36,1) 0.3s both" : "none", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{ position: "absolute", width: "350px", height: "350px", background: "rgba(255,255,255,0.4)", borderRadius: "50%", animation: "glowPulseCyan 4s infinite" }}/>
            <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: "420px", aspectRatio: "1/1", display: "flex", alignItems: "center", justifyContent: "center", animation: "float1 6s infinite ease-in-out", overflow: "visible" }}>
              <Image src="/images/blog-collage.png" alt="Blog Hero Graphic" fill style={{ objectFit: "contain" }} priority unoptimized/>
            </div>
            <div style={{ position: "absolute", top: "20px", left: "-20px", zIndex: 3, animation: "float2 5s infinite" }}>
              <div style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,1)", padding: "12px 20px", borderRadius: "16px", display: "flex", alignItems: "center", gap: "10px", boxShadow: "0 16px 40px rgba(2,44,69,0.08)" }}>
                <span style={{ fontSize: "20px" }}>📰</span>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "10px", color: "#F16101", textTransform: "uppercase", fontWeight: 800 }}>Latest News</span>
                  <span style={{ fontSize: "14px", fontWeight: 900, color: "#022C45" }}>Visa Updates</span>
                </div>
              </div>
            </div>
            <div style={{ position: "absolute", bottom: "40px", right: "-20px", zIndex: 3, animation: "float1 7s infinite reverse" }}>
              <div style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,1)", padding: "12px 20px", borderRadius: "16px", display: "flex", alignItems: "center", gap: "10px", boxShadow: "0 16px 40px rgba(2,44,69,0.08)" }}>
                <span style={{ fontSize: "20px" }}>🌍</span>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "10px", color: "#F16101", textTransform: "uppercase", fontWeight: 800 }}>Expert Advice</span>
                  <span style={{ fontSize: "14px", fontWeight: 900, color: "#022C45" }}>Destination Guides</span>
                </div>
              </div>
            </div>
          </div>)}
        </div>

        {!isMobile && (
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, lineHeight: 0, zIndex: 1 }}>
            <svg viewBox="0 0 1440 120" style={{ display: "block", width: "100%", height: "60px" }} preserveAspectRatio="none">
              <path d="M0,120 C480,0 960,0 1440,120 L0,120 Z" fill="#F9FAFB"/>
            </svg>
          </div>
        )}
      </Section>

      {/* ── BLOG GRID ── */}
      <section id="blog-grid" style={{ padding: isMobile ? "40px 0 64px" : "80px 0 120px" }}>
        <div ref={gridRef.ref} style={{ maxWidth: "1280px", margin: "0 auto", padding: isMobile ? "0 16px" : "0 24px" }}>

          <div style={{ textAlign: "center", marginBottom: "40px", animation: gridRef.inView ? "fadeSlideUp 0.6s ease both" : "none" }}>
            <Eyebrow label="Read Our Latest"/>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 900, color: "#022C45", margin: 0, letterSpacing: "-0.5px" }}>Explore The Journal</h2>
          </div>

          {/* Loading state */}
          {loading && (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <div style={{ width: "36px", height: "36px", border: "3px solid rgba(2,44,69,0.1)", borderTop: "3px solid #F16101", borderRadius: "50%", margin: "0 auto 16px", animation: "spin 0.8s linear infinite" }}/>
              <p style={{ color: "#9CA3AF", fontWeight: 600 }}>Loading articles...</p>
            </div>
          )}

          {!loading && (
            <>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "12px", marginBottom: "56px", animation: gridRef.inView ? "fadeSlideUp 0.5s ease 0.1s both" : "none" }}>
                {categories.map(cat => (
                  <button key={cat} className={`filter-btn ${filter === cat ? "active" : ""}`} onClick={() => setFilter(cat)}>{cat}</button>
                ))}
              </div>

              {/* Featured */}
              {currentPage === 1 && featuredBlog && (
                <div style={{ animation: gridRef.inView ? "fadeSlideUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.1s both" : "none", marginBottom: "48px" }}>
                  <Link href={`/blog/${featuredBlog.slug}`} className="featured-card">
                    <div className="featured-img-wrap">
                      <Image src={featuredBlog.coverImage} alt={featuredBlog.title} fill className="featured-img" priority unoptimized/>
                      <div style={{ position: "absolute", top: "24px", left: "24px", background: "#F16101", color: "white", padding: "8px 16px", borderRadius: "8px", fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px", boxShadow: "0 8px 16px rgba(241,97,1,0.3)" }}>Featured</div>
                    </div>
                    <div className="featured-content">
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", fontWeight: 700, color: "#07CBEB", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "16px" }}>
                        {featuredBlog.category} <span style={{ color: "#D1D5DB" }}>●</span> <span style={{ color: "#9CA3AF" }}>{featuredBlog.readTime}</span>
                      </div>
                      <h2 style={{ fontSize: "clamp(28px, 3vw, 36px)", fontWeight: 900, color: "#022C45", lineHeight: 1.2, margin: "0 0 16px", letterSpacing: "-0.5px" }}>{featuredBlog.title}</h2>
                      <p style={{ fontSize: "16px", color: "#6B7280", lineHeight: 1.7, margin: "0 0 32px", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{featuredBlog.excerpt}</p>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", marginTop: "auto" }}>
                        <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "rgba(7,203,235,0.1)", color: "#07CBEB", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              )}

              {/* Grid */}
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(340px, 1fr))", gap: isMobile ? "20px" : "32px" }}>
                {paginatedBlogs.map((blog, index) => (
                  <Link href={`/blog/${blog.slug}`} key={blog.id} style={{ textDecoration: "none" }}>
                    <div className="blog-card" style={{ animation: gridRef.inView ? `scaleIn 0.5s ease ${0.2 + (index % 10) * 0.05}s both` : "none" }}>
                      <div className="blog-img-wrap">
                        <Image src={blog.coverImage} alt={blog.title} fill className="blog-img" unoptimized/>
                        <div style={{ position: "absolute", top: "16px", left: "16px", background: "rgba(255,255,255,0.95)", backdropFilter: "blur(4px)", padding: "6px 12px", borderRadius: "6px", fontSize: "11px", fontWeight: 800, color: "#F16101", textTransform: "uppercase", letterSpacing: "1px" }}>{blog.category}</div>
                      </div>
                      <div style={{ padding: "28px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", fontWeight: 600, color: "#9CA3AF", marginBottom: "12px" }}>
                          <span>{blog.date}</span> <span>●</span> <span>{blog.readTime}</span>
                        </div>
                        <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#022C45", lineHeight: 1.3, margin: "0 0 12px", letterSpacing: "-0.3px" }}>{blog.title}</h3>
                        <p style={{ fontSize: "14.5px", color: "#6B7280", lineHeight: 1.6, margin: "0 0 24px", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{blog.excerpt}</p>
                        <div style={{ marginTop: "auto", fontSize: "13px", fontWeight: 800, color: "#F16101", textTransform: "uppercase", letterSpacing: "1px", display: "flex", alignItems: "center", gap: "6px" }}>
                          Read Article <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {filteredBlogs.length === 0 && (
                <div style={{ textAlign: "center", padding: "60px 0", color: "#6B7280", fontWeight: 600 }}>No articles found for this category.</div>
              )}

              {totalPages > 1 && (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", marginTop: "64px" }}>
                  <button className="page-btn" onClick={handlePrevPage} disabled={currentPage === 1}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
                  </button>
                  <div style={{ fontSize: "15px", fontWeight: 800, color: "#022C45" }}>Page {currentPage} of {totalPages}</div>
                  <button className="page-btn" onClick={handleNextPage} disabled={currentPage === totalPages}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ── NEWSLETTER CTA ── */}
      <Section bg="#ffffff" style={{ padding: isMobile ? "32px 0 56px" : "40px 0 100px" }}>
        <div ref={ctaRef.ref} style={{ maxWidth: "1000px", margin: "0 auto", padding: isMobile ? "0 16px" : "0 24px" }}>
          <div style={{ background: "linear-gradient(135deg, #022C45 0%, #054f77 100%)", borderRadius: "24px", padding: isMobile ? "32px 20px" : "56px 64px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "40px", flexWrap: "wrap", position: "relative", overflow: "hidden", boxShadow: "0 24px 48px rgba(7,203,235,0.15)", animation: ctaRef.inView ? "scaleIn 0.6s cubic-bezier(0.22,1,0.36,1) both" : "none", opacity: ctaRef.inView ? 1 : 0 }}>
            <div style={{ position: "absolute", right: "-80px", top: "-80px", width: "320px", height: "320px", borderRadius: "50%", background: "radial-gradient(circle, rgba(7,203,235,0.2) 0%, transparent 70%)", pointerEvents: "none" }}/>
            <div style={{ position: "absolute", left: "-40px", bottom: "-40px", width: "200px", height: "200px", borderRadius: "50%", background: "radial-gradient(circle, rgba(241,97,1,0.15) 0%, transparent 70%)", pointerEvents: "none" }}/>
            <div style={{ position: "relative", zIndex: 1, flex: "1 1 400px" }}>
              <h2 style={{ fontSize: "clamp(28px, 3.5vw, 36px)", fontWeight: 900, color: "white", letterSpacing: "-0.5px", margin: "0 0 16px" }}>Join the Edification Newsletter</h2>
              <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.7)", margin: 0, lineHeight: 1.6, maxWidth: "480px" }}>Get the latest global visa updates, exclusive scholarship alerts, and step-by-step study abroad guides delivered straight to your inbox.</p>
            </div>
            <div style={{ flex: "1 1 350px", position: "relative", zIndex: 1 }}>
              <form onSubmit={async (e) => {
                e.preventDefault();
                setNlStatus("loading"); setNlMsg("");
                try {
                  const res  = await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: nlEmail }) });
                  const data = await res.json();
                  if (data.success) { setNlStatus("success"); setNlMsg(data.message); setNlEmail(""); }
                  else { setNlStatus("error"); setNlMsg(data.message); }
                } catch { setNlStatus("error"); setNlMsg("Network error. Please try again."); }
              }} style={{ display: "flex", gap: "12px", width: "100%", flexWrap: "wrap" }}>
                <input type="email" placeholder="Enter your email address" required value={nlEmail} onChange={e => setNlEmail(e.target.value)} className="newsletter-input" style={{ flex: "1 1 200px", padding: "16px 24px", borderRadius: "12px", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "white", outline: "none", fontSize: "15px", fontFamily: "inherit" }}/>
                <button type="submit" disabled={nlStatus==="loading"} style={{ background: nlStatus==="loading"?"#9CA3AF":"#F16101", color: "white", padding: "16px 32px", borderRadius: "12px", border: "none", fontSize: "15px", fontWeight: 800, textTransform: "uppercase", cursor: nlStatus==="loading"?"not-allowed":"pointer", letterSpacing: "0.5px", boxShadow: "0 8px 24px rgba(241,97,1,0.2)", flexShrink: 0, fontFamily: "inherit" }}>
                  {nlStatus==="loading" ? "..." : "Subscribe"}
                </button>
              </form>
              {nlStatus==="success" && <div style={{ marginTop:"10px",padding:"10px 16px",background:"rgba(34,197,94,0.15)",borderRadius:"8px",border:"1px solid rgba(34,197,94,0.3)" }}><p style={{ margin:0,fontSize:"13px",fontWeight:700,color:"#86efac" }}>✓ {nlMsg}</p></div>}
              {nlStatus==="error"   && <div style={{ marginTop:"10px",padding:"10px 16px",background:"rgba(239,68,68,0.15)",borderRadius:"8px",border:"1px solid rgba(239,68,68,0.3)" }}><p style={{ margin:0,fontSize:"13px",fontWeight:700,color:"#fca5a5" }}>⚠ {nlMsg}</p></div>}
              {nlStatus==="idle"    && <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", marginTop: "12px", fontWeight: 500 }}>By subscribing, you agree to our Privacy Policy.</div>}
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}
