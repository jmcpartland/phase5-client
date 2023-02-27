import React, { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { UserContext } from '../context/user';
import Posts from '../components/Posts'

function PostsList() {
    const {loggedIn} = useContext(UserContext)
    const [posts, setPosts] = useState([])

    useEffect(() => { 
        fetch('/posts')
        .then(res => res.json())
        .then(data => {
            setPosts(data)
        })
    }, [])

    const updatePostsList = (post) => {
      const updatedPosts = posts.filter((p) => p.id !== post.id);
      setPosts(updatedPosts);
    }

    const postListing = posts.map(p => <Posts key={p.id} post={p} updatePostsList={updatePostsList} />)

    if (loggedIn) {
        return (
            <Box spacing={2} margin={2}>
              <h1>My Posts</h1>
              <Grid container spacing={4}>
                {postListing}
              </Grid>
            </Box>
        )
    } else {
      <div>
          <h3>You need to be logged in read posts</h3>
      </div>
    }
}

export default PostsList