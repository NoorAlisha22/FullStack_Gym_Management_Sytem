import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Ellipse from '../assets/Ellipse.png'
import Line from '../assets/Line.png'
import './OTP.css'

const OtpVerification = () => {
    const [otp, setOtp] = useState(["", "", "", ""]);
    const inputRefs = useRef([]);
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;

    const handleVerifyOTP = async () => {
        const response = await fetch("http://localhost:8000/verify-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, otp: otp.join("") }),
        });
        const data = await response.json();
        if (response.ok) {
            navigate("/ResetPass", { state: { email } });
        } else {
            alert(data.detail);
        }
    };

    const handleChange = (e, index) => {
        const value = e.target.value;
        if (isNaN(value)) ;

        let newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1); 
        setOtp(newOtp);

      
        if (value && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    return (
        <div className="login-parent">
            <div className="login-box">
            <div className='head-content'>  
                    <div className="logo-circle"><img src={Ellipse} alt="" /></div>
                     <div className="logo-circle"><img src={Line} alt="" /></div>
                     <div className="gym-name">
                       <p> Beast Forces</p>
                       <p> Gym</p>
                     </div>
                     </div>
                <h4>Enter Your OTP</h4>
                <div className="otp-container">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handleChange(e, index)}
                            ref={(el) => (inputRefs.current[index] = el)}
                            className="otp-input"
                        />
                    ))}
                </div>
                <button className="login-btn" onClick={handleVerifyOTP}>Verify</button>
            </div>
        </div>
    );
};

export default OtpVerification;;









































































// import React, { useState } from "react";
// import "./OTP.css";
// import Ellipse from "../assets/Ellipse.png";
// import Line from "../assets/Line.png";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const OtpVerification = () => {
//   const [otp, setOtp] = useState(["", "", "", ""]);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (index, event) => {
//     const value = event.target.value;
//     if (isNaN(value)) return;
    
//     let newOtp = [...otp];
//     newOtp[index] = value.substring(value.length - 1); 
//     setOtp(newOtp);

//     if (value && index < 3) {
//       document.getElementById(otp-input-`${index + 2}`).focus();
//     }
//   };

//   const handleSubmit = async () => {
//     setError("");
//     const otpCode = otp.join("");
    
//     try {
//       const response = await axios.post("http://127.0.0.1:8000/verifyotp", { otp: otpCode });
//       console.log(response.data);
//       alert("OTP verified successfully!");
//       navigate("/ResetPass");
//     } catch (error) {
//       console.error("OTP verification failed:", error);
//       setError("Invalid OTP, please try again.");
//     }
//   };

//   return (
//     <div className="login-parent">
//       <div className="login-box">
//         <div className="head-content">
//           <div className="logo-circle"><img src={Ellipse} alt="" /></div>
//           <div className="logo-circle"><img src={Line} alt="" /></div>
//           <div className="gym-name">
//             <p>Beast Forces</p>
//             <p>Gym</p>
//           </div>
//         </div>

//         <h4>Enter Your OTP</h4>
//         {error && <p className="error-message text-danger">{error}</p>}

//         <div className="otp-container">
//           {otp.map((digit, index) => (
//             <input
//               key={index}
//               id={otp-input-`${index + 1}`}
//               type="text"
//               maxLength="1"
//               value={digit}
//               onChange={(e) => handleChange(index, e)}
//               className="otp-input"
//             />
//           ))}
//         </div>

//         <button className="login-btn" onClick={handleSubmit}>Verify OTP</button>
//         <h6 className="resend-text">Resend the OTP</h6>
//       </div>
//     </div>
//   );
// };

// export default OtpVerification;