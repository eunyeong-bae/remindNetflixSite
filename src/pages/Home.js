import React, { useEffect } from 'react'
import { movieAction } from '../redux/actions/movieAction';
import { useDispatch, useSelector } from 'react-redux';
import Banner from '../components/Banner';
import Carousel from '../components/Carousel';

const Home = () => {
  const dispatch = useDispatch();
  const { popularMovies, topRatedMovies, upcomingMovies} = useSelector(state => state.movie);

  useEffect(() => {
    dispatch(movieAction.getMovies());
  }, []);

  return (
    <div className='movie-container'>
      <div style={{position:'relative'}}>
        { popularMovies.results && <Banner movie={popularMovies.results[0]}/> }
      </div>
      <div className='movie-box'>
        <Carousel title='Top Popular Movies' data={popularMovies} />
        <Carousel title='Top Rated Movies' data={topRatedMovies} />
        <Carousel title='Upcoming Movies' data={upcomingMovies} />
      </div>
    </div>
  )
}

export default Home
