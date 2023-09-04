import React from 'react'

function Comment({comment}) {
  return (
    <>
       <div className="comments1">
            <span className=" font-bold ">{comment.Nom} {comment.Prenom}</span>
            <p className="comment">{comment.Body}</p>
        </div> 
    </>
  )
}

export default Comment