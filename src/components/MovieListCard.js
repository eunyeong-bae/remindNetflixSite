import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../pages/main.css';
import Badge from './Badge';
import MovieSubInfo from './MovieSubInfo';

const MovieListCard = ({Movies}) => {
    const navigate = useNavigate();

    const goToMovieDetailPg = (id) => {
      navigate(`/movies/${id}`);  
      window.location.reload(); //새로고침
    };
    return (
        <>
          { Movies.results && Movies.results.map(item => {
            return (
              <div 
                key={item.id}
                className='d-flex list-wrap'
                style={{
                  backgroundImage:
                  "url(" + 
                  `https://image.tmdb.org/t/p/original///${item.backdrop_path}`
                  +")"
                }}
                onClick={() => goToMovieDetailPg(item.id)}
              >
                <div className='d-flex contents-box'>
                  <div>
                    <div className='d-flex title-wrap'>
                        <div
                          className='poster-box'
                          style={{                            
                            backgroundImage:
                                "url(" + 
                                `https://image.tmdb.org/t/p/original///${item.poster_path}`
                                +")"
                          }}
                        >                          
                        </div>
                        
                        <div>
                          <h2>{item.title}</h2>
                          <p>{item.release_date?.split('-')[0]}</p>
                        </div>
                    </div>
                    <div className='d-flex badge-wrap'>
                      { Movies.currentPg === 'Favorite'
                       ? item.genres.map(item => <Badge id={item.id}/>)
                       : item.genre_ids.map(id => <Badge id={id}/>)
                      }
                    </div>
                    <p className='list-overview'>{item.overview}</p>
                  </div>
    
    
                  <div className='list-sub-info'>
                    <MovieSubInfo item={item}/>
                  </div>
                </div>
              </div>
            )
          })}
        </>
    )
}

export default MovieListCard
