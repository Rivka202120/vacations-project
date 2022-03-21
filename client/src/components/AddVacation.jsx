import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';


export default function AddVacation() {

    const [target, setTarget] = useState('');
    const [description, setDescription] = useState('');
    const [from_date, setFrom_date] = useState('');
    const [until_date, setUntil_date] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState(0)
    // Validation
    const [isFullTarget, setIsFullTarget] = useState(false)
    const [isFullDescription, setIsFullDescription] = useState(false)
    const [isFullFrom_date, setIsFullFrom_date] = useState(false)
    const [isFullUntil_date, setIsFullUntil_date] = useState(false)
    const [isFullImage, setIsFullImage] = useState(false)
    const [isFullPrice, setIsFullPrice] = useState(false)


    const navigate = useNavigate()


    const addVacation = () => {

        const myFormData = new FormData()
        myFormData.append('target', target)
        myFormData.append('description', description)
        myFormData.append('from_date', from_date)
        myFormData.append('until_date', until_date)
        myFormData.append('myPicture', image)
        myFormData.append('price', price)

        Axios.post('http://localhost:4000/vacations', myFormData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
            .then(res => {
                console.log(res.data)
                navigate('/vacations')
            })
            .catch(err => {
                console.log(err)
            })
    }


    return (
        <div className='addvacation'>
            <form className='formAddVacation'>
                <h1>Add Vacation</h1>
                <TextField label="Vacation destination"
                    placeholder='Vacation destination' className='inputAdd'
                    onChange={e => setTarget(e.target.value) & setIsFullTarget(true)} />
                <br />
                {isFullTarget && !target && <span style={{ color: "red" }} >This field is required</span>}

                <br /><br />
                <TextField label="Vacation description"
                    placeholder='Vacation description' className='inputAdd'
                    onChange={e => setDescription(e.target.value) & setIsFullDescription(true)} />
                <br />
                {isFullDescription && !description && <span style={{ color: "red" }} >This field is required</span>}

                <br /><br />
                <TextField type='date' className='inputAdd'
                    onChange={e => setFrom_date(e.target.value) & setIsFullFrom_date(true)} />
                <br />
                {isFullFrom_date && !from_date && <span style={{ color: "red" }} >This field is required</span>}

                <br /><br />
                <TextField type='date' className='inputAdd'
                    onChange={e => setUntil_date(e.target.value) & setIsFullUntil_date(true)} />
                <br />
                {isFullUntil_date && !until_date && <span style={{ color: "red" }} >This field is required</span>}

                <br /><br />
                <TextField label="price"
                    placeholder='price' className='inputAdd'
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
                {isFullImage && !image && <span style={{ color: "red" }} >This field is required</span>}
                <br /><br />
                <Button variant="contained" endIcon={<SendIcon />} onClick={addVacation}>
                    Send
                </Button>
            </form>


        </div>
    );
}
