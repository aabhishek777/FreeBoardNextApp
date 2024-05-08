import {Skeleton} from "@/components/ui/skeleton";
import React from "react";
import AvatarParticipant from "./avatar-participants";
import {useOthers, useSelf} from "@/liveblocks.config";
import {idToColor} from "@/lib/utils";

export const Participents=() => {
  
  const users=useOthers();
  console.log(users);
  
  const currentUser=useSelf();
  console.log(currentUser);

  const MAX_USERS=2;

  const moreUsers=users?.length>MAX_USERS;
  console.log(moreUsers);
  
  // const maxUsers=users.length>MAX_USERS
  return (
    <div className="absolute top-2 right-2 h-12 flex items-center px-1.5  gap-2.5 bg-white rounded-sm shadow-md ">
     
      
      {users.slice(0,2).map((user) => (
        <AvatarParticipant
        src={user?.info?.image!} fallback={`user?.info?.name `} name={user?.info?.name!} borderColor={idToColor(currentUser.connectionId)}
      
        />
      ))}
      <AvatarParticipant src={currentUser?.info?.image!} fallback="abhi" name="abhi" borderColor={idToColor(currentUser.connectionId)} />
      

      {moreUsers&&<AvatarParticipant  fallback={`+${users.length-MAX_USERS}`} name={`${users.length-MAX_USERS}more`} borderColor={idToColor(currentUser.connectionId)} />}
    </div>
  );
};

Participents.Skeleton = () => {
  return (
    <div className="absolute top-2 right-2 h-10 flex items-center px-1.5 bg-white rounded-sm shadow-md w-[300px]" />
  );
};
