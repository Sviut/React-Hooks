import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'

import { CurrentUserContext } from '../contexts/currentUser'

const FeedToggler = ({ tagName }) => {
  const [currentUserContext] = useContext(CurrentUserContext)
  return (
    <div className='feed-toggle'>
      <ul className='nav nav-pills outline-active'>
        {currentUserContext.isLoggedIn && (
          <li className='nav-item'>
            <NavLink to='/feed' className='nav-link'>
              Your Feed
          </NavLink>
          </li>
        )}

        <li className='nav-item'>
          <NavLink to='/' className='nav-link' exact>
            Global Feed
          </NavLink>
        </li>

        {tagName && (
          <li className='nav-item'>
            <NavLink to={`/tag/${tagName}`} className='nav-link' exact>
              <i className='ion-pound'></i>
              {tagName}
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  )
}

export default FeedToggler