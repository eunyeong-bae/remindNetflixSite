import React, { useState } from 'react';
import './main.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import MovieCard from './MovieCard';

let currentPageValue = 0;

const Carousel = ({title, data, slide}) => {
    const [page, setPage] = useState(1);
    
    const handleMovieList = (type) => {
        const slideItemBoxElement = document.querySelector(`.${slide}`);
        
        if(type === 'next'){
            if(page === 1 || page < data.results.length/4){
                currentPageValue = -1200 * page;
                setPage(page + 1);
                slideItemBoxElement.style.transform = `translateX(${currentPageValue}px)`;
            } else if( page === data.results.length/4){
                setPage(1);
                slideItemBoxElement.style.transform = `translateX(0px)`;
            }
        } else if (type === 'prev'){
            if(page === 1) {
                currentPageValue = -1200 * (data.results.length/4 - 1);
                setPage(data.results.length/4);
                slideItemBoxElement.style.transform = `translateX(${currentPageValue}px)`;
            } else if (page !== 1 && page <= data.results.length/4){
                currentPageValue =currentPageValue + 1200;
                setPage(page - 1);
                slideItemBoxElement.style.transform = `translateX(${currentPageValue}px)`;
            }
        }
    };

  return (
    <div className='d-flex slide-container'>
      <h1>{title}</h1>      
      <div className='carousel-box'>
        <div className='d-flex chevron-btn-wrap'>
            <div 
                className='chevron-button left'
                onClick={() => handleMovieList('prev')}
            >
                <FontAwesomeIcon icon={faChevronLeft} size='xl'/>
            </div>
            <div 
                className='chevron-button right' 
                onClick={() => handleMovieList('next')}
            >
                <FontAwesomeIcon icon={faChevronRight} size='xl'/>
            </div>
        </div>
        <div className='slide-wrap'>
            <div className={`d-flex slide-item-box ${slide}`}>
                { data.results && data.results.map(item => {
                    return (
                        <MovieCard key={item.id} item={item} />
                    )
                })}
            </div>
        </div>
      </div>
    </div>
  )
}

export default Carousel;
