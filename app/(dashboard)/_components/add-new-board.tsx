"use client";

import {api} from "@/convex/_generated/api";
import {useApiMutation} from "@/hooks/use-api-mutation";
import {cn} from "@/lib/utils";
import {useOrganization} from "@clerk/nextjs";
import {useQuery} from "convex/react";
import {Plus} from "lucide-react";
import {useRouter} from "next/navigation";
import React from "react";
import {toast} from "sonner";

interface AddNewBoardButtonInterface {
  disabled?: boolean;
  orgId: string;
}

const AddNewBoardButton = ({disabled, orgId}: AddNewBoardButtonInterface) => {
  const router = useRouter();
  const {organization} = useOrganization();
  const {mutate, pending} = useApiMutation(api.boards.create);

  console.log(organization);
  
  const buttonOnClick = async () => {
    try {
      await mutate({
        title: "undefined",
        orgId,
      });
      // await useQuery()
      toast("Orgnization created success");
      router.push(`/card/${organization?.id}`);
    } catch (error) {
      toast(`error:${error}`);
    }
  };
  return (
    <button
      onClick={buttonOnClick}
      disabled={disabled}
      className={cn(
        "col-span-1 bg-blue-600 hover:opacity-100 opacity-75 flex flex-col justify-center items-center rounded-md text-white ",
        pending || (disabled && "opacity-50 bg-blue-600 cursor-not-allowed")
      )}
    >
      <Plus className="h-10 w-10 text-white" />
      <p className="text-sm ">Add new Orgnization</p>
    </button>
  );
};

export default AddNewBoardButton;
