"use client";

import React, {useState} from "react";
import {Participents} from "./participants";
import {Toolbar} from "./toolbar";
import {useSelf} from "@/liveblocks.config";
import {Info} from "./info";
import {useQuery} from "convex/react";
import {api} from "@/convex/_generated/api";
import {Id} from "@/convex/_generated/dataModel";
import {CanvasMode, CanvasState} from "@/type/canvas";

interface CanvasProps {
  boardId: string;
}
const Canvas = ({boardId}: CanvasProps) => {
  console.log(boardId);

  const liveblocksData=useSelf(me => me.info);

  console.log(liveblocksData);
 
  const [canvasState,setCanvasState]=useState<CanvasState>({
    mode:CanvasMode.None,
  });
  return (
    <main className="w-full h-full relative bg-neutral-200 touch-none">
      <Info boardId={boardId}/>
      <Participents />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        redo={()=>{}}
        undo={() => { }}
        canRedo={false}
        canUndo={false}
        
      />
    </main>
  );
};

export default Canvas;
