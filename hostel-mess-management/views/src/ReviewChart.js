// ReviewChart.js
// ReviewAnalysis.js
import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';

const ReviewAnalysis = () => {
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    // Fetch rating analysis data when the component mounts
    const fetchAnalysis = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/review/analyze-ratings');
        setAnalysis(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAnalysis();
  }, []);

  if (!analysis) {
    return null;
  }

  // Extract data for the pie chart
  const { ratingCounts } = analysis;
  const chartData = {
    labels: Object.keys(ratingCounts),
    datasets: [
      {
        data: Object.values(ratingCounts),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#47d147', '#9966FF'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#47d147', '#9966FF'],
      },
    ],
  };

  return (
    <div>
      <h2>Review Analysis</h2>
      <Doughnut data={chartData} />
    </div>
  );
};

export default ReviewAnalysis;
