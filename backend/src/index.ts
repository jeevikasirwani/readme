import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign, verify } from "hono/jwt";
import {userRouter} from "./routes/userRouter";
import {blogRouter} from "./routes/blogRouter";

import { cors } from 'hono/cors'



const app = new Hono();
app.use(cors())

app.get('/', (c) => c.text('You server is running! Check backend routes .'));

app.route('/api/v1/users', userRouter)
app.route('/api/v1/blog', blogRouter)


export default app

