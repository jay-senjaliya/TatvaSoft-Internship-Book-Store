import { Button, Typography } from '@mui/material';
import React from 'react'
import {  useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const handleName = () => {
    navigate('/book-name')
  }
  const handlePrice = () => {
    navigate('/book-price')
  }
  const handleHome = () => {
    navigate('/')
  }
  return (
    <div className='home-container'>
      <Typography variant='h1' style={{"margin": "80px"}}>What you want to know? </Typography>
      <div className='home-btn'>
        <Button variant='contained' style={{"width": "150px"}} onClick={handleName}>Name</Button>
        <Button variant='contained' style={{"width": "150px"}} onClick={handlePrice}>Price</Button>
        <Button variant='contained' style={{"width": "150px"}} onClick={handleHome}>Home</Button>
      </div>
    </div>
  )
}

export default Home
