import React from 'react';
import { useNavigate, Link } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';

export default function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isFullUserName, setIsFullUserName] = useState(false)
    const [isFullPassword, setIsFullPassword] = useState(false)

    const navigate = useNavigate()

    const handleClick = async () => {
        const res = await fetch('http://localhost:4000/users/login', {
            method: "post",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ username, password }),
            credentials: 'include'
        })
        const data = await res.json()
        console.log(" data", data);
        if (data.err) {
            alert(data.err)
        } else {
            localStorage.username = data.username
            localStorage.fname_user = data.fname_user
            localStorage.is_admin = data.is_admin
            navigate('/vacations')
        }
        console.log(data)
    }

    return (
        <div className='login'>

            <h1>Login</h1>
            <form className="contact-form">
                <TextField
                    className='textField'
                    id="filled-hidden-label-normal"
                    type="email"
                    name="email-inputted"
                    placeholder="E-mail"
                    label="Username"
                    variant="standard"
                    onChange={e => setUsername(e.target.value) & setIsFullUserName(true)}
                />
                <br />
                {isFullUserName && !username && <span style={{ color: "red" }} >This field is required</span>}
                <br /><br />
                <TextField
                    className='textField'
                    id="standard-password-input"
                    label="Password"
                    type="password"
                    placeholder='Password'
                    autoComplete="current-password"
                    variant="standard"
                    onChange={e => setPassword(e.target.value) & setIsFullPassword(true)}
                />
                <br />
                {isFullPassword && !password && <span style={{ color: "red" }} >This field is required</span>}

                <br /><br />
                <Button variant="contained" endIcon={<SendIcon />} onClick={handleClick} >
                    Login
                </Button>
                <br /><br />
                <span>Don't have an account yet? <Link to="/register">register now</Link> </span>
            </form>
            

        </div>
    );
}
