import React from "react";
import Image from "next/image";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {CreateOrganization} from "@clerk/nextjs";
import {Plus} from "lucide-react";
const EmptyDashboard = () => {
  return (
    <div className=" flex h-full justify-center items-center flex-col">
      <Image
        width={450}
        height={450}
        src="empty-dashboard.svg"
        alt="empty-dashboard"
      />
      <h2 className=" font-semibold  text-2xl mt-6">Welcome to the Board</h2>
      <p className=" text-muted-foreground mt-5 mb-5">
        Create Organization to get started!
		  </p>
		  
		  <Dialog >
			  <DialogTrigger>
				  <Button>
					  <Plus className="mr-2"/>
					  Add Orginzation
				  </Button>
			  </DialogTrigger>
			  <DialogContent className="p-0">
				  <CreateOrganization/>
			  </DialogContent>
		  </Dialog>
    </div>
  );
};

export default EmptyDashboard;
