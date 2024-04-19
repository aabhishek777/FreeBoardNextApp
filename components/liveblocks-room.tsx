"use client";

import {RoomProvider} from "@/liveblocks.config";

import {ClientSideSuspense} from "@liveblocks/react";
import React, {ReactNode} from "react";

interface LiveblocksRoomProps {
  children: ReactNode;
  roomId: string;
}

const LiveblocksRoom = ({children, roomId}: LiveblocksRoomProps) => {
  return (
    <RoomProvider id={roomId} initialPresence={{}}>
      <ClientSideSuspense fallback={<div>Loading/....</div>}>{() => children}</ClientSideSuspense>
    </RoomProvider>
  );
};

export default LiveblocksRoom;
