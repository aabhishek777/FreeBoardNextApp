"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {useRenameModel} from "@/store/rename-model";
import {Input} from "../ui/input";
import {FormEventHandler, useEffect, useState} from "react";
import {Button} from "../ui/button";
import {toast} from "sonner";
import {useApiMutation} from "@/hooks/use-api-mutation";
import {api} from "@/convex/_generated/api";
import {Loading} from "../auth/loading";

export const RenameModel = () => {
  const {mutate, pending} = useApiMutation(api.boards.updateCard);
  const {isOpen, onClose, initialValues} = useRenameModel();

  const [title, setTitle] = useState(initialValues.title);

  useEffect(() => {
    setTitle(initialValues.title);
  }, [initialValues.title]);

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    console.log("Form submitted");
    try {
      await mutate({id: initialValues.id, title});
      toast("Updated successfully!");
      onClose();
    } catch (error) {
      toast(`Error while updating: ${error}`);
    }
  };

  if (pending) {
    return <Loading />;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Board Name</DialogTitle>
        </DialogHeader>
        <DialogDescription>Enter New Title</DialogDescription>
        <form onSubmit={onSubmit}>
          <Input
            required
            placeholder="Enter new title"
            maxLength={60}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <DialogFooter className="mt-5">
            <Button
              className="mr-3"
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
