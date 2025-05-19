import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use(async (c, next) => {
  const auth = c.req.header("Authorization");
  console.log("Authorization Header:", auth); 

  if (!auth || !auth.startsWith("Bearer ")) {
    return c.json({ error: "Unauthorized: Bearer token missing" }, 401);
  }

  const token = auth.split(" ")[1];
  console.log("Extracted Token:", token);
  try {
    const payload = await verify(token, c.env.JWT_SECRET, "HS256");

    if (!payload || typeof payload !== "object" || !("id" in payload)) {
      return c.json({ error: "Unauthorized: Invalid token payload" }, 401);
    }

    c.set("userId", (payload as { id: string }).id);
    await next();
  } catch (err) {
    console.error("JWT Verify Error:", err); 
    return c.json(
      { error: "Unauthorized: Invalid token", detail: (err as Error).message },
      401
    );
  }
});


blogRouter.post("/", async (c) => {
  const userId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const post = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: userId,
    },
  });
  return c.json({
    id: post.id,
  });
});

blogRouter.put("/", async (c) => {
  const userId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  prisma.post.update({
    where: {
      id: body.id,
      authorId: userId,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });

  return c.text("updated post");
});

blogRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
  });
  return c.json(post);
});
