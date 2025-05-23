import React, { type ChangeEvent } from "react";

interface InputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  
  id?: string;
  type?: string;
}
export function InputBox({
  label,
  placeholder,
  onChange,
  
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