import React, { useEffect, useState } from 'react';
import VacationPage from './VacationPage';



export default function Vacations({ arrVacations, setArrVacations, update, setUpdate }) {


  useEffect(() => {
    (async () => {
      const res = await fetch('http://localhost:4000/follow', {
        credentials: 'include'
      })
      const data = await res.json()
      console.log(data);
      setArrVacations(data)
    })()
  }, [update]);


  return (
    <div className='vacations'>

      {
        arrVacations.map(vacation => <VacationPage key={vacation.id} vacation={vacation} setUpdate={setUpdate} update={update} />)
      }

    </div >
  );
}
