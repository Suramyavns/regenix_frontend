'use client'
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { auth } from '../../../Firebase';
import { GridLoader } from 'react-spinners';
import { addDoc,collection } from 'firebase/firestore';
import { db } from '../../../Firebase';

const SignupForm = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmation, setConfirmation] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Handle email/password signup
    const handleEmailSignUp = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (!email || !password) {
                throw new Error('Please fill in all fields');
            }
            if (password.length < 8) {
                throw new Error('Password must be at least 8 characters long');
            }
            if (password !== confirmation) {
                throw new Error('Passwords do not match');
            }

            const registered = await createUserWithEmailAndPassword(auth, email, password);
            const loggedin = await signInWithEmailAndPassword(auth,email,password)
            if (registered.user && loggedin.user) {
                makeUserScore(registered.user.uid);
                router.replace('/');
            }
        } catch (error) {
            setError(error.message || 'An error occurred during signup');
        } finally {
            setLoading(false);
        }
    };

    const makeUserScore = async(uid) => {
        const data = {
            score:650,
            userid:uid
        }
        const docRef = await addDoc(collection(db,'scores'),data);
        if(docRef){
            return;
        }
    }

    // Handle Google sign-in
    const handleGoogleLogin = async () => {
        setError('');
        setLoading(true);

        try {
            const provider = new GoogleAuthProvider();
            provider.setCustomParameters({
                prompt: 'select_account'
            });

            const result = await signInWithPopup(auth, provider);
            
            if (result.user) {
                makeUserScore(result.user.uid);
                router.replace('/');
            }
        } catch (error) {
            console.error('Google sign-in error:', error);
            
            if (error.code === 'auth/popup-blocked') {
                setError('Please allow popups for this website');
            } else if (error.code === 'auth/cancelled-popup-request') {
                setError('Sign-in was cancelled');
            } else {
                setError('Failed to sign in with Google. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex flex-col p-10 gap-4 w-5/6 sm:w-1/2 xl:1/3 h-fit shadow-box rounded-3xl'>
            {loading ? (
                <div className="flex justify-center items-center">
                    <GridLoader color='white' />
                </div>
            ) : (
                <>
                    <h1 className='text-4xl font-bold'>Register</h1>
                    {error && (
                        <div className="bg-red-500 text-white p-3 rounded-lg">
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleEmailSignUp} className='h-full flex flex-col gap-4'>
                        <label className='text-xl font-semibold'>Email</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='rounded-lg p-2 focus:outline-none'
                            type='email'
                            required
                        />
                        <label className='text-xl font-semibold'>Password</label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='rounded-lg p-2 focus:outline-none'
                            type='password'
                            required
                            minLength={8}
                        />
                        <label className='text-xl font-semibold'>Confirm Password</label>
                        <input
                            value={confirmation}
                            onChange={(e) => setConfirmation(e.target.value)}
                            className='rounded-lg p-2 focus:outline-none'
                            type='password'
                            required
                        />
                        <button
                            type="submit"
                            className='bg-blue-500 w-full p-2 rounded-lg text-xl font-semibold my-2 hover:bg-blue-600 transition-colors'
                        >
                            Sign Up
                        </button>
                    </form>
                    <div className='w-full flex gap-4 flex-col items-center justify-center'>
                        <button
                            onClick={handleGoogleLogin}
                            className='bg-gray-700 w-full p-2 rounded-lg text-xl font-semibold hover:bg-gray-800 transition-colors'
                        >
                            Continue with Google
                        </button>
                        <button
                            onClick={() => router.push('/auth/login')}
                            className='bg-green-700 w-full p-2 rounded-lg text-xl font-semibold hover:bg-green-800 transition-colors'
                        >
                            Sign In Instead
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default SignupForm;