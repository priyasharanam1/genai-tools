'use client'
import React from "react";

function Features({ indices, features, descriptions }) {
  return (
    <div className="bg-[#18181B] pb-12 px-5 md:px-36">
      <div className="flex py-16 flex-col m-auto items-center max-w-[600px]">
        <div className="font-semibold text-[#F2F2F2] text-[2rem] tracking-tight text-center">
          Features
        </div>
        <div className="mt-2 text-center text-white text-opacity-70">
          Unlock the Power of AI-Assisted Learning
        </div>
      </div>
      <div className="grid gap-10 mt-4 md:grid-cols-2 justify-items-center xl:grid-cols-4">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col gap-1 w-[250px]">
            <h1 className="tracking-wide text-[#F2F2F2] py-4">{indices[index]}</h1>
            <h3 className="text-[#F2F2F2]">{feature}</h3>
            <p className="text-white text-opacity-50">{descriptions[index]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Features;
