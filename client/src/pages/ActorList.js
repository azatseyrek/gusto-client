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
          actor_name={data.actor_name}
          owner_name={data.ownerName}
        />
      ))}
    </div>
  );
};

export default ActorList;

// 7e1a1504
// http://www.omdbapi.com/apikey.aspx?VERIFYKEY=8bbcbb5a-ac43-4b4e-8a87-4bf750752c8e
