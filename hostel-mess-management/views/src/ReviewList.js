/// ReviewsList.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ReviewList.css"; // Create a CSS file for styling

const ReviewsList = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fetch reviews from the server
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/reviewlist/getreviews"
        );
        setReviews(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="reviews-container">
      <h2 className="text-2xl font-bold mb-4">Reviews</h2>
      {reviews.length > 0 ? (
        <div className="card-container">
          {reviews.map((review) => (
            <div key={review._id} className="card">
              <h3>{review.name}</h3>
              <p>{review.feedback}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No reviews available</p>
      )}
    </div>
  );
};

export default ReviewsList;
