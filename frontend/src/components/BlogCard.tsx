import {Link} from "react-router-dom";
import type { MouseEventHandler } from "react";

export interface blogCardProps{
    id:number,
    authorName : string,
    title : string,
    content : string,
    publishedDate: string,
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

import { Avatar } from "./Avatar"
export function BlogCard({
    id,
    authorName, 
    title,
    content,
    publishedDate,
    onClick
} : blogCardProps){
    return <div className="p-2 border-b-1 border-slate-400 min-w-2xl ">
            <div className="w-full flex place-content-between">
            <div className="flex">
                <div className=" flex justify-center flex-col cursor-pointer">
                    <Avatar size = "small" name={authorName}/>
                </div>
                <div className="font-extralight text-sm ml-1 flex justify-center flex-col cursor-pointer">
                    {authorName}
                </div>
                <div className="px-1 flex justify-center flex-col">
                    <Circle/>
                </div>
                <div className="text-sm text-slate-400 flex justify-center flex-col">
                    { publishedDate } 
                </div>
            </div>
            <div>
                <button onClick={onClick} className="bg-slate-200 border rounded-md p-1 font-semibold text-slate-500 border-2">Remove</button>
            </div>
            </div>
            <Link to={`/blog/${id}`}>
            <div className="pt-2 text-2xl font-bold cursor-pointer">
                {title}
            </div>
            <div className="font-thin cursor-pointer">
                {content.slice(0,200) + "... "}
            </div>
            <div className="text-slate-400 text-sm font-thin cursor-pointer">
                {`${Math.ceil(content.length/100)} minute(s)`}
            </div>
            </Link>
        </div>
}



export function Circle(){
    return <div className="h-1 w-1 rounded-full dark:bg-gray-600"> 

    </div>
}