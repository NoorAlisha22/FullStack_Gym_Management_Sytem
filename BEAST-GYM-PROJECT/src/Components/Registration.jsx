// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom"; 
// import Back from "../assets/arrowleft.png";
// import Webcam from 'react-webcam';
// import axios from "axios";
// import "./Registration.css";

// const Registration = () => {
//   const navigate = useNavigate();
//   const webcamRef = React.useRef(null); 
//   const [photo, setPhoto]=useState(null);
//   const [formData, setFormData] = useState({
//     Name: "",
//     Age: "",
//     Gender: "",
//     Joining_Date: "",
//     City: "",
//     Phone_No: "",
//     Duration: "",
//     Type: "",
//     Payment_Mode: "",
//     Fees_Amount: "",
//     Photo:""
//   });

//   const capture = React.useCallback(() => {
//     if (webcamRef.current) { 
//         const imageSrc = webcamRef.current.getScreenshot(); 
//         setPhoto(imageSrc); 
//     } else {
//         console.error('Webcam reference is null');
//     }
// }, [webcamRef]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };
//   const handleChangeNUM = (e) => {
//     if(/^d*$/.test(e.target.value)){
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     }
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();

//   //   try {
//   //     const formDataWithPhoto = { ...formData, Photo: photo }; // Include photo
  
//   //     const response = await axios.post("http://127.0.0.1:8000/Reg", formDataWithPhoto);
//   //     alert(response.data.msg);
//   //     navigate("/Dashboard");
//   //   } catch (error) {
//   //     console.error("Error submitting form:", error);
//   //     alert("Error submitting form");
//   //   }
//   // };
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();

   
//     const joiningDate = new Date(formData.Joining_Date);
    
    
//     let expiryDate = new Date(joiningDate);

//     if (formData.Duration === "1 months") {
//       expiryDate.setMonth(expiryDate.getMonth() + 1);
//     } else if (formData.Duration === "3 months") {
//       expiryDate.setMonth(expiryDate.getMonth() + 3);
//     } else if (formData.Duration === "6 months") {
//       expiryDate.setMonth(expiryDate.getMonth() + 6);
//     } else if (formData.Duration === "12 months") {
//       expiryDate.setFullYear(expiryDate.getFullYear() + 1);
//     }
  

//     const formattedExpiryDate = expiryDate.toISOString().split('T')[0];
  

//     const formDataWithPhotoAndExpiry = {
//       ...formData,
//       Photo: photo,
//       Expired: formattedExpiryDate,
//     };
  
//     try {
//       const response = await axios.post("http://127.0.0.1:8000/Reg", formDataWithPhotoAndExpiry);
//       alert(response.data.msg);
//       navigate("/Dashboard");
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       alert("Error submitting form");
//    }
//   };




//   return (
//     <div className="container-fluid">
//       <div className="row">
//         <div className="col">
//           <div className="whole-div">
//             <div className="reg">
//               <p className="back">
//                 <img src={Back} alt="Back" onClick={() => navigate("/Dashboard")} /> Back
//               </p>
//               <p className="reg-head"><u>Re</u>gistration Form</p>

//               <form onSubmit={handleSubmit} className="inputs">
//                 <div className="inp1">
//                   <input type="text" name="Name" placeholder="Name" onChange={handleChange} required /><br />
//                   <input type="number" name="Age" placeholder="Age" onChange={handleChange} required /><br />
//                   <input type="text" name="Gender" placeholder="Gender" onChange={handleChange} required list="gender-list"/>
//                   <datalist id="gender-list">
//                     <option value="Female"/>
//                     <option value="Male"/>
//                     <option value="Others"/>
//                   </datalist>
//                   <br />
//                   <input type="text" name="Joining_Date"  placeholder="Joining Date" onChange={handleChange} required /><br />
//                   <input type="text" name="City" placeholder="City" onChange={handleChange} required /><br />
//                   <input type="number" name="Phone_No" placeholder="Contact Number" onChange={handleChangeNUM} pattern="[0-9]" inputMode="numeric" required /><br />
//                   <input type="text" name="Duration" placeholder="Membership Duration" onChange={handleChange} required list="duration-list"/>
//                   <datalist id="duration-list">
//                     <option value="6 months"/>
//                     <option value="12 months"/>
//                     <option value="3 months"/>
//                     <option value="1 months"/>
//                   </datalist>
//                   <br />                  
//                   <div className="radio-group">
//                     <label>
//                       <input type="radio" name="Type" value="Trainer" onChange={handleChange} required /> Trainer
//                     </label>
//                     <label>
//                       <input type="radio" name="Type" value="Personal Trainer" onChange={handleChange} required /> Personal Trainer
//                     </label>
//                   </div>

//                   <input type="text" name="Payment_Mode" placeholder="Payment Mode" onChange={handleChange} required list="pay-list"/>
//                   <datalist id="pay-list">
//                     <option value="Online"/>
//                     <option value="Cash"/>
//                   </datalist>
//                   <br />
//                   <input type="number" name="Fees_Amount" placeholder="Fees Amount" onChange={handleChange} required /><br />
                  
