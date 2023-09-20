import React, { useEffect, useState } from 'react';
import './main.css';
import MovieSubInfo from '../components/MovieSubInfo';
import { useDispatch, useSelector } from 'react-redux';
import { movieAction } from '../redux/actions/movieAction';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';

const MovieDetail = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const [btnType, setBtnType] = useState('review');

  const { detailMovie,movieReviews,recommandations, loading} = useSelector(state => state.movie);

  useEffect(() => {
    dispatch(movieAction.getMovieDetails(id));
  }, []);

  console.log(detailMovie,movieReviews,recommandations)

  return (
    <>
    { loading
       ?  <Loading loading={loading} />
       : <div className='movie-detail-container'>
            <div className='d-flex movie-info-wrap'>
              {/* movie poster box */}
              <div className='movie-box'>
                <div
                    className='movie-bg-img'
                    style={{
                      backgroundImage:
                          "url(" + 
                          `https://www.themoviedb.org/t/p/w300_and_h450_bestv2${detailMovie.poster_path}`
                          +")"
                    }}
                  > 
                </div>
              </div>

              {/* movie detail description */}
              <div className='d-flex movie-info'>
                <div className='movie-main'>
                  <div className='d-flex'>
                    { detailMovie.genres && detailMovie.genres.map(item => {
                      return (
                        <div className='badge-box' key={item.id}>{item.name}</div>
                      )
                    })}
                  </div>
                  <h1>{detailMovie.title && detailMovie.title.toUpperCase()}</h1>
                  <p>{detailMovie.tagline}</p>
                  <MovieSubInfo item={detailMovie}/>
                </div>

                <div className='movie-overview'>
                  <p>{detailMovie.overview}</p>
                </div>

                <div className='movie-etc'>
                  <div className='etc-item'>
                    <div className='badge-box'>Budge</div>
                    <p>${detailMovie.budget}</p>
                  </div>
                  <div className='etc-item'>
                    <div className='badge-box'>Revenue</div>
                    <p>${detailMovie.revenue}</p>
                  </div>
                  <div className='etc-item'>
                    <div className='badge-box'>Release Day</div>
                    <p>{detailMovie.release_date}</p>
                  </div>
                  <div className='etc-item'>
                    <div className='badge-box'>Time</div>
                    <p>{detailMovie.runtime} mins</p>
                  </div>
                </div>
              </div>
          </div>

          <div className='sub-btn-wrap'>
            <button onClick={()=>setBtnType('review')}>REVIEWS ({movieReviews.length})</button>
            <button onClick={()=>setBtnType('recommand')}>RELATED MOVIES ({recommandations.length})</button>
          </div>

          {/* movie review area */}
          <div className='movie-review-wrap'>
            { movieReviews && btnType === 'review'
              && movieReviews.map(item => {
              return (
                <div className='review-container'>
                  <div className='d-flex review-author'>
                    <p>{item.author}</p>
                    <p>{item.created_at}</p>
                    <p>{item.author_details.rating} out of 10</p>
                  </div>
                  <div className='review-content'>
                    <p>{item.content}</p>
                  </div>
                  <div className='review-more'>
                    <button>more</button>
                  </div>
                </div>
              )
            })}
          </div>

          {/* movie recommand list area */}
          <div className='movie-recommand-list-wrap'>
            { recommandations && btnType === 'recommand'
              && recommandations.map(item => {
              return (
                <div></div>
              )
            })}
          </div>
          
        </div>
    }
    </>
  )
}

export default MovieDetail
