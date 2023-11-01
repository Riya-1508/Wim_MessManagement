import React, { useEffect, useState } from "react";
import axios from "axios";
import html2pdf from "html2pdf.js";
import "./Slip.css";
import Navigation from "./Navigation.js";
import Footer from "./Footer.js";
import Logo from "./Logo.png";
import Approved from "./Approved.png";
function Slip({ isButtonClick }) {
  const [FormUser, setFormUsers] = useState("");
  console.log(localStorage.getItem("userRegId"));
  const loggedInUserRegId = localStorage.getItem("userRegId");

  useEffect(() => {
    fetchUserDetails(loggedInUserRegId);
  }, [loggedInUserRegId]);
  const fetchUserDetails = async (regId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/formAuth/getformuser?regId=${regId}`
      );
      setFormUsers(response.data);
      console.log(response.data);
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
   useEffect(() => {
     fetchTicket(loggedInUserRegId);
   }, [loggedInUserRegId]);
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

   

  const downloadAsPDF = () => {
    const contentDiv = document.getElementById("pdf-content");
    const opt = {
      margin: 50,
      width:500,
      filename: "slip.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
    };

    html2pdf().from(contentDiv).set(opt).save();
  };

  return (
    // <div className="h-screen flex justify-center items-center ">
    <>
      <Navigation />
      {loading?(
        <>Loading</>//initial loading
      ):(
        <>
      {ticket ?
      (
        <>
        <div
        className={`hey transition-opacity duration-1000 ${
          isPageLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className="button flex justify-center items-center "
          style={{ marginTop: "10vh" }}
        >
          <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#333" }}>
            SLIP PREVIEW
          </h1>
        </div>

        {/* <div className="bg-cover bg-center bg-no-repeat bg-picSignUp"> */}

        <div className=" flex justify-center items-center  ">
          <div id="pdf-content" className="center-rectangle">
            {/* <div className="center-rectangle"> */}
            <div className="rectangle">
              <div id="centerthis ">
                <div className="container">
                  {/* // */}
                  <div className="d-flex justify-content-center">
                    <div className="center-table">
                      <table border="0" cellSpacing="0" cellPadding="0">
                        <tr>
                          <td
                            className="image-cell"
                            valign="top"
                            bgcolor="#ffe77b"
                          >
                            <img
                              src={Logo}
                              style={{
                                height: "100%",
                                width: "100%",
                                transform: "rotate(0deg)",
                              }}
                              alt=""
                            />
                          </td>
                          <td className="text-cell" bgcolor="#ffe77b">
                            <h2>Railway Concession Slip</h2>
                            <p>
                              Veermata Jijabai Technological Institute, Matunga,
                              Mumbai
                              <br />
                              <a href="http://vjti.ac.in">
                                http://vjti.ac.in
                              </a>{" "}
                              | vjti@institute.com +915 7 789-1234
                            </p>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>
                  <div className="center-table">
                    <div className="mt-4 row justify-content-left">
                      <div
                        key={FormUser._id}
                        className="mt-4 row justify-content-left"
                      >
                        <div className="border-right border-dark col-2">
                          <p>
                            <b>Name :</b> {FormUser.firstname}{" "}
                            {FormUser.middlename} {FormUser.surname}
                          </p>
                        </div>
                        <div className="col-2">
                          <p>
                            <b>Validity :</b> <span>{FormUser.startdate}</span>{" "}
                            <b>-</b> <span>{FormUser.enddate}</span>
                          </p>
                        </div>
                        <div className="col-2">
                          <p>
                            {" "}
                            <b> Duration :</b> {FormUser.duration}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="center-table">
                    <div className="mt-2 row justify-content-left">
                      <div className="col-2">
                        <p>
                          {" "}
                          <b> Class type : </b>
                          {FormUser.class1}{" "}
                        </p>
                      </div>
                      <div className="col-2">
                        <p>
                          <b>Station :</b> <span>{FormUser.stationfrom}</span>{" "}
                          <b>-</b> <span>{FormUser.stationto}</span>
                        </p>
                      </div>
                      <div className="col-2">
                        <p>
                          {" "}
                          <b>Category : </b>
                          {FormUser.category}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="center-table">
                    <div className="mt-2 row justify-content-left">
                      <div className="col-3">
                        <p>
                          <b>Ticket ID : </b> {FormUser.ticketNo}
                        </p>
                      </div>
                      <div className="col-2">
                        <div className="col-2 flex">
                          <img
                            // src="https://www.onlygfx.com/wp-content/uploads/2016/09/green-approved-stamp-3.png"
                            src={Approved}
                            style={{
                              height: "30%",
                              width: "25%",
                              marginTop: "-100px",
                              marginLeft: "400px",
                              transform: "rotate(0deg)",
                            }}
                            // style={{
                            //   height: "15%",
                            //   width: "20%",
                            //   marginTop: "-15px",
                            //   marginLeft: "10px",
                            //   transform: "rotate(0deg)",
                            // }}
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                    {/* </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /// */}
        </div>
        <div className="button flex justify-center items-center ">
          <button
            type="submit"
            className="inline-block px-6 py-2.5 bg-dark:bg-gray-900 text-pink-violent font-medium text-lg leading-tight uppercase rounded-full shadow-md hover:dark:bg-gray-900 hover:text-white hover:shadow-lg focus:bg-pink-violent focus:text-white focus:shadow-lg focus:outline-none focus:ring-0 active:bg-pink-violent active:text-white active:shadow-lg transition duration-150 ease-in-out"
            onClick={downloadAsPDF}
          >
            Download Concession slip
          </button>
        </div>
        {/* </div> */}
      </div>
        </>
      ) 
      : 
      (
        <>No ticket available</>
      )}
        </>
      )}
      
      <Footer />
    </>
  );
}

export default Slip;
