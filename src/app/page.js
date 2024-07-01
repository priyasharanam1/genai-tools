'use client'
import Navbar from "./components/Navbar";
import NavbarDark from "./components/NavbarDark";
import Hero from "./components/homepage/Hero";
import Discover from "./components/homepage/Discover";
import Innovation from "./components/homepage/Innovation";
import Features from "./components/homepage/Features";
import Footer from "./components/Footer";
import ContactForm from "./components/homepage/ContactForm";
import FAQ from "./components/homepage/FAQ";
import { useEffect, useState } from "react";
 
export default function Home() {

  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    window.addEventListener('scroll', function() {
      let scrollPosition = window.scrollY;
      let sectionPosition = document.getElementById('dark')?.offsetTop;
      if (sectionPosition && scrollPosition >= sectionPosition-80) {
        setDarkMode(true);
      } else {
        setDarkMode(false);
      }
    })
  }, []);

  return (
    <div className="">
      <div className="transition-all duration-500 ease-linear">
      {darkMode ? <NavbarDark /> : <Navbar />}
      </div>
      
      <Hero />
      <div id="dark"></div>
      <Discover  />
      <Innovation/>
      <Features indices={["01", "02", "03", "04", "05", "06", "07", "08"]}
        features={[
          "Enhanced Learning Materials",
          "Multisensory Learning",
          "Interactive Presentations",
          "Creative Expression",
          "Accessible Resources",
          "Language Learning",
          "Assistive Technology",
          "Real-World Applications"
        ]}
          descriptions={[
            "AI-powered text to image and text to video tools can transform textual content into visually engaging materials.",
            "Text to audio tools allow students to listen to course materials, providing an alternative mode of learning for auditory learners.",
            "With image to image and text to video capabilities, students can create interactive presentations that captivate audiences and effectively communicate ideas.",
            "AI tools empower students to express their creativity through image manipulation and storytelling.",
            "Text to audio tools make educational resources accessible to students with visual impairments or learning disabilities.",
            "text to audio and text to AI avatar tools facilitate language learning by providing pronunciation guidance and conversational practice.",
            "AI tools serve as assistive technology for students with learning difficulties or language barriers.",
            "By using AI tools to create multimedia content, students develop valuable skills relevant to the digital age.",
          ]}
        />
        <FAQ />
        <ContactForm/>
        <Footer/>
    </div>
  );
}