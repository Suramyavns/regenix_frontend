'use client'
import { useEffect, useState } from "react"
import { auth } from "../../../Firebase"
import { redirect } from "next/navigation";
import { BiMenu } from "react-icons/bi";
import { BeatLoader } from "react-spinners";

export default function Header(){
    const [loading,setLoading]=useState(true);
    const [user,setUser]=useState(auth.currentUser);
    useEffect(() => {
        const user = auth.currentUser;
        if(user){
            setUser(user);
            setLoading(false);
        }
        else{redirect('/')}
    },[])
    return(
        <div className="w-11/12 m-2 rounded-xl p-3 flex justify-between items-center border-2 border-slate-600 dark:bg-gray-700">
            <button>
                <BiMenu className="text-slate-600 dark:text-yellow-50 rounded-full" size={40}/>
            </button>
            <p className="text-2xl font-semibold">Regenix</p>
            {
                loading?
                <BeatLoader color="gray" />
                :
                <img className="w-12 border-2 rounded-full dark:border-white border-slate-600" src={user.photoURL??`https://robohash.org/${user.email}`} />
            }
        </div>
    )
}