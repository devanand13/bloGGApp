import { useEffect, useState } from "react"
import axios from "axios";
import { BACKEND_URL } from "../config";

interface User{
    id:number,
    name: string,
    password: string,
    email: string,
    username: string
}

export interface Blog{
    id: number,
    title: string,
    content: string,
    author : User,
    publishedDate: string
}

export const useBlog = ({id}:{id:string  })=>{
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(()=>{
        const request =  axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers:{
                "Authorization":localStorage.getItem("token")
            }
        }).then((res)=>{
             setBlog(res.data);
             setLoading(false)
        })
        console.log(request)
    },[id])
    return {
        loading,
        blog
    }
}

export const useBlogs =  () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(()=>{
        const request =  axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers:{
                "Authorization":localStorage.getItem("token")
            }
        }).then((res)=>{
             setBlogs(res.data);
             setLoading(false)
        })
        console.log(request)
    },[])
    return {
        loading,
        blogs
    }
}