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

import {Plus} from "lucide-react";
import JoinedOrganizationList from "./org-list";

import {CreateOrganization} from "@clerk/nextjs";
import {Hint} from "@/components/hint";

const NewButton = () => {
  return (
    <>
     
      <div  className="uppercase">
        <JoinedOrganizationList />
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Hint label="Add Orgnazation"
            side="right"
            align="center"
            sideOffset={5}
          >
          <button
            className="h-10 w-10 rounded flex items-center justify-center border opacity-60 hover:opacity-100"
          >
            <Plus className="w-10 h-10" color="white"  />
          
          </button>
         </Hint>
        </DialogTrigger>
        <DialogContent className="p-0 border-none sm:max-w-[425px]">
          <CreateOrganization />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewButton;
