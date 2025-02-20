'use client'
import { useState,useEffect } from "react";
import { auth, db } from "../../../../Firebase";
import { BeatLoader, GridLoader } from "react-spinners";
import { IoMail } from "react-icons/io5";
import UserScore from "@/app/_components/UserScore";
import TaskCount from "@/app/_components/TaskCount";
import { collection, where, getDocs, query } from "firebase/firestore";
import { GoDotFill } from "react-icons/go";

export default function Page() {

    const [user,setUser]=useState(null);
    const [userTasks,setUserTasks]=useState(null);

    const fetchUserTask = async(user) => {
        const q = query(collection(db,'tasks'),where('user','==',user.uid),where('status','==',true));
        const filteredTasks = []
        const data = await getDocs(q);
        data.forEach((doc)=>filteredTasks.push(doc.data()));
        setUserTasks(filteredTasks);
    }

    useEffect(()=>{
        const user = auth.currentUser;
        if(user){
            setUser(user);
            fetchUserTask(user);
        };
    },[])


    return (
        <div className="h-full w-11/12 py-4">
            {
                user===null?
                <div className="h-full w-full flex justify-center items-center">
                    <GridLoader color="gray" />
                </div>
                :
                <div className="p-2 h-full w-full gap-8 flex flex-col items-center">
                    <img src={user.photoURL??`https://robohash.org/${user.email}`} className="w-24 border-2 rounded-full dark:border-white border-slate-600" />
                    <p className="w-full p-4 text-center text-3xl font-bold">
                        {user.displayName||user.email}
                    </p>
                    <div className="h-fit text-lg p-2 items-center w-full flex justify-center gap-2 rounded-xl bg-gray-700">
                        <IoMail color="white" size={24} />
                        <p>{user.email}</p>
                    </div>
                    <div className="w-full flex justify-around">
                        <UserScore />
                        <TaskCount />
                    </div>
                    <div className="p-4 flex justify-evenly items-center rounded-xl w-full">
                        {
                            userTasks===null?
                            <BeatLoader color="gray" />
                            :
                            <>
                            <div className="bg-slate-600 h-full w-1/4 p-4 rounded-xl flex flex-col justify-center items-center">
                                <GoDotFill color="gold" size={44} />
                                <p className="font-bold text-3xl">{userTasks.filter((task)=>task.medal==='gold').length}</p>
                                <p className="text-lg">Gold</p>
                            </div>
                            <div className="bg-slate-600 h-full w-1/4 p-4 rounded-xl flex flex-col justify-center items-center">
                                <GoDotFill color="silver" size={44} />
                                <p className="font-bold text-4xl">{userTasks.filter((task)=>task.medal==='silver').length}</p>
                                <p className="text-lg">Silver</p>
                            </div>
                            <div className="bg-slate-600 h-full w-1/4 p-4 rounded-xl flex flex-col justify-center items-center">
                                <GoDotFill color="brown" size={44} />
                                <p className="font-bold text-4xl">{userTasks.filter((task)=>task.medal==='silver').length}</p>
                                <p className="text-lg">Bronze</p>
                            </div>
                            </>
                        }
                    </div>
                </div>
            }
        </div>
    );
}