import {Skeleton} from "@/components/ui/skeleton";
import React from "react";
import {ToolButton} from "./tool-button";
import {
  Circle,
  MousePointer2,
  Pencil,
  Redo2,
  Square,
  StickyNote,
  Type,
  Undo2
} from "lucide-react";
import {CanvasState} from "@/type/canvas";




interface ToolbarProps{

  canvasState: CanvasState;
  setCanvasState: (newState: CanvasState) => void;
  redo: () => void;
  undo: () => void;
  canRedo: boolean;
  canUndo: boolean;
}


export const Toolbar=({
  canvasState,
  setCanvasState,
  redo,
  undo,
  canRedo,
  canUndo,
}:ToolbarProps) => {
  return (
    <div className="absolute top-[50%] -translate-y-[50%] left-2 h-auto flex flex-col  px-1.5 gap-y-2   ">
      <div className="flex flex-col bg-white rounded-sm shadow-md p-1.5 gap-y-1">
      <ToolButton
          label="select"
          isActive={false}
          isDiabled={false}
          onClick={() => {console.log('clicked') }}
          icon={MousePointer2}
        />
        <ToolButton
          label="type"
          isActive={false}
          isDiabled={false}
          onClick={() => {console.log('clicked') }}
          icon={Type}
        />
        <ToolButton
          label="sticky notes"
          isActive={false}
          isDiabled={false}
          onClick={() => {console.log('clicked') }}
          icon={StickyNote}
        />
        <ToolButton
          label="rectangle"
          isActive={false}
          isDiabled={false}
          onClick={() => {console.log('clicked') }}
          icon={Square}
        />
        <ToolButton
          label="ellips"
          isActive={false}
          isDiabled={false}
          onClick={() => {console.log('clicked') }}
          icon={Circle}
        />
        <ToolButton
          label="pen"
          isActive={false}
          isDiabled={false}
          onClick={() => {console.log('clicked') }}
          icon={Pencil}
        />
      </div>

      <div className="flex flex-col bg-white rounded-sm shadow-md p-1.5 gap-y-1">
      <ToolButton
          label="redo"
          isActive={false}
          isDiabled={false}
          onClick={() => {console.log('clicked') }}
          icon={Redo2}
        />
         <ToolButton
          label="undo"
          isActive={false}
          isDiabled={false}
          onClick={() => {console.log('clicked') }}
          icon={Undo2}
        />
      </div>
    </div>
  );
};

Toolbar.Skeleton = () => {
  return (
    <div className="absolute top-[50%] -translate-y-[50%] left-2 h-[256px] flex flex-col  px-1.5 gap-y-2 w-[56px] rounded-sm  bg-white  "/>
		
  );
};
