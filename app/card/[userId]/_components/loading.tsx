import {Loader2Icon} from "lucide-react";
import React from "react";
import {Info} from "./info";
import {Participents} from "./participants";
import {Toolbar} from "./toolbar";

const Loading = () => {
  return (
    <main className="w-full h-full relative bg-neutral-200 touch-none flex items-center justify-center">
      <Loader2Icon className="w-12 h-12 text-muted-foreground animate-spin" />
      <Info.Skeleton />
      <Participents.Skeleton />
      <Toolbar.Skeleton />
    </main>
  );
};

export default Loading;
