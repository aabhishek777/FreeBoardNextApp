import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

interface ConfirmDialogeInterface {
  children: React.ReactNode;
  title: string;
  description?: string;
	onClick: () => void;
	disabled: boolean;
}
const ConfirmDialoge = ({
  children,
  title,
  description,
	onClick,
	disabled
}: ConfirmDialogeInterface) => {
  return (
    <AlertDialog >
      <AlertDialogTrigger>{children}</AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogTitle>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogTitle>
        <AlertDialogFooter>
          <AlertDialogCancel>cancel</AlertDialogCancel>
          <AlertDialogAction disabled={disabled} onClick={onClick}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmDialoge;
