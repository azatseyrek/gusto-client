import React, { useState } from "react";
import axios from "axios";

import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async (e) => {
    e.preventDefault();
    await axios
      .post(
        "http://localhost:4000/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      )
      .then(
        (res) => {
          if (res.data === "success") {
            window.location.href = "/";
          } else {
            console.log(res);
          }
        },
        (error) => {
          setError("Password or Email is not correct!");
        }
      );
  };

  return (
    <div>
      <form onSubmit={login}>
        <h2>Log in</h2>
        <label>Email</label>
        <input
          type="text"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="error">{error}</div>
        <div className="loginBtn">
          <button>Login</button>
        </div>
        <div className="socialIcons">
          <p className="socialText">Login with:</p>

          <BsFacebook
            onClick={() => console.log("clicked")}
            className="facebookIcon"
            size={35}
          />

          <FcGoogle size={35} />
        </div>
      </form>
    </div>
  );
}
