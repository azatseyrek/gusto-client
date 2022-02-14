import axios from "axios";
import React, { useContext, useState } from "react";
import { FcLike } from "react-icons/fc";
import { MdOutlineInsertComment } from "react-icons/md";

import { useNavigate } from "react-router-dom";

import { myContext } from "../pages/Context";
import ActorModal from "./ActorModal";

const SharedActorCard = ({
  id,
  owner_name,
  actor_name,
  likeCount,
  getActors,
}) => {
  const { user } = useContext(myContext);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  const like = async () => {
    await axios
      .post(
        "https://gusto-movie-backend.herokuapp.com/addactorlike",
        {
          user_id: user.id,
          actor_id: id, //?
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        navigate("/actorlist");
        getActors();
      });
  };

  return (
    <ul className="cards">
      <li className="sharedCard">
        <img src={require("../images/movstar.png")} alt="logo" />
        <h6>{owner_name} shared an actor</h6>
        <hr />
        <h4>{actor_name}</h4>
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
          {openModal && <ActorModal id={id} closeModal={setOpenModal} />}
        </div>
      </li>
    </ul>
  );
};

export default SharedActorCard;
