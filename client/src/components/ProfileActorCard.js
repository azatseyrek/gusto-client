import React from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'

const ProfileActorCard = (props) => {
  const navigate = useNavigate();

  const deleteActor = () => {
    const id = props.id;

    axios
      .delete(`https://gusto-movie-backend.herokuapp.com/actors/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        navigate("/profile")
        props.getActors();
      });
  };

  const shareActor = () => {
    const id = props.id;
    console.log(id);
    axios
      .put(
        `https://gusto-movie-backend.herokuapp.com/actors/${id}`,
        {
          share: true,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        navigate("/profile")
        props.getActors();
      });
  };

  return (
    <ul className="cards">
      <li className="card">
        <img src={require("../images/movstar.png")} alt="actorlogo" />

        <hr />
        <h4>{props.actor_name}</h4>
        <div className="cardBtn">
          <button onClick={shareActor}>Share</button>
          <button onClick={deleteActor}>Delete</button>
        </div>
      </li>
    </ul>
  );
};

export default ProfileActorCard;
