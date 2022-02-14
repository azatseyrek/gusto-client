import React, { useState, useContext } from "react";
import axios from "axios";

import { myContext } from "./Context";

import { GoogleLogin } from "react-google-login";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const { updateUser } = useContext(myContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const getUserData = async () => {
    try {
      await axios
        .get("https://gusto-movie-backend.herokuapp.com/user", {
          withCredentials: true,
        })
        .then((res) => {
          console.log("Çalıştı -> ", res.data);
          updateUser(res.data);
        });
    } catch (error) {
      console.log("there is no user loged in");
    }
  };

  const login = async (e) => {
    e.preventDefault();
    await axios
      .post(
        "https://gusto-movie-backend.herokuapp.com/login",
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
            console.log(res);

            // Retrieve User Data
            getUserData()
              .then(() => {
                navigate("/");
              })
              .catch(() => {
                navigate("/login");
              });
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
        "https://gusto-movie-backend.herokuapp.com/login",
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
            navigate("/");
          }
        },
        (error) => {
          setError(
            "Your Google account is not registered. Please wait, you are being redirected to the registration page..."
          );

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
