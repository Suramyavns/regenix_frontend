'use client'
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { auth } from '../../../Firebase';
import { GridLoader } from 'react-spinners';

const LoginForm = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Handle email/password login
    const handleEmailLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (!email || !password) {
                throw new Error('Please fill in all fields');
            }

            const userCreds = await signInWithEmailAndPassword(auth, email, password);
            if (userCreds.user) {
                router.replace('/');
            }
        } catch (error) {
            console.error('Login error:', error);
            
            if (error.code === 'auth/invalid-credential') {
                setError('Invalid email or password');
            } else if (error.code === 'auth/user-not-found') {
                setError('No account found with this email');
            } else if (error.code === 'auth/wrong-password') {
                setError('Incorrect password');
            } else {
                setError('Failed to sign in. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

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
        <div className='flex justify-center items-center flex-col p-10 gap-4 w-5/6 sm:w-1/2 xl:1/3 h-fit shadow-box rounded-3xl'>
            {loading ? (
                <div className="flex justify-center items-center">
                    <GridLoader color='white' />
                </div>
            ) : (
                <>
                    <h1 className='text-4xl font-bold'>Login</h1>
                    {error && (
                        <div className="bg-red-500 text-white p-3 rounded-lg w-full text-center">
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleEmailLogin} className='h-full flex flex-col gap-4 w-full'>
                        <label className='text-xl font-semibold'>Email</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            type='email'
                            required
                            placeholder='Enter your email'
                        />
                        <label className='text-xl font-semibold'>Password</label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            type='password'
                            required
                            placeholder='Enter your password'
                        />
                        <button
                            type="submit"
                            className='bg-blue-500 w-full p-2 rounded-lg text-xl font-semibold my-2 hover:bg-blue-600 transition-colors disabled:opacity-50'
                            disabled={loading}
                        >
                            Sign In
                        </button>
                    </form>
                    <div className='w-full flex gap-4 flex-col items-center justify-center'>
                        <button
                            onClick={handleGoogleLogin}
                            className='bg-gray-700 w-full p-2 rounded-lg text-xl font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50'
                            disabled={loading}
                        >
                            Continue with Google
                        </button>
                        <button
                            onClick={() => router.push('/auth/register')}
                            className='bg-green-700 w-full p-2 rounded-lg text-xl font-semibold hover:bg-green-800 transition-colors'
                        >
                            Create an account
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default LoginForm;