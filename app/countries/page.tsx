"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
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

// ── All 33 Countries ──────────────────────────────────────────
const destinations = [
  // ── Americas ──
  { id: "canada",         region: "americas", name: "Canada",        flag: "/images/flags/ca.png", tagline: "Study Permit & PGWP",      desc: "World-class universities with a direct PR pathway. Up to 3 years of post-graduation work permit and one of the highest immigration success rates globally.", highlights: ["3-Year PGWP", "Express Entry PR", "Tech & Healthcare"] },
  { id: "usa",            region: "americas", name: "USA",           flag: "/images/flags/us.png", tagline: "F1 Student Visa",           desc: "Home to Ivy League institutions and Silicon Valley. F1 visa with 3-year STEM OPT gives unmatched career access in the world's largest economy.", highlights: ["3-Year STEM OPT", "Ivy League Access", "Global Tech Hubs"] },

  // ── UK ──
  { id: "united-kingdom", region: "europe",   name: "United Kingdom",flag: "/images/flags/gb.png", tagline: "UK Student Visa",           desc: "Russell Group universities and intensive 1-year Master's programmes. The 2-year Graduate Route visa makes UK the smartest ROI for Indian students.", highlights: ["1-Year Master's", "2-Year Graduate Route", "Russell Group"] },

  // ── Europe ──
  { id: "germany",        region: "europe",   name: "Germany",       flag: "/images/flags/de.png", tagline: "Germany Student Visa",      desc: "Free or near-free tuition at world-ranked public universities. Europe's strongest economy with an 18-month job-seeker visa after graduation.", highlights: ["Free Universities", "18-Month Job Visa", "Engineering Hub"] },
  { id: "france",         region: "europe",   name: "France",        flag: "/images/flags/fr.png", tagline: "Campus France Visa",        desc: "Prestigious grandes écoles and generous Eiffel scholarships. English-taught programmes available with access to the entire Schengen zone.", highlights: ["Eiffel Scholarship", "Schengen Access", "Top Business Schools"] },
  { id: "ireland",        region: "europe",   name: "Ireland",       flag: "/images/flags/ie.png", tagline: "Stamp 2 Student Visa",      desc: "English-speaking EU nation hosting European HQs for Google, Apple and Meta. 2-year stay-back visa and booming tech job market.", highlights: ["EU Tech HQ", "2-Year Stay Back", "English-Speaking"] },
  { id: "netherlands",    region: "europe",   name: "Netherlands",   flag: "/images/flags/nl.png", tagline: "MVV Student Visa",          desc: "Top-ranked Dutch universities with 2,000+ English-taught programmes. 1-year orientation permit to find work after graduation.", highlights: ["2,000+ English Courses", "Orientation Year Permit", "High Graduate Salaries"] },
  { id: "spain",          region: "europe",   name: "Spain",         flag: "/images/flags/es.png", tagline: "Spain Student Visa",        desc: "Affordable tuition across top universities with vibrant student life. Access to the Schengen zone and growing European job market.", highlights: ["Affordable Tuition", "Schengen Access", "Vibrant Campus Life"] },
  { id: "italy",          region: "europe",   name: "Italy",         flag: "/images/flags/it.png", tagline: "Italy Student Visa",        desc: "Highly subsidised education with massive scholarship opportunities. Home to the world's top design, fashion and architecture schools.", highlights: ["100% Scholarships Available", "Top Design Schools", "Rich Academic Heritage"] },
  { id: "switzerland",    region: "europe",   name: "Switzerland",   flag: "/images/flags/ch.png", tagline: "Swiss Student Permit",      desc: "ETH Zurich and EPFL consistently rank in the global top 15. Unmatched research opportunities and one of the highest graduate salaries in the world.", highlights: ["ETH Zurich & EPFL", "Top Research Output", "Highest Graduate Pay"] },
  { id: "poland",         region: "europe",   name: "Poland",        flag: "/images/flags/pl.png", tagline: "Schengen Study Visa",       desc: "Affordable EU education with full Schengen access. Globally recognised IT and business degrees at a fraction of Western European costs.", highlights: ["Schengen Access", "Very Affordable", "Growing IT Sector"] },
  { id: "hungary",        region: "europe",   name: "Hungary",       flag: "/images/flags/hu.png", tagline: "Central Europe Visa",       desc: "Famous for the Stipendium Hungaricum government scholarship covering full tuition. Strong STEM programmes in the heart of Europe.", highlights: ["Govt. Scholarship", "Central EU Location", "Strong STEM Focus"] },
  { id: "romania",        region: "europe",   name: "Romania",       flag: "/images/flags/ro.png", tagline: "Romania Study Visa",        desc: "Fully EU-recognised degrees at some of Europe's most affordable tuition rates. Excellent medical and engineering university options.", highlights: ["EU-Recognised Degrees", "Very Low Tuition", "Medical Universities"] },
  { id: "greece",         region: "europe",   name: "Greece",        flag: "/images/flags/gr.png", tagline: "Greece Student Visa",       desc: "Ancient academic heritage meets modern European education. Erasmus scholarships available with access to affordable island living.", highlights: ["Erasmus Scholarships", "Affordable Living", "Historic Universities"] },
  { id: "denmark",        region: "europe",   name: "Denmark",       flag: "/images/flags/dk.png", tagline: "Denmark Residence Permit",  desc: "DTU and University of Copenhagen rank in the global top 100. Innovative research culture with one of Europe's highest quality of life scores.", highlights: ["Top 100 Universities", "Innovation Culture", "Highest Quality of Life"] },
  { id: "finland",        region: "europe",   name: "Finland",       flag: "/images/flags/fi.png", tagline: "Finland Residence Permit",  desc: "World-renowned education system with strong STEM and design programmes. Scholarship options available for non-EU students.", highlights: ["World-Class Education", "STEM Focus", "Scholarship Options"] },
  { id: "latvia",         region: "europe",   name: "Latvia",        flag: "/images/flags/lv.png", tagline: "Latvia Student Visa",       desc: "Affordable EU degree from Riga's top universities. Full Schengen access and growing Baltic economy with excellent engineering options.", highlights: ["Affordable EU Degree", "Schengen Access", "Engineering Programmes"] },
  { id: "lithuania",      region: "europe",   name: "Lithuania",     flag: "/images/flags/lt.png", tagline: "Lithuania Student Visa",    desc: "EU-recognised degrees from Vilnius University at very low tuition costs. Growing tech ecosystem and full Schengen zone access.", highlights: ["EU Degree", "Very Low Costs", "Tech Ecosystem"] },
  { id: "moldova",        region: "europe",   name: "Moldova",       flag: "/images/flags/md.png", tagline: "Moldova Study Visa",        desc: "Highly affordable medical universities with WHO-recognised MBBS degrees. One of the most cost-effective medical education destinations for Indian students.", highlights: ["WHO-Recognised MBBS", "Very Low Fees", "Medical Focus"] },
  { id: "georgia",        region: "europe",   name: "Georgia",       flag: "/images/flags/ge.png", tagline: "MBBS in Georgia",           desc: "Top choice for Indian students pursuing affordable MBBS without entrance exams. WHO-approved medical universities with English-medium instruction.", highlights: ["WHO-Approved MBBS", "No Entrance Exams", "Low Living Cost"] },
  { id: "belarus",        region: "europe",   name: "Belarus",       flag: "/images/flags/by.png", tagline: "Belarus Study Visa",        desc: "European MBBS and engineering degrees at some of the most affordable rates available. State medical universities with strong Indian student communities.", highlights: ["Affordable MBBS", "State Universities", "Indian Community"] },
  { id: "russia",         region: "europe",   name: "Russia",        flag: "/images/flags/ru.png", tagline: "Russia Student Visa",       desc: "Top federal universities with prestigious MBBS and engineering programmes. Government scholarships available covering full tuition for eligible students.", highlights: ["Govt. Scholarships", "Top Federal Universities", "MBBS & Engineering"] },
  { id: "cyprus",         region: "europe",   name: "Cyprus",        flag: "/images/flags/cy.png", tagline: "EU Degree — Cyprus",        desc: "EU-recognised degrees in English at very affordable tuition rates. Edification Overseas is an official India representative for leading Cypriot universities.", highlights: ["EU-Recognised Degrees", "English Medium", "Official EoE Partner"] },
  { id: "malta",          region: "europe",   name: "Malta",         flag: "/images/flags/mt.png", tagline: "Malta Study Visa",          desc: "EU degree fully taught in English from one of Europe's most beautiful islands. Excellent post-study work opportunities with full Schengen zone access.", highlights: ["English EU Degree", "Schengen Access", "Island Lifestyle"] },
  { id: "europe",         region: "europe",   name: "Europe Overview",flag: "/images/flags/eu.png", tagline: "All Europe Options",       desc: "Not sure which European country suits you best? Our Europe Destinations Guide compares all options by cost, PR pathway, language and career outcomes.", highlights: ["Full Comparison Guide", "33 Country Coverage", "Expert Shortlisting"] },

  // ── Asia & Pacific ──
  { id: "singapore",      region: "apac",     name: "Singapore",     flag: "/images/flags/sg.png", tagline: "Singapore Student Pass",   desc: "NUS and NTU rank in the global top 15. Asia's financial and tech capital with a Tuition Grant option and direct access to multinational employers.", highlights: ["Top 15 Global Rank", "Tuition Grant", "MNC Career Access"] },
  { id: "malaysia",       region: "apac",     name: "Malaysia",      flag: "/images/flags/my.png", tagline: "Malaysia Student Visa",    desc: "Affordable world-class education with branch campuses of UK and Australian universities. Low living costs and a large, welcoming Indian community.", highlights: ["UK/AU Branch Campuses", "Very Affordable", "Indian Community"] },
  { id: "australia",      region: "apac",     name: "Australia",     flag: "/images/flags/au.png", tagline: "Australia Student Visa",   desc: "Group of Eight universities with up to 5-year post-study work rights. High part-time wages and a clear skilled migration PR pathway.", highlights: ["5-Year Post-Study Work", "High Part-Time Wages", "Group of Eight"] },
  { id: "new-zealand",    region: "apac",     name: "New Zealand",   flag: "/images/flags/nz.png", tagline: "NZ Student Visa",          desc: "Peaceful, safe environment with highly practical education. Up to 3-year post-study work visa with strong demand in healthcare and technology.", highlights: ["3-Year Work Visa", "Very Safe", "Healthcare & Tech Demand"] },
  { id: "japan",          region: "apac",     name: "Japan",         flag: "/images/flags/jp.png", tagline: "Japan Student Visa",       desc: "World-ranked universities with MEXT government scholarships. Asia's technology powerhouse with unique career opportunities in robotics and innovation.", highlights: ["MEXT Scholarship", "Tech Powerhouse", "Unique Career Paths"] },
  { id: "south-korea",    region: "apac",     name: "South Korea",   flag: "/images/flags/kr.png", tagline: "South Korea D-2 Visa",    desc: "SKY universities with the GKS government scholarship. Fast-growing economy with career opportunities in tech, automotive and the global K-culture industry.", highlights: ["GKS Scholarship", "SKY Universities", "Tech & Innovation"] },

  // ── Middle East ──
  { id: "dubai",          region: "middleeast", name: "Dubai (UAE)", flag: "/images/flags/ae.png", tagline: "UAE Student Visa",         desc: "Branch campuses of world-ranked universities in a tax-free environment. Unmatched networking opportunities and a gateway to the entire Middle East job market.", highlights: ["Tax-Free Environment", "World-Ranked Campuses", "ME Career Gateway"] },

  // ── Africa & Indian Ocean ──
  { id: "mauritius",      region: "africa",   name: "Mauritius",     flag: "/images/flags/mu.png", tagline: "Mauritius Study Visa",     desc: "International university branch campuses in a stunning, safe, bilingual island nation. Ideal for students seeking a unique European-standard education experience.", highlights: ["Global Branch Campuses", "Bilingual Nation", "Safe & Scenic"] },
];

