import React, { useState } from 'react';
import axios from 'axios';

const OTPComponent = () => {
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');
  const [message, setMessage] = useState('');

  const sendOTP = async () => {
    try {
        
      const response = await axios.post('http://localhost:5000/api/formAuth/sendOTP', { email });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Failed to send OTP.');
      // Handle error
    }
  };

  const verifyOTP = async () => {
    try {
      const response = await axios.post('/api/verifyOTP', { email, otp });
      setMessage(response.data.message);
      // Handle successful verification
    } catch (error) {
      setMessage('Invalid OTP.');
      // Handle verification failure
    }
  };

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Email"
      />
      <button onClick={sendOTP}>Send OTP</button>
      <br />
      <input
        type="text"
        value={otp}
        onChange={(e) => setOTP(e.target.value)}
        placeholder="Enter OTP"
      />
      <button onClick={verifyOTP}>Verify OTP</button>
      <p>{message}</p>
    </div>
  );
};

export default OTPComponent;
