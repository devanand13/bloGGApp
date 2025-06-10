import { BlogCard } from "../components/BlogCard"
import { AppBar } from "../components/AppBar"
import { useBlogs } from "../hooks"
import { convertDateString } from "../utils/Date";
import { BlogSkelton } from "../components/BlogSkelton";
import axios from "axios";
import { BACKEND_URL } from "../config";

export function Blogs(){
    const {loading, blogs, setBlogs} = useBlogs();
    if(loading){
        return <div>
            <AppBar/>
            <div className="flex justify-center">
            <div className="max-w-2xl">
                <BlogSkelton/>
                <BlogSkelton/>
                <BlogSkelton/>
                <BlogSkelton/>
                <BlogSkelton/>
                <BlogSkelton/>
                <BlogSkelton/>
                <BlogSkelton/>
            </div>
            </div>
        </div>
    }

    // Just for ease of testing, remove once done
    const removeBlog = async (id:number) => {
        const res = await axios.delete(BACKEND_URL+`/api/v1/blog/${id}`,{
            headers:{
                "Authorization":localStorage.getItem("token")
            }
        });
        if(res.status==200){
            setBlogs(prevBlogs => prevBlogs.filter(blog => blog.id !== id));
        }
    };
    
    return <div className="">
                <AppBar></AppBar>
                <div className="flex justify-center">
                <div className="max-w-2xl pt-5">
                    {
                        blogs.map((blog, index) => {
                            return <BlogCard 
                                id={blog.id}
                                key={index}
                                authorName={blog.author.name}
                                content={blog.content}
                                publishedDate={convertDateString(blog.publishedDate)}
                                title={blog.title}
                                onClick = {()=>{removeBlog(blog.id)}}
                            />
                        })
                    }
                </div>
                </div>
                
        </div>
}
