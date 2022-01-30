import React, { useState } from 'react';
import './Login.scss'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from '../axios';
import { useNavigate } from 'react-router';

const Login = () => {
  const [email,setEmail] =useState("");
  const [password,setPassword] =useState("");

  const[message,setMessage]=useState(null);
  const navigate = useNavigate();

  const login=()=>{
    axios.post('/login',{
      email,
      password
    })
    .then(res=>{
      console.log(res);
      localStorage.setItem('JWToken',res.data.token)

      //!redirect to profile
      navigate('/profile');
    })
    .catch(err=>{
      setMessage(err.response.data.message)
      setTimeout(()=>setMessage(null),1500)
    })
  }
  return (
    <div className="login-card">
      <div className="login-title">Login</div>
      <form>
        <TextField className="text-input" size="small" label="Email" type="email" variant="outlined" 
        value={email} onChange={e=>setEmail(e.target.value)} />
        <TextField className="text-input" size="small" label="Password" type="password" variant="outlined" 
        value={password} onChange={e=>setPassword(e.target.value)}/>
        <Button variant="contained" onClick={login} >Login</Button>
      </form>
      {
        message?
        <div>{message}</div>
        :null
      }
      <br/>
      <a href="/signup">Register?</a>
    </div>
    
  )
};

export default Login;
