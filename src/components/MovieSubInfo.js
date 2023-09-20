import React from 'react';
import './main.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImdb} from '@fortawesome/free-brands-svg-icons';
import { faUsers} from '@fortawesome/free-solid-svg-icons';

const MovieSubInfo = ({item}) => {
  return (
    <div className='d-flex'>
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
  )
}

export default MovieSubInfo
