'use client'
import {useSession, signIn} from 'next-auth/react'
import React, {SyntheticEvent, useState, useEffect} from "react";
import {useRouter} from 'next/navigation'

export default function Home() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const {data: session} = useSession();
    const router = useRouter();

    async function handleSubmit(e: SyntheticEvent) {
        e.preventDefault()
        const result = await signIn('credentials', {
            email,
            password,
            redirect: false
        })

        if (result?.error) {
            console.log(result)
            return
        }
        router.push('/account')
    }
    useEffect(() => {
        if (session) {
            router.push('/account');
        }
    }, [session, router]);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Welcome</h1>
            <form className="flex flex-col" onSubmit={handleSubmit}>
                <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Digite seu email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 p-2 w-full border rounded-md"
                />

                <label htmlFor="password" className="block text-sm font-medium text-gray-600">password</label>
                <input
                    autoComplete="current-password"
                    type="password"
                    name="password"
                    placeholder="Digite uma password.."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 p-2 w-full border rounded-md"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-2 py-2 mb-2 rounded-md mx-auto block w-3/4 sm:w-1/2 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                >
                    Sign In
                </button>

            </form>

            <button
                onClick={() => signIn('google')}
                className="bg-blue-500 text-white px-2 py-2 mb-2 rounded-md mx-auto block w-3/4 sm:w-1/2 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
                GOOGLE WITH GOOGLE
            </button>
        </div>
    );
}