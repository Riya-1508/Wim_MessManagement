import React, { useState, useEffect } from "react";
import Navigation from "./Navigation.js";
import Footer from "./Footer.js";
import "./home.css";
import railwayVideo2 from "./assets/railwayVideo2.mp4";

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
      {/* <section className="dark:bg-gray-900 "> */}

      <section className="bg-vid">
        <div className="center-rectangle1">
          {/* <div className="rectangle"> */}
          <div
            className={`gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl transition-opacity duration-1000 ${
              isPageLoaded ? "opacity-100" : "opacity-0"
            }`}
          >
            <video
              src={railwayVideo2}
              autoPlay
              loop
              muted
              className="fullscreen-video"
            ></video>

            <div className="rectangle1">
              {/* <div className="box"> */}
              <div
                className="py-8 px-8 mx-auto max-w-screen-xl "
                style={{ backgroundColor: "black", opacity: 1 }}
              >
                <div className="font-light text-gray-500 sm:text-lg dark:text-gray-200 text-center text-justify">
                  <h2 className="mb-4 text-l tracking-tight font-extrabold text-gray-900 dark:text-white">
                    VJTI Railway Concession Portal: Your Hassle-Free Travel
                    Solution!
                  </h2>
                  {/* <h3 className="mb-2 text-3xl tracking-tight font-bold text-gray-900 dark:text-white">
                    Your Hassle-Free Travel Solution!
                  </h3> */}
                  <p className="mb-4 text-m">
                    Welcome to the VJTI Railway Concession Portal, where
                    convenience meets efficiency.
                  </p>
                  <p className="mb-4 text-m">
                    Skip the queues and paperwork with our user-friendly
                    platform designed exclusively for VJTI students. Enjoy easy
                    access to railway concessions and updates, making your
                    commute smoother than ever. Embrace the future of
                    hassle-free travel!
                  </p>

                  <p className="mb-4 text-m">
                    30% Concession is given by College.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div
        className={`bg-gray-200 flex flex-col justify-center items-center space-y-10 transition-opacity duration-1000 ${
          isPageLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="bg-black text-white text-4xl font-bond mt-5 p-4">
          Mumbai Railway System
        </p>
        <img
          src="https://erail.in/images/net-map/mumbai-local-trains.jpg"
          className="rounded-2xl my-8 h-[600px] w-[600px] pb-3 "
          alt=""
        ></img>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
