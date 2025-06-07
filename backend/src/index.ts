import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'
import { cors } from 'hono/cors'

const app = new Hono<{
  Bindings:{
    DATABASE_URL: string;
    JWT_SECRET: string;
  }
}>()

app.use(logger())
app.use('*', cors({
  origin: '*',
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}))

app.route('/api/v1/user',userRouter);
app.route('/api/v1/blog',blogRouter);

app.get('/', (c) => {
  return c.text('Hello Hono!')
})




export default app
