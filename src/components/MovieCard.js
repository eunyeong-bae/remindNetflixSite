import React from 'react';
import './main.css';
import Badge from './Badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImdb} from '@fortawesome/free-brands-svg-icons';
import { faUsers} from '@fortawesome/free-solid-svg-icons';


const MovieCard = ({item}) => {
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
        <div className='d-flex overlay'>
            <div>
                <p>{item.title}</p>
                <div className='d-flex'>
                    { item.genre_ids.map(id => <Badge id={id}/> )}
                </div>
            </div>
            <div className='d-flex icon-container'>
                <div className='icon-box'>
                    <FontAwesomeIcon style={{background:'#ffc107'}} icon={faImdb} size='xl'/>
                    <span>{item.vote_average}</span>
                </div>
                <div className='icon-box'>
                    <FontAwesomeIcon style={{color:'#6c757d'}} icon={faUsers} size="lg" />
                    <span>{item.vote_average}</span>
                </div>
                <div className='span-box'>
                    <span>{item.adult ? '청불' : 'Under 18'}</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MovieCard
