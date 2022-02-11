import axios from "axios";
import React from "react";

const ProfileMovieCard = (props) => {
  const deleteMovie = () => {
    const id = props.id;

    axios
      .delete(`http://localhost:4000/movies/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        window.location.href= "/profile"
      });
  };

  const shareMovie = async () => {
    const id = props.id;
    console.log(id);
   await axios
      .put(
        `http://localhost:4000/movies/${id}`,
        {
          share: true,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {

        console.log("succes");
        window.location.href= "/profile"
      });
  };


  return (
    <ul className="cards">
      <li className="card">
        <img src={require("../images/film.png")} alt="movielogo" />
        <hr />
        <h4>{props.movie_name}</h4>
        <div className="cardBtn">
          <button onClick={shareMovie}>Share</button>
          <button onClick={deleteMovie}>Delete</button>
        </div>
      </li>
    </ul>
  );
};

export default ProfileMovieCard;
