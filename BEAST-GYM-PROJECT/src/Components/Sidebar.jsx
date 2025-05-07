import React from 'react'
import list1 from '../assets/list1.png'
import list2 from '../assets/list2.png'
import list3 from '../assets/list3.png'
import logout from '../assets/sign-out-alt.png'
import Dashboard from "./Dashboard";
import Ellipse from '../assets/Ellipse.png';
import './Sidebar.css'
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="container-fluid">
      <div className="row">
        {/* <div className="col whole-col"> */}
          <div className="col1-dash">
            <div className="log">
              <div className="logo-circle"><img src={Ellipse} alt="Ellipse" /></div>
              <h3 className="title">Beast Forces</h3>
            </div>
            <div className="dashboard-div">
              <ul className="navList">
              <Link to="/Dashboard">    <li  className="navItem"><img src={list1} alt="" /> Dashboard</li></Link>
              <Link to="/ViewRegistered">  <li className="navItem"><img src={list2} alt="" /> View Registered</li></Link>
              <Link to="/PaymentHistory"> <li className="navItem"><img src={list3} alt="" />Payment History</li></Link>
              </ul>
              <Link to="/Logout"><button  className="logoutt"><img src={logout} alt="" /> Logout</button></Link>
            </div>
          </div>
        {/* </div> */}
      </div>
      
    </div>
  )
}

export default Sidebar
