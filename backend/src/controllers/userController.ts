import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { Context } from "hono";
import { sign } from "hono/jwt";
import {signinschema ,signupschema}  from "../../../common/src";
export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();
enum StatusCodes{
    OK = 200,
    BAD_REQUEST = 400,
    UNAUTHORISED = 401,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
}
export async function signup(c:Context)  {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  try{
    const body:{
            username : string ,
            email : string, 
            password : string
        }  = await c.req.json();
  const {username , email , password} = body;
 const parsedUser = signupschema.safeParse(body);
   if(!parsedUser.success){
            return c.json('Invalid user input', StatusCodes.BAD_REQUEST);
        }
    const user = await prisma.user.create({
      data: {
        username:username,
        email: email,
        password: password,
      },
    });
  
    const token = await sign({ id: user.id }, c.env.JWT_SECRET)
  
    return c.json({
      msg: 'User created successfully ',
      jwt: token,
        user : {
                userId : user.id,
                username : user.username,
                email : user.email
            }
            } ,StatusCodes.OK );
    
  }
  catch(e){
    return c.json(`Error creating user ${e}`, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}
  
export async function signin(c:Context) {
    const prisma = new PrismaClient({
    //@ts-ignore
        datasourceUrl: c.env?.DATABASE_URL	,
    }).$extends(withAccelerate());
try{
   const body : {
            email : string, 
            password  :string} = await c.req.json();

        const parsedUser = signinschema.safeParse(body);

        //Zod error handling
        if(!parsedUser.success){
            return c.json('Invalid user input', StatusCodes.BAD_REQUEST);
        }
        const {email , password} = body;
    const user = await prisma.user.findUnique({
        where: {
            email: email,
    password: password
        }
    });

    if (!user) {
        c.status(StatusCodes.NOT_FOUND);
        return c.json({ error: "user not found" });
    }

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({msg:  'Signed in successfully', jwt,

     user : {
                    userId : user.id,
                    username : user.username,
                    email : user.email
                }
            }, 
            StatusCodes.OK);
  }
  catch (error) {
        return c.json(`Error signing in . ${error}`, StatusCodes.INTERNAL_SERVER_ERROR);       
    }  
}