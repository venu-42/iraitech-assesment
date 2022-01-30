import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import axios from '../axios'
import './Signup.scss'
import { useNavigate } from 'react-router';

const Signup = () => {
  const [firstname,setFirstname] =useState("");
  const [lastname,setLastname] =useState("");
  const [email,setEmail] =useState("");
  const [password,setPassword] =useState("");
  const [phone,setPhone] =useState("");
  const [address,setAddress] =useState("");
  

  const [message,setMessage] = useState(null);
  const navigate = useNavigate();

  const onSubmit = ()=>{
    axios.post('/signup',{
      firstname,
      lastname,
      email,
      password,
      phone,
      address
    })
    .then(res=>{
      console.log(res);
      setMessage("User Registered");
      localStorage.setItem('JWToken',res.data.token)
      //!redirect to profile
      navigate('/profile')
    })
    .catch(err=>{
      console.log(err,err.response);
      setMessage(err.response.data.message)
      setTimeout(()=>setMessage(null),1500)
    })
  }


  return (
    <div className="login-card">
      <div className="login-title">Signup</div>
      <form>
        <TextField className="text-input" size="small" label="Firstname" variant="outlined" 
        value={firstname} onChange={e=>setFirstname(e.target.value)} />
        <TextField className="text-input" size="small" label="Lastname" variant="outlined" 
        value={lastname} onChange={e=>setLastname(e.target.value)} />
        <TextField className="text-input" size="small" label="Email" type="email" variant="outlined" 
        value={email} onChange={e=>setEmail(e.target.value)} />
        <TextField className="text-input" size="small" label="Password" type="password" variant="outlined" 
        value={password} onChange={e=>setPassword(e.target.value)} />
        <TextField className="text-input" size="small" label="Contact Number" variant="outlined" 
        value={phone} onChange={e=>setPhone(e.target.value)} />
        <TextField className="text-input" size="small" label="Address" variant="outlined" 
        value={address} onChange={e=>setAddress(e.target.value)} />
        <Button variant="contained" onClick={onSubmit} >Sign up</Button>
      </form>
      {
        message?
        <div>{message}</div>
        :null
      }
      <br/>
      <a href="/login">Login?</a>
    </div>
  )
};

export default Signup;
