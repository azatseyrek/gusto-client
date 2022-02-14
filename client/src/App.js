import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import ActorList from "./pages/ActorList";
import MovieList from "./pages/MovieList";

import Navbar from "./components/Navbar";

import "../src/styles/main.css";
import { myContext } from "./pages/Context";

function App() {
  const {user} = useContext(myContext);
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route index element={<HomePage />} />
         
        {user ? (
          <>

              <Route path="profile" element={<Profile />} />
              <Route path="actorlist" element={<ActorList />} />
              <Route path="movielist" element={<MovieList />} />
             
          </>
        )  : (
          <>
           
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
