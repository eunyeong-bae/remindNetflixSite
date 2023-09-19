import React, { useEffect } from 'react'
import { movieAction } from '../redux/actions/movieAction';
import { useDispatch, useSelector } from 'react-redux';
import Banner from '../components/Banner';
import Carousel from '../components/Carousel';
import ClipLoader from "react-spinners/ClipLoader";

const Home = () => {
  const dispatch = useDispatch();
  const { popularMovies, topRatedMovies, upcomingMovies, loading} = useSelector(state => state.movie);

  useEffect(() => {
    dispatch(movieAction.getMovies());
  }, []);

  return (
    <>
      { loading 
          ? <ClipLoader
              color='#dc3545'
              loading={loading}
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          : <div className='movie-container'>
              <div style={{position:'relative'}}>
                <Banner movie={popularMovies.results[0]}/>
              </div>
              <div className='movie-box'>
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
