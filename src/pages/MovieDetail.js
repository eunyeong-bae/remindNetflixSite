import React, { useEffect, useState } from 'react';
import './main.css';
import MovieSubInfo from '../components/MovieSubInfo';
import { useDispatch, useSelector } from 'react-redux';
import { movieAction } from '../redux/actions/movieAction';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import MovieCard from '../components/MovieCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faRectangleXmark, faHeartCircleCheck, faXmark, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import YouTube from 'react-youtube';
import { faFileVideo } from '@fortawesome/free-regular-svg-icons';


const MovieDetail = () => {
  const {id} = useParams();
  const dispatch = useDispatch();

  const [badgeList, setBadgeList] = useState([]);
  const [btnType, setBtnType] = useState('review');
  const [reviewMoreBtn, setReviewMoreBtn] = useState(false);
  const [videoInfo, setVideoInfo] = useState(false);
  const [favoriteModal, setFavoriteModal] = useState(false);
  const [favoriteAlert, setFavoriteAlert] = useState(false);
 
  const { detailMovie,movieReviews,recommandations,movieVideo,loading,favoriteMovies} = useSelector(state => state.movie);

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
  }, [detailMovie]);

  useEffect(() => {
    setTimeout(() => {
      if(favoriteAlert){
        setFavoriteAlert(!favoriteAlert);
      }
    }, 1500);
  }, [ favoriteAlert]);

  return (
    <>
    { loading
       ?  <Loading loading={loading} />
       : <div style={{position:'relative'}}>
          <div className='movie-detail-container'>
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
                <MovieDetailDescriptionComponent 
                  datas={[ detailMovie, 
                           badgeList,videoInfo, 
                           setVideoInfo,
                           favoriteModal, 
                           setFavoriteModal,
                           favoriteMovies,
                           favoriteAlert, 
                           setFavoriteAlert,
                        ]}
                />
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
                    <div className='recommand-list' key={item.id}>
                      <MovieCard item={item}/>
                    </div>
                  )
                })}
              </div>
            }
          </div>
          { videoInfo && 
            <div className='modal-wrap'>
              <VideoModal data={[movieVideo, videoInfo, setVideoInfo]} />
            </div>
          }
          { favoriteModal &&
            <div className='modal-wrap'>
              <div className='d-flex modal-content'>
                <AlertModal data={[favoriteModal, setFavoriteModal]}/>
              </div>
            </div>
          }
          { favoriteAlert &&
            <div className='d-flex modal-wrap alert-modal-wrap'>
              <div className='d-flex alert-warning'>
                <FontAwesomeIcon icon={faCircleExclamation} size="lg" />
                <p>좋아하는 영화 목록에서 삭제되었습니다.</p>
              </div>
            </div>
          }
        </div>
    }
    </>
  )
}

export default MovieDetail;

function MovieDetailDescriptionComponent({datas}) {
  const [ detailMovie, 
          badgeList, 
          videoInfo, 
          setVideoInfo, 
          favoriteModal, 
          setFavoriteModal,
          favoriteMovies,
          favoriteAlert, 
          setFavoriteAlert,
        ] = datas;

  const currentSelectMovie = favoriteMovies?.results.filter(item => item.original_title === detailMovie.original_title);
  const [isLiked, setIsLiked] = useState(currentSelectMovie[0]?.isLiked ? currentSelectMovie[0].isLiked : false);
  const [ likedMovie, setLikedMovie] = useState(isLiked ? currentSelectMovie[0] : detailMovie);

  const dispatch = useDispatch();
  const setMovieFavorite = (movieData) => {
    
    movieData.isLiked = movieData?.isLiked ? !movieData.isLiked: true;
    setIsLiked(movieData.isLiked);

    setFavoriteModal(movieData.isLiked);
    setFavoriteAlert(!movieData.isLiked);

    dispatch({
      type: movieData.isLiked ? "SET_FAVORITE_MOVIE_SUCCESS" : "REMOVE_FAVORITE_MOVIE_SUCCESS", 
      payload:{ favoriteMovies: movieData}
    })
  };

  return(
    <div className='d-flex movie-info'>
      <div className='movie-main'>
        <div className='d-flex'>
          { detailMovie.genres && detailMovie.genres.map(item => {
            return (
              <div className='badge-box' key={item.id+item.name}>{item.name}</div>
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
            <div className='etc-item' key={item.id+item.title}>
              <div className='badge-box'>{item.title}</div>
              <p>${item.value}</p>
            </div>
          )
        })}
      </div>

      <div className='movie-video' onClick={() => setVideoInfo(!videoInfo)}>
        <FontAwesomeIcon icon={faVideo} />
        <p>Watch Trailer</p>
      </div>

      <div className={`movie-great ${isLiked ? 'red' : ''}`} onClick={() => setMovieFavorite(likedMovie)}>
        {/* <FontAwesomeIcon icon={faFaceKissWinkHeart} size="2xl" /> */}
        <FontAwesomeIcon icon={faHeartCircleCheck} size="2xl" />
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
          <div key={item.id} className={reviewMoreBtn ? 'review-container close' : 'review-container'}>
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

function VideoModal({data}) {
  const [movieVideo, videoInfo, setVideoInfo] = data;
  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  function _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  return (
    <div className='d-flex video-modal'>
      <div className='close-btn' onClick={() => setVideoInfo(!videoInfo)}>
        <FontAwesomeIcon icon={faRectangleXmark} size='2xl'/>
      </div>
      <YouTube 
        videoId={movieVideo && movieVideo[0].key} 
        opts={opts} 
        onReady={_onReady}
      />
    </div>
  )
}

function AlertModal({data}) {
  const [favoriteModal, setFavoriteModal] = data;
  const navigate = useNavigate();

  return (
    <div className='d-flex video-modal alert-modal'>
      <div className='d-flex alert-close' onClick={() => setFavoriteModal(!favoriteModal)}>
        <FontAwesomeIcon icon={faXmark} size='xl' />
      </div>
      <div className='d-flex alert-content'>
        <div className='d-flex fileVideo-box'>
            <FontAwesomeIcon icon={faFileVideo} size="2xl"/>
        </div>
        <h3>좋아하는 영화 목록에 추가되었습니다.</h3>
        <p>
          좋아하는 영화 목록은 
          <button className='alert-btn' onClick={() => navigate('/favorite')}>
            My Favorite
          </button>
          에서 확인할 수 있습니다.
        </p>
      </div>
    </div>
  )
}