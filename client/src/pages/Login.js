import React, { useState } from 'react'
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  const login =async (e) => {
    e.preventDefault();
    axios.post("http://localhost:4000/login", {
      email,
      password
    }, {
      withCredentials: true
    }).then((res) => {
      if (res.data === "success") {
        window.location.href = "/"

      }
    }, () => {
      console.log("Failure");
    })
  }



  return (
    <div>
      <form onSubmit={login}>
    <h2>Log in</h2>
    <label >Email</label>
    <input type="text" name="email" onChange={e => setEmail(e.target.value)} required/>
    <div className="email error"></div>
    <label >Password</label>
    <input type="password" name="password" onChange={e => setPassword(e.target.value)} required/>
    <div className="password error"></div>
    <button >Login</button>
</form>
    </div>
  )
}