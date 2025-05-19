import { Hono } from "hono";
import { createPost, getAllPosts, updatePostById } from "../controllers/postController";
import { authMiddleware } from "../middleware/middleware";
export const blogRouter = new Hono();

// blogRouter.get('/allPosts', getAllPosts); 

blogRouter.post('/create',authMiddleware, createPost); 
blogRouter.get('/:id',authMiddleware, getAllPosts); 
blogRouter.put('/update',authMiddleware, updatePostById); 
