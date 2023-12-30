import React, { useState, useEffect } from "react";
import "./LeaveForm.css"
import Navigation from "./Navigation.js";
import Footer from "./Footer.js";
import axios from "axios";
import ErrorMessage from "./ErrorMesssge.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

function LeaveApplication() {
  const [cardNo, setcardNo] = useState("");
 
  const [leaveStartDate, setleaveStartDate] = useState();
  const [leaveEndDate, setleaveEndDate] = useState();
  
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [isPageLoaded, setPageLoaded] = useState(false);
  const loggedInUserRegId = localStorage.getItem("userRegId");
  const [userDetails, setUserDetails] = useState("");
  useEffect(() => {
    fetchUserDetails(loggedInUserRegId);
  }, [loggedInUserRegId]);
  const fetchUserDetails = async (regId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/formAuth/getformuser?regId=${regId}`
      );
      setUserDetails(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // Set a delay of 100ms to show the page content after the fade-in effect
    setTimeout(() => {
      setPageLoaded(true);
    }, 100);
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location = "/Login";
    }
  }, []);

  //CHECKING IF TICKET ALREADY EXISTS
  const [loading, setLoading] = useState(true);
  const [card, setcard] = useState("");
  useEffect(() => {
    fetchTicket(loggedInUserRegId);
  }, [loggedInUserRegId]);
  const fetchTicket = async (regId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/formAuth/getformuser?regId=${regId}`
      );
      setcard(response.data?.cardNo);
      setLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setLoading(false);
      } else {
        console.log(error);
        setLoading(false);
      }
    }
  };
 
 

  const submitHandler = async (e) => {
    e.preventDefault();
    // calculateDaysLeft();
    console.log(userDetails)
     console.log("Before axios request:", {
       cardNo,
       leaveStartDate,
       leaveEndDate,
     });
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      //setLoading(true)
      const { data } = await axios.post(
        `http://localhost:5000/api/leaveauth/putLeave`, // Replace userId with the appropriate user ID you want to update
        {
         cardNo: userDetails.cardNo,
        leaveStartDate: leaveStartDate,
         leaveEndDate: leaveEndDate,
          
        },
        config
      );
      //    setLoading(false)

      console.log("After axios request:", data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      window.location = "/Slip";
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const value = true;
  return (
    <>
      <Navigation />
      <>
     
          
            <div className="flex h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat bg-picSignUp">
              <div
                className={`bg-white w-[1000px] h-[300px] flex flex-col space-y-10 justifiy-center items-center transition-opacity duration-1000 ${
                  isPageLoaded ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="flex flex-row w-full h-12 text-2xl font-bond justify-center items-center dark:bg-gray-900 text-white">
                  Leave Application Form{" "}
                </div>
                <form
                  autoComplete="on"
                  className="grid grid-col-3 space-x-3 space-y-10 content-center"
                >
                  <div
                    className="mt-2 ml flex space-x-5"
                    style={{ marginLeft: "80px" }}
                  >
                    <label htmlFor="middlename" className="text-lg font-bold">
                      Card Number:{" "}
                    </label>
                    <input
                      type="text"
                      name="middlename"
                      className="mx-2 shadow-lg appearance-none border w-48 py-2 px-3 text-gray-700 leading-tight hover:bg-red-600 hover:text-white focus:outline-indigo-100 focus:shadow-outline"
                      // onChange={(e) => setmiddleName(e.target.value)}
                      value={userDetails.cardNo}
                      minLength={3}
                      required
                      readOnly
                    />
                  </div>

                  {/* /////////////////// */}

                  <div
                    className="mt-2 flex space-x-10"
                    style={{ marginLeft: "30px" }}
                  >
                    <div>
                      <label htmlFor="dob" className="ml-2 text-xl font-bold">
                        Start Date:{" "}
                      </label>
                      <input
                        type="date"
                        name="dob"
                        className="mx-2 shadow-lg appearance border w-64 py-2 px-3 text-gray-700 leading-tight hover:dark:bg-gray-900 hover:text-white focus:outline-indigo-100 focus:shadow-outline"
                        onChange={(e) => setleaveStartDate(e.target.value)}
                        value={leaveStartDate}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="dob" className="ml-2 text-xl font-bold">
                       End Date:{" "}
                      </label>
                      <input
                        type="date"
                        name="dob"
                        className="mx-2 shadow-lg appearance border w-64 py-2 px-3 text-gray-700 leading-tight hover:dark:bg-gray-900 hover:text-white focus:outline-indigo-100 focus:shadow-outline"
                        onChange={(e) => setleaveEndDate(e.target.value)}
                        value={leaveEndDate}
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="inline-block w-32 px-4 py-2.5 font-medium text-lg leading-tight uppercase rounded-full shadow-md bg-gray-400 text-red-600 hover:bg-gray-700 hover:text-white hover:shadow-lg focus:bg-pink-violent focus:text-white focus:shadow-lg focus:outline-none focus:ring-0 active:bg-pink-violent active:text-white active:shadow-lg transition duration-150 ease-in-out"
                    // className="inline-block m-auto w-32 px-4 py-2.5 bg-blue text-pink font-medium text-lg leading-tight uppercase rounded-full shadow-md hover:dark:bg-gray-900 hover:text-white hover:shadow-lg focus:bg-pink-violent focus:text-white focus:shadow-lg focus:outline-none focus:ring-0 active:bg-pink-violent active:text-white active:shadow-lg transition duration-150 ease-in-out"
                    onClick={submitHandler}
                    style={{ marginLeft: "43%" }}
                  >
                    Submit
                  </button>
                  <ToastContainer limit={1} />
                </form>
              </div>
            </div>
          </>
      
     
      <Footer />
    </>
  );
}

export default LeaveApplication;
