import { Avatar } from "./Avatar"
import {Link } from "react-router-dom";

export function AppBar(){
    return <div className="border-b justify-between flex px-10 py-4 ">
        <Link to="/blog">
            <div className="text-2xl cursor-pointer">
                Medium
            </div>
        </Link>
        <div className="flex">
            <div className="pr-10 ">
                <Link to="/publish">
                    <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 cursor-pointer font-medium rounded-3xl text-sm px-5 py-2.5 me-2 mb-2 ">New</button>
                </Link>
                
            </div>
            <Avatar size= {"big"} name={"A"}></Avatar>
        </div>
    </div>
}