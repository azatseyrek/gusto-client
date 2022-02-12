import axios from "axios";
import React, { useEffect, useState } from "react";
import SharedActorCard from "../components/SharedActorCard";

const ActorList = () => {
  const [sharedActors, setSharedActors] = useState([]);

  useEffect(() => {
    const getSharedActors = () => {
      axios
        .get("http://localhost:4000/sharedactors", {
          withCredentials: true,
        })
        .then((res) => {
          setSharedActors(res.data);
        });
    };
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
        />
      ))}
    </div>
  );
};

export default ActorList;
