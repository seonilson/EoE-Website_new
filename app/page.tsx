import HeroSection from "@/components/home/HeroSection";
import GujaratSeoSection from "@/components/home/GujaratSeoSection";
import AboutSnippet from "@/components/home/AboutSnippet";
import Destinations from "@/components/home/Destinations";
import Universities from "@/components/home/Universities";
import Services from "@/components/home/Services";
import Accreditations from "@/components/home/Accreditations";
import Testimonials from "@/components/home/Testimonials";
import RecentBlogs from "@/components/home/RecentBlogs";
import ContactSection from "@/components/home/ContactSection";

export default function HomePage() {
  return (
    <main style={{ backgroundColor: "#ffffff", overflowX: "hidden" }}>
      <HeroSection />
      <GujaratSeoSection />
      <AboutSnippet />
      <Destinations />
      <Universities />
      <Services />
      <Accreditations />
      <Testimonials />
      <RecentBlogs />
      <ContactSection />
    </main>
  );
}