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

  const {popularMovies, loading} = useSelector(state => state.movie);
  console.log("movies: ",popularMovies)

  return (
    <>
      { loading 
        ? <Loading loading={loading}/>
        : <div className='d-flex movie-page-container'>
            <div className='movie-filter-box'>
              <SortFilter />
            </div>
            <div className='d-flex movie-list-box'>
              { popularMovies.results.map(item => {
                return (
                  <div 
                    key={item.id}
                    className='d-flex list-wrap'
                    style={{
                      backgroundImage:
                      "url(" + 
                      `https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${item.backdrop_path}`
                      +")"
                    }}
                  >
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
                    </div>

                    <p className='list-overview'>{item.overview}</p>

                    <div>
                      <MovieSubInfo item={item}/>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
      }
    </>
  )
}

export default Movies
