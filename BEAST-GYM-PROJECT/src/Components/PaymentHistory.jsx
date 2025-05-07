import React, { useEffect, useState } from 'react';
import avatar from '../assets/avatar.png'; 
import sort from '../assets/sort.png'
import search from '../assets/search.png'
import './ViewRegistered.css';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

// const PaymentHistory = () => {
  
//   const [accounts, setAccounts]=useState([]);
//   const [searchValue, setSearchValue] = useState("");
//   const [filterBy, setFilterBy] = useState(""); 
//   const [sortBy, setSortBy] = useState(""); 
  
    
  
//     const fetchFilteredData = () => {
//       let url = "http://localhost:8000/History";
//       let params = [];
  
//       if (filterBy && searchValue) {
//         params.push(`filter_by=${filterBy}&search_value=${searchValue}`);
//       }
  
//       if (sortBy) {
//         params.push(`sort_by=${sortBy}`);
//       }
  
//       if (params.length > 0) {
//         url += "?" + params.join("&");
//       }
  
//       fetch(url)
//         .then((response) => response.json())
//         .then((data) => setAccounts(data))
//         .catch((error) => console.error("Error fetching data:", error));
//     };

// // const fetchFilteredData=()=>{
// //   let url="http://127.0.0.1:8000/History"
// //   if (filterBy && searchValue){
// //     url+=`?filter_by=${filterBy}&search_value=${searchValue}&sort_by=${filterBy}`;
// //   }
// // fetch(url)
// // .then((response)=> response.json())
// // .then((data)=> setAccounts(data))
// // .catch((error)=> console.error("Error fetching data:",error))
// // } 

// useEffect(() => {
//   fetchFilteredData();
// }, [filterBy, searchValue, sortBy]); 

// useEffect(() => {
//   if (filterBy && searchValue) {
//     fetchFilteredData();
//   }
// }, [filterBy, searchValue]);

