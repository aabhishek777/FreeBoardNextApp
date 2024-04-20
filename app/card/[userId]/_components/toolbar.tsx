import {Skeleton} from "@/components/ui/skeleton";
import React from "react";

export const Toolbar = () => {
  return (
    <div className="absolute top-[50%] -translate-y-[50%] left-2 h-auto flex flex-col  px-1.5 gap-y-2   ">
      <div className="flex flex-col bg-white rounded-sm shadow-md p-1.5 gap-y-1">
        <div>hi</div>
        <div>hi</div>
      </div>

      <div className="flex flex-col bg-white rounded-sm shadow-md p-1.5 gap-y-1">
        <div>undo</div>
        <div>redo</div>
      </div>
    </div>
  );
};

Toolbar.Skeleton = () => {
  return (
    <div className="absolute top-[50%] -translate-y-[50%] left-2 h-[256px] flex flex-col  px-1.5 gap-y-2 w-[56px] rounded-sm  bg-white  "/>
		
  );
};
