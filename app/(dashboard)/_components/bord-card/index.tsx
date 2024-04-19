"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import Overlay from "./overlay";
import Footer from "./footer";

import {formatDistanceToNow} from "date-fns";
import {Skeleton} from "@/components/ui/skeleton";
import Actions from "@/components/actions";
import {MoreHorizontal} from "lucide-react";

interface BoardCardProps {
  key: string;
  id: string;
  orgId: string;
  title: string;
  authorName: string;
  authorId: string;
  createdAt: number;
  imageUrl: string;
  isFavorite: boolean;
  disabled: boolean;
}
export const BoardCard = ({
  id,
  orgId,
  title,
  authorName,
  disabled,
  isFavorite,
  imageUrl,
  authorId,
  createdAt,
}: BoardCardProps) => {
  const createdAtLable = formatDistanceToNow(createdAt, {
    addSuffix: true,
  });

  return (
    <Link href={`/card/${id}`}>
      <div className=" group aspect-[100/127] flex flex-col border rounded-lg overflow-hidden justify-between">
        <div className="bg-amber-100 flex-1 relative">
          <Image src={imageUrl} alt={title} fill className="object-fit" />
          <Overlay />
          <Actions side="right" id={id} title={title}>
            <button className="absolute  outline-none  top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity ">
              <MoreHorizontal className="text-white  opacity-75 hover:opacity-100 transition-opacity" />
            </button>
          </Actions>
        </div>
        <Footer
          id={id}
          title={title}
          authorName={authorName}
          isFavorite={isFavorite}
          authorId={authorId}
          createdAtLable={createdAtLable}
          disabled={disabled}
        />
      </div>
    </Link>
  );
};

BoardCard.Skeleton = () => {
  return (
    <div className="  aspect-[100/127] border rounded-lg opacity-15  ">
      <Skeleton className="h-full w-full" />
    </div>
  );
};
