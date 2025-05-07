// import React from 'react'
// import Sidebar from "./Sidebar";
// import { Link } from 'react-router-dom';
// import newusr from '../assets/new-usr.png'
// import './Dashboard.css'
// import ExpiringAccounts from './ExpiringAccounts';


// function Dashboard() {
//   return (
//     <div className="conatiner-fluid">
//       <div className="row">
//         <div className="col ">
//           <div className="whole-col">  
//           <div className="call-sidebar">
//             <Sidebar/>
//           </div>
//           <div className="dash-content">
//           <div className="dash-top">
//             <div className="new-reg">
//              <Link to="/Registration"><button className="newRegister"> <img src={newusr} alt="" /> New Register</button>  </Link>
//             </div><br />
//             <div className="access-but">
//               <button className="expiring"> Accounts are going to expire within 3 Days</button>
//               <button className="expired">Accounts Expired</button> 
//             </div>
//           </div><br />
//           <div className="expiry-table">
//             <ExpiringAccounts/>
//           </div>
//           </div>
//           </div>  
//         </div>
//       </div>
      
//     </div>
//   )
// }

// export default Dashboard


import React, { useState } from 'react';
import Sidebar from "./Sidebar";
import { Link } from 'react-router-dom';
import newusr from '../assets/new-usr.png';
import './Dashboard.css';
import ExpiringAccounts from './ExpiringAccounts';
import ExpiredAccounts from './ExpiredAccounts';

function Dashboard() {
  const [activeComponent, setActiveComponent] = useState("expiring"); 

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <div className="whole-col">  
            <div className="dash-content">
              <div className="dash-top">
                <div className="new-reg">
                  <Link to="/Registration">
                    <button className="newRegister"> 
                      <img src={newusr} alt="" /> New Register
                    </button>  
                  </Link>
                </div><br />
                <div className="access-but">
                  <button 
                    className={`expiring ${activeComponent === "expiring" ? "active" : ""}`} 
                    onClick={() => setActiveComponent("expiring")}
                  >
                    Accounts are going to expire within 3 Days
                  </button>
                  <button 
                    className={`expired ${activeComponent === "expired" ? "active" : ""}`} 
                    onClick={() => setActiveComponent("expired")}
                  >
                    Accounts Expired
                  </button> 
                </div>
              </div><br />
              <div className="expiry-table">
                {activeComponent === "expiring" ? <ExpiringAccounts /> : <ExpiredAccounts />}
              </div>
            </div>
          </div>  
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
