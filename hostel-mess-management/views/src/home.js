import React, { useState, useEffect } from "react";
import Navigation from "./Navigation.js";
import Footer from "./Footer.js";
import "./home.css";
import VJTIKhanaJunctionvideo from "./assets/VJTIKhanaJunctionvideo.mp4";

function Home() {
  const [isPageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    // Set a delay of 500ms to show the page content after the fade-in effect
    setTimeout(() => {
      setPageLoaded(true);
    }, 100);
  }, []);

  return (
    <div>
      <Navigation />

      <section className="bg-vid">
        <div className="center-rectangle1">
          <div
            className={`gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl transition-opacity duration-1000 ${
              isPageLoaded ? "opacity-100" : "opacity-0"
            }`}
          >
            <video
              src={VJTIKhanaJunctionvideo}
              autoPlay
              loop
              muted
              className="fullscreen-video"
            ></video>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
