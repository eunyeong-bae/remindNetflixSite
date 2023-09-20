import React from 'react';
import './main.css';
import { useSelector } from 'react-redux';

const Badge = ({id}) => {
    const {genreList} = useSelector(state => state.movie);

    return (
      <div className='badge-box' key={id}>
        {genreList.find( item => item.id === id).name}
      </div>
  )
}

export default Badge
