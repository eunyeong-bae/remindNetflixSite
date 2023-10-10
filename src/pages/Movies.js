import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../components/Loading';
import './main.css';
import SortFilter from '../components/SortFilter';
import { movieAction } from '../redux/actions/movieAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faEllipsis } from '@fortawesome/free-solid-svg-icons'
import MovieListCard from '../components/MovieListCard';

const Movies = () => {
  const dispatch = useDispatch();

  const {activePage, popularMovies, searchMovies, loading} = useSelector(state => state.movie);

  function isObjEmpty(obj) {
    return Object.keys(obj).length === 0;
  }
  const isSearchMovieListEmpty = isObjEmpty(searchMovies);

  const pagiNationFunc = (pageNum) => {
    if(pageNum === 'prev'){
      dispatch(movieAction.getMovies(activePage - 1));
    } else if(pageNum === 'next') {
      dispatch(movieAction.getMovies(activePage + 1));
    } else if(pageNum === 20) {
      dispatch(movieAction.getMovies(20));
    } else {
      dispatch(movieAction.getMovies(pageNum));
    }
  };

  useEffect(() => {
    if(isObjEmpty(popularMovies) && isObjEmpty(searchMovies)){
      dispatch(movieAction.getMovies( activePage));
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
                  ?  <MovieListCard Movies={popularMovies}/>
                  :  <MovieListCard Movies={searchMovies}/>
                }
              </div>
              <PagiNation activePage={activePage} pagiNationFunc={pagiNationFunc}/>
            </div>
          </div>
      }
    </>
  )
}

export default Movies;


function PagiNation({activePage, pagiNationFunc}) {
  const pageNumberBox = () => {
    const result = [];
    
    if( activePage <= 16){
      for(let i=activePage; i<=activePage+2; i++){
        result.push(<div className='pagiNation-box page-number' onClick={()=>pagiNationFunc(i)}>{i}</div>)
      }
    } else if(activePage > 16) {
      for(let i=activePage; i<=20; i++){
        result.push(<div className='pagiNation-box page-number' onClick={()=>pagiNationFunc(i)}>{i}</div>)
      }
    }
    return result;
  };

  return (
    <div className='d-flex movie-pagiNation-box'>
      { activePage !== 1 &&
        <div className='pagiNation-box page-moveBtn' onClick={()=>pagiNationFunc('prev')}>
          <FontAwesomeIcon icon={faChevronLeft}/>
        </div>
      }
      <div className='d-flex'>
        <div className='d-flex'>{pageNumberBox()}</div>
        {/* <div className='pagiNation-box page-number' onClick={()=>pagiNationFunc(activePage)}>{activePage}</div>
        <div className='pagiNation-box page-number' onClick={()=>pagiNationFunc(activePage+1)}>{activePage+1}</div>
        <div className='pagiNation-box page-number' onClick={()=>pagiNationFunc(activePage+2)}>{activePage+2}</div> */}
        { activePage <= 16 &&
          <>
            <div className='pagiNation-box page-number'>
              <FontAwesomeIcon icon={faEllipsis} />
            </div>
            <div className='pagiNation-box page-number' onClick={()=>pagiNationFunc(20)}>20</div>
          </>
        }
      </div>
      { activePage !== 20 &&
        <div className='pagiNation-box page-moveBtn' onClick={()=>pagiNationFunc('next')}>
          <FontAwesomeIcon icon={faChevronRight}/>
        </div>
      }
    </div>
  )
}