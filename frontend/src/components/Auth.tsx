import React, { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom"; 
import { create } from "zustand";
import type { SignUpInput } from "../../../common/src/index";

function Auth({ type }: { type: "signup" | "signin" }) {
  const navigate = useNavigate(); 
  const { username, email, password, setUsername, setEmail, setPassword } =
    useAuthState();

  return (
    // full dev
    <div className="h-screen bg-white flex flex-col justify-center">
      {/* box layout */}
      <div className="flex  justify-center">
        {/* extra div */}
        <div className="px-7">
          {/* title */}
          <div className="text-3xl font-bold justify-center">
            Create an Account
          </div>
          <div className="text-slate-400">
            {type === "signin"
              ? "Don't have an account"
              : "Already have an account?"}
            <button
              className="cursor-pointer pl-2 underline text-slate-400"
              onClick={() => navigate(type === "signin" ? "/signup" : "/signin")}
            >
              {type === "signin" ? "Sign Up" : "Sign In"}
            </button>
          </div>
          {/* label input */}
          <div className="pt-10">
            {type==='signup'?<LabelledInput
              label="Username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              id="username"
            />:null}
            <LabelledInput
              label="Email"
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="username"
            />
            <LabelledInput
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="#hs-toogle-password"
            />
            {/* button */}
            <button
              type="button"
              className="text-white w-full bg-gray-700 hover:bg-gray-900 outline-none focus:outline-white border-white rounded-lg font-medium px-5 py-2.5 me-2 mb-2 ">
            
              {type === "signin" ? "Sign In" : "Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// label and input
interface InputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  id?: string;
  type?: string;
}
function LabelledInput({
  label,
  placeholder,
  onChange,
  value,
  type,
  id = "input",
}: InputType) {
  const [showPassword, setShowPassword] = React.useState(false);

  const isPassword = type === "password";

  return (
    <div className="justify-center pb-4">
      <label
        htmlFor={id}
        className="mb-2 text-sm font-medium text-gray-900 block"
      >
        {label}
      </label>

      <div className="relative">
        <input
          type={isPassword ? (showPassword ? "text" : "password") : type || "text"}
          id={id}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full block p-2.5 pr-16"
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          required
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-600"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        )}
      </div>
    </div>
  );
}

// function LabelledInput({
//   label,
//   placeholder,
//   onChange,
//   value,
//   id = "input",
//   type,
// }: InputType) {
//     const [showpass,setShowpass]=useState(false);
//     const ispass=type==='password';
//   return (
//     <div className="justify-center pb-4">
//       <label htmlFor={id} className="mb-2 text-sm font-medium text-gray-900 d">
//         {label}
//       </label>
//       <input
//         type={ispass ? (showpass ? "text" : "password") :type || "text"}
//         id={id}
//         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full block  p-2.5 " 
//         placeholder={placeholder}
//         onChange={onChange}
//         value={value}
//         required
//       />
//      {ispass && (
//         <button
//           type="button"
//           onClick={() => setShowpass((prev) => !prev)}
//           className="absolute top-9 right-3 text-sm text-blue-600 focus:outline-none"
//         >
//           {showpass ? "Hide" : "Show"}
//         </button>
//       )}
//     </div>
//   );
// }

// zustand state
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
