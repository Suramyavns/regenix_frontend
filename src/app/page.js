'use client'
import { useRouter } from "next/navigation";
import { app, auth } from "../../Firebase";
import { Spinner } from "@chakra-ui/react";
import { useEffect } from "react";
import { GridLoader } from "react-spinners";

export default function Page() {
  const router = useRouter();
  
  useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
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
      <GridLoader color="white"/>
    </div>
  );
}