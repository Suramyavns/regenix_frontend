'use client'
import { useEffect, useState } from "react"
import { auth } from "../../../Firebase"
import { redirect, usePathname } from "next/navigation";
import { BeatLoader } from "react-spinners";

export default function Header(){
    const [title,setTitle]=useState(usePathname());
    const [loading,setLoading]=useState(true);
    const [user,setUser]=useState(auth.currentUser);
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user'))||auth.currentUser
        if(user){
            setUser(user);
            setLoading(false);
        }
    },[])
    return(
        <div className="w-11/12 m-2 rounded-xl p-3 flex justify-between items-center border-2 border-slate-600 dark:bg-gray-700">
            <p className="text-2xl font-semibold">
                {title.slice(6,title.length).toLocaleUpperCase()}
            </p>
            {
                loading?
                <BeatLoader color="gray" />
                :
                <img src={user.photoURL??`https://robohash.org/${user.email}`} className="w-12 border-2 rounded-full dark:border-white border-slate-600" />
            }
        </div>
    )
}