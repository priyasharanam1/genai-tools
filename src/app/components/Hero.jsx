'use client'
import React from "react";

const Hero = ({heading,subheading,buttonText,testlink,tutoriallink,imageUrl}) => {
  return (
    <div className="bg-[#F4F4F1] flex max-md:flex-col gap-10  max-md:items-center md:justify-around pb-20 pt-28 md:pt-40">
      <div className="md:max-w-[420px] px-10 max-md:text-center">
        <div className="font-semibold text-[2rem] tracking-tight">
          {heading}
        </div>
        <div className="text-[#667085] mt-4">
          {subheading}
        </div>
        <div className="mt-6">
          <a href= {testlink} className="font-medium bg-[#FFC40C] border-1 border-[#EBB200] px-4 py-2 rounded-full shadow-md">
            {buttonText}
          </a>
          <a href={tutoriallink} className="mx-6 text-[#667085] font-medium">Watch Tutorial</a>
        </div>
      </div>
      <div className="px-10">
        <img src={imageUrl} width='524px' height='440px'/>
      </div>
    </div>
  );
};

export default Hero;
