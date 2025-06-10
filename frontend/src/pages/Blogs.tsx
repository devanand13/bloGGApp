import { BlogCard } from "../components/BlogCard"
import { AppBar } from "../components/AppBar"
import { useBlogs } from "../hooks"
import { convertDateString } from "../utils/Date";
import { BlogSkelton } from "../components/BlogSkelton";

export function Blogs(){
    const {loading, blogs} = useBlogs();
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
                            />
                        })
                    }
                </div>
                </div>
                
        </div>
}
