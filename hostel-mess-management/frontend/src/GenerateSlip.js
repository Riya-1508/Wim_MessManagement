import React, { useRef, useEffect } from "react";
import Slip from "./Slip";
import html2pdf from "html2pdf.js";

function GenerateSlip() {
  const pdfGeneratorRef = useRef(null);

  const handleDownloadPDF = () => {
    if (pdfGeneratorRef.current) {
      pdfGeneratorRef.current.generatePDF();
    }
  };

  useEffect(() => {
    // When the page loads, check if there is data in localStorage
    const pdfData = localStorage.getItem("pdfData");
    if (pdfData) {
      const formData = JSON.parse(pdfData);
      // Render the Slip component with the data
      pdfGeneratorRef.current.setFormUsers(formData);
    }
  }, []);

  return (
    <div>
      {/* ... your existing JSX ... */}
      <button onClick={handleDownloadPDF}>Download PDF</button>
      <div style={{ display: "none" }}>
        {/* Render the Slip component but keep it hidden */}
        <Slip ref={pdfGeneratorRef} />
      </div>
    </div>
  );
}

export default GenerateSlip;
