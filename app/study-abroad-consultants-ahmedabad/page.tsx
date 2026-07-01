"use client";
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import CityPageSchema from "@/components/shared/CityPageSchema";

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
  { icon: "🎓", title: "Student Visa", desc: "UK, Canada, Singapore, Germany, Cyprus & 30+ countries with a 98% approval rate." },
  { icon: "💼", title: "Business Visa", desc: "Corporate travel, investor visas, and business expansion support across major economies." },
  { icon: "👨‍👩‍👧", title: "Dependent Visa", desc: "Bring your family along. We handle spouse and child dependent visa applications end-to-end." },
  { icon: "✈️", title: "Visitor Visa", desc: "Tourism, medical, and short-stay visitor visa applications for any country." },
  { icon: "📄", title: "Apostille & Translation", desc: "MEA apostille, document attestation, and certified English translations for all visa types." },
  { icon: "🏠", title: "Accommodation & Forex", desc: "Pre-arrival housing shortlisting and forex card assistance for students going abroad." },
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
  {
    q: "Where is Edification Overseas located in Ahmedabad?",
    a: "Our head office is at A-411 & A-1123, 4th & 11th Floor, Sun West Bank, Ashram Road, Ahmedabad – 380009. We are easily accessible from Navrangpura, Paldi, Ellis Bridge, and the Ashram Road corridor.",
  },
  {
    q: "Is a free consultation available in Ahmedabad?",
    a: "Yes. We offer completely free initial counselling sessions at our Ahmedabad office. You can walk in, call +91 87994 50049, or book online via our website.",
  },
  {
    q: "Which countries can Ahmedabad students apply to through Edification Overseas?",
    a: "We cover 33+ study abroad destinations including UK, Canada, Singapore, Germany, Cyprus, Australia, Malta, Mauritius, Georgia, Moldova, Belarus, Russia, Dubai, Greece, and more.",
  },
  {
    q: "Is IELTS mandatory for all countries?",
    a: "Not always. For Singapore, IELTS is waived for students with English-medium schooling. For countries like Cyprus and Malta, alternative English proficiency proofs are accepted. Our counsellors assess your profile individually.",
  },
  {
    q: "What is the visa success rate of Edification Overseas?",
    a: "We maintain a 98% visa success rate across all categories — student, business, visitor, and dependent. We are ICEF-accredited with over 126 verified 5-star reviews.",
  },
  {
    q: "Does Edification Overseas help with scholarships for Gujarat students?",
    a: "Yes. We actively identify scholarship opportunities from universities in UK, Canada, Germany, and Singapore that match your academic profile, potentially saving you lakhs in tuition fees.",
  },
];

const whyUs = [
  { icon: "🏅", stat: "ICEF", label: "Accredited Agency" },
  { icon: "⭐", stat: "5.0★", label: "Google Rating" },
  { icon: "🛡️", stat: "98%", label: "Visa Success Rate" },
  { icon: "🌍", stat: "33+", label: "Countries Covered" },
  { icon: "🎓", stat: "1000+", label: "Students Placed" },
  { icon: "📍", stat: "2", label: "Offices: Ahmedabad & Singapore" },
];

