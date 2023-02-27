import React, { useState, useContext } from "react";
import { UserContext } from "../context/user";
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function ResourceForm({resource}) {
  const { loggedIn } = useContext(UserContext)

  const [title, setTitle] = useState("")
  const [url, setUrl ] = useState("")
  const [description, setDescription] = useState("")
  const [errorsList, setErrorsList] = useState([])
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    fetch("/resources", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: title,
            url: url,
            description: description,
            })
    })
        .then(res => res.json())
        .then(r => {
            if(!r.errors) {
                navigate('/resources')
            } else {
                const errorLis = r.errors.map(e => <h3>{e}</h3>)
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
      <h2>Add Resource</h2>
      <form onSubmit={handleSubmit}>
        <TextField 
          multiline
          label="Title"
          variant="filled"
          id="Title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br/>
        <TextField 
          multiline
          label="URL"
          variant="filled"
          id="URL"
          name="url"
          value={url}
          maxRows={6}
          onChange={(e) => setUrl(e.target.value)}
        />
        <br/>
        <TextField 
          multiline
          label="Description"
          variant="filled"
          id="Description"
          name="description"
          value={description}
          maxRows={6}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br/>
        <Button variant="contained" color="primary" type="submit" size="small">
          Submit
        </Button>
      </form>
      </Box>
    )
  } else {
    return (
      <div>
        <h3>You need to be logged in to add Comments</h3>
      </div>
    ) 
  }
}

export default ResourceForm;