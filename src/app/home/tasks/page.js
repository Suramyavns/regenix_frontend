'use client'

import { useState } from "react";
import { FaCaretSquareDown, FaCaretSquareLeft, FaCaretSquareUp, FaMedal } from "react-icons/fa";

export default function Page() {
    const tasks = [
        {
            title:"Task 1",
            status:0,
            medal:null,
            description:'description 1'
        },
        {
            title:"Task 2",
            status:1,
            medal:"silver",
            description:'description 2'
        },
        {
            title:"Task 3",
            status:1,
            medal:'gold',
            description:'description 3'
        },
        {
            title:"Task 4",
            status:0,
            medal:null,
            description:'description 4'
        },
    ]

    const [extending,setExtending]=useState(null)

    const handleInspect = (index) => {
        console.log(tasks[index].title)
    }

    return (
        <div className="h-full w-11/12 flex flex-col gap-6 p-2">
            <div className="flex flex-col gap-4">
                <p className="text-2xl font-bold">Ongoing Tasks</p>
                {
                    tasks.filter((task)=>task.status===0)
                    .map((ongoingTask,index)=>{
                        return(
                            <div className="w-full shadow-box flex justify-between items-center bg-white dark:bg-gray-700 p-3 text-xl rounded-lg" key={index}>
                                <p className="font-semibold">{ongoingTask.title}</p>
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
                    tasks.filter((task)=>task.status===1)
                    .map((completedTask,index)=>{
                        return(
                            <div className="w-full shadow-box flex-wrap flex justify-between items-center bg-white dark:bg-gray-700 p-3 text-xl rounded-lg" key={index}>
                                <p className="font-semibold">{completedTask.title}</p>
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
        </div>
    );
}