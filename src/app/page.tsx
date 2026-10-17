import FeaturedProjects from "@/components/FeaturedProjects";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Process from "@/components/Process";
import Projects from "@/components/Projects";
import Services from "@/components/Services";


export default function Home() {
  return (
    <div>
      <Hero/>
      <Intro/>
      <Projects/>
      <FeaturedProjects/>
      <Services/>
      <Process/>
    </div>
  );
}
