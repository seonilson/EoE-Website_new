"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// ── useInView ─────────────────────────────────────────────────
function useInView(threshold = 0.12) {
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

// ── Data: Quick Facts ─────────────────────────────────────────
const quickFacts = [
  { icon: "🏛️", label: "Capital", value: "Minsk" },
  { icon: "💵", label: "Currency", value: "BYN (Belarusian Ruble)" },
  { icon: "🗣️", label: "Language", value: "Russian & Belarusian" },
  { icon: "❄️", label: "Weather", value: "Continental (Cold Winters)" },
  { icon: "🎓", label: "Top Intakes", value: "September & February" },
];

// ── Data: Section Navigation ──────────────────────────────────
const tabsData = [
  { id: "overview", icon: "🌍", label: "Why Belarus?" },
  { id: "institutions", icon: "🏛️", label: "Top Universities" },
  { id: "courses", icon: "🎯", label: "MBBS & Language" },
  { id: "admissions", icon: "📝", label: "Visa Process" },
  { id: "documents", icon: "📂", label: "Documents" },
  { id: "careers", icon: "💼", label: "Work Rules" },
  { id: "faqs", icon: "❓", label: "FAQs" }
];

// ── Data: Other Destinations (Swipe Track) ────────────────────
const otherDestinations = [
  { id: "russia", name: "Russia", flag: "/images/flags/ru.png" },
  { id: "cyprus", name: "Cyprus", flag: "/images/flags/cy.png" },
  { id: "malta", name: "Malta", flag: "/images/flags/mt.png" },
  { id: "malaysia", name: "Malaysia", flag: "/images/flags/my.png" }
];

// ── Data: Leadership & Process Flow ───────────────────────────
const leadership = [
  { 
    name: "Himal Chauhan", 
    role: "Director - B2B Strategy & Partnerships", 
    focus: "Pan-India B2B Market Development",
    background: "Fortune 500 Corporate Background",
    desc: "Himal leads Edification Overseas' business-to-business outreach across India, developing and managing strategic relationships with education agents, institutions, and partner networks nationwide.\n\nBefore transitioning into the education sector, Himal built a strong foundation working within Fortune 500 organisations, gaining expertise in structured operations, stakeholder management, and large-scale business development.\n\nHe brings that corporate discipline into the education space — creating a B2B framework that is organised, reliable, and built for long-term growth across diverse regional markets.", 
    img: "/images/team/himal.jpg" 
  },
  { 
    name: "Meet Desai", 
    role: "Director - Marketing & Student Engagement", 
    focus: "B2C Student Relations & Company Marketing",
    background: "Master's Degree Holder",
    desc: "Meet Desai is the student-facing voice of Edification Overseas, building direct connections with prospective students and guiding them through their study abroad journey with clarity and confidence.\n\nHolding a Master's degree, Meet understands the academic path firsthand and uses that perspective to create marketing communications that are honest, relatable, and genuinely useful for students at every stage of decision-making.\n\nHe oversees all marketing activities for the company — from digital presence to student outreach — ensuring our message reaches the right audience in the right way.", 
    img: "/images/team/meet.jpg" 
  },
  { 
    name: "Sohel Kureshi", 
    role: "Director - Global University Relations", 
    focus: "International University Communication",
    background: "Master's Graduate, Australia",
    desc: "Sohel Kureshi serves as the primary bridge between Edification Overseas and universities across international study destinations. Having completed his Master's degree from Australia, he brings first-hand experience of the overseas academic environment to every partnership he builds.\n\nHis role centres on maintaining direct communication with admissions offices, faculty contacts, and institutional representatives at partner universities — ensuring that students and agents receive accurate, up-to-date guidance at every stage.\n\nWith a deep understanding of how international institutions operate from the inside, Sohel ensures that our partnerships remain strong, informed, and consistently aligned with institutional expectations.", 
    img: "/images/team/sohail.jpg" 
  }
];

const teamProcess = [
  { 
    title: "University Selection", 
    team: "Step 01", 
    desc: "We evaluate your academic profile and budget to select the best Belarusian Medical or Technical University for your goals.", 
    icon: "🎯",
    num: "01"
  },
  { 
    title: "Official Invitation", 
    team: "Step 02", 
    desc: "We secure your admission and apply for the mandatory official Invitation Letter from the Belarusian Ministry of Education.", 
    icon: "📜",
    num: "02"
  },
  { 
    title: "Visa Processing", 
    team: "Step 03", 
    desc: "With no IELTS and an incredibly high success rate, we process your visa smoothly using your official university invitation.", 
    icon: "⚖️",
    num: "03"
  },
  { 
    title: "Arrival & Registration", 
    team: "Step 04", 
    desc: "We guide you through flight bookings, secure hostel allocation, and the mandatory post-arrival university registration.", 
    icon: "✈️",
    num: "04"
  }
];

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

// ── Heading ───────────────────────────────────────────────────
function Heading({ line1, line2, color = "#022C45" }: { line1: string; line2: string; color?: string }) {
  return (
    <h2 style={{ fontSize: "clamp(32px, 4vw, 44px)", fontWeight: 900, color, lineHeight: 1.1, letterSpacing: "-0.8px", margin: "0 0 16px" }}>
      {line1}<br/>
      <span style={{ position: "relative", display: "inline-block", background: "linear-gradient(100deg, #F16101 0%, #C9A24D 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
        {line2}
        <svg style={{ position: "absolute", bottom: "-6px", left: 0, width: "100%" }} height="5" viewBox="0 0 300 5" preserveAspectRatio="none">
          <defs><linearGradient id="ulineAbout" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#F16101"/><stop offset="100%" stopColor="#C9A24D"/></linearGradient></defs>
          <path d="M0,3 Q75,0 150,3 Q225,7 300,3" stroke="url(#ulineAbout)" strokeWidth="3" fill="none" strokeLinecap="round"/>
        </svg>
      </span>
    </h2>
  );
}

// ═══════════════════════════════════════════════════════════════
//  BELARUS MASTER PAGE
// ═══════════════════════════════════════════════════════════════
export default function CountryBelarusPage() {
  useEffect(() => { document.title = "Study in Belarus 2026 — Student Visa, MBBS & Universities | Edification Overseas"; }, []);

  const heroRef = useInView(0.1);
  const contentRef = useInView(0.05);
  const dirRef = useInView(0.1);
  const processRef = useInView(0.05);
  const trustRef = useInView(0.1);
  const ctaRef = useInView(0.1);

  const [activeTab, setActiveTab] = useState("overview");

  // Smooth Scroll Logic
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll-Spy Observer
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; 
      let currentSection = tabsData[0].id;
      for (const tab of tabsData) {
        const section = document.getElementById(tab.id);
        if (section && section.offsetTop <= scrollPosition) {
          currentSection = tab.id;
        }
      }
      setActiveTab(currentSection);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Wheel State
  const [activeStep, setActiveStep] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-Player
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 4000); 
    return () => clearInterval(timer);
  }, [isHovered]);

  return (
    <main style={{ background: "#ffffff", overflowX: "hidden" }}>

      <style>{`
        /* Entrance Animations */
        @keyframes fadeUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeLeft { from { opacity: 0; transform: translateX(-40px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fadeRight { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.85); } to { opacity: 1; transform: scale(1); } }
        @keyframes badgePulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.4); } }
        @keyframes float1 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
        @keyframes float2 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(12px); } }
        @keyframes glowPulse { 0%, 100% { filter: blur(40px) brightness(1); } 50% { filter: blur(60px) brightness(1.3); } }
        
        /* Floating Vector Animations */
        @keyframes floatSlow { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
        @keyframes floatMedium { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-20px) rotate(2deg); } }
        @keyframes floatFast { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-25px) rotate(-3deg); } }

        /* Quick Facts Bar */
        .qf-bar { background: #ffffff; border-radius: 20px; padding: 24px 32px; box-shadow: 0 12px 32px rgba(2,44,69,0.04); border: 1px solid rgba(2,44,69,0.05); display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap: wrap; margin-top: -40px; position: relative; z-index: 10; }
        .qf-item { display: flex; align-items: center; gap: 12px; }

        /* Main Content Container */
        .content-container { padding: 56px 0 100px; width: 100%; }

        /* Sticky Tabs Wrapper */
        .tabs-sticky-wrapper { position: sticky; top: 60px; z-index: 20; padding: 20px 0; background: #ffffff; box-sizing: border-box; max-width: 100%; overflow: hidden; }

        /* Tabs Container */
        .tabs-container { background: #ffffff; border-radius: 16px; padding: 12px 16px; border: 1px solid rgba(2,44,69,0.08); box-shadow: 0 12px 24px rgba(2,44,69,0.04); display: flex; gap: 16px; align-items: center; justify-content: space-between; flex-wrap: wrap; box-sizing: border-box; max-width: 100%; }
        .tabs-nav { display: flex; gap: 8px; flex-wrap: wrap; flex: 1; align-items: center; }
        .tab-btn { padding: 10px 14px; border-radius: 10px; font-size: 13.5px; font-weight: 700; background: #f4fbfc; color: #4B5563; border: 1px solid rgba(7,203,235,0.1); cursor: pointer; white-space: nowrap; transition: all 0.2s ease; flex-shrink: 0; display: flex; align-items: center; gap: 6px; }
        .tab-btn:hover { color: #022C45; background: #e0f7fa; border-color: rgba(7,203,235,0.3); }
        .tab-btn.active { background: #022C45; color: #ffffff; border-color: #022C45; }

        .tabs-cta-btn { background: #F16101; color: #ffffff; padding: 12px 20px; border-radius: 10px; font-size: 13px; font-weight: 800; text-transform: uppercase; text-decoration: none; white-space: nowrap; box-shadow: 0 4px 12px rgba(241,97,1,0.2); transition: all 0.3s; flex-shrink: 0; display: inline-flex; align-items: center; gap: 8px; }
        .tabs-cta-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(241,97,1,0.3); background: #d95701; }

        /* Standardized Scrollable Content Sections */
        .scroll-section { scroll-margin-top: 180px; background: #ffffff; border-radius: 20px; padding: 48px; border: 1px solid rgba(2,44,69,0.06); box-shadow: 0 12px 32px rgba(2,44,69,0.02); margin-bottom: 24px; }
        .scroll-section:last-child { margin-bottom: 0; }

        /* Typography */
        .scroll-section h2 { font-size: 28px; font-weight: 900; color: #022C45; margin: 0 0 20px; letter-spacing: -0.5px; line-height: 1.2; }
        .scroll-section h3 { font-size: 20px; font-weight: 800; color: #022C45; margin: 32px 0 20px; padding-bottom: 6px; border-bottom: 2px solid rgba(7,203,235,0.2); display: inline-block; }
        .scroll-section p { font-size: 15.5px; color: #4B5563; line-height: 1.8; margin: 0 0 20px; }
        .scroll-section strong { color: #022C45; font-weight: 800; }

        /* ── VISUAL COMPONENTS ── */
        .info-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin: 24px 0; }
        .info-card { background: #fcfdfd; border: 1px solid rgba(2,44,69,0.06); border-radius: 16px; padding: 24px; transition: transform 0.3s; }
        .info-card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(7,203,235,0.08); border-color: rgba(7,203,235,0.3); }
        .info-card h4 { font-size: 16px; font-weight: 800; color: #022C45; margin: 0 0 8px; display: flex; align-items: center; gap: 8px; }
        .info-card p { font-size: 14.5px; margin: 0; line-height: 1.6; }

        .stat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin: 24px 0; }
        .stat-card { background: #f4fbfc; border: 1px solid rgba(7,203,235,0.2); border-radius: 16px; padding: 24px 16px; text-align: center; }
        .stat-value { font-size: 22px; font-weight: 900; color: #022C45; margin-bottom: 6px; }
        .stat-label { font-size: 12px; font-weight: 800; color: #F16101; text-transform: uppercase; letter-spacing: 0.5px; line-height: 1.4; }

        .timeline { display: flex; flex-direction: column; gap: 16px; margin: 24px 0; }
        .timeline-step { display: flex; gap: 16px; background: #ffffff; border: 1px solid rgba(2,44,69,0.06); padding: 20px; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.02); align-items: center; }
        .step-num { width: 36px; height: 36px; background: #022C45; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 16px; flex-shrink: 0; }
        .step-content { font-size: 15.5px; color: #4B5563; }
        .step-content strong { color: #022C45; }

        .course-tags { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 16px; margin-bottom: 24px; }
        .course-tag { background: #fff5ee; color: #F16101; padding: 8px 16px; border-radius: 8px; font-size: 14px; font-weight: 700; border: 1px solid rgba(241,97,1,0.15); display: inline-flex; align-items: center; gap: 6px; }
        .course-tag-blue { background: #f4fbfc; color: #07CBEB; padding: 8px 16px; border-radius: 8px; font-size: 14px; font-weight: 700; border: 1px solid rgba(7,203,235,0.2); display: inline-flex; align-items: center; gap: 6px; }

        .content-highlight { background: #f4fbfc; border-left: 4px solid #07CBEB; padding: 20px; border-radius: 0 12px 12px 0; margin: 24px 0; }
        .content-highlight p { margin: 0; color: #022C45; font-weight: 700; font-size: 15px; }

        .faq-card { border: 1px solid rgba(2,44,69,0.08); border-radius: 16px; padding: 24px; margin-bottom: 16px; }
        .faq-card h4 { font-size: 16.5px; font-weight: 800; color: #022C45; margin: 0 0 12px; }
        .faq-card p { margin: 0; font-size: 15px; }

        .doc-list { padding-left: 0; margin: 0 0 24px; list-style: none; display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
        .doc-list li { background: #ffffff; border: 1px solid rgba(2,44,69,0.06); padding: 12px 16px 12px 36px; border-radius: 8px; position: relative; font-size: 14.5px; color: #4B5563; }
        .doc-list li::before { content: "✓"; position: absolute; left: 14px; top: 12px; color: #F16101; font-weight: 900; font-size: 14px; }

        /* Exploring Section Track */
        .explore-track { display: flex; gap: 20px; flex-wrap: wrap; justify-content: center; margin-top: 32px; }
        .explore-card { flex: 1 1 200px; max-width: 250px; background: #ffffff; border-radius: 16px; padding: 20px; border: 1px solid rgba(2,44,69,0.06); display: flex; align-items: center; gap: 16px; text-decoration: none; transition: all 0.3s; box-shadow: 0 8px 24px rgba(2,44,69,0.03); }
        .explore-card:hover { transform: translateY(-4px); box-shadow: 0 16px 32px rgba(7,203,235,0.1); border-color: #07CBEB; }
        
        .explore-all-btn { flex: 1 1 200px; max-width: 250px; background: linear-gradient(135deg, #022C45 0%, #054f77 100%); border-radius: 16px; padding: 20px; text-decoration: none; transition: all 0.3s; display: flex; align-items: center; justify-content: center; gap: 10px; color: #ffffff; box-shadow: 0 12px 24px rgba(2,44,69,0.15); }
        .explore-all-btn:hover { transform: translateY(-4px); box-shadow: 0 16px 32px rgba(2,44,69,0.25); background: linear-gradient(135deg, #054f77 0%, #022C45 100%); }

        /* ── FULL SIZE WHITE LEADERSHIP CARDS ── */
        .leadership-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; position: relative; z-index: 2; }
        .leader-card-white { background: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 16px 40px rgba(0,0,0,0.15); transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease; display: flex; flex-direction: column; }
        .leader-card-white:hover { transform: translateY(-8px); box-shadow: 0 24px 56px rgba(0,0,0,0.25); }
        .leader-photo-wrap { width: 100%; aspect-ratio: 4 / 5; position: relative; background: #eef2f6; overflow: hidden; }
        .leader-photo-wrap img { transition: transform 0.7s cubic-bezier(0.22,1,0.36,1); }
        .leader-card-white:hover .leader-photo-wrap img { transform: scale(1.05); }
        .leader-content-wrap { padding: 32px 28px; display: flex; flex-direction: column; flex: 1; }
        .leader-name { font-size: 24px; font-weight: 900; color: #022C45; margin: 0 0 6px; letter-spacing: -0.3px; }
        .leader-role { font-size: 13px; font-weight: 800; color: #F16101; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 24px; }
        .leader-desc { font-size: 15px; color: #4B5563; line-height: 1.65; margin: 0 0 28px 0; flex-grow: 1; display: flex; flex-direction: column; gap: 12px; }
        .leader-meta { background: #f4fbfc; border-radius: 14px; padding: 20px; display: flex; flex-direction: column; gap: 16px; border: 1px solid rgba(7,203,235,0.15); }
        .meta-item { display: flex; flex-direction: column; gap: 6px; }
        .meta-label { font-size: 11px; font-weight: 800; color: #022C45; text-transform: uppercase; letter-spacing: 1px; }
        .meta-value { font-size: 14px; font-weight: 700; color: #F16101; }

        /* ── HIGH-END ORBITAL WHEEL CSS ── */
        .wheel-wrapper { display: grid; grid-template-columns: 400px 1fr; gap: 80px; align-items: center; max-width: 1040px; margin: 60px auto 0; }
        .wheel-container { width: 400px; height: 400px; position: relative; display: flex; align-items: center; justify-content: center; }
        .wheel-ambient-glow { position: absolute; width: 280px; height: 280px; border-radius: 50%; background: radial-gradient(circle, rgba(241,97,1,0.08) 0%, transparent 70%); z-index: 0; }
        @keyframes spinTrack { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .wheel-track { position: absolute; width: 300px; height: 300px; border-radius: 50%; border: 2px dashed rgba(2,44,69,0.15); animation: spinTrack 40s linear infinite; z-index: 1; }
        .wheel-rotator { position: absolute; inset: 0; transition: transform 1s cubic-bezier(0.68, -0.15, 0.265, 1.15); z-index: 2; }
        .wheel-node { position: absolute; width: 64px; height: 64px; margin-left: -32px; margin-top: -32px; border-radius: 50%; background: #ffffff; border: 2px solid rgba(2,44,69,0.08); box-shadow: 0 4px 12px rgba(0,0,0,0.04); cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.4s cubic-bezier(0.22,1,0.36,1); }
        .node-0 { top: 50px; left: 200px; } .node-1 { top: 200px; left: 350px; } .node-2 { top: 350px; left: 200px; } .node-3 { top: 200px; left: 50px; }
        .wheel-node.active { background: #F16101; border-color: #F16101; transform: scale(1.2); box-shadow: 0 12px 24px rgba(241,97,1,0.3); }
        .node-icon { font-size: 24px; transition: transform 1s cubic-bezier(0.68, -0.15, 0.265, 1.15); display: flex; }
        .wheel-node:not(.active) .node-icon { filter: grayscale(1); opacity: 0.5; }
        .wheel-hub { position: absolute; width: 140px; height: 140px; border-radius: 50%; background: #022C45; box-shadow: 0 0 0 8px rgba(255,255,255,1), 0 12px 32px rgba(2,44,69,0.15); display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 5; }
        .hub-svg { position: absolute; inset: 0; width: 100%; height: 100%; transform: rotate(-90deg); }
        .hub-progress { transition: stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1); }
        .wheel-panel { background: #ffffff; border: 1px solid rgba(2,44,69,0.06); border-radius: 24px; padding: 48px; box-shadow: 0 20px 40px rgba(2,44,69,0.04); position: relative; overflow: hidden; }
        .panel-fade { animation: fadeSlideUp 0.5s cubic-bezier(0.22,1,0.36,1) both; }
        .info-watermark { position: absolute; top: -10px; right: 20px; font-size: 140px; font-weight: 900; color: rgba(2,44,69,0.02); line-height: 1; pointer-events: none; }
        
        @media (max-width: 1024px) {
          .leadership-grid { grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); }
          .qf-bar { flex-wrap: wrap; justify-content: flex-start; }
          .qf-item { width: calc(50% - 12px); }
          .stat-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 960px) {
          .wheel-wrapper { grid-template-columns: 1fr; gap: 40px; justify-items: center; }
          .wheel-panel { width: 100%; padding: 40px 24px; }
        }
        @media (max-width: 768px) {
          /* Hero */
          .hero-right-col { display: none !important; }
          .hero-left-col { flex: 0 0 100% !important; width: 100% !important; }
          .hero-inner { padding: 24px 20px 40px !important; gap: 0 !important; }
          /* Tabs */
          .tabs-sticky-wrapper { padding: 10px 16px; }
          .tabs-container {
            flex-direction: column; align-items: stretch;
            gap: 10px; padding: 10px; border-radius: 12px;
            overflow: hidden;
          }
          .tabs-nav {
            display: flex; flex-wrap: nowrap !important;
            overflow-x: auto; -webkit-overflow-scrolling: touch;
            scrollbar-width: none; padding-bottom: 4px;
            gap: 6px; width: 100%;
            /* prevent nav from stretching container wider than screen */
            min-width: 0; max-width: 100%;
          }
          .tabs-nav::-webkit-scrollbar { display: none; }
          .tab-btn {
            flex-shrink: 0; padding: 8px 10px;
            font-size: 12px; border-radius: 8px;
          }
          .tabs-cta-btn {
            width: 100%; justify-content: center;
            padding: 11px 16px; font-size: 12px;
            box-sizing: border-box;
          }
          /* Content sections */
          .scroll-section { padding: 24px 16px; scroll-margin-top: 160px; }
          .content-container { padding: 32px 0 64px; }
          .tabs-sticky-wrapper { top: 56px; padding: 12px 0; }
          /* Quick facts */
          .qf-bar { padding: 16px; gap: 12px; }
          .qf-item { width: 100%; }
          /* Grids */
          .info-grid, .doc-list { grid-template-columns: 1fr; }
          .stat-grid { grid-template-columns: repeat(2, 1fr); }
          /* Explore track */
          .explore-track { flex-direction: column; align-items: stretch; }
          .explore-card, .explore-all-btn { max-width: 100%; }
        }
        @media (max-width: 400px) {
          .stat-grid { grid-template-columns: 1fr; }
        }

        /* Button Hover */
        .btn-outline { transition: all 0.3s cubic-bezier(0.22,1,0.36,1); }
        .btn-outline:hover { background: rgba(2,44,69,0.04) !important; border-color: rgba(2,44,69,0.3) !important; transform: translateY(-3px); box-shadow: 0 8px 16px rgba(2,44,69,0.06); }
        .cta-btn { transition: transform 0.18s cubic-bezier(0.4,0,0.2,1); }
        .cta-btn:hover { transform: translateY(-2px); }
      `}</style>

      {/* ════════════════════════════════════════════════════════
          1. PREMIUM HERO (Dark Mode + Monument)
      ════════════════════════════════════════════════════════ */}
      <Section bg="#011624" style={{ padding: "0", minHeight: "auto", display: "flex", alignItems: "center", paddingTop: "40px" }}>
        <div style={{ position: "absolute", top: "20%", left: "-10%", width: "50vw", height: "50vw", background: "radial-gradient(circle, rgba(7,203,235,0.05) 0%, transparent 60%)", pointerEvents: "none" }}/>
        
        <div ref={heroRef.ref} className="hero-inner" style={{ maxWidth: "1280px", width: "100%", margin: "0 auto", padding: "20px 24px 60px", position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: "40px", flexWrap: "wrap" }}>
          
          {/* LEFT: SEO Text */}
          <div className="hero-left-col" style={{ flex: "1 1 550px" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "999px", padding: "6px 16px", marginBottom: "24px",
              animation: heroRef.inView ? "fadeSlideUp 0.5s ease 0.1s both" : "none",
            }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#07CBEB", display: "inline-block", boxShadow: "0 0 10px #07CBEB" }}/>
              <span style={{ fontSize: "12px", fontWeight: 800, color: "rgba(255,255,255,0.9)", letterSpacing: "0.4px", textTransform: "uppercase" }}>
                Safe & Affordable Europe
              </span>
            </div>

            <h1 style={{
              fontSize: "clamp(40px, 5vw, 64px)", fontWeight: 900, color: "#ffffff", lineHeight: 1.1,
              letterSpacing: "-1px", marginBottom: "24px",
              animation: heroRef.inView ? "fadeSlideUp 0.55s ease 0.2s both" : "none",
            }}>
              Study in <br/>
              <span style={{ color: "#07CBEB", position: "relative", display: "inline-block" }}>
                Belarus
                <svg aria-hidden="true" style={{ position: "absolute", bottom: "-14px", left: "-2%", width: "104%", overflow: "visible" }} height="8" viewBox="0 0 200 8" preserveAspectRatio="none">
                  <path d="M0,5 Q50,0 100,5 Q150,10 200,5" stroke="#07CBEB" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>

            <p style={{
              fontSize: "clamp(15px, 1.8vw, 17px)", color: "#ffffff", lineHeight: 1.7,
              marginBottom: "40px", maxWidth: "540px",
              animation: heroRef.inView ? "fadeSlideUp 0.55s ease 0.3s both" : "none",
            }}>
              Secure your future in one of Eastern Europe’s safest countries. A <strong>Belarus Study Visa</strong> is highly popular for Indian students seeking NMC-approved <strong>MBBS degrees</strong> and the <strong>12-Month Russian Language Preparatory Course</strong>. Enjoy a fast-tracked admission process with <strong>no IELTS/PTE</strong> required.
            </p>
          </div>

          {/* RIGHT: Floating Monument, Badges & Circular Flag */}
          <div style={{ 
            flex: "1 1 450px", position: "relative", minHeight: "450px", 
            animation: heroRef.inView ? "scaleIn 0.8s cubic-bezier(0.22,1,0.36,1) 0.3s both" : "none",
            display: "flex", justifyContent: "center", alignItems: "center"
          }} className="hero-right-col">
            <div style={{ position: "absolute", width: "350px", height: "350px", background: "rgba(7,203,235,0.12)", borderRadius: "50%", animation: "glowPulse 4s infinite" }} />
            
            {/* CLEAN Monument Image Holder */}
            <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: "420px", aspectRatio: "1/1", animation: "float1 6s infinite ease-in-out" }}>
              <Image 
                src="/images/monuments/belarus.png" 
                alt="Belarus Monument" 
                width={900} 
                height={900} 
                style={{ objectFit: "contain" }} 
                priority
              />
            </div>

            {/* Floating Circular Country Flag */}
            <div style={{ position: "absolute", top: "10%", right: "10%", width: "90px", height: "90px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.2)", zIndex: 9, animation: "float2 7s infinite reverse", overflow: "hidden", boxShadow: "0 16px 40px rgba(0,0,0,0.3)" }}>
               <Image src="/images/flags/by.png" alt="Belarus Flag" fill style={{ objectFit: "cover" }} />
            </div>

            {/* Floating Glass Badges */}
            <div style={{ position: "absolute", top: "40px", left: "0px", zIndex: 3, animation: "float2 5s infinite" }}>
              <div style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.2)", padding: "12px 20px", borderRadius: "16px", display: "flex", alignItems: "center", gap: "10px", boxShadow: "0 16px 40px rgba(0,0,0,0.2)" }}>
                <span style={{ fontSize: "20px" }}>⚡</span>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "10px", color: "#07CBEB", textTransform: "uppercase", fontWeight: 800 }}>Visa Process</span>
                  <span style={{ fontSize: "14px", fontWeight: 800, color: "#ffffff" }}>No IELTS Required</span>
                </div>
              </div>
            </div>

            <div style={{ position: "absolute", bottom: "60px", right: "0px", zIndex: 3, animation: "float1 7s infinite reverse" }}>
              <div style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.2)", padding: "12px 20px", borderRadius: "16px", display: "flex", alignItems: "center", gap: "10px", boxShadow: "0 16px 40px rgba(0,0,0,0.2)" }}>
                <span style={{ fontSize: "20px" }}>🩺</span>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "10px", color: "#07CBEB", textTransform: "uppercase", fontWeight: 800 }}>Top Choice</span>
                  <span style={{ fontSize: "14px", fontWeight: 800, color: "#ffffff" }}>MBBS & Language</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </Section>

      {/* ════════════════════════════════════════════════════════
          2. QUICK FACTS BAR
      ════════════════════════════════════════════════════════ */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
        <div className="qf-bar">
          {quickFacts.map((fact, i) => (
            <div key={i} className="qf-item">
              <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "rgba(7,203,235,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", flexShrink: 0 }}>
                {fact.icon}
              </div>
              <div>
                <div style={{ fontSize: "11px", fontWeight: 900, color: "#F16101", textTransform: "uppercase", letterSpacing: "1px" }}>{fact.label}</div>
                <div style={{ fontSize: "15px", fontWeight: 800, color: "#022C45" }}>{fact.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════
          3. MAIN CONTENT CONTAINER (Scroll-Spy Layout)
      ════════════════════════════════════════════════════════ */}
      <div ref={contentRef.ref} style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", boxSizing: "border-box", overflow: "hidden" }}>
        <div className="content-container">
          
          {/* THE MASTER HEADING */}
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 900, color: "#022C45", margin: 0, letterSpacing: "-0.5px" }}>
              Your Complete Guide to Education in Belarus
            </h2>
          </div>

          {/* Sticky Tab Navigation ("Table of Contents") + Right Button */}
          <div className="tabs-sticky-wrapper">
            <div className="tabs-container">
              <div className="tabs-nav">
                {tabsData.map(tab => (
                  <button 
                    key={tab.id}
                    className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`} 
                    onClick={() => scrollToSection(tab.id)}
                  >
                    <span>{tab.icon}</span> {tab.label}
                  </button>
                ))}
              </div>
              
              <Link href="/contact" className="tabs-cta-btn">
                Check Eligibility →
              </Link>
            </div>
          </div>

          {/* SEQUENTIAL SCROLLING SECTIONS (Full Width) */}
          <div style={{ minWidth: 0 }}>
            
            {/* CHAPTER 1: OVERVIEW */}
            <div id="overview" className="scroll-section">
              <h2>Why Study in Belarus? A Safe European Haven</h2>
              <p>Belarus has emerged as a top-tier destination for Indian students, especially for medical studies. It offers world-class European education at highly affordable tuition rates. A <strong>Belarus Study Visa</strong> guarantees a secure environment, excellent infrastructure, and degrees that are recognized globally, including by the NMC (India) and WHO.</p>
              
              <h3>Key Advantages of Education in Belarus</h3>
              <div className="info-grid">
                <div className="info-card">
                  <h4>🩺 Elite Medical Universities</h4>
                  <p>Belarusian medical universities are highly ranked, offering 6-year English medium MBBS programs with excellent clinical exposure.</p>
                </div>
                <div className="info-card">
                  <h4>🛡️ Extremely Safe Environment</h4>
                  <p>Belarus is known for its incredibly low crime rate and peaceful society, making it one of the safest countries in Europe for international students.</p>
                </div>
                <div className="info-card">
                  <h4>🚫 No IELTS/PTE Required</h4>
                  <p>Admissions are highly student-friendly. You can secure your university seat and process your student visa without any English proficiency exams.</p>
                </div>
                <div className="info-card">
                  <h4>🎓 12-Month Language Pathway</h4>
                  <p>Complete a dedicated 1-year Russian Language Preparatory Course to easily transition into highly subsidized Bachelor's or Master's programs.</p>
                </div>
              </div>
            </div>

            {/* CHAPTER 2: ACADEMICS & COST */}
            <div id="institutions" className="scroll-section">
              <h2>Top State Universities in Belarus</h2>
              <p>Belarus strictly maintains state-run universities, ensuring that the quality of education and infrastructure is strictly monitored and heavily subsidized by the government.</p>
              
              <h3>Top Medical Universities (NMC/WHO Approved)</h3>
              <p>These universities are highly sought after by Indian students for their English-medium MBBS programs:</p>
              <div className="course-tags">
                <span className="course-tag-blue">🏛️ Belarusian State Medical University (BSMU)</span>
                <span className="course-tag-blue">🏛️ Vitebsk State Medical University (VSMU)</span>
                <span className="course-tag-blue">🏛️ Gomel State Medical University (GSMU)</span>
                <span className="course-tag-blue">🏛️ Grodno State Medical University</span>
              </div>

              <h3>Top Technical, Linguistic & General Universities</h3>
              <p>Highly reputed for Engineering, IT, Humanities, and the 12-Month Russian Language Preparatory courses:</p>
              <div className="course-tags">
                <span className="course-tag">🏫 Belarusian State University (BSU)</span>
                <span className="course-tag">🏫 Belarusian National Technical University (BNTU)</span>
                <span className="course-tag">🏫 Belarusian State University of Foreign Languages (BSUFL)</span>
              </div>
              
              <h3>Estimated Financial Requirements</h3>
              <p>Because the universities are state-funded, studying in Belarus is highly cost-effective, making it a brilliant choice for Indian middle-class families.</p>
              
              <div className="stat-grid">
                <div className="stat-card">
                  <div className="stat-value">$1.5k - $3k</div>
                  <div className="stat-label">Avg. Tuition<br/>(1-Year Language Course)</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">$3.5k - $5k</div>
                  <div className="stat-label">Avg. Tuition / Year<br/>(MBBS Medical Degree)</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">$2k - $4k</div>
                  <div className="stat-label">Avg. Tuition / Year<br/>(Engineering & Tech)</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">$200 - $350</div>
                  <div className="stat-label">Avg. Monthly<br/>Living Cost</div>
                </div>
              </div>
            </div>

            {/* CHAPTER 3: COURSES */}
            <div id="courses" className="scroll-section">
              <h2>High-Demand Courses in Belarus</h2>
              <p>Belarus focuses heavily on STEM (Science, Technology, Engineering, and Mathematics) and Medical sciences, attracting thousands of international students every year.</p>
              
              <div className="content-highlight">
                <p><strong>The 12-Month Language Preparatory Course:</strong> This immersive 1-year program teaches students the Russian language from scratch. Completing this course allows students to smoothly enter full degree programs taught in Russian, which are significantly cheaper than English-taught alternatives.</p>
              </div>

              <h3>Medicine & Healthcare (MBBS)</h3>
              <p>The biggest draw for Indian students. The MBBS programs are 6 years long, fully taught in English, and provide extensive hands-on hospital training.</p>
              <div className="course-tags">
                <span className="course-tag">🩺 General Medicine (MBBS)</span>
                <span className="course-tag">🦷 Dentistry</span>
                <span className="course-tag">💊 Pharmacy</span>
              </div>

              <h3>Engineering & Information Technology</h3>
              <div className="course-tags">
                <span className="course-tag">💻 Computer Engineering</span>
                <span className="course-tag">✈️ Aviation & Aerospace</span>
                <span className="course-tag">⚙️ Mechanical Engineering</span>
              </div>
            </div>

            {/* CHAPTER 4: ADMISSIONS & VISAS */}
            <div id="admissions" className="scroll-section">
              <h2>Navigating the Belarus Student Visa</h2>
              <p>The Belarus Student Visa process is highly systematic and straightforward. The most critical step is obtaining the official <strong>Study Invitation Letter</strong> from the Ministry of Education in Belarus.</p>
              
              <h3>The Step-by-Step Visa Process</h3>
              <div className="timeline">
                <div className="timeline-step">
                  <div className="step-num">1</div>
                  <div className="step-content"><strong>University Admission:</strong> Submit your 10th/12th mark sheets and passport copy to secure your university seat.</div>
                </div>
                <div className="timeline-step">
                  <div className="step-num">2</div>
                  <div className="step-content"><strong>Official Invitation Letter:</strong> The university applies to the Migration Department to issue your official Study Invitation Letter. This process takes about 2 to 4 weeks.</div>
                </div>
                <div className="timeline-step">
                  <div className="step-num">3</div>
                  <div className="step-content"><strong>Medical Tests in India:</strong> Complete the mandatory medical tests (including HIV/AIDS certification) at a recognized lab in India.</div>
                </div>
                <div className="timeline-step">
                  <div className="step-num">4</div>
                  <div className="step-content"><strong>Visa Stamping:</strong> Submit your passport, original invitation letter, and medical reports to the Belarus Embassy in India. The visa is typically stamped within a few days.</div>
                </div>
                <div className="timeline-step">
                  <div className="step-num">5</div>
                  <div className="step-content"><strong>Arrival & Registration:</strong> Travel to Belarus. The university will pick you up from the airport, allocate your hostel, and complete your local medical check and migration registration.</div>
                </div>
              </div>
            </div>

            {/* CHAPTER 5: DOCUMENTS */}
            <div id="documents" className="scroll-section">
              <h2>Official Document Checklist</h2>
              <p>For a smooth visa process, all documents must be neat, original, and properly formatted. Medical reports are strictly scrutinized.</p>
              
              <h3>Required Admission & Visa Documents</h3>
              <ul className="doc-list">
                <li>Original Passport (Valid for at least 1-2 years)</li>
                <li>Original Official Study Invitation Letter</li>
                <li>Original HIV/AIDS Test Certificate (Issued within the last 3 months)</li>
                <li>All Academic Transcripts & Certificates (10th, 12th)</li>
                <li>Passport-sized Photographs (Matte finish, white background)</li>
                <li>Completed Belarus Visa Application Form</li>
                <li>Birth Certificate (May require Apostille/Translation depending on the embassy)</li>
              </ul>
            </div>

            {/* CHAPTER 6: CAREERS */}
            <div id="careers" className="scroll-section">
              <h2>Work Rights and Post-Study Pathways</h2>
              <p>The primary focus of a Belarus student visa is strictly educational, and the rules around working are defined to ensure academic success.</p>
              
              <div className="content-highlight">
                <p><strong>Part-Time Work Rules:</strong> The primary purpose of your stay in Belarus is to study. While some part-time work may be permitted under specific conditions (usually within the university or with special permission), international students should primarily rely on their family funds for living expenses, which are extremely low.</p>
              </div>

              <h3>Post-Study Medical Pathways</h3>
              <p>The majority of Indian students in Belarus are studying Medicine. Upon graduation, they receive a globally recognized MD (MBBS) degree. Most students return to India to clear the <strong>FMGE/NEXT</strong> exam to practice locally, while others use their globally recognized degree to pursue medical residencies in the UK, USA, or Germany.</p>
            </div>

            {/* CHAPTER 7: FAQS */}
            <div id="faqs" className="scroll-section">
              <h2>Frequently Asked Questions (FAQs)</h2>
              
              <div className="faq-card">
                <h4>Is Belarus safe for Indian students?</h4>
                <p>Yes, Belarus is considered one of the safest countries in Europe. The crime rate is exceptionally low, the police are strict, and universities maintain highly secure, monitored hostel campuses specifically for international students.</p>
              </div>

              <div className="faq-card">
                <h4>Is the Russian Language Course mandatory for MBBS?</h4>
                <p>No. If you enroll in an English-medium MBBS program, your core medical subjects are taught in English. However, you will be taught basic Russian as a subject so you can communicate with local patients during your hospital clinical rotations.</p>
              </div>
              
              <div className="faq-card">
                <h4>Is an IELTS or PTE score required for the visa?</h4>
                <p>No. Neither the Belarusian universities nor the Belarus Embassy require IELTS, PTE, or TOEFL scores for admission or visa processing.</p>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* ════════════════════════════════════════════════════════
          4. EXPLORE OTHER DESTINATIONS (Warm, Premium Footer)
      ════════════════════════════════════════════════════════ */}
      <Section bg="linear-gradient(180deg, #F9FAFB 0%, #ffffff 100%)" style={{ padding: "80px 0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
          
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <h3 style={{ fontSize: "28px", fontWeight: 900, color: "#022C45", margin: "0 0 12px", letterSpacing: "-0.5px" }}>
              Still Exploring Your Options?
            </h3>
            <p style={{ fontSize: "16px", color: "#4B5563", margin: 0, maxWidth: "600px", marginInline: "auto", lineHeight: 1.6 }}>
              Every country offers unique opportunities. Compare Belarus with other top global study destinations to find your perfect fit.
            </p>
          </div>
          
          <div className="explore-track">
            {otherDestinations.map((dest) => (
              <Link href={`/countries/${dest.id}`} key={dest.id} className="explore-card">
                <div style={{ width: "48px", height: "48px", borderRadius: "50%", position: "relative", overflow: "hidden", flexShrink: 0, border: "2px solid #f4fbfc", boxShadow: "0 4px 12px rgba(2,44,69,0.08)" }}>
                  <Image src={dest.flag} alt={dest.name} fill style={{ objectFit: "cover" }} />
                </div>
                <div style={{ fontSize: "16px", fontWeight: 800, color: "#022C45" }}>{dest.name}</div>
              </Link>
            ))}
            
            {/* The 5th Action Item: Explore All */}
            <Link href="/countries" className="explore-all-btn">
              <span style={{ fontSize: "15px", fontWeight: 800 }}>Explore All 30+ Destinations</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </Link>
          </div>

        </div>
      </Section>

      {/* ════════════════════════════════════════════════════════
          5. BOTTOM CTA BANNER 
      ════════════════════════════════════════════════════════ */}
      <Section bg="#ffffff" style={{ padding: "60px 0 100px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{
            background: "linear-gradient(135deg, #022C45 0%, #054f77 100%)",
            borderRadius: "24px", padding: "56px 64px",
            display: "flex", alignItems: "center", justifyContent: "space-between", gap: "40px", flexWrap: "wrap",
            position: "relative", overflow: "hidden",
            boxShadow: "0 24px 48px rgba(7,203,235,0.15)"
          }}>
            <div style={{ position: "absolute", right: "-80px", top: "-80px", width: "320px", height: "320px", borderRadius: "50%", background: "radial-gradient(circle, rgba(7,203,235,0.2) 0%, transparent 70%)", pointerEvents: "none" }}/>
            
            <div style={{ position: "relative", zIndex: 1, flex: "1 1 400px" }}>
              <h2 style={{ fontSize: "clamp(28px, 3.5vw, 36px)", fontWeight: 900, color: "white", letterSpacing: "-0.5px", margin: "0 0 16px" }}>
                Ready to Apply to Belarus?
              </h2>
              <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.7)", margin: 0, lineHeight: 1.6, maxWidth: "480px" }}>
                Connect with our certified experts to secure your medical university seat, obtain your official Ministry Invitation, and confidently lodge your Belarus Study Visa.
              </p>
            </div>

            <Link href="/contact" style={{
              display: "inline-flex", alignItems: "center", gap: "10px", position: "relative", zIndex: 1,
              background: "#c94e00", borderRadius: "12px", padding: "0 0 4px 0", textDecoration: "none", flexShrink: 0,
            }}>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: "10px", padding: "16px 32px",
                background: "#F16101", borderRadius: "12px", fontSize: "15px", fontWeight: 800,
                color: "white", textTransform: "uppercase", letterSpacing: "0.5px", position: "relative",
              }}>
                <span style={{ position: "absolute", top: 0, left: 0, right: 0, height: "45%", background: "linear-gradient(180deg,rgba(255,255,255,0.15),transparent)", borderRadius: "12px 12px 0 0", pointerEvents: "none" }}/>
                Book Consultation →
              </span>
            </Link>
          </div>
        </div>
      </Section>

    </main>
  );
}