import { Quote } from "../components/quote";
import { Auth } from "../components/Auth";

export  function Signin(){
    return <>
    <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
            <Auth type="signin"></Auth>
        </div>
        <div className="invisible md:visible">
            <Quote/>
        </div>
        
    </div>
        
    </>
}