import React from 'react'
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className='home-container'>
      <h1>What you want to know? </h1>
      <div className='home-btn'>
        <button className='btn-1'><Link to='/book-name'>Name</Link></button>
        <button className='btn-2'><Link to='/book-price'>Price</Link></button>
        <button className='btn-3'><Link to='/'>Home</Link></button>
      </div>
    </div>
  )
}

export default Home
