"use client";
import {Button} from "@/components/ui/button";
import {
  OrganizationSwitcher,
  UserButton,
  UserProfile,
  useOrganization,
} from "@clerk/nextjs";
import {Search} from "lucide-react";
import React, {useState} from "react";
import InviteButton from "./invite-button";
import SearchInput from "./search-input";

const Navbar = () => {
  const {organization} = useOrganization();

  const [click, setClick] = useState(false);
  const k = () => {
    setClick(true);
  };
  return (
    <div className=" p-3 mt-3 flex sm:justify-evenly items-center gap-3">
      <SearchInput />

      <div className="block flex-1 md:hidden w-auto">
        <OrganizationSwitcher
          hidePersonal
          appearance={{
            elements: {
              rootBox: {
                display: "flex",

                justifyContent: "center",
              },
              organizationSwitcherTrigger: {
                padding: "4px",
                border: "1px solid #E5E7EB",
                borderRadius: "8px",
              },
            },
          }}
        />
      </div>

      {organization && <InviteButton />}

      <div className="">
        <UserButton />
      </div>

      {click && <UserProfile />}
    </div>
  );
};

export default Navbar;
