import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function Header() {

    const navigate = useNavigate()
    const fname_user = localStorage.fname_user;
    const name = localStorage.username;
    const [open, setOpen] = React.useState(false);

    const logout = async () => {
        const res = await fetch('http://localhost:4000/users/logout', {
            method: "delete",
            credentials: 'include'
        })
        const data = await res.json()
        if (data.err) {
            alert(data.err)
        } else {
            localStorage.removeItem('username')
            localStorage.removeItem('fname_user')
            localStorage.removeItem('is_admin')
            navigate('/login')
            setOpen(false)
        }
        console.log(data)
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className='header'>

            <AppBar position="static" color="secondary">
                <Toolbar className='toolbar'>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {
                            localStorage.username ? <span><Link to='/'><h3 className='title'>VACATIONS SITE</h3> <p className='name'>, Hellow {fname_user}</p></Link></span>
                                :
                                <Link to='/'><h3 className='title'>VACATIONS SITE</h3></Link>
                        }
                    </Typography>
                    {
                        !localStorage.username ?
                            <>
                                <Link to='/login'><Button color="inherit">Login</Button></Link>
                                <Link to='/register'><Button color="inherit">Register</Button></Link>
                            </>
                            : localStorage.is_admin == 1 ?

                                <>
                                    <Link to='/vacations'><Button color="inherit">Vacations</Button></Link>
                                    <Link to='/addvacation'><Button color="inherit">Add Vacation</Button></Link>
                                    <Link to='/reports'><Button color="inherit">Reports</Button></Link>
                                    <Button color="inherit" onClick={handleClickOpen}>Logout</Button>
                                </>
                                :
                                <>
                                    <Link to='/vacations'><Button color="inherit">Vacations</Button></Link>
                                    <Button color="inherit" onClick={handleClickOpen}>Logout</Button>
                                </>

                    }
                </Toolbar>
            </AppBar>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want to exit?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Note! You can always go back to your account
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancle</Button>
                    <Button onClick={logout} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    );
}
