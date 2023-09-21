import React, { useEffect, useState } from 'react';
import './main.css';
import MovieSubInfo from '../components/MovieSubInfo';
import { useDispatch, useSelector } from 'react-redux';
import { movieAction } from '../redux/actions/movieAction';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import MovieCard from '../components/MovieCard';

const MovieDetail = () => {
  const {id} = useParams();
  const dispatch = useDispatch();

  const [badgeList, setBadgeList] = useState([]);
  const [btnType, setBtnType] = useState('review');
  const [reviewMoreBtn, setReviewMoreBtn] = useState(false);

  const { detailMovie,movieReviews,recommandations, loading} = useSelector(state => state.movie);

  useEffect(() => {
    dispatch(movieAction.getMovieDetails(id));
  }, []);

  useEffect(() => {
    setBadgeList([
      {title: 'Budge', value: detailMovie.budget},
      {title: 'Revenue', value: detailMovie.revenue},
      {title: 'Release Day', value: detailMovie.release_date},
      {title: 'Time', value: detailMovie.runtime},
    ])
  }, [detailMovie])

  console.log(recommandations)

  return (
    <>
    { loading
       ?  <Loading loading={loading} />
       : <div className='movie-detail-container'>
            <div>
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
              <MovieDetailDescriptionComponent datas={[detailMovie, badgeList]}/>
            </div>

            <div className='sub-btn-wrap'>
              <button 
                className={btnType === 'review' ? 'click' : ''}
                onClick={()=>setBtnType('review')}
              >
                REVIEWS ({movieReviews.length})
              </button>
              <button 
                className={btnType !== 'review' ? 'click' : ''}
                onClick={()=>setBtnType('recommand')}
              >
                RELATED MOVIES ({recommandations.length})
              </button>
            </div>
          </div>


          {/* movie review area */}
          { btnType === 'review' && 
            <MovieReviewComponent datas={[movieReviews, btnType, reviewMoreBtn, setReviewMoreBtn]}/>
          }

          {/* movie recommand list area */}
          { btnType !== 'review' && 
            <div className='movie-recommand-list-wrap'>
              { recommandations && btnType === 'recommand'
                && recommandations.map(item => {
                return (
                  <div className='recommand-list'>
                    <MovieCard item={item}/>
                  </div>
                )
              })}
            </div>
          }
        </div>
    }
    </>
  )
}

export default MovieDetail;

function MovieDetailDescriptionComponent({datas}) {
  const [detailMovie, badgeList] = datas;

  return(
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
        { badgeList && badgeList.map(item => {
          return (
            <div className='etc-item'>
              <div className='badge-box'>{item.title}</div>
              <p>${item.value}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function MovieReviewComponent({datas}) {
  const [movieReviews, btnType, reviewMoreBtn, setReviewMoreBtn] = datas;
  

  return (
    <div className='movie-review-wrap'>
      { movieReviews && btnType === 'review'
        && movieReviews.map(item => {
        return (
          <div className={reviewMoreBtn ? 'review-container close' : 'review-container'}>
            <div className='d-flex review-author'>
              <p>{item.author}</p>
              <p>{item.created_at}</p>
              <p style={{fontSize:'14px'}}>{item.author_details.rating} out of 10</p>
            </div>
            <div className='review-content'>
              <p>{item.content}</p>
            </div>
            <div className='review-more'>
              <button 
                onClick={()=>setReviewMoreBtn(!reviewMoreBtn)}
              >
                {reviewMoreBtn ? 'close' :'more'}
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
