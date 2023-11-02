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
  const [ticket, setTicket] = useState("");
  const loggedInUserRegId = localStorage.getItem("userRegId");
  const fetchTicket = async (regId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/formAuth/getformuser?regId=${regId}`
      );
      setTicket(response.data?.ticketNo);
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

  const levenshteinDistance = (word1, word2) => {
    const m = word1.length;
    const n = word2.length;
    const dp = [...Array(m + 1)].map(() => Array(n + 1).fill(0));

    for (let i = 0; i <= m; i++) {
      dp[i][0] = i;
    }

    for (let j = 0; j <= n; j++) {
      dp[0][j] = j;
    }

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (word1[i - 1] === word2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1];
        } else {
          dp[i][j] = Math.min(
            dp[i - 1][j - 1] + 1,
            dp[i][j - 1] + 1,
            dp[i - 1][j] + 1
          );
        }
      }
    }

    return dp[m][n];
  };
  const handleIDInputChange = async (files) => {
    const file = files[0];
    console.log(file);
    const filename = `${uuidv4()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from("aadhar-card-images")
      .upload(filename, file);
    const T = require("tesseract.js");

    T.recognize(file, "eng").then((out) => {
      filedata = out.data.text.slice(14, out.data.text.indexOf("Hostelize"));
      console.log(filedata);

      const station = stationfrom; //this will be what user enters

      const percentage = 0.5; // Minimum accuracy needed out of 1 //not required as considering no. of char

      const words = station.split(/\s+/);

      isPresent = words.reduce((result, word) => {
        return result && checkPresence(filedata, word, percentage);
      }, true);

      //true if max 2 char differs and length, order is same
      console.log(`Is ${station} present:`, isPresent);
    });
    if (error) {
      console.error(error);
    } else {
      console.log(data.Key);
      // Save the file path to your database or perform other actions
    }
  };

  const checkPresence = (filedata, station, percentage) => {
    const words = filedata
      .toLowerCase()
      .split(/\W+/)
      .filter((word) => word !== "");
    // const threshold = 1 - percentage; // Set the accuracy threshold
    const threshold = 2.0 / station.length; //only 2 chars can be wrong
    console.log(station, threshold, words);
    station = station.toLowerCase();
    const similarityThreshold = Math.floor(station.length * threshold);
    const isPresent = words.some((word) => {
      const distance = levenshteinDistance(station, word);
      return distance <= similarityThreshold;
    });
    return isPresent;
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
          course: course,
          year: year,
          stationfrom: stationfrom,
          stationto: stationto,
          regId: userDetails.regId,
          category: category,
          address: address,
          phnNumber: userDetails.phnNumber,
          isPresent: isPresent,
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
      {loading?(
        <>Loading</>//initial loading
      ):
      (<>
      {ticket?(<>
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
                <label htmlFor="firstname" className="ml-2 text-lg font-bold">
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
            <div className="my-1 flex space-x-15 items-centre">
              <div>
                <label htmlFor="course" className="ml-2 text-xl font-bold">
                  Courses:{" "}
                </label>
                <select
                  name="course"
                  id="course"
                  onChange={(e) => setCourse(e.target.value)}
                  defaultValue={"default"}
                  value={userDetails.course}
                >
                  <option value={"default"} disabled>
                    Choose
                  </option>
                  <option value="M.Tech">M.Tech</option>
                  <option value="B.Tech">B.Tech</option>
                  <option value="MCA">MCA</option>
                  <option value="Diploma">Diploma</option>
                  <option value="FDC">FDC</option>
                </select>
              </div>

              {/* Add some space between the two div elements */}
              <div style={{ marginLeft: "20vh" }}>
                <label htmlFor="year" className="text-xl font-bold">
                  Year:{" "}
                </label>
                <select
                  name="year"
                  id="year"
                  onChange={(e) => setYear(e.target.value)}
                  defaultValue={"default"}
                  value={userDetails.year}
                >
                  <option value={"default"} disabled>
                    Choose
                  </option>
                  <option value="FY">FY</option>
                  <option value="SY">SY</option>
                  <option value="TY">TY</option>
                  <option value="Final YR">Final YR</option>
                </select>
              </div>

              <div style={{ marginLeft: "10vh" }}>
                <label htmlFor="MobileNo" className="text-xl font-bold">
                  Mobile Number:{" "}
                </label>
                <input
                  type="tel"
                  name="MobileNo"
                  className="mx-2 shadow-lg appearance-none border w-64 py-2 px-3 text-gray-700 leading-tight hover:bg-red-600 hover:text-white focus:outline-indigo-100 focus:shadow-outline"
                  value={userDetails.phnNumber}
                  minLength={10}
                  maxLength={10}
                  required
                />
              </div>
            </div>
            <div className="mt-2 flex space-x-10">
              <div style={{ marginLeft: "0vh" }}>
                <label htmlFor="stationfrom" className="text-xl font-bold">
                  Station From:{" "}
                </label>
                <input
                  type="text"
                  name="stationfrom"
                  className="mx-2 shadow-lg appearance-none border w-50 py-2 px-3 text-gray-700 leading-tight hover:dark:bg-gray-900 hover:text-white focus:outline-indigo-100 focus:shadow-outline"
                  onChange={(e) => setStationFrom(e.target.value)}
                  value={userDetails.stationfrom}
                ></input>
                <span>
                  <span className="text-lg mx-2">to</span>
                  <select
                    name="Stationto"
                    id="Stationto"
                    onChange={(e) => setStationto(e.target.value)}
                    defaultValue={"default"}
                    value={userDetails.stationto}
                  >
                    <option value={"default"} disabled>
                      Choose
                    </option>
                    <option value="Dadar">Dadar</option>
                    <option value="Matunga">Matunga</option>
                    <option value="King Circle">King Circle</option>
                    <option value="Vadala">Vadala</option>
                  </select>
                </span>
              </div>
              <div>
                <label htmlFor="middlename" className="text-lg font-bold">
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
            <div className="mt-2 flex space-x-10">
              <div>
                <label htmlFor="Address" className="ml-2 text-xl font-bold">
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
              <div>
                <label htmlFor="AadharCard" className="ml-2 text-xl font-bold">
                  ID Card of Student(having address):{" "}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  name="AadharCard"
                  className="mx-1 shadow-lg appearance-none border w-64 py-2 px-3 text-gray-700 leading-tight hover:dark:bg-gray-900 hover:text-white focus:outline-indigo-100 focus:shadow-outline"
                  onChange={(e) => handleIDInputChange(e.target.files)}
                ></input>
              </div>
            </div>

            <button
              type="submit"
              className="inline-block m-auto w-32 px-4 py-2.5 font-medium text-lg leading-tight uppercase rounded-full shadow-md dark:bg-gray-900 text-white hover:bg-white hover:text-gray-900 hover:shadow-lg focus:bg-pink-violent focus:text-white focus:shadow-lg focus:outline-none focus:ring-0 active:bg-pink-violent active:text-white active:shadow-lg transition duration-150 ease-in-out"
              onClick={submitHandler}
            >
              Submit
            </button>
            <ToastContainer />
          </form>
        </div>
      </div>      
      </>)
      :
      (
        <>
        Please fill application
        </>
      )}
      </>
      )}
      
      <Footer />
    </div>
  );
}

export default ApplicationEdit;
