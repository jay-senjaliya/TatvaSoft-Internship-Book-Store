import { Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

const Form = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [userDetail, setUserDetail] = useState({name:"", password:""});
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name, password);
        setUserDetail({name, password});
        setName('');
        setPassword('');
    }
  return (
    <div className='form-div'>
        <Typography variant='h3' style={{'textAlign': 'center'}}>Login Here!</Typography>
      <form className='form'>
      <TextField label="Name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} style={{"margin": "10px"}} />
      <TextField label="Password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} style={{"margin": "10px"}} />
      <Button variant='contained' onClick={handleSubmit}>Submit</Button>
      </form>

      <div>
        {userDetail.name && <Typography varient="h4">Name:{userDetail.name}</Typography>}
        {userDetail.password && <Typography varient="h4">Password:{userDetail.password}</Typography>}
        
        
      </div>
      
    </div>
  )
}

export default Form
