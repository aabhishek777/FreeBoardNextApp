"use cleint";

import {useOthersConnectionIds} from "@/liveblocks.config";
import {memo} from "react";
import {Cursor} from "./cursor";

export const Cursors = () => {
  const ids = useOthersConnectionIds();

  return (
    <div>
      {ids.map((connectionId) => (
		  <Cursor
			  key={connectionId}
			  connectionId={connectionId}
		  />
      ))}
    </div>
  );
};

export const CursorPresences = memo(() => {
  return (
    <div>
      <Cursors />
    </div>
  );
});
