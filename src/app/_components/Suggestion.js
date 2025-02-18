'use client'
import { useEffect, useState } from "react"
import { getWeather } from "../_utils/weather"
import { getSuggestion } from "../_utils/nlp"
import { BeatLoader } from "react-spinners"
import { redirect, useRouter } from "next/navigation"
import { auth, db } from "../../../Firebase"
import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore"

export const  TaskSuggestion = ({inspecting}) => {

    const [suggestion, setSuggestion] = useState(null)
    const [loading,setLoading]=useState(true);
    const router = useRouter();

    const setInspectingTask = () => {
        sessionStorage.setItem('inspecting',JSON.stringify(suggestion))
        redirect('/home/tasks/inspect');
    }

    const handleAccept = async() => {
        setLoading(true);
        const suggestionData = {
            title:"Title 1",
            date:suggestion.date,
            description:suggestion.suggestion,
            medal:'',
            status:false,
            user:auth.currentUser.uid,
            accepted:true
        }
        try {
            setSuggestion(suggestion)
            localStorage.setItem('suggestion',JSON.stringify(suggestionData));
            const docRef = await addDoc(collection(db,'tasks'),suggestionData);
            router.replace('/home/tasks')
        } catch (error) {
            console.log(error);
        }
        finally{
            setLoading(false);
        }
    }

    const fetchData = async(pos)=>{
        const data = await getWeather(pos.coords.latitude,pos.coords.longitude);
        const userId = JSON.parse(localStorage.getItem('user')).uid;
        const q = query(collection(db,'tasks'),where('date','==',new Date().toDateString()),where("user","==",userId))
        const filteredTasks = (await getDocs(q)).docs;

        if(filteredTasks && filteredTasks.length && filteredTasks[0].data().date===new Date().toDateString()){
            setSuggestion(filteredTasks[0].data());
        }
        else{
            const suggestion = await getSuggestion(data.current.condition.text,data.current.condition.temp_c);
            const dt = new Date();
            const todaysSuggestion = {
                suggestion:suggestion.content,
                date:dt.toDateString()
            }
            setSuggestion(todaysSuggestion)
            localStorage.setItem('suggestion',JSON.stringify(todaysSuggestion))
        }
        setLoading(false);
    }

    useEffect(()=>{
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position)=>{
                if(!suggestion){
                    fetchData(position);
                }
            });
        }
        else{
            alert("Provide location to continue");
            redirect('/')
        }
    },[])
    return(
        <div className="shadow-box w-full sm:w-3/4 rounded-xl p-3 h-fit bg-orange-100 dark:bg-slate-600">
            <p className="opacity-80">Today's Suggestion</p>
            {
                loading?
                <div className="flex items-center justify-center">
                    <BeatLoader />
                </div>
                :
                <div className="p-2 h-full flex flex-col items-center gap-4">
                    <p className="text-lg">{suggestion.suggestion||suggestion.description}</p>
                    <p className="text-sm opacity-80 text-right w-full">As on {suggestion.date}</p>
                    {
                        inspecting?
                        <>
                        {
                            suggestion.title && suggestion.title.length>0?
                            <button className="w-full p-2 text-xl flex justify-center items-center rounded-lg bg-slate-800">
                                Submit Review
                            </button>
                            :
                            <div className="grid grid-cols-2 text-lg font-semibold w-full gap-2">
                                <button onClick={handleAccept} className="bg-green-500 rounded-lg p-2">Accept</button>
                                <button className="bg-blue-500 p-2 rounded-lg">Personalize</button>
                            </div>
                        }
                        </>
                        :
                        <button onClick={setInspectingTask} className="w-full p-2 text-xl flex justify-center items-center rounded-lg bg-slate-800">
                            Inspect
                        </button>
                    }
                </div>
            }
        </div>
    )
}