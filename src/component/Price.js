import { Typography } from '@mui/material'
import React from 'react'

const Price = ({price}) => {
  return (
    <div>
      <Typography variant='h3' style={{'textAlign': 'center', "marginTop": "50px"}}>The Price Of Book is: {price}</Typography>
    </div>
  )
}

export default Price
