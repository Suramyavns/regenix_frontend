'use client'
import { signOut } from "firebase/auth";
import { auth } from "../../../../Firebase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GridLoader } from "react-spinners";
import WeatherBoard from "../../_components/WeatherBoard";
import UserScore from "../../_components/UserScore";
import AQIBoard from "../../_components/AQIBoard";
import { TaskSuggestion } from "../../_components/Suggestion";

export default function Page() {
    const router = useRouter()
    const [loading,setLoading]=useState(true);
    const [user,setUser]=useState(auth.currentUser);

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user'))||auth.currentUser
        if(user){
            setUser(user);
            setLoading(false);
        }
    },[])

    return (
        <div className="h-full mb-4 w-full flex flex-col justify-center items-center">
            {
                loading?
                <GridLoader color="gray" />
                :
                <div className="h-full py-4 gap-6 flex flex-col w-11/12 items-center">
                    <WeatherBoard />
                    <div className="w-full sm:w-2/3 flex justify-around">
                        <UserScore />
                        <AQIBoard />
                    </div>
                    <TaskSuggestion inspecting={false}/>
                </div>
            }
        </div>
    );
}