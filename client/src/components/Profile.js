import axios from '../axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import './Profile.scss'

const Profile = () => {
  const [name,setName] =useState("");
  const [email,setEmail] =useState("");
  const [phone,setPhone] =useState("");
  const [address,setAddress] =useState("");
  const [message,setMessage] = useState(null);

  const navigate = useNavigate();

  const setFields=(user)=>{
    setName(user.firstname+' '+user.lastname);
    setPhone(user.phone)
    setAddress(user.address)
    setEmail(user.email)
  }

  useEffect(()=>{
    const token = localStorage.getItem("JWToken");
    if(token){
      axios.get(`/profile`,{
        headers: { Authorization:token}
      })
      .then(res=>{
        console.log(res);
        setFields(res.data.data.user);
      })
      .catch(err=>{
        console.log(err,err.response);
        setMessage(err.response.data.message)
      })
    }
    else{
      navigate("/login")
    }
  },[])


  return (
    <div className="login-card">
      <div className="login-title">Profile</div>
      <table style={{width:'100%',fontSize:'20px'}}>
        <tr>
          <th>Name</th>
          <th>{name}</th>
        </tr>
        <tr>
          <th>E-mail</th>
          <th>{email}</th>
        </tr>
        <tr>
          <th>Phone</th>
          <th>{phone}</th>
        </tr>
        <tr>
          <th>Address</th>
          <th>{address}</th>
        </tr>
      </table>
      
    </div>
  )
};

export default Profile;
