import React from 'react';
import './main.css';
import Badge from './Badge';
import { useNavigate } from 'react-router-dom';
import MovieSubInfo from './MovieSubInfo';

const MovieCard = ({item}) => {
    const navigate = useNavigate();

    const goToMovieDetailPg = () => {
        navigate(`/movies/${item.id}`);  
        window.location.reload(); //새로고침
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
                <div className='title-div'>
                    <p>{item.title}</p>
                    <div></div>
                </div>
                <div className='d-flex genre-div'>
                    { item.genre_ids.map(id => <Badge key={id} id={id}/> )}
                </div>
            </div>
            <MovieSubInfo item={item}/>
        </div>
    </div>
  )
}

export default MovieCard
