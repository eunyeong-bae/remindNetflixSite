import React, { useEffect } from 'react'
import { movieAction } from '../redux/actions/movieAction';
import { useDispatch, useSelector } from 'react-redux';
import Carousel from '../components/Carousel';
import './main.css';
import Loading from '../components/Loading';

const Home = () => {
  const dispatch = useDispatch();
  const { activePage, popularMovies, topRatedMovies, upcomingMovies, loading} = useSelector(state => state.movie);

  useEffect(() => {
    dispatch(movieAction.getMovies( activePage));
  }, []);

  return (
    <>
      { loading 
          ? <Loading loading={loading}/>
          : <div className='home-movie-box'>
              <Carousel title='Top Popular Movies' data={popularMovies} slide='Popular'/>
              <Carousel title='Top Rated Movies' data={topRatedMovies} slide='TopRated'/>
              <Carousel title='Upcoming Movies' data={upcomingMovies} slide='Upcoming'/>
            </div>
      }
    </>
  )
}

export default Home
