import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Movies from './pages/Movies';
import MovieDetail from './pages/MovieDetail';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import { useSelector } from 'react-redux';
import MovieFavorite from './pages/MovieFavorite';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';


/**
 * 1. 3개 페이지 필요(홈페이지, movie 홈페이지, movieDetail 페이지)
 * 2. 홈페이지에서 배너 볼 수 있음
 * 3. 3가지 섹션의 영화 볼 수 있음(인기영화, 순위높은영화, 업커밍영화)
 * 4. 각 영화에 마우스를 올리면 제목/장르/점수/인기도.청불여부 알 수있음
 * 5. 영화를 슬라이드로 넘기면서 볼 수 있다
 * 
 * 6. 영호 ㅏ디테일 페이지에서 정보를 볼 수있음(포스터,제목,ㅈ루거리,점수,.인기도 등)
 * 7. 트레일러(예고편) 누르면 예고편 볼 수 있음
 * 8. 영화 리뷰도 볼 수 있음
 * 9. 관련 영화도 볼 수 있음
 * 
 * 10.영화검색가능
 * 11.영화정렬가능
 * 12/영화 필터링 가능
*/

function App() {
  const {currentPage} = useSelector(state => state.movie);

  const [ isBarMenuClicked, setIsBarMenuClicked] = useState(false);
  
  return (
    <div className='app-container'>
      <div className='nav-container'>
        <Navbar data={[isBarMenuClicked, setIsBarMenuClicked]}/>
        { isBarMenuClicked &&
          <div className='d-flex parent-nav-list' onClick={() => setIsBarMenuClicked(!isBarMenuClicked)}>
            <div className='nav-Xmark'>
              <FontAwesomeIcon icon={faXmark} size='xl' />
            </div>
            <Link to='/' className='link'>Home</Link>
            <Link to='/movies' className='link'>Movie</Link>
            <Link to='/favorite' className='link'>My Favorite</Link>
          </div>
        }
      </div>
      <div className='content-container'>
        { currentPage !== 'Movie' && 
          <div>
            <Banner/>
          </div>
        }
        <div className='main-wrap'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/movies' element={<Movies />} />
            <Route path='/movies/:id' element={<MovieDetail />} />
            <Route path='/favorite' element={<MovieFavorite />}/>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
