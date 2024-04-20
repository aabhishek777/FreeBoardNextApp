import {Skeleton} from "@/components/ui/skeleton";
import React from "react";

export const Participents = () => {
  return (
    <div className="absolute top-2 right-2 h-10 flex items-center px-1.5 bg-white rounded-sm shadow-md ">
      Participents!
    </div>
  );
};

Participents.Skeleton = () => {
  return (
    <div className="absolute top-2 right-2 h-10 flex items-center px-1.5 bg-white rounded-sm shadow-md w-[300px]" />
  );
};
