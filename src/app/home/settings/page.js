'use client'

import { useRouter } from "next/navigation"
import { auth } from "../../../../Firebase"
import { signOut } from "firebase/auth"

export default function Page() {
    const router = useRouter()
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
        <div className="h-full w-11/12">
            <button onClick={handleLogout} className="p-2 text-2xl rounded-lg w-full bg-slate-700">
                Logout
            </button>
        </div>
    );
}