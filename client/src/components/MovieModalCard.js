import React from 'react'
import "../styles/modal.css";

const MovieModalCard = ({movieComment, id}) => {
  return (
    <div className='commentContainer'>

  {movieComment.map((data)=> (
    <div key={data.id}>
    <p> <span className='commenter'> {data.commenterName} -  </span>{data.review}</p>
    <hr />
    </div>
  )
  )}
  </div> 
  )
}

export default MovieModalCard