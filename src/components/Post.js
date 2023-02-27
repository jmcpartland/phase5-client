import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from "../context/user";
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Comments from './Comments';
import Favorite from './Favorite';

function Post() {
  const { user, loggedIn } = useContext(UserContext);
  const [ author, setAuthor ] = useState([])
  const [ post, setPost ] = useState([])
  const params = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`/all-posts/${params.id}`)
    .then(res => res.json())
    .then(data => {
      setPost(data)
      setAuthor(data.user)
    })
  }, [])

  const handleClick = (e) => {
    console.log(e)
  }

  const editButton = () => {
    if (post.user_id == user.id) {
      return (
        <>
          <Button onClick={handleEditButton} type="submit" variant="contained" size="small" sx={{ mt: 3, mb: 2 }} >Edit</Button>{" "}
          <Button type="submit" variant="contained" size="small" sx={{ mt: 3, mb: 2 }} >Delete</Button>
        </>
      )
    }
  }

  const handleEditButton = () => {
    navigate(`/posts/${post.id}/edit`)
  }

  return (
    <>
    <Box margin={2} justifyContent="center">
      <Card sx={{ padding: 2 }}>
        <Avatar sx={{ width: 32, height: 32 }}>
          {/* {author.first_name.charAt(0).toUpperCase()} */}
        </Avatar>
          { author.first_name } { author.last_name }
        <CardActions disableSpacing>
          <Favorite />
          <IconButton aria-label="share" onClick={handleClick}>
            <ShareIcon />
          </IconButton>
        </CardActions>
        <h1>{ post.title }</h1>
          { editButton() }
        <br/>
          { post.body }
      </Card>
      <Comments post={post}/>
    </Box>
    </>
  );
}

export default Post;