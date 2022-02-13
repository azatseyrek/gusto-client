import React, { useState } from "react";
import axios from "axios";

import { BsFacebook } from "react-icons/bs";
// import { FcGoogle } from "react-icons/fc";

import { GoogleLogin } from "react-google-login";

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

  const responseGoogle = async (response) => {
    const googleUser = response.profileObj;

    console.log(googleUser.name);

    // await axios.post("http://localhost:4000/register", {
    //   first_name: googleUser.givenName,
    //   last_name: googleUser.familyName,
    //   email: googleUser.email,
    //   password: googleUser.googleId
    // }, {
    //   withCredentials: true
    // }).then((res) => {
    //   if (res.data === "success") {
    //     // window.location.href = "/login"
    //     console.log(res);
    //   } if(res) {
    //     console.log(res.data);
    //     setError(res.data)
    //   }
    // }, (error) => {
    //   console.log(error);

    // })

    await axios
      .post(
        "http://localhost:4000/login",
        {
          email: googleUser.email,
          password: googleUser.googleId,
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
    <div className="login_container">  
<div className="login_form_container">
      <form onSubmit={login}>
        <h2>Login</h2>
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
       
      </form>



      <GoogleLogin
        clientId="1044069866240-l23653s09gkot5k0ackj0gshqlg8j7kf.apps.googleusercontent.com"
        onSuccess={responseGoogle}
        onFailure={() => console.log("error")}
        buttonText={"Login with Google Acount"}
        theme="dark"
        
      />
      </div>
    </div>
    </div>
  );
}
