"use client";
//TODO Here is the bug of double clicking to deselect layer in UI
import React, {useCallback, useMemo, useState} from "react";
import {Participents} from "./participants";
import {Toolbar} from "./toolbar";
import {
  useCanRedo,
  useCanUndo,
  useHistory,
  useMutation,
  useOthersMapped,
  useSelf,
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

import {
  findIntersectingLayerWithRectangle,
  idToColor,
  penPointsToPathLayer,
  pointerEventToCanvasPoint,
  resizeBounds,
  rgbToHexColor,
} from "@/lib/utils";

import {nanoid} from "nanoid";
import {LiveObject} from "@liveblocks/client";
import {CursorPresences} from "./cursor-presences";
import {LayerPreview} from "./layer-preview";
import {SelectionBox} from "./selectionn-box";
import {SelectTools} from "./select-tools";
import {Path} from "./path";

interface CanvasProps {
  boardId: string;
}

const Canvas = ({boardId}: CanvasProps) => {
  const MAX_LAYER = 100;

  const layerIds=useStorage((root) => root?.layerIds);
  
  // const pencilDraft=useSelf(me => me.presence.pencilDraft);


  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });

  const [camera, setCamera] = useState<Camera>({x: 0, y: 0});

  const [lastUsedColor, setLastUsedColor] = useState<Color>({
    r: 0,
    g: 0,
    b: 0,
  });

  const [doubleClickPoint, setDoubleClickPoint] = useState<Point | null>(null);
  const [visibleRect, setVisibleRect] = useState(0);

  const history = useHistory();
  const canRedo = useCanRedo();
  const canUndo = useCanUndo();

  const insertLayer = useMutation(
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

      const liveLayerIds = storage.get("layerIds");
      const layerId = nanoid();
      const layer = new LiveObject({
        type: layerType,
        x: position.x,
        y: position.y,
        //TODO default height width can be modified
        height: 100,
        width: 100,
        fill: lastUsedColor,
      });

      liveLayerIds.push(layerId);
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
      if (canvasState.mode !== CanvasMode.Resizing) {
        return;
      }

      const bounds = resizeBounds(
        canvasState.corner,
        canvasState.initialBound,
        point
      );

      const liveLayers = storage.get("layers");
      const layer = liveLayers.get(self?.presence?.selection[0]);
      if (layer) {
        layer.update(bounds);
      }
    },
    [canvasState]
  );

  const unselectLayers = useMutation(({self, setMyPresence}) => {
    if (self.presence.selection.length > 0) {
      setMyPresence({selection: []}, {addToHistory: true});
    }
  }, []);

  const updateSelectionNet = useMutation(
    ({storage, setMyPresence}, current: Point, origin: Point) => {
      const layers = storage.get("layers").toImmutable();

      setCanvasState({
        mode: CanvasMode.SelectionNet,
        current,
        origin,
      });

      const ids = findIntersectingLayerWithRectangle(
        layerIds,
        layers,
        origin,
        current,
      );

      setMyPresence({selection: ids});
    },
    [layerIds]
  );

  const startMultiSelection = useCallback((current: Point, origin: Point) => {
    if (Math.abs(current.x - origin.x) + Math.abs(current.y - origin.y) > 50) {
      setCanvasState({
        mode: CanvasMode.SelectionNet,
        origin: origin,
        current: current,
      });
    }
  }, []);

  const translatingSelectedLayers = useMutation(
    ({storage, self}, point: Point) => {
      // console.log(point);

      if (canvasState.mode !== CanvasMode.Translating) {
        return;
      }

      const offset = {
        x: point.x - canvasState.origin.x,
        y: point.y - canvasState.origin.y,
      };

      // console.log({ offset });

      const liveLayers = storage.get("layers");

      for (const id of self.presence.selection) {
        const layer = liveLayers.get(id);

        // console.log({ x: layer?.get("x"), y: layer?.get("y") });

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

  const continueDrawing = useMutation(
    ({self, setMyPresence}, point: Point, e: React.PointerEvent) => {
      const {pencilDraft} = self.presence;

      if (
        canvasState.mode !== CanvasMode.Pencil ||
        e.buttons != 1 ||
        pencilDraft == null
      ) {
        return;
      }

      setMyPresence({
        cursor: point,

        pencilDraft:
          pencilDraft.length === 1 &&
          pencilDraft[0][0] === point.x &&
          pencilDraft[0][1] === point.y
            ? pencilDraft
            : [...pencilDraft, [point.x, point.y, e.pressure]],
      });
    },
    [canvasState.mode]
  );

  const insertPath = useMutation(
    ({storage, self, setMyPresence}) => {
      const {pencilDraft} = self.presence;

      const liveLayers = storage.get("layers");

      if (
        pencilDraft === null ||
        pencilDraft.length < 2 ||
        liveLayers.size >= MAX_LAYER
      ) {
        setMyPresence({pencilDraft: null});
        return;
      }

      const id = nanoid();

      liveLayers.set(
        id,
        new LiveObject(penPointsToPathLayer(pencilDraft, lastUsedColor))
      );

      const liveLayerIds = storage.get("layerIds");

      liveLayerIds.push(id);

      setMyPresence({
        pencilDraft: null,
      });

      setCanvasState({
        mode: CanvasMode.Pencil,
      });
    },
    [lastUsedColor]
  );

  const startDrawing = useMutation(
    ({setMyPresence}, point: Point, pressure: number) => {
      setMyPresence({
        pencilDraft: [[point.x, point.y, pressure]],
        penColor: lastUsedColor,
      });
    },
    [lastUsedColor]
  );

  const selections = useOthersMapped((other) => other.presence.selection);

  const onPointerMove = useMutation(
    ({setMyPresence}, e: React.PointerEvent) => {
      const point = pointerEventToCanvasPoint(e, camera);

      if (canvasState.mode === CanvasMode.Pressing) {
        startMultiSelection(point, canvasState.origin);
      } else if (canvasState.mode === CanvasMode.SelectionNet) {
        updateSelectionNet(point, canvasState.origin);
      } else if (canvasState.mode === CanvasMode.Translating) {
        translatingSelectedLayers(point);
        setCanvasState({
          mode: CanvasMode.None,
        });
      } else if (canvasState.mode === CanvasMode.Resizing) {
        resizeSelectedLayer(point);
      } else if (canvasState.mode === CanvasMode.Pencil) {
        continueDrawing(point, e);
      }

      setMyPresence({
        cursor: point,
      });
    },
    [
      camera,
      canvasState,
      startMultiSelection,
      updateSelectionNet,
      resizeSelectedLayer,
      translatingSelectedLayers,
      continueDrawing,
    ]
  );

  const onWheel = useCallback((e: React.WheelEvent) => {
    setCamera((camera) => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
    }));
  }, []);

  const onPointerLeave = useMutation(({setMyPresence}) => {
    setMyPresence({cursor: null});
    if (canvasState.mode === CanvasMode.SelectionNet) {
      setCanvasState({
        mode: CanvasMode.None,
      });
    }
  }, []);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      const point = pointerEventToCanvasPoint(e, camera);

      if (canvasState.mode === CanvasMode.Inserting) {
        return;
      } else if (canvasState.mode === CanvasMode.SelectionNet) {
        return;
      } else if (canvasState.mode === CanvasMode.Pencil) {
        startDrawing(point, e.pressure);
        return;
      }

      setCanvasState({
        mode: CanvasMode.Pressing,
        origin: point,
      });
    },
    [camera, canvasState.mode, setCanvasState, startDrawing]
  );

  const onPointerUp = useMutation(
    ({}, e) => {
      const point = pointerEventToCanvasPoint(e, camera);

      if (canvasState.mode === CanvasMode.Pressing) {
        unselectLayers();
        setCanvasState({
          mode: CanvasMode.None,
        });
      } else if (canvasState.mode === CanvasMode.Pencil) {
        insertPath();
      } else if (canvasState.mode === CanvasMode.Inserting) {
        insertLayer(canvasState.layerType, point);
      } else if (canvasState.mode !== CanvasMode.SelectionNet) {
      } else {
        setCanvasState({
          mode: CanvasMode.None,
        });
      }

      history.resume();
    },
    [
      camera,
      setCanvasState,
      insertLayer,
      canvasState,
      history,
      unselectLayers,
      insertPath,
    ]
  );

  const onLayerPointerDown = useMutation(
    ({self, setMyPresence}, e: React.PointerEvent, layerId: string) => {
      if (
        canvasState.mode === CanvasMode.Pencil ||
        canvasState.mode === CanvasMode.Inserting ||
        canvasState.mode == CanvasMode.SelectionNet
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

      // console.log({ corner, initialBound });

      setCanvasState({
        mode: CanvasMode.Resizing,
        initialBound,
        corner,
      });
    },
    []
  );

  const onDoubleClick = useCallback(
    (e: any) => {
      // e.preventDefault();
      // console.log("from double click event");
      // console.log(e);
      // const point = pointerEventToCanvasPoint(e, camera);
      // setDoubleClickPoint(point);
      // setCanvasState({
      //   mode: CanvasMode.SelectionNet,
      //   origin: point,
      //   current: point,
      // });
    },
    [camera]
  );

  const onDoubleClickk = useCallback((e: React.MouseEvent) => {}, [camera]);
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

      <SelectTools camera={camera} setLastUsedColor={setLastUsedColor} />
      <svg
        className="h-[100vh] w-[100vw]"
        onWheel={onWheel}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        onPointerUp={onPointerUp}
        onPointerDown={onPointerDown}
        onDoubleClick={onDoubleClick}
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

          {canvasState.mode === CanvasMode.SelectionNet &&
            canvasState.current != null && (
              <rect
                className=" fill-blue-500/5  stroke-red-500 stroke-1 "
                x={Math.min(canvasState.origin.x, canvasState.current.x)}
                y={Math.min(canvasState.origin.y, canvasState.current.y)}
                width={Math.abs(canvasState.origin.x - canvasState.current.x)}
                height={Math.abs(canvasState.origin.y - canvasState.current.y)}
              />
            )}

          
          <CursorPresences />
          {/* {pencilDraft!=null&&pencilDraft.length>0&&(
            <Path
            
              points={pencilDraft}
              fill={rgbToHexColor(lastUsedColor)}
              x={0}
            y={0}
            />
          )} */}
        </g>
      </svg>
    </main>
  );
};

export default Canvas;
