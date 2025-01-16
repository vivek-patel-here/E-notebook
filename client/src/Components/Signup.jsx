import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function Signup() {

    const navigate =useNavigate()

  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange =(event)=>{
    setCredentials((prevCredentials)=>{
        return {...prevCredentials , [event.target.name]:[event.target.value]}
    })
  }

  const handleSubmit =async(event)=>{
    event.preventDefault();
    const {username,email,password}=credentials;
    if(!username ||!email||!password){
        return toast.error("All feilds are required!",{autoClose:3000,position:'top-center'});
    }
    try{
        let response =await fetch("https://e-notebook-server.onrender.com/user/auth/signup",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({username:`${credentials.username}`,email:`${credentials.email}`,password:`${credentials.password}`})
        });
        let result =await response.json();
        if(!result.success){
            return toast.error(result.message,{autoClose:3000,position:'top-center'})
        }
        toast.success(result.message,{autoClose:3000,position:'top-center'})
        setTimeout(() => {
            navigate('/login');//Instead of navigating to login page simple login the user
        }, 3000);
    }catch(err){
        console.log(err)
    }
  }



  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>SignUp</h1>
        <div className="box">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your Username"
            value={credentials.username}
            onChange={handleChange}
          />
        </div>
        <div className="box">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your Email"
            value={credentials.email}
            onChange={handleChange}
          />
        </div>
        <div className="box">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your Password"
            value={credentials.password}
            onChange={handleChange}
          />
        </div>
        <button>Sign Up</button>
        <span>Already have an account? <Link to='/login'>LogIn</Link></span>
      </form>
      <ToastContainer autoClose={3000} />
    </div>
  );
}

export default Signup;
