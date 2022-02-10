import axios from "axios";
import React from "react";

const ProfileActorCard = (props) => {
  const deleteActor = () => {
    const id = props.id;
    // console.log(id);
    axios
      .delete(`http://localhost:4000/actors/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        // setSharedMovies(res.data)
        console.log("succes");
      });
  };

  const shareActor = () => {
    const id = props.id;
    console.log(id);
    axios
      .put(
        `http://localhost:4000/actors/${id}`,
        {
          share: true,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        // setSharedMovies(res.data)
        console.log("succes");
      });
  };

  return (
    <ul className="cards">
      <li className="card">
        <img src={require("../images/film.png")} alt=" movie logo" />

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
