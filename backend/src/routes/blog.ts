import { Hono } from "hono";
import { PrismaClient, User } from "../generated/prisma/edge";
import { withAccelerate } from '@prisma/extension-accelerate'
import { logger } from "hono/logger";
import { decode, verify } from "hono/jwt";



export const blogRouter = new Hono<{
    Bindings:{
      DATABASE_URL: string;
      JWT_SECRET: string;
    },
    Variables:{
        userid: any
    }
}>()

blogRouter.use(logger())
blogRouter.use('/*', async (c, next)=>{
    const authHeader = c.req.header("Authorization") || "";
    
    try{
        const user = await verify(authHeader, c.env.JWT_SECRET);

        if(user){
            c.set("userid", user.id)
            await next()
        }else{
            c.status(403)
            return c.json({
                message:"You are not logged in!"
            })
        }
    }catch(e){
        c.status(401)
        return c.json({
            message:"Invalid token"
        })
    }
   
})

blogRouter.post('/', async (c) => {
    const body = await c.req.json();
    const token = await c.req.header("Authorization")

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    
    try{
        const userid = c.get("userid");

        const blog = await prisma.blog.create({
            data:{
                title:body.title.toString(),
                authorId:userid,
                content:body.content.toString()
            }
        })    

        return c.body(JSON.stringify(blog), 200)
    }catch(e){

        return c.body("Something went wrong!",404)
    }
})
  
blogRouter.put('/', async (c) => {
    const body = await c.req.parseBody();

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    
    try{
        const userid = c.get("userid")
        const blog = await prisma.blog.update({
            where:{
                id:Number(body.id.toString()),
                authorId:Number(userid)
            },
            data:{
                title:body.title.toString(),
                content:body.content.toString()
            }
        })    


        return c.body(JSON.stringify(blog), 200)
    }catch(e){
        return c.body("You are not allowed to do this action!",404)
    }
})
  
// todo - pagination
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    
    try{
        const blog = await prisma.blog.findMany({
            include:{
                author:true
            }
        })    
        return c.body(JSON.stringify(blog), 200)
    }catch(e){
        return c.body("Something went wrong!",401)
    }
})

blogRouter.get('/:id', async (c) => {
    const blogId = await c.req.param("id")

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    
    try{
        const blog = await prisma.blog.findFirst({
            where:{
                id:Number(blogId)
            },
            include:{
                author:true
            }
        })    

        return c.body(JSON.stringify(blog), 200)
    }catch(e){
        return c.body("Something went wrong!",404)
    }
})

blogRouter.delete('/:id', async (c)=>{
    const blogId = await c.req.param("id");

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try{
        await prisma.blog.delete({
            where:{
                id:Number(blogId)
            }
        })

        return c.body("Blog Deleted!", 200)
    }catch(e){
        return c.body(`Unable to delete blog ${blogId}`,403)
    }
})
   