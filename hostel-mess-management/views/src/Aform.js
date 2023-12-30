import React, { useState, useEffect } from "react";
import "./Aform.css";
import Navigation from "./Navigation.js";
import Footer from "./Footer.js";
import axios from "axios";
import ErrorMessage from "./ErrorMesssge";
import { supabase } from "./lib/supabase";
import { v4 as uuidv4 } from "uuid";
import SignUp from "./SignUp";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignatureCanvas from "react-signature-canvas";

function Application() {
  var filedata = "";
  // const [firstname, setFirstName] = useState("");
  // const [middlename, setmiddleName] = useState("");
  // const [userEmail, setEmail] = useState("");
  // const [surname, setsurName] = useState("");
  // const [dob, setdobName] = useState();
  // const [age, setAgeName] = useState("");
  const [gender, setgender] = useState();
  const [course, setCourse] = useState();
  const [year, setYear] = useState();
  const [duration, setDuration] = useState();
  const [class1, setClass1] = useState();
  const [stationfrom, setStationFrom] = useState("");
  const [stationto, setStationto] = useState();
  // const [regID, setregId] = useState("");
    const [sigCanvas, setSigCanvas] = useState({});

  const [userDetails, setUserDetails] = useState("");

  // const [ticketNo, setticketNo] = useState("");isPresent
  // const [class2, setClass2] = useState();
  // const [periodfrom, setPeriodFrom] = useState();
  // const [periodTo, setPeriodTo] = useState();
  const [category, setCategory] = useState();
  const [address, setAddress] = useState("");
  const [phnNumber, setphnNumber] = useState("");
  const [cardNo, setcardNo] = useState("");
  const [selectedImage, setSelectImage] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [aadhar, setaadhar] = useState([]);
  const loggedInUserEmail = localStorage.getItem("userEmail");
  const [dob, setDob] = useState("");
  const [age, setAge] = useState("");
  let isPresent;
  const diffToast = (message, type) => {
    toast[type](message, {
      position: "top-center",
      theme: "dark",
    });
  };
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location = "/Login";
    }
  }, []);
  useEffect(() => {
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

  //CHECKING IF TICKET ALREADY EXISTS
  const [card, setcard] = useState("");
  const loggedInUserRegId = localStorage.getItem("userRegId");

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
        console.log("Ticket does not exist yet!");
        setLoading(false);
      } else {
        console.log(error);
        setLoading(false);
      }
    }
  };


  function calculateAge(dateOfBirth) {
    const dob = new Date(dateOfBirth);
    const currentDate = new Date();

    let age = currentDate.getFullYear() - dob.getFullYear();
    const monthDiff = currentDate.getMonth() - dob.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && currentDate.getDate() < dob.getDate())
    ) {
      age--;
    }

    return age;
  }

  const handleDobChange = (e) => {
    setDob(e.target.value);
    setAge(calculateAge(e.target.value));
  };

  function generateAlphanumericHash(regId) {
    let cardNo = "";

    // Helper function to generate random number between 0 and max (exclusive) using a seed
    function generateRandomNumber(max, seed) {
      let x = Math.sin(seed) * 10000;
      return Math.floor((x - Math.floor(x)) * max);
    }

    // Generate 3-digit random number
    const randomNumber = generateRandomNumber(1000, regId); // Use regId as seed
    cardNo = randomNumber.toString().padStart(3, "0");

    return cardNo;
  }

  //  const cardNo = generateAlphanumericHash(userDetails.phnNumber);
 


  const [isPageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    // Set a delay of 100ms to show the page content after the fade-in effect
    setTimeout(() => {
      setPageLoaded(true);
    }, 100);
  }, []);
  useEffect(() => {
    // Set up the signature canvas
    setSigCanvas({});

    return () => {
      // Clean up the signature canvas
      setSigCanvas({});
    };
  }, []);

  const handleSignatureClear = () => {
    sigCanvas.clear();
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
      // setcardNo(generatedCardNo);
       const generatedCardNo = generateAlphanumericHash(userDetails.phnNumber);
       const { data } = await axios.post(
         "http://localhost:5000/api/formAuth/fillForm",
         {
           firstname: userDetails.firstname,
           middlename: userDetails.middlename,
           surname: userDetails.surname,
          dob: dob,
          age: age,
          gender: gender,
          // course: course,
          // year: year,

          cardNo: generatedCardNo,
          // class2: class2,
          // periodfrom: periodfrom,
          // periodTo: periodTo,

          address: address,
          regId:userDetails.regId,
          // phnNumber: userDetails.phnNumber,
          // isPresent: isPresent,
        },
        config
        );
        
        console.log(data);
        localStorage.setItem("userInfo", JSON.stringify(data));
        diffToast("Application submitted successfully", "success");
        window.location = "/Slip";
        setcardNo(generatedCardNo);
    } catch (error) {
      setError(error.response.data.message);
      diffToast("Provide valid Details", "error");
    }
  };

  const value = true;

  return (
    <div>
      <Navigation />
      <>
        {card ? (
          <>
            <div className="flex  flex justify-center items-center bg-cover bg-center bg-no-repeat bg-picSignUp">
              <div
                className={`w-[800px] h-[40px] flex flex-col space-y-10 justifiy-center items-center transition-opacity duration-1000 ${
                  isPageLoaded ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="aform">
                  Your are already a part of our MESS!Your Card Number: {card}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat bg-picSignUp">
              <div
                className={`bg-white w-[1000px] h-[500px] flex flex-col space-y-10 justifiy-center items-center transition-opacity duration-1000 ${
                  isPageLoaded ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="flex flex-row w-full h-12 text-2xl font-bond justify-center items-center dark:bg-gray-900 text-white">
                  Membership Form{" "}
                </div>
                <form
                  autoComplete="on"
                  className="grid grid-col-3 space-x-3 space-y-10 content-center"
                >
                  <div
                    className="mt-2 ml flex space-x-5"
                    style={{ marginLeft: "80px" }}
                  >
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
                      <label htmlFor="middlename" className="text-lg font-bold">
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
                  <div
                    className="my-1 flex space-x-1"
                    style={{ marginLeft: "80px" }}
                  >
                    <div>
                      <label htmlFor="dob" className="ml-2 text-xl font-bold">
                        D.O.B:{" "}
                      </label>
                      <input
                        type="date"
                        name="dob"
                        className="mx-2 shadow-lg appearance border w-64 py-2 px-3 text-gray-700 leading-tight hover:dark:bg-gray-900 hover:text-white focus:outline-indigo-100 focus:shadow-outline"
                        onChange={handleDobChange}
                        value={dob}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="age" className="text-xl font-bold">
                        Age:{" "}
                      </label>
                      <input
                        type="number"
                        name="age"
                        disabled
                        className="mx-2 shadow-lg appearance-none border w-36 py-2 px-3 text-gray-700 leading-tight hover:bg-red-600 hover:text-white focus:outline-indigo-100 focus:shadow-outline"
                        onChange={(e) => setAge(e.target.value)}
                        value={age}
                        minLength={1}
                        maxLength={2}
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="gender"
                        className="text-xl font-bold ml-16"
                      >
                        Gender:{" "}
                      </label>
                      <select
                        name="gender"
                        id="cars"
                        onChange={(e) => setgender(e.target.value)}
                        defaultValue={"default"}
                        value={gender}
                      >
                        <option value={"default"} disabled>
                          Choose
                        </option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* /////////////////// */}

                  <div
                    className="mt-2 flex space-x-10"
                    style={{ marginLeft: "30px" }}
                  >
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
                        value={address}
                      ></input>
                    </div>

                    <div className="mt-2 flex space-x-10">
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
                          className="mx-2 shadow-lg appearance-none border w-48 py-2 px-3 text-gray-700 leading-tight hover:bg-red-600 hover:text-white focus:outline-indigo-100 focus:shadow-outline"
                          // onChange={(e) => setmiddleName(e.target.value)}
                          value={userDetails.regId}
                          minLength={3}
                          required
                          readOnly
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="Sign"
                          className="ml-2 text-xl font-bold"
                        >
                          Digital Signature of Student:{" "}
                        </label>
                        <SignatureCanvas
                          penColor="black"
                          canvasProps={{
                            className: "mx-2 shadow-lg border w-64 h-32",
                            style: { border: "1px solid #ccc" },
                          }}
                          ref={(ref) => setSigCanvas(ref)}
                        />
                        <button
                          onClick={handleSignatureClear}
                          className="mt-2 px-2 py-1 bg-blue text-black rounded-md shadow-md hover:bg-blue-dark"
                        >
                          Clear Signature
                        </button>
                      </div>
                    </div>
                  </div>
                  <div
                    className="mt-2 flex space-x-10"
                    style={{ marginLeft: "30px" }}
                  ></div>
                  <button
                    type="submit"
                    className="inline-block m-auto w-32 px-4 py-2.5 font-medium text-lg leading-tight uppercase rounded-full shadow-md dark:bg-gray-900 text-white hover:bg-white hover:text-gray-900 hover:shadow-lg focus:bg-pink-violent focus:text-white focus:shadow-lg focus:outline-none focus:ring-0 active:bg-pink-violent active:text-white active:shadow-lg transition duration-150 ease-in-out"
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
        )}
      </>

      <Footer />
    </div>
  );
}

export default Application;
