import React, { useEffect, useState } from 'react'
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import { AlertTitle, CardMedia, Slide } from '@mui/material';
import DialogContentText from '@mui/material/DialogContentText';
import { format } from 'date-fns'
import Alert from '@mui/material/Alert';


export default function VacationPage({ update, setUpdate, vacation }) {

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }


    const [target, setTarget] = useState(vacation.target);
    const [description, setDescription] = useState(vacation.description);
    const [from_date, setFrom_date] = useState(vacation.from_date);
    const [until_date, setUntil_date] = useState(vacation.until_date);
    const [image, setImage] = useState(vacation.image);
    const [price, setPrice] = useState(vacation.price)

    const [isFullTarget, setIsFullTarget] = useState(false)
    const [isFullDescription, setIsFullDescription] = useState(false)
    const [isFullFrom_date, setIsFullFrom_date] = useState(false)
    const [isFullUntil_date, setIsFullUntil_date] = useState(false)
    const [isFullImage, setIsFullImage] = useState(false)
    const [isFullPrice, setIsFullPrice] = useState(false)
    const [isEdit, setIsEdit] = useState(true)



    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(true);
        setIsEdit(true)
    };
    const handleClose = () => {
        setOpen(false);
        setIsEdit(true)
    };


    const editVacation = () => {

        const myFormData = new FormData()
        myFormData.append('description', description)
        myFormData.append('target', target)
        myFormData.append('from_date', from_date)
        myFormData.append('until_date', until_date)
        myFormData.append('myPicture', image)
        myFormData.append('price', price)

        Axios.put(`http://localhost:4000/vacations/${vacation.id}`, myFormData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
            .then(res => {
                console.log(res.data)
                if (res.data.err) {
                    setIsEdit(false)
                    // setOpen(false);
                    return
                }
                setUpdate(!update)
                setOpen(false);
            })
            .catch(err => {
                alert(err)
                setOpen(false);
            })

        console.log({ description, target, from_date, until_date, image, price });
    }


    const wontFollow = async (id_vacation) => {
        console.log(id_vacation);
        const res = await fetch(`http://localhost:4000/follow/mark/${id_vacation}`, {
            method: "post",
            credentials: "include"
        })
        const data = await res.json()
        console.log(data);
        setUpdate(!update)

    }

    const deleteVacation = async (id_vacation) => {
        console.log(id_vacation);
        const res = await fetch(`http://localhost:4000/vacations/${id_vacation}`, {
            method: "delete",
            credentials: "include"
        })
        const data = await res.json()
        console.log(data);
        setUpdate(!update)
    }



    return (
        <div className='vacationPage'>

            {
                <Card sx={{ minWidth: 275 }} key={vacation.id} className='vacationCard' elevation={20}>
                    <Typography>

                        {localStorage.is_admin == 1 ?
                            <>
                                <IconButton onClick={() => deleteVacation(vacation.id)}>
                                    <ClearIcon className='del' />
                                </IconButton>
                                <IconButton onClick={() => handleClickOpen(vacation.id)}>
                                    <EditIcon className='edit' />
                                </IconButton>
                            </>
                            :
                            <>
                                <IconButton onClick={() => wontFollow(vacation.id)}>
                                    <FavoriteIcon className={vacation.isFollow ? 'lev' : ''} />
                                </IconButton>
                            </>
                        }

                        <div className='qt'><p className='amount'>{vacation.amount}</p></div>
                        <h2 className='target'>{vacation.target}</h2>
                        <p>{vacation.description}</p>
                        {format(new Date(vacation.from_date), 'dd/MM/yyyy')} &nbsp;  -  &nbsp;
                        {format(new Date(vacation.until_date), 'dd/MM/yyyy')}
                        <h2 className='price'>${vacation.price}</h2>
                        <CardMedia
                            component="img"
                            height="240"
                            image={vacation.image.split('/')[0] === 'https:' ? vacation.image : `http://localhost:4000/vacations/image/${vacation.image}`}
                            alt="green iguana"
                        />

                    </Typography>
                </Card>
            }


            <Dialog
                open={open}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Edit vacation"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">

                        <form className='formAddVacation'>
                            <br />
                            <TextField label="Vacation destination"
                                placeholder='Vacation destination' className='inputAdd'
                                defaultValue={vacation.target}
                                onChange={e => setTarget(e.target.value) & setIsFullTarget(true)} />
                            <br />
                            {isFullTarget && !target && <span style={{ color: "red" }} >This field is required</span>}

                            <br /><br />
                            <TextField label="Vacation description"
                                placeholder='Vacation description' className='inputAdd'
                                defaultValue={vacation.description}
                                onChange={e => setDescription(e.target.value) & setIsFullDescription(true)} />
                            <br />
                            {isFullDescription && !description && <span style={{ color: "red" }} >This field is required</span>}

                            <br /><br />
                            <TextField type='date' className='inputAdd'
                                defaultValue={formatDate(vacation.from_date)}
                                onChange={e => setFrom_date(e.target.value) & setIsFullFrom_date(true)} />
                            <br />
                            {isFullFrom_date && !from_date && <span style={{ color: "red" }} >This field is required</span>}

                            <br /><br />
                            <TextField type='date' className='inputAdd'
                                defaultValue={formatDate(vacation.until_date)}
                                onChange={e => setUntil_date(e.target.value) & setIsFullUntil_date(true)} />
                            <br />
                            {isFullUntil_date && !until_date && <span style={{ color: "red" }} >This field is required</span>}

                            <br /><br />
                            {/*  */}
                            <TextField label="price"
                                placeholder='price' className='inputAdd'
                                defaultValue={vacation.price}
                                onChange={e => setPrice(e.target.value) & setIsFullPrice(true)} />
                            <br />
                            {isFullPrice && !price && <span style={{ color: "red" }} >This field is required</span>}

                            <br /><br />
                            <label htmlFor="icon-button-file">
                                <Input accept="image/*" id="icon-button-file" type="file" name="myPicture"
                                    onChange={e => setImage(e.target.files[0]) & setIsFullImage(true)} />
                                <IconButton color="primary" aria-label="upload picture" component="span">
                                    <PhotoCamera />
                                </IconButton>
                            </label>
                            <br />
                            {isFullImage && !image && <span style={{ color: "red" }} >This field is required</span>}

                            <br />
                            {!isEdit && <Alert severity="error">
                                <AlertTitle>Error</AlertTitle>
                                Cannot edit with empty fields <strong>check it out!</strong>
                            </Alert>}
                        </form>

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={editVacation}>Save</Button>
                </DialogActions>
            </Dialog>


        </div>
    )
}
