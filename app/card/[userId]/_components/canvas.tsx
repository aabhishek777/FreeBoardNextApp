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
  useStorage,
} from "@/liveblocks.config";
import {Info} from "./info";

import {
  Camera,
  CanvasMode,
  CanvasState,
  Color,
  LayerTypes,
  Point,
} from "@/type/canvas";

import {pointerEventToCanvasPoint} from "@/lib/utils";
import {Cursor} from "./cursor";
import {nanoid} from "nanoid";
import {LiveMap, LiveObject} from "@liveblocks/client";

interface CanvasProps {
  boardId: string;
}
const Canvas = ({boardId}: CanvasProps) => {
  const layerIds = useStorage((root) => root?.layerIds);

  const MAX_LAYER = 100;

  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });
  const [camera, setCamera] = useState<Camera>({x: 0, y: 0});
  const [lastUsedColor, setLastUsedColor] = useState<Color>({
    r: 0,
    g: 0,
    b: 0,
  });

  const history = useHistory();
  const canRedo = useCanRedo();
  const canUndo = useCanUndo();
  const ids = useOthersConnectionIds();

  console.log(layerIds);

  const onPointerMoveData = useMutation(
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

  const onPointerLeaveData = useMutation(({setMyPresence}) => {
    setMyPresence({cursor: null});
    //TODO have to handel the cursor left because it goes to x,y=0 starting of this canvas //
  }, []);

  const inserLayer = useMutation(
    (
      {storage, setMyPresence},
      layerType:
        | LayerTypes.Ellips
        | LayerTypes.Rectangle
        | LayerTypes.Text
        | LayerTypes.Note,
      position: Point
    ) => {
      const liveLayers = storage.get("layers");
      if (liveLayers.size >= 100) {
        return;
      }

      const livelayerIds = storage.get("layerIds");

      const layerId = nanoid();

      const layer = new LiveObject({
        type: layerType,
        x: position.x,
        y: position.y,
        //TODO defalut height width can be modified
        height: 100,
        width: 100,
        fill: lastUsedColor,
      });

      livelayerIds.push(layerId);
      liveLayers.set(layerId, layer);

      setMyPresence({selection: [layerId]}, {addToHistory: true});
      setCanvasState({
        mode: CanvasMode.None,
      });
    },
    []
  );

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
        onPointerMove={onPointerMoveData}
        onPointerLeave={onPointerLeaveData}
      >
        {ids.map((connectionId) => (
          <Cursor key={connectionId} connectionId={connectionId} />
        ))}
      </svg>
    </main>
  );
};

export default Canvas;
