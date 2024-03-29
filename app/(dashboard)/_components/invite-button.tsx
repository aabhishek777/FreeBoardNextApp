import React from "react";
import {Button} from "@/components/ui/button";
import {OrganizationProfile} from "@clerk/nextjs";
import {Plus} from "lucide-react";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import {Hint} from "@/components/hint";

const InviteButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Hint label="Invite Members" side="left" align="center" sideOffset={5}>
          <Button variant="outline">
            <Plus />
            Invite
          </Button>
        </Hint>
      </DialogTrigger>
      <DialogContent className="p-0 border-none w-full ">
        <OrganizationProfile />
      </DialogContent>
    </Dialog>
  );
};

export default InviteButton;
