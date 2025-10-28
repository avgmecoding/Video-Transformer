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
            <div className="min-h-screen flex flex-col items-center justify-center bg-black text-green-400 font-mono">
            <h1 className="text-4xl md:text-5xl mb-10 font-bold tracking-widest text-neon-green drop-shadow-[0_0_10px_#00ff9d]">
                REGISTER
            </h1>

            <form className="space-y-6 bg-gray-900/50 p-8 rounded-xl shadow-[0_0_20px_#00ff9d] border border-green-400/30" onSubmit={handleSubmit}>
                <input
                    className="block w-80 p-3 rounded-md bg-black border border-green-400/40 text-green-300 placeholder-green-500 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className="block w-80 p-3 rounded-md bg-black border border-green-400/40 text-green-300 placeholder-green-500 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    className="block w-80 p-3 rounded-md bg-black border border-green-400/40 text-green-300 placeholder-green-500 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400"
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <div className="flex justify-center">
                    <button
                        className="py-3 px-6 rounded-md bg-green-500 text-black font-bold hover:bg-green-400 active:scale-95 transition transform duration-200 shadow-[0_0_10px_#00ff9d]"
                        type="submit"
                    >
                        Register
                    </button>
                </div>
            </form>

            <p className="text-green-500 text-sm mt-6 text-center">
                Already have an account?
                <a href="/login" className="text-green-300 font-semibold hover:underline ml-1">
                    Login here
                </a>
            </p>
        </div>
        </>
    )
}

export default RegisterPage
