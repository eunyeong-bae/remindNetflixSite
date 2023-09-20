import React from 'react';
import './main.css';
import Badge from './Badge';
import { useNavigate } from 'react-router-dom';
import MovieSubInfo from './MovieSubInfo';

const MovieCard = ({item}) => {
    const navigate = useNavigate();

    const goToMovieDetailPg = () => {
        navigate(`/movies/${item.id}`);  
    };

  return (
    <div
        className='slide-item'
        style={{
            backgroundImage:
                "url(" + 
                `https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${item.poster_path}`
                +")"
        }}
        onClick={goToMovieDetailPg}
    >
        <div className='d-flex overlay'>
            <div className='movie-info'>
                <p>{item.title}</p>
                <div className='d-flex'>
                    { item.genre_ids.map(id => <Badge id={id}/> )}
                </div>
            </div>
            <MovieSubInfo item={item}/>
        </div>
    </div>
  )
}

export default MovieCard