//   return (
//     <> 
//     <div className="container-fluid">
//       <div className="row">
//         <div className="col">
//           <div className="whole-division">      
//       <div className="content">
//         <div className="title-wrap">  
//           <p className="heading">View Registered</p>
//           <div className="right-div">  
//              <div className="right-div-pay">
//                                     <img src={sort} alt="Sort" className="option" />
//                                     <select onChange={(e) => setFilterBy(e.target.value)}>
//                                     <option value="">Select Filter</option>
//                                     <option value="Name">Name</option>
//                                     <option value="Joining_Date">Joining Date</option>                                 
//                                     <option value="Fees_Amount">Fees_Amount</option>
//                                     </select>
//                                     <div className="search-div">
//                                       <input 
//                                        type="search" 
//                                        className="search-inp" 
//                                        onChange={(e) => setSearchValue(e.target.value)}/>
//                                      <img src={search} className="search-logo" alt="Search" onClick={fetchFilteredData} />
//                                    </div>
//                                    <select onChange={(e) => setSortBy(e.target.value)}>
//                         <option value="">Sort By</option>
//                         <option value="ASC">Age</option>
//                         <option value="DESC">Joining Date</option>
//                       </select>
//                                 </div>
//           </div>
//         </div>
//         <div className="table-container table-bordered mt-3 ">
//           <table className="table-container  custom-table" cellPadding={6}>
//             <thead>
//               <tr>
//                 <th>S.No</th>
//                 <th>Profile</th>
//                 <th>Name</th>
//                 <th>Joining Date</th>
//                 <th>Fees Amount</th>
//             </tr>
//             </thead>
//             <tbody>
//               {accounts.map((acc, index) => (
//                 <tr key={index}>
//                   <td>{index + 1}</td>
//                   <td>
//                    {acc.Photo ? (
//                              <img src={acc.Photo} alt="Profile" className="profile-pic" />
//                            ) : (
//                              <img src={avatar} alt="Profile" className="profile-pic" />
//                            )}
//                     </td>
//                   <td>{acc.Name}</td>
//                   <td>{acc.Joining_Date}</td>
//                   <td>{acc.Fees_Amount}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//       </div>
//       </div>
//       </div>
//       </div>
//     </>
//   );
// };
const PaymentHistory = () => {
  const [accounts, setAccounts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filterBy, setFilterBy] = useState(""); 
  const [sortBy, setSortBy] = useState(""); 
  const [sortOrder, setSortOrder] = useState(""); 
  const [showTotal, setShowTotal]=useState(false)

  const fetchFilteredData = () => {
    let url = "http://localhost:8000/History";
    let params = [];
  
    if (filterBy && searchValue) {
      params.push(`filter_by=${filterBy}&search_value=${searchValue}`);
    }
  
    if (sortBy) {
      params.push(`sort_by=${sortBy}`);
    }
  
    if (sortOrder) {
      params.push(`sort_order=${sortOrder}`);
    }
  
    if (params.length > 0) {
      url += "?" + params.join("&");
    }
  
    fetch(url)
      .then((response) => response.json())
      .then((data) => setAccounts(data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    fetchFilteredData();
  }, [filterBy, searchValue, sortBy, sortOrder]); 

 
  const totalFees = accounts.reduce((sum, acc) => sum + (parseFloat(acc.Fees_Amount) || 0), 0);

  return (
    <> 
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <div className="whole-division">      
              <div className="content">
                <div className="title-wrap">  
                  <p className="heading">View Registered</p>
                  <p className="heading" onClick={()=> setShowTotal(!showTotal)} style={{cursor:"pointer"}}>Total Fees Collected:  <span style={{color:"rgb(28,236,28)"}}>  {showTotal? `${totalFees.toFixed(2)}`:"Click to view"}</span></p>
                  <div className="right-div">  
                    <div className="right-div-pay">
                      <img src={sort} alt="Sort" className="option" />
                      <select onChange={(e) => setFilterBy(e.target.value)} style={{width:"70px",fontSize:"9px"}}>
                        <option value="">Select Filter</option>
                        <option value="Name">Name</option>
                        <option value="Joining_Date">Joining Date</option>                                 
                        <option value="Fees_Amount">Fees Amount</option>
                      </select>
                      <div className="search-div">
                        <input 
                          type="search" 
                          className="search-inp" 
                          onChange={(e) => setSearchValue(e.target.value)} 
                        />
                        <img 
                          src={search} 
                          className="search-logo" 
                          alt="Search" 
                          onClick={fetchFilteredData} 
                        />
                      </div>
                      <select onChange={(e) => setSortBy(e.target.value)} style={{width:"50px",fontSize:"9px"}}>
                        <option value="">Sort By</option>
                        <option value="Name">Name</option>
                        <option value="Joining_Date">Joining Date</option>
                        <option value="Fees_Amount">Fees Amount</option>
                      </select>
                      <select onChange={(e) => setSortOrder(e.target.value)}style={{width:"10px",fontSize:"9px"}}>
                        <option value=""></option>
                        <option value="ASC">Asc</option>
                        <option value="DESC">Desc</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="table-container table-bordered mt-3 ">
                  <table className="table-container custom-table" cellPadding={6}>
                    <thead>
                      <tr>
                        <th>S.No</th>
                        <th>Profile</th>
                        <th>Name</th>
                        <th>Joining Date</th>
                        <th>Fees Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {accounts.map((acc, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            {acc.Photo ? (
                              <img src={acc.Photo} alt="Profile" className="profile-pic" />
                            ) : (
                              <img src={avatar} alt="Profile" className="profile-pic" />
                            )}
                          </td>
                          <td>{acc.Name}</td>
                          <td>{acc.Joining_Date}</td>
                          <td>{acc.Fees_Amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div> 
              </div>
            </div>
          </div>
        </div>
      </div>
   </>
   );
};

export default PaymentHistory;




























// import React from 'react';
// import avatar from '../assets/avatar.png'; 
// import list1 from '../assets/list1.png';
// import list2 from '../assets/list2.png';
// import list3 from '../assets/list3.png';
// import logout from '../assets/sign-out-alt.png';
// import Ellipse from '../assets/Ellipse.png';
// import sort from '../assets/sort.png'
// import search from '../assets/search.png'
// import './ViewRegistered.css';
// import { Link } from 'react-router-dom';

// const PaymentHistory = () => {
//   const accounts = Array(20).fill({
//     id: 1, name: "Krishna",joiningDate:"28 Nov 2023",FeeAmount:"10,000", profile: avatar,});

//   return (
//     <>  
//     <div className="top">  
//            <div className="logo-circle"><img src={Ellipse} alt="Ellipse" /></div>
//           <h3 className="title">Beast Forces</h3>
//         </div>
//     <div className="dashboard">
//       <div className="sidebar">
//       <ul className="navList">
//               <Link to="/Sidebar">    <li  className="navItem"><img src={list1} alt="" /> Dashboard</li></Link>
//               <Link to="/ViewRegistered">  <li className="navItem"><img src={list2} alt="" /> View Registered</li></Link>
//               <Link to="/PaymentHistory"> <li className="navItem"><img src={list3} alt="" />Payment History</li></Link>
//               </ul>
//               <Link to="/Logout"><button  className="logout"><img src={logout} alt="" /> Logout</button></Link>
//       </div>

//       {/* Main Content */}
//       <div className="content">
//         <div className="title-wrap">  
//         <p className="heading">View Registered</p>
//         <div className="right-div">  
//         <div className="right-div1">   
//         <img src={sort} alt="" />
//         <div className="search-div">
//           <input type="search" className='search-inp' />
//           <img src={search} className='search-logo'></img>
//         </div>
//         </div>
//         </div>
//         </div>
//         <div className="table-container table-bordered mt-3 ">
//           <table>
//             <thead>
//               <tr>
//                 <th>S.No</th>
//                 <th>Profile</th>
//                 <th>Name</th>
//                 <th>Joining Date</th>
//                 <th>Fees Amount</th>
//             </tr>
//             </thead>
//             <tbody>
//               {accounts.map((acc, index) => (
//                 <tr key={index}>
//                   <td>{index + 1}</td>
//                   <td><img src={acc.profile} alt="Profile" className="profile-pic" /></td>
//                   <td>{acc.name}</td>
//                   <td>{acc.joiningDate}</td>
//                   <td>{acc.FeeAmount}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//     </>
//   );
// };

// export default PaymentHistory;

