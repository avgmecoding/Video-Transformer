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
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-center text-4xl font-mono text-neon mb-6">
        Login
      </h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          className="block w-80 p-3 rounded-md bg-gray-800 text-white"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="block w-80 p-3 rounded-md bg-gray-800 text-white"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-80 py-2 bg-blue-600 hover:bg-blue-900 rounded-md font-semibold cursor-pointer"
        >
          Login
        </button>
      </form>
      <button
        onClick={() => signIn("google")}
        className="mt-4 py-2 px-6 bg-red-600 hover:bg-red-800 rounded-md"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default LoginPage;
