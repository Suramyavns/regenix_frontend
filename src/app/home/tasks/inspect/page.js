'use client'
import { TaskSuggestion } from "../../../_components/Suggestion";
import { useEffect, useState } from "react";
import { GridLoader } from "react-spinners";

export default function Page() {

    const [inspectingTask,setInspectionTask]=useState()
    const [loading,setLoading]=useState(true);
    useEffect(()=>{
        const inspecting = JSON.parse(sessionStorage.getItem('inspecting'));
        setInspectionTask(inspecting)
        setLoading(false);
    },[])
    return (
        <div className="h-full w-11/12 flex flex-col py-2 items-center">
            {
                loading?
                <GridLoader color="gray" />
                :
                <TaskSuggestion inspecting={true} />
            }
        </div>
    );
}
