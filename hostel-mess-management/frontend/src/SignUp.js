import React from "react";
import "./SignUp.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ErrorMessage from "./ErrorMesssge";
import Navigation from "./Navigation.js";
import Footer from "./Footer.js";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [middlename, setmiddleName] = useState("");
  const [surname, setsurName] = useState("");
  const [regId, setregId] = useState("");
  const [phnNumber, setphnNumber] = useState("");
  const [error, setError] = useState(false);
  const [latestError, setLatestError] = useState("");

  // const[loading,setLoading] = useState(false)
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const [isPageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    // Set a delay of 100ms to show the page content after the fade-in effect
    setTimeout(() => {
      setPageLoaded(true);
    }, 100);
  }, []);
  
  const diffToast = (message, type) => {
    if (type === "error") {
      // Update the latest error message
      setLatestError(message);
      // Check if there's already an active toast with error type, and update it
      const existingErrorToast = toast.isActive("errorToast");
      if (existingErrorToast) {
        toast.update(existingErrorToast, {
          render: message,
          type: "error",
        });
      } else {
        // If there's no active toast with error type, create a new one
        toast.error(message, {
          position: "top-center",
          theme: "dark",
          toastId: "errorToast",
        });
      }
    } else {
      // For success message, use default toast function
      toast[type](message, {
        position: "top-center",
        theme: "dark",
      });
    }
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      diffToast("Passwords Do not match","error");
    } else {
      setMessage(null);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        //setLoading(true)
        const { data } = await axios.post(
          "http://localhost:5000/api/auth/createUser",
          {
            email: email,
            regId: regId,
            firstname: firstname,
            middlename: middlename,
            surname: surname,
            phnNumber: phnNumber,
            password: password,
            confirmpassword: confirmpassword,
          },
          config
        );
        //    setLoading(false)

        console.log(data);
        localStorage.setItem("email", JSON.stringify(data));
        // Save the name to local storage or any other desired storage method

        // localStorage.setItem("regID", regId);
        // Redirect the user to the other form page
        // navigate("/Applicatioform");
        window.location = "/login";
        diffToast("Registered Successfully", "success");
      } catch (error) {
       
        if (
          email === "" ||
          regId === "" ||
          firstname === "" ||
          middlename === "" ||
          surname === "" ||
          phnNumber === "" ||
          password === ""
        )
        {
           
             diffToast("Invalid Input", "error");
           
        }
       
          
       else
       {
      
            diffToast("User already exists", "error");
          
       }
      }
    }
  };

  return (
    <div>
      <Navigation />
      <div className="h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat bg-picSignUp">
        {/* <div className="h-screen flex justify-center items-center bgimage"> */}
        <div
          className={`bg-white w-[950px] h-[570px] rounded-3xl flex flex-col space-y-10 justifiy-center items-center transition-opacity duration-1000 ${
            isPageLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <h1 className="text-4xl text-black font-bold mt-8">Sign Up</h1>
          <form className="flex flex-col space-y-10 justify-center items-center">
            <div className="my-1 flex space-x-10">
              <div>
                <label
                  htmlFor="email"
                  className="text-xl text-purple-violent font-bold"
                >
                  Email ID:{" "}
                </label>
                <input
                  type="email"
                  pattern=".+@[A-Za-z0-9.-]+\.vjti.ac.in"
                  name="title"
                  className="mx-2 shadow-lg appearance border rounded-2xl w-64 py-2 px-3 text-gray-700 leading-tight hover:dark:bg-gray-900 hover:text-white focus:outline-indigo-100 focus:shadow-outline"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="registrationid"
                  className="text-xl text-purple-violent font-bold"
                >
                  Registration ID:{" "}
                </label>
                <input
                  type="number"
                  maxLength={9}
                  name="registrationid"
                  className="mx-2 shadow-lg appearance-none border rounded-2xl w-64 py-2 px-3 text-gray-700 leading-tight hover:dark:bg-gray-900 hover:text-white focus:outline-indigo-100 focus:shadow-outline"
                  onChange={(e) => setregId(e.target.value)}
                  value={regId}
                  minLength={10}
                ></input>
              </div>
              <div>
                <label
                  htmlFor="phonenumber"
                  className="text-xl text-purple-violent font-bold"
                >
                  Phone Number:{" "}
                </label>
                <input
                  type="tel"
                  name="phonenumber"
                  className="mx-2 shadow-lg appearance-none border rounded-2xl w-64 py-2 px-3 text-gray-700 leading-tight hover:dark:bg-gray-900 hover:text-white focus:outline-indigo-100 focus:shadow-outline"
                  onChange={(e) => setphnNumber(e.target.value)}
                  value={phnNumber}
                  minLength={10}
                  maxLength={10}
                ></input>
              </div>
            </div>
            <div className="my-1 flex space-x-10">
              <div>
                <label
                  htmlFor="name"
                  className="text-xl text-purple-violent font-bold"
                >
                  First Name:{" "}
                </label>
                <input
                  type="text"
                  name="firstname"
                  className="mx-2 shadow-lg appearance border rounded-2xl w-64 py-2 px-3 text-gray-700 leading-tight hover:bg-red-600 hover:text-white focus:outline-indigo-100 focus:shadow-outline"
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstname}
                  minLength={3}
                ></input>
              </div>
              <div>
                <label
                  htmlFor="middlename"
                  className="text-xl text-purple-violent font-bold"
                >
                  Middle Name:{" "}
                </label>
                <input
                  type="text"
                  name="name"
                  className="mx-2 shadow-lg appearance border rounded-2xl w-64 py-2 px-3 text-gray-700 leading-tight hover:bg-red-600 hover:text-white focus:outline-indigo-100 focus:shadow-outline"
                  onChange={(e) => setmiddleName(e.target.value)}
                  value={middlename}
                  minLength={3}
                ></input>
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="text-xl text-purple-violent font-bold"
                >
                  Last Name:{" "}
                </label>
                <input
                  type="text"
                  name="name"
                  className="mx-2 shadow-lg appearance border rounded-2xl w-64 py-2 px-3 text-gray-700 leading-tight hover:bg-red-600 hover:text-white focus:outline-indigo-100 focus:shadow-outline"
                  onChange={(e) => setsurName(e.target.value)}
                  value={surname}
                  minLength={3}
                ></input>
              </div>
            </div>
            <div className="my-1 flex space-x-10">
              <div>
                <label
                  htmlFor="password"
                  className="text-xl text-purple-violent font-bold"
                >
                  Password:{" "}
                </label>
                <input
                  type="password"
                  name="password"
                  className="mx-2 shadow-lg appearance border rounded-2xl w-64 py-2 px-3 text-gray-700 leading-tight hover:dark:bg-gray-900 hover:text-white focus:outline-indigo-100 focus:shadow-outline"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  minLength={5}
                  required
                ></input>
              </div>
              <div>
                <label
                  htmlFor="confirmpassword"
                  className="text-xl text-purple-violent font-bold"
                >
                  Confirm Password:{" "}
                </label>
                <input
                  type="password"
                  name="confirmpassword"
                  className="mx-2 shadow-lg appearance-none border rounded-2xl w-64 py-2 px-3 text-gray-700 leading-tight hover:dark:bg-gray-900 hover:text-white focus:outline-indigo-100 focus:shadow-outline"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmpassword}
                  minLength={5}
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="inline-block w-31 px-6 py-2.5 bg-white text-pink-violent font-medium text-lg leading-tight uppercase rounded-full shadow-md hover:dark:bg-gray-900 hover:text-white hover:shadow-lg focus:bg-pink-violent focus:text-white focus:shadow-lg focus:outline-none focus:ring-0 active:bg-pink-violent active:text-white active:shadow-lg transition duration-150 ease-in-out"
              onClick={submitHandler}
            >
              Submit
            </button>
          </form>
            <ToastContainer limit = {1}/>
          <div className="my-1 text-white">
            <div className="text-xl text-black">Already have account?</div>
            <Link
              to="/Login"
              className="text-2xl text-black text-center underline cursor-pointer hover:dark:bg-gray-900 hover:text-white"
            >Log In
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SignUp;
