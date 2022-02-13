import React from "react";
import "../styles/modal.css";

const ActorModalCard = ({ actorComment, id }) => {
  return (
    <div className="commentContainer">
      {actorComment.map((data) => (
        <div key={data.id}>
          <p>
            {" "}
            <span className="commenter"> {data.commenterName} - </span>
            {data.review}
          </p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default ActorModalCard;
