'use client'
import { useEffect, useState } from "react"
import { getWeather } from "./_utils/weather"
import { getSuggestion } from "./_utils/nlp"
import { BeatLoader } from "react-spinners"
import { redirect, useRouter } from "next/navigation"
import { auth, db } from "../../../Firebase"
import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore"

export const  TaskSuggestion = ({inspecting}) => {

    const [suggestion, setSuggestion] = useState(null)
    const [loading,setLoading]=useState(true);
    const [file, setFile] = useState(null);
    const [image,setImage]=useState(null);
    const [matches,setMatches]=useState(null);
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

    const handleFileChange = (event) => {
        setMatches(null);
        const selectedFile = event.target.files[0];
        if (selectedFile) {
          setImage(URL.createObjectURL(selectedFile));
          setFile(selectedFile);
        }
      };

      const getScore = (numDays) => {
        if(numDays<=1){
            return 20;
        }
        else if(numDays<=7){
            return 12
        }
        else if(numDays<=31){
            return 8;
        }
        else{
            return -5;
        }
      }

      const getMedal = (numDays) => {
        if(numDays<=1){
            return 'gold';
        }
        else if(numDays<=7){
            return 'silver'
        }
        else{
            return 'bronze'
        }
      }
    
      const handleReview = async () => {
        if (!file || !suggestion) return;
        const formData = new FormData();
        formData.append('image', file);
        formData.append('description', suggestion.description);
        setLoading(true);
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/process`, {
            method: 'POST',
            body: formData,
          });
          console.log(response);
          
          const result = await response.json();
          if(result.match){
            setMatches(true);
            const timeTaken = Math.abs(new Date()-new Date(suggestion.date))
            const daysTaken = Math.floor(timeTaken/(1000*60*60*24));
            const userId = JSON.parse(localStorage.getItem('user')).uid;
            const q = query(collection(db,'tasks'),where('date','==',new Date().toDateString()),where("user","==",userId))
            const filteredTasks = (await getDocs(q)).docs;
            const todaysTaskRef = filteredTasks[0].ref;
            await updateDoc(todaysTaskRef,{
                ...suggestion,
                status:true,
                medal:getMedal(daysTaken)
            })
            const q2 = query(collection(db,'scores'),where('userid','==',userId));
            const scores = (await getDocs(q2)).docs;
            const userScore = scores[0].ref;
            await updateDoc(userScore,{
                ...scores[0].data(),
                score:scores[0].data().score+getScore(daysTaken)
            })
            router.replace('/home/tasks/')
          }
          else{
            setMatches(false);
          }
        } catch (error) {
          console.error('Error:', error);
        }
        finally{setLoading(false)}
      };

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
                            <>
                            {
                                suggestion.medal && suggestion.medal.length>0?
                                <>
                                    <p className="w-full bg-gray-900 text-center text-xl p-2 rounded-xl font-bold">You have successfully implemented this task!</p>
                                    <a className="underline" href="/home/tasks">See Task list</a>
                                </>
                                :
                                <>
                                    <input 
                                        type="file" 
                                        accept="image/*" 
                                        capture="environment" 
                                        onChange={handleFileChange} 
                                        className="hidden" 
                                    />
                                    <button className="text-xl font-semibold bg-blue-500 w-full p-2 rounded-lg" onClick={() => document.querySelector('input[type=file]').click()}>Capture/Upload Image</button>
                                    {image && <img src={image} alt="Preview" className="w-40 h-40 object-cover rounded-lg" />}
                                    <button onClick={handleReview} className="w-full font-semibold p-2 text-xl flex justify-center items-center rounded-lg bg-green-500">
                                        Submit Review
                                    </button>
                                    {
                                        matches!==null &&
                                        <p className={`w-full text-xl p-2 rounded-xl font-bold ${matches?'bg-green-500':'bg-red-500'}`}>
                                            {matches===true?"Congratulations! You've successfully completed this task!":"The uploaded image does not match the description"}
                                        </p>
                                    }
                                </>
                                
                            }
                            </>
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