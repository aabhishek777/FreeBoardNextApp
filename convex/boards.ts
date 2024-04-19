
import {v} from 'convex/values';
import {mutation} from './_generated/server'
import {title} from 'process';

const images=[
	'/placeholders/1.svg',
	'/placeholders/2.svg',
	'/placeholders/3.svg',
	'/placeholders/4.svg',
	'/placeholders/5.svg',
	'/placeholders/6.svg',
	'/placeholders/7.svg',
	'/placeholders/8.svg',
	'/placeholders/9.svg',
	'/placeholders/10.svg',
];


export const create=mutation({
	args: {
		orgId: v.string(),
		title: v.string(),
	},
	handler: async (ctx,args) => {
		const identity= await ctx.auth.getUserIdentity();
		console.log(identity);
		if(!identity) throw new Error("you are not authrized")
		const randomImage=images[Math.floor(Math.random()*images.length)];

		const board=await ctx.db.insert("boards",{
			title:args.title,
			orgId:args.orgId,
			imageUrl:randomImage,
			authorId:identity.subject,
			authorName:identity.name!,
		})
		return board;

	},
})

export const deleteCard = mutation({
    args: {
		id: v.id("boards") 
		
    },
    handler: async (ctx, args) => {
        try {
            const identity = await ctx.auth.getUserIdentity();
			if (!identity) throw new Error('Not authorized!'); 
			console.log(args.id)
            
			const a=await ctx.db.delete(args.id);
			console.log(a);
			return a;
			
        } catch (error) {
            console.log(error);
        }
    }
});



export const updateCard=mutation({
	args: {
		id:v.id('boards'),
		title:v.string()
	},
	handler:async (ctx,args) => {
		try {
			const identity=await ctx.auth.getUserIdentity();

			const title=args.title.trim();
			if (!identity) throw new Error("not authorized!");
			if (!title) throw new Error("empty Title");
			if (title.length>60) throw new Error("length is too large");
			return ctx.db.patch(args.id,{title:args.title});
		} catch (error) {
			throw new Error(`${error}`)
		}
	}
})