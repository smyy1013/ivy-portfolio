import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Beyond } from "@/components/sections/Beyond";
import { HowIWork } from "@/components/sections/HowIWork";
import { Projects } from "@/components/sections/Projects";

export default function Home() {
  return (
    <main>
      <Hero />
      <Projects />
      <HowIWork />
      <Beyond />
      <Contact />
    </main>
  );
}
