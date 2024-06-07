



"use client"

import {useOthersConnectionIds, useSelf} from "@/liveblocks.config"
import {memo} from "react"
import {Cursor2} from "./cursor-2";




const Cursors=() => {
	const ids=useOthersConnectionIds();
	
	console.log(ids);
	

	return (<>
		{ids.map((connectionId) => (
			
			<Cursor2
			
				key={connectionId}
				connectionId={connectionId}
			/>

		))}
		</>
	)
}
export const CursorPresences=memo(() => {
	return (
		<>
		<Cursors/>
	</>
	)
	
})


CursorPresences.displayName="CursorPresences";
