'use client'
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="bg-[#F4F4F1] pb-24">
      <div className="flex pb-12 pt-32 flex-col m-auto items-center px-5 max-w-[600px]">
        <div className="font-semibold text-[2rem] tracking-tight text-center ">
          Unlock the Potential: Explore the Boundless World of AI Tools
        </div>
        <div className="text-[#667085] text-center mt-2">
          Unlock the potential of AI with our power AI tools. Find the perfect
          solution for your project and explore the possibilities.
        </div>
      </div>
      <div className="flex items-center justify-center mb-16 px-auto">
        <Link href="/#tools" className="font-medium bg-[#FFC40C] border-1 border-[#EBB200] px-4 py-2 rounded-full shadow-md">
          Give it a try
        </Link>
        <a href="/genai/image-style-mixer/tutorial#tutorial" className="mx-6 text-[#667085] font-medium">Watch Tutorial</a>
      </div>
      <div className="flex items-center justify-center mx-16">
        <img src="/images/header-image.png" alt="hero"  className="w-full "/>
      </div>
      </div>
  );
};

export default Hero;
