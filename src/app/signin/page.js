'use client'

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";


export default function SignIn(){
    const router = useRouter();
    const [data, setData] = useState({
        email: '',
        password: '',
    })

    
    const onClickHandler = async (e) => {
        e.preventDefault();
        // const res = await signIn("credentials", {
        //     redirect: false,
        //     email: data.email,
        //     password: data.password,
        // });
        // if(!res?.error){
        //     router.refresh();
        //     router.push('/');
        //     router.refresh();
        // }
        // console.log(res)
        signIn("credentials", { email: data.email, password: data.password, redirect: false })
            .then(({ ok, error }) => {
                if (ok) {
                    router.push('/');
                    router.refresh();
                } else {
                    console.log(error)
                    toast("Credentials do not match!", { type: "error" });
                }
        })
    }

    return(
        <form>
            <input type="email" placeholder="email"  value={data.email} onChange={(e) => setData({...data, email: e.target.value})}/>
            <input type="password" placeholder="password" value={data.password} onChange={(e) => setData({...data, password: e.target.value})}/>
            <button onClick={(e) => {onClickHandler(e)}}>Sign In</button>
        </form>
    )
}