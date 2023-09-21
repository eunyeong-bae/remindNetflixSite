import React, { useEffect } from 'react'
import { movieAction } from '../redux/actions/movieAction';
import { useDispatch, useSelector } from 'react-redux';
import Carousel from '../components/Carousel';
import './main.css';
import Loading from '../components/Loading';

const Home = () => {
  const dispatch = useDispatch();
  const { popularMovies, topRatedMovies, upcomingMovies, loading} = useSelector(state => state.movie);

  useEffect(() => {
    dispatch(movieAction.getMovies());
  }, []);

  return (
    <>
      { loading 
          ? <Loading loading={loading}/>
          : <div className='movie-container'>
              <div className='home-movie-box'>
                <Carousel title='Top Popular Movies' data={popularMovies} />
                <Carousel title='Top Rated Movies' data={topRatedMovies} />
                <Carousel title='Upcoming Movies' data={upcomingMovies} />
              </div>
            </div>
      }
    </>
  )
}

export default Home
