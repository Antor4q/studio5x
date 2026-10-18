
import BeforeAfter from "@/components/Beforeafter";
import FounderQuote from "@/components/Founderquote";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Marquee from "@/components/Marquee";
import Process from "@/components/Process";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";


export default function Home() {
  return (
    <div>
      <Hero/>
      <Intro/>
      <Projects/>
     
      <Services/>
      <Process/>
      <FounderQuote/>
      <Marquee/>
      <BeforeAfter/>
      <Testimonials/>
    </div>
  );
}
