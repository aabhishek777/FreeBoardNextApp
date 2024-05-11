"use client";

import {idToColor} from "@/lib/utils";
import {useOther} from "@/liveblocks.config";
import {MousePointer2} from "lucide-react";
import {memo} from "react";

interface CursorProps {
  connectionId: number;
}

export const Cursor = memo(({connectionId}: CursorProps) => {
 
  return (
    <foreignObject width="50" height="50">
      <div
        xmlns="http://www.w3.org/1999/xhtml"
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "red",
        }}
      >
        <MousePointer2 className="h-5 w-5" />
      </div>
    </foreignObject>
  );
});
