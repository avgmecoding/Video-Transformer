"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-green-400 font-mono">
            <h1 className="text-4xl md:text-5xl mb-10 font-bold tracking-widest text-neon-green drop-shadow-[0_0_10px_#00ff9d]">
                LOGIN
            </h1>

            <form
                className="space-y-6 bg-gray-900/50 p-8 rounded-xl shadow-[0_0_20px_#00ff9d] border border-green-400/30"
                onSubmit={handleSubmit}
            >
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

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <div className="flex justify-center">
                    <button
                        className="py-3 px-6 rounded-md bg-green-500 text-black font-bold hover:bg-green-400 active:scale-95 transition transform duration-200 shadow-[0_0_10px_#00ff9d]"
                        type="submit"
                    >
                        Login
                    </button>
                </div>
            </form>

            <p className="text-green-500 text-sm mt-6 text-center">
                Don’t have an account?
                <a
                    href="/register"
                    className="text-green-300 font-semibold hover:underline ml-1"
                >
                    Register here
                </a>
            </p>
        </div>
  );
};

export default LoginPage;
