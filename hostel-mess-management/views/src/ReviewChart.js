// ReviewAnalysis.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import PieChart from "./Piechart";
const ReviewAnalysis = () => {
  const [ratingAnalysis, setRatingAnalysis] = useState(null);

  useEffect(() => {
    const fetchRatingAnalysis = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/review/analyze-ratings"
        );
        setRatingAnalysis(response.data.ratingCounts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRatingAnalysis();
  }, []);

  return (
    <div>
      {ratingAnalysis && <PieChart ratings={ratingAnalysis} />}
     
    </div>
  );
};

export default ReviewAnalysis;
