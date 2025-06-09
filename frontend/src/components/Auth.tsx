import { useState, type ChangeEvent } from "react"
import {Link} from "react-router-dom"
import axios from 'axios';
import { BACKEND_URL } from "../config";
import {useNavigate} from "react-router-dom"

export const Auth = ({type} : {type : "signup" | "signin"})=>{
    const navigate = useNavigate()
    const [postInputs,setPostInputs ] = useState({
        name:"",
        email:"",
        password:"",
        username:""
    })

    async function sendRequest(){
        
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type=="signin" ? "signin":"signup"}`, postInputs,{
                headers:{
                    'Content-Type':'application/json'
                }
            })
            const jwt = await response.data;
            localStorage.setItem("token", jwt)
            navigate("/")
        }catch(e){
            //  Alert user that error happened
        }
        
    }

    return <div className="h-screen flex flex-col justify-center">
        <div className="flex justify-center flex-col items-center">
            <div className="px-10">
                <div className="font-extrabold text-3xl">
                    { type == "signin" ? "Welcome back!" : "Create an account"}
                </div>
                <div className="text-slate-400 pt-3">
                    {type == "signin" ? "Don't have An Account?" : "Already have an account?"}  
                    <Link to={type == "signin" ? "/signup" : "/signin"} className="pl-2 underline">{type=="signin" ? "Signup" : "SignIn"}</Link> 
                </div>
            </div>
            <div className="pt-4 w-md">
                {
                    type=="signin" ? null : <div className="">
                    <LabelledInput id="name" label="Name" placeholder="Please enter your name here..." onChange={(e)=>{
                        setPostInputs( values => {
                            return {
                                ...values,
                                name:e.target.value
                            }
                        })
                    }}/>
                </div>
                }
                {
                    type=="signin" ? null : <div className="">
                    <LabelledInput id="username" label="Username" placeholder="Please enter your preffered username name here..." onChange={(e)=>{
                        setPostInputs( values => {
                            return {
                                ...values,
                                username:e.target.value
                            }
                        })
                    }}/>
                </div>
                }
                <div className="">
                    <LabelledInput id="email" label="Email" placeholder="Please enter your email here..." onChange={(e)=>{
                        setPostInputs( values => {
                            return {
                                ...values,
                                email:e.target.value
                            }
                        })
                    }}/>
                </div>
                <div className="">
                    <LabelledInput id="password" label="Password" placeholder="Please enter your password here..." type="password" onChange={(e)=>{
                        setPostInputs( values => {
                            return {
                                ...values,
                                password:e.target.value
                            }
                        })
                    }}/>
                </div>
                <div className="pt-5">
                <button className="bg-neutral-900 hover:bg-slate-700 text-white w-full font-bold py-2 px-4 rounded cursor-pointer" onClick={async function(){ await sendRequest() }}>
                    {type=="signin" ? "Sign in" : "Sign up "}
                </button>
                </div>
            </div>
            
            
        </div>
    </div>
}

interface LabelledInputType { 
    label :string,
    placeholder : string,
    onChange : (e:ChangeEvent<HTMLInputElement>)=>void,
    type?: string ,
    id: string
}

function LabelledInput({ label, placeholder, onChange, type, id} : LabelledInputType){
    return <div>
        <div>
            <label  className="block mb-2 text-md font-semibold  text-black-900 pt-4">{label}</label>
            <input onChange={onChange} type = {type || "text"}id={id} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
        </div>
    </div>
}