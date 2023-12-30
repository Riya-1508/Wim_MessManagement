import React from "react";
import "chart.js/auto";
import { Pie } from "react-chartjs-2";
import "./PieChart.css"; // Import the CSS file

const PieChart = ({ ratings }) => {
  const data = {
    labels: Object.keys(ratings),
    datasets: [
      {
        data: Object.values(ratings),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#47d147",
          "#9966FF",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#47d147",
          "#9966FF",
        ],
      },
    ],
  };

 

  const titleStyle = {
    fontSize: "24px", // Increase the font size of the title
  };

  return (
    <div id="chart-container">
      <h2 style={titleStyle}>Ratings Distribution</h2>
      <Pie
        data={data}
       
      />
    </div>
  );
};

export default PieChart;
