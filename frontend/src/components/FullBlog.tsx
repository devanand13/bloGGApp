import type { Blog } from "../hooks"
import { Avatar } from "./Avatar"
import { convertDateString } from "../utils/Date"

export const FullBlog = ({blogProps}:{blogProps:Blog | undefined}) => {

    if(!blogProps){
        return <div>
            Blog Not Found!
        </div>
    }

    return <div className="flex justify-center">
            <div className="md:grid grid-cols-12 pt-20 px-20 ">
            <div className="md:col-span-8 col-span-12">
                <div className="text-4xl font-extrabold break-words">
                    {blogProps.title}
                </div>
                <div className="text-slate-500 font-thin pt-2">
                    {`Posted on ${convertDateString(blogProps.publishedDate)}`}
                </div>
                <div className="pt-8 break-words">
                    {blogProps.content} 
                </div>
            </div>
            <div className="hidden md:block md:col-span-4 ">
                <div className="text-slate-500 font-semibold">
                    Author
                </div>
                <div className="flex pt-2">
                    <div className="flex items-center">
                        <Avatar name={blogProps.author.name} size="big"/>
                    </div>
                    <div className="pl-2">
                        <div className="text-lg font-bold">
                        {blogProps.author.name}
                        </div>
                         <div className="text-sm text-slate-400">
                            Random phrase about the author's ability to catch reader's attention.
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
}