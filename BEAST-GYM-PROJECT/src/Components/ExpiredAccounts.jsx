import React from 'react'
import { useState,useEffect } from 'react';
import avatar from "../assets/avatar.png"; 
import './ExpiringAccounts.css';
import renewal from '../assets/renewal.jpg';
import ReactModal from 'react-modal';



const ExpiredAccounts = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [secondModalIsOpen, setSecondModalIsOpen] = useState(false);
    const [accounts, setAccounts] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [newDuration, setNewDuration] = useState('');
    const [newJoiningDate, setNewJoiningDate] = useState('');
    const [newExpiryDate, setNewExpiryDate] = useState('');

    useEffect(() => {
        fetch("http://127.0.0.1:8000/ViewReg?expired_only=true")
            .then((response) => response.json())
            .then((data) => setAccounts(data))
            .catch((error) => console.error("Error fetching data", error));
    }, []);

    
    const handleRenewal = (acc) => {
        setSelectedAccount(acc);
        setModalIsOpen(true);
    };

   
    const confirmRenewal = () => {
        setModalIsOpen(false);
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
            const expiry = new Date();
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
        .catch(error => console.error("Error renewing account:", error));
    };
    const handleRemove=(phoneNo)=>{
         setAccounts((prevAccounts) => prevAccounts.filter((account)=>account.Phone_No!=phoneNo))   
    }

    return (
        <div className="contentt container mt-4">
            <table className="table-container customEx-table" cellPadding={5}>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Profile</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Joining Date</th>
                        <th>Expired</th>
                        <th>Renewal</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {accounts.map((acc, index) => (
                        <tr key={acc.Sno}>
                            <td>{index + 1}</td>
                            <td>
                                <img src={acc.Photo || avatar} alt="Profile" className="profile-pic" />
                            </td>
                            <td>{acc.Name}</td>
                            <td>{acc.Phone_No}</td>
                            <td>{acc.Joining_Date}</td>
                            <td>{acc.Expired}</td>
                            <td>
                                <button className="btn" onClick={() => handleRenewal(acc)}>
                                    <img src={renewal} alt="renew" />
                                </button>

                                {/* First Modal */}
                                <ReactModal
                                    isOpen={modalIsOpen}
                                    onRequestClose={() => setModalIsOpen(false)}
                                    style={{
                                        overlay: { backgroundColor: 'rgba(102, 102, 102, 0.5)' },
                                        content: { width: '400px', height: '220px', margin: 'auto', textAlign: 'center', borderRadius: '8px' }
                                    }}
                                >
                                    <p style={{ marginBottom: '20px', fontSize: '20px' }}>
                                        Are you sure you want to renew?
                                    </p>
                                    <div style={{ display: 'flex', justifyContent:"center",alignItems:"center",gap:"20px" }}>
                                        <button style={{ background: 'black', color: 'white',padding:"10px",borderRadius:"5px"  }} onClick={confirmRenewal}>
                                            Sure
                                        </button>
                                        <button style={{ background: 'transparent', border: '1px solid #ccc',padding:"10px",borderRadius:"5px" }} onClick={() => setModalIsOpen(false)}>
                                            Cancel
                                        </button>
                                    </div>
                                </ReactModal>

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
                            </td>
                            <td><button onClick={()=> handleRemove(acc.Phone_No)}>X</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};



export default ExpiredAccounts
