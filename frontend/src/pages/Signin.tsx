import React, { useState } from "react";
import Quote from "../components/Quote";
import { Header } from "../components/Header";
import { Warning } from "../components/Warning";
import { InputBox } from "../components/InputBox";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth2State } from "../components/Auth";

function Signin() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | undefined>(undefined);
  const { email, password, setEmail, setPassword } = useAuth2State();

  const handleSignIn = async () => {
    try {
      const response = await axios.post(
        "https://backend.jeevika-sirwani2003.workers.dev/",
        {
          email: email,
          password: password,
        }
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.user.username);
      localStorage.setItem("email", response.data.user.email);
      localStorage.setItem("userId", response.data.user.userId);

      navigate("/blogs", { state: { username: email } });
    } catch (err) {
      let errorMessage = "Unable to login. Please try again.";

      if (axios.isAxiosError(err)) {
        if (err.response) {
          errorMessage =
            err.response.data.error ||
            err.response.data.message ||
            errorMessage;
        } else if (err.request) {
          errorMessage = "No response received from server. Please try again.";
        } else {
          errorMessage = err.message;
        }
      } else {
        errorMessage = (err as Error).message;
      }
      setError(errorMessage);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-100 to-white">
      <div className="w-full lg:w-1/2 p-4 lg:p-8 flex justify-center items-center bg-blend-luminosity">
        <div className="rounded-md shadow-xl w-full max-w-md bg-white p-6 lg:p-8">
          <Header label={"Login"} />
          <Warning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/signup"}
          />
          <div className="pt-10">
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
            {error && (
              <div className="text-red-600 text-sm mt-2 mb-2">{error}</div>
            )}
            <button
              type="button"
              className="text-white w-full bg-gray-700 hover:bg-gray-900 rounded-lg font-medium px-5 py-2.5 mb-2 mt-4"
              onClick={handleSignIn}
            >
              Sign In
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

export default Signin;
