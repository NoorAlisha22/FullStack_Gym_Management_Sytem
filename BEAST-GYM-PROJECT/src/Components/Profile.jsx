

import { useLocation } from "react-router-dom";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import avatar from '../assets/avatar.png'; 
import Back from '../assets/arrow-left.png';
import Line from '../assets/Line.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const location = useLocation();
  const accountData = location.state?.account || {};

  const webcamRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showWebcam, setShowWebcam] = useState(false);
  const [photo, setPhoto] = useState(accountData?.Photo || "");

  const [profile, setProfile] = useState({
    name: accountData?.Name || "",
    age: accountData?.Age || "",
    gender: accountData?.Gender || "",
    city: accountData?.City || "",
    phone_no: accountData?.Phone_No || "",
    duration: accountData?.Duration || "",
    joining_date: accountData?.Joining_Date || "",
    expiredTill: accountData?.Expired_Till || "",
    expired_date: accountData?.Expired || "",
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const updatedProfile = {
        ...profile,
        expired_date: profile.expired_date,
        Photo: photo, 
      };
      console.log(profile.expired_date)/
      console.log(photo);
      

      // const response = await axios.post(`http://localhost:8000/api/updateProfile/${accountData?.Sno}`, updatedProfile);
      const response = await axios.post(
        `http://localhost:8000/api/updateProfile/${accountData?.Sno}`,
        updatedProfile,
        { headers: { 'Content-Type': 'application/json' } }
      );
      
      console.log("Payload being sent:", updatedProfile);

      if (response.status === 200) {
        console.log('Profile updated successfully');
        setIsEditing(false);
        setShowWebcam(false);
      } else {
        console.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setPhoto(imageSrc);
      setShowWebcam(false);
    }
  }, [webcamRef]);

  const calculateDaysUntilExpiration = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const differenceInTime = expiry - today;
    return Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));
  };

  useEffect(() => {
    if (profile.expired_date) {
      const daysUntilExpiration = calculateDaysUntilExpiration(profile.expired_date);
      setProfile((prevProfile) => ({
        ...prevProfile,
        expiredTill: daysUntilExpiration 
      }));
    }
  }, [profile.expired_date]);

  return (
    <div className="container-fluid">
      <div className="row">   
        <div className="col"> 
          <div className="whole-div"> 
            <div className="mela">
              <div className="profile-div">
                <div className="prf-top">
                  <p>View Profile</p>
                  <Link to="/ViewRegistered"> 
                    <p><img src={Back} alt="" /> Back</p> 
                  </Link> 
                </div>

                <div className="avatar-div">
                  {showWebcam ? (
                    <div className="webcam-container">
                      <Webcam 
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        width="200px"
                        style={{borderRadius:"100%"}}
                      />
                      <button onClick={capture} className="capture-btn">Capture Photo</button>
                    </div>
                  ) : (
                    <img src={photo || avatar} alt="Profile" className="avatar" />
                  )}
                  {isEditing && (
                    <button onClick={() => setShowWebcam(true)} className="change-photo-btn">Change Photo</button>
                  )}
                </div>

                {isEditing ? (
                  <input 
                    type="text" 
                    name="name"
                    value={profile.name} 
                    onChange={handleChange} 
                    className="edit-input name-input"
                  />
                ) : (
                  <p className="name">{profile.name}</p>
                )}

                <div className="content-div1">
                  <div className="div1">
                    <p>Age</p>
                    {isEditing ? (
                      <input type="text" name="age" value={profile.age} onChange={handleChange} className="edit-input"/>
                    ) : (
                      <p>{profile.age}</p>
                    )}
                  </div>
                  <img src={Line} alt="" />

                  <div className="div2">
                    <p>Gender</p>
                    {isEditing ? (
                      <select name="gender" value={profile.gender} onChange={handleChange} className="edit-input">
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    ) : (
                      <p>{profile.gender}</p>
                    )}
                  </div>
                  <img src={Line} alt="" />

                  <div className="div3">
                    <p>Contact Number</p>
                    {isEditing ? (
                      <input type="text" name="contact" value={profile.phone_no} onChange={handleChange} className="edit-input"/>
                    ) : (
                      <p>{profile.phone_no}</p>
                    )}
                  </div>
                  <img src={Line} alt="" />

                  <div className="div4">
                    <p>City</p>
                    {isEditing ? (
                      <input type="text" name="city" value={profile.city} onChange={handleChange} className="edit-input"/>
                    ) : (
                      <p>{profile.city}</p>
                    )}
                  </div>
                </div>

                <div className="content-div2">
                  <div className="d1">
                    <p>Duration</p>
                    {isEditing ? (
                      <input type="text" name="duration" value={profile.duration} onChange={handleChange} className="edit-input"/>
                    ) : (
                      <p>{profile.duration}</p>
                    )}
                  </div>

                  <div className="d2">
                    <p>Joining Date</p>
                    {isEditing ? (
                      <input type="text" name="joiningDate" value={profile.joining_date} onChange={handleChange} className="edit-input"/>
                    ) : (
                      <p>{profile.joining_date}</p>
                    )}
                  </div>

                  <div className="d3">
                    <p>Expired Till</p>
                    <p>{} days left</p>
                  </div>

                  <div className="d4">
                    <p>Expired Date</p>
                    {isEditing ? (
                      <input type="text" name="expiredDate" value={profile.expired_date} onChange={handleChange} className="edit-input"/>
                    ) : (
                      <p>{profile.expired_date}</p>
                    )}
                  </div>
                </div>
                
                <div className="b-div"> 
                  {isEditing ? (
                    <button className="save-btn" onClick={handleSave}>Save</button>
                  ) : (
                    <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit</button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;











