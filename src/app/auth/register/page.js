'use client'
import { useState } from "react";
import LoginForm from "../../_components/LoginForm";
import SignupForm from "../../_components/SignupForm";
export default function Page() {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('')
    return (
    <div className="w-full flex justify-center items-center">
        <SignupForm/>
    </div>
    );
}