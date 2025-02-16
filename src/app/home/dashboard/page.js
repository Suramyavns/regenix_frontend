'use client'
import { signOut } from "firebase/auth";
import { auth } from "../../../../Firebase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GridLoader } from "react-spinners";
import WeatherBoard from "@/app/_components/WeatherBoard";
import UserScore from "@/app/_components/UserScore";
import AQIBoard from "@/app/_components/AQIBoard";

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
        const user = JSON.parse(localStorage.getItem('user'))||auth.currentUser
        if(user){
            setUser(user);
            setLoading(false);
        }
    },[])

    return (
        <div className="h-full w-full flex flex-col justify-center items-center">
            {
                loading?
                <GridLoader color="gray" />
                :
                <div className="h-full py-4 gap-6 flex flex-col w-11/12 items-center">
                    <WeatherBoard />
                    <div className="w-full flex justify-around">
                        <UserScore />
                        <AQIBoard />
                    </div>
                    <p>wilkommen {user?.displayName.toString() || user?.email.toString()}</p>
                    <button onClick={handleLogout} className="w-4/5 text-2xl p-2 bg-gray-700 rounded-xl">Logout</button>
                </div>
            }
        </div>
    );
}