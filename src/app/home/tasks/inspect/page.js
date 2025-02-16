'use client'
import { useEffect, useState } from "react";

export default function Page() {

    const [inspectingTask,setInspectionTask]=useState()

    useEffect(()=>{
        const inspecting = JSON.parse(sessionStorage.getItem('inspecting'));
        setInspectionTask(inspecting)
    },[])
    return (
        <div className="h-full w-11/12">
            <p>
                {inspectingTask}
            </p>
        </div>
    );
}