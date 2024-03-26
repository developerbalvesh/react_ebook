import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credential, setCredential] = useState({ email: "", password: "" });
  const host="http://localhost:3002"
  var navigate=useNavigate();

  const clickhere = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({email:credential.email,password:credential.password})
    });
    const json=await response.json();
    console.log(json);
    if(json.success){
        localStorage.setItem('token',json.authtoken);
        navigate("/")
    }
    else{
        alert("invalid username & password")
    }
  };
  const onChange=(e)=>{
    setCredential({...credential,[e.target.name]:e.target.value})
  }

  return (
    <div className="container">
      <form onSubmit={clickhere}>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={onChange}
            value={credential.email}
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credential.password}
            onChange={onChange}
          />
        </div>
        {/* <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" for="exampleCheck1">
            Check me out
          </label>
        </div> */}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
