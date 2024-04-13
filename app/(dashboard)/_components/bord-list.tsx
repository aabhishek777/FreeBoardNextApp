import React from "react";
import EmptySearch from "./empty-search";
import EmptyFavorite from "./empty-favorite";
import EmptyBoard from "./empty-board";
import {useQuery} from "convex/react";
import {api} from "@/convex/_generated/api";
import {Loading} from "@/components/auth/loading";
import {BoardCard} from "./bord-card";
import AddNewBoardButton from "./add-new-board";
import {Skeleton} from "@/components/ui/skeleton";

interface BoardListProps {
  query?: {
    search?: string;
    favorite?: string;
  };
  orgId?: string;
}
const BoardList = ({query, orgId}: BoardListProps) => {
  const data = useQuery(api.boardsQuery.get, {orgId: orgId!});

  console.log(data);

  if (data === undefined)
    return (
      <>
        <h2 className=" text-3xl">
          {query?.favorite ? "Favorite boards" : "Team Board"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-8 mt-8 pb-10">
          <AddNewBoardButton disabled={true} orgId={orgId!} />

          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
        </div>
      </>
    );

  if (!data?.length && query?.search) return <EmptySearch />;
  if (!data?.length && query?.favorite) return <EmptyFavorite />;
  if (!data?.length) return <EmptyBoard />;

  return (
    <>
      <h2 className=" text-3xl">
        {query?.favorite ? "Favorite boards" : "Team Board"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-8 mt-8 pb-10">
        <AddNewBoardButton disabled={false} orgId={orgId!} />
        {data.map((board) => (
          <BoardCard
            key={board._id}
            id={board._id}
            orgId={board.orgId}
            title={board.title}
            authorName={board.authorName}
            authorId={board.authorId}
            createdAt={board._creationTime}
            imageUrl={board.imageUrl}
            isFavorite={false}
            disabled={false}
          />
        ))}
      </div>
    </>
  );
};

export default BoardList;
