import React from 'react';

const Timimgs = () => {
  return (
    <div className="about-us">
      <div
        style={{
          backgroundImage:
            'url("https://img.freepik.com/premium-photo/healthy-ingredients-white-wooden-desk_23-2148194994.jpg?w=826")',
          backgroundSize: 'cover',
          height: '480px',
          paddingTop: '80px',
        }}
        className="min-h-screen bg-gray-100 p-3 relative"
      >
        <div className="w-96 mx-auto" style={{ scrollSnapType: 'x mandatory' }}>
          {/* Section 1: Mess Timings */}
          <div className="">
            <div
              className="w-96 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg transition-all duration-300 opacity-100 z-10"
            >
              <img
                className="rounded-t-lg w-96 h-64"
                src="https://images.unsplash.com/photo-1501139083538-0139583c060f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dGltZXxlbnwwfHwwfHw%3D&w=1000&q=80"
                alt=""
              />
              <div className="py-4 px-8">
                <h1 className="mt-2 text-gray-900 font-bold text-2xl tracking-tight">MESS TIMINGS</h1>
                <p className="py-3 text-gray-600 leading-6">
                  <h6>BREAKFAST: 7:30 AM - 9:00 AM</h6>
                  <h6>LUNCH: 12:30 PM - 2:00 PM</h6>
                  <h6>DINNER: 7:30 PM - 9:00 PM</h6>
                </p>
              </div>
            </div>
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default Timimgs;
