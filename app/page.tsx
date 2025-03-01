import HeroSection from "@/components/HeroSection";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact"
import ChatBot from "@/components/ChatBot"

export default function Home() {

  return (
    <div className="min-h-screen w-full text-white bg-gray-950">
      <HeroSection />
      <About />
      <Skills />
      <Contact />
      <ChatBot />
    </div>
  );
}
