

// import {useOther, useOthersConnectionIds} from "@/liveblocks.config";
// import {memo} from "react";
// import {Cursor} from "./cursor";

// export const Cursors=() => {
//   const ids=useOthersConnectionIds();
//   let info,cursor;
//   // ids.map((connectionId) => {
//   //   info=useOther(connectionId,(user) => user?.info);
//   //   cursor=useOther(connectionId,(user) => user?.presence?.cursor);
//   // });
  
//   console.log(cursor);
//   console.log(info);
  

//   const name = info || "Teammate";

//   if (!cursor) {
//     return null;
//   }

//   const {x, y} = cursor;

//   return (
//     <>
//       {ids.map((connectionId) => (
// 		  <Cursor
// 			  key={connectionId}
// 			  connectionId={connectionId}
// 		  />
//       ))}
//     </>
//   );
// };

// export const CursorPresences = memo(() => {
//   return (
   
//       <Cursors />
  
//   );
// });