const regions = [
  { id: "all",        label: "All 33 Countries" },
  { id: "europe",     label: "Europe" },
  { id: "apac",       label: "Asia & Pacific" },
  { id: "americas",   label: "North America" },
  { id: "middleeast", label: "Middle East" },
  { id: "africa",     label: "Africa & Islands" },
];

function Section({ children, bg = "#ffffff", style = {} }: { children: React.ReactNode; bg?: string; style?: React.CSSProperties }) {
  return <section style={{ background: bg, position: "relative", overflow: "hidden", ...style }}>{children}</section>;
}

function Eyebrow({ label }: { label: string }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "9px", marginBottom: "16px" }}>
      <div style={{ width: "30px", height: "2px", borderRadius: "1px", background: "linear-gradient(90deg, #07CBEB, #022C45)" }}/>
      <span style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "2.5px", textTransform: "uppercase", background: "linear-gradient(90deg, #07CBEB, #022C45)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{label}</span>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
export default function StudyAbroadPage() {
  useEffect(() => { document.title = "Study Abroad Destinations — 33 Countries | Edification Overseas"; }, []);

  const heroRef = useInView(0.1);
  const gridRef = useInView(0.05);
  const ctaRef  = useInView(0.1);

  const [activeRegion, setActiveRegion] = useState("all");
  const [search, setSearch] = useState("");

  const filteredDestinations = destinations.filter(d => {
    const matchRegion = activeRegion === "all" || d.region === activeRegion;
    const matchSearch = search === "" || d.name.toLowerCase().includes(search.toLowerCase());
    return matchRegion && matchSearch;
  });

  return (
    <main style={{ background: "#F9FAFB", overflowX: "hidden" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeUp      { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn     { from { opacity: 0; transform: scale(0.85); }     to { opacity: 1; transform: scale(1); } }
        @keyframes floatFlag1  { 0%,100% { transform: translateY(0) scale(1); }   50% { transform: translateY(-20px) scale(1.05); } }
        @keyframes floatFlag2  { 0%,100% { transform: translateY(0) scale(1); }   50% { transform: translateY(15px) scale(0.95); } }
        @keyframes floatFlag3  { 0%,100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-10px) rotate(5deg); } }
        @keyframes glowPulse   { 0%,100% { box-shadow: 0 0 20px rgba(7,203,235,0.2); } 50% { box-shadow: 0 0 40px rgba(7,203,235,0.6); } }

        .filter-track { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin-bottom: 16px; }
        .filter-btn { padding: 10px 22px; border-radius: 999px; font-size: 13px; font-weight: 800; background: #ffffff; border: 1px solid rgba(2,44,69,0.1); color: #4B5563; cursor: pointer; transition: all 0.3s ease; font-family: inherit; }
        .filter-btn:hover { background: rgba(7,203,235,0.05); border-color: #07CBEB; color: #07CBEB; }
        .filter-btn.active { background: #022C45; color: #ffffff; border-color: #022C45; box-shadow: 0 8px 16px rgba(2,44,69,0.15); }

        .search-input { padding: 12px 20px 12px 44px; border-radius: 12px; border: 1.5px solid rgba(2,44,69,0.12); background: #fff; font-size: 14px; font-family: inherit; outline: none; width: 100%; max-width: 340px; color: #022C45; transition: border-color .2s; }
        .search-input:focus { border-color: #07CBEB; box-shadow: 0 0 0 3px rgba(7,203,235,0.1); }

        .dest-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .dest-card { background: #ffffff; border-radius: 18px; padding: 24px 22px; border: 1px solid rgba(2,44,69,0.06); box-shadow: 0 4px 16px rgba(2,44,69,0.03); position: relative; overflow: hidden; display: flex; flex-direction: column; transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease; }
        .dest-card:hover { transform: translateY(-6px); box-shadow: 0 20px 40px rgba(241,97,1,0.08); border-color: #F16101; }
        .dest-card::before { content: ""; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: #F16101; opacity: 0; transition: opacity 0.3s; }
        .dest-card:hover::before { opacity: 1; }

        .dest-flag { width: 48px; height: 48px; border-radius: 50%; border: 2px solid rgba(2,44,69,0.08); box-shadow: 0 4px 12px rgba(2,44,69,0.08); position: relative; overflow: hidden; flex-shrink: 0; }
        .dest-tagline { font-size: 10px; font-weight: 800; color: #07CBEB; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 3px; }
        .dest-title { font-size: 17px; font-weight: 900; color: #022C45; margin: 0; letter-spacing: -0.3px; line-height: 1.2; }
        .dest-desc { font-size: 13px; color: #4B5563; line-height: 1.6; margin: 0 0 16px; flex: 1; }

        .dest-benefit-item { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; }
        .dest-btn { display: flex; align-items: center; justify-content: center; width: 100%; padding: 10px 16px; background: #022C45; color: #ffffff; border-radius: 8px; font-size: 12.5px; font-weight: 800; text-transform: uppercase; text-decoration: none; transition: all 0.3s ease; letter-spacing: 0.5px; margin-top: auto; border-top: 1px solid rgba(2,44,69,0.06); padding-top: 16px; }
        .dest-card:hover .dest-btn { background: #F16101; }

        @media (max-width: 1280px) { .dest-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 900px)  { .dest-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 560px)  { .dest-grid { grid-template-columns: 1fr; } .filter-track { justify-content: flex-start; overflow-x: auto; padding-bottom: 8px; flex-wrap: nowrap; } .filter-btn { white-space: nowrap; flex-shrink: 0; } }
        .cta-btn { transition: transform 0.18s cubic-bezier(0.4,0,0.2,1); }
        .cta-btn:hover { transform: translateY(-2px); }
        @media (max-width: 767px) {
          .countries-hero-flags { display: none !important; }
          .dest-grid { gap: 12px !important; }
          .dest-card { padding: 16px 14px !important; }
        }
      `}} />

      {/* ── HERO ── */}
      <Section bg="#011624" style={{ padding: "0", minHeight: "clamp(auto, auto, 75vh)", display: "flex", alignItems: "center" }}>
        <div style={{ position: "absolute", top: "20%", left: "-10%", width: "50vw", height: "50vw", background: "radial-gradient(circle, rgba(7,203,235,0.05) 0%, transparent 60%)", pointerEvents: "none" }}/>
        <div style={{ position: "absolute", bottom: "-10%", right: "-10%", width: "60vw", height: "60vw", background: "radial-gradient(circle, rgba(241,97,1,0.05) 0%, transparent 60%)", pointerEvents: "none" }}/>

        <div ref={heroRef.ref} style={{ maxWidth: "1280px", width: "100%", margin: "0 auto", padding: "clamp(40px, 8vw, 100px) 20px clamp(60px, 8vw, 100px)", position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: "clamp(24px, 5vw, 64px)", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 min(500px, 100%)", width: "100%" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "999px", padding: "6px 16px", marginBottom: "24px", animation: heroRef.inView ? "fadeSlideUp 0.5s ease 0.1s both" : "none" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#07CBEB", display: "inline-block", boxShadow: "0 0 10px #07CBEB" }}/>
              <span style={{ fontSize: "12px", fontWeight: 800, color: "rgba(255,255,255,0.9)", letterSpacing: "0.4px", textTransform: "uppercase" }}>33 Countries — One Trusted Consultant</span>
            </div>

            <h1 style={{ fontSize: "clamp(38px, 5vw, 64px)", fontWeight: 900, color: "#ffffff", lineHeight: 1.1, letterSpacing: "-1px", marginBottom: "24px", animation: heroRef.inView ? "fadeSlideUp 0.55s ease 0.2s both" : "none" }}>
              Discover Your<br/>
              <span style={{ color: "#07CBEB", position: "relative", display: "inline-block", textShadow: "0 2px 16px rgba(7,203,235,0.2)", paddingBottom: "14px" }}>
                Dream Destination
                <svg aria-hidden="true" style={{ position: "absolute", bottom: "0px", left: 0, width: "100%", overflow: "visible" }} height="6" viewBox="0 0 200 6" preserveAspectRatio="none">
                  <path d="M0,5 Q50,0 100,5 Q150,10 200,5" stroke="#07CBEB" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>

            <p style={{ fontSize: "clamp(15px, 1.8vw, 17px)", color: "rgba(255,255,255,0.75)", lineHeight: 1.75, marginBottom: "40px", maxWidth: "540px", animation: heroRef.inView ? "fadeSlideUp 0.55s ease 0.3s both" : "none" }}>
              From a <strong style={{ color: "#fff" }}>UK Graduate Route Visa</strong> to a <strong style={{ color: "#fff" }}>Canada PGWP</strong>, an affordable <strong style={{ color: "#fff" }}>European MBBS</strong> or a fast-track <strong style={{ color: "#fff" }}>Singapore Student Pass</strong> — we cover 33 countries so you never have to look elsewhere.
            </p>

            {/* Stats */}
            <div style={{ display: "flex", gap: "32px", flexWrap: "wrap", marginBottom: "40px", animation: heroRef.inView ? "fadeSlideUp 0.55s ease 0.35s both" : "none" }}>
              {[["33", "Countries Covered"], ["4,000+", "Students Guided"], ["98%", "Visa Success Rate"]].map(([num, label]) => (
                <div key={label}>
                  <div style={{ fontSize: "28px", fontWeight: 900, color: "#07CBEB", lineHeight: 1 }}>{num}</div>
                  <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", fontWeight: 600, marginTop: "4px" }}>{label}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", animation: heroRef.inView ? "fadeSlideUp 0.55s ease 0.4s both" : "none" }}>
              <Link href="/contact" className="cta-btn" style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "15px 32px", background: "#F16101", borderRadius: "12px", fontSize: "14px", fontWeight: 800, color: "white", textTransform: "uppercase", letterSpacing: "0.5px", textDecoration: "none", boxShadow: "0 8px 20px rgba(241,97,1,0.3)" }}>
                Start Your Journey →
              </Link>
              <Link href="/book-consultation" className="cta-btn" style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "15px 32px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "12px", fontSize: "14px", fontWeight: 800, color: "white", textTransform: "uppercase", letterSpacing: "0.5px", textDecoration: "none" }}>
                Book Free Session
              </Link>
            </div>
          </div>

          {/* Floating flags */}
          <div className="countries-hero-flags" style={{ flex: "1 1 450px", position: "relative", minHeight: "460px", animation: heroRef.inView ? "scaleIn 0.8s cubic-bezier(0.22,1,0.36,1) 0.3s both" : "none", opacity: heroRef.inView ? 1 : 0, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{ position: "absolute", width: "300px", height: "300px", background: "rgba(7,203,235,0.15)", borderRadius: "50%", filter: "blur(40px)", animation: "glowPulse 4s infinite" }}/>
            <div style={{ position: "absolute", width: "130px", height: "130px", borderRadius: "50%", border: "4px solid rgba(255,255,255,0.1)", zIndex: 10, animation: "floatFlag1 6s infinite", overflow: "hidden" }}>
              <Image src="/images/flags/sg.png" alt="Singapore" fill style={{ objectFit: "cover" }}/>
            </div>
            {[
              { src: "/images/flags/gb.png", alt: "UK",        top: "10%",  left: "10%",   size: 90, anim: "floatFlag2 7s infinite reverse" },
              { src: "/images/flags/cy.png", alt: "Cyprus",    top: "5%",   right: "15%",  size: 80, anim: "floatFlag3 8s infinite" },
              { src: "/images/flags/au.png", alt: "Australia", bottom:"15%",left: "5%",    size: 100,anim: "floatFlag3 5s infinite reverse" },
              { src: "/images/flags/de.png", alt: "Germany",   bottom:"10%",right: "10%",  size: 110,anim: "floatFlag1 7.5s infinite" },
              { src: "/images/flags/ca.png", alt: "Canada",    top: "45%",  right: "-5%",  size: 70, anim: "floatFlag2 6.5s infinite" },
              { src: "/images/flags/jp.png", alt: "Japan",     top: "30%",  left: "-5%",   size: 70, anim: "floatFlag1 5.5s infinite reverse" },
            ].map((f, i) => (
              <div key={i} style={{ position: "absolute", top: f.top, left: f.left, right: f.right, bottom: f.bottom, width: `${f.size}px`, height: `${f.size}px`, borderRadius: "50%", border: "3px solid rgba(255,255,255,0.1)", zIndex: 9, animation: f.anim, overflow: "hidden", boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }}>
                <Image src={f.src} alt={f.alt} fill style={{ objectFit: "cover" }}/>
              </div>
            ))}
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", overflow: "hidden", lineHeight: 0, zIndex: 2 }}>
          <svg viewBox="0 0 1440 120" style={{ display: "block", width: "100%", height: "80px" }} preserveAspectRatio="none">
            <path d="M0,120 L1440,0 L1440,120 Z" fill="#F9FAFB"/>
          </svg>
        </div>
      </Section>

      {/* ── GRID ── */}
      <Section bg="#F9FAFB" style={{ padding: "60px 0 120px" }}>
        <div ref={gridRef.ref} style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 24px" }}>

          <div style={{ textAlign: "center", animation: gridRef.inView ? "fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both" : "none", opacity: gridRef.inView ? 1 : 0 }}>
            <Eyebrow label="All Destinations"/>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 900, color: "#022C45", lineHeight: 1.1, letterSpacing: "-0.8px", margin: "0 0 12px" }}>
              33 Countries.<br/>
              <span style={{ background: "linear-gradient(100deg, #07CBEB 0%, #022C45 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                One Expert Team.
              </span>
            </h2>
            <p style={{ fontSize: "16px", color: "#6B7280", lineHeight: 1.6, maxWidth: "560px", margin: "0 auto 32px" }}>
              Filter by region or search by country name to find your perfect study destination.
            </p>
          </div>

          {/* Search + Filter */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", marginBottom: "48px", animation: gridRef.inView ? "fadeUp 0.5s ease 0.1s both" : "none" }}>
            {/* Search */}
            <div style={{ position: "relative" }}>
              <svg style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#9CA3AF" }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input className="search-input" placeholder="Search country..." value={search} onChange={e => setSearch(e.target.value)}/>
            </div>
            {/* Region filters */}
            <div className="filter-track">
              {regions.map(r => (
                <button key={r.id} className={`filter-btn ${activeRegion === r.id ? "active" : ""}`} onClick={() => setActiveRegion(r.id)}>{r.label}</button>
              ))}
            </div>
            <p style={{ fontSize: "13px", color: "#9CA3AF", fontWeight: 600 }}>
              Showing {filteredDestinations.length} of {destinations.length} destinations
            </p>
          </div>

          {/* Destination Grid */}
          <div className="dest-grid">
            {filteredDestinations.map((dest, i) => (
              <div key={dest.id} className="dest-card" style={{ animation: gridRef.inView ? `fadeUp 0.4s cubic-bezier(0.22,1,0.36,1) ${(i % 12) * 0.04}s both` : "none", opacity: gridRef.inView ? 1 : 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" }}>
                  <div className="dest-flag">
                    <Image src={dest.flag} alt={dest.name} fill style={{ objectFit: "cover" }}/>
                  </div>
                  <div>
                    <div className="dest-tagline">{dest.tagline}</div>
                    <h3 className="dest-title">{dest.name}</h3>
                  </div>
                </div>

                <p className="dest-desc">{dest.desc}</p>

                <div style={{ marginBottom: "16px" }}>
                  {dest.highlights.map((h, hi) => (
                    <div key={hi} className="dest-benefit-item">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F16101" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      <span style={{ fontSize: "13px", fontWeight: 600, color: "#111827" }}>{h}</span>
                    </div>
                  ))}
                </div>

                <Link href={`/countries/${dest.id}`} className="dest-btn">
                  View Full Guide →
                </Link>
              </div>
            ))}
          </div>

          {filteredDestinations.length === 0 && (
            <div style={{ textAlign: "center", padding: "60px 0", color: "#9CA3AF", fontWeight: 600 }}>
              No countries match your search. Try a different term.
            </div>
          )}
        </div>
      </Section>

      {/* ── CTA ── */}
      <Section bg="#ffffff" style={{ padding: "clamp(48px, 8vw, 100px) 0" }}>
        <div ref={ctaRef.ref} style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ background: "linear-gradient(135deg, #022C45 0%, #054f77 100%)", borderRadius: "24px", padding: "clamp(28px, 5vw, 56px) clamp(20px, 5vw, 64px)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "40px", flexWrap: "wrap", position: "relative", overflow: "hidden", boxShadow: "0 24px 48px rgba(7,203,235,0.15)", animation: ctaRef.inView ? "scaleIn 0.6s cubic-bezier(0.22,1,0.36,1) both" : "none", opacity: ctaRef.inView ? 1 : 0 }}>
            <div style={{ position: "absolute", right: "-80px", top: "-80px", width: "320px", height: "320px", borderRadius: "50%", background: "radial-gradient(circle, rgba(7,203,235,0.2) 0%, transparent 70%)", pointerEvents: "none" }}/>

            <div style={{ position: "relative", zIndex: 1, flex: "1 1 400px" }}>
              <div style={{ display: "inline-block", background: "rgba(7,203,235,0.2)", color: "#8ce7f7", fontSize: "11px", fontWeight: 800, padding: "6px 12px", borderRadius: "6px", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "1px" }}>Free Profile Assessment</div>
              <h2 style={{ fontSize: "clamp(26px, 3.5vw, 36px)", fontWeight: 900, color: "white", letterSpacing: "-0.5px", margin: "0 0 16px" }}>Confused About Where to Apply?</h2>
              <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.7)", margin: 0, lineHeight: 1.6, maxWidth: "480px" }}>
                Our ICEF-accredited counsellors will evaluate your academic profile, budget and career goals to shortlist the perfect country and universities for you — free of charge.
              </p>
            </div>

            <Link href="/contact" className="cta-btn" style={{ display: "inline-flex", alignItems: "center", gap: "10px", position: "relative", zIndex: 1, padding: "16px 32px", background: "#F16101", borderRadius: "12px", fontSize: "15px", fontWeight: 800, color: "white", textTransform: "uppercase", letterSpacing: "0.5px", textDecoration: "none", boxShadow: "0 8px 20px rgba(241,97,1,0.3)", flexShrink: 0 }}>
              Book Consultation →
            </Link>
          </div>
        </div>
      </Section>
    </main>
  );
}
