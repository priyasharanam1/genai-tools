'use client'
import React from "react";
import { FaFacebook, FaLinkedin, FaYoutube, FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import Link from "next/link";
 
const Footer = () => {
  return (
    <div className="pt-4 bg-black">
      <div>
        <div className="flex items-center justify-between gap-5 pt-8 pb-8 mx-12 max-md:flex-col">
          <Link href="/"><img src="/images/Logo (1).png" height="40px" width="110px" /></Link>
          <ul className="flex  mb-2 gap-6 text-[#CAECF1] font-medium">
            <li>
              <a>About</a>
            </li>
            <li>
              <a>Courses</a>
            </li>
            <li>
              <a href="/#tools">AI Tools</a>
            </li>
            <li>
              <a href="https://debales.ai/contactUs">Contact</a>
            </li>
          </ul>
          <ul className="flex mt-2 gap-6 text-[#CAECF1] font-medium">
            <li>
              <a>
                <FaFacebook />
              </a>
            </li>
            <li>
              <a>
                <FaInstagram />
              </a>
            </li>
            <li>
              <a>
                <BsTwitterX />
              </a>
            </li>
            <li>
              <a href="https://in.linkedin.com/company/debales-ai">
                <FaLinkedin />
              </a>
            </li>
            <li>
              <a>
                <FaYoutube />
              </a>
            </li>
          </ul>
        </div>
        <div className="mx-auto w-[94%] my-6" style={{border:'1px solid #98A2B3'}}></div>
        <div className="flex justify-between mx-12 pt-8 pb-8 items-center text-[#CAECF1] mt-6">
          <p>&copy;2024 Debales</p>
          <div>
            <a href="https://debales.ai/privacy-policy" className="mr-1">Privacy Policy</a>
            <span className="mx-1">|</span>
            <a href="https://debales.ai/terms-of-service" className="ml-1">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default Footer;