import React from 'react';
import { useNavigate, Link } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';

export default function Register() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")

    const [isFullUsername, setIsFullUsername] = useState(false)
    const [isFullPassword, setIsFullPassword] = useState(false)
    const [isFullFname, setIsFullFname] = useState(false)
    const [isFullLname, setIsFullLname] = useState(false)

    const navigate = useNavigate()

    const handleClick = async () => {
        const res = await fetch('http://localhost:4000/users/register', {
            method: "post",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ username, password, fname, lname }),
            credentials: 'include'
        })
        const data = await res.json()
        if (data.err) {
            alert(data.err)
        } else {
            navigate('/login')
        }
        console.log(data)
    }

    return (
        <div className='register'>

            <h1>Register</h1>
            <h3>Create a new account</h3>
            <form className="contact-form">

                <TextField
                    className='textField'
                    id="filled-hidden-label-normal1"
                    type="text"
                    placeholder="First Name"
                    label="First Name"
                    variant="standard"
                    onChange={e => setFname(e.target.value) & setIsFullFname(true)}
                />
                <br />
                {isFullFname && !fname && <span style={{ color: "red" }} >This field is required</span>}

                <br /><br />
                <TextField
                    className='textField'
                    id="filled-hidden-label-normal2"
                    type="text"
                    placeholder="Last Name"
                    label="Last Name"
                    variant="standard"
                    onChange={e => setLname(e.target.value) & setIsFullLname(true)}
                />
                <br />
                {isFullLname && !lname && <span style={{ color: "red" }} >This field is required</span>}

                <br /><br />
                <TextField
                    className='textField'
                    id="filled-hidden-label-normal5"
                    type="email"
                    name="email-inputted"
                    placeholder="E-mail"
                    label="E-mail"
                    variant="standard"
                    onChange={e => setUsername(e.target.value) & setIsFullUsername(true)}
                />
                <br />
                {isFullUsername && !username && <span style={{ color: "red" }} >This field is required</span>}

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
                    Register
                </Button>
                <br /><br />
                <span>Already have an account? <Link to="/login">login now</Link> </span>
            </form>

        </div>
    );
}
