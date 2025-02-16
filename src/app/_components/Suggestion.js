'use client'
import { useEffect, useState } from "react"
import { getWeather } from "../_utils/weather"
import { getSuggestion } from "../_utils/nlp"
import { BeatLoader } from "react-spinners"

export const TaskSuggestion = () => {

    const [suggestion, setSuggestion] = useState()
    const [loading,setLoading]=useState(true);

    const fetchData = async(pos)=>{
        const data = await getWeather(pos.coords.latitude,pos.coords.longitude);
        const suggestion = await getSuggestion(data.current.condition.text,data.current.condition.temp_c);
        setSuggestion(suggestion.content)
        setLoading(false);
    }

    useEffect(()=>{
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position)=>{
                fetchData(position);
            });
        }
        else{
            alert("Provide location to continue");
            redirect('/')
        }
    },[])
    return(
        <div className="w-full rounded-xl p-3 h-fit bg-slate-600">
            <p className="opacity-80">Today's Suggestion</p>
            {
                loading?
                <div className="flex items-center justify-center">
                    <BeatLoader />
                </div>
                :
                <div className="p-2 h-full flex flex-col items-center gap-4">
                    <p className="text-lg">{suggestion}</p>
                    <button className="w-full p-2 text-xl flex justify-center items-center rounded-lg bg-slate-800">
                        Inspect
                    </button>
                </div>
            }
        </div>
    )
}