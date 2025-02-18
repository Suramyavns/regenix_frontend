'use client'
import { redirect } from "next/dist/server/api-utils";
import { useEffect, useState } from "react";
import { getWeather } from "../_utils/weather";
import { BeatLoader } from "react-spinners";
import { FaLocationDot } from "react-icons/fa6";
import { FaWind } from "react-icons/fa";

export default function WeatherBoard(){

    const [loading,setLoading]=useState(true);
    const [weatherData,setWeatherData]=useState(null);
    const getWeatherData = async(position) => {
        const data = await getWeather(position.coords.latitude,position.coords.longitude);
        setWeatherData(data);
        setLoading(false);              
    }
    useEffect(()=>{
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position)=>{
                getWeatherData(position);
            });
        }
        else{
            alert("Provide location to continue");
        }
    },[])
    return(
        <div className="bg-orange-100 dark:bg-gray-700 rounded-lg flex justify-center items-center p-4 w-full sm:w-2/3 shadow-box">
            {
                !weatherData?
                <BeatLoader color="gray" />
                :
                <div className="w-full flex justify-evenly items-center">
                    <div className="flex flex-col justify-center items-center">
                        <img className="w-full" src={weatherData.current.condition.icon} />
                    </div>
                    <div>
                        <div className="">
                            <p className="font-bold text-xl">{weatherData.current.condition.text}, {weatherData.current.temp_c} C</p>
                            <p className="opacity-70">Feels like {weatherData.current.feelslike_c} C</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex gap-1 text-lg items-center">
                                <FaWind />
                                <p>{weatherData.current.wind_kph}</p>
                            </div>
                            <div className="flex items-center gap-1">
                                <FaLocationDot />
                                <p>{weatherData.location.name}, {weatherData.location.country}</p>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}