import {useSelectionBound} from "@/hooks/use-selection-bound";
import {useSelf, useStorage} from "@/liveblocks.config";
import {LayerTypes, Side, XYWH} from "@/type/canvas";
import {transform} from "next/dist/build/swc";

import {memo} from "react";

interface SelectionBoxProps {
  onResizeHandlePointDown: (corner: Side, initialBound: XYWH) => void;
}

const HANDEL_WIDTH = 8;

export const SelectionBox = memo(
  ({onResizeHandlePointDown}: SelectionBoxProps) => {
    const currentLayerId = useSelf((me) =>
      me.presence.selection.length === 1 ? me.presence.selection[0] : null
    );

    console.log(currentLayerId);

    const isShowHandles = useStorage((root) => {
      return (
        currentLayerId &&
        root.layers.get(currentLayerId)?.type !== LayerTypes.Path
      );
    });

    const bounds = useSelectionBound();

    console.log(bounds?.x, bounds?.y);

    if (!bounds) return null;

    return (
      <>
        <rect
          className="fill-transparent stroke-blue-600 stroke-2 pointer-events-none"
          style={{
            transform: `translate(${bounds.x}px,${bounds.y}px)`,
          }}
          x={0}
          y={0}
          height={bounds.height}
          width={bounds.width}
        />
        {isShowHandles && (
          <>
            <rect
              style={{
                transform: `translate(
                ${bounds.x - HANDEL_WIDTH / 2}px,
                ${bounds.y - HANDEL_WIDTH / 2}px)`,
                cursor: "nwse-resize",
                width: `${HANDEL_WIDTH}px`,
                height: `${HANDEL_WIDTH}px`,
              }}
              className="fill-white stroke-1 stroke-blue-600"
              x={0}
              y={0}
              onPointerDown={(e) => e.stopPropagation()}
            />
            <rect
              style={{
                transform: `translate(
                ${bounds.x + bounds.width / 2 - HANDEL_WIDTH / 2}px,
                ${bounds.y - HANDEL_WIDTH / 2}px)`,
                cursor: "ns-resize",
                width: `${HANDEL_WIDTH}px`,
                height: `${HANDEL_WIDTH}px`,
              }}
              className="fill-white stroke-1 stroke-blue-600"
              x={0}
              y={0}
              onPointerDown={(e) => e.stopPropagation()}
            />
            <rect
              style={{
                transform: `translate(
                ${bounds.x + bounds.width / 2 - HANDEL_WIDTH / 2}px,
                ${bounds.y - HANDEL_WIDTH / 2}px)`,
                cursor: "ns-resize",
                width: `${HANDEL_WIDTH}px`,
                height: `${HANDEL_WIDTH}px`,
              }}
              className="fill-white stroke-1 stroke-blue-600"
              x={0}
              y={0}
              onPointerDown={(e) => e.stopPropagation()}
            />
            <rect
              style={{
                transform: `translate(
                ${bounds.x + bounds.width - HANDEL_WIDTH / 2}px,
                ${bounds.y - HANDEL_WIDTH / 2}px)`,
                cursor: "nesw-resize",
                width: `${HANDEL_WIDTH}px`,
                height: `${HANDEL_WIDTH}px`,
              }}
              className="fill-white stroke-1 stroke-blue-600"
              x={0}
              y={0}
              onPointerDown={(e) => e.stopPropagation()}
            />
            <rect
              style={{
                transform: `translate(
                ${bounds.x + bounds.width - HANDEL_WIDTH / 2}px,
                ${bounds.y + bounds.height / 2 - HANDEL_WIDTH / 2}px)`,
                cursor: "ew-resize",
                width: `${HANDEL_WIDTH}px`,
                height: `${HANDEL_WIDTH}px`,
              }}
              className="fill-white stroke-1 stroke-blue-600"
              x={0}
              y={0}
              onPointerDown={(e) => e.stopPropagation()}
            />
            <rect
              style={{
                transform: `translate(
                ${bounds.x + bounds.width - HANDEL_WIDTH / 2}px,
                ${bounds.y + bounds.height - HANDEL_WIDTH / 2}px)`,
                cursor: "nwse-resize",
                width: `${HANDEL_WIDTH}px`,
                height: `${HANDEL_WIDTH}px`,
              }}
              className="fill-white stroke-1 stroke-blue-600"
              x={0}
              y={0}
              onPointerDown={(e) => e.stopPropagation()}
            />
            <rect
              style={{
                transform: `translate(
                ${bounds.x + bounds.width / 2 - HANDEL_WIDTH / 2}px,
                ${bounds.y + bounds.height - HANDEL_WIDTH / 2}px)`,
                cursor: "ns-resize",
                width: `${HANDEL_WIDTH}px`,
                height: `${HANDEL_WIDTH}px`,
              }}
              className="fill-white stroke-1 stroke-blue-600"
              x={0}
              y={0}
              onPointerDown={(e) => e.stopPropagation()}
            />

            <rect
              style={{
                transform: `translate(
                ${bounds.x - HANDEL_WIDTH / 2}px,
                ${bounds.y + bounds.height - HANDEL_WIDTH / 2}px)`,
                cursor: "sw-resize",
                width: `${HANDEL_WIDTH}px`,
                height: `${HANDEL_WIDTH}px`,
              }}
              className="fill-white stroke-1 stroke-blue-600"
              x={0}
              y={0}
              onPointerDown={(e) => e.stopPropagation()}
            />

            <rect
              style={{
                transform: `translate(
                ${bounds.x - HANDEL_WIDTH / 2}px,
                ${bounds.y + bounds.height / 2 - HANDEL_WIDTH / 2}px)`,
                cursor: "ew-resize",
                width: `${HANDEL_WIDTH}px`,
                height: `${HANDEL_WIDTH}px`,
              }}
              className="fill-white stroke-1 stroke-blue-600"
              x={0}
              y={0}
              onPointerDown={(e) => e.stopPropagation()}
            />
          </>
        )}
      </>
    );
  }
);

SelectionBox.displayName = "SelctionBox";
