import React, { useState } from "react";
import axios from "axios";
import GoogleLogin from "react-google-login";

export default function Register() {
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const register = async (e) => {
    e.preventDefault();

    await axios
      .post(
        "https://gusto-movie-backend.herokuapp.com/register",
        {
          first_name,
          last_name,
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
            window.location.href = "/login";
            console.log(res);
          }
          if (res) {
            console.log(res.data);
            setError(res.data);
          }
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const responseGoogle = async (response) => {
    const googleUser = response.profileObj;

    await axios
      .post(
        "https://gusto-movie-backend.herokuapp.com/register",
        {
          first_name: googleUser.givenName,
          last_name: googleUser.familyName,
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

            setError("Registration successful. You are redirected to the user login page. Please wait...")
            const timeout = setTimeout(redirectLogin, 3000);

            function redirectLogin() {
              return (window.location.href = "/login");

            }

          } else {
            // console.log("user is allready registered");
            setError("user is allready registered");

            const timeout = setTimeout(redirectLogin, 3000);

            function redirectLogin() {
              return (window.location.href = "/login");
            }
          }
        },
        (error) => {
          console.log(error);
        }
      );
  };

  return (
    <div className="signup_container">
      <div className="signup_form_container">
        <form onSubmit={register}>
          <h2>Sign up</h2>
          <label htmlFor="first_name">Name </label>
          <input
            type="text"
            name="name"
            onChange={(e) => setFirst_name(e.target.value)}
            required
          />
          <label htmlFor="last_name">Surname</label>
          <input
            type="text"
            name="surname"
            onChange={(e) => setLast_name(e.target.value)}
            required
          />
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="error">{error}</div>
          <button>Sign up</button>
        </form>

        <GoogleLogin
          clientId="1044069866240-l23653s09gkot5k0ackj0gshqlg8j7kf.apps.googleusercontent.com"
          onSuccess={responseGoogle}
          onFailure={() => console.log("error")}
          buttonText={"Register with Google Acount"}
        />
      </div>
    </div>
  );
}
