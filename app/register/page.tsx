"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("password did not matched");
            return;
        }

        try {
            const response = await fetch("api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                })
            })
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Registration Failed")
            }
            console.log(data);
            router.push("/login")

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div>
                <h1 className='text-center font-mono text-5xl'>Register</h1>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <input className='text-slate-100 text-sm font-medium mb-2 block' type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input className='text-slate-100 text-sm font-medium mb-2 block' type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <input className='text-slate-100 text-sm font-medium mb-2 block' type="password" placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    <div className=''>
                        <button className='flex py-3 px-4 text-sm tracking-wider font-medium rounded-md text-white bg-blue-600 hover:bg-blue-900 focus:outline-none cursor-pointer' type='submit'>Register</button>
                    </div>
                </form>
            </div>
            <div>
                <p className='text-slate-400 text-sm mt-6 text-center'>Already have an account? <a href="/login" className='text-blue-600 font-medium hover:underline ml-1'>Login here</a></p>
            </div>
        </>
    )
}

export default RegisterPage
