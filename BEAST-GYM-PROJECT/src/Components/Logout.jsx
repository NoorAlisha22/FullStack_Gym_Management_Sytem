import React from 'react'
import './Logout.css'
import { Link } from 'react-router-dom';
// import Sidebar from './Sidebar';

const Logout = () => {
  return (
    <div className='final container-fluid'>
        <div className="row"> 
          <div className='col'>  
            <div className="whole-div">
              <div className="parent-wrapper"> 
                <div className="wrapper">
                 <p className='txt'>Are you sure want to <br />Logout ?</p>
                <div className="but-div">
                <Link to="/">   <button className="log-but">Logout</button></Link>
               <Link to="/Dashboard"> <button className="cancel">Cancel</button></Link>
           </div>
      </div>
      </div>
    </div>
    </div>
    </div>      
    </div>
  )
}

export default Logout
