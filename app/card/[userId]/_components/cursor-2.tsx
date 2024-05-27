"use client";

import {idToColor} from "@/lib/utils";
import {useOther} from "@/liveblocks.config";
import {MousePointer2} from "lucide-react";
import {memo} from "react";

interface CursorProps {
  connectionId: number;
}

export const Cursor2 = memo(({connectionId}: CursorProps) => {
  const info = useOther(connectionId, (user) => user?.info);
  const cursor = useOther(connectionId, (user) => user?.presence?.cursor);

  const name = info?.name || "Teammate";
  if (!cursor) {
    return null;
  }

  const {x, y} = cursor;

  console.log(cursor);

  return (
    <foreignObject
      style={{
        transform: `translateX(${x}px) translateY(${y}px)`,
        width: 200,
        height: 200,
		  }}
		  
		  className=" drop-shadow-md"
    >
      <div
        className="relative"
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MousePointer2
          className="h-5 w-5 "
          style={{
            color: idToColor(connectionId),
            fill: idToColor(connectionId),
          }}
        />
        <div
          className="absolute mt-12 ml-10 px-1.5 text-white rounded-sm text-sm"
          style={{backgroundColor: idToColor(connectionId)}}
        >
          {name}
        </div>
      </div>
    </foreignObject>
  
  );
});
