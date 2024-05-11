"use client";

import React, {useCallback, useState} from "react";
import {Participents} from "./participants";
import {Toolbar} from "./toolbar";
import {
  useCanRedo,
  useCanUndo,
  useHistory,
  useMutation,
  useOthersConnectionIds,
} from "@/liveblocks.config";
import {Info} from "./info";

import {Camera, CanvasMode, CanvasState} from "@/type/canvas";
import {pointerEventToCanvasPoint} from "@/lib/utils";
import {Cursor} from "./cursor";

interface CanvasProps {
  boardId: string;
}
const Canvas = ({boardId}: CanvasProps) => {
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });
  const [camera, setCamera] = useState<Camera>({x: 0, y: 0});

  const history = useHistory();
  const canRedo = useCanRedo();
  const canUndo = useCanUndo();
  const ids = useOthersConnectionIds();

  const onPointMoveData = useMutation(
    ({setMyPresence}, e: React.PointerEvent) => {
      e.preventDefault();
      const currentPresence = pointerEventToCanvasPoint(e, camera);
      setMyPresence({
        cursor: currentPresence,
      });
    },
    []
  );

  const onWheelData = useCallback((e: React.WheelEvent) => {
    setCamera((camera) => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
    }));
  }, []);

  return (
    <main className="w-full h-full relative bg-neutral-200 touch-none">
      <Info boardId={boardId} />
      <Participents />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        redo={history.canRedo}
        undo={history.canUndo}
        canRedo={canRedo}
        canUndo={canUndo}
      />

      <svg
        className="h-[100vh] w-[100vw]"
        onWheel={onWheelData}
        onPointerMove={onPointMoveData}
      >
        {ids.map((connectionId) => (
          <Cursor key={connectionId} connectionId={connectionId} />
        ))}
      </svg>
    </main>
  );
};

export default Canvas;
