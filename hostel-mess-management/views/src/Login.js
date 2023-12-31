import Navigation from "./Navigation.js";
import Footer from "./Footer.js";
import React, { useState, useEffect } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import axios from "axios";
import ErrorMessage from "./ErrorMesssge";
import { json } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cardNumber, setcardNumber] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isPageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    // Set a delay of 100ms to show the page content after the fade-in effect
    setTimeout(() => {
      setPageLoaded(true);
    }, 100);
  }, []);
const diffToast = (message, type) => {
  toast[type](message, {
    position: "top-center",
    theme: "dark",
  });
};
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      setLoading(true);
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        
        },
        config
      );
      console.log(data);

      localStorage.setItem("userInfo", JSON.stringify(data));
      localStorage.setItem("token", data.authtoken);
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userRegId", data.regId);
      console.log(localStorage.getItem("token"));
      console.log(localStorage.getItem("userRegId"));
      diffToast("Login Successful", "success");
      setLoading(false);
      window.location = "/";
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
      diffToast("Invalid Credentials", "error");
    }
  };

  return (
    <div>
      <Navigation />
      <div className="h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat bg-picSignUp">
        <div
          className={`bg-white w-[500px] h-[620px] rounded-3xl flex flex-col space-y-10 justifiy-center items-center transition-opacity duration-1000 ${
            isPageLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <h1 className="text-4xl text-black font-bold mt-8">Log In</h1>
          <form>
            <div className="my-1">
              <label
                htmlFor="email"
                className="text-xl text-purple-violent font-bold"
              >
                Email:{" "}
              </label>
              <div>
                <input
                  type="email"
                  name="title"
                  className="my-2 shadow-lg appearance border rounded-2xl w-96 py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight hover:dark:bg-gray-900 hover:text-white focus:shadow-outline"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                ></input>
              </div>
            </div>
            <div className="my-4">
              <label
                htmlFor="password"
                className="text-xl text-purple-violent font-bold"
              >
                Password:{" "}
              </label>
              <div>
                <input
                  type="password"
                  name="password"
                  className="my-2 shadow-lg appearance-none border rounded-2xl w-96 py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight hover:dark:bg-gray-900 hover:text-white focus:shadow-outline"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                ></input>
              </div>
            </div>
          
            <button
  type="submit"
  className="inline-block w-32 px-4 py-2.5 font-medium text-lg leading-tight uppercase rounded-full shadow-md bg-gray-400 text-red-600 hover:bg-gray-700 hover:text-white hover:shadow-lg focus:bg-pink-violent focus:text-white focus:shadow-lg focus:outline-none focus:ring-0 active:bg-pink-violent active:text-white active:shadow-lg transition duration-150 ease-in-out"
  onClick={submitHandler}
>
              Submit
            </button>
            <ToastContainer limit={1} />
          </form>
          {/* <div className="my-5 text-white" >
            <p className="text-xl text-black">Don't have an account?</p>
            <Link
      to="/SignUp"
      className="text-2xl text-black text-center  underline cursor-pointer transition duration-300 ease-in-out hover:bg-gray-900 hover:text-white"
      
    >
              Create Account
            </Link>
            <p>
              <Link
                to="/forgot-password"
                className="text-2xl text-black text-center underline my-10 cursor-pointer transition duration-300 ease-in-out hover:bg-gray-900 hover:text-white"
                
              >
                Forgot Password?
              </Link>
            </p>
          </div> */}
          <div className="my-4 text-white">
  <p className="text-xl text-black">Don't have an account?</p>
  <Link
    to="/SignUp"
    className="text-2xl text-black text-center underline cursor-pointer transition duration-300 ease-in-out hover:bg-gray-900 hover:text-white block mt-4 mb-5"
  >
    Create Account
  </Link>
  <p>
    <Link
      to="/forgot-password"
      className="text-2xl text-black text-center underline cursor-pointer transition duration-300 ease-in-out hover:bg-gray-900 hover:text-white"
    >
      Forgot Password?
    </Link>
  </p>
</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
