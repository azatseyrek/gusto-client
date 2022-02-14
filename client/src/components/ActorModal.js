import axios from "axios";
import React, { useState } from "react";
import "../styles/modal.css";
import ActorModalCard from "./ActorModalCard";

function ActorModal({ closeModal, id }) {
  const [comment, setComment] = useState("");
  const [actorComment, setActorComment] = useState([]);

  const addComment = async (e) => {
    e.preventDefault();
    await axios
      .get(`https://gusto-movie-backend.herokuapp.com/getactorreview/${id}`, {
        withCredentials: true,
      })
      .then(
        (res) => {
          if (res.data) {
            // console.log(res.data);
            setActorComment(res.data);
          }
        },
        () => {
          console.log("Failure");
        }
      );

    await axios
      .post(
        "https://gusto-movie-backend.herokuapp.com/addactorreview",
        {
          review: comment,
          actorId: id,
        },
        {
          withCredentials: true,
        }
      )
      .then(
        (res) => {
          if (res.data === "success") {
            setComment("");
          }
        },
        () => {
          console.log("Failure");
        }
      );
  };

  const readComment = async (e) => {
    e.preventDefault();

    await axios
      .get(`https://gusto-movie-backend.herokuapp.com/getactorreview/${id}`, {
        withCredentials: true,
      })
      .then(
        (res) => {
          if (res.data) {
            // console.log(res.data);
            setActorComment(res.data);
          }
        },
        () => {
          console.log("Failure");
        }
      );
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="title">
          <input
            required
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            type="text"
            name="comment"
            className="modalInput"
            placeholder="your comment"
            type="text"
          />
          <div className="inputBtnContainer">
            <button onClick={() => closeModal(false)} className="modalCloseBtn">
              Close
            </button>
            <button onClick={readComment} className="modalReadBtn">
              Read
            </button>
            <button onClick={addComment} className="modalAddBtn">
              Add
            </button>
          </div>
        </div>

        <div className="body">
          <ActorModalCard actorComment={actorComment} id={id} />
        </div>
      </div>
    </div>
  );
}

export default ActorModal;
