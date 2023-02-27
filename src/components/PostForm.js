import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/user";
import { useParams, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box } from "@mui/system";
import Alert from '@mui/material/Alert';

function PostForm() {
  const { user, loggedIn } = useContext(UserContext)
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [fetchMethod,setFetchMethod] = useState("")
  const [url, setUrl] = useState("")
  const [errorsList, setErrorsList] = useState([])
  const userInitial = user.first_name
  const params = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    if (params.id) {
      fetch(`/posts/${params.id}`)
        .then(res => res.json())
        .then(post => {
          setTitle(post.title)
          setBody(post.body)
        })
      setFetchMethod("PATCH")
      setUrl(params.id)
    } 
    else {
      setFetchMethod("POST")
      setUrl("")
    }
  }, [user])


  const handleSubmit = (e) => {
    e.preventDefault()
    fetch(`/posts/${url}`, { 
      method: fetchMethod,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: title,
        body: body,
        user_initial: userInitial,
        })
    })
      .then(res => res.json())
      .then(p => {
        if(!p.errors) {
          setTitle("")
          setBody("")
          navigate('/posts')
        } else {
          const errorLis = p.errors.map(e => <li key={e}>{e}</li>)
          setErrorsList(errorLis)
        }
      })
    }

    const showAlert = () => {
      if (errorsList.length !== 0) {
        return (
          <>
            <br/><Alert severity="error">{errorsList}</Alert>
          </>
        )
      }
    }

    if (loggedIn) {
      return (
        <Box
          padding={1}
          sx={{'& .MuiTextField-root': { mb: 1, width: '120ch' },}}
          noValidate
          autoComplete="off"
        >
        <form onSubmit={handleSubmit}>
            <TextField 
              inputProps={{style: {fontSize: 40}}}
              label="Title"
              variant="filled"
              id="title"
              name="title"
              // defaultValue={editTitle}
              value={title}
              rows={1}
              onChange={(e) => setTitle(e.target.value)}
            />
          <br/>
            <TextField 
              multiline
              label="Post"
              variant="filled"
              id="body"
              name="body"
              // defaultValue={editBody}
              value={body}
              rows={25}
              onChange={(e) => setBody(e.target.value)}
            />
          <br/>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
      </form>
          { showAlert() }
    </Box>
  )
  } else {
    return (
      <div>
          <h3>You need to be logged in to add Posts</h3>
      </div>
    ) 
  }
}

export default PostForm;