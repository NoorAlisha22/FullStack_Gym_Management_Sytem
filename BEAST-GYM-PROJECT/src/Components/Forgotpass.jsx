// import React from 'react';
// import './Forgotpass.css';
// import envelope from '../assets/envelope.png'
// import Ellipse from '../assets/Ellipse.png'
// import Line from '../assets/Line.png'
// import { Link } from 'react-router-dom';


// const Forgotpass = () => {
//   return (
//     <div className='login-parent'>
//       <div className="login-box">
//     <div className='head-content'>  
//                   <div className="logo-circle"><img src={Ellipse} alt="" /></div>
//                   <div className="logo-circle"><img src={Line} alt="" /></div>
//                   <div className="gym-name">
//                     <p> Beast Forces</p>
//                     <p> Gym</p>
//                   </div>
//                   </div>

    
//         <h4>Forgot Your Password?</h4>
//         <p className="instruction-text">
//           Enter your email below to receive your OTP
//         </p>

  
//         <div className="input-field">
//           <img src={envelope}  className="input-icon" />
//           <input type="email" placeholder="Email" />
//         </div>

     
//         <Link to='/OTP'><button className="login-btn">Send</button></Link>
//       </div>
//     </div>
//   );
// }

// export default Forgotpass;  



//-----------------------------------------------------------------------
//own forgotpass
// import React from 'react';
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import './Forgotpass.css';
// import envelope from '../assets/envelope.png'
// import Ellipse from '../assets/Ellipse.png'
// import Line from '../assets/Line.png'



// const Forgotpass = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [error, setError] = useState("");

//   const handleemail = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const response = await axios.get("http://127.0.0.1:8000/forgotpassword", {
//         auth: {
//           username: email
//         }
//       });

//       console.log(response.data);
//       alert("Login successful!");
//       navigate("/OTP");
//     } catch (error) {
//       console.error("Login failed:", error);
//       setError("Invalid email");
//     }
//   };
//   return (
//     <div className='login-parent'>
//       <div className="login-box">
//     <div className='head-content'>  
//                   <div className="logo-circle"><img src={Ellipse} alt="" /></div>
//                   <div className="logo-circle"><img src={Line} alt="" /></div>
//                   <div className="gym-name">
//                     <p> Beast Forces</p>
//                     <p> Gym</p>
//                   </div>
//                   </div>

//         <h4>Forgot Your Password?</h4>
//         {error && <p className="error-message text-danger">{error}</p>}
//         <p className="instruction-text">
//           Enter your email below to receive your OTP
//         </p>

//   <form onSubmit={handleemail}>
//         <div className="input-field">
//           <img src={envelope}  className="input-icon" />
//           <input 
//           type="email" 
//           placeholder="Email"
//           onChange={(e)=> setEmail(e.target.value)} />
//         </div>

     
//         <button className="login-btn">Send</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Forgotpass;


import React, { useState } from 'react';
import './Forgotpass.css';
import envelope from '../assets/envelope.png';
import { useNavigate } from 'react-router-dom';

const Forgotpass = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSendOTP = async () => {
        const response = await fetch("http://localhost:8000/forgot-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });
        const data = await response.json();
        if (response.ok) {
            navigate("/OTP", { state: { email } });
        } else {
            setMessage(data.detail);
        }
    };

    return (
        <div className='login-parent'>
            <div className="login-box">
                <h4>Forgot Your Password?</h4>  
                <p className="instruction-text">Enter your email below to receive your OTP</p>  
                <div className="input-field">
                    <img src={envelope} className="input-icon" alt="envelope" />  
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>  
                <button className="login-btn" onClick={handleSendOTP}>Send</button>  
                {message && <p className="error">{message}</p>}
            </div>
        </div>
    );
};

export default Forgotpass;

