import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { MdOutlineInsertComment } from "react-icons/md";
import { FcLike } from "react-icons/fc";

import { myContext } from "../pages/Context";
import MovieModal from "./MovieModal";

const SharedMovieCard = ({
  id,
  owner_name,
  movie_name,
  likeCount,
  getMovies,
}) => {
  const { user } = useContext(myContext);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  const like = async () => {
    await axios
      .post(
        "https://gusto-movie-backend.herokuapp.com/addlike",
        {
          user_id: user.id,
          movie_id: id,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        navigate("/movielist");
        getMovies();
      });
  };

  return (
    <ul className="cards">
      <li className="sharedCard">
        <img src={require("../images/film.png")} alt="movielogo" />
        <h6>{owner_name} shared a movie</h6>
        <hr />
        <h4>{movie_name}</h4>
        <div className="cardBtn">
          <button onClick={like}>
            <FcLike /> <span>{likeCount}</span>{" "}
          </button>

          <button
            className="openModalBtn"
            onClick={() => {
              setOpenModal(true);
            }}
          >
            <MdOutlineInsertComment />
          </button>
          {openModal && <MovieModal id={id} closeModal={setOpenModal} />}
        </div>
      </li>
    </ul>
  );
};

export default SharedMovieCard;
