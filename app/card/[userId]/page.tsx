import React from "react";
import Canvas from "./_components/canvas";
import LiveblocksRoom from "@/components/liveblocks-room";

interface BoardIdProps {
  params: {
    userId: string;
  };
}
const BoardIdPage = ({params}: BoardIdProps) => {
  return (
    <LiveblocksRoom roomId={params.userId}>
      <Canvas boardId={params.userId} />
    </LiveblocksRoom>
  );
};

export default BoardIdPage;
