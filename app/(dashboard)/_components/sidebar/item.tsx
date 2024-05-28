'use client';

import {useOrganization,useOrganizationList} from "@clerk/nextjs";
import {cn} from "@/lib/utils";

import Image from "next/image";


interface itemProps {
	id: string,
	name: string,
	imageUrl: string
};


export const Item=({
	id,name,imageUrl
}:
	itemProps) => {
	
	const {organization}=useOrganization();
	const {setActive}=useOrganizationList();

	const isActive=organization?.id===id;

	const onClick=() => {
		if (!setActive) return;
		console.log("setActiove clicked")

		setActive({organization:id})
	}

	
	return (
	
		< div className="">
			<Image
				width={50}
				height={80}
				src={imageUrl}
				alt={name}
				onClick={onClick}

				className={cn("rounded-md cursor-pointer opacity-40 hover:opacity-100 transition",
				isActive && "opacity-100 transition-all")}
			/>
		</div>
	
	)
};