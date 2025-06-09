import { useNavigate } from "react-router-dom"
export const UserMenu = () => {
    const navigate = useNavigate();

    return <div className="flex flex-col absolute top-18 right-6 rounded border-2 border-slate-500 font-bold font-serif">
        <ul className="flex flex-col  bg-slate-500">
            <li className="border-b border-slate-600 px-7 py-2 cursor-pointer hover:bg-slate-400 text-white">Profile</li>
            <li className="border-b border-slate-600 px-7 py-2 cursor-pointer hover:bg-slate-400 text-white">Settings</li>
            <li className="border-b border-slate-600 px-7 py-2 cursor-pointer hover:bg-slate-400 text-white" onClick={()=>{
                localStorage.removeItem("token")
                navigate('/signin')
            }}>Logout</li>
        </ul>
    </div>
}