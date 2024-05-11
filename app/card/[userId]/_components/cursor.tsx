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

  console.log(cursor);
  
  const name = info?.name || "Teammate";

  if (!cursor) {
    return null;
  }

  const {x,y}=cursor;
  
  console.log(x,y);
  
  return (

 
    
   
        <svg width="800" height="600">
          <g transform={`translate(${x},${y})`}>
            <foreignObject
              width="50"
              height="50"
            >
              <div
                xmlns="http://www.w3.org/1999/xhtml"
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: "red"
                }}
              >
                <MousePointer2 className="h-5 w-5" />
              </div>
            </foreignObject>
          </g>
        </svg>
      
    
    
  
    

    
  //   <foreignObject
  //   transform={`translate(${x},${y})`}
  //     width="50" height="50">
  //   <div xmlns="http://www.w3.org/1999/xhtml" style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background:"red" }}>
  //     <MousePointer2 className="h-5 w-5" />
  //   </div>
  // </foreignObject>
	  // <foreignObject
	  
		  // style={{
			//   translate: `translateX(${x}px) translateY(${y}px)`,
			  
		  // }}

		//   className="relative drop-shadow-md"
		//   width={50}
		//   height={50}
	  
	  // >
    //   <MousePointer2
    //     className="h-5 w-5"
    //     style={{
    //       color: idToColor(connectionId),
    //       fill: idToColor(connectionId),
    //     }}
    //   />
    // </foreignObject>
  );
});
