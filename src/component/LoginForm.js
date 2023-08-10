import React, { useState } from 'react'

export default function LoginForm() {
    const [state, setState] = useState({ username: '', email: '', password: '' });

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`name: ${state.username}\n email: ${state.email}\n password: ${state.password} `);
        setState({ username: '', email: '', password: '' });
    }
    return (
        <div style={{ width: '50vw', margin: '20px' }}>
            <h1> Registration Form</h1>
            <div className="mb-3">
                <label htmlFor="username" className="form-label">User Name:</label>
                <input type="text" name='username' className="form-control" id="username" value={state.username} onChange={handleChange} placeholder="UserName.." />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address:</label>
                <input type="email" name='email' className="form-control" id="email" value={state.email} onChange={handleChange} placeholder="Email Address.." />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">password:</label>
                <input type="password" name='password' className="form-control" id="password" value={state.password} onChange={handleChange} placeholder="Password.." />
            </div>
            <div className="mb-3">
                <button className='btn btn-primary' onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
}
