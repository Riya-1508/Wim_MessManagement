import React, { useState, useEffect } from "react";
import "./ReviewForm.css";
import Navigation from "./Navigation.js";
import Footer from "./Footer.js";
import axios from "axios";
import ErrorMessage from "./ErrorMesssge.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";
import Rating from "react-rating-stars-component";
import ReviewsList from "./ReviewList.js";
import ReviewChart from "./ReviewChart.js";
function ReviewApplication() {
  const [name, setname] = useState("");

    const [feedback, setfeedback] = useState("");
 const [rating, setRating] = useState(0);
const [reviews, setReviews] = useState([]); 
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [isPageLoaded, setPageLoaded] = useState(false);
  const loggedInUserRegId = localStorage.getItem("userRegId");
  const [userDetails, setUserDetails] = useState("");
  const diffToast = (message, type) => {
    toast[type](message, {
      position: "top-center",
      theme: "dark",
    });
  };
  useEffect(() => {
    // Set a delay of 100ms to show the page content after the fade-in effect
    setTimeout(() => {
      setPageLoaded(true);
    }, 100);
  }, []);



 

  const submitHandler = async (e) => {
    e.preventDefault();
    // calculateDaysLeft();
  
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      //setLoading(true)
      const { data } = await axios.post(
        `http://localhost:5000/api/review/reviewmess`, // Replace userId with the appropriate user ID you want to update
        {
          name:name,
          feedback:feedback,
          rating:rating,
        },
        config
      );
      //    setLoading(false)
 setRating(0);
     setReviews([...reviews, data]);
      localStorage.setItem("userInfo", JSON.stringify(data));
     diffToast("Feedback submitted successfully", "success");
      window.location = "/Review";
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const value = true;

  return (
    <>
      <Navigation />
      <div className="bg-picSignUp h-screen flex justify-center items-center">
        <div className="bg-white w-[1000px] h-[300px] rounded-3xl flex flex-col items-center transition-opacity duration-1000 opacity-100">
          <div className="text-2xl font-bold py-4">Give your Feedback</div>
          <form className="w-full max-w-md space-y-4">
            <div className="mt-2 ml flex space-x-5">
              <label htmlFor="middlename" className="text-lg font-bold">
                Name :{" "}
              </label>
              <input
                type="text"
                name="middlename"
                className="mx-2 shadow-lg appearance-none border-3 w-48 py-2 px-3 text-gray-700 leading-tight hover:bg-red-600 hover:text-white focus:outline-indigo-100 focus:shadow-outline"
                onChange={(e) => setname(e.target.value)}
                value={name}
                minLength={3}
              />
            </div>
            
            <div
                className="mt-2 flex space-x-10"
                
              >
                <label htmlFor="feedback" className="text-lg font-bold">
                  Feedback :{" "}
                </label>
                <textarea
                  name="feedback"
                  className="mx-2 shadow-lg appearance-none border w-48 py-2 px-3 text-gray-700 leading-tight hover:bg-red-600 hover:text-white focus:outline-indigo-100 focus:shadow-outline"
                  onChange={(e) => setfeedback(e.target.value)}
                  value={feedback}
                  minLength={3}
                />
              </div>
              <div className="mt-2 flex space-x-10">
                <label htmlFor="rating" className="text-lg font-bold">
                  Rating :{" "}
                </label>
                <Rating
                  count={5}
                  onChange={(rating) => setRating(rating)}
                  size={24}
                  color1={"#999999"}
                  color2={"#FFD700"}
                  value={rating}
                />
              </div>

            <button
  type="submit"
  className="inline-block w-32 px-4 py-2.5 font-medium text-lg leading-tight uppercase rounded-full shadow-md bg-gray-400 text-red-600 hover:bg-gray-700 hover:text-white hover:shadow-lg focus:bg-pink-violent focus:text-white focus:shadow-lg focus:outline-none focus:ring-0 active:bg-pink-violent active:text-white active:shadow-lg transition duration-150 ease-in-out"
  onClick={submitHandler}
>
              Submit
            </button>
            <ToastContainer limit={1} />
          </form>
          <ReviewsList />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ReviewApplication;



// import React, { useState, useEffect } from "react";
// import "./ReviewForm.css";
// import Navigation from "./Navigation.js";
// import Footer from "./Footer.js";
// import axios from "axios";
// import ErrorMessage from "./ErrorMesssge.js";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { v4 as uuidv4 } from "uuid";
// import Rating from "react-rating-stars-component";
// import ReviewsList from "./ReviewList.js";
// import ReviewChart from "./ReviewChart.js";
// function ReviewApplication() {
//   const [name, setname] = useState("");

//     const [feedback, setfeedback] = useState("");
//  const [rating, setRating] = useState(0);
// const [reviews, setReviews] = useState([]); 
//   const [error, setError] = useState(false);
//   const [message, setMessage] = useState("");
//   const [isPageLoaded, setPageLoaded] = useState(false);
//   const loggedInUserRegId = localStorage.getItem("userRegId");
//   const [userDetails, setUserDetails] = useState("");
//   const diffToast = (message, type) => {
//     toast[type](message, {
//       position: "top-center",
//       theme: "dark",
//     });
//   };
//   useEffect(() => {
//     // Set a delay of 100ms to show the page content after the fade-in effect
//     setTimeout(() => {
//       setPageLoaded(true);
//     }, 100);
//   }, []);



 

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     // calculateDaysLeft();
  
//     try {
//       const config = {
//         headers: {
//           "Content-type": "application/json",
//         },
//       };
//       //setLoading(true)
//       const { data } = await axios.post(
//         `http://localhost:5000/api/review/reviewmess`, // Replace userId with the appropriate user ID you want to update
//         {
//           name:name,
//           feedback:feedback,
//           rating:rating,
//         },
//         config
//       );
//       //    setLoading(false)
//  setRating(0);
//      setReviews([...reviews, data]);
//       localStorage.setItem("userInfo", JSON.stringify(data));
//      diffToast("Feedback submitted successfully", "success");
//       window.location = "/Review";
//     } catch (error) {
//       setError(error.response.data.message);
//     }
//   };

//   const value = true;
//   return (
//     <>
//       <Navigation />
//       <>
//         <div className="flex h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat bg-picSignUp">
//           <div
//             className={`bg-white w-[1000px] h-[300px] flex flex-col space-y-10 justifiy-center items-center transition-opacity duration-1000 ${
//               isPageLoaded ? "opacity-100" : "opacity-0"
//             }`}
//             style={{ marginTop: "-240px" }}
//           >
//             <div className="flex flex-row w-full h-12 text-2xl font-bond justify-center items-center dark:bg-gray-900 text-white">
//               Give your Feedback{" "}
//             </div>
//             <form
//               autoComplete="on"
//               className="grid grid-col-3 space-x-3 space-y-10 content-center"
//             >
//               <div
//                 className="mt-2 ml flex space-x-5"
//                 style={{ marginLeft: "80px" }}
//               >
//                 <label htmlFor="middlename" className="text-lg font-bold">
//                   Name :{" "}
//                 </label>
//                 <input
//                   type="text"
//                   name="middlename"
//                   className="mx-2 shadow-lg appearance-none border w-48 py-2 px-3 text-gray-700 leading-tight hover:bg-red-600 hover:text-white focus:outline-indigo-100 focus:shadow-outline"
//                   // onChange={(e) => setmiddleName(e.target.value)}
//                   onChange={(e) => setname(e.target.value)}
//                   value={name}
//                   minLength={3}
//                 />
//               </div>

//               {/* /////////////////// */}

//               <div
//                 className="mt-2 flex space-x-10"
//                 style={{ marginLeft: "30px" }}
//               >
//                 <label htmlFor="feedback" className="text-lg font-bold">
//                   Feedback :{" "}
//                 </label>
//                 <textarea
//                   name="feedback"
//                   className="mx-2 shadow-lg appearance-none border w-48 py-2 px-3 text-gray-700 leading-tight hover:bg-red-600 hover:text-white focus:outline-indigo-100 focus:shadow-outline"
//                   onChange={(e) => setfeedback(e.target.value)}
//                   value={feedback}
//                   minLength={3}
//                 />
//               </div>
//               <div className="mt-2 flex space-x-10">
//                 <label htmlFor="rating" className="text-lg font-bold">
//                   Rating :{" "}
//                 </label>
//                 <Rating
//                   count={5}
//                   onChange={(rating) => setRating(rating)}
//                   size={24}
//                   color1={"#999999"}
//                   color2={"#FFD700"}
//                   value={rating}
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="inline-block m-auto w-32 px-4 py-2.5 font-medium text-lg leading-tight uppercase rounded-full shadow-md dark:bg-gray-900 text-white hover:bg-white hover:text-gray-900 hover:shadow-lg focus:bg-pink-violent focus:text-white focus:shadow-lg focus:outline-none focus:ring-0 active:bg-pink-violent active:text-white active:shadow-lg transition duration-150 ease-in-out"
//                 // className="inline-block m-auto w-32 px-4 py-2.5 bg-blue text-pink font-medium text-lg leading-tight uppercase rounded-full shadow-md hover:dark:bg-gray-900 hover:text-white hover:shadow-lg focus:bg-pink-violent focus:text-white focus:shadow-lg focus:outline-none focus:ring-0 active:bg-pink-violent active:text-white active:shadow-lg transition duration-150 ease-in-out"
//                 onClick={submitHandler}
//                 style={{ marginLeft: "43%" }}
//               >
//                 Submit
//               </button>
//               <ToastContainer limit={1} />
//             </form>
//             <ReviewsList />
//           </div>
//         </div>
//       </>
//       <Footer />
//     </>
//   );
// }