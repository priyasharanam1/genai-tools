'use client'
import React from "react";
import { MdArrowOutward } from "react-icons/md";
import { images, steps, descriptions,tags,links } from "./Discover_helper";
import Link from "next/link";
const Discover = () => {
  return (
    <div id="tools" className="px-5 mt-20" >
      <div className="flex flex-col items-center m-auto">
        <div className="font-semibold text-[2rem] tracking-tight max-w-[480px] text-center ">
          Discover more exciting tools worth exploring!
        </div>
        <div className="grid justify-center gap-8 mt-12 sm:grid-cols-2 lg:grid-cols-3 mb-28">
          {images.map((img, index) => (
            <Link href={links[index]} key={index} className="flex flex-col max-w-[360px] gap-1 justify-between group">
              <div>
              <img
                src={img}
                className="rounded-tl-xl rounded-tr-xl w-[360px] group-hover:scale-105 transition-transform duration-200 ease-in-out "
              />
              <span className="font-semibold text-[20px] text-[#101828] mt-4 flex justify-between">
                {steps[index]}  <div className="transition-transform duration-200 ease-in-out group-hover:rotate-45"><MdArrowOutward /></div>
              </span>
              <p className="text-[16px] text-[#475467]">
                {descriptions[index]}
              </p>
              </div>
              <div className="flex gap-3 mt-2 ">
                {tags[index].map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-[14px]  font-medium rounded-full border-2 border-opacity-10 bg-white bg-opacity-5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Discover;
