"use cleint";

import {useOthersConnectionIds} from "@/liveblocks.config";
import {memo} from "react";
import {Cursor} from "./cursor";
import {MousePointer2} from "lucide-react";

export const Cursors = () => {
  const ids = useOthersConnectionIds();
 console.log(ids);
 
  return (
    <g>

      {ids.map((connectionId) => (
        
		  <Cursor
			  key={connectionId}
			  connectionId={connectionId}
		  />
      ))}
    </g>
  );
};

export const CursorPresences=memo(() => {
  const ids = useOthersConnectionIds();
  return (
    <Cursors />
     
    // <g>
    //   {ids.map((connectionId) => (
    //       <foreignObject x={10} y={10} width="50" height="50">
    //       <div xmlns="http://www.w3.org/1999/xhtml" style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background:"red" }}>
    //         <MousePointer2 className="h-5 w-5" />
    //       </div>
    //     </foreignObject>
		 
    //   ))}
    // </g>
  );
});
