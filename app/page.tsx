import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Beyond } from "@/components/sections/Beyond";
import { HowIWork } from "@/components/sections/HowIWork";
import { Projects } from "@/components/sections/Projects";

export default function Home() {
  return (
    <main>
      <Hero />
      <Experience />
      <Projects />
      <HowIWork />
      <Beyond />
      <Contact />
    </main>
  );
}
