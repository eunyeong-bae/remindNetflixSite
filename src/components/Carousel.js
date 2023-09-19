import React from 'react';
import './main.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

const Carousel = ({title, data}) => {
    console.log('real',data)
  return (
    <div className='d-flex slide-container'>
      <h1>{title}</h1>      
      <div className='carousel-box'>
        <div className='d-flex chevron-btn-wrap'>
            <div className='chevron-button left'>
                <FontAwesomeIcon icon={faChevronLeft} size='xl'/>
            </div>
            <div className='chevron-button right'>
                <FontAwesomeIcon icon={faChevronRight} size='xl'/>
            </div>
        </div>
        <div className='slide-wrap'>
            <div className='d-flex slide-item-box'>
                { data.results && data.results.map(item => {
                    return (
                        <div
                            className='slide-item'
                            style={{
                                backgroundImage:
                                    "url(" + 
                                    `https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${item.poster_path}`
                                    +")"
                            }}
                        >
                        </div>
                    )
                })}
            </div>
        </div>
      </div>
    </div>
  )
}

export default Carousel;
