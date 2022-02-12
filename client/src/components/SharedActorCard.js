import axios from "axios";
import React, { useContext, useState } from "react";
import { FcLike } from "react-icons/fc";
import { MdOutlineInsertComment } from "react-icons/md";
import { myContext } from "../pages/Context";
import { like } from "../utility/helper";
import ActorModal from "./ActorModal";

const SharedActorCard = ({id, owner_name, actor_name, likeCount}) => {
  const user = useContext(myContext)
  const [openModal, setOpenModal] = useState(false)




  const like = async () => {
   
    await axios
      .post(
        "http://localhost:4000/addactorlike",
        {

          user_id : user.id,
          actor_id: id  //?

        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        window.location.href="/actorlist"
      });

  };





  return (

    <ul className="cards">
    <li className="sharedCard">
      <img src={require("../images/film.png")} alt="logo" />
      <h6>{owner_name} shared an actor</h6>
      <hr />
      <h4>{actor_name}</h4>
      <div className="cardBtn">
      
        <button onClick={like}>
          <FcLike /> <span>{likeCount}</span>{" "}
        </button>
       
        <button className="openModalBtn" onClick={()=>{setOpenModal(true)}}>
          <MdOutlineInsertComment />
        </button>
     {openModal && <ActorModal id={id} closeModal={setOpenModal}/>}
      </div>
    </li>
  </ul>

  );
};

export default SharedActorCard;
