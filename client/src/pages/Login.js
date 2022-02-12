import React, { useState } from 'react'
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")


  const login =async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:4000/login", {
      email,
      password
    }, {
      withCredentials: true
    }).then((res) => {
      if (res.data === "success") {
        window.location.href = "/"
      }else {
        console.log(res);
      }
    }, (error) => {
      setError("Password or Email is not correct!")
    })
  }



  return (
    <div>
      <form onSubmit={login}>
    <h2>Log in</h2>
    <label >Email</label>
    <input type="text" name="email" onChange={e => setEmail(e.target.value)} required/>
    <label >Password</label>
    <input type="password" name="password" onChange={e => setPassword(e.target.value)} required/>
    <div className="error">{error}</div>
    <button >Login</button>
</form>
    </div>
  )
}