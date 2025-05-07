import React from 'react';
import { FaInstagram, FaWhatsapp, FaGoogle, FaFacebook } from 'react-icons/fa';
import './Home.css';
import {Link} from 'react-router-dom';

const Home = () => {
  return (
    <div className="parent container-fluid">
  <div className="row">   
    <div className="col"> 
      <div className="land-div">  
      <p className="head">⚪Beast Forces</p>

    
      <div className="innerdiv">
        <h1>Get Ready</h1>
        <p>Shape your body</p><br />
        <i>
          "The harder you work and the more prepared you are  for something, you're going to be able to persevere through anything."
        </i>

      <Link to="/Login"> 
        <button className="start-buttn">Get Started</button>
        </Link>
      </div>
      </div>

   
      {/* <div className="icon-div">
        <button className="icon-btn"><FaFacebook /></button>
        <button className="icon-btn"><FaGoogle /></button>
        <button className="icon-btn"><FaInstagram /></button>
        <button className="icon-btn"><FaWhatsapp /></button>
      </div> */}
      </div>
      </div>
    </div>
  );
};

export default Home;