import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Link, useNavigate } from 'react-router-dom';


export default function About() {

  const itemData = [
    {
      img: 'https://www.shefhotel.co.il/files/gallery/items/source/11.jpg',
      title: 'Breakfast',
    },
    {
      img: 'https://images.fattal.co.il/octopus/Upload/Images/Resorts/magic-palace-eilat-pool4.jpg',
      title: 'Burger',
    },
    {
      img: 'https://www.amadeus.co.il/hotelImage/37581.jpg',
      title: 'Camera',
    },
    {
      img: 'https://cdn.isrotel.co.il/media/23819/%D7%A8%D7%95%D7%99%D7%90%D7%9C-%D7%92%D7%90%D7%A8%D7%93%D7%9F3.jpg?anchor=center&mode=crop&width=400&height=297&rnd=132716758130000000',
      title: 'Coffee',
    },
    {
      img: 'https://images.bigdeal.co.il/FilesUpload/CampaignImages/0/450/225250_Original.jpg',
      title: 'Hats',
    },
    {
      img: 'https://static01.tjt.co.il/sites/www.totallyjewishtravel.com/files/tcoreimg/ee0fd6257adf62c5da5b4fce9adcbb3f.jpg',
      title: 'Honey',
    },
    {
      img: 'https://www.nehoratours.co.il/clients/nehora/gallery/caribbean/HIDEAWAYATROYALTONPUNTACANA/Hideaway_at_Royalton_main.jpg',
      title: 'Basketball',
    },
    {
      img: 'https://www.ias.co.il/wp-content/uploads/thumbs/11-5-3b0jhtf01fipmauuuqt1q8.jpg',
      title: 'Fern',
    },
    {
      img: 'https://www.easygo.co.il/clients/easygo/gallery/Israel/herzlia/daniel/daniel_herzlia_756_500_1.jpg',
      title: 'Mushrooms',
    },
    {
      img: 'https://style-ltd.s3.eu-central-1.amazonaws.com/files/560/FILE-20180904-12466EJWDY6BAHXK.jpg',
      title: 'Tomato basil',
    },
    {
      img: 'https://www.nehoratours.co.il/clients/nehora/gallery/caribbean/memories/memopies%20main%20pic.jpg',
      title: 'Sea star',
    },
    {
      img: 'https://roaolam.com/wp-content/uploads/2021/11/20211124_161729.jpg',
      title: 'Bike',
    },
  ];

  const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );

  const navigate = useNavigate()



  return (
    <div className='about'>


      <h1 className='titleAbout hometitle'>The world's leading vacation site</h1>
      <h4 className='hometitle'>Here you will find a variety of vacations in the most sought after countries</h4>

      <br /><br /><br />

      <div className="airplanUp"></div>

      <div className="cloud cloud1">
        <div className="light"></div>
        <img src="https://images.vexels.com/media/users/3/145795/isolated/preview/05cd33059a006bf49006097af4ccba98-plane-in-flight-by-vexels.png" /></div>

      <div className="airplanDown"></div>


      <Link to='/register'><Button className='aboutCard'>Register</Button></Link>
      <Link to='/login'><Button className='aboutCard'>Login</Button></Link>


      <ImageList cols={6} className='imageListAbout'>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img
              src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
              className='imageActiveAbout'
            />
          </ImageListItem>
        ))}
      </ImageList>

      <div className="footbarHome">
        ©Rivka 02/22
      </div>

    </div>

  )
}
