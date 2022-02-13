import React, { useState } from "react";
import axios from "axios";

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
          } 
        },
        (error) => {
          setError("Your Google account is not registered. Please wait, you are being redirected to the registration page...");

          const timeout = setTimeout(redirectLogin, 4000);

          function redirectLogin() {
            return (window.location.href = "/register");
          }


        }
      );
  };

  const responseFacebook = (response) => {
    console.log(response);
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