//                   <button type="submit" className="upload-but">Upload</button>
//               </div>  
//                 <div className="inp2" >
//                   <div className="camdiv" >
//                   <Webcam
//                       audio={false}
//                       ref={webcamRef}
//                       screenshotFormat="image/jpeg"
//                       width="100%"
//                       videoConstraints={{
//                                           facingMode: "user"
//                                         }}/>
//                   </div>
//                   <button  onClick={capture} className="take-photo">Take Photo</button>
//                 </div>
//                 </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Registration;

import React, { useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Back from "../assets/arrowleft.png";
import Webcam from 'react-webcam';
import axios from "axios";
import "./Registration.css";

const Registration = () => {
  const navigate = useNavigate();
  const webcamRef = useRef(null); 
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState(""); // Error message state

  const [formData, setFormData] = useState({
    Name: "",
    Age: "",
    Gender: "",
    Joining_Date: "",
    City: "",
    Phone_No: "",
    Duration: "",
    Type: "",
    Payment_Mode: "",
    Fees_Amount: "",
  });

  // Capture Photo without submitting the form
  const capture = useCallback(() => {
    if (webcamRef.current) { 
      const imageSrc = webcamRef.current.getScreenshot(); 
      setPhoto(imageSrc); // Set the photo
      setError(""); // Clear any previous error
    } else {
      console.error('Webcam reference is null');
    }
  }, [webcamRef]);

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

    const handleChangeNUM = (e) => {
    if(/^d*$/.test(e.target.value)){
    setFormData({ ...formData, [e.target.name]: e.target.value });
    }}
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate if all fields are filled
    // if (Object.values(formData).some(value => value.trim() === "") || !photo) {
    //   setError("All fields and a photo are required before submission.");
    //   return;
    // }

    // Calculate Expiry Date based on Duration
    const joiningDate = new Date(formData.Joining_Date);
    let expiryDate = new Date(joiningDate);
    if (formData.Duration === "1 months") expiryDate.setMonth(expiryDate.getMonth() + 1);
    else if (formData.Duration === "3 months") expiryDate.setMonth(expiryDate.getMonth() + 3);
    else if (formData.Duration === "6 months") expiryDate.setMonth(expiryDate.getMonth() + 6);
    else if (formData.Duration === "12 months") expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    
    const formattedExpiryDate = expiryDate.toISOString().split('T')[0];

    // Prepare final data
    const formDataWithPhoto = {
      ...formData,
      Photo: photo,
      Expired: formattedExpiryDate,
    };

    try {
      const response = await axios.post("http://127.0.0.1:8000/Reg", formDataWithPhoto);
      alert(response.data.msg);
      navigate("/Dashboard");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <div className="whole-div">
            <div className="reg">
              <p className="back">
                <img src={Back} alt="Back" onClick={() => navigate("/Dashboard")} /> Back
              </p>
              <p className="reg-head"><u>Re</u>gistration Form</p>

              {/* {error && <p style={{ color: "red" }}>{error}</p>} Show error if fields are missing */}

              <form onSubmit={handleSubmit} className="inputs">
                <div className="inp1">
                  <input type="text" name="Name" placeholder="Name" onChange={handleChange} required /><br />
                  <input type="number" name="Age" placeholder="Age" onChange={handleChange} required /><br />
                  <input type="text" name="Gender" placeholder="Gender" onChange={handleChange} required list="gender-list"/>
                  <datalist id="gender-list">
                    <option value="Female"/>
                    <option value="Male"/>
                    <option value="Others"/>
                  </datalist><br />
                  <input type="date" name="Joining_Date" onChange={handleChange} pattern="\d{4}-d{2}-d{2}" required /><br />
                  <input type="text" name="City" placeholder="City" onChange={handleChange} required /><br />
                  <input type="number" name="Phone_No" placeholder="Contact Number" onChange={handleChange} inputMode="numeric" required /><br />
                  <input type="text" name="Duration" placeholder="Membership Duration" onChange={handleChange} required list="duration-list"/>
                  <datalist id="duration-list">
                    <option value="6 months"/>
                    <option value="12 months"/>
                    <option value="3 months"/>
                    <option value="1 months"/>
                  </datalist><br />
                  
                  <div className="radio-group">
                    <label>
                      <input type="radio" name="Type" value="Trainer" onChange={handleChange} required /> Trainer
                    </label>
                    <label>
                      <input type="radio" name="Type" value="Personal Trainer" onChange={handleChange} required /> Personal Trainer
                    </label>
                  </div>

                  <input type="text" name="Payment_Mode" placeholder="Payment Mode" onChange={handleChange} required list="pay-list"/>
                  <datalist id="pay-list">
                    <option value="Online"/>
                    <option value="Cash"/>
                  </datalist><br />
                  <input type="number" name="Fees_Amount" placeholder="Fees Amount" onChange={handleChange} required /><br />
                  
                  <button type="submit" className="upload-but">Upload</button>
              </div>  

                {/* Photo Capture Section */}
                <div className="inp2">
                  <div className="camdiv">
                    <Webcam
                      audio={false}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      width="100%"
                      videoConstraints={{ facingMode: "user" }}
                    />
                  </div>
                  <button type="button" onClick={capture} className="take-photo">Take Photo</button>
                  
                  {/* Show captured photo */}
                  {photo && (
                    <div>
                      <img src={photo} alt="Captured" style={{ width: "200px", height: "130px", marginTop: "30px" }} />
                      <p style={{color:"white"}}>Click "Take Photo" again to retake.</p>
                    </div>
                  )}
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;



