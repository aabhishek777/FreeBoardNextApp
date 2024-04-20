import React from "react";
import Canvas from "./_components/canvas";
import LiveblocksRoom from "@/components/liveblocks-room";
import Loading from "./_components/loading";

interface BoardIdProps {
  params: {
    userId: string;
  };

}
const BoardIdPage=({params}: BoardIdProps) => {
  
  
  return (

    <LiveblocksRoom roomId={params.userId} fallback={<Loading/>}>
      <Canvas boardId={params.userId} />
    </LiveblocksRoom>
  );
};

export default BoardIdPage;
