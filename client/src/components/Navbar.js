import React, { useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { myContext } from "../pages/Context";

const Navbar = () => {
  const { user, updateUser } = useContext(myContext);
  const navigate = useNavigate();

  const logout = () => {
    axios
      .get("https://gusto-movie-backend.herokuapp.com/logout", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        navigate("/");
        updateUser();
      });
  };

  console.log(user);

  return (
    <nav>
      <h1>
        <Link className="listflix" to="/">
          LISTFLIX
        </Link>
      </h1>
      <ul>
        {user ? (
          <>
            <li>Welcome, {user.first_name} </li>
            <li>
              <Link className="hoverBtn" to="/profile">
                profile
              </Link>
            </li>
            <li>
              <Link className="hoverBtn" to="/movielist">
                Sahred Movies
              </Link>
            </li>
            <li>
              <Link className="hoverBtn" to="/actorlist">
                Sahred Actors
              </Link>
            </li>
            <li>
              <Link onClick={logout} className="hoverBtn" to="/">
                Log out
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link className="hoverBtn" to="/login">
                Login
              </Link>
            </li>
            <li>
              <Link className="hoverBtn" to="/register">
                Sign up
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
