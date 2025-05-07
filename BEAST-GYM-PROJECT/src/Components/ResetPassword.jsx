// import React from 'react';
// import './Login.css';
// import lock from '../assets/lock.png'
// import Line from '../assets/Line.png'
// import Ellipse from '../assets/Ellipse.png'
// import { Link } from 'react-router-dom';

// const ResetPassword = () => {
//   return (
//     <div className='login-parent'>
//       <div className="login-box">
//       <div className='head-content'>  
//                     <div className="logo-circle"><img src={Ellipse} alt="" /></div>
//                     <div className="logo-circle"><img src={Line} alt="" /></div>
//                     <div className="gym-name">
//                       <p> Beast Forces</p>
//                       <p> Gym</p>
//                     </div>
//                     </div>
//         <h4>Reset Password</h4>
//         <p className="instruction-text">
//           Enter your new password below, <br />
//           we are just being extra safe.
//         </p>
//         <div className="input-field">
//           <img src={lock}className="input-icon" />
//           <input type="password" placeholder="Enter your password" />
//         </div>    
//         <div className="input-field">
//           <img src={lock} className="input-icon" />
//           <input type="password" placeholder="Confirm Password" />
//         </div><br />
//        <Link to="/Login">   <button className="login-btn">Save</button></Link>
//       </div>
//     </div>
//   );
// }

// export default ResetPassword;
// --------------------------------------------------------------------------------------------------------------------------------



import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const location = useLocation();
    const email = location.state?.email;
    const navigate = useNavigate();

    // const handleResetPassword = async () => {
    //     if (password !== confirmPassword) {
    //         alert("Passwords do not match!");
    //         return;
    //     }

    //     const response = await fetch("http://localhost:8000/reset-password", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({ email, new_password: password }),
    //     });
    //     const data = await response.json();
    //     if (response.ok) {
    //         alert("Password reset successful!");
    //         navigate("/Login");
    //     } else {
    //         alert(data.detail);
    //     }
    // };
    const handleResetPassword = async () => {
      if (password !== confirmPassword) {
          alert("Passwords do not match!");
          return;
      }
  
      try {
          const response = await fetch("http://localhost:8000/reset-password", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, new_password: password }),
          });
  
          const data = await response.json();
  
          if (response.ok) {
              alert("Password reset successful!");
              navigate("/Login");
          } else {
              alert(data.detail || "Failed to reset password.");
          }
      } catch (error) {
          console.error("Error:", error);
          alert("Something went wrong. Please try again.");
      }
  };
    return (
        <div className='login-parent'>
            <div className="login-box">
                <h4>Reset Password</h4>  
                <div className="input-field">  
                    <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>  
                <div className="input-field">  
                    <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>  
                <button className="login-btn" onClick={handleResetPassword}>Save</button>  
            </div>
        </div>
    );
};

export default ResetPassword;
























// import React, { useState } from "react";
// import "./Login.css";
// import lock from "../assets/lock.png";
// import Line from "../assets/Line.png";
// import Ellipse from "../assets/Ellipse.png";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const ResetPassword = () => {
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async () => {
//     setError("");

//     if (password !== confirmPassword) {
//       setError("Passwords do not match!");
//       return;
//     }

//     try {
//       const response = await axios.post("http://127.0.0.1:8000/resetpassword", { password });
//       console.log(response.data);
//       alert("Password reset successful!");
//       navigate("/Login");
//     } catch (error) {
//       console.error("Password reset failed:", error);
//       setError("Error resetting password. Try again.");
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

//         <h4>Reset Password</h4>
//         {error && <p className="error-message text-danger">{error}</p>}
//         <p className="instruction-text">
//           Enter your new password below, <br />
//           we are just being extra safe.
//         </p>

//         <div className="input-field">
//           <img src={lock} className="input-icon" />
//           <input 
//             type="password" 
//             placeholder="Enter your password" 
//             value={password} 
//             onChange={(e) => setPassword(e.target.value)} 
//           />
//         </div>
        
//         <div className="input-field">
//           <img src={lock} className="input-icon" />
//           <input 
//             type="password" 
//             placeholder="Confirm Password" 
//             value={confirmPassword} 
//             onChange={(e) => setConfirmPassword(e.target.value)} 
//           />
//         </div><br />

//         <button className="login-btn" onClick={handleSubmit}>Save</button>
//       </div>
//     </div>
//   );
// };

// export default ResetPassword;