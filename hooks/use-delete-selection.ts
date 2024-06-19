import {useMutation, useSelf} from "@/liveblocks.config"



export const useDeleteSelectedLayer=() => {
	

	
	const selection=useSelf(me => me.presence.selection);

	console.log("deleteing ",{
		selection
	});
	return useMutation(({storage,setMyPresence}) => {

		const liveLayers=storage.get("layers");
		const layerIds=storage.get("layerIds");

		for (let id of selection) {
			liveLayers.delete(id);
             console.log(id);
			 
			const index=layerIds.indexOf(id);
           
			if (index!==-1) {
				layerIds.delete(index);
			}

			setMyPresence({selection: []},{addToHistory: true});
		console.log("d")
		}
		
	
	 },[selection]);
}