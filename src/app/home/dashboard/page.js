'use client'
import { signOut } from "firebase/auth";
import { auth } from "../../../../Firebase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function Page() {
    const router = useRouter()
    const [user,setUser]=useState(auth.currentUser);
    const handleLogout = () => {
        signOut(auth)
        .then(()=>{
            router.replace('/')
        })
        .catch((e)=>{alert(e)})
    }

    useEffect(()=>{
        const user = auth.currentUser;
        setUser(user)
    },[])

    return (
        <div className="flex flex-col justify-center items-center">
            wilkommen {user?.displayName || user?.email}
            <button onClick={handleLogout} className="w-4/5 text-2xl p-2 bg-gray-700 rounded-xl">Logout</button>
        </div>
    );
}