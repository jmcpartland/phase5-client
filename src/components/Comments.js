import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { UserContext } from "../context/user";
import { Box } from "@mui/system";
import Comment from "./Comment";

function Comments({post}) {
  const { loggedIn } = useContext(UserContext)
  const [commentText, setCommentText] = useState([])
  const [errorsList, setErrorsList] = useState([])
  const [comments, setComments] = useState([])
  const navigate = useNavigate()
  const params = useParams();

  useEffect(() => {
    fetch(`/posts/${params.id}/comments`)
    .then(res => res.json())
    .then(data => {
      // console.log(data)
        setComments(data)
    })
  },[commentText])

  const commentsList = comments.map(c => <Comment key={c.id} comment={c} /> )

  const handleSubmit = (e) => {
    e.preventDefault()

    fetch("/comments", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            comment_text: commentText,
            post_id: post.id,
            })
    })
        .then(res => res.json())
        .then(c => {
            if(!c.errors) {
                setCommentText([])
            } else {
                const errorLis = c.errors.map(e => <h3 key={e}>{e}</h3>)
                setErrorsList(errorLis)
            }
        })
    }

  if (loggedIn) {
    return (
      <Box
        padding={1}
        sx={{'& .MuiTextField-root': { mb: 1, width: '50ch' }}}
        noValidate
        autoComplete="off"
      >
      <h2>Comments</h2>
      <form onSubmit={handleSubmit}>
        <TextField 
          multiline
          label="Comment"
          variant="filled"
          id="Comment"
          name="comment"
          value={commentText}
          maxRows={6}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <br/>
        <Button variant="contained" color="primary" type="submit" size="small">
          Submit
        </Button>
      </form>
        <Box>
          {commentsList}
        </Box>
      </Box>
    )
  } else {
    return (
      <div>
        <h3>You need to be logged in to add Comments</h3>
      </div>
    ) 
  }
};

export default Comments;