"use client";

import React from "react";
import {Participents} from "./participants";
import {Info} from "./info";
import {Toolbar} from "./toolbar";

interface CanvasProps {
  boardId: string;
}
const Canvas = ({boardId}: CanvasProps) => {
  console.log(boardId);
  return (
    <main className="w-full h-full relative bg-neutral-200 touch-none">
      <Info />
      <Participents />
      <Toolbar />
    </main>
  );
};

export default Canvas;
