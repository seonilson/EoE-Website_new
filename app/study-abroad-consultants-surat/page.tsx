"use client";
import CityPageSchema from "@/components/shared/CityPageSchema";
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";

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

const services = [
  { icon: "🎓", title: "Student Visa", desc: "Expert student visa filing for UK, Canada, Singapore, Germany, Cyprus & 30+ countries." },
  { icon: "💼", title: "Business Visa", desc: "Business visit, investor, and corporate travel visa support for professionals." },
  { icon: "👨‍👩‍👧", title: "Dependent Visa", desc: "Family reunification and dependent visa applications handled end-to-end." },
  { icon: "✈️", title: "Visitor Visa", desc: "Tourism and short-stay visitor visa processing for all major countries." },
  { icon: "📄", title: "Apostille & Translation", desc: "MEA apostille, document attestation and certified translation services." },
  { icon: "🏠", title: "Accommodation & Forex", desc: "Pre-arrival housing guidance and forex card assistance for outbound students." },
];

const destinations = [
  { name: "United Kingdom", flag: "🇬🇧", slug: "united-kingdom", highlight: "Post-Study Work: 2 Years" },
  { name: "Canada", flag: "🇨🇦", slug: "canada", highlight: "PGWP up to 3 Years" },
  { name: "Singapore", flag: "🇸🇬", slug: "singapore", highlight: "No IELTS for Many PEIs" },
  { name: "Germany", flag: "🇩🇪", slug: "germany", highlight: "Tuition-Free Public Unis" },
  { name: "Cyprus", flag: "🇨🇾", slug: "cyprus", highlight: "Low Cost, EU Degree" },
  { name: "Australia", flag: "🇦🇺", slug: "australia", highlight: "485 Post-Study Visa" },
  { name: "Malta", flag: "🇲🇹", slug: "malta", highlight: "EU Residency Pathway" },
  { name: "Mauritius", flag: "🇲🇺", slug: "mauritius", highlight: "Affordable English Medium" },
];

const faqs = [
  { q: "Can Surat students visit the Edification Overseas office?", a: "Yes. Surat students are welcome to visit our head office at Sun West Bank, Ashram Road, Ahmedabad. We also offer video counselling sessions for students who prefer remote consultations." },
  { q: "Is a free consultation available for Surat students?", a: "Absolutely. We offer free online and in-person counselling sessions. Call +91 87994 50049 or book via our website." },
  { q: "Which countries are best for Surat students on a budget?", a: "Cyprus, Malta, Mauritius, and Singapore offer strong value for money with quality English-medium degrees and good post-study pathways. Our counsellors can suggest the best fit for your budget and career goals." },
  { q: "Does Edification Overseas help with scholarship applications?", a: "Yes. We proactively identify and help students apply for merit-based and need-based scholarships from universities in UK, Canada, Germany, and Singapore." },
  { q: "What is the visa success rate?", a: "We maintain a 98% visa success rate with 5.0 stars on Google from 126 verified reviews — the result of meticulous document preparation and expert counselling." },
];

