"use client";

import {DropdownMenuContentProps} from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import {Link2, Pencil, Trash2} from "lucide-react";
import {toast} from "sonner";
import {useApiMutation} from "@/hooks/use-api-mutation";
import {api} from "@/convex/_generated/api";
import {Button} from "./ui/button";
import ConfirmDialoge from "./confirm-model";
import {useRenameModel} from "@/store/rename-model";

interface ActionsProps {
  children: React.ReactNode;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
  id: string;
  title: string;
}

const Actions = ({children, side, sideOffset, id, title}: ActionsProps) => {
  const {mutate,pending}=useApiMutation(api.boards.deleteCard);
  const {onOpen}=useRenameModel();
  const onCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/card/${id}`
      );
      toast(`copied successfully`);
    } catch (error) {
      toast(`failed Copy : ${error}`);
    }
  };

  const onDelete = async () => {
    try {
      console.log(id);
      await mutate({id});
      toast("deleted successfully!");
    } catch (error) {
      console.log(error);

      toast("not deleted ");
    }
  };

  
  return (
    <DropdownMenu>
      
      <DropdownMenuTrigger asChild>
        {children}

      </DropdownMenuTrigger>

      <DropdownMenuContent
        side={side}
        sideOffset={sideOffset}
        className=" cursor-pointer outline-none"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <DropdownMenuItem onClick={onCopyLink} className=" ">
          <Link2 className="mr-2 " />
          Copy Link to clipboard
        </DropdownMenuItem>

        <ConfirmDialoge
          title="Delete board"
          description="are you sure want to delete"
          onClick={onDelete}
				  disabled={pending}
				
        >
          <Button variant='ghost' className="p-2 cursor-pointer font-normal w-full  justify-start">
            <Trash2 className="mr-2 " />
            Delete
          </Button>
        </ConfirmDialoge>

        <DropdownMenuItem onClick={()=>onOpen(id,title)} className=" ">
          <Pencil className="mr-2 " />
          Rename
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Actions;
