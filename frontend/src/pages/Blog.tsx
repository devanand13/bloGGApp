import { AppBar } from "../components/AppBar";
import { FullBlog } from "../components/FullBlog";
import { useBlog, type Blog } from "../hooks"
import { useParams } from "react-router-dom";
import { BlogPageSkeleton } from "../components/BlogPageSkeleton";


export  function Blog(){
    let { id } = useParams<{ id: string }>(); 
    if(!id)
        id = "undefined"  
    
    const {blog, loading} = useBlog({id});
    if(loading){
        return <div>
            <AppBar/>
            <BlogPageSkeleton/>
        </div>
    }
    return <>
        <AppBar/>
        <FullBlog blogProps={blog}/>
    </>
}