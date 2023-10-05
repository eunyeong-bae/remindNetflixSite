import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../components/Loading';
import './main.css';
import SortFilter from '../components/SortFilter';
import MovieSubInfo from '../components/MovieSubInfo';
import Badge from '../components/Badge';
import { movieAction } from '../redux/actions/movieAction';
import { useNavigate } from 'react-router-dom';


const Movies = () => {
  const dispatch = useDispatch();

  const {popularMovies, searchMovies, loading} = useSelector(state => state.movie);
  console.log("movies: ",popularMovies, searchMovies)

  function isObjEmpty(obj) {
    return Object.keys(obj).length === 0;
  }
  const isSearchMovieListEmpty = isObjEmpty(searchMovies);
  // console.log('result:', isSearchMovieListEmpty)

  useEffect(() => {
    if(isObjEmpty(popularMovies) && isObjEmpty(searchMovies)){
      dispatch(movieAction.getMovies());
    }
  }, []);

  useEffect(() => {
    dispatch({
      type:"SET_CURRENT_PAGE",
      payload:{
        currentPage: 'Movie'
      }
    })
  }, [popularMovies]);

  return (
    <>
      { loading 
        ? <Loading loading={loading}/>
        : <div className='d-flex movie-page-container'>
            <div className='movie-filter-box'>
              <SortFilter />
            </div>
            <div className='d-flex movie-container'>
              <div className='d-flex movie-list-box'>
                { isSearchMovieListEmpty
                  ?  <MovieList Movies={popularMovies}/>
                  :  <MovieList Movies={searchMovies}/>
                }
              </div>
              <div className='d-flex movie-pageNation-box'>
                dd
              </div>
            </div>
          </div>
      }
    </>
  )
}

export default Movies;

function MovieList({Movies}) {
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