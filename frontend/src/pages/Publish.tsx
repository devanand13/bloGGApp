import { useState, type ChangeEvent } from "react"
import { AppBar } from "../components/AppBar"
import axios from "axios";
import { BACKEND_URL } from "../config";
import {useNavigate} from "react-router-dom";

export const Publish = ()=>{
    const [publishInputs, setPublishInputs] = useState({
        title : "",
        content: ""
    })
    const navigate = useNavigate();

    return <div>
                <AppBar/>
                <div className="flex justify-center">
                <div className="flex  flex-col pt-8 w-2xl">
                    <div className="w-2xl max-w-screen bg-red-200">
                        <textarea 
                        onChange={(e)=>{
                            setPublishInputs(values=>{
                                return {
                                    ...values,
                                    title:e.target.value
                                }
                            });
                        }}
                        id="message" 
                        className=" block p-2.5 w-full text-sm text-gray-900 bg-gray-50 " 
                        placeholder="Title"></textarea>
                    </div>
                    <TextEditor onChange = {(e)=>{
                        setPublishInputs(values=>{
                            return {
                                ...values,
                                content: e.target.value
                            }
                        })
                    }}/> 
                    <button
                        onClick={async ()=>{
                            if(publishInputs.title.trim()=="" || publishInputs.content.trim()==""){
                                alert(`${publishInputs.title.trim()=="" ? "Title field ":"Content field "} empty`)
                                return 
                            }
                            const response = await axios.post(`${BACKEND_URL}/api/v1/blog`,publishInputs,{
                                headers:{
                                    "Authorization":localStorage.getItem("token")
                                }
                            })
                            navigate(`/blog/${response.data.id}`)
                        }}
                        type="submit" 
                        className="flex justify-center items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                    >
                        Publish
                    </button>
                </div>
                </div>
                
            </div>

}

const TextEditor = ({onChange}:{onChange:(e:ChangeEvent<HTMLTextAreaElement>)=>void}) => {
    return (
        <div className="pt-2">
            <form>
                <div className="w-full max-w-screen mb-4 rounded-lg bg-gray-50">
                    <div className="">
                        <label className="sr-only">Publish post</label>
                        <textarea 
                            onChange={onChange}
                            className="min-h-[300px] block w-full px-0 text-sm text-gray-800 resize-none overflow-hidden" 
                            placeholder="Write an article..." 
                            required 
                            rows={1} // To ensure it starts with at least 1 row
                        ></textarea>
                    </div>
                </div>
                
            </form>
        </div>
    );
}
