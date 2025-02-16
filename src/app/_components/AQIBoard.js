'use client'
import { useEffect, useState } from "react"
import { getAQI,getAQIColor } from "../_utils/weather";
import { BeatLoader } from "react-spinners";
export default function AQIBoard(){
    const [aqiColor,setColor] = useState()
    const [aqiData,setData]=useState();
    const [loading,setLoading]=useState(true);
    async function fetchData(){
        const data = await getAQI();
        setData(data.data)
        setColor(getAQIColor(data.data.aqi))
        setLoading(false);
    }

    useEffect(()=>{
        fetchData();
    },[])

    return(
        <div
        className="w-1/3 aspect-square rounded-full p-2 flex flex-col justify-center items-center bg-slate-600 shadow-black shadow-lg">
            {
                loading?
                <BeatLoader color="gray" />
                :
                <div
                className="text-center">
                    <p style={{color:aqiColor}} className="text-4xl font-bold">
                        {aqiData?.aqi}
                    </p>
                    <p style={{color:aqiColor}}>AQI</p>
                </div>
            }
        </div>
    )
}