import React from "react";
import "./ResetPassword.css";
import { useEffect, useState, Fragment } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ErrorMessage from "./ErrorMesssge";
import { json } from "react-router-dom";
function PasswordReset() {
  const [validUrl, setValidUrl] = useState(false);
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const param = useParams();
  const url = `http://localhost:5000/api/passwordReset/${param.id}/${param.token}`;

  useEffect(() => {
    const verifyUrl = async () => {
      try {
        await axios.get(url);
        setValidUrl(true);
      } catch (error) {
        setValidUrl(false);
      }
    };
    verifyUrl();
  }, [param, url]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(url, { password });
      setMsg(data.message);
      setError("");
      window.location = "/login";
      console.log("Password Reset Success");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
        console.log(error);
        setMsg("");
      }
    }
  };
  return (
    <div>
      <div className="h-screen bg-cover bg-center bg-no-repeat bg-picSignUp flex justify-center items-center ">
        <div className="bg-white w-[500px] h-[520px] rounded-3xl flex flex-col space-y-10 justifiy-center items-center">
          <h1 className="text-4xl text-black font-bold mt-8">Reset Password</h1>
          <form>
            <div className="my-4">
              <label
                htmlFor="password"
                className="text-xl text-purple-violent font-bold"
              >
                New Password:{" "}
              </label>
              <div>
                <input
                  type="password"
                  name="password"
                  className="my-2 shadow-lg appearance-none border rounded-2xl w-96 py-2 px-3 text-gray-700 leading-tight hover:dark:bg-gray-900 hover:text-white focus:outline-indigo-100 focus:shadow-outline"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
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
        </div>
      </div>
    </div>
  );
}

export default PasswordReset;
