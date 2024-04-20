
import React from "react";

export const Info = () => {
  return (
    <div className="absolute top-2 left-2 h-10 flex items-center px-1.5 bg-white rounded-sm shadow-md ">
      Info about the board
    </div>
  );
};

Info.Skeleton = () => {
  return (
    <div className="absolute top-2 left-2 h-10 flex items-center px-1.5 bg-white rounded-sm shadow-md w-[300px]" />
  );
};
