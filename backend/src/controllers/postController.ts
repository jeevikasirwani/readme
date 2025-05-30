import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { Context } from "hono";
import { postInputschema, postUpdateschema } from "../../../common/src/index";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: number;
  };
}>();

enum StatusCodes {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORISED = 401,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export async function createPost(c: Context) {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    const parsedPost = postInputschema.safeParse(body);
    if (!parsedPost.success) {
      return c.json({ error: "invalid post" }, StatusCodes.BAD_REQUEST);
    }
    const { title, description } = parsedPost.data;

    if (!title || !description) {
      return c.json(
        { error: "Please provide title, description" },
        StatusCodes.BAD_REQUEST
      );
    }
    const user = Number(c.get("userId"));
    const userId = Number(user);
    if (isNaN(userId)) {
      return c.json(
        { error: "Invalid or missing userId" },
        StatusCodes.BAD_REQUEST
      );
    }
    const post = await prisma.post.create({
      data: {
        title: body.title,
        description: body.description,
        userId: userId,
      },
    });
    return c.json(
      {
        post,
        id: post.id,
      },
      StatusCodes.OK
    );
  } catch (e) {
    return c.json(
      { error: `Error creating post.${e}` },
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

export async function updatePostById(c: Context) {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const user = Number(c.get("userId"));
    const userId = Number(user);
    if (isNaN(userId)) {
      return c.json({ error: "Invalid or missing userId" }, 400);
    }

    const body = await c.req.json();
    const parsePost = postUpdateschema.safeParse(body);
    if (!parsePost.success) {
      return c.json({ error: "Invalid post input" }, StatusCodes.BAD_REQUEST);
    }
    const { title, description, id } = parsePost.data;

    const post = await prisma.post.findFirst({
      where: {
        id: id,
        userId: userId,
      }
    });

    if (!post) {
      return c.json({ error: "Post not found or you don't have permission to update it" }, StatusCodes.NOT_FOUND);
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: id,
      },
      data: {
        title: title,
        description: description,
      },
    });

    return c.json({ post: updatedPost, message: "updated post" }, StatusCodes.OK);
  } catch (e) {
    return c.json(
      { error: `Error updating post.${e}` },
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

export async function getPostById(c: Context) {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const rawId = c.req.param("id");
    const id = Number(rawId);

    if (isNaN(id)) {
      return c.json({ error: "Invalid ID" }, 400);
    }

    const post = await prisma.post.findUnique({
      where: {
        id,
      },
	  include:{
		User:true
	  }
    });
    if (!post) {
      return c.json({ msg: "Post not found" }, StatusCodes.NOT_FOUND);
    }

    return c.json(post);
  } catch (e) {
    return c.json(
      { error: `Error retrieving post.${e}` },
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

export async function getAllPosts(c: Context) {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const getpost = await prisma.post.findMany({
      include: {
        User: true,
      },
    });

    return c.json(getpost);
  } catch (e) {
    return c.json(
      { error: `Error retrieving post.${e}` },
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
