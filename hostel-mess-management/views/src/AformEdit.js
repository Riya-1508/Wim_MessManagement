import React, { useState, useEffect } from "react";
import "./AformEdit.css";
import Navigation from "./Navigation.js";
import Footer from "./Footer.js";
import axios from "axios";
import ErrorMessage from "./ErrorMesssge";
import { supabase } from "./lib/supabase";
import { v4 as uuidv4 } from "uuid";
import SignUp from "./SignUp";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function ApplicationEdit() {
  var filedata = "";
  
  const [dob, setdobName] = useState();
  const [age, setAgeName] = useState("");
  const [gender, setgender] = useState();
  const [course, setCourse] = useState();
  const [year, setYear] = useState();
  const [stationfrom, setStationFrom] = useState("");
  const [stationto, setStationto] = useState();
  const [userDetails, setUserDetails] = useState("");
  const [category, setCategory] = useState();
  const [address, setAddress] = useState("");
  const [phnNumber, setphnNumber] = useState("");
  const [selectedImage, setSelectImage] = useState(null);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [aadhar, setaadhar] = useState([]);
  const loggedInUserEmail = localStorage.getItem("userEmail");
  let isPresent;
  const diffToast = (message, type) => {
    toast[type](message, {
      position: "top-center",
      theme: "dark",
    });
  };
  useEffect(() => {
    fetchTicket(loggedInUserRegId);
    fetchUserDetails(loggedInUserEmail);
  }, [loggedInUserEmail]);
  const fetchUserDetails = async (email) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/auth/getuser?email=${email}`
      );
      setUserDetails(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [isPageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    // Set a delay of 100ms to show the page content after the fade-in effect
    setTimeout(() => {
      setPageLoaded(true);
    }, 100);
  }, []);

  //CHECKING IF TICKET ALREADY EXISTS
  const [loading, setLoading] = useState(true);
  const [card, setcardNo] = useState("");
  const loggedInUserRegId = localStorage.getItem("userRegId");
  const fetchTicket = async (regId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/formAuth/getformuser?regId=${regId}`
      );
      setcardNo(response.data?.cardNo);
      setLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 404) {
      console.log('Ticket does not exist yet!');
      setLoading(false);
    } else {
      console.log(error);
      setLoading(false);
    }
    }
  };

  

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      //setLoading(true)
      console.log(isPresent);
      const { data } = await axios.post(
        `http://localhost:5000/api/formAuth/updateForm/${userDetails.regId}`, // Replace userId with the appropriate user ID you want to update
        {
          firstname: userDetails.firstname,
          middlename: userDetails.middlename,
          surname: userDetails.surname,
          dob: dob,
          age: age,
          gender: gender,
         
          regId: userDetails.regId,
          
          address: address,
          phnNumber: phnNumber,
          
        },
        config
      );

      console.log(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      diffToast("Application submitted successfully", "success");
      window.location = "/Slip";
    } catch (error) {
      setError(error.response.data.message);
      diffToast("Provide valid Details", "error");
    }
  };

  const value = true;
  return (
    <div>
      <Navigation />
      {loading ? (
        <>Loading</> //initial loading
      ) : (
        <>
          {card ? (
            <>
              <div className="flex h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat bg-picSignUp">
                <div
                  className={`bg-white w-[1000px] h-[470px] flex flex-col space-y-10 justifiy-center items-center transition-opacity duration-1000 ${
                    isPageLoaded ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="flex flex-row w-full h-12 text-2xl font-bond justify-center items-center dark:bg-gray-900 text-white">
                    Edit Application Form{" "}
                  </div>
                  <form
                    autoComplete="on"
                    className="grid grid-col-3 space-y-10 content-center"
                  >
                    <div className="mt-2 flex space-x-5">
                      <div>
                        <label
                          htmlFor="firstname"
                          className="ml-2 text-lg font-bold"
                        >
                          First Name:{" "}
                        </label>
                        <input
                          type="text"
                          name="firstname"
                          className="mx-2 shadow-lg appearance border w-64 py-2 px-3 text-gray-700 leading-tight hover:bg-red-600 hover:text-white focus:outline-indigo-100 focus:shadow-outline"
                          value={userDetails.firstname}
                          minLength={3}
                          required
                          readOnly
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="middlename"
                          className="text-lg font-bold"
                        >
                          Middle Name:{" "}
                        </label>
                        <input
                          type="text"
                          name="middlename"
                          className="mx-2 shadow-lg appearance-none border w-64 py-2 px-3 text-gray-700 leading-tight hover:bg-red-600 hover:text-white focus:outline-indigo-100 focus:shadow-outline"
                          value={userDetails.middlename}
                          minLength={3}
                          required
                          readOnly
                        />
                      </div>
                      <div>
                        <label htmlFor="surname" className="text-lg font-bold">
                          Surname:{" "}
                        </label>
                        <span>
                          <input
                            type="text"
                            name="surname"
                            className="mx-2 shadow-lg appearance-none border w-64 py-2 px-3 text-gray-700 leading-tight hover:bg-red-600 hover:text-white focus:outline-indigo-100 focus:shadow-outline"
                            value={userDetails.surname}
                            minLength={3}
                            required
                            readOnly
                          />
                        </span>
                      </div>
                    </div>
                    <div className="my-1 flex space-x-15 items-centre">
                      {/* Add some space between the two div elements */}

                      <div style={{ marginLeft: "10vh" }}>
                        <label htmlFor="MobileNo" className="text-xl font-bold">
                          Mobile Number:{" "}
                        </label>
                        <input
                          type="tel"
                          name="MobileNo"
                          className="mx-2 shadow-lg appearance-none border w-64 py-2 px-3 text-gray-700 leading-tight hover:bg-red-600 hover:text-white focus:outline-indigo-100 focus:shadow-outline"
                          onChange={(e) => setphnNumber(e.target.value)}
                          value={phnNumber}
                          minLength={10}
                          maxLength={10}
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="middlename"
                          className="text-lg font-bold"
                        >
                          Registration ID:{" "}
                        </label>
                        <input
                          type="text"
                          name="middlename"
                          className="mx-2 shadow-lg appearance-none border w-64 py-2 px-3 text-gray-700 leading-tight hover:bg-red-600 hover:text-white focus:outline-indigo-100 focus:shadow-outline"
                          // onChange={(e) => setmiddleName(e.target.value)}
                          value={userDetails.regId}
                          minLength={3}
                          required
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="mt-5 flex justify-center">
                      <div>
                        <label
                          htmlFor="Address"
                          className="ml-2 text-xl font-bold"
                        >
                          Address:{" "}
                        </label>
                        <input
                          type="text"
                          name="Address"
                          className="mx-2 shadow-lg appearance-none border w-64 py-2 px-3 text-gray-700 leading-tight hover:dark:bg-gray-900 hover:text-white focus:outline-indigo-100 focus:shadow-outline"
                          onChange={(e) => setAddress(e.target.value)}
                          value={userDetails.address}
                        ></input>
                      </div>
                    </div>

                    <button
                      type="submit"
                      
                      className="inline-block w-32 px-4 py-2.5 m-auto font-medium text-lg leading-tight uppercase rounded-full shadow-md bg-gray-400 text-red-600 hover:bg-gray-700 hover:text-white hover:shadow-lg focus:bg-pink-violent focus:text-white focus:shadow-lg focus:outline-none focus:ring-0 active:bg-pink-violent active:text-white active:shadow-lg transition duration-150 ease-in-out"
                      onClick={submitHandler}
                    >
                      Submit
                    </button>
                    <ToastContainer />
                  </form>
                </div>
              </div>
            </>
          ) : (
            <>Please fill application</>
          )}
        </>
      )}

      <Footer />
    </div>
  );
}

export default ApplicationEdit;
