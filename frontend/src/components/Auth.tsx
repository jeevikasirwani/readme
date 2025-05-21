import React, { type ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { create } from "zustand";
import type { SignUpInput } from "../../../common/src/index";

function Auth({ type }: { type: "signup" | "signin" }) {
  const { username, email, password, setUsername, setEmail, setPassword } =
    useAuthState();
  return (
    // full dev
    <div className="h-screen bg-white flex flex-col justify-center">
      {/* box layout */}
      <div className="flex  justify-center">
        {/* extra div */}
        <div>
          {/* title */}
          <div className="text-3xl font-bold justify-center">
            Create an Account
          </div>
          <div className="text-slate-400 underline">
            Already have an account?{" "}
            <Link className=" pl-2 underline" to={"/signin"} />
            Login
          </div>
          {/* label input */}
          <div>
            <LabelledInput
              label="Username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              id="username"
            />
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
              id="username"
            />
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
  return (
    <div className="justify-center">
      <label
        htmlFor={id}
        className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        type={type || "text"}
        id={id}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full block  p-2.5 "
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        required
      />
    </div>
  );
}
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
