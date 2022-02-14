import React from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'

const ProfileMovieCard = (props) => {
  const navigate = useNavigate();

  const deleteMovie = () => {
    const id = props.id;

    axios
      .delete(`https://gusto-movie-backend.herokuapp.com/movies/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        navigate("/profile")
        props.getMovies();
      });
  };

  const shareMovie = async () => {
    const id = props.id;
    console.log(id);
    await axios
      .put(
        `https://gusto-movie-backend.herokuapp.com/movies/${id}`,
        {
          share: true,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log("succes");
        navigate("/profile")
        props.getMovies();
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
