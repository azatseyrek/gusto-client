import React, { useState } from 'react'
import axios from 'axios';

export default function Register() {
  const [first_name, setFirst_name] = useState("")
  const [last_name, setLast_name] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  const register = (e) => {
    e.preventDefault();

    axios.post("http://localhost:4000/register", {
      first_name,
      last_name,
      email,
      password
    }, {
      withCredentials: true
    }).then((res) => {
      if (res.data === "success") {
        window.location.href = "/login"
      }
    }, () => {
      console.log("Failure");
      
    })
  }

  return (
    <div className="signup_form_container">
  <form onSubmit={register}>
    <h2>Sign up</h2>
    <label htmlFor="first_name">Name </label>
    <input type="text" name="name"onChange={e => setFirst_name(e.target.value)} required />
    <label htmlFor="last_name">Surname</label>
    <input type="text" name="surname"  onChange={e => setLast_name(e.target.value)}required />
    <label htmlFor="email">Email</label>
    <input type="text" name="email"  onChange={e => setEmail(e.target.value)} required />
    <div className="email error"></div>
    <label htmlFor="password">Password</label>
    <input type="password" name="password"  onChange={e => setPassword(e.target.value)} required />
    <div className="password error"></div>
    <button>Sign up</button>
  </form>
</div>
  )
}