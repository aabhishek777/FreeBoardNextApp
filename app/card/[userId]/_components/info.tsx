"use client";

import Actions from "@/components/actions";
import {Hint} from "@/components/hint";
import {Button} from "@/components/ui/button";
import {api} from "@/convex/_generated/api";
import {Id} from "@/convex/_generated/dataModel";
import {cn} from "@/lib/utils";
import {useRenameModel} from "@/store/rename-model";
import {useQuery} from "convex/react";
import {Menu} from "lucide-react";
import {Poppins} from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface InfoProps {
  boardId: string;
}

const TabSaperator = () => {
  return <div className=" text-neutral-500 px-1.5 ">|</div>;
};

export const Info = async ({boardId}: InfoProps) => {
  const id = boardId as Id<"boards">;
  const data = useQuery(api.boards.get, {id});

  // console.log(data);

  const {onOpen} = useRenameModel();

  return (
    <div className="absolute top-2 left-2 h-12 w-auto flex items-center px-1.5 bg-white rounded-sm shadow-md  ">
      <Hint label="Go to boards" sideOffset={10}>
        <Link href="/">
          <Button variant="board" className="flex items-center ">
            <Image
              style={{marginRight: ""}}
              alt="logo.svg"
              src="/logo.png"
              width={30}
              height={30}
              className="m-3"
            />
            <span
              style={{
                fontSize: "1.5rem",
              }}
              className={cn("font-bold  text-2xl", font.className)}
            >
              Board
            </span>
          </Button>
        </Link>
      </Hint>

      <TabSaperator />
      <Hint label="rename the board">
        <Button variant="board" onClick={() => onOpen(id, data?.title!)}>
          {data?.title}
        </Button>
      </Hint>

      <TabSaperator />

      <Actions id={id} title={data?.title!} side="bottom" sideOffset={15}>
        <Button variant="board">
          <Menu />
        </Button>
      </Actions>
    </div>
  );
};

Info.Skeleton = () => {
  return (
    <div className="absolute top-2 left-2 h-10 flex items-center px-1.5 bg-white rounded-sm shadow-md w-[300px]" />
  );
};
