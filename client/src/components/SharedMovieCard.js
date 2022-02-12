import axios from "axios";

import React, { useContext, useEffect, useState } from "react";
import { FcLike } from "react-icons/fc";
import { MdOutlineInsertComment } from "react-icons/md";
import { myContext } from "../pages/Context";
import Modal from "./Modal";

const SharedMovieCard = (props) => {
  const user = useContext(myContext)
  const [openModal, setOpenModal] = useState(false)



  const like = async () => {
   
    await axios
      .post(
        "http://localhost:4000/addlike",
        {

          user_id : user.id,
          movie_id: props.id

        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        window.location.href="/movielist"
      });

  };



  return (
    <ul className="cards">
      <li className="sharedCard">
        <img src={require("../images/film.png")} alt="movielogo" />
        <h6>{props.owner_name} shared a movie</h6>
        <hr />
        <h4>{props.movie_name}</h4>
        <div className="cardBtn">
        
          <button onClick={like}>
            <FcLike /> <span>{props.likeCount}</span>{" "}
          </button>
         
          <button className="openModalBtn" onClick={()=>{setOpenModal(true)}}>
            <MdOutlineInsertComment />
          </button>
       {openModal && <Modal id={props.id} closeModal={setOpenModal}/>}
        </div>
      </li>
    </ul>
  );
};

export default SharedMovieCard;
