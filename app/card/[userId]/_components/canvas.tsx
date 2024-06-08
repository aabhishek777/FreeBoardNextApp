"use client";

import React, {useCallback, useMemo, useState} from "react";
import {Participents} from "./participants";
import {Toolbar} from "./toolbar";
import {
  useCanRedo,
  useCanUndo,
  useHistory,
  useMutation,
  useOthersConnectionIds,
  useOthersMapped,
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
  Side,
  XYWH,
} from "@/type/canvas";

import {idToColor, pointerEventToCanvasPoint, resizeBounds} from "@/lib/utils";

import {nanoid} from "nanoid";
import {LiveObject} from "@liveblocks/client";
import {CursorPresences} from "./cursor-presences";
import {LayerPreview} from "./layer-preview";
import {SelectionBox} from "./selectionn-box";

interface CanvasProps {
  boardId: string;
}
const Canvas = ({boardId}: CanvasProps) => {
  const MAX_LAYER = 100;
  const layerIds = useStorage((root) => root?.layerIds);

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
      if (liveLayers.size >= MAX_LAYER) {
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
  const resizeSelectedLayer = useMutation(
    ({storage, self}, point: Point) => {
      if (canvasState.mode != CanvasMode.Resizing) {
        return;
      }

      const bounds = resizeBounds(
        canvasState.corner,
        canvasState.initialBound,
        point
      );

      const liveLayers = storage.get("layers");
      const layer = liveLayers.get(self?.presence?.selection[0]);
      console.log({layer, liveLayers});

      if (layer) {
        layer.update(bounds);
      }
    },
    [canvasState]
  );

  const translatingSelectedLayers = useMutation(
    ({storage,self},point: Point) => {
      console.log(point);
      
      if (canvasState.mode != CanvasMode.Translating) {
        return;
      }

      const offset = {
        x: point.x - canvasState.origin.x,
        y: point.y - canvasState.origin.y,
      };

      console.log({offset});
      
      const liveLayers = storage.get("layers");

      for (const id of self.presence.selection) {
        const layer = liveLayers.get(id);

        console.log({x:layer?.get("x"),y:layer?.get("y")});
        
        if (layer) {
          layer.update({
            x: layer.get("x") + offset.x,
            y: layer.get("y") + offset.y,
          });
        }
      }

      setCanvasState({
        mode: CanvasMode.Translating,
        origin: point,
      });
    },
    [canvasState]
  );

  const selections = useOthersMapped((other) => other.presence.selection);

  const onPOinterMove = useMutation(
    ({setMyPresence}, e: React.PointerEvent) => {
      e.preventDefault();
      const point = pointerEventToCanvasPoint(e, camera);

      if (canvasState.mode == CanvasMode.Translating) {
        console.log("translating");
        translatingSelectedLayers(point);
        setCanvasState({
          mode:CanvasMode.None
        })
      } else if (canvasState.mode == CanvasMode.Resizing) {
        console.log("resizing");
        resizeSelectedLayer(point);
      }

      //adding cursor to the UI
      setMyPresence({
        cursor: point,
      });
    },
    [camera, canvasState, resizeSelectedLayer,translatingSelectedLayers]
  );

  const onWheel = useCallback((e: React.WheelEvent) => {
    setCamera((camera) => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
    }));
  }, []);

  const onPointerLeave = useMutation(({setMyPresence}) => {
    setMyPresence({cursor: null});
    //TODO have to handel the cursor left because it goes to x,y=0 starting of this canvas //
  }, []);

  const onPointerUp = useMutation(
    ({}, e) => {
      const point = pointerEventToCanvasPoint(e, camera);
      if (canvasState.mode == CanvasMode.Inserting) {
        inserLayer(canvasState.layerType, point);
      } else {
        setCanvasState({
          mode: CanvasMode.None,
        });
      }

      history.resume();
    },
    [camera, inserLayer, canvasState, history]
  );

  const onLayerPointerDown = useMutation(
    ({self, setMyPresence}, e: React.PointerEvent, layerId: string) => {
      e.stopPropagation();
      if (
        canvasState.mode === CanvasMode.Pencil ||
        canvasState.mode === CanvasMode.Inserting
      ) {
        return;
      }
      history.pause();
      const point = pointerEventToCanvasPoint(e, camera);
      console.log(point.x, point.y);

      if (!self.presence.selection.includes(layerId)) {
        setMyPresence({selection: [layerId]}, {addToHistory: true});
      }

      setCanvasState({
        mode: CanvasMode.Translating,
        origin: point,
      });
    },
    [canvasState.mode, camera, history, setCanvasState]
  );

  const onResizeHandlePointDown = useCallback(
    (corner: Side, initialBound: XYWH) => {
      history.pause();

      console.log({corner, initialBound});

      setCanvasState({
        mode: CanvasMode.Resizing,
        initialBound,
        corner,
      });
    },
    []
  );

  const layerIdsToColorSelection = useMemo(() => {
    const layerIdsToColorSelection: Record<string, string> = {};

    for (const user of selections) {
      const [connectionId, selection] = user;

      for (const layerId of selection) {
        layerIdsToColorSelection[layerId] = idToColor(connectionId);
      }
    }

    return layerIdsToColorSelection;
  }, [selections]);

  return (
    <main className="w-full h-full relative bg-neutral-200 touch-none">
      <Info boardId={boardId} />
      <Participents />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        redo={history.redo}
        undo={history.undo}
        canRedo={canRedo}
        canUndo={canUndo}
      />

      <svg
        className="h-[100vh] w-[100vw]"
        onWheel={onWheel}
        onPointerMove={onPOinterMove}
        onPointerLeave={onPointerLeave}
        onPointerUp={onPointerUp}
      >
        <g
          style={{
            transform: `translate(${camera.x}px,${camera.y})`,
          }}
        >
          {layerIds.map((layerId) => (
            <LayerPreview
              key={layerId}
              id={layerId}
              onLayerPointerDown={onLayerPointerDown}
              selectionColor="#000"
            />
          ))}
          <SelectionBox onResizeHandlePointDown={onResizeHandlePointDown} />

          <CursorPresences />
        </g>
      </svg>
    </main>
  );
};

export default Canvas;
