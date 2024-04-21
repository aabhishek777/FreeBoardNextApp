"use client";

import React from "react";
import {Participents} from "./participants";
import {Toolbar} from "./toolbar";
import {useSelf} from "@/liveblocks.config";
import {Info} from "./info";
import {useQuery} from "convex/react";
import {api} from "@/convex/_generated/api";
import {Id} from "@/convex/_generated/dataModel";

interface CanvasProps {
  boardId: string;
}
const Canvas = ({boardId}: CanvasProps) => {
  console.log(boardId);

  const liveblocksData=useSelf(me => me.info);

  console.log(liveblocksData);
 
  return (
    <main className="w-full h-full relative bg-neutral-200 touch-none">
      <Info boardId={boardId}/>
      <Participents />
      <Toolbar />
    </main>
  );
};

export default Canvas;
