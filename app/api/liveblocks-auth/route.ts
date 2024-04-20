

import {api} from "@/convex/_generated/api";
import {auth, currentUser} from "@clerk/nextjs";
import { Liveblocks } from "@liveblocks/node";
import {ConvexHttpClient} from "convex/browser";

const liveblocks = new Liveblocks({
  secret: "sk_dev_rGGjkbPyHARgeZvexMkYuQOaaoAV2CqmtZGs-DU3INXdZjT5ZKTF5-z6LbhM9az3",
});

const convex=new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);


export async function POST(request: Request) {

	const isAuthenticated=await auth();
	const getCurrentUser=await currentUser();

	// console.log(getCurrentUser)

	if (!isAuthenticated||!getCurrentUser) {
		return new Response('Unauthorized',{status: 403});
	}

	const {room}=await request.json();
	const board=await convex.query(api.boards.get,{id: room});
	
	// console.log('----------------------------------------------------')
	// console.log(board?._id)
	// console.log('----------------------------------------------------')
	// console.log(room)
	// console.log('----------------------------------------------------')

	if (board?._id!==room) {
		return new Response('Unauthorized',{status: 408});
	};

	const session=liveblocks.prepareSession(getCurrentUser.id,{
		userInfo: {
			name: getCurrentUser.firstName!,
			image: getCurrentUser.imageUrl,
			
		}
	});


	if (room) {
		session.allow(room,session.FULL_ACCESS)
	};

	const {status,body}=await session.authorize();
	// console.log(body)
	return new Response(body,{status})

	
}