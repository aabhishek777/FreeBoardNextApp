"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import Overlay from "./overlay";
import Footer from "./footer";

import {formatDistanceToNow} from "date-fns";
import {Skeleton} from "@/components/ui/skeleton";

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
		  <Skeleton className="h-full w-full"/>
	</div>
  );
};
