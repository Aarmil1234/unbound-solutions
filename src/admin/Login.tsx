import React, { useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const login = async () => {

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (error) {
            alert(error.message)
        } else {
            navigate("/admin/dashboard")
        }

    }

    return (

        <div className="flex justify-center items-center h-screen">

            <div className="w-80">

                <h1 className="text-2xl font-bold mb-6">
                    Admin Login
                </h1>

                <input
                    className="border p-2 w-full mb-4"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    className="border p-2 w-full mb-4"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={login}
                    className="bg-black text-white w-full p-2 rounded"
                >
                    Login
                </button>

            </div>

        </div>

    )

}

export default Login