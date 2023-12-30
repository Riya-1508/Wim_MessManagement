import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavigationImage from "./navigationimg.jpg";
import Pdf from "./Documentation.pdf";
import "./Navigation.css";
import axios from "axios";  

function handleLogout() {
  // Remove the token from local storage
  localStorage.removeItem("token");
  // sessionStorage.clear();
  // Redirect the user to the desired location
  window.location = "/";
}

function Navigation() {
  
  // Check if the user is authenticated
  const isAuthenticated = localStorage.getItem("token");

  //CHECKING IF TICKET ALREADY EXISTS  
  useEffect(() => {
    if(isAuthenticated){
      fetchTicket(loggedInUserRegId);
    }
    else{
      setLoading(false)
    }
  }, []);
  const [loading, setLoading] = useState(true);
  const [card, setcard] = useState("");
  const loggedInUserRegId = localStorage.getItem("userRegId");
  const fetchTicket = async (regId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/formAuth/getformuser?regId=${regId}`
      );
      setcard(response.data?.cardNo);
      localStorage.setItem('ticket',card);
      setLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 404) {
      console.log('Ticket does not exist yet!yo');
      setLoading(false);
    } else {
      console.log(error);
      setLoading(false);
    }
    }
  };
  
  return (
    <div className="dark:bg-gray-400">
      <nav className="flex flex-row items-center h-16 px-4 bg-gray-300 text-white">
        {loading ? (
          <></>
        ) : (
          <>
            {isAuthenticated ? (
              <>
                <img
                  src={NavigationImage}
                  className="h-16 animate-bounce"
                  alt=""
                  style={{ marginTop: "15px" }}
                ></img>
                {card ? (
                  <>
                    <Link
                      to="/slip"
                      className="ml-4 text-black font-semibold hover:dark:bg-gray-900 hover:text-white rounded-lg px-4 py-2"
                    >
                      Mess Card
                    </Link>
                  </>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <img
                src={NavigationImage}
                className="h-16 animate-bounce"
                alt=""
              ></img>
            )}

            <div className="flex ml-auto items-center space-x-4">
              <Link
                to="/"
                className="text-black font-semibold rounded-lg px-4 py-2 transition-all duration-300 hover:bg-gray-900 hover:text-white"
              >
                Home
              </Link>

              <div className="flex ml-auto items-center space-x-4">
                <Link
                  to="/Menu"
                  className="text-black font-semibold rounded-lg px-4 py-2 transition-all duration-300 hover:bg-gray-900 hover:text-white"
                >
                  Menu
                </Link>
                <Link
                  to="/Review"
                  className="text-black font-semibold rounded-lg px-4 py-2 transition-all duration-300 hover:bg-gray-900 hover:text-white"
                >
                  Feedback
                </Link>
                <Link
                  to="/ReviewAnalysis"
                  className="text-black font-semibold rounded-lg px-4 py-2 transition-all duration-300 hover:bg-gray-900 hover:text-white"
                >
                  Review Analysis
                </Link>
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/ApplicationForm"
                      className="text-black font-semibold rounded-lg px-4 py-2 transition-all duration-300 hover:bg-gray-900 hover:text-white"
                    >
                      Registration Form
                    </Link>

                    {card ? (
                      <>
                        <a
                          href="https://rzp.io/l/TtqB8suQ"
                          className="text-black font-semibold rounded-lg px-4 py-2 transition-all duration-300 hover:bg-gray-900 hover:text-white"
                        >
                          Payment
                        </a>
                        <Link
                          to="/ApplicationFormEdit"
                          className="text-black font-semibold rounded-lg px-4 py-2 transition-all duration-300 hover:bg-gray-900 hover:text-white"
                        >
                          Edit Form
                        </Link>
                        <Link
                          to="/leave"
                          className="text-black font-semibold rounded-lg px-4 py-2 transition-all duration-300 hover:bg-gray-900 hover:text-white"
                        >
                          Put a Leave
                        </Link>
                      </>
                    ) : (
                      <></>
                    )}
                    <button
                      className="text-black font-semibold rounded-lg px-4 py-2 transition-all duration-300 hover:bg-gray-900 hover:text-white"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/SignUp"
                      className="text-black font-semibold rounded-lg px-4 py-2 transition-all duration-300 hover:bg-gray-900 hover:text-white"
                    >
                      Sign Up
                    </Link>
                    <Link
                      to="/Login"
                      className="text-black font-semibold rounded-lg px-4 py-2 transition-all duration-300 hover:bg-gray-900 hover:text-white"
                    >
                      Sign In
                    </Link>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </nav>
    </div>
  );
}

export default Navigation;
