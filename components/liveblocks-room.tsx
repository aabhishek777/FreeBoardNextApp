"use client";

import {RoomProvider} from "@/liveblocks.config";

import {ClientSideSuspense} from "@liveblocks/react";
import React, {ReactNode} from "react";

interface LiveblocksRoomProps {
  children: ReactNode;
  roomId: string;
  fallback: NonNullable<React.ReactNode> | null;
}

const LiveblocksRoom = ({children, roomId, fallback}: LiveblocksRoomProps) => {
  return (
    <RoomProvider id={roomId} initialPresence={{}}>
      <ClientSideSuspense fallback={fallback}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default LiveblocksRoom;
