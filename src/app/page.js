'use client'
import { useRouter } from "next/navigation";
import { app, auth } from "../../Firebase";
import { useEffect, useState } from "react";
import { GridLoader } from "react-spinners";

export default function Page() {
  const router = useRouter();
  const [user,setUser]=useState(null)
  useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
      setUser(user)
      if(user){
        router.replace('/home/dashboard')
      }
      else{
        router.replace('/auth/login')
      }
    })
  },[])
  return (
    <div className="w-full h-full flex justify-center items-center">
      <GridLoader color="gray"/>
    </div>
  );
}