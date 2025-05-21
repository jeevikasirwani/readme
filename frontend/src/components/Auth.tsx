import React from "react";
import { Link } from "react-router-dom";


function Auth({ type }: { type: "signup" | "signin" }) {
  return (
    <div className="h-screen bg-white flex flex-col justify-center">
      <div className="flex justify-center">
        <div>
          <div className="text-3xl font-bold justify-center">
            Create an Account
          </div>
          <div>Already have an account? <Link to="/signin"/>Signin</div>
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

export default Auth;
