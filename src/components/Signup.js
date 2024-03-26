import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [credential,setCredential]=useState({name:"",email:"",password:""});
    const host="http://localhost:3002";
    var nevigate=useNavigate();

    const clickhere=async (e)=>{
        e.preventDefault();
        const {name, email, password}=credential;
        const response=await fetch(`${host}/api/auth/createuser`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({name,email,password})
        });
        const json=await response.json();
        console.log(json)
        if(json.success){
            localStorage.setItem('token',json.authtoken)
            nevigate("/")
        }
        else{
            alert("please fill proper email, name, and password")
        }
    }
    const onChange=(e)=>{
        setCredential({...credential,[e.target.name]:e.target.value})
    }
  return (
    <>
    <div className='container'>
      <form onSubmit={clickhere}>
      <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Enter name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={onChange}
        
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={onChange}
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
        
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
    </div>
    </>
  )
}

export default Signup
