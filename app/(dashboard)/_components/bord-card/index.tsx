

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


interface BoardCardProps{
	key:string
	id:string
	orgId:string
	title:string
	authorName:string 
	authorId:string
	createdAt:number
	imageUrl:string 
	isFavorite:boolean 
}
const BoardCard=({
	id,orgId,title,authorName,isFavorite,imageUrl
}:BoardCardProps) => {
  return (
	  <Link href={`/card/${id}`} >
		  <div className=" group aspect-[100/127] flex flex-col border rounded-lg overflow-hidden justify-between">
			  
			  <div className="bg-amber-50 flex-1 relative">
			  <Image
			  src={imageUrl}
					  alt='card'
					  fill
					  className='object-fit'
			 
		  />
			  </div>
		 </div>
	</Link>
  )
}

export default BoardCard