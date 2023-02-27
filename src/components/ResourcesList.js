import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import { Button } from "@mui/material";
import Resource from "./Resource";

function ResourcesList() {
  const [resource, setResource] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetch('/resources')
      .then(res => res.json())
      .then(data => {
        console.log(data)
          setResource(data)
      })
  }, [])

  const resourcesList = resource.map(r => <Resource key={r.id} resource={r} /> )

  const handleAddButton = () => {
    navigate(`/resource-form`)
  }

  return (
    <Box spacing={2} margin={2}>
      <h1>Long Covid Resources</h1>
      <Button onClick={handleAddButton} type="submit" variant="contained" size="small" sx={{ mt: 1, mb: 2 }} >Add Resource</Button>{" "}
      { resourcesList }
    </Box>
  )
}

export default ResourcesList;