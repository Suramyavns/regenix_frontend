'use client'
import { signOut } from "firebase/auth";
import { auth } from "../../../../Firebase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GridLoader } from "react-spinners";
export default function Page() {
    const router = useRouter()
    const [loading,setLoading]=useState(true);
    const [user,setUser]=useState(auth.currentUser);
    const handleLogout = () => {
        signOut(auth)
        .then(()=>{
            router.replace('/')
        })
        .catch((e)=>{alert(e)})
    }

    useEffect(()=>{
        const user = auth.currentUser
        if(user){
            setUser(user);
            setLoading(false);
        }
    },[])

    return (
        <div className="h-full flex flex-col justify-center items-center">
            {
                loading?
                <GridLoader color="gray" />
                :
                <>
                wilkommen {user?.displayName || user?.email}
                <button onClick={handleLogout} className="w-4/5 text-2xl p-2 bg-gray-700 rounded-xl">Logout</button>
                </>
            }
        </div>
    );
}