import React, { useContext } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import { CardActionArea } from '@mui/material';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';
import { UserContext } from "../context/user";
import { useNavigate } from 'react-router-dom';
// import Post from './Post';
import Favorite from './Favorite';

function AllPosts({ post }) {
  // const { user, loggedIn } = useContext(UserContext)
  const navigate = useNavigate()

  // console.log(post.likes)

  const handleCardClick = () => {
    navigate(`/all-posts/${post.id}`)
  };

  return (
    <Grid item xs={6}>
      <Card sx={{ minWidth: 300 }}>
      <CardActionArea onClick={handleCardClick} >
        <CardHeader


          avatar={ <Avatar sx={{ width: 32, height: 32 }}>{       }</Avatar> }


          title={ post.title }
          subheader={ post.created_at }
        />
        </CardActionArea>
        <CardActions disableSpacing>
            <Favorite post={post}/>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default AllPosts;