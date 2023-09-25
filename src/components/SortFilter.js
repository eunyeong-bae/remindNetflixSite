import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux';

const SortFilter = () => {
    const {genreList} = useSelector(state => state.movie);
    console.log("sortfitler: ",genreList)

  const [ sortBtn, setSortBtn] = useState(false);
  const [ filterBtn, setFilterBtn] = useState(false);

  const handleSortType = (type) => {
    if(type === 'Sort'){
        setSortBtn(!sortBtn)
    } else {
        setFilterBtn(!filterBtn)
    }
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
        {sortBtn && <SortBox />}
      </div>

      <div className='d-flex common-container'>
        <CommonComponent 
            type={'Filter'} 
            handleSortType={handleSortType} 
            filterBtn={filterBtn}
        />
        <div className='common-border'></div>
        {filterBtn && <FilterBox genreList={genreList}/>}
      </div>
      
    </div>
  )
}

export default SortFilter;

function CommonComponent({type, handleSortType, sortBtn, filterBtn}) {
    return(
        <div className='d-flex common-box'>
            <h2>{type}</h2>
            { (!sortBtn || !filterBtn)
                && <FontAwesomeIcon icon={faArrowRight} onClick={() => handleSortType(type)} />
            }
            { (sortBtn || filterBtn) 
                && <FontAwesomeIcon icon={faArrowDown} onClick={() => handleSortType(type)}/>
            }
        </div>
    )
}

function SortBox() {
    return (
        <div className='d-flex sort-wrap'>
            <h2>Sort Results By</h2>
            <div className='sort-select-box'>
                <p>Sort By</p>
                <select>
                    <option>None</option>
                    <option>Popularity(Desc)</option>
                    <option>Popularity(Asc)</option>
                    <option>Release Day(Desc)</option>
                    <option>Release Day(Asc)</option>
                    <option>Vote(Desc)</option>
                    <option>Vote(Asc)</option>
                    <option>Revenue(Desc)</option>
                    <option>Revenue(Asc)</option>
                </select>
            </div>
        </div>
    )
}


function FilterBox({genreList}) {
    return (
        <div className='d-flex filter-wrap'>
            <div className='d-flex year-filter'>
                <h2>YEAR Filter</h2>
                <div className='d-flex period'>
                    <p>From: </p>
                    <h2>1990</h2>
                    <p> - </p>
                    <p>To: </p>
                    <h2>2021</h2>
                </div>
            </div>
            <div className='common-border'></div>

            <div className='d-flex year-filter'>
                <h2>IBM Score Filter</h2>
                <div className='d-flex period'>
                    <p>From: </p>
                    <h2>0</h2>
                    <p> - </p>
                    <p>To: </p>
                    <h2>10</h2>
                </div>
            </div>
            <div className='common-border'></div>

            <div className='d-flex genres-filter'>
                <h2>Genres</h2>
                <div className='genres-box'>
                    { genreList.map(item => {
                        return (
                            <div key={item.id} className='genre'>
                                {item.name}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}