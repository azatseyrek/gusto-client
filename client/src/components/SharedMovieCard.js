import React from "react";
import { FcLike } from "react-icons/fc";
import { MdOutlineInsertComment } from "react-icons/md";

const SharedMovieCard = (props) => {
  return (
    <ul className="cards">
      <li className="sharedCard">
        <img src={require("../images/film.png")} alt="movielogo" />
        <h6>{props.owner_name} shared a movie</h6>
        <hr />
        <h4>{props.movie_name}</h4>
        <div className="cardBtn">
          <button>
            <FcLike className="likeIcon" /> <span>0</span>{" "}
          </button>
          <button>
            <MdOutlineInsertComment />
          </button>
        </div>
      </li>
    </ul>
  );
};

export default SharedMovieCard;
