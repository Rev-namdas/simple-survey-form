import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./navbar.css"

export default function Navbar({ children }) {
  const navigate = useNavigate()

  return (
    <>
      <div className='navbar'>
        <div className='navbar__logo-wrapper'>
          <img className='navbar__logo' src={window.location.origin + '/ryans-archive-logo.png'} alt="Ryans Logo" />
          <span className="navbar__title">Survey Software</span>
        </div>

        <div className='navbar__btn-wrapper'>
          <button className='navbar__btn' onClick={() => navigate('/')}>Create Survey</button>
          <button className='navbar__btn' onClick={() => navigate('/admin/responses')}>Survey Responses</button>
        </div>
      </div>

      { children }
    </>
  )
}
