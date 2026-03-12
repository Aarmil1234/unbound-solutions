import { Navigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useEffect, useState } from "react";

const ProtectedRoute = ({children}:any) => {

const [session,setSession] = useState<any>(null)

useEffect(()=>{

supabase.auth.getSession().then(({data})=>{
setSession(data.session)
})

},[])

if(session === null){
return <div>Loading...</div>
}

return session ? children : <Navigate to="/admin/login"/>

}

export default ProtectedRoute