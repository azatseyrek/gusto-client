import axios from "axios";
import React, { useEffect, useState } from "react";
import SharedActorCard from "../components/SharedActorCard";

const ActorList = () => {
  const [sharedActors, setSharedActors] = useState([]);

  const getSharedActors = () => {
    axios
      .get("https://gusto-movie-backend.herokuapp.com/sharedactors", {
        withCredentials: true,
      })
      .then((res) => {
        setSharedActors(res.data);
      });
  };

  useEffect(() => {
    getSharedActors();
  }, []);

  return (
    <div className="cards_container">
      {sharedActors.map((data) => (
        <SharedActorCard
          key={data.id}
          id={data.id}
          actor_name={data.actor_name}
          owner_name={data.ownerName}
          likeCount={data.likeCount}
          getActors={getSharedActors}
        />
      ))}
    </div>
  );
};

export default ActorList;
