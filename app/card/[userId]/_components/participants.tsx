import {Skeleton} from "@/components/ui/skeleton";
import React from "react";
import AvatarParticipant from "./avatar-participants";
import {useOthers, useSelf} from "@/liveblocks.config";
import {idToColor} from "@/lib/utils";

export const Participents = () => {
  const MAX_USERS = 2;
  const users = useOthers();

  const currentUser = useSelf();

  const moreUsers = users?.length > MAX_USERS;

  return (
    <div className="absolute top-2 right-2 h-12 flex items-center px-1.5  gap-2.5 bg-white rounded-sm shadow-md ">
      {users.slice(0, 2).map((user) => (
        <AvatarParticipant
          key={user?.id}
          src={user?.info?.image!}
          fallback={`user?.info?.name `}
          name={user?.info?.name!}
          borderColor={idToColor(currentUser.connectionId + 1)}
        />
      ))}
      <AvatarParticipant
        src={currentUser?.info?.image!}
        fallback="abhi"
        name="abhi"
        borderColor={idToColor(currentUser.connectionId)}
      />

      {moreUsers && (
        <AvatarParticipant
          fallback={`+${users.length - MAX_USERS}`}
          name={`${users.length - MAX_USERS}more`}
          borderColor={idToColor(currentUser.connectionId) + 2}
        />
      )}
    </div>
  );
};

Participents.Skeleton = () => {
  return (
    <div className="absolute top-2 right-2 h-10 flex items-center px-1.5 bg-white rounded-sm shadow-md w-[300px]" />
  );
};
