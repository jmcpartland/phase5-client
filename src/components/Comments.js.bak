import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from 'react-router-dom';
import { Box } from "@mui/system";
import Comment from "./Comment";

function Comments() {
  const [comments, setComments] = useState([])
  
  const params = useParams();

  useEffect(() => {
    fetch(`/posts/${params.id}/comments`)
    .then(res => res.json())
    .then(data => {
      // console.log(data)
        setComments(data)
    })
  },[])

  
  const commentsList = comments.map(c => <Comment key={c.id} comment={c} /> )
  
  return (
    <>
      {commentsList}
    </> 
  )

}

export default Comments