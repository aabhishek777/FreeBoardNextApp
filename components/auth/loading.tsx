
import Image from 'next/image'
export const Loading=() => 
(
	<div className='h-full w-full border'>
		<div  className=" h-full flex flex-col justify-center items-center ">
		<Image
			src="/logo.png"
			alt='LOGO'
			width={100}
			height={100}
			className='h-full animate-pulse duration-700'
		/>
	</div>
	</div>
)