import React, { type ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { create } from "zustand";
import type { SignUpInput } from '../../../common/src/index';

function Auth({ type }: { type: "signup" | "signin" }) {
const {username,email,password,setUsername,setEmail,setPassword}=useAuthState();
  return (
    <div className="h-screen bg-white flex flex-col justify-center">
      <div className="flex justify-center">
        <div>
          <div className="text-3xl font-bold justify-center">
            Create an Account
          </div>
          <div className="text-slate-400 underline">
            Already have an account?{" "}
            <Link className=" pl-2 underline" to={"/signin"} />
            Login
          </div>
        </div>
      </div>
      {/* <div className="flex flex-col justify-center">
        <p className="justify-center text-center">Username</p>
        <input
          className=" bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:border-slate-400 hover:border-black shadow-sm focus:shadow"
          placeholder="Enter Your Username"
        />
      </div> */}
    </div>
  );
}



interface InputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  id?: string;
}

function LabelledInput({
  label,
  placeholder,
  onChange,
  value,
  id = "input",
}: InputType) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        type="text"
        id={id}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-700 dark:bg-gray-800 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        required
      />
    </div>
  );
}


interface AuthState extends SignUpInput {
  setUsername: (username: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
}
  export const useAuthState = create<AuthState>((set) => ({
    username: "",
    email: "",
    password: "",
    setUsername: (username) => set({ username }),
    setEmail: (email) => set({ email }),
    setPassword: (password) => set({ password }),
  }));
export default Auth;
