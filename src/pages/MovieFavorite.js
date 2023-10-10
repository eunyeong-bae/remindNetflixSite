import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './main.css';
import MovieListCard from '../components/MovieListCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileVideo } from '@fortawesome/free-regular-svg-icons';

const MovieFavorite = () => {
  const dispatch = useDispatch();
  const {favoriteMovies} = useSelector(state => state.movie);

  const height = (window.innerHeight || document.body.clientHeight) - 200;
  // console.log("favorite: ", favoriteMovies, popularMovies, searchMovies);

  function isArrayEmpty(arr){
    return arr.results.length === 0;
  };
  const isMovieFavoriteListEmpty = isArrayEmpty(favoriteMovies);

  useEffect(()=>{
    dispatch({
        type:"SET_CURRENT_PAGE",
        payload:{currentPage:'Movie'}
    })      
  }, []);

  return (
    <div className='d-flex movie-favorite-box'>
      { !isMovieFavoriteListEmpty
         ? <MovieListCard Movies={favoriteMovies}/>
         : <div className='d-flex movie-favorite-empty' style={{height}}>
            <div className='d-flex fileVideo-box'>
                <FontAwesomeIcon icon={faFileVideo} size="2xl"/>
            </div>
            <h2>등록된 리스트가 없습니다.</h2>
           </div>
      }
    </div>
  )
}

export default MovieFavorite
