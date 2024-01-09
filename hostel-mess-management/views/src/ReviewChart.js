// // ReviewChart.js
// // ReviewAnalysis.js
// import React, { useEffect, useState } from 'react';
// import { Doughnut } from 'react-chartjs-2';
// import axios from 'axios';

// const ReviewAnalysis = () => {
//   const [analysis, setAnalysis] = useState(null);

//   useEffect(() => {
//     // Fetch rating analysis data when the component mounts
//     const fetchAnalysis = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/review/analyze-ratings');
//         setAnalysis(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchAnalysis();
//   }, []);

//   if (!analysis) {
//     return null;
//   }

//   // Extract data for the pie chart
//   const { ratingCounts } = analysis;
//   const chartData = {
//     labels: Object.keys(ratingCounts),
//     datasets: [
//       {
//         data: Object.values(ratingCounts),
//         backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#47d147', '#9966FF'],
//         hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#47d147', '#9966FF'],
//       },
//     ],
//   };

//   return (
//     <div>
//       <h2>Review Analysis</h2>
//       <Doughnut data={chartData} />
//     </div>
//   );
// };

// export default ReviewAnalysis;
import React, { useState, useEffect } from "react";
import Navigation from "./Navigation.js";
import Footer from "./Footer.js";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Rating from "react-rating-stars-component";
import ReviewsList from "./ReviewList.js";

function ReviewApplication() {
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(false);
  const [isPageLoaded, setPageLoaded] = useState(false);

  const diffToast = (message, type) => {
    toast[type](message, {
      position: "top-center",
      theme: "dark",
    });
  };

  useEffect(() => {
    setTimeout(() => {
      setPageLoaded(true);
    }, 100);
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        `http://localhost:5000/api/review/reviewmess`,
        {
          name: name,
          feedback: feedback,
          rating: rating,
        },
        config
      );
      setRating(0);
      setReviews([...reviews, data]);
      localStorage.setItem("userInfo", JSON.stringify(data));
      diffToast("Feedback submitted successfully", "success");
      window.location = "/Review";
    } catch (error) {
      setError(error.response.data.message);
    }
  };

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
                className="mx-2 shadow-lg appearance-none border w-48 py-2 px-3 text-gray-700 leading-tight hover:bg-red-600 hover:text-white focus:outline-indigo-100 focus:shadow-outline"
                onChange={(e) => setName(e.target.value)}
                value={name}
                minLength={3}
              />
            </div>
            {/* Other input fields */}
            <button
              type="submit"
              className="inline-block w-32 px-4 py-2.5 font-medium text-lg leading-tight uppercase rounded-full shadow-md dark:bg-gray-900 text-white hover:bg-white hover:text-gray-900 hover:shadow-lg focus:bg-pink-violent focus:text-white focus:shadow-lg focus:outline-none focus:ring-0 active:bg-pink-violent active:text-white active:shadow-lg transition duration-150 ease-in-out"
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
