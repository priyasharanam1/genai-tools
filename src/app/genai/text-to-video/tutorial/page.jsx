import React from "react";
import Navbar from "../../../components/Navbar";
import Hero from "../../../components/Hero";
import BeImage from "../../../components/BeImage";
import StunningVideos from "../../../components/StunningVideos";
import NewStyle from "../../../components/NewStyle";
import Discover from "../../../components/Discover";
import Footer from "../../../components/Footer";
import FAQ from "../../../components/FAQ";

const Tut1 = () => {
  return (
    <div>
      <Navbar />
      <Hero
        heading="Turn Ideas into Cinematic Adventures: Explore Text-to-Video Magic with AI!"
        subheading="Unlock Your Creative Potential: Our platform empowers you to turn your ideas into captivating visual artwork effortlessly."
        buttonText="Give it a try"
        testlink="/genai/text-to-video"
        tutoriallink="/genai/text-to-video/tutorial/#tutorial"
        imageUrl="/images/texttovideo/hero.png"
      />
      <BeImage toolcategory="Video Generator!"/>
      <StunningVideos      />
      <div id="steps">
        <NewStyle
          images={[
            "/images/texttovideo/step-1.png",
            "/images/texttovideo/step-2.png",
            "/images/texttovideo/step-3.png",
          ]}
          headings={[
            "Enter Your Prompt",
            "Review and Refine",
            "Download the video",
          ]}
          descriptions={[
            "Start with prompting. Submit a text prompt for the video",
            "Evaluate the generated video and refine your prompt if needed",
            "Wait for magic to happen. A video would be generated matching the requested specifications.",
          ]}
          testlink="/genai/text-to-video"
          tutoriallink="/genai/text-to-video/tutorial/#tutorial"
          toolcategory="Image Generator"
        />
      </div>

      <FAQ title="Video Generator" />
      <Discover  />
      <Footer />
    </div>
  );
};

export default Tut1;
