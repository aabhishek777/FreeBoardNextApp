"use client";

import {idToColor} from "@/lib/utils";
import {useOther} from "@/liveblocks.config";
import {MousePointer2} from "lucide-react";
import {memo} from "react";

interface CursorProps {
  connectionId: number;
}

export const Cursor = memo(({connectionId}: CursorProps) => {
  const info = useOther(connectionId, (user) => user?.info);
  const cursor = useOther(connectionId, (user) => user?.presence?.cursor);

  const name = info?.name || "Teammate";

  if (!cursor) {
    return null;
  }

  const {x, y} = cursor;
  return (
	  <foreignObject
	  
		  style={{
			  translate: `translateX(${x}) translateY(${y})`,
			  
		  }}

		  className="relative drop-shadow-md"
		  width={50}
		  height={50}
	  
	  >
      <MousePointer2
        className="h-5 w-5"
        style={{
          color: idToColor(connectionId),
          fill: idToColor(connectionId),
        }}
      />
    </foreignObject>
  );
});
