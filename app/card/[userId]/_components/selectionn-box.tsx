import {useSelectionBound} from "@/hooks/use-selection-bound";
import {useSelf, useStorage} from "@/liveblocks.config";
import {LayerTypes, Side, XYWH} from "@/type/canvas";

import {memo} from "react";

interface SelectionBoxProps {
  onResizeHandlePointDown: (corner: Side, initialBound: XYWH) => void;
}

export const SelectionBox = memo(
  ({onResizeHandlePointDown}: SelectionBoxProps) => {
    const currentLayerId = useSelf((me) =>
      me.presence.selection.length === 1 ? me.presence.selection[0] : null
    );

    const isShowHandles = useStorage((root) => {
      currentLayerId &&
        root.layers.get(currentLayerId)?.type !== LayerTypes.Path;
    });

    const bounds=useSelectionBound();
    
    console.log(bounds?.x,bounds?.y);
    

    if (!bounds) return null;

    return (
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
    
    );
  }
);

SelectionBox.displayName = "SelctionBox";
