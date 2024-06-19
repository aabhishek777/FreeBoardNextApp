import {useMutation, useSelf} from "@/liveblocks.config"



export const useDeleteSelectedLayer=() => {
	

	const me=useSelf(me => me.presence.selection);

	return useMutation(({storage,setMyPresence}) => {

		const liveLayers=storage.get("layers");
		const layerIds=storage.get("layerIds");

		for (let id of me) {
			liveLayers.delete(id);

			const index=layerIds.indexOf(id);

			if (index!==-1) {
				layerIds.delete(index);
			}

			setMyPresence({selection: []},{addToHistory: true});
		}
	 },[]);
}