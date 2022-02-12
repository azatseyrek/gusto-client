import React from 'react'
import "../styles/modal.css";

const ModalCard = ({movieComment, id}) => {
  return (
    <div className='commentContainer'>

  {movieComment.map((data)=> (
    <div>
    <p> <span className='commenter'> {data.commenterName} -  </span>{data.review}</p>
    <hr />
    </div>
  )
  )}
  </div> 
  )
}

export default ModalCard