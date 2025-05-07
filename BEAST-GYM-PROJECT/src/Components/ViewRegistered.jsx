import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ReactModal from "react-modal";
import renewal from "../assets/renewal.jpg";
import avatar from "../assets/avatar.png"; 
import sort from "../assets/sort.png";
import search from "../assets/search.png";
import trash from "../assets/delete.png";
import download from "../assets/download.png";
import { Link } from "react-router-dom";
import "./ViewRegistered.css";
import debounce from "lodash.debounce"; 

const ViewRegistered = () => {
  const [renewModalIsOpen, setRenewModalIsOpen] = useState(false);
  const [sortBy, setSortBy] = useState(""); 
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [downloadModalIsOpen, setDownloadModalIsOpen] = useState(false);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [selectedAccounts, setSelectedAccounts] = useState([]);
      const [selectedAccount, setSelectedAccount] = useState(null);
      const [newDuration, setNewDuration] = useState('');
      const [newJoiningDate, setNewJoiningDate] = useState('');
      const [newExpiryDate, setNewExpiryDate] = useState('');
  const [sortOrder, setSortOrder] = useState(""); 
  const [accounts, setAccounts] = useState([]);
  const [filterBy, setFilterBy] = useState(""); 
  const [searchValue, setSearchValue] = useState("");
  const [secondModalIsOpen, setSecondModalIsOpen] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const limit = 10;

// const fetchFilteredData = () => {
//   let url = "http://localhost:8000/ViewReg";
//   if (filterBy && searchValue) {
//     url += `?filter_by=${filterBy}&search_value=${searchValue}&sort_by=${filterBy}`;
//   }

//   fetch(url)
//     .then((response) => response.json())
//     .then((data) => setAccounts(data))
//     .catch((error) => console.error("Error fetching data:", error));
// };

// useEffect(() => {
//   fetchFilteredData();
// }, []); 

// useEffect(() => {
//   if (filterBy && searchValue) {
//     fetchFilteredData();
//   }
// }, [filterBy, searchValue]);

const fetchFilteredData = async (reset=false) => {
  if (!hasMore && !reset) return;

   let url = `http://localhost:8000/ViewReg?limit=${limit}&offset=${reset ?0:offset}`;
   let params = [];

   if (filterBy && searchValue) params.push(`filter_by=${filterBy}&search_value=${searchValue}`);
   if (sortBy) params.push(`sort_by=${sortBy}`);
   if (sortOrder) {
    params.push(`sort_order=${sortOrder}`);
  }
   if (params.length > 0) url += "&" + params.join("&");

   try {
     console.log(`Fetching records from offset: ${reset ?0:offset}`);
     const response = await fetch(url);
     const data = await response.json();

     if (data.length < limit) {
       setHasMore(false);
     }

     setAccounts((prev) => reset ? data:[...prev, ...data]);
     setOffset((prevOffset) =>reset? limit: prevOffset + limit);
   } catch (error) {
     console.error("Error fetching data:", error);
   }
 };
//  const debouncedFetchFilteredData = debounce(fetchFilteredData, 300);
useEffect(() => {
  setAccounts([]);
  setOffset(0);
  setHasMore(true);
  fetchFilteredData(true);
}, [filterBy, searchValue, sortBy, sortOrder]);


// Handle checkbox selection
const toggleCheckbox = (id) => {
  setSelectedAccounts((prev) =>
    prev.includes(id) ? prev.filter((accId) => accId !== id) : [...prev, id]
  );
};


const handleDeleteClick = () => {
  if (!showCheckboxes) {
    setShowCheckboxes(true);
  } else if (selectedAccounts.length > 0) {
    setDeleteModalIsOpen(true);
  }
};


const handleDownloadClick = () => {
  if (!showCheckboxes) {
    setShowCheckboxes(true);
  } else if (selectedAccounts.length > 0) {
    setDownloadModalIsOpen(true);
  }
};


const confirmDelete = () => {
  setAccounts((prev) => prev.filter((acc) => !selectedAccounts.includes(acc.id)));
  setDeleteModalIsOpen(false);
  setShowCheckboxes(false);
  setSelectedAccounts([]);
};


const confirmDownload = () => {
  const selectedData = accounts.filter((acc) => selectedAccounts.includes(acc.id));

  if (selectedData.length > 0) {
    const jsonData = JSON.stringify(selectedData, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "selected_users.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  setDownloadModalIsOpen(false);
  setShowCheckboxes(false);
  setSelectedAccounts([]);
};
const handleRenewal = (acc) => {
  setSelectedAccount(acc);
  setRenewModalIsOpen(true);
};

const confirmRenewal = () => {
  setRenewModalIsOpen(false);
  setNewJoiningDate(new Date().toISOString().split("T")[0]);
  setNewExpiryDate('');
  setSecondModalIsOpen(true);
};

const handleDurationChange = (duration) => {
  setNewDuration(duration);

  const durationMap = {
      "1 month": 30,
      "3 months": 90,
      "6 months": 180,
      "12 months": 365
  };

  if (duration in durationMap) {
      const expiry = new Date(newJoiningDate);
      expiry.setDate(expiry.getDate() + durationMap[duration]);
      setNewExpiryDate(expiry.toISOString().split("T")[0]);
  }
};

const submitRenewal = () => {
  if (!selectedAccount || !newDuration) {
      alert("Please select a duration before submitting.");
      return;
  }

  fetch("http://127.0.0.1:8000/RenewAccount", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
          Phone_No: String(selectedAccount.Phone_No),
          New_Duration: newDuration
      })
  })
  .then(response => response.json())
  .then(data => {
      alert(data.msg);
      setSecondModalIsOpen(false);
      window.location.reload();
  })
  .catch(error => console.error("Error renewing account:", error));
};
useEffect(() => {
  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
      hasMore
    ) {
      fetchFilteredData();
    }
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, [hasMore]);
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <div className="whole-division">
              <div className="content">
                <div className="title-wrap">
                  <p className="heading">View Registered</p>
                  <div className="right-div">

                     <div className="right-div1">
                       <img src={sort} alt="Sort" className="option" />
                       <select onChange={(e) => setFilterBy(e.target.value)}style={{width:"70px",fontSize:"9px"}}>
                       <option value="">Select Filter</option>
                       <option value="Age">Age</option>
                       <option value="Gender">Gender</option>
                       <option value="Joining_Date">Joining Date</option>
                       <option value="Type">Type</option>
                       <option value="Duration">Duration</option>
                       <option value="City">City</option>
                       </select>

                       <div className="search-div">
                         <input 
                          type="search" 
                          className="search-inp" 
                          onChange={(e) => setSearchValue(e.target.value)}/>
                        <img src={search} className="search-logo" alt="Search" onClick={fetchFilteredData}  />
                      </div>
                      <select onChange={(e) => setSortBy(e.target.value)} style={{width:"50px",fontSize:"9px"}}>
                        <option value="">Sort By</option>
                        <option value="Name">Name</option>
                       <option value="Age">Age</option>
                       <option value="Gender">Gender</option>
                       <option value="Joining_Date">Joining Date</option>
                       <option value="Type">Type</option>
                       <option value="Duration">Duration</option>
                       <option value="City">City</option>
                      </select>
                      <select onChange={(e) => setSortOrder(e.target.value)}style={{width:"10px",fontSize:"9px"}}>
                        <option value=""></option>
                        <option value="ASC">Asc</option>
                        <option value="DESC">Desc</option>
                      </select>
                   </div>
                    <div className="right-div2">
                      {/* <input className="checkboxx" type="checkbox" /> */}
                      <img src={trash} alt="Delete" onClick={() => {handleDeleteClick()}} />
                      <img src={download} alt="Download" onClick={() =>{handleDownloadClick()}} />
                    </div>
                  </div>
                </div>

                <div className="table-container table-bordered">
                <InfiniteScroll 
      dataLength={accounts.length}
      next={fetchFilteredData}
      hasMore={hasMore}
      loader={<h4>Loading....</h4>}
      endMessage={<p style={{ textAlign: "center" }}>No more records</p>}
    >
  <table className="table-container custom-table" cellPadding={7}>
    
      <thead>
        <tr>
          <th>S.No</th>
         {showCheckboxes && <th>Action</th>}
          <th>Profile</th>
          <th>Name</th>
          <th>Age</th>
          <th>Gender</th>
          <th>City</th>
          <th>Phone_No</th>
          <th>Duration</th>
          <th>Expired</th>
          <th>Type</th>
          <th>Renewal</th>
        </tr>
      </thead>
      <tbody>
        {accounts.map((acc, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            {showCheckboxes && (
              <td>
                <input 
                  type="checkbox" 
                  checked={selectedAccounts.includes(acc.id)} 
                  onChange={() => toggleCheckbox(acc.id)}
                />
              </td>
            )}
            <td>
              <img src={acc.Photo || avatar} alt="Profile" className="profile-pic" />
            </td>
            <td className="td">
              <Link to="/Profile" state={{ account: acc || {} }}>{acc.Name}</Link>
            </td>
            <td>{acc.Age}</td>
            <td>{acc.Gender}</td>
            <td>{acc.City}</td>
            <td>{acc.Phone_No}</td>
            <td>{acc.Duration}</td>
            <td>{acc.Expired}</td>
            <td>{acc.Type}</td>
            <td>
              <button className="btn" onClick={() => handleRenewal(acc)}>
                <img src={renewal} alt="Renew" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
  </table>
  </InfiniteScroll>

</div>


                
                <ReactModal
                  isOpen={deleteModalIsOpen}
                  onRequestClose={() => setDeleteModalIsOpen(false)}
                  style={{
                    overlay: { backgroundColor: "rgba(102, 102, 102, 0.5)" },
                    content: {
                      width: "400px",
                      height: "250px",
                      margin: "auto",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      borderRadius: "8px",
                      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                      border: "none",
                      padding: "20px",
                    },
                  }}
                >
                  <p style={{ marginBottom: "20px", fontSize: "20px" }}>
                    Are you sure you want to delete?
                  </p>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button style={{ background: "black", color: "white", padding: "8px 16px", borderRadius: "4px", cursor: "pointer" }} onClick={confirmDelete}>
                      Sure
                    </button>
                    <button style={{ background: "transparent", border: "1px solid #ccc", padding: "8px 16px", borderRadius: "4px", cursor: "pointer" }} onClick={() => setDeleteModalIsOpen(false)}>
                      Cancel
                    </button>
                  </div>
                </ReactModal>

                {/* Download Confirmation Modal */}
              <ReactModal
              isOpen={downloadModalIsOpen}
              onRequestClose={() => setDownloadModalIsOpen(false)}
              style={{
                overlay: { backgroundColor: 'rgba(102, 102, 102, 0.5)' },
                content: {
                  height: '250px',
                  width:'500px',
                  margin: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  borderRadius: '8px',
                  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                  border: 'none',
                  padding: '20px'
                }
              }}
            >
              <p>Are you sure you want to download the selected users' data?</p>
              <div style={{ display: "flex", gap: "10px" }}>

              <button style={{
                background: 'black',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer'
              }} onClick={confirmDownload}>Sure</button><br />
              <button style={{
                background: 'black',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer'
              }} onClick={() => setDownloadModalIsOpen(false)}>Cancel</button></div>
            </ReactModal>
                <ReactModal
                  isOpen={renewModalIsOpen}
                  onRequestClose={() => setRenewModalIsOpen(false)}
                  style={{
                    overlay: { backgroundColor: "rgba(102, 102, 102, 0.5)" },
                    content: {
                      width: "400px",
                      height: "250px",
                      margin: "auto",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      borderRadius: "8px",
                      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                      border: "none",
                      padding: "20px",
                    },
                  }}
                >
                 <p style={{ marginBottom: '20px', fontSize: '20px' }}>
                                             Are you sure you want to <br /> renew?
                                         </p>
                                         <div style={{ display: 'flex', gap: '10px' }}>
                  <button style={{
                                                 background: 'black',
                                                 color: 'white',
                                                 border: 'none',
                                                 padding: '8px 16px',
                                                 borderRadius: '4px',
                                                 cursor: 'pointer'
                                             }}onClick={confirmRenewal}>
                    Sure
                  </button>
                  <button style={{
                                                 background: 'transparent',
                                                 border: '1px solid #ccc',
                                                 padding: '8px 16px',
                                                 borderRadius: '4px',
                                                 cursor: 'pointer'
                                             }} onClick={() => setRenewModalIsOpen(false)}>Cancel</button>
               </div> </ReactModal>

            
                {/* Second Modal */}
                                                <ReactModal
                                                    isOpen={secondModalIsOpen}
                                                    onRequestClose={() => setSecondModalIsOpen(false)}
                                                    style={{
                                                        overlay: { backgroundColor: 'rgba(102, 102, 102, 0.5)' },
                                                        content: { width: '350px', height: '280px', margin: 'auto', borderRadius: '8px' }
                                                    }}
                                                >
                                                    <div className="parent-modal" style={{ display: "flex",justifyContent:"center",alignItems:"center", gap: "40px" }}>
                                                        <div className="div-1" style={{ display: "flex", flexDirection: "column" }}>
                                                            <p>Duration</p>
                                                            <p>Joining Date</p>
                                                            <p>Expiry Date</p>
                                                        </div>
                                                        <div className="div-2" style={{ display: "flex", flexDirection: "column" ,gap:"20px"}}>
                                                            <input type="text" list="options" value={newDuration} onChange={(e) => handleDurationChange(e.target.value)} />
                                                            <datalist id="options">
                                                                <option value="1 month" />
                                                                <option value="3 months" />
                                                                <option value="6 months" />
                                                                <option value="12 months" />
                                                            </datalist>
                                                            <input type="date" value={newJoiningDate} readOnly />
                                                            <input type="date" value={newExpiryDate} readOnly />
                                                        </div>
                                                    </div><br />
                                                    <button style={{display:"flex",justifyContent:"center",marginLeft:"100px", background: 'black', color: 'white',padding:"10px", borderRadius:"5px",width:"80px" }} onClick={submitRenewal}>
                                                        OK
                                                    </button>
                                                </ReactModal>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewRegistered;



//----------------------------------------------------
// import React, { useState, useEffect } from "react";
// import InfiniteScroll from "react-infinite-scroll-component";
// import ReactModal from "react-modal";
// import renewal from "../assets/renewal.jpg";
// import avatar from "../assets/avatar.png"; 
// import sort from "../assets/sort.png";
// import search from "../assets/search.png";
// import trash from "../assets/delete.png";
// import download from "../assets/download.png";
// import { Link } from "react-router-dom";
// import "./ViewRegistered.css";

// const ViewRegistered = () => {
//   const [accounts, setAccounts] = useState([]);
//   const [filterBy, setFilterBy] = useState(""); 
//   const [searchValue, setSearchValue] = useState("");
//   const [sortBy, setSortBy] = useState(""); 
//   const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
//   const [downloadModalIsOpen, setDownloadModalIsOpen] = useState(false);
//   const [showCheckboxes, setShowCheckboxes] = useState(false);
//   const [selectedAccounts, setSelectedAccounts] = useState([]);
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [secondModalIsOpen, setSecondModalIsOpen] = useState(false);
//   const [offset, setOffset] = useState(0);
//   const [hasMore, setHasMore] = useState(true);
//   const limit = 10;
  
//   // Fetch Data with Filters & Sorting
//    const fetchFilteredData = async () => {
//     if (!hasMore) return;

//      let url = `http://localhost:8000/ViewReg?limit=${limit}&offset=${offset}`;
//      let params = [];

//      if (filterBy && searchValue) params.push(`filter_by=${filterBy}&search_value=${searchValue}`);
//      if (sortBy) params.push(`sort_by=${sortBy}`);

//      if (params.length > 0) url += "&" + params.join("&");

//      try {
//        console.log(`Fetching records from offset: ${offset}`);
//        const response = await fetch(url);
//        const data = await response.json();

//        if (data.length < limit) {
//          setHasMore(false);
//        }

//        setAccounts((prev) => [...prev, ...data]);
//        setOffset((prevOffset) => prevOffset + limit);
//      } catch (error) {
//        console.error("Error fetching data:", error);
//      }
//    };

//   useEffect(() => {
//     setAccounts([]);
//     setOffset(0);
//     setHasMore(true);
//     fetchFilteredData();
//   }, []);

//   useEffect(() => {
//     if (filterBy && searchValue) {
//       fetchFilteredData();
//     }
//   }, [filterBy, searchValue, sortBy]);

//   // Handle checkbox selection
//   const toggleCheckbox = (id) => {
//     setSelectedAccounts((prev) =>
//       prev.includes(id) ? prev.filter((accId) => accId !== id) : [...prev, id]
//     );
//   };

//   // Open delete modal & show checkboxes
//   const handleDeleteClick = () => {
//     if (!showCheckboxes) {
//       setShowCheckboxes(true);
//     } else if (selectedAccounts.length > 0) {
//       setDeleteModalIsOpen(true);
//     }
//   };

//   // Open download modal & show checkboxes
//   const handleDownloadClick = () => {
//     if (!showCheckboxes) {
//       setShowCheckboxes(true);
//     } else if (selectedAccounts.length > 0) {
//       setDownloadModalIsOpen(true);
//     }
//   };

//   // Confirm delete action
//   const confirmDelete = () => {
//     setAccounts((prev) => prev.filter((acc) => !selectedAccounts.includes(acc.id)));
//     setDeleteModalIsOpen(false);
//     setShowCheckboxes(false);
//     setSelectedAccounts([]);
//   };

//   // Confirm download action
//   const confirmDownload = () => {
//     const selectedData = accounts.filter((acc) => selectedAccounts.includes(acc.id));

//     if (selectedData.length > 0) {
//       const jsonData = JSON.stringify(selectedData, null, 2);
//       const blob = new Blob([jsonData], { type: "application/json" });
//       const url = URL.createObjectURL(blob);

//       const a = document.createElement("a");
//       a.href = url;
//       a.download = "selected_users.json";
//       a.click();
//       URL.revokeObjectURL(url);
//     }

//     setDownloadModalIsOpen(false);
//     setShowCheckboxes(false);
//     setSelectedAccounts([]);
//   };

//   return (
//     <div className="container-fluid">
//       <div className="row">
//         <div className="col">
//           <div className="whole-division">
//             <div className="content">
//               <div className="title-wrap">
//                 <p className="heading">View Registered</p>
//                 <div className="right-div">
//                   <div className="right-div1">
//                     <img src={sort} alt="Sort" className="option" />
//                     <select onChange={(e) => setFilterBy(e.target.value)}>
//                       <option value="">Select Filter</option>
//                       <option value="Age">Age</option>
//                       <option value="Gender">Gender</option>
//                       <option value="Joining_Date">Joining Date</option>
//                       <option value="Type">Type</option>
//                       <option value="Duration">Duration</option>
//                       <option value="Payment_Mode">Payment Mode</option>
//                     </select>

//                     <div className="search-div">
//                       <input 
//                         type="search" 
//                         className="search-inp" 
//                         onChange={(e) => setSearchValue(e.target.value)}
//                       />
//                     </div>
//                     <select onChange={(e) => setSortBy(e.target.value)}>
//                       <option value="">Sort By</option>
//                       <option value="Name">Name</option>
//                       <option value="Age">Age</option>                        
//                       <option value="Joining_Date">Joining Date</option>
//                     </select>
//                   </div>
//                   <div className="right-div2">
//                     <img src={trash} alt="Delete" onClick={handleDeleteClick} />
//                     <img src={download} alt="Download" onClick={handleDownloadClick} />
//                   </div>
//                 </div>
//               </div>

//               <div className="table-container table-bordered">
//                 <table className="table-container custom-table" cellPadding={9}>
//                   <InfiniteScroll 
//                    dataLength={accounts.length}
//                    next={fetchFilteredData}
//                    hasMore={hasMore}
//                    loader={<h4>Loading....</h4>}
//                    endMessage={<p style={{textAlign:"center"}}>No more records</p>}
//                   >     
//                     <thead>
//                       <tr>
//                         <th>S.No</th>
//                         {showCheckboxes && <th>Action</th>}
//                         <th>Profile</th>
//                         <th>Name</th>
//                         <th>Age</th>
//                         <th>Gender</th>
//                         <th>City</th>
//                         <th>Duration</th>
//                         <th>Expired</th>
//                         <th>Type</th>
//                         <th>Renewal</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {accounts.map((acc, index) => (
//                         <tr key={acc.id}>
//                           <td>{index + 1}</td>
//                           {showCheckboxes && (
//                             <td>
//                               <input 
//                                 type="checkbox" 
//                                 checked={selectedAccounts.includes(acc.id)} 
//                                 onChange={() => toggleCheckbox(acc.id)}
//                               />
//                             </td>
//                           )}
//                           <td>
//                             <img src={acc.Photo || avatar} alt="Profile" className="profile-pic" />
//                           </td>
//                           <td><Link to="/Profile" state={{ account: acc }}>{acc.Name}</Link></td>
//                           <td>{acc.Age}</td>
//                           <td>{acc.Gender}</td>
//                           <td>{acc.City}</td>
//                           <td>{acc.Duration}</td>
//                           <td>{acc.Expired}</td>
//                           <td>{acc.Type}</td>
//                           <td>
//                             <button className="btn" onClick={() => setModalIsOpen(true)}>
//                               <img src={renewal} alt="renew" />
//                             </button>
//                             <ReactModal
//                               isOpen={modalIsOpen}
//                               onRequestClose={() => setModalIsOpen(false)}
//                               style={{
//                                 overlay: { backgroundColor: 'rgba(102, 102, 102, 0.5)' },
//                                 content: {
//                                   width: '400px',
//                                   height: '250px',
//                                   margin: 'auto',
//                                   display: 'flex',
//                                   flexDirection: 'column',
//                                   alignItems: 'center',
//                                   justifyContent: 'center',
//                                   textAlign: 'center',
//                                   borderRadius: '8px',
//                                   boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
//                                   border: 'none',
//                                   padding: '20px'
//                                 }
//                               }}
//                             >
//                               <p style={{ marginBottom: '20px', fontSize: '20px' }}>
//                                 Are you sure you want to <br /> renew?
//                               </p>
//                               <div style={{ display: 'flex', gap: '10px' }}>
//                                 <button style={{
//                                   background: 'black',
//                                   color: 'white',
//                                   border: 'none',
//                                   padding: '8px 16px',
//                                   borderRadius: '4px',
//                                   cursor: 'pointer'
//                                 }} onClick={() => {
//                                   setModalIsOpen(false);
//                                   setSecondModalIsOpen(true);
//                                 }}>
//                                   Sure
//                                 </button>
//                                 <button style={{
//                                   background: 'transparent',
//                                   border: '1px solid #ccc',
//                                   padding: '8px 16px',
//                                   borderRadius: '4px',
//                                   cursor: 'pointer'
//                                 }} onClick={() => setModalIsOpen(false)}>
//                                   Cancel
//                                 </button>
//                               </div>
//                             </ReactModal>

//                             <ReactModal
//                               isOpen={secondModalIsOpen}
//                               onRequestClose={() => setSecondModalIsOpen(false)}
//                               style={{
//                                 overlay: { backgroundColor: 'rgba(102, 102, 102, 0.5)' },
//                                 content: {
//                                   width: '400px',
//                                   height: '250px',
//                                   margin: 'auto',
//                                   display: 'flex',
//                                   flexDirection: 'column',
//                                   alignItems: 'center',
//                                   justifyContent: 'center',
//                                   textAlign: 'center',
//                                   borderRadius: '8px',
//                                   boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
//                                   border: 'none',
//                                   padding: '20px'
//                                 }
//                               }}
//                             >
//                               <div className="parent-modal" style={{ display: "flex", gap: "40px" }}>
//                                 <div className="div-1" style={{ display: "flex", flexDirection: "column", marginTop: "17px" }}>
//                                   <p style={{ textAlign: "left" }}>Duration</p>
//                                   <p>Joining Date</p>
//                                   <p>Expiry Date</p>
//                                 </div>
//                                 <div className="div-2" style={{ display: "flex", flexDirection: "column", marginBottom: "20px" }}>
//                                   <input type="text" list="options" />
//                                   <datalist id="options">
//                                     <option value="1 Month" />
//                                     <option value="6 Month" />
//                                     <option value="3 Month" />
//                                     <option value="5 Month" />
//                                   </datalist><br />
//                                   <input type="date" /><br />
//                                   <input type="date" />
//                                 </div>
//                               </div>  
//                               <button style={{
//                                 background: 'black',
//                                 color: 'white',
//                                 border: 'none',
//                                 padding: '8px 16px',
//                                 borderRadius: '4px',
//                                 cursor: 'pointer'
//                               }} onClick={() => setSecondModalIsOpen(false)}>
//                                 OK
//                               </button>
//                             </ReactModal>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </InfiniteScroll>  
//                 </table>
//               </div>

//               {/* Delete Confirmation Modal */}
//               <ReactModal
//                 isOpen={deleteModalIsOpen}
//                 onRequestClose={() => setDeleteModalIsOpen(false)}
//                 style={{
//                   overlay: { backgroundColor: 'rgba(102, 102, 102, 0.5)' },
//                   content: {
//                     width: '400px',
//                     height: '250px',
//                     margin: 'auto',
//                     display: 'flex',
//                     flexDirection: 'column',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     textAlign: 'center',
//                     borderRadius: '8px',
//                     boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
//                     border: 'none',
//                     padding: '20px'
//                   }
//                 }}
//               >
//                 <p>Are you sure you want to delete the selected users?</p>
//                 <button style={{
//                   background: 'black',
//                   color: 'white',
//                   border: 'none',
//                   padding: '8px 16px',
//                   borderRadius: '4px',
//                   cursor: 'pointer'
//                 }} onClick={confirmDelete}>Sure</button><br />
//                 <button style={{
//                   background: 'black',
//                   color: 'white',
//                   border: 'none',
//                   padding: '8px 16px',
//                   borderRadius: '4px',
//                   cursor: 'pointer'
//                 }} onClick={() => setDeleteModalIsOpen(false)}>Cancel</button>
//               </ReactModal>

//               {/* Download Confirmation Modal */}
//               <ReactModal
//                 isOpen={downloadModalIsOpen}
//                 onRequestClose={() => setDownloadModalIsOpen(false)}
//                 style={{
//                   overlay: { backgroundColor: 'rgba(102, 102, 102, 0.5)' },
//                   content: {
//                     height: '250px',
//                     margin: 'auto',
//                     display: 'flex',
//                     flexDirection: 'column',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     textAlign: 'center',
//                     borderRadius: '8px',
//                     boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
//                     border: 'none',
//                     padding: '20px'
//                   }
//                 }}
//               >
//                 <p>Are you sure you want to download the selected users' data?</p>
//                 <button style={{
//                   background: 'black',
//                   color: 'white',
//                   border: 'none',
//                   padding: '8px 16px',
//                   borderRadius: '4px',
//                   cursor: 'pointer'
//                 }} onClick={confirmDownload}>Sure</button><br />
//                 <button style={{
//                   background: 'black',
//                   color: 'white',
//                   border: 'none',
//                   padding: '8px 16px',
//                   borderRadius: '4px',
//                   cursor: 'pointer'
//                 }} onClick={() => setDownloadModalIsOpen(false)}>Cancel</button>
//               </ReactModal>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewRegistered;

//--------------------------------------









// import React, { useState, useEffect } from "react";
// import InfiniteScroll from "react-infinite-scroll-component";
// import ReactModal from "react-modal";
// import { Link } from "react-router-dom";
// import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
// import avatar from "../assets/avatar.png";
// import renewal from "../assets/renewal.jpg";
// import sort from "../assets/sort.png";
// import search from "../assets/search.png";
// import trash from "../assets/delete.png";
// import download from "../assets/download.png";
// import "./ViewRegistered.css";

// const initialColumns = [
//   { id: "sno", label: "S.No" },
//   { id: "profile", label: "Profile" },
//   { id: "name", label: "Name" },
//   { id: "age", label: "Age" },
//   { id: "gender", label: "Gender" },
//   { id: "city", label: "City" },
//   { id: "duration", label: "Duration" },
//   { id: "expired", label: "Expired" },
//   { id: "type", label: "Type" }
// ];

// const ViewRegistered = () => {
//   const [accounts, setAccounts] = useState([]);
//   const [columns, setColumns] = useState(initialColumns);
//   const [filterBy, setFilterBy] = useState("");
//   const [searchValue, setSearchValue] = useState("");
//   const [sortBy, setSortBy] = useState("");
//   const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
//   const [downloadModalIsOpen, setDownloadModalIsOpen] = useState(false);
//   const [showCheckboxes, setShowCheckboxes] = useState(false);
//   const [selectedAccounts, setSelectedAccounts] = useState([]);
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [secondModalIsOpen, setSecondModalIsOpen] = useState(false);
//   const [offset, setOffset] = useState(0);
//   const [hasMore, setHasMore] = useState(true);
//   const limit = 10;

//   // Fetch Data with Filters & Sorting
//   const fetchFilteredData = async () => {
//     if (!hasMore) return;

//     let url = `http://localhost:8000/ViewReg?limit=${limit}&offset=${offset}`;
//     let params = [];

//     if (filterBy && searchValue) params.push(`filter_by=${filterBy}&search_value=${searchValue}`);
//     if (sortBy) params.push(`sort_by=${sortBy}`);

//     if (params.length > 0) url += "&" + params.join("&");

//     try {
//       const response = await fetch(url);
//       const data = await response.json();

//       if (data.length < limit) setHasMore(false);
//       setAccounts((prev) => [...prev, ...data]);
//       setOffset((prevOffset) => prevOffset + data.length);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   // Handle filter & sort changes (reset data)
//   useEffect(() => {
//     setAccounts([]);
//     setOffset(0);
//     setHasMore(true);
//     fetchFilteredData();
//   }, [filterBy, searchValue, sortBy]);

//   // Handle checkbox selection
//   const toggleCheckbox = (id) => {
//     setSelectedAccounts((prev) =>
//       prev.includes(id) ? prev.filter((accId) => accId !== id) : [...prev, id]
//     );
//   };

//   // Open delete modal & show checkboxes
//   const handleDeleteClick = () => {
//     if (!showCheckboxes) {
//       setShowCheckboxes(true);
//     } else if (selectedAccounts.length > 0) {
//       setDeleteModalIsOpen(true);
//     }
//   };

//   // Open download modal & show checkboxes
//   const handleDownloadClick = () => {
//     if (!showCheckboxes) {
//       setShowCheckboxes(true);
//     } else if (selectedAccounts.length > 0) {
//       setDownloadModalIsOpen(true);
//     }
//   };

//   // Confirm delete action
//   const confirmDelete = () => {
//     setAccounts((prev) => prev.filter((acc) => !selectedAccounts.includes(acc.id)));
//     setDeleteModalIsOpen(false);
//     setShowCheckboxes(false);
//     setSelectedAccounts([]);
//   };

//   // Confirm download action
//   const confirmDownload = () => {
//     const selectedData = accounts.filter((acc) => selectedAccounts.includes(acc.id));

//     if (selectedData.length > 0) {
//       const jsonData = JSON.stringify(selectedData, null, 2);
//       const blob = new Blob([jsonData], { type: "application/json" });
//       const url = URL.createObjectURL(blob);

//       const a = document.createElement("a");
//       a.href = url;
//       a.download = "selected_users.json";
//       a.click();
//       URL.revokeObjectURL(url);
//     }

//     setDownloadModalIsOpen(false);
//     setShowCheckboxes(false);
//     setSelectedAccounts([]);
//   };

//   // Handle Column Drag & Drop
//   const onDragEnd = (result) => {
//     if (!result.destination) return;

//     const reorderedColumns = Array.from(columns);
//     const [movedColumn] = reorderedColumns.splice(result.source.index, 1);
//     reorderedColumns.splice(result.destination.index, 0, movedColumn);

//     setColumns(reorderedColumns);
//   };

//   return (
//     <>
//       <div className="container-fluid">
//         <div className="row">
//           <div className="col">
//             <div className="whole-division">
//               <div className="content">
//                 <div className="title-wrap">
//                   <p className="heading">View Registered</p>
//                   <div className="right-div">
//                     <div className="right-div1">
//                       <img src={sort} alt="Sort" className="option" />
//                       <select onChange={(e) => setFilterBy(e.target.value)}>
//                         <option value="">Select Filter</option>
//                         <option value="Age">Age</option>
//                         <option value="Gender">Gender</option>
//                         <option value="Joining_Date">Joining Date</option>
//                         <option value="Type">Type</option>
//                         <option value="Duration">Duration</option>
//                         <option value="Payment_Mode">Payment Mode</option>
//                       </select>
//                       <div className="search-div">
//                         <input type="search" className="search-inp" onChange={(e) => setSearchValue(e.target.value)} />
//                       </div>
//                       <select onChange={(e) => setSortBy(e.target.value)}>
//                         <option value="">Sort By</option>
//                         <option value="Name">Name</option>
//                         <option value="Age">Age</option>
//                         <option value="Joining_Date">Joining Date</option>
//                       </select>
//                     </div>
//                     <div className="right-div2">
//                       <img src={trash} alt="Delete" onClick={() => setShowCheckboxes(!showCheckboxes)} />
//                       <img src={download} alt="Download" />
//                     </div>
//                   </div>
//                 </div>
//                 <div className="table-container table-bordered">
//                   <InfiniteScroll
//                     dataLength={accounts.length}
//                     next={fetchFilteredData}
//                     hasMore={hasMore}
//                     loader={<h4>Loading....</h4>}
//                     endMessage={<p style={{ textAlign: "center" }}>No more records</p>}
//                   >
//                     <table className="table-container custom-table" cellPadding={4}>
//                       <DragDropContext onDragEnd={onDragEnd}>
//                         <Droppable droppableId="columns" direction="horizontal" type="column">
//                           {(provided) => (
//                             <thead ref={provided.innerRef} {...provided.droppableProps}>
//                               <tr>
//                                 {columns.map((column, index) => (
//                                   <Draggable key={column.id} draggableId={column.id} index={index}>
//                                     {(provided) => (
//                                       <th
//                                         ref={provided.innerRef}
//                                         {...provided.draggableProps}
//                                         {...provided.dragHandleProps}
//                                         style={{
//                                           padding: "10px",
//                                           backgroundColor: "#f0f0f0",
//                                           cursor: "grab",
//                                           // border: "1px solid black"
//                                         }}
//                                       >
//                                         {column.label}
//                                       </th>
//                                     )}
//                                   </Draggable>
//                                 ))}
//                                 {provided.placeholder}
//                               </tr>
//                             </thead>
//                           )}
//                         </Droppable>
//                         <Droppable droppableId="rows" type="row">
//                           {(provided) => (
//                             <tbody ref={provided.innerRef} {...provided.droppableProps}>
//                               {accounts.map((acc, rowIndex) => (
//                                 <tr key={acc.Sno}>
//                                   {columns.map((column, colIndex) => (
//   <Draggable key={`${acc.Sno}-${column.id}`} draggableId={`${acc.Sno}-${column.id}`} index={colIndex}>
//     {(provided) => (
//       <td
//         ref={provided.innerRef}
//         {...provided.draggableProps}
//         {...provided.dragHandleProps}
//         style={{
//           cursor: "grab",
//           ...provided.draggableProps.style,
//           // border: "1px solid black",
//         }}
//       >
//         {column.id==="sno"?(acc.Sno):
//         column.id === "profile" ? (
//           <img src={acc.Photo || avatar} alt="Profile" className="profile-pic" />
//         ) : column.id === "name" ? (
//           <Link to="/Profile" state={{ account: acc }}>
//             {acc.Name}
//           </Link>
//         ) : column.id === "age" ? (
//           acc.Age
//         ) : column.id === "gender" ? (
//           acc.Gender 
//         ) : column.id === "city" ? (
//           acc.City 
//         ) : column.id === "duration" ? (
//           acc.Duration 
//         ) : column.id === "expired" ? (
//           acc.Expired 
//         ) : column.id === "type" ? (
//           acc.Type
//         ) : (
//           acc[column.id] || "-" 
//         )}
//       </td>
//     )}
//   </Draggable>
// ))}

//                                 </tr>
//                               ))}
//                               {provided.placeholder}
//                             </tbody>
//                           )}
//                         </Droppable>
//                       </DragDropContext>
//                     </table>
//                   </InfiniteScroll>
//                 </div>

//                 {/* Delete Confirmation Modal */}
//                 <ReactModal isOpen={deleteModalIsOpen} onRequestClose={() => setDeleteModalIsOpen(false)}>
//                   <p>Are you sure you want to delete the selected users?</p>
//                   <button>Confirm</button>
//                   <button onClick={() => setDeleteModalIsOpen(false)}>Cancel</button>
//                 </ReactModal>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ViewRegistered;
