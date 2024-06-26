"use client";

import {RoomProvider} from "@/liveblocks.config";
import {Layers} from "@/type/canvas";
import {LiveList, LiveMap, LiveObject} from "@liveblocks/client";

import {ClientSideSuspense} from "@liveblocks/react";
import React, {ReactNode} from "react";

interface LiveblocksRoomProps {
  children: ReactNode;
  roomId: string;
  fallback: NonNullable<React.ReactNode> | null;
}

const LiveblocksRoom = ({children, roomId, fallback}: LiveblocksRoomProps) => {
  return (
    <RoomProvider
      id={roomId}
      initialPresence={{
        cursor: null,
        selection: [],
        pencilDraft: null,
        penColor:null,

      }}
      initialStorage={{
        layers: new LiveMap<string,LiveObject<Layers>>(),
        layerIds: new LiveList(),
    }}
    >
      <ClientSideSuspense fallback={fallback}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default LiveblocksRoom;
