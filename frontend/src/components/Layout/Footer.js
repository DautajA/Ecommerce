import React from 'react'
import {Link} from 'react-router-dom';
const Footer = () => {
  return (
    <div className='footer'>
      <h6>All Right Reserved &copy; Armonela</h6>
      <h5 className='text-center mt-3'>
        <Link to='/about'>About</Link>|
        <Link to='/contact'>Contact</Link>|
        <Link to='/privacy'>Privacy Policy</Link></h5>
    </div>
  )
}

export default Footer
