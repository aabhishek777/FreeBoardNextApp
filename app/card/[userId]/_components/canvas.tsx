"use client";

import React, {useCallback, useState} from "react";
import {Participents} from "./participants";
import {Toolbar} from "./toolbar";
import {
  useCanRedo,
  useCanUndo,
  useHistory,
  useMutation,
  useMyPresence,
  useOther,
  useOthers,
  useOthersConnectionIds,
  useSelf,

} from "@/liveblocks.config";
import {Info} from "./info";

import {Camera, CanvasMode, CanvasState} from "@/type/canvas";
import {CursorPresences} from "./cursor-presences";
import {pointerEventToCanvasPoint} from "@/lib/utils";
import {MousePointer2} from "lucide-react";
import {Cursor} from "./cursor";

interface CanvasProps {
  boardId: string;
}
const Canvas=({boardId}: CanvasProps) => {
  
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });
  const [camera, setCamera] = useState<Camera>({x: 0, y: 0});




  const history = useHistory();
  const canRedo = useCanRedo();
  const canUndo=useCanUndo();
  
  const onWheelData = useCallback((e: React.WheelEvent) => {
    console.log("Wheel event triggered"); // Check if this logs when you scroll
    setCamera((camera) => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
    }));
  }, []);
  
  const onPointMoveData = useMutation(
    ({setMyPresence}, e: React.PointerEvent) => {
      console.log("Pointer move event triggered"); // Check if this logs on pointer move
      // e.preventDefault();
      setMyPresence({
        cursor: pointerEventToCanvasPoint(e, camera),
      });
      // console.log(useMyPresence);
      
    },
    [camera] // Note: Added camera as a dependency
  );
  

  // const onWheelData = useCallback((e: React.WheelEvent) => {
  //   setCamera((camera) => ({
  //     x: camera.x - e.deltaX,
  //     y: camera.y - e.deltaY,
  //   }));
  // },[]);
  
  // // console.log(onWheelData);
 
  // const onPointMoveData = useMutation(
  //   ({setMyPresence}, e: React.PointerEvent) => {
  //     e.preventDefault();

  //     console.log(e)
  //     setMyPresence({
  //       cursor: pointerEventToCanvasPoint(e, camera),
  //     });
  //   },
  //   []
  // );
  // console.log(onPointMoveData);

  // console.log(liveblocksData);
  // console.log(onWheelData);
  // console.log(onPointMoveData);

  const others=useOthers();
  // 
  const connectionId=useOthersConnectionIds();
  // const cursor = useOther(connectionId[0], (user) => user?.presence?.cursor);
  console.log(others[0]?.presence);
  
  // console.log(others[0]?.id,others[0]?.presence?.cursor);
  // let c=others[0].presence?.cursor;
  // console.log(c);
  if (!others[0]?.presence) {
    return <div>aaaaaaaaaaaaaaa</div>;
  }
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

      <Cursor
      connectionId={connectionId[0]}/>
     
      

{/* <svg
        viewBox="0 0 800 600" // Set viewBox to define the coordinate system
        className="w-full h-full"
        onWheel={onWheelData}
        onPointerMove={onPointMoveData}
      >
          <CursorPresences />
        <g>
          {others.map((other) => (
          <foreignObject x={10} y={100} width="50" height="50" key={other.id}>
          <div xmlns="http://www.w3.org/1999/xhtml" style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: "red" }}>
            <MousePointer2 className="h-5 w-5" />
          </div>
        </foreignObject>
        ))}
        </g>
      </svg> */}

      {/* <svg
         viewBox="0 0 800 600"
        className="h-[100vh] w-[100vw]"
        onWheel={onWheelData}
        onPointerMove={onPointMoveData}
      >
        <g>
          <CursorPresences />
        </g>
      </svg> */}
     
    </main>
  );
};

export default Canvas;
