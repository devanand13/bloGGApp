import {Link} from "react-router-dom";

export interface blogCardProps{
    id:number,
    authorName : string,
    title : string,
    content : string,
    publishedDate: string
}

import { Avatar } from "./Avatar"
export function BlogCard({
    id,
    authorName, 
    title,
    content,
    publishedDate
} : blogCardProps){
    return <Link to={`/blog/${id}`}>
        <div className="p-2 border-b-1 border-slate-400 min-w-2xl cursor-pointer">
            <div className="flex">
                <div className=" flex justify-center flex-col">
                    <Avatar size = "small" name={authorName}/>
                </div>
                <div className="font-extralight text-sm ml-1 flex justify-center flex-col">
                    {authorName}
                </div>
                <div className="px-1 flex justify-center flex-col">
                    <Circle/>
                </div>
                <div className="text-sm text-slate-400 flex justify-center flex-col">
                    { publishedDate } 
                </div>
            </div>
            <div className="pt-2 text-2xl font-bold">
                {title}
            </div>
            <div className="font-thin">
                {content.slice(0,200) + "... "}
            </div>
            <div className="text-slate-400 text-sm font-thin">
                {`${Math.ceil(content.length/100)} minute(s)`}
            </div>
        </div>
    </Link>
}



export function Circle(){
    return <div className="h-1 w-1 rounded-full dark:bg-gray-600"> 

    </div>
}