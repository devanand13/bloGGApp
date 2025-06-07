import { Hono } from "hono";
import { decode, jwt, sign, verify } from 'hono/jwt'
import { PrismaClient } from '../generated/prisma/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

export const userRouter = new Hono<{
    Bindings:{
      DATABASE_URL: string;
      JWT_SECRET: string;
    }
  }>();


    userRouter.post('/signup',async (c)=>{
        const body = await c.req.json()
        console.log(body)
    
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate());
    
        try{
            const user = await prisma.user.create({
                data:{
                  username:body.username.toString(),
                  password:body.password.toString(),
                  name : body.name.toString(),
                  email:body.email.toString()
                }
            })
            console.log("From Signup")
            console.log(user)
        
            const jwt = await sign(user, c.env.JWT_SECRET)
            
            return c.body(jwt,200,{
                'X-Message': 'Hello!',
                'Content-Type': 'text/plain'
            })
    
        }catch(e){
            console.log(e)
            c.status(411)
            return c.text("Invalid ")
        }
  })
  
  userRouter.post('/signin',async (c)=>{
    const body = await c.req.json()
  
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
  
    try{
      const user = await prisma.user.findFirst({
        where:{
          email: body.email.toString(),
          password: body.password.toString()
        }
      })
  
      if(!user){
        return c.body("User Does not exist",403)
      }
      
      const jwt = await sign(user, c.env.JWT_SECRET);
      return c.body(jwt, 200)
    }catch(e){
      return c.body(`Unexpected error : ${e}`, 401)
    }
  })