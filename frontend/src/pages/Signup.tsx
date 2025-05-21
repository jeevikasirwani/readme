import React from "react";
import Quote from "../components/Quote";
import {Header} from "../components/Header";
import { Warning } from "../components/Warning";
import { InputBox } from "../components/InputBox";
// import type { SignUpInput } from "../../../common/src/index";

import { useAuthState } from "../components/Auth";
function Signup() {

  
   const { username, email, password, setUsername, setEmail, setPassword } = useAuthState();

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-100 to-white">
      <div className="w-full lg:w-1/2 p-4 lg:p-8 flex justify-center items-center  bg-blend-luminosity">
            <div className="rounded-md shadow-xl w-full max-w-md bg-white p-6 lg:p-8 ">
        <Header label={"Create an Account"} />
        <Warning label={"Already have an account?"} buttonText={"Login"} to={"/signin"} />
        <div className="pt-10">
          <InputBox
            label="Username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="username"
          />
          <InputBox
            label="Email"
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
          />
          <InputBox
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
          />
          <button
            type="button"
            className="text-white w-full bg-gray-700 hover:bg-gray-900 rounded-lg font-medium px-5 py-2.5 mb-2 mt-4"
          >
            Sign Up
          </button>
        </div>
      </div>

   </div>
    
      <div className="hidden md:block">
        <Quote />
      </div>
 
 </div>
  );
}

export default Signup;