import React from 'react';
import { Route, Routes } from 'react-router-dom';
import About from './About';
import AddVacation from './AddVacation';
import Login from './Login';
import Page404 from './Page404';
import Register from './Register';
import Reports from './Reports';
import Vacations from './Vacations';

export default function Main({ arrVacations, setArrVacations, update, setUpdate }) {
    return (
        <div className='main'>
            <Routes>
                <Route path='/' element={<About />}> </Route>
                <Route path='/login' element={<Login />}> </Route>
                <Route path='/vacations' element={<Vacations arrVacations={arrVacations} setArrVacations={setArrVacations} update={update} setUpdate={setUpdate} />}> </Route>
                <Route path='/register' element={<Register />}> </Route>
                <Route path='/addvacation' element={<AddVacation />}> </Route>
                <Route path='/reports' element={<Reports update={update} />}> </Route>
                <Route path='/page404' element={<Page404 />}> </Route>
            </Routes>
        </div>
    );
}
