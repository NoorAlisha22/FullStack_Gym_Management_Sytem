import React from 'react';
import './Login.css';
import envelope from '../assets/envelope.png';
import lock from '../assets/lock.png';
import Ellipse from '../assets/Ellipse.png';
import Line from '../assets/Line.png'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className='login-parent container-fluid'>
      <div className="login-box">
        
  
        <div className='head-content'>  
          <div className="logo-circle">
            <img src={Ellipse} alt="Logo" />
          </div>
          <div className="line-separator"> 
            <img src={Line} alt="Line" /> 
          </div>
          <div className="gym-name">
            <p>Beast Forces</p>
            <p>Gym</p>
          </div>
        </div>

      
        <h4><u>Lo</u>gin</h4>

        <div className="input-field">
          <img src={envelope} className="input-icon" alt="Email Icon" />
          <input type="email" placeholder="Email" />
        </div>

        <div className="input-field">
          <img src={lock} className="input-icon" alt="Lock Icon" />
          <input type="password" placeholder="Password" />
        </div>

        <Link to="/Forgotpass">
          <p className="forgot-password">Forgot password?</p>
        </Link> 

        <Link to="/Dashboard">
          <button className="login-btn">Login</button>
        </Link>

      </div>
    </div>
  );
}

export default Login;


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./Login.css";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import envelope from "../assets/envelope.png";
// import lock from "../assets/lock.png";
// import Ellipse from "../assets/Ellipse.png";
// import Line from "../assets/Line.png";
// import { Link } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const response = await axios.get("http://127.0.0.1:8000/login", {
//         auth: {
//           username: email,
//           password: password
//         }
//       });

//       console.log(response.data);
//       alert("Login successful!");
//       navigate("/Dashboard");
//     } catch (error) {
//       console.error("Login failed:", error);
//       setError("Invalid email or password");
//     }
//   };

//   return (
//     <div className="login-parent container-fluid">
//       <div className="login-box">
//         <div className="head-content">
//           <div className="logo-circle">
//             <img src={Ellipse} alt="Logo" />
//           </div>
//           <div className="line-separator">
//             <img src={Line} alt="Line" />
//           </div>
//           <div className="gym-name">
//             <p>Beast Forces</p>
//             <p>Gym</p>
//           </div>
//         </div>

//         <h4><u>Lo</u>gin</h4>

//         {error && <p className="error-message text-danger">{error}</p>}

//         <form onSubmit={handleLogin}>
//           <div className="input-field">
//             <img src={envelope} className="input-icon" alt="Email Icon" />
//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <div className="input-field">
//             <img src={lock} className="input-icon" alt="Lock Icon" />
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//          <Link to="/Forgotpass">  <p className="forgot-password">Forgot password?</p></Link>
//           <button type="submit" className="login-btn">Login</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;