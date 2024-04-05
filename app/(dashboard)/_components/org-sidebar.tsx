"use client"

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {cn} from "@/lib/utils";

import {Poppins} from "next/font/google";
import {OrganizationSwitcher} from "@clerk/nextjs";
import {Button} from "@/components/ui/button";
import {LayoutDashboard, Star} from "lucide-react";
import { useSearchParams} from "next/navigation";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const OrgSidebar = () => {

  const searchParams = useSearchParams();

  const favorite = searchParams.get("favorite")
 
  return (
    <div className="">
      <Link href="/">
        <div className="flex items-center ">
          <Image
            style={{marginRight: ""}}
            alt="logo.svg"
            src="/logo.png"
            width={35}
            height={35}
            className="m-3"
          />
          <span
            style={{
              fontSize: "1.5rem",
            }}
            className={cn("font-bold  text-2xl", font.className)}
          >
            Board
          </span>
        </div>
      </Link>

            
      <br />
      <OrganizationSwitcher
        hidePersonal
        appearance={{
          elements: {
            rootBox: {
              display: "flex",
               width:'full',
              justifyContent: "center",
            },
            organizationSwitcherTrigger: {
              padding: "6px",
              border: "1.5px solid #E5E7EB",
              borderRadius: "9px",
            },
          },
        }}
      />

      <br />

      <div className="w-full">
        <Button
          variant={favorite ? "ghost" : "secondary"}
          asChild
          size="lg"
          className="font-normal w-full justify-start px-2 border"
        >
          <Link className="flex justify-center " href="/">
            <LayoutDashboard className="w-6 h-6 " />
            <span style={{marginLeft: "1rem"}} className="">
              Team Boards
            </span>
          </Link>
        </Button>

        <br />
        <br />

        <Button
          variant={favorite ?  "secondary" : "ghost"}
          asChild
          size="lg"
          className="font-normal w-full justify-start px-2 border"
        >
          <Link
            className="flex justify-center "
            href={{
              pathname: "/",
              query: {favorite: true},
            }}
          >
            <Star className="w-6 h-6 " />
            <span style={{marginLeft: "1rem"}} className="">
              Favorite Boards
            </span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default OrgSidebar;

const ButtonOrg = () => {
  return (
    <Button
      variant="ghost"
      asChild
      size="lg"
      className="font-normal w-full justify-start px-2 border"
    >
      <Link
        className="flex justify-center "
        href={{
          pathname: "/",
          query: {favorite: true},
        }}
      >
        <Star className="w-6 h-6 " />
        <span style={{marginLeft: "1rem"}} className="">
          Favorite Boards
        </span>
      </Link>
    </Button>
  );
};
