"use client";
import React, { useContext, useState } from "react";
import { PiHandWavingFill } from "react-icons/pi";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { postRequest } from "@/actions/APICalls";
import { Context } from "@/contextapi/contextapi";
import Cookies from "js-cookie"
import Loader from "../GeneralComponents/Loader";

const LoginModal = () => {
  const router = useRouter();
  const {setAuthenticated,setUser} = useContext(Context)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading,setLoading] = useState(false)

  const handleSubmit = async(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
    e.preventDefault()
    try {
      const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/;

      if(!email || !password){
        setError("Fill all the required details")
        return
      }

      if(!emailRegex.test(email)){
        setError("Invalid email")
        return
      }

      if(password.length < 6){
        setError("Password must be of more than 6 characters")
        return
      }

      const body = JSON.stringify({email,password})

      setLoading(true)
      const data = await postRequest("users/login",body)

      if(data?.error){
        console.log(data.message)
        setError(data.message)
        return
      }

      console.log(data)
      Cookies.set("token",data.token)
      setUser(data.user)
      setAuthenticated(true)
      setLoading(false)
      router.push(`/`)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="py-8 px-4 shadow-lg w-10/12 md:w-5/12 lg:w-1/3 max-w-[450px]">
        <h2 className="text-2xl font-semibold mb-2">Login</h2>
        <p className="flex flex-wrap items-center gap-1">
          Hi , Welcome back{" "}
          <span>
            <PiHandWavingFill className="text-yellow-400" />
          </span>
        </p>
        <form className="flex flex-col gap-4 mt-6">
          <fieldset className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              name="email"
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full border rounded-md border-slate-200 px-1 py-2 outline-none"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </fieldset>
          <fieldset className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <input
              name="password"
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full border rounded-md border-slate-200 px-1 py-2 outline-none"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </fieldset>
          <Button
            variant="default"
            className={`hidden sm:block bg-[#7332bd] rounded-md text-white font-bold`}
            disabled={isLoading}
            onClick={(e)=>handleSubmit(e)}
          >
            {isLoading ? <Loader size={"4"} color="white"/> : <p>Log in</p>}
          </Button>
          {error && (
            <div className="h-8 w-full">
              <p className="text-xs text-red-500">{error}</p>
            </div>
          )}
          <div className="flex flex-wrap justify-center items-center gap-1 w-full text-sm">
            <p className="text-slate-300">Not registered yet ?</p>
            <Link href={"/register/buyer"} className="text-[#7332bd]">
              Create an Account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