export default function AhmedabadPage() {
  const heroRef = useInView(0.1);

  return (
    <main style={{ background: "#F9FAFB", overflowX: "hidden" }}>
      <CityPageSchema city="ahmedabad" />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes glowPulse { 0%,100%{filter:blur(60px) brightness(1);} 50%{filter:blur(80px) brightness(1.3);} }

        .city-hero { background: linear-gradient(135deg, #011624 0%, #022C45 60%, #043d5c 100%); padding: 80px 24px 100px; position: relative; overflow: hidden; }
        .city-section { background: #ffffff; border-radius: 20px; padding: 48px; border: 1px solid rgba(2,44,69,0.06); box-shadow: 0 12px 32px rgba(2,44,69,0.02); margin-bottom: 24px; }
        .city-section h2 { font-size: clamp(24px,3vw,32px); font-weight: 900; color: #022C45; margin: 0 0 12px; letter-spacing: -0.5px; }
        .city-section h3 { font-size: 20px; font-weight: 800; color: #022C45; margin: 32px 0 16px; border-bottom: 2px solid rgba(7,203,235,0.2); padding-bottom: 6px; display: inline-block; }
        .city-section p { font-size: 15.5px; color: #4B5563; line-height: 1.8; margin: 0 0 20px; }
        .city-section strong { color: #022C45; }

        .stat-row { display: grid; grid-template-columns: repeat(6,1fr); gap: 16px; margin: 32px 0; }
        .stat-box { background: #f4fbfc; border: 1px solid rgba(7,203,235,0.2); border-radius: 16px; padding: 20px 12px; text-align: center; }
        .stat-box .sv { font-size: 20px; font-weight: 900; color: #022C45; margin-bottom: 4px; }
        .stat-box .sl { font-size: 11px; font-weight: 800; color: #F16101; text-transform: uppercase; letter-spacing: 0.5px; line-height: 1.4; }

        .service-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; margin-top: 24px; }
        .service-card { background: #fcfdfd; border: 1px solid rgba(2,44,69,0.06); border-radius: 16px; padding: 24px; transition: all 0.3s; }
        .service-card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(7,203,235,0.08); border-color: rgba(7,203,235,0.3); }
        .service-card .si { font-size: 32px; margin-bottom: 12px; }
        .service-card h4 { font-size: 16px; font-weight: 800; color: #022C45; margin: 0 0 8px; }
        .service-card p { font-size: 14px; color: #4B5563; margin: 0; line-height: 1.6; }

        .dest-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 16px; margin-top: 24px; }
        .dest-card { background: #fcfdfd; border: 1px solid rgba(2,44,69,0.06); border-radius: 16px; padding: 20px; text-align: center; text-decoration: none; transition: all 0.3s; display: block; }
        .dest-card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(7,203,235,0.08); border-color: #07CBEB; }
        .dest-card .df { font-size: 36px; margin-bottom: 8px; }
        .dest-card .dn { font-size: 15px; font-weight: 800; color: #022C45; margin-bottom: 4px; }
        .dest-card .dh { font-size: 11px; font-weight: 700; color: #F16101; text-transform: uppercase; letter-spacing: 0.3px; }

        .faq-item { border: 1px solid rgba(2,44,69,0.08); border-radius: 16px; padding: 24px; margin-bottom: 12px; }
        .faq-item h4 { font-size: 16px; font-weight: 800; color: #022C45; margin: 0 0 10px; }
        .faq-item p { font-size: 14.5px; color: #4B5563; margin: 0; line-height: 1.7; }

        .breadcrumb { display: flex; align-items: center; gap: 8px; font-size: 13px; color: rgba(255,255,255,0.6); margin-bottom: 24px; flex-wrap: wrap; }
        .breadcrumb a { color: rgba(255,255,255,0.7); text-decoration: none; }
        .breadcrumb a:hover { color: #07CBEB; }
        .breadcrumb span { color: rgba(255,255,255,0.3); }

        .highlight-box { background: #f4fbfc; border-left: 4px solid #07CBEB; padding: 20px 24px; border-radius: 0 12px 12px 0; margin: 24px 0; }
        .highlight-box p { margin: 0; color: #022C45; font-weight: 700; font-size: 15px; }

        .cta-banner { background: linear-gradient(135deg,#022C45 0%,#054f77 100%); border-radius: 24px; padding: 56px 64px; display: flex; align-items: center; justify-content: space-between; gap: 40px; flex-wrap: wrap; position: relative; overflow: hidden; box-shadow: 0 24px 48px rgba(7,203,235,0.12); }
        .cta-btn { display: inline-flex; align-items: center; gap: 10px; background: #c94e00; border-radius: 12px; padding: 0 0 4px; text-decoration: none; flex-shrink: 0; }
        .cta-btn-inner { display: inline-flex; align-items: center; gap: 10px; padding: 16px 32px; background: #F16101; border-radius: 12px; font-size: 15px; font-weight: 800; color: white; text-transform: uppercase; letter-spacing: 0.5px; }

        @media(max-width:1024px){
          .stat-row { grid-template-columns: repeat(3,1fr); }
          .dest-grid { grid-template-columns: repeat(2,1fr); }
        }
        @media(max-width:768px){
          .city-hero { padding: 60px 20px 80px; }
          .city-section { padding: 28px 20px; }
          .service-grid { grid-template-columns: 1fr; }
          .dest-grid { grid-template-columns: repeat(2,1fr); }
          .stat-row { grid-template-columns: repeat(2,1fr); }
          .cta-banner { padding: 36px 28px; }
        }
        @media(max-width:480px){
          .dest-grid { grid-template-columns: 1fr 1fr; }
          .stat-row { grid-template-columns: repeat(2,1fr); }
        }
      `}} />

      {/* ── HERO ── */}
      <section className="city-hero">
        <div style={{ position: "absolute", top: "20%", right: "10%", width: "400px", height: "400px", background: "radial-gradient(circle,rgba(7,203,235,0.08) 0%,transparent 60%)", animation: "glowPulse 5s infinite", pointerEvents: "none" }} />
        <div ref={heroRef.ref} style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>

          {/* Breadcrumb */}
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>›</span>
            <span style={{ color: "#07CBEB" }}>Study Abroad Consultants in Ahmedabad</span>
          </nav>

          <div style={{ maxWidth: "760px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "999px", padding: "6px 16px", marginBottom: "20px" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#07CBEB", display: "inline-block", boxShadow: "0 0 10px #07CBEB" }} />
              <span style={{ fontSize: "12px", fontWeight: 800, color: "rgba(255,255,255,0.9)", letterSpacing: "0.4px", textTransform: "uppercase" }}>
                📍 Ahmedabad, Gujarat — Head Office
              </span>
            </div>

            <h1 style={{ fontSize: "clamp(36px,5vw,60px)", fontWeight: 900, color: "#ffffff", lineHeight: 1.1, letterSpacing: "-1px", marginBottom: "20px", animation: heroRef.inView ? "fadeSlideUp 0.55s ease 0.1s both" : "none" }}>
              #1 Study Abroad &<br />
              <span style={{ color: "#07CBEB" }}>Visa Consultants</span><br />
              in Ahmedabad
            </h1>

            <p style={{ fontSize: "clamp(15px,1.8vw,17px)", color: "rgba(255,255,255,0.85)", lineHeight: 1.7, marginBottom: "36px", maxWidth: "600px", animation: heroRef.inView ? "fadeSlideUp 0.55s ease 0.2s both" : "none" }}>
              Edification Overseas Education is Ahmedabad&apos;s most trusted ICEF-accredited overseas education consultancy. From our office on <strong style={{ color: "#ffffff" }}>Ashram Road</strong>, we have guided <strong style={{ color: "#ffffff" }}>1000+ students from Gujarat</strong> to universities in the UK, Canada, Singapore, Germany, Cyprus and 30+ more countries.
            </p>

            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", animation: heroRef.inView ? "fadeSlideUp 0.55s ease 0.3s both" : "none" }}>
              <Link href="/book-consultation" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#F16101", color: "white", padding: "14px 28px", borderRadius: "12px", fontWeight: 800, fontSize: "15px", textDecoration: "none", boxShadow: "0 8px 24px rgba(241,97,1,0.3)" }}>
                Book Free Consultation →
              </Link>
              <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.2)", color: "white", padding: "14px 28px", borderRadius: "12px", fontWeight: 700, fontSize: "15px", textDecoration: "none" }}>
                📞 Call Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "48px 24px 80px" }}>

        {/* Why Us Stats */}
        <div className="city-section">
          <h2>Why Ahmedabad Students Trust Edification Overseas</h2>
          <p>We are not just a consultancy — we are Ahmedabad&apos;s most accredited and result-driven overseas education partner. Our counsellors are certified professionals with real-world visa expertise, not sales agents chasing targets.</p>
          <div className="stat-row">
            {whyUs.map((item, i) => (
              <div key={i} className="stat-box">
                <div style={{ fontSize: "24px", marginBottom: "6px" }}>{item.icon}</div>
                <div className="sv">{item.stat}</div>
                <div className="sl">{item.label}</div>
              </div>
            ))}
          </div>
          <div className="highlight-box">
            <p>🏢 Visit us at: A-411 &amp; A-1123, Sun West Bank, Ashram Road, Ahmedabad – 380009. Open Monday–Saturday, 9:30 AM to 6:30 PM.</p>
          </div>
        </div>

        {/* Services */}
        <div className="city-section">
          <h2>Our Services for Ahmedabad Students &amp; Professionals</h2>
          <p>From first-time student visa applicants to professionals seeking work permits and business visas, we cover every overseas documentation need under one roof.</p>
          <div className="service-grid">
            {services.map((s, i) => (
              <div key={i} className="service-card">
                <div className="si">{s.icon}</div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Destinations */}
        <div className="city-section">
          <h2>Top Study Abroad Destinations for Ahmedabad Students</h2>
          <p>We specialise in placing Gujarat students at top universities across the world. Click any country to explore visa requirements, universities, and career pathways.</p>
          <div className="dest-grid">
            {destinations.map((d, i) => (
              <Link href={`/countries/${d.slug}`} key={i} className="dest-card">
                <div className="df">{d.flag}</div>
                <div className="dn">{d.name}</div>
                <div className="dh">{d.highlight}</div>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "24px" }}>
            <Link href="/countries" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "#022C45", fontWeight: 800, fontSize: "15px", textDecoration: "none", border: "2px solid #022C45", padding: "12px 24px", borderRadius: "10px" }}>
              Explore All 33+ Countries →
            </Link>
          </div>
        </div>

        {/* About the office / local content */}
        <div className="city-section">
          <h2>Serving Students Across Ahmedabad &amp; Gujarat</h2>
          <p>
            Our Ashram Road office is strategically located to serve students from across Ahmedabad — including Navrangpura, Satellite, Bopal, Prahlad Nagar, Vastrapur, Paldi, Maninagar, Ghatlodia, Chandkheda, and Thaltej. We also regularly counsel students travelling from <strong>Gandhinagar, Anand, Mehsana, and Nadiad</strong> for in-person sessions.
          </p>
          <h3>Process: How We Work</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              { n: "1", t: "Free Profile Assessment", d: "Walk in or book online. Our counsellor evaluates your academics, budget, and career goals." },
              { n: "2", t: "Country & Course Shortlisting", d: "We match your profile with the right university and visa pathway across 33+ countries." },
              { n: "3", t: "Document Preparation", d: "We help you prepare your SOP, LOR, transcripts, and all supporting documents." },
              { n: "4", t: "Visa Application Filing", d: "Our team files your visa with precision — reducing rejection risk to near zero." },
              { n: "5", t: "Pre-Departure Support", d: "Forex guidance, accommodation shortlisting, and a full pre-departure briefing." },
            ].map((step) => (
              <div key={step.n} style={{ display: "flex", gap: "16px", background: "#fcfdfd", border: "1px solid rgba(2,44,69,0.06)", padding: "20px", borderRadius: "16px", alignItems: "center" }}>
                <div style={{ width: "36px", height: "36px", background: "#022C45", color: "white", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "16px", flexShrink: 0 }}>{step.n}</div>
                <div>
                  <strong style={{ display: "block", color: "#022C45", marginBottom: "4px" }}>{step.t}</strong>
                  <span style={{ fontSize: "14.5px", color: "#4B5563", lineHeight: 1.6 }}>{step.d}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="city-section">
          <h2>Frequently Asked Questions — Ahmedabad Students</h2>
          <div style={{ marginTop: "24px" }}>
            {faqs.map((faq, i) => (
              <div key={i} className="faq-item">
                <h4>Q: {faq.q}</h4>
                <p>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="cta-banner">
          <div style={{ position: "absolute", right: "-80px", top: "-80px", width: "320px", height: "320px", borderRadius: "50%", background: "radial-gradient(circle,rgba(7,203,235,0.15) 0%,transparent 70%)", pointerEvents: "none" }} />
          <div style={{ position: "relative", zIndex: 1, flex: "1 1 400px" }}>
            <h2 style={{ fontSize: "clamp(24px,3vw,32px)", fontWeight: 900, color: "white", margin: "0 0 12px", letterSpacing: "-0.5px" }}>
              Ready to Study Abroad from Ahmedabad?
            </h2>
            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.75)", margin: 0, lineHeight: 1.6, maxWidth: "480px" }}>
              Visit our office on Ashram Road or book a free online consultation. Our ICEF-accredited counsellors are ready to map your global pathway today.
            </p>
          </div>
          <Link href="/book-consultation" className="cta-btn" style={{ position: "relative", zIndex: 1 }}>
            <span className="cta-btn-inner">Book Free Consultation →</span>
          </Link>
        </div>

      </div>
    </main>
  );
}
