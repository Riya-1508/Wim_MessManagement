import React, { useRef, useEffect } from "react";
import "chart.js/auto";
import { Pie } from "react-chartjs-2";
import "./PieChart.css"; // Import the CSS file

const PieChart = ({ ratings }) => {
  const chartContainerRef = useRef();

  useEffect(() => {
    // Access the canvas element through the ref
    const canvas = chartContainerRef.current.querySelector("canvas");

    // Modify the canvas or apply additional styles
    if (canvas) {
      canvas.style.border = "2px solid blue";
      
    }
  }, []);
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
const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};
  const titleStyle = {
    fontSize: "24px", // Increase the font size of the title
  };

  return (
    <div id="chart-container" style={containerStyle} ref={chartContainerRef}>
      <h2 style={titleStyle}>Ratings Distribution</h2>
      <Pie
        data={data}
        width={1300}
        height={600}
        options={{ responsive: false }}
      />
    </div>
  );
};

export default PieChart;
