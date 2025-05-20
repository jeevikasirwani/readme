import { Hono } from "hono";
import { createPost, getAllPosts, getPostById,updatePostById } from "../controllers/postController";
import { authMiddleware } from "../middleware/middleware";
export const blogRouter = new Hono();

blogRouter.get('/allPosts', getAllPosts); 
blogRouter.post('/create',authMiddleware, createPost); 
blogRouter.get('/:id',authMiddleware, getPostById); 
blogRouter.put('/update',authMiddleware, updatePostById); 
