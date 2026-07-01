"use client";
import React, { use, useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/blogData";
import BlogArticleSchema from "@/components/shared/BlogArticleSchema";

function Section({ children, bg = "#ffffff", style = {} }: { children: React.ReactNode; bg?: string; style?: React.CSSProperties }) {
  return <section style={{ background: bg, position: "relative", overflow: "hidden", ...style }}>{children}</section>;
}

const sharePlatforms = [
  { name: "Facebook",    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
  { name: "LinkedIn",    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg> },
  { name: "WhatsApp",    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.422-.885-.746-1.482-1.668-1.656-1.965-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.012c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.052 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg> },
  { name: "Twitter / X", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
];

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const [blog, setBlog]         = useState<BlogPost | null>(null);
  const [related, setRelated]   = useState<BlogPost[]>([]);
  const [loading, setLoading]   = useState(true);
  const [activeSection, setActiveSection] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);


  // Fetch all posts and find the right one
  useEffect(() => {
    fetch("/api/blogs")
      .then(r => r.json())
      .then((posts: BlogPost[]) => {
        const found = posts.find(b => b.slug === slug) || null;
        setBlog(found);
        if (found) { document.title = `${found.title} | Edification Overseas`;
          setRelated(posts.filter(b => b.slug !== slug).sort((a, b) => a.category === found.category ? -1 : 1).slice(0, 3));
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      const headings = document.querySelectorAll(".blog-h2");
      headings.forEach((el, i) => { if (el.getBoundingClientRect().top <= 120) setActiveSection(i); });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Loading screen
  if (loading) {
    return (
      <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: "36px", height: "36px", border: "3px solid rgba(2,44,69,0.1)", borderTop: "3px solid #F16101", borderRadius: "50%", margin: "0 auto 16px", animation: "spin 0.8s linear infinite" }}/>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <p style={{ color: "#9CA3AF", fontWeight: 600 }}>Loading article...</p>
        </div>
      </main>
    );
  }

  // 404
  if (!blog) {
    return (
      <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "32px", fontWeight: 900, color: "#022C45" }}>Article Not Found</h1>
          <p style={{ color: "#6B7280", marginBottom: "24px" }}>This article may have been removed or the link is incorrect.</p>
          <Link href="/blog" style={{ color: "#F16101", fontWeight: 700, textDecoration: "none" }}>← Back to Journal</Link>
        </div>
      </main>
    );
  }

  const headings = blog.content.filter(s => s.type === "h2" && s.content).map(s => s.content!);

  return (
    <main style={{ background: "#ffffff", minHeight: "100vh", overflowX: "hidden" }}>
      <BlogArticleSchema post={blog} />
      <style>{`
        @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin { to { transform: rotate(360deg); } }

        .article-body p { font-size: 16px; color: #374151; line-height: 1.85; margin-bottom: 24px; }
        .article-body p:first-child { font-size: 17.5px; font-weight: 600; color: #022C45; line-height: 1.75; }

        .sidebar-sticky { position: sticky; top: 100px; }

        .toc-link { display: block; padding: 8px 12px; border-radius: 8px; font-size: 13px; font-weight: 600; color: #6B7280; text-decoration: none; cursor: pointer; border-left: 2px solid transparent; transition: all 0.25s ease; line-height: 1.4; }
        .toc-link:hover { color: #022C45; background: rgba(2,44,69,0.04); }
        .toc-link.active { color: #F16101; font-weight: 800; border-left-color: #F16101; background: rgba(241,97,1,0.05); }

        .share-btn { width: 38px; height: 38px; border-radius: 10px; display: flex; align-items: center; justify-content: center; border: 1px solid rgba(2,44,69,0.1); background: rgba(2,44,69,0.03); color: #022C45; cursor: pointer; transition: all 0.25s ease; }
        .share-btn:hover { transform: translateY(-3px); box-shadow: 0 6px 16px rgba(241,97,1,0.2); background: #F16101; color: #fff; border-color: #F16101; }

        .related-card { border-radius: 14px; overflow: hidden; border: 1px solid rgba(2,44,69,0.07); background: #fff; text-decoration: none; display: flex; flex-direction: column; transition: all 0.3s cubic-bezier(0.22,1,0.36,1); }
        .related-card:hover { transform: translateY(-5px); box-shadow: 0 16px 40px rgba(2,44,69,0.10); border-color: rgba(241,97,1,0.2); }

        .keyword-tag { background: rgba(7,203,235,0.08); border: 1px solid rgba(7,203,235,0.2); color: #022C45; font-size: 12px; font-weight: 600; padding: 5px 12px; border-radius: 999px; white-space: nowrap; }
        .blog-list-item { display: flex; align-items: flex-start; gap: 12px; padding: 13px 16px; border-radius: 10px; background: #F9FAFB; border: 1px solid rgba(2,44,69,0.06); font-size: 15px; color: #374151; line-height: 1.6; margin-bottom: 10px; }
        .blog-quote { margin: 28px 0; padding: 22px 24px; background: #F0FBFD; border-left: 4px solid #07CBEB; border-radius: 0 14px 14px 0; }

        @media (max-width: 1024px) { .blog-layout { flex-direction: column !important; } .sidebar-col { display: none !important; } }
        @media (max-width: 640px)  { .related-grid { grid-template-columns: 1fr !important; } }
      `}</style>

      {/* ── HERO ── */}
      <Section bg="linear-gradient(105deg, #ffffff 0%, #fdf6ee 40%, #fde8c8 100%)" style={{ padding: "0" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: `linear-gradient(rgba(241,97,1,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(241,97,1,0.03) 1px, transparent 1px)`, backgroundSize: "64px 64px" }}/>
        <div style={{ maxWidth: "1100px", margin: "auto", padding: isMobile ? "28px 20px 40px" : "80px 24px 60px", position: "relative", zIndex: 1 }}>

          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px", animation: "fadeSlideUp 0.4s ease both" }}>
            <Link href="/blog" style={{ fontSize: "13px", fontWeight: 600, color: "#6B7280", textDecoration: "none" }}>Journal</Link>
            <span style={{ color: "#D1D5DB" }}>/</span>
            <span style={{ fontSize: "13px", fontWeight: 600, color: "#F16101" }}>{blog.category}</span>
          </div>

          <div style={{ display: "inline-flex", alignItems: "center", gap: "7px", background: "rgba(241,97,1,0.08)", border: "1px solid rgba(241,97,1,0.2)", borderRadius: "999px", padding: "5px 14px", marginBottom: "20px", animation: "fadeSlideUp 0.5s ease 0.05s both" }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#F16101", display: "inline-block" }}/>
            <span style={{ fontSize: "11px", fontWeight: 800, color: "#F16101", letterSpacing: "1px", textTransform: "uppercase" }}>{blog.category}</span>
          </div>

          <h1 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, color: "#022C45", lineHeight: 1.12, letterSpacing: "-0.8px", marginBottom: "20px", maxWidth: "820px", animation: "fadeSlideUp 0.6s ease 0.1s both" }}>{blog.title}</h1>
          <p style={{ fontSize: "16px", color: "#4B5563", lineHeight: 1.7, maxWidth: "700px", marginBottom: "28px", animation: "fadeSlideUp 0.6s ease 0.15s both" }}>{blog.excerpt}</p>

          <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "12px" : "20px", flexWrap: "wrap", animation: "fadeSlideUp 0.6s ease 0.2s both" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#ffffff", border: "1px solid rgba(2,44,69,0.1)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flexShrink: 0, padding: "4px" }}>
                <Image src="/images/logo-main.png" alt={blog.author} width={36} height={36} style={{ objectFit: "contain" }}/>
              </div>
              <div>
                <div style={{ fontSize: "13px", fontWeight: 800, color: "#022C45" }}>{blog.author}</div>
                <div style={{ fontSize: "11px", color: "#9CA3AF", fontWeight: 600 }}>{blog.authorRole}</div>
              </div>
            </div>
            <div style={{ width: "1px", height: "32px", background: "rgba(2,44,69,0.12)" }}/>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#6B7280", fontWeight: 600 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#F16101" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              {blog.date}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#6B7280", fontWeight: 600 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#022C45" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              {blog.readTime}
            </div>
            <div style={{ marginLeft: isMobile ? "0" : "auto", display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
              <span style={{ fontSize: "12px", fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "1px" }}>Share</span>
              {sharePlatforms.map((p, i) => <button key={i} className="share-btn" aria-label={`Share on ${p.name}`} title={p.name}>{p.icon}</button>)}
            </div>
          </div>
        </div>

        {!isMobile && (
          <div style={{ position: "relative", lineHeight: 0, zIndex: 1 }}>
            <svg viewBox="0 0 1440 80" style={{ display: "block", width: "100%", height: "56px" }} preserveAspectRatio="none">
              <path d="M0,0 C480,100 960,100 1440,0 L1440,80 L0,80 Z" fill="#ffffff"/>
            </svg>
          </div>
        )}
      </Section>

      {/* ── COVER IMAGE ── */}
      <div style={{ maxWidth: "1100px", margin: isMobile ? "24px auto 32px" : "48px auto 56px", padding: isMobile ? "0 16px" : "0 24px" }}>
        <div style={{ width: "100%", aspectRatio: "16/7", borderRadius: "16px", overflow: "hidden", boxShadow: "0 20px 48px rgba(2,44,69,0.12)", background: "#e8ecf0", position: "relative" }}>
          <Image src={blog.coverImage} alt={blog.title} fill style={{ objectFit: "cover" }} priority/>
        </div>
      </div>

      {/* ── CONTENT + SIDEBAR ── */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: isMobile ? "0 16px 48px" : "0 24px 80px" }}>
        <div className="blog-layout" style={{ display: "flex", gap: "48px", alignItems: "flex-start" }}>

          {/* Article */}
          <article ref={contentRef} className="article-body" style={{ flex: "1 1 0", minWidth: 0 }}>
            {blog.content.map((section, index) => {
              if (section.type === "h2") {
                const anchor = `section-${section.content?.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40)}`;
                return <h2 key={index} className="blog-h2" id={anchor} style={{ fontSize: "clamp(20px, 2.5vw, 26px)", fontWeight: 900, color: "#022C45", margin: "44px 0 18px", lineHeight: 1.25, letterSpacing: "-0.4px", paddingTop: "8px" }}><span style={{ color: "#F16101", marginRight: "8px", fontSize: "0.7em" }}>▌</span>{section.content}</h2>;
              }
              if (section.type === "h3") {
                return <h3 key={index} style={{ fontSize: "19px", fontWeight: 800, color: "#022C45", margin: "32px 0 14px", paddingBottom: "8px", borderBottom: "2px solid rgba(7,203,235,0.2)", display: "inline-block" }}>{section.content}</h3>;
              }
              if (section.type === "p") {
                const isFirst = index === 0;
                return <p key={index} style={{ fontSize: isFirst ? "17px" : "15.5px", fontWeight: isFirst ? 600 : 400, color: isFirst ? "#022C45" : "#374151", lineHeight: 1.85, marginBottom: "24px" }}>{section.content}</p>;
              }
              if (section.type === "list") {
                return (
                  <div key={index} style={{ marginBottom: "24px" }}>
                    {section.items?.map((item, i) => (
                      <div key={i} className="blog-list-item">
                        <div style={{ width: "20px", height: "20px", borderRadius: "6px", background: "rgba(241,97,1,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "1px" }}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#F16101" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        </div>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                );
              }
              if (section.type === "quote") {
                return (
                  <div key={index} className="blog-quote">
                    <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                      <div style={{ color: "#07CBEB", flexShrink: 0, marginTop: "2px" }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
                      </div>
                      <p style={{ margin: 0, fontSize: "15.5px", fontWeight: 600, color: "#022C45", lineHeight: 1.65, fontStyle: "italic" }}>{section.content}</p>
                    </div>
                  </div>
                );
              }
              return null;
            })}

            {/* Tags */}
            <div style={{ marginTop: "56px", paddingTop: "28px", borderTop: "1px solid rgba(2,44,69,0.08)" }}>
              <p style={{ fontSize: "11px", fontWeight: 800, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "12px" }}>Topics Covered</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {blog.metaKeywords.split(",").map((kw, i) => <span key={i} className="keyword-tag">{kw.trim()}</span>)}
              </div>
            </div>

            {/* Author */}
            <div style={{ marginTop: "40px", padding: "24px", borderRadius: "16px", background: "#F9FAFB", border: "1px solid rgba(2,44,69,0.07)", display: "flex", gap: "18px", alignItems: "flex-start" }}>
              <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "#ffffff", border: "1px solid rgba(2,44,69,0.1)", overflow: "hidden", flexShrink: 0, padding: "6px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Image src="/images/logo-main.png" alt={blog.author} width={56} height={56} style={{ objectFit: "contain" }}/>
              </div>
              <div>
                <div style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1.5px", color: "#F16101", marginBottom: "4px" }}>Written By</div>
                <div style={{ fontSize: "17px", fontWeight: 900, color: "#022C45", marginBottom: "4px" }}>{blog.author}</div>
                <div style={{ fontSize: "13px", color: "#6B7280", fontWeight: 600, marginBottom: "10px" }}>{blog.authorRole} · Edification Overseas Education</div>
                <p style={{ fontSize: "13px", color: "#6B7280", lineHeight: 1.6, margin: 0 }}>Our team of IDP-certified and ICEF-accredited counsellors has guided 4,000+ Indian students to universities across 25+ countries with a 98% visa success rate.</p>
              </div>
            </div>

            <div style={{ marginTop: "32px" }}>
              <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "13px", fontWeight: 800, color: "#F16101", textDecoration: "none", textTransform: "uppercase", letterSpacing: "1px" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
                Back to Journal
              </Link>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="sidebar-col" style={{ flex: "0 0 280px", width: "280px" }}>
            <div className="sidebar-sticky">
              {headings.length > 0 && (
                <div style={{ background: "#F9FAFB", borderRadius: "16px", border: "1px solid rgba(2,44,69,0.07)", padding: "20px", marginBottom: "20px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
                    <div style={{ width: "3px", height: "18px", background: "#F16101", borderRadius: "2px" }}/>
                    <span style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1.5px", color: "#022C45" }}>In This Article</span>
                  </div>
                  <nav>
                    {headings.map((h, i) => {
                      const anchor = `section-${h.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40)}`;
                      return <a key={i} href={`#${anchor}`} className={`toc-link${activeSection === i ? " active" : ""}`}>{h}</a>;
                    })}
                  </nav>
                </div>
              )}

              <div style={{ background: "#ffffff", borderRadius: "16px", border: "1px solid rgba(2,44,69,0.07)", padding: "20px", marginBottom: "20px" }}>
                <div style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1.5px", color: "#022C45", marginBottom: "14px" }}>Share This Article</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {sharePlatforms.map((p, i) => <button key={i} className="share-btn" aria-label={`Share on ${p.name}`} title={p.name}>{p.icon}</button>)}
                </div>
              </div>

              <div style={{ background: "#022C45", borderRadius: "16px", padding: "24px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: "-30px", right: "-30px", width: "120px", height: "120px", borderRadius: "50%", background: "radial-gradient(circle, rgba(241,97,1,0.15) 0%, transparent 60%)", pointerEvents: "none" }}/>
                <div style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1.5px", color: "#F16101", marginBottom: "10px" }}>Free Consultation</div>
                <h4 style={{ fontSize: "17px", fontWeight: 900, color: "#ffffff", margin: "0 0 10px", lineHeight: 1.3 }}>Need Expert Guidance?</h4>
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.65)", lineHeight: 1.6, margin: "0 0 18px" }}>Our certified counsellors will map your study abroad pathway — free of charge, no obligation.</p>
                <Link href="/contact" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", padding: "11px 20px", borderRadius: "8px", background: "#F16101", color: "#ffffff", fontSize: "12px", fontWeight: 800, textDecoration: "none", textTransform: "uppercase", letterSpacing: "1px" }}>
                  Book Free Session <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* ── RELATED ── */}
      {related.length > 0 && (
        <Section bg="#F9FAFB" style={{ padding: isMobile ? "40px 0" : "72px 0" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto", padding: isMobile ? "0 16px" : "0 24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "36px" }}>
              <div style={{ width: "3px", height: "24px", background: "linear-gradient(180deg, #F16101, #C9A24D)", borderRadius: "2px" }}/>
              <h2 style={{ fontSize: "22px", fontWeight: 900, color: "#022C45", margin: 0, letterSpacing: "-0.3px" }}>More From The Journal</h2>
            </div>
            <div className="related-grid" style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: isMobile ? "16px" : "20px" }}>
              {related.map((r, i) => (
                <Link key={i} href={`/blog/${r.slug}`} className="related-card">
                  <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", background: "#e8ecf0", flexShrink: 0 }}>
                    <Image src={r.coverImage} alt={r.title} fill style={{ objectFit: "cover" }}/>
                    <div style={{ position: "absolute", top: "10px", left: "10px", background: "rgba(255,255,255,0.95)", backdropFilter: "blur(6px)", borderRadius: "4px", padding: "3px 9px" }}>
                      <span style={{ fontSize: "9px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px", color: "#F16101" }}>{r.category}</span>
                    </div>
                  </div>
                  <div style={{ padding: "18px 18px 20px" }}>
                    <div style={{ display: "flex", gap: "8px", marginBottom: "10px", fontSize: "11px", color: "#9CA3AF", fontWeight: 600 }}>
                      <span>{r.date}</span><span>·</span><span>{r.readTime}</span>
                    </div>
                    <h3 style={{ fontSize: "15px", fontWeight: 800, color: "#022C45", lineHeight: 1.4, margin: "0 0 10px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{r.title}</h3>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "11px", fontWeight: 800, color: "#F16101", textTransform: "uppercase", letterSpacing: "0.8px" }}>
                      Read Article <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* ── BOTTOM CTA — card style matching newsletter on /blog ── */}
      <Section bg="#ffffff" style={{ padding: isMobile ? "32px 0 56px" : "40px 0 100px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ background: "linear-gradient(135deg, #022C45 0%, #054f77 100%)", borderRadius: "24px", padding: isMobile ? "32px 20px" : "56px 64px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "40px", flexWrap: "wrap", position: "relative", overflow: "hidden", boxShadow: "0 24px 48px rgba(7,203,235,0.15)" }}>
            <div style={{ position: "absolute", right: "-80px", top: "-80px", width: "320px", height: "320px", borderRadius: "50%", background: "radial-gradient(circle, rgba(7,203,235,0.2) 0%, transparent 70%)", pointerEvents: "none" }}/>
            <div style={{ position: "absolute", left: "-40px", bottom: "-40px", width: "200px", height: "200px", borderRadius: "50%", background: "radial-gradient(circle, rgba(241,97,1,0.15) 0%, transparent 70%)", pointerEvents: "none" }}/>

            <div style={{ position: "relative", zIndex: 1, flex: "1 1 400px" }}>
              <h2 style={{ fontSize: "clamp(26px, 3.5vw, 36px)", fontWeight: 900, color: "white", letterSpacing: "-0.5px", margin: "0 0 16px", lineHeight: 1.2 }}>
                Ready to Start Your<br/>
                <span style={{ background: "linear-gradient(100deg, #F16101, #C9A24D)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Study Abroad Journey?</span>
              </h2>
              <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.7)", margin: 0, lineHeight: 1.6, maxWidth: "480px" }}>
                Our ICEF-accredited counsellors will build a personalised roadmap — covering university selection, visa strategy, and scholarship options. Free of charge.
              </p>
            </div>

            <div style={{ flex: "1 1 260px", position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: "12px" }}>
              <Link href="/book-consultation" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "16px 32px", borderRadius: "12px", background: "#F16101", color: "#ffffff", fontSize: "15px", fontWeight: 800, textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.5px", boxShadow: "0 8px 24px rgba(241,97,1,0.3)" }}>
                Book Free Consultation
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </Link>
              <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "16px 32px", borderRadius: "12px", border: "1.5px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.85)", fontSize: "15px", fontWeight: 800, textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Read More Articles
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}