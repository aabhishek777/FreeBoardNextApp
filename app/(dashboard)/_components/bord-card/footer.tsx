

import {useAuth} from '@clerk/nextjs';

import React, {useId} from 'react'
import Overlay from './overlay';
import {Star} from 'lucide-react';
import {cn} from '@/lib/utils';


interface FooterProps{
	id: string,
	isFavorite: boolean,
	authorName: string,
	title: string,
	authorId: string,
	createdAtLable: string,
	disabled:boolean,
	
}
const Footer=({title,isFavorite,authorName,authorId,createdAtLable,disabled}: FooterProps) => {
	
	const {userId}=useAuth();
	const author=(userId===authorId)? "you":authorName;

	
	
  return (
	  <div className='relative p-3'>
		  <p className='truncate text-[15px] max-w-[calc(100%-20px])'>{title}</p>
	  
		  <p className=' opacity-0 group-hover:opacity-100  text-muted-foreground truncate  text-[12px]'>{author},{createdAtLable}</p>
		  
		  <button
			  disabled={disabled}
			  className={cn(
			  'opacity-0 group-hover:opacity-100 transition absolute   top-4 right-4 text-muted-foreground', disabled&&'cursor-not-allowed opacity-75'
		  )}>
			  <Star
				  className={cn('h-6 w-6', isFavorite&&'fill-blue-600 text-blue-600 ') } />
		  </button>
	     
	  </div>
	  
  )
}

export default Footer