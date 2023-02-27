import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

function Resource({resource}) {
  // const [resource, setResource] = useState([resource])

  return (
    <Box
      sx={{ m: 1, p: 2, border: '1px solid lightgrey' }}>
        <b>{ resource.title }</b> <br/>

        <Link href={resource.url} underline="hover">
          { resource.url }
        </Link>
        <br/>
        { resource.description } <br/>
    </Box> 
  )
}

export default Resource;