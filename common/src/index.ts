import {z} from 'zod';

export const signupschema=z.object({
    username:z.string().min(3),
    email:z.string().email(),
    password:z.string().min(6)
})

export const signinschema=z.object({
    email:z.string().email(),
    password:z.string().min(6)
})


export const postInputschema=z.object({
    title:z.string(),
    description:z.string(),
})


export const postUpdateschema=z.object({
    title:z.string(),
    description:z.string(),
    id:z.number()
})



export type UpdatePostInput = z.infer<typeof postUpdateschema>;
export type SignInInput = z.infer<typeof signinschema>;
export type PostInput = z.infer<typeof postInputschema>;
export type SignUpInput = z.infer<typeof signupschema>;