// import Dashboard from './Components/Dashboard.jsx'
// import Forgotpass from './Components/Forgotpass.jsx'
// import  Home from './Components/Home.jsx'
// import Login from './Components/Login.jsx'
//   import OtpVerification from './Components/OTP.jsx'
//   import ResetPassword from './Components/ResetPassword.jsx'
//   import Sidebar from './Components/Sidebar.jsx'
import Routercom from './Components/Routercom.jsx'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (

    // <div style={styles.app}>
    <div>  
      <BrowserRouter>   
      <Routercom/>
      {/* <Home/>
      <Login/>
        <Forgotpass/>
        <OtpVerification/>
        <ResetPassword/> 
        <Sidebar/> */}

        </BrowserRouter>

      {/* <Dashboard/>  */}
     </div>
  )
}


export default App
