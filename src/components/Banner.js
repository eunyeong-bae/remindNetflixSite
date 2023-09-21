import React from 'react';
import './main.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
  const navigate = useNavigate();

  const {popularMovies, detailMovie, banner} = useSelector(state => state.movie);

  const bgImgUrl = banner 
      ? "url(https://images.hdqwalls.com/download/polygonal-abstract-red-dark-background-eo-1280x1024.jpg)"
      : "url(" 
          +`https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${popularMovies.results && popularMovies.results[0].poster_path}`
          +")"

    // console.log('banner:', detailMovie, banner, bgImgUrl)
  return (
    <div 
        className={banner ? 'banner basic' : 'banner'}    
        style={{ backgroundImage: bgImgUrl}}
    >
        { banner
            ? <div className='banner-info'>
                <h1>NETFLIX</h1>
                <div className='d-flex banner-info-box'>
                    <p className='home' onClick={() => navigate('/') }>HOME</p>
                    <p className='banner-title'>{detailMovie.title}</p>
                </div>
              </div>
            :<div className='home-banner-info'>
                <h1>{popularMovies.results && popularMovies.results[0].title}</h1>
                <p>{popularMovies.results && popularMovies.results[0].overview}</p>
             </div>
        }
    </div>
  )
}

export default Banner
