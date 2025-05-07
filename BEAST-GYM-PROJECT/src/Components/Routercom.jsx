// import React from 'react'
// import {Router,Routes,Route} from 'react-router-dom'
// import Home from './Home'
// import Login from './Login'
// // import Forgotpass from './Forgotpass'
// import Forgotpass from './Forgotpass'
// import Dashboard from './Dashboard'
// import OtpVerification from './OTP'
// import ResetPassword from './ResetPassword'
// import ExpiringAccounts from './ExpiringAccounts'
// import Registration from './Registration'
// import Sidebar from './Sidebar'
// import ViewRegistered from './ViewRegistered'
// import PaymentHistory from './PaymentHistory'
// import Logout from './Logout'
// import Profile from './Profile'

// const Routercom = () => {
//   return (
//     <div>
//       <>  
//       {window.location.pathname !=="/"?<Sidebar/>:null}
//       {window.location.pathname !=="/Login"?<Sidebar/>:null}
//       {window.location.pathname !=="Forgotpass"?<Sidebar/>:null}
//       {window.location.pathname !=="/OTP"?<Sidebar/>:null}
//       {window.location.pathname !=="/ResetPass"?<Sidebar/>:null}

//       <Routes>
//         <Route path="/" element={<Home/>}/>
//         <Route path="/Login" element={<Login/>}/>
//         <Route Path="/Forgotpass" element={<Forgotpass/>}/>
//         <Route path="/Dashboard" element={<Dashboard/>}/>
//         <Route path="/OTP" element={<OtpVerification/>}/>
//         <Route path="/ResetPass" element={<ResetPassword/>}/>
//         <Route path="/Sidebar" element={<Sidebar/>}/>
//         <Route path="/ExpiringAccounts" element={<ExpiringAccounts/>}/>
//         <Route path="/Registration" element={<Registration/>}/>
//         <Route path="/ViewRegistered" element={<ViewRegistered/>}/>
//         <Route path='/PaymentHistory' element={<PaymentHistory/>}/>
//         <Route path="/Profile" element={<Profile/>}/>
//         <Route path='/Logout' element={<Logout/>}/>

//       </Routes>
//       </>
//     </div>
//   )
// }

// export default Routercom





import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Forgotpass from './Forgotpass';
import Dashboard from './Dashboard';
import OtpVerification from './OTP';
import ResetPassword from './ResetPassword';
import ExpiringAccounts from './ExpiringAccounts';
import Registration from './Registration';
import ViewRegistered from './ViewRegistered';
import PaymentHistory from './PaymentHistory';
import Logout from './Logout';
import Profile from './Profile';
import Sidebar from './Sidebar';

const styles = {
  appContainer: {
    display:  'flex',
    height: '100vh',
  },
  sidebar: {
    width: '350px',
    height: '100vh',
    position: 'fixed',
    left: '0',
    top: '0',
    color: 'black',
  },
  contentContainer: {
    flex: 1,
    marginLeft: '350px',
    // padding: '20px',
    // overflowY: 'auto',
    width: 'calc(100% - 250px)',
  },
  fullWidth: {
    marginLeft: '0',
    width: '100%',
  },
};

const Routercom = () => {
  const location = useLocation();
  const hideSidebarPaths = ["/", "/Login", "/Forgotpass", "/OTP", "/ResetPass"];

  return (
    <div style={styles.appContainer}>
     
      {!hideSidebarPaths.includes(location.pathname) && <div style={styles.sidebar}><Sidebar /></div>}

     
      <div style={{ 
        ...styles.contentContainer, 
        ...(hideSidebarPaths.includes(location.pathname) ? styles.fullWidth : {}) 
      }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Forgotpass" element={<Forgotpass />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/OTP" element={<OtpVerification />} />
          <Route path="/ResetPass" element={<ResetPassword />} />
          <Route path="/ExpiringAccounts" element={<ExpiringAccounts />} />
          <Route path="/Registration" element={<Registration />} />
          <Route path="/ViewRegistered" element={<ViewRegistered />} />
          <Route path="/PaymentHistory" element={<PaymentHistory />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Logout" element={<Logout />} />
        </Routes>
      </div>
    </div>
  );
};

export default Routercom;