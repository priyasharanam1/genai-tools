'use client'
import Link from "next/link";
import React, { useState } from "react";
import { LuSearch, LuCommand } from "react-icons/lu";
import { useAuth } from "../../context/AuthContext";
import MyAccount from "./MyAccount";
import BookDemoModel from "../Model/BookDemoModel";

const Navbar = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="">
        <nav className="fixed z-50 flex items-center justify-between w-full px-5 py-4 space-x-8 bg-white shadow-md md:px-16 shadow-b ">
        <Link href="/" className="flex items-center justify-center space-x-2 font-semibold "><img src="/images/Debales_Logo.png" height="40px" width="30px" /> <p>DEBALES</p></Link>
        <ul className=" flex mx-8 gap-x-6 text-[#475467] font-medium max-md:hidden">
          <li>
            <a>About</a>
          </li>
          <li>
            <a href="/#tools">AI Tools</a>
          </li>
          <li>
            <a href="https://debales.ai/contactUs">Contact</a>
          </li>
        </ul>
        <div className="relative max-lg:hidden ">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <LuSearch
              style={{ fontSize: "24px", fontWeight: "bolder" }}
              className="w-5 h-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
          <input
            placeholder="Search for a product..."
            className="pl-10 pr-12 py-2 w-[460px]  border-2 rounded-full border-[#D0D0D0] text-[#A1A1A1] placeholder-gray-400 focus:outline-none bg-[#FAFAFA] focus:border-blue-500"
          />
          <span className="absolute inset-y-0 right-0 flex items-center pr-3">
            <LuCommand className="w-5 h-5 text-gray-400" aria-hidden="true" />
            <span className="font-semibold text-gray-400">K</span>
          </span>
        </div>
        <div className="flex">
        <div className="  mx-5 text-[#98A2B3] font-medium">
        {user ? (
            <MyAccount />
          ) : (
            <Link href="/login" className="flex items-center mt-2 btn-ctc">
              Log In
            </Link>
          )}
        </div>
        <button onClick={() => setIsOpen(true)} className="font-medium bg-[#FFC40C] border-1 border-[#EBB200] px-4 py-2 rounded-full shadow-md">Get Started</button>
        </div>
      </nav>
      <BookDemoModel isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
      
  );
};

export default Navbar;
