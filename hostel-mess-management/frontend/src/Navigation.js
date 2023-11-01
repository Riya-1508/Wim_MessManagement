import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavigationImage from "./NavigationImage.png";
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
  const [ticket, setTicket] = useState("");
  const loggedInUserRegId = localStorage.getItem("userRegId");
  const fetchTicket = async (regId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/formAuth/getformuser?regId=${regId}`
      );
      setTicket(response.data?.ticketNo);
      localStorage.setItem('ticket', ticket);
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
      
      <nav className="flex flex-row items-center h-16 px-4">
      {loading?(<></>
):
      (
        <>
        {isAuthenticated ? (
          <>
            <img
              src={NavigationImage}
              className="h-16 animate-bounce"
              alt=""
              style={{marginTop:"15px"}}
            ></img>
            {ticket?(<>
            <Link
              to="/slip"
              className="ml-4 text-black font-semibold hover:dark:bg-gray-900 hover:text-white rounded-lg px-4 py-2"
            >
              Slip
            </Link></>):(<></>)}
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
            className="text-black font-semibold hover:dark:bg-gray-900 hover:text-white rounded-lg px-4 py-2 animate-fadein"
          >
            Home
          </Link>
          <a
            href={Pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="text-black font-semibold hover:dark:bg-gray-900 hover:text-white rounded-lg px-4 py-2 animate-fadein"
            download
          >
            Documentation
          </a>

          {isAuthenticated ? (
            <>
              <Link
                to="/ApplicationForm"
                className="text-black font-semibold hover:dark:bg-gray-900 hover:text-white rounded-lg px-4 py-2 animate-fadein"
              >
                Application Form
              </Link>
              {ticket ? 
              (<>
                <Link
                to="/ApplicationFormEdit"
                className="text-black font-semibold hover:dark:bg-gray-900 hover:text-white rounded-lg px-4 py-2 animate-fadein"
              >
                Edit Form
              </Link>
              <Link
                to="/renewal"
                className="text-black font-semibold hover:dark:bg-gray-900 hover:text-white rounded-lg px-4 py-2 animate-fadein"
              >
                Renew Application
              </Link>
              </>):(<></>)}
              <button
                className="text-black font-semibold hover:dark:bg-gray-900 hover:text-white rounded-lg px-4 py-2 animate-fadein"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/SignUp"
                className="text-black font-semibold hover:dark:bg-gray-900 hover:text-white rounded-lg px-4 py-2 animate-fadein"
              >
                Sign Up
              </Link>
              <Link
                to="/Login"
                className="text-black font-semibold hover:dark:bg-gray-900 hover:text-white rounded-lg px-4 py-2 animate-fadein"
              >
                Sign In
              </Link>
            </>
          )}
        </div></>
      )}
      </nav>
    </div>
  );
}

export default Navigation;
