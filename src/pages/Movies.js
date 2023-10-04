import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../components/Loading';
import './main.css';
import SortFilter from '../components/SortFilter';
import MovieSubInfo from '../components/MovieSubInfo';
import Badge from '../components/Badge';


const Movies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type:"SET_CURRENT_PAGE",
      payload: {
        currentPage: 'Movie'
      }
    })
  }, [])

  const {popularMovies, searchMovies, loading} = useSelector(state => state.movie);
  // console.log("movies: ",popularMovies)

  function isObjEmpty(obj) {
    return Object.keys(obj).length === 0;
  }
  const isSearchMovieListEmpty = isObjEmpty(searchMovies);
  console.log('result:', isSearchMovieListEmpty)

  return (
    <>
      { loading 
        ? <Loading loading={loading}/>
        : <div className='d-flex movie-page-container'>
            <div className='movie-filter-box'>
              <SortFilter />
            </div>
            <div className='d-flex movie-list-box'>
              { isSearchMovieListEmpty
                ?  <MovieList Movies={popularMovies}/>
                :  <MovieList Movies={searchMovies}/>
              }
            </div>
          </div>
      }
    </>
  )
}

export default Movies;

function MovieList({Movies}) {
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
                      <p>{item.release_date.split('-')[0]}</p>
                    </div>
                </div>
                <div className='d-flex badge-wrap'>
                  { item.genre_ids.map(id => <Badge id={id}/>)}
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