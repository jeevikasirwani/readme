import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign, verify } from "hono/jwt";
import {userRouter} from "./routes/userRouter";
import {blogRouter} from "./routes/blogRouter";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.post("/api/v1/blog/*", async (c, next) => {
  const a = c.req.header("Authorization");

  if (!a) {
    c.status(401);
    return c.json({ error: "forbidden access" });
  }
  const token = a.split("")[1];
  const payload = await verify(token, c.env.JWT_SECRET);
  if (!payload) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }
  c.set("jwtPayload", payload.id);
  await next();
});
app.route("/api/v1/user",userRouter);
app.route("/api/v1/blog",blogRouter);

export default app;
