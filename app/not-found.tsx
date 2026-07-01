"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const QUICK_LINKS = [
  { label: "Study Destinations",  href: "/countries",           icon: "🌍" },
  { label: "Student Visa",         href: "/services/student",    icon: "🎓" },
  { label: "Business Visa",        href: "/services/business",   icon: "💼" },
  { label: "Blog & Guides",        href: "/blog",                icon: "📰" },
  { label: "Book Consultation",    href: "/book-consultation",   icon: "📅" },
  { label: "Contact Us",           href: "/contact",             icon: "✉️"  },
];

function useInView() {
  const ref  = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

export default function NotFound() {
  const hero  = useInView();
  const links = useInView();

  return (
    <main style={{ background: "#F9FAFB", minHeight: "80vh", overflowX: "hidden" }}>
      <style>{`
        @keyframes fadeSlideUp  { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes float        { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-14px); } }
        @keyframes glowPulse    { 0%,100% { opacity:0.15; } 50% { opacity:0.35; } }
        @keyframes scaleIn      { from { opacity:0; transform:scale(0.93); } to { opacity:1; transform:scale(1); } }

        .ql-card { background:#fff; border:1px solid rgba(2,44,69,0.07); border-radius:14px; padding:16px 20px; display:flex; align-items:center; gap:14px; text-decoration:none; transition:all 0.3s cubic-bezier(0.22,1,0.36,1); }
        .ql-card:hover { transform:translateY(-5px); box-shadow:0 16px 32px rgba(2,44,69,0.1); border-color:rgba(241,97,1,0.25); }
        .ql-card:hover .ql-arrow { transform:translateX(4px); color:#F16101; }
        .ql-arrow { transition:all 0.25s ease; color:#9CA3AF; }
      `}</style>

      {/* ── HERO ── */}
      <section style={{ background:"linear-gradient(115deg, #f4fbfc 0%, #e8f7fa 50%, #fdf6ee 100%)", position:"relative", overflow:"hidden", padding:"80px 24px 100px" }}>

        {/* Grid background */}
        <div style={{ position:"absolute", inset:0, pointerEvents:"none", backgroundImage:`linear-gradient(rgba(7,203,235,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(7,203,235,0.07) 1px, transparent 1px)`, backgroundSize:"56px 56px" }}/>

        {/* Glow blobs */}
        <div style={{ position:"absolute", top:"-80px", right:"10%", width:"400px", height:"400px", borderRadius:"50%", background:"radial-gradient(circle, rgba(7,203,235,0.15) 0%, transparent 65%)", animation:"glowPulse 4s infinite", pointerEvents:"none" }}/>
        <div style={{ position:"absolute", bottom:"-60px", left:"5%", width:"300px", height:"300px", borderRadius:"50%", background:"radial-gradient(circle, rgba(241,97,1,0.1) 0%, transparent 65%)", animation:"glowPulse 5s infinite 1s", pointerEvents:"none" }}/>

        <div ref={hero.ref} style={{ maxWidth:"900px", margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", gap:"48px", flexWrap:"wrap", position:"relative", zIndex:1 }}>

          {/* Left — text */}
          <div style={{ flex:"1 1 400px" }}>

            {/* 404 badge */}
            <div style={{ display:"inline-flex", alignItems:"center", gap:"8px", background:"rgba(241,97,1,0.08)", border:"1px solid rgba(241,97,1,0.2)", borderRadius:"999px", padding:"6px 16px", marginBottom:"24px", animation: hero.inView ? "fadeSlideUp 0.4s ease both" : "none" }}>
              <span style={{ width:"7px", height:"7px", borderRadius:"50%", background:"#F16101", display:"inline-block", boxShadow:"0 0 8px rgba(241,97,1,0.5)" }}/>
              <span style={{ fontSize:"12px", fontWeight:800, color:"#F16101", letterSpacing:"1.5px", textTransform:"uppercase" }}>Error 404</span>
            </div>

            <h1 style={{ fontSize:"clamp(36px, 6vw, 72px)", fontWeight:900, color:"#022C45", lineHeight:1, letterSpacing:"-2px", margin:"0 0 20px", animation: hero.inView ? "fadeSlideUp 0.5s ease 0.1s both" : "none" }}>
              Page Not<br/>
              <span style={{ color:"#F16101", position:"relative", display:"inline-block" }}>
                Found.
                <svg aria-hidden="true" style={{ position:"absolute", bottom:"-10px", left:"-2%", width:"104%", overflow:"visible" }} height="6" viewBox="0 0 200 6" preserveAspectRatio="none">
                  <path d="M0,4 Q50,0 100,4 Q150,8 200,4" stroke="#F16101" strokeWidth="4" fill="none" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>

            <p style={{ fontSize:"clamp(15px, 1.8vw, 17px)", color:"#4B5563", lineHeight:1.7, maxWidth:"480px", marginBottom:"36px", animation: hero.inView ? "fadeSlideUp 0.5s ease 0.2s both" : "none" }}>
              The page you&apos;re looking for has moved, been removed, or never existed. Don&apos;t worry — we&apos;ll get you back on track.
            </p>

            <div style={{ display:"flex", gap:"12px", flexWrap:"wrap", animation: hero.inView ? "fadeSlideUp 0.5s ease 0.3s both" : "none" }}>
              <Link href="/" style={{ display:"inline-flex", alignItems:"center", gap:"8px", padding:"13px 28px", borderRadius:"10px", background:"#F16101", color:"#fff", fontSize:"14px", fontWeight:800, textDecoration:"none", textTransform:"uppercase", letterSpacing:"0.8px", boxShadow:"0 8px 20px rgba(241,97,1,0.25)" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
                Go Home
              </Link>
              <Link href="/contact" style={{ display:"inline-flex", alignItems:"center", gap:"8px", padding:"13px 28px", borderRadius:"10px", border:"1.5px solid rgba(2,44,69,0.15)", background:"#fff", color:"#022C45", fontSize:"14px", fontWeight:800, textDecoration:"none", textTransform:"uppercase", letterSpacing:"0.8px" }}>
                Contact Us
              </Link>
            </div>
          </div>

          {/* Right — floating illustration */}
          <div style={{ flex:"1 1 280px", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", minHeight:"280px", animation: hero.inView ? "scaleIn 0.7s cubic-bezier(0.22,1,0.36,1) 0.2s both" : "none" }}>
            <div style={{ position:"absolute", width:"260px", height:"260px", borderRadius:"50%", background:"rgba(255,255,255,0.5)", border:"1px solid rgba(7,203,235,0.15)", animation:"glowPulse 3s infinite" }}/>
            <div style={{ position:"relative", zIndex:2, animation:"float 5s ease-in-out infinite" }}>
              <div style={{ width:"160px", height:"160px", borderRadius:"32px", background:"linear-gradient(135deg, #022C45 0%, #054f77 100%)", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 24px 48px rgba(2,44,69,0.2)" }}>
                <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <div style={{ position:"absolute" }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#F16101" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Float badge */}
            <div style={{ position:"absolute", top:"10px", right:"0px", background:"rgba(255,255,255,0.9)", backdropFilter:"blur(12px)", borderRadius:"12px", padding:"10px 16px", border:"1px solid rgba(255,255,255,0.9)", boxShadow:"0 8px 24px rgba(2,44,69,0.08)", animation:"float 6s ease-in-out infinite reverse" }}>
              <p style={{ margin:0, fontSize:"11px", fontWeight:800, color:"#F16101", textTransform:"uppercase", letterSpacing:"1px" }}>Lost?</p>
              <p style={{ margin:0, fontSize:"13px", fontWeight:900, color:"#022C45" }}>We&apos;ll help you</p>
            </div>
          </div>
        </div>

        {/* Wave */}
        <div style={{ position:"absolute", bottom:0, left:0, right:0, lineHeight:0 }}>
          <svg viewBox="0 0 1440 60" style={{ display:"block", width:"100%", height:"40px" }} preserveAspectRatio="none">
            <path d="M0,60 C480,0 960,0 1440,60 L1440,60 L0,60 Z" fill="#F9FAFB"/>
          </svg>
        </div>
      </section>

      {/* ── QUICK LINKS ── */}
      <section style={{ padding:"72px 24px 100px" }}>
        <div ref={links.ref} style={{ maxWidth:"860px", margin:"0 auto" }}>

          <div style={{ textAlign:"center", marginBottom:"40px", animation: links.inView ? "fadeSlideUp 0.5s ease both" : "none" }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:"9px", marginBottom:"12px" }}>
              <div style={{ width:"28px", height:"2px", background:"linear-gradient(90deg, #F16101, #C9A24D)", borderRadius:"1px" }}/>
              <span style={{ fontSize:"11px", fontWeight:800, letterSpacing:"2.5px", textTransform:"uppercase", color:"#F16101" }}>Where to next?</span>
              <div style={{ width:"28px", height:"2px", background:"linear-gradient(90deg, #C9A24D, #F16101)", borderRadius:"1px" }}/>
            </div>
            <h2 style={{ fontSize:"clamp(22px, 3vw, 30px)", fontWeight:900, color:"#022C45", margin:0, letterSpacing:"-0.4px" }}>Popular Pages</h2>
            <p style={{ fontSize:"15px", color:"#6B7280", marginTop:"10px" }}>Here are some pages that might help you find what you&apos;re looking for.</p>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(260px, 1fr))", gap:"14px" }}>
            {QUICK_LINKS.map((link, i) => (
              <Link key={i} href={link.href} className="ql-card" style={{ animationDelay:`${i * 0.06}s`, animation: links.inView ? `scaleIn 0.4s ease ${i * 0.06}s both` : "none" }}>
                <div style={{ width:"40px", height:"40px", borderRadius:"10px", background:"rgba(241,97,1,0.07)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"20px", flexShrink:0 }}>
                  {link.icon}
                </div>
                <span style={{ fontSize:"14px", fontWeight:700, color:"#022C45", flex:1 }}>{link.label}</span>
                <span className="ql-arrow">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                </span>
              </Link>
            ))}
          </div>

          {/* Bottom CTA card */}
          <div style={{ marginTop:"48px", background:"linear-gradient(135deg, #022C45 0%, #054f77 100%)", borderRadius:"20px", padding:"40px 48px", display:"flex", alignItems:"center", justifyContent:"space-between", gap:"28px", flexWrap:"wrap", position:"relative", overflow:"hidden", boxShadow:"0 20px 40px rgba(7,203,235,0.12)", animation: links.inView ? "fadeSlideUp 0.6s ease 0.4s both" : "none" }}>
            <div style={{ position:"absolute", right:"-60px", top:"-60px", width:"240px", height:"240px", borderRadius:"50%", background:"radial-gradient(circle, rgba(7,203,235,0.2) 0%, transparent 65%)", pointerEvents:"none" }}/>
            <div style={{ position:"relative", zIndex:1 }}>
              <h3 style={{ fontSize:"clamp(20px, 2.5vw, 26px)", fontWeight:900, color:"#fff", margin:"0 0 8px", lineHeight:1.2 }}>Still can&apos;t find what you need?</h3>
              <p style={{ fontSize:"14px", color:"rgba(255,255,255,0.65)", margin:0, lineHeight:1.6 }}>Our counsellors are available to answer any query — study abroad, visa, or anything else.</p>
            </div>
            <Link href="/contact" style={{ display:"inline-flex", alignItems:"center", gap:"8px", padding:"13px 28px", borderRadius:"10px", background:"#F16101", color:"#fff", fontSize:"13px", fontWeight:800, textDecoration:"none", textTransform:"uppercase", letterSpacing:"0.8px", boxShadow:"0 8px 20px rgba(241,97,1,0.3)", flexShrink:0, position:"relative", zIndex:1 }}>
              Talk to an Expert
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}