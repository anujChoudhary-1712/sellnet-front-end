"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { postRequest } from "@/actions/APICalls";

const BuyerRegisterModal = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullname: "",
    accountType:"buyer",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (field: string, value: string) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleSubmit = async(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
    e.preventDefault()
    try {
      const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/;

      if(!Object.values(formData).every(Boolean)){
        setError("Fill all the required details")
        return
      }

      if(!emailRegex.test(formData.email)){
        setError("Invalid email")
        return
      }

      if(formData.password.length < 6){
        setError("Password must be of more than 6 characters")
        return
      }

      const body = JSON.stringify(formData)

      const data = await postRequest("users/register",body)

      if(data?.error){
        console.log(data.message)
        setError(data.message)
        return
      }

      console.log(data)
      router.push(`/verifyEmail}`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="py-8 px-4 shadow-lg w-10/12 md:w-5/12 lg:w-1/3 max-w-[450px]">
        <h2 className="text-2xl font-semibold mb-2 text-center">
          Register as Buyer
        </h2>

        <form className="flex flex-col gap-4 mt-6">
          <fieldset className="flex flex-col gap-2">
            <label htmlFor="fullname" className="text-sm font-medium">
              Full name
            </label>
            <input
              name="fullname"
              id="fullname"
              type="text"
              placeholder="Enter your full name"
              className="w-full border rounded-md border-slate-200 px-1 py-2 outline-none"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              value={formData.fullname}
            />
          </fieldset>
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
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              value={formData.email}
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
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              value={formData.password}
            />
          </fieldset>
          <Button
            variant="default"
            className="hidden sm:block bg-[#7332bd] rounded-md text-white font-bold"
            onClick={(e)=>handleSubmit(e)}
          >
            Register
          </Button>
          {error && (
            <div className="h-8 w-full">
              <p className="text-xs text-red-500">{error}</p>
            </div>
          )}
          <div className="flex flex-wrap justify-center items-center gap-1 w-full text-sm">
            <p className="text-slate-300">Already have an account ?</p>
            <Link href={"/login"} className="text-[#7332bd]">
              Sign in
            </Link>
          </div>
        </form>
        <div className="flex flex-col gap-4 mt-4">
          <p className="text-lg text-slate-300 text-center">OR</p>
          <Button
            variant="default"
            className="hidden sm:block bg-[#7332bd] rounded-md text-white font-bold"
            onClick={() => router.push("/register/seller")}
          >
            Continue as Seller
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BuyerRegisterModal;
