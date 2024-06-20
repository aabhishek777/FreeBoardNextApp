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
  Undo2,
} from "lucide-react";
import {CanvasMode, CanvasState, LayerTypes} from "@/type/canvas";

interface ToolbarProps {
  canvasState: CanvasState;
  setCanvasState: (newState: CanvasState) => void;
  redo: () => void;
  undo: () => void;
  canRedo: boolean;
  canUndo: boolean;
}

export const Toolbar = ({
  canvasState,
  setCanvasState,
  redo,
  undo,
  canRedo,
  canUndo,
}: ToolbarProps) => {
  return (
    <div className="absolute top-[50%] -translate-y-[50%] left-2 h-auto flex flex-col  px-1.5 gap-y-2   ">
      <div className="flex flex-col bg-white rounded-sm shadow-md p-1.5 gap-y-1">
        <ToolButton
          label="select"
          isActive={
            canvasState.mode == CanvasMode.None ||
            canvasState.mode == CanvasMode.Resizing ||
            canvasState.mode == CanvasMode.SelectionNet ||
            canvasState.mode == CanvasMode.Pressing ||
            canvasState.mode == CanvasMode.Translating
          }
          onClick={() => {
            setCanvasState({mode: CanvasMode.None});
          }}
          icon={MousePointer2}
        />
        <ToolButton
          label="Text"
          isActive={
            canvasState.mode == CanvasMode.Inserting &&
            canvasState.layerType == LayerTypes.Text
          }
          onClick={() => {
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerTypes.Text,
            });
          }}
          icon={Type}
        />
        <ToolButton
          label="sticky notes"
          isActive={
            canvasState.mode == CanvasMode.Inserting &&
            canvasState.layerType == LayerTypes.Note
          }
          isDiabled={false}
          onClick={() => {
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerTypes.Note,
            });
          }}
          icon={StickyNote}
        />
        <ToolButton
          label="rectangle"
          isActive={
            canvasState.mode == CanvasMode.Inserting &&
            canvasState.layerType == LayerTypes.Rectangle
          }
          onClick={() => {
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerTypes.Rectangle,
            });
          }}
          icon={Square}
        />
        <ToolButton
          label="ellips"
          isActive={
            canvasState.mode == CanvasMode.Inserting &&
            canvasState.layerType == LayerTypes.Ellips
          }
          onClick={() => {
            console.log("changed to ellips alyer mode");
            
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerTypes.Ellips,
            });
          }}
          icon={Circle}
        />
        <ToolButton
          label="pen"
          isActive={canvasState.mode == CanvasMode.Pencil}
          onClick={() => {
            setCanvasState({mode: CanvasMode.Pencil});
          }}
          icon={Pencil}
        />
      </div>

      <div className="flex flex-col bg-white rounded-sm shadow-md p-1.5 gap-y-1">
        <ToolButton
          label="redo"
          isDiabled={!canRedo}
          onClick={redo}
          icon={Redo2}
        />
        <ToolButton
          label="undo"
          isActive={false}
          isDiabled={!canUndo}
          onClick={undo}
          icon={Undo2}
        />
      </div>
    </div>
  );
};

Toolbar.Skeleton = () => {
  return (
    <div className="absolute top-[50%] -translate-y-[50%] left-2 h-[256px] flex flex-col  px-1.5 gap-y-2 w-[56px] rounded-sm  bg-white  " ></div>
  );
};
