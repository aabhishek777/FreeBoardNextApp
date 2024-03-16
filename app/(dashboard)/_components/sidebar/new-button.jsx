"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

import {UserPlus} from "lucide-react";
import JoinedOrganizationList from "./org-list";

import {CreateOrganization} from "@clerk/nextjs";

const NewButton = () => {
  return (
    <>
      <div style={{fontSize:'10px',backgroundColor:'red !important'}} className="uppercase">
        <JoinedOrganizationList />
      </div>
      <Dialog>
        <DialogTrigger asChild>
         
          <button
            className="h-10 w-10 rounded flex items-center justify-center bg-black opacity-60 hover:opacity-100"
          >
            <UserPlus color="white"   /> 
          </button>
        </DialogTrigger>
        <DialogContent className="p-0 border-none sm:max-w-[425px]">
          <CreateOrganization />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewButton;
