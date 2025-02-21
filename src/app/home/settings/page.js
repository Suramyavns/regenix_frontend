'use client'

import { useRouter } from "next/navigation"
import { auth } from "../../../../Firebase"
import { signOut } from "firebase/auth"
import { FaCaretSquareUp, FaCaretSquareDown } from "react-icons/fa"
import { useState } from "react"

export default function Page() {
    const router = useRouter()

    const [extending,setExtending]=useState(null);

    const handleLogout = () => {
        sessionStorage.clear()
        localStorage.clear();
        signOut(auth)
        .then(()=>{
            router.replace('/')
        })
        .catch((e)=>{alert(e)})
    }
    return (
        <div className="h-full py-4 w-11/12 flex flex-col justify-between items-center">
            <div className="w-full bg-gray-600 p-2 rounded-xl flex flex-col gap-2">
                <div className="bg-slate-700 p-4 rounded-lg">
                    <span className="flex justify-between items-center">
                        <p className="font-bold text-2xl">About Us</p>
                        {
                            extending && extending===1?
                            <button onClick={()=>{setExtending(null)}}>
                                <FaCaretSquareUp className="text-slate-500 dark:text-gray-200" size={32} />
                            </button>
                            :
                            <button onClick={()=>{setExtending(1)}}>
                                <FaCaretSquareDown className="text-slate-500 dark:text-gray-200" size={32} />
                            </button>
                        }
                    </span>
                    {
                        extending && extending===1 && 
                        <div className="w-full p-2 text-left">
                            <p className="text-lg">A sustainable guidance app created for India Gateway Project 2024-25 @Christ University, Banglore</p>
                            <a className="text-lg underline" href="https://www.christuniversity.in">Christ University Website</a>
                            <a className="text-lg underline" href="https://www.thws.de">THWS Website</a>
                            <p className="text-xl font-bold py-4">Development Team</p>
                            <img src="/images/team.png" />
                        </div>
                    }
                </div>
                <div className="bg-slate-700 p-4 rounded-lg">
                    <span className="flex justify-between items-center">
                        <p className="text-2xl font-bold">Help and Support</p>
                        {
                            extending && extending===2?
                            <button onClick={()=>{setExtending(null)}}>
                                <FaCaretSquareUp className="text-slate-500 dark:text-gray-200" size={32} />
                            </button>
                            :
                            <button onClick={()=>{setExtending(2)}}>
                                <FaCaretSquareDown className="text-slate-500 dark:text-gray-200" size={32} />
                            </button>
                        }
                    </span>
                    {
                        extending && extending===2 && 
                        <div className="w-full p-2 text-left">
                            <p className="text-lg">
                                <b>Contact : </b>
                                <a className="underline" href="mailto::sdidwania645@gmail.com">here</a>
                            </p>
                        </div>
                    }
                </div>
            </div>
            <button onClick={handleLogout} className="p-2 text-2xl rounded-lg w-full bg-slate-700">
                Logout
            </button>
        </div>
    );
}