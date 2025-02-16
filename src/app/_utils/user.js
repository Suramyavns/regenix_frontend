'use client'

import { useRouter } from "next/navigation"
import { auth } from "../../../Firebase"

const router = useRouter()
export const handleLogout = () => {
    signOut(auth)
    .then(()=>{
        router.replace('/')
    })
    .catch((e)=>{alert(e)})
}