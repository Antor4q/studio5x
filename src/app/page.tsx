
import CTA from "@/components/CTA";
import FounderQuote from "@/components/Founderquote";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
;
import Process from "@/components/Process";
import Projects from "@/components/Projects";
import Services from "@/components/Services";



export default function Home() {
  return (
    <div>
      <Hero/>
      <Intro/>
      <Projects/>
     
      <Services/>
      <Process/>
      <FounderQuote/>
     
     <CTA/>
  
    </div>
  );
}
