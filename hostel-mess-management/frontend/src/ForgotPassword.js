import React from "react";
import "./ForgotPassword.css";
import { useState } from "react";
import axios from "axios";
import ErrorMessage from "./ErrorMesssge";
import { json } from "react-router-dom";
import Navigation from "./Navigation.js";
import Footer from "./Footer.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
const diffToast = (message, type) => {
  toast[type](message, {
    position: "top-center",
    theme: "dark",
  });
};
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:5000/api/passwordReset/reset";
      const { data } = await axios.post(url, { email });
      setMsg(data.message);
       diffToast("Email sent Successfully", "success");
      setError("");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
        setMsg("");
      }
      console.log(error);
    }
  };
  return (
    <div>
      <Navigation />
      <div className="h-screen bg-cover bg-center bg-no-repeat bg-picSignUp flex justify-center items-center ">
        <div className="bg-white w-[500px] h-[520px] rounded-3xl flex flex-col space-y-10 justifiy-center items-center">
          <h1 className="text-4xl text-black font-bold mt-8">Reset Password</h1>
          <form>
            <div className="my-1">
              <label
                htmlFor="email"
                className="text-xl text-purple-violent font-bold"
              >
                Email:{" "}
              </label>
              <p>(Use only VJTI Email)</p>
              <div>
                <input
                  type="email"
                  pattern=".+@[A-Za-z0-9.-]+\.vjti.ac.in"
                  name="title"
                  className="my-2 shadow-lg appearance border rounded-2xl w-96 py-2 px-3 text-gray-700 leading-tight hover:dark:bg-gray-900 hover:text-white focus:outline-indigo-100 focus:shadow-outline"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                ></input>
              </div>
            </div>

            <button
              type="submit"
              className="inline-block px-6 py-2.5 bg-white text-pink-violent font-medium text-lg leading-tight uppercase rounded-full shadow-md hover:dark:bg-gray-900 hover:text-white hover:shadow-lg focus:bg-pink-violent focus:text-white focus:shadow-lg focus:outline-none focus:ring-0 active:bg-pink-violent active:text-white active:shadow-lg transition duration-150 ease-in-out"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </form>
            <ToastContainer limit={1}/>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ForgotPassword;
