import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { Context } from "hono";


export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: number
    }
}>();



export async function createPost(c:Context) {
	const user = Number(c.get('userId'));
	const userId=Number(user);
	if (isNaN(userId)) {
    return c.json({ error: "Invalid or missing userId" }, 400);
  }

	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const post = await prisma.post.create({
		data: {
			title: body.title,
			description: body.description,
			userId:userId
		}
	});
	return c.json({
		id: post.id
	});
}

export async function updatePostById(c:Context) {
	const user = Number(c.get('userId'));
	const userId=Number(user);
	if (isNaN(userId)) {
    return c.json({ error: "Invalid or missing userId" }, 400);
  }
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	prisma.post.update({
		where: {
			id: body.id,
			userId:userId
		},
		data: {
			title: body.title,
			description: body.description
		}
	});

	return c.text('updated post');
}

export async function getAllPosts(c:Context) {
	const rawId =c.req.param('id');
	 const id = Number(rawId);

  if (isNaN(id)) {
    return c.json({ error: "Invalid ID" }, 400);
  }
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	
	const post = await prisma.post.findUnique({
		where: {
			id
		}
	});

	return c.json(post);
}


