'use client'

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Register = () => {
    const router = useRouter();
    const [data, setData] = useState({
        username: '',
        email: '',
        password: '',
        creator: false
    })
    const onClickHandler = async (e) => {
        e.preventDefault();
        await fetch(`/api/register`, {
            method: "POST",
            cache: "no-store",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        }).then(async()=>{
            const res = await signIn("credentials", {
                redirect: false,
                email: data.email,
                password: data.password,
                creator: data.creator
            });
            if(!res?.error){
                router.push('/')
                router.refresh()
            }
          }
        )
    }

    return(
        <form>
            <input type="email" placeholder="email"  value={data.email} onChange={(e) => setData({...data, email: e.target.value})}/>
            <input type="name" placeholder="name" value={data.username} onChange={(e) => setData({...data, username: e.target.value})}/>
            <input type="password" placeholder="password" value={data.password} onChange={(e) => setData({...data, password: e.target.value})}/>
            <input type="checkbox" onChange={() => setData({...data, creator: !data.creator})} /><label>Register as creator</label>
            <button onClick={(e) => {onClickHandler(e)}}>Register</button>
        </form>
    )
}

export default Register;