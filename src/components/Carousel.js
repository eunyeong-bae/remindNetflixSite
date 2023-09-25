import React, { useState } from 'react';
import './main.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import MovieCard from './MovieCard';

const Carousel = ({title, data}) => {
    const [page, setPage] = useState(1);

    const handleMovieList = (type) => {
        const slideItemBoxElement = document.querySelector('.slide-item-box');
        
        if(page === 1) {
            if(type === 'next'){
                setPage(page + 1);
                slideItemBoxElement.style.transform = `translateX(${-1200 * page}px)`
            } else {
                setPage(Math.floor(data.results.length/4));
                slideItemBoxElement.style.transform = `translateX(${-1200 * (Math.floor(data.results.length/4) -1)}px)`
            }
        }
        else if( page < data.results.length/4) {
            if(type === 'next'){
                setPage(page + 1);
                slideItemBoxElement.style.transform = `translateX(${-1200 * page}px)`
            } else {
                setPage(page - 1);
                slideItemBoxElement.style.transform = `translateX(${-1200 * (page - 1)}px)`
            }
        } else {
            if(type === 'next'){
                setPage(1);
                slideItemBoxElement.style.transform = 'translateX(0px)';
            } else {
                setPage(page - 2);
                slideItemBoxElement.style.transform = `translateX(${-1200 * (page-2)}px)`
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
            <div className='d-flex slide-item-box'>
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
