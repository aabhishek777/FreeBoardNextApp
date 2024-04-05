import React from 'react'
import EmptySearch from './empty-search';
import EmptyFavorite from './empty-favorite';
import EmptyBoard from './empty-board';




interface BoardListProps{

	query?: {
		search?: string,
		favorite?:string
		},
		orgId?:string
	
}
const BoardList=({query,orgId}: BoardListProps) => {


	const data=[];
	
	console.log(query,orgId);
    
	if(!data?.length &&query?.search) return <EmptySearch/>
	if(!data?.length && query?.favorite) return <EmptyFavorite/>
	if(!data?.length) return <EmptyBoard/>

}

export default BoardList