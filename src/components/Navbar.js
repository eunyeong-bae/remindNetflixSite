import React from 'react';
import './main.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className='d-flex nav-container'>
      <div className='d-flex nav-list-wrap'>
        <div className='nav-logo' onClick={() => navigate('/')}>
          <img src='https://images.ctfassets.net/y2ske730sjqp/1aONibCke6niZhgPxuiilC/2c401b05a07288746ddf3bd3943fbc76/BrandAssets_Logos_01-Wordmark.jpg?w=940' />
        </div>
        <div className='d-flex nav-list'>
          <Link to='/' className='nav-link'>Home</Link>
          <Link to='/movies' className='nav-link'>Movie</Link>
          <Link to='/favorite' className='nav-link'>My Favorite</Link>
        </div>
      </div>
      
      <div className='d-flex nav-search-wrap'>
          <input />
          <div className='search-icon'>
            <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
          </div>
      </div>
    </div>
  )
}

export default Navbar
