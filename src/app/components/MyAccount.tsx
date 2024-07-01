"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useRouter } from "next/navigation";
import { MdOutlineLogout } from "react-icons/md";
import { useAuth } from "../../context/AuthContext";
import Image from "next/image";
function MyAccount() {
  const { logout, user } = useAuth();
  const router = useRouter();

  const handleLogout = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    await logout();
    router.replace("/");
    router.refresh();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <Avatar>
          <AvatarImage src={user?.photoURL ?? "/user.png"} alt="User" asChild>
            <Image
              src={user?.photoURL as string}
              alt="User"
              width={32}
              height={32}
            ></Image>
          </AvatarImage>

          <AvatarFallback>
            {user?.displayName?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2 w-68" side="bottom" align="end">
        <DropdownMenuLabel className="flex flex-col items-start justify-center ">
          <span className="text-sm font-semibold">{user?.displayName}</span>
          <span className="text-sm text-gray-500">{user?.email}</span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <button className="w-full cursor-pointer" onClick={handleLogout}>
            <MdOutlineLogout className="w-4 h-4 mr-2" />
            <span>Log out</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default MyAccount;
