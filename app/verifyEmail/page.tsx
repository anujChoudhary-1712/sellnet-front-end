"use client"
import { postRequest } from '@/actions/APICalls'
import { Context } from '@/contextapi/contextapi'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useContext, useEffect } from 'react'

const VerifyEmail = () => {
    const params = useSearchParams()
    const router = useRouter()
    const emailToken = params.get("emailToken")
    const {setUser,user,setAuthenticated} = useContext(Context)

    useEffect(()=>{
        const verifyUser = async() =>{
            try {
                const data = await postRequest("users/verify-email",JSON.stringify({emailToken}))

                if(data?.error){
                    console.log(data.message)
                    return
                }

                setUser(data.user)
                setAuthenticated(true)
                localStorage.setItem('token',data.token)
                router.push("/")
            } catch (error) {
                console.log(error)
            }
        }

        if(emailToken){
            verifyUser()
        }
    },[emailToken, router, setAuthenticated, setUser])

    useEffect(()=>{
        if(user?.emailVerified){
            setAuthenticated(true)
            router.push("/")
        }
    },[router, setAuthenticated, user?.emailVerified])
  return (
    <div>
      <div className='w-10/12 sm:w-8/12 px-8 py-4 shadow-lg mx-auto my-8 text-black font-medium text-lg'>
        <p className='text-center'>An email verification has been sent to you . Kindly verify your email</p>
      </div>
    </div>
  )
}

export default VerifyEmail
