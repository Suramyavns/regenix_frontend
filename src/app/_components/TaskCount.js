import { collection, getCountFromServer, getDocs, query, where } from "firebase/firestore";
import { useEffect,useState } from "react"
import { db } from "../../../Firebase";
import { BeatLoader } from "react-spinners";

export default function TaskCount(){

    const [numTasks, setNumTasks] = useState(null);
    
    const fetchNumTasks = async() => {
        const user = JSON.parse(localStorage.getItem('user'));
        const q = query(collection(db,'tasks'),where('user','==',user.uid),where('status','==',true));
        const snapShot = await getCountFromServer(q);
        setNumTasks(snapShot.data().count)
    }

    useEffect(()=>{
        fetchNumTasks();
    },[])

    return(
        <div className="bg-orange-100 dark:bg-gray-700 flex flex-col justify-center items-center rounded-full p-2 w-1/3 aspect-square shadow-box">
            {
                numTasks !== null ? 
                <>
                <p className="text-4xl font-bold">{numTasks}</p>
                <p>Completed</p>
                </>
                :
                <BeatLoader color="gray" />
            }
        </div>
    )
}