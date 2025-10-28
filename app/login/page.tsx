import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async(e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault()
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })
    if(result?.error){
      console.log(result.error)
    }else{
      router.push("/")
    }
  }

  return (
    <div>
      
    </div>
  )
}

export default page
