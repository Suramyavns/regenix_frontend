import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect,useState } from "react"
import { db } from "../../../Firebase";
import { BeatLoader } from "react-spinners";

export default function UserScore(){

    const [userScore, setUserScore] = useState(null);
    
    const fetchUserScore = async() => {
        const user = JSON.parse(localStorage.getItem('user'));
        const q = query(collection(db,'scores'),where('userid','==',user.uid));
        const querySnapshot = await getDocs(q);
        setUserScore(querySnapshot.docs[0].data().score);
    }

    useEffect(()=>{
        fetchUserScore();
    },[])

    return(
        <div className="bg-orange-100 dark:bg-gray-700 flex flex-col justify-center items-center rounded-full p-2 w-1/3 aspect-square shadow-box">
            {
                userScore !== null ? 
                <>
                <p className="text-4xl font-bold">{userScore}</p>
                <p>Score</p>
                </>
                :
                <BeatLoader color="gray" />
            }
        </div>
    )
}