export default function SuratPage() {
  const heroRef = useInView(0.1);

  return (
    <main style={{ background: "#F9FAFB", overflowX: "hidden" }}>
      <CityPageSchema city="surat" />
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeSlideUp { from { opacity:0; transform:translateY(24px);} to {opacity:1; transform:translateY(0);} }
        @keyframes glowPulse { 0%,100%{filter:blur(60px) brightness(1);} 50%{filter:blur(80px) brightness(1.3);} }
        .city-hero { background: linear-gradient(135deg,#011624 0%,#022C45 60%,#043d5c 100%); padding:80px 24px 100px; position:relative; overflow:hidden; }
        .city-section { background:#ffffff; border-radius:20px; padding:48px; border:1px solid rgba(2,44,69,0.06); box-shadow:0 12px 32px rgba(2,44,69,0.02); margin-bottom:24px; }
        .city-section h2 { font-size:clamp(24px,3vw,32px); font-weight:900; color:#022C45; margin:0 0 12px; letter-spacing:-0.5px; }
        .city-section h3 { font-size:20px; font-weight:800; color:#022C45; margin:32px 0 16px; border-bottom:2px solid rgba(7,203,235,0.2); padding-bottom:6px; display:inline-block; }
        .city-section p { font-size:15.5px; color:#4B5563; line-height:1.8; margin:0 0 20px; }
        .service-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; margin-top:24px; }
        .service-card { background:#fcfdfd; border:1px solid rgba(2,44,69,0.06); border-radius:16px; padding:24px; transition:all 0.3s; }
        .service-card:hover { transform:translateY(-4px); box-shadow:0 12px 24px rgba(7,203,235,0.08); border-color:rgba(7,203,235,0.3); }
        .dest-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; margin-top:24px; }
        .dest-card { background:#fcfdfd; border:1px solid rgba(2,44,69,0.06); border-radius:16px; padding:20px; text-align:center; text-decoration:none; transition:all 0.3s; display:block; }
        .dest-card:hover { transform:translateY(-4px); box-shadow:0 12px 24px rgba(7,203,235,0.08); border-color:#07CBEB; }
        .faq-item { border:1px solid rgba(2,44,69,0.08); border-radius:16px; padding:24px; margin-bottom:12px; }
        .faq-item h4 { font-size:16px; font-weight:800; color:#022C45; margin:0 0 10px; }
        .faq-item p { font-size:14.5px; color:#4B5563; margin:0; line-height:1.7; }
        .breadcrumb { display:flex; align-items:center; gap:8px; font-size:13px; color:rgba(255,255,255,0.6); margin-bottom:24px; flex-wrap:wrap; }
        .breadcrumb a { color:rgba(255,255,255,0.7); text-decoration:none; }
        .cta-banner { background:linear-gradient(135deg,#022C45 0%,#054f77 100%); border-radius:24px; padding:56px 64px; display:flex; align-items:center; justify-content:space-between; gap:40px; flex-wrap:wrap; position:relative; overflow:hidden; }
        .cta-btn { display:inline-flex; align-items:center; background:#c94e00; border-radius:12px; padding:0 0 4px; text-decoration:none; }
        .cta-btn-inner { display:inline-flex; align-items:center; gap:10px; padding:16px 32px; background:#F16101; border-radius:12px; font-size:15px; font-weight:800; color:white; text-transform:uppercase; letter-spacing:0.5px; }
        @media(max-width:768px){ .city-hero{padding:60px 20px 80px;} .city-section{padding:28px 20px;} .service-grid{grid-template-columns:1fr;} .dest-grid{grid-template-columns:repeat(2,1fr);} .cta-banner{padding:36px 28px;} }
      `}} />

      <section className="city-hero">
        <div style={{ position:"absolute", top:"20%", right:"10%", width:"400px", height:"400px", background:"radial-gradient(circle,rgba(7,203,235,0.08) 0%,transparent 60%)", animation:"glowPulse 5s infinite", pointerEvents:"none" }} />
        <div ref={heroRef.ref} style={{ maxWidth:"1280px", margin:"0 auto", position:"relative", zIndex:1 }}>
          <nav className="breadcrumb">
            <Link href="/">Home</Link><span>›</span>
            <span style={{ color:"#07CBEB" }}>Study Abroad Consultants in Surat</span>
          </nav>
          <div style={{ maxWidth:"760px" }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:"8px", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"999px", padding:"6px 16px", marginBottom:"20px" }}>
              <span style={{ width:"8px", height:"8px", borderRadius:"50%", background:"#07CBEB", display:"inline-block", boxShadow:"0 0 10px #07CBEB" }} />
              <span style={{ fontSize:"12px", fontWeight:800, color:"rgba(255,255,255,0.9)", letterSpacing:"0.4px", textTransform:"uppercase" }}>📍 Serving Surat, Gujarat</span>
            </div>
            <h1 style={{ fontSize:"clamp(36px,5vw,60px)", fontWeight:900, color:"#ffffff", lineHeight:1.1, letterSpacing:"-1px", marginBottom:"20px" }}>
              Study Abroad &amp;<br />
              <span style={{ color:"#07CBEB" }}>Visa Consultants</span><br />
              for Surat Students
            </h1>
            <p style={{ fontSize:"clamp(15px,1.8vw,17px)", color:"rgba(255,255,255,0.85)", lineHeight:1.7, marginBottom:"36px", maxWidth:"600px" }}>
              Edification Overseas Education is Gujarat&apos;s most trusted ICEF-accredited overseas consultancy. We have helped <strong style={{ color:"#ffffff" }}>1000+ students from Gujarat</strong> — including Surat — secure admissions and visas for top universities worldwide.
            </p>
            <div style={{ display:"flex", gap:"16px", flexWrap:"wrap" }}>
              <Link href="/book-consultation" style={{ display:"inline-flex", alignItems:"center", gap:"8px", background:"#F16101", color:"white", padding:"14px 28px", borderRadius:"12px", fontWeight:800, fontSize:"15px", textDecoration:"none", boxShadow:"0 8px 24px rgba(241,97,1,0.3)" }}>Book Free Consultation →</Link>
              <Link href="/contact" style={{ display:"inline-flex", alignItems:"center", gap:"8px", background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.2)", color:"white", padding:"14px 28px", borderRadius:"12px", fontWeight:700, fontSize:"15px", textDecoration:"none" }}>📞 Call Us</Link>
            </div>
          </div>
        </div>
      </section>

      <div style={{ maxWidth:"1280px", margin:"0 auto", padding:"48px 24px 80px" }}>

        <div className="city-section">
          <h2>Overseas Education Guidance for Surat Students</h2>
          <p>Surat is one of the fastest-growing cities in India — and its students are increasingly choosing international education to build global careers. Edification Overseas, based in Ahmedabad, serves Surat students with the same ICEF-accredited standard as all our Gujarat clients.</p>
          <p>Whether you are a <strong>diamond trader&apos;s son looking at international business programs</strong>, a textile student aiming for fashion design abroad, or a fresh 12th graduate exploring the UK or Canada — our counsellors create personalised pathways tailored to your goals and budget.</p>
          <div style={{ display:"flex", gap:"12px", flexWrap:"wrap", marginTop:"8px" }}>
            {[["🏅","ICEF Accredited"],["⭐","5.0★ Google"],["🛡️","98% Visa Success"],["🌍","33+ Countries"],["🎓","1000+ Placed"]].map(([icon,label],i)=>(
              <div key={i} style={{ background:"#f4fbfc", border:"1px solid rgba(7,203,235,0.2)", borderRadius:"10px", padding:"10px 16px", display:"flex", alignItems:"center", gap:"8px", fontSize:"14px", fontWeight:700, color:"#022C45" }}>
                <span>{icon}</span>{label}
              </div>
            ))}
          </div>
        </div>

        <div className="city-section">
          <h2>Services Available for Surat Students</h2>
          <div className="service-grid">
            {services.map((s,i)=>(
              <div key={i} className="service-card">
                <div style={{ fontSize:"32px", marginBottom:"12px" }}>{s.icon}</div>
                <h4 style={{ fontSize:"16px", fontWeight:800, color:"#022C45", margin:"0 0 8px" }}>{s.title}</h4>
                <p style={{ fontSize:"14px", color:"#4B5563", margin:0, lineHeight:1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="city-section">
          <h2>Top Study Destinations for Surat Students</h2>
          <div className="dest-grid">
            {destinations.map((d,i)=>(
              <Link href={`/countries/${d.slug}`} key={i} className="dest-card">
                <div style={{ fontSize:"36px", marginBottom:"8px" }}>{d.flag}</div>
                <div style={{ fontSize:"15px", fontWeight:800, color:"#022C45", marginBottom:"4px" }}>{d.name}</div>
                <div style={{ fontSize:"11px", fontWeight:700, color:"#F16101", textTransform:"uppercase", letterSpacing:"0.3px" }}>{d.highlight}</div>
              </Link>
            ))}
          </div>
          <div style={{ textAlign:"center", marginTop:"24px" }}>
            <Link href="/countries" style={{ display:"inline-flex", alignItems:"center", gap:"8px", color:"#022C45", fontWeight:800, fontSize:"15px", textDecoration:"none", border:"2px solid #022C45", padding:"12px 24px", borderRadius:"10px" }}>Explore All 33+ Countries →</Link>
          </div>
        </div>

        <div className="city-section">
          <h2>Frequently Asked Questions — Surat Students</h2>
          <div style={{ marginTop:"24px" }}>
            {faqs.map((faq,i)=>(
              <div key={i} className="faq-item">
                <h4>Q: {faq.q}</h4>
                <p>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="cta-banner">
          <div style={{ position:"absolute", right:"-80px", top:"-80px", width:"320px", height:"320px", borderRadius:"50%", background:"radial-gradient(circle,rgba(7,203,235,0.15) 0%,transparent 70%)", pointerEvents:"none" }} />
          <div style={{ position:"relative", zIndex:1, flex:"1 1 400px" }}>
            <h2 style={{ fontSize:"clamp(24px,3vw,32px)", fontWeight:900, color:"white", margin:"0 0 12px", letterSpacing:"-0.5px" }}>Surat Student? Let&apos;s Plan Your Global Future.</h2>
            <p style={{ fontSize:"15px", color:"rgba(255,255,255,0.75)", margin:0, lineHeight:1.6, maxWidth:"480px" }}>Book a free online or in-person consultation with our ICEF-accredited counsellors today.</p>
          </div>
          <Link href="/book-consultation" className="cta-btn" style={{ position:"relative", zIndex:1 }}>
            <span className="cta-btn-inner">Book Free Consultation →</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
