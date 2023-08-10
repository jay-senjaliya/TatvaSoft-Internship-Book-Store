import { Typography } from '@mui/material'
import React from 'react'

const Name = ({name}) => {
  return (
    <div>
      <Typography variant='h3' style={{'textAlign': 'center', "marginTop": "50px"}}>The name of Book is: {name}</Typography>
    </div>
  )
}

export default Name
