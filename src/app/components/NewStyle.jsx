'use client'
import Link from "next/link";
import React from "react";

const NewStyle = ({
  images,
  headings,
  descriptions,
  testlink,
  tutoriallink,
  toolcategory,
}) => {
  return (
    <div className="mt-20">
      <div className="flex flex-col items-center px-5 m-auto ">
        <div className="font-semibold text-[2rem] tracking-tight max-w-[480px] text-center ">
          Learn how AI transforms images to match a different style.
        </div>

        {toolcategory === "Image Style Mixer" && (
          <div className="flex gap-3 mt-8 max-sm:flex-col">
            {images.map((img, index) => (
              <div key={index} className="flex flex-col max-w-[380px] gap-1">
                <img src={img} width="360px" height="360px" />
                <h1 className="font-semibold text-[20px]"> STEP {index + 1}</h1>
                <h3 className="font-medium text-[20px]">{headings[index]}</h3>
                <p className="text-[16px] text-[#141718]">
                  {descriptions[index]}
                </p>
              </div>
            ))}
          </div>
        )}

        {toolcategory === "Image to 3D Video" && (
          <div className="flex gap-6 mt-8 max-sm:flex-col">
            {images.map((img, index) => (
              <div key={index} className="flex flex-col max-w-[340px] p-6 gap-4 bg-[#F4F4F4] rounded-lg">
              <h1 className="font-medium text-[50px]" style={{letterSpacing :'-0.12em'}}> 0 {index + 1}</h1>
                
                <h3 className="font-medium text-[20px]">{headings[index]}</h3>
                <p className="text-[16px] text-[#333a48]">
                  {descriptions[index]}
                </p>
                <img src={img} width="290px" height="340px" className="py-1 rounded-xl"/>
              </div>
            ))}
          </div>
        )}
        {toolcategory === "Image Generator" && (
          <div className="flex gap-3 mt-8 max-sm:flex-col">
            {images.map((img, index) => (
              <div key={index} className="flex flex-col max-w-[380px] items-center">
    
                <img src={img} width="360px" height="360px" />
                <h1 className="font-semibold text-[20px] "> STEP {index + 1}</h1>
                <h3 className="font-medium text-[20px] ">{headings[index]}</h3>
                <p className="text-[16px] text-[#141718] text-center">
                  {descriptions[index]}
                </p>
              </div>
            ))}
          </div>
        )}
        <div className="mt-14">
          <Link
            href={testlink}
            className="font-medium bg-[#FFC40C] border-1 border-[#EBB200] px-4 py-2 rounded-full shadow-md"
          >
            Give it a try
          </Link>
          <a href={tutoriallink} className="mx-6 text-[#667085] font-medium">
            Watch Tutorial
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewStyle;
