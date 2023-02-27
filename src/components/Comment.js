import React from "react"
import { Box } from "@mui/system";

function Comment({comment}) {
  
  // console.log(comment)

  return (
    <Box
      sx={{ m: 1, p: 2, border: '1px solid lightgrey' }}>
        <b>{comment.user.first_name} {comment.user.last_name}:</b> { comment.comment_text }
    </Box> 
  )

}

export default Comment