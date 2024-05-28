import React from "react";
import Image from "next/image";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {useOrganization} from "@clerk/nextjs";
import {api} from "@/convex/_generated/api";
import {useApiMutation} from "@/hooks/use-api-mutation";
import { toast} from "sonner";
import {useRouter} from "next/navigation";

const EmptyBoard=() => {
  const router=useRouter();
  const {organization} = useOrganization();
  const {mutate, pending} = useApiMutation(api.boards.create);
 
  console.log(organization?.id);

  
  const addButtonClick = async () => {
    if (!organization) return;

    try {
      await mutate({
        title: "untited",
        orgId: organization.id,
      });

      toast("Created Successfully!");
      router.push(`/card/${organization?.id}`)
    } catch (error) {
      toast(`error ${error}`);
      console.log(error);
    }
   
  };

  
  return (
    <div className=" flex h-full justify-center items-center flex-col">
      <Image
        width={450}
        height={450}
        src="empty-board.svg"
        alt="empty-dashboard"
      />
      <h2 className=" font-semibold  text-2xl mt-6">
        Create your first board!
      </h2>
      <p className=" text-muted-foreground mt-5 mb-5">
        Get Started! by creating your organization
      </p>

      <Button disabled={pending} onClick={addButtonClick}>
        <Plus className="mr-2" />
        Add Board
      </Button>
    </div>
  );
};

export default EmptyBoard;
