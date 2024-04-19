import {useAuth} from "@clerk/nextjs";

import React, {useId} from "react";
import Overlay from "./overlay";
import {Star} from "lucide-react";
import {cn} from "@/lib/utils";
import {useApiMutation} from "@/hooks/use-api-mutation";
import {api} from "@/convex/_generated/api";
import {toast} from "sonner";

interface FooterProps {
  id: string;
  isFavorite: boolean;
  authorName: string;
  title: string;
  authorId: string;
  createdAtLable: string;
	disabled: boolean;
	orgId: string;
}
const Footer=({
	id,
  title,
  isFavorite,
  authorName,
  authorId,
  createdAtLable,
	disabled,
	orgId
}: FooterProps) => {
  const {userId} = useAuth();
  const author = userId === authorId ? "you" : authorName;

  const {mutate: favorite, pending: pendingFav} = useApiMutation(
    api.boards.favorite
  );
  const {mutate: unfavorite, pending: pendingUnFav} = useApiMutation(
    api.boards.unFavorite
  );

  const favoriteClickHandeller = async(e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
	  e.stopPropagation();
	  if (isFavorite) {
		  await unfavorite({id});
		  toast('unFavorited')
	  }
	  else {
		  await favorite({id,orgId})
		  toast('favorited')
	  }


	  console.log("propagation stopped");
	  
  };

  return (
    <div className="relative p-3">
      <p className="truncate text-[15px] max-w-[calc(100%-20px])">{title}</p>

      <p className=" opacity-0 group-hover:opacity-100  text-muted-foreground truncate  text-[12px]">
        {author},{createdAtLable}
      </p>

      <button
        onClick={(e) => favoriteClickHandeller(e)}
        disabled={false}
        className={cn(
          "opacity-0 group-hover:opacity-100 transition absolute   top-4 right-4 text-muted-foreground",
         " opacity-75"
        )}
      >
        <Star
          className={cn(
            "h-6 w-6",
            isFavorite && "fill-blue-600 text-blue-600 "
          )}
        />
      </button>
    </div>
  );
};

export default Footer;
