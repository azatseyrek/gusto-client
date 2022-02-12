import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { myContext } from "../pages/Context";
import { logout } from "../utility/helper";

const Navbar = () => {
  const user = useContext(myContext)

  return (
    <nav>
      <h1  ><Link className="listflix" to="/">LISTFLIX</Link></h1>
      <ul>
        {user ? (<>
          <li>Welcome, {user.first_name} </li>
          <li><Link className="hoverBtn" to="/profile">profile</Link></li>
          <li><Link className="hoverBtn" to="/movielist" >Sahred Movies</Link></li>
          <li><Link className="hoverBtn" to="/actorlist" >Sahred Actors</Link></li>
          <li><Link onClick={logout} className="hoverBtn" to="/" >Log out</Link></li>
        </>
        ) : (
          <>
            <li><Link className="hoverBtn" to="/login">Login</Link></li>
            <li><Link className="hoverBtn" to="/register">Sign up</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
