import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux';
import { movieAction } from '../redux/actions/movieAction';

const SortFilter = () => {
  const dispatch = useDispatch();

  const {genreList, filterValue} = useSelector(state => state.movie);

  const [ sortBtn, setSortBtn] = useState(false);
  const [ filterBtn, setFilterBtn] = useState(false);

  const [ sortFilter, setSortFilter] = useState({
    'success': false,
    'sort': '',
    'score': [0,10],
    'genre': '',
    'year': [0,2023],
  });

  useEffect(() => {
    console.log("sortfilter 화면 첨 진입할 때: : ",sortFilter)
    setSortFilter({
        ...sortFilter,
        'sort': filterValue.sort,
        'score': filterValue.score,
        'genre': filterValue.genre,
        'year': filterValue.year,
    });

  }, []);

  useEffect(() => {
      console.log("sortfiltervalue 변경됐을 때: ",sortFilter)
      if(sortFilter.success) {
          console.log("소트필터 성공 : ",sortFilter)
        dispatch( movieAction.getSortFilterMovie(sortFilter));
    }
  }, [sortFilter])

  const handleSortType = (type) => {
    if(type === 'Sort'){
        setSortBtn(!sortBtn)
    } else {
        setFilterBtn(!filterBtn)
    }
  };

  const filterMovieFunc = (id) => {
    setSortFilter({...sortFilter, 'success': true, 'genre': id});
    window.scrollTo(0,0);
  };

  const sortMovieFunc = (e) => {
    const select = e.target;
    const selectedOptionValue = select.options[select.selectedIndex].value;

    setSortFilter({...sortFilter, 'success': true, 'sort': selectedOptionValue});
  };

  return (
    <div>
      <div className='d-flex common-container'>
        <CommonComponent 
            type={'Sort'} 
            handleSortType={handleSortType} 
            sortBtn={sortBtn}
        />
        <div className='common-border'></div>
        {sortBtn && <SortBox sortMovieFunc={sortMovieFunc}/>}
      </div>

      <div className='d-flex common-container'>
        <CommonComponent 
            type={'Filter'} 
            handleSortType={handleSortType} 
            filterBtn={filterBtn}
        />
        <div className='common-border'></div>
        {filterBtn && 
            <FilterBox 
                genreList={genreList} 
                filterMovieFunc={filterMovieFunc}
                filterValue={filterValue}
                sortFilter={sortFilter}
                setSortFilter={setSortFilter}
            />
        }
      </div>
      
    </div>
  )
}

export default SortFilter;

function CommonComponent({type, handleSortType, sortBtn, filterBtn}) {
    return(
        <div className='d-flex common-box'>
            <h2>{type}</h2>
            { type === 'Sort'
                ? sortBtn
                    ? <FontAwesomeIcon icon={faArrowRight} onClick={() => handleSortType(type)} />
                    : <FontAwesomeIcon icon={faArrowDown} onClick={() => handleSortType(type)} />
                : filterBtn
                    ? <FontAwesomeIcon icon={faArrowRight} onClick={() => handleSortType(type)}/>
                    : <FontAwesomeIcon icon={faArrowDown} onClick={() => handleSortType(type)}/>
            }
        </div>
    )
}

function SortBox({sortMovieFunc}) {
    return (
        <div className='d-flex sort-wrap'>
            <h2>Sort Results By</h2>
            <div className='sort-select-box'>
                <p>Sort By</p>
                <select onChange={(e) => sortMovieFunc(e)}>
                    <option value='None'>None</option>
                    <option value='popularity.desc'>Popularity(Desc)</option>
                    <option value='popularity.asc'>Popularity(Asc)</option>
                    <option value='primary_release_date.desc'>Release Day(Desc)</option>
                    <option value='primary_release_date.asc'>Release Day(Asc)</option>
                    <option value='vote_average.desc'>Vote(Desc)</option>
                    <option value='vote_average.asc'>Vote(Asc)</option>
                    <option value='revenue.desc'>Revenue(Desc)</option>
                    <option value='revenue.asc'>Revenue(Asc)</option>
                </select>
            </div>
        </div>
    )
}


function FilterBox({genreList, filterMovieFunc, filterValue,sortFilter, setSortFilter}) {
    const {year, score} = filterValue;

    const handleInputRange = (type, e) => {
        const targetValue = Number(e.target.value);
        
        if(e.target.value !== "0") {
            var gradient_value = type==='year' ? 100 : 10 / Number(e.target.attributes.max.value);
            e.target.style.backgroundColor = `linear-gradient(to right, #ececec 0%, #ececec ${gradient_value * targetValue}%, rgb(199, 86, 97) ${gradient_value * targetValue}%, rgb(199, 86, 97) 100%) !important`;
            
            type === 'year' 
                ? setSortFilter({...sortFilter, 'success': true, 'year': [targetValue, 2023]}) 
                : setSortFilter({...sortFilter, 'success': true, 'score': [targetValue, 10]});
        }
    }

    return (
        <div className='d-flex filter-wrap'>
            <div className='d-flex year-filter'>
                <h2>YEAR Filter</h2>
                <div className='d-flex period'>
                    <p>From : </p>
                    <h2>{year[0]}</h2>
                    <p style={{marginRight:'5px'}}> - </p>
                    <p>To : </p>
                    <h2>{year[1]}</h2>
                </div>
                <div className='inputRange'>
                    <input id="rangeInput" className="rangeInputYear" max="2023" min="1990" value={year[0]} step="1" type="range" onChange={e => handleInputRange('year', e)} />
                </div>
            </div>
            <div className='common-border'></div>

            <div className='d-flex year-filter'>
                <h2>IBM Score Filter</h2>
                <div className='d-flex period'>
                    <p>From : </p>
                    <h2>{score[0]}</h2>
                    <p style={{marginRight:'5px'}}> - </p>
                    <p>To : </p>
                    <h2>{score[1]}</h2>
                </div>
                <div className='inputRange'>
                    <input id="rangeInput" className="rangeInputScore" max="10" min="0" value={score[0]} step="1" type="range" onChange={e => handleInputRange('score', e)} />
                </div>
            </div>
            <div className='common-border'></div>

            <div className='d-flex genres-filter'>
                <h2>Genres</h2>
                <div className='genres-box'>
                    { genreList.map(item => {
                        return (
                            <div key={item.id} className='genre' onClick={() => filterMovieFunc(item.id)}>
                                {item.name}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}