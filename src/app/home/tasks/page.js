'use client'

import { collection, getDocs, doc, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FaCaretSquareDown, FaCaretSquareLeft, FaCaretSquareUp, FaMedal } from "react-icons/fa";
import { auth, db } from "../../../../Firebase";
import { GridLoader } from "react-spinners";
import { redirect } from "next/navigation";

export default function Page() {
    const [tasks,setTasks]=useState([])
    const [loading,setLoading]=useState(true)

    const [extending,setExtending]=useState(null)

    const handleInspect = (index) => {
        sessionStorage.setItem('inspecting',JSON.stringify(tasks[index]));
        redirect('/home/tasks/inspect')
    }

    const fetchTasks = async () => {
        try {
            const userID = JSON.parse(localStorage.getItem('user'))
            const q = query(collection(db,'tasks'),where('user','==',userID.uid))
            const querySnapshot = await getDocs(q);
            const filteredTasks = [];
            querySnapshot.forEach((doc)=>{
                filteredTasks.push(doc.data());
            })
            setTasks(filteredTasks)
            
        } catch (error) {
            alert(error)
        }
        finally{setLoading(false)}
    }

    useEffect(()=>{
        fetchTasks();
    },[])



    return (
        <div className="h-full w-11/12 flex flex-col gap-6 p-2">
            {
                loading?
                <div className="w-full h-full flex justify-center items-center">
                    <GridLoader color="gray" />
                </div>
                :
                <>
                <div className="flex flex-col gap-4">
                    <p className="text-2xl font-bold">Ongoing Tasks</p>
                    {
                        tasks.filter((task)=>task.status===false)
                        .map((ongoingTask,index)=>{
                            return(
                                <div className="w-full shadow-box flex justify-between items-center bg-white dark:bg-gray-700 p-3 text-xl rounded-lg" key={index}>
                                    <p className="font-semibold">{ongoingTask.description.slice(0,20)}...</p>
                                    <button onClick={()=>{handleInspect(index)}} className="bg-gray-800 p-2 rounded-md font-bold">
                                        Inspect
                                    </button>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="flex flex-col gap-4">
                    <p className="text-2xl font-bold">Completed Tasks</p>
                    {
                        tasks.filter((task)=>task.status===true)
                        .map((completedTask,index)=>{
                            return(
                                <div className="w-full shadow-box flex-wrap flex justify-between items-center bg-white dark:bg-gray-700 p-3 text-xl rounded-lg" key={index}>
                                    <p className="font-semibold">{completedTask.description.slice(0,20)}...</p>
                                    <div className="flex items-center gap-4">
                                        <FaMedal size={32} color={completedTask.medal} />
                                        {
                                            extending===index?
                                            <button onClick={()=>{setExtending(null)}}>
                                                <FaCaretSquareUp className="text-slate-500 dark:text-gray-200" size={32} />
                                            </button>
                                            :
                                            <button onClick={()=>{setExtending(index)}}>
                                                <FaCaretSquareDown className="text-slate-500 dark:text-gray-200" size={32} />
                                            </button>
                                        }
                                    </div>
                                    {
                                        extending===index && 
                                        <p className="w-full text-lg text-center p-2">
                                        {completedTask.description}
                                        </p>
                                    }
                                </div>
                            )
                        })
                    }
                </div>
                </>
            }
        </div>
    );
}