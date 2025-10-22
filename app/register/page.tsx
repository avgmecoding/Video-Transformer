"use client"
import { useRouter } from 'next/router';
import { NextResponse } from 'next/server';
import React, { useState } from 'react'

function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(password !== confirmPassword){
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

            if(!response ){

            }
        } catch (error) {
            return NextResponse.json({
                error: "Failed to register"
            }, {status: 401})
        }
    }
    return(
        <div>
            Register Page
        </div>
    )
}

export default RegisterPage
