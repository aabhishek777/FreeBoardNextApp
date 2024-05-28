
import Image from 'next/image'
export const Loading=() => 
(
	
		<div  className="h-screen flex flex-col justify-center items-center ">
		<Image
			src="/logo.png"
			alt='LOGO'
			width={100}
			height={50}
			className='animate-pulse duration-700'
		/>
	</div>
	
